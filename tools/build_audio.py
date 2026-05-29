"""Generate TTS audio via edge-tts for every file with audio.required: true.

- Idempotent: skips when audio/<id>.mp3 exists AND content/audio/<id>.hash matches the script hash.
- Concurrent with bounded semaphore (default 4).
- Multi-speaker scripts: lines like `<<SPEAKER:F>>` or `<<SPEAKER:M>>` start a new speaker block;
  each block is synthesised separately and the resulting MP3 segments are concatenated.
  Used by Phase 3 dialogues (CO types 2, 3, 5) per 04_PHASE_3_VOCAB_LISTENING.md §4.4.
- Per-item rate via audio.rate frontmatter (e.g. "-5%", "+10%"); edge-tts handles SSML internally.
- Inline `<break time="300ms"/>` tags are stripped — edge-tts prosody handles punctuation natively;
  the tags are author hints, not synthesis directives. ffmpeg-based silence insertion is a Phase 8
  enhancement if author feedback warrants it.
"""

from __future__ import annotations

import asyncio
import contextlib
import hashlib
import re
from dataclasses import dataclass
from pathlib import Path

import yaml

from tools._common import AUDIO_DIR, TOOLS_DIR, console, iter_loaded

SPEAKER_RE = re.compile(r"^\s*<<SPEAKER:([FM])>>\s*$", re.MULTILINE)
BREAK_TAG_RE = re.compile(r"<break\s+[^/>]*/?>", re.IGNORECASE)


@dataclass(frozen=True)
class Segment:
    gender: str   # "F" or "M"
    text: str


def _load_audio_config() -> dict:
    return yaml.safe_load((TOOLS_DIR / "audio_config.yaml").read_text(encoding="utf-8"))


def _voice_for(register: str, gender: str, cfg: dict) -> str:
    """Pick the configured voice for register + gender."""
    return cfg["defaults"][register][gender]


def parse_script_segments(script: str) -> list[Segment]:
    """Split a ## SCRIPT body into ordered (gender, text) segments.

    - No <<SPEAKER:X>> markers → single segment, default gender F.
    - Marker at top → that gender starts; switches each subsequent marker.
    - Markers without text after them (until next marker / EOF) are skipped.
    - <break .../> tags are stripped from each segment.
    """
    script = BREAK_TAG_RE.sub("", script)
    parts: list[tuple[str | None, str]] = []
    last_end = 0
    current_gender: str | None = None
    for m in SPEAKER_RE.finditer(script):
        prefix = script[last_end:m.start()].strip()
        if prefix:
            parts.append((current_gender, prefix))
        current_gender = m.group(1)
        last_end = m.end()
    tail = script[last_end:].strip()
    if tail:
        parts.append((current_gender, tail))
    if not parts:
        return []
    # If the first chunk has no gender (i.e. no marker before any text), default to F.
    return [Segment(gender=g or "F", text=t) for g, t in parts if t]


def _hash_path(file_id: str) -> Path:
    return AUDIO_DIR / f"{file_id}.hash"


async def _synthesize_segment(text: str, voice: str, rate: str | None, out: Path) -> None:
    import edge_tts  # imported lazily so plain audit/test runs don't require it
    kwargs: dict[str, str] = {"text": text, "voice": voice}
    if rate:
        kwargs["rate"] = rate
    communicate = edge_tts.Communicate(**kwargs)
    await communicate.save(str(out))


async def _synthesize(*, segments: list[Segment], register: str, rate: str | None,
                      cfg: dict, voice_override: str | None, out: Path) -> None:
    """Synthesise one or many segments, concatenating MP3 bytes for multi-speaker items."""
    if len(segments) == 1 and voice_override:
        # Single-speaker with explicit voice override — fast path.
        await _synthesize_segment(segments[0].text, voice_override, rate, out)
        return

    if len(segments) == 1:
        voice = voice_override or _voice_for(register, segments[0].gender, cfg)
        await _synthesize_segment(segments[0].text, voice, rate, out)
        return

    # Multi-speaker: synthesise each segment to a temp file, then concat MP3 bytes.
    tmp_dir = out.parent / f"_{out.stem}_segments"
    tmp_dir.mkdir(parents=True, exist_ok=True)
    seg_paths: list[Path] = []
    try:
        for i, seg in enumerate(segments):
            voice = _voice_for(register, seg.gender, cfg)
            seg_path = tmp_dir / f"seg_{i:03d}.mp3"
            await _synthesize_segment(seg.text, voice, rate, seg_path)
            seg_paths.append(seg_path)
        with out.open("wb") as f:
            for p in seg_paths:
                f.write(p.read_bytes())
    finally:
        for p in seg_paths:
            p.unlink(missing_ok=True)
        with contextlib.suppress(OSError):
            tmp_dir.rmdir()


async def _run(*, concurrency: int, force: bool) -> None:
    cfg = _load_audio_config()
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(concurrency)

    todo: list[tuple] = []
    for lc in iter_loaded(strict=True):
        if isinstance(lc, Exception):
            continue
        if not lc.fm.audio.required:
            continue
        text = lc.script
        if not text:
            console.print(f"[yellow]skip {lc.fm.id}:[/] audio.required but no ## SCRIPT block.")
            continue
        segments = parse_script_segments(text)
        if not segments:
            console.print(f"[yellow]skip {lc.fm.id}:[/] script is empty after marker stripping.")
            continue
        register = lc.fm.register.value
        rate = lc.fm.audio.rate
        voice_override = lc.fm.audio.voice
        out_mp3 = AUDIO_DIR / f"{lc.fm.id}.mp3"
        hashfile = _hash_path(lc.fm.id)
        # Hash inputs that affect output, so any change invalidates the cache.
        hash_payload = f"v2::{register}::{rate or ''}::{voice_override or ''}::" \
                       + "||".join(f"{s.gender}:{s.text}" for s in segments)
        new_hash = hashlib.sha256(hash_payload.encode()).hexdigest()[:16]
        if not force and out_mp3.exists() and hashfile.exists() \
                and hashfile.read_text().strip() == new_hash:
            continue
        todo.append((lc.fm.id, segments, register, rate, voice_override, out_mp3, hashfile, new_hash))

    if not todo:
        console.print("[green]Audio:[/] nothing to do (all up-to-date).")
        return

    async def _one(item):
        fid, segments, register, rate, voice_override, out_mp3, hashfile, new_hash = item
        async with sem:
            label = voice_override or f"{register}/{'+'.join(s.gender for s in segments)}"
            console.print(f"[cyan]tts[/] {fid} ({label}, {len(segments)} seg)")
            try:
                await _synthesize(segments=segments, register=register, rate=rate,
                                  cfg=cfg, voice_override=voice_override, out=out_mp3)
                hashfile.write_text(new_hash, encoding="utf-8")
            except Exception as e:  # noqa: BLE001
                console.print(f"[red]tts FAILED[/] {fid}: {e}")

    await asyncio.gather(*[_one(x) for x in todo])
    console.print(f"[green]Audio:[/] generated/refreshed {len(todo)} file(s).")


def main(*, concurrency: int = 4, force: bool = False) -> None:
    asyncio.run(_run(concurrency=concurrency, force=force))


if __name__ == "__main__":
    main()

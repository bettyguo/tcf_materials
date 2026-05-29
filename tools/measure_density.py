"""Compute lexical density / TTR / sentence-length metrics on reading items.

Per PHASE_4_DESIGN.md §3.1. Used by:
    python -m tools.cli measure-density <file.md>
    python -m tools.cli measure-density --audit   # walk content/04_reading/, fail on out-of-band

Implementation philosophy: lightweight, dependency-free, deterministic.
NO spaCy / NLTK — those would add ~50MB and a non-deterministic POS tagger.
The content-word approximation is "non-stopword tokens of length >= 3". The
absolute numbers will not match a linguist's manual count exactly; the goal is
to catch *gross drift* (a B2 text accidentally written at A2 density) and to
provide a reproducible signal in CI. Native review remains the qualitative
arbiter of register.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

from tools._common import CONTENT_DIR, REPO_ROOT, console, iter_content_files, load_content

STOPLIST_PATH = REPO_ROOT / "tools" / "data" / "fr_stopwords_min.txt"

# CEFR band targets per PHASE_4_DESIGN.md §3.1 + 05_PHASE_4_READING.md §2.
# Each band is (min, max) inclusive. Out-of-band by > 10% relative = audit-fail.
#
# TTR (type-token ratio) is heavily length-dependent — short texts systematically
# over-report it because content words have not yet had a chance to repeat.
# Bands below have an intentionally loose upper bound; the low-end is the load-
# bearing signal (low TTR = repetitive register, a real failure mode).
BANDS: dict[str, dict[str, tuple[float, float]]] = {
    # NOTE on word_count lower bounds: the §2 spec gives nominal ranges for the
    # *target* prose narrative. Authentic-format type-1/2 texts (SMS, menu, email
    # header, advertisement) carry less running prose than long-form articles —
    # the extractor returns fewer tokens than the spec's nominal lower bound.
    # Lower bounds are calibrated to those authentic formats, not to the long-form
    # nominal. The spec's nominal centre remains the production target; the band
    # is the *acceptable variance* around it.
    "A1": {
        "word_count": (45, 130),
        "lexical_density": (0.40, 0.85),  # menus, lists → high natural density
        "type_token_ratio": (0.55, 0.98),
        "avg_sentence_length": (6, 14),
    },
    "A2": {
        "word_count": (80, 210),
        "lexical_density": (0.42, 0.58),
        "type_token_ratio": (0.50, 0.95),
        "avg_sentence_length": (8, 16),
    },
    "B1": {
        "word_count": (130, 360),
        "lexical_density": (0.46, 0.60),
        "type_token_ratio": (0.45, 0.92),
        "avg_sentence_length": (10, 22),
    },
    "B2": {
        # union of types 3 (200-350) / 4 (300-450) / 5 (350-500) at B2 — keep loose to
        # accommodate all three subtypes; the §2 spec table is the authoritative width.
        "word_count": (200, 500),
        "lexical_density": (0.52, 0.66),
        "type_token_ratio": (0.42, 0.95),
        "avg_sentence_length": (14, 30),
    },
    "C1": {
        "word_count": (300, 600),
        "lexical_density": (0.56, 0.74),
        "type_token_ratio": (0.45, 0.90),
        "avg_sentence_length": (16, 32),
    },
    "C2": {
        "word_count": (250, 500),
        "lexical_density": (0.55, 0.78),
        "type_token_ratio": (0.48, 0.90),
        "avg_sentence_length": (18, 36),
    },
}

# Relative slack: a value within 10% of band edges is treated as in-band (warn, not fail).
SLACK = 0.10

# Pattern that splits text into orthographic tokens (drops punctuation, keeps hyphenated words).
TOKEN_RE = re.compile(r"[A-Za-zÀ-ÖØ-öø-ÿŒœ]+(?:[-'][A-Za-zÀ-ÖØ-öø-ÿŒœ]+)*")
SENTENCE_RE = re.compile(r"[.!?…]+\s+|[.!?…]+$")


def _load_stoplist() -> set[str]:
    if not STOPLIST_PATH.exists():
        return set()
    out: set[str] = set()
    for ln in STOPLIST_PATH.read_text(encoding="utf-8").splitlines():
        ln = ln.strip().lower()
        if not ln or ln.startswith("#"):
            continue
        out.add(ln)
    return out


_STOPLIST: set[str] = _load_stoplist()


@dataclass
class DensityMetrics:
    word_count: int
    content_word_count: int
    unique_lemmas: int
    sentence_count: int
    lexical_density: float
    type_token_ratio: float
    avg_sentence_length: float
    extracted_text_chars: int = 0
    warnings: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "word_count": self.word_count,
            "content_word_count": self.content_word_count,
            "unique_lemmas": self.unique_lemmas,
            "sentence_count": self.sentence_count,
            "lexical_density": round(self.lexical_density, 3),
            "type_token_ratio": round(self.type_token_ratio, 3),
            "avg_sentence_length": round(self.avg_sentence_length, 2),
            "extracted_text_chars": self.extracted_text_chars,
            "warnings": self.warnings,
        }


def extract_reading_text(body: str) -> str:
    """Return the prose under '## Texte' (stops at the next H2).

    Reading items put the reader-facing text in ## Texte. Question stems, corrigé,
    vocab harvest, and strategy sections must NOT count toward the density metric
    (they would distort it — the corrigé alone is technical prose). Items without
    a ## Texte block (e.g., index files) return empty text and are skipped by the
    audit walker.
    """
    lines = body.splitlines()
    out: list[str] = []
    capturing = False
    for line in lines:
        s = line.strip().lower()
        if s.startswith("## texte"):
            capturing = True
            continue
        if capturing and line.startswith("## "):
            break
        if capturing:
            # Strip bold/italic + bullet markers but keep the text content.
            cleaned = re.sub(r"^[>\s\-*]+", "", line)
            cleaned = re.sub(r"\*+", "", cleaned)
            cleaned = re.sub(r"\[[^\]]*\]\([^)]*\)", "", cleaned)  # markdown links
            cleaned = re.sub(r"`[^`]*`", "", cleaned)
            cleaned = re.sub(r"<!--.*?-->", "", cleaned)
            out.append(cleaned)
    return "\n".join(out).strip()


def measure(text: str) -> DensityMetrics:
    tokens = [t.lower() for t in TOKEN_RE.findall(text)]
    word_count = len(tokens)
    if word_count == 0:
        return DensityMetrics(0, 0, 0, 0, 0.0, 0.0, 0.0, extracted_text_chars=len(text))
    content_tokens = [t for t in tokens if t not in _STOPLIST and len(t) >= 3]
    content_word_count = len(content_tokens)
    unique_lemmas = len(set(content_tokens))
    # Sentence segmentation: split on sentence-ending punctuation + whitespace.
    parts = [p.strip() for p in SENTENCE_RE.split(text) if p.strip()]
    sentence_count = max(1, len(parts))
    lexical_density = content_word_count / word_count
    type_token_ratio = unique_lemmas / max(1, content_word_count)
    avg_sentence_length = word_count / sentence_count
    return DensityMetrics(
        word_count=word_count,
        content_word_count=content_word_count,
        unique_lemmas=unique_lemmas,
        sentence_count=sentence_count,
        lexical_density=lexical_density,
        type_token_ratio=type_token_ratio,
        avg_sentence_length=avg_sentence_length,
        extracted_text_chars=len(text),
    )


@dataclass
class BandVerdict:
    cefr: str
    metric: str
    value: float
    band: tuple[float, float]
    status: str  # "ok" | "warn" | "fail"

    @property
    def emoji(self) -> str:
        return {"ok": "✓", "warn": "⚠", "fail": "✗"}[self.status]


def verdict(cefr: str, metrics: DensityMetrics) -> list[BandVerdict]:
    bands = BANDS.get(cefr)
    if bands is None:
        return []
    pairs = [
        ("word_count", float(metrics.word_count)),
        ("lexical_density", metrics.lexical_density),
        ("type_token_ratio", metrics.type_token_ratio),
        ("avg_sentence_length", metrics.avg_sentence_length),
    ]
    out: list[BandVerdict] = []
    for name, val in pairs:
        lo, hi = bands[name]
        if lo <= val <= hi:
            status = "ok"
        else:
            # SLACK: treat near-misses as warnings (not fails).
            slack_lo = lo * (1 - SLACK)
            slack_hi = hi * (1 + SLACK)
            status = "warn" if slack_lo <= val <= slack_hi else "fail"
        out.append(BandVerdict(cefr=cefr, metric=name, value=val, band=(lo, hi), status=status))
    return out


def measure_file(path: Path) -> tuple[DensityMetrics, list[BandVerdict], str | None]:
    """Returns (metrics, verdicts, cefr) for a single reading-item file.

    Returns (empty metrics, [], None) if the file has no ## Texte block.
    """
    lc = load_content(path, strict=True)
    text = extract_reading_text(lc.body)
    if not text:
        return DensityMetrics(0, 0, 0, 0, 0.0, 0.0, 0.0), [], None
    metrics = measure(text)
    cefr = lc.fm.cefr.value
    verdicts = verdict(cefr, metrics)
    return metrics, verdicts, cefr


def _cmd_one(path: Path) -> int:
    path = path.resolve()
    metrics, verdicts, cefr = measure_file(path)
    if cefr is None:
        console.print(f"[yellow]{path}: no ## Texte block — skipping.[/]")
        return 0
    payload = {
        "path": str(path.relative_to(REPO_ROOT)),
        "cefr": cefr,
        "metrics": metrics.to_dict(),
        "verdicts": [
            {
                "metric": v.metric,
                "value": round(v.value, 3),
                "band": list(v.band),
                "status": v.status,
            }
            for v in verdicts
        ],
        "overall": "fail" if any(v.status == "fail" for v in verdicts) else
                   "warn" if any(v.status == "warn" for v in verdicts) else "ok",
    }
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 1 if payload["overall"] == "fail" else 0


def _cmd_audit() -> int:
    reading_dir = CONTENT_DIR / "04_reading"
    if not reading_dir.exists():
        console.print("[red]content/04_reading/ does not exist.[/]")
        return 1
    rc = 0
    n_scanned = 0
    n_skipped = 0
    n_ok = 0
    n_warn = 0
    n_fail = 0
    fails: list[str] = []
    warns: list[str] = []
    for path in iter_content_files(reading_dir):
        try:
            metrics, verdicts, cefr = measure_file(path)
        except Exception as err:  # noqa: BLE001
            console.print(f"[red]error: {path}: {err}[/]")
            rc = 1
            continue
        if cefr is None or metrics.word_count == 0:
            n_skipped += 1
            continue
        n_scanned += 1
        overall = ("fail" if any(v.status == "fail" for v in verdicts) else
                   "warn" if any(v.status == "warn" for v in verdicts) else "ok")
        if overall == "fail":
            n_fail += 1
            failed_metrics = [f"{v.metric}={v.value:.2f} (band {v.band[0]}–{v.band[1]})"
                              for v in verdicts if v.status == "fail"]
            fails.append(f"{path.relative_to(REPO_ROOT)} [{cefr}]: {'; '.join(failed_metrics)}")
        elif overall == "warn":
            n_warn += 1
            warned_metrics = [f"{v.metric}={v.value:.2f}"
                              for v in verdicts if v.status == "warn"]
            warns.append(f"{path.relative_to(REPO_ROOT)} [{cefr}]: {'; '.join(warned_metrics)}")
        else:
            n_ok += 1
    console.print(
        f"\n[bold]Density audit:[/] {n_scanned} reading items scanned · "
        f"[green]{n_ok} ok[/] · [yellow]{n_warn} warn[/] · [red]{n_fail} fail[/] "
        f"({n_skipped} skipped — no ## Texte block)"
    )
    if warns:
        console.print("\n[yellow]Warnings (within 10% slack):[/]")
        for w in warns[:20]:
            console.print(f"  ⚠ {w}")
        if len(warns) > 20:
            console.print(f"  … and {len(warns) - 20} more")
    if fails:
        console.print("\n[red]Failures:[/]")
        for f in fails:
            console.print(f"  ✗ {f}")
        rc = 1
    if n_scanned > 0:
        pct_in_spec = (n_ok + n_warn) / n_scanned
        console.print(f"\n[bold]In-spec rate: {pct_in_spec:.1%}[/] "
                      f"(EVAL gate: ≥ 95 %)")
        if pct_in_spec < 0.95 and n_scanned >= 10:
            console.print("[red]Below EVAL gate.[/]")
            rc = 1
    return rc


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--audit", action="store_true", help="Walk content/04_reading/ and audit all items.")
    g.add_argument("path", nargs="?", help="Single file to measure.")
    args = p.parse_args(argv)
    if args.audit:
        return _cmd_audit()
    return _cmd_one(Path(args.path))


if __name__ == "__main__":
    sys.exit(main())

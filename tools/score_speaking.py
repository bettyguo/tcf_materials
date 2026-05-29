"""Auto-scorer for EO transcripts. Per PHASE_6_DESIGN.md §3.2 + tools/scoring_rules.md §EO.

Deterministic metrics on the *transcript* (text-only mode) + optional speech-specific
metrics from a Whisper transcription (audio mode). Transparent threshold-table heuristic.
No ML, no LLM. Output is an estimated NCLC band per criterion + targeted feedback.

Usage:
    # Transcript-only — paste your monologue under '## Réponse' in a markdown file.
    python -m tools.score_speaking drafts/my-monologue.md

    # Score a prompt file's bundled '## Modèle NCLC N — Transcript' blocks.
    python -m tools.score_speaking content/06_speaking/tache2/01_eo-t2-001.md

    # With audio (requires faster-whisper or openai-whisper).
    python -m tools.score_speaking drafts/my-monologue.md --audio recordings/2026-05-28.m4a

    # Calibration — walk the speaking corpus and score each '## Modèle NCLC N — Transcript'
    # block against its labelled band.
    python -m tools.score_speaking --calibrate content/06_speaking/

Architecture:
    - Reuses score_writing.measure_text + score_writing.score_metrics for EO-C1/C2/C3
      (with task-specific threshold relaxations for spoken vs written register).
    - Adds disfluency proxy (fr_disfluencies.yaml) for EO-C4 contrôle phonologique.
    - In audio mode, transcribes via faster-whisper (preferred) or openai-whisper (fallback),
      then computes WPM, pause stats, long-pause count.
    - Calibration mode reuses the same pipeline.

Whisper is OPTIONAL. Without it, EO-C4 is reported as "non évalué en mode texte seul"
unless the user also supplies --reference, in which case the transcript is diff-aligned
against the reference and substitutions are flagged against the phoneme-confusion classes
documented in content/06_speaking/00_anti_error.md.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

from tools._common import REPO_ROOT, console
from tools.score_writing import (
    RubricScore,
    WritingMetrics,
    _band_from_total,
    _bands_match,
    extract_response_blocks,
    measure_text,
    score_metrics,
)

DATA_DIR = REPO_ROOT / "tools" / "data"
DISFLUENCY_PATH = DATA_DIR / "fr_disfluencies.yaml"

# Speaking-pace expectations:
#   T1: candidate alternates with examiner. Net candidate output across 4-5 questions ≈ 100-150
#       words for an NCLC 8 candidate. Use 130 as target with ±35 % tolerance (smaller productions
#       are normal in question format).
#   T2: 3-min monologue @ 130 wpm = 390 words (NCLC 8 baseline). ±25 %.
#   T3: 5-min monologue @ 130 wpm = 650 words. ±25 %.
# These bind the WordCount sanity check; the per-prompt frontmatter `target_words`
# is authoritative when present.
DEFAULT_TARGET_WORDS = {1: 130, 2: 390, 3: 650}
# Per-task length tolerance (used to relax the EE -2 penalty for under-shoot in T1, where
# question format produces wider variance). The EE rule is "ratio < 0.80 → -2".
TASK_UNDERSHOOT_THRESHOLD = {1: 0.60, 2: 0.75, 3: 0.75}

# Speaking-rate windows (words per minute, from Whisper segment timings).
WPM_OK_LOW, WPM_OK_HIGH = 110, 165       # comfortable B2/C1 monologue range
WPM_HESITANT_BELOW = 90                  # under this reads as hesitant
WPM_NERVOUS_ABOVE = 185                  # over this reads as nervous/unintelligible

# Pause thresholds (seconds).
LONG_PAUSE_SECONDS = 1.5
MAX_LONG_PAUSES_OK = 2                   # > this is C4-bad

# Disfluency thresholds (per 100 words).
DISFLUENCY_LOW = 2.0
DISFLUENCY_MID = 4.0
DISFLUENCY_HIGH = 8.0


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

def _load_yaml(path: Path) -> Any:
    if not path.exists():
        return None
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def _load_disfluencies() -> dict[str, list[dict]]:
    raw = _load_yaml(DISFLUENCY_PATH) or {}
    # Normalise: each entry has either `token` or `phrase`; bucket by kind.
    out: dict[str, list[dict]] = {
        "filler": [], "hedge": [], "repair_marker": [],
        "discourse_marker_overuse": [], "quebec_recognition": [],
    }
    bucket_map = {
        "fillers": "filler",
        "hedges": "hedge",
        "repair_markers": "repair_marker",
        "discourse_marker_overuse": "discourse_marker_overuse",
        "quebecois_markers_for_recognition": "quebec_recognition",
    }
    for src, dst in bucket_map.items():
        for e in raw.get(src, []) or []:
            term = (e.get("token") or e.get("phrase") or "").strip().lower()
            if not term:
                continue
            out[dst].append({"term": term, "note": e.get("note", "")})
    return out


# ---------------------------------------------------------------------------
# Speech-specific metrics
# ---------------------------------------------------------------------------

@dataclass
class SpeakingMetrics:
    # Transcript-level (always available)
    disfluency_count: int = 0
    disfluencies_per_100: float = 0.0
    disfluencies_breakdown: dict[str, int] = field(default_factory=dict)
    quebec_marker_count: int = 0
    quebec_markers_seen: list[str] = field(default_factory=list)
    drop_ne_count: int = 0
    # Audio-level (only when --audio was used)
    audio_available: bool = False
    duration_seconds: float | None = None
    words_per_minute: float | None = None
    speech_to_silence_ratio: float | None = None
    long_pause_count: int | None = None
    mean_pause_seconds: float | None = None
    # Reference-diff (when --reference is supplied)
    reference_available: bool = False
    phoneme_confusion_hits: list[dict] = field(default_factory=list)


def _count_phrase_with_boundary(text: str, phrase: str) -> int:
    """Count occurrences of `phrase` in `text` as a word-bounded substring."""
    p = phrase.lower()
    if not p:
        return 0
    if " " in p or "'" in p:
        # Multi-token — boundary on non-letter before/after.
        low = " " + text.lower() + " "
        n = 0
        idx = 0
        while True:
            f = low.find(p, idx)
            if f < 0:
                break
            before = low[f - 1] if f > 0 else " "
            after_idx = f + len(p)
            after = low[after_idx] if after_idx < len(low) else " "
            if not (before.isalpha() or after.isalpha()):
                n += 1
            idx = f + len(p)
        return n
    return len(re.findall(
        rf"(?<![A-Za-zÀ-ÿœ]){re.escape(p)}(?![A-Za-zÀ-ÿœ])",
        text, re.IGNORECASE,
    ))


# Drop-of-ne pattern (familier marker). Examples we want to catch:
#   "je sais pas", "c'est pas mal", "j'ai pas vu"
# We do NOT match the literal "ne ... pas" pattern (those are correct).
# Heuristic: subject pronoun or "c'" / "ç'" followed by a verb form followed by "pas"
# without "ne" / "n'" in between.
DROP_NE_RE = re.compile(
    r"\b(?:je|tu|il|elle|on|nous|vous|ils|elles|c'|ç'|ça|j'ai|t'as|c'est|"
    r"j'sais|j'crois|j'pense)\s+(?!ne\s|n')[a-zàâçéèêëîïôûùüÿœæ'-]+\s+pas\b",
    re.IGNORECASE,
)


def measure_speaking(text: str, *, task: int | None = None) -> SpeakingMetrics:
    """Compute speech-specific metrics on a transcript (no audio required)."""
    m = SpeakingMetrics()
    if not text:
        return m

    disfl = _load_disfluencies()
    breakdown: Counter[str] = Counter()

    for entry in disfl["filler"] + disfl["hedge"] + disfl["repair_marker"] \
            + disfl["discourse_marker_overuse"]:
        n = _count_phrase_with_boundary(text, entry["term"])
        if n:
            breakdown[entry["term"]] = n
            m.disfluency_count += n

    for entry in disfl["quebec_recognition"]:
        n = _count_phrase_with_boundary(text, entry["term"])
        if n:
            m.quebec_marker_count += n
            m.quebec_markers_seen.append(entry["term"])

    m.disfluencies_breakdown = dict(breakdown)
    word_count = len(re.findall(r"[A-Za-zÀ-ÿŒœ]+", text))
    if word_count:
        m.disfluencies_per_100 = m.disfluency_count * 100.0 / word_count

    m.drop_ne_count = len(DROP_NE_RE.findall(text))
    return m


# ---------------------------------------------------------------------------
# EO-C4 scoring (the speaking-specific criterion)
# ---------------------------------------------------------------------------

def score_c1_speaking(
    wm: WritingMetrics, *, task: int | None, target_words: int | None,
) -> tuple[int, list[str]]:
    """Speaking-specific EO-C1 (efficacité communicative).

    The EE C1 logic in score_writing._c1_score penalises missing letter-style salutations
    on T1, which is correct for written T1 but wrong for spoken T1 (which is a sequence
    of questions, not a letter). We re-implement here with looser undershoot tolerance
    and no greeting/closing penalty.
    """
    feedback: list[str] = []
    score = 5
    if target_words:
        ratio = wm.word_count / target_words
        thr = TASK_UNDERSHOOT_THRESHOLD.get(task or 0, 0.75)
        if ratio < thr:
            score -= 2
            feedback.append(f"Production sous-dimensionnée ({wm.word_count} mots ; cible {target_words}). "
                            "Étoffer chaque section ou enchaîner les questions/arguments.")
        elif task == 1 and ratio > 1.60:
            # T1 too long → candidate not letting examiner respond.
            score -= 1
            feedback.append(f"Production sur-dimensionnée pour T1 ({wm.word_count} mots, cible ≈ {target_words}). "
                            "Laisser l'examinateur répondre entre les questions.")
        elif task in (2, 3) and ratio > 1.30:
            score -= 1
            feedback.append(f"Production sur-dimensionnée ({wm.word_count} mots ; cible {target_words}). "
                            "Resserrer le développement pour tenir le timer.")
    return max(0, min(5, score)), feedback


def score_c4_phonological(
    sm: SpeakingMetrics, *, task: int | None,
) -> tuple[int, bool, list[str]]:
    """Return (score 0–5, evaluable, feedback).

    When `evaluable` is False, the criterion was not reliably scorable
    (e.g., transcript-only mode without enough signal). In that case the
    caller surfaces the criterion as "non évalué" rather than reporting a
    deceptive number.
    """
    feedback: list[str] = []
    # Without audio we can still partially score C4 from the transcript
    # via disfluency density + drop-of-ne in T3 + quebec slip in T3.
    score = 5
    evaluable = True

    if sm.audio_available:
        # Audio path — pacing dominates.
        wpm = sm.words_per_minute or 0
        if wpm < WPM_HESITANT_BELOW:
            score -= 2
            feedback.append(f"Débit hésitant ({wpm:.0f} mots/min ; cible 110–165). "
                            "S'enregistrer en relisant un modèle NCLC 8 pour ancrer le rythme.")
        elif wpm > WPM_NERVOUS_ABOVE:
            score -= 2
            feedback.append(f"Débit nerveux ({wpm:.0f} mots/min ; cible 110–165). "
                            "Marquer les groupes rythmiques en respirant.")
        elif not (WPM_OK_LOW <= wpm <= WPM_OK_HIGH):
            score -= 1
            feedback.append(f"Débit hors-zone confort ({wpm:.0f} mots/min ; cible 110–165).")
        if (sm.long_pause_count or 0) > MAX_LONG_PAUSES_OK:
            score -= 1
            feedback.append(f"{sm.long_pause_count} pauses longues (> {LONG_PAUSE_SECONDS:.1f} s). "
                            "Préparer 3 phrases-relances pour combler les blancs.")
        if sm.phoneme_confusion_hits:
            score -= 1
            top = ", ".join(h.get("class", "?") for h in sm.phoneme_confusion_hits[:3])
            feedback.append(f"Confusions phonémiques détectées (référence-diff) : {top}. "
                            "Voir [00_phonology/01_vocalique.md].")

    # Disfluency density (both modes)
    if sm.disfluencies_per_100 >= DISFLUENCY_HIGH:
        score -= 2
        feedback.append(f"Fillers très fréquents ({sm.disfluencies_per_100:.1f}/100 mots). "
                        "Cible NCLC 8 : < 4/100.")
    elif sm.disfluencies_per_100 >= DISFLUENCY_MID:
        score -= 1
        feedback.append(f"Fillers nombreux ({sm.disfluencies_per_100:.1f}/100 mots). "
                        "Cible NCLC 8 : < 4/100.")

    # T3-specific register checks
    if task == 3:
        if sm.drop_ne_count >= 2:
            score -= 1
            feedback.append(f"{sm.drop_ne_count} omissions du *ne* négatif détectées en T3 (formel) "
                            "— rupture de registre. Voir [00_anti_error.md §R2].")
        if sm.quebec_marker_count:
            score -= 1
            feedback.append(f"Marqueurs québécois en T3 (formel) : "
                            f"{', '.join(sm.quebec_markers_seen[:3])}. "
                            "TCF Canada EE/EO est scoré sur français neutre.")

    if not sm.audio_available and sm.disfluencies_per_100 == 0 and sm.drop_ne_count == 0:
        # Mode texte seul, métriques toutes nulles → on ne peut rien dire.
        evaluable = False
        feedback.append("C4 non évalué en mode texte seul (aucun signal de disfluence). "
                        "Utiliser --audio pour évaluer la prononciation.")

    # In transcript-only mode, cap C4 at 4: even a clean transcript can't *prove*
    # NCLC 10 phonology without audio. This corrects an over-credit pattern observed
    # on the pilot calibration (PHASE_6_AUDIT.md §10).
    if not sm.audio_available and evaluable:
        score = min(score, 4)
        if score == 4:
            feedback.append("C4 plafonné à 4 en mode texte seul. Avec audio + référence, "
                            "le ceiling à 5 est accessible.")

    return max(0, min(5, score)), evaluable, feedback


# ---------------------------------------------------------------------------
# Whisper integration (optional)
# ---------------------------------------------------------------------------

@dataclass
class WhisperResult:
    text: str
    segments: list[dict]      # {start, end, text}
    duration: float

    @classmethod
    def empty(cls) -> WhisperResult:
        return cls(text="", segments=[], duration=0.0)


def _whisper_model_name() -> str:
    return os.environ.get("TCF_WHISPER_MODEL", "small")


def transcribe_audio(audio_path: Path) -> WhisperResult | None:
    """Return WhisperResult or None if no backend is available.

    Tries faster-whisper first (preferred — 4x faster on CPU); falls back to
    openai-whisper. The caller decides what to do when None is returned (we
    print a helpful install message at the CLI layer).
    """
    model_size = _whisper_model_name()
    # Try faster-whisper.
    try:
        from faster_whisper import WhisperModel  # type: ignore[import-not-found]
    except ImportError:
        pass
    else:
        model = WhisperModel(model_size, compute_type="int8")
        segments_iter, info = model.transcribe(
            str(audio_path), language="fr", word_timestamps=False, beam_size=5,
        )
        segs: list[dict] = []
        text_parts: list[str] = []
        for s in segments_iter:
            segs.append({"start": float(s.start), "end": float(s.end), "text": s.text})
            text_parts.append(s.text)
        return WhisperResult(
            text=" ".join(p.strip() for p in text_parts),
            segments=segs,
            duration=float(info.duration),
        )

    # Try openai-whisper.
    try:
        import whisper  # type: ignore[import-not-found]
    except ImportError:
        return None
    model = whisper.load_model(model_size)
    res = model.transcribe(str(audio_path), language="fr", word_timestamps=False)
    segs = [
        {"start": float(s["start"]), "end": float(s["end"]), "text": s["text"]}
        for s in res.get("segments", [])
    ]
    duration = segs[-1]["end"] if segs else 0.0
    return WhisperResult(text=res.get("text", "").strip(), segments=segs, duration=duration)


def compute_speech_metrics_from_whisper(w: WhisperResult, sm: SpeakingMetrics) -> None:
    """Mutate `sm` with audio-derived metrics."""
    sm.audio_available = True
    sm.duration_seconds = w.duration or None
    word_count = len(re.findall(r"[A-Za-zÀ-ÿŒœ]+", w.text))
    if w.duration and w.duration > 0 and word_count:
        sm.words_per_minute = word_count * 60.0 / w.duration
    # Inter-segment pauses (approximation — not silent-segment detection).
    pauses: list[float] = []
    for a, b in zip(w.segments, w.segments[1:], strict=False):
        gap = max(0.0, float(b["start"]) - float(a["end"]))
        if gap > 0.05:
            pauses.append(gap)
    if pauses:
        sm.long_pause_count = sum(1 for g in pauses if g >= LONG_PAUSE_SECONDS)
        sm.mean_pause_seconds = sum(pauses) / len(pauses)
        if w.duration:
            total_silence = sum(pauses)
            speech = max(0.0, w.duration - total_silence)
            sm.speech_to_silence_ratio = speech / max(0.001, total_silence)
    else:
        sm.long_pause_count = 0
        sm.mean_pause_seconds = 0.0


# ---------------------------------------------------------------------------
# Reference-diff phoneme-confusion classes (cheap heuristic without IPA align)
# ---------------------------------------------------------------------------

# Map a small set of "if Whisper transcribes X where reference has Y, the speaker
# likely confused phoneme class Z". This is a coarse first-pass; the eight
# phonology units expand this on a per-vowel basis.
PHONEME_CLASSES = [
    {"class": "/ø/ vs /o/",   "examples": [("cheveu", "chevaux"), ("peu", "pot")]},
    {"class": "/ø/ vs /œ/",   "examples": [("jeûne", "jeune"), ("peu", "peur")]},
    {"class": "/e/ vs /ɛ/",   "examples": [("été", "était"), ("fée", "faix")]},
    {"class": "/u/ vs /y/",   "examples": [("tout", "tu"), ("vous", "vu")]},
    {"class": "/ɑ̃/ vs /ɔ̃/", "examples": [("blanc", "blond"), ("temps", "thon")]},
    {"class": "/ɛ̃/ vs /ɑ̃/", "examples": [("vin", "vent"), ("fin", "fend")]},
    {"class": "/b/ vs /p/",   "examples": [("bain", "pain"), ("bois", "pois")]},
    {"class": "/d/ vs /t/",   "examples": [("dent", "tente"), ("don", "ton")]},
]


def diff_align_for_phoneme_hints(transcript: str, reference: str) -> list[dict]:
    """Very cheap reference-diff: word-set substitutions matching known classes."""
    if not transcript or not reference:
        return []
    t_tokens = re.findall(r"[a-zàâçéèêëîïôûùüÿœæ'-]+", transcript.lower())
    r_tokens = re.findall(r"[a-zàâçéèêëîïôûùüÿœæ'-]+", reference.lower())
    t_set = set(t_tokens)
    r_set = set(r_tokens)
    hits: list[dict] = []
    for cls in PHONEME_CLASSES:
        for w1, w2 in cls["examples"]:
            # Either substitution direction signals a possible confusion.
            if (w1 in t_set and w2 in r_set and w1 not in r_set) or \
               (w2 in t_set and w1 in r_set and w2 not in t_set):
                hits.append({"class": cls["class"], "saw": w1 if w1 in t_set else w2,
                             "expected": w2 if w1 in t_set else w1})
                break
    return hits


# ---------------------------------------------------------------------------
# Report rendering
# ---------------------------------------------------------------------------

def render_speaking_report(
    wm: WritingMetrics,
    sm: SpeakingMetrics,
    rubric: RubricScore,
    c4_score: int,
    c4_evaluable: bool,
    feedback_text: list[str],
    feedback_speech: list[str],
    *,
    label: str = "",
    mode: str,
) -> str:
    lines: list[str] = []
    if label:
        lines.append(f"=== {label} ===")
    lines.append(f"[mode : {mode}]")
    lines.append("")
    lines.append("Métriques (texte) :")
    lines.append(f"  mots               : {wm.word_count}")
    lines.append(f"  phrases            : {wm.sentence_count}")
    lines.append(f"  longueur moyenne   : {wm.avg_sentence_length:.1f}")
    lines.append(f"  TTR                : {wm.type_token_ratio:.3f}")
    lines.append(f"  connecteurs        : {wm.distinct_connectors}")
    lines.append(f"  temps détectés     : {', '.join(sorted(set(wm.tense_inventory))) or '—'}")
    lines.append(f"  subordination/phr  : {wm.subordination_rate:.2f}")
    lines.append(f"  pivots utilisés    : {len(wm.pivot_phrases_used)}")
    lines.append(f"  répétitions        : {len(wm.repetition_flags)}")
    lines.append("")
    lines.append("Métriques (parole) :")
    lines.append(f"  fillers/100 mots   : {sm.disfluencies_per_100:.1f} "
                 f"(brut : {sm.disfluency_count})")
    if sm.drop_ne_count:
        lines.append(f"  *ne* omis          : {sm.drop_ne_count}")
    if sm.quebec_marker_count:
        lines.append(f"  marqueurs Québec   : {sm.quebec_marker_count} "
                     f"({', '.join(sm.quebec_markers_seen[:5])})")
    if sm.audio_available:
        lines.append(f"  durée audio        : {sm.duration_seconds:.1f} s"
                     if sm.duration_seconds else "  durée audio        : ?")
        lines.append(f"  débit              : {sm.words_per_minute:.0f} mots/min"
                     if sm.words_per_minute else "  débit              : ?")
        lines.append(f"  pauses longues     : {sm.long_pause_count or 0}")
        if sm.speech_to_silence_ratio is not None:
            lines.append(f"  ratio parole/silence : {sm.speech_to_silence_ratio:.1f}")
    else:
        lines.append("  (audio non fourni — métriques phonologiques limitées)")
    lines.append("")
    lines.append("Bandes (heuristique — pas un score d'examen) :")
    lines.append(f"  EO-C1 efficacité   : {rubric.c1}/5")
    lines.append(f"  EO-C2 lexique      : {rubric.c2}/5")
    lines.append(f"  EO-C3 morphosyntaxe: {rubric.c4}/5")  # reused score
    if c4_evaluable:
        lines.append(f"  EO-C4 phonologie   : {c4_score}/5")
        total = rubric.c1 + rubric.c2 + rubric.c4 + c4_score
    else:
        lines.append("  EO-C4 phonologie   : non évalué (voir retours)")
        # Conservative total: project the other 3 onto a /20 scale.
        avg_other = (rubric.c1 + rubric.c2 + rubric.c4) / 3.0
        total = round((rubric.c1 + rubric.c2 + rubric.c4) + avg_other)
    band = _band_from_total(total)
    lines.append(f"  total              : {total}/20  →  {band}"
                 + ("" if c4_evaluable else "  (estimation projetée)"))
    if feedback_text or feedback_speech:
        lines.append("")
        lines.append("Retours ciblés :")
        for f in feedback_text + feedback_speech:
            lines.append(f"  • {f}")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Block extraction (speaking files use "Modèle NCLC N — Transcript")
# ---------------------------------------------------------------------------

# Accept both "## Réponse" (learner draft) and "## Modèle NCLC N — Transcript"
# (bundled model in a prompt file). We delegate to score_writing.extract_response_blocks
# but also accept the speaking-specific header variant.
SPEAKING_MODEL_RE = re.compile(
    r"^##\s+Modèle\s+NCLC\s+\d+(?:\s*[—-]\s*Transcript)?",
    re.IGNORECASE,
)


def extract_speaking_blocks(body: str) -> list[tuple[str, str]]:
    """Return (label, transcript) for every Réponse / Modèle NCLC N (— Transcript) block."""
    blocks = extract_response_blocks(body)
    if blocks:
        return blocks
    # Fallback: explicit "## Modèle NCLC N — Transcript" — extract_response_blocks already
    # handles the shorter form, but the dash variant could be missed. Re-scan.
    lines = body.splitlines()
    out: list[tuple[str, str]] = []
    label: str | None = None
    buf: list[str] = []
    for line in lines:
        if line.startswith("## "):
            if label is not None:
                txt = "\n".join(buf).strip()
                if txt:
                    out.append((label, txt))
            if SPEAKING_MODEL_RE.match(line):
                label = line[3:].strip()
                buf = []
            else:
                label = None
                buf = []
            continue
        if label is not None:
            buf.append(line)
    if label is not None:
        txt = "\n".join(buf).strip()
        if txt:
            out.append((label, txt))
    return out


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def _read_meta(path: Path) -> tuple[str, int | None, int | None]:
    import frontmatter
    post = frontmatter.load(path)
    task = post.metadata.get("task")
    target = post.metadata.get("target_words")
    try:
        task = int(task) if task is not None else None
    except (TypeError, ValueError):
        task = None
    try:
        target = int(target) if target is not None else None
    except (TypeError, ValueError):
        target = None
    return post.content, task, target


def score_one(
    path: Path,
    *,
    audio: Path | None = None,
    reference: Path | None = None,
    as_json: bool = False,
) -> int:
    body, task, target = _read_meta(path)
    blocks = extract_speaking_blocks(body)
    if not blocks:
        console.print(f"[yellow]{path}: no '## Réponse' or '## Modèle NCLC N' block found.[/]")
        return 0
    if target is None and task is not None:
        target = DEFAULT_TARGET_WORDS.get(task)

    mode = "audio + texte" if audio else "texte seul"
    if not as_json:
        console.print(
            "[bold]Score speaking[/] · "
            "[dim]estimation heuristique — pas un score d'examen[/]\n"
        )
    payload: list[dict] = []

    for label, transcript_or_response in blocks:
        wm = measure_text(transcript_or_response, task=task)
        # We compute the EE rubric only to reuse C2 (cohérence) and C4 (morphosyntaxe).
        # C1 is replaced by the EO-specific score (skipping letter-salutation logic).
        rubric = score_metrics(wm, target_words=target, task=task)
        sm = measure_speaking(transcript_or_response, task=task)

        # Audio path: transcribe, replace transcript metrics with Whisper output for
        # the speech-specific stats, but keep the original text metrics (we trust the
        # author's transcript more than Whisper for lexical/morphosyntactic features).
        if audio:
            wr = transcribe_audio(audio)
            if wr is None:
                console.print(
                    "[yellow]Whisper non installé.[/] "
                    "Installer : [bold]pip install faster-whisper[/] "
                    "(ou [bold]pip install openai-whisper[/]). "
                    "Mode texte seul utilisé pour ce passage.\n"
                )
            else:
                compute_speech_metrics_from_whisper(wr, sm)
                if reference is not None and reference.exists():
                    ref_body, _, _ = _read_meta(reference)
                    sm.phoneme_confusion_hits = diff_align_for_phoneme_hints(wr.text, ref_body)
                    sm.reference_available = True

        # EO-C1 — speaking-specific (replaces EE C1 which has letter-salutation logic).
        c1_score, c1_fb = score_c1_speaking(wm, task=task, target_words=target)
        # Replace rubric.c1 (so the report shows our value).
        rubric.c1 = c1_score
        # EO-C4 — phonological control.
        c4_score, c4_eval, c4_fb = score_c4_phonological(sm, task=task)

        # Text-based feedback from the EE pipeline (relabelled).
        from tools.score_writing import build_feedback
        text_fb = build_feedback(wm, rubric, target_words=target, task=task)
        # Filter out EE-specific tips that don't apply to EO (T1 greetings/closings,
        # the EE length tip which we already emitted via c1_fb).
        text_fb = [f for f in text_fb
                   if "formule d'appel" not in f
                   and "formule de clôture" not in f
                   and "Longueur insuffisante" not in f
                   and "Longueur excessive" not in f
                   and "mélange tu/vous" not in f]

        report = render_speaking_report(
            wm, sm, rubric, c4_score, c4_eval, text_fb, c1_fb + c4_fb,
            label=label, mode=mode,
        )

        if as_json:
            total = (rubric.c1 + rubric.c2 + rubric.c4 + (c4_score if c4_eval else 0))
            payload.append({
                "label": label,
                "mode": mode,
                "metrics": {
                    "word_count": wm.word_count,
                    "sentence_count": wm.sentence_count,
                    "avg_sentence_length": round(wm.avg_sentence_length, 2),
                    "type_token_ratio": round(wm.type_token_ratio, 3),
                    "distinct_connectors": wm.distinct_connectors,
                    "tense_inventory": sorted(set(wm.tense_inventory)),
                    "subordination_rate": round(wm.subordination_rate, 2),
                    "pivot_phrases_used": len(wm.pivot_phrases_used),
                    "disfluencies_per_100": round(sm.disfluencies_per_100, 2),
                    "drop_ne_count": sm.drop_ne_count,
                    "quebec_marker_count": sm.quebec_marker_count,
                    "words_per_minute": (round(sm.words_per_minute, 1)
                                          if sm.words_per_minute else None),
                    "long_pause_count": sm.long_pause_count,
                },
                "score": {
                    "c1_efficacite": rubric.c1,
                    "c2_lexique": rubric.c2,
                    "c3_morphosyntaxe": rubric.c4,
                    "c4_phonologie": c4_score if c4_eval else None,
                    "c4_evaluable": c4_eval,
                    "total_sur_20": total,
                    "bande_nclc": _band_from_total(total),
                },
                "feedback": text_fb + c1_fb + c4_fb,
            })
        else:
            console.print(report)
            console.print("")

    if as_json:
        print(json.dumps(payload, ensure_ascii=False, indent=2))

    return 0


def calibrate(root: Path) -> int:
    """Walk model-transcript blocks, compare heuristic band to labeled band, report.

    Per spec §8 the gate is ≥ 75 % (speech noisier than writing).
    """
    import frontmatter
    label_to_band = {
        "modèle nclc 6":  "NCLC 6",
        "modèle nclc 8":  "NCLC 7-8",
        "modèle nclc 10": "NCLC 10",
    }
    n_total = 0
    n_match = 0
    per_label: Counter[str] = Counter()
    per_label_match: Counter[str] = Counter()
    misses: list[str] = []
    for path in sorted(root.rglob("*.md")):
        rel = path.relative_to(root)
        if any(part.startswith("_") for part in rel.parts):
            continue
        try:
            post = frontmatter.load(path)
        except Exception:  # noqa: BLE001
            continue
        if post.metadata.get("section") != "speaking":
            continue
        task = post.metadata.get("task")
        target = post.metadata.get("target_words")
        try:
            task = int(task) if task is not None else None
        except (TypeError, ValueError):
            task = None
        try:
            target = int(target) if target is not None else None
        except (TypeError, ValueError):
            target = None
        if target is None and task is not None:
            target = DEFAULT_TARGET_WORDS.get(task)
        blocks = extract_speaking_blocks(post.content)
        for label, transcript in blocks:
            key = label.lower().strip()
            expected = next(
                (band for prefix, band in label_to_band.items() if key.startswith(prefix)),
                None,
            )
            if expected is None:
                continue
            wm = measure_text(transcript, task=task)
            rubric = score_metrics(wm, target_words=target, task=task)
            sm = measure_speaking(transcript, task=task)
            # EO-C1 speaking-specific replaces EE C1.
            c1_score, _ = score_c1_speaking(wm, task=task, target_words=target)
            rubric.c1 = c1_score
            c4_score, c4_eval, _ = score_c4_phonological(sm, task=task)
            if c4_eval:
                total = rubric.c1 + rubric.c2 + rubric.c4 + c4_score
            else:
                avg_other = (rubric.c1 + rubric.c2 + rubric.c4) / 3.0
                total = round((rubric.c1 + rubric.c2 + rubric.c4) + avg_other)
            heuristic_band = _band_from_total(total)
            n_total += 1
            per_label[expected] += 1
            if _bands_match(heuristic_band, expected):
                n_match += 1
                per_label_match[expected] += 1
            else:
                misses.append(f"{path.name} :: {label} → heuristique {heuristic_band} "
                              f"(attendu {expected}) [total {total}/20]")
    if n_total == 0:
        console.print("[yellow]Aucun bloc de modèle trouvé.[/]")
        return 0
    overall = n_match / n_total
    console.print(f"[bold]Calibration[/] : {n_match}/{n_total} = {overall:.1%}")
    for label in ("NCLC 6", "NCLC 7-8", "NCLC 10"):
        n = per_label[label]
        if n == 0:
            continue
        match = per_label_match[label]
        console.print(f"  {label}: {match}/{n} ({match / n:.1%})")
    if overall < 0.75:
        console.print("[red]Calibration < 75 % — ajuster les seuils dans "
                      "tools/scoring_rules.md §EO.[/]")
        if misses:
            console.print("\n[yellow]Premiers écarts :[/]")
            for line in misses[:15]:
                console.print(f"  • {line}")
        return 1
    console.print("[green]Calibration ≥ 75 % (cible spec §8).[/]")
    return 0


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("path", nargs="?", help="Markdown file (transcript or prompt with bundled models).")
    p.add_argument("--audio", default=None,
                   help="Path to recording (.m4a/.wav/.mp3). Requires faster-whisper or openai-whisper.")
    p.add_argument("--reference", default=None,
                   help="Prompt file used as phoneme-confusion reference (must have model transcript).")
    p.add_argument("--calibrate", action="store_true",
                   help="Walk PATH and score each '## Modèle NCLC N — Transcript' block against label.")
    p.add_argument("--json", action="store_true", help="Emit JSON for one file.")
    args = p.parse_args(argv)

    if args.calibrate:
        target = Path(args.path) if args.path else REPO_ROOT / "content" / "06_speaking"
        return calibrate(target)

    if not args.path:
        # Backward-compatible Phase-1 behaviour: print the rubric pointer.
        from tools._common import console as c
        c.print(
            "[bold]Score speaking[/] — usage :\n"
            "  python -m tools.score_speaking <fichier.md>                       # texte seul\n"
            "  python -m tools.score_speaking <fichier.md> --audio recording.m4a # audio + texte\n"
            "  python -m tools.score_speaking --calibrate content/06_speaking/\n\n"
            "Le fichier doit contenir un bloc '## Réponse' ou '## Modèle NCLC N — Transcript'.\n"
            "La grille opérationnalisée : [bold]content/06_speaking/00_rubric.md[/]."
        )
        return 0

    path = Path(args.path)
    if not path.exists():
        console.print(f"[red]{path}: not found.[/]")
        return 2
    audio_path = Path(args.audio) if args.audio else None
    if audio_path is not None and not audio_path.exists():
        console.print(f"[red]{audio_path}: audio file not found.[/]")
        return 2
    reference_path = Path(args.reference) if args.reference else None
    return score_one(path, audio=audio_path, reference=reference_path, as_json=args.json)


if __name__ == "__main__":
    sys.exit(main())

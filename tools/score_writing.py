"""Auto-scorer for EE drafts. Per PHASE_5_DESIGN.md §3.2 + tools/scoring_rules.md.

Deterministic metrics + transparent threshold-table heuristic. No ML, no LLM.
The output is an estimated NCLC band + targeted feedback per criterion, not a
substitute for examiner judgment.

Usage:
    python -m tools.score_writing drafts/my-draft.md
    python -m tools.score_writing content/05_writing/tache3/01_ee-t3-001.md
    python -m tools.score_writing --calibrate content/05_writing/
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

from tools._common import REPO_ROOT, console
from tools.measure_density import _STOPLIST, SENTENCE_RE, TOKEN_RE

DATA_DIR = REPO_ROOT / "tools" / "data"
CONNECTORS_PATH = DATA_DIR / "fr_connectors.yaml"
TENSE_PATH = DATA_DIR / "fr_tense_markers.yaml"
PIVOTS_PATH = DATA_DIR / "fr_pivot_phrases.yaml"
ANGLICISMS_PATH = REPO_ROOT / "tools" / "anglicisms.yaml"

# Subordinating conjunctions + relative pronouns — for subordination-rate metric.
SUBORDINATORS = [
    "que", "qui", "qu'", "quand", "lorsque", "lorsqu'",
    "parce que", "puisque", "puisqu'", "bien que", "alors que", "alors qu'",
    "tandis que", "tandis qu'", "dès que", "dès qu'", "afin que", "pour que",
    "à condition que", "à moins que", "à moins qu'", "avant que", "avant qu'",
    "jusqu'à ce que", "quoique", "quoiqu'", "sans que", "sans qu'",
    "dont", "où", "lequel", "laquelle", "lesquels", "lesquelles",
    "si", "comme", "dans la mesure où",
]
# Stylistic-inversion patterns — soutenu C1 signal.
# "aussi est-il…", "sans doute peut-on…", "à peine eût-il…", "ainsi est-elle…"
INVERSION_PATTERNS = [
    r"\b(?:aussi|ainsi|sans doute|à peine|peut-être|encore|du moins)\s+"
    r"(?:est|sont|a|ont|était|étaient|fut|furent|sera|seront|serait|seraient|"
    r"peut|puisse|peuvent|peut-on|ai-je|ais-je|saurais-je|aurais-je|"
    r"avais-je|fut-il|fût-il|tenais-je)\b",
    # subject-verb inversion with hyphen after the verb: "vous saurais-je",
    # "tenais-je", "prierais-je", etc.
    r"\b(?:tenais|prierais|saurais|aurais|voudrais|saurai|pourrai)-(?:je|tu)\b",
]


# Greeting and closing salutations — for T1 register check.
T1_GREETINGS = [
    "madame", "monsieur", "messieurs", "mesdames", "mesdemoiselles",
    "cher", "chère", "chers", "chères",
    "bonjour", "bonsoir", "salut",
]
T1_CLOSINGS = [
    "cordialement", "bien à vous", "bien cordialement",
    "sincèrement", "sincèrement vôtre",
    "je vous prie d'agréer", "veuillez agréer", "veuillez recevoir",
    "à bientôt", "amicalement",
    "respectueusement", "respectueux", "respectueuse",
    "salutations distinguées",
    "ma gratitude", "avec ma reconnaissance", "ma reconnaissance",
    "sentiments les plus", "sentiments distingués", "sentiments respectueux",
    "à très vite", "à très bientôt",
    "bien à toi", "à toi", "tendrement",
]
T1_INFORMAL_MARKERS = [
    " tu ", " ton ", " ta ", " tes ", " toi ",
]
T1_FORMAL_MARKERS = [
    " vous ", " votre ", " vos ",
]


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

def _load_yaml(path: Path) -> Any:
    if not path.exists():
        return None
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def _load_connectors() -> dict[str, list[dict]]:
    return _load_yaml(CONNECTORS_PATH) or {}


def _load_tense_markers() -> dict[str, list[dict]]:
    return _load_yaml(TENSE_PATH) or {}


def _load_pivots() -> dict[str, list[dict]]:
    return _load_yaml(PIVOTS_PATH) or {}


def _load_anglicisms() -> list[dict]:
    return _load_yaml(ANGLICISMS_PATH) or []


# ---------------------------------------------------------------------------
# Text extraction
# ---------------------------------------------------------------------------

# Draft files (learner's own attempts) have ## Réponse.
# Model-answer files have ## Modèle NCLC X.
# Prompt files contain multiple ## Modèle NCLC X — when scoring a prompt
# directly we extract each model separately.
RESPONSE_HEADER_RE = re.compile(r"^##\s+(?:Réponse|Modèle\s+NCLC\s+\d+)", re.IGNORECASE)


def extract_response_blocks(body: str) -> list[tuple[str, str]]:
    """Return list of (label, text) for every ## Réponse or ## Modèle NCLC N block.

    Stops each block at the next H2.
    """
    lines = body.splitlines()
    blocks: list[tuple[str, str]] = []
    label: str | None = None
    buf: list[str] = []
    for line in lines:
        if line.startswith("## "):
            if label is not None:
                blocks.append((label, _clean_block("\n".join(buf))))
            if RESPONSE_HEADER_RE.match(line):
                label = line[3:].strip()
                buf = []
            else:
                label = None
                buf = []
            continue
        if label is not None:
            buf.append(line)
    if label is not None:
        blocks.append((label, _clean_block("\n".join(buf))))
    return [(lbl, txt) for lbl, txt in blocks if txt]


def _clean_block(text: str) -> str:
    # Drop markdown links, inline code, HTML comments, leading list markers.
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"`[^`]*`", "", text)
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)
    # Strip leading bullet/blockquote markers per line, keep prose.
    out = []
    for line in text.splitlines():
        cleaned = re.sub(r"^[>\s]*[-*+]\s+", "", line)
        cleaned = re.sub(r"\*+", "", cleaned)
        out.append(cleaned)
    return "\n".join(out).strip()


# ---------------------------------------------------------------------------
# Metrics
# ---------------------------------------------------------------------------

@dataclass
class WritingMetrics:
    word_count: int = 0
    sentence_count: int = 0
    avg_sentence_length: float = 0.0
    max_sentence_length: int = 0
    min_sentence_length: int = 0
    paragraph_count: int = 0
    content_word_count: int = 0
    unique_lemmas: int = 0
    type_token_ratio: float = 0.0
    connectors_by_band: dict[str, list[str]] = field(default_factory=dict)
    distinct_connectors: int = 0
    tense_inventory: list[str] = field(default_factory=list)
    subordination_rate: float = 0.0
    repetition_flags: list[tuple[str, int]] = field(default_factory=list)
    anglicism_flags: list[dict] = field(default_factory=list)
    pivot_phrases_used: list[dict] = field(default_factory=list)
    pivot_c1_count: int = 0
    inversion_count: int = 0
    spell_errors: int | None = None
    has_greeting: bool = False
    has_closing: bool = False
    register_mixed_tu_vous: bool = False
    raw_text_chars: int = 0


def measure_text(text: str, *, task: int | None = None) -> WritingMetrics:
    """Run the full metric pipeline on a single response block."""
    m = WritingMetrics(raw_text_chars=len(text))
    if not text:
        return m

    tokens = [t.lower() for t in TOKEN_RE.findall(text)]
    m.word_count = len(tokens)
    if m.word_count == 0:
        return m

    # Sentences
    parts = [p.strip() for p in SENTENCE_RE.split(text) if p.strip()]
    m.sentence_count = max(1, len(parts))
    sentence_lengths = [len(TOKEN_RE.findall(p)) for p in parts]
    m.avg_sentence_length = m.word_count / m.sentence_count
    m.max_sentence_length = max(sentence_lengths) if sentence_lengths else 0
    m.min_sentence_length = min(sentence_lengths) if sentence_lengths else 0

    # Paragraphs
    m.paragraph_count = sum(1 for p in text.split("\n\n") if p.strip())

    # Content words / TTR
    content_tokens = [t for t in tokens if t not in _STOPLIST and len(t) >= 3]
    m.content_word_count = len(content_tokens)
    m.unique_lemmas = len(set(content_tokens))
    m.type_token_ratio = m.unique_lemmas / max(1, m.content_word_count)

    # Connectors
    m.connectors_by_band = _detect_connectors(text)
    m.distinct_connectors = sum(len(set(v)) for v in m.connectors_by_band.values())

    # Tenses
    m.tense_inventory = _detect_tenses(text)

    # Subordination
    m.subordination_rate = _subordination_rate(text, m.sentence_count)

    # Repetition (lemma + 30-word window)
    m.repetition_flags = _detect_repetition(content_tokens, window=30)

    # Anglicisms
    m.anglicism_flags = _detect_anglicisms(text)

    # Pivot phrases
    m.pivot_phrases_used = _detect_pivots(text)
    m.pivot_c1_count = sum(1 for p in m.pivot_phrases_used if p.get("cefr") == "C1")

    # Stylistic inversions (soutenu C1)
    m.inversion_count = sum(
        len(re.findall(pat, text, re.IGNORECASE))
        for pat in INVERSION_PATTERNS
    )

    # Spell check (shell out to hunspell)
    m.spell_errors = _spell_count(text)

    # T1-specific signals
    if task == 1:
        low = " " + text.lower() + " "
        m.has_greeting = any(g in low for g in T1_GREETINGS)
        m.has_closing = any(c in low for c in T1_CLOSINGS)
        has_tu = any(mk in low for mk in T1_INFORMAL_MARKERS)
        has_vous = any(mk in low for mk in T1_FORMAL_MARKERS)
        m.register_mixed_tu_vous = has_tu and has_vous

    return m


def _detect_connectors(text: str) -> dict[str, list[str]]:
    """Return {band: [matched phrases]}."""
    low = " " + text.lower() + " "
    out: dict[str, list[str]] = {}
    for band, items in _load_connectors().items():
        matched: list[str] = []
        for it in items:
            phrase = it["phrase"]
            if _phrase_present(low, phrase):
                matched.append(phrase)
        out[band] = matched
    return out


def _phrase_present(text_with_padding: str, phrase: str) -> bool:
    """Substring + word-boundary heuristic."""
    p = phrase.lower()
    if " " in p:
        # multi-word — require it bounded by non-letter on each side
        idx = text_with_padding.find(p)
        if idx < 0:
            return False
        before = text_with_padding[idx - 1] if idx > 0 else " "
        after_idx = idx + len(p)
        after = text_with_padding[after_idx] if after_idx < len(text_with_padding) else " "
        return not (before.isalpha() or after.isalpha())
    # single word — boundary regex
    return bool(re.search(rf"(?<![A-Za-zÀ-ÿœ]){re.escape(p)}(?![A-Za-zÀ-ÿœ])",
                          text_with_padding))


def _detect_tenses(text: str) -> list[str]:
    """Return list of tense labels detected (deduplicated, order preserved)."""
    found: list[str] = []
    for tense, patterns in _load_tense_markers().items():
        for entry in patterns:
            pat = entry["pattern"]
            try:
                if re.search(pat, text, re.IGNORECASE | re.MULTILINE):
                    if tense not in found:
                        found.append(tense)
                    break
            except re.error as err:
                console.print(f"[yellow]warn: bad regex for tense {tense}: {err}[/]")
    # Présent fallback: if no tense found yet and we have any conjugated-like form,
    # assume présent. Always counted as present when high-frequency verbs detected.
    if (
        "passe_compose" in found
        or any(t for t in found if "compose" in t or "passe" in t)
    ) and "present" not in found:
        # passé composé inherently uses present aux — counts as présent too
        found.append("present")
    return found


def _subordination_rate(text: str, sentence_count: int) -> float:
    low = " " + text.lower() + " "
    total = 0
    for sub in SUBORDINATORS:
        if " " in sub:
            # multi-word, count occurrences with boundary
            occs = 0
            idx = 0
            sub_l = sub.lower()
            while True:
                f = low.find(sub_l, idx)
                if f < 0:
                    break
                # word boundary check
                before = low[f - 1] if f > 0 else " "
                after = low[f + len(sub_l)] if f + len(sub_l) < len(low) else " "
                if not (before.isalpha() or after.isalpha()):
                    occs += 1
                idx = f + len(sub_l)
            total += occs
        else:
            total += len(re.findall(
                rf"(?<![A-Za-zÀ-ÿœ]){re.escape(sub)}(?![A-Za-zÀ-ÿœ])", low))
    return total / max(1, sentence_count)


def _detect_repetition(content_tokens: list[str], window: int) -> list[tuple[str, int]]:
    """Return list of (lemma, position) for words repeated within `window` tokens."""
    out: list[tuple[str, int]] = []
    pronouns = {"je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles",
                "moi", "toi", "lui", "eux", "soi", "celui", "celle", "ceux", "celles"}
    for i, tok in enumerate(content_tokens):
        if tok in pronouns or len(tok) < 4:
            continue
        # look back `window` tokens
        for j in range(max(0, i - window), i):
            if content_tokens[j] == tok:
                out.append((tok, i))
                break
    return out


def _detect_anglicisms(text: str) -> list[dict]:
    found: list[dict] = []
    for entry in _load_anglicisms():
        pat = entry["pattern"]
        try:
            if re.search(pat, text, re.IGNORECASE):
                found.append({
                    "pattern": pat,
                    "note": entry.get("note", ""),
                    "severity": entry.get("severity", "minor"),
                })
        except re.error:
            continue
    return found


def _detect_pivots(text: str) -> list[dict]:
    low = " " + text.lower() + " "
    found: list[dict] = []
    seen = set()
    for function, items in _load_pivots().items():
        for entry in items:
            phrase = entry["phrase"].lower()
            if phrase in seen:
                continue
            if _phrase_present(low, phrase):
                found.append({
                    "phrase": phrase,
                    "function": function,
                    "cefr": entry.get("cefr", "B2"),
                })
                seen.add(phrase)
    return found


def _spell_count(text: str) -> int | None:
    if not shutil.which("hunspell"):
        return None
    try:
        proc = subprocess.run(
            ["hunspell", "-d", "fr_FR,fr_CA", "-l"],
            input=text, capture_output=True, text=True,
            encoding="utf-8", timeout=10, check=False,
        )
        # hunspell -l writes one mis-spelled word per line on stdout
        return len([ln for ln in proc.stdout.splitlines() if ln.strip()])
    except (subprocess.SubprocessError, OSError):
        return None


# ---------------------------------------------------------------------------
# Heuristic rubric → scores
# ---------------------------------------------------------------------------

@dataclass
class RubricScore:
    c1: int = 0  # tâche communicative
    c2: int = 0  # cohérence / cohésion
    c3: int = 0  # lexique
    c4: int = 0  # morphosyntaxe
    total: int = 0
    band: str = "?"

    def to_dict(self) -> dict:
        return {
            "c1_tache": self.c1,
            "c2_coherence": self.c2,
            "c3_lexique": self.c3,
            "c4_morphosyntaxe": self.c4,
            "total_sur_20": self.total,
            "bande_nclc": self.band,
        }


def score_metrics(m: WritingMetrics, *, target_words: int | None = None,
                  task: int | None = None) -> RubricScore:
    s = RubricScore()
    s.c1 = _c1_score(m, target_words=target_words, task=task)
    s.c2 = _c2_score(m, task=task)
    s.c3 = _c3_score(m)
    s.c4 = _c4_score(m)
    s.total = s.c1 + s.c2 + s.c3 + s.c4
    s.band = _band_from_total(s.total)
    return s


def _c1_score(m: WritingMetrics, *, target_words: int | None, task: int | None) -> int:
    score = 5
    if target_words:
        ratio = m.word_count / target_words
        if ratio < 0.80:
            score -= 2
        elif task == 1 and ratio > 1.45:
            # T1 letters tend to run long with formal salutations; tolerate up to 45 %.
            score -= 1
        elif task in (2, 3) and ratio > 1.30:
            score -= 1
    if task == 1:
        if not m.has_greeting:
            score -= 1
        if not m.has_closing:
            score -= 1
        if m.register_mixed_tu_vous:
            score -= 1
    return max(0, min(5, score))


def _c2_score(m: WritingMetrics, *, task: int | None) -> int:
    score = 2
    min_paragraphs = 2 if task == 1 else 3
    if m.paragraph_count >= min_paragraphs:
        score += 1
    b2 = m.connectors_by_band.get("B2", [])
    c1 = m.connectors_by_band.get("C1", [])
    distinct_b2_or_above = len(set(b2)) + len(set(c1))
    if m.distinct_connectors >= 4 and distinct_b2_or_above >= 2:
        score += 1
    if m.distinct_connectors >= 6 and distinct_b2_or_above >= 3:
        score += 1
    if 14 <= m.avg_sentence_length <= 30:
        score += 1
    return max(0, min(5, score))


def _c3_score(m: WritingMetrics) -> int:
    score = 1
    if m.type_token_ratio >= 0.45:
        score += 1
    if m.type_token_ratio >= 0.52:
        score += 1
    if m.type_token_ratio >= 0.58:
        score += 1
    if len(m.repetition_flags) == 0:
        score += 1
    if len(m.pivot_phrases_used) >= 2:
        score += 1
    major_angl = sum(1 for a in m.anglicism_flags if a.get("severity") == "major")
    if major_angl >= 1:
        score -= 1
    return max(0, min(5, score))


def _c4_score(m: WritingMetrics) -> int:
    score = 1
    n_tenses = len(set(m.tense_inventory))
    if n_tenses >= 3:
        score += 1
    if n_tenses >= 4:
        score += 1
    if any("subjonctif" in t for t in m.tense_inventory):
        score += 1
    if m.subordination_rate >= 1.2:
        score += 1
    if m.subordination_rate >= 1.5:
        score += 1
    # Stylistic inversion (aussi est-il, sans doute peut-on…) is a strong C1+ signal.
    if m.inversion_count >= 1:
        score += 1
    if (
        m.spell_errors is not None
        and m.word_count > 0
        and m.spell_errors / m.word_count > 0.05
    ):
        score -= 1
    return max(0, min(5, score))


def _band_from_total(total: int) -> str:
    if total >= 18:
        return "NCLC 10"
    if total >= 16:
        return "NCLC 9"
    if total >= 14:
        return "NCLC 7-8"
    if total >= 12:
        return "NCLC 6"
    if total >= 10:
        return "NCLC 5"
    return "NCLC ≤ 4"


# ---------------------------------------------------------------------------
# Feedback messages
# ---------------------------------------------------------------------------

def build_feedback(m: WritingMetrics, s: RubricScore,
                   *, target_words: int | None, task: int | None) -> list[str]:
    out: list[str] = []
    if target_words and m.word_count < target_words * 0.80:
        out.append(f"Longueur insuffisante ({m.word_count} mots ; cible "
                   f"{target_words}). Étoffer chaque paragraphe d'une phrase.")
    elif target_words and m.word_count > target_words * 1.20:
        out.append(f"Longueur excessive ({m.word_count} mots ; cible "
                   f"{target_words}). Resserrer le développement.")
    if m.avg_sentence_length < 14:
        out.append(f"Phrases courtes (moy. {m.avg_sentence_length:.1f} mots). "
                   "Combiner deux phrases avec une subordonnée — voir gram-b2-09.")
    b2 = m.connectors_by_band.get("B2", [])
    if len(set(b2)) < 2:
        out.append("Connecteurs B2 insuffisants. Intégrer au moins 2 de : "
                   "*cependant, néanmoins, en revanche, par ailleurs, en outre, "
                   "dans la mesure où*. Voir [00_pivots/02_introduire_argument.md].")
    n_tenses = len(set(m.tense_inventory))
    if n_tenses < 3:
        out.append(f"Diversité temporelle faible ({n_tenses} temps). "
                   "Introduire au moins un imparfait + un conditionnel ou "
                   "subjonctif. Voir gram-b2-01, gram-b2-04.")
    if not any("subjonctif" in t for t in m.tense_inventory):
        out.append("Aucun subjonctif détecté. Le rubric C4 plafonne à 3 sans "
                   "subjonctif. Voir gram-b2-01.")
    if m.subordination_rate < 1.0:
        out.append(f"Subordination basse ({m.subordination_rate:.2f} subord./phrase ; "
                   "cible B2 ≥ 1,2). Utiliser plus de *qui / que / dont / parce que*.")
    if m.repetition_flags:
        lemmas = ", ".join(sorted({lem for lem, _ in m.repetition_flags})[:5])
        out.append(f"Répétitions détectées (fenêtre 30 mots) : {lemmas}. "
                   "Substituer par un synonyme ou un pronom anaphorique.")
    if m.anglicism_flags:
        sev_major = [a for a in m.anglicism_flags if a.get("severity") == "major"]
        if sev_major:
            out.append(f"Calques anglais signalés ({len(sev_major)} majeurs) : "
                       + "; ".join(a["note"] for a in sev_major[:3]))
    if task == 1 and not m.has_greeting:
        out.append("Tâche 1 sans formule d'appel — ajouter *Madame, Monsieur,* "
                   "ou *Cher / Chère NOM,*.")
    if task == 1 and not m.has_closing:
        out.append("Tâche 1 sans formule de clôture — ajouter *Cordialement,*, "
                   "*Bien à vous,*, ou *Je vous prie d'agréer …*")
    if task == 1 and m.register_mixed_tu_vous:
        out.append("Tâche 1 : mélange tu/vous détecté. Choisir un registre et "
                   "le tenir.")
    if not m.pivot_phrases_used:
        out.append("Aucune phrase-pivot du registre soutenu détectée. "
                   "Voir [00_pivots/] pour 7 fichiers de pivots par fonction.")
    if m.spell_errors is None:
        out.append("(Spell-check : hunspell absent — passe muette ; vérifier "
                   "l'orthographe à la main avant l'examen.)")
    elif m.word_count > 0 and m.spell_errors / m.word_count > 0.05:
        out.append(f"Orthographe : ~{m.spell_errors} mots non reconnus "
                   f"({m.spell_errors / m.word_count:.1%}). Lancer un correcteur.")
    return out


# ---------------------------------------------------------------------------
# Report rendering
# ---------------------------------------------------------------------------

def render_report(metrics: WritingMetrics, score: RubricScore,
                  feedback: list[str], *, label: str = "") -> str:
    lines: list[str] = []
    if label:
        lines.append(f"=== {label} ===")
    lines.append("Métriques :")
    lines.append(f"  mots               : {metrics.word_count}")
    lines.append(f"  phrases            : {metrics.sentence_count}")
    lines.append(f"  longueur moyenne   : {metrics.avg_sentence_length:.1f}")
    lines.append(f"  paragraphes        : {metrics.paragraph_count}")
    lines.append(f"  TTR                : {metrics.type_token_ratio:.3f}")
    lines.append(f"  connecteurs        : {metrics.distinct_connectors} "
                 f"(B1={len(set(metrics.connectors_by_band.get('B1', [])))}, "
                 f"B2={len(set(metrics.connectors_by_band.get('B2', [])))}, "
                 f"C1={len(set(metrics.connectors_by_band.get('C1', [])))})")
    lines.append(f"  temps détectés     : {', '.join(sorted(set(metrics.tense_inventory))) or '—'}")
    lines.append(f"  subordination/phr  : {metrics.subordination_rate:.2f}")
    lines.append(f"  pivots utilisés    : {len(metrics.pivot_phrases_used)}")
    lines.append(f"  répétitions        : {len(metrics.repetition_flags)}")
    lines.append(f"  calques            : {len(metrics.anglicism_flags)}")
    if metrics.spell_errors is not None:
        lines.append(f"  orthographe (hunspell): {metrics.spell_errors} mots non reconnus")
    lines.append("")
    lines.append("Bandes (heuristique — pas un score d'examen) :")
    lines.append(f"  C1 tâche           : {score.c1}/5")
    lines.append(f"  C2 cohérence       : {score.c2}/5")
    lines.append(f"  C3 lexique         : {score.c3}/5")
    lines.append(f"  C4 morphosyntaxe   : {score.c4}/5")
    lines.append(f"  total              : {score.total}/20  →  {score.band}")
    if feedback:
        lines.append("")
        lines.append("Retours ciblés :")
        for f in feedback:
            lines.append(f"  • {f}")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def _read_file_meta(path: Path) -> tuple[str, int | None, int | None]:
    """Return (body, task, target_words) from a markdown file's frontmatter."""
    import frontmatter
    post = frontmatter.load(path)
    body: str = post.content
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
    return body, task, target


def score_one(path: Path) -> int:
    body, task, target = _read_file_meta(path)
    blocks = extract_response_blocks(body)
    if not blocks:
        console.print(f"[yellow]{path}: no '## Réponse' or '## Modèle NCLC N' "
                      "block found.[/]")
        return 0
    rc = 0
    console.print(
        "[bold]Score writing[/] · "
        "[dim]estimation heuristique — pas un score d'examen[/]\n"
    )
    for label, text in blocks:
        m = measure_text(text, task=task)
        s = score_metrics(m, target_words=target, task=task)
        fb = build_feedback(m, s, target_words=target, task=task)
        console.print(render_report(m, s, fb, label=label))
        console.print("")
    return rc


def calibrate(root: Path) -> int:
    """Walk model-answer blocks, compare heuristic band to labeled band, report."""
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
        if any(part.startswith("_") for part in path.relative_to(root).parts):
            continue
        try:
            post = frontmatter.load(path)
        except Exception:  # noqa: BLE001
            continue
        if post.metadata.get("section") != "writing":
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
        blocks = extract_response_blocks(post.content)
        for label, text in blocks:
            key = label.lower().strip()
            # Prefix-match: labels may carry trailing parentheticals like
            # "Modèle NCLC 8 (≈ score 14/20)".
            expected = next(
                (band for prefix, band in label_to_band.items() if key.startswith(prefix)),
                None,
            )
            if expected is None:
                continue
            m = measure_text(text, task=task)
            s = score_metrics(m, target_words=target, task=task)
            n_total += 1
            per_label[expected] += 1
            if _bands_match(s.band, expected):
                n_match += 1
                per_label_match[expected] += 1
            else:
                misses.append(f"{path.name} :: {label} → heuristique {s.band} "
                              f"(attendu {expected}) [total {s.total}/20]")
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
    if overall < 0.80:
        console.print("[red]Calibration < 80 % — ajuster les seuils dans "
                      "tools/scoring_rules.md.[/]")
        if misses:
            console.print("\n[yellow]Premiers écarts :[/]")
            for line in misses[:15]:
                console.print(f"  • {line}")
        return 1
    console.print("[green]Calibration ≥ 80 %.[/]")
    return 0


def _bands_match(heuristic: str, expected: str) -> bool:
    """Permissive match: NCLC 9 is acceptable for an expected NCLC 10 (off by 1).

    We accept the heuristic if it lands on the expected band OR an
    adjacent band (one step up or down on the NCLC ladder).
    """
    ladder = ["NCLC ≤ 4", "NCLC 5", "NCLC 6", "NCLC 7-8", "NCLC 9", "NCLC 10"]
    try:
        i_h = ladder.index(heuristic)
        i_e = ladder.index(expected)
    except ValueError:
        return heuristic == expected
    return abs(i_h - i_e) <= 1


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("path", nargs="?", help="Markdown file to score.")
    p.add_argument("--calibrate", action="store_true",
                   help="Walk PATH (a directory) and score each '## Modèle NCLC N' "
                        "block against its labelled band.")
    p.add_argument("--json", action="store_true", help="Emit JSON for one file.")
    args = p.parse_args(argv)

    if args.calibrate:
        target = Path(args.path) if args.path else REPO_ROOT / "content" / "05_writing"
        return calibrate(target)
    if not args.path:
        # Backward-compatible: with no args, print the rubric (Phase 1 stub behaviour).
        from tools._common import console as c
        c.print(
            "[bold]Grille EE — pour scorer une copie :[/]\n"
            "  python -m tools.score_writing <fichier.md>\n"
            "  python -m tools.score_writing --calibrate content/05_writing/\n\n"
            "Le fichier doit contenir un bloc '## Réponse' ou un ou plusieurs "
            "blocs '## Modèle NCLC N'."
        )
        return 0
    path = Path(args.path)
    if not path.exists():
        console.print(f"[red]{path}: not found.[/]")
        return 2
    if args.json:
        body, task, target = _read_file_meta(path)
        blocks = extract_response_blocks(body)
        payload: list[dict] = []
        for label, text in blocks:
            m = measure_text(text, task=task)
            s = score_metrics(m, target_words=target, task=task)
            fb = build_feedback(m, s, target_words=target, task=task)
            payload.append({
                "label": label,
                "metrics": {
                    "word_count": m.word_count,
                    "sentence_count": m.sentence_count,
                    "avg_sentence_length": round(m.avg_sentence_length, 2),
                    "paragraph_count": m.paragraph_count,
                    "type_token_ratio": round(m.type_token_ratio, 3),
                    "distinct_connectors": m.distinct_connectors,
                    "tense_inventory": sorted(set(m.tense_inventory)),
                    "subordination_rate": round(m.subordination_rate, 2),
                    "pivot_phrases_used": len(m.pivot_phrases_used),
                    "repetition_flags": len(m.repetition_flags),
                    "anglicism_flags": len(m.anglicism_flags),
                    "spell_errors": m.spell_errors,
                },
                "score": s.to_dict(),
                "feedback": fb,
            })
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        return 0
    return score_one(path)


if __name__ == "__main__":
    sys.exit(main())

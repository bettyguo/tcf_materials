"""Adversarial-reviewer pass for every content file.

Run via `python -m tools.cli audit`. See PHASE_1_DESIGN.md §6 for the full spec.

Exits:
    0 if no schema errors and no `blocker`-tagged <!-- AUDIT --> comments.
    1 otherwise.
"""

from __future__ import annotations

import argparse
import hashlib
import random
import re
import shutil
import subprocess
import sys
from collections import Counter
from dataclasses import dataclass, field
from datetime import UTC, datetime
from pathlib import Path

import yaml

from tools._common import (
    REPO_ROOT,
    TOOLS_DIR,
    ContentLoadError,
    LoadedContent,
    console,
    iter_content_files,
    load_content,
)
from tools.models import AuditStatus, Confidence, Register

# --- Regex sweep patterns (heuristic; flag only) -----------------------------

CALQUE_IL_Y_A = re.compile(r"\bil y a\s+(?:un[e]?\s+)?(\w+)\s+que\b", re.IGNORECASE)
DACCORD_INFINITIF = re.compile(
    r"\bje suis d[''’]accord avec\s+\w+\s+(?:de|à)\s+\w+er\b", re.IGNORECASE
)
REPEATED_TOKEN = re.compile(r"\b(\w+)\s+\1\b", re.IGNORECASE)
# Legitimate French double-tokens (subject + reflexive pronoun, etc.) — never flag.
REPEATED_TOKEN_ALLOW = {"vous", "nous", "que", "se", "y", "l'"}
SUBJ_TRIGGERS = re.compile(
    r"\b(il faut que|bien que|pour que|avant que|à condition que|quoique|jusqu['’]à ce que)\b\s+\w+\s+(\w+)",
    re.IGNORECASE,
)
AUDIT_BLOCKER = re.compile(r"<!--\s*AUDIT-BLOCKER:\s*([^>]+)\s*-->", re.IGNORECASE)
AUDIT_IGNORE = re.compile(r"<!--\s*AUDIT-IGNORE:\s*(\S+)\s+([^>]+)\s*-->", re.IGNORECASE)
# AUDIT-ENTRY carries per-entry confidence + domain for files holding many entries (Phase 3
# frequency/collocation/thematic vocab). Form: <!-- AUDIT-ENTRY: confidence=high domain=media -->
AUDIT_ENTRY = re.compile(r"<!--\s*AUDIT-ENTRY:\s*([^>]+?)\s*-->", re.IGNORECASE)
# Plain AUDIT comment — must NOT match AUDIT-BLOCKER / AUDIT-IGNORE / AUDIT-ENTRY variants.
AUDIT_COMMENT = re.compile(r"<!--\s*AUDIT(?!-)(?::\s*([^>]+))?\s*-->", re.IGNORECASE)
# Template-leak sentinel: [REPLACE...] markers from the per-item template must never ship.
REPLACE_SENTINEL = re.compile(r"\[REPLACE[^\]]*\]")

CODE_FENCE = re.compile(r"```.*?```", re.DOTALL)
INLINE_CODE = re.compile(r"`[^`]+`")
URL = re.compile(r"https?://\S+")
LINK_TARGET = re.compile(r"\(([^)]+)\)")  # crude; intentional

# Subjunctive-shape detection: forms ending in -e/-es/-ent for -er verbs ≈ subj+ind same form,
# so we only flag when the following verb clearly looks indicative (e.g., -ais/-ait/-iez).
INDICATIVE_SHAPES = re.compile(r"^(?:est|sont|a|ont|fait|font|peut|peuvent|veut|veulent)$")


@dataclass
class Finding:
    path: Path
    line: int
    kind: str           # schema | spelling | calque | anglicism | subjunctive | repeated | blocker | confidence | stale
    severity: str       # blocker | major | minor
    message: str


@dataclass
class AuditReport:
    findings: list[Finding] = field(default_factory=list)
    schema_failures: list[tuple[Path, list[str]]] = field(default_factory=list)
    blocker_count: int = 0
    files_scanned: int = 0

    def add(self, f: Finding) -> None:
        self.findings.append(f)
        if f.severity == "blocker":
            self.blocker_count += 1

    def by_severity(self, sev: str) -> list[Finding]:
        return [f for f in self.findings if f.severity == sev]


# --- Loaders ----------------------------------------------------------------


def _load_pattern_yaml(filename: str) -> list[dict]:
    """Load a YAML of {pattern, note, severity} entries and compile regexes.

    Returns [] if the file is missing — the audit degrades gracefully.
    """
    path = TOOLS_DIR / filename
    if not path.exists():
        return []
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or []
    compiled = []
    for entry in data:
        compiled.append({
            "regex": re.compile(entry["pattern"], re.IGNORECASE),
            "note": entry["note"],
            "severity": entry.get("severity", "minor"),
        })
    return compiled


def load_anglicisms() -> list[dict]:
    return _load_pattern_yaml("anglicisms.yaml")


def load_quebecisms() -> list[dict]:
    """Quebecism flags applied only when the file's register is *not* quebec/mixed.

    The audit skips this sweep on register=quebec and register=mixed; only
    register=france (the default) triggers the flagging.
    """
    return _load_pattern_yaml("quebecisms.yaml")


def load_whitelist() -> set[str]:
    out: set[str] = set()
    for fname in ("audit_whitelist.txt", "audit_whitelist.local.txt"):
        p = TOOLS_DIR / fname
        if not p.exists():
            continue
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            out.add(line.lower())
    return out


# --- Sweeps -----------------------------------------------------------------


def strip_noise(body: str) -> str:
    body = CODE_FENCE.sub(" ", body)
    body = INLINE_CODE.sub(" ", body)
    body = URL.sub(" ", body)
    return body


def line_of(body: str, pos: int) -> int:
    return body.count("\n", 0, pos) + 1


def sweep_heuristics(
    lc: LoadedContent,
    report: AuditReport,
    anglicisms: list[dict],
    quebecisms: list[dict],
) -> None:
    body = lc.body
    ignored_patterns = {m.group(1).lower() for m in AUDIT_IGNORE.finditer(body)}
    clean = strip_noise(body)

    for kind, pat, sev, note in (
        ("calque", CALQUE_IL_Y_A, "minor", '"il y a X que" — vérifier que ce n\'est pas un calque de "there is X that".'),
        ("dac", DACCORD_INFINITIF, "minor", '"je suis d\'accord avec X de/à <inf>" — construction souvent erronée; préférer "je suis d\'accord pour que X + subjonctif" ou "j\'approuve que X".'),
        ("repeated", REPEATED_TOKEN, "minor", "Token répété (typo ?)."),
    ):
        if kind in ignored_patterns:
            continue
        for m in pat.finditer(clean):
            if kind == "repeated" and m.group(1).lower() in REPEATED_TOKEN_ALLOW:
                continue
            report.add(Finding(lc.path, line_of(body, m.start()), kind, sev, f"{note} → « {m.group(0).strip()} »"))

    if "anglicism" not in ignored_patterns:
        for ang in anglicisms:
            for m in ang["regex"].finditer(clean):
                report.add(Finding(
                    lc.path, line_of(body, m.start()),
                    "anglicism", ang["severity"],
                    f'{ang["note"]} → « {m.group(0).strip()} »',
                ))

    # Quebecism sweep only applies to register=france files. Files marked register=quebec or
    # register=mixed legitimately use Quebec forms.
    if "quebecism" not in ignored_patterns and lc.fm.register == Register.FRANCE:
        for q in quebecisms:
            for m in q["regex"].finditer(clean):
                report.add(Finding(
                    lc.path, line_of(body, m.start()),
                    "quebecism", q["severity"],
                    f'{q["note"]} → « {m.group(0).strip()} »',
                ))

    if "subjunctive" not in ignored_patterns:
        for m in SUBJ_TRIGGERS.finditer(clean):
            verb = m.group(2).lower()
            if INDICATIVE_SHAPES.match(verb):
                report.add(Finding(
                    lc.path, line_of(body, m.start()),
                    "subjunctive", "major",
                    f'Déclencheur du subjonctif « {m.group(1)} » suivi de « {verb} » (forme indicative).',
                ))


def sweep_audit_comments(lc: LoadedContent, report: AuditReport) -> None:
    for m in AUDIT_BLOCKER.finditer(lc.body):
        report.add(Finding(lc.path, line_of(lc.body, m.start()), "blocker", "blocker",
                           f'AUDIT-BLOCKER: {m.group(1).strip()}'))
    for m in AUDIT_COMMENT.finditer(lc.body):
        # Treat plain <!-- AUDIT --> as minor flag; AUDIT-BLOCKER handled above.
        if AUDIT_BLOCKER.match(m.group(0)):
            continue
        report.add(Finding(lc.path, line_of(lc.body, m.start()), "audit-comment", "minor",
                           f'Commentaire AUDIT non résolu: {(m.group(1) or "").strip()}'))


def sweep_confidence(lc: LoadedContent, report: AuditReport, *, stale_days: int = 14) -> None:
    if lc.fm.audit.confidence_overall == Confidence.LOW:
        report.add(Finding(lc.path, 1, "confidence", "major",
                           'audit.confidence_overall=low ; ce fichier est mis en quarantaine et exclu des builds.'))
    if lc.fm.audit.status == AuditStatus.PENDING and not lc.fm.stub:
        # Date freshness check requires a date field; for now, only flag pending non-stub files.
        report.add(Finding(lc.path, 1, "stale", "minor",
                           'audit.status=pending sur un fichier non-stub.'))


def _parse_entry_attrs(raw: str) -> dict[str, str]:
    """Parse `confidence=high domain=media` into a dict. Tolerant of extra whitespace."""
    attrs: dict[str, str] = {}
    for tok in raw.split():
        if "=" in tok:
            k, _, v = tok.partition("=")
            attrs[k.strip().lower()] = v.strip().lower()
    return attrs


def sweep_audit_entries(
    lc: LoadedContent, report: AuditReport, domain_counter: Counter[str]
) -> None:
    """Parse per-entry `<!-- AUDIT-ENTRY: confidence=X domain=Y -->` markers (Phase 3 vocab).

    - confidence=low entries → major finding (entry-level granularity, audit gap M11).
    - domain=Y tallies into the corpus-level diversity counter (audit gap M8).
    """
    for m in AUDIT_ENTRY.finditer(lc.body):
        attrs = _parse_entry_attrs(m.group(1))
        conf = attrs.get("confidence")
        if conf == "low":
            report.add(Finding(lc.path, line_of(lc.body, m.start()), "entry-confidence", "major",
                               f'AUDIT-ENTRY confidence=low : {m.group(1).strip()}'))
        dom = attrs.get("domain")
        if dom:
            domain_counter[dom] += 1


def sweep_replace_sentinels(lc: LoadedContent, report: AuditReport) -> None:
    """Reject [REPLACE...] template sentinels in body or sources (audit gap m6).

    These are blockers: a leaked template citation would pollute references.bib and ship
    a fake source, violating master prompt §0.2.
    """
    for m in REPLACE_SENTINEL.finditer(lc.body):
        report.add(Finding(lc.path, line_of(lc.body, m.start()), "template-leak", "blocker",
                           f'Sentinelle de gabarit non remplacée : {m.group(0)}'))
    for src in lc.fm.sources:
        if "replace" in src.lower():
            report.add(Finding(lc.path, 1, "template-leak", "blocker",
                               f'Source sentinelle non remplacée : {src}'))


def check_domain_diversity(
    domain_counter: Counter[str], report: AuditReport,
    *, min_total: int = 20, min_domains: int = 6, max_share: float = 0.25,
) -> None:
    """Corpus-level domain spread over AUDIT-ENTRY markers (audit gap M8).

    No-ops while the corpus is small (< min_total tagged entries) so the seed corpus and
    early authoring batches don't trip a premature failure. Findings are *major*, not
    blockers — they gate EVAL, not every commit (mirrors Phase 2 §5 domain-diversity).
    """
    total = sum(domain_counter.values())
    if total < min_total:
        return
    synthetic = REPO_ROOT / "content"
    distinct = len(domain_counter)
    if distinct < min_domains:
        report.add(Finding(synthetic, 1, "domain-diversity", "major",
                           f'Seulement {distinct} domaine(s) dans les exemples (minimum {min_domains}).'))
    for dom, cnt in sorted(domain_counter.items(), key=lambda kv: -kv[1]):
        share = cnt / total
        if share > max_share:
            report.add(Finding(synthetic, 1, "domain-diversity", "major",
                               f'Domaine « {dom} » = {share:.0%} des exemples (plafond {max_share:.0%}).'))


# --- Hunspell (optional) ----------------------------------------------------


def hunspell_available() -> bool:
    return shutil.which("hunspell") is not None


def run_hunspell(text: str) -> set[str]:
    """Return the set of unknown tokens reported by hunspell, lowercased.

    Best-effort: silently returns empty set if hunspell is missing or errors.
    """
    if not hunspell_available():
        return set()
    try:
        proc = subprocess.run(
            ["hunspell", "-d", "fr_FR,fr_CA", "-l"],
            input=text, capture_output=True, text=True,
            timeout=30, encoding="utf-8",
        )
    except (subprocess.TimeoutExpired, OSError):
        return set()
    if proc.returncode not in (0, 1):
        return set()
    return {tok.strip().lower() for tok in proc.stdout.splitlines() if tok.strip()}


def sweep_spelling(lc: LoadedContent, report: AuditReport, whitelist: set[str]) -> None:
    if not hunspell_available():
        return
    unknown = run_hunspell(strip_noise(lc.body))
    unknown -= whitelist
    # Cap to avoid spam on a single file
    for tok in sorted(unknown)[:20]:
        report.add(Finding(lc.path, 1, "spelling", "minor", f"Inconnu de hunspell : {tok}"))


# --- Cross-ref check --------------------------------------------------------


def sweep_prerequisites(loaded: list[LoadedContent], report: AuditReport) -> None:
    """Validate prerequisites: (a) every referenced ID exists; (b) the graph is a DAG.

    Cycle detection uses an iterative DFS with three-colour marking (white/grey/black) so
    we surface the actual cycle path rather than just "a cycle exists somewhere". A cycle
    is a blocker — it breaks topological ordering for the curriculum and the index page.
    """
    known: dict[str, LoadedContent] = {lc.fm.id: lc for lc in loaded}

    # (a) Existence check.
    for lc in loaded:
        for prereq in lc.fm.prerequisites:
            if prereq not in known:
                report.add(Finding(lc.path, 1, "schema", "blocker",
                                   f'prerequisites: id "{prereq}" introuvable dans le corpus.'))

    # (b) Cycle detection. Build adjacency over known IDs only (missing IDs already reported).
    adj: dict[str, list[str]] = {
        lc.fm.id: [p for p in lc.fm.prerequisites if p in known] for lc in loaded
    }
    WHITE, GREY, BLACK = 0, 1, 2
    colour: dict[str, int] = dict.fromkeys(adj, WHITE)

    def find_cycle(start: str) -> list[str] | None:
        """Iterative DFS from `start`; returns the cycle path if one is reachable."""
        stack: list[tuple[str, int]] = [(start, 0)]
        path: list[str] = []
        while stack:
            node, idx = stack[-1]
            if idx == 0:
                if colour[node] == GREY:
                    # Cycle: the path from the first occurrence of `node` to the end.
                    i = path.index(node)
                    return path[i:] + [node]
                if colour[node] == BLACK:
                    stack.pop()
                    continue
                colour[node] = GREY
                path.append(node)
            children = adj.get(node, [])
            if idx < len(children):
                stack[-1] = (node, idx + 1)
                child = children[idx]
                if colour.get(child) == GREY:
                    # back edge → cycle
                    i = path.index(child)
                    return path[i:] + [child]
                if colour.get(child, BLACK) == WHITE:
                    stack.append((child, 0))
            else:
                colour[node] = BLACK
                path.pop()
                stack.pop()
        return None

    reported_cycles: set[tuple[str, ...]] = set()
    for nid in adj:
        if colour[nid] != WHITE:
            continue
        cycle = find_cycle(nid)
        if cycle:
            # Normalise the cycle (rotate to its lexicographically smallest member) so the
            # same cycle reported from different entry points is de-duplicated.
            min_idx = min(range(len(cycle) - 1), key=lambda i: cycle[i])
            normalised = tuple(cycle[min_idx:-1] + cycle[:min_idx] + [cycle[min_idx]])
            if normalised in reported_cycles:
                continue
            reported_cycles.add(normalised)
            origin = known[cycle[0]]
            report.add(Finding(
                origin.path, 1, "schema", "blocker",
                f'Cycle dans prerequisites: {" → ".join(normalised)}',
            ))


# --- Random sample export ---------------------------------------------------


SENTENCE_SPLIT = re.compile(r"(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Þ])")


def export_random_sample(loaded: list[LoadedContent], out_dir: Path, n: int = 50) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    sentences: list[tuple[str, Path]] = []
    for lc in loaded:
        for sent in SENTENCE_SPLIT.split(strip_noise(lc.body)):
            sent = sent.strip()
            if 20 < len(sent) < 300 and sent[:1].isalpha():
                sentences.append((sent, lc.relpath))
    if not sentences:
        out = out_dir / "random_50.md"
        out.write_text("# Audit sample — aucun contenu disponible.\n", encoding="utf-8")
        return out
    seed = hashlib.sha256(b"|".join(p.as_posix().encode() for _, p in sentences)).hexdigest()
    rnd = random.Random(seed)
    sample = rnd.sample(sentences, min(n, len(sentences)))
    out = out_dir / "random_50.md"
    lines = [f"# Audit sample — {len(sample)} phrases au hasard", ""]
    for i, (sent, relp) in enumerate(sample, 1):
        lines.append(f"{i}. ({relp.as_posix()}) {sent}")
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return out


# --- Report writers ---------------------------------------------------------


def write_audit_md(report: AuditReport, out: Path) -> None:
    lines: list[str] = []
    lines.append("# AUDIT register")
    lines.append("")
    lines.append(f"_Dernière exécution : {datetime.now(UTC).strftime('%Y-%m-%d %H:%M UTC')}_")
    lines.append(f"_Fichiers analysés : {report.files_scanned}_")
    lines.append("")
    lines.append(f"- **Blockers** : {report.blocker_count}")
    lines.append(f"- **Schema errors** : {len(report.schema_failures)}")
    lines.append(f"- **Majeurs** : {len(report.by_severity('major'))}")
    lines.append(f"- **Mineurs** : {len(report.by_severity('minor'))}")
    lines.append("")

    if report.schema_failures:
        lines.append("## Schema errors (build-blocking)")
        for p, errs in report.schema_failures:
            lines.append(f"- `{p}`")
            for e in errs:
                lines.append(f"  - {e}")
        lines.append("")

    for sev in ("blocker", "major", "minor"):
        items = report.by_severity(sev)
        if not items:
            continue
        lines.append(f"## {sev.title()} ({len(items)})")
        for f in items:
            lines.append(f"- `{f.path.relative_to(REPO_ROOT)}:{f.line}` [{f.kind}] {f.message}")
        lines.append("")

    if not (report.findings or report.schema_failures):
        lines.append("✅ Rien à signaler.")
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")


# --- Entry point ------------------------------------------------------------


def run_audit(*, schema_only: bool = False, write_report: bool = True) -> int:
    """Returns the intended process exit code."""
    anglicisms = load_anglicisms()
    quebecisms = load_quebecisms()
    whitelist = load_whitelist()
    report = AuditReport()

    loaded: list[LoadedContent] = []
    domain_counter: Counter[str] = Counter()
    for path in iter_content_files():
        report.files_scanned += 1
        try:
            lc = load_content(path, strict=True)
        except ContentLoadError as err:
            report.schema_failures.append((err.path, err.errors))
            continue
        loaded.append(lc)
        # Audio script check
        if lc.fm.audio.required and not lc.script:
            report.add(Finding(
                lc.path, 1, "schema", "blocker",
                "audio.required=true mais bloc `## SCRIPT` absent.",
            ))
            report.blocker_count += 0  # add() already counted via severity
        if schema_only:
            continue
        sweep_heuristics(lc, report, anglicisms, quebecisms)
        sweep_audit_comments(lc, report)
        sweep_confidence(lc, report)
        sweep_audit_entries(lc, report, domain_counter)
        sweep_replace_sentinels(lc, report)
        sweep_spelling(lc, report, whitelist)

    if not schema_only:
        sweep_prerequisites(loaded, report)
        check_domain_diversity(domain_counter, report)
        export_random_sample(loaded, REPO_ROOT / "audit_samples")

    if write_report:
        write_audit_md(report, REPO_ROOT / "AUDIT.md")

    # Render summary to console
    console.print(f"[bold]Audit:[/] {report.files_scanned} fichiers, "
                  f"{report.blocker_count} blocker(s), "
                  f"{len(report.schema_failures)} schema error(s), "
                  f"{len(report.by_severity('major'))} majeur(s), "
                  f"{len(report.by_severity('minor'))} mineur(s).")

    if report.schema_failures or report.blocker_count:
        return 1
    return 0


def _cli() -> int:
    p = argparse.ArgumentParser(description="TCF audit — adversarial French reviewer.")
    p.add_argument("--schema-only", action="store_true", help="Only validate frontmatter; skip heuristics.")
    p.add_argument("--no-report", action="store_true", help="Do not write AUDIT.md.")
    args = p.parse_args()
    return run_audit(schema_only=args.schema_only, write_report=not args.no_report)


if __name__ == "__main__":
    sys.exit(_cli())

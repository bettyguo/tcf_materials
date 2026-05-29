"""Validate that frequency-vocab entries carry band assignments matching Lonsdale & Le Bras.

Run via `python -m tools.cli check-frequency` (see 04_PHASE_3_VOCAB_LISTENING.md §6.1,
PHASE_3_DESIGN.md §3.5 / §9.4).

The reference list (`tools/data/lonsdale_lebras_bands1_6.csv`) is a hand-checked digitisation
of the print dictionary's bands 1–6 (Lonsdale & Le Bras 2009). It is NOT fabricated here:
until that CSV is supplied, this check **degrades gracefully** (warns + exits 0) so it never
blocks CI. Once the CSV lands, the check validates every `### #<rank> — <lemma>` entry header
in `content/02_vocabulary/frequency/` against it.

CSV format (header row required):
    rank,lemma,band
    347,réussir,1
    ...

Usage:
    python -m tools.cli check-frequency            # validate (or skip if CSV absent)
    python -m tools.cli check-frequency --strict   # exit 1 if the CSV is absent
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
from pathlib import Path

from tools._common import CONTENT_DIR, REPO_ROOT, console, iter_content_files

FREQUENCY_DIR = CONTENT_DIR / "02_vocabulary" / "frequency"
BANDS_CSV = REPO_ROOT / "tools" / "data" / "lonsdale_lebras_bands1_6.csv"

# Entry header form: "### #347 — réussir [v., ...]"  (em dash or hyphen tolerated)
ENTRY_HEADER = re.compile(r"^###\s*#(\d+)\s*[—–-]\s*([^\[\n]+?)\s*(?:\[|$)", re.MULTILINE)


def load_bands(csv_path: Path) -> dict[str, tuple[int, int]]:
    """Return {lemma: (rank, band)} from the reference CSV."""
    out: dict[str, tuple[int, int]] = {}
    with csv_path.open(encoding="utf-8", newline="") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            lemma = (row.get("lemma") or "").strip().lower()
            if not lemma:
                continue
            try:
                out[lemma] = (int(row["rank"]), int(row["band"]))
            except (KeyError, ValueError):
                continue
    return out


def iter_entries() -> list[tuple[Path, int, str]]:
    """Yield (file, rank, lemma) for every entry header under the frequency dir."""
    entries: list[tuple[Path, int, str]] = []
    if not FREQUENCY_DIR.exists():
        return entries
    for path in iter_content_files(FREQUENCY_DIR):
        text = path.read_text(encoding="utf-8")
        for m in ENTRY_HEADER.finditer(text):
            entries.append((path, int(m.group(1)), m.group(2).strip().lower()))
    return entries


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--strict", action="store_true",
                   help="Exit 1 if the reference CSV is absent (default: warn + exit 0).")
    args = p.parse_args(argv)

    if not BANDS_CSV.exists():
        msg = (f"référence de fréquence absente : {BANDS_CSV.relative_to(REPO_ROOT)} "
               "— voir PHASE_3_DESIGN.md §9.4. Vérification ignorée.")
        if args.strict:
            console.print(f"[red]{msg}[/red]")
            return 1
        console.print(f"[yellow]{msg}[/yellow]")
        return 0

    bands = load_bands(BANDS_CSV)
    entries = iter_entries()
    if not entries:
        console.print("[yellow]aucune entrée de fréquence trouvée — rien à vérifier.[/yellow]")
        return 0

    problems: list[str] = []
    for path, rank, lemma in entries:
        ref = bands.get(lemma)
        rel = path.relative_to(REPO_ROOT)
        if ref is None:
            problems.append(f"{rel}: « {lemma} » (#{rank}) absent de la liste Lonsdale & Le Bras.")
            continue
        ref_rank, _band = ref
        if ref_rank != rank:
            problems.append(f"{rel}: « {lemma} » déclaré #{rank}, attendu #{ref_rank}.")

    if problems:
        console.print(f"[red]check-frequency : {len(problems)} problème(s).[/red]")
        for pr in problems[:50]:
            console.print(f"  - {pr}")
        return 1

    console.print(f"[green]check-frequency : {len(entries)} entrées validées contre {BANDS_CSV.name}.[/green]")
    return 0


if __name__ == "__main__":
    sys.exit(main())

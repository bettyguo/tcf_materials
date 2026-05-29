"""Freeze the grammar-phase content IDs into content/01_grammar/_id_freeze.lock.

Run before Phase 3 begins (see 03_PHASE_2_GRAMMAR.md §7). Phase 3 EVAL gates fail
if any Phase-2 grammar id is missing from the lock or differs from it.

Usage:
    python -m tools.snapshot_grammar_ids            # writes _id_freeze.lock
    python -m tools.snapshot_grammar_ids --check    # exits 1 if lock is stale
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from tools._common import CONTENT_DIR, console, iter_content_files, load_content

GRAMMAR_DIR = CONTENT_DIR / "01_grammar"
LOCK_PATH = GRAMMAR_DIR / "_id_freeze.lock"


def collect_grammar_ids() -> list[str]:
    """Return sorted unique IDs for every parseable file under content/01_grammar/."""
    ids: set[str] = set()
    for path in iter_content_files(GRAMMAR_DIR):
        try:
            lc = load_content(path, strict=True)
        except Exception as err:  # noqa: BLE001 — surface load failures at the caller
            console.print(f"[red]error loading {path}: {err}[/red]")
            continue
        ids.add(lc.fm.id)
    return sorted(ids)


def write_lock(ids: list[str]) -> Path:
    LOCK_PATH.write_text("\n".join(ids) + "\n", encoding="utf-8")
    return LOCK_PATH


def read_lock() -> list[str] | None:
    if not LOCK_PATH.exists():
        return None
    return [line.strip() for line in LOCK_PATH.read_text(encoding="utf-8").splitlines() if line.strip()]


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--check", action="store_true",
                   help="Exit 1 if the current grammar IDs differ from the existing lock.")
    args = p.parse_args(argv)

    current = collect_grammar_ids()

    if args.check:
        locked = read_lock()
        if locked is None:
            console.print(f"[red]lock manquant : {LOCK_PATH}[/red]")
            return 1
        added = sorted(set(current) - set(locked))
        removed = sorted(set(locked) - set(current))
        if added or removed:
            if added:
                console.print(f"[yellow]ajoutés depuis le freeze :[/] {added}")
            if removed:
                console.print(f"[yellow]retirés depuis le freeze :[/] {removed}")
            return 1
        console.print(f"[green]lock à jour ({len(current)} IDs).[/green]")
        return 0

    write_lock(current)
    console.print(f"[green]freeze écrit : {LOCK_PATH.relative_to(CONTENT_DIR.parent)} ({len(current)} IDs)[/green]")
    return 0


if __name__ == "__main__":
    sys.exit(main())

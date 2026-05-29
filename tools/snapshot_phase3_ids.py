"""Freeze the Phase-3 content IDs into per-section _id_freeze.lock files.

Run on Phase 3 EVAL clearance (see 04_PHASE_3_VOCAB_LISTENING.md §8 + PHASE_3_DESIGN.md §4).
Phase 4 EVAL gates fail if any Phase-3 vocab/listening id is missing from these locks
or differs from them.

Emits two locks atomically:
    content/02_vocabulary/_id_freeze.lock   (frequency + collocation + thematic)
    content/03_listening/_id_freeze.lock    (listening item bank)

Usage:
    python -m tools.snapshot_phase3_ids            # writes both locks
    python -m tools.snapshot_phase3_ids --check    # exits 1 if either lock is stale
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from tools._common import CONTENT_DIR, console, iter_content_files, load_content

VOCAB_DIR = CONTENT_DIR / "02_vocabulary"
LISTENING_DIR = CONTENT_DIR / "03_listening"
VOCAB_LOCK = VOCAB_DIR / "_id_freeze.lock"
LISTENING_LOCK = LISTENING_DIR / "_id_freeze.lock"


def collect_ids(root: Path) -> list[str]:
    """Return sorted unique IDs for every parseable file under `root`."""
    ids: set[str] = set()
    for path in iter_content_files(root):
        try:
            lc = load_content(path, strict=True)
        except Exception as err:  # noqa: BLE001 — surface load failures, keep going
            console.print(f"[red]error loading {path}: {err}[/red]")
            continue
        ids.add(lc.fm.id)
    return sorted(ids)


def read_lock(lock_path: Path) -> list[str] | None:
    if not lock_path.exists():
        return None
    return [ln.strip() for ln in lock_path.read_text(encoding="utf-8").splitlines() if ln.strip()]


def _check_one(root: Path, lock_path: Path) -> int:
    current = collect_ids(root)
    locked = read_lock(lock_path)
    if locked is None:
        console.print(f"[red]lock manquant : {lock_path}[/red]")
        return 1
    added = sorted(set(current) - set(locked))
    removed = sorted(set(locked) - set(current))
    if added or removed:
        if added:
            console.print(f"[yellow]{lock_path.name} — ajoutés depuis le freeze :[/] {added}")
        if removed:
            console.print(f"[yellow]{lock_path.name} — retirés depuis le freeze :[/] {removed}")
        return 1
    console.print(f"[green]{lock_path.name} à jour ({len(current)} IDs).[/green]")
    return 0


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--check", action="store_true",
                   help="Exit 1 if current vocab/listening IDs differ from the existing locks.")
    args = p.parse_args(argv)

    pairs = [(VOCAB_DIR, VOCAB_LOCK), (LISTENING_DIR, LISTENING_LOCK)]

    if args.check:
        rc = 0
        for root, lock in pairs:
            rc |= _check_one(root, lock)
        return rc

    for root, lock in pairs:
        ids = collect_ids(root)
        lock.parent.mkdir(parents=True, exist_ok=True)
        lock.write_text("\n".join(ids) + "\n", encoding="utf-8")
        console.print(f"[green]freeze écrit : {lock.relative_to(CONTENT_DIR.parent)} ({len(ids)} IDs)[/green]")
    return 0


if __name__ == "__main__":
    sys.exit(main())

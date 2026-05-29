"""Freeze the Phase-4 reading IDs into content/04_reading/_id_freeze.lock.

Run on Phase 4 EVAL clearance (see 05_PHASE_4_READING.md §8 + PHASE_4_DESIGN.md §3.6).
Phase 5 EVAL gates fail if any reading-item id is missing from this lock or
differs from it.

Usage:
    python -m tools.snapshot_phase4_ids            # writes the lock
    python -m tools.snapshot_phase4_ids --check    # exits 1 if the lock is stale
"""

from __future__ import annotations

import argparse
import sys

from tools._common import CONTENT_DIR, console
from tools.snapshot_phase3_ids import _check_one, collect_ids

READING_DIR = CONTENT_DIR / "04_reading"
READING_LOCK = READING_DIR / "_id_freeze.lock"


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--check", action="store_true",
                   help="Exit 1 if current reading IDs differ from the existing lock.")
    args = p.parse_args(argv)

    if args.check:
        return _check_one(READING_DIR, READING_LOCK)

    ids = collect_ids(READING_DIR)
    READING_LOCK.parent.mkdir(parents=True, exist_ok=True)
    READING_LOCK.write_text("\n".join(ids) + "\n", encoding="utf-8")
    console.print(f"[green]freeze écrit : {READING_LOCK.relative_to(CONTENT_DIR.parent)} "
                  f"({len(ids)} IDs)[/green]")
    return 0


if __name__ == "__main__":
    sys.exit(main())

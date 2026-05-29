"""Freeze the Phase-5 writing IDs into content/05_writing/_id_freeze.lock.

Run on Phase 5 EVAL clearance (see 06_PHASE_5_WRITING.md §9 + PHASE_5_DESIGN.md §3.4).
Phase 6 EVAL gates fail if any writing-item id is missing from this lock or
differs from it.

Usage:
    python -m tools.snapshot_phase5_ids            # writes the lock
    python -m tools.snapshot_phase5_ids --check    # exits 1 if the lock is stale
"""

from __future__ import annotations

import argparse
import sys

from tools._common import CONTENT_DIR, console
from tools.snapshot_phase3_ids import _check_one, collect_ids

WRITING_DIR = CONTENT_DIR / "05_writing"
WRITING_LOCK = WRITING_DIR / "_id_freeze.lock"


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--check", action="store_true",
                   help="Exit 1 if current writing IDs differ from the existing lock.")
    args = p.parse_args(argv)

    if args.check:
        return _check_one(WRITING_DIR, WRITING_LOCK)

    ids = collect_ids(WRITING_DIR)
    WRITING_LOCK.parent.mkdir(parents=True, exist_ok=True)
    WRITING_LOCK.write_text("\n".join(ids) + "\n", encoding="utf-8")
    console.print(f"[green]freeze écrit : {WRITING_LOCK.relative_to(CONTENT_DIR.parent)} "
                  f"({len(ids)} IDs)[/green]")
    return 0


if __name__ == "__main__":
    sys.exit(main())

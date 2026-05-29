"""Freeze the Phase-6 speaking IDs into content/06_speaking/_id_freeze.lock.

Run on Phase 6 EVAL clearance (see 07_PHASE_6_SPEAKING.md §8 + PHASE_6_DESIGN.md §4).
Phase 7 EVAL gates fail if any speaking-item id is missing from this lock or
differs from it.

Usage:
    python -m tools.snapshot_phase6_ids            # writes the lock
    python -m tools.snapshot_phase6_ids --check    # exits 1 if the lock is stale
"""

from __future__ import annotations

import argparse
import sys

from tools._common import CONTENT_DIR, console
from tools.snapshot_phase3_ids import _check_one, collect_ids

SPEAKING_DIR = CONTENT_DIR / "06_speaking"
SPEAKING_LOCK = SPEAKING_DIR / "_id_freeze.lock"


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--check", action="store_true",
                   help="Exit 1 if current speaking IDs differ from the existing lock.")
    args = p.parse_args(argv)

    if args.check:
        return _check_one(SPEAKING_DIR, SPEAKING_LOCK)

    ids = collect_ids(SPEAKING_DIR)
    SPEAKING_LOCK.parent.mkdir(parents=True, exist_ok=True)
    SPEAKING_LOCK.write_text("\n".join(ids) + "\n", encoding="utf-8")
    console.print(f"[green]freeze écrit : {SPEAKING_LOCK.relative_to(CONTENT_DIR.parent)} "
                  f"({len(ids)} IDs)[/green]")
    return 0


if __name__ == "__main__":
    sys.exit(main())

"""Freeze the Phase-7 mock + cheatsheet + strategy IDs into per-directory lock files.

Run on Phase 7 EVAL clearance (see 08_PHASE_7_MOCKS_STRATEGY.md §9 + PHASE_7_DESIGN.md §11).
Phase 8 EVAL gates fail if any mock/cheatsheet/strategy id is missing from these locks
or differs from them.

Three locks are produced:
- content/07_mock_exams/_id_freeze.lock
- content/08_cheatsheets/_id_freeze.lock
- content/09_strategy/_id_freeze.lock

Usage:
    python -m tools.snapshot_phase7_ids            # writes the three locks
    python -m tools.snapshot_phase7_ids --check    # exits 1 if any lock is stale
"""

from __future__ import annotations

import argparse
import sys

from tools._common import CONTENT_DIR, console
from tools.snapshot_phase3_ids import _check_one, collect_ids

MOCK_DIR = CONTENT_DIR / "07_mock_exams"
CHEAT_DIR = CONTENT_DIR / "08_cheatsheets"
STRAT_DIR = CONTENT_DIR / "09_strategy"

MOCK_LOCK = MOCK_DIR / "_id_freeze.lock"
CHEAT_LOCK = CHEAT_DIR / "_id_freeze.lock"
STRAT_LOCK = STRAT_DIR / "_id_freeze.lock"

PAIRS = [
    (MOCK_DIR, MOCK_LOCK),
    (CHEAT_DIR, CHEAT_LOCK),
    (STRAT_DIR, STRAT_LOCK),
]


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--check", action="store_true",
                   help="Exit 1 if any current IDs differ from the existing locks.")
    args = p.parse_args(argv)

    if args.check:
        failures = 0
        for d, lock in PAIRS:
            if _check_one(d, lock) != 0:
                failures += 1
        return 1 if failures else 0

    for d, lock in PAIRS:
        ids = collect_ids(d)
        lock.parent.mkdir(parents=True, exist_ok=True)
        lock.write_text("\n".join(ids) + "\n", encoding="utf-8")
        console.print(f"[green]freeze écrit : {lock.relative_to(CONTENT_DIR.parent)} "
                      f"({len(ids)} IDs)[/green]")
    return 0


if __name__ == "__main__":
    sys.exit(main())

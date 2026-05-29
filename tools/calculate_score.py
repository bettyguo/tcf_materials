"""TCF Canada raw-score → CEFR → NCLC converter.

Source of truth: 01_PROJECT_CONTEXT.md §2 (IRCC + FEI 2024 tables, in effect for 2026 testing).

Usage:
    python -m tools.calculate_score --co 480 --ce 460 --ee 14 --eo 13

API:
    from tools.calculate_score import calculate_score, ScoreReport
    report = calculate_score(co=480, ce=460, ee=14, eo=13)
    print(report.summary())
"""
from __future__ import annotations

import argparse
import dataclasses
from typing import NamedTuple

# Table version — bump on IRCC/FEI table update.
TABLE_VERSION = "2024-IRCC-FEI"

# Per 01_PROJECT_CONTEXT.md §2 — exact thresholds.

# CO conversion bands: (raw_lo, raw_hi, cefr, nclc).
CO_BANDS: list[tuple[int, int, str, int]] = [
    (100, 198, "A1", 3),
    (199, 330, "A2", 4),
    (331, 368, "B1", 5),
    (369, 397, "B1", 6),
    (398, 457, "B2", 7),
    (458, 502, "B2", 7),
    (503, 522, "B2/C1", 8),
    (523, 548, "C1", 9),
    (549, 699, "C2", 10),
]

CE_BANDS: list[tuple[int, int, str, int]] = [
    (100, 206, "A1-A2", 4),
    (207, 289, "B1", 5),
    (290, 374, "B1/B2", 6),
    (375, 405, "B2", 7),
    (406, 452, "B2", 7),
    (453, 498, "B2", 7),
    (499, 523, "B2/C1", 8),
    (524, 548, "C1", 9),
    (549, 699, "C2", 10),
]

# EE/EO conversion: (score_lo, score_hi, cefr, nclc).
PROD_BANDS: list[tuple[int, int, str, int]] = [
    (0, 3, "A1", 3),
    (4, 5, "A1/A2", 4),
    (6, 9, "A2/B1", 5),
    (10, 11, "B1", 6),
    (12, 13, "B2", 7),
    (14, 15, "B2", 7),
    (16, 17, "C1", 8),  # 8 or 9
    (18, 20, "C1/C2", 10),
]


class Band(NamedTuple):
    cefr: str
    nclc: int


def _map(value: int, bands: list[tuple[int, int, str, int]], name: str) -> Band:
    if value < bands[0][0] or value > bands[-1][1]:
        raise ValueError(f"{name} score {value} out of valid range [{bands[0][0]}, {bands[-1][1]}]")
    for lo, hi, cefr, nclc in bands:
        if lo <= value <= hi:
            return Band(cefr, nclc)
    raise ValueError(f"{name} score {value} did not match any band (table gap?)")


def co_band(raw: int) -> Band:
    return _map(raw, CO_BANDS, "CO")


def ce_band(raw: int) -> Band:
    return _map(raw, CE_BANDS, "CE")


def ee_band(score: int) -> Band:
    return _map(score, PROD_BANDS, "EE")


def eo_band(score: int) -> Band:
    return _map(score, PROD_BANDS, "EO")


@dataclasses.dataclass(frozen=True)
class ScoreReport:
    co_raw: int
    ce_raw: int
    ee_score: int
    eo_score: int
    co: Band
    ce: Band
    ee: Band
    eo: Band

    @property
    def min_nclc(self) -> int:
        return min(self.co.nclc, self.ce.nclc, self.ee.nclc, self.eo.nclc)

    @property
    def crs_bonus(self) -> int:
        # IRCC: NCLC 7+ across all 4 = +50 CRS (if first official lang is English NCLC ≥ 9).
        # NCLC 7 across all = +50; NCLC 9+ across all = +50 (same bonus tier).
        return 50 if self.min_nclc >= 7 else 0

    def summary(self) -> str:
        lines = [
            f"TCF Canada — Rapport de score (table {TABLE_VERSION})",
            "=" * 60,
            f"  CO : {self.co_raw:>3} / 699  →  CEFR {self.co.cefr:<6}  NCLC {self.co.nclc}",
            f"  CE : {self.ce_raw:>3} / 699  →  CEFR {self.ce.cefr:<6}  NCLC {self.ce.nclc}",
            f"  EE : {self.ee_score:>3} /  20  →  CEFR {self.ee.cefr:<6}  NCLC {self.ee.nclc}",
            f"  EO : {self.eo_score:>3} /  20  →  CEFR {self.eo.cefr:<6}  NCLC {self.eo.nclc}",
            "-" * 60,
            f"  NCLC minimum (the binding score) : {self.min_nclc}",
        ]
        if self.crs_bonus:
            lines.append(f"  → CRS bonus français : +{self.crs_bonus} pts (si anglais NCLC ≥ 9)")
        else:
            gap = max(0, 7 - self.min_nclc)
            lines.append(f"  → Pas de bonus CRS pour le moment ; gap de {gap} bande(s) NCLC pour atteindre 7.")
        return "\n".join(lines)


def calculate_score(co: int, ce: int, ee: int, eo: int) -> ScoreReport:
    return ScoreReport(
        co_raw=co, ce_raw=ce, ee_score=ee, eo_score=eo,
        co=co_band(co), ce=ce_band(ce), ee=ee_band(ee), eo=eo_band(eo),
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="calculate_score", description=__doc__)
    parser.add_argument("--co", type=int, required=True, help="CO raw score, 100-699")
    parser.add_argument("--ce", type=int, required=True, help="CE raw score, 100-699")
    parser.add_argument("--ee", type=int, required=True, help="EE score, 0-20")
    parser.add_argument("--eo", type=int, required=True, help="EO score, 0-20")
    args = parser.parse_args(argv)
    report = calculate_score(co=args.co, ce=args.ce, ee=args.ee, eo=args.eo)
    print(report.summary())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

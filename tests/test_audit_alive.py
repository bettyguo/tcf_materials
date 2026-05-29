"""Proof-of-life test for the audit: feed it the fixture with intentional anglicisms,
confirm the heuristics catch them."""

from __future__ import annotations

from pathlib import Path

from tools._common import load_content
from tools.audit_french import (
    AuditReport,
    load_anglicisms,
    load_quebecisms,
    sweep_heuristics,
)

FIXTURE = Path(__file__).parent / "fixtures" / "anglicism_canary.md"


def test_anglicism_fixture_is_caught():
    assert FIXTURE.exists(), f"fixture manquante : {FIXTURE}"
    lc = load_content(FIXTURE, strict=True)
    report = AuditReport()
    sweep_heuristics(lc, report, load_anglicisms(), load_quebecisms())
    flagged = {f.kind for f in report.findings if f.kind == "anglicism"}
    assert flagged, (
        f"L'audit n'a détecté aucun anglicisme dans la fixture {FIXTURE.name}. "
        "Le flagger est-il cassé ?"
    )
    # We expect at least 3 of the 5 intentional patterns to fire (some overlap, some are minor).
    assert sum(1 for f in report.findings if f.kind == "anglicism") >= 3

"""ROADMAP.md must define all 12 weeks with day-block tables."""

from __future__ import annotations

import re

from tools._common import REPO_ROOT


def test_roadmap_exists():
    assert (REPO_ROOT / "ROADMAP.md").exists()


def test_roadmap_has_twelve_weeks():
    text = (REPO_ROOT / "ROADMAP.md").read_text(encoding="utf-8")
    week_headers = re.findall(r"^## Semaine \d+\b", text, flags=re.MULTILINE)
    assert len(week_headers) == 12, f"trouvé {len(week_headers)} semaines, attendu 12"


def test_roadmap_has_eighty_four_day_rows():
    text = (REPO_ROOT / "ROADMAP.md").read_text(encoding="utf-8")
    # Day rows look like:   | 14 (Jeu) | ...
    day_rows = re.findall(r"^\|\s*\d+\s*\([A-ZÉa-zé]+\)\s*\|", text, flags=re.MULTILINE)
    assert len(day_rows) == 84, f"trouvé {len(day_rows)} jours, attendu 84"


def test_roadmap_milestones_present():
    text = (REPO_ROOT / "ROADMAP.md").read_text(encoding="utf-8")
    for marker in ("Mock complet #1", "Mock complet #2", "Mock complet #3", "Mock complet #4"):
        assert marker in text, f"jalon manquant : {marker}"

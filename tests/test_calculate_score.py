"""Edge-case tests for tools/calculate_score.py."""
import pytest

from tools.calculate_score import (
    TABLE_VERSION,
    calculate_score,
    ce_band,
    co_band,
    ee_band,
    eo_band,
)


def test_table_version_pinned():
    assert TABLE_VERSION == "2024-IRCC-FEI"


def test_co_floor():
    assert co_band(100).nclc == 3


def test_co_nclc7_threshold():
    assert co_band(398).nclc == 7
    assert co_band(397).nclc == 6


def test_co_nclc9_threshold():
    assert co_band(523).nclc == 9


def test_co_ceiling():
    assert co_band(699).nclc == 10


def test_co_out_of_range():
    with pytest.raises(ValueError):
        co_band(50)
    with pytest.raises(ValueError):
        co_band(700)


def test_ce_nclc7_threshold():
    assert ce_band(375).nclc == 7


def test_ce_nclc9_threshold():
    assert ce_band(524).nclc == 9


def test_ee_nclc7_threshold():
    assert ee_band(12).nclc == 7
    assert ee_band(11).nclc == 6


def test_ee_nclc8_or_9():
    # 16-17 maps to NCLC 8 in our table (conservatively).
    assert ee_band(16).nclc == 8
    assert ee_band(18).nclc == 10


def test_eo_symmetric_to_ee():
    assert eo_band(12).nclc == 7
    assert eo_band(14).nclc == 7
    assert eo_band(17).nclc == 8


def test_full_report_min_nclc():
    r = calculate_score(co=480, ce=460, ee=14, eo=13)
    assert r.min_nclc == 7
    assert r.crs_bonus == 50


def test_no_bonus_when_one_below_7():
    r = calculate_score(co=480, ce=460, ee=14, eo=10)
    # eo=10 → NCLC 6; min is 6; no bonus.
    assert r.min_nclc == 6
    assert r.crs_bonus == 0


def test_canonical_strong_score():
    r = calculate_score(co=525, ce=525, ee=17, eo=17)
    assert r.co.nclc == 9
    assert r.ce.nclc == 9
    assert r.ee.nclc == 8
    assert r.eo.nclc == 8
    assert r.min_nclc == 8
    assert r.crs_bonus == 50


def test_summary_contains_nclc_min():
    r = calculate_score(co=480, ce=460, ee=14, eo=13)
    out = r.summary()
    assert "NCLC minimum" in out
    assert "CRS" in out


def test_edge_raw_100_co():
    # 100 is the floor of CO range; valid.
    r = calculate_score(co=100, ce=100, ee=0, eo=0)
    assert r.co.nclc == 3
    assert r.ce.nclc == 4
    assert r.ee.nclc == 3


def test_edge_raw_699_both():
    r = calculate_score(co=699, ce=699, ee=20, eo=20)
    assert r.co.nclc == 10
    assert r.ce.nclc == 10
    assert r.ee.nclc == 10
    assert r.eo.nclc == 10
    assert r.min_nclc == 10
    assert r.crs_bonus == 50


def test_raw_450_mid_b2():
    r = calculate_score(co=450, ce=450, ee=12, eo=12)
    assert r.min_nclc == 7  # all four exactly at threshold

"""Tests for the Phase 3 audit extensions: per-entry confidence, domain diversity,
and template-leak sentinel rejection."""

from __future__ import annotations

from collections import Counter

from tools._common import REPO_ROOT, LoadedContent
from tools.audit_french import (
    AuditReport,
    _parse_entry_attrs,
    check_domain_diversity,
    sweep_audit_entries,
    sweep_replace_sentinels,
)
from tools.models import CEFR, Frontmatter, Register, Section


def _loaded(body: str, *, sources: list[str] | None = None) -> LoadedContent:
    fm = Frontmatter(
        id="vocab-freq-01",
        title="Test",
        section=Section.VOCAB,
        cefr=CEFR.B1,
        nclc_target=6,
        estimated_minutes=10,
        register=Register.FRANCE,
        sources=sources or [],
    )
    path = REPO_ROOT / "content" / "02_vocabulary" / "frequency" / "01_test.md"
    return LoadedContent(path=path, relpath=path.relative_to(REPO_ROOT),
                         fm=fm, body=body, raw_metadata={})


# --- _parse_entry_attrs -----------------------------------------------------

def test_parse_entry_attrs_basic():
    assert _parse_entry_attrs("confidence=high domain=media") == {
        "confidence": "high", "domain": "media"}


def test_parse_entry_attrs_tolerates_extra_whitespace_and_case():
    assert _parse_entry_attrs("  Confidence=Medium   domain=Work  ") == {
        "confidence": "medium", "domain": "work"}


def test_parse_entry_attrs_ignores_bare_tokens():
    assert _parse_entry_attrs("confidence=low note") == {"confidence": "low"}


# --- sweep_audit_entries ----------------------------------------------------

def test_audit_entry_low_confidence_flagged_major():
    body = "### mot\n<!-- AUDIT-ENTRY: confidence=low domain=media -->\n"
    report = AuditReport()
    counter: Counter[str] = Counter()
    sweep_audit_entries(_loaded(body), report, counter)
    majors = [f for f in report.findings if f.kind == "entry-confidence"]
    assert len(majors) == 1
    assert majors[0].severity == "major"


def test_audit_entry_high_confidence_not_flagged_but_counted():
    body = "<!-- AUDIT-ENTRY: confidence=high domain=health -->"
    report = AuditReport()
    counter: Counter[str] = Counter()
    sweep_audit_entries(_loaded(body), report, counter)
    assert [f for f in report.findings if f.kind == "entry-confidence"] == []
    assert counter["health"] == 1


def test_audit_entry_tallies_domains_across_calls():
    report = AuditReport()
    counter: Counter[str] = Counter()
    for dom in ("media", "media", "work"):
        sweep_audit_entries(
            _loaded(f"<!-- AUDIT-ENTRY: confidence=high domain={dom} -->"), report, counter)
    assert counter == Counter({"media": 2, "work": 1})


def test_plain_audit_comment_not_confused_with_audit_entry():
    # The plain AUDIT comment regex must not swallow AUDIT-ENTRY, and vice-versa.
    from tools.audit_french import sweep_audit_comments
    body = "<!-- AUDIT-ENTRY: confidence=high domain=media -->\n<!-- AUDIT: vérifier ceci -->"
    report = AuditReport()
    sweep_audit_comments(_loaded(body), report)
    kinds = [f.kind for f in report.findings]
    assert "audit-comment" in kinds
    # AUDIT-ENTRY must NOT be reported as an unresolved audit comment.
    assert sum(1 for k in kinds if k == "audit-comment") == 1


# --- sweep_replace_sentinels ------------------------------------------------

def test_replace_sentinel_in_body_is_blocker():
    report = AuditReport()
    sweep_replace_sentinels(_loaded("source [REPLACE_franceculture2024_x]"), report)
    leaks = [f for f in report.findings if f.kind == "template-leak"]
    assert len(leaks) == 1
    assert leaks[0].severity == "blocker"


def test_replace_sentinel_in_sources_is_blocker():
    report = AuditReport()
    sweep_replace_sentinels(_loaded("clean body", sources=["[REPLACE_radio_xxx]"]), report)
    leaks = [f for f in report.findings if f.kind == "template-leak"]
    assert len(leaks) == 1
    assert leaks[0].severity == "blocker"


def test_clean_file_has_no_template_leak():
    report = AuditReport()
    sweep_replace_sentinels(_loaded("texte propre", sources=["[lemonde2024_x]"]), report)
    assert [f for f in report.findings if f.kind == "template-leak"] == []


# --- check_domain_diversity -------------------------------------------------

def test_domain_diversity_noop_when_corpus_small():
    report = AuditReport()
    check_domain_diversity(Counter({"media": 3, "work": 2}), report)  # total 5 < min_total
    assert report.findings == []


def test_domain_diversity_flags_too_few_domains():
    report = AuditReport()
    # 25 entries but only 3 distinct domains → < 6 minimum.
    check_domain_diversity(Counter({"media": 10, "work": 9, "health": 6}), report)
    msgs = [f.message for f in report.findings if f.kind == "domain-diversity"]
    assert any("domaine" in m.lower() for m in msgs)


def test_domain_diversity_flags_overconcentration():
    report = AuditReport()
    # 6 domains (passes count) but one dominates > 25%.
    counter = Counter({"media": 50, "work": 10, "health": 10,
                       "env": 10, "tech": 10, "culture": 10})
    check_domain_diversity(counter, report)
    msgs = [f.message for f in report.findings if f.kind == "domain-diversity"]
    assert any("media" in m for m in msgs)


def test_domain_diversity_passes_balanced_corpus():
    report = AuditReport()
    counter = Counter(dict.fromkeys(("media", "work", "health", "env", "tech", "culture", "society"), 5))
    check_domain_diversity(counter, report)
    assert [f for f in report.findings if f.kind == "domain-diversity"] == []

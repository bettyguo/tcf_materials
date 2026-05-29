"""Smoke test: audit script runs cleanly on the seed corpus (exit 0)."""

from __future__ import annotations

from tools.audit_french import run_audit


def test_audit_clean_on_seed():
    rc = run_audit(schema_only=False, write_report=False)
    # Heuristic flags don't fail the audit; schema errors / blockers do.
    assert rc == 0, "audit_french.py a échoué (rc != 0) sur le corpus seed"


def test_audit_schema_only():
    rc = run_audit(schema_only=True, write_report=False)
    assert rc == 0

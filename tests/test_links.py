"""prerequisites: IDs resolve; the prerequisites graph is acyclic; markdown links resolve."""

from __future__ import annotations

import re
from pathlib import Path
from types import SimpleNamespace

from tools._common import REPO_ROOT, iter_content_files, load_content
from tools.audit_french import AuditReport, sweep_prerequisites

MD_LINK = re.compile(r"\[[^\]]+\]\(([^)#]+)(#[^)]*)?\)")


def test_all_prerequisites_resolve(all_content):
    known = {lc.fm.id for lc in all_content}
    missing: list[str] = []
    for lc in all_content:
        for pre in lc.fm.prerequisites:
            if pre not in known:
                missing.append(f"{lc.path}: prerequisite '{pre}' introuvable")
    assert not missing, "\n".join(missing)


def test_prerequisites_graph_is_acyclic_on_real_corpus(all_content):
    """The real corpus must form a DAG. Independent of the audit's other findings."""
    report = AuditReport()
    sweep_prerequisites(all_content, report)
    cycles = [f for f in report.findings if f.kind == "schema" and "Cycle" in f.message]
    assert not cycles, "Cycle(s) détecté(s) :\n  " + "\n  ".join(f.message for f in cycles)


def _fake_loaded(node_id: str, prereqs: list[str]):
    """Build a minimal LoadedContent-shaped object for cycle-detection testing.

    `sweep_prerequisites` only reads `.fm.id`, `.fm.prerequisites`, and `.path`, so a
    duck-typed namespace is sufficient — avoids the full pydantic instantiation cost.
    """
    return SimpleNamespace(
        path=Path(f"/synthetic/{node_id}.md"),
        fm=SimpleNamespace(id=node_id, prerequisites=prereqs),
    )


def test_cycle_detection_flags_three_node_cycle():
    """Synthetic A→B→C→A cycle must be reported as a schema blocker."""
    loaded = [
        _fake_loaded("syn-a", ["syn-c"]),
        _fake_loaded("syn-b", ["syn-a"]),
        _fake_loaded("syn-c", ["syn-b"]),
    ]
    report = AuditReport()
    sweep_prerequisites(loaded, report)
    cycle_findings = [f for f in report.findings if "Cycle" in f.message]
    assert len(cycle_findings) == 1, (
        f"attendu 1 cycle, trouvé {len(cycle_findings)} : {[f.message for f in cycle_findings]}"
    )
    msg = cycle_findings[0].message
    # Every node in the cycle must appear in the reported path.
    for nid in ("syn-a", "syn-b", "syn-c"):
        assert nid in msg, f"{nid!r} absent du message: {msg!r}"
    assert cycle_findings[0].severity == "blocker"


def test_cycle_detection_flags_self_loop():
    """A node listing itself as a prerequisite is the degenerate cycle."""
    loaded = [_fake_loaded("syn-self", ["syn-self"])]
    report = AuditReport()
    sweep_prerequisites(loaded, report)
    cycles = [f for f in report.findings if "Cycle" in f.message]
    assert len(cycles) == 1
    assert "syn-self" in cycles[0].message


def test_cycle_detection_does_not_flag_dag():
    """A linear chain A→B→C with no back edge must not be flagged."""
    loaded = [
        _fake_loaded("syn-a", ["syn-b"]),
        _fake_loaded("syn-b", ["syn-c"]),
        _fake_loaded("syn-c", []),
    ]
    report = AuditReport()
    sweep_prerequisites(loaded, report)
    cycles = [f for f in report.findings if "Cycle" in f.message]
    assert not cycles, f"faux positif: {[f.message for f in cycles]}"


def test_local_markdown_links_resolve():
    """Every relative-path markdown link in body must point to an existing file."""
    broken: list[str] = []
    for path in iter_content_files():
        try:
            lc = load_content(path, strict=True)
        except Exception:
            continue
        for m in MD_LINK.finditer(lc.body):
            target = m.group(1).strip()
            if target.startswith(("http://", "https://", "mailto:", "tel:", "#")):
                continue
            if target.startswith("/"):
                # Repo-absolute path
                resolved = REPO_ROOT / target.lstrip("/")
            else:
                resolved = (path.parent / target).resolve()
            if not resolved.exists():
                broken.append(f"{path.relative_to(REPO_ROOT)} -> {target} (résolu en {resolved})")
    assert not broken, "Liens markdown cassés :\n  " + "\n  ".join(broken)

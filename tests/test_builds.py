"""End-to-end build smoke tests.

Each build that requires a system binary is skipped (not failed) if the binary is missing,
so the suite stays useful on a stock Windows machine.
"""

from __future__ import annotations

import subprocess

import pytest

from tests.conftest import has
from tools._common import REPO_ROOT


def _run(cmd: list[str]):
    return subprocess.run(cmd, cwd=REPO_ROOT, capture_output=True, text=True)


@pytest.mark.skipif(not has("mkdocs"), reason="mkdocs not installed (uv sync needed)")
def test_mkdocs_build_succeeds():
    res = _run(["mkdocs", "build", "--strict", "--clean"])
    assert res.returncode == 0, f"mkdocs build failed:\nSTDOUT:\n{res.stdout}\nSTDERR:\n{res.stderr}"


def test_build_anki_runs():
    # Imports + runs in-process; doesn't need any external binary.
    from tools import build_anki

    build_anki.main()
    assert (REPO_ROOT / "flashcards" / "dist" / "tcf-canada.apkg").exists()


@pytest.mark.needs_pandoc
@pytest.mark.skipif(not has("pandoc"), reason="pandoc not installed")
def test_build_epub_runs():
    from tools import build_epub

    build_epub.main()
    assert (REPO_ROOT / "pdf" / "tcf-canada-prep.epub").exists()


@pytest.mark.needs_pandoc
@pytest.mark.needs_xelatex
@pytest.mark.skipif(not (has("pandoc") and has("xelatex")), reason="pandoc + xelatex required")
def test_build_pdf_runs():
    from tools import build_pdf

    build_pdf.main()
    assert (REPO_ROOT / "pdf" / "tcf-canada-prep.pdf").exists()

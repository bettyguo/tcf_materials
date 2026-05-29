"""Build the monolithic PDF + per-section booklets via pandoc + XeLaTeX.

Pipeline:
  1. Walk content/ in roadmap order; concatenate Markdown bodies with chapter dividers.
  2. Strip frontmatter (pandoc would emit it as a code block otherwise) but inject a
     "⏱ N min" badge per file from estimated_minutes.
  3. Invoke pandoc with our custom XeLaTeX template (latex/tcf-template.tex).
  4. Per-section: produce one booklet per top-level numbered folder (00..10).

This is a minimum-viable PDF builder for Phase 1. Niceties (TOC styling, cross-refs,
glossary) come in Phase 8.
"""

from __future__ import annotations

import re
import subprocess
import sys
import tempfile
from pathlib import Path

from tools._common import (
    CONTENT_DIR,
    LATEX_DIR,
    PDF_DIR,
    REPO_ROOT,
    console,
    iter_loaded,
)

CONTENT_TOP_FOLDERS = [
    "00_diagnostic",
    "01_grammar",
    "02_vocabulary",
    "03_listening",
    "04_reading",
    "05_writing",
    "06_speaking",
    "07_mock_exams",
    "08_cheatsheets",
    "09_strategy",
    "10_canada_culture",
]


def _badge(minutes: int) -> str:
    return f"\n> ⏱ {minutes} min\n\n"


def _collect_section(folder: str) -> str:
    parts: list[str] = []
    section_root = CONTENT_DIR / folder
    if not section_root.exists():
        return ""
    for lc in iter_loaded(strict=True):
        if isinstance(lc, Exception):
            continue
        if not str(lc.path).startswith(str(section_root)):
            continue
        if lc.fm.stub:
            continue
        body = lc.body
        # Drop ## SCRIPT blocks from PDF (they're for audio generation, not for the reader)
        body = re.sub(r"\n## SCRIPT.*?(?=\n## |\Z)", "", body, flags=re.DOTALL)
        parts.append(f"\n\n# {lc.fm.title}\n\n{_badge(lc.fm.estimated_minutes)}{body}\n")
    return "".join(parts)


def _pandoc(input_md: Path, out_pdf: Path, title: str) -> int:
    template = LATEX_DIR / "tcf-template.tex"
    cmd = [
        "pandoc",
        str(input_md),
        "-o", str(out_pdf),
        "--pdf-engine=xelatex",
        "--template", str(template),
        "--toc",
        "--top-level-division=chapter",
        "-M", f"title={title}",
        "-M", "lang=fr",
        "-V", "documentclass=book",
    ]
    console.print(f"[cyan]$[/] {' '.join(cmd)}")
    return subprocess.run(cmd, cwd=REPO_ROOT).returncode


def main() -> None:
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    monolith_parts: list[str] = []

    for folder in CONTENT_TOP_FOLDERS:
        section_md = _collect_section(folder)
        if not section_md.strip():
            continue
        monolith_parts.append(section_md)

        # Per-section booklet
        with tempfile.NamedTemporaryFile("w", suffix=".md", delete=False, encoding="utf-8") as tf:
            tf.write(f"# {folder.replace('_', ' ').title()}\n\n")
            tf.write(section_md)
            section_input = Path(tf.name)
        out_pdf = PDF_DIR / f"{folder}.pdf"
        rc = _pandoc(section_input, out_pdf, folder.replace("_", " ").title())
        section_input.unlink(missing_ok=True)
        if rc != 0:
            console.print(f"[yellow]Section PDF {folder} failed (rc={rc}); continuing.[/]")

    # Monolithic book
    with tempfile.NamedTemporaryFile("w", suffix=".md", delete=False, encoding="utf-8") as tf:
        tf.write("\n".join(monolith_parts))
        mono_input = Path(tf.name)
    out_book = PDF_DIR / "tcf-canada-prep.pdf"
    rc = _pandoc(mono_input, out_book, "TCF Canada — Préparation B1→C1")
    mono_input.unlink(missing_ok=True)
    if rc != 0:
        console.print(f"[red]Monolithic PDF failed (rc={rc}).[/]")
        sys.exit(rc)
    console.print(f"[green]PDF:[/] wrote {out_book}")


if __name__ == "__main__":
    main()

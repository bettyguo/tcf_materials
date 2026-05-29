"""Build the EPUB via pandoc → EPUB3."""

from __future__ import annotations

import subprocess
import sys
import tempfile
from pathlib import Path

from tools._common import PDF_DIR, REPO_ROOT, console
from tools.build_pdf import CONTENT_TOP_FOLDERS, _collect_section


def main() -> None:
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    parts = []
    for folder in CONTENT_TOP_FOLDERS:
        sec = _collect_section(folder)
        if sec.strip():
            parts.append(sec)
    with tempfile.NamedTemporaryFile("w", suffix=".md", delete=False, encoding="utf-8") as tf:
        tf.write("\n".join(parts))
        src = Path(tf.name)
    out = PDF_DIR / "tcf-canada-prep.epub"
    cmd = [
        "pandoc",
        str(src),
        "-o", str(out),
        "--toc",
        "--top-level-division=chapter",
        "-M", "title=TCF Canada — Préparation B1→C1",
        "-M", "lang=fr",
        "-M", "author=TCF Canada Prep contributors",
    ]
    console.print(f"[cyan]$[/] {' '.join(cmd)}")
    rc = subprocess.run(cmd, cwd=REPO_ROOT).returncode
    src.unlink(missing_ok=True)
    if rc != 0:
        sys.exit(rc)
    console.print(f"[green]EPUB:[/] wrote {out}")


if __name__ == "__main__":
    main()

"""Build the MkDocs site. Thin wrapper that calls `mkdocs build --strict`."""

from __future__ import annotations

import subprocess
import sys

from tools._common import REPO_ROOT, console


def main() -> None:
    cmd = ["mkdocs", "build", "--strict", "--clean"]
    console.print(f"[cyan]$[/] {' '.join(cmd)}")
    rc = subprocess.run(cmd, cwd=REPO_ROOT).returncode
    if rc != 0:
        console.print(f"[red]mkdocs build failed (rc={rc}).[/]")
        sys.exit(rc)
    console.print("[green]Site:[/] built to ./site")


if __name__ == "__main__":
    main()

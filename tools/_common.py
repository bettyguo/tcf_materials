"""Shared helpers: repo walking, frontmatter parsing, logging."""

from __future__ import annotations

import hashlib
from collections.abc import Iterator
from dataclasses import dataclass
from pathlib import Path

import frontmatter
from pydantic import ValidationError
from rich.console import Console

from tools.models import Frontmatter

REPO_ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = REPO_ROOT / "content"
TOOLS_DIR = REPO_ROOT / "tools"
AUDIO_DIR = REPO_ROOT / "audio"
SITE_DIR = REPO_ROOT / "site"
PDF_DIR = REPO_ROOT / "pdf"
FLASHCARDS_DIR = REPO_ROOT / "flashcards"
LATEX_DIR = REPO_ROOT / "latex"

console = Console()


@dataclass
class LoadedContent:
    path: Path
    relpath: Path        # relative to REPO_ROOT
    fm: Frontmatter
    body: str
    raw_metadata: dict   # original yaml dict before pydantic parsing

    @property
    def script(self) -> str | None:
        """Extract the ## SCRIPT block (audio script) if present."""
        lines = self.body.splitlines()
        out: list[str] = []
        capturing = False
        for line in lines:
            if line.strip().lower().startswith("## script"):
                capturing = True
                continue
            if capturing and line.startswith("## "):
                break
            if capturing:
                out.append(line)
        text = "\n".join(out).strip()
        return text or None

    def script_hash(self) -> str:
        s = self.script or ""
        return hashlib.sha256(s.encode("utf-8")).hexdigest()[:16]


class ContentLoadError(Exception):
    def __init__(self, path: Path, errors: list[str]):
        self.path = path
        self.errors = errors
        super().__init__(f"{path}: " + "; ".join(errors))


def iter_content_files(root: Path | None = None) -> Iterator[Path]:
    """Yield every .md under content/ except files in folders starting with _ (quarantine)."""
    root = root or CONTENT_DIR
    if not root.exists():
        return
    for p in sorted(root.rglob("*.md")):
        # Skip files under any folder that starts with an underscore (quarantine convention).
        if any(part.startswith("_") for part in p.relative_to(root).parts):
            continue
        yield p


def load_content(path: Path, *, strict: bool = True) -> LoadedContent:
    """Parse a content file. Raises ContentLoadError on schema violations when strict=True."""
    post = frontmatter.load(path)
    raw = dict(post.metadata)
    try:
        fm = Frontmatter.model_validate(raw)
    except ValidationError as e:
        errors = [f"{'.'.join(map(str, err['loc']))}: {err['msg']}" for err in e.errors()]
        if strict:
            raise ContentLoadError(path, errors) from e
        # Return a minimal stub with the raw dict on the side; caller decides what to do.
        raise ContentLoadError(path, errors) from e
    return LoadedContent(
        path=path,
        relpath=path.relative_to(REPO_ROOT),
        fm=fm,
        body=post.content,
        raw_metadata=raw,
    )


def iter_loaded(*, strict: bool = True) -> Iterator[LoadedContent | ContentLoadError]:
    """Load every content file, yielding either a LoadedContent or an error sentinel."""
    for path in iter_content_files():
        try:
            yield load_content(path, strict=strict)
        except ContentLoadError as err:
            yield err

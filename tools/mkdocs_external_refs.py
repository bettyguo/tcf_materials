"""MkDocs `on_page_markdown` hook: rewrite repo-external relative refs to GitHub URLs.

The corpus contains many cross-references from `content/*.md` to files outside
`docs_dir`: the framing prompt bundle (`00..09_*.md`), the BACKLOG / ROADMAP /
CHANGELOG / README at repo root, the `tools/` and `latex/` source trees, and
`references.bib`. These resolve at the filesystem level (which is why
`tests/test_links.py` is green) but `mkdocs build --strict` rejects them because
they don't map to a page inside the site.

This hook intercepts each page's markdown right before rendering and rewrites
the matching `[text](../../target)` patterns to absolute `repo_url` URLs. The
source markdown is left untouched on disk — only the rendered HTML changes.

Wired in mkdocs.yml via:

    hooks:
      - tools/mkdocs_estimated_minutes.py
      - tools/mkdocs_external_refs.py

extra:
  repo_url: https://github.com/example/tcf-canada-prep/tree/main/
"""

from __future__ import annotations

import re
from pathlib import PurePosixPath
from typing import Any

LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")

# Top-level repo entries that, when reached by a relative link, should be
# rewritten to repo_url + path. Anything under content/ stays internal.
EXTERNAL_EXTS = (".md", ".bib", ".py", ".tex", ".yaml", ".yml", ".txt")


def _is_external(target: str) -> bool:
    """Heuristic: does this relative target escape the docs_dir?"""
    if target.startswith(("http://", "https://", "mailto:", "tel:", "#")):
        return False
    if target.startswith("/"):
        return False  # repo-absolute, handled separately
    # Split off any anchor / query
    bare = target.split("#", 1)[0].split("?", 1)[0]
    if not bare:
        return False
    # Only consider explicit `../` ascent. Targets without `../` are intra-page.
    if not bare.startswith("../"):
        return False
    return bare.endswith(EXTERNAL_EXTS)


def _rewrite(target: str, page_src_path: PurePosixPath, docs_dir: PurePosixPath, repo_url: str) -> str | None:
    """Rewrite an external relative target to a repo_url-anchored URL.

    Returns None when the target stays inside docs_dir (no rewrite needed).
    """
    bare, _, anchor = target.partition("#")
    # Page's parent within the repo, e.g. PurePosixPath("content/09_strategy")
    page_dir = page_src_path.parent
    # Resolve manually to avoid Path.resolve() touching the filesystem
    parts = list(page_dir.parts)
    for piece in bare.split("/"):
        if piece in ("", "."):
            continue
        if piece == "..":
            if parts:
                parts.pop()
            continue
        parts.append(piece)
    resolved = PurePosixPath(*parts) if parts else PurePosixPath(".")
    # Keep intra-content refs alone — mkdocs handles them natively
    docs_parts = docs_dir.parts
    if len(resolved.parts) >= len(docs_parts) and resolved.parts[: len(docs_parts)] == docs_parts:
        return None
    url = repo_url.rstrip("/") + "/" + str(resolved).replace("\\", "/")
    return url + (f"#{anchor}" if anchor else "")


def on_page_markdown(markdown: str, page: Any, config: Any, files: Any) -> str:
    extra = (config or {}).get("extra") or {}
    repo_url = extra.get("repo_url") or "https://github.com/example/tcf-canada-prep/tree/main"
    docs_dir_name = (config or {}).get("docs_dir") or "content"
    docs_dir = PurePosixPath(PurePosixPath(docs_dir_name).name)

    # Page source path relative to repo root, e.g. PurePosixPath("content/09_strategy/03_ee_strategy.md")
    try:
        rel_src = PurePosixPath(page.file.src_path.replace("\\", "/"))
        page_src_path = docs_dir / rel_src
    except AttributeError:
        return markdown

    def repl(match: re.Match[str]) -> str:
        text, target = match.group(1), match.group(2)
        target = target.strip()
        if not _is_external(target):
            return match.group(0)
        new = _rewrite(target, page_src_path, docs_dir, repo_url)
        if new is None:
            return match.group(0)
        return f"[{text}]({new})"

    return LINK_RE.sub(repl, markdown)

"""MkDocs `on_page_markdown` hook: prepend a "⏱ N min" badge from frontmatter.

Wired in mkdocs.yml via:

    hooks:
      - tools/mkdocs_estimated_minutes.py
"""

from __future__ import annotations

import re
from typing import Any

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


def on_page_markdown(markdown: str, page: Any, config: Any, files: Any) -> str:
    meta = getattr(page, "meta", {}) or {}
    minutes = meta.get("estimated_minutes")
    if minutes is None:
        return markdown
    badge = f'!!! info inline "⏱ {minutes} min"\n    Section : **{meta.get("section", "?")}** · CEFR **{meta.get("cefr", "?")}** · NCLC cible **{meta.get("nclc_target", "?")}**\n\n'
    return badge + markdown

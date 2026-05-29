"""Filename conventions: no spaces or accents in filenames (cross-platform sync)."""

from __future__ import annotations

import unicodedata

from tools._common import iter_content_files


def test_no_spaces_in_filenames():
    for path in iter_content_files():
        assert " " not in path.name, f"espace dans le nom : {path}"


def test_filenames_are_ascii_safe():
    for path in iter_content_files():
        # Strip accents; if anything non-ascii remains, fail.
        stripped = unicodedata.normalize("NFKD", path.name).encode("ascii", "ignore").decode("ascii")
        # Stripping accents shouldn't change length for ascii-only names; longer original ⇒ had accents.
        normalized_no_combine = "".join(
            c for c in unicodedata.normalize("NFKD", path.name) if not unicodedata.combining(c)
        )
        assert normalized_no_combine == path.name, f"accent dans le nom : {path}"
        assert stripped == path.name, f"caractère non-ASCII dans le nom : {path}"

"""Every content file must parse against the Frontmatter model."""

from __future__ import annotations

import pytest

from tools._common import ContentLoadError, iter_content_files, load_content


def test_all_content_files_parse():
    failures: list[tuple[str, list[str]]] = []
    count = 0
    for path in iter_content_files():
        count += 1
        try:
            load_content(path, strict=True)
        except ContentLoadError as e:
            failures.append((str(e.path), e.errors))
    assert count > 0, "no content files found — content/ skeleton broken"
    if failures:
        msg = "Frontmatter schema failures:\n" + "\n".join(
            f"  {p}\n    " + "\n    ".join(errs) for p, errs in failures
        )
        pytest.fail(msg)


def test_ids_unique(all_content):
    seen: dict[str, str] = {}
    dupes: list[str] = []
    for lc in all_content:
        if lc.fm.id in seen:
            dupes.append(f"{lc.fm.id} : {seen[lc.fm.id]} et {lc.path}")
        else:
            seen[lc.fm.id] = str(lc.path)
    assert not dupes, "IDs en double : " + "; ".join(dupes)


def test_nclc_target_in_range(all_content):
    for lc in all_content:
        assert 1 <= lc.fm.nclc_target <= 12, f"{lc.path}: nclc_target hors plage"


def test_estimated_minutes_reasonable(all_content):
    for lc in all_content:
        assert 1 <= lc.fm.estimated_minutes <= 240, (
            f"{lc.path}: estimated_minutes={lc.fm.estimated_minutes} suspect"
        )


def test_audio_required_has_voice(all_content):
    """If audio.required=true, audio.voice must be set."""
    for lc in all_content:
        if lc.fm.audio.required:
            assert lc.fm.audio.voice, f"{lc.path}: audio.required mais audio.voice manquant"


def test_audio_required_has_script_block(all_content):
    for lc in all_content:
        if lc.fm.audio.required:
            assert lc.script, f"{lc.path}: audio.required mais bloc '## SCRIPT' manquant ou vide"

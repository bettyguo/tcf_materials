"""Every file with audio.required=true must have a `## SCRIPT` block with non-empty content."""

from __future__ import annotations


def test_audio_scripts_present(all_content):
    missing: list[str] = []
    for lc in all_content:
        if lc.fm.audio.required and (not lc.script or not lc.script.strip()):
            missing.append(str(lc.path))
    assert not missing, "Bloc '## SCRIPT' manquant pour : " + ", ".join(missing)

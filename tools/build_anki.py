"""Build the Anki deck from content frontmatter flashcards.

Three subdecks under one parent `TCF Canada::`:
- `01_Vocabulaire` — `confidence: high` flashcards (the shipped queue).
- `02_Patterns` — i+1 cloze cards from sentence patterns (Phase 3 §5.2; may be empty until that batch lands).
- `99_Quarantine` — `confidence: medium` flashcards (opt-in for learners; per Phase 3 §5.3).

`confidence: low` flashcards are excluded entirely — those items live in `_pending_native_review/` per
master prompt §0.2.

Card GUID = first 16 hex of md5(f"{file_id}:{front}") — deterministic across rebuilds.
"""

from __future__ import annotations

import hashlib
from pathlib import Path

import genanki

from tools._common import FLASHCARDS_DIR, console, iter_loaded
from tools.models import Confidence

VOCAB_MODEL_ID = 1607392301
SENTENCE_MODEL_ID = 1607392302
DECK_VOCAB_ID = 2059400001
DECK_SENTENCE_ID = 2059400002
DECK_QUARANTINE_ID = 2059400099

VOCAB_MODEL = genanki.Model(
    VOCAB_MODEL_ID,
    "TCF Vocabulary",
    fields=[
        {"name": "Front"},
        {"name": "Back"},
        {"name": "Source"},
        {"name": "Tags"},
    ],
    templates=[
        {
            "name": "Card 1",
            "qfmt": "<div class='front'>{{Front}}</div>",
            "afmt": "{{FrontSide}}<hr id='answer'><div class='back'>{{Back}}</div>"
                    "<div class='source'>{{Source}}</div>",
        }
    ],
    css="""
    .card { font-family: 'Linux Libertine','Georgia',serif; font-size: 20px; text-align: center; }
    .front { font-weight: 600; }
    .back  { color: #1f3a68; margin-top: 0.5em; }
    .source { color: #999; font-size: 0.7em; margin-top: 1.5em; }
    """,
)

SENTENCE_MODEL = genanki.Model(
    SENTENCE_MODEL_ID,
    "TCF Sentence Pattern (cloze)",
    fields=[{"name": "Text"}, {"name": "Extra"}],
    templates=[
        {
            "name": "Cloze",
            "qfmt": "{{cloze:Text}}",
            "afmt": "{{cloze:Text}}<br><div class='extra'>{{Extra}}</div>",
        }
    ],
    model_type=genanki.Model.CLOZE,
    css=".card { font-family: 'Linux Libertine','Georgia',serif; font-size: 22px; } "
        ".extra { color: #1f3a68; font-size: 0.7em; margin-top: 1em; }",
)


def _guid(file_id: str, front: str) -> str:
    digest = hashlib.md5(f"{file_id}:{front}".encode()).hexdigest()
    return digest[:16]


def _make_note(entry, loaded) -> genanki.Note:
    tags = sorted({loaded.fm.cefr.value.lower(), loaded.fm.section.value,
                   loaded.fm.register.value, *entry.tags, *loaded.fm.tags})
    return genanki.Note(
        model=VOCAB_MODEL,
        fields=[entry.front, entry.back, loaded.relpath.as_posix(), " ".join(tags)],
        guid=_guid(loaded.fm.id, entry.front),
        tags=[t.replace(" ", "_") for t in tags],
    )


def main() -> None:
    vocab_deck = genanki.Deck(DECK_VOCAB_ID, "TCF Canada::01_Vocabulaire")
    sentence_deck = genanki.Deck(DECK_SENTENCE_ID, "TCF Canada::02_Patterns")
    quarantine_deck = genanki.Deck(DECK_QUARANTINE_ID, "TCF Canada::99_Quarantine")

    vocab_count = sentence_count = quarantine_count = 0
    for loaded in iter_loaded(strict=True):
        if isinstance(loaded, Exception):
            console.print(f"[yellow]skip (schema error):[/] {loaded}")
            continue
        if not loaded.fm.flashcard:
            continue
        for entry in loaded.fm.flashcard:
            note = _make_note(entry, loaded)
            if entry.confidence == Confidence.HIGH:
                vocab_deck.add_note(note)
                vocab_count += 1
            elif entry.confidence == Confidence.MEDIUM:
                quarantine_deck.add_note(note)
                quarantine_count += 1
            # confidence: low → excluded from all decks per Phase 3 §5.3

    out_dir: Path = FLASHCARDS_DIR / "dist"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "tcf-canada.apkg"
    genanki.Package([vocab_deck, sentence_deck, quarantine_deck]).write_to_file(str(out_path))

    console.print(f"[green]Anki:[/] wrote {out_path} "
                  f"({vocab_count} vocab, {sentence_count} sentence, "
                  f"{quarantine_count} quarantine cards)")


if __name__ == "__main__":
    main()

# TCF Canada Prep — task definitions.
# `just <target>` on any platform. `make <target>` aliases to the same via the Makefile shim.
# Primary entry point is `python -m tools.cli` so this works even without `just` installed.

set windows-shell := ["powershell.exe", "-NoProfile", "-Command"]

default:
    @just --list

install:
    uv sync --extra dev

# Build the MkDocs site.
site:
    uv run python -m tools.cli build-site

# Build the Anki deck.
anki:
    uv run python -m tools.cli build-anki

# Generate TTS audio for all files with `audio.required: true`. Skips unchanged scripts.
audio:
    uv run python -m tools.cli build-audio

# Build the PDF (requires pandoc + xelatex). Falls back to a clear error if missing.
pdf:
    uv run python -m tools.cli build-pdf

# Build EPUB (requires pandoc).
epub:
    uv run python -m tools.cli build-epub

# Run the adversarial French audit.
audit:
    uv run python -m tools.cli audit

# Run pytest.
test:
    uv run pytest

# Run lint.
lint:
    uv run ruff check tools tests

# Format.
fmt:
    uv run ruff format tools tests

# Serve the site locally.
serve:
    uv run mkdocs serve

# Full build of every artefact (skips audio in CI; run `just audio` separately if needed).
all: site anki epub pdf

# Build everything including audio (local dev convenience).
all-local: site anki audio epub pdf

# Clean build outputs.
clean:
    @powershell -NoProfile -Command "Remove-Item -Recurse -Force site, pdf, audio, flashcards/dist, audit_samples -ErrorAction SilentlyContinue; exit 0"

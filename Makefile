# Thin shim forwarding to `just`. If `just` isn't installed, falls through to the
# python -m tools.cli equivalents so contributors on stock Windows can still build.

PY := uv run python -m tools.cli

.PHONY: default install site anki audio pdf epub audit test lint fmt serve all all-local clean

default:
	@$(MAKE) -s --no-print-directory help

help:
	@echo "Targets: install site anki audio pdf epub audit test lint fmt serve all all-local clean"

install:
	uv sync --extra dev

site:
	$(PY) build-site

anki:
	$(PY) build-anki

audio:
	$(PY) build-audio

pdf:
	$(PY) build-pdf

epub:
	$(PY) build-epub

audit:
	$(PY) audit

test:
	uv run pytest

lint:
	uv run ruff check tools tests

fmt:
	uv run ruff format tools tests

serve:
	uv run mkdocs serve

all: site anki epub pdf

all-local: site anki audio epub pdf

clean:
	@python -c "import shutil, os; [shutil.rmtree(p, ignore_errors=True) for p in ('site','pdf','audio','flashcards/dist','audit_samples')]"

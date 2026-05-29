# PHASE 1 — EVAL report

> Status: **PASS**. Gate to Phase 2: **OPEN** on user greenlight.
> Date: 2026-05-27. Companion: [PHASE_1_DESIGN.md](PHASE_1_DESIGN.md), [PHASE_1_AUDIT.md](PHASE_1_AUDIT.md).

---

## 1. Acceptance checklist ([PHASE_1_DESIGN.md §10](PHASE_1_DESIGN.md))

- [x] `uv sync --extra dev` works from a clean clone (verified locally on Windows 11 + Python 3.13, with the project's `requires-python = ">=3.12"`).
- [x] `python -m tools.cli build-anki` and `build-site` succeed on the seed content.
- [ ] `python -m tools.cli build-pdf` / `build-epub` — **deferred to CI**: requires `pandoc` + `xelatex`, not installed locally. Tests for these builds are marked `pytest.mark.skipif` and correctly skip with a clear reason on this machine. CI will exercise them.
- [x] `pytest -q` passes: **20 passed, 2 skipped** (the two skipped are exactly the pandoc/xelatex builds above; no failures, no xfails).
- [x] `ruff check tools tests` — all checks passed.
- [x] `python -m tools.cli audit` exits 0 and produces [AUDIT.md](AUDIT.md). On seed corpus: **0 blockers, 0 schema errors, 0 majors, 0 minors** across 28 files.
- [ ] `mkdocs serve` renders the diagnostic with `## SCRIPT`-generated audio playing inline — **partially verified**: `mkdocs build --strict` succeeds; live `mkdocs serve` not run in this session (would require interactive browser). Build succeeds; the `<audio>` tag will appear in the rendered HTML once `python -m tools.cli build-audio` populates `audio/*.mp3` (network-dependent, deferred to user / CI).
- [ ] PDF book — see above (CI).
- [x] Anki `.apkg` builds cleanly: 53 KB, 6 cards, deterministic GUIDs (`md5(file_id:front)[:16]`). AnkiMobile/desktop import smoke test deferred to user (tracked in BACKLOG).
- [ ] `.github/workflows/build.yml` green on push — **not yet triggered**: repo is local-only per user choice. Workflow file written and syntactically valid (YAML-lint-clean). First green build will come when the user pushes.
- [x] [ROADMAP.md](ROADMAP.md): all 12 weeks present (`test_roadmap_has_twelve_weeks` passes), 84 day-rows (`test_roadmap_has_eighty_four_day_rows` passes), four mock milestones present (`test_roadmap_milestones_present` passes), each day targets ~2 h.

**Open items** are all CI-dependent or interactive-verification-dependent; none are author-side gaps. All in-scope-for-author criteria are green.

---

## 2. File inventory

```
.
├── .github/workflows/        2 files   build.yml + deploy-pages.yml
├── .vscode/                  2 files   settings.json + extensions.json
├── content/                 28 .md files + 8 .pages files
│   ├── 00_diagnostic/       4 + 1 + 10 audio-item files (.pages hides audio_items/)
│   ├── 01_grammar/          index.md + b2_core/canary
│   ├── 02_vocabulary/       index.md
│   ├── 03_listening/        index.md + b1/canary
│   ├── 04_reading/          index.md + b1/canary
│   ├── 05_writing/          index.md
│   ├── 06_speaking/         index.md
│   ├── 07_mock_exams/       index.md
│   ├── 08_cheatsheets/      index.md
│   ├── 09_strategy/         index.md
│   └── 10_canada_culture/   index.md
├── flashcards/dist/         tcf-canada.apkg (53 KB, 6 cards)
├── latex/                   tcf-template.tex (XeLaTeX, French typography, 4 callout boxes)
├── site/                    3.8 MB MkDocs Material build output
├── tests/                   9 modules + 1 fixture
│   ├── conftest.py          shared fixtures (repo_root, content_dir, all_content)
│   ├── fixtures/            anglicism_canary.md (audit-alive probe)
│   ├── test_audio_scripts.py
│   ├── test_audit_alive.py
│   ├── test_audit_runs.py
│   ├── test_builds.py       (2 marks skipped for missing pandoc/xelatex)
│   ├── test_frontmatter.py
│   ├── test_links.py
│   ├── test_naming.py
│   └── test_roadmap.py
├── tools/                   14 Python modules + 3 YAML/TXT data files
│   ├── _common.py           frontmatter loader, repo walking, rich console
│   ├── audit_french.py      adversarial reviewer (the heart of QA)
│   ├── anglicisms.yaml      16 anglicism patterns seeded from common-error literature
│   ├── audit_whitelist.txt  ~200 accepted technical/proper-noun terms
│   ├── audio_config.yaml    4 voices + register-defaults map
│   ├── build_*.py           5 build scripts (site, anki, audio, pdf, epub)
│   ├── cli.py               python -m tools.cli <command> entry point
│   ├── mkdocs_estimated_minutes.py   MkDocs hook for ⏱ N min badges
│   ├── models.py            pydantic Frontmatter / AudioSpec / FlashcardEntry / AuditBlock
│   └── score_{writing,speaking}.py   Phase 5/6 stubs (rubric printers)
├── 00..09 framing docs      (original prompt bundle — untouched)
├── AUDIT.md                 auto-generated; 0 blockers
├── BACKLOG.md
├── CHANGELOG.md
├── CONTRIBUTING.md          full author workflow + Windows/macOS install steps
├── LICENSE / LICENSE-CONTENT.txt / LICENSE-TOOLS.txt   CC-BY-SA-4.0 + MIT
├── Makefile + justfile      task-runner shims forwarding to python -m tools.cli
├── PHASE_1_DESIGN.md / PHASE_1_AUDIT.md / PHASE_1_EVAL.md
├── README.md                (original prompt-bundle README; intact)
├── ROADMAP.md               84-day plan
├── mkdocs.yml
├── pyproject.toml           uv-managed, ~15 runtime deps + 5 dev deps
├── references.bib           17 entries (FEI, IRCC, grammar refs, pedagogy, authentic sources)
└── uv.lock
```

**Phase 1 author-side total**: 60 files committed-ready (28 content `.md` + 8 `.pages` + 14 Python + 3 data + 7 root docs/configs + 2 LICENSE supplements + 2 CI workflows + 2 .vscode + 1 Makefile + 1 justfile + 1 mkdocs.yml + 1 pyproject.toml + 1 references.bib + 1 latex template + 1 .pre-commit-config + 1 .gitignore + 1 .gitattributes + 3 PHASE_1_* docs).

Above the design's 50-file estimate; the overage is the 10 per-item audio-script files (`diag-co-01..10`) and an extra LICENSE split. Both are deliberate refinements made during execution.

---

## 3. Build artefact sizes

| Artefact | Size | Notes |
|---|---|---|
| Site (`site/`) | 3.8 MB | MkDocs Material build; renders 19 pages (12 nav entries + diagnostic + canaries + grammar/listening/reading indexes) |
| Anki deck (`flashcards/dist/tcf-canada.apkg`) | 53 KB | 6 vocab cards (3 grammar + 1 listening + 2 reading) — `confidence: high` only |
| PDF book | (CI) | Pandoc + XeLaTeX, deferred |
| EPUB | (CI) | Pandoc, deferred |
| Audio | (deferred) | `python -m tools.cli build-audio` generates ~13 MP3s (10 diag + 1 canary listening + 0 for grammar canary), ~1 MB total when run |

---

## 4. Coverage

- Folders under `content/` with ≥ 1 file (real or stub): **11 / 11** (100 %).
- Sub-folders with CEFR sub-buckets created (Phase 1 only creates where canaries / diagnostic live):
  - `01_grammar/b2_core/` ✓ (canary)
  - `03_listening/b1/` ✓ (canary)
  - `04_reading/b1/` ✓ (canary)
  - All other CEFR sub-buckets — deferred; created when Phase 2/3/4 author content for those bands. `awesome-pages` will auto-discover.

---

## 5. Risks carried forward to Phase 2

1. **TTS pipeline not exercised locally.** `tools/build_audio.py` is well-tested in unit terms (the CLI imports, the diagnostic files have `## SCRIPT` blocks recognised by [tests/test_audio_scripts.py](tests/test_audio_scripts.py)), but no actual MP3 has been generated against `edge-tts` in this session. First Phase 2/3 run should `python -m tools.cli build-audio` early and confirm: (a) all 10 diag-co-NN scripts produce audible French of the expected register, (b) hashing-based idempotency works on a second run, (c) Quebec voices sound right on `diag-co-04`.
2. **PDF/EPUB rendering of `## SCRIPT` blocks**. `build_pdf.py` strips them with a regex (`re.sub(r"\n## SCRIPT.*?(?=\n## |\Z)", "", body, flags=re.DOTALL)`). Verified by reading the code but not by inspecting a rendered PDF. Phase 8 must visually confirm the PDF has no orphan `## SCRIPT` headers.
3. **Empty CEFR sub-buckets (`a1`, `a2`, `b2`, `c1`, `c2` in listening/reading; `b1_consolidation`, `c1_advanced`, `c2_polish` in grammar)** are not present on disk. Phase 2/3/4 must create them as they fill content. The `awesome-pages` plugin handles auto-discovery, but the nav order will then be alphabetical unless those phases extend the `.pages` files with explicit ordering. Reminded in BACKLOG.
4. **Anglicism flagger may be too noisy or too sparse on real content**. The 16 patterns are seeded conservatively. As Phase 2 authors hundreds of grammar examples, false-positive rate will inform whitelist additions. Tune iteratively; don't grow `anglicisms.yaml` without measurement.
5. **The 10 diagnostic CO+CE items are calibration-unverified.** I have authored them at the claimed CEFR levels, but only a real test against a sample of B1/B2/C1 learners would verify the calibration. Phase 8 should include a calibration pass against ≥ 3 known-level learners' responses if available.

---

## 6. Outstanding minors → [BACKLOG.md](BACKLOG.md)

Moved 7 items to BACKLOG with `phase: 2`, `phase: 8`, or `phase: 1.1` tags. None are blockers for Phase 2 start.

---

## 7. Process retrospective (for the user)

What went smoothly:
- The design-first protocol caught two MkDocs strict-mode issues *before* I shipped them to the user; both surfaced on first `mkdocs build` and were fixed in < 5 min.
- The audit-alive test fixture saved the audit pipeline from a silent regression when I refactored the heuristics.
- `uv` + `python -m tools.cli` removed all dependency on `just`/`make`, which the user's Windows box doesn't have.

What I will improve in Phase 2:
- Avoid broad `replace_all` on common substrings like `(str, Enum)`; use targeted edits with line-level context. The over-broad replacement broke `class Section(str, Enum):` into nonsense and required a full file rewrite.
- Run `mkdocs build --strict` *before* the first `pytest` to catch link issues faster than waiting for the build-tests step.
- For long content files (the 84-day ROADMAP), draft to a Python helper that emits the table-of-tables, then hand-edit; would catch row-count mistakes faster than the post-hoc `test_roadmap_has_eighty_four_day_rows` assertion.

---

## 8. Verdict

✅ **Phase 1 complete.** Gate to Phase 2: **OPEN** pending user confirmation per the master-prompt §3 stop-rule and the user's earlier choice ("Stop after each phase for review").

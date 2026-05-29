# PHASE 1 — DESIGN
## Foundation: repo skeleton, build pipeline, diagnostic, 12-week roadmap

> Status: **design draft — awaiting confirmation before code**.
> Scope reference: [02_PHASE_1_FOUNDATION.md](02_PHASE_1_FOUNDATION.md). Governance: [00_MASTER_PROMPT.md](00_MASTER_PROMPT.md).
> Author: Claude Code. Date: 2026-05-27.

---

## 1. Restated goal

Build the *rails*, not the content. After Phase 1 a future contributor (Claude or human) can drop a properly-frontmattered `.md` into `content/` and the four build pipelines (site, PDF, Anki, audio) plus the audit pass will pick it up without any further wiring. The only piece of "real" pedagogy in this phase is the Day-0 diagnostic — which doubles as the seed corpus that proves the pipelines green.

Out of scope for Phase 1: any grammar reference, vocabulary list, listening/reading bank, or writing/speaking material beyond what the diagnostic itself requires.

---

## 2. Top risks (mitigations)

| # | Risk | Mitigation |
|---|---|---|
| R1 | Windows local-build path is rough (Pandoc, TeX Live, hunspell, ffmpeg are all system installs). Learner is on Windows 11. | CI is canonical (Ubuntu); local dev needs only `uv` + Python to *write* content. Build commands that require system deps degrade gracefully (`make site` works with Python only; `make pdf` warns + skips if TeX missing). Document Windows install steps + winget commands in `CONTRIBUTING.md`. |
| R2 | Hunspell false-positive flood for linguistic vocabulary (the corpus itself talks about *hypotaxis*, *subjonctif*, etc.) drowns real misspellings. | Ship `tools/audit_whitelist.txt` pre-seeded with ~200 likely technical terms; add a script `tools/audit_whitelist_add.py` for one-shot addition. Audit emits *flag, not fail* on spelling. |
| R3 | `edge-tts` rate limits or service drift break audio builds late in the project. | Audio build is idempotent (hash-of-script keyed). CI skips audio. Local `make audio` is concurrent (asyncio + bounded semaphore) and retries with backoff. Voice list is config in `tools/audio_config.yaml` so a swap to alternative TTS (e.g., Piper local) is one-file. |
| R4 | Pandoc + LaTeX is slow + flaky in CI. | Cache TeX Live install in GH Actions; build PDF as a *separate* job that can re-run independently. Provide a `weasyprint` fallback (HTML→PDF) for emergency builds. |
| R5 | Frontmatter drift across 8 phases as schema evolves. | Pydantic model is the single source of truth. Schema changes require a migration script under `tools/migrations/NNN_*.py` that rewrites all existing files; CI fails if any file's frontmatter doesn't validate. |

---

## 3. Dependencies & prerequisites

**Host machine** (learner / authoring side, Windows 11):
- Python ≥ 3.12 via `uv` (`winget install astral-sh.uv`).
- `git`, `make` (Git for Windows ships it), `ffmpeg` (`winget install Gyan.FFmpeg`) for audio.
- *Optional* for local PDF: MiKTeX (`winget install MiKTeX.MiKTeX`) or skip — CI artefact is canonical.
- *Optional* for local audit spell-check: `hunspell` + `fr_FR` + `fr_CA` dictionaries (Linux/macOS only have these natively; Windows users can rely on CI).

**CI** (GitHub Actions, Ubuntu 22.04, Python 3.12):
- `apt`: `pandoc`, `texlive-xetex`, `texlive-fonts-extra`, `texlive-lang-french`, `hunspell`, `hunspell-fr`, `fonts-linuxlibertine`, `fonts-inconsolata`.
- `uv sync` for Python deps.

---

## 4. Decisions locked

| Concern | Choice | Why |
|---|---|---|
| Package/env manager | **`uv`** | Fast, reproducible, lockfile-first; project is greenfield so no migration cost. |
| Task runner | **`just`** with a **`Makefile` shim** | `just` is cross-platform single binary; Makefile shim aliases to `just` so muscle-memory `make site` works on Windows + Linux. |
| Static site | **MkDocs Material** + `awesome-pages` | Locked by master prompt. Strong French search support (lunr-language). |
| Site → markdown extensions | `pymdown-extensions` (admonition, tabs, snippets, superfences) | Needed for the callout boxes (`exercice`, `astuce`, `piège`, `modèle`) defined in master prompt §0.5. |
| PDF | **Pandoc → XeLaTeX → `latex/tcf-template.tex`** | XeLaTeX handles French diacritics + Unicode fonts (Linux Libertine O, Inconsolata) cleanly. |
| EPUB | Pandoc → EPUB3 with custom CSS | Same source; one extra Pandoc invocation. |
| Anki | **`genanki`** + deterministic `guid = md5(id)` | Reproducible builds; `make anki` is idempotent. |
| TTS | **`edge-tts`** | Free, supports the four voices specified in master prompt §0.4. Fallback hook for Piper documented but not implemented. |
| Frontmatter validation | **`pydantic` v2** model | Type-safe, generates JSON schema for IDE autocomplete in `.vscode/settings.json`. |
| Linter / formatter | **`ruff`** for Python; **`prettier`** for Markdown/YAML (config: 100-col, no auto-wrap inside French paragraphs — use `<!-- prettier-ignore -->` blocks for prose). | Standard. |
| Bibliography | **BibTeX** in `references.bib`; keys like `[fei2024_format]`, `[radiocanada2025_ville]`. | Master prompt mandate. |
| Test runner | **`pytest`** with `pytest-xdist` for parallelism. | Standard. |
| CI | **GitHub Actions**, single matrix on Ubuntu/3.12; deploy site via `mkdocs gh-deploy` action. | Master prompt mandate. |

---

## 5. File inventory (Phase 1 deliverables)

All paths relative to `c:\workspace\tcf_materials\` (a.k.a. repo root after `git init`).

### 5.1 Root-level

```
README.md                       Public entry — install, build, study-plan pointer.
ROADMAP.md                      12-week × 7-day plan; each day a 2 h block table.
AUDIT.md                        Running register of unresolved low-confidence items.
BACKLOG.md                      Deferred minors.
CHANGELOG.md                    Per-phase release notes; Keep-a-Changelog format.
CONTRIBUTING.md                 Authoring rules, frontmatter cheatsheet, install steps.
LICENSE                         CC-BY-SA 4.0 for content; MIT for `tools/`. Note the split inside.
.gitignore                      audio/, site/, pdf/, .venv/, __pycache__, *.apkg in flashcards/dist/, .DS_Store, Thumbs.db.
.gitattributes                  *.md text eol=lf; *.png binary.
pyproject.toml                  uv-managed; deps as per §4.
uv.lock                         Generated.
justfile                        Task definitions; `just <target>` for all builds.
Makefile                        Thin shim forwarding to `just`.
mkdocs.yml                      Material theme, awesome-pages, search lang=fr, custom estimated-minutes plugin.
references.bib                  Seeded with FEI, IRCC, Riegel et al., Lonsdale & Le Bras, Krashen, Swain, Carpenter, Lyster.
.pre-commit-config.yaml         ruff, prettier (md/yaml), end-of-file-fixer, check-yaml.
PHASE_1_DESIGN.md               (this file)
```

### 5.2 `content/` (skeleton + diagnostic seed)

```
content/
├── .pages                          # awesome-pages ordering
├── index.md                        # site landing page
├── 00_diagnostic/
│   ├── .pages
│   ├── 00_index.md                 # how to take the diagnostic
│   ├── 01_diagnostic_test.md       # the 70-min test (CO/CE/EE/EO mini)
│   ├── 02_answer_key.md            # answers + scoring table
│   └── 03_score_to_roadmap.md      # raw → NCLC → roadmap weights
├── 01_grammar/{b1_consolidation,b2_core,c1_advanced,c2_polish}/.pages       # empty folders w/ .pages
├── 02_vocabulary/.pages
├── 03_listening/{a1,a2,b1,b2,c1,c2}/.pages
├── 04_reading/{a1,a2,b1,b2,c1,c2}/.pages
├── 05_writing/{tache1,tache2,tache3}/.pages
├── 06_speaking/{tache1,tache2,tache3}/.pages
├── 07_mock_exams/.pages
├── 08_cheatsheets/.pages
├── 09_strategy/.pages
└── 10_canada_culture/.pages
```

Plus three **pipeline-canary stubs** (the minimum to exercise every build):
- `content/01_grammar/b2_core/00_canary_subjonctif_seed.md` — 3-paragraph grammar stub with a flashcard entry.
- `content/03_listening/b1/00_canary_listening_seed.md` — 60-second TTS audio item + 2 MCQ + transcript.
- `content/04_reading/b1/00_canary_reading_seed.md` — 200-word text + 3 MCQ.

These canary files are marked `audit.status: cleared` and `audit.confidence_overall: high` (I author them with care and keep them small to minimise audit burden); they exist solely so `make all` has non-trivial work and `pytest` can assert each format renders them correctly. They get superseded by real content in Phases 2–4 — the **IDs are reserved** (`gram-b2-canary-01`, `co-b1-canary-01`, `ce-b1-canary-01`) so later phases overwrite, not duplicate.

### 5.3 `tools/`

```
tools/
├── __init__.py
├── _common.py                   # shared: frontmatter parsing, repo walking, logging via `rich`.
├── models.py                    # pydantic Frontmatter, FlashcardEntry, AudioSpec, AuditBlock.
├── build_site.py                # CLI wrapper; mostly delegates to `mkdocs build`.
├── build_pdf.py                 # Pandoc invocation w/ XeLaTeX + tcf-template.tex; per-section + monolithic.
├── build_anki.py                # genanki; two decks (Vocabulary, Sentence Patterns).
├── build_audio.py               # edge-tts; hash-keyed idempotent; asyncio with semaphore=4.
├── build_epub.py                # Pandoc EPUB3.
├── audit_french.py              # the adversarial-reviewer pass; details §6.
├── audit_whitelist.txt          # accepted terms (technical, proper nouns); seeded ~200 entries.
├── anglicisms.yaml              # regex patterns + explanation; seeded ~40 entries from common-errors literature.
├── score_writing.py             # stub for Phase 5; minimal rubric printer here.
├── score_speaking.py            # stub for Phase 6; whisper integration deferred.
├── mkdocs_estimated_minutes.py  # MkDocs hook: read frontmatter, prepend "⏱ N min" badge.
└── audio_config.yaml            # voice catalogue + default register mappings.
```

### 5.4 `tests/`

```
tests/
├── conftest.py                  # fixtures: tmp content tree, stubbed mkdocs/pandoc invocations.
├── test_frontmatter.py          # every content file parses against pydantic model.
├── test_naming.py               # filenames match `NN_slug.md`; IDs unique repo-wide.
├── test_builds.py               # `just site`, `just anki`, `just epub`, `just pdf` exit 0 on seed; conditional skip if system deps absent (xfail with reason).
├── test_links.py                # cross-refs resolve; `prerequisites:` IDs exist; markdown links resolve.
├── test_audio_scripts.py        # every audio.required:true file has `## SCRIPT`.
├── test_audit_runs.py           # `audit_french.py` exits cleanly on seed corpus.
└── test_roadmap.py              # ROADMAP has 84 day-blocks; each block totals 105–135 min; every file ref resolves (or is `TBD:`).
```

### 5.5 `latex/`, `.github/`, etc.

```
latex/
└── tcf-template.tex             # Pandoc template per phase-1 §4.4.

.github/
└── workflows/
    ├── build.yml                # main CI per phase-1 §3.4.
    └── deploy-pages.yml         # gh-pages deploy on main.

.vscode/
├── settings.json                # YAML schema association for frontmatter.
└── extensions.json              # recommend: yzhang.markdown-all-in-one, redhat.vscode-yaml, charliermarsh.ruff.
```

**Total Phase 1 file count**: ~50 (above the master-prompt estimate of ~30 because we're explicit about `.pages` files, the canary stubs, and per-tool YAMLs). All files are mechanical scaffolding except the diagnostic and the three canaries.

---

## 6. The audit pass (`tools/audit_french.py`) — full spec

This is the single most important script in the project — every later phase depends on it. Locking the spec here.

**Input**: walk `content/**/*.md`.

**For each file:**

1. **Schema check** (pydantic model `Frontmatter`):
   - Required: `id`, `title`, `section`, `cefr`, `nclc_target`, `estimated_minutes`, `register`, `audit.status`, `audit.confidence_overall`.
   - `id` must match `^[a-z]+-[a-z0-9]+(-[a-z0-9]+)*$` and be globally unique.
   - `cefr` ∈ {A1, A2, B1, B2, C1, C2}; `register` ∈ {france, quebec, mixed}.
   - `audio.required: true` ⇒ `audio.voice` set ∧ `## SCRIPT` block exists.
   - Schema errors → **fail (exit 1)**.

2. **Spell check** (`hunspell -d fr_FR,fr_CA`):
   - Strip frontmatter, code fences, and markdown link targets first.
   - Filter against `audit_whitelist.txt` (case-insensitive).
   - Unknown tokens → **flag (warn only)** + append to a per-file `## audit` block in the run report.

3. **Heuristic flags** (regex sweep; flag only):
   - `\bil y a\s+(\w+)\s+que\b` (potential calque) — flag with note "verify not calque from English 'there is X that'".
   - `\bje suis d'accord avec\s+\w+\s+(?:de|à)\s+\w+er\b` (mis-construction) — flag.
   - Anglicism regexes from `anglicisms.yaml`: e.g., `\bopportunité\s+de\s+\w+er\b`, `\badresser\s+(?:un|le)\s+problème\b`, `\bsupporter\b` (warn: check if meaning is *to tolerate* — anglicism — vs *to support emotionally* — fine).
   - `\b(\w+)\s+\1\b` repeated tokens.
   - Subjunctive triggers (`il faut que`, `bien que`, `pour que`, `avant que`, `à condition que`) followed by indicative-shape verb — flag for review.

4. **Confidence rollup**:
   - Files with `audit.confidence_overall: low` → listed in `AUDIT.md` under `## Quarantined`.
   - Files with unresolved `<!-- AUDIT: ... -->` comments → listed under `## Open audit comments`.
   - Files with `audit.status: pending` and `> N` days old → listed under `## Stale pending` (N defaults to 14).

5. **Random sample export**: write `audit_samples/random_50.md` — 50 random sentences across the corpus (stable seed per commit hash for reproducibility within a CI run; different across runs).

**Exit codes**:
- `0` if no schema errors and no `blocker` `<!-- AUDIT -->` comments.
- `1` if any schema error, missing `## SCRIPT`, broken cross-ref, or `blocker`-tagged audit comment.

Heuristic flags are *never* failures — they're noise the reviewer (you/me on the next pass) triages.

---

## 7. Frontmatter schema (locked, all content files)

Identical to phase-1 §3.1. Reproduced here so this design doc is self-contained:

```yaml
---
id: co-b2-024                          # ^[a-z]+-[a-z0-9]+(-[a-z0-9]+)*$, globally unique
title: "Compréhension orale — B2 — Pollution sonore en ville"
section: listening                     # listening|reading|writing|speaking|grammar|vocab|strategy|mock|diagnostic
cefr: B2                               # A1|A2|B1|B2|C1|C2
nclc_target: 7                         # 1–12 (integer)
estimated_minutes: 12                  # integer; roadmap aggregator sums these
register: france                       # france|quebec|mixed
audio:                                 # optional block; if present, all subfields required when required=true
  required: true
  voice: fr-FR-DeniseNeural            # ∈ audio_config.yaml voices
  duration_seconds: 95                 # author estimate; build_audio.py refines after generation
sources:                               # required if content paraphrases authentic material
  - "[radiocanada2025_ville]"
  - "[lemonde2024_pollutionsonore]"
tags: [environnement, urbanisme, débat]
flashcard:                             # optional list; build_anki extracts confidence:high only
  - front: "nuisance sonore"
    back: "noise pollution; cf. tapage nocturne (legal term)"
    confidence: high                   # high|medium|low
prerequisites: [co-b1-018, vocab-environnement-01]   # IDs; tested by test_links.py
audit:
  status: pending                      # pending|reviewed|cleared|quarantined
  reviewer: null                       # GitHub handle or "claude-NN" where NN is the phase number
  confidence_overall: high             # high|medium|low; low ⇒ excluded from compiled builds
  notes: ""
---
```

---

## 8. Diagnostic — content scope

Single file `content/00_diagnostic/01_diagnostic_test.md` (plus 02_answer_key, 03_score_to_roadmap).

| Component | Items | Duration | CEFR distribution |
|---|---|---|---|
| CO mini (audio + MCQ) | 10 | 10 min | 2×A2, 3×B1, 3×B2, 2×C1 |
| CE mini (text + MCQ) | 10 | 15 min | 2×A2, 3×B1, 3×B2, 2×C1 |
| EE mini (write) | 1 | 20 min | B2 anchor — student/research life prompt |
| EO mini (record) | 1 | 5 min | B2 anchor — télétravail pros/cons |
| Scoring + roadmap weighting | — | 20 min | — |
| **Total** | | **70 min** | |

Each MCQ goes through the adversarial review pass (§6) before this phase declares done. The diagnostic is the seed corpus: if it doesn't survive its own audit, the audit script is wrong or the diagnostic is wrong; either way we don't ship.

Scoring table (output of `03_score_to_roadmap.md`) maps `(CO_raw, CE_raw, EE_/20, EO_/20)` → per-skill NCLC estimate → roadmap-weighting parameters `{w_co, w_ce, w_ee, w_eo}` (defaults `(1,1,1,1)`; if any skill is ≥1 NCLC band below the others, weight ↑ to `1.5` in weeks 3–8 per phase-1 §6).

---

## 9. `ROADMAP.md` — structural commitment

84 day-blocks, formatted as in phase-1 §6 (target 2 h ± 15 min). Week-level focus follows the table in phase-1 §6 exactly. Each day's "Fichier" column points to a real path; for paths in folders that won't exist until later phases, the file is a `TBD:` placeholder stub (`content/03_listening/b2/14_TBD.md`) created in Phase 1 with `audit.status: cleared` and one line `> TBD — sera rempli en Phase 3.` This satisfies `test_links.py` from day one.

Stub-file count: ~50 (one per "real-content" day slot pointing into Phases 2–7). Stubs are tracked in `BACKLOG.md` with phase ownership so they don't get lost.

---

## 10. Acceptance criteria (gate to Phase 2)

Copied from phase-1 §7 as a hard checklist:

- [ ] `just install` (alias `make install`) works from a clean clone in < 5 min, on Ubuntu CI and (manually verified) on Windows 11 with `uv` installed.
- [ ] `just all` (alias `make all`) builds successfully on the seed content.
- [ ] `pytest` passes (all green; xfail allowed only for system-dep-missing PDF builds locally on Windows).
- [ ] `mkdocs serve` renders the diagnostic with the `## SCRIPT`-generated audio playing inline.
- [ ] PDF book has correct French typography: `«\,…\,»` quotes, no-break spaces before `:` `;` `?` `!` `»`, hyphenation patterns from `babel-french`.
- [ ] Anki `.apkg` imports cleanly into desktop Anki and AnkiMobile (manually verified on at least one platform).
- [ ] `tools/audit_french.py` runs and produces `AUDIT.md`; on seed corpus, `AUDIT.md` has zero `blocker`s, zero `major`s, ≤ 3 heuristic flags.
- [ ] `.github/workflows/build.yml` green on push to main.
- [ ] `ROADMAP.md` has all 84 days; each day 105–135 min; every file ref resolves (real or TBD stub).

---

## 11. Audit checklist (`PHASE_1_AUDIT.md` after code)

- Pick MCQ #5 of the diagnostic at random — argue why exactly one option is defensible. Record the reasoning verbatim.
- Re-read each diagnostic writing/speaking prompt for non-Canadian cultural baggage (e.g., do not assume CÉGEP, BAC français, or carte Vitale knowledge).
- Run `pandoc` on the canary content and grep the `.log` for `Overfull \hbox` / `Underfull \hbox` warnings; list and resolve > 5pt overflows.
- Import the seed APKG into AnkiMobile (or AnkiDroid) and confirm: audio plays, IPA renders (`/sɥi/` not garbled), tags carry through, deck split is correct.
- Confirm `audit_french.py` flags one *intentional* anglicism inserted into a test fixture (`tests/fixtures/anglicism_canary.md`) and clears it once the fixture is corrected — proves the audit is alive.

---

## 12. Evaluation report scope (`PHASE_1_EVAL.md` after audit)

Will contain:
- `tree -L 3` of the repo.
- Build artefact sizes: site (KB), monolithic PDF (pages, MB), per-section PDFs (list), APKG (cards, MB), audio (files, total MB), EPUB (KB).
- Coverage: `% of folders under content/ with ≥1 file (stub or real)`.
- Risk register carried into Phase 2 (top 3).
- Outstanding minors → `BACKLOG.md` with `phase: 2` or later tags.

---

## 13. Open questions for the user (one round)

I will proceed with the defaults below unless the user objects:

1. **License**: defaulting to **CC-BY-SA 4.0** for `content/`, **MIT** for `tools/`. (Permissive but copyleft-on-content matches "should become the canonical open repo" framing.)
2. **GitHub repo name + visibility**: defaulting to **local-only Phase 1**; `git init` but no `git remote add`. User can publish when ready. (Avoids accidental publication of in-progress audited French.)
3. **Site deploy target**: GitHub Pages by default, but only wired up — *not* actually deployed in Phase 1. User triggers first deploy manually after reviewing.
4. **TTS for diagnostic audio**: defaulting to `fr-FR-DeniseNeural` (Metropolitan F) + `fr-FR-HenriNeural` (Metropolitan M) for B1/B2 items; `fr-CA-SylvieNeural` + `fr-CA-AntoineNeural` for one C1 item to test register tag handling. User can override per-item later.
5. **Email/identity for `git commit` author**: defaulting to `alanynwu@gmail.com` (from session context). User can override before first commit.

---

## 14. What I will produce on next greenlight

In order:
1. `pyproject.toml`, `uv.lock`, `justfile`, `Makefile` — env + task runner first so everything else can be run.
2. `tools/models.py` + `tools/_common.py` — pydantic schema is upstream of every other tool.
3. `tools/audit_french.py` + `tools/audit_whitelist.txt` + `tools/anglicisms.yaml` + fixture — audit runs before any content is authored.
4. `content/` skeleton (all `.pages` files; all empty folders; all `TBD:` stubs referenced by ROADMAP).
5. The diagnostic + three canary stubs — the real content this phase ships.
6. Build tooling: `build_site.py`, `build_anki.py`, `build_audio.py`, `build_epub.py`, `build_pdf.py`.
7. `mkdocs.yml` + `mkdocs_estimated_minutes.py` hook + `latex/tcf-template.tex`.
8. `tests/` with conftest + the seven test modules.
9. `.github/workflows/build.yml` + `.github/workflows/deploy-pages.yml`.
10. `ROADMAP.md` (84 days), `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `BACKLOG.md`, `AUDIT.md`.
11. Run `just all` + `pytest` + `audit_french.py` locally; capture output for `PHASE_1_EVAL.md`.
12. `PHASE_1_AUDIT.md` per checklist §11.
13. `PHASE_1_EVAL.md` per scope §12.

---

## 15. Stop point

This document is the design contract. Per master-prompt §0.6, I stop here and wait for confirmation before writing any of §14. On greenlight, I will proceed through §14 in order and report back when Phase 1 is gate-ready.

# 02 — PHASE 1: FOUNDATION
## Repo scaffolding · build pipeline · diagnostic test · 12-week roadmap

> **Duration estimate (Claude Code time): one execution session. Output: ~30 files. Acceptance gate: `pytest` green, `mkdocs build` green, `pandoc` round-trip green, diagnostic compiles, ROADMAP day-by-day exists.**

---

## 1. Goal

Establish the rails on which all subsequent content runs:
1. Repository skeleton (folders, frontmatter schema, naming convention).
2. Three build pipelines (HTML site, PDF book, Anki deck) — proven working on a "Hello, monde" minimal example.
3. Diagnostic test the learner takes on Day 0 to calibrate the rest of the plan.
4. Day-by-day `ROADMAP.md` covering 84 days (12 weeks × 7).
5. Content authoring conventions documented in `CONTRIBUTING.md` so every future phase produces consistent files.

This phase ships zero "real" French learning content beyond the diagnostic. Its purpose is mechanical.

---

## 2. Think (before writing)

Restate to yourself in `<reasoning>`:
- Why am I doing the diagnostic before the curriculum? *Because the user's "B1" is self-reported; weak sub-skills (e.g., listening lagging reading) must be detected to weight the study plan.*
- Why three build outputs (HTML/PDF/Anki) and not just one? *Because the user wants platform-portability (PC/web/iOS). HTML for browsers + mobile responsive. PDF for printable / iBooks / offline. Anki for daily spaced review on phone.*
- What's the failure mode if the build pipeline is fragile? *Subsequent phases will produce content faster than the pipeline can validate it; errors compound silently. Fix the pipeline now, never again.*

---

## 3. Design (`PHASE_1_DESIGN.md` — produce this first)

Specify:
- Frontmatter schema (every content `.md` MUST conform).
- File naming convention (`NN_slug.md`, where `NN` is sort order).
- Folder responsibilities (echo `00_MASTER_PROMPT.md` §0.5).
- Build commands (single `make` or `just` interface).
- CI matrix.

### 3.1 Frontmatter schema (canonical, all content files)

```yaml
---
id: co-b2-024                          # stable unique slug, never renumber
title: "Compréhension orale — B2 — Pollution sonore en ville"
section: listening                     # listening|reading|writing|speaking|grammar|vocab|strategy|mock
cefr: B2                               # A1|A2|B1|B2|C1|C2
nclc_target: 7                         # 1–12
estimated_minutes: 12
register: france                       # france|quebec|mixed
audio:
  required: true
  voice: fr-FR-DeniseNeural
  duration_seconds: 95
sources:                               # for grounding; required if content paraphrases authentic material
  - "[radiocanada2025_ville]"
  - "[lemonde2024_pollutionsonore]"
tags: [environnement, urbanisme, débat]
flashcard:                             # optional; if present, build_anki extracts
  - front: "nuisance sonore"
    back: "noise pollution; cf. tapage nocturne (legal term)"
    confidence: high
prerequisites: [co-b1-018, vocab-environnement-01]
audit:
  status: pending                      # pending|reviewed|cleared|quarantined
  reviewer: null
  confidence_overall: high             # high|medium|low
  notes: ""
---
```

### 3.2 File naming

- `content/03_listening/b2/24_pollution_sonore.md`
- The leading `NN_` is a presentation order hint within a folder, not a global ID. Global ID lives in frontmatter (`id:`).
- No spaces, no accents in filenames (avoid filesystem portability issues on Windows + iOS sync).

### 3.3 Build commands (Makefile)

```
make install        # uv pip install + setup
make site           # mkdocs build → ./site
make pdf            # pandoc → ./pdf/tcf-canada-prep.pdf + per-section PDFs
make anki           # → ./flashcards/tcf-canada.apkg
make audio          # edge-tts → ./audio/*.mp3 for any .md with audio.required
make epub           # → ./pdf/tcf-canada-prep.epub
make audit          # tools/audit_french.py over content/
make test           # pytest
make all            # site + pdf + anki + audio + epub
make serve          # mkdocs serve for local dev
make clean
```

### 3.4 CI matrix (`.github/workflows/build.yml`)

On push to main:
- Ubuntu, Python 3.12.
- Run `make test`, `make audit`, `make site`, `make pdf`, `make anki`, `make epub`. (Skip `make audio` in CI; too slow / unnecessary.)
- Upload PDF + EPUB + APKG as workflow artifacts.
- Deploy site to GitHub Pages.

---

## 4. Code

### 4.1 Repo skeleton — create all directories from `00_MASTER_PROMPT.md` §0.5.

### 4.2 `pyproject.toml`

Dependencies: `mkdocs`, `mkdocs-material`, `mkdocs-material[imaging]`, `pymdown-extensions`, `genanki`, `edge-tts`, `pandoc` (system), `weasyprint` (fallback PDF), `pyyaml`, `python-frontmatter`, `jinja2`, `pytest`, `ruff`, `pydantic` (frontmatter validation), `rich` (CLI output).

### 4.3 `mkdocs.yml`

Use Material theme. Navigation auto-generated from folder structure via `awesome-pages` plugin. Enable: search (with French language config), code copy, MathJax (for the rare phonetic IPA), instant loading, dark/light toggle.

Add a custom plugin or hook that reads frontmatter `estimated_minutes` and prepends a "⏱ N min" badge to each page.

### 4.4 `latex/tcf-template.tex`

Custom Pandoc template:
- `\documentclass[11pt,a4paper,openany]{book}`
- `babel` with `french` (load `frenchb` shorthands).
- `fontspec` + `Linux Libertine O` for body (excellent French diacritic rendering), `Inconsolata` for code.
- `microtype`, `hyperref` (colored links), `tcolorbox` for callout boxes (one box style per content type: exercice, astuce, piège, modèle).
- French quotation marks `«\,…\,»` automatic via `\usepackage[autostyle]{csquotes}`.
- Page header: section title left, "TCF Canada — B1→C1" right. Footer: page number, "Préparation v0.X.Y".
- Per-chapter PDFs via Pandoc's `--top-level-division=chapter` and a script that builds both a monolithic book and per-section booklets.

### 4.5 `tools/build_anki.py`

- Walks `content/`, parses frontmatter, extracts `flashcard:` entries with `confidence: high` only (medium/low are excluded from the shipped deck).
- Card model: front (French term/sentence), back (translation + register + example), tags = file frontmatter tags + cefr level.
- Two decks: "TCF Canada — Vocabulary" and "TCF Canada — Sentence Patterns" (the latter for i+1 cloze cards introduced in Phase 3).
- Reproducible build (deterministic `guid_for` based on `id`).

### 4.6 `tools/build_audio.py`

- Walks `content/`, finds files with `audio.required: true`.
- Pulls audio script from a `## SCRIPT` H2 section in the file (or `audio_script:` frontmatter for short items).
- Calls `edge-tts` with the voice specified in frontmatter.
- Writes `audio/<id>.mp3`.
- Concurrent (asyncio) with rate-limit handling.
- Idempotent: skips if `audio/<id>.mp3` exists and source hasn't changed (compare a stored hash).

### 4.7 `tools/audit_french.py`

This is the most important script in the project. It runs every PR.

It performs:
1. **Schema validation**: pydantic model over frontmatter. Reject any file missing required fields.
2. **Spell check**: hunspell with `fr_FR` + `fr_CA` dictionaries against body text. Whitelist file `tools/audit_whitelist.txt` for accepted neologisms / proper nouns.
3. **Heuristic flags** (regex-based; flag, don't fail):
   - Bare "il y a" + abstract noun + "que" (often calque from English).
   - "Je suis d'accord avec X" followed by a verb infinitive (frequent learner error).
   - Anglicisms: `*opportunité de faire*`, `*adresser un problème*`, `*supporter (in the sense of soutenir)*`, etc. Maintain a list in `tools/anglicisms.yaml`.
   - Repeated tokens (typo: "le le").
   - Subjunctive triggers without subjunctive (`il faut que` + indicative).
4. **Confidence rollup**: emits `AUDIT.md` listing every file with `confidence: low` or any unresolved `<!-- AUDIT: -->` comment.
5. **Sample export**: writes `audit_samples/random_50.md` — 50 random sentences for human spot-check on every run.

The audit script exits 0 (warn) for heuristic flags, 1 (fail) for schema errors and unresolved blockers.

### 4.8 `tests/`

- `test_frontmatter.py`: every file under `content/` parses; required fields present; CEFR/NCLC values in valid ranges.
- `test_builds.py`: `make site`, `make pdf`, `make anki`, `make epub` all return 0 on the seed content.
- `test_links.py`: no broken cross-references (every `prerequisites:` ID exists; every Markdown link resolves).
- `test_audio_scripts.py`: every file with `audio.required: true` has a `## SCRIPT` block.

### 4.9 `CONTRIBUTING.md`

Authoring rules, frontmatter cheatsheet, "when to mark `confidence: low`", how to add to the anglicisms list, how to refresh authentic sources.

---

## 5. Diagnostic (the ONE piece of real content in this phase)

`content/00_diagnostic/00_diagnostic_test.md`

A timed self-administered diagnostic that takes ~70 minutes and outputs an initial NCLC estimate per skill so the roadmap can be re-weighted.

Components:
- **CO mini (10 items, 10 min)**: 2 × A2, 3 × B1, 3 × B2, 2 × C1. Real-style audio (you generate the audio scripts; TTS produces the audio). Distractors must be plausible — no "obviously wrong" options.
- **CE mini (10 items, 15 min)**: same distribution, on short texts (80–250 words each).
- **EE mini (1 task, 20 min)**: short writing prompt (B2 level) — "Décrivez une expérience marquante de votre vie d'étudiant ou de chercheur (130–150 mots)." Learner self-scores against the included rubric.
- **EO mini (1 task, 5 min)**: speaking prompt recorded by learner — "Présentez les avantages et les inconvénients du télétravail (2–3 minutes)." Learner self-records, optionally transcribes via `whisper`, applies the rubric.

Output: a scoring table that maps `(CO_correct, CE_correct, EE_score, EO_score)` → `(estimated_NCLC_per_skill)` → `(suggested_roadmap_weighting)`.

The diagnostic itself must be audited to the same standard as the rest of the corpus. Use it as the canary for the build pipeline: if it builds clean in all four formats, the pipeline is ready.

---

## 6. 12-week `ROADMAP.md`

Day-by-day, every day specified. Each day:

```
## Jour 14 — Lundi (Semaine 2)
**Objectif**: Maîtriser le subjonctif présent (déclencheurs principaux) + 15 collocations B2 sur l'environnement.

| Bloc | Durée | Activité | Fichier |
|---|---|---|---|
| Échauffement | 10 min | Anki revisions (15 cartes) | flashcards |
| Input | 25 min | Lire et annoter texte CE-B2-014 | content/04_reading/b2/14_*.md |
| Étude ciblée | 30 min | Cours subjonctif + 20 transformations | content/01_grammar/b2_core/06_subjonctif.md |
| Output | 35 min | EE-T2 brouillon (140 mots, sujet environnement) | content/05_writing/tache2/03_*.md |
| Sortie active | 20 min | Shadowing podcast RFI 5 min + monologue 5 min | content/06_speaking/shadowing/ |
**Total: 2 h 00**
**Cumul semaine: 14 h / 14 h**
```

Constraints:
- Every day = 2 h ± 15 min.
- Sundays = lighter (90 min) + a 30-min weekly mock review.
- Every 14 days, a full or partial mock under exam conditions.
- Skill weighting respects the diagnostic result (left as parameters: `w_co, w_ce, w_ee, w_eo`). Default = balanced; if diagnostic shows EO < EE/CE/CO, double EO blocks in weeks 3–8.

Weeks at a glance (default schedule):

| Week | Focus | Mock |
|---|---|---|
| 1 | Diagnostic + B1 consolidation (gaps) + Anki onboarding | — |
| 2 | B2 grammar core (subjonctif, conditionnel, hypothèse) + reading volume | — |
| 3 | B2 listening volume + EE tâche 1 mastery | Partial CO+CE |
| 4 | B2 writing depth + EO tâche 1+2 | — |
| 5 | C1 grammar (concession, opposition, cause/conséquence; participe présent / gérondif distinction) | Full mock #1 |
| 6 | C1 lexical density + connectors + nominalisation | — |
| 7 | EE tâche 3 (argumentation) drill | Partial EE+EO |
| 8 | EO tâche 3 (monologue argumentatif) drill | Full mock #2 |
| 9 | Weak-skill remediation (data-driven from mocks) | — |
| 10 | Speed + accuracy under time pressure | Full mock #3 |
| 11 | Soutenu register + C1/C2 nuance | Full mock #4 |
| 12 | Tapering: light review, exam-day strategy, sleep hygiene | Half mock + walkthrough |

---

## 7. Acceptance criteria (gate to Phase 2)

- [ ] `make install` works from a clean clone in < 5 min.
- [ ] `make all` builds successfully on the seed content (diagnostic + 1 grammar stub + 1 reading stub + 1 listening stub with audio).
- [ ] `pytest` passes.
- [ ] `mkdocs serve` renders the diagnostic with audio playing inline.
- [ ] PDF book has correct French typography (quotes, no-break spaces before `:` `;` `?` `!` `»`).
- [ ] Anki deck imports cleanly into desktop Anki and AnkiMobile.
- [ ] `tools/audit_french.py` runs and produces `AUDIT.md` (empty on seed content is fine).
- [ ] `.github/workflows/build.yml` green on push.
- [ ] `ROADMAP.md` has all 84 days filled, each ≈ 2 h, with valid file references (file may be a stub `TBD` placeholder — links must resolve, content can be empty).

---

## 8. Audit (`PHASE_1_AUDIT.md`)

Spot-check questions to answer in the audit doc:
- Does the diagnostic's MCQ #5 (random pick) have exactly one defensible correct answer? Document the reasoning.
- Are the diagnostic's writing prompts free of cultural assumptions a non-Canadian-born learner might miss?
- Is the LaTeX output free of overfull `\hbox` warnings? If not, list them and resolve.
- Does the Anki deck render correctly (audio playing, IPA visible) on AnkiMobile? Self-report.

---

## 9. Evaluate (`PHASE_1_EVAL.md`)

A short report with:
- Tree of files created (use `tree -L 3`).
- Build outputs (sizes: site KB, PDF pages, APKG cards).
- Coverage stats: % of `content/` covered by at least a stub.
- Risks for Phase 2 carried forward (e.g., "PDF rendering of audio links — handled by replacing `<audio>` with a callout box pointing to the online site").
- Outstanding minor issues moved to `BACKLOG.md`.

When green, proceed to Phase 2.

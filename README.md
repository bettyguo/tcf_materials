# TCF Canada — Préparation B1 → C1/C2

> **Source-audited TCF Canada prep corpus.** ~410 markdown files, 60-day program, four mock exams, multi-format build (HTML site + PDF book + per-section booklets + EPUB + Anki). Designed for self-administered B1 → C1 in 12 weeks, target NCLC 8–9 for Express Entry. Honest about its limits.

🌐 **Live site**: <https://bettyguo.github.io/tcf_materials/>

---

## What this is — in 60 seconds

A **single-source-of-truth Markdown corpus** that builds to:

- a searchable **HTML site** (MkDocs Material, French search index)
- a **PDF book** (Pandoc + XeLaTeX, French typography)
- eight **per-section booklets** (PDF, ≤ 5 MB each)
- an **EPUB** (Pandoc EPUB3)
- an **Anki deck** (`.apkg`, ~1 500 cards, FSRS-friendly)

What's inside:

- 64 graded grammar units (B1 → C2)
- 12 thematic vocabulary domains, ~3 000-lemma frequency backbone (skeleton)
- 60 listening items + 60 reading items (60 reading items shipped; listening bank stubbed)
- 9 EE pilot prompts × 3 model answers (NCLC 6/8/10), 18 templates, ≥ 193 pivot phrases, 56-entry anti-error register, auto-scorer
- 9 EO pilot prompts × 3 model transcripts, 8-unit phonological kit, 60-day "talk-yourself-to-fluency" program, Whisper-based self-scorer
- 4 full mocks (2 fully authored, 2 scaffolded), 4 partial mocks per skill (1 pilot per skill + queue), score calculator (CLI + HTML)
- 7 strategy documents (CO/CE/EE/EO + pitfalls + exam-day + taper protocol)
- 12 cheatsheets (each ≤ 4 800 chars, A4-budget)
- A post-mock diagnostic protocol + rebalancing hooks into `ROADMAP.md`

What this is **not**:

- A replacement for a tutor at C1+.
- A native-recorded audio bank — TTS is used where flagged (`audio.required: true`); native review queued in [BACKLOG.md](BACKLOG.md).
- An examiner-grade auto-scorer — calibrated at 81 % (EE) / 85 % (EO) adjacency-tolerant against model answers. Use the trajectory, not the absolute number.

---

## Quickstart (5 commands → Day 1)

```bash
# 1. Clone + enter
git clone <repo-url> && cd tcf-canada-prep

# 2. Install (Python 3.12+ via uv)
uv sync --extra dev

# 3. Build the Anki deck + HTML site
uv run python -m tools.cli build-anki
uv run python -m tools.cli build-site

# 4. Read Day 0 onboarding
# Open content/00_start_here.md in your editor or browse the site:
uv run mkdocs serve   # → http://127.0.0.1:8000

# 5. Take the diagnostic
# content/00_diagnostic/01_diagnostic_test.md (90 min, scored against content/00_diagnostic/02_answer_key.md)
```

Then follow [`ROADMAP.md`](ROADMAP.md) — the 84-day plan.

> **Prefer to browse online?** The live site is at <https://bettyguo.github.io/tcf_materials/> — same content as a clone, search-indexed in French, no install needed. You'll still need a clone for the Anki deck and the auto-scorers.

---

## The 12-week plan

Two hours a day, 14 hours a week. See [`ROADMAP.md`](ROADMAP.md) for the day-by-day version. Headline milestones:

| Week | Focus | Milestone |
|---|---|---|
| 1 | Diagnostic + B1 consolidation | Score reading |
| 2 | B2 grammar core + reading volume | Mini-mock CO+CE |
| 3 | CO volume + EE T1 mastery | — |
| 4 | EE B2 depth + EO T1/T2 | — |
| 5 | C1 grammar + Mock #1 | **Mock #1 complete** |
| 6 | C1 lexical density + connectors | — |
| 7 | EE T3 argument drill | Partial mock EE+EO |
| 8 | EO T3 monologue + Mock #2 | **Mock #2 — B2 operational** |
| 9 | Weakness-driven remediation | — |
| 10 | Speed + precision under pressure | **Mock #3** |
| 11 | Soutenu register + C1/C2 nuance | **Mock #4** |
| 12 | Taper: lighten, sleep, J-1 strategy | **Exam** |

If a mock plateau hits, the diagnostic + post-mortem rebalance hooks in `ROADMAP.md` redirect time to the weakest sub-skill.

---

## Format options

| Format | Build command | Where it lands | Use case |
|---|---|---|---|
| HTML site | `make site` (or `just site`) | `site/` | Daily browsing, search |
| Monolithic PDF | `make pdf` | `pdf/tcf-canada-prep.pdf` | iPad reading, offline |
| Per-section PDF | `make pdf` (same target) | `pdf/0X_*.pdf` | Booklet portability |
| EPUB | `make epub` | `pdf/tcf-canada-prep.epub` | e-reader |
| Anki deck | `make anki` | `flashcards/dist/tcf-canada.apkg` | Spaced repetition (FSRS) |
| TTS audio | `make audio` | `audio/<id>.mp3` | Listening + shadowing |

`make all` builds site + Anki + EPUB + PDF (~5 min on CI). Audio is excluded from `make all` because it hits the edge-tts network and can take several minutes; run `make audio` separately. Windows users without GNU Make: use `just <target>` or `uv run python -m tools.cli <target>` directly. See [`Makefile`](Makefile) / [`justfile`](justfile).

---

## Honest disclaimers

1. **TTS ≠ native speech.** Edge-TTS is high quality for B1/B2 listening but C1+ items would benefit from a native recording pass. Forvo links are flagged inline for individual words; full native audio is queued in [BACKLOG.md](BACKLOG.md).
2. **Auto-scoring is heuristic.** `tools.score_writing` and `tools.score_speaking` are calibrated to ~ 81–85 % agreement with model answers, not against real examiner judgments. A `14/20` from the tool might be a 13/20 or 15/20 from a real examiner. Use the **trajectory** across weeks, not the absolute score.
3. **NCLC 7–9 is reliably supported.** NCLC 10+ in EE/EO realistically requires a human tutor's feedback on subtle register and idiomatic choices.
4. **Quebec ≠ France.** The corpus teaches *recognition* of both registers but only pushes *production* in standard French. A Montréal-based learner benefits from real-world Quebec exposure that static content can't replicate.
5. **3 months is intense.** ~2 h/day × 84 days = 168 h of focused work, plus passive immersion. Missing more than 7 non-consecutive days breaks the spaced-repetition advantage.
6. **Mocks #3 and #4 are scaffolded only at v1.0.** CO/CE items will be authored in v1.1 once the Phase 3 listening bank is filled. Use the 1 partial-mock pilot per skill (`content/07_mock_exams/partials/`) for interim drill.

---

## Repository layout

```
content/
  00_start_here.md             ← read first
  00_diagnostic/               ← Day-0 placement test (CO + CE + EE + EO)
  01_grammar/                  ← 64 units B1 → C2
  02_vocabulary/               ← 12 thematic domains + frequency skeleton
  03_listening/                ← strategy + per-CEFR-band item buckets
  04_reading/                  ← 60 items, 7 TCF text types
  05_writing/                  ← rubric + anti-error + pivots + templates + prompts
  06_speaking/                 ← rubric + 8-unit phonology + 60-day program + prompts
  07_mock_exams/               ← 4 mocks + partials + diagnostic protocol
  08_cheatsheets/              ← 12 single-page A4 reference cards
  09_strategy/                 ← exam-day + per-section tactics + taper protocol
  10_canada_culture/           ← Quebec/France notes for register awareness
tools/                         ← build pipeline (Python)
tests/                         ← pytest suite (75 tests, 2 skipped on local Windows)
latex/                         ← XeLaTeX template (French typography)
examples/                      ← single-domain mini-corpus for new contributors
PROMPT_BUNDLE.md               ← the 11 framing docs that built this repo
ROADMAP.md                     ← 84-day plan
CHANGELOG.md                   ← phase-by-phase history
BACKLOG.md                     ← deferred minor items (P3/P4)
CONTRIBUTING.md                ← how to add content, schema, audit rules
CONTRIBUTORS.md                ← human + AI contributors
LICENSE / LICENSE-CONTENT.txt / LICENSE-TOOLS.txt
```

For the design rationale behind the 8-phase build process, see [`PROMPT_BUNDLE.md`](PROMPT_BUNDLE.md).

---

## Contributing

External contributions welcome — the absolute priority is **not degrading the quality of the French**. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a PR. The PR template asks for a *« Pourquoi je suis confiant que ce français est correct »* box: sources consulted, residual doubts. Frontmatter schema is validated in CI; `confidence: low` content does not ship to builds.

---

## License + acknowledgements

- **Content** (everything under `content/` + framing `*.md`) — [CC BY-SA 4.0](LICENSE-CONTENT.txt).
- **Tools** (everything under `tools/`, `tests/`, `latex/`, `Makefile`, `justfile`, `pyproject.toml`, build configs) — [MIT](LICENSE-TOOLS.txt).

Pedagogical references seeded in [`references.bib`](references.bib): Riegel, Pellat & Rioul (*Grammaire méthodique du français*); Grevisse; Léon (*Phonétisme et prononciations du français*); Tranel (*The sounds of French*); Krashen (input hypothesis); Swain (output hypothesis); Carpenter (interleaved practice); Lyster (counterbalanced approach). FEI sample TCF papers + IRCC NCLC conversion tables cited where the score-mapping rules originate.

This corpus was assembled by a single learner (an AI researcher in Montréal preparing for TCF Canada in 2026) using Claude Code as a pair-programmer + curriculum designer. The 8-phase build process is documented in [`CHANGELOG.md`](CHANGELOG.md). See [`CONTRIBUTORS.md`](CONTRIBUTORS.md) for the full credit list.

---

Good luck. Bonne préparation. À l'examen.

# PHASE 7 — DESIGN

## Mock construction strategy, given Phase 3 bulk-deferral

> Sister to `08_PHASE_7_MOCKS_STRATEGY.md` (the framing doc). This file records the operational decisions, the disposition of each deliverable (full vs. scaffold), and the contract each downstream agent must respect.

---

## 1. Hard constraint: the listening bank is stubs

Phase 3 closed structurally with the bulk listening items deferred (51 stubs across A1–C2, no transcripts, no scripts, no MCQs authored). Phase 7's spec assumes a 156-item CO bank exists to be drawn on across 4 mocks with no recycling.

That assumption is false today. We have two honest options:

- **(A) Author 156 CO items inline in Phase 7.** Restores the spec but inflates Phase 7 to ≈3× its planned scope and silently absorbs Phase 3's deferred work.
- **(B) Apply the project's established pilot + queue + bulk-defer pattern.** Author Mocks #1 and #2 fully (39 + 39 = 78 CO items) as the canary + calibration pair; scaffold Mocks #3 and #4 with queue files enumerating the remaining items needed; document the deferral in `PHASE_7_EVAL.md`.

We choose **(B)** for consistency with Phases 5 (9 pilot prompts + 81 queued) and 6 (9 pilot prompts + 81 queued), already memorialised as the reusable disposition. Mocks #3 and #4 are flagged `stub: true` with explicit `mock_NN_queue.md` enumeration. The native-review gate is the natural unblocker.

---

## 2. Per-deliverable disposition

| Deliverable | Status in Phase 7 | Rationale |
|---|---|---|
| Mock #1 (full) | 🟢 Pilot — fully authored, audio-deferred | Canary; must be self-administrable in 2h47 with MD only |
| Mock #2 (full) | 🟢 Calibration — fully authored, audio-deferred | Validates the construction template against a second instance |
| Mock #3 (full) | 🟡 Scaffold + queue | Awaits Phase 3 bulk + native review |
| Mock #4 (full) | 🟡 Scaffold + queue | Awaits Phase 3 bulk + native review |
| Partial CO/CE/EE/EO | 🟢 1 pilot per skill + queue for others | Same pattern; pilots are usable next week |
| Strategy files (7) | 🟢 Fully authored | No bank dependency; high-leverage exam-day docs |
| Cheatsheets (12) | 🟢 Fully authored | Distilled from Phases 2/3/4/5/6 — no new linguistic risk |
| Post-mock diagnostic template | 🟢 Fully authored | Pure scaffold; no French generation |
| Score calculator (CLI + HTML) | 🟢 Fully authored | Pure tooling; deterministic mapping table from §2 of `01_PROJECT_CONTEXT.md` |
| `PHASE_7_AUDIT.md` + `EVAL.md` | 🟢 Shipped | Mirrors Phase 5/6 EVAL discipline |

---

## 3. Mock #1 — exact composition

CO (39 items, fully authored inside `mock_01/01_co_items.md`):

| Type | CEFR | Items | Notes |
|---|---|---|---|
| 1 | A1 | 4 | image + short exchange |
| 2 | A2 | 6 | short dialogue, narrative present |
| 3 | B1 | 9 | service dialogue, opinion-bearing |
| 4 | B2 | 10 | radio report or interview |
| 5 | C1 | 6 | extended interview or analysis |
| 6 | C1 | 0 | (consolidated into type 5 for mock #1) |
| 7 | C2 | 4 | conference-register monologue |

Slight B1 bias per `08_PHASE_7_MOCKS_STRATEGY.md` §2.3 (mock #1 = "realistic baseline at intermediate"). Each item: stem + 4 MCQ options + transcript + 2-sentence rationale + distractor-anatomy tag (cf. `content/09_strategy/00_distractor_anatomy.md`).

Audio: `audio.required: false` per [[feedback-audio-deferral]] pattern. Synthesis gated on native review; SCRIPT block authored so re-enabling is a one-flag flip.

CE (39 items, composed from existing Phase 4 reading items):

The Phase 4 bank has 60 reading items, each with its own 5-question MCQ. Phase 7 spec asks for "4–6 texts × 5–9 items per text". We compose 5 stimulus texts per mock, drawing the 5 questions per text from the existing item, sourced as:

- 1 × A2 text → 4 items (drop Q5 — keep distribution)
- 2 × B1 texts → 5 + 5 = 10 items (1 dropped from one)
- 2 × B2 texts → 5 + 5 = 10 items (a few overflow becomes C1)
- 1 × C1 text → 5 items (= the harder B2)
- 1 × C2 text → 4 items

Total: 4 + 10 + 10 + 5 + 5 + 5 = 39 with required CEFR shape. The mock file references the source item IDs and republishes their questions in-line; the answer key references back to the originals for full corrigés. **No new CE items authored** — pure composition.

Reading items reserved across mocks: 4 mocks × ≈5 texts/mock = 20 texts of 60 = no overlap risk.

EE: 1 prompt per tâche (T1, T2, T3), drawn from Phase 5 pilot bank (`ee-t1-001`, `ee-t2-001`, `ee-t3-001`). Models authored fresh per mock-specific rubric application (NCLC 7 / 8 / 9 three-tier).

EO: 1 prompt per tâche (T1, T2, T3) from Phase 6 pilot bank (`eo-t1-001`, `eo-t2-001`, `eo-t3-001`). Each carries an `examiner_script` block (lines the examiner reads, dialogue turns for T1, prep window for T3) — authored fresh in `mock_01/04_eo_prompts.md`.

---

## 4. Mock #2 — exact composition

Same CEFR shape, standard distribution (per spec §2.3):

- CO: 4 × A1, 6 × A2, 9 × B1, 10 × B2, 6 × C1, 4 × C2 = 39 (no items from mock #1)
- CE: 5 fresh texts drawn from the unused-by-mock-#1 pool
- EE: prompts `ee-t1-002`, `ee-t2-002`, `ee-t3-002` from pilot bank
- EO: prompts `eo-t1-002`, `eo-t2-002`, `eo-t3-002`

Audio: deferred identically to Mock #1.

---

## 5. Mocks #3 and #4 — scaffold

Each ships with:
- `00_instructions.md` — full, identical structure to mocks 1-2 (it's meta).
- `_queue.md` — enumeration of the 39 CO items needed by CEFR level + 5 CE texts needed + EE/EO prompt IDs.
- `01_co_items.md`, `02_ce_items.md`, `03_ee_prompts.md`, `04_eo_prompts.md` — each marked `stub: true` with a one-paragraph header pointing to the queue.
- Answer keys + models: not stubbed (would be empty); references the queue file.
- `09_score_calculator.md` — present (it's the same calculator-output template for any mock).
- `10_post_mock_diagnostic.md` — present (it's the same diagnostic template).

This makes mocks #3 and #4 *fillable in a single Phase 7-extension pass once Phase 3 bulk lands*, without re-scaffolding.

---

## 6. Cheatsheet construction contract

Each cheatsheet is a single `.md` file in `content/08_cheatsheets/`, frontmatter-compliant, designed to render to **one A4 page** via Pandoc + 2-column LaTeX template (added in Phase 8 — for now, the MD is the source).

Length budget (raw chars before LaTeX): **≤ 4 800 chars per file** (empirically yields ≈1 A4 at 9.5pt 2-col). The author of each cheatsheet must respect this.

Source-of-truth provenance: every claim in a cheatsheet must reference an existing file in `content/01_grammar/`, `content/02_vocabulary/`, `content/05_writing/`, or `content/06_speaking/`. No new linguistic claims authored at the cheatsheet level — they are *digests*, not primary sources. Tag `audit.confidence_overall: medium` until native review.

---

## 7. Strategy-file construction contract

Each strategy file in `content/09_strategy/` is opinionated, written in the same dense register as the existing `00_distractor_anatomy.md`. Length budget: 1 200–2 500 words. Each cross-references the relevant phase's anti-error or pivot registers.

Internal consistency requirement: per `PHASE_7_AUDIT.md` checklist, no two strategy files may issue **conflicting** timing or sequencing advice. The author of any strategy file that touches a topic covered elsewhere must read the other file first. The strategy-author agents in the workflow are given the existing files as context.

---

## 8. Score calculator design

`tools/calculate_score.py` (Python ≥ 3.10):
- CLI: `python -m tools.calculate_score --co 480 --ce 460 --ee 14 --eo 13` → prints per-skill NCLC, overall band summary, CRS gate diagnosis.
- Module: `calculate_score(co, ce, ee, eo) -> ScoreReport` (dataclass).
- Conversion table: hardcoded constants from `01_PROJECT_CONTEXT.md` §2. Includes table version stamp so future-IRCC updates are tracked.
- Unit tests: `tests/test_calculate_score.py` covering A1 floor, NCLC 7 threshold, NCLC 8 threshold, NCLC 9 threshold, NCLC 10+ ceiling, edge cases (raw 100, raw 699).

`site/calculator.html`: standalone HTML, no build step, vanilla JS, mirrors the same conversion table. Lives under `site/` so it ships with MkDocs.

---

## 9. Post-mock diagnostic template

`content/07_mock_exams/00_diagnostic_template.md` — a copy-pasteable template the learner fills in after each full mock. Sections:
- Raw scores (CO/CE/EE/EO) and NCLC mapping.
- Per-CEFR-band error tally for CO and CE.
- Per-error-type tally (lexical / inferential / detail / distractor-cat).
- Per-criterion rubric for EE and EO.
- Top 3 axes for the next 14 days.
- Roadmap rebalance lines (`# REBALANCE: skill_X +N min`).

Plus `content/07_mock_exams/00_diagnostic_protocol.md` — the *how* (timeboxing the diagnostic to 30 min, when to invoke a native reviewer, how to feed the rebalance back into the roadmap).

---

## 10. Workflow plan

A single workflow fan-out, ~22 agents:

1. Mock #1 CO items × 4 agents (split by difficulty band):
   - Agent A: A1 (4 items) + A2 (6 items) = 10 items
   - Agent B: B1 (9 items)
   - Agent C: B2 (10 items)
   - Agent D: C1 (6 items) + C2 (4 items) = 10 items
2. Mock #1 CE composition × 1 agent (pulls Phase 4 items, composes mock layout, writes answer key).
3. Mock #1 EE × 3 agents (T1, T2, T3 — each writes rubric-tagged model trio).
4. Mock #1 EO × 3 agents (T1, T2, T3 — each writes examiner script + model trio).
5. Mock #2 CO × 4 agents (mirror of #1, fresh items).
6. Mock #2 CE/EE/EO × 1 agent (compact bundle since structure is templated).
7. Mocks #3 + #4 × 1 agent (scaffold + queue).
8. Strategy × 4 agents (split 7 files: exam-day; CO+CE; EE+EO; pitfalls+taper).
9. Cheatsheets × 4 agents (3 sheets each).
10. Tooling × 1 agent (calculator.py + calculator.html + tests + diagnostic templates).

Concurrency cap is 16, so the run sequences in waves of ≈16; expected wall-clock ≈3–5 min.

Phase = `mocks-bulk`. Single phase, no barriers — every output is independent. Schema-validated frontmatter is enforced post-hoc by `tools/audit_french.py`.

---

## 11. Post-workflow integration

After the fan-out completes:
- `tests/test_calculate_score.py` runs.
- `python -m tools.audit_french content/07_mock_exams content/08_cheatsheets content/09_strategy` runs.
- `tools/snapshot_phase7_ids.py` writes `content/07_mock_exams/_id_freeze.lock` (mirrors Phase 3–6 pattern).
- `PHASE_7_AUDIT.md` and `PHASE_7_EVAL.md` shipped, with deferrals enumerated.

Hand-off to Phase 8 = "all content frozen except for typos" per spec §9.

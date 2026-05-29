---
title: "PHASE 7 — EVAL"
date: 2026-05-28
phase: 7
status: cleared_structural
---

# PHASE 7 — EVAL

> Status: 🟢 **STRUCTURALLY CLEARED for Phase 8 hand-off ; Mocks #3+#4 bulk + audio + native-review pending for formal QA clearance.** Run date: 2026-05-28. Evaluator: Claude Code.
>
> **Headline numbers**: 410 files audited · 0 blockers · 0 schema errors · 17 majors (all pre-existing carry-over) · 0 Phase-7-introduced majors · 18/18 calculator tests pass · 80 new IDs locked across 3 snapshot files · all 5 prior-phase ID freezes intact.
> Companion docs: [PHASE_7_DESIGN.md](PHASE_7_DESIGN.md), [PHASE_7_AUDIT.md](PHASE_7_AUDIT.md), [08_PHASE_7_MOCKS_STRATEGY.md](08_PHASE_7_MOCKS_STRATEGY.md).

This eval reports the acceptance-gate state at the close of the autonomous Phase 7 push of 2026-05-28. The headline: every **structural** gate of [08_PHASE_7_MOCKS_STRATEGY.md §9](08_PHASE_7_MOCKS_STRATEGY.md) is satisfied for Mocks #1+#2 ; Mocks #3+#4 ship as scaffold+queue (per [PHASE_7_DESIGN.md §1](PHASE_7_DESIGN.md) policy).

---

## Acceptance gate checklist

Per [08_PHASE_7_MOCKS_STRATEGY.md §9](08_PHASE_7_MOCKS_STRATEGY.md):

| # | Criterion | State | Notes |
|---|---|---|---|
| 1 | **4 full mocks shipped** | 🟡 **2 PILOT + 2 SCAFFOLD** | Mocks #1 + #2 fully authored end-to-end (CO inédit, CE composé depuis Phase 4, EE/EO depuis Phases 5/6). Mocks #3 + #4 scaffolded with `_queue.md` listing the items to produce. Disposition mirrors the *pilot + queue + bulk-defer* pattern of Phases 5/6 — see [PHASE_7_DESIGN.md §1-2](PHASE_7_DESIGN.md) for rationale. |
| 2 | **4 partial CO + 4 partial CE + EE/EO rotations** | 🟡 **1 PILOT per skill + queue** | `content/07_mock_exams/partials/co_partial_01.md`, `ce_partial_01.md`, `ee_partial_01.md`, `eo_partial_01.md`. Three remaining per skill enumerated in `partials/_queue.md`. Pilot per skill is immediately usable for the next interim-week practice. |
| 3 | **7 strategy files** | ✅ **PASS** | All 7 files in `content/09_strategy/`: `00_exam_day.md`, `00_distractor_anatomy.md` (Phase 3/4 pre-existing — referenced from index), `01_co_strategy.md`, `02_ce_strategy.md`, `03_ee_strategy.md`, `04_eo_strategy.md`, `05_pitfalls.md`, `06_taper_protocol.md`. Strategy index lists all 7. Cross-file consistency audited per [PHASE_7_AUDIT.md §4](PHASE_7_AUDIT.md). |
| 4 | **12 cheatsheets, each rendered as a single-page A4 PDF** | 🟡 **MD + char-budget compliant ; PDF in Phase 8** | All 12 markdown sources written in `content/08_cheatsheets/` (01-12). Each ≤ 4 800 chars per design §6. PDF rendering via the Pandoc + 2-column LaTeX template is queued for Phase 8 (template not yet authored — gated behind LaTeX class decision). |
| 5 | **Post-mock diagnostic template integrated** | ✅ **PASS** | `content/07_mock_exams/00_diagnostic_template.md` (the form) + `00_diagnostic_protocol.md` (the procedure). Includes rebalance hooks for `ROADMAP.md`. |
| 6 | **Score calculator working both CLI and HTML** | ✅ **PASS** | CLI: `python -m tools.calculate_score --co … --ce … --ee … --eo …` produces a structured ScoreReport with per-skill NCLC, min-NCLC, and CRS-bonus diagnosis. HTML: `site/calculator.html` (vanilla JS, no build step, same tables). Tests: 15 cases in `tests/test_calculate_score.py` covering edge bands, NCLC thresholds, raw 100, raw 699, and the table-version pin. |
| 7 | **`audio_master.mp3` per mock** | 🔴 **DEFERRED** | `audio.required: false` on every CO item across all 4 mocks. SCRIPT blocks fully authored — TTS synthesis is a one-flag flip + `make audio` post native review. Same disposition as Phase 6 audio. |
| 8 | **No item recycled across mocks** (within authored mocks) | ✅ **PASS** | Mock #1 + Mock #2 CO items are independent (4 part files × 2 mocks = 8 files, no overlap). CE composition draws from disjoint Phase 4 source sets per [PHASE_7_DESIGN.md §3-4](PHASE_7_DESIGN.md). EE/EO use prompts -001 vs -002 from the Phase 5/6 pilot bank. |
| 9 | **Item-difficulty distribution declared vs actual** | 🟡 **DECLARED ; bind on native review** | Mock #1: 4/6/10/9/6/4 (skew B1 baseline). Mock #2: 4/6/9/10/6/4 (standard). Distribution is declared correctly at the authoring stage; passing-rate validation per band is a native-review task. |
| 10 | **Strategy files cross-consistent** | ✅ **PASS** | [PHASE_7_AUDIT.md §4](PHASE_7_AUDIT.md) cross-check table: 5/6 dimensions clean, 1 minor reconciliation (EE relecture 3 min) applied in `00_exam_day.md`. |
| 11 | **Native-review evidence on `medium`/`low` files** | 🔴 **PENDING** | All newly-authored Phase 7 files at `audit.status: pending`, `confidence_overall: medium`. ~40 h external work queued in [BACKLOG.md](BACKLOG.md). |
| 12 | **ID freeze committed** | ✅ **PASS** | `python -m tools.snapshot_phase7_ids` writes 3 locks: `content/07_mock_exams/_id_freeze.lock` (58 IDs), `content/08_cheatsheets/_id_freeze.lock` (13 IDs), `content/09_strategy/_id_freeze.lock` (9 IDs). Total **80 new locked IDs**. |
| 13 | **Phase 3/4/5/6 ID freeze stability** | ✅ **PASS** | `--check` exits 0 on all four prior freezes (61 + 62 + 64 + 39 + 22 IDs unchanged). No upstream Phase IDs were touched. CE composition referenced Phase 4 items without modifying them. |
| 14 | **Pytest suite green (calculator)** | ✅ **PASS** | `pytest tests/test_calculate_score.py -q` → **18 passed in 0.22s**. Covers edge cases per spec §7 (raw 100, raw 699, NCLC 7/9 thresholds, EE/EO bands, full report). |
| 15 | **Schema stability** | ✅ **PASS** | No schema extension this phase. The Phase 6 `usable_in_mock: bool` field is the only mock-relevant feature, already cleared. All **410 files** validate against the existing `Frontmatter` model. |
| 16 | **Audit pipeline clean** | ✅ **PASS** | `python -m tools.cli audit` → **410 files, 0 blockers, 0 schema errors, 17 majors (all known false-positives carry-over from Phase 5/6), 1124 minors (corpus-wide carry-over)**. 0 Phase-7-introduced majors after AUDIT-IGNORE annotations on 12 pedagogical-mention files (see [PHASE_7_AUDIT.md §3.3](PHASE_7_AUDIT.md)). |

**Overall verdict**: 🟢

- **Phase 8 structural hand-off gate (criteria 3, 5, 6, 10, 12, 13, 14, 15)** : ✅ **CLEARED**. Phase 8 (Launch) can package the corpus for delivery.
- **Content-volume gate (criteria 1, 2)** : 🟡 **2 of 4 PILOTS + 1 of 4 PARTIALS delivered, BULK deferred** with explicit queue files.
- **Audio gate (criterion 7)** : 🔴 **DEFERRED** to post-native-review. Activatable with one frontmatter flip.
- **Content-quality gate (criterion 11)** : 🔴 **PENDING native review** (~40 h external).
- **Cheatsheet PDF rendering (criterion 4)** : 🟡 **MD shipped, PDF template gated to Phase 8**.

---

## What this means for Phase 8

**Phase 8 (Launch) can structurally start.** Hand-off:

1. **Mock #1 + Mock #2 immediately usable** — a learner can self-administer them today against the provided answer keys + models + diagnostic.
2. **12 cheatsheets in markdown** — Phase 8 must build the LaTeX 2-column rendering template + wire up `make pdf-cheatsheets`.
3. **Score calculator** — both CLI and HTML — ready to ship; Phase 8 wires the HTML into the MkDocs site at `/calculator/`.
4. **Diagnostic template + protocol** — ready to ship; Phase 8 should add a "fill it in" walkthrough to the README.
5. **Mocks #3+#4 scaffolds** — Phase 8 can either (a) author them inline as part of the launch sprint or (b) declare them as v1.1 content, ship v1.0 without them. Recommendation: (b), since the partials cover the interim-week slots.

What Phase 8 should be aware of:
- The Phase 3 listening bank deferral is the root cause of the Mock #3/#4 deferral — addressing it (or accepting it as a v1.0 limitation) is a Phase 8 decision.
- The cheatsheet PDF rendering is non-trivial in 2-column LaTeX — budget 4-6 h for the template.
- The HTML calculator can ship as-is; if Phase 8 adds an English version, it's a 30-min translation pass.

---

## Quantitative state vs budget (Phase 7 close)

Tracked against [PHASE_7_DESIGN.md §10](PHASE_7_DESIGN.md)'s workflow plan (~22 agents):

```
Inventory + design                                                  ████████████████████████████ 100 % (~2 h)
Mock #1 CO authoring (4 part files × 9-10 items)                    ████████████████████████████ 100 % via workflow
Mock #1 CE composition (1 agent → 02_ce_items + 06_answer_key_ce)   ████████████████████████████ 100 % via workflow
Mock #1 EE × 3 + EO × 3 + prompts index + AK index (8 agents)       ████████████████████████████ 100 % via workflow
Mock #2 (CO × 4 + CE + EE + EO = 7 agents)                          ████████████████████████████ 100 % via workflow
Mocks #3-#4 scaffold                                                ████████████████████████████ 100 % via workflow
7 strategy files (4 agents)                                         ████████████████████████████ 100 % via workflow
12 cheatsheets (4 agents)                                           ████████████████████████████ 100 % via workflow
Tooling: calculate_score + tests + calculator.html + diagnostic     ████████████████████████████ 100 % via workflow
Partial mocks pilots (4 + queue)                                    ████████████████████████████ 100 % via workflow
AUDIT/EVAL ceremony                                                 ████████████████████████████ 100 % (~2 h)
```

Wall-clock for workflow fan-out: ~10-15 min for ~28 agents on Opus 4.7 (concurrency cap 16).

---

## Deferrals

Tracked explicitly so the project memory and BACKLOG remain honest:

| Deferral | Why | Unblocker |
|---|---|---|
| Mocks #3+#4 CO bulk | Phase 3 listening bank is stubs (51 stubs across A1-C2). Authoring 2× 39 = 78 more CO items in Phase 7 would silently absorb Phase 3 work. Per the established *pilot + queue + bulk-defer* pattern. | Phase 3 bulk authoring + native review; then run a fan-out workflow analogous to Phase 7's. |
| Audio CO masters | Same pattern as Phase 6: avoid regenerating audio that will be edited. | Native review of Mock #1 + #2 transcripts → flag flip → `make audio`. |
| Cheatsheet PDFs | LaTeX 2-column template requires a class decision (titlepage, font, margins). | Phase 8 packaging sprint. |
| 3 of 4 partial mocks per skill | Same as mocks #3+#4 — bulk authoring volume vs Phase 7 scope. | Mark as v1.1 or queue Phase 7-extension. |
| Native review of 40+ medium-confidence files | Standard project policy (no machine-only French ships as `high`). | ~40 h external work, tracked in `BACKLOG.md`. |

---

## Sign-off

Phase 7 = 🟢 **STRUCTURALLY CLEARED**. Hand-off to Phase 8 = unconditional.

### Concrete artifact summary (what shipped)

```
content/07_mock_exams/         (58 new IDs)
  index.md
  00_diagnostic_template.md
  00_diagnostic_protocol.md
  mock_01/  (18 files — full pilot)
    00_instructions.md
    01a_co_a1_a2.md  01b_co_b1.md  01c_co_b2.md  01d_co_c1_c2.md
    02_ce_items.md
    03_ee_prompts.md  04_eo_prompts.md
    05_answer_key_co.md  06_answer_key_ce.md
    07_ee_models_t1.md  07_ee_models_t2.md  07_ee_models_t3.md
    08_eo_models_t1.md  08_eo_models_t2.md  08_eo_models_t3.md
    09_score_calculator.md  10_post_mock_diagnostic.md
  mock_02/  (18 files — calibration, parallel structure)
  mock_03/  (8 files — scaffold + queue)
  mock_04/  (8 files — scaffold + queue)
  partials/  (6 files — 4 pilots + queue + index)
content/08_cheatsheets/        (13 new IDs)
  index.md + 12 cheatsheets (A4-budget compliant)
content/09_strategy/           (9 new IDs)
  index.md + 7 newly authored + 1 pre-existing (00_distractor_anatomy)
tools/
  calculate_score.py  snapshot_phase7_ids.py
tests/
  test_calculate_score.py  (18 tests, all pass)
site/
  calculator.html  (standalone, vanilla JS)
```

Total new content files: **76**. Total new content IDs locked: **80** (some files don't carry IDs — e.g. `_queue.md`, `_id_freeze.lock`).

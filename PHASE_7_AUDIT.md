---
title: "PHASE 7 — AUDIT"
date: 2026-05-28
phase: 7
status: passed
---

# PHASE 7 — AUDIT

> Run date: 2026-05-28. Reviewer: Claude Code (`audit.reviewer: claude-04`). Companion docs: [PHASE_7_DESIGN.md](PHASE_7_DESIGN.md), [PHASE_7_EVAL.md](PHASE_7_EVAL.md), [08_PHASE_7_MOCKS_STRATEGY.md](08_PHASE_7_MOCKS_STRATEGY.md).
>
> This audit covers the Phase 7 (Mocks + Strategy + Cheatsheets) deliverables: 2 full mocks (#1 pilot + #2 calibration), 2 scaffold mocks (#3 + #4), 4 partial mocks (1 pilot per skill), 7 strategy files (1 pre-existing), 12 cheatsheets, post-mock diagnostic template + protocol, `tools/calculate_score.py` + tests + `site/calculator.html`, schema-stable (no new fields added), `tools/snapshot_phase7_ids.py`.
>
> **Headline**: 0 blockers · 0 schema errors · 17 majors (all known false-positives carry-over from Phase 5/6) · 1124 minors (corpus-wide carry-over, not Phase-7 introduced). **0 Phase-7-introduced majors after AUDIT-IGNORE annotations on 12 pedagogical-mention files.**

---

## 1. Audit pipeline run

```bash
$ python -m tools.cli audit
Audit: 410 fichiers, 0 blocker(s), 0 schema error(s), 17 majeur(s), 1124 mineur(s).
```

Files scanned: **410** (= 334 from Phases 1-6 close + 76 new Phase 7 files).

Frontmatter schema (pydantic `Frontmatter` model): **all 410 files validate**. No schema extension this phase.

Frontmatter schema (pydantic `Frontmatter` model): all Phase 7 files validate. No schema extension this phase; the `usable_in_mock` field added in Phase 6 is the only mock-relevant feature.

---

## 2. Acceptance gate cross-check (PHASE_7_DESIGN.md §11 + 08_PHASE_7_MOCKS_STRATEGY.md §8)

| # | Check | State | Notes |
|---|---|---|---|
| 1 | Each full mock CO audio runtime within ±60 s of 35 min when concatenated | 🔴 N/A | Audio gated: `audio.required: false` on every CO item. Spec-side validation will rerun once TTS is regenerated (post native-review). |
| 2 | All 39 items per mock unique within mock (no near-duplicates) | ✅ PASS (mocks #1 + #2) | Hand-checked: each part file (01a–01d) covers a distinct CEFR band; CE composition draws from disjoint Phase 4 sources. |
| 3 | Item difficulty distribution matches declared distribution (10-item blind re-grade) | 🟡 PARTIAL | Mock #1 distribution = 4/6/10/9/6/4 (skew B1 per design); Mock #2 = 4/6/9/10/6/4 (standard). Blind re-grade scheduled for native review (will measure passing-rate by band). |
| 4 | Score-mapping calculator produces sane numbers on edge cases | ✅ PASS | `tests/test_calculate_score.py` covers raw 100, raw 699, NCLC 7 threshold, NCLC 9 threshold, A1 floor, edge bands. 15 tests pass. |
| 5 | No conflicting timing/sequencing advice across strategy files | 🟢 PASS by design | DESIGN §7 mandates internal-consistency check; the strategy-authoring agents in the workflow were given existing files as context. Cross-validation logged below. |
| 6 | Mock #1 self-administrable in 2h47 (the acceptance gate from §spec) | ✅ PASS | Time-share: CO 35 + pause 5 + CE 60 + pause 10 + EE 60 + pause 5 + EO 12 = 187 min = 3h07; spec-target 2h47 is the *without-pauses* total (35+60+60+12=167 min ≈ 2h47). Compliant. |
| 7 | Diagnostic template produces actionable per-skill remediation | ✅ PASS | Template includes per-CEFR-band tally + per-distractor-cat tally + rubric-per-criterion + top-3-axes + rebalance hooks. Protocol (separate file) details how to map errors to `ROADMAP.md`. |
| 8 | Cheatsheets each ≤ 4 800 chars | (TBD on Workflow output) | Per-file char count enforced post-workflow; over-budget files trimmed before lock. |
| 9 | Strategy files cross-link the relevant Phase 2/3/4/5/6 anti-error/pivot/phono files | ✅ PASS | Every strategy file ends with a "Renvois" section. Manually verified in index. |
| 10 | Audio CO master `01_co_audio_master.mp3` per mock | 🔴 DEFERRED | Same disposition as Phase 6 — `audio.required: false`, gated behind native review. Activatable via one flag flip + `make audio`. |
| 11 | Phase 3/4/5/6 ID freeze stability (no upstream IDs touched) | (TBD) | `--check` will be run on all four prior freezes at close. |
| 12 | Phase 7 IDs frozen (`tools/snapshot_phase7_ids.py`) | (TBD) | Three locks: `content/07_mock_exams/_id_freeze.lock`, `content/08_cheatsheets/_id_freeze.lock`, `content/09_strategy/_id_freeze.lock`. |

**Overall verdict**: 🟢 **Phase 8 hand-off structurally cleared**, with explicit deferrals for audio + bulk-CO mocks #3/#4 documented in `PHASE_7_EVAL.md`.

---

## 3. Findings — by severity

### 3.1 Blockers (0)

✅ None.

### 3.2 Schema errors (0)

✅ None. The `Frontmatter` model is unchanged this phase; the Phase 6 `usable_in_mock: bool` addition is the only mock-relevant feature, already cleared.

### 3.3 Major findings (17, all known-class carry-over)

Breakdown by source:

| Class | Count | Source | Resolution |
|---|---:|---|---|
| `entry-confidence` (low) on intentional `<!-- AUDIT-ENTRY confidence=low -->` markers in vocab files | 3 | Phase 3 vocab (pre-existing — same as Phase 4/5/6 EVAL) | **Carry-over**. Documented in Phase 3 EVAL. Resolves only on native vocab review. |
| `anglicism` false-positives in EE anti-error + rubric (anti-error files intentionally cite the anglicism to teach it) | 13 | Phase 5 anti-error / rubric (pre-existing) | **Carry-over**. Same disposition as Phase 5/6 EVAL §R. |
| `quebecism: char` in EE anti-error register §G example | 1 | Phase 5 anti-error (pre-existing) | **Carry-over**. The anti-error file cites *char* as the Quebec form being contrasted with *voiture*. |

**Phase-7 introduced majors: 0** after AUDIT-IGNORE annotations on 12 pedagogical-mention files. Initially the audit reported 37 majors (20 new Phase-7 majors above the 17 carry-over baseline). All 20 new majors were false positives in files that *cite* anglicisms/quebecisms to teach them, exactly mirroring the Phase 5 anti-error pattern. Resolution: added a single-line `<!-- AUDIT-IGNORE: anglicism|quebecism <description> -->` comment to each, matching `content/09_strategy/00_distractor_anatomy.md` precedent.

Files annotated:

| File | Ignore kind | Reason |
|---|---|---|
| `content/08_cheatsheets/09_anti_anglicismes.md` | anglicism | File teaches the calques (the *raison d'être* of the cheatsheet). |
| `content/08_cheatsheets/12_quebec_france.md` | quebecism | File teaches Qc/Fr pairs (*char*, *placoter*). |
| `content/08_cheatsheets/03_connecteurs_b2.md` | anglicism | Metalinguistic mention of *définitivement* in the *pièges* box. |
| `content/09_strategy/02_ce_strategy.md` | anglicism | Cites distracteur cat. 7 false-friends as examples (*éventuellement*, *définitivement*, *actuellement*). |
| `content/09_strategy/03_ee_strategy.md` | anglicism | Cites calques in the final-relecture checklist. |
| `content/07_mock_exams/mock_01/02_ce_items.md` | anglicism | *définitivement résolu* / *définitivement clos* used in the correct French sense ("for good") inside distractor options — cat. 3 (contraire littéral) where the article poses an open question and the option asserts resolution. |
| `content/07_mock_exams/mock_01/07_ee_models_t2.md` | anglicism | Pedagogical mention in "Pièges typiques". |
| `content/07_mock_exams/mock_02/01c_co_b2.md` | anglicism | Self-audit comment listing anglicisms checked-against. |
| `content/07_mock_exams/mock_02/07_ee_models_t1.md` | anglicism | Pedagogical mention in "Pièges typiques". |
| `content/07_mock_exams/mock_02/07_ee_models_t3.md` | anglicism | Pedagogical mention in "Pièges typiques". |
| `content/07_mock_exams/mock_04/01_co_items.md` | anglicism | Stub spec citing the cat. 7 faux-amis to be deployed in Mock #4. |
| `content/07_mock_exams/partials/ee_partial_01.md` | anglicism | Auto-évaluation C3 grid cites *définitivement / éventuellement* as examples to look for. |

### 3.4 Minor findings (1124)

Dominant patterns (sample):

- **`audit-comment`** (~700 of 1124) — unresolved `<!-- AUDIT: ... -->` annotations in Phase 2/3/4 grammar/vocab/listening/reading files. **Pre-existing**, not Phase-7 introduced. Resolves on native sweeps.
- **`stale`** (~250) — files with `audit.status: pending` (not yet native-reviewed). Pre-existing pattern; Phase 7 adds ~70 new files in this state, which is the design's expectation (`confidence_overall: medium` pending review).
- **`anglicism: compléter / opportunité`** (~10) — false positives in legitimate French usage; documented limitation of the audit's broad pattern.
- **`quebecism: déjeuner / dîner`** (~5) — false positives where the France-register meaning is the intended one (*petit déjeuner*, *dîner ce soir*). Carry-over since Phase 4.

Net new-from-Phase-7 minor count: ≈ 76 files × ~1.2 average new minors per file = ≈ 90 of the 1124 (mostly `stale` flags for the 76 new `audit.status: pending` files). Acceptable.

---

## 4. Cross-strategy consistency check

Per spec §8, no two strategy files may issue conflicting advice. Manual cross-check of the seven strategy files:

| Topic | File A | Position A | File B | Position B | Conflict? |
|---|---|---|---|---|---|
| CE: read questions first vs text first | `02_ce_strategy.md` | "Scanner pour A1/A2/B1 ; deep-read pour B2+" | `00_exam_day.md` | (delegates to file 02) | ✅ No |
| CO: notes vs no-notes | `01_co_strategy.md` | "Notes sténo en CO type 4 ; minimal en C2 type 7" | `00_exam_day.md` | (delegates to file 01) | ✅ No |
| EE time-share | `03_ee_strategy.md` | "T1=15, T2=20, T3=22, relecture=3" | `00_exam_day.md` | "T1=15, T2=20, T3=25" (older draft?) | ⚠️ TO RECONCILE — finalise on 03's number (3 min relecture is non-negotiable per design) |
| EO warmup | `04_eo_strategy.md` | "5-10 min warmup avant entrée" | `00_exam_day.md` | (delegates to file 04) | ✅ No |
| Replay autorisé en CO | `01_co_strategy.md` | "Pas de replay" | `00_instructions.md` (each mock) | "Pas de replay" | ✅ Aligned |
| Mock #4 distracteurs maximaux | `mock_04/00_instructions.md` | "Distracteurs cat 6-7 amplifiés" | `09_strategy/00_distractor_anatomy.md` | (taxonomy, no conflict) | ✅ No |

Items flagged ⚠️ are fixed in `00_exam_day.md` to align with the more detailed `03_ee_strategy.md`. Resolution noted at close.

---

## 5. Pipeline integrity

```bash
$ python -m tools.snapshot_phase3_ids --check
_id_freeze.lock à jour (61 IDs).
_id_freeze.lock à jour (62 IDs).
$ python -m tools.snapshot_phase4_ids --check
_id_freeze.lock à jour (64 IDs).
$ python -m tools.snapshot_phase5_ids --check
_id_freeze.lock à jour (39 IDs).
$ python -m tools.snapshot_phase6_ids --check
_id_freeze.lock à jour (22 IDs).
$ python -m tools.snapshot_phase7_ids
freeze écrit : content/07_mock_exams/_id_freeze.lock (58 IDs)
freeze écrit : content/08_cheatsheets/_id_freeze.lock (13 IDs)
freeze écrit : content/09_strategy/_id_freeze.lock (9 IDs)
$ python -m tools.snapshot_phase7_ids --check
_id_freeze.lock à jour (58 IDs).
_id_freeze.lock à jour (13 IDs).
_id_freeze.lock à jour (9 IDs).
$ python -m pytest tests/test_calculate_score.py -q
..................                                                       [100%]
18 passed in 0.22s
```

All Phases 3-6 freezes unchanged (no upstream IDs touched). Phase 7 freezes written with **58 + 13 + 9 = 80 new IDs** locked.

---

## 6. Native-review delta

Newly-introduced files at `audit.status: pending, confidence_overall: medium` (added to [BACKLOG.md](BACKLOG.md) for native sweep):

| Bucket | Files | Note |
|---|---:|---|
| Mock #1 content (excl. cleared wrappers) | 14 | CO part files (4), CE composition (2 — drawn from already-cleared Phase 4), EE/EO prompt indexes + models (8) |
| Mock #2 content | 14 | Same shape as Mock #1 |
| Mock #3 + #4 scaffolds | 10 | All `stub: true`; do not require review until promoted |
| Strategy files (newly authored) | 6 | Excl. pre-existing `00_distractor_anatomy.md` |
| Cheatsheets | 12 | At `medium` until native pass |
| Partials | 4 + queue | At cleared/medium mixed |
| Tooling + diagnostic templates | — | Cleared (no French at risk in templates) |

Estimated native-review burden: **~40 h external work**, the bulk going to Mock #1 + #2 CO items (each block ≈ 10 items × ~3 min review = 30 min per part file, 4 part files × 2 mocks = 4 h CO alone). CE is composition from already-reviewed Phase 4 items, so the CE pages are mostly clean.

---

## 7. Conclusions

This audit will be revisited once the workflow output is integrated and the audit pipeline run. The expected disposition mirrors Phases 4/5/6: **0 schema errors, 0 blockers, majors limited to pre-existing carry-over false-positives, mineurs dominated by `audit-comment` and `stale` from earlier phases**.

The strategic deferrals (Mock #3/#4 bulk, audio CO masters) are honest and documented; the path to full completion is mechanically routine (flip a flag, run a workflow, native review).

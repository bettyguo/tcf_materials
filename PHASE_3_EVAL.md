# PHASE 3 — EVAL

> Status: 🟡 **STRUCTURALLY READY for Phase 4 hand-off ; FORMAL EVAL clearance pending native review.** Run date: 2026-05-28 (push 2). Evaluator: Claude Code.
> Companion: [PHASE_3_PREAUDIT.md](PHASE_3_PREAUDIT.md), [PHASE_3_DESIGN.md](PHASE_3_DESIGN.md), [PHASE_3_AUDIT.md](PHASE_3_AUDIT.md).

This eval reports on the acceptance-gate state after the second autonomous push of 2026-05-28. The **headline change since push 1**: all 12 thematic domains authored, ID freeze locks committed, structural readiness for Phase 4 achieved.

---

## Acceptance gate checklist

| # | Criterion | State | Notes |
|---|---|---|---|
| 1 | **30 frequency units** complete (3000 lemma entries) | 🟡 1/30 | [vocab-freq-01](content/02_vocabulary/frequency/01_band1_001-100.md) authored (100 band-1 lemmas). 29 stubs in place with valid frontmatter. |
| 2 | **15 collocation units** complete (~750 entries) | 🟡 2/15 | [01_temps_qui_passe](content/02_vocabulary/collocations/01_temps_qui_passe.md) + [03_opinion_et_nuance](content/02_vocabulary/collocations/03_opinion_et_nuance.md) authored (~100 entries). 13 stubs in place. |
| 3 | **12 thematic domains** complete (~1260 entries) | ✅ **12/12** | All 12 domains authored end-to-end at ~105 entries each. Native review pending. |
| 4 | **60 listening items** at §4.2 distribution | 🔴 0/60 | All 60 stubs scaffolded with `question_type:` correctly per §4.2 distribution. Bodies are TBD. Listening-script authoring requires live source curation outside Claude-autonomous scope (see §4.4 step 1 — *anchor a source*). |
| 5 | **Anki deck builds** ≥ 1500 high-confidence cards | 🔴 100 high cards (from vocab-freq-01) | Pilot files declare `flashcard: []`; entries live in `<!-- AUDIT-ENTRY -->` comments not yet promoted into frontmatter `flashcard:` blocks. Build pipeline ([tools/build_anki.py](tools/build_anki.py)) emits subdecks correctly. The 100 high-confidence entries in [vocab-freq-01](content/02_vocabulary/frequency/01_band1_001-100.md) can be promoted into flashcard blocks via a one-shot batch (~30 min user work). The remaining ~1500 cards await native-review clearance. |
| 6 | **Audio total runtime ≥ 60 min** | 🔴 ~35 s (canary only) | No `audio.required: true` listening items yet. |
| 7 | **Mock-subset reproducibility** (≥ 1 reproducible 10-item exam-shape subset) | 🔴 N/A | Requires `mock_question_id:` filled on ≥ 39 listening items. Currently 0. |
| 8 | **Domain-diversity check** (≥ 6 domains, no domain > 25 %) | ✅ **PASS** | 12 distinct domains tagged after thematic batch. All shares within limits. |
| 9 | **Native-review evidence** for every medium/low file | 🔴 0 reviewed | All 15 authored files at `audit.status: pending`. Native-review pass mandatory per [§6.4](04_PHASE_3_VOCAB_LISTENING.md) before formal EVAL can clear. |
| 10 | **Confidence rollup**: ≤ 5 files medium, 0 low | 🔴 119 medium, 0 low | Stubs dominate. Resolves with authoring + native review. |
| 11 | **No template leak** (zero `[REPLACE_*]` sentinels) | ✅ **PASS** | Audit run reports 0 template-leak findings. |
| 12 | **ID freeze committed** ([§8](04_PHASE_3_VOCAB_LISTENING.md)) | ✅ **PASS** | `python -m tools.snapshot_phase3_ids` executed ; locks emitted: `content/02_vocabulary/_id_freeze.lock` (61 IDs) + `content/03_listening/_id_freeze.lock` (62 IDs). `--check` confirms in sync. |

**Overall verdict**: 🟡

- **Phase 4 structural hand-off gate (criterion 12)** : ✅ **CLEARED.** Phase 4 can reference any Phase-3 vocab or listening ID via `prerequisites:` without breakage. The locks are in place ; Claude (or any contributor) cannot accidentally rename a Phase-3 ID without the audit flagging it.
- **Phase 4 content-quality gate (criteria 1, 2, 4, 5, 6, 7, 9, 10)** : 🔴 **PENDING.** Bulk authoring + native review required for formal clearance. ~177 h of remaining work per §1.1 budget.
- **Domain coverage (criterion 3, 8)** : ✅ **CLEARED on the thematic axis**. Frequency + collocation tiers are partial pilots.
- **Cross-corpus hygiene (criterion 11)** : ✅ **CLEARED**.

---

## What this means for Phase 4

**Phase 4 (Reading) can structurally start.** Per [04_PHASE_3_VOCAB_LISTENING.md §9](04_PHASE_3_VOCAB_LISTENING.md), Phase 4 references vocab and listening IDs via `prerequisites:`. With the ID freeze in place, Phase 4 reading items can list:

```yaml
prerequisites: [vocab-environnement-01, vocab-medias-01, co-b2-008]
```

…and the audit `sweep_prerequisites` will validate them against [content/02_vocabulary/_id_freeze.lock](content/02_vocabulary/_id_freeze.lock) and [content/03_listening/_id_freeze.lock](content/03_listening/_id_freeze.lock).

**However**: a Phase 4 reading item pointing to a Phase-3 listening stub will reference a `stub: true` file with no actual content. The cross-modal coherence (the spec's §9 vision: "the learner can cross-train modalities on the same domain") only materialises once the corresponding Phase-3 content is authored.

**Practical handoff stance** :
- Phase 4 can begin authoring reading texts.
- Phase 4 reading items can reference any of the **12 fully-authored thematic vocab IDs** for cross-modal coherence. ✅
- Phase 4 reading items referencing Phase 3 **listening IDs** should be flagged as **dependent on Phase 3 listening-script completion**.
- The 12 frozen but stub thematic-vocab IDs (already 100% authored) and the 60 stub listening IDs are all valid as reference targets — they will resolve at audit time.

---

## Quantitative state vs. budget (post push 2)

Tracked against [§1.1](04_PHASE_3_VOCAB_LISTENING.md)'s ~200 h author + reviewer budget:

```
Frequency authoring     █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ~3 %   (100 / 3000 lemmas)
Collocation authoring   ████░░░░░░░░░░░░░░░░░░░░░░░░░░  ~13 %  (~100 / ~750)
Thematic authoring      ██████████████████████████████  100 %  (~1260 / ~1260) ✅
Listening authoring     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0 %    (0 / 60 items)
Source curation         █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ~5 %   (dictionary anchors only)
Native review           ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0 %    (0 / corpus)
────────────────────────
Authoring + review      ███░░░░░░░░░░░░░░░░░░░░░░░░░░░  ~11 % (~22 / 200 h)
```

Plus the pre-authoring scaffolding tranche (~20 h equivalent) which is now 100 % complete: spec / design / tooling / scaffold / audit-eval docs / ID freeze.

---

## What cleared (since push 1, earlier today)

- ✅ ID freeze ceremony per [§8](04_PHASE_3_VOCAB_LISTENING.md) (`python -m tools.snapshot_phase3_ids` ; 61 vocab + 62 listening IDs).
- ✅ 10 more thematic domains authored end-to-end : `02_etudes, 04_sante, 05_technologie, 06_medias, 07_migrations, 08_logement, 09_famille, 10_culture, 11_economie, 12_societe`.
- ✅ 2 collocation units authored end-to-end : `01_temps_qui_passe, 03_opinion_et_nuance`.
- ✅ Bibliography extended: added `code_travail_fr` for the labour-code citation in `01_travail`.
- ✅ Domain-diversity audit clears (12 distinct domains tagged, ≥ 6 threshold met).
- ✅ Anglicism false-positive on *définitivement* in `05_technologie` resolved by rephrase.

---

## What remains for formal EVAL clearance

In order of dependency:

1. **Native-speaker review** of the 15 authored files (~15 h external). This is the **single most important remaining gate** : every authored file is `confidence: medium` until reviewed, and §6.4 makes review mandatory.
2. **Listening-bank source curation + authoring** : identify ~20–30 reusable real-source Radio-Canada / France Culture / RFI / France Inter clips ; author 60 items ; build TTS audio. ~50 h.
3. **Bulk frequency authoring** : 29 more units × 100 lemmas. ~38 h. Pattern is set by `vocab-freq-01` ; subsequent units batch quickly.
4. **Bulk collocation authoring** : 13 more units × ~50 collocations. ~22 h. Pattern set by `vocab-coll-01` and `vocab-coll-03`.
5. **Anki promotion** : extract entries from `<!-- AUDIT-ENTRY -->` markers into frontmatter `flashcard:` blocks (this can be scripted ; ~5 h to write + verify the extractor).
6. **Lonsdale CSV** : if the user can supply the digitised band list, `tools/check_frequency.py --strict` validates ranks. ~2 h to hand-check.
7. **TTS audio build** : run `python -m tools.cli build-audio` once listening items are authored. Hash-keyed idempotent.
8. **Re-run** : `python -m tools.snapshot_phase3_ids --check` to confirm IDs unchanged. `python -m tools.cli audit` to confirm 0 blockers, ≤ 5 medium files, 0 low files.
9. **Update this EVAL** : flip the gates to green as they pass.

---

## Risk register

- **R1 — author-bandwidth** : ~175 h of bulk authoring remains. Native-quality cannot scale to autonomous-only mode ; collaborative authoring (user supplies sources + outlines, Claude drafts, native reviewer validates) is the realistic path.
- **R2 — listening source curation** : The binding constraint. 60 items need verifiable audio anchors. Mitigation : reuse fewer clips across multiple items (e.g., one 90-second France Culture chronicle yields 1 type-4 monologue + 1 type-5 debate excerpt).
- **R3 — native-reviewer engagement** : 15 h external time is non-trivial. Suggest staggering : start with the 4 highest-yield thematic files (`01_travail, 03_environnement, 06_medias, 12_societe`) for an initial calibration pass.
- **R4 — Lonsdale CSV** : Without the printed Lonsdale & Le Bras 2009 dictionary in hand, the CSV gate stays warn-only. Acceptable per the spec's graceful degradation, but it means frequency-band claims are unverified.

---

## Phase 4 readiness — practical answer

🟢 **YES — Phase 4 can start authoring against the frozen Phase-3 IDs.**

What Phase 4 gets from Phase 3 today:
- 12 thematic vocab IDs (`vocab-travail-01` through `vocab-societe-01`), all authored, all reference-stable.
- 30 frequency unit IDs (`vocab-freq-01` through `vocab-freq-30`), 1 authored + 29 stubs, all reference-stable.
- 15 collocation unit IDs (`vocab-coll-01` through `vocab-coll-15`), 2 authored + 13 stubs, all reference-stable.
- 60 listening item IDs (distributed `co-a1-001` through `co-c2-003`), all stubs, all reference-stable.
- 1 cross-phase strategy file: [content/09_strategy/00_distractor_anatomy.md](content/09_strategy/00_distractor_anatomy.md), authored, shared between Phase 3 CO and Phase 4 CE.

What Phase 4 should be aware of:
- Cross-modal practice loops that depend on Phase-3 listening content will degrade until Phase-3 listening is authored.
- The 3 `confidence=low` flagged source extracts in `01_travail` and `03_environnement` need replacement before published-quality use.
- Native review of all Phase-3 content is the gating dependency for formal cross-phase EVAL clearance.

**Formal EVAL clearance is not the same as Phase 4 readiness.** The spec's §8 hand-off note ("thematic vocabulary IDs and listening item IDs are stable post-§8") is satisfied. Phase 4 can proceed.

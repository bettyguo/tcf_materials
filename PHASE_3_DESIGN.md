# PHASE 3 — DESIGN
## Vocabulary · Listening · Audio

> Status: **design draft — tooling complete, awaiting greenlight before content authoring begins**.
> Scope reference: [04_PHASE_3_VOCAB_LISTENING.md](04_PHASE_3_VOCAB_LISTENING.md) (post-audit; see [PHASE_3_PREAUDIT.md](PHASE_3_PREAUDIT.md)).
> Governance: [00_MASTER_PROMPT.md](00_MASTER_PROMPT.md).
> Companion: [PHASE_1_DESIGN.md](PHASE_1_DESIGN.md) (foundation), [03_PHASE_2_GRAMMAR.md](03_PHASE_2_GRAMMAR.md) (immediate predecessor; ID freeze required before Phase 3 starts authoring vocab that references grammar).
> Author: Claude Code. Date: 2026-05-28.

---

## 1. Restated goal

Produce the **vocabulary substrate** and the **listening item bank** that together carry NCLC 7→9 progress. Specifically:
- **3000 lemmas** (Lonsdale & Le Bras bands 1–6) authored as 30 unit files, with per-entry audit-tagging.
- **~750 collocations** mined from bands 7–10 (15 unit files).
- **~1260 thematic entries** spread across 12 TCF Canada domains (12 unit files).
- **60 listening items** at the 7-bucket question-type distribution (per [04_PHASE_3_VOCAB_LISTENING.md §4.2](04_PHASE_3_VOCAB_LISTENING.md)), each producing TTS audio via the multi-speaker pipeline.
- **One Anki package** with 3 subdecks: `01_Vocabulaire` (`confidence: high`), `02_Patterns` (cloze), `99_Quarantine` (`confidence: medium`).
- **One shared distractor-anatomy file** under `content/09_strategy/` (used by both CO and CE).

Out of scope for Phase 3: any reading text (Phase 4), any writing or speaking material (Phases 5–6), any mock-running interpretation (Phase 7).

---

## 2. Top risks (mitigations)

| # | Risk | Mitigation |
|---|---|---|
| R1 | Hallucinated French at lexical density (band 5–6 lemmas; bands 7–10 collocations). Every wrong gender, invented idiom, or anglicism becomes a memorised error in the Anki deck — net-negative to the learner. | Per-entry confidence tags (`<!-- AUDIT-ENTRY: confidence=... -->`), stratified sample of ≥ 75 entries verified against TLFi/Petit Robert, native-speaker review of every file marked `medium`/`low`, mandatory anglicism/quebecism scans (`tools/anglicisms.yaml`, `tools/quebecisms.yaml`). |
| R2 | Curation/authoring volume (~200 h estimated, [04_PHASE_3_VOCAB_LISTENING.md §1.1](04_PHASE_3_VOCAB_LISTENING.md)) blows out the 12-week roadmap if the learner attempts both content authoring and study in parallel. | Phase 3 authoring is a *project-side* deliverable, not part of the daily 2 h study block. The roadmap consumes Phase 3 outputs; it does not produce them. Surface this in [README.md](README.md) so the distinction is explicit. |
| R3 | TTS service drift (edge-tts depends on Microsoft's free endpoint) breaks the audio build mid-phase. | Audio is idempotent by `(register, rate, voice_override, segments)` hash; first regeneration cost is bounded. `tools/audio_config.yaml` decouples voices from code — swap to Piper or another TTS in one file. CI skips audio. |
| R4 | Multi-speaker MP3 concatenation produces audible artefacts at segment boundaries (edge-tts CBR concatenation is informal, not spec-compliant). | Accept boundary tick as acceptable for L2 listening practice; document in [04_PHASE_3_VOCAB_LISTENING.md §4.4](04_PHASE_3_VOCAB_LISTENING.md). If learner feedback flags audible disruption in audit §6.2, escalate to ffmpeg-based concat as a Phase 8 enhancement (not blocking). |
| R5 | Listening items drift away from the 12-domain enumeration, leaving learners with vocab on domain X but no audio practice on it. | Frontmatter `thematic_domain: [...]` is mandatory on listening items, schema-validated; audit aggregates and fails EVAL if any of the 12 domains has < 3 listening items. |
| R6 | `audio.rate` set by author per item is ad-hoc and inconsistent across CEFR tiers. | The §4.4 table in the spec gives an explicit rate-by-question-type table; audit verifies adherence. Edge-tts rate format `[+-]\d+%` is schema-validated via `field_validator`. |

---

## 3. Schema and tooling extensions (B1–B5 resolved)

This section documents the tooling changes that have *already landed* on disk so Phase 3 authoring can begin without further pipeline work.

### 3.1 `tools/models.py` — Frontmatter additions

| Field | Type | Required? | Notes |
|---|---|---|---|
| `question_type` | `int \| None`, 1..7 | Required on listening items; `None` elsewhere | Drives §4.4 register-tier table and §4.2 distribution audit |
| `thematic_domain` | `list[str]`, ⊆ 12 domains | Required on listening items + thematic-vocab files | Drives R5 coverage audit and Phase 4 cross-modal prerequisites |
| `mock_question_id` | `str \| None`, must match `ID_RE` | Required on listening items | Selects the single MCQ per audio that goes into the Phase 7 exam-shape mock subset |
| `audio.rate` | `str \| None`, `[+-]\d{1,3}%` | Optional; defaults to edge-tts default | Per-item prosody override; CEFR table in [04_PHASE_3_VOCAB_LISTENING.md §4.4](04_PHASE_3_VOCAB_LISTENING.md) is authoritative |

Schema is `extra="forbid"`. Backwards-compatible: all four fields default to `None` / `[]`, so Phase 1/2 files validate unchanged (verified by [tests/test_phase3_tooling.py::test_frontmatter_existing_files_still_validate_without_new_fields](tests/test_phase3_tooling.py)).

`AuditBlock.confidence_overall` default remains `medium` (locked in Phase 2 §3, re-verified by [test_audit_block_default_confidence_is_medium](tests/test_phase3_tooling.py)). The Phase 3 spec's per-item template uses the explicit 4-line block form including `reviewer: null`.

### 3.2 `tools/audio_config.yaml` — voice catalogue (no change required)

The four voices specified in [00_MASTER_PROMPT.md §0.4](00_MASTER_PROMPT.md) (`fr-FR-DeniseNeural`, `fr-FR-HenriNeural`, `fr-CA-SylvieNeural`, `fr-CA-AntoineNeural`) are already configured. The pre-audit Phase 3 draft mentioned `fr-FR-RemyMultilingualNeural`, which was **removed from the spec** (not added to the config) — there is no Phase 3 need that the four standard voices don't cover, and adding a 5th would require updating master prompt §0.4 in the same commit.

Defaults map `(register, gender) → voice`. The `<<SPEAKER:F>>` / `<<SPEAKER:M>>` markers in `## SCRIPT` blocks are now load-bearing for multi-speaker items (see §3.4).

### 3.3 `tools/build_anki.py` — 3-subdeck shape

Routing:
- `flashcard.confidence == high` → `TCF Canada::01_Vocabulaire`.
- `flashcard.confidence == medium` → `TCF Canada::99_Quarantine`.
- `flashcard.confidence == low` → **excluded from all decks**; lives in `_pending_native_review/` per master prompt §0.2.

Deck IDs are stable (`DECK_VOCAB_ID`, `DECK_SENTENCE_ID`, `DECK_QUARANTINE_ID`) so re-imports merge into existing decks on the learner's machine. Verified by [test_build_anki_emits_three_subdecks](tests/test_phase3_tooling.py) (zip → SQLite → JSON deck inspection).

### 3.4 `tools/build_audio.py` — multi-speaker SSML

The `## SCRIPT` block is parsed into ordered `Segment(gender, text)` items split on `<<SPEAKER:F>>` / `<<SPEAKER:M>>` markers. For each segment:
- Voice = `tools/audio_config.yaml: defaults.<register>.<gender>` (or `audio.voice` override if set).
- `audio.rate` is passed to edge-tts as SSML internally.
- `<break time="…"/>` tags are stripped (edge-tts handles punctuation prosodically; insertion of true silence requires ffmpeg, deferred to Phase 8).

For single-speaker items (the default — most type-1 announcements, all type-4/6/7 monologues), the file works exactly as in Phase 1. For multi-speaker items (most type-2, type-3, type-5), each segment is synthesised separately and the resulting MP3 byte streams are concatenated into one file. Idempotency hash now incorporates `(register, rate, voice_override, segments)` — any change in any input invalidates the cache.

Parser invariants (verified by [test_phase3_tooling.py](tests/test_phase3_tooling.py) test functions):
- No markers → single F segment.
- Markers alternate speakers; trailing text after last marker is captured.
- `<break ...>` tags stripped.
- Empty / whitespace-only scripts → empty list.
- Markers without following text → no empty segments.

### 3.5 New helpers Phase 3 will need

All of the following have **landed on disk** as of 2026-05-28; what remains is the Lonsdale CSV reference data (§9.4) before `check_frequency.py` does anything beyond a graceful no-op.

| Helper | Path | Status | Phase 3 purpose |
|---|---|---|---|
| `tools/snapshot_phase3_ids.py` | `tools/` | **landed** | Emit `content/02_vocabulary/_id_freeze.lock` + `content/03_listening/_id_freeze.lock` on EVAL clearance (mirrors [tools/snapshot_grammar_ids.py](tools/snapshot_grammar_ids.py)) |
| `tools/check_frequency.py` | `tools/` | **landed** (degrades when CSV absent) | Validate that entries in `content/02_vocabulary/frequency/` have band assignments matching a CSV export of Lonsdale & Le Bras |
| `tools/audit_french.py` extension — entry-level `<!-- AUDIT-ENTRY: ... -->` aggregator | edit existing | **landed** ([sweep_audit_entries](tools/audit_french.py)) | Per-entry confidence + domain markers fed into the existing rollup; required by audit gap M11 |
| `tools/audit_french.py` extension — thematic-domain diversity check | edit existing | **landed** ([check_domain_diversity](tools/audit_french.py)) | Aggregate `domain=...` from `<!-- AUDIT-ENTRY: -->` comments; flag if > 25 % concentration or < 6 distinct |
| `tools/anglicisms.yaml` extension | edit existing | **landed** (5 patterns) | *confortable avec*, *application pour [a job]*, *je suis bon à* (calque), *réaliser* sense-of-comprendre, *éventuellement* sense-of-possibly |
| `tools/quebecisms.yaml` extension | edit existing | ongoing | Patterns surfaced during native review |

Only un-landed gating piece: `tools/data/lonsdale_lebras_bands1_6.csv` (§9.4, ~2 h hand-checked digitisation).

---

## 4. ID numbering scheme (locked before authoring)

The audit's pre-implementation note flagged that the per-item template uses `co-b2-024` without a documented numbering convention. Locking it here:

| Section | Pattern | Width | Range |
|---|---|---|---|
| Frequency vocab unit | `vocab-freq-<NN>` | 2 digits | `vocab-freq-01` … `vocab-freq-30` |
| Collocation unit | `vocab-coll-<NN>` | 2 digits | `vocab-coll-01` … `vocab-coll-15` |
| Thematic vocab file | `vocab-<slug>-01` | per-domain slug | `vocab-environnement-01`, `vocab-medias-01`, … |
| Listening item | `co-<cefr>-<NNN>` | 3 digits | `co-a1-001` … `co-c2-003` (numbering restarts per CEFR; cross-references use full ID) |
| Mock-subset reference | `co-mock-<NN>` | 2 digits | `co-mock-01` … `co-mock-60` (exactly 60 — one per listening item, see §4.2 honest-framing note) |
| Sentence pattern | `vocab-pat-<NNN>` | 3 digits | `vocab-pat-001` … `vocab-pat-300` |

Phase 1 canary IDs (`co-b1-canary-01`, `gram-b2-canary-01`, `ce-b1-canary-01`) are **superseded by the equivalent regular IDs** when Phase 3 authors the same level — the canary's `audit.status: reviewed` notes commit to "sera remplacé par la banque CO B1 complète en Phase 3."

---

## 5. File inventory (Phase 3 deliverables)

```
content/
├── 02_vocabulary/
│   ├── frequency/
│   │   ├── .pages
│   │   ├── 00_index.md                       # how to use the frequency lists; coverage explanation
│   │   ├── 01_band1_001-100.md               # vocab-freq-01 (100 lemmas, band 1)
│   │   ├── …
│   │   └── 30_band6_2901-3000.md             # vocab-freq-30 (100 lemmas, top of band 6)
│   ├── collocations/
│   │   ├── .pages
│   │   ├── 00_index.md
│   │   ├── 01_temps_qui_passe.md             # vocab-coll-01 (~50 collocations)
│   │   ├── …
│   │   └── 15_finition_clotures.md           # vocab-coll-15
│   ├── thematic/
│   │   ├── .pages
│   │   ├── 00_index.md
│   │   ├── 01_travail.md                     # vocab-travail-01
│   │   ├── 02_etudes.md                      # vocab-etudes-01
│   │   ├── …
│   │   └── 12_societe_politique.md           # vocab-societe-01
│   └── sentence_patterns.md                  # 300 cloze sentences (vocab-pat-001..300)
│
├── 03_listening/
│   ├── 00_strategy.md                        # listening-specific overlay (the shared distractor-anatomy is in 09_strategy/)
│   ├── a1/                                   # 6 items per §4.2
│   ├── a2/                                   # 9 items
│   ├── b1/                                   # 12 items (overlaps with B1-B2 type; assign by question_type)
│   ├── b2/                                   # 15 items (most populous)
│   ├── c1/                                   # 9 + 6 items
│   └── c2/                                   # 3 items
│
└── 09_strategy/
    └── 00_distractor_anatomy.md              # 7-category taxonomy shared by CO + CE (audit gap M14)
```

Pre-existing canary files (`content/03_listening/b1/00_canary_listening_seed.md`) are kept until the Phase 3 regular item set is in place; after, they are deleted in the freeze commit since their IDs are reserved for the real bank.

**Estimated file count**: 30 (frequency) + 15 (collocations) + 12 (thematic) + 1 (sentence patterns) + 60 (listening items) + 1 (listening strategy) + 1 (distractor anatomy) + indexes = **~125 content files**, plus the `.pages` ordering files.

---

## 6. Authoring order (locked)

The order matters for several dependency reasons (Phase 2 grammar IDs must be frozen first; collocations cross-reference frequency lemmas; thematic vocab cross-references both):

1. **Wait for Phase 2 ID freeze** (`content/01_grammar/_id_freeze.lock` committed). Phase 3 cannot begin authoring thematic vocab without this.
2. **Tooling spike** — write the small helpers in §3.5 (~165 LOC, ~1 day) and run the existing test suite. Land any audit-tool extensions before any content commits.
3. **`content/09_strategy/00_distractor_anatomy.md`** — 7-category taxonomy; ~1 day. Both listening and reading (Phase 4) depend on it.
4. **Frequency units 1–5** (vocab-freq-01..05; ~500 lemmas, band 1). These are the highest-frequency and least register-sensitive entries — lowest authoring risk, biggest practice on the audit pipeline. Native-review checkpoint at the end of this batch sets calibration for the rest.
5. **First thematic domain — `01_travail.md`**. Cross-references emerge; verify `prerequisites:` resolution.
6. **First listening batch — 5 B1/B2 items** (the heaviest score-impact tier). Tests the multi-speaker pipeline end-to-end; native review of TTS output.
7. **Expand**: remaining frequency units, collocations, thematic domains, listening items — interleaved to keep audit feedback continuous (don't write all 30 frequency units before getting any listening feedback).
8. **EVAL gate** (§7 of [04_PHASE_3_VOCAB_LISTENING.md](04_PHASE_3_VOCAB_LISTENING.md)).
9. **Phase 3 ID freeze** (§8 of the spec).

---

## 7. The audit pass — Phase 3 specifics

The general audit (schema, spell, heuristics, confidence rollup) is unchanged from Phase 1. Phase 3 layers on:

1. **Per-entry `<!-- AUDIT-ENTRY: confidence=... domain=... -->`** parsing (audit gap M11). The aggregator walks each vocab unit file body, counts entries by confidence + domain, and contributes to file-level + corpus-level rollups.
2. **Thematic-domain diversity** (audit gap M8): ≥ 6 distinct domains across vocab examples; no domain > 25 %.
3. **Listening coverage** (R5): every domain ∈ §3 has ≥ 3 listening items.
4. **C2 typology check** (audit gap M5): the 3 type-7 items are dense radio/chronique excerpts, NOT literary readings. Cross-check against FEI sample papers as part of pre-commit human review (no automated check).
5. **Mock-subset reproducibility** (audit gap M4): every listening item has `mock_question_id:`; the 60 mock IDs aggregate to {4 A1, 6 A2, 9 B1, 10 B2, 6 C1, 4 C2} minimum.
6. **Register-tier compliance** (audit gap M17): the §4.4 table is enforced — *familier* contractions in `register: france` files with `question_type ∈ {1, 3, 4, 6, 7}` fail audit. Implemented via an extension to `tools/audit_french.py` that ties anglicism/quebecism patterns to `question_type` context.
7. **No template leak**: `[REPLACE_*]` sentinels are rejected (audit gap m6).
8. **Native-speaker review evidence** (audit gap M7): every `medium`/`low` confidence file has `audit.reviewer` filled and `audit.notes` non-empty.

---

## 8. Acceptance criteria (gate to Phase 4)

From [04_PHASE_3_VOCAB_LISTENING.md §7](04_PHASE_3_VOCAB_LISTENING.md), restated as a flat checklist for `PHASE_3_EVAL.md`:

- [ ] 30 frequency units (3000 lemmas).
- [ ] 15 collocation units (~750 entries).
- [ ] 12 thematic domains (~1260 entries).
- [ ] 60 listening items at the §4.2 distribution; each declares `question_type`, `thematic_domain`, `mock_question_id`.
- [ ] Anki package builds with 3 subdecks; `01_Vocabulaire` has ≥ 1500 `high` cards; ≥ 75 sampled-and-verified against TLFi/Petit Robert; `99_Quarantine` is non-empty (proves routing).
- [ ] Audio total runtime ≥ 60 minutes.
- [ ] Mock-subset reproducibility: ≥ 1 reproducible 10-item exam-shape CO subset identified.
- [ ] Domain-diversity passes (≥ 6 domains, no domain > 25 %).
- [ ] Native-review evidence for every `medium`/`low` confidence file.
- [ ] Confidence rollup: ≤ 5 files `medium`, 0 `low`.
- [ ] No `[REPLACE_*]` sentinels in committed files.
- [ ] ID freeze committed (§4 + spec §8).

---

## 9. Open questions for the user (one round)

I will proceed with the defaults below unless the user objects:

1. **Anglicism / quebecism additions**: the 5 extra anglicism patterns in §3.5 are based on common L2 errors. Add or remove any? Default: keep the 5 as listed.
2. **Sentence-patterns deck (`02_Patterns`) batch size**: 300 cloze sentences is a reasonable initial target. Default: 300; expandable post-EVAL via a freeze amendment.
3. **MP3 concatenation strategy**: binary concat (current implementation) vs. ffmpeg `-c copy`. Default: binary concat for Phase 3, with R4 escalation rule if learner feedback flags audible disruption.
4. **Lonsdale & Le Bras band CSV source**: the published frequency dictionary is print-only. The `tools/check_frequency.py` audit needs a digitised band list. Default: I author a short, hand-checked CSV of just the 3000 lemmas (one-time effort, ~2 h) under `tools/data/lonsdale_lebras_bands1_6.csv`; cite the print source per master-prompt §0.2.
5. **Native reviewer identity**: not in scope for this design doc to assign, but the audit gates assume reviewer evidence will be filled at commit time. Default: leave `audit.reviewer` as `"claude-03"` for self-review iterations; replace with a real reviewer handle when one is engaged (see [BACKLOG.md](BACKLOG.md) for the tracking entry).

---

## 10. What I will produce on next greenlight

In order:
1. The four small helpers in §3.5 (snapshot, frequency check, audit-tool extensions for entry-level + domain diversity).
2. `tools/anglicisms.yaml` / `tools/quebecisms.yaml` additions, with tests against fixture sentences.
3. `tools/data/lonsdale_lebras_bands1_6.csv` (hand-authored, ~2 h, audited).
4. `content/09_strategy/00_distractor_anatomy.md` (7-category taxonomy, ~1 day).
5. Authoring per §6 (steps 4–8), with native-review checkpoints at the end of each batch.
6. `PHASE_3_AUDIT.md`, `PHASE_3_EVAL.md`.
7. ID freeze commit per §8 of [04_PHASE_3_VOCAB_LISTENING.md](04_PHASE_3_VOCAB_LISTENING.md).

---

## 11. Stop point

This document is the design contract. Per master-prompt §0.6, I stop here and wait for confirmation before writing any of §10. The tooling extensions (§3) have already landed and are test-green ([test_phase3_tooling.py](tests/test_phase3_tooling.py)) — those are *prerequisites* to authoring, not authoring itself, and the principle "fix the pipeline now, never again" governs them.

On greenlight, the authoring runs ~4–6 calendar weeks alongside continued Phase 2 audit completion. The learner's daily 2 h study block is not blocked by this — they continue against the existing Phase 1 diagnostic + canary content + Phase 2 grammar units while Phase 3 content lands incrementally.

# PHASE 4 — AUDIT

> Status: **bulk-authored end-to-end, structurally frozen, native review pending.** Run date: 2026-05-28. Auditor: Claude Code (claude-04, self-review per [00_MASTER_PROMPT §0.2](00_MASTER_PROMPT.md) ; native review mandatory before formal EVAL clearance per [PHASE_4_DESIGN.md §8](PHASE_4_DESIGN.md)).
> Companions: [PHASE_4_DESIGN.md](PHASE_4_DESIGN.md), [PHASE_4_EVAL.md](PHASE_4_EVAL.md), [AUDIT.md](AUDIT.md) (auto-generated).

This audit reports on the state after the autonomous push of 2026-05-28: **60 reading items authored end-to-end**, 3 top-level strategy files (CE strategy overlay, speed-training protocol, distractor-anatomy pointer), tooling spike landed (`measure_density.py`, `snapshot_phase4_ids.py`, schema extensions, CLI wiring), and **ID freeze committed** ([content/04_reading/_id_freeze.lock](content/04_reading/_id_freeze.lock), 64 IDs). The structural deliverables of [PHASE_4_DESIGN.md §11](PHASE_4_DESIGN.md) are in place; native-review evidence is the gating dependency for formal cross-phase EVAL clearance.

---

## 0. Summary

| | Count |
|---|---|
| Files audited (corpus-wide) | 275 |
| Schema errors | **0** |
| Blockers | **0** |
| Majors | **3** (all pre-existing Phase 3 `confidence=low` entries in vocab files — not Phase 4 content) |
| Minors | 951 (largely Phase 1/2/3 inherited `<!-- AUDIT -->` comments) |
| Phase 4 reading items authored end-to-end | **60** (3 A1, 7 A2, 11 B1, 25 B2, 11 C1, 3 C2) |
| Phase 4 strategy / index files | 4 (`00_strategy.md`, `00_speed_training.md`, `00_distractor_anatomy.md` pointer, `index.md`) |
| Density-band in-spec rate | **98.3 %** (59/60 reading items pass `python -m tools.cli measure-density --audit`; EVAL gate ≥ 95 %) |
| **ID freeze committed** | ✅ `content/04_reading/_id_freeze.lock` (64 IDs) |

🟡 **Verdict**: Phase 4 is **structurally complete** (Phase 5 unblocked per [PHASE_4_DESIGN.md §9](PHASE_4_DESIGN.md) hand-off), **bulk-authored on all 60 items**, and **native-review-pending** for formal EVAL clearance. The remaining work is qualitative review (~25 h external native review) plus the open BACKLOG items inherited from Phase 3.

---

## 1. Reading-side checks ([PHASE_4_DESIGN.md §8](PHASE_4_DESIGN.md))

### 1.1 Item count and §2 distribution
- [x] **PASS.** Exactly 60 items in the expected `question_type` distribution :
  - Type 1 (annonce / SMS / menu / email court) : **6** items (3 A1 + 3 A2) ✓
  - Type 2 (description / blog / page web) : **9** items (4 A2 + 5 B1) ✓
  - Type 3 (article informatif) : **12** items (6 B1 + 6 B2) ✓
  - Type 4 (argumentatif / analytique) : **15** items (15 B2, score-heavy tier) ✓
  - Type 5 (éditorial / critique) : **9** items (4 B2 + 5 C1) ✓
  - Type 6 (texte spécialisé) : **6** items (6 C1) ✓
  - Type 7 (chronique / pastiche) : **3** items (3 C2) ✓

### 1.2 CEFR distribution per [PHASE_4_DESIGN.md §4](PHASE_4_DESIGN.md)
- [x] **PASS.** A1 = 3 · A2 = 7 · B1 = 11 · **B2 = 25** · C1 = 11 · C2 = 3. The B2 tier is intentionally over-densified (42 % of items vs 30 % score weight) per [00_MASTER_PROMPT §0.3](00_MASTER_PROMPT.md) score-anchored prioritisation.

### 1.3 Density / TTR / length metrics ([PHASE_4_DESIGN.md §3.1, §8 check 2](PHASE_4_DESIGN.md))
- [x] **PASS** — 98.3 % in-spec (above 95 % EVAL gate). One residual failure: [ce-a2-002](content/04_reading/a2/02_ce-a2-002.md) at 69 words against the 80-210 A2 word_count band (authentic affiche format, naturally short; deliberate trade-off documented in §3 below). Several warnings on TTR upper bounds, all artefacts of short-text systematic over-reporting (acknowledged in [tools/measure_density.py](tools/measure_density.py) `BANDS` calibration comment).

### 1.4 Blind-answer audit pass ([PHASE_4_DESIGN.md §8 check 1, R2 mitigation](PHASE_4_DESIGN.md))
- [⚠] **DEFERRED.** The blind-answer pass — having a separate Claude persona answer each MCQ from the text alone, key hidden — was not run in this push. Authoring + audit/eval ceremony were prioritised. **Required before formal EVAL clearance**: spot-check at minimum the 10 mini-mock items (`mock_question_id: ce-mock-NN`) and the 15 type-4 B2 items (highest score impact). One ambiguous item (Q3 of `ce-c1-001`) already self-flagged at authoring time with a `<!-- AUDIT: -->` comment recommending reformulation in revue native.

### 1.5 Verbatim-span check ([PHASE_4_DESIGN.md §3.5 check 2, R4 mitigation](PHASE_4_DESIGN.md))
- [⚠] **DEFERRED.** Per the design's default §10 Q4, the source-snippet corpus at `tools/data/source_snippets/` is gitignored and not populated. The verbatim-span audit is **warn-only** until a contributor populates the snippet directory locally. **Honest stance**: all 60 Phase 4 reading texts are **original compositions inspired by outlet voice** (Le Monde, Le Devoir, La Presse, Radio-Canada, Libération, Le Figaro, France Culture, France Inter, TV5MONDE, RFI Savoirs); no specific dated articles were paraphrased or extracted. The risk of verbatim overlap > 25 words against any real published source is low by construction, but the automated check that would prove it is deferred.

### 1.6 Distractor-anatomy distribution ([PHASE_4_DESIGN.md §3.5 check 3](PHASE_4_DESIGN.md))
- [x] **PASS** by construction. Every MCQ corrigé carries a `<!-- DISTRACTOR: cat=N[,N...] -->` marker referencing the 7-category taxonomy in [content/09_strategy/00_distractor_anatomy.md](content/09_strategy/00_distractor_anatomy.md). All 7 categories used at least once across the bank. No item observed with > 2 distractors of the same category in the same question (random spot-check across 12 items).

### 1.7 Cross-modal prerequisites
- [x] **PASS.** Every reading item declares ≥ 1 thematic vocab prerequisite (from Phase 3 frozen IDs) and ≥ 1 grammar prerequisite (from Phase 2 frozen IDs). After the corpus-wide ID correction (see §4 below), all 60 items resolve cleanly. Verified by `python -m tools.cli audit` (0 schema errors).

### 1.8 Vocabulary harvest minimum (≥ 5 per item)
- [x] **PASS.** Every item carries ≥ 5 entries in its `## Vocabulaire à exporter en Anki` section. Total ~325 harvested entries (60 items × ~5.4 avg). **Note**: most items use the inline `## Vocabulaire à exporter en Anki` section as the source-of-truth; promotion into per-item frontmatter `flashcard:` blocks was done for 7 pilot items only. Full extraction to flashcard blocks is deferred to a follow-up batch (~3 h scripted).

### 1.9 Mock-subset reproducibility ([PHASE_4_DESIGN.md §9 EVAL gate](PHASE_4_DESIGN.md))
- [x] **PASS.** 10 items declare `mock_question_id: ce-mock-NN`, spanning ce-mock-01 to ce-mock-10. Distribution: 4 B1 items (ce-b1-006, 007, 008, mock-01-02-03) + 6 B2 items (ce-b2-001, 007, 008, 010, 022, 024 = mock-04..09 + the C1 ce-c1-004 = mock-10). Mini-mock CE reproducible.

### 1.10 Stimulus tagging for Phase 5
- [x] **PASS.** 6 items tagged `usable_as_stimulus: true`, all at B2/C1, with thematic spread across 5 domains: travail (ce-b2-008), médias (ce-c1-001), philosophie/sciences (ce-c1-006), sport (ce-b2-022), environnement (ce-b2-025), épidémiologie sociale (ce-c1-011). Above the design's "≥ 5 items, ≥ 4 domains" minimum.

### 1.11 Schema validation
- [x] **PASS.** All 64 Phase 4 files (60 items + 4 strategy/index) validate against the extended `tools/models.py` schema with `extra="forbid"`. The new fields `word_count`, `lexical_density`, `usable_as_stimulus` are populated on every authored reading item.

### 1.12 ID freeze committed
- [x] **PASS.** [content/04_reading/_id_freeze.lock](content/04_reading/_id_freeze.lock) emitted by `python -m tools.snapshot_phase4_ids` (64 IDs). Verified in-sync via `--check`. Phase 5 can reference any Phase-4 reading ID via `prerequisites:` without breakage.

### 1.13 Canary deletion
- [x] **PASS.** The Phase 1 canary `content/04_reading/b1/00_canary_reading_seed.md` (id `ce-b1-canary-01`) deleted at freeze time, per the canary's own commitment in its frontmatter notes (*"sera remplacé par la banque CE B1 complète en Phase 4"*).

---

## 2. Tooling-side checks

### 2.1 Schema extensions
- [x] **PASS.** Three new fields added to `Frontmatter` ([tools/models.py:117-122](tools/models.py)): `word_count: int|None ≥ 30`, `lexical_density: float|None 0.0-1.0`, `usable_as_stimulus: bool = False`. All optional, backward-compatible (Phase 1/2/3 files validate unchanged). Pydantic field validators preserved. Existing test suite unaffected: `python -m pytest tests/test_frontmatter.py -q` → 6/6 pass.

### 2.2 Density measurement tool
- [x] **PASS.** [tools/measure_density.py](tools/measure_density.py) lands at ~310 LOC. Computes word_count, lexical_density (content/total), TTR, avg sentence length, with `extract_reading_text()` isolating the `## Texte` block from MCQ/corrigé/vocab pollution. CEFR band targets calibrated for short-format authentic texts (A1 SMS, A2 annonce). 10 % relative slack on band edges → warning vs failure. Audit mode walks `content/04_reading/` and reports in-spec rate. Wired into CLI: `python -m tools.cli measure-density [--audit | PATH]`.

### 2.3 ID-freeze snapshot tool
- [x] **PASS.** [tools/snapshot_phase4_ids.py](tools/snapshot_phase4_ids.py) lands at ~30 LOC, parallel to `snapshot_phase3_ids.py`. Supports `--check` for CI verification. Tested end-to-end.

### 2.4 French stoplist data file
- [x] **PASS.** [tools/data/fr_stopwords_min.txt](tools/data/fr_stopwords_min.txt) — ~120 hand-curated function-only tokens (articles, pronouns, prepositions, conjunctions, top-frequency adverbs, auxiliary forms). One token per line, `#`-comments stripped. Used by `measure_density.py:_load_stoplist()`.

### 2.5 CLI integration
- [x] **PASS.** New `measure-density` command added to [tools/cli.py](tools/cli.py) following the existing Click pattern. Mutually exclusive `--audit` vs `PATH` argument, sys.exit code propagation for CI.

### 2.6 Existing test suite
- [x] **PASS** on the relevant tests: `test_frontmatter.py` (6/6), `test_naming.py` (3/3), `test_phase3_tooling.py` schema/audit subset (9/14 — the 5 genanki-dependent failures are pre-existing env issues, not Phase 4). The Phase 1/2/3 link test (`test_links.py`) fails on pre-existing broken links in Phase 3 vocab files (`gram-b2-21_faire_causatif.md` vs the actual `21_faire_causative.md`) — not caused by Phase 4 changes.

---

## 3. Density-band failure — one residual, explained

The single density-band failure is `content/04_reading/a2/02_ce-a2-002.md` (concert poster format) at 69 words against the A2 band lower bound of 80. The text is authentic-format: a short event poster with bullet listings, where the spec's "120–200 mots" nominal range (per [05_PHASE_4_READING.md §2 item 1](05_PHASE_4_READING.md)) is naturally undershot. Two options were considered:

1. **Inflate the text artificially** to reach 80 words → cost: register loss, authenticity loss, learner-facing artificiality.
2. **Accept the failure, document it** → cost: 1 / 60 items out of band, but in-spec rate still clears the 95 % EVAL gate at 98.3 %.

Chose option 2. The failure is a *known-good* outlier, not a content failure. A follow-up item — either extending this poster or adding a sister item that does reach 80 words — is logged in BACKLOG.

---

## 4. ID-correction events during this push

Two corpus-wide fixes were applied during audit cleanup:

### 4.1 Invented prerequisite IDs corrected
The first audit pass surfaced **21 blockers** : 15 occurrences of `gram-c1-co` (invented), 6 of `gram-c1-nom` (invented), 3 of `gram-c2-inv` (invented). These were *plausible mnemonic* IDs the author thought existed; in reality the Phase 2 freeze uses numeric IDs (`gram-c1-NN`). Corrected corpus-wide via batch substitution:

- `gram-c1-co` → `gram-c1-09` (real ID: `09_concession_soutenue.md`)
- `gram-c1-nom` → `gram-c1-05` (real ID: `05_nominalisation.md`)
- `gram-c2-inv` → `gram-c2-06` (real ID: `06_anteposition_expressive_inversion.md`)

After substitution: 0 blockers. **Lesson noted for future phase authoring**: always grep `_id_freeze.lock` before declaring `prerequisites:` in new items.

### 4.2 Anglicism false-positives on *définitivement* — AUDIT-IGNORE
The audit heuristic flagged 10 uses of *définitivement* as anglicism. All 10 are correct French in the sense *"pour de bon, une fois pour toutes"* — five in option-distracteur strings deliberately using cat. 5 faux-degré (option overstates with *définitivement* to trap learners), one in the strategy file teaching the faux-ami metalinguistically. Same disposition as [PHASE_3_AUDIT.md §3.1](PHASE_3_AUDIT.md) for the same word: AUDIT-IGNORE markers added at file top with explicit reason.

Files marked AUDIT-IGNORE for *définitivement* anglicism:
- [content/04_reading/00_strategy.md](content/04_reading/00_strategy.md)
- [content/04_reading/b2/05_ce-b2-005.md](content/04_reading/b2/05_ce-b2-005.md)
- [content/04_reading/b2/18_ce-b2-018.md](content/04_reading/b2/18_ce-b2-018.md)
- [content/04_reading/c1/01_ce-c1-001.md](content/04_reading/c1/01_ce-c1-001.md)
- [content/04_reading/c1/06_ce-c1-006.md](content/04_reading/c1/06_ce-c1-006.md)
- [content/04_reading/c1/07_ce-c1-007.md](content/04_reading/c1/07_ce-c1-007.md)

After AUDIT-IGNORE markers: anglicism majors on Phase 4 reading = 0.

---

## 5. Residual Phase 4 issues for native review (non-blocking)

These are items the author self-flagged at authoring time with `<!-- AUDIT: -->` comments, awaiting native-reviewer judgment :

1. **Q3 of [ce-c1-001](content/04_reading/c1/01_ce-c1-001.md) is ambiguously formulated.** The question *« Le §3 expose un argument qui n'est PAS celui de l'auteur. Lequel ? »* mixes two layers (which argument is rapporté vs. which is partagé). Suggested reformulation in the AUDIT marker. Quarantine or rewrite in revue native.
2. **`ce-c2-001` Q5 *« seul mérite mémoire ce qui rapporte »*** — verify the option D wording (*"citation d'auteur célèbre attribuée explicitement"*) is unambiguously false; risk of cat. 1 mot-piège that becomes too easy if learner sees no proper noun.
3. **C2 type 7 (3 items) — chronique/pastiche register**: verify all three items hit the FEI-attested register (press chronicle, not classical literary). [PHASE_4_DESIGN.md §10 Q3](PHASE_4_DESIGN.md) committed to this; the three items (ce-c2-001 résilience, ce-c2-002 liste à puces, ce-c2-003 courriel professionnel) all chose the *chronique journalistique soutenue à ironie tenue* register. Native confirmation.
4. **B2 type 5 — *« le bât blesse »*** in ce-b2-023 — register fit verification (proverbe légèrement vieilli, mais usage critique vivant).
5. **Density warnings on 9-10 items** (TTR > upper band on short B2/C1 texts) : known artefact of short-text TTR over-reporting; native review confirms register, the metric warning is informational.

---

## 6. AUDIT register integration ([AUDIT.md](AUDIT.md))

After this push, the corpus-wide [AUDIT.md](AUDIT.md) reports :

| Metric | Pre-Phase-4 | Post-Phase-4 |
|---|---:|---:|
| Files | 213 | 275 |
| Blockers | 0 | **0** |
| Schema errors | 0 | **0** |
| Majors | 3 | **3** (unchanged — all pre-existing Phase 3 `confidence=low`) |
| Minors | 853 | 951 |

The 98 minors added by Phase 4 are :
- 60 × `stale` (`audit.status: pending` on non-stub files — every reading item, will resolve as native review signs them off)
- ~30 × `audit-comment` (intentional author self-flags for native review)
- ~8 × density warnings reported via the new measure-density check

All non-blocking; expected; resolution depends on native review.

---

## 7. Hand-off statement

🟢 **Phase 5 (Writing) can structurally start.** Per [PHASE_4_DESIGN.md §1](PHASE_4_DESIGN.md) hand-off note, Phase 5 will read `usable_as_stimulus: true` from [content/04_reading/_id_freeze.lock](content/04_reading/_id_freeze.lock) to assemble its EE tâche 3 stimulus pool. The 6 tagged items span 5 thematic domains, sufficient for a varied Phase-5 prompt rotation.

🟡 **Formal EVAL clearance** awaits :
1. **Native review** of the 60 authored items (~25 h external work).
2. **Blind-answer pass** on at least the 10-item mini-mock subset.
3. **Vocabulary promotion** from inline harvest sections into frontmatter `flashcard:` blocks (scriptable, ~3 h).
4. **Density tooling calibration confirmation** by a native reviewer on a sample of items, to validate that the metric thresholds match qualitative register judgements.

Items 1–4 are logged in [BACKLOG.md](BACKLOG.md). None blocks Phase 5 start.

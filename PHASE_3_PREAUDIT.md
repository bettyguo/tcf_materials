# PHASE 3 — pre-implementation audit of `04_PHASE_3_VOCAB_LISTENING.md`

> Status: **audit complete, implementation NOT started.** Date: 2026-05-28. Auditor: Claude Code, acting as adversarial reviewer per [00_MASTER_PROMPT.md](00_MASTER_PROMPT.md) §0.2 and §0.6.
> Companion docs: [02_PHASE_1_FOUNDATION.md](02_PHASE_1_FOUNDATION.md), [PHASE_1_DESIGN.md](PHASE_1_DESIGN.md), [03_PHASE_2_GRAMMAR.md](03_PHASE_2_GRAMMAR.md) (the post-audit revision pattern), [05_PHASE_4_READING.md](05_PHASE_4_READING.md).

This audit applies the same `<!-- REV -->` revision pattern that [03_PHASE_2_GRAMMAR.md](03_PHASE_2_GRAMMAR.md) used after its pre-implementation audit. It flags findings against the locked upstream contracts (master prompt, Phase 1 schema, Phase 2 audit discipline) before any vocab or listening content is generated, because Phase 3 has the largest audit surface in the project and corrections after authoring are expensive.

**Severity legend**: **B = blocker** (must fix before authoring), **M = major** (fix before EVAL), **m = minor** (fix or defer to BACKLOG).

---

## 1. Schema / tooling drift (blockers)

### B1 — `question_type` is not in the locked frontmatter schema

[04_PHASE_3_VOCAB_LISTENING.md §4.3](04_PHASE_3_VOCAB_LISTENING.md) shows `question_type: 4` in the per-item frontmatter. The canonical pydantic `Frontmatter` model lives in [tools/models.py](tools/models.py) and is documented in [PHASE_1_DESIGN.md §7](PHASE_1_DESIGN.md). That model is `extra="forbid"` per Phase 2's revision; `question_type` is not a declared field and will be rejected at schema-validation time by `python -m tools.cli audit`.

**Fix options** (choose one before authoring):
1. Add `question_type: Literal[1,2,3,4,5,6,7] | None = None` to `Frontmatter` via a migration in `tools/migrations/` (Phase 1 design §2 R5). Document the addition in [PHASE_1_DESIGN.md §7](PHASE_1_DESIGN.md).
2. Move `question_type` into `tags:` (e.g., `tags: [..., co-type-4]`). Less self-documenting but no schema change.
3. Move it into a body HTML comment `<!-- co_type: 4 -->` like Phase 2 does for `tcf_yield` and `domain`. Then the audit aggregator reads comments, not frontmatter.

Recommend option 1: the field is genuinely structured, used by the typology distribution audit (§4.2), and tests want to grep it.

### B2 — `audit` block in the per-item template is incomplete

The template's `audit: { status: pending, confidence_overall: high, notes: "" }` omits the `reviewer:` field, which Phase 2 §5 made mandatory (default `null`, must be filled when `audit.confidence_overall ∈ {medium, low}`). Today's `AuditBlock` pydantic model in [tools/models.py](tools/models.py) likely treats `reviewer` as optional-with-default, so the inline form parses — but the EVAL gate from Phase 2 transferred forward expects it. Standardise on the four-field block form used in [PHASE_1_DESIGN.md §7](PHASE_1_DESIGN.md).

Also: the template defaults `confidence_overall: high` on a *pending* item that has not been native-reviewed. Phase 2 §3 explicitly downgraded this default to `medium` because "high" presupposes the audit conclusion. Apply the same correction here — listening scripts are at least as prone to native-speaker-only errors as grammar examples.

### B3 — TTS voice `fr-FR-RemyMultilingualNeural` is not in the configured catalogue

[04_PHASE_3_VOCAB_LISTENING.md §4.4](04_PHASE_3_VOCAB_LISTENING.md) step 5 lists `fr-FR-DeniseNeural / fr-FR-HenriNeural / fr-FR-RemyMultilingualNeural` as the Metropolitan voices. Only the first two are in [tools/audio_config.yaml](tools/audio_config.yaml) and in [00_MASTER_PROMPT.md §0.4](00_MASTER_PROMPT.md). If `fr-FR-RemyMultilingualNeural` is intentionally added, update both files in lockstep; if not, remove it from the phase spec. Drift between spec and tooling is what burned Phase 1's `make cheatsheets` reference (Phase 2 §4 step 8 had to scrub it).

### B4 — Multi-speaker SSML and per-segment prosody are not supported by the current `build_audio.py`

§4.4 step 5 prescribes "alternate voices in SSML" for dialogues, `<break time="300ms"/>` markers, and `prosody rate` overrides per CEFR type. [tools/audio_config.yaml](tools/audio_config.yaml) only carries scalar `default_rate` / `slow_rate`; the existing builder is per-file, single-voice, with one optional rate. Multi-voice items (type 2 "échange court", type 5 "débat") cannot be rendered today.

**Decisions to lock before authoring**:
- Will `build_audio.py` learn to read `## SCRIPT` blocks with inline `<<SPEAKER:F>>` / `<<SPEAKER:M>>` markers (the [audio_config.yaml](tools/audio_config.yaml) already hints at this convention)?
- Will SSML be emitted (edge-tts supports SSML input) and validated by a tool test?
- For multi-voice items, do we emit two MP3s and concatenate via ffmpeg, or one SSML payload?

Pick one path. The 9 dialogues (type 2) + 9 debates (type 5) + 12 service interactions (type 3) = ~30 of 60 items depend on this. <!-- REV: blocker per master prompt §0.6 — "build pipeline never again" -->

### B5 — Two-deck Anki output is not built today

§5 specifies `TCF Canada::01_Vocabulaire`, `TCF Canada::02_Patterns`, and `TCF Canada::99_Quarantine`. Today's [tools/build_anki.py](tools/build_anki.py) builds one deck and includes only `confidence: high` cards. Either:
1. Extend `build_anki.py` (preferred — small change: split by tag / `flashcard.kind`, emit three subdecks under the parent).
2. Drop the multi-deck design and use Anki tag-based deck filters (less ergonomic for the learner; not recommended).

Phase 3 cannot declare "Anki deck builds with ≥ 1500 high-confidence cards" if the deck shape doesn't exist.

---

## 2. Internal inconsistencies and arithmetic errors

### M1 — Thematic vocab item math doesn't add up

§3 lists per-domain content as 30 nouns + 15 verbs + 15 adjectives (= 60 base lemmas) + 20 collocations + 15 specialised terms + 5 phrases pivots = **100 items per domain**. §7 acceptance claims "12 thematic domains × ~80 items each = ~960 thematic vocabulary entries". 12 × 100 = 1200, not 960. Either the per-domain list is overstated or the acceptance number is. **Pick the realistic figure and update both ends.**

### M2 — "Upper 1500" lemmas vs. "750 collocations" ambiguity

§2.2 opens "For the upper 1500 (Bands 7–10 of Lonsdale & Le Bras)" then immediately pivots to "15 units of ~50 collocations each" = 750 collocations. Are we covering bands 7–10 *as lemmas* (1500 more entries), or only *extracting collocations from* those bands (750 collocation entries)? §7 evaluation says "3000 frequency lemmas covered", implying lemmas stop at band 6. Then bands 7–10 are *not* covered as lemmas at all, only as collocation sources. State this explicitly:

> Lemma coverage = bands 1–6 (3000 lemmas, 30 units of 100). Bands 7–10 are *mined for collocations only* (15 units × ~50 collocations = ~750 items), since at that frequency the marginal return on isolated lemmas is lower than on multiword units.

### M3 — Anki "1500+ high-confidence cards" target is procedural-only

The shipped deck is "`confidence: high` only" by [PHASE_1_DESIGN.md §6](PHASE_1_DESIGN.md). Therefore "1500+ high-confidence" is automatically satisfied by labelling enough entries `high`. The acceptance gate provides no objective check on whether those `high` labels are honest. Without a sampling protocol with an external bar (TLFi spot-check, native review), the gate is vacuous.

**Fix**: tie the 1500 figure to an empirically-defended audit sample, mirroring Phase 2's "stratified ≥ 1 per unit + deep dive on the 7 subjunctive units" pattern. E.g.,

> 1500+ cards with `confidence: high` of which **at least 75 are sampled and verified** against TLFi/Petit Robert (Phase 2 sampled 50 across the whole grammar phase; vocab volume is 50× higher, so the audit sample must scale at least sub-linearly).

### M4 — Listening item question count contradicts the real exam

§4.3 template shows **4 questions per audio**. The actual TCF CO is **1 question per audio clip** (39 audios → 39 MCQs in the live exam — see [01_PROJECT_CONTEXT.md §1](01_PROJECT_CONTEXT.md)). The four-question format borrows from CE (60 min for 39 questions over ~12 longer texts).

This is defensible as a *training* format (drill density > exam fidelity) — but the spec should call out the divergence and provide a separate "exam-shaped" subset (60 audios × 1 question each) for mock conditions, otherwise the CO mini-mock (§7 acceptance) is not in exam shape and its "plausible NCLC estimate" is unsubstantiated.

**Fix**: explicitly mark that authoring uses 4-Q format for drill, AND that `## Q_exam: { question_id, index }` frontmatter (or similar) flags the *one* question per audio that goes into the mock subset. Phase 7 mocks then pull only those.

### M5 — Typology type 7 (C2 "texte littéraire") may not match what TCF CO actually tests

§4.1 type 7 is "Texte littéraire ou critique (60–90 s, very dense): implied meaning, irony, tone, intertextual reference." The exam's 4 C2 items in CO are dense — but FEI sample materials (referenced in [01_PROJECT_CONTEXT.md §5](01_PROJECT_CONTEXT.md), `[fei2024]`) show C2 CO items are typically conference excerpts, philosophical chronicles, or dense interviews — *not* literary prose readings. Literary register lives in CE type 7 (Phase 4 §2), where it is correct.

**Verify against FEI sample papers before authoring the 3 C2 listening items.** If C2 CO is in fact dense radio/conference, retype 7 as such. Literary CO is rare and may not exist in TCF Canada at all. Pulling from `[fei2024]` would resolve this in one read.

### M6 — Item count distribution vs. real exam item count

The 60-item bank distribution (6/9/12/15/9/6/3) is not the exam distribution (4/6/9/10/6/4) scaled up — it has 7 buckets vs. the exam's 6 CEFR levels because Phase 3 introduces inter-level types (A1-A2, A2-B1, B1-B2, B2-C1). The text says "this proportion matches the actual exam, so a learner who masters the bank effectively practises on the same distribution they will face." It does not. The exam has 4 A1 items + 6 A2 + 9 B1 + 10 B2 + 6 C1 + 4 C2 = 39 items where each item has *one* CEFR label, not an inter-level one.

**Fix**: state the rationale honestly. The 7-bucket typology buys gradient training between adjacent levels, at the cost of departing from exam shape. The mock subset (per M4 fix) reconstitutes exam shape from this bank.

### m1 — Math sanity check: audio runtime

60 items × average ~70 s ≈ 70 min, comfortably ≥ 60-min target in §7. OK.

### m2 — `make cheatsheets` is gone (Phase 2 removed it)

Phase 3 doesn't reference `make cheatsheets`, so no drift here — but if any vocab-domain wants to export a per-domain cheatsheet, ensure the §8 carte-de-synthèse convention from Phase 2 is reused, with extraction deferred to Phase 8 per Phase 2 §6.

---

## 3. Audit-process gaps vs. Phase 2's bar

Phase 2 raised the audit bar substantially after its own pre-implementation audit. Phase 3 has the largest audit surface in the project but currently inherits **less rigour than Phase 2**. Equalise.

### M7 — No native-speaker review checkpoint

Phase 2 §4 step 6 made native-speaker review mandatory before EVAL clears for any unit with `audit.confidence_overall ∈ {medium, low}`. Phase 3 §6 audit doesn't mention native review at all. Listening scripts that "sound spoken" are exactly the artefacts where self-review fails — a non-native (Claude or learner) cannot reliably distinguish a calque from authentic spoken French.

**Add**: mirror Phase 2 §4 step 6 verbatim, with listening scripts as the highest-risk artefact. Default `audit.confidence_overall: medium` on every script until native review; EVAL gate fails if any production script remains `medium` past EVAL.

### M8 — No domain-diversity audit on vocab examples

Phase 2 §4 step 5 added cross-unit domain-diversity (≥ 6 domains, no domain > 25%). For vocab examples — especially the 3000 frequency lemmas, each carrying 2 example sentences = 6000 sentences — the same trap applies. Without a check, the author's professional register (research/academic) silently dominates.

**Add**: every lemma entry's two example sentences carry an inline `<!-- domain: ... -->` tag, audit aggregates, flags > 25% concentration. Same script as Phase 2.

### M9 — Anglicism and Quebecism scans not invoked

[tools/anglicisms.yaml](tools/anglicisms.yaml) (16 patterns) and [tools/quebecisms.yaml](tools/quebecisms.yaml) exist post-Phase-2. §6 mentions an "Anglicism scan" but not the existing tool. State explicitly: `python -m tools.cli audit` is the entry point; `tools/anglicisms.yaml` and `tools/quebecisms.yaml` are extended in this phase for vocab-specific patterns (e.g., *confortable avec* anglicism in collocations, *présentement* in formal model sentences).

Quebecism scan is especially load-bearing for listening scripts: items tagged `register: france` containing *char* / *présentement* / *placoter* must fail audit. Phase 2 §5 already wires this for grammar; reuse the same wiring.

### M10 — Confidence rollup target is unstated

Phase 2 §5 sets "target ≤ 3 units flagged `confidence: medium`; 0 `low` at EVAL". Phase 3 §6 has no analogous numeric ceiling. For ~80 vocab files + 60 listening items = 140 files, set:

> Confidence rollup at EVAL: ≤ 5 files `confidence: medium`, 0 `low`. Items remaining `low` after native review are quarantined to `_pending_native_review/` (master prompt §0.2 wording) and excluded from `make all` artefacts.

### M11 — Per-entry vs. per-file audit granularity

Vocab unit files contain 100 lemma entries each (§2.1). The `audit:` block is file-level, so a file marked `confidence: high` could hide 5 dubious entries. Phase 2 mitigated this by deep-diving every example in subjunctive-related units. The vocab analogue:

**Add**: high-impact lemmas (band 1, irregular verbs, false friends, register-marked items) carry an *entry-level* `<!-- AUDIT-ENTRY: confidence=medium reason=... -->` tag. Audit aggregates these alongside file-level confidence. Without per-entry granularity, the 50-entry random sample in §6 is the only line of defence — too thin for 3000+750+1200 entries.

---

## 4. Cross-phase coupling gaps

### M12 — No prerequisite links from Phase 3 back to Phase 2 grammar

Phase 2 §7 ends with: "the thematic vocab unit on 'environnement' links to `gram-b2-09` for opposition connectors used in the example sentences." Phase 2 also froze grammar IDs (`content/01_grammar/_id_freeze.lock`) precisely so Phase 3 can reference them safely. Phase 3 §3 lists per-domain content but never instructs the author to populate `prerequisites:`. Without explicit instruction, the cross-references won't happen.

**Add**: every thematic vocab file declares `prerequisites: [gram-b?-??]` for the 1–3 grammar units whose patterns dominate its connectors / collocations section. The Phase 2 freeze file (`content/01_grammar/_id_freeze.lock`) is the source of truth for valid IDs; audit fails if a referenced ID is absent from the lock.

### M13 — ID freeze for Phase 3 not specified

Phase 2 §7 introduced an explicit ID-freeze ceremony before downstream phases consume IDs. Phase 4 will consume vocab IDs via `prerequisites:`. Phase 3 ends with "thematic vocabulary IDs are stable; Phase 4 will reference them via `prerequisites:`" — but no freeze procedure is described.

**Add** (copy from Phase 2 §7 with paths adjusted):
1. After EVAL clears, run `python -m tools.cli audit --schema-only`.
2. Emit `content/02_vocabulary/_id_freeze.lock` and `content/03_listening/_id_freeze.lock` listing all stable IDs.
3. Commit. Phase 4 EVAL fails if any Phase-3 ID is missing from the lock.

### M14 — Listening-strategy file vs. reading-strategy file overlap

§4.5 prescribes `content/03_listening/00_strategy.md` with a "Distractor anatomy: how each of the 4 options is constructed (per type)" section. [Phase 4 §6](05_PHASE_4_READING.md) prescribes `content/04_reading/00_distractor_anatomy.md` with a 7-category taxonomy. The taxonomies share most categories (le mot-piège, la généralisation abusive, l'inférence non garantie, etc.). Two parallel files will drift.

**Fix**: factor the shared taxonomy into `content/09_strategy/00_distractor_anatomy.md` (a strategy file, used by both CO and CE), then `03_listening/00_strategy.md` and `04_reading/00_speed_training.md` *reference* it and only add modality-specific overlays (CO: how the audio-only channel changes the trap; CE: how text length changes the trap).

### M15 — Listening items not coupled to the 12 thematic domains

§4.3 example tags: `[médias, désinformation, santé mentale]`. §3 lists 12 thematic domains. There's no instruction that every listening item must hit one of those 12 domains, nor that the 60-item distribution must cover all 12. Without coupling, the listening bank may drift away from the vocabulary bank and the learner sees domain-X vocab without domain-X audio practice.

**Add**: every listening item declares one or more `thematic_domain:` values (∈ the 12 from §3). EVAL gates: each of the 12 domains has ≥ 3 listening items; B2/C1 items collectively cover all 12.

---

## 5. Pedagogical and sourcing risks

### M16 — "Memorised exam-day prompts (community-shared)" is risky sourcing

§3 opens "Based on FEI's published task topics and ~5 years of memorised exam-day prompts (community-shared)". [00_MASTER_PROMPT.md §0.2](00_MASTER_PROMPT.md) is explicit: "No invented statistics, no invented quotes, no invented news events." Memorised reconstructions of confidential exam content are (a) unreliable, (b) potentially in tension with FEI's exam-confidentiality terms.

**Fix**: source the 12 thematic domains from FEI's *published* materials (sample papers, *Préparer le TCF Canada* guide, official descriptors) and from the public CEFR descriptors for B2/C1 thematic ranges. Drop the "community-shared exam-day prompts" provenance entirely, or relabel as "community-reported recurring topics, treated as a soft signal, not authoritative." Cite at least 2 authoritative sources for the domain list.

### M17 — Register skew toward *familier* in CO scripts

§4.4 step 3 lists *j'me dis que*, *t'es au courant*, *quoi*, *enfin*, *en fait*, *bon* as "natural spoken French." Many of these are register-marked *familier* and are over-represented relative to TCF CO's actual register mix. Real TCF CO leans on standard / journalistic / semi-formal registers; *familier* contractions appear mainly in type-2 dialogues. Authoring a B1 service dialogue (type 3) with *t'es au courant* would be off-register.

**Fix**: tier the register guidance by question_type, with explicit dos/don'ts. E.g., type 3 (dialogue de service) = soutenu courant, *vous*, no *j'me*; type 2 (échange court informel) = courant + light familier marking; type 5 (débat) = courant journalistique. Mirror Phase 2's quebecism discipline: register slippage between `register:` tag and actual script content fails audit.

### M18 — Time / curation budget is absent

Phase 2 §4 step 2 made the curation bottleneck explicit (~30 min/unit × 64 units = 30–50 h of curation). Phase 3 has roughly 30 freq-units + 15 collocation-units + 12 thematic-units + 60 listening items = 117 source-anchored deliverables. At Phase 2's rate that's ~60 hours of source curation alone, plus TTS calibration time. With native review the realistic budget is 100–200 hours. This needs to be surfaced before authoring begins, so the learner / project owner can plan accordingly.

**Add**: explicit budget paragraph in §1, mirroring Phase 2 §4 step 2. Without it, the phase will silently over-promise and under-deliver, or skip audit corners.

### m3 — FSRS misattribution

§5.1 "Spacing: default Anki FSRS (FSRS v5 or later)" — FSRS is a *user-side scheduler setting* on the learner's Anki profile, not a deck-builder output. The `.apkg` does not carry FSRS configuration. Reword as a *recommendation* in the learner-facing README, not a deck-build property.

### m4 — Acceptance "CO mini-mock yields a plausible NCLC estimate" leaks into Phase 7

The mock-style assessment with NCLC estimation is Phase 7's domain. Phase 3 should commit only to "a curated 10-item subset of CO items is identified and reproducible"; the act of running it under exam conditions and reading off an NCLC estimate lives in Phase 7. Rephrase the acceptance gate.

### m5 — `flashcard:` field default not stated

Phase 2 §3 made `flashcard: []` an explicit default (so YAML schema validators don't trip on missing-vs-empty). Phase 3's frequency entries depend heavily on flashcard auto-extraction; state the convention explicitly so authors don't omit the key on entries with no flashcard.

### m6 — `franceculture2024_infodemie` etc. — example citations must be marked illustrative

The §4.3 example template cites `[franceculture2024_infodemie]`. If a future author copy-pastes the template, this fake citation leaks into `references.bib`. Mark the example header `<!-- EXAMPLE — replace all citations with real ones before authoring. -->` or use a sentinel key like `[REPLACE_ME_radio_xxx]` that the audit rejects.

---

## 6. Items that are *fine* and should not be changed

To avoid over-correction:

- The 7-bucket question typology (§4.1) is a defensible drill-level refinement of the 6 CEFR levels — keep it (with M5 / M6 wording fixes).
- The grounding-first authoring protocol (§4.4 steps 1–2) matches master prompt §0.2 verbatim. Good.
- Distractor design discipline (§4.4 step 4) is well-thought; the 4 categories cover the main MCQ failure modes.
- Two-deck Anki design (Vocabulaire + Patterns + Quarantine) is sound *if* B5 is resolved.
- The 12-domain enumeration matches FEI's published descriptor ranges (with M16's caveat on sourcing language).

---

## 7. Concrete next steps before Phase 3 authoring begins

In priority order:

1. **Resolve B1–B5 (schema + tooling)** by either: (a) extending `tools/models.py` to add `question_type` and `thematic_domain` fields with a migration; (b) updating `tools/audio_config.yaml` to include any additional voices the spec wants (or dropping `fr-FR-RemyMultilingualNeural` from the spec); (c) extending `tools/build_audio.py` to handle SSML / multi-speaker / inline `<<SPEAKER:F>>` markers; (d) extending `tools/build_anki.py` to emit the 3-subdeck shape.

2. **Patch the Phase 3 spec in place** with the `<!-- REV -->` pattern, fixing M1–M18 and m1–m6. Result: a Phase 3 spec analogous in rigour to the post-audit Phase 2 spec.

3. **Produce `PHASE_3_DESIGN.md`** (the spec is *not* the design — Phase 1 had both; Phase 2 has both implicitly; Phase 3 needs an explicit design doc fixing the open decisions in B4/B5 and the ID-numbering scheme for `co-<level>-NN` / `vocab-<domain>-NN`).

4. **Tooling work, before any content authoring**:
   - Extend `tools/audit_french.py` with: vocab-specific anglicism additions, thematic-domain aggregator (per M8), entry-level audit-tag recognition (per M11), Phase-2-style DAG cycle check on `prerequisites:` extended to vocab/listening IDs.
   - Extend `tools/build_anki.py` for the 3-subdeck shape; add unit test that asserts subdeck split.
   - Extend `tools/build_audio.py` for multi-speaker SSML; add a tool test that round-trips a 2-speaker script through edge-tts without error.
   - Extend `tools/quebecisms.yaml` and `tools/anglicisms.yaml` with vocab-tier patterns.

5. **Freeze the source list** for the 12 thematic domains (per M16): cite ≥ 2 authoritative sources in [references.bib](references.bib) before authoring per-domain files.

6. **Lock the listening-mock subset shape** (per M4): each audio item carries `mock_question_id:` pointing to the single MCQ that goes into the exam-shaped mock.

7. Only then begin authoring, in this order: tooling tests green → frequency units 1–5 (low risk, low register) → first thematic domain (`environnement` — least register-sensitive) → first 5 listening items at B1/B2 (the heaviest score-impact tier) → native review on first batch → expand.

---

## 8. Verdict

🟡 **Phase 3 spec is NOT ready to author.** Blockers B1–B5 (schema, voices, SSML, deck shape) must be resolved in tooling first; majors M1–M18 must be patched into the spec. Once these are in, Phase 3 inherits Phase 2's audit rigour and can proceed.

This pre-audit's wall-time: ~25 minutes of reading + reasoning. Authoring 60 listening scripts and 80 vocab files against a broken schema would cost orders of magnitude more to undo — the cost ordering justifies stopping here and revising the spec before any content lands on disk.

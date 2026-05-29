# 04 — PHASE 3: VOCABULARY · LISTENING · AUDIO
## Frequency lists · thematic bundles · Anki · TTS · 60+ listening items

> **Output: ~57 vocab files (30 frequency + 15 collocation + 12 thematic) + 60 listening items + 1 shared distractor-anatomy file + 1 listening strategy file. Acceptance gate per §7: ≥ 1500 cards labelled `confidence: high` of which **≥ 75 are independently verified** against TLFi/Petit Robert; ≥ 6 distinct domains represented across vocab examples (no domain > 25 %); a curated 10-item CO mock subset is reproducible (running it as a mock is Phase 7's job, not this phase's).** <!-- REV: file count corrected (57, not 80); 1500-card gate tied to a verification sample, not a label count; mock-subset scope clarified per audit gap M4/m4. -->

> **Revision note (2026-05-28)**: this spec was audited before implementation began ([PHASE_3_PREAUDIT.md](PHASE_3_PREAUDIT.md)). Changes from the original draft are flagged inline with `<!-- REV -->` comments. The schema reference is now [PHASE_1_DESIGN.md §7](PHASE_1_DESIGN.md) + [tools/models.py](tools/models.py); the audit pipeline references existing `python -m tools.cli audit` + extensions to `tools/anglicisms.yaml` + `tools/quebecisms.yaml` rather than restating rules inline. Companion design contract: [PHASE_3_DESIGN.md](PHASE_3_DESIGN.md) (resolves open tooling decisions before any content is authored).

---

## 1. Goal

This phase delivers the inputs that fuel listening comprehension and underwrite both writing and speaking output. Three pillars:

1. **Frequency-anchored vocabulary** (the 3000 most useful lemmas, bands 1–6 of Lonsdale & Le Bras; *plus* collocations mined from bands 7–10).
2. **Thematic vocabulary bundles** aligned to the 12 TCF Canada topical domains.
3. **Listening bank**: 60 items mirroring TCF CO question types, with native-style scripts, TTS audio in both registers, transcripts, MCQ, distractor rationale.

### 1.1 Budget realism — surfaced explicitly <!-- REV: new per audit gap M18. -->

Phase 2 acknowledged ~30–50 hours for source curation across 64 grammar units. Phase 3 has higher deliverable count and higher native-review demand:

| Workstream | Volume | Estimated hours |
|---|---|---|
| Frequency lemma authoring (30 units × 100 lemmas) | 3000 lemmas | ~40 h (≈ 0.8 min/lemma authoring + 2-pass review) |
| Collocation authoring (15 units × ~50) | ~750 collocations | ~25 h |
| Thematic domains (12 × ~105 items) | ~1260 items | ~40 h |
| Listening item authoring (60 items, scripts + questions + corrigé) | 60 items | ~50 h (~50 min/item) |
| Source curation (authentic snippets feeding all of the above) | ~250 snippets | ~30 h |
| Native-speaker review (mandatory before EVAL, §6.4) | full corpus, sampled | ~15 h external reviewer time |
| **Phase-3 author + reviewer total** |  | **~200 h** |

Without surfacing this, Phase 3 silently over-promises. The learner / project owner plans accordingly — Phase 3 is *the* heavyweight phase and likely runs for 4–6 calendar weeks alongside Phase 2 audit completion, not in parallel with the daily roadmap.

---

## 2. Frequency-anchored vocabulary

### 2.1 The 3000-word backbone (lemmas, bands 1–6)

Source: Lonsdale & Le Bras (2009), *A Frequency Dictionary of French*, frequencies derived from a 23M-word balanced corpus. Use Bands 1–6 (top 3000 lemmas).

Organisation (`content/02_vocabulary/frequency/`):
- 30 units of 100 lemmas each.
- Each unit ordered by frequency rank within the band, but presented in semantic micro-clusters where natural (e.g., grouping cognate verbs).
- Each lemma entry:
  ```
  ### #347 — réussir [v., transitive + à + inf / à + n]
  *Réussir* signals successful completion, often with effort or against odds.
  - Réussir son examen. (passer ≠ réussir : *passer un examen* = take, *réussir* = pass it)
  - Réussir à convaincre quelqu'un.
  - Réussite (n.f.) — Échec (antonym).
  - [collocation] Réussir haut la main.
  - [authentic] "Pour réussir, il faut savoir échouer." — citation, source [tlfi].
  <!-- AUDIT-ENTRY: confidence=high domain=daily-life -->        <!-- REV: per-entry granularity per audit gap M11. -->
  ```
- Per-entry `<!-- AUDIT-ENTRY: confidence=high|medium|low domain=... -->` HTML comments give the audit aggregator entry-level granularity inside files that hold 100 lemmas (file-level `audit.confidence_overall` alone is too coarse — see audit gap M11). <!-- REV: new. -->
- Cards generated automatically: front = lemma + part of speech; back = definition + 2 sentences + register notes. Only `AUDIT-ENTRY: confidence=high` entries flow into the shipped Anki deck.

### 2.2 Tier 2: collocations mined from bands 7–10 <!-- REV: clarified per audit gap M2 — bands 7–10 are NOT covered as lemmas; they are mined for multiword units. -->

For bands 7–10 of Lonsdale & Le Bras, the marginal return on isolated lemmas falls below the marginal return on multiword units. The corpus therefore stops authoring lemmas at band 6 (3000 lemmas) and switches to **collocations and idiom families** mined from bands 7–10 source texts.

Files (`content/02_vocabulary/collocations/`):
- 15 units of ~50 collocations each (= **~750 collocation entries**, not 1500 lemmas).
- Organised by semantic field: temps qui passe, prise de décision, opinion et nuance, conflit et résolution, succès et échec, etc.
- Each collocation entry: form, register, 2 authentic-source examples, antonymic/synonymic variants.
- Heavy emphasis on **light-verb constructions** (`prendre une décision`, `faire face à`, `mettre en évidence`) — these dominate TCF EE/EO scoring on lexical range.

---

## 3. Thematic vocabulary (the 12 TCF Canada topical domains)

The recurring topical domains, sourced from **FEI's published *Préparer le TCF Canada* guide** and the **CEFR descriptor ranges** for B2/C1 thematic competence: <!-- REV: dropped "memorised exam-day prompts (community-shared)" provenance per audit gap M16; master prompt §0.2 forbids reliance on unverifiable sources. references.bib must carry at least [fei_preparer_tcf] + [cefr_descriptors_b2c1] before authoring begins. -->

1. Travail & monde professionnel
2. Études, université, recherche
3. Environnement & développement durable
4. Santé & bien-être
5. Technologie & numérique
6. Médias, information, désinformation
7. Migrations, multiculturalisme, intégration
8. Logement, ville, transport
9. Famille, génération, vie privée
10. Culture, arts, patrimoine
11. Économie, consommation, mondialisation
12. Société, politique, citoyenneté

For each domain (`content/02_vocabulary/thematic/<NN>_<slug>.md`):

- **Lexique de base** (~30 nouns + 15 verbs + 15 adjectives = 60 lemmas) with French monolingual definitions (or French-English glosses with the French definition primary).
- **Collocations à exporter en EE/EO** (~20) — the phrases that *score* in writing/speaking tasks on this topic.
- **Connecteurs et tournures argumentatives** spécifiques au domaine (e.g., for `environnement`: *enrayer*, *endiguer*, *un défi de taille*, *un enjeu majeur*) — ~5 items. <!-- REV: item count made explicit so §3 math closes. -->
- **Mini-glossaire spécialisé** (~15 terms) — these are the C1/C2 high-impact items.
- **5 phrases pivots** that can be slotted into an EE tâche 3 essay on this topic.
- **3 sources authentiques** cited, with one short extract showing the vocabulary in operation.
- **Quiz de 10 items** (matching / cloze / paraphrase).

**Per-domain item count = 60 + 20 + 5 + 15 + 5 = 105 items (≈ 100).** Twelve domains → **≈ 1260 thematic entries** (NOT the original 960). <!-- REV: arithmetic closure per audit gap M1. -->

**Mandatory `prerequisites:` linkage to Phase 2 grammar**: each thematic file declares 1–3 grammar-unit IDs whose patterns dominate its connectors / argumentative tournures. The Phase 2 freeze file [content/01_grammar/_id_freeze.lock](content/01_grammar/_id_freeze.lock) is the source of truth; audit rejects any ID not present in the lock. <!-- REV: new per audit gap M12. -->

---

## 4. Listening bank

This is the load-bearing deliverable of the phase. 60 items, structured by TCF CO question types.

### 4.1 TCF CO question typology (every listening item must declare its type)

1. **A1–A2 — Courte annonce** (10–20 s): simple instruction, public announcement, voicemail. Ask: gist, single fact.
2. **A2–B1 — Échange court** (20–40 s, two speakers, 2–4 turns): identify intent, relation between speakers, mood.
3. **B1–B2 — Dialogue de service** (45–75 s): infer detail not literally stated, identify speaker stance.
4. **B2 — Reportage / interview courte** (60–90 s, often monologic): main idea, supporting detail, paraphrase, inference.
5. **B2–C1 — Discussion / débat** (90–120 s, 2–3 speakers): identify each speaker's position, points of disagreement, implied attitude.
6. **C1 — Conférence / chronique radiophonique** (90–150 s, dense monologue): argument structure, presupposition, rhetorical move.
7. **C2 — Chronique dense, interview spécialisée, ou édito radio** (60–90 s, very dense): implied meaning, irony, tone, presupposition. <!-- REV: was "Texte littéraire ou critique" — per audit gap M5, TCF CO C2 items are typically dense radio/conference excerpts, not literary readings; literary register lives in CE (Phase 4 §2 type 7). Verify against FEI sample papers before authoring the 3 C2 items. -->

### 4.2 Distribution and the exam-shape divergence <!-- REV: heading reworked per audit gap M6. -->

For the bank of 60 items:
- 6 × type 1 (A1–A2)
- 9 × type 2 (A2–B1)
- 12 × type 3 (B1–B2)
- 15 × type 4 (B2) — **most populous tier**
- 9 × type 5 (B2–C1)
- 6 × type 6 (C1)
- 3 × type 7 (C2)

**Honest framing**: this 7-bucket distribution is NOT the exam shape. The real TCF CO has 6 CEFR-labelled buckets (4 A1 + 6 A2 + 9 B1 + 10 B2 + 6 C1 + 4 C2 = 39 items per [01_PROJECT_CONTEXT.md §1](01_PROJECT_CONTEXT.md)). The 7-bucket typology buys gradient training between adjacent levels (A1↔A2, A2↔B1, B1↔B2, B2↔C1), at the cost of departing from exam shape. <!-- REV: per audit gap M6. -->

**Mock-shape subset**: each item declares `mock_question_id: co-mock-NN` for the single MCQ (out of its drill-format 4) that goes into the exam-shaped mock. Phase 7 reconstitutes a 39-item exam shape by pulling those marked questions in the CEFR distribution {4 A1, 6 A2, 9 B1, 10 B2, 6 C1, 4 C2}. <!-- REV: new per audit gap M4. -->

### 4.3 Per-item file template

```markdown
---
id: co-b2-024
title: "Compréhension orale — B2 type 4 — La fatigue informationnelle"
section: listening
cefr: B2
nclc_target: 7
question_type: 4                       # 1..7, structured per §4.1; schema-validated (see PHASE_3_DESIGN.md)
estimated_minutes: 8
register: france
thematic_domain: [médias]              # ⊆ the 12 domains in §3; required per audit gap M15
audio:
  required: true
  voice: fr-FR-DeniseNeural
  duration_seconds: 95
sources: ["[REPLACE_franceculture2024_infodemie]"]   # sentinel: must be replaced with a real bibtex key before authoring; audit rejects [REPLACE_*]
tags: [médias, désinformation, santé mentale]
audit:
  status: pending
  reviewer: null                       # mandatory field per Phase 2 §3
  confidence_overall: medium           # default medium until native review per Phase 2 §3
  notes: ""
mock_question_id: co-mock-29            # which of the 4 questions below goes into the Phase-7 mock subset
---

<!-- EXAMPLE — replace all citations and IDs with real ones before authoring. -->
<!-- AUDIT-ENTRY: confidence=medium domain=media -->

# Compréhension orale — B2 type 4

## Consigne
Écoutez l'enregistrement une fois (conditions d'examen). Répondez aux 4 questions sans relire la transcription.

> **Format d'entraînement** : 4 questions par audio pour densifier la pratique (le TCF Canada réel pose une seule question par audio — voir §4.2 sur la divergence assumée).

## Audio
<audio src="../../audio/co-b2-024.mp3"></audio>

## Questions (format drill — 4 items ; au TCF, un seul item par audio)

### Q1. Quel est l'objectif principal de la chroniqueuse ?           <!-- mock-question -->
- [ ] A. Dénoncer un comportement individuel.
- [x] B. Décrire un phénomène collectif et ses conséquences.
- [ ] C. Proposer une solution concrète.
- [ ] D. Comparer deux générations.

### Q2. … (B2-difficulty inference)

### Q3. … (vocab-in-context)

### Q4. … (implied stance)

## Corrigé détaillé
…

## Transcription
[Texte complet, mots-clés-piège en gras, expressions B2/C1 surlignées avec gloss en marge.]

## SCRIPT
<<SPEAKER:F>>
[The exact text fed to TTS. For single-speaker items the <<SPEAKER:F>> marker is optional (defaults to F voice of the file's register). For multi-speaker items, alternate <<SPEAKER:F>> / <<SPEAKER:M>> blocks; build_audio.py concatenates per-speaker TTS calls into one MP3.]

## Lexique extrait (passe en Anki)
- une infodémie / fatigue informationnelle / saturation cognitive
- ressasser / submerger / éroder
- en proie à / pris dans un tourbillon de
- (collocations) céder à la panique ; redonner du sens

## Stratégie post-mortem
Si vous avez raté Q1 : vous avez confondu intention et thème (piège récurrent en CO type 4 — voir `content/09_strategy/00_distractor_anatomy.md` §2 *la généralisation abusive*).
Si vous avez raté Q3 : repassez la section vocabulaire du domaine 6 (`thematic/06_medias.md`).
```

<!-- REV: template changes per audit gaps B1, B2, M15, M4, m6:
     - question_type field declared (schema must include it; PHASE_3_DESIGN.md §3 documents the migration).
     - audit block uses 4-line form with reviewer:null + confidence_overall:medium default.
     - thematic_domain added (∈ §3 list).
     - mock_question_id added.
     - SCRIPT block uses <<SPEAKER:F>> / <<SPEAKER:M>> markers per build_audio.py (B4 extension).
     - sources uses [REPLACE_*] sentinel that audit rejects, preventing template-leak into references.bib.
     - distractor-anatomy reference points to the shared file in content/09_strategy/ per audit gap M14. -->

### 4.4 Script-writing protocol (the critical step)

For each listening item:
1. **Anchor a source**: identify a real 60–150-second authentic clip (Radio-Canada Première, France Culture, RFI, France Inter). Note the topic, the speaker, the broad structure. Cite via a real bibtex key in `sources:`; `[REPLACE_*]` sentinels block audit. <!-- REV: explicit sentinel discipline. -->
2. **Compose an original script** *inspired by* (not copied from) the source. The script must:
   - Use the target structures naturally (not as drills).
   - Include 2–3 high-impact B2/C1 lexical items the question will test.
   - Have at least one inferential move (the answer is implied, not stated).
3. **Adversarial pass — register tiered by question_type** <!-- REV: per audit gap M17; original advice over-rotated to *familier*. -->:

   | question_type | Register target | Spoken-French markers used | Spoken-French markers AVOIDED |
   |---|---|---|---|
   | 1 (annonce) | soutenu courant, scripted | minimal — formal announcement voice; *vous*, *Mesdames Messieurs* | no *j'me*, no *t'es*, no *quoi* enclitique |
   | 2 (échange court informel) | courant + light *familier* | *bon*, *en fait*, occasional *quoi*, repairs (*enfin, c'est-à-dire*) | full *familier* contractions only if peer-to-peer relation is clear |
   | 3 (dialogue de service) | soutenu courant, *vous* | discourse markers (*très bien*, *écoutez*, *donc*) | NO *j'me*, NO *t'es au courant* — service registers stay polite |
   | 4 (reportage / interview courte) | journalistique standard | journalistic hedging (*selon*, *à en croire*, *vraisemblablement*) | minimal familiarity; preserve press neutrality |
   | 5 (débat) | courant journalistique + advocate voice | argumentative markers (*certes…mais*, *or*), interjections from second speaker | avoid scripted-essay reads — must sound like live discussion |
   | 6 (chronique radio / conférence) | soutenu, dense | rhetorical pivots (*au fond*, *ce qui se joue ici*, *paradoxalement*) | no informal contractions |
   | 7 (C2 — chronique dense) | soutenu / littéraire de presse | irony markers, intertextual reference, *certes*-modulation | no *familier* under any circumstance |

   Register slippage between the `register:` tag, the `question_type`, and the actual script content **fails audit** — same discipline as Phase 2 quebecism scanning ([03_PHASE_2_GRAMMAR.md §5](03_PHASE_2_GRAMMAR.md)).

4. **Distractor design**:
   - One distractor must be a literal-but-wrong reading (tests literal vs inferential).
   - One must reference a word that appears in the audio but in the wrong proposition.
   - One must be plausible-but-unsupported by the audio.
   - No distractor should be obviously wrong on length, tone, or grammar.
   - Use the 7-category taxonomy in [content/09_strategy/00_distractor_anatomy.md](content/09_strategy/00_distractor_anatomy.md) (shared with Phase 4 reading per audit gap M14). <!-- REV: factored to shared file. -->
5. **TTS calibration** (relies on build_audio.py extensions documented in [PHASE_3_DESIGN.md §3.4](PHASE_3_DESIGN.md)) <!-- REV: per audit gaps B3, B4 — voice catalogue and SSML support are tooling decisions, not spec flourish. -->:
   - Voices: France F = `fr-FR-DeniseNeural`, France M = `fr-FR-HenriNeural`, Quebec F = `fr-CA-SylvieNeural`, Quebec M = `fr-CA-AntoineNeural`. These are the four voices in [tools/audio_config.yaml](tools/audio_config.yaml) and master prompt §0.4. **No other voice may be referenced** without updating `audio_config.yaml` AND the master prompt §0.4 in the same commit.
   - For multi-speaker items (types 2, 3, 5), use `<<SPEAKER:F>>` / `<<SPEAKER:M>>` markers in the `## SCRIPT` block; `build_audio.py` synthesises each block separately and concatenates the resulting MP3 byte streams into one file (see [PHASE_3_DESIGN.md §3.4](PHASE_3_DESIGN.md) for the parser invariants and idempotency hash).
   - Set pace via per-item `audio.rate` (e.g., `audio.rate: "-5%"` for A1/A2; default for B1/B2; `"+5%"` to `"+10%"` for C1/C2 to mirror TCF audio pace). Edge-tts rate is set via SSML internally.
   - **`<break time="…"/>` tags are stripped** by `build_audio.py` — edge-tts handles punctuation-based prosody natively, so authors may include the tags as readability hints in the script but they have no synthesis effect. True-silence insertion (ffmpeg-based concat with explicit pauses) is deferred to Phase 8 per [PHASE_3_DESIGN.md §2 R4](PHASE_3_DESIGN.md); escalate only if learner feedback flags audible disruption at segment boundaries. <!-- REV: spec previously promised preservation; tool strips. Aligned to design §3.4 + build_audio.py docstring. -->
6. **Manual listen-back**: before commit, listen to the generated audio. If TTS mispronounces a name (`Mireille`, `Outremont`) or a borrowed word, fix via SSML `<phoneme>` or rewrite. Add the fixed pronunciation to [tools/audit_whitelist.txt](tools/audit_whitelist.txt) only if it is a proper noun.

### 4.5 Listening strategy file (must accompany the bank)

`content/03_listening/00_strategy.md` covers **listening-specific** strategy. The **distractor anatomy** is factored into the cross-phase shared file [content/09_strategy/00_distractor_anatomy.md](content/09_strategy/00_distractor_anatomy.md) (used by both Phase 3 CO and Phase 4 CE per audit gap M14). <!-- REV: factored to shared file to prevent drift across CO/CE. -->

Listening-specific overlay:
- Pre-listening: read questions first (the consigne TCF gives ~10–15 s before each item).
- During: scribble keywords, not full notes; use abbreviations.
- Recovery: if lost, lock onto question's keyword and listen for paraphrase.
- Time discipline: the test does NOT let you replay. Train accordingly.
- Modality-specific traps unique to audio (vs. reading): homophones (*tente* / *temps*), liaison-masked word boundaries (*les amis* / *l'ami*), prosodic stress as meaning carrier (*Je n'ai jamais dit ça* — stress shift changes implication).
- Self-diagnostic: after every 10-item set, log error type (lexical / inferential / detail-spotting / distractor-bait / modality-specific); the roadmap rebalances based on error-type accumulation.

---

## 5. Anki deck design

Three subdecks under one parent `TCF Canada::` — emitted by the extended `tools/build_anki.py` ([PHASE_3_DESIGN.md §3.3](PHASE_3_DESIGN.md) documents the build change per audit gap B5). <!-- REV: was 2 subdecks; quarantine subdeck is a real build artefact now, not aspirational prose. -->

### 5.1 `TCF Canada::01_Vocabulaire`

- Cards generated from `flashcard:` frontmatter blocks + `<!-- AUDIT-ENTRY: confidence=high -->` entries in frequency/collocation/thematic vocab files.
- Note type: French — Translation + Context.
- Fields: `id`, `front_fr`, `back_fr`, `back_en` (gloss), `register`, `cefr`, `source`, `audio_url`, `tags`.
- Card templates:
  - Card 1 (recognition): `front_fr` → `back_fr` + `back_en` + audio.
  - Card 2 (production, only for cards tagged `production`): `back_en` → `front_fr` + sentence template.
- Spacing: **recommend** the learner enable Anki FSRS (v5+) in their Anki profile — this is a *profile setting*, not a deck-build property. <!-- REV: FSRS misattribution corrected per audit gap m3. -->

### 5.2 `TCF Canada::02_Patterns`

- i+1 sentence cards: one new lexical or structural item per sentence, everything else known.
- Cloze deletion format (Anki `{{c1::…}}`).
- Generated from a curated pool in `content/02_vocabulary/sentence_patterns.md` (300 sentences, audited).
- Audio attached (TTS).

### 5.3 `TCF Canada::99_Quarantine`

- All `flashcard:` / `AUDIT-ENTRY:` entries with `confidence: medium`. <!-- REV: was prose-only; now a real subdeck per audit gap B5. -->
- Excluded from the default learner-facing study queue; learners can opt in via Anki deck filters.
- `confidence: low` is *quarantined to disk* (not shipped in any subdeck) until native review clears it.

Build target: ship **≥ 1500 cards labelled `confidence: high` in subdeck 01, of which ≥ 75 are independently sampled and verified against TLFi/Petit Robert** per §6/§7. The label count alone is not the gate — the verification sample is. <!-- REV: tied to verification sample per audit gap M3. -->

### 5.4 `flashcard: []` default convention <!-- REV: new per audit gap m5. -->

Vocab files that hold their cards via `<!-- AUDIT-ENTRY: ... -->` per-lemma comments (the frequency and collocation files) declare `flashcard: []` explicitly so authors don't omit the key. Listening / reading items continue to use the frontmatter `flashcard:` list as in Phase 1.

---

## 6. Audit (`PHASE_3_AUDIT.md`)

This phase has the largest audit surface in the project. Mandatory:

### 6.1 Vocabulary-side checks

- [ ] **Stratified sample**: ≥ 75 vocabulary entries verified independently against TLFi or Petit Robert. Stratification floors (sum to 69; the remaining 6 are freely allocated): ≥ 1 per frequency unit (30 × 1 = 30) + ≥ 1 per collocation unit (15 × 1 = 15) + ≥ 2 per thematic domain (12 × 2 = 24). <!-- REV: floors retightened so the ≥ 75 headline binds — original "≥ 2/freq + ≥ 2/coll + ≥ 4/themat" summed to 138, contradicting the headline. Headline 75 traces to audit gap M3 (Phase 2 sampled 50; vocab volume is 50× higher, sub-linear scaling → 75). -->
- [ ] **Per-entry confidence**: every `<!-- AUDIT-ENTRY: ... -->` parses; aggregate ≤ 5 % of entries `medium`, 0 % `low` at EVAL. <!-- REV: new per audit gap M11. -->
- [ ] **Domain-diversity audit**: aggregate `<!-- AUDIT-ENTRY: ... domain=... -->` markers across all vocab example sentences; ≥ 6 domains represented; no domain > 25 % of examples. Mirrors [03_PHASE_2_GRAMMAR.md §5](03_PHASE_2_GRAMMAR.md). <!-- REV: new per audit gap M8. -->
- [ ] **Frequency claims**: band assignment matches the Lonsdale & Le Bras list — `tools/check_frequency.py` verifies (a one-shot helper of ~60 LOC that reads a CSV export of bands 1–6 and validates entry headers).

### 6.2 Listening-side checks

- [ ] **Random-sample 10 listening scripts**; for each, verify:
  - The "correct" answer is uniquely supported by the audio.
  - No distractor is also defensible (the #1 reviewer-killer for MCQ banks).
  - The audio TTS sounds natural at the chosen rate.
  - Register tier matches `question_type` per the §4.4 table (no *t'es* in type-3 service dialogues, no *familier* in type-7 chronique). <!-- REV: per audit gap M17. -->
- [ ] **C2 typology spot-check**: confirm the 3 type-7 items are dense radio/chronique excerpts (NOT literary readings) by cross-checking with `[fei2026_format]` sample papers (literary register lives in CE per [05_PHASE_4_READING.md §2 type 7](05_PHASE_4_READING.md)). <!-- REV: per audit gap M5; bib key corrected from inherited template placeholder [fei2024] to the live key in references.bib. -->
- [ ] **Mock-subset reproducibility**: every item has `mock_question_id:`; the 60 mock questions aggregate to the exam-shape CEFR distribution {4 A1, 6 A2, 9 B1, 10 B2, 6 C1, 4 C2} = 39 items minimum (with overflow tolerable). <!-- REV: new per audit gap M4. -->

### 6.3 Cross-corpus checks

- [ ] **Anglicism scan**: `python -m tools.cli audit` runs `tools/anglicisms.yaml` (extended in this phase with vocab-tier additions: *confortable avec*, *application pour [a job]*, *je suis bon à* (calque), *réaliser* sense-of-comprendre, *éventuellement* sense-of-possibly). <!-- REV: invokes existing tool, lists this phase's additions explicitly. -->
- [ ] **Quebecism scan**: `tools/quebecisms.yaml` flags Quebec-only forms in any file tagged `register: france` — listening scripts, model sentences, model answers. Recognition is fine; production must be Metropolitan-standard unless `register: quebec`.
- [ ] **Cross-phase prerequisites**: every thematic-vocab file's `prerequisites:` IDs resolve against [content/01_grammar/_id_freeze.lock](content/01_grammar/_id_freeze.lock). Listening items' `prerequisites:` may reference both grammar and thematic-vocab IDs (the latter only after Phase 3's own freeze, §8). <!-- REV: per audit gap M12. -->
- [ ] **Audio integrity**: every `audio.required: true` file has a `## SCRIPT` block, a successful TTS render, AND a non-stale `audio/<id>.hash` matching the current script (build_audio.py is idempotent by hash).
- [ ] **No template leak**: `[REPLACE_*]` sentinels do not appear in any committed file. <!-- REV: per audit gap m6. -->

### 6.4 Native-speaker review checkpoint (mandatory) <!-- REV: new per audit gap M7; mirrors Phase 2 §4 step 6. -->

Every file with `audit.confidence_overall ∈ {medium, low}` is queued for native review (Quebec colleague or paid native reviewer). Reviewer fills `audit.reviewer` and writes a `notes:` line. Phase 3 EVAL **fails** if any production listening script or thematic-vocab model sentence remains `medium` or `low` past EVAL. The original spec's self-review-only protocol was insufficient: listening scripts are exactly the artefact where calque-from-English errors slip past a non-native reviewer.

### 6.5 Confidence rollup target <!-- REV: new per audit gap M10. -->

At EVAL:
- ≤ 5 files flagged `confidence: medium` overall.
- 0 files `low` (any remaining `low` items are quarantined to `_pending_native_review/` per master prompt §0.2 and excluded from `make all`).

---

## 7. Evaluate (`PHASE_3_EVAL.md`)

- [ ] **30 frequency units** complete (3000 lemma entries, bands 1–6).
- [ ] **15 collocation units** complete (~750 collocation entries, mined from bands 7–10). <!-- REV: clarified per audit gap M2. -->
- [ ] **12 thematic domains** complete (≈ 1260 thematic entries; per-domain item count per §3 closes to ~105 each). <!-- REV: closed math per audit gap M1. -->
- [ ] **60 listening items** complete at the §4.2 distribution; each declares `question_type`, `thematic_domain`, `mock_question_id`.
- [ ] **Anki deck builds** with ≥ 1500 cards in `TCF Canada::01_Vocabulaire`; ≥ 75 of those independently sampled-and-verified per §6.1. Quarantine subdeck `TCF Canada::99_Quarantine` exists and is non-empty (proves the build path works); cards there are `confidence: medium` only. <!-- REV: per audit gap M3 + B5. -->
- [ ] **Audio total runtime** ≥ 60 minutes across the 60 items.
- [ ] **Mock-subset reproducibility**: ≥ 1 reproducible 10-item CO subset identified (exam-shape proportions); Phase 7 will use it under exam conditions. **Running the mock and reading off an NCLC estimate is Phase 7's job, not this phase's.** <!-- REV: per audit gap m4. -->
- [ ] **Domain-diversity check** passes (≥ 6 domains, no domain > 25 % of vocab examples).
- [ ] **Native-review evidence** present for every `medium`/`low` confidence file.
- [ ] **Confidence rollup**: ≤ 5 files `medium`, 0 `low`.
- [ ] **No template leak**: zero `[REPLACE_*]` sentinels in committed files.
- [ ] **ID freeze committed** (see §8) before Phase 4 starts.

---

## 8. ID freeze ceremony — mandatory before Phase 4 starts <!-- REV: new per audit gap M13; mirrors Phase 2 §7. -->

Phase 4 reading items will reference thematic-vocab IDs via `prerequisites:`. To prevent breakage, Phase 3 freezes its IDs:

1. After EVAL clears, run `python -m tools.cli audit --schema-only` and confirm zero schema errors.
2. Emit two lock files:
   - `content/02_vocabulary/_id_freeze.lock` — all stable vocab IDs (frequency + collocation + thematic).
   - `content/03_listening/_id_freeze.lock` — all stable listening item IDs.
   A small helper `tools/snapshot_phase3_ids.py` (~30 LOC, paralleling the existing `tools/snapshot_grammar_ids.py`) emits both atomically.
3. `git add content/02_vocabulary/_id_freeze.lock content/03_listening/_id_freeze.lock && git commit -m "phase-3: freeze vocab + listening IDs"`.
4. Phase 4 EVAL gates fail if any Phase-3 ID is missing from these locks or differs from them.

Once frozen, no Phase-3 file may be renamed. Corrections happen by edit-in-place; new units after freeze require an explicit "freeze amendment" commit referenced in [BACKLOG.md](BACKLOG.md).

---

## 9. Hand-off to Phase 4 (Reading)

The thematic vocabulary IDs and listening item IDs are stable post-§8. Phase 4 references them via `prerequisites:` (e.g., a reading article on environmental policy lists `[vocab-environnement-01, co-b2-024]` so the learner can cross-train modalities on the same domain).

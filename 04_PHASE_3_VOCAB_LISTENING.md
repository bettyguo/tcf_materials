# 04 — PHASE 3: VOCABULARY · LISTENING · AUDIO
## Frequency lists · thematic bundles · Anki · TTS · 60+ listening items

> **Output: ~80 vocab files, ~60 listening units across CEFR levels, full TTS audio set, finalised Anki deck. Acceptance gate: 1500+ audited high-confidence cards in the deck; CO mini-mock under exam conditions yields a plausible NCLC estimate.**

---

## 1. Goal

This phase delivers the inputs that fuel listening comprehension and underwrite both writing and speaking output. Three pillars:

1. **Frequency-anchored vocabulary** (the 3000 most useful lemmas + their high-yield collocations).
2. **Thematic vocabulary bundles** aligned to the 12 TCF Canada topical domains.
3. **Listening bank**: 60+ items mirroring TCF CO question types, with native-style scripts, TTS audio in both registers, transcripts, MCQ, distractor rationale.

---

## 2. Frequency-anchored vocabulary

### 2.1 The 3000-word backbone

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
  ```
- Cards generated automatically: front = lemma + part of speech; back = definition + 2 sentences + register notes.

### 2.2 Tier 2: B2/C1 lexical density

For the upper 1500 (Bands 7–10 of Lonsdale & Le Bras), the corpus shifts focus from lemmas-in-isolation to **collocations and idiom families**.

Files (`content/02_vocabulary/collocations/`):
- 15 units of ~50 collocations each.
- Organised by semantic field: temps qui passe, prise de décision, opinion et nuance, conflit et résolution, succès et échec, etc.
- Each collocation entry: form, register, 2 authentic-source examples, antonymic/synonymic variants.
- Heavy emphasis on **light-verb constructions** (`prendre une décision`, `faire face à`, `mettre en évidence`) — these dominate TCF EE/EO scoring on lexical range.

---

## 3. Thematic vocabulary (the 12 TCF Canada topical domains)

Based on FEI's published task topics and ~5 years of memorised exam-day prompts (community-shared), the recurring topical domains are:

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

- **Lexique de base** (~30 nouns + 15 verbs + 15 adjectives) with French monolingual definitions (or French-English glosses with the French definition primary).
- **Collocations à exporter en EE/EO** (~20) — the phrases that *score* in writing/speaking tasks on this topic.
- **Connecteurs et tournures argumentatives** spécifiques au domaine (e.g., for `environnement`: *enrayer*, *endiguer*, *un défi de taille*, *un enjeu majeur*).
- **Mini-glossaire spécialisé** (~15 terms) — these are the C1/C2 high-impact items.
- **5 phrases pivots** that can be slotted into an EE tâche 3 essay on this topic.
- **3 sources authentiques** cited, with one short extract showing the vocabulary in operation.
- **Quiz de 10 items** (matching / cloze / paraphrase).

---

## 4. Listening bank

This is the load-bearing deliverable of the phase. 60+ items, structured by TCF CO question types.

### 4.1 TCF CO question typology (every listening item must declare its type)

1. **A1–A2 — Courte annonce** (10–20 s): simple instruction, public announcement, voicemail. Ask: gist, single fact.
2. **A2–B1 — Échange court** (20–40 s, two speakers, 2–4 turns): identify intent, relation between speakers, mood.
3. **B1–B2 — Dialogue de service** (45–75 s): infer detail not literally stated, identify speaker stance.
4. **B2 — Reportage / interview courte** (60–90 s, often monologic): main idea, supporting detail, paraphrase, inference.
5. **B2–C1 — Discussion / débat** (90–120 s, 2–3 speakers): identify each speaker's position, points of disagreement, implied attitude.
6. **C1 — Conférence / chronique radiophonique** (90–150 s, dense monologue): argument structure, presupposition, rhetorical move.
7. **C2 — Texte littéraire ou critique** (60–90 s, very dense): implied meaning, irony, tone, intertextual reference.

### 4.2 Distribution (matches the exam weight distribution)

For the bank of 60 items:
- 6 × type 1 (A1–A2)
- 9 × type 2 (A2–B1)
- 12 × type 3 (B1–B2)
- 15 × type 4 (B2) — **most populous tier**
- 9 × type 5 (B2–C1)
- 6 × type 6 (C1)
- 3 × type 7 (C2)

This proportion matches the actual exam, so a learner who masters the bank effectively practises on the same distribution they will face.

### 4.3 Per-item file template

```markdown
---
id: co-b2-024
title: "Compréhension orale — B2 type 4 — La fatigue informationnelle"
section: listening
cefr: B2
nclc_target: 7
question_type: 4
estimated_minutes: 8
register: france
audio:
  required: true
  voice: fr-FR-DeniseNeural
  duration_seconds: 95
sources: ["[franceculture2024_infodemie]"]
tags: [médias, désinformation, santé mentale]
audit: { status: pending, confidence_overall: high, notes: "" }
---

# Compréhension orale — B2 type 4

## Consigne
Écoutez l'enregistrement une fois (conditions d'examen). Répondez aux 4 questions sans relire la transcription.

## Audio
<audio src="../../audio/co-b2-024.mp3"></audio>

## Questions (4 items, format TCF — un seul choix correct)

### Q1. Quel est l'objectif principal de la chroniqueuse ?
- [ ] A. Dénoncer un comportement individuel.
- [x] B. Décrire un phénomène collectif et ses conséquences.
- [ ] C. Proposer une solution concrète.
- [ ] D. Comparer deux générations.

### Q2. … (B2-difficulty inference)

### Q3. … (vocab-in-context)

### Q4. … (implied stance)

## Corrigé détaillé

### Q1 — B
La chroniqueuse n'attaque personne (élimine A). Elle ne propose pas de remède (élimine C). Elle évoque deux générations mais en illustration, non en comparaison structurante (élimine D). Le mouvement du texte est descriptif et conséquentialiste.
**Indice audio** : "ce que nous traversons collectivement…" (00:18) + "les répercussions sur le sommeil, la concentration…" (01:02).

### Q2 — …

## Transcription

[Texte complet, mots-clés-piège en gras, expressions B2/C1 surlignées avec gloss en marge.]

## SCRIPT
[The exact text fed to TTS — same as transcription but stripped of formatting. This is what `build_audio.py` extracts.]

## Lexique extrait (passe en Anki)
- une infodémie / fatigue informationnelle / saturation cognitive
- ressasser / submerger / éroder
- en proie à / pris dans un tourbillon de
- (collocations) céder à la panique ; redonner du sens

## Stratégie post-mortem
Si vous avez raté Q1 : vous avez confondu intention et thème (piège récurrent en CO type 4 — voir `strategy/co_pitfalls.md`).
Si vous avez raté Q3 : repassez la section vocabulaire du domaine 6 (`thematic/06_medias.md`).
```

### 4.4 Script-writing protocol (the critical step)

For each listening item:
1. **Anchor a source**: identify a real 60–150-second authentic clip (Radio-Canada Première, France Culture, RFI, France Inter). Note the topic, the speaker, the broad structure.
2. **Compose an original script** *inspired by* (not copied from) the source. The script must:
   - Use the target structures naturally (not as drills).
   - Include 2–3 high-impact B2/C1 lexical items the question will test.
   - Have at least one inferential move (the answer is implied, not stated).
3. **Adversarial pass**: read the script aloud (in your head). Does it sound like written-aloud French, or like spoken French? CO scripts should sound spoken: contractions (*j'me dis que*, *t'es au courant*), discourse markers (*bon*, *en fait*, *enfin*, *quoi*), repairs (*c'est-à-dire, plutôt…*), false starts where natural. Distinguish carefully between conversational and journalistic registers.
4. **Distractor design**:
   - One distractor must be a literal-but-wrong reading (tests literal vs inferential).
   - One must reference a word that appears in the audio but in the wrong proposition.
   - One must be plausible-but-unsupported by the audio.
   - No distractor should be obviously wrong on length, tone, or grammar.
5. **TTS calibration**:
   - For Quebec items, use `fr-CA-SylvieNeural` / `fr-CA-AntoineNeural`.
   - For Metropolitan, `fr-FR-DeniseNeural` / `fr-FR-HenriNeural` / `fr-FR-RemyMultilingualNeural`.
   - For multi-speaker items, alternate voices in SSML.
   - Set pace via SSML `prosody rate`: type 1–2 = `-5%`, type 3–4 = `default`, type 5–6 = `+5%` to `+10%` to mirror TCF audio pace.
   - For dialogues, insert realistic pauses (200–400 ms) and breath markers (`<break time="300ms"/>`).
6. **Manual listen-back**: before commit, listen to the generated audio. If TTS mispronounces a name (`Mireille`, `Outremont`) or a borrowed word, fix via SSML `<phoneme>` or rewrite.

### 4.5 Listening strategy file (must accompany the bank)

`content/03_listening/00_strategy.md`:
- Pre-listening: read questions first (the consigne TCF gives ~10–15 s before each item).
- During: scribble keywords, not full notes; use abbreviations.
- Distractor anatomy: how each of the 4 options is constructed (per type).
- Recovery: if lost, lock onto question's keyword and listen for paraphrase.
- Time discipline: the test does NOT let you replay. Train accordingly.
- Self-diagnostic: after every 10-item set, log error type (lexical / inferential / detail-spotting / distractor-bait); the roadmap rebalances based on error-type accumulation.

---

## 5. Anki deck design

Two decks under one parent:

### 5.1 `TCF Canada::01_Vocabulaire`

- Cards generated from `flashcard:` frontmatter blocks across all content.
- Note type: French — Translation + Context.
- Fields: `id`, `front_fr`, `back_fr`, `back_en` (gloss), `register`, `cefr`, `source`, `audio_url`, `tags`.
- Card templates:
  - Card 1 (recognition): `front_fr` → `back_fr` + `back_en` + audio.
  - Card 2 (production, only for cards tagged `production`): `back_en` → `front_fr` + sentence template.
- Spacing: default Anki FSRS (FSRS v5 or later).

### 5.2 `TCF Canada::02_Patterns`

- i+1 sentence cards: one new lexical or structural item per sentence, everything else known.
- Cloze deletion format (Anki `{{c1::…}}`).
- Generated from a curated pool in `content/02_vocabulary/sentence_patterns.md` (300 sentences, audited).
- Audio attached (TTS).

Build target: ship 1500+ high-confidence cards in the public deck; medium-confidence items go to a separate `TCF Canada::99_Quarantine` deck that the learner can opt into.

---

## 6. Audit (`PHASE_3_AUDIT.md`)

This phase has the largest audit surface in the project. Mandatory:

- [ ] Random-sample 50 vocabulary entries; verify each definition against TLFi or Petit Robert.
- [ ] Random-sample 10 listening scripts; for each, verify:
  - The "correct" answer is uniquely supported by the audio.
  - No distractor is also defensible (the #1 reviewer-killer for MCQ banks).
  - The audio TTS sounds natural at the chosen rate.
- [ ] Anglicism scan across all listening scripts and example sentences.
- [ ] Quebec/France register tagging is consistent (no `register: france` file containing *char* for *voiture*).
- [ ] Frequency claims (band assignment) match the Lonsdale & Le Bras list — provide a `tools/check_frequency.py` that verifies.
- [ ] All audio files have an associated `## SCRIPT` block and a successful TTS render.

---

## 7. Evaluate (`PHASE_3_EVAL.md`)

- [ ] 3000 frequency lemmas covered.
- [ ] 12 thematic domains × ~80 items each = ~960 thematic vocabulary entries.
- [ ] 60 listening items, distribution as specified above.
- [ ] Anki deck builds with ≥ 1500 high-confidence cards.
- [ ] Audio total runtime ≥ 60 minutes.
- [ ] CO mini-mock (the 10-item listening subset of the Phase 1 diagnostic, rebuilt with the now-richer item bank) yields a learner-self-reportable NCLC estimate per skill.

Hand-off to Phase 4 (Reading): the thematic vocabulary IDs are stable; Phase 4 will reference them via `prerequisites:`.

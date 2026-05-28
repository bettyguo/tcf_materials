# 07 — PHASE 6: SPEAKING (Expression orale — EO)
## 3 tâches · modèles audio · rubrique phonologique · self-scoring via Whisper

> **Output: ~90 speaking prompts, 3 model audio per prompt (NCLC 6/8/10), phonological training kit, Whisper-based self-transcription + rubric, prosody coach. Acceptance gate: learner can self-score within ±1 NCLC band on a calibration set; phonological inventory complete.**

---

## 1. Goal

EO is the section where adult B1 learners typically *under*-score relative to their actual ability. The reasons are recoverable in 12 weeks: (a) lack of monologue stamina, (b) under-rehearsed register transitions, (c) phonological inaccuracies that drag the *contrôle phonologique* criterion, (d) timing panic (5-minute monologue under 2-min prep is the C1 stress point), (e) absence of structured exposure to the rubric.

This phase ships the rehearsal infrastructure to fix all five.

---

## 2. The TCF EO rubric, operationalised

Four criteria (same family as EE, plus phonological control replacing one written criterion):

### 2.1 Efficacité communicative
- T1: are the questions you ask actually obtaining the information requested?
- T2: is your monologue structured (intro → 2–3 points → close) ?
- T3: do you take a stance and defend it under follow-up?

### 2.2 Étendue et précision lexicales
Same as EE but evaluated under fluency pressure (fillers do not count, paraphrases do).

### 2.3 Étendue et exactitude morphosyntaxiques
- Tense control in spontaneous speech (frequent B2 trap: collapsing to présent under pressure).
- Subordination in production (B2: ≥ 1 subordinate per long utterance; C1: nested).
- Mood: subjunctive triggered in conversation (the marker of B2+ speech).

### 2.4 Contrôle phonologique
- Vowel inventory accurate (the 4 nasal vowels distinguished; the e/é/è distinction; the eu/œ distinction).
- Liaison and enchaînement applied (obligatory liaisons hit; forbidden ones avoided).
- Sentence prosody (rising-then-falling pattern for declaratives; correct interrogative intonation).
- Stress (no English-style word stress; the French rhythm is group-final).
- Speaking rate steady (no long hesitation; fillers limited).

Composite mapping per band ≈ EE (cf. `06_PHASE_5_WRITING.md` §2.5).

---

## 3. Prompts (`content/06_speaking/`)

### 3.1 Tâche 1 — Questions à l'examinateur (B1 anchor, ≈ 1.5 min)

Genre: ask the examiner 4–5 questions to obtain information about a topic announced by the examiner. Tests question formation across 3 registers (intonation / *est-ce que* / inversion), interrogative pronouns and adjectives, *quel/quelle/quels/quelles*, polite phrasing.

30 prompts across:
- Voyage / hébergement / transport (5)
- Études / inscriptions / examens (5)
- Travail / candidature / entretien (5)
- Services / administration / santé (5)
- Loisirs / sorties / culture (5)
- Logement / quartier / quotidien (5)

Per prompt file:
```markdown
---
id: eo-t1-007
title: "EO Tâche 1 — Inscription à un cours en ligne"
section: speaking
task: 1
cefr: B1
estimated_minutes: 5
register: neutre-soutenu
audit: { status: pending, confidence_overall: high, notes: "" }
---

# Tâche 1 — Inscription à un cours en ligne

## Consigne (lue par l'examinateur)
Je suis le responsable d'une plateforme proposant des cours en ligne. Vous êtes intéressé(e) pour vous y inscrire. Posez-moi des questions pour vous renseigner.

## Stratégie en 30 secondes (à mémoriser)
Vous devez poser **4 à 5 questions distinctes** en 1.5 min, en variant les types d'interrogation (au moins 1 sur 3 questions doit utiliser l'inversion ou *est-ce que*). Ne posez pas deux questions de même forme à la suite.

## Cartographie des questions possibles (à utiliser comme matière première, pas comme script)
- Modalités d'inscription : *Pourriez-vous me dire comment fonctionne l'inscription ?*
- Coût : *Quel est le coût total, et y a-t-il des frais cachés ?*
- Format : *Les cours sont-ils en direct ou enregistrés ?*
- Reconnaissance : *Délivrez-vous une attestation à la fin du cours ?*
- Support pédagogique : *Existe-t-il un accompagnement individuel ?*

## Modèles audio
- Modèle NCLC 6 — [audio + transcript]
- Modèle NCLC 8 — [audio + transcript]
- Modèle NCLC 10 — [audio + transcript]

[Chaque modèle a un fichier audio TTS (ou une note "à enregistrer par un locuteur natif si possible"), un transcript, et une analyse phonologique annotée des moments-clés.]

## Pièges fréquents
- *Est-ce que vous avez ?* est correct mais répétitif ; alterner.
- *Combien coûte le cours ?* > *Combien le cours coûte ?* (à éviter par mimétisme anglo).
- *Quel(s)* doit s'accorder avec le nom qu'il interroge.
- Intonation : la question en intonation montante seule est familière ; à éviter en formal.

## Étirage (réutilisable)
[3–4 questions de réserve pour gagner du temps si vous séchez : *Pour finir, est-il possible de…*]
```

### 3.2 Tâche 2 — Monologue descriptif (B2 anchor, ≈ 3 min)

Genre: structured monologue on a personal/topical theme. Tests: extended speech without prompt, topical vocabulary, narrative tenses (passé composé + imparfait + plus-que-parfait), sequencing connectors, opinion markers.

30 prompts across the 12 thematic domains, with sub-prompts:
- Racontez une expérience marquante de…
- Décrivez les avantages et inconvénients de…
- Présentez les changements observés ces dix dernières années en matière de…
- Expliquez votre rapport personnel à…

Per prompt: a 4-bullet stimulus and a 1-page strategy sheet:
- Structure type: ouverture (10 s) → 2 points développés (≈ 60 s + 60 s) → clôture (10–20 s).
- Banque de transitions à mémoriser pour T2.
- Modèles audio (NCLC 6/8/10) with annotated transcripts.

### 3.3 Tâche 3 — Monologue argumentatif sur document (C1 anchor, ≈ 5 min après 2 min de préparation)

Genre: receive a short stimulus (a quote, a headline, a statistic, a 3-line news brief), prepare 2 min, defend a position for ~5 min, answer follow-up questions from the examiner.

30 prompts. Each stimulus pulled from or aligned with the reading bank's `usable_as_stimulus: true` items.

Per prompt:
- The stimulus (50–150 words / 1 image / 1 statistic).
- A 2-min prep workflow:
  1. **0:00–0:20**: read stimulus twice; underline the key claim.
  2. **0:20–0:40**: decide your stance (pour / contre / nuancé) — pick whichever is easier to defend with the vocabulary you have.
  3. **0:40–1:20**: jot 2 arguments + 1 example each.
  4. **1:20–1:40**: jot 1 concession + 1 refutation.
  5. **1:40–2:00**: jot opener + closer.
- A speaking framework: introduction (20 s, situate + thesis) → argument 1 + example (60 s) → argument 2 + example (60 s) → concession + refutation (60 s) → conclusion + opening (30 s).
- 3 modèles audio (NCLC 6 / 8 / 10) — each with transcript and a phonological-prosodic annotation overlay.
- Anticipated examiner follow-ups (the examiner often pushes back on a weak point) and rehearsed replies.

---

## 4. Phonological training kit (`content/06_speaking/00_phonology/`)

The most under-served area in self-study. Eight units:

### 4.1 Inventaire vocalique (les 16 voyelles du français)
- /i, e, ɛ, a, ɑ, ɔ, o, u, y, ø, œ, ə, ɛ̃, ɑ̃, ɔ̃, œ̃/ (œ̃ contested; many speakers merge with ɛ̃).
- For each vowel: minimal pairs (e.g., /ø/ vs /œ/: *jeûne* vs *jeune*; *peu* vs *peur*), spectrogram description (verbal), articulation diagram (Mermaid or SVG).
- Audio: TTS does not always render minimal pairs cleanly; verify, and where TTS fails, instruct the learner to use Forvo (forvo.com) for native pronunciations of the example words.
- Drill: 20 minimal-pair discrimination items per vowel (audio).

### 4.2 Inventaire consonantique (~20 consonnes)
- The /R/ phoneme: uvular fricative in standard, may be apical in Quebec.
- /ʁ/ vs /ʁʁ/ geminate not phonemic but durational.
- Voiced/voiceless contrasts (frequent learner conflations: /b/ vs /p/ at coda).

### 4.3 Liaisons (3 unités)
- Obligatoires (déterminant + nom; pronom + verbe; adj prénominal + nom; etc.) — full inventory with examples.
- Interdites (singulier + plural verbe; après *et*; etc.).
- Facultatives — list with register notes (obligatory in soutenu, optional in courant).

### 4.4 Enchaînement
- Resyllabification across word boundaries (*il a un ami* → /i.la.œ̃.na.mi/).

### 4.5 Schwa instable
- Loi des trois consonnes; règles de chute selon le débit; alternance schwa/zéro.
- Drill: 30 sentences with marked schwa-drop opportunities.

### 4.6 Prosodie
- Rhythmic group ending stress.
- Intonation contours: declarative (continuation rise + final fall), yes/no question (final rise), wh-question (overall fall), exclamation, parenthetical lowering.
- Drill: shadowing exercise (10 RFI Journal en français facile excerpts + 5 France Culture excerpts).

### 4.7 Shadowing protocol
- 10-minute daily routine: listen → repeat with audio → repeat without audio → record self → compare.
- 30 graded shadowing files (different texts each day for a month).

### 4.8 Auto-évaluation phonologique
- A 5-min self-recording protocol the learner runs weekly.
- Whisper-based transcription (`tools/score_speaking.py`) detects errors: e.g., if Whisper transcribes *cheveu* as *chevaux*, the learner has a /ø/ vs /o/ confusion.
- A 25-point checklist the learner walks through while reviewing the recording.

---

## 5. The Whisper-based self-scoring tool

`tools/score_speaking.py`

Workflow:
1. Learner records `.m4a` / `.wav` (e.g., phone voice memo) and drops in `recordings/`.
2. Tool runs `whisper` (large-v3 multilingual, or `faster-whisper` for speed) with `language=fr`.
3. The transcription is compared against:
   - A target schema (was the structure present? are there words from the prompt's expected vocab pool?).
   - Sentence-level metrics (length, subordination proxy, connector inventory) — same as the writing scorer.
   - A disfluency count (Whisper preserves false starts and fillers reasonably well).
4. Tool produces a report:
   - **Estimated NCLC band per criterion**, with the same caveat as EE: heuristic.
   - **Specific suggestions**: "You used 4 connectors, all from the 'addition' family; add 2 from 'concession'."
   - **Phonological hints** when Whisper systematically mistranscribes a word (suggests phoneme confusion).
   - **Pacing report**: words per minute, longest pause, ratio of speech to silence.
5. Optional: TTS the learner's transcript back at the target NCLC 8 model's pace, so the learner hears their own content delivered fluently — a powerful gap-spotting tool.

---

## 6. Talk-yourself-to-fluency program

`content/06_speaking/00_program.md`

A 60-day daily protocol (overlapping with weeks 5–12 of the roadmap):

- Day 1–7: 5-min monologue on a prompt; record, transcribe, score, iterate.
- Day 8–14: same prompts, 5 min, but explicitly inserting 3 target connectors per monologue.
- Day 15–28: tâche 2 prompts under timer.
- Day 29–42: tâche 3 with prep + monologue + simulated follow-up.
- Day 43–60: mixed tâches under exam conditions (T1+T2+T3 sequence, 12 min total, no breaks).

Logging template: weekly self-rated band, error type tally, fluency proxy (WPM), favourite phrases that started feeling natural.

---

## 7. Audit (`PHASE_6_AUDIT.md`)

- [ ] Listen to every NCLC 8 model audio in full; verify it sounds like a confident B2 speaker, not a flat TTS reading.
- [ ] Verify minimal-pair drill audio renders the contrast (TTS sometimes collapses /ø/ /œ/ — if so, document and recommend Forvo fallback).
- [ ] Verify the 2-minute T3 prep workflow is timed-realistic (you, Claude Code, try it on 3 random prompts).
- [ ] Phonological-rule files cross-checked against Léon, *Phonétisme et prononciation du français* and Tranel, *The Sounds of French*.

---

## 8. Evaluate (`PHASE_6_EVAL.md`)

- [ ] 30 prompts × 3 tâches = 90 files.
- [ ] 3 audio models × 90 prompts = 270 audio files (TTS-generated; flagged where native-recording would improve).
- [ ] 8 phonology units complete.
- [ ] `score_speaking.py` calibrated on the 270 models with ≥ 75% band agreement (lower bar than EE — speech is noisier).
- [ ] 60-day program with daily file references.

Hand-off to Phase 7 (Mocks): the speaking sub-section of the full mock will draw on a curated subset of T1/T2/T3 prompts. Tag these with `usable_in_mock: true`.

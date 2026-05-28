# 08 — PHASE 7: MOCKS · STRATEGY · CHEATSHEETS
## 4 full mocks · exam-day playbook · skill cheatsheets · error-pattern diagnostic

> **Output: 4 full mock exams (matching exact TCF format and weighting), 1 partial mock per skill, strategy document, ~12 cheatsheets, a post-mock diagnostic generator. Acceptance gate: mock #1 is fully self-administrable within the 2h47 window; diagnostic produces actionable per-skill remediation.**

---

## 1. Goal

Four full mock exams + targeted partials, plus the meta-tooling that converts a mock result into a study-plan correction. Without the diagnostic-driven feedback loop, mocks are just stress practice. With it, each mock returns ~50 raw points across the next two weeks.

---

## 2. Full mock exam structure

Each full mock (`content/07_mock_exams/mock_NN/`):

```
mock_NN/
├── 00_instructions.md            # exam-condition setup, timing, materials
├── 01_co_audio_master.mp3        # 35-min uninterrupted audio (built from 39 item scripts)
├── 01_co_items.md                # 39 MCQ (no transcript visible; transcript in answer key)
├── 02_ce_items.md                # 39 MCQ + 4–6 reading texts
├── 03_ee_prompts.md              # 3 tasks (T1, T2, T3)
├── 04_eo_prompts.md              # 3 tasks (T1, T2, T3) with examiner script
├── 05_answer_key_co.md           # answers + transcripts + distractor rationales
├── 06_answer_key_ce.md           # answers + paragraph-level explanations
├── 07_ee_models.md               # NCLC 7/8/9 model responses + rubric application
├── 08_eo_models.md               # NCLC 7/8/9 model responses + rubric application
├── 09_score_calculator.md        # raw → CEFR → NCLC mapping for this mock
└── 10_post_mock_diagnostic.md    # the template the learner fills in
```

### 2.1 Item composition rules per mock

CO: 4 × A1, 6 × A2, 9 × B1, 10 × B2, 6 × C1, 4 × C2 = 39 items. **No item recycled across mocks** (the four mocks together exhaust 156 items, drawn from the listening bank — Phase 3 sized the bank precisely for this).

CE: identical distribution = 39 items. Reading texts (4–6) span the full level range; each text serves 5–9 items.

EE: T1 + T2 + T3, each from the prompt bank with `usable_in_mock: true`.

EO: T1 + T2 + T3 likewise.

### 2.2 Audio master file

The full 35-minute CO audio is concatenated from the 39 item scripts with:
- Standardised inter-item pause (TCF uses ~10–15 s in real exam).
- An opening 30-s instruction-style intro (TTS).
- A closing 5-s announcement.

This file is the canary for `make audio` — if it concatenates correctly with stable timing, the pipeline is healthy.

### 2.3 Mock #1 vs #2 vs #3 vs #4: progressive challenge

| Mock | When (per roadmap) | Distribution skew | Purpose |
|---|---|---|---|
| #1 | End of week 4 | Slight B1 bias (10 B1 + 9 B2 in CO) | Realistic baseline at "intermediate" |
| #2 | End of week 8 | Standard distribution | Mid-course calibration |
| #3 | End of week 10 | Slight C1 bias (8 B2 + 8 C1) | Stretch — does ceiling reach NCLC 9? |
| #4 | End of week 11 | Standard distribution + maximally tricky distractors | Final dress rehearsal |

---

## 3. Partial mocks (one per skill)

For interim weeks (the off-week between full mocks), provide:
- **CO partial**: 15 items, 15 min, full conditions. (`content/07_mock_exams/partials/co_*.md`)
- **CE partial**: 15 items, 25 min.
- **EE partial**: 1 tâche under timer (rotating T1/T2/T3).
- **EO partial**: 1 tâche under timer with self-record.

These are produced from the spare items not used in the 4 full mocks. Bank size from Phase 3+4 supports 4 partial CO + 4 partial CE + several extra rotations.

---

## 4. Strategy document (`content/09_strategy/`)

`00_exam_day.md`:
- Logistics: arrival, ID, what to bring, what to wear, how to manage stress in the 30-min wait.
- Timing within each section: per-item time budgets, when to skip, when to come back.
- Recovery: what to do when you're 5 min in and panicking.
- Section-by-section game plan (one file each):

`01_co_strategy.md`:
- Pre-listen: read the question stem during the inter-item pause.
- Note-taking shorthand specific to French (abbreviations, symbols).
- Inference vs detail: which question types are inferential (signaled by *l'auteur suggère…, le ton de…*).
- The "second-pass discipline": no replays. Train so that one pass is sufficient.

`02_ce_strategy.md`:
- Scan-and-locate vs deep-read: when to skim, when to slow down.
- The "distractor anatomy" recall (links to Phase 4 file).
- Vocabulary-in-context: use surrounding clauses, not just the word.
- 92-second-per-item budget; how to leave hard items for the end.

`03_ee_strategy.md`:
- Pre-write: 2 min outline before writing.
- Word-count discipline: count by lines (handwriting) or use the soft counter.
- Time-share: T1 = 15 min, T2 = 20 min, T3 = 25 min.
- 3-min final reread: agreement check, mood check, repetition check.

`04_eo_strategy.md`:
- Warm-up (5 min before entering the room): self-monologue on a random topic.
- Tone setting: greeting the examiner in soutenu register.
- The T2 transition between two ideas (the "hinge phrase" you memorise).
- The T3 prep workflow (link to Phase 6 §3.3).
- Recovery: if you blank for 5 s, what to say to buy time without sounding fillerish (*"Si je peux préciser ma pensée…"*, *"Pour reformuler…"*).

`05_pitfalls.md` — the 20 most common scoring leaks across all sections, with prevention.

`06_taper_protocol.md` — the last 7 days before the exam (no new content; consolidation; sleep; light shadowing).

---

## 5. Cheatsheets (`content/08_cheatsheets/`)

One-page PDFs (built from MD via Pandoc with a 2-column LaTeX template), printable A4.

1. Subjonctif — déclencheurs (1-page recap of grammar B2-01).
2. Conditionnel + hypothèse (3 hypothèses).
3. Connecteurs B2 (by function: cause, conséquence, opposition, concession, addition, illustration, conclusion).
4. Connecteurs C1 (the 20 sentence-starters that distinguish C1 writing).
5. Phrases pivots EE T3 (the 25-phrase essay-skeleton sheet).
6. Phrases pivots EO T3.
7. Phonologie — minimal pairs francophones critiques.
8. Liaisons — obligatoires, interdites, facultatives.
9. Anti-anglicismes (les 30 calques fréquents et leurs versions naturelles).
10. Vocabulaire transversal de l'argumentation (les 50 mots).
11. Distractor anatomy — la grille des 7 pièges TCF.
12. Quebec ↔ France — les 30 paires à reconnaître.

These are the "thrust into your bag on exam day" documents. Should remain dense but readable.

---

## 6. Post-mock diagnostic (`content/07_mock_exams/00_diagnostic_template.md`)

After each full mock, the learner fills out:

```markdown
# Mock #N — Diagnostic personnel

## Scores
- CO : __ / 699 → NCLC __
- CE : __ / 699 → NCLC __
- EE : __ / 20 (auto-évaluation rubric) → NCLC __
- EO : __ / 20 (auto-évaluation rubric) → NCLC __

## CO — Analyse par type d'item (39 items)
| Type | Items | Correct | % | Notes |
|---|---|---|---|---|
| Type 1 (A1–A2) | 4 | __ | __ | |
| Type 2 (A2–B1) | 6 | __ | __ | |
| ... | | | | |

## CO — Analyse par type d'erreur
- Erreurs lexicales : __
- Erreurs inférentielles : __
- Erreurs de détail : __
- Erreurs par distracteur piégeant : __

## CE — idem

## EE — application de la rubrique
- Tâche T1 : critère 1=__/5, 2=__/5, 3=__/5, 4=__/5
- ...

## EO — idem (avec analyse phonologique)

## Top 3 axes pour les 14 prochains jours
1. ...
2. ...
3. ...

## Mappage vers le roadmap
[Pour chaque axe, quels fichiers de contenu retravailler.]
```

The template includes a "rebalance" section that, given the per-skill errors, suggests how to redistribute the next two weeks. The roadmap (Phase 1) has placeholder hooks (`# REBALANCE: skill_X +N min`) that the learner fills in.

---

## 7. Score → NCLC calculator

`tools/calculate_score.py`:
- Inputs: raw CO, raw CE, EE score /20, EO score /20.
- Outputs: per-skill NCLC, overall band summary, CRS-point projection if combined with English score (the user gets +50 with NCLC 7+ across all 4).
- The script is also exposed in the website as a small HTML calculator (`site/calculator.html`).

---

## 8. Audit (`PHASE_7_AUDIT.md`)

- [ ] Each full mock: time it yourself. The CO audio runtime is within ±60 s of 35 min. Reading set length is achievable in 60 min. EE prompts together are doable in 60 min by a B2 learner. EO sequence is exactly 12 min including 2-min prep.
- [ ] All 39 items per mock unique within the mock (no accidental near-duplicates).
- [ ] Item difficulty distribution actually matches the declared distribution (you spot-check by re-grading 10 random items as a "blind" candidate).
- [ ] Score-mapping calculator produces sane numbers on edge cases (raw 100, raw 699, raw 450 each tested).
- [ ] Strategy files contain no advice that conflicts with another strategy file (e.g., one says "read questions first" and another says "read text first" — pick one and propagate).

---

## 9. Evaluate (`PHASE_7_EVAL.md`)

- [ ] 4 full mocks shipped.
- [ ] 4 partial CO + 4 partial CE + EE/EO rotations shipped.
- [ ] 7 strategy files.
- [ ] 12 cheatsheets, each rendered as a single-page A4 PDF.
- [ ] Post-mock diagnostic template integrated.
- [ ] Score calculator working both CLI and HTML.

Hand-off to Phase 8 (Launch): all content frozen except for typo fixes; final QA + packaging.

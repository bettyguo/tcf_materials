# 06 — PHASE 5: WRITING (Expression écrite — EE)
## 3 tâches · templates · model answers · graduated prompts · auto-scorable rubric

> **Output: ~90 writing prompts (30 per tâche), 3 model answers per prompt (NCLC 6 / 8 / 10 bands), rubric, CLI auto-scorer, anti-error register. Acceptance gate: rubric reproduces FEI grilles within tolerance; learner can self-score within ±1 NCLC band on calibration set.**

---

## 1. Goal

EE is the section where preparation translates most directly to score. A learner who internalises the rubric criteria, masters 8–10 essay templates, and accumulates 40 corrected drafts will reliably land NCLC 8–9 on EE. The phase delivers:

1. The TCF EE rubric, decomposed and operationalised.
2. 30 prompts per tâche (90 total), graded by difficulty, across the 12 thematic domains.
3. Three model answers per prompt — at NCLC 6, NCLC 8, NCLC 10 — so the learner can see the gradient.
4. ~12 templates per tâche (skeleton + slot-fillers) that the learner memorises and adapts.
5. A "phrases pivots" library — high-impact sentences the learner stockpiles for re-use.
6. A self-scoring CLI tool (`tools/score_writing.py`) that applies a quasi-rubric to the learner's draft and produces a band estimate + targeted feedback.

---

## 2. The TCF EE rubric, operationalised

Source: FEI grilles d'évaluation TCF (publicly described in their candidate handbook; full grids are examiner-only but the criteria and band descriptors are public).

Each tâche is scored on **4 criteria**, each contributing to the 0–20 total. The criteria are:

### 2.1 Capacité à réaliser la tâche communicative
- T1: Did you respond to the situation? Provided required information? Adopted appropriate register?
- T2: Did you cover all elements requested? Maintained the genre (article, lettre, témoignage)?
- T3: Did you take a position, defend it with reasoning, address counter-positions?

### 2.2 Cohérence et cohésion
- Paragraph structure visible (intro / corps / conclusion for T2/T3).
- Connecteurs used and appropriate (not just *et*, *mais*; tier them by level).
- Anaphore — pronouns and demonstratives resolving cleanly.
- No abrupt topic shifts.

### 2.3 Richesse et précision lexicales
- Type-token ratio targets per band (see metrics in §6).
- Avoidance of repetition (the same noun within 30 words triggers a penalty).
- Domain-appropriate vocabulary (writing about pollution uses *enrayer*, *endiguer*, *un enjeu majeur* — not just *combattre*).
- Collocations correct (no calques).

### 2.4 Morphosyntaxe — étendue et exactitude
- Tense diversity (B2: ≥ 4 tense forms; C1: subjunctive present + past, conditional past, plus-que-parfait, possible inversion).
- Mood control (subjunctive triggered correctly).
- Agreement (gender, number, past participle).
- Subordination depth (B2: avg 1.2 subordinates/sentence; C1: 1.8).

### 2.5 The composite score mapping

| Score /20 | Description per criterion (synthesis) |
|---|---|
| 18–20 | Native-like across all criteria; nuance and rhetorical control evident. |
| 16–17 | C1: minor lexical or morphosyntactic slips; full task accomplishment; rich connectors. |
| 14–15 | Strong B2: task fully accomplished; clear structure; varied vocabulary with occasional imprecision. |
| 12–13 | B2 threshold: task accomplished; structure present; some lexical limits. |
| 10–11 | B1+: task mostly accomplished; structure visible but possibly schematic; lexical repetition. |
| 8–9 | B1: task partially accomplished; structure unclear; frequent errors not blocking comprehension. |
| 6–7 | A2+: task minimally accomplished; errors begin to block comprehension. |
| ≤ 5 | Below A2. |

Target: 14+ across all three tâches → EE ≈ NCLC 7 floor; 16+ → NCLC 8/9.

---

## 3. Prompts (`content/05_writing/`)

### 3.1 Tâche 1 — Le message (B1 anchor)

`content/05_writing/tache1/`

Genre: a written message reacting to a situation (60–120 mots). Tu/vous register choice is itself part of the assessment.

30 prompts distributed across:
- Demander un service / une information (8)
- Répondre à un service / un message (5)
- Inviter / décliner une invitation (4)
- Se plaindre / présenter des excuses (5)
- Conseiller / mettre en garde (4)
- Remercier / féliciter (4)

Each prompt file:
```markdown
---
id: ee-t1-014
title: "EE Tâche 1 — Demander un report d'examen"
section: writing
task: 1
cefr: B1
target_words: 90        # ±20
estimated_minutes: 20
register_required: formal
audit: { status: pending, confidence_overall: high, notes: "" }
---

# Tâche 1 — Demander un report d'examen

## Consigne
Vous suivez un cours à l'université. Pour des raisons de santé, vous ne pouvez pas vous présenter à l'examen prévu vendredi prochain. Écrivez un courriel à votre professeur pour :
- expliquer brièvement votre situation
- demander un report
- proposer une solution alternative

(90 mots environ ; registre formel)

## Modèles de réponse

### Modèle NCLC 6 (≈ score 10/20)
[texte de ~80 mots, structure simple S+V+C, peu de connecteurs, vocabulaire de base, registre approximatif (peut mélanger tu/vous), 2–3 erreurs morphosyntaxiques non bloquantes]

### Modèle NCLC 8 (≈ score 14/20)
[texte de ~95 mots, structure claire (motif → demande → ouverture), 4–5 connecteurs B2, vocabulaire varié, registre soutenu cohérent, ≤ 1 erreur mineure]

### Modèle NCLC 10 (≈ score 18/20)
[texte de ~105 mots, structure ramassée et expressive, connecteurs C1 (en raison de, dans l'attente de…), nominalisation, salutations soutenues complètes, aucune erreur — c'est un modèle visé, pas un objectif à imiter sans réflexion]

## Variantes contrastives (mêmes ingrédients, registres différents)
- Variante familière (à un ami) : … [pour montrer ce qu'il NE faut PAS faire en T1 formel]
- Variante neutre vs soutenue : 3 paires de phrases équivalentes [pour entraîner le repérage de registre]

## Pièges à éviter
- Confondre *demander* + n et *demander à* + inf.
- Calque sur l'anglais : *Je suis désolé pour l'inconvénience* → *Je vous prie de m'excuser pour la gêne occasionnée*.
- Salutation finale : *Cordialement* (neutre soutenu), *Bien à vous* (chaleureux), *Je vous prie d'agréer mes salutations distinguées* (très formel).

## Lexique exporté en Anki
…
```

### 3.2 Tâche 2 — L'article / le rapport (B2 anchor)

`content/05_writing/tache2/` — 30 prompts (120–150 mots).

Genres: article de magazine étudiant, témoignage pour blog, rapport interne, lettre ouverte, contribution à un forum, courrier des lecteurs. The genre is dictated by the prompt; learner must hit the genre conventions.

Sub-distribution by genre:
- Article (descriptif / informatif) (8)
- Témoignage / récit d'expérience (8)
- Rapport bref (interne ou associatif) (5)
- Lettre ouverte / tribune courte (5)
- Contribution forum / commentaire argumenté (4)

Each across the 12 thematic domains (rotated).

### 3.3 Tâche 3 — L'essai argumentatif (C1 anchor)

`content/05_writing/tache3/` — 30 prompts (150–180 mots).

Structure obligatoire (TCF expects):
- Introduction with thesis (≈ 30 mots)
- 1–2 arguments with examples (≈ 100 mots)
- A concession (≈ 25 mots) — distinguishes B2 from C1
- A conclusion that takes a clear position (≈ 25 mots)

Sub-distribution:
- 10 societal / civic topics
- 8 technological / scientific topics
- 6 environmental topics
- 6 cultural / educational topics

Each prompt may include a short stimulus text (200–250 mots) — pulled from the reading bank's `usable_as_stimulus: true` items.

---

## 4. Templates (`content/05_writing/00_templates/`)

12 templates per tâche, each a skeleton + slot vocabulary + 3 instantiations.

Example (tâche 3, template "thèse-concession-réfutation-conclusion"):

```markdown
# Template T3-04 : Thèse → Argument → Concession → Réfutation → Conclusion

## Squelette
[Phrase d'accroche : statistique / fait / question rhétorique]. [Question implicite ou explicite qui pose le débat]. [Thèse claire de l'auteur, en une phrase].

D'abord, [argument 1, étayé par exemple ou donnée]. [Reformulation conclusive de l'argument 1]. En outre, [argument 2 distinct, étayé]. [Court approfondissement].

Certes, [concession honnête : reconnaissance d'un contre-argument]. Cependant, [réfutation : pourquoi la concession n'invalide pas la thèse — soit en quantité, soit en degré, soit en nature].

En définitive, [reformulation de la thèse renforcée par les deux arguments]. [Ouverture facultative : question, perspective, recommandation].

## Phrases pivots (à mémoriser)
**Pour ouvrir** : *Il est aujourd'hui difficile d'ignorer que…* / *À l'heure où…, la question de … se pose avec une acuité particulière.* / *Le débat autour de … ne cesse de prendre de l'ampleur.*
**Pour conclure un argument** : *C'est dire à quel point…* / *On voit ainsi que…* / *Cette tendance s'inscrit dans…*
**Pour concéder** : *Il serait malhonnête de nier que…* / *Certes, il faut reconnaître que…* / *Sans doute peut-on objecter que…*
**Pour réfuter** : *Toutefois, cet argument ne tient pas dès lors que…* / *Cette objection mérite cependant d'être nuancée car…* / *Or, à y regarder de près…*
**Pour clore** : *En définitive…* / *Dès lors, il apparaît que…* / *Ainsi, loin de … , la véritable question demeure…*

## Trois instantiations sur trois sujets différents
[Show the template applied — verbatim — to three different prompts. The learner sees that the same structural moves produce three quite different essays.]
```

12 templates × 3 tâches = 36 templates. The learner is expected to memorise 6–8 across the three tâches (the remaining serve as reference).

---

## 5. Phrases pivots library (`content/05_writing/00_pivots/`)

Organised by rhetorical function:
- Ouvrir un texte (20 phrases B2 + 15 C1+)
- Introduire un argument (15 + 15)
- Illustrer (10 + 10)
- Concéder (12 + 12)
- Réfuter (12 + 12)
- Nuancer (10 + 10)
- Conclure (15 + 15)

Each phrase tagged with `register: courant | soutenu | très_soutenu` and `cefr: B2 | C1 | C2` and a short note on where it works best.

These pipe directly into the Anki "patterns" deck.

---

## 6. The auto-scoring CLI

`tools/score_writing.py`

A learner writes their draft in `drafts/<date>_<prompt_id>.md` and runs:

```
$ python tools/score_writing.py drafts/2026-06-15_ee-t2-003.md
```

The tool produces a report containing:

### 6.1 Quantitative metrics (computed, deterministic)
- Word count vs target (penalty if outside ±10%).
- Sentence count, average sentence length, longest/shortest.
- Subordinate clause count (proxy: counting subordinating conjunctions).
- Connecteur inventory (matched against the level's expected connector set).
- Type-token ratio.
- Tense and mood inventory (regex + lemma list).
- Spell-check (hunspell fr_FR + fr_CA).
- Anglicism scan (against `tools/anglicisms.yaml`).
- Repetition flags (same lemma within 30 words → warning).

### 6.2 Quasi-rubric (heuristic, transparent)
The tool maps the metrics onto an estimated score per criterion using transparent thresholds documented in `tools/scoring_rules.md`. The score is heuristic and labelled as such; it is NOT a substitute for examiner judgment. Its purpose is **comparison to the learner's own prior drafts** (improvement trajectory) and to the three model answers (calibration).

### 6.3 Targeted feedback
- If avg sentence length < B2 floor: "Vos phrases sont trop courtes ; visez ≥ 1 subordonnée par phrase. Voir gram-b2-09."
- If connector inventory is bottom-quartile: "Connecteurs limités à *et, mais, parce que* ; intégrer 3 connecteurs de la liste : … Voir 00_pivots/connecteurs.md."
- If subjunctive triggers are missed: "Détecté 3 contextes appelant le subjonctif (*il faut que…*, *bien que…*) où vous avez utilisé l'indicatif. Voir gram-b2-01."
- If repetition: lists the repeated lemmas with synonyms.
- If anglicism: lists with corrections.

### 6.4 Calibration

Before relying on the tool, the learner runs it on the 90 model answers (30 prompts × 3 bands). The tool's score per model should agree with the labelled NCLC band on ≥ 80% of cases. If not, tune the thresholds in `scoring_rules.md` and re-run.

---

## 7. Anti-error register (`content/05_writing/00_anti_error.md`)

A living document of the 50 most common B1→B2/C1 writer errors, with:
- Wrong form, right form, register note, source of confusion (L1 calque, French structural pitfall, register clash).
- Cross-link to the grammar unit that covers the underlying issue.
- 2 short transformation drills per error.

Examples (the actual file is longer):
- *J'ai oublié de faire mon devoir.* ✓ vs *J'ai oublié faire mon devoir.* ✗ (verb + de + inf required)
- *Je m'intéresse à la politique.* ✓ vs *Je suis intéressé en la politique.* ✗
- *Davantage de* + n vs *plus de* + n (registre).
- *Notamment* vs *en particulier* — non-interchangeable when one targets enumeration, the other specification.
- Subjonctif après *bien que* — never *bien que* + ind., even if heard in speech.
- Past participle agreement with *avoir* + COD antéposé (recurring TCF pitfall).
- *Tout* — adv (invariable) vs adj (variable) — exam-favorite.
- *Quel/lequel* — choice and gender/number agreement.

---

## 8. Audit (`PHASE_5_AUDIT.md`)

- [ ] Random 15 prompts (5 per tâche): you (Claude Code) write a quick draft for each yourself, score it with the tool, compare to your intuitive band. Discrepancies > 1 band → fix the tool's thresholds.
- [ ] All 90 model answers re-read; verify no calque, no invented idioms, no register break.
- [ ] Anti-error register: each entry verified against a normative source (Grevisse / Riegel).
- [ ] Pivot phrases: each phrase used in a search of recent French press to verify naturalness; if no results in serious French sources, the phrase is flagged.

---

## 9. Evaluate (`PHASE_5_EVAL.md`)

- [ ] 30 prompts × 3 tâches = 90 prompt files.
- [ ] 3 model answers per prompt = 270 model texts, all audited.
- [ ] 36 templates with 3 instantiations each = 108 worked examples.
- [ ] Pivot library ≥ 200 phrases, classified.
- [ ] Anti-error register ≥ 50 entries.
- [ ] `score_writing.py` calibration ≥ 80% agreement with model labels.
- [ ] Cross-references: every prompt links to ≥ 1 grammar unit and ≥ 1 thematic vocab unit.

Hand-off to Phase 6 (Speaking): tâche 3 prompts and stimulus documents may be re-used; phonological criteria join the rubric.

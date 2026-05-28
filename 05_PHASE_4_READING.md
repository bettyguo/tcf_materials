# 05 — PHASE 4: READING BANK
## 60+ authentic-style texts · MCQ · distractor rationale · vocabulary extraction

> **Output: ~60 reading items mirroring the TCF CE question typology, distributed across CEFR levels per exam weighting. Acceptance gate: CE mini-mock yields a defensible NCLC estimate; ≤ 2% of items flagged by audit; lexical density per item matches level target.**

---

## 1. Goal

The reading section is where the learner has the most control (it's the only section without time pressure on a per-item basis — you have 60 min for 39 items, ≈ 92 s/item). It is also the section most amenable to targeted improvement: reading speed and inferential reading are trainable in 12 weeks. The bank delivers:

1. 60 items spanning the 6 CEFR levels per the TCF weighting.
2. Authentic-source-inspired texts (not copied — see fair use note).
3. MCQ that tests the same skills as TCF (literal, inferential, lexical, structural, attitudinal).
4. Distractor design discipline (each distractor traceable to a specific cognitive pitfall).
5. Vocabulary harvest (each text exports ~5 high-yield items to Anki).
6. Reading-speed training pacing markers.

---

## 2. TCF CE question typology (every item declares its type)

1. **A1–A2 — Texte court informatif** (60–120 mots): announcement, email, SMS, menu, schedule. Q: literal fact.
2. **A2–B1 — Texte court explicatif** (120–200 mots): blog post excerpt, product description, simple article. Q: main idea + one detail.
3. **B1–B2 — Article informatif** (200–350 mots): journalistic article, factual report. Q: main idea, supporting detail, paraphrase, vocabulary-in-context.
4. **B2 — Article argumentatif ou analytique** (300–450 mots): opinion piece, analytical column, interview excerpt. Q: thesis, secondary claims, author stance, lexical inference.
5. **B2–C1 — Texte critique ou éditorial** (350–500 mots): book review, editorial, long-form analysis. Q: structural moves (concession → counter-claim), implied author position, rhetorical function of a paragraph.
6. **C1 — Texte spécialisé** (400–600 mots): science vulgarisation, social science, philosophical essay. Q: argument structure, presupposition, implication.
7. **C2 — Texte littéraire ou pastiche** (300–500 mots): excerpt of contemporary literary prose, parody, ironic essay. Q: tone, irony, intertextual reference, voice.

### Distribution (60 items)

- 6 × type 1
- 9 × type 2
- 12 × type 3
- 15 × type 4 — heaviest tier
- 9 × type 5
- 6 × type 6
- 3 × type 7

---

## 3. Per-item file template

```markdown
---
id: ce-b2-031
title: "Compréhension écrite — B2 type 4 — Le télétravail, à quel prix ?"
section: reading
cefr: B2
nclc_target: 7
question_type: 4
estimated_minutes: 10
word_count: 412
lexical_density: 0.58       # content_words / total_words; B2 target ≈ 0.55–0.62
sources: ["[lemonde2024_teletravail_009]", "[ledevoir2025_bureauxvides]"]
tags: [travail, organisation, économie]
prerequisites: [vocab-travail-01, gram-b2-09]
audit: { status: pending, confidence_overall: high, notes: "" }
---

# Compréhension écrite — B2 type 4

## Consigne
Lisez le texte une fois (lecture rapide, ~3 min), puis répondez aux 5 questions sans relecture intégrale.

## Texte

**Le télétravail, à quel prix ?**

[…texte de 400–450 mots, écrit dans la voix d'un éditorialiste, avec une thèse, deux contre-arguments à concéder, une réfutation, une ouverture. La densité lexicale doit atteindre B2 — voir le calculateur dans `tools/measure_density.py`.]

## Questions (5 items, format TCF)

### Q1. Quelle est la thèse principale de l'auteur ?
- [ ] A. …
- [x] B. …
- [ ] C. …
- [ ] D. …

### Q2. Le terme « désaffection » au paragraphe 3 signifie ici…
[lexical-in-context question — tests B2 nuance]

### Q3. Le paragraphe 4 fonctionne comme…
[structural function question — tests B2/C1 awareness of argument architecture]

### Q4. Quelle nuance distingue l'argument de l'auteur de celui qu'il attribue à ses opposants ?
[inferential / attitudinal question]

### Q5. L'auteur termine son texte par une question. Cette stratégie sert à…
[rhetorical-function question]

## Corrigé détaillé

### Q1 — B
**Pourquoi B.** [explication ancrée dans le texte avec citation, ≤ 2 lignes]
**Pourquoi pas A.** [piège : confond thèse et illustration]
**Pourquoi pas C.** [piège : généralise trop]
**Pourquoi pas D.** [piège : reprend un mot du texte mais en propose un sens contraire]

### Q2 — A
**Glose.** *Désaffection* = perte d'intérêt, de fidélité (≠ *désaffectation* = mise hors service, faux ami français).

### Q3 — …

## Vocabulaire à exporter en Anki

- la désaffection (n.f.) — distinct de *désaffectation*
- enclin à (adj. + à + n / + inf)
- entériner (v.t.) [registre soutenu, à utiliser en EE]
- une mise en demeure
- (collocation argumentative) il serait illusoire de croire que…

## Repères de vitesse

- Lecture cible : 3 min 30 s (≈ 120 mots/min).
- Temps total visé sur l'item : 6 min 30 s (lecture + réponses).
- Si vous dépassez 9 min : voir `strategy/ce_speed.md` (techniques de lecture survol + retour ciblé).

## Stratégie post-mortem

- Q1 raté → erreur structurelle ; revoir `strategy/ce_thesis_extraction.md`.
- Q2 raté → lacune lexicale ciblée ; reviser `vocab/thematic/01_travail.md`.
- Q3 raté → conscience du discours argumentatif ; revoir `gram/c1_advanced/07_connecteurs_c1.md`.
```

---

## 4. Authoring protocol (apply to every reading item)

1. **Choose the seed source**: locate an authentic French text (Le Devoir, Le Monde, La Presse, Libération, Le Figaro, France Culture web pieces, scientific vulgarisation from *Pour la Science*, *Cerveau & Psycho*, *Le Monde Diplomatique*). Note: copying text is fair-use-bounded; the corpus contains *original* texts inspired by sources, not source text itself.
2. **Compose original text** in the voice and register of the seed source. Match:
   - Paragraph structure of an authentic editorial / report.
   - Density of subordination (B2 ≈ 1.2 subordinates/sentence; C1 ≈ 1.8; C2 ≈ 2.5).
   - Connector richness (B2: 4–6 logical connectors per text; C1: 8–12).
   - Tense diversity (B2 texts use ≥ 4 tense forms; C1 add conditional + subjunctive routinely; C2 may use passé simple in narrative).
3. **Distractor-first MCQ design** (counterintuitive but more reliable than answer-first):
   - Start by listing 4 plausible misreadings of the paragraph the question targets.
   - Pick the misreading that's most defensible-but-wrong; that's distractor 1.
   - Then craft the correct option to be unambiguously supported by the text.
   - Test: ask yourself, "If a B1 learner picked B (the correct answer), but a B2 learner could pick A (a distractor), what trap am I setting?" If the trap is fair (tests a real reading skill), keep it. If it's just lexical lottery, discard.
4. **Length and density discipline**: enforce via `tools/measure_density.py`:
   - Token count within ±10% of the level target.
   - Lexical density within the level band.
   - Type-token ratio (TTR) within the level band (B2: 0.42–0.50; C1: 0.50–0.58).
   - Average sentence length within the level band.
   - If any metric is out, rewrite or move the item to a different level.
5. **Audit**: same protocol as Phase 3. Random sample of 10 items per level for native-style verification. Specific check: does any distractor accidentally also work? (The single most common bank-quality failure.)

---

## 5. Reading-speed training (separate file)

`content/04_reading/00_speed_training.md`:

A standalone protocol the learner runs 3× per week:

- **Pacing drill**: 5 short B1 texts back-to-back, 60 s each, accuracy ≥ 80%.
- **Survol training**: read a B2 text in 90 s, then answer 2 gist questions (gist = thesis + main move).
- **Retour ciblé training**: read questions first, then scan text for keywords, then answer. Practice the scan-and-locate sub-skill.
- **Eye-tracking proxy**: chunk a paragraph mentally into noun-phrase + verb-phrase + complement units; avoid word-by-word.
- **Speed log**: weekly self-recorded WPM; target trajectory: week 1 = ~90 WPM, week 8 = ~140 WPM, week 12 = ~160 WPM.

---

## 6. Distractor-anatomy reference (one-pager)

`content/04_reading/00_distractor_anatomy.md`:

A taxonomy of the distractor patterns TCF uses, with one worked example each:

1. **Le mot-piège** — un mot du texte apparaît dans une option, mais dans un autre rapport sémantique.
2. **La généralisation abusive** — l'option transforme une affirmation locale en thèse globale.
3. **Le contraire littéral** — l'option inverse un quantifieur ou une négation discrète.
4. **L'inférence non garantie** — l'option propose une conclusion plausible mais non étayée.
5. **Le faux degré** — l'option modifie le degré (*toujours* ≠ *souvent*, *certains* ≠ *la plupart*).
6. **L'attribution glissante** — l'option attribue à l'auteur une thèse qu'il rapporte sans la défendre.
7. **Le faux-ami français** — *éventuellement* (= possibly) vs *finalement*; *définitivement* (= once and for all) vs *certainement*.

The learner who has internalised this taxonomy can recognise the trap-type at sight, which is worth ~30 raw points.

---

## 7. Audit (`PHASE_4_AUDIT.md`)

- [ ] Random 10-item sample at each of levels B1/B2/C1: for each item, an independent reading by you (Claude Code), answering blind, then comparing. If your first-pass answer ever differs from the key on defensible grounds, the item is broken.
- [ ] Density/length metrics in spec for ≥ 95% of items.
- [ ] No copyrighted text reproduced; all source citations point to inspiration, not extraction.
- [ ] Distractor-anatomy distribution: no item has > 2 distractors of the same type (avoid monotony).
- [ ] Vocabulary harvest target: ≥ 5 high-yield items per text feeding the Anki deck.

---

## 8. Evaluate (`PHASE_4_EVAL.md`)

- [ ] 60 reading items shipped at the specified distribution.
- [ ] Reading-speed training file complete with self-tracking template.
- [ ] Distractor-anatomy reference complete.
- [ ] Cross-reference graph: every reading item links to its thematic vocab unit and at least one grammar unit (forward-link, helps the learner remediate after mistakes).
- [ ] CE mini-mock (e.g., a curated 10-item subset of B1–B2 items under 25-min time pressure) is reproducible.

Hand-off to Phase 5 (Writing): the reading items will provide the "stimulus document" for EE tâche 3 prompts in Phase 5. Tag a subset of B2/C1 reading items with `usable_as_stimulus: true` to support that lookup.

---
id: mock-diagnostic-template
title: "Diagnostic post-mock — gabarit à remplir"
section: mock
cefr: B2
nclc_target: 7
estimated_minutes: 30
register: france
tags: [mock, diagnostic]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Gabarit auto-administré ; pas de production de français à risque (formulaire copier-coller)."
---

# Diagnostic post-mock — gabarit

> Copier-coller ce fichier sous `mock_XX/10_post_mock_diagnostic.md`, remplir dans les 48 h qui suivent le mock. Budget : 30 min, pas plus. Le but n'est pas l'auto-flagellation : c'est de produire **trois axes** mesurables et un bloc `REBALANCE` à coller dans `ROADMAP.md`.
>
> Lis d'abord `00_diagnostic_protocol.md` si c'est ton premier diagnostic.

---

## 1. Métadonnées

- **Mock n°** : ____
- **Date du mock** : ________
- **Date du diagnostic** : ________ (idéalement J+1 ou J+2)
- **Conditions respectées** (timer, pas de pause hors planning, pas de dictionnaire) : oui / partiellement / non — _commentaire :_ ________

---

## 2. Scores bruts → CEFR → NCLC

Calculé via :

```
python -m tools.calculate_score --co <CO_raw_sur_699> --ce <CE_raw_sur_699> --ee <EE_sur_20> --eo <EO_sur_20>
```

| Section | Bonnes / Total | Brut (CO/CE) ou /20 (EE/EO) | CEFR | NCLC |
|---|---|---|---|---|
| CO | __/39 | __/699 | __ | __ |
| CE | __/39 | __/699 | __ | __ |
| EE | — | __/20 | __ | __ |
| EO | — | __/20 | __ | __ |

- **NCLC minimum** (note qui lie) : ____
- **Bonus CRS éligible** (NCLC ≥ 7 partout) : oui / non
- **Gap au seuil NCLC 7** (si applicable) : ___ bande(s) sur la section ___

---

## 3. CO — tally par bande CEFR

Recopier la rubrique de difficulté depuis `05_answer_key_co.md` (colonne « CEFR cible » de chaque item). Une coche par item correct.

| Bande CEFR | Items du mock | Corrects | % | Notes / patterns observés |
|---|---|---|---|---|
| A1 | __ | __ | __% | |
| A2 | __ | __ | __% | |
| B1 | __ | __ | __% | |
| B2 | __ | __ | __% | |
| C1 | __ | __ | __% | |
| C2 | __ | __ | __% | |

**Lecture** : la première bande dont le % chute sous 60 % marque ton plafond CO actuel.

---

## 4. CE — tally par bande CEFR

| Bande CEFR | Items du mock | Corrects | % | Notes / patterns observés |
|---|---|---|---|---|
| A1 | __ | __ | __% | |
| A2 | __ | __ | __% | |
| B1 | __ | __ | __% | |
| B2 | __ | __ | __% | |
| C1 | __ | __ | __% | |
| C2 | __ | __ | __% | |

**Lecture** : même règle que CO. Si CE chute deux bandes avant CO, tu lis mal sous chrono (stratégie) ; si CE chute après CO, ton oreille est ton goulot.

---

## 5. Erreurs CO + CE — répartition par type

Reporter, pour chaque item raté, **le type d'erreur** et **la catégorie de distracteur** déclarée dans le corrigé (`<!-- DISTRACTOR: cat=X,Y,Z -->`).

### 5.1 Erreurs par type

| Type d'erreur | CO (n) | CE (n) | Total | Commentaire |
|---|---|---|---|---|
| Lexicale (mot inconnu / faux sens) | __ | __ | __ | |
| Inférentielle (déduction trop large ou trop étroite) | __ | __ | __ | |
| Détail (info présente mais non repérée) | __ | __ | __ | |
| Pragmatique (intention/ironie/ton manqués) | __ | __ | __ | |
| Lapsus mécanique (mauvaise case cochée) | __ | __ | __ | |

### 5.2 Distracteurs qui ont mordu

| Catégorie de distracteur (cf. `09_strategy/00_distractor_anatomy.md`) | n | Exemples (item #) |
|---|---|---|
| 1. Le mot-piège (mot du source en mauvaise relation) | __ | |
| 2. Généralisation abusive (local → universel) | __ | |
| 3. Contraire littéral (négation/quantifieur inversé) | __ | |
| 4. Inférence non garantie | __ | |
| 5. Faux degré (intensité décalée) | __ | |
| 6. Attribution glissante (claim attribué au mauvais locuteur) | __ | |
| 7. Faux-ami français-anglais | __ | |

**Lecture** : la catégorie qui rassemble ≥ 3 occurrences est ta vulnérabilité dominante. Cible-la dans la section 9 (axes).

---

## 6. EE — application de la rubrique (4 critères × 5 pts = /20)

Rubrique : `content/05_writing/00_rubric.md`. Comparer chaque tâche aux modèles NCLC 7/8/9 du dossier (`07_ee_models_t1/t2/t3.md`).

### EE T1 (message court — ~ 100 mots, 15 min)

| Critère | Note /5 | Justification (1 ligne) | Modèle le plus proche (NCLC 7/8/9) |
|---|---|---|---|
| 1. Compréhension de la consigne / pertinence | __ | | |
| 2. Capacité à donner des informations / décrire | __ | | |
| 3. Capacité à interagir / formules de politesse | __ | | |
| 4. Lexique, orthographe, syntaxe | __ | | |
| **Total T1** | **__/20** | | |

### EE T2 (article / compte-rendu — ~ 200 mots, 20 min)

| Critère | Note /5 | Justification | Modèle proche |
|---|---|---|---|
| 1. Compréhension de la consigne | __ | | |
| 2. Capacité à présenter des faits | __ | | |
| 3. Capacité à exprimer pensées, sentiments, réactions | __ | | |
| 4. Lexique, orthographe, syntaxe | __ | | |
| **Total T2** | **__/20** | | |

### EE T3 (texte argumentatif — ~ 250 mots, 22 min)

| Critère | Note /5 | Justification | Modèle proche |
|---|---|---|---|
| 1. Compréhension de la consigne | __ | | |
| 2. Capacité à présenter / défendre une opinion | __ | | |
| 3. Capacité à argumenter / nuancer | __ | | |
| 4. Lexique, orthographe, syntaxe | __ | | |
| **Total T3** | **__/20** | | |

- **Note EE finale (moyenne pondérée per rubric / 20)** : __
- **Mots produits T1 / T2 / T3** : ___ / ___ / ___ (cible 100 / 200 / 250)
- **3 erreurs récurrentes** (un type d'erreur ≥ 2 occurrences sur les 3 tâches) :
  1. ________
  2. ________
  3. ________

---

## 7. EO — application de la rubrique + analyse phono

Rubrique : `content/06_speaking/00_rubric.md`. **Pré-requis** : réécouter l'enregistrement à froid (≥ 24 h après le mock) avant de noter, sous peine de surestimation.

### EO T1 (questions personnelles — 1 min 30)

| Critère | /5 | Justification |
|---|---|---|
| 1. Compréhension de la question | __ | |
| 2. Capacité à répondre / informer | __ | |
| 3. Capacité à interagir / réagir | __ | |
| 4. Lexique, phonétique, syntaxe | __ | |
| **Total T1** | **__/20** | |

### EO T2 (jeu de rôle — 2 min)

| Critère | /5 | Justification |
|---|---|---|
| 1. Compréhension de la situation | __ | |
| 2. Capacité à obtenir des informations | __ | |
| 3. Capacité à interagir avec aisance | __ | |
| 4. Lexique, phonétique, syntaxe | __ | |
| **Total T2** | **__/20** | |

### EO T3 (exposé d'opinion — 5 min, 2 min prep)

| Critère | /5 | Justification |
|---|---|---|
| 1. Compréhension du sujet | __ | |
| 2. Capacité à présenter / défendre une opinion | __ | |
| 3. Capacité à articuler / argumenter | __ | |
| 4. Lexique, phonétique, syntaxe | __ | |
| **Total T3** | **__/20** | |

### Analyse phonologique (à remplir au casque, sur l'enregistrement)

| Marqueur | Observation (oui / partielle / non) | Item où cela coûte le plus |
|---|---|---|
| Liaisons obligatoires respectées | __ | |
| « e » muets gérés (chute en finale, maintien initial) | __ | |
| Voyelles nasales nettes ([ɑ̃] vs [ɛ̃] vs [ɔ̃]) | __ | |
| Distinction [u] / [y] / [ø] | __ | |
| Distinction [ʁ] vs anglais [r] | __ | |
| Intonation montante en question / liste / explication | __ | |
| Débit > 110 mots/min sur T3 | __ | |
| Pauses pleines (« euh… ») ≤ 3 / minute en T3 | __ | |
| Calques d'intonation anglaise (stress accent) | __ | |

- **Note EO finale (moyenne /20)** : __
- **2 marqueurs phono prioritaires à corriger** :
  1. ________
  2. ________

---

## 8. Lecture stratégique : pourquoi le score est ce qu'il est

Trois questions à se poser, **en une phrase chacune** :

1. **Qu'est-ce qui m'a coûté le plus de points ?** (compétence × type d'erreur, p. ex. « CO B2 × inférence ») : ________
2. **Quel goulot prévient une montée de NCLC ?** (la compétence où je suis le plus loin de la prochaine bande) : ________
3. **Qu'est-ce qui marche déjà ?** (à ne pas casser en réallouant le temps) : ________

---

## 9. Top 3 axes pour les 14 prochains jours

Trois axes maximum. Chaque axe = un comportement mesurable + un livrable observable en 14 jours.

- **Axe 1** : ________________________________________________
  - Comportement : ________
  - Livrable : ________
  - Mesure : ________
- **Axe 2** : ________________________________________________
  - Comportement : ________
  - Livrable : ________
  - Mesure : ________
- **Axe 3** : ________________________________________________
  - Comportement : ________
  - Livrable : ________
  - Mesure : ________

---

## 10. Mappage vers le roadmap

Pour chaque axe, indiquer **le(s) fichier(s) à retravailler** dans le corpus (et donc les blocs ROADMAP à muscler).

| Axe | Fichier(s) corpus à retravailler | Bloc ROADMAP correspondant |
|---|---|---|
| 1 | ex. `content/03_listening/b2/*.md` + `content/09_strategy/01_co_strategy.md` | `co_b2_pratique` |
| 2 | ex. `content/05_writing/tache3/*.md` + `content/05_writing/00_pivots/*` + `content/05_writing/00_rubric.md` | `ee_t3_argumentation` |
| 3 | ex. `content/01_grammar/03_subjunctive.md` + `content/02_vocabulary/05_collocations.md` | `transversal_grammar_drill` |

---

## 11. Bloc REBALANCE — à coller dans `ROADMAP.md`

Format : `# REBALANCE: <slug> +<minutes>min/sem` (minutes positives = augmentation ; négatives = retrait depuis un bloc « en avance »). Le total doit rester ± neutre.

```
# REBALANCE: co_b2_pratique +30min/sem        # axe 1
# REBALANCE: ee_t3_argumentation +20min/sem   # axe 2
# REBALANCE: transversal_grammar_drill +10min/sem  # axe 3
# REBALANCE: vocab_anki_passive -30min/sem    # source : compétence en avance
# REBALANCE: ce_b1_revue -30min/sem           # source : compétence en avance
```

**Règle dure** : si la somme algébrique des REBALANCE dévie de zéro de plus de 15 min/sem, retravailler la liste avant de coller dans `ROADMAP.md` (le budget hebdomadaire est fixe à 14 h ± 30 min).

---

## 12. Décision : revue native ?

- **Cocher si vrai** : ☐ J'ai passé un mock complet sans revue native depuis 2 mocks **OU** ma confiance d'auto-notation EE/EO est < 70 %.
- Si oui : créer un ticket dans `BACKLOG.md` sous forme `[NATIVE-REVIEW] mock_XX EE-T3 + EO-T3 — confiance auto-note: ___%`.

---

## 13. Signature

- **Auteur du diagnostic** : ________
- **Prochain mock prévu (semaine ROADMAP)** : ________
- **Prochaine relecture de ce diagnostic** : J+14 (pour vérifier que les axes ont été tenus).

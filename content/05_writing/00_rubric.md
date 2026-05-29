---
id: ee-rubric
title: "EE — Grille FEI opérationnalisée"
section: writing
cefr: B2
nclc_target: 7
estimated_minutes: 20
register: france
tags: [méta, rubric, évaluation]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Document méta — décrit la grille FEI publique. Pas de production de français à risque."
---

# Grille EE opérationnalisée — décomposition examinable

> Document méta : décrit les **4 critères FEI** et leurs **bandes 0–5**, puis montre comment chaque critère est observable dans une copie réelle. Sert de référence pour l'auto-évaluation, pour les corrigés de modèles, et pour le calibrage de `tools/score_writing.py`.

Source : la fiche candidat publique du TCF (France Éducation International) décrit les 4 critères et la pondération `/20`. Les descripteurs par bande synthétisés ci-dessous croisent cette fiche, le CECRL (annexe B descripteurs B2/C1), et la convergence observée sur les copies-annales publiques.

---

## 1. Les quatre critères

Chaque tâche est notée `/20`, par 4 critères de poids égal (5 points chacun). Le score `/20` final est lu sur la grille de bande [06_PHASE_5_WRITING.md §2.5](../../06_PHASE_5_WRITING.md). Pour atteindre **NCLC 8** (visée du candidat type) il faut un score moyen ≥ 14 sur les trois tâches.

| # | Critère court | Mesure |
|---|---|---|
| C1 | **Capacité à réaliser la tâche communicative** | La copie répond-elle à la consigne ? Tous les éléments demandés sont-ils traités ? Le registre attendu est-il tenu ? |
| C2 | **Cohérence et cohésion** | La structure est-elle visible ? Les connecteurs sont-ils variés et appropriés ? Les anaphores se résolvent-elles sans ambiguïté ? |
| C3 | **Étendue et précision lexicales** | Le vocabulaire est-il varié et précis ? Les collocations sont-elles correctes ? Y a-t-il des calques ou des répétitions ? |
| C4 | **Étendue et maîtrise morphosyntaxiques** | La diversité des temps/modes est-elle suffisante ? Les accords sont-ils tenus ? La subordination est-elle utilisée à bon escient ? |

---

## 2. Descripteurs par bande (0–5 par critère)

### 2.1 C1 — Capacité à réaliser la tâche communicative

| Bande | Descripteur | Observable dans la copie |
|---|---|---|
| 5 | Tous les éléments sont traités ; le registre est tenu sans rupture ; la longueur est respectée à ±10 % ; le genre (article / lettre / essai) est parfaitement reconnu. | Tâche communicative parfaite + registre soutenu cohérent + densité argumentative juste. |
| 4 | Tous les éléments sont traités ; le registre est globalement tenu (1 légère rupture acceptable) ; longueur à ±15 %. | Les 3 bullets de la consigne ont chacun ≥ 1 phrase qui leur répond. |
| 3 | Au moins 2/3 éléments traités ; quelques ruptures de registre ; longueur à ±20 %. | Un élément éludé ou survolé ; ton qui mélange neutre et familier. |
| 2 | Un seul élément traité de façon développée ; rupture de registre claire ; longueur à ±30 %. | Hors-format en partie (longueur visiblement courte ou longue). |
| 1 | Réponse partielle, hors-genre, ou hors-sujet partiel. | Ne traite pas la situation demandée mais s'en rapproche. |
| 0 | Hors-sujet total ; rendu blanc ou langue autre que le français. | — |

### 2.2 C2 — Cohérence et cohésion

| Bande | Descripteur | Observable dans la copie |
|---|---|---|
| 5 | Structure en paragraphes nets ; ≥ 6 connecteurs distincts dont ≥ 3 du registre soutenu ; anaphores impeccables ; aucune rupture de progression. | T2/T3 : intro / 2 corps / conclusion visibles. T1 : 3 paragraphes (motif → demande → ouverture). |
| 4 | Structure en paragraphes ; ≥ 4 connecteurs distincts dont ≥ 2 B2/C1 ; anaphores claires ; 1 transition abrupte tolérée. | Paragraphes visibles ; *cependant*, *par ailleurs*, *en revanche* utilisés. |
| 3 | Structure visible mais schématique ; 3 connecteurs ; quelques répétitions de *et / mais / donc*. | Un paragraphe par bullet de la consigne ; connecteurs basiques. |
| 2 | Phrases juxtaposées sans paragraphes ; connecteurs limités à 2 (*et*, *mais*). | Bloc continu ou retour à la ligne aléatoire. |
| 1 | Pas de structure ; pronoms qui ne se résolvent pas (qui = qui ?). | — |
| 0 | Incohérent. | — |

### 2.3 C3 — Étendue et précision lexicales

| Bande | Descripteur | Observable dans la copie |
|---|---|---|
| 5 | TTR ≥ 0,58 ; vocabulaire technique de domaine maîtrisé ; collocations natives (*enrayer un fléau*, *acuité particulière*) ; aucune répétition lexicale dans une fenêtre de 30 mots. | Mots rares justes (*nonobstant*, *eu égard à*, *un enjeu majeur*) ; aucun calque ; précision référentielle haute. |
| 4 | TTR ≥ 0,52 ; vocabulaire varié ; quelques collocations B2 (*il est crucial de*, *à l'heure où*) ; ≤ 1 répétition non motivée. | Pas de calque flagrant ; 1 mot imprécis toléré (*chose* utilisé une fois). |
| 3 | TTR ≥ 0,45 ; vocabulaire de niveau B1+ ; quelques répétitions ; 1–2 calques mineurs. | Lexique générique (*beaucoup*, *important*, *bon*) ; collocations parfois approximatives. |
| 2 | TTR ≥ 0,38 ; répétitions fréquentes ; calques visibles (*adresser un problème*, *prendre une décision* mal construit). | Substitution lexicale rare ; le mot juste manque souvent. |
| 1 | Vocabulaire de survie ; calques systématiques ; chaque substantif est repris à l'identique. | — |
| 0 | Vocabulaire incompréhensible ou hors-langue. | — |

### 2.4 C4 — Étendue et maîtrise morphosyntaxiques

| Bande | Descripteur | Observable dans la copie |
|---|---|---|
| 5 | ≥ 5 temps/modes distincts (présent, passé composé, imparfait, conditionnel, subjonctif présent, et idéalement plus-que-parfait ou subjonctif passé) ; subordination ≥ 1,5 par phrase ; aucune erreur d'accord ; inversion ou *dont* relatif utilisé. | Phrases complexes (≥ 2 subordonnées) ; subjonctif déclenché correctement après *bien que*, *il faut que*. |
| 4 | ≥ 4 temps/modes ; subordination ≥ 1,2 par phrase ; ≤ 1 erreur d'accord par 100 mots. | Subjonctif présent maîtrisé ; conditionnel utilisé pour la politesse / l'hypothèse. |
| 3 | ≥ 3 temps/modes ; subordination ≥ 1,0 ; 2–3 erreurs d'accord non bloquantes. | Phrases en moyenne d'une subordonnée ; alternance présent/passé composé. |
| 2 | 2 temps/modes ; phrases courtes (≤ 10 mots) ; erreurs d'accord répétées. | Pas de subordination régulière ; subjonctif absent ou mal employé. |
| 1 | Présent uniquement ; phrases minimales ; erreurs structurelles fréquentes. | — |
| 0 | Asyntaxique. | — |

---

## 3. Lecture du score `/20`

Somme des 4 bandes, lue sur la grille spec §2.5 :

| Score `/20` | Niveau CECRL | NCLC approx. | Interprétation candidat |
|---|---|---|---|
| 18–20 | C2 / quasi-natif | NCLC 10 | Modèle d'examen ; à viser sans s'imposer. |
| 16–17 | C1 confirmé | NCLC 9 | Cible pour les candidats Express Entry premium. |
| 14–15 | B2 fort | NCLC 7–8 | **Cible minimale viable** pour les +50 points CRS. |
| 12–13 | B2 seuil | NCLC 6 | En-dessous du palier ; pas encore acquis. |
| 10–11 | B1+ | NCLC 5 | Hors-zone ; rééxamen recommandé. |
| 8–9 | B1 | NCLC 4 | — |
| ≤ 7 | A2 ou moins | NCLC ≤ 3 | — |

**Stratégie de remédiation par critère** :

- C1 raté (tâche incomplète) → revoir les **templates** ([../00_templates/](00_templates/)) ; ils garantissent qu'aucun élément n'est oublié.
- C2 raté (cohésion faible) → revoir la **liste de connecteurs** par bande ([../00_pivots/02_introduire_argument.md](00_pivots/02_introduire_argument.md)) et la **structure en paragraphes** (templates).
- C3 raté (lexique pauvre) → revoir le **registre anti-erreurs** ([00_anti_error.md](00_anti_error.md)) + les listes **thématiques** ([../02_vocabulary/](../02_vocabulary/)).
- C4 raté (morphosyntaxe basse) → revoir les **unités de grammaire B2** ([../01_grammar/](../01_grammar/)) ; particulièrement subjonctif, accord du participe, hypothèses.

---

## 4. Auto-évaluation rapide (5 questions, 30 secondes)

Avant de soumettre une copie à `tools/score_writing.py`, posez-vous ces 5 questions :

1. **Tous les éléments de la consigne ont-ils ≥ 1 phrase qui leur répond ?** (sinon C1 ≤ 3)
2. **Y a-t-il ≥ 3 connecteurs distincts du niveau B2 (cependant, en revanche, par ailleurs, en outre, dans la mesure où) ?** (sinon C2 ≤ 3)
3. **Y a-t-il ≥ 1 phrase qui contient un verbe au subjonctif (présent ou passé) ?** (sinon C4 ≤ 3)
4. **Y a-t-il ≥ 2 paragraphes pour T2, ≥ 3 pour T3 ?** (sinon C2 ≤ 2)
5. **Le même substantif est-il répété dans une fenêtre de 30 mots ?** (si oui, C3 perd 1 point)

Si ≥ 4/5 répondent "oui correctement", le score visé `/20` est ≥ 14.

---

## 5. Calibration de `tools/score_writing.py`

L'outil produit un *score heuristique* sur les 4 critères en agrégeant les métriques déterministes documentées dans [tools/scoring_rules.md](../../tools/scoring_rules.md). Sa précision est calibrée sur l'ensemble des 270 modèles : le score-tool doit retrouver la bande NCLC étiquetée du modèle dans ≥ 80 % des cas.

**Limites assumées** :
- L'outil ne juge pas la pertinence argumentative ni la justesse référentielle (un essai prétendant que la Terre est plate aurait un C3/C4 normal si la langue est correcte).
- L'outil ne lit pas les accords avec finesse (il dépend du shell-out hunspell + heuristiques basiques).
- L'outil compte les calques connus (liste close [tools/anglicisms.yaml](../../tools/anglicisms.yaml)) ; les calques inédits passent inaperçus.

L'outil sert à **comparer votre copie à vos copies précédentes** (trajectoire) et **aux 3 modèles** (calibration). Pas à se substituer à un correcteur natif.

---

## 6. Référence croisée

- Spec : [06_PHASE_5_WRITING.md §2](../../06_PHASE_5_WRITING.md)
- Sujets : [tache1/](tache1/) · [tache2/](tache2/) · [tache3/](tache3/)
- Outils : [tools/score_writing.py](../../tools/score_writing.py) · [tools/scoring_rules.md](../../tools/scoring_rules.md)
- Patrons : [00_templates/](00_templates/) · [00_pivots/](00_pivots/) · [00_anti_error.md](00_anti_error.md)

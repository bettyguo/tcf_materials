---
id: eo-rubric
title: "EO — Grille FEI opérationnalisée"
section: speaking
cefr: B2
nclc_target: 7
estimated_minutes: 18
register: france
tags: [méta, rubric, évaluation]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Document méta — décrit la grille FEI publique EO. Pas de production de français à risque."
---

# Grille EO opérationnalisée — décomposition examinable

> Document méta : décrit les **4 critères FEI EO** et leurs **bandes 0–5**, puis montre comment chaque critère est observable dans une production réelle. Sert de référence pour l'auto-évaluation, pour les corrigés des modèles, et pour le calibrage de `tools/score_speaking.py`. Mirroir EE de [05_writing/00_rubric.md](../05_writing/00_rubric.md) ; le seul changement est le 4ᵉ critère, *contrôle phonologique*, propre à l'oral.

Source : la fiche candidat publique du TCF (France Éducation International) décrit les 4 critères EO et la pondération `/20`. Les descripteurs par bande synthétisés ci-dessous croisent cette fiche, le CECRL (annexe B descripteurs B2/C1 de production orale), et la convergence observée sur les enregistrements-annales publics.

---

## 1. Les quatre critères

Chaque tâche est notée `/20`, par 4 critères de poids égal (5 points chacun). Le score `/20` final est lu sur la grille de bande [07_PHASE_6_SPEAKING.md §2](../../07_PHASE_6_SPEAKING.md). Pour atteindre **NCLC 8** (visée du candidat type) il faut un score moyen ≥ 14 sur les trois tâches.

| # | Critère court | Mesure |
|---|---|---|
| C1 | **Efficacité communicative** | La consigne est-elle remplie ? T1 : les 4–5 questions obtiennent-elles l'information demandée ? T2 : le monologue est-il structuré (intro → 2–3 points → clôture) ? T3 : la prise de position est-elle claire et défendue sous relance ? |
| C2 | **Étendue et précision lexicales** | Le vocabulaire est-il varié et précis ? Les collocations sont-elles correctes ? Les fillers viennent-ils en remplacement du lexique manquant (mauvais) ou en ponctuation discursive maîtrisée (acceptable) ? |
| C3 | **Étendue et exactitude morphosyntaxiques** | Diversité des temps/modes ? Subordination ? Le subjonctif est-il déclenché en conversation (marqueur B2+) ? Le présent se substitue-t-il aux passés sous pression (piège B1) ? |
| C4 | **Contrôle phonologique** | Les 16 voyelles + les 4 nasales sont-elles distinguées ? Les liaisons obligatoires sont-elles faites ? L'intonation et la prosodie sont-elles natives (groupes rythmiques, accent final, déclaratives en descente) ? Le débit est-il stable (110–165 mots/min) ? Les fillers sont-ils sous le seuil (< 4/100 mots NCLC 8) ? |

---

## 2. Descripteurs par bande (0–5 par critère)

### 2.1 C1 — Efficacité communicative

| Bande | Descripteur | Observable dans la production |
|---|---|---|
| 5 | T1 : 5 questions distinctes, registres variés, info obtenue. T2 : structure intro / 2–3 corps / clôture impeccable, durée tenue. T3 : thèse, 2 arguments + exemples, concession-réfutation, conclusion-ouverture, défense sous relance. | Spec §3 entièrement honoré ; le candidat anticipe la relance. |
| 4 | Tous les éléments traités ; durée tenue à ±15 % ; 1 légère lourdeur structurelle tolérée. | T1 : 4 questions distinctes. T2 : 2 corps audibles. T3 : 4 sur 5 mouvements présents. |
| 3 | Au moins 2/3 éléments traités ; structure visible mais schématique ; durée à ±25 %. | Un mouvement éludé ou trop court ; relance examinateur partiellement traitée. |
| 2 | Un seul élément développé ; durée < 70 % ou > 130 % du temps cible. | T1 : 2–3 questions peu variées. T2 : monologue qui s'arrête avant le terme. T3 : thèse sans arguments. |
| 1 | Production partielle, hors-genre. | T1 : déclarations au lieu de questions. T2 : description statique sans structure. T3 : pas de prise de position. |
| 0 | Hors-sujet total ; mutisme partiel ; langue autre que le français. | — |

### 2.2 C2 — Étendue et précision lexicales

| Bande | Descripteur | Observable dans la production |
|---|---|---|
| 5 | TTR ≥ 0,52 ; vocabulaire de domaine maîtrisé ; collocations natives (*peser le pour et le contre*, *à plus d'un titre*) ; aucune répétition lexicale dans 30 mots ; ≤ 2 fillers/100 mots. | Mots rares justes ; aucun calque ; précision référentielle haute. |
| 4 | TTR ≥ 0,45 ; vocabulaire varié ; quelques collocations B2 (*il est crucial de*, *à l'heure où*) ; ≤ 1 répétition non motivée ; ≤ 4 fillers/100 mots. | Pas de calque flagrant ; 1 mot imprécis toléré (*chose* utilisé une fois). |
| 3 | TTR ≥ 0,38 ; vocabulaire de niveau B1+ ; quelques répétitions ; 1–2 calques mineurs ; ≤ 6 fillers/100 mots. | Lexique générique (*beaucoup*, *important*, *bon*). |
| 2 | TTR ≥ 0,30 ; répétitions fréquentes ; calques visibles ; ≤ 8 fillers/100 mots. | Substitution lexicale rare ; le mot juste manque souvent. |
| 1 | Vocabulaire de survie ; calques systématiques ; fillers > 8/100 mots. | — |
| 0 | Vocabulaire incompréhensible. | — |

> **Note vs EE** : la cible TTR EO est **abaissée de 0,06 par rapport à l'EE** (NCLC 8 : 0,45 EO vs 0,52 EE) car la parole produit naturellement des répétitions fonctionnelles. Les fillers sont comptés à part (C2 + C4).

### 2.3 C3 — Étendue et exactitude morphosyntaxiques

| Bande | Descripteur | Observable dans la production |
|---|---|---|
| 5 | ≥ 5 temps/modes distincts (présent, passé composé, imparfait, conditionnel, subjonctif présent ; idéalement plus-que-parfait ou subjonctif passé) ; subordination ≥ 1,3 par phrase ; aucune erreur d'accord ; ≥ 1 hypothèse complexe construite (*si j'avais su, je serais venu*). | Phrases complexes ; subjonctif déclenché spontanément après *bien que*, *il faut que*. |
| 4 | ≥ 4 temps/modes ; subordination ≥ 1,0 par phrase ; ≤ 1 erreur d'accord par 100 mots. | Subjonctif présent maîtrisé ; conditionnel pour la politesse / l'hypothèse simple. |
| 3 | ≥ 3 temps/modes ; subordination ≥ 0,8 ; 2–3 erreurs d'accord non bloquantes. | Alternance présent/passé composé. |
| 2 | 2 temps/modes ; phrases courtes (≤ 8 mots) ; erreurs d'accord répétées. | Pas de subordination régulière ; subjonctif absent. |
| 1 | Présent uniquement ; phrases minimales ; collapse vers présent même quand le passé est attendu. | — |
| 0 | Asyntaxique. | — |

> **Piège B1 le plus fréquent** : sous pression, le candidat collapse tout au présent. Toute la C3 dégringole. Le sub-protocole NCLC-8-rescue [00_program.md §3.2](00_program.md) entraîne l'alternance PC/imparfait sous timer.

### 2.4 C4 — Contrôle phonologique

| Bande | Descripteur | Observable à l'enregistrement |
|---|---|---|
| 5 | Inventaire vocalique complet (16 voyelles distinguées, dont les 4 nasales et l'opposition /ø/-/œ/) ; liaisons obligatoires faites ; intonation native (groupes rythmiques avec accent final + intonation déclarative descendante) ; débit stable 130–160 mots/min ; ≤ 2 fillers/100 mots ; pas de pause > 1,5 s. | Audio quasi-natif ; aucune ambiguïté phonémique. |
| 4 | Inventaire vocalique fonctionnel (au moins /ø/-/o/, /e/-/ɛ/, /u/-/y/, les 4 nasales) ; liaisons obligatoires faites à ≥ 80 % ; débit 110–165 mots/min ; ≤ 4 fillers/100 mots ; ≤ 2 pauses longues. | Quelques liaisons facultatives manquent ; intonation correcte. |
| 3 | Distinction des paires critiques (/ɛ̃/-/ɑ̃/) faite ≥ 70 % ; liaisons obligatoires faites à ≥ 60 % ; débit 90–110 ou 165–185 ; ≤ 6 fillers/100 mots ; 2–4 pauses longues. | Quelques ambiguïtés phonémiques ; pas de blocage de compréhension. |
| 2 | Confusions phonémiques régulières (*peu*/*peur*, *vin*/*vent*) ; liaisons manquées en série ; débit instable ; ≤ 8 fillers/100 mots. | L'examinateur doit faire un effort de compréhension. |
| 1 | Confusions phonémiques massives ; aucune liaison ; débit hachuré. | Compréhension difficile. |
| 0 | Inintelligible. | — |

> **Piège majeur T3 (formel)** : drop du *ne* négatif (*je sais pas* au lieu de *je ne sais pas*). En T1/T2 (neutre), c'est toléré ; en T3 (formel), c'est une rupture de registre qui coûte 1 point sur C4.

---

## 3. Lecture du score `/20`

Somme des 4 bandes :

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

- C1 raté (tâche incomplète) → revoir les **stratégies en 30 secondes** des prompts ([tache1/](tache1/) · [tache2/](tache2/) · [tache3/](tache3/)) ; chaque prompt force la structure.
- C2 raté (lexique pauvre, fillers nombreux) → revoir le **registre anti-erreurs EO** ([00_anti_error.md](00_anti_error.md)) + la **bibliothèque de pivots EE** réutilisable ([../05_writing/00_pivots/](../05_writing/00_pivots/)).
- C3 raté (morphosyntaxe basse) → revoir les **unités de grammaire B2** ([../01_grammar/](../01_grammar/)) ; subjonctif, accord du participe, hypothèses sont les leviers EO.
- C4 raté (phonologie / fluence) → **passer la phonologie complète** ([00_phonology/](00_phonology/)) + faire 14 jours de shadowing avant tout autre travail EO.

---

## 4. Auto-évaluation rapide (7 questions, 60 secondes)

Avant de soumettre un enregistrement à `tools/score_speaking.py`, posez-vous ces 7 questions en réécoutant :

1. **La structure du genre est-elle audible ?** T1 : 4+ questions ? T2 : intro / corps / clôture ? T3 : thèse, 2 args, concession, conclusion ?
2. **Y a-t-il ≥ 3 connecteurs distincts du niveau B2 ?** (cependant, en revanche, par ailleurs, en outre, dans la mesure où)
3. **Y a-t-il ≥ 1 verbe au subjonctif ?**
4. **Le débit est-il entre 110 et 165 mots/min ?** (compter sur 30 s, multiplier par 2)
5. **Les liaisons obligatoires sont-elles faites ?** (*les enfants* /lez‿ɑ̃fɑ̃/, *un ami* /œ̃.na.mi/)
6. **Les fillers sont-ils < 4/100 mots ?** (*euh*, *ben*, *du coup*)
7. **(T3 seul) Le *ne* négatif est-il prononcé ?**

Si ≥ 5/7 répondent "oui correctement", le score visé `/20` est ≥ 14.

---

## 5. Calibration de `tools/score_speaking.py`

L'outil produit un *score heuristique* sur les 4 critères en agrégeant les métriques déterministes documentées dans [tools/scoring_rules.md §7](../../tools/scoring_rules.md). Sa précision est calibrée sur l'ensemble des 270 modèles transcripts (270 ramenés à 27 en phase pilote) : le score-tool doit retrouver la bande NCLC étiquetée du modèle dans **≥ 75 %** des cas (cible plus basse que l'EE ≥ 80 % — la parole est plus bruitée, et la C4 transcript-only est par construction conservatrice).

**Limites assumées** (mêmes que l'EE + spécifiques à l'oral) :
- L'outil ne juge pas la pertinence argumentative.
- En mode **texte seul** (sans audio), C4 est **non évalué** ou estimé conservativement.
- L'outil ne détecte que les fillers **connus** (liste close `tools/data/fr_disfluencies.yaml`).
- La détection de confusions phonémiques par référence-diff est **grossière** : elle ne remplace pas une analyse acoustique fine.
- Whisper introduit ses propres erreurs de transcription (rendant la C4 *plus indulgente* qu'elle ne devrait l'être quand Whisper "corrige" silencieusement).

L'outil sert à **comparer votre enregistrement à vos enregistrements précédents** (trajectoire) et **aux 3 modèles** (calibration). Pas à se substituer à un examinateur natif.

---

## 6. Référence croisée

- Spec : [07_PHASE_6_SPEAKING.md §2](../../07_PHASE_6_SPEAKING.md)
- Sujets : [tache1/](tache1/) · [tache2/](tache2/) · [tache3/](tache3/)
- Phonologie : [00_phonology/](00_phonology/)
- Anti-erreurs EO : [00_anti_error.md](00_anti_error.md)
- Programme 60 jours : [00_program.md](00_program.md)
- Outils : [tools/score_speaking.py](../../tools/score_speaking.py) · [tools/scoring_rules.md §7](../../tools/scoring_rules.md)
- Symétrie EE : [05_writing/00_rubric.md](../05_writing/00_rubric.md)

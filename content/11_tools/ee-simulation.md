---
id: tools-ee-sim
title: Simulation EE — 60 min, 3 tâches (v1.4)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 60
register: france
tags: [tools, ee, simulator, timer, autosave, v1.4]
audit:
  status: cleared
  confidence_overall: high
  notes: "Simulateur EE plein format : minuteur 60 min, 3 prompts (T1 message, T2 courrier, T3 essai télétravail), navigation libre entre tâches, autosave continu. Prompts rédigés pour le corpus."
hide:
  - toc
---

# Simulation EE — 60 min, 3 tâches

> **Comme le vrai examen.** 60 min, 3 prompts, 3 zones de saisie, mots comptés en temps réel. Tout est sauvegardé en continu — fermez l'onglet, rouvrez-le, vous continuez où vous étiez (tant que le minuteur n'est pas écoulé).

!!! danger "Conditions de simulation"
    Faites cette simulation **comme le jour J** : aucune fenêtre ouverte à côté, aucun dictionnaire, aucun copier-coller. La valeur du training est dans la pression réaliste, pas dans le score.

<div class="tcf-ee-sim" data-tool="ee-sim"></div>

## Distribution de temps recommandée

| Tâche | Cible mots | Temps | Notes |
|---|---|---|---|
| T1 — message court | 60-120 | **10 min** | Lire / planifier 1 min + rédiger 7 + relire 2 |
| T2 — courrier formel | 120-150 | **20 min** | Lire / planifier 2 + rédiger 15 + relire 3 |
| T3 — essai argumentatif | 180-300 | **30 min** | Plan 5 + rédiger 22 + relire 3 |

Sur 60 min réels au TCF, beaucoup de candidats sous-dimensionnent T3. **Mettez-vous en T3 dès la 30ᵉ minute** — quitte à raccourcir T1 si nécessaire.

## Après la simulation

1. **Récupérez l'export .txt** depuis le résumé.
2. **Collez chaque tâche** dans [auto-feedback EE](ee-feedback.md) pour un retour heuristique immédiat (longueur, connecteurs B2, marques d'oralité, atténuation).
3. **Comparez** vos comptes de mots aux fourchettes officielles affichées dans le résumé.
4. **Ajoutez** vos 1-3 erreurs les plus fréquentes au [journal d'erreurs](journal.md).
5. **Refaites la même tâche** 7 jours plus tard sur un prompt différent (cf. [bank EE](../05_writing/index.md)).

## Garde-fous

- Sauvegarde continue dans `localStorage` (`tcf:ee:sim`). Si vous perdez l'onglet, votre travail est récupérable au prochain démarrage.
- Le minuteur **ne s'arrête pas** quand vous changez d'onglet — comme au vrai TCF, sortir = perdre du temps.
- Pour repartir à zéro, utilisez le bouton « Refaire » du résumé.

Voir aussi : [rubrique EE](../05_writing/00_rubric.md) · [auto-feedback EE](ee-feedback.md) · [compteur de mots](compteur-mots.md) · [pivots EE](../05_writing/00_pivots/index.md).

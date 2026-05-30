---
id: tools-tableau
title: Tableau de bord (v1.2)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 2
register: france
tags: [tools, dashboard, overview, v1.2]
audit:
  status: cleared
  confidence_overall: high
  notes: "Agrégation locale des stats : streak du jour, cartes SRS dues, erreurs dues, dernier mock, radar NCLC. Tout vient du localStorage du navigateur."
hide:
  - toc
---

# Tableau de bord

> Un coup d'œil pour savoir **quoi faire maintenant**. Toutes les données viennent de votre navigateur — rien n'est envoyé.

<div class="tcf-dashboard"></div>

## Comment lire chaque carte

- **🔥 Streak** : nombre de jours consécutifs validés. Un jour validé = au moins une action enregistrée dans un outil de pratique active.
- **🃏 SRS dues** : cartes en attente dans tous vos decks flashcards (modes, faux-amis, connecteurs).
- **📝 Erreurs dues** : entrées du [journal d'erreurs](journal.md) dont l'intervalle de revue est échu.
- **📊 Dernier mock** : scores du dernier examen blanc enregistré dans le [suivi](suivi.md).
- **Radar NCLC** : projection des 4 NCLC à partir des scores entrés dans le [calculateur NCLC](calculateur-nclc.md). La cible est NCLC 8 = niveau 8 du radar.

## Suggestions de routine

| Si vous voyez…                  | Action suggérée                                                  |
|---------------------------------|------------------------------------------------------------------|
| **0 jour de streak**            | Lancez n'importe quel drill 5 min — repartez de 1.               |
| **> 20 SRS dues**               | Une session [flashcards](flashcards.md) prioritaire.             |
| **Erreurs dues > 5**            | 5 min de revue [journal](journal.md), surtout les niveaux 0 et 1. |
| **Mock à plus de 7 jours**      | Planifiez un [partial](../07_mock_exams/partials/index.md) court.|
| **Radar asymétrique**           | Compétence creuse → la mettre comme « focus » dans [plan du jour](plan-du-jour.md). |

Voir aussi : [plan du jour](plan-du-jour.md) · [suivi des examens blancs](suivi.md) · [streak](streak.md).

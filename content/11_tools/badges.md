---
id: tools-badges
title: Badges & accomplissements (v1.3)
section: tools
cefr: B1
nclc_target: 7
estimated_minutes: 2
register: france
tags: [tools, gamification, achievements, v1.3]
audit:
  status: cleared
  confidence_overall: high
  notes: "15 badges déclenchés sur seuils mesurables : streak, SRS, scores CE/CO, EE-vert, race-record, journal d'erreurs, mocks, NCLC milestones, diversité d'outils."
hide:
  - toc
---

# Badges & accomplissements

> **Pas de leaderboard, pas de tracker.** Juste une **liste locale de jalons** que vous franchissez à mesure que vous travaillez — le tout dans votre navigateur. C'est l'**effet jauge qui se remplit** : utile parce que c'est mesurable, pas parce que c'est ludique.

<div class="tcf-badges" data-tool="badges"></div>

## Comment les badges sont déclenchés

| Badge | Déclencheur exact |
|---|---|
| 🌱 **Premier pas** | Au moins 1 jour marqué actif dans la heatmap streak. |
| 🔥 **Sept jours** | Streak actuel ≥ 7 j. |
| 🚀 **Trente jours** | Streak actuel ≥ 30 j. |
| 🃏 **Cent cartes** | Cumul `reviewed` ≥ 100 sur tous les decks flashcards. |
| 📖 **Lecteur entraîné** | Score ≥ 80 % sur un lot CE complet. |
| 🎧 **Oreille fine** | Score ≥ 80 % sur un lot CO complet. |
| ✍️ **Plume affûtée** | Tous les indicateurs verts dans [auto-feedback EE](ee-feedback.md). |
| ⚡ **Sprint maître** | Score net ≥ 12 sur une partie de [speed race](speed-race.md). |
| 📝 **Métacognitif** | 10 entrées dans le [journal d'erreurs](journal.md) avec ≥ 1 revue chacune. |
| 🎯 **Premier mock** | 1 mock enregistré dans le [suivi](suivi.md). |
| 🏁 **Mocks complets** | 4 mocks enregistrés (l'objectif du programme). |
| 🎖️ **NCLC 7 atteint** | min(CO, CE, EE, EO) ≥ 7 dans le [calculateur](calculateur-nclc.md). |
| 🏆 **NCLC 8 atteint** | min ≥ 8 (= **bonus CRS +25** sur Express Entry). |
| 👑 **NCLC 9 atteint** | min ≥ 9 (= **bonus CRS +50**). |
| 🧰 **Couteau suisse** | 10 outils distincts utilisés. |

## Aucune donnée envoyée

Tout est calculé localement à partir des clés `tcf:` de votre `localStorage`. Effacer les données du site dans votre navigateur réinitialise les badges. Pas de profil, pas de classement, pas de partage automatique.

Voir aussi : [tableau de bord](tableau.md) · [revue hebdo](hebdo.md) · [streak](streak.md) · [paramètres](parametres.md).

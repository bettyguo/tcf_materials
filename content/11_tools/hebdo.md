---
id: tools-weekly
title: Revue hebdo (v1.3)
section: tools
cefr: B1
nclc_target: 7
estimated_minutes: 2
register: france
tags: [tools, weekly, insights, planning, v1.3]
audit:
  status: cleared
  confidence_overall: high
  notes: "Calcul local sur 7 jours : jours actifs (streak:days), erreurs ajoutées et revues (errlog:items), tendance CO sur 4 derniers mocks (track:mocks). Conseils calibrés sur le pattern observé."
hide:
  - toc
---

# Revue hebdo

> **Dimanche matin = 2 minutes ici.** Une vue calibrée sur 7 jours : jours actifs, erreurs ajoutées et revues, tendance CO sur vos 4 derniers mocks. Un **conseil** est dérivé du pattern observé.

<div class="tcf-weekly" data-tool="weekly"></div>

## Comment lire chaque carte

| Composant | Sens |
|---|---|
| **7 pastilles jour** | Vos 7 derniers jours. Plein = au moins 1 action enregistrée ce jour-là (heatmap streak). |
| **N / 7 j actifs** | Volume effectif. Sous 3, le rythme est insuffisant pour la phase B2-first. |
| **+ N err** | Erreurs **ajoutées** au [journal](journal.md) cette semaine. Plus = plus d'apprentissage actif. |
| **N err revues** | Entrées du journal **dont une revue ≥ 1 a eu lieu** dans la semaine. C'est là que ça paye. |
| **Δ CO 4 derniers mocks** | Différence entre le score CO du mock le plus ancien (parmi les 4 derniers) et le plus récent. Tendance brute, à lire avec vos notes. |
| **Conseil** | Dérivé de N / 7 j actifs uniquement (les autres compteurs sont contextuels). |

## Rythme cible par phase

| Phase | Cible **N / 7** | + err / 7 | err revues / 7 |
|---|---|---|---|
| Construction (sem. 1-4) | **5-6** | 8-15 | 8-15 |
| Mocks + remédiation (sem. 5-11) | **5-6** | 10-20 | 10-25 |
| Taper (sem. 12) | 3-4 | 0-3 | 5-10 |

Voir aussi : [tableau de bord](tableau.md) · [journal d'erreurs](journal.md) · [streak](streak.md) · [suivi](suivi.md).

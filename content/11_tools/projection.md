---
title: Projection NCLC à l'examen (v1.5)
audit:
  status: cleared
  confidence_overall: high
---

# Projection NCLC à l'examen

> Combine **3 signaux locaux** — taux de jours actifs (28 derniers), trajectoire des 4 derniers mocks, écart à la cible — et projette le NCLC attendu **à la date d'examen** déclarée dans [Objectif](objectif.md).

## Modèle (transparent)

```
baseline   = moyenne NCLC des 4 derniers mocks (défaut 7)
trend      = dernier mock − premier mock (sur la fenêtre 4 mocks)
gap        = max(0, cible − baseline)
weeklyGain = activeRate(28j) × 0.07 × (gap > 0 ? 1 : 0.3)

projection = baseline + min(gap, weeklyGain × semainesRestantes) + trend × 0.3
projection = clamp(1, 10, projection)
```

Constantes (`0.07`, `0.3`) sont des **paramètres calibrés** sur le scénario standard (60-90 min/jour de pratique ciblée). Pas une mesure scientifique : un **signal d'orientation**.

## Verdicts

| Verdict | Condition | Action |
|---|---|---|
| 🟢 **Atteint la cible** | projection ≥ cible | Maintenir l'activité actuelle |
| 🟡 **À 0,5 NCLC** | projection ≥ cible − 0,5 | Intensification +1 session/sem. |
| 🔴 **Écart > 0,5** | projection < cible − 0,5 | Changer la routine ou ré-évaluer la cible |

<div class="tcf-projection"></div>

## Sources

- `tcf:goal` — date d'examen + cible NCLC (saisie dans [Objectif](objectif.md)).
- `tcf:streak:days` — taux d'activité 28 jours.
- `tcf:attempts` — historique des mocks (saisie dans [Score tracker](suivi.md)).

## Limites assumées

- Si vous n'avez **pas saisi de mocks**, la baseline est fixée à 7 par défaut. Faites au moins un mock pour calibrer.
- Le modèle **ne prédit pas** un événement défavorable (maladie, stress). Lire la projection comme une *tendance*, pas une *prophétie*.
- Les gains diminuent (par construction) à l'approche du plafond NCLC 10.

## Workflow

1. Définir la cible dans [Objectif](objectif.md).
2. Saisir chaque mock dans [Score tracker](suivi.md).
3. Maintenir l'activité quotidienne ([Heatmap 365j](annee.md)).
4. Consulter cette page **chaque dimanche** pour ajuster.

## Cross-references

- [Objectif](objectif.md) — source de la cible.
- [Score tracker](suivi.md) — saisie des mocks.
- [Revue hebdo](hebdo.md) — vue 7-jours détaillée.
- [Plan d'étude du jour](plan-du-jour.md) — exécution.
- [Calendrier .ics](calendrier.md) — synchronisation système.

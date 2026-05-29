---
id: mock-02-score-calculator
title: "Mock #2 — feuille de score (brut → CEFR → NCLC)"
section: mock
cefr: B2
nclc_target: 7
estimated_minutes: 10
register: france
tags: [mock, mock-02, score]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Feuille de score Mock #2 — distribution standard."
---

# Mock #2 — feuille de score

À remplir juste après auto-correction CO + CE et auto-évaluation EE + EO. Mêmes principes et mêmes tables de conversion que pour [Mock #1](../mock_01/09_score_calculator.md) ; la **seule différence est la distribution** : Mock #2 utilise la distribution standard (9 B1, 10 B2 au lieu de 10/9 dans Mock #1).

## 1. Comptage CO et CE par bande CEFR

### CO (39 items, distribution Mock #2 = 4/6/9/10/6/4 — standard)

| Bande | Pts/item | Items | Réussis | Pts gagnés |
|---|---:|---:|---:|---:|
| A1 | 3  | 4  | __ | __ |
| A2 | 9  | 6  | __ | __ |
| B1 | 15 | 9  | __ | __ |
| B2 | 21 | 10 | __ | __ |
| C1 | 26 | 6  | __ | __ |
| C2 | 33 | 4  | __ | __ |
| **Total** | — | **39** | **__** | **__ / 699** |

### CE (39 items, distribution identique)

| Bande | Pts/item | Items | Réussis | Pts gagnés |
|---|---:|---:|---:|---:|
| A1 | 3  | 4  | __ | __ |
| A2 | 9  | 6  | __ | __ |
| B1 | 15 | 9  | __ | __ |
| B2 | 21 | 10 | __ | __ |
| C1 | 26 | 6  | __ | __ |
| C2 | 33 | 4  | __ | __ |
| **Total** | — | **39** | **__** | **__ / 699** |

## 2. Score EE et EO

Mêmes tableaux que [Mock #1](../mock_01/09_score_calculator.md#2-score-ee-et-eo). Reporte ici tes valeurs par tâche et par critère.

| Tâche EE | C1 | C2 | C3 | C4 | /20 |
|---|---:|---:|---:|---:|---:|
| T1 | __ | __ | __ | __ | __ |
| T2 | __ | __ | __ | __ | __ |
| T3 | __ | __ | __ | __ | __ |
| Moyenne | — | — | — | — | **__/20** |

| Tâche EO | C1 | C2 | C3 | C4 | /20 |
|---|---:|---:|---:|---:|---:|
| T1 | __ | __ | __ | __ | __ |
| T2 | __ | __ | __ | __ | __ |
| T3 | __ | __ | __ | __ | __ |
| Moyenne | — | — | — | — | **__/20** |

## 3. Conversion et delta vs Mock #1

```bash
python -m tools.calculate_score --co <CO> --ce <CE> --ee <EE> --eo <EO>
```

Ensuite, **delta vs Mock #1** (l'indicateur central de Mock #2 — calibrage mi-parcours) :

| Skill | Mock #1 | Mock #2 | Δ NCLC | Δ raw |
|---|---:|---:|---:|---:|
| CO | __ | __ | __ | __ |
| CE | __ | __ | __ | __ |
| EE | __ | __ | __ | __ |
| EO | __ | __ | __ | __ |

Si Δ NCLC ≥ +1 sur tous les skills → trajectoire OK.
Si Δ NCLC = 0 sur ≥ 2 skills → triage avec [`10_post_mock_diagnostic.md`](10_post_mock_diagnostic.md).
Si Δ NCLC < 0 sur un skill → drapeau rouge, retour à la stratégie de ce skill avant nouveau mock.

## 4. NCLC global

- NCLC minimum (la note qui lie) : ___
- Bonus CRS (+50) : O / N

Puis remplis [`10_post_mock_diagnostic.md`](10_post_mock_diagnostic.md).

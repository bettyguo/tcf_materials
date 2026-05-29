---
id: mock-01-score-calculator
title: "Mock #1 — feuille de score (brut → CEFR → NCLC)"
section: mock
cefr: B2
nclc_target: 7
estimated_minutes: 10
register: france
tags: [mock, mock-01, score]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Feuille de score — gabarit chiffré ; aucune production de français à risque."
---

# Mock #1 — feuille de score

À remplir juste après auto-correction CO + CE et auto-évaluation EE + EO.

## 1. Comptage CO et CE par bande CEFR

Pour chaque bande, mets le nombre d'items réussis sur le nombre proposé. Les points par item sont donnés par la pondération officielle FEI ([`01_PROJECT_CONTEXT.md`](../../../01_PROJECT_CONTEXT.md) §1).

### CO (39 items, distribution Mock #1 = 4/6/10/9/6/4 — skew B1)

| Bande | Pts/item | Items | Réussis | Pts gagnés |
|---|---:|---:|---:|---:|
| A1 | 3  | 4  | __ | __ |
| A2 | 9  | 6  | __ | __ |
| B1 | 15 | 10 | __ | __ |
| B2 | 21 | 9  | __ | __ |
| C1 | 26 | 6  | __ | __ |
| C2 | 33 | 4  | __ | __ |
| **Total** | — | **39** | **__** | **__ / 699** |

> ⚠ Note : la distribution Mock #1 est volontairement décalée vers B1 (skew baseline « intermédiaire »). En examen réel et en Mocks #2/#3/#4, la distribution standard est 4/6/9/10/6/4 (1 B1 en moins, 1 B2 en plus). Reportez le total brut tel quel ; la table de conversion est la même.

### CE (39 items, distribution Mock #1 identique au CO)

| Bande | Pts/item | Items | Réussis | Pts gagnés |
|---|---:|---:|---:|---:|
| A1 | 3  | 4  | __ | __ |
| A2 | 9  | 6  | __ | __ |
| B1 | 15 | 10 | __ | __ |
| B2 | 21 | 9  | __ | __ |
| C1 | 26 | 6  | __ | __ |
| C2 | 33 | 4  | __ | __ |
| **Total** | — | **39** | **__** | **__ / 699** |

## 2. Score EE et EO

Note chaque tâche par critère (rubrique [`content/05_writing/00_rubric.md`](../../05_writing/00_rubric.md) et [`content/06_speaking/00_rubric.md`](../../06_speaking/00_rubric.md)).

### EE (3 tâches, score moyen → /20)

| Tâche | C1 (tâche) | C2 (cohésion) | C3 (lexique) | C4 (morpho-syntaxe) | Score /20 |
|---|---:|---:|---:|---:|---:|
| T1 | __/5 | __/5 | __/5 | __/5 | __/20 |
| T2 | __/5 | __/5 | __/5 | __/5 | __/20 |
| T3 | __/5 | __/5 | __/5 | __/5 | __/20 |
| **Moyenne** | — | — | — | — | **__/20** |

### EO (3 tâches, score moyen → /20)

| Tâche | C1 (efficacité) | C2 (lexique) | C3 (morpho-syntaxe) | C4 (phonologie) | Score /20 |
|---|---:|---:|---:|---:|---:|
| T1 | __/5 | __/5 | __/5 | __/5 | __/20 |
| T2 | __/5 | __/5 | __/5 | __/5 | __/20 |
| T3 | __/5 | __/5 | __/5 | __/5 | __/20 |
| **Moyenne** | — | — | — | — | **__/20** |

## 3. Conversion automatique

Une fois les bruts en main :

```bash
python -m tools.calculate_score \
    --co <total_CO> \
    --ce <total_CE> \
    --ee <moyenne_EE> \
    --eo <moyenne_EO>
```

ou utilise la version web embarquée dans le site MkDocs (page `calculator/` une fois le site déployé — voir `site/calculator.html` à la racine du dépôt).

## 4. Conversion CEFR / NCLC (référence rapide)

| Brut CO | CEFR | NCLC | Brut CE | CEFR | NCLC | EE/EO /20 | CEFR | NCLC |
|---:|---|:---:|---:|---|:---:|---:|---|:---:|
| 100–198 | A1 | ≤3 | 100–206 | A1–A2 | ≤4 | 0–3   | A1    | ≤3 |
| 199–330 | A2 | 4  | 207–289 | B1    | 5  | 4–5   | A1/A2 | 4  |
| 331–368 | B1 | 5  | 290–374 | B1/B2 | 6  | 6–9   | A2/B1 | 5  |
| 369–397 | B1 | 6  | 375–405 | B2    | 7  | 10–11 | B1    | 6  |
| 398–457 | B2 | 7  | 406–452 | B2    | 7  | 12–13 | B2    | 7  |
| 458–502 | B2 | 7  | 453–498 | B2    | 7  | 14–15 | B2    | 7  |
| 503–522 | B2/C1 | 8 | 499–523 | B2/C1 | 8 | 16–17 | C1    | 8/9 |
| 523–548 | C1 | 9  | 524–548 | C1    | 9  | 18–20 | C1/C2 | 10+ |
| 549–699 | C2 | 10+| 549–699 | C2    | 10+| — | — | — |

## 5. Diagnostic NCLC global

- **NCLC minimum (la note qui lie)** : ___
- **Bonus CRS** (premier-langue anglais NCLC ≥ 9 + NCLC français ≥ 7 partout) : **+50 / 0**.

Puis remplis [`10_post_mock_diagnostic.md`](10_post_mock_diagnostic.md).

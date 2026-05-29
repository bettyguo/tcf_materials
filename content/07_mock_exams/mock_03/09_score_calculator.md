---
id: mock-03-score-calculator
title: "Mock #3 — feuille de score (squelette)"
section: mock
cefr: C1
nclc_target: 8
estimated_minutes: 10
register: france
tags: [mock, mock-03, score]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Feuille de score Mock #3 — distribution skew C1."
---

# Mock #3 — feuille de score (skew C1)

Même mécanique que [`mock_01/09_score_calculator.md`](../mock_01/09_score_calculator.md) ; la distribution Mock #3 est décalée vers C1 (8 B2 + 8 C1 au lieu de 10/6).

## CO et CE (distribution Mock #3 = 4/6/7/8/8/6)

| Bande | Pts/item | Items | CO réussis | CE réussis |
|---|---:|---:|---:|---:|
| A1 | 3  | 4 | __ | __ |
| A2 | 9  | 6 | __ | __ |
| B1 | 15 | 7 | __ | __ |
| B2 | 21 | 8 | __ | __ |
| C1 | 26 | 8 | __ | __ |
| C2 | 33 | 6 | __ | __ |
| **Total** | — | 39 | __ / 699 | __ / 699 |

## EE / EO

Identique à Mock #1/2 — 4 critères × 3 tâches.

## Conversion

```bash
python -m tools.calculate_score --co <CO> --ce <CE> --ee <EE> --eo <EO>
```

## Cible Mock #3 (étirement)

Le but de Mock #3 = **vérifier que le plafond NCLC 9 est atteignable**. Si NCLC min ≥ 8 sur les 4 skills → tu peux te concentrer sur Mock #4 (répétition générale). Sinon, isoler le skill qui plafonne à 7 et accorder 50 % du temps restant à ce skill.

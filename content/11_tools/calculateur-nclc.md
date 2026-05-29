---
id: tools-calc-nclc
title: Calculateur NCLC interactif
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 3
register: france
tags: [tools, calculator, nclc, score]
audit:
  status: cleared
  confidence_overall: high
  notes: "Outil interactif. La logique de conversion brut→NCLC est dans extra.js, les seuils proviennent de l'IRCC (table FEI 2024) — voir 07_mock_exams/mock_01/09_score_calculator.md pour la table autoritative."
---

# Calculateur NCLC interactif

> Entrez vos quatre scores bruts pour voir vos **NCLC par compétence**, le **NCLC binding** (minimum des quatre) et le **bonus Express Entry** estimé. Tout est calculé en local — vos chiffres ne quittent jamais votre navigateur.

<div class="tcf-calc" data-widget="nclc">
<noscript>
<p><strong>JavaScript désactivé.</strong> Ce calculateur exige JavaScript côté navigateur. Vous pouvez utiliser la table de conversion ci-dessous à la place, ou la feuille papier dans <a href="../07_mock_exams/mock_01/09_score_calculator.md">Mock #1 — feuille de score</a>.</p>
</noscript>
</div>

## Table de conversion utilisée

### Compréhension orale et écrite (sur 699)

| Brut min | NCLC | CEFR ~ |
|---:|---:|:--|
| 549 | **10** | C2 |
| 523 | **9** | C1+ |
| 503 | **8** | C1 |
| 458 | **7** | B2+ |
| 398 | **6** | B2 |
| 369 | **5** | B1+ |
| 331 | **4** | B1 |
| 263 | **3** | A2+ |

### Expression écrite et orale (sur 20)

| Brut min | NCLC | CEFR ~ |
|---:|---:|:--|
| 18 | **10** | C2 |
| 16 | **9** | C1+ |
| 14 | **8** | C1 |
| 12 | **7** | B2+ |
| 10 | **6** | B2 |
| 7  | **5** | B1+ |
| 4  | **4** | B1 |

> Sources : tables IRCC officielles + FEI (TCF). Pour la table complète et la méthode de scoring brute par bande CEFR, voir [`Mock #1 — feuille de score`](../07_mock_exams/mock_01/09_score_calculator.md).

## Comment lire le verdict

- **NCLC binding** = le **minimum** des quatre. C'est ce que IRCC utilise pour calculer le bonus CRS Express Entry.
- **Bonus 50 pts** : NCLC français ≥ 7 **ET** anglais ≥ 9 (CLB).
- **Bonus 25 pts** : NCLC français ≥ 7 **ET** anglais entre 5 et 8.
- **NCLC 8 sur les quatre** = sécurité — si une compétence chute en examen réel, NCLC 7 reste atteint.
- **NCLC 9-10** = élargit la fenêtre Express Entry mais demande C1+ stable, généralement un tuteur humain pour l'EE/EO de niveau « excellent ».

## Limites

1. Les **seuils sont des minima** — un NCLC 8 « juste » au calculateur peut basculer en NCLC 7 si la calibration FEI bouge d'un examen à l'autre. Visez NCLC 8 « confortable » (3-5 pts au-dessus du seuil).
2. **Auto-scoring EE/EO** : si vous saisissez un score `tools.score_writing` ou `tools.score_speaking`, gardez en tête que ces outils sont calibrés ~ 81 %/85 % contre modèles, **pas contre examinateurs**.
3. Pour CRS exact (jeunesse, études, expérience, …), utilisez le [simulateur officiel IRCC](https://www.cic.gc.ca/english/immigrate/skilled/crs-tool.asp).

## Voir aussi

- [Diagnostic — feuille de route par score](../00_diagnostic/03_score_to_roadmap.md)
- [Stratégie EE](../09_strategy/03_ee_strategy.md)
- [Stratégie EO](../09_strategy/04_eo_strategy.md)
- [Outils interactifs (retour)](index.md)

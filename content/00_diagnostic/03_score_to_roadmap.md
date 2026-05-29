---
id: diag-score-roadmap
title: Diagnostic — du score à la pondération du ROADMAP
section: diagnostic
cefr: B2
nclc_target: 7
estimated_minutes: 10
register: france
prerequisites: [diag-answer-key]
tags: [diagnostic, NCLC, ROADMAP]
audit:
  status: cleared
  confidence_overall: high
---

# Du score à la pondération du `ROADMAP.md`

## 1. Conversion des scores diagnostiques en NCLC estimé

> Avertissement : ce diagnostic comporte **10 items** par section, contre 39 à l'épreuve réelle. La conversion ci-dessous est **indicative**, pas certifiante. Servez-vous-en pour pondérer votre plan d'étude, pas pour pronostiquer un score officiel.

### CO / CE (10 items)

| Bonnes réponses | CEFR approché | NCLC estimé | Lecture stratégique |
|---|---|---|---|
| 0–2 | A1 / A2 | ≤ 4 | Lacunes structurelles ; consacrer 50 % du temps à la sous-compétence concernée pendant 3 semaines. |
| 3–4 | A2 / B1 | 4–5 | Niveau seuil ; B1 consolidation prioritaire (Phase 2 grammar + Phase 3/4 banks A2-B1). |
| 5–6 | B1 / B2 | 6 | Bonne base B1, B2 fragile ; suivre le ROADMAP par défaut. |
| 7 | B2 | 7 | Cible NCLC 7 atteignable ; viser dépassement vers NCLC 8 dès Phase 5. |
| 8 | B2 / C1 | 7–8 | Stretch en vue ; ajouter +20 % d'items C1 à partir de semaine 5. |
| 9–10 | C1 | 9+ | Soyez sceptique : refaites le diagnostic à blanc dans une semaine pour confirmer ; concentrez-vous sur C2 polish dès semaine 8. |

### EE / EO (/20)

| Score | CEFR | NCLC |
|---|---|---|
| 0–3 | A1 | < 4 |
| 4–5 | A1/A2 | 4 |
| 6–9 | A2/B1 | 5 |
| 10–11 | B1 | 6 |
| 12–13 | B2 | 7 |
| 14–15 | B2 | 7 |
| 16–17 | C1 | 8/9 |
| 18–20 | C1/C2 | 9/10+ |

(Identique aux tables officielles citées dans `01_PROJECT_CONTEXT.md` §2 à la racine du dépôt.)

## 2. Pondération du ROADMAP

Notez vos quatre NCLC estimés : `(NCLC_CO, NCLC_CE, NCLC_EE, NCLC_EO)`.

**Règle de pondération**, appliquée aux blocs hebdomadaires des semaines 1 à 8 du `ROADMAP.md` :

1. Calculez `min_nclc = min(NCLC_CO, NCLC_CE, NCLC_EE, NCLC_EO)`.
2. Toute sous-compétence dont le NCLC est ≥ `min_nclc + 2` est "en avance" → **−25 %** de blocs hebdomadaires.
3. Toute sous-compétence dont le NCLC est ≤ `min_nclc + 1` est "en retard" → **+50 %** de blocs hebdomadaires (priorité absolue).
4. Le total hebdomadaire reste à 14 h ± 30 min : redistribuez le temps économisé sur les "en avance" vers les "en retard".

### Exemple concret

Diagnostic : `CO = 6, CE = 7, EE = 6, EO = 5`.
- `min_nclc = 5` (EO).
- CE (NCLC 7) est "en avance" (5+2=7) → bloc CE par défaut −25 %.
- EO (NCLC 5) est "en retard" → bloc EO +50 %.
- CO (NCLC 6) et EE (NCLC 6) sont au seuil "en retard" (5+1) → bloc EO et EE +50 %.

Concrètement, sur une semaine de 14 h :
- CO : 3,5 h × 1,5 = **5,25 h**
- CE : 3,5 h × 0,75 = **2,6 h**
- EE : 3,5 h × 1,5 = **5,25 h** → écrêté à 4 h (plafond pour éviter la fatigue d'écriture)
- EO : 3,5 h × 1,5 = **5,25 h** → écrêté à 4 h
- Différence (~1 h) → Anki + lecture libre.

## 3. Reporter dans `ROADMAP.md`

En tête du roadmap, remplissez le bloc « Diagnostic — Jour 0 » :

```
NCLC estimés : CO=__, CE=__, EE=__, EO=__
Pondération : w_co=__, w_ce=__, w_ee=__, w_eo=__
Faiblesse principale : __  (sera prioritaire jusqu'à la semaine 8)
Date du diagnostic : 2026-__-__
Date de l'examen visé : 2026-__-__
```

## 4. Quand re-passer un diagnostic ?

- Fin de **semaine 4** : mini-diagnostic CO/CE (10 items, généré en Phase 3/4, ID `diag-mid-1`).
- Fin de **semaine 8** : mock complet n° 2 (Phase 7).
- Fin de **semaine 11** : mock complet n° 4 (Phase 7).

Recalibrez la pondération à chaque jalon.

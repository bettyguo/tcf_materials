---
id: tools-tracker
title: Suivi des examens blancs
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 8
register: france
tags: [tools, tracker, mock, score, trajectory, chart]
audit:
  status: cleared
  confidence_overall: high
  notes: "Tracker stocke les entrées en localStorage uniquement. Le graphe SVG est généré côté client à partir des entrées. Export JSON disponible pour archive externe."
hide:
  - toc
---

# Suivi des examens blancs

> Notez vos résultats à chaque examen blanc (CO, CE, EE, EO) — le widget calcule votre **NCLC binding** par entrée et trace la **courbe de progression** vers la cible NCLC 7+. Tout est stocké en local ; rien ne quitte votre navigateur.

<div class="tcf-tracker" data-key="mocks"></div>

## Lecture de la courbe

- **Points verts** : NCLC binding ≥ 7 (cible Express Entry atteinte).
- **Points orange** : 5 ≤ NCLC < 7 (zone de remédiation).
- **Ligne pointillée jaune** : cible NCLC 7.
- **Au survol** : étiquette + date + NCLC.

## Calendrier conseillé v1.0

| Semaine | Quoi enregistrer | Cible NCLC |
|:--|:--|:-:|
| **S1** | Diagnostic (CO + CE partiels) | — (baseline) |
| **S5** | Mock #1 complet | 5-6 |
| **S8** | Mock #2 complet | 6-7 |
| **S10** | Mock #3 (stub v1.0 — partiels) | 7 |
| **S11** | Mock #4 (stub v1.0 — partiels) | 7-8 |
| **S12** | Réessai sur Mock #1-2 (effet maturation) | 8+ |

> Mocks #3 et #4 sont en stub à la v1.0. Utilisez les **partiels** ([`07_mock_exams/partials/`](../07_mock_exams/partials/index.md)) pour calibrer ces semaines.

## Comment décider quoi pousser après chaque mock

1. Identifiez le **NCLC binding** (la compétence avec le plus bas score).
2. C'est elle que vous devez pousser **les 2 semaines suivantes**, pas la moyenne.
3. Si le binding est **CO** → renforcez sténo + dictée + [`03_listening/`](../03_listening/index.md).
4. Si le binding est **CE** → vitesse de lecture ([WPM](wpm.md)) + [`04_reading/`](../04_reading/index.md).
5. Si le binding est **EE** → templates + [`05_writing/00_templates/`](../05_writing/index.md) + [`compteur de mots`](compteur-mots.md).
6. Si le binding est **EO** → phonologie + [`06_speaking/00_phonology/`](../06_speaking/00_phonology/index.md) + dictée pour l'oreille.

## Données et confidentialité

- Stockage : `localStorage` du navigateur, clé `tcf:tracker:mocks`.
- **Export JSON** : bouton `Exporter (JSON)` → fichier `tcf-tracker.json` téléchargé localement (pour sauvegarder entre machines / navigateurs).
- **Suppression** : `↺ Vider` efface tout immédiatement.
- **Aucun serveur** ne reçoit jamais ces données.

## Voir aussi

- [Calculateur NCLC interactif](calculateur-nclc.md)
- [Feuille de score Mock #1 (gabarit chiffré)](../07_mock_exams/mock_01/09_score_calculator.md)
- [Diagnostic — feuille de route par score](../00_diagnostic/03_score_to_roadmap.md)
- [Retour aux outils](index.md)

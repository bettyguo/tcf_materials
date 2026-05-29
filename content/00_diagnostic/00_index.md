---
id: diag-index
title: Diagnostic — mode d'emploi
section: diagnostic
cefr: B2
nclc_target: 7
estimated_minutes: 5
register: mixed
audit:
  status: cleared
  confidence_overall: high
---

# Diagnostic — mode d'emploi

Cette page explique **comment** passer le diagnostic. Le test lui-même se trouve dans [01_diagnostic_test.md](01_diagnostic_test.md). Le corrigé est dans [02_answer_key.md](02_answer_key.md). La conversion en NCLC et la pondération de votre `ROADMAP.md` sont dans [03_score_to_roadmap.md](03_score_to_roadmap.md).

## Pourquoi ?

Vous vous déclarez B1, mais « B1 » couvre un spectre large et vos quatre sous-compétences (CO, CE, EE, EO) sont rarement homogènes. Le diagnostic mesure chacune indépendamment pour pondérer les blocs des semaines 1 à 8.

## Conditions matérielles

- 70 minutes ininterrompues. Téléphone en mode avion.
- Casque audio pour la CO (les enregistrements TTS sont dans `audio/diag-co-NN.mp3` après `python -m tools.cli build-audio`).
- Chronomètre (téléphone ou minuteur de cuisine).
- Feuille blanche et stylo pour brouillon de l'EE.
- Micro pour l'EO (enregistrement sur téléphone ou Voice Memos suffit). Whisper ou équivalent pour transcription après coup.

## Ordre et minutage

| Bloc | Durée | Format | Notes |
|---|---|---|---|
| Compréhension orale (CO) | 10 min | 10 items × ~50 s d'audio chacun + 4 choix | Une seule écoute par item. Pas de pause. |
| Compréhension écrite (CE) | 15 min | 10 textes courts (80–250 mots) + 1 question / texte | Vous pouvez relire. |
| Expression écrite (EE) | 20 min | 1 sujet B2, 130–150 mots | Brouillon non noté ; rédigez directement en deuxième moitié. |
| Expression orale (EO) | 5 min | 1 sujet B2 monologué (2–3 min après 30 s de préparation) | Enregistrez. |
| Auto-évaluation EE + EO | 10 min | Comparer à la grille fournie | Soyez sévère ; mieux vaut sous-estimer. |
| Calcul des scores et lecture du tableau | 10 min | — | Reportez les chiffres dans `ROADMAP.md` (premier bloc). |
| **Total** | **70 min** | | |

## Règles d'honnêteté

- Ne consultez pas le corrigé avant d'avoir terminé.
- Ne révisez **pas** la veille — le diagnostic mesure votre niveau **actuel**, pas votre niveau de pointe.
- Si vous hésitez en CO/CE, répondez quand même : sur les 39 items réels, deviner reste meilleur que ne rien cocher.

Quand tout est prêt : ouvrez [01_diagnostic_test.md](01_diagnostic_test.md).

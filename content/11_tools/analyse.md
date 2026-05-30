---
title: Analyse des schémas d'erreur (v1.5)
audit:
  status: cleared
  confidence_overall: high
---

# Analyse des schémas d'erreur

> Lit votre [journal d'erreurs](journal.md), **regroupe par compétence** (CO/CE/EE/EO/Grammaire/Vocab/Phono), détecte les **schémas récurrents** (PC vs imparfait, genre, pronoms, liaison, subjonctif, connecteur, faux-ami), et **suggère l'outil** qui draine la faiblesse dominante.

## Comment ça marche

1. À chaque entrée `(faux, correct, skill)` ajoutée au journal, l'analyseur applique 7 regex de **détection de pattern** sur la chaîne `faux + correct`.
2. Le top-pattern + top-skill sont remontés.
3. Une **recommandation d'outil** est attachée — pas un conseil générique, un lien direct.

<div class="tcf-mistake-analyze"></div>

## Patterns détectés

| Pattern | Heuristique |
|---|---|
| PC vs imparfait | `\bw+ait\b` ou `\bj'ai w+é\b` |
| Genre nom | `\b(le\|la\|un\|une\|du\|de la\|des)\s+\w+` |
| Pronoms y/en | `\b(y\|en\|lui\|leur)\b` |
| Liaison | présence d'underscore (notation `_`) |
| Subjonctif | `que w+ (soit\|aie\|ait\|sache\|puisse\|fasse)` |
| Connecteur | mots de la liste `cependant`, `néanmoins`, etc. |
| Faux ami | mots de la liste `actuellement`, `éventuellement`, `sensible`, etc. |

Les heuristiques sont **délibérément simples** : la précision compte plus que le rappel pour le suggérer-d'outil. Un faux positif fait perdre 1 clic ; un faux négatif fait perdre 1 semaine.

## Décision : quel outil pour quel manque ?

| Compétence | Outils suggérés |
|---|---|
| **CO** | [CO entraîneur](co-entraineur.md) · [paires minimales](minimal-pairs.md) · [dictée CO](co-dictee.md) |
| **CE** | [CE entraîneur](ce-entraineur.md) · [WPM](wpm.md) · [synonymes](synonymes.md) |
| **EE** | [Auto-feedback EE](ee-feedback.md) · [Rubrique self-grader](ee-rubrique.md) · [cloze B2](cloze.md) |
| **EO** | [Enregistreur EO](eo-enregistreur.md) · [Shadow speaking](shadow.md) |
| **Grammaire** | [PC vs imp](passe-compose-imparfait.md) · [pronoms](pronoms.md) · [conjugaison drill](conjugaison-drill.md) |
| **Vocab** | [Genre](genre.md) · [SRS B2 noyau](revue.md) |
| **Phono** | [Liaisons](liaisons.md) · [paires minimales](minimal-pairs.md) |

## Cross-references

- [Journal d'erreurs](journal.md) — la source des données.
- [Plan d'étude du jour](plan-du-jour.md) — l'analyseur cible **quoi** ; le planner traduit en **comment**.
- [Revue hebdo](hebdo.md) — vue 7-jours complémentaire.
- [Projection NCLC](projection.md) — anticipe l'impact des corrections.

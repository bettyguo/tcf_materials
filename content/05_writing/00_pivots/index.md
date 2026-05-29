---
id: ee-pivots-index
title: "Bibliothèque de phrases-pivots EE"
section: writing
cefr: B2
nclc_target: 7
estimated_minutes: 5
register: france
tags: [méta, pivots, ressource]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Index de la bibliothèque de pivots — pas de production à risque."
---

# Phrases pivots — bibliothèque

> Banque de phrases à **mémoriser et redéployer** dans les tâches 2 et 3. La maîtrise de 30 à 50 pivots couvre la quasi-totalité des besoins rhétoriques en EE.

Chaque fichier est organisé par fonction rhétorique. Pour chaque phrase :
- le **registre** (`courant`, `soutenu`, `très soutenu`),
- le **CEFR** indicatif,
- une **note d'usage** (quand l'employer, contraintes syntaxiques, équivalent moins formel),
- une **confidence** (`high` = phrase attestée et naturelle, `medium` = correcte mais à vérifier en revue native).

| Fichier | Fonction | Cible NCLC | Phrases |
|---|---|---|---|
| [01_ouvrir.md](01_ouvrir.md) | Ouvrir un texte | 7→10 | 35 |
| [02_introduire_argument.md](02_introduire_argument.md) | Introduire un argument | 7→10 | 30 |
| [03_illustrer.md](03_illustrer.md) | Illustrer | 7→10 | 22 |
| [04_conceder.md](04_conceder.md) | Concéder | 8→10 | 26 |
| [05_refuter.md](05_refuter.md) | Réfuter | 8→10 | 26 |
| [06_nuancer.md](06_nuancer.md) | Nuancer | 8→10 | 22 |
| [07_conclure.md](07_conclure.md) | Conclure | 7→10 | 32 |
| **Total** | | | **≥ 193** |

## Mode d'emploi

1. **Lecture transversale** : parcourir l'ensemble une fois, sur 2 sessions de 30 minutes. Surligner les 5 phrases par fichier qui vous semblent les plus utilisables.
2. **Mémorisation ciblée** : 5 phrases × 7 fichiers = 35 phrases. C'est votre **inventaire actif**. Les autres restent en réserve.
3. **Redéploiement** : chaque session d'EE en entraînement, vous **devez** utiliser au moins 2 phrases-pivots distinctes. L'outil [`tools/score_writing.py`](../../../tools/score_writing.py) compte les pivots utilisés (métrique C3).
4. **Rotation** : tous les 7 jours, échanger une phrase active contre une nouvelle. Évite la sur-utilisation que les correcteurs natifs détectent.

## Anti-pattern : la sur-pivotisation

Plus de **4 pivots par 100 mots** rend la copie artificielle. Une copie d'éditorial natif en utilise généralement **2 à 3**. L'outil affiche une alerte de "saturation pivot" au-delà.

## Ancre

- Rubrique : [../00_rubric.md §2.3 C3](../00_rubric.md)
- Anti-erreurs liées : [../00_anti_error.md](../00_anti_error.md)
- Templates qui consomment ces pivots : [../00_templates/](../00_templates/)

---
title: Rubrique EE — self-grader 4 × 5 (v1.5)
audit:
  status: cleared
  confidence_overall: high
---

# Rubrique EE — self-grader 4 × 5

> Collez votre copie. L'outil calcule **un score /20 sur 4 critères** calqués sur la grille FEI réelle, avec **détails par critère**. Heuristique transparente : pas de boîte noire, pas de serveur.

## Les 4 critères (chacun /5)

| # | Critère | Indicateurs heuristiques |
|---|---|---|
| **C1** | Tâche communicative | longueur dans la cible · ≥ 3 phrases · structure visible |
| **C2** | Cohérence / cohésion | 4+ connecteurs B2 distincts · longueur moyenne 12-22 mots/phrase |
| **C3** | Étendue lexicale | TTR ≥ 55 % · ≥ 1 marque registre soutenu · 0 marque oralité |
| **C4** | Morphosyntaxe | négations complètes · subjonctif déclenché · mix PC/imparfait |

Seuils :

- **≥ 17/20** → trajectoire NCLC 9 (bonus CRS +50 si EN ≥ NCLC 9).
- **14-16/20** → trajectoire NCLC 8 (bonus CRS +25 si toutes compétences ≥ 8).
- **< 14/20** → corrections requises avant l'examen.

<div class="tcf-ee-rubric"></div>

## Différence avec [Auto-feedback EE](ee-feedback.md)

| | Auto-feedback EE | Rubrique self-grader |
|---|---|---|
| Sortie | verdict global ok/warn/bad | score /20 décomposé en 4 critères |
| Niveau de granularité | macro | micro (par critère) |
| Utilité | rapide, en cours de rédaction | post-rédaction, calibration |
| Sauvegarde | non | brouillon autosave |

Les deux sont complémentaires. Workflow :

1. Rédiger en consultant **Auto-feedback EE** en continu.
2. Quand satisfait, soumettre au **self-grader** pour la photo finale.
3. Si C3 < 4 : revoir [synonymes B2](synonymes.md) + [connecteurs](connecteurs.md).
4. Si C4 < 4 : revoir [drill PC vs imparfait](passe-compose-imparfait.md) + [pronoms](pronoms.md).
5. Re-soumettre en variante.

## Limites assumées

- C1 ne juge pas le **contenu** (un essai hors-sujet bien construit peut scorer haut). À soumettre à un humain pour la calibration finale.
- C3 ne distingue pas un mot soutenu *bien utilisé* d'un mot soutenu *mal utilisé*.
- C4 utilise des regex : un faux positif est possible (ex. : `étais` détecté comme imparfait dans une citation).

## Stockage

- Brouillon autosauvegardé dans `tcf:ee:rubric:draft` (effaçable depuis l'outil ou `Paramètres → Tout effacer`).

## Cross-references

- [Simulation EE 60 min](ee-simulation.md) — copie en conditions réelles.
- [Auto-feedback EE](ee-feedback.md) — verdict global rapide.
- [Pivots EE](../05_writing/00_pivots/index.md) — inventaire des connecteurs C2/C3.
- [Templates EE](../05_writing/00_templates/index.md) — structures par tâche.
- [Anti-erreurs EE](../05_writing/00_anti_error.md) — registre des fautes pénalisées.

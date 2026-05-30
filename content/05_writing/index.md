---
id: writing-index
title: Expression écrite — vue d'ensemble
section: writing
cefr: B2
nclc_target: 7
estimated_minutes: 2
register: france
audit:
  status: cleared
  confidence_overall: high
---

# Expression écrite (EE)

3 tâches en 60 min, scorées /20 sur 4 critères (FEI) :
1. Capacité à remplir la tâche communicative.
2. Cohérence / cohésion.
3. Étendue et maîtrise lexicale.
4. Étendue et maîtrise morphosyntaxique.

| Tâche | Ancrage CEFR | Longueur | Genre | Dossier |
|---|---|---|---|---|
| Tâche 1 | B1 | 60–120 mots | message (demande, invitation, réclamation) | `tache1/` |
| Tâche 2 | B2 | 120–150 mots | article / lettre formelle / compte rendu | `tache2/` |
| Tâche 3 | C1 | 150–180 mots | essai argumentatif | `tache3/` |

## Livré (Phase 5 close)

| Composant | État | Lien |
|---|---|---|
| Grille FEI opérationnalisée | ✅ | [00_rubric.md](00_rubric.md) |
| Registre anti-erreurs (56 entrées) | ✅ | [00_anti_error.md](00_anti_error.md) |
| Bibliothèque de pivots (≥ 193 phrases, 7 fichiers) | ✅ | [00_pivots/](00_pivots/index.md) |
| Templates (6 par tâche, 18 total + 30 instantiations) | ✅ | [00_templates/](00_templates/index.md) |
| Sujets T1 + modèles 6/8/10 | 🟡 3/30 | [tache1/](tache1/index.md) · [_queue](tache1/_queue.md) |
| Sujets T2 + modèles 6/8/10 | 🟡 3/30 | [tache2/](tache2/index.md) · [_queue](tache2/_queue.md) |
| Sujets T3 + modèles 6/8/10 | 🟡 3/30 | [tache3/](tache3/index.md) · [_queue](tache3/_queue.md) |
| Auto-scorer CLI | ✅ (calibré 81 %) | [tools/score_writing.py](../../tools/score_writing.py) |

## Mode d'emploi

1. Lire **00_rubric.md** une fois, en parallèle de la consigne d'un sujet.
2. Lire **les 6 templates de la tâche cible** ; en mémoriser 2.
3. Parcourir **les pivots** par fonction ; en sélectionner 5 par fichier comme inventaire actif.
4. Pour chaque entraînement : rédiger une copie, la soumettre à `python -m tools.score_writing draft.md`, comparer aux 3 modèles annotés.
5. Tenir un journal des fautes répétées : pointer dans **00_anti_error.md**.

## Anti-pattern : le template-zombie

Le risque d'une banque structurée comme la nôtre est l'application mécanique. **Variez** : tournez vos pivots, alternez les templates entre sessions, et au moins une copie sur trois sans regarder de template du tout.

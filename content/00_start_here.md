---
id: start-here
title: "Jour 0 — Commencez ici"
section: index
cefr: B1
nclc_target: 7
estimated_minutes: 30
register: france
tags: [onboarding, day-zero]
audit:
  status: pending
  reviewer: null
  confidence_overall: high
  notes: "Fichier d'onboarding Phase 8. À lire avant le premier jour de la ROADMAP. Aucun contenu en français risqué ; instructions opérationnelles uniquement."
---

# Jour 0 — Commencez ici

> **Bienvenue.** Ce fichier vous prend par la main pour votre Jour 0 : configurer l'environnement, prendre le diagnostic, calibrer le ROADMAP, planifier l'examen. 30 minutes en suivant la check-list ; le Jour 1 commence demain.

---

## 1. Configurer l'environnement (5 min)

Vous avez déjà cloné le dépôt. Installez les dépendances :

```bash
uv sync --extra dev
```

Vérifiez que l'audit passe :

```bash
uv run python -m tools.cli audit
```

Lancez le site localement pour pouvoir consulter le contenu dans un navigateur :

```bash
uv run mkdocs serve
# → http://127.0.0.1:8000
```

Optionnel mais recommandé : installez Anki ([anki.net](https://apps.ankiweb.net/)) si ce n'est pas déjà fait.

---

## 2. Prenez le diagnostic (90 min, à mesurer)

Ouvrez [`content/00_diagnostic/01_diagnostic_test.md`](00_diagnostic/01_diagnostic_test.md). Le test couvre :

- **CO** — 10 items chronométrés (audio + QCM). Lancez `python -m tools.cli build-audio` une fois pour générer les MP3, ou utilisez les transcripts `## SCRIPT` à voix haute par un tiers.
- **CE** — 10 items à lire et répondre (≈ 25 min cible).
- **EE** — 1 prompt T1 (message court 80 mots) et 1 prompt T2 (article 130 mots).
- **EO** — 1 prompt T1 (5 questions à poser) et 1 prompt T2 (3 min de monologue à enregistrer au dictaphone).

Bornez votre session à **90 min**. Ne consultez pas les corrigés avant la fin.

---

## 3. Notez vos scores (5 min)

Ouvrez [`content/00_diagnostic/02_answer_key.md`](00_diagnostic/02_answer_key.md). Comptez :

- bonnes réponses CO (sur 10) ; bonnes réponses CE (sur 10).
- pour EE/EO, utilisez la grille de [`content/05_writing/00_rubric.md`](05_writing/00_rubric.md) et [`content/06_speaking/00_rubric.md`](06_speaking/00_rubric.md) — auto-note `/20` par tâche.

Convertissez ensuite en NCLC estimé via [`content/00_diagnostic/03_score_to_roadmap.md`](00_diagnostic/03_score_to_roadmap.md). Notez vos quatre NCLC :

```
NCLC estimés : CO = __, CE = __, EE = __, EO = __
```

---

## 4. Calibrez le ROADMAP (5 min)

[`ROADMAP.md`](../ROADMAP.md) commence par un bloc « À remplir Jour 0 ». Ouvrez-le et remplissez :

- **Date Jour 1** : demain.
- **Date examen** : 12 semaines plus tard, ± 1 semaine. Réservez un créneau via [@tcf-quebec](https://www.fei.qc.ca/) ou [@tcf-canada-france](https://www.france-education-international.fr/) selon votre situation.
- **Pondération** : suivez `03_score_to_roadmap.md`. La règle générale : si une sous-compétence est > 1 bande NCLC en dessous de la plus forte, augmentez son poids dans la rotation hebdomadaire.
- **Faiblesse prioritaire** : la sous-compétence avec le NCLC le plus bas — c'est elle qui détermine si vous décrocherez le bonus CRS (le score retenu est le **minimum** des quatre).

---

## 5. Installez le deck Anki (5 min)

Buildez le deck :

```bash
uv run python -m tools.cli build-anki
# → flashcards/dist/tcf-canada.apkg
```

Importez-le dans Anki Desktop (`File > Import` → sélectionner le `.apkg`). Réglages recommandés (Anki 2.1+ avec FSRS activé) :

- **Nouvelles cartes/jour** : 20.
- **Révisions/jour** : ≥ 100.
- **Nombre de répétitions/réussite** : 90 % (par défaut FSRS).

Le deck contient initialement ~ 6 cartes (le sceau de la Phase 1). Il grossit au fur et à mesure que les phases 3/4/5/6 sont remplies en revue native.

---

## 6. Bloquez votre créneau quotidien (5 min)

Mettez **2 heures consécutives** dans votre calendrier, tous les jours, pour 12 semaines. Le créneau matin (avant le travail) ou soir (après) — peu importe, ce qui compte c'est la **régularité**. Plus de 7 jours non-consécutifs sautés cassent l'avantage du *spaced repetition*.

Suggestion de répartition (voir détails dans `ROADMAP.md` §Rythme par défaut) :

| Bloc | Durée |
|---|---:|
| Anki | 15 min |
| Input (écoute ou lecture graduée) | 25 min |
| Étude ciblée (grammaire ou lexique) | 30 min |
| Output (EE ou EO + auto-évaluation) | 35 min |
| Sortie active (shadowing, journal, conversation) | 15 min |
| **Total** | **2 h 00** |

---

## 7. Demain — Jour 1

Le Jour 1 commence par [`ROADMAP.md` Semaine 1](../ROADMAP.md). Vous avez maintenant :

- ✅ Un environnement fonctionnel (audit vert, site servi localement).
- ✅ Quatre NCLC estimés et une faiblesse prioritaire.
- ✅ Un ROADMAP calibré avec date d'examen et pondération.
- ✅ Un deck Anki installé avec les réglages recommandés.
- ✅ Un créneau quotidien de 2 h bloqué sur 12 semaines.

> **Avant de fermer ce fichier** : prenez 2 min pour lire `README.md` §Honest disclaimers à la racine du dépôt. Les cinq limites du corpus (TTS, auto-scoring heuristique, NCLC 10+, Québec, intensité) sont importantes à internaliser **avant** de démarrer, pas le Jour 47.

À demain. Bonne préparation.

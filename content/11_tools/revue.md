---
title: SRS adaptatif — révisions SM-2 (v1.5)
audit:
  status: cleared
  confidence_overall: high
---

# SRS adaptatif — révisions SM-2

> **Spaced repetition** côté navigateur, algorithme **SM-2 standard** (Wozniak 1990) :
> *ease factor* + *interval* + *due date* persistés par carte. Aucun serveur.

Chaque carte est notée 0–5 :

- **0–2** → *encore* → reset à 1 jour, ease ↓
- **3** → *difficile* → intervalle modeste, ease ↓ légère
- **4** → *bien* → intervalle multiplié par l'ease
- **5** → *facile* → intervalle × ease, ease ↑

L'objectif : revoir une carte **juste avant** de l'oublier. Avec 5 min/jour, vous mémorisez ~80 nouvelles cartes par mois sans effort cumulatif.

## Paquet par défaut : **B2 noyau** (50 cartes)

Le pack `b2core` couvre les pivots les plus rentables : connecteurs B2/C1, genres-pièges, faux-amis, prépositions critiques, structures dialectiques (concession-réfutation), collocations à risque (calques anglais), constructions hypothétiques, subjonctif déclenchés.

<div class="tcf-srs" data-deck="b2-core" data-source="window.TCF.decks.b2core"></div>

## Raccourcis clavier

| Touche | Action |
|---|---|
| Espace | Révéler la réponse |
| `0` | Encore (échec) |
| `3` | Difficile |
| `4` | Bien |
| `5` | Facile |

## Données

- Stockage : `localStorage.tcf:srs:b2-core` (et `tcf:srs:*` pour autres decks).
- Export JSON via bouton « Exporter JSON ».
- Effacement : `Paramètres → Tout effacer`.
- Schéma : `{ items: [{id, q, a, ef, iv, due, reps, lapses}], history: [{t, id, q}] }`.

## Cross-references

- [Flashcards classiques (paquets thématiques)](flashcards.md) — pour démarrer avec un pack ciblé.
- [Drill cloze B2](cloze.md) — recall actif des mêmes pivots dans le contexte.
- [Analyse des schémas d'erreur](analyse.md) — identifier les compétences à drainer en SRS.

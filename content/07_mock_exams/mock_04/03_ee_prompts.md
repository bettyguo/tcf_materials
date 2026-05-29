---
id: mock-04-ee-prompts
title: "Mock #4 — Expression écrite : 3 prompts (T1, T2, T3) (stub)"
section: mock
cefr: B2
nclc_target: 7
estimated_minutes: 60
register: france
tags: [mock, mock-04, ee, prompts, stub]
stub: true
audit:
  status: pending
  reviewer: null
  confidence_overall: medium
  notes: "Stub Phase 7 — prompts à sélectionner depuis pilotes #004 si promus, sinon rotation #002. À la date de scaffolding, les pilotes #004 ne sont pas encore disponibles → ce stub documente le fallback. Modèles NCLC 6/8/10 à produire séparément. Voir _queue.md §EE."
---

# Mock #4 — Expression écrite (60 min) — stub

> **Statut** : stub. À la différence de Mocks #1–#3 dont les prompts étaient les pilotes #001/#002/#003 déjà rédigés, Mock #4 dépend de la **promotion préalable** des pilotes #004 (non livrés à la date de scaffolding).

**Conditions d'examen.** Identiques à Mock #1.

## Time-share (strict)

| Tâche | Cible mots | Budget | Cumul |
|---|---|---|---|
| **T1** — courriel formel | 80–100 (selon prompt retenu) | **15 min** | 0 → 15 |
| **T2** — article ou tribune | 140–150 | **20 min** | 15 → 35 |
| **T3** — essai argumenté | 170–180 | **22 min** | 35 → 57 |
| **Relecture finale** | — | **3 min** | 57 → 60 |

## Sélection des prompts — deux scénarios

### Scénario A — pilotes #004 promus avant Mock #4 (préféré)

- T1 : `ee-t1-004` (à promouvoir depuis `content/05_writing/tache1/_queue.md`).
- T2 : `ee-t2-004`.
- T3 : `ee-t3-004`.

Avantage : prompts **inédits** par rapport à Mocks #1–#3, calibrage authentique de la performance terminale.

### Scénario B — fallback (pilotes #004 non disponibles)

Rotation depuis #002 (utilisés à Mock #2, mais avec un écart de plusieurs semaines de mémoire si Mock #4 est passé en semaine 11) :

- T1 : `ee-t1-002` (cf. [`content/05_writing/tache1/02_ee-t1-002.md`](../../05_writing/tache1/02_ee-t1-002.md)).
- T2 : `ee-t2-002` (cf. [`content/05_writing/tache2/02_ee-t2-002.md`](../../05_writing/tache2/02_ee-t2-002.md)).
- T3 : `ee-t3-002` (cf. [`content/05_writing/tache3/02_ee-t3-002.md`](../../05_writing/tache3/02_ee-t3-002.md)).

Risque : effet de mémoire si l'écart Mock #2 → Mock #4 est trop court. À ne retenir que si la production #004 n'est plus envisageable dans le calendrier.

### Procédure de matérialisation

Lorsque la décision A vs B est prise :

1. Reproduire **textuellement** les consignes des pilotes retenus dans ce fichier (comme dans `03_ee_prompts.md` de Mock #1 ou Mock #3).
2. Conserver le bloc *Rappel discipline* propre à chaque tâche.
3. Produire les modèles NCLC 6/8/10 par tâche dans `07_ee_models_t1.md`, `07_ee_models_t2.md`, `07_ee_models_t3.md` via la même prompt agent que Mock #1 avec substitution d'ID.

## Cross-references

- File de production complète : [`_queue.md`](_queue.md).
- Queues Phase 5 (suivi promotion #004) : [`content/05_writing/tache1/_queue.md`](../../05_writing/tache1/_queue.md), [`tache2/_queue.md`](../../05_writing/tache2/_queue.md), [`tache3/_queue.md`](../../05_writing/tache3/_queue.md).
- Rubrique : [`content/05_writing/00_rubric.md`](../../05_writing/00_rubric.md).
- Pivots : [`content/05_writing/00_pivots/`](../../05_writing/00_pivots/).

---
id: partials-queue
title: "Partial mocks — queue de production"
section: mock
cefr: B2
nclc_target: 7
estimated_minutes: 5
register: france
tags: [mock, partial, queue]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Queue file — enumère les partials restant à produire."
---

# Partials — queue

Pilote livré pour chaque skill (`co_partial_01.md`, `ce_partial_01.md`, `ee_partial_01.md`, `eo_partial_01.md`). 3 partials supplémentaires par skill restent à produire pour couvrir 4 semaines intermédiaires entre Mocks complets.

## Plan de rotation EE et EO (3 partials restants)

Chaque skill suit la rotation T1 → T2 → T3, puis recommence. Partial #1 déjà livré.

| Skill | Partial #1 | #2 | #3 | #4 |
|---|---|---|---|---|
| CO | 15 items, A1+A2+B1+B2+C1+C2 distribués ([`co_partial_01.md`](co_partial_01.md)) | 15 items, fresh from Phase 3 bulk (skew B2) | 15 items, fresh (skew C1) | 15 items, fresh (mix avec distracteurs maximaux) |
| CE | 15 items composés depuis Phase 4 ([`ce_partial_01.md`](ce_partial_01.md)) | 15 items depuis textes Phase 4 inutilisés (suggestion : `ce-b1-008`, `ce-b2-010`, `ce-c1-004`) | 15 items skew C1 (`ce-b2-022`, `ce-c1-008`, `ce-c1-009`) | 15 items distracteurs maximaux (sélection fine de Phase 4) |
| EE | T1 ([`ee_partial_01.md`](ee_partial_01.md)) | T2 (prompt `ee-t2-002` ou inédit) | T3 (prompt `ee-t3-002` ou inédit) | T1 (cycle 2, prompt `ee-t1-003`) |
| EO | T2 ([`eo_partial_01.md`](eo_partial_01.md)) | T3 (prompt `eo-t3-002`) | T1 (prompt `eo-t1-002`) | T2 (cycle 2, prompt `eo-t2-003`) |

## Procédure de production (par partial)

1. **CO** : authoring de 15 items inédits par fan-out (1 agent par bande) ou pull depuis la banque CO Phase 3 augmentée.
2. **CE** : composition depuis Phase 4 (3-4 textes, 15 questions). Reproduire verbatim, renuméroter.
3. **EE / EO** : un seul prompt + frontmatter ; pas de modèle inline (pratique chronométrée). Référer aux modèles existants pour auto-correction à froid.

Chaque partial doit garder l'option `audio.required: false` (CO + EO) jusqu'à la revue native.

## Calendrier suggéré (cf. `ROADMAP.md`)

| Semaine | Partial |
|---|---|
| 5 (entre Mocks #1 et #2) | EE partial #1 (T1) — déjà disponible |
| 6 | CO partial #1 + EO partial #1 (T2) — déjà disponibles |
| 7 | CE partial #1 + EE partial #2 (T2) — CE déjà ; EE à produire |
| 9 (entre #2 et #3) | EO partial #2 (T3) + CO partial #2 |
| 10 (avant #3) | CE partial #2 + EE partial #3 (T3) |
| 11 (avant #4) | EO partial #3 (T1) + CO partial #3 |

## Statut de production

- Partial #1 par skill : ✅ livré en Phase 7.
- Partials #2–#4 : ⏳ à produire avec Phase 3 bulk listening + native review (ou en exécution de mocks #3-#4 si ROADMAP le réclame plus tôt).

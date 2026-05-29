---
id: mock-03-ce-items
title: "Mock #3 — Compréhension écrite (stub)"
section: mock
cefr: C1
nclc_target: 9
estimated_minutes: 60
register: france
tags: [mock, mock-03, ce, stub]
stub: true
audit:
  status: pending
  reviewer: null
  confidence_overall: medium
  notes: "Stub Phase 7 — 39 items CE à composer depuis textes Phase 4 inédits (non consommés par Mocks #1 et #2). Sélection proposée : ce-a1-003, ce-a2-003, ce-a2-006, ce-b1-003, ce-b1-004, ce-b2-003, ce-b2-009, ce-c1-003, ce-c1-008, ce-c2-003. Voir _queue.md §CE."
---

# Mock #3 — Compréhension écrite (stub)

> **Statut** : stub. Les 39 items CE ne sont pas encore agrégés dans ce fichier.
>
> **Cible à terme** : 10 textes Phase 4 reproduits textuellement, questions renumérotées 1–39, distribution étirement C1 (4/6/7/8/8/6).

## Pourquoi un stub

Bien que les **textes** existent déjà en Phase 4 (sous `content/04_reading/`), leur **composition** en mock — sélection, renumérotation, vérification de la continuité des distracteurs, agrégation des corrigés dans `06_answer_key_ce.md` — n'est pas un copier-coller automatique : elle demande une lecture séquentielle pour éviter les doublons thématiques (deux textes sur l'environnement à la suite) et pour calibrer la difficulté progressive de la première à la dernière question.

Cette composition est déférée jusqu'à ce que :

1. Tous les textes Phase 4 listés ci-dessous soient en `audit.status: cleared` ou `pending_native` (pas `draft`).
2. L'auteur ait décidé que Mock #3 entre dans la fenêtre de préparation active.

## Sélection proposée (Phase 4 inédite)

Après consommation Mocks #1 et #2, restent disponibles : `ce-a1-003` ; `ce-a2-003, 006, 007` ; `ce-b1-003, 004, 005, 008, 009, 010, 011` ; `ce-b2-003, 004, 005, 006, 009–025` ; `ce-c1-003, 004, 005, 008–011` ; `ce-c2-003`.

**Sélection Mock #3 (étirement C1)** :

| Items mock | CEFR | Source Phase 4 |
|---|---|---|
| 1–4 | A1 | `ce-a1-003` |
| 5–6 | A2 | `ce-a2-003` |
| 7–10 | A2 | `ce-a2-006` |
| 11–13 | B1 | `ce-b1-003` |
| 14–17 | B1 | `ce-b1-004` |
| 18–21 | B2 | `ce-b2-003` |
| 22–25 | B2 | `ce-b2-009` |
| 26–29 | C1 | `ce-c1-003` |
| 30–33 | C1 | `ce-c1-008` |
| 34–39 | C2 | `ce-c2-003` |

**Règle de reproduction** : textes et corrigés **textuellement identiques** à la source Phase 4 ; seules les numérotations des questions changent ; chaque corrigé conserve son tag `<!-- DISTRACTOR: cat=X,Y,Z -->`.

Procédure détaillée : [`_queue.md`](_queue.md) §CE et §How to fill (étape 2).

## En attendant

S'entraîner texte par texte directement dans `content/04_reading/` plutôt que d'attendre l'agrégation mock.

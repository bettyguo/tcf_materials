---
id: mock-03-instructions
title: "Mock #3 — instructions (squelette + queue)"
section: mock
cefr: C1
nclc_target: 8
estimated_minutes: 5
register: france
tags: [mock, instructions, mock-03, stub]
stub: true
audit:
  status: pending
  reviewer: null
  confidence_overall: medium
  notes: "Squelette Phase 7 — items à produire après bulk Phase 3 listening + revue native. Voir _queue.md."
---

# Mock #3 — instructions (squelette + queue)

> Étirement. Cible : vérifier le plafond NCLC 9. Distribution avec skew C1 (8 B2 + 8 C1). Mock à passer fin semaine 10 selon `ROADMAP.md`.

**Conditions et discipline d'exécution : identiques au [Mock #1](../mock_01/00_instructions.md).**

## Disposition actuelle (Phase 7)

Ce mock est livré **en squelette** : les fichiers d'items existent comme stubs, et `_queue.md` enumère les contenus à produire. Raison : la banque CO de Phase 3 contient encore des stubs (51 items), insuffisants pour 4 mocks complets sans recycler. La bulk-production est gated derrière la revue native.

Pour produire ce mock une fois la banque augmentée, suivre `_queue.md`.

## Distribution CO/CE (étirement C1)

| CEFR | Items CO | Items CE |
|---|---|---|
| A1 | 4 | 4 |
| A2 | 6 | 6 |
| B1 | 7 | 7 |
| B2 | 8 | 8 |
| C1 | 8 | 8 |
| C2 | 6 | 6 |
| **Total** | **39** | **39** |

## EE et EO prompts

- EE : T1=003, T2=003, T3=003 (depuis pilotes Phases 5).
- EO : T1=003, T2=003, T3=003 (depuis pilotes Phases 6).

## Fichiers

| # | Fichier | Status |
|---|---|---|
| 00 | [`00_instructions.md`](00_instructions.md) | 🟢 |
| 01 | [`01_co_items.md`](01_co_items.md) | 🟡 stub |
| 02 | [`02_ce_items.md`](02_ce_items.md) | 🟡 stub |
| 03 | [`03_ee_prompts.md`](03_ee_prompts.md) | 🟡 stub (pointe vers ee-t1-003, ee-t2-003, ee-t3-003) |
| 04 | [`04_eo_prompts.md`](04_eo_prompts.md) | 🟡 stub (pointe vers eo-t1-003, eo-t2-003, eo-t3-003) |
| -- | [`_queue.md`](_queue.md) | 🟢 enumération à produire |
| 09 | `09_score_calculator.md` | 🟢 (lien vers tool partagé) |
| 10 | `10_post_mock_diagnostic.md` | 🟢 (lien vers gabarit partagé) |

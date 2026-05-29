---
id: mock-02-instructions
title: "Mock #2 — instructions et conditions d'examen"
section: mock
cefr: B2
nclc_target: 7
estimated_minutes: 5
register: france
tags: [mock, instructions, mock-02]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Page d'instructions — pas de production de français à risque."
---

# Mock #2 — instructions

> Calibration. Cible : NCLC 7–8 — distribution standard sans biais. Mock à passer fin semaine 8 selon `ROADMAP.md`.

**Conditions d'administration et discipline d'exécution : identiques au [Mock #1](../mock_01/00_instructions.md).** Ce qui change : les items et la distribution (centrée B2, pas de skew B1).

## Différences clés vs Mock #1

| Élément | Mock #1 | Mock #2 |
|---|---|---|
| Distribution CO | 4/6/10/9/6/4 (skew B1) | 4/6/9/10/6/4 (standard) |
| Distribution CE | 4/6/10/9/6/4 (skew B1) | 4/6/9/10/6/4 (standard) |
| EE prompts | T1=001, T2=001, T3=001 | T1=002, T2=002, T3=002 |
| EO prompts | T1=001, T2=001, T3=001 | T1=002, T2=002, T3=002 |
| Niveau de difficulté des distracteurs | calibré « pédagogique » | calibré « examen réel » |
| Score-cible diagnostique | Δ vs diagnostique semaine 1 | Δ vs Mock #1 |

## Fichiers

| # | Fichier | Contenu |
|---|---|---|
| 00 | [`00_instructions.md`](00_instructions.md) | ce fichier |
| 01 | [`01a_co_a1_a2.md`](01a_co_a1_a2.md), [`01b_co_b1.md`](01b_co_b1.md), [`01c_co_b2.md`](01c_co_b2.md), [`01d_co_c1_c2.md`](01d_co_c1_c2.md) | 39 items CO inédits, 4 part files par CEFR |
| 02 | [`02_ce_items.md`](02_ce_items.md) | 39 items CE depuis textes Phase 4 non utilisés en Mock #1 |
| 03 | [`03_ee_prompts.md`](03_ee_prompts.md) | 3 prompts EE (T1/T2/T3) — #002 |
| 04 | [`04_eo_prompts.md`](04_eo_prompts.md) | 3 prompts EO + script examinateur — #002 |
| 05 | [`05_answer_key_co.md`](05_answer_key_co.md) | corrigés CO + transcripts + catégories de distracteurs |
| 06 | [`06_answer_key_ce.md`](06_answer_key_ce.md) | corrigés CE + explications |
| 07 | [`07_ee_models_t1.md`](07_ee_models_t1.md), [`07_ee_models_t2.md`](07_ee_models_t2.md), [`07_ee_models_t3.md`](07_ee_models_t3.md) | modèles NCLC 7/8/9 |
| 08 | [`08_eo_models_t1.md`](08_eo_models_t1.md), [`08_eo_models_t2.md`](08_eo_models_t2.md), [`08_eo_models_t3.md`](08_eo_models_t3.md) | transcripts NCLC 7/8/9 |
| 09 | [`09_score_calculator.md`](09_score_calculator.md) | mapping brut → CEFR → NCLC |
| 10 | [`10_post_mock_diagnostic.md`](10_post_mock_diagnostic.md) | gabarit à remplir |

Audio CO : déféré identiquement (`audio.required: false`).

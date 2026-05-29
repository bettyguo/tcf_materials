---
id: mock-01-instructions
title: "Mock #1 — instructions et conditions d'examen"
section: mock
cefr: B2
nclc_target: 7
estimated_minutes: 5
register: france
tags: [mock, instructions, mock-01]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Page d'instructions — pas de production de français à risque."
---

# Mock #1 — instructions

> Pilote. Cible : baseline NCLC 6–7 (intermédiaire), légère pondération B1 en CO. Mock à passer fin semaine 4 selon `ROADMAP.md`.

## Conditions matérielles

- **Lieu** : pièce calme, porte fermée, téléphone en mode avion.
- **Matériel** : crayon HB + gomme + chronomètre/téléphone uniquement pour le timer + casque audio fermé. Aucun dictionnaire, aucune application IA, aucune note.
- **Identité** : prépare ta CNI/passeport sur la table — entraîne le réflexe.
- **Eau** : une petite bouteille. Pas de café après le démarrage (le pic vient après 30 min).

## Timing global (≈ 2 h 47)

| Phase | Durée | Pause après |
|---|---|---|
| Mise en place (chrono, casque, instructions à relire) | 5 min | — |
| CO — Compréhension orale (39 items, audio en continu) | 35 min | 5 min |
| CE — Compréhension écrite (39 items, 4–6 textes) | 60 min | 10 min |
| EE — Expression écrite (3 tâches sur copie) | 60 min | 5 min |
| EO — Expression orale (3 tâches enregistrées) | 12 min (dont 2 min de prep T3) | — |

**Total** : ≈ 2 h 47 (hors mise en place).

## Discipline d'exécution

1. **CO** : aucun replay autorisé. Tu cliques *play* sur l'audio maître, tu ne l'arrêtes plus. Si tu rates un item, tu coches au mieux et tu enchaînes.
2. **CE** : budget de 92 s par item. Stratégie : lire la consigne globale → scanner les questions → lecture rapide du texte → repérage des éléments. Annexe : `content/09_strategy/02_ce_strategy.md`.
3. **EE** : tu écris à la main sur une feuille de brouillon. Compte par lignes (≈ 10 mots/ligne pour le décompte rapide). Time-share : T1 = 15 min, T2 = 20 min, T3 = 22 min, **3 min de relecture finale** non négociables.
4. **EO** : tu utilises un dictaphone (téléphone : appli enregistreur, pas un assistant vocal). Tu joues les 4 tâches d'affilée en simulant l'examinateur via le `04_eo_prompts.md`. Tu réécouteras à froid 24 h plus tard pour scorer.

## Auto-correction et scoring

À la fin du mock, dans l'ordre :
1. Compter les bonnes réponses CO et CE (référence : `05_answer_key_co.md` et `06_answer_key_ce.md`).
2. Calculer le score brut sur 699 par section : `python -m tools.calculate_score --co <N_correct_CO> --ce <N_correct_CE> ...`.
3. Auto-noter EE et EO avec la grille (`content/05_writing/00_rubric.md`, `content/06_speaking/00_rubric.md`) ; comparer aux modèles NCLC 7/8/9 du dossier.
4. Remplir `10_post_mock_diagnostic.md` (gabarit) en suivant `content/07_mock_exams/00_diagnostic_protocol.md`.
5. Reporter les axes prioritaires dans `ROADMAP.md` au format `# REBALANCE: skill_X +N min`.

## Fichiers

| # | Fichier | Contenu |
|---|---|---|
| 00 | [`00_instructions.md`](00_instructions.md) | ce fichier |
| 01 | [`01a_co_a1_a2.md`](01a_co_a1_a2.md), [`01b_co_b1.md`](01b_co_b1.md), [`01c_co_b2.md`](01c_co_b2.md), [`01d_co_c1_c2.md`](01d_co_c1_c2.md) | 39 items CO + scripts (audio gated), 4 part files par CEFR |
| 02 | [`02_ce_items.md`](02_ce_items.md) | 39 items CE composés depuis 7–8 textes Phase 4 |
| 03 | [`03_ee_prompts.md`](03_ee_prompts.md) | 3 prompts EE (T1/T2/T3) |
| 04 | [`04_eo_prompts.md`](04_eo_prompts.md) | 3 prompts EO + script examinateur |
| 05 | [`05_answer_key_co.md`](05_answer_key_co.md) | corrigés CO + transcripts + catégories de distracteurs |
| 06 | [`06_answer_key_ce.md`](06_answer_key_ce.md) | corrigés CE + explications par paragraphe |
| 07 | [`07_ee_models_t1.md`](07_ee_models_t1.md), [`07_ee_models_t2.md`](07_ee_models_t2.md), [`07_ee_models_t3.md`](07_ee_models_t3.md) | modèles NCLC 7/8/9 par tâche + application rubrique |
| 08 | [`08_eo_models_t1.md`](08_eo_models_t1.md), [`08_eo_models_t2.md`](08_eo_models_t2.md), [`08_eo_models_t3.md`](08_eo_models_t3.md) | transcripts NCLC 7/8/9 par tâche + application rubrique |
| 09 | [`09_score_calculator.md`](09_score_calculator.md) | mapping brut → CEFR → NCLC pour ce mock |
| 10 | [`10_post_mock_diagnostic.md`](10_post_mock_diagnostic.md) | gabarit à remplir |

## Honest disposition

Audio CO master (`01_co_audio_master.mp3`) : **non livré en Phase 7** ; `audio.required: false` sur chaque script. Activable d'un coup une fois la revue native passée (cf. `PHASE_7_EVAL.md`).

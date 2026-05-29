---
id: reading-index
title: Compréhension écrite — vue d'ensemble
section: reading
cefr: B2
nclc_target: 7
estimated_minutes: 5
register: mixed
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Index Phase 4 — mis à jour à la livraison du bank."
---

# Compréhension écrite (CE)

39 items, 60 min, 100–699. Même logique de pondération que la CO : B1 + B2 ≈ 55 % du score, donc le bank est *intentionnellement sur-densifié* sur la zone B2 (25 items sur 60).

## Comment utiliser ce dossier

1. **D'abord** : lire [00_strategy.md](00_strategy.md) (25 min) pour acquérir le cadre — gestion des 60 min, deux modes de lecture, sept gestes du jour J.
2. **Trois fois par semaine** : un drill du [00_speed_training.md](00_speed_training.md) (25 min) pour passer de ~90 WPM à ~160 WPM en 8 semaines.
3. **Référence à garder ouverte** : [00_distractor_anatomy.md](00_distractor_anatomy.md) (pointeur vers la taxonomie partagée [content/09_strategy/00_distractor_anatomy.md](../09_strategy/00_distractor_anatomy.md)).

## Le bank — 60 items, 7 types

Distribution par type de question (cf. [05_PHASE_4_READING.md §2](../../05_PHASE_4_READING.md)) :

| Type | Description | Items | Niveau |
|---:|---|---:|---|
| 1 | Texte court informatif (annonce, email, SMS, menu) | 6 | A1–A2 |
| 2 | Texte court explicatif (blog, description produit) | 9 | A2–B1 |
| 3 | Article informatif (presse) | 12 | B1–B2 |
| 4 | Article argumentatif ou analytique | **15** | B2 |
| 5 | Texte critique ou éditorial | 9 | B2–C1 |
| 6 | Texte spécialisé (sciences, philo, sociologie) | 6 | C1 |
| 7 | Chronique, pastiche, texte ironique | 3 | C2 |

Distribution par CEFR : A1 = 3 · A2 = 7 · B1 = 11 · **B2 = 25** · C1 = 11 · C2 = 3.

## Sources d'inspiration

Paraphrasées, jamais reproduites in extenso (limite 25 mots verbatim, voir [PHASE_4_DESIGN.md §3.5 check 2](../../PHASE_4_DESIGN.md)). Outlets cités dans [references.bib](../../references.bib) : Le Monde, Le Devoir, La Presse, Libération, Le Figaro, Radio-Canada, France Culture, France Inter, RFI Savoirs, TV5MONDE Apprendre, France Éducation International, Code du travail (Légifrance).

## Cohérence cross-modale

Chaque item du bank déclare :
- `prerequisites:` ≥ 1 vocab thématique de Phase 3 + ≥ 1 grammar unit de Phase 2 (graphe de remédiation après échec).
- `question_type:` (1–7) conforme au spec.
- `word_count`, `lexical_density` (audit-validés par `python -m tools.cli measure-density --audit`).
- Pour 8 items B2/C1 retenus : `usable_as_stimulus: true` — feed la tâche 3 d'écrit (Phase 5).

## Mini-mock CE

10 items B1–B2 portent `mock_question_id: ce-mock-NN` ; ensemble, ils constituent un mini-mock CE de 25 min reproductible (cf. [05_PHASE_4_READING.md §8](../../05_PHASE_4_READING.md) EVAL gate).

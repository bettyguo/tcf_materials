---
id: mock-index
title: "Mock exams — vue d'ensemble"
section: mock
cefr: B2
nclc_target: 7
estimated_minutes: 5
register: france
tags: [mock, index, navigation]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Index page — pas de production de français à risque."
---

# Mock exams — vue d'ensemble

Quatre mocks complets + un mock partiel par compétence + un kit de diagnostic post-mock.

## Disposition (Phase 7)

| Mock | Status | Calendrier suggéré | Notes |
|---|---|---|---|
| [Mock #1](mock_01/00_instructions.md) | 🟢 Pilote — entièrement rédigé | Fin semaine 4 | Légère pondération B1 ; baseline réaliste « intermédiaire » |
| [Mock #2](mock_02/00_instructions.md) | 🟢 Calibration — entièrement rédigé | Fin semaine 8 | Distribution standard ; recalibrage mi-parcours |
| [Mock #3](mock_03/00_instructions.md) | 🟡 Squelette + queue | Fin semaine 10 | Pondération C1 — *étirement* ; à compléter une fois la banque CO Phase 3 augmentée |
| [Mock #4](mock_04/00_instructions.md) | 🟡 Squelette + queue | Fin semaine 11 | Distribution standard + distracteurs maximaux ; répétition générale |

Pour les semaines intermédiaires : [Mocks partiels par compétence](partials/index.md).

## Documents transverses

- [`00_diagnostic_template.md`](00_diagnostic_template.md) — gabarit à remplir après chaque mock complet.
- [`00_diagnostic_protocol.md`](00_diagnostic_protocol.md) — comment exploiter le diagnostic pour rééquilibrer le roadmap.
- Calcul de score : `tools/calculate_score.py` (CLI) et `site/calculator.html` (web).

## Honnête déclaration de déferrement (cf. `PHASE_7_EVAL.md`)

L'objectif initial du spec (`08_PHASE_7_MOCKS_STRATEGY.md`) prévoyait 4 mocks complets et un audio CO consolidé par mock. Phase 7 livre :
- 2 mocks complets (CO inédit, CE composé depuis Phase 4, EE/EO depuis Phases 5/6).
- 2 mocks squelette + fichiers `_queue.md` listant les items à produire.
- Audio CO : `audio.required: false` sur tous les transcripts ; activation = revue native + un flip de drapeau.

Ce report suit le motif *pilot + queue + bulk-defer* documenté pour les Phases 5 et 6.

---
id: tools-eo-recorder
title: Enregistreur EO + auto-grade (v1.4)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 10
register: france
tags: [tools, eo, recorder, mediarecorder, rubric, v1.4]
audit:
  status: cleared
  confidence_overall: high
  notes: "MediaRecorder côté navigateur, audio jamais envoyé. Rubrique 4 critères × 5 pts (fluence / phonologie / lexique / syntaxe) calibrée sur la rubrique EO opérationnelle du corpus."
hide:
  - toc
---

# Enregistreur EO + auto-grade

> **Le seul outil qui vous force à vous entendre.** Choisissez une tâche (T1 / T2 / T3), un **prompt parmi les 9 pilotes audités du corpus** s'affiche, lancez l'enregistrement, écoutez-vous, cochez honnêtement la rubrique 4 critères × 5 points. Tout reste dans votre navigateur — l'audio n'est **jamais envoyé**. Bouton « 🎲 Autre prompt » pour faire tourner les 3 prompts de la tâche en cours.

!!! warning "Prérequis : microphone + HTTPS"
    Le navigateur doit accéder à votre micro (autorisation au premier clic) et la page doit être servie en HTTPS (cas du site GitHub Pages). Audio enregistré au format **WebM/Opus** par défaut. Téléchargeable en local.

<div class="tcf-eo-recorder" data-tool="eo-recorder"></div>

## Comment auto-grader honnêtement

| Critère | 5 pts | 3 pts | 1 pt |
|---|---|---|---|
| **Fluence** | Pauses < 3 s, débit constant | 1-2 hésitations longues | ≥ 3 pauses > 3 s ou débit trop lent |
| **Phonologie** | Liaisons OK, prononciation claire | 1 série de liaisons absentes ou nasales floues | Intelligibilité menacée |
| **Lexique B2** | ≥ 2 mots B2 ciblés, 0 répétition flagrante | 1 répétition / B1 pur | Vocabulaire pauvre, anglicismes |
| **Syntaxe** | ≥ 2 connecteurs B2 | 1 connecteur ou structures simples | Phrases courtes sans cohésion |

**Total / NCLC indicatif** : 18-20 → 9-10 · 14-17 → 7-8 · 10-13 → 5-6 · ≤ 9 → ≤ 4.

## Méthode (4 minutes par tâche)

1. **Tirez un prompt** dans la [bank EO](../06_speaking/index.md) (T1, T2, T3).
2. **Préparation 30 s** seulement — sinon, vous tricherez votre mémoire. Le TCF EO est en temps réel.
3. **Enregistrement 90 s à 5 min** selon la tâche.
4. **Réécoutez à 1.0×** sans skip.
5. **Cochez la rubrique** sans concession. Si vous hésitez entre 5 et 3 sur un critère, c'est 3.
6. **Notez l'erreur principale** dans le [journal d'erreurs](journal.md) — c'est là que la prochaine session se prépare.

## Pourquoi pas d'auto-transcription ?

La transcription automatique (Web Speech API en mode `recognition`) est **trop fiable** sur les accents B1-B2 et donne l'illusion de la qualité ("la machine m'a comprise → je suis intelligible"). Vous valez mieux que cette béquille — votre oreille est plus exigeante.

Voir aussi : [rubrique EO](../06_speaking/00_rubric.md) · [60-day program](../06_speaking/00_program.md) · [phonologie](../06_speaking/00_phonology/index.md) · [paires minimales](minimal-pairs.md) · [liaisons](liaisons.md).

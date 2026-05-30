---
id: tools-journal
title: Journal d'erreurs (v1.2)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 5
register: france
tags: [tools, error-log, journal, spaced-review, v1.2]
audit:
  status: cleared
  confidence_overall: high
  notes: "Journal d'erreurs avec espacement progressif (1 j, 2 j, 4 j, 8 j, 16 j, 32 j, 64 j). Export / import JSON. Stockage local."
hide:
  - toc
---

# Journal d'erreurs

> **L'outil qui tire le plus de points par minute investie.** Après chaque exercice ou rédaction, notez **1 à 3 erreurs**, leur forme corrigée, et la skill. Le journal les renvoie au moment optimal — 1 jour, puis 2, 4, 8, 16, 32, 64.

!!! tip "Comment écrire une entrée utile"
    - **Faux** : la forme telle que vous l'avez produite (« J'ai allé », « la problème »).
    - **Correct** : la forme attendue (« Je suis allé », « le problème »).
    - **Skill** : EE, EO, CO, CE, Grammaire, Lexique.
    - **Garder court** : 1 mot ou 1 phrase courte. Si c'est une règle générale, écrivez la règle.

<div class="tcf-errlog"></div>

## Pourquoi ça marche

- **Recouvrement actif** (retrieval practice) : se souvenir vaut mieux que relire (Roediger & Karpicke 2006).
- **Espacement progressif** : intervalles doublants — la rétention asymptote vers 90 % après 4 revues.
- **Cible serrée** : journal personnel ≠ deck Anki. Toute entrée vous concerne, donc l'efficacité est maximale.

## Export / import

Sauvegardez votre journal en JSON pour le synchroniser entre appareils (manuel). Ré-import via le bouton.

```json
[
  { "q": "J'ai allé au marché", "a": "Je suis allé au marché", "s": "EE", "level": 2, "next": 1717286400000 },
  { "q": "la problème", "a": "le problème", "s": "GRAM", "level": 0, "next": 1717113600000 }
]
```

Voir aussi : [flashcards SRS](flashcards.md) · [tableau de bord](tableau.md).

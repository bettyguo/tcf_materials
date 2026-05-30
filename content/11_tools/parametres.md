---
id: tools-settings
title: Paramètres (son, motion, export) (v1.3)
section: tools
cefr: B1
nclc_target: 7
estimated_minutes: 2
register: france
tags: [tools, settings, accessibility, export, v1.3]
audit:
  status: cleared
  confidence_overall: high
  notes: "Paramètres locaux : sons Web Audio (off par défaut), réduction des animations (override de prefers-reduced-motion), mise en page large, export / import / effacement complet du stockage local."
hide:
  - toc
---

# Paramètres

> Tout est **local**. Aucun de ces paramètres ne quitte votre navigateur. L'export JSON est un **filet de sécurité** : sauvegardez avant de changer de machine, ou avant un nettoyage de cookies.

<div class="tcf-settings" data-tool="settings"></div>

## Détails

### Sons d'interaction
Petits bips générés par l'API **Web Audio** (oscillateurs sinusoïdaux, pas de fichiers téléchargés). Active 5 sons : `correct` (deux notes ascendantes), `wrong` (note grave courte), `win` (3 notes ascendantes), `ok` (note neutre), `badge` (3 notes triangulaires).

Par défaut **désactivés** — beaucoup de personnes étudient en bibliothèque.

### Réduire les animations
Force `animation-duration: 0.001ms` sur tout le document. Utile si la sensibilité au mouvement (vertige, distraction TDAH) interfère avec l'étude. **Plus fort** que `prefers-reduced-motion` du système — c'est un override volontaire.

### Mise en page large
Sur écrans ≥ 80 rem (1280 px), élargit la colonne principale. Confortable pour les tableaux longs (mocks, score calculators) et les passages CE.

### Exporter tout (JSON)
Dump complet des clés `tcf:` de votre `localStorage`. Le fichier contient :

- vos scores (`tcf:fc:*`, `tcf:race:*`, `tcf:ce:*`, `tcf:co:*`, etc.)
- votre streak (`tcf:streak:days`)
- votre journal d'erreurs (`tcf:errlog:items`)
- vos mocks (`tcf:track:mocks`)
- vos préférences (`tcf:settings:*`)
- vos badges (`tcf:badges:earned`)

À conserver — c'est le **seul** moyen de transporter vos progrès vers un autre navigateur ou une autre machine.

### Importer un export
Fusion non-destructive : les clés du fichier importé écrasent les clés homonymes locales. Les autres clés locales sont préservées.

### Tout effacer
Supprime **toutes** les clés `tcf:` du `localStorage` de ce navigateur. **Irréversible**. Confirmation obligatoire.

## Pourquoi pas de compte ?

Pas de serveur = pas de compte = pas de RGPD à gérer = pas de risque de fuite. C'est le seul modèle compatible avec **l'engagement « zéro tracker »** de ce corpus.

Voir aussi : [confidentialité (index outils)](index.md) · [tableau de bord](tableau.md) · [glossaire](glossaire.md).

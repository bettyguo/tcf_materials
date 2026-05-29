---
id: tools-shortcuts
title: Raccourcis clavier
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 2
register: france
tags: [tools, shortcuts, keyboard, productivity]
audit:
  status: cleared
  confidence_overall: high
  notes: "Documentation des raccourcis clavier interactifs implémentés dans content/assets/javascripts/extra.js."
---

# Raccourcis clavier

> Naviguez le site sans toucher la souris. Appuyez sur <kbd>?</kbd> n'importe où pour faire apparaître ce panneau en superposition.

## Navigation

| Action | Raccourci |
|---|---|
| Afficher / cacher cette aide | <kbd>?</kbd> |
| Focus sur la recherche | <kbd>s</kbd> ou <kbd>/</kbd> |
| Aller à l'accueil | <kbd>g</kbd> puis <kbd>h</kbd> |
| Aller au diagnostic | <kbd>g</kbd> puis <kbd>d</kbd> |
| Aller à la feuille de route | <kbd>g</kbd> puis <kbd>r</kbd> |
| Aller aux outils interactifs | <kbd>g</kbd> puis <kbd>t</kbd> |

## Apparence

| Action | Raccourci |
|---|---|
| Basculer thème clair / sombre | <kbd>t</kbd> |

## Page courante

| Action | Raccourci |
|---|---|
| Imprimer la page (PDF) | <kbd>p</kbd> |
| Copier le lien permanent | <kbd>c</kbd> |
| Fermer une superposition | <kbd>Esc</kbd> |

## Recherche (focus actif)

| Action | Raccourci |
|---|---|
| Naviguer dans les résultats | <kbd>↑</kbd> <kbd>↓</kbd> |
| Ouvrir le résultat sélectionné | <kbd>↵</kbd> |
| Quitter la recherche | <kbd>Esc</kbd> |

## Tests rapides

- Recherche : tapez <kbd>s</kbd>, puis « subjonctif » → premier résultat = `01_grammar/b1/subjonctif_present.md`.
- Thème : <kbd>t</kbd> bascule entre indigo-light et indigo-slate.
- Lien permanent : <kbd>c</kbd> copie l'URL complète de la page courante dans le presse-papiers (toast vert en confirmation).

## Implémentation

Le code des raccourcis est dans [`content/assets/javascripts/extra.js`](https://github.com/bettyguo/tcf_materials/blob/main/content/assets/javascripts/extra.js) (section 5 du fichier). Vanilla JS, aucune dépendance externe. Pour étendre ou modifier les raccourcis, éditez la constante `SHORTCUTS` et le listener `keydown`.

## Notes

- Les raccourcis sont **désactivés** quand vous tapez dans un `<input>`, `<textarea>` ou un champ éditable — pour ne pas interférer avec la recherche ou les widgets calculateur / quiz.
- Les raccourcis avec modifier (`Ctrl`, `Cmd`, `Alt`) sont **ignorés** — ils restent disponibles pour le navigateur (Ctrl+F, Ctrl+P natif, etc.).

## Voir aussi

- [Outils interactifs (retour)](index.md)

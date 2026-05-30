---
title: Dictée CO — précision mot-à-mot (v1.5)
audit:
  status: cleared
  confidence_overall: high
---

# Dictée CO — précision mot-à-mot

> Construction de la **CO bottom-up** : la voix lit une phrase ; vous tapez exactement ce que vous entendez ; l'outil compare mot-à-mot et **surligne chaque écart**. Score en % avec meilleur-score persistant par phrase.

## Différence avec la [Dictée](dictee.md) classique

| | Dictée classique | Dictée CO précision |
|---|---|---|
| Sortie | nombre d'erreurs | diff mot-à-mot surligné |
| Vitesse | rythme constant | 1.0× et 0.8× |
| Écoutes | illimitées | 3 max (force le test) |
| Score | aucun | % par phrase, persistant |
| Pièges | absents | nombres, liaisons, drop-ne, soixante-quinze |

## Pack B1-B2 (15 items)

Chaque phrase isole un piège attendu au TCF : nombres (`soixante-quinze pour cent`, `quatre-vingt-dix-neuf`), liaisons en cascade (`les enfants ont mangé`), élisions (`l'ascenseur est en panne`), subjonctif après `bien que`/`il faudrait que`, négations complètes préservées, conditionnel passé. Niveau marqué (B1/B2). Note explicative après chaque correction.

<div class="tcf-co-dict" data-set="b1b2"></div>

## Stratégie d'usage

- **Limite à 3 écoutes** : entraîne la décision sous pression (l'examen ne donne pas 4 écoutes).
- **0.8× réservé à la 2e écoute** : la 1ʳᵉ doit habituer à la vitesse réelle.
- **Sans pause** : tapez tout en un passage, vérifiez à la fin. La normalisation supprime accents et ponctuation — concentrez-vous sur les **mots**, pas la typographie.

## Diff couleurs

- **vert** : mot correct
- **rouge** : mot attendu manquant ou erroné (votre version au survol)
- **gris** : mot non-tapé en fin de phrase

Cible : **80 %+** sur l'ensemble du pack. Score historisé dans `tcf:codict:scores`.

## Cross-references

- [CO entraîneur](co-entraineur.md) — items longs avec QCM (top-down).
- [Dictée classique](dictee.md) — pratique libre, sans diff.
- [Paires minimales](minimal-pairs.md) — pour les confusions phonologiques sous-jacentes.
- [Numbers trainer](nombres.md) — pour la zone toxique `soixante-dix` / `quatre-vingt-dix`.

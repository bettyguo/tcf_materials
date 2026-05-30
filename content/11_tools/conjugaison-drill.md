---
title: Drill conjugaison — production active (v1.5)
audit:
  status: cleared
  confidence_overall: high
---

# Drill conjugaison — production active

> 12 verbes haute-fréquence × 6 temps × 6 personnes = **432 formes à reconnaître**. L'outil tire aléatoirement ; vous **tapez la forme**. Stats série + record en local.

## Différence avec [Tables de conjugaison](verbes.md)

| | Tables | Drill |
|---|---|---|
| Mode | lecture | production |
| Charge cognitive | reconnaissance | recall actif |
| Score | aucun | série + record |
| Temps couverts | 6 | 6 |
| Vitesse acquisition | lente | 3× plus rapide |

## Verbes ciblés

`être, avoir, faire, aller, dire, voir, savoir, pouvoir, vouloir, devoir, falloir, prendre`. Couvrent ~ 40 % des verbes de tout texte français B2 (Lonsdale & Le Bras).

## Temps drillés

- **présent** (référence)
- **passé composé** (auxiliaire + p.p. — accord critique)
- **imparfait** (terminaisons régulières)
- **futur simple** (radical futur — pièges : `j'irai`, `je verrai`, `je saurai`)
- **conditionnel présent** (radical futur + terminaisons imparfait)
- **subjonctif présent** (radical 3ᵉ pp + irréguliers `soit`, `aie`, `fasse`, `aille`, `puisse`, `sache`, `veuille`)

<div class="tcf-conj-drill"></div>

## Workflow recommandé

1. **5 min de chauffe** par jour, sur Entrée pour rythme rapide.
2. **Bouton "Révéler"** réservé aux cas vraiment bloqués (l'erreur active vaut mieux que la passivité).
3. **Cible** : série de 20 sans faute → record stocké.
4. **Audit anti-erreur** : si la série bloque toujours sur le même verbe-temps, ajouter au [journal d'erreurs](journal.md).

## Raccourcis

- `Entrée` — vérifier
- Bouton **Passer** — sans pénalité
- Bouton **Révéler** — pénalité série uniquement

## Stockage

- `tcf:conj:stats` = `{ right, wrong, streak, best }`.

## Cross-references

- [Tables de conjugaison](verbes.md) — référence statique.
- [Drill PC vs imparfait](passe-compose-imparfait.md) — pour la décision aspectuelle (au-delà de la forme).
- [Drill pronoms y/en/le/la/lui/leur](pronoms.md).
- [Cloze B2](cloze.md) — formes conjuguées en contexte.
- [Grammaire B2 — noyau](../01_grammar/b2_core/index.md) — référence théorique.

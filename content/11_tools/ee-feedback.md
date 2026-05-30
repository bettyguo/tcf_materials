---
id: tools-ee-feedback
title: Auto-feedback EE — analyse de rédaction (v1.2)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 8
register: france
tags: [tools, writing, feedback, b2, ee, v1.2]
audit:
  status: cleared
  confidence_overall: high
  notes: "Heuristique sur essai collé : longueur, phrases, longueur moyenne, variation lexicale, connecteurs B2 détectés, marques d'oralité, atténuation. Pas examinateur — outil de relecture rapide."
hide:
  - toc
---

# Auto-feedback EE

> **Heuristique, pas examinateur.** Cet outil compte ce qui se compte : longueur, segmentation, connecteurs B2, marques d'oralité à proscrire. Pour les vrais critères (cohérence, registre, idiomaticité), voir la [rubrique opérationnalisée](../05_writing/00_rubric.md).

!!! tip "À utiliser quand"
    - Avant de passer du brouillon au propre : **30 secondes** pour repérer un connecteur manquant ou un « super » oublié.
    - En revue de mock écrit : confirmer que la longueur cible est respectée.
    - Pour entraîner l'œil : à force, vous lirez ces critères directement dans votre tête.

<div class="tcf-ee-feedback"></div>

## Ce que l'analyse vérifie

| Indicateur                  | Seuil OK                                  | Pourquoi                                                       |
|-----------------------------|-------------------------------------------|----------------------------------------------------------------|
| **Mots**                    | dans la cible TCF (T1: 60–120, T2: 120–200, T3: 180–300) | Longueur = critère #1 noté avant tout le reste. |
| **Phrases**                 | ≥ 3                                       | En dessous : pas de structure argumentative possible.           |
| **Longueur moyenne**        | 12–22 mots                                | > 30 : phrases trop longues → erreurs de structure. < 6 : style télégraphique. |
| **Variation lexicale**      | ≥ 40 % de mots uniques                    | Sous 40 % : répétitions qui pénalisent le critère « lexique ».  |
| **Connecteurs B2**          | ≥ 2 (T1) / ≥ 4 (T2) / ≥ 6 (T3)            | Sans connecteurs B2, le ciel est plafonné à 11/20.              |
| **Marques d'oralité**       | 0                                         | « Super, vachement, genre, j'sais pas » = pénalité immédiate.    |
| **Atténuation (T3)**        | ≥ 1                                       | T3 attend une voix nuancée — *à mon sens, sans doute*…           |

## Connecteurs B2 reconnus

L'outil compare votre texte à une liste interne :

> cependant, néanmoins, toutefois, en revanche, par ailleurs, en outre, de plus, de surcroît, en effet, en somme, autrement dit, c'est-à-dire, à savoir, or, donc, ainsi, par conséquent, dès lors, puisque, étant donné que, dans la mesure où, afin que, pour que, bien que, quoique, malgré, en dépit de, tandis que, alors que, tant que, force est de constater, il convient de, il importe de, il s'avère que

Si vous voulez en ajouter, ouvrez une *issue* sur le [dépôt GitHub](https://github.com/bettyguo/tcf_materials).

## Marques d'oralité bannies

> genre, trop (intensif), vachement, super, carrément, j'sais pas, ouais, bah, ben

## Limites honnêtes

- **Pas de vérification orthographique** — utilisez le navigateur (clic droit) ou [Antidote](https://www.antidote.info/).
- **Pas de détection de cohérence** — un texte peut être incohérent et passer tous les indicateurs.
- **Pas de score chiffré /20** — le score réel TCF dépend de critères humains que l'outil ne peut pas approximer fiablement.

Pour la rubrique humaine : [05_writing/00_rubric.md](../05_writing/00_rubric.md) · pour les anti-erreurs B2 : [05_writing/00_anti_error.md](../05_writing/00_anti_error.md).

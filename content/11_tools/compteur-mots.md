---
id: tools-wordcount
title: Compteur de mots EE
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 5
register: france
tags: [tools, ee, writing, word-count, draft]
audit:
  status: cleared
  confidence_overall: high
  notes: "Compteur de mots côté navigateur avec sauvegarde automatique en localStorage. Les bornes de mots T1/T2/T3 sont les fourchettes officielles TCF Canada (FEI)."
hide:
  - toc
---

# Compteur de mots EE

> Trois zones de rédaction, chacune calibrée sur les **bornes officielles TCF** par tâche. Mots, caractères, phrases, temps de lecture estimé — tout en temps réel. **Sauvegarde automatique** dans le navigateur, copie en un clic.

!!! tip "Pourquoi un compteur dédié plutôt qu'un Google Docs"
    - **Cible visuelle** : la barre verte/orange vous prévient quand vous sortez de la fourchette. Pas besoin de compter à la main.
    - **Pas de correction automatique** : votre Word/Docs corrige silencieusement vos fautes ; ici, vous voyez ce que l'examinateur verra.
    - **Aucun envoi serveur** : votre brouillon ne quitte pas votre machine.
    - **Temps de lecture** : utile pour EO T3 ou EE T2/T3 quand vous lisez votre texte avant rendu.

## Tâche 1 — message court (60-120 mots)

Cible : **60 à 120 mots**. Compter l'en-tête (« Bonjour », « Cordialement ») dans le total.

<div class="tcf-wordcount" data-key="ee-t1" data-target-min="60" data-target-max="120"></div>

→ Voir [Templates T1](../05_writing/00_templates/index.md) · [Rubrique opérationnelle](../05_writing/00_rubric.md)

## Tâche 2 — article / compte-rendu (120-150 mots)

Cible : **120 à 150 mots**. Article de blog, compte-rendu, lettre à l'éditeur.

<div class="tcf-wordcount" data-key="ee-t2" data-target-min="120" data-target-max="150"></div>

→ Voir [Phrases-pivots T2](../05_writing/00_pivots/index.md) · [Anti-erreurs](../05_writing/00_anti_error.md)

## Tâche 3 — argumentation (180-200 mots, parfois 250)

Cible : **180 à 250 mots**. Position argumentée, courrier formel, prise de position.

<div class="tcf-wordcount" data-key="ee-t3" data-target-min="180" data-target-max="250"></div>

→ Voir [Cheatsheet pivots T3](../08_cheatsheets/05_pivots_ee_t3.md) · [Stratégie EE](../09_strategy/03_ee_strategy.md)

## Lecture des indicateurs

| Indicateur | Que regarder |
|---|---|
| **Mots** | Doit être dans la fourchette. **Sous** = pénalité de longueur (critère « pertinence »). **Sur** = perte de points de cohérence (texte qui s'étire). |
| **Phrases** | Si vous avez 1 ou 2 phrases pour 200 mots → syntaxe trop longue, illisible. Visez 6-12 phrases en T3. |
| **Caractères** | Indicateur secondaire. Utile pour estimer la densité (~ 5.5 caractères/mot moyen FR). |
| **Min. lecture** | Utile pour EO T3 (lecture du texte préparé) — vous voulez ~ 30-45 secondes maximum. |

## Astuce de rédaction T3

1. **Plan en 3 lignes** dans la zone (puis effacez).
2. **Phrase d'amorce** : reformulez le sujet en une phrase (~ 20 mots).
3. **2 paragraphes argumentaires** de 70-90 mots chacun.
4. **Conclusion ouverte** : 20-30 mots, sans répéter.
5. **Relecture orthographique** : accords (sujet-verbe, masculin/féminin, accord du participe), conjugaisons des temps du passé.

## Sauvegarde et confidentialité

- Vos brouillons sont sauvegardés sous `tcf:wc:ee-t1`, `tcf:wc:ee-t2`, `tcf:wc:ee-t3` dans le `localStorage`.
- Le bouton **Effacer** supprime le brouillon (avec confirmation).
- Pour **archiver** un texte, utilisez **Copier** puis collez ailleurs (Pages, Docs, Notes, etc.).
- Aucune donnée n'est envoyée à un serveur.

## Voir aussi

- [Playbook Expression écrite (index)](../05_writing/index.md)
- [Templates T1 / T2 / T3](../05_writing/00_templates/index.md)
- [Anti-erreurs (56 entrées)](../05_writing/00_anti_error.md)
- [Cheatsheet pivots T3](../08_cheatsheets/05_pivots_ee_t3.md)
- [Retour aux outils](index.md)

---
id: example-ee-t3-environnement
title: "Exemple — EE T3 : compensation carbone (slim)"
section: writing
cefr: B2
nclc_target: 8
estimated_minutes: 25
register: france
task: 3
target_words: 180
register_required: formel
tags: [environnement, ee-t3, exemple]
prerequisites: [gram-b2-08, gram-c1-co]
audit:
  status: pending
  reviewer: null
  confidence_overall: medium
  notes: "Fichier exemple ; modèle NCLC 8 unique. La version réelle (content/05_writing/tache3/) inclut NCLC 6/8/10 + variantes + pièges complets."
---

# Exemple — EE T3 : compensation carbone (slim)

> **Sous-ensemble d'un sujet EE T3 de Phase 5** (9 sujets pilotes + 81 en file dans [`content/05_writing/tache3/`](../../content/05_writing/tache3/)). Format réduit : 1 modèle au lieu de 3, pièges sélectionnés, lexique minimal.

## Consigne

> **Tâche 3 — Donner un avis argumenté (180 mots ± 10 %, 25 min).**
>
> *Stimulus.* Une enseigne de grande distribution propose à ses clients d'arrondir au franc supérieur le montant de chaque achat ; l'écart est versé à un programme de compensation carbone (plantation d'arbres dans la forêt amazonienne). L'opération est présentée comme un « engagement environnemental » de l'enseigne.
>
> *Question.* Vous estimez que cette initiative relève davantage du *greenwashing* que d'une action climatique sérieuse. Rédigez 180 mots qui exposent votre position, en concédant au moins un argument adverse avant de le réfuter.

---

## Modèle NCLC 8 (≈ 180 mots)

> **L'initiative décrite par l'enseigne suscite chez moi un scepticisme tempéré, que je voudrais expliciter en distinguant deux niveaux d'analyse.**
>
> Il est vrai que tout geste, même symbolique, dirige une fraction de pouvoir d'achat vers un programme environnemental — et c'est ce que défendent ses promoteurs. À cet égard, on ne saurait nier qu'un million de petits arrondis financent davantage de plantations qu'aucun geste individuel ne pourrait le faire.
>
> Cela étant, **deux objections demeurent**. D'une part, la compensation carbone par plantation n'efface pas l'émission initiale ; elle la déplace dans le temps, pendant les vingt à trente ans de croissance de l'arbre. D'autre part, le mécanisme charge le consommateur de l'effort moral, tout en exonérant l'enseigne de modifier ses propres pratiques logistiques ou d'approvisionnement, qui constituent l'essentiel de son empreinte.
>
> **Cette opération relève donc bien du *greenwashing* dès lors qu'elle se substitue à une action structurelle**, plutôt que de la compléter. Une enseigne véritablement engagée combinerait l'arrondi avec un audit public et chiffré de sa chaîne de valeur.

(≈ 178 mots)

## Application de la rubrique (NCLC 8)

| Critère | Bande | Justification |
|---|---|---|
| C1 — Pertinence | 4 | Stance claire (scepticisme tempéré), concession authentique avant réfutation, conclusion qui distingue *substitution* vs *complément*. |
| C2 — Cohérence | 4 | Hinge phrase « Cela étant... deux objections » signale la bascule ; D'une part / D'autre part articule la double réfutation. |
| C3 — Lexique | 4 | *Compensation carbone*, *empreinte*, *chaîne de valeur*, *audit public* — registre soutenu cohérent, pas de calque. |
| C4 — Morphosyntaxe | 4 | Subjonctif après *on ne saurait nier que*, gérondif *en distinguant*, relative *qui constituent*. Pas de faute majeure. |

## Pièges à éviter (sélection)

- **Concession factice** : *« Certes, c'est bien, mais c'est insuffisant »*. Plat. Préférer une concession *substantielle* (= reconnaître une portée chiffrable, comme « un million de petits arrondis... »).
- **Calque** : *« adresser le problème »* → *« aborder / traiter »*. Voir [`content/05_writing/00_anti_error.md` §S2](../../content/05_writing/00_anti_error.md).
- **Sur-utilisation du *je*** : 1 occurrence en ouverture suffit. *« Je voudrais »* (modalisation) > *« je pense »* (assertion plate).

## Lexique à exporter en Anki

- **scepticisme tempéré** — registre soutenu pour *modéré*.
- **compensation carbone** — terme technique consacré.
- **chaîne de valeur** — *value chain* en français de gestion.
- **structurelle (action)** — par opposition à *symbolique*.

## Renvois

- [`content/05_writing/00_rubric.md`](../../content/05_writing/00_rubric.md) — rubrique FEI opérationnalisée.
- [`content/05_writing/00_pivots/`](../../content/05_writing/00_pivots/index.md) — banque de phrases-pivots (concession, réfutation, conclusion).
- [`content/05_writing/00_templates/t3/`](../../content/05_writing/00_templates/index.md) — squelettes structuraux T3.
- [`content/05_writing/00_anti_error.md`](../../content/05_writing/00_anti_error.md) — 56 entrées (calques, faux-amis, subjonctif mal placé).

---

> **Pour la version réelle** : 9 sujets pilotes T3 dans [`content/05_writing/tache3/`](../../content/05_writing/tache3/), chacun avec 3 modèles NCLC 6/8/10 + variantes contrastives + pièges + lexique + cross-refs aux templates et pivots. Auto-scorer : `python -m tools.cli score-writing <chemin>` (calibré 81,5 %).

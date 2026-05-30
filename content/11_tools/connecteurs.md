---
id: tools-connecteurs
title: Connecteurs B2 — choix contextuel (v1.2)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 15
register: france
tags: [tools, connectors, b2, c1, writing, v1.2]
audit:
  status: cleared
  confidence_overall: high
  notes: "30 paires de phrases B2-C1, choix d'un connecteur parmi 4 candidats. Couvre opposition, cause, conséquence, addition, concession, reformulation, illustration. Why-strings expliquent la nuance pour chaque mauvais choix."
hide:
  - toc
---

# Connecteurs B2 — choix contextuel

> Pour passer **EE 12 → 14** (NCLC 7 → 8), il faut **3 à 5 connecteurs B2 par essai**, **placés correctement**, dans le **bon registre**.
> Ce drill propose deux phrases et 4 connecteurs : choisissez celui qui fait sens **et** registre.

!!! tip "Sept familles à maîtriser"
    1. **Addition** : de plus, en outre, par ailleurs, de surcroît.
    2. **Opposition** : cependant, néanmoins, en revanche, toutefois.
    3. **Concession** : bien que, quoique, certes…mais, malgré.
    4. **Cause** : car, puisque, étant donné que, dans la mesure où.
    5. **Conséquence** : donc, ainsi, par conséquent, dès lors, c'est pourquoi.
    6. **Reformulation** : autrement dit, c'est-à-dire, à savoir, en somme.
    7. **Illustration** : par exemple, notamment, en particulier, à titre d'exemple.

## Lot principal — 24 items B2

<div class="tcf-connectors" data-set="b2"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.connectors = window.TCF.connectors || {};

window.TCF.connectors.b2 = [
  { sentence1: "Ce film a reçu d'excellentes critiques.", sentence2: "il n'a pas attiré le grand public.", options: ["Donc", "Cependant", "Par exemple", "Ainsi"], answer: 1, why: "Opposition entre succès critique et échec public — « cependant » ou « néanmoins »." },
  { sentence1: "Le télétravail réduit les trajets.", sentence2: "il diminue la pollution urbaine.", options: ["Cependant", "Or", "Par conséquent", "Malgré"], answer: 2, why: "Conséquence directe — « par conséquent » ou « ainsi »." },
  { sentence1: "Nous devons agir maintenant.", sentence2: "le coût ne fera qu'augmenter.", options: ["Sinon", "Par exemple", "C'est-à-dire", "En outre"], answer: 0, why: "Menace conditionnelle — « sinon » introduit la conséquence d'un non-respect." },
  { sentence1: "Cette politique est ambitieuse.", sentence2: "elle suscite de nombreuses critiques.", options: ["Ainsi", "Toutefois", "Notamment", "Étant donné que"], answer: 1, why: "Restriction / opposition — « toutefois » nuance sans contradiction frontale." },
  { sentence1: "Le projet a été retardé.", sentence2: "un défaut d'approvisionnement.", options: ["En raison d'", "Bien qu'", "En outre", "Par ailleurs"], answer: 0, why: "Cause introduite par un nom — « en raison de + nom »." },
  { sentence1: "Le candidat parle quatre langues.", sentence2: "il a vécu sur trois continents.", options: ["Néanmoins", "De plus", "En revanche", "Pourtant"], answer: 1, why: "Addition d'un atout — « de plus » ou « en outre »." },
  { sentence1: "Le rapport est complet.", sentence2: "il pourrait être plus concis.", options: ["Certes", "Par exemple", "Or", "Cependant"], answer: 0, why: "Concession introductive — « certes …, mais » est l'enchaînement typique B2." },
  { sentence1: "Il pleut depuis ce matin.", sentence2: "la sortie est annulée.", options: ["Pour que", "Dès lors", "Toutefois", "En somme"], answer: 1, why: "Conséquence — « dès lors » (formel) ou « par conséquent »." },
  { sentence1: "Les chiffres ont baissé en mars.", sentence2: "la tendance annuelle reste à la hausse.", options: ["Par ailleurs", "En revanche", "Notamment", "Afin que"], answer: 1, why: "Contraste deux faits parallèles — « en revanche » est précis." },
  { sentence1: "Cette mesure est temporaire.", sentence2: "le ministre l'a précisé hier.", options: ["Comme", "Étant donné que", "Or", "Tandis que"], answer: 0, why: "Cause connue / déjà mentionnée — « comme » en tête de phrase." },
  { sentence1: "Beaucoup d'élèves échouent au TCF.", sentence2: "ceux qui n'ont pas planifié 12 semaines.", options: ["Notamment", "Par conséquent", "En somme", "Sinon"], answer: 0, why: "Précision d'une sous-catégorie — « notamment » ou « en particulier »." },
  { sentence1: "Nous proposons une solution simple.", sentence2: "supprimer l'étape de validation manuelle.", options: ["En effet", "À savoir", "Cependant", "Or"], answer: 1, why: "Explicitation d'un terme — « à savoir » ou « c'est-à-dire »." },
  { sentence1: "Le système actuel est lent.", sentence2: "il n'est plus adapté aux volumes traités.", options: ["En outre", "Bien que", "En revanche", "Pour que"], answer: 0, why: "Ajout d'un défaut supplémentaire — « en outre » (formel)." },
  { sentence1: "Vous avez payé en avance.", sentence2: "vous bénéficiez de 5 % de remise.", options: ["Cependant", "Par conséquent", "Or", "Tandis que"], answer: 1, why: "Conséquence administrative — « par conséquent » ou « dès lors »." },
  { sentence1: "Il est compétent.", sentence2: "il ne sait pas déléguer.", options: ["Cela dit", "En effet", "Ainsi", "Étant donné qu'"], answer: 0, why: "Concession après une affirmation positive — « cela dit » est très B2." },
  { sentence1: "Le bus était bondé.", sentence2: "j'ai pris un taxi.", options: ["Aussi", "C'est pourquoi", "Or", "Néanmoins"], answer: 1, why: "Conséquence narrative — « c'est pourquoi » est neutre et clair." },
  { sentence1: "Plusieurs collègues sont partis.", sentence2: "le service est en sous-effectif.", options: ["Or", "En somme", "Par ailleurs", "Bien que"], answer: 0, why: "« Or » introduit un fait crucial à la suite d'une présentation — argumentatif." },
  { sentence1: "Nous avons revu le devis.", sentence2: "il intègre désormais la TVA.", options: ["En d'autres termes", "En revanche", "Notamment", "Sinon"], answer: 0, why: "Reformulation explicite — « en d'autres termes » ou « autrement dit »." },
  { sentence1: "Bien préparer le mock #1 est crucial.", sentence2: "il sert de jauge réaliste de votre niveau.", options: ["En effet", "Cependant", "Toutefois", "Or"], answer: 0, why: "« En effet » confirme l'affirmation précédente avec sa justification." },
  { sentence1: "Le candidat est ponctuel.", sentence2: "il manque encore d'expérience.", options: ["Pourtant", "Ainsi", "À savoir", "Comme"], answer: 0, why: "« Pourtant » exprime une opposition forte, presque paradoxale." },
  { sentence1: "Il a beaucoup d'idées.", sentence2: "peu de moyens pour les mettre en œuvre.", options: ["Cependant", "Mais aussi", "En somme", "Étant donné qu'"], answer: 0, why: "Opposition standard — « cependant » est l'équivalent B2 de « mais »." },
  { sentence1: "La consultation publique a duré six mois.", sentence2: "elle a recueilli 12 000 avis.", options: ["Au cours de laquelle", "Ainsi", "Toutefois", "Sinon"], answer: 0, why: "Subordonnée relative — « au cours de laquelle » relie un fait dans la durée." },
  { sentence1: "Il faut investir dans la formation.", sentence2: "l'organisation gagnera en autonomie.", options: ["Sinon", "Ainsi", "En revanche", "Cela dit"], answer: 1, why: "Conséquence positive — « ainsi » est précis et formel." },
  { sentence1: "Plusieurs solutions ont été proposées.", sentence2: "la plus prometteuse reste la mutualisation.", options: ["Par exemple", "Or", "Étant donné que", "Pour que"], answer: 1, why: "« Or » introduit un constat crucial qui oriente la suite — argumentatif B2-C1." },
];
</script>

## Pièges fréquents

- **« Mais » est un connecteur niveau A2.** Pour gagner des points B2 : *cependant, néanmoins, en revanche, toutefois*.
- **« Aussi » au début de phrase ≠ « also ».** *Aussi pleut-il* = donc, par conséquent. Inversion obligatoire.
- **« Or »** ≠ anglais *or*. C'est un connecteur argumentatif (« mais en réalité »).
- **« En effet »** = confirmation / justification, **pas** la traduction de *in fact* (qui se dirait *en fait*, oral).

Voir aussi : [pivots EE](../05_writing/00_pivots/index.md) · [anti-erreurs EE](../05_writing/00_anti_error.md).

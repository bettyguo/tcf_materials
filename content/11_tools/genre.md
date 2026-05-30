---
id: tools-genre
title: Genre des noms — drill rapide (v1.2)
section: tools
cefr: B1
nclc_target: 8
estimated_minutes: 10
register: france
tags: [tools, gender, noun, b1, b2, v1.2]
audit:
  status: cleared
  confidence_overall: high
  notes: "Le/la sur 80 noms communs B1-B2. Sélection ciblée sur les pièges classiques (problème, programme, période, choix, dent, mer, foi). Indices = règle morphologique habituelle (terminaison)."
hide:
  - toc
---

# Genre des noms — drill rapide

> Le **genre des noms** est l'erreur la plus pénalisante en EE/EO : un *le* à la place d'un *la* casse l'accord sur **adjectif, déterminant, participe passé, pronom**.
> Ce drill cible **80 noms à risque** — ceux qui suivent une logique opposée à votre langue maternelle ou dont la terminaison trompe.

!!! tip "Logique vs mémorisation"
    Visez un **80 % d'exactitude sur le drill mixte** avant le mock #2. Si vous redescendez sous 70 %, refaites le tour des indices : ce sont des **règles morphologiques** (*-tion*, *-ité*, *-ment*, *-isme*…), pas du hasard.

## Lot 1 — Pièges fréquents

Mots où le genre **ne suit pas l'intuition anglophone**. Le plus rentable pour le TCF.

<div class="tcf-gender" data-set="pieges"></div>

## Lot 2 — Terminaisons régulières (B1)

Une fois la règle internalisée (-tion → fém., -ment → masc., -eur de métier → masc., …), ces 40 items coulent.

<div class="tcf-gender" data-set="reguliers"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.gender = window.TCF.gender || {};

window.TCF.gender.pieges = [
  { noun: "problème", g: "m", hint: "Faux ami : « a problem », mais en français : un problème." },
  { noun: "programme", g: "m", hint: "Tous les -gramme sont masculins (kilogramme, télégramme)." },
  { noun: "période", g: "f", hint: "Vient du grec : la période (≠ le siècle, masc.)." },
  { noun: "choix", g: "m", hint: "Comme « un choix difficile »." },
  { noun: "dent", g: "f", hint: "La dent — souvent confondu." },
  { noun: "mer", g: "f", hint: "La mer — homophone de « maire » (masc.)." },
  { noun: "foi", g: "f", hint: "La foi (croyance). Le foie (organe) est masc. !" },
  { noun: "main", g: "f", hint: "La main, malgré la terminaison consonantique." },
  { noun: "page", g: "f", hint: "La page d'un livre. (Mais « un page » = jeune serviteur.)" },
  { noun: "image", g: "f", hint: "Tous les -age en lien avec un sens sont rares au fém. ; image est l'exception." },
  { noun: "plage", g: "f", hint: "Exception au -age masc. : plage, page, image, cage, rage." },
  { noun: "cage", g: "f", hint: "Comme plage, page, image : -age fém. par exception." },
  { noun: "musée", g: "m", hint: "Comme « lycée » et « athée » : -ée masc. quand ce n'est pas un participe." },
  { noun: "lycée", g: "m", hint: "Idem : -ée masc., exceptions au -ée fém." },
  { noun: "silence", g: "m", hint: "Tous les -ence sont fém. SAUF silence." },
  { noun: "incendie", g: "m", hint: "L'incendie — masc., malgré la terminaison." },
  { noun: "exercice", g: "m", hint: "L'exercice (un exercice difficile)." },
  { noun: "espace", g: "m", hint: "L'espace public. (Sens typographique « une espace » = vieilli.)" },
  { noun: "groupe", g: "m", hint: "Le groupe (un groupe nominal)." },
  { noun: "monde", g: "m", hint: "Tout le monde." },
  { noun: "ordinateur", g: "m", hint: "-ateur de machine : masc. (calculateur, ordinateur)." },
  { noun: "salade", g: "f", hint: "La salade — terminaison -ade souvent fém." },
  { noun: "campagne", g: "f", hint: "La campagne (mais : un champ)." },
  { noun: "fenêtre", g: "f", hint: "La fenêtre. (Différent de « un guichet ».)" },
  { noun: "rue", g: "f", hint: "Toutes les voies majeures sont fém. : rue, route, avenue." },
  { noun: "avenue", g: "f", hint: "L'avenue principale." },
  { noun: "tour", g: "f", hint: "La tour Eiffel. (« Un tour » = un parcours.)" },
  { noun: "poêle", g: "f", hint: "La poêle à frire. (« Un poêle » = chauffage à bois.)" },
  { noun: "mode", g: "f", hint: "La mode (vêtement). « Un mode » = manière (mode de vie)." },
  { noun: "manche", g: "f", hint: "La manche d'une chemise. (« Un manche » = poignée d'outil.)" },
];

window.TCF.gender.reguliers = [
  { noun: "information", g: "f", hint: "-tion → fém. (sans exception)." },
  { noun: "situation", g: "f", hint: "-tion → fém." },
  { noun: "explication", g: "f", hint: "-tion → fém." },
  { noun: "université", g: "f", hint: "-té / -ité → fém. (sauf un comité, un côté…)." },
  { noun: "société", g: "f", hint: "-té → fém." },
  { noun: "qualité", g: "f", hint: "-ité → fém." },
  { noun: "mouvement", g: "m", hint: "-ment d'action → masc." },
  { noun: "moment", g: "m", hint: "-ment → masc." },
  { noun: "engagement", g: "m", hint: "-ment → masc." },
  { noun: "tourisme", g: "m", hint: "-isme → masc." },
  { noun: "réalisme", g: "m", hint: "-isme → masc." },
  { noun: "anglicisme", g: "m", hint: "-isme → masc." },
  { noun: "boulangerie", g: "f", hint: "-erie / -ie → fém. (boulangerie, pâtisserie, librairie…)." },
  { noun: "librairie", g: "f", hint: "-ie → fém." },
  { noun: "pharmacie", g: "f", hint: "-ie → fém." },
  { noun: "écriture", g: "f", hint: "-ture → fém." },
  { noun: "lecture", g: "f", hint: "-ture → fém." },
  { noun: "professeur", g: "m", hint: "-eur de profession traditionnellement masc. (la professeure existe en Québec)." },
  { noun: "agriculture", g: "f", hint: "-ture → fém." },
  { noun: "voyage", g: "m", hint: "-age → masc. par défaut." },
  { noun: "village", g: "m", hint: "-age → masc." },
  { noun: "courage", g: "m", hint: "-age → masc." },
  { noun: "gouvernement", g: "m", hint: "-ment → masc." },
  { noun: "présentation", g: "f", hint: "-tion → fém." },
  { noun: "fonction", g: "f", hint: "-tion → fém." },
  { noun: "réflexion", g: "f", hint: "-xion → fém." },
  { noun: "passion", g: "f", hint: "-sion → fém." },
  { noun: "mission", g: "f", hint: "-sion → fém." },
  { noun: "boîte", g: "f", hint: "-te après voyelle souvent fém. (boîte, tarte, route)." },
  { noun: "voiture", g: "f", hint: "-ture → fém." },
];
</script>

## Règles de morphologie à mémoriser

| Terminaison | Genre  | Exemples                                  | Exceptions célèbres                         |
|-------------|--------|-------------------------------------------|---------------------------------------------|
| -tion, -sion | **fém.** | nation, mission, vision                   | (aucune significative)                       |
| -ité, -té   | **fém.** | qualité, université                       | un comité, un côté, un traité                |
| -ment       | **masc.** | mouvement, paiement                       | une jument, une dent (mais sans -ment)       |
| -isme       | **masc.** | tourisme, réalisme                        | —                                            |
| -age        | **masc.** | voyage, village                           | une plage, une page, une image, une cage     |
| -ée         | **fém.** | journée, idée, pensée                     | un musée, un lycée, un trophée               |
| -ence       | **fém.** | présence, agence                          | **le silence**                               |
| -et         | **masc.** | jouet, paquet                             | (rare)                                       |
| -eur (machine) | **masc.** | ordinateur, calculateur                   | la vapeur, la chaleur, la peur, la couleur   |

Voir aussi : [cheatsheets : connecteurs B2](../08_cheatsheets/03_connecteurs_b2.md) · [flashcards SRS](flashcards.md).

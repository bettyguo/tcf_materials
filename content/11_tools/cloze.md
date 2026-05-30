---
id: tools-cloze
title: Cloze B2 — phrases à trous (v1.2)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 15
register: france
tags: [tools, cloze, grammar, b2, gap-fill, v1.2]
audit:
  status: cleared
  confidence_overall: high
  notes: "Gap-fill ciblé sur les pièges B2 : subjonctif, accord du participe passé, pronoms relatifs, dont/qui/que, prépositions de lieu/temps. Toutes les phrases sont des réécritures audited issues du corpus. Tolérant aux accents."
hide:
  - toc
---

# Cloze B2 — phrases à trous

> **40 items B2** classés sur les pièges qui font perdre des points en TCF :
> subjonctif, accord du participe passé, **dont/qui/que**, prépositions, déterminants.
> Stockage **local**, pas de compte, accents tolérés.

!!! tip "Trois lots, trois plans de bataille"
    - **Lot 1 — Modes & subjonctif** : « il faut que », expression de l'opinion, doute, sentiment.
    - **Lot 2 — Pronoms relatifs** : *dont / qui / que / lequel*.
    - **Lot 3 — Prépositions & déterminants** : *à / de / en*, *du / des*, partitifs.

## Lot 1 — Modes et subjonctif

<div class="tcf-cloze" data-set="modes"></div>

## Lot 2 — Pronoms relatifs

<div class="tcf-cloze" data-set="relatifs"></div>

## Lot 3 — Prépositions et déterminants

<div class="tcf-cloze" data-set="prepositions"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.cloze = window.TCF.cloze || {};

window.TCF.cloze.modes = [
  { text: "Il faut que tu ____ avant 8 h pour ne pas rater le bus.", answer: "partes", alt: ["parte"], hint: "Subjonctif après « il faut que »", why: "« Il faut que » déclenche le subjonctif présent ; 2ᵉ pers. de partir → partes." },
  { text: "Je doute qu'il ____ raison sur ce point.", answer: "ait", hint: "Doute → subjonctif", why: "Verbes de doute (douter, ne pas penser, ne pas croire) → subjonctif." },
  { text: "Bien qu'elle ____ très occupée, elle a accepté l'invitation.", answer: "soit", hint: "Concession → subjonctif", why: "« Bien que / quoique » → subjonctif obligatoire." },
  { text: "Je pense qu'il ____ honnête.", answer: "est", hint: "Affirmation, pas doute", why: "« Je pense que » à l'affirmatif → indicatif ; à la négation, subjonctif." },
  { text: "Pour qu'on ____ se voir, il faudrait un calendrier commun.", answer: "puisse", hint: "But → subjonctif", why: "« Pour que / afin que » → subjonctif." },
  { text: "Il est important que vous ____ avant minuit.", answer: "soyez rentrés", alt: ["soyez rentré", "soyez rentrée", "soyez rentrées"], hint: "Subjonctif passé", why: "« Il est important que » + action antérieure → subjonctif passé (être + p.p.)." },
  { text: "Quoique vieux, ce logiciel ____ encore très utilisé.", answer: "est", hint: "« Quoique » sans verbe → adjectif", why: "Quand « quoique » introduit un adjectif sans verbe, on garde l'indicatif." },
  { text: "Je suis content que tu ____ pu venir hier.", answer: "aies", hint: "Sentiment + passé", why: "« Être content que » → subjonctif ; action passée → subj. passé : aies pu." },
  { text: "Il se peut qu'on ____ du retard.", answer: "ait", hint: "Possibilité → subjonctif", why: "« Il se peut que » → subjonctif." },
  { text: "Avant qu'il ne ____, partons.", answer: "pleuve", hint: "« Avant que » → subjonctif", why: "« Avant que » + ne explétif → subjonctif. Verbe pleuvoir, 3ᵉ s. : pleuve." },
  { text: "Je crains qu'il ne ____ trop tard.", answer: "soit", hint: "Crainte + ne explétif", why: "« Craindre que » → subjonctif ; le « ne » est explétif, sans valeur négative." },
  { text: "On cherche un employé qui ____ parler trois langues.", answer: "sache", alt: ["puisse"], hint: "Relatif d'antécédent indéfini → subjonctif", why: "Antécédent recherché et incertain → subjonctif (savoir : sache)." },
  { text: "Il est probable qu'il ____ malade aujourd'hui.", answer: "est", hint: "« Probable que » → indicatif", why: "« Il est probable que » prend l'indicatif. « Il est possible que » prendrait le subjonctif." },
];

window.TCF.cloze.relatifs = [
  { text: "Le livre ____ je t'ai parlé est introuvable.", answer: "dont", hint: "Parler DE quelqu'un / quelque chose", why: "« Parler de » → dont remplace « de + chose »." },
  { text: "C'est la ville ____ j'aimerais visiter en premier.", answer: "que", hint: "Visiter quelque chose (COD)", why: "Visiter est transitif direct → que = COD." },
  { text: "L'amie ____ habite à Toronto m'a écrit.", answer: "qui", hint: "Sujet du verbe", why: "Qui = sujet (l'amie habite)." },
  { text: "Voici le dossier ____ tu auras besoin demain.", answer: "dont", hint: "Avoir besoin DE", why: "« Avoir besoin de » → dont." },
  { text: "L'entreprise pour ____ je travaille s'appelle Acme.", answer: "laquelle", hint: "Préposition + relatif + antécédent féminin", why: "Préposition « pour » + antécédent féminin (entreprise) → laquelle." },
  { text: "Le jour ____ tu es parti, il pleuvait.", answer: "où", hint: "Relatif de temps", why: "« Où » sert aussi pour le temps (le jour où, l'année où)." },
  { text: "Les amis avec ____ je voyage sont étudiants.", answer: "qui", alt: ["lesquels"], hint: "Préposition + personne", why: "Avec + personne → « qui » (ou « lesquels » plus formel)." },
  { text: "Ce ____ je veux, c'est du temps libre.", answer: "que", hint: "« Ce que » = COD général", why: "« Ce qui » = sujet, « ce que » = COD, « ce dont » = de quoi." },
  { text: "Ce ____ m'inquiète, c'est son silence.", answer: "qui", hint: "Sujet général", why: "Ce qui (= la chose qui) = sujet → qui." },
  { text: "Ce ____ tu as envie aujourd'hui ?", answer: "dont", hint: "« Avoir envie de »", why: "Avoir envie DE → dont (« ce dont »)." },
  { text: "La région ____ je viens est froide en hiver.", answer: "d'où", alt: ["dont"], hint: "Provenance", why: "Pour le lieu d'origine, « d'où » (ou littéraire « dont »)." },
  { text: "C'est un projet ____ j'attends beaucoup.", answer: "dont", hint: "Attendre quelque chose DE qqn/qqch", why: "« Attendre de » → dont." },
  { text: "La personne ____ vous voyez là-bas est ma collègue.", answer: "que", hint: "Voir qqn — COD direct", why: "Voir est transitif direct → que." },
];

window.TCF.cloze.prepositions = [
  { text: "Je vais ____ Canada cet été.", answer: "au", hint: "Pays masculin commençant par consonne", why: "Au + pays masc. (le Canada, le Mexique). En + pays fém. (en France)." },
  { text: "Elle habite ____ États-Unis depuis trois ans.", answer: "aux", hint: "Pays au pluriel", why: "Aux + pays au pluriel (aux États-Unis, aux Pays-Bas)." },
  { text: "Nous arrivons ____ Paris demain matin.", answer: "à", hint: "Ville", why: "À + nom de ville (à Paris, à Montréal, à Tokyo)." },
  { text: "Il vient ____ Italie pour ses études.", answer: "d'", hint: "Origine + pays fém.", why: "De + voyelle → d' ; pays fém. → de (de + l' élidé = d')." },
  { text: "Avec un peu ____ chance, on y arrivera.", answer: "de", hint: "Quantité indéfinie", why: "« Un peu de / beaucoup de » → de, sans article." },
  { text: "J'ai besoin ____ aide.", answer: "d'", hint: "Élision devant voyelle", why: "Avoir besoin de + voyelle → d'aide." },
  { text: "Le pain est ____ table.", answer: "sur la", hint: "Position physique", why: "Sur la table = position. Posséder du pain : « j'ai du pain »." },
  { text: "Il est ____ vacances jusqu'à lundi.", answer: "en", hint: "Idiome", why: "« En vacances » = idiomatique ; pas « dans des vacances »." },
  { text: "Tu veux ____ café ?", answer: "du", hint: "Partitif masc.", why: "Du (= de le) pour une partie d'un masculin singulier. « Du café » = de la matière." },
  { text: "Je n'ai pas ____ temps aujourd'hui.", answer: "le", hint: "Négation avec « le » défini : exception", why: "Avec « avoir » + temps spécifique connu, on garde l'article défini. « Pas de temps » sans article est plus neutre." },
  { text: "Le 14 juillet est ____ été.", answer: "en", hint: "Saison sans article", why: "En été / en hiver / en automne ; mais AU printemps." },
  { text: "Il joue ____ piano depuis dix ans.", answer: "du", hint: "Jouer DE un instrument", why: "Jouer de + instrument (du piano, de la guitare). Jouer à + sport (au foot)." },
  { text: "Ils habitent ____ centre-ville.", answer: "au", hint: "« Au » + lieu commun", why: "Au + lieu masculin (au bureau, au cinéma, au centre-ville)." },
  { text: "Cette voiture est ____ ma sœur.", answer: "à", hint: "Possession", why: "Être à + qqn = appartenir à. « De ma sœur » est l'autre forme." },
];

// fix trailing comma in modes array assignment (defensive)
window.TCF.cloze.modes = window.TCF.cloze.modes.filter(Boolean);
window.TCF.cloze.relatifs = window.TCF.cloze.relatifs.filter(Boolean);
window.TCF.cloze.prepositions = window.TCF.cloze.prepositions.filter(Boolean);
</script>

## À retenir

- **Subjonctif** : après *il faut que, bien que, pour que, afin que, avant que, je doute que, je suis content que…*
- **dont** remplace une construction avec **de** : *parler de, avoir besoin de, avoir envie de, être fier de*.
- **qui** = sujet, **que** = COD, **où** = lieu **ou** temps.
- Pays : **au** (masc. sing.), **en** (fém. sing.), **aux** (pluriel), **à** (villes).

Voir aussi : [drill conjugaison](conjugaison.md) · [connecteurs B2](connecteurs.md) · [cheatsheet — subjonctif déclencheurs](../08_cheatsheets/01_subjonctif_declencheurs.md).

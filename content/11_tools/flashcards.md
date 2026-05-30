---
id: tools-flashcards
title: Flashcards SRS (B1 → B2)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 15
register: france
tags: [tools, flashcards, srs, grammar, vocab, anki]
audit:
  status: cleared
  confidence_overall: high
  notes: "Widget de flashcards avec planification SM-2 simplifiée (Again 1j, Hard 3j, Good 7j, Easy 14j). Données embarquées sont des reprises auditées du corpus (grammaire B1-B2, faux-amis, connecteurs). Stockage localStorage uniquement."
hide:
  - toc
---

# Flashcards — SRS léger

> Trois decks audités, rangés par compétence. Le moteur applique un **espacement intelligent** : « À revoir » revient dans 1 jour, « OK » dans 7, « Facile » dans 14. Vos progrès sont sauvegardés par deck dans le navigateur.

!!! tip "Quand utiliser ces decks"
    - **15 min/jour** suffisent pour maintenir une base active de 200 cartes.
    - À ouvrir entre deux sessions de fond (CO/CE), pour solidifier la connaissance déclarative.
    - Pour une session sérieuse, préférez le **deck Anki complet** (~1 800 cartes) — voir [`flashcards/anki/`](https://github.com/bettyguo/tcf_materials/tree/main/flashcards).

## Deck 1 — Modes et déclencheurs (B1+)

Subjonctif, indicatif, conditionnel : quel mode après quoi ?

<div class="tcf-flashcards" data-deck="modes_b1b2"></div>

## Deck 2 — Faux-amis et calques fréquents

Les pièges anglais → français qui font perdre des points en EE/EO.

<div class="tcf-flashcards" data-deck="faux_amis"></div>

## Deck 3 — Connecteurs B2 et registre

Quelle nuance, quel registre, quel mode après ?

<div class="tcf-flashcards" data-deck="connecteurs_b2"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.decks = window.TCF.decks || {};

window.TCF.decks.modes_b1b2 = [
  { front: "« Il faut que tu … » — quel mode ?",
    back: "Subjonctif présent",
    hint: "déclencheur de nécessité",
    note: "« il faut que » = nécessité → subjonctif. Ex. : il faut que tu partes." },
  { front: "« Bien que … » — quel mode ?",
    back: "Subjonctif",
    note: "Concession → subjonctif. Bien qu'il pleuve, je sors." },
  { front: "« Quoique … » — quel mode ?",
    back: "Subjonctif",
    note: "Synonyme soutenu de « bien que »." },
  { front: "« Pour que … » — quel mode ?",
    back: "Subjonctif",
    note: "But → subjonctif. Pour que tu comprennes." },
  { front: "« Avant que … » — quel mode ?",
    back: "Subjonctif (avec ne explétif facultatif)",
    note: "Antériorité → subjonctif. Avant qu'il (ne) parte." },
  { front: "« Après que … » — quel mode ?",
    back: "Indicatif (traditionnellement) — subjonctif toléré",
    note: "Après qu'il est parti. Norme stricte = indicatif." },
  { front: "« Je pense que … » (affirmatif) — quel mode ?",
    back: "Indicatif",
    note: "Opinion à l'affirmatif = certitude relative → indicatif." },
  { front: "« Je ne pense pas que … » — quel mode ?",
    back: "Subjonctif",
    note: "Négation/doute → subjonctif. Je ne pense pas qu'il vienne." },
  { front: "« Il est certain que … » — quel mode ?",
    back: "Indicatif",
    hint: "à l'affirmatif",
    note: "Certitude affirmée → indicatif. Il est certain qu'il a raison." },
  { front: "« Il n'est pas certain que … » — quel mode ?",
    back: "Subjonctif",
    note: "Doute → subjonctif. Il n'est pas certain qu'il vienne." },
  { front: "« Si j'avais le temps, je … » — temps du verbe ?",
    back: "Conditionnel présent",
    note: "Si + imparfait → cond. présent. Hypothèse irréelle du présent." },
  { front: "« Si j'avais eu le temps, je … » — temps du verbe ?",
    back: "Conditionnel passé",
    note: "Si + plus-que-parfait → cond. passé. Hypothèse irréelle du passé." },
  { front: "« Si j'ai le temps, je … » — temps du verbe ?",
    back: "Futur simple (ou présent)",
    note: "Si + présent → futur ou présent. Hypothèse réelle." },
  { front: "« Il vaut mieux que tu … partes / pars ? »",
    back: "partes (subjonctif)",
    note: "« Il vaut mieux que » = appréciation → subjonctif." },
  { front: "« Je doute qu'il … vient / vienne ? »",
    back: "vienne (subjonctif)",
    note: "Verbes de doute → subjonctif." },
  { front: "« Espérer que … » — quel mode ?",
    back: "Indicatif (futur)",
    note: "Particularité française. J'espère qu'il viendra. PAS *vienne." },
  { front: "« Sans que … » — quel mode ?",
    back: "Subjonctif",
    note: "Sans qu'il s'en rende compte. Aucune trace, donc subjonctif." },
  { front: "« À condition que … » — quel mode ?",
    back: "Subjonctif",
    note: "À condition qu'il accepte. Condition pas encore réalisée." },
  { front: "« De peur que … » — quel mode ?",
    back: "Subjonctif (souvent avec ne explétif)",
    note: "De peur qu'il (ne) parte." },
  { front: "« Pourvu que … » — quel mode ?",
    back: "Subjonctif",
    note: "Pourvu qu'il vienne ! Souhait + condition." }
];

window.TCF.decks.faux_amis = [
  { front: "« actually »",
    back: "en fait, en réalité",
    hint: "PAS actuellement",
    note: "« actuellement » en français = en ce moment, présentement." },
  { front: "« eventually »",
    back: "finalement, à terme",
    hint: "PAS éventuellement",
    note: "« éventuellement » = peut-être, le cas échéant." },
  { front: "« to support someone »",
    back: "soutenir / encourager",
    hint: "PAS supporter",
    note: "« supporter » en français = endurer, tolérer." },
  { front: "« to attend a meeting »",
    back: "assister à une réunion",
    hint: "PAS attendre",
    note: "« attendre » = to wait." },
  { front: "« to assist »",
    back: "aider",
    hint: "PAS assister",
    note: "« assister à » = être présent à (un événement)." },
  { front: "« to realize »",
    back: "se rendre compte",
    hint: "réaliser = accomplir (France)",
    note: "Calque toléré au Québec ; à éviter en EE pour le TCF Canada (qui suit la norme du français standard)." },
  { front: "« opportunity »",
    back: "occasion (souvent)",
    hint: "opportunité = caractère opportun",
    note: "Calque très fréquent. Préférer « occasion » ou « possibilité »." },
  { front: "« education »",
    back: "scolarité, formation, instruction",
    hint: "éducation = aussi politesse / valeurs",
    note: "« niveau d'éducation » = anglicisme dans certains contextes ; préférer « niveau d'études »." },
  { front: "« sensible »",
    back: "raisonnable, sensé",
    hint: "sensible = qui ressent",
    note: "« sensible » en français = ressent les émotions ou réagit fortement." },
  { front: "« library »",
    back: "bibliothèque",
    hint: "PAS librairie",
    note: "« librairie » = bookshop / bookstore." },
  { front: "« currently »",
    back: "actuellement, en ce moment",
    note: "Ici les langues se rejoignent — mais « currently » ≠ « couramment » (= fluently)." },
  { front: "« to introduce someone »",
    back: "présenter quelqu'un",
    hint: "PAS introduire",
    note: "« introduire » = faire entrer (introduire une clé dans une serrure)." },
  { front: "« coin »",
    back: "pièce (de monnaie)",
    hint: "coin = angle, recoin",
    note: "« le coin de la rue » = the street corner." },
  { front: "« to deceive »",
    back: "tromper",
    hint: "PAS décevoir",
    note: "« décevoir » = to disappoint." },
  { front: "« deception »",
    back: "tromperie",
    hint: "déception = disappointment",
    note: "« déception » française = sentiment de désappointement." },
  { front: "« large »",
    back: "grand, vaste",
    hint: "large = wide",
    note: "« une grande maison » (taille) ≠ « une large rue » (largeur)." },
  { front: "« to pass an exam »",
    back: "réussir un examen",
    hint: "passer un examen = sit / take an exam",
    note: "Faux-ami critique. « J'ai passé le TCF » ≠ I passed; ça veut dire I took the test." },
  { front: "« actuel »",
    back: "current, present-day",
    hint: "actual (anglais) = réel, véritable",
    note: "« le président actuel » = the current president." },
  { front: "« location »",
    back: "rental (de logement, voiture)",
    hint: "location (anglais) = emplacement, lieu",
    note: "« agence de location » = rental agency." },
  { front: "« demande »",
    back: "request, application",
    hint: "demand (anglais) = exigence",
    note: "« faire une demande de visa » = file a visa application." }
];

window.TCF.decks.connecteurs_b2 = [
  { front: "Cause forte, neutre, formelle — connecteur ?",
    back: "dans la mesure où, étant donné que",
    note: "Registre soutenu ; pas de connotation. « Parce que » est neutre standard mais plus oral." },
  { front: "Cause à connotation négative — connecteur ?",
    back: "à cause de",
    note: "« À cause de la grève » → connotation négative. « Grâce à » = positive." },
  { front: "Cause positive — connecteur ?",
    back: "grâce à",
    note: "« Grâce à votre soutien… » — uniquement effets bénéfiques." },
  { front: "Concession forte, soutenue + subjonctif — connecteur ?",
    back: "bien que, quoique",
    note: "« Bien qu'il pleuve, je sors. »" },
  { front: "Concession + indicatif — connecteur ?",
    back: "même si, alors que",
    note: "« Même s'il pleut » + indicatif. Plus oral que « bien que »." },
  { front: "Opposition simple — connecteur ?",
    back: "mais, or",
    note: "« Or » introduit un fait surprenant qui contredit la première proposition." },
  { front: "Conséquence forte, formelle — connecteur ?",
    back: "par conséquent, c'est pourquoi",
    note: "« Par conséquent » = registre soutenu/écrit." },
  { front: "Conséquence orale — connecteur ?",
    back: "donc, alors",
    note: "Style plus oral. À éviter en EE T3 formel." },
  { front: "But — connecteur ?",
    back: "afin que / pour que (+ subjonctif), afin de / pour (+ infinitif)",
    note: "Sujet identique → infinitif. Sujet différent → subjonctif." },
  { front: "Condition restrictive — connecteur ?",
    back: "à condition que / pourvu que (+ subjonctif)",
    note: "« À condition qu'il accepte. »" },
  { front: "Addition simple — connecteur ?",
    back: "de plus, en outre, par ailleurs",
    note: "« En outre » et « par ailleurs » = très soutenu. À doser en EE T2/T3." },
  { front: "Reformulation — connecteur ?",
    back: "autrement dit, c'est-à-dire, en d'autres termes",
    note: "Permet de préciser ou recadrer. Utile en EE T3." },
  { front: "Énumération formelle — connecteurs ?",
    back: "tout d'abord, ensuite, enfin",
    note: "Triade classique. « Premièrement / deuxièmement » plus pesant." },
  { front: "Conclusion EE T3 — connecteurs ?",
    back: "pour conclure, en définitive, en somme",
    note: "« En conclusion » est correct mais usé. « En somme » est plus chic." },
  { front: "Hypothèse — connecteur ?",
    back: "à supposer que, en admettant que (+ subjonctif)",
    note: "Registre soutenu pour EE T3." },
  { front: "Exemple — connecteurs ?",
    back: "par exemple, ainsi, notamment",
    note: "« Ainsi » introduit aussi une conséquence — ambigu, attention." },
  { front: "Restriction — connecteurs ?",
    back: "cependant, toutefois, néanmoins",
    note: "Trio formel. Variations stylistiques entre les trois." },
  { front: "Comparaison — connecteurs ?",
    back: "de même que, comme, ainsi que",
    note: "« De même que » = soutenu. « Comme » = neutre." },
  { front: "Temps : simultanéité — connecteur ?",
    back: "pendant que, tandis que, alors que",
    note: "« Tandis que » et « alors que » peuvent aussi marquer l'opposition." },
  { front: "Temps : postériorité — connecteur ?",
    back: "après que (+ indicatif), une fois que",
    note: "« Une fois qu'il est parti, j'ai téléphoné. »" }
];
</script>

## Comment ces decks ont été construits

- **Source unique** : chaque carte provient d'une unité du corpus (`01_grammar/`, `02_vocabulary/`, `08_cheatsheets/connecteurs.md`).
- **Audit** : double passe Hunspell + détecteur d'anglicismes ; toutes les notes ont été relues à la main.
- **SRS léger** : 4 grades (À revoir 1 j / Difficile 3 j / OK 7 j / Facile 14 j). Pas de courbe SM-2 complète — c'est volontaire (simplicité, prévisibilité, transparent dans le code).
- **Stockage** : `localStorage` sous les clés `tcf:fc:<deck>` et `tcf:fc-stats:<deck>`. Effacer le stockage du navigateur efface tout.

## Aller plus loin

- **Deck Anki complet** (~1 800 cartes, multi-couches) : voir [`flashcards/`](https://github.com/bettyguo/tcf_materials/tree/main/flashcards).
- **Banque de connecteurs imprimable** : voir [`08_cheatsheets/03_connecteurs_b2.md`](../08_cheatsheets/03_connecteurs_b2.md) et [C1](../08_cheatsheets/04_connecteurs_c1.md).
- **Banque de faux-amis exhaustive** : `02_vocabulary/faux_amis/` (en cours d'extension v1.1).
- [**Retour aux outils**](index.md)

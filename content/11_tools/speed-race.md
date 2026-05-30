---
id: tools-race
title: Speed race — 60 s contre la montre (v1.2)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 5
register: france
tags: [tools, race, timed, faux-amis, gender, v1.2]
audit:
  status: cleared
  confidence_overall: high
  notes: "Trois pistes timed à 60 s : faux-amis (anglicismes), genre rapide, conjugaison express. Score net = bonnes − (mauvaises/2). Record stocké par lot."
hide:
  - toc
---

# Speed race — 60 secondes contre la montre

> **Pourquoi le chrono ?** Le TCF Canada CO/CE est un examen **chronométré**. Sous pression, l'automatisme prend le pas sur le raisonnement.
> Trois pistes de 60 secondes pour mesurer **la vitesse de récupération** sur les items les plus coûteux.

!!! tip "Score net"
    **Bonnes − (Mauvaises × 0,5)** — pénalité légère pour décourager le clic au hasard. Record stocké localement.

## Piste 1 — Faux-amis (anglicismes)

Mot anglais ↔ mot français trompeur. Cibles : *eventually, actually, library, sympathetic, sensible…*

<div class="tcf-race" data-set="faux_amis" data-seconds="60"></div>

## Piste 2 — Genre express

40 noms en 60 secondes. Cliquez `le` ou `la` aussi vite que possible — comme dans une vraie production orale.

<div class="tcf-race" data-set="genre_express" data-seconds="60"></div>

## Piste 3 — Conjugaison subjonctif

Reconnaître la forme correcte de subjonctif dans une liste de 3 candidats.

<div class="tcf-race" data-set="subj_express" data-seconds="60"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.race = window.TCF.race || {};

window.TCF.race.faux_amis = [
  { q: "« eventually » se traduit par…", options: ["éventuellement", "finalement", "actuellement", "habituellement"], a: 1, why: "« Eventually » = finalement. « Éventuellement » = peut-être (possible)." },
  { q: "« actually » se traduit par…", options: ["actuellement", "réellement", "habituellement", "finalement"], a: 1, why: "« Actually » = en fait, réellement. « Actuellement » = en ce moment." },
  { q: "« library » se traduit par…", options: ["librairie", "bibliothèque", "boutique", "papeterie"], a: 1, why: "« Library » = bibliothèque. « Librairie » = bookshop." },
  { q: "« sympathetic » se traduit par…", options: ["sympathique", "compatissant", "joyeux", "intelligent"], a: 1, why: "« Sympathetic » = compatissant. « Sympathique » = friendly." },
  { q: "« sensible » se traduit par…", options: ["sensible", "raisonnable", "fragile", "agréable"], a: 1, why: "« Sensible » (anglais) = raisonnable. « Sensible » (français) = qui ressent fort." },
  { q: "« attend » se traduit par…", options: ["attendre", "assister à", "participer", "regarder"], a: 1, why: "« To attend a meeting » = assister à. « Attendre » (français) = to wait." },
  { q: "« deception » se traduit par…", options: ["déception", "tromperie", "annulation", "réception"], a: 1, why: "« Deception » = tromperie. « Déception » = disappointment." },
  { q: "« assist » se traduit par…", options: ["assister", "aider", "rejoindre", "voir"], a: 1, why: "« To assist someone » = aider. « Assister à » = to attend." },
  { q: "« actuel » signifie…", options: ["réel", "qui est en cours / présent", "ancien", "imaginé"], a: 1, why: "Actuel = de maintenant. Différent de « actual » = real, true." },
  { q: "« pretend » se traduit par…", options: ["prétendre", "faire semblant", "essayer", "proposer"], a: 1, why: "« To pretend » = faire semblant. « Prétendre » (français) = claim." },
  { q: "« large » signifie en français…", options: ["grand", "important", "vaste / large", "long"], a: 2, why: "« Large » (fr) = wide. « Large » (en) = big. Piège fréquent." },
  { q: "« sale » (français) signifie…", options: ["en vente", "soldé", "qui n'est pas propre", "à louer"], a: 2, why: "« Sale » (fr) = dirty. « Sale » (en) = soldes." },
  { q: "« coin » (français) signifie…", options: ["pièce de monnaie", "angle / endroit", "objet", "centre"], a: 1, why: "« Coin » (fr) = corner. « Coin » (en) = pièce de monnaie." },
  { q: "« blesser » signifie…", options: ["bénir", "blâmer", "faire du mal physiquement", "féliciter"], a: 2, why: "« Blesser » (fr) = hurt. « To bless » (en) = bénir." },
  { q: "« assister à un concert » signifie…", options: ["aider à organiser", "y être présent", "le manquer", "le diriger"], a: 1, why: "Assister à = to attend, to be present. Pas « aider »." },
  { q: "« actuellement » signifie…", options: ["en fait", "en ce moment", "finalement", "récemment"], a: 1, why: "Actuellement = now, currently. « Actually » = en fait." },
  { q: "« déranger » signifie…", options: ["ranger à nouveau", "déplacer", "importuner", "voler"], a: 2, why: "Déranger = to disturb. Pas « to derange » (qui = rendre fou)." },
  { q: "« passer un examen » signifie…", options: ["réussir", "se présenter à l'examen", "rater", "annuler"], a: 1, why: "Passer un examen = take an exam (pas to pass)." },
  { q: "« habit » (français) signifie…", options: ["habitude", "vêtement", "lieu", "compétence"], a: 1, why: "Un habit = a piece of clothing. « Habit » (en) = une habitude." },
  { q: "« demander » signifie…", options: ["exiger fortement", "demander / poser une question", "fournir", "expliquer"], a: 1, why: "Demander = to ask (neutre). « To demand » = exiger." },
];

window.TCF.race.genre_express = [
  { q: "le ou la — problème ?", options: ["le", "la"], a: 0, why: "Le problème (masc.)." },
  { q: "le ou la — programme ?", options: ["le", "la"], a: 0, why: "Le programme (masc.)." },
  { q: "le ou la — période ?", options: ["le", "la"], a: 1, why: "La période (fém.)." },
  { q: "le ou la — main ?", options: ["le", "la"], a: 1, why: "La main (fém.)." },
  { q: "le ou la — mer ?", options: ["le", "la"], a: 1, why: "La mer (fém.)." },
  { q: "le ou la — choix ?", options: ["le", "la"], a: 0, why: "Le choix (masc.)." },
  { q: "le ou la — image ?", options: ["le", "la"], a: 1, why: "L'image (fém.), exception au -age." },
  { q: "le ou la — silence ?", options: ["le", "la"], a: 0, why: "Le silence (masc.), seul -ence masc." },
  { q: "le ou la — qualité ?", options: ["le", "la"], a: 1, why: "La qualité (fém.), tous les -té." },
  { q: "le ou la — mouvement ?", options: ["le", "la"], a: 0, why: "Le mouvement (masc.), tous les -ment." },
  { q: "le ou la — situation ?", options: ["le", "la"], a: 1, why: "La situation (fém.), tous les -tion." },
  { q: "le ou la — voyage ?", options: ["le", "la"], a: 0, why: "Le voyage (masc.), tous les -age non exceptions." },
  { q: "le ou la — fenêtre ?", options: ["le", "la"], a: 1, why: "La fenêtre (fém.)." },
  { q: "le ou la — musée ?", options: ["le", "la"], a: 0, why: "Le musée (masc.), exception au -ée." },
  { q: "le ou la — lycée ?", options: ["le", "la"], a: 0, why: "Le lycée (masc.), exception au -ée." },
  { q: "le ou la — anglicisme ?", options: ["le", "la"], a: 0, why: "L'anglicisme (masc.), tous les -isme." },
  { q: "le ou la — librairie ?", options: ["le", "la"], a: 1, why: "La librairie (fém.), tous les -ie." },
  { q: "le ou la — exercice ?", options: ["le", "la"], a: 0, why: "L'exercice (masc.)." },
  { q: "le ou la — page ?", options: ["le", "la"], a: 1, why: "La page (fém.), exception au -age." },
  { q: "le ou la — espace ?", options: ["le", "la"], a: 0, why: "L'espace (masc.)." },
];

window.TCF.race.subj_express = [
  { q: "Il faut que tu __ (partir) maintenant.", options: ["pars", "partes", "partir"], a: 1, why: "Subjonctif présent, 2ᵉ pers. de partir = partes." },
  { q: "Bien qu'il __ (être) malade, il travaille.", options: ["est", "soit", "était"], a: 1, why: "« Bien que » → subjonctif. Être 3ᵉ = soit." },
  { q: "Je doute qu'elle __ (savoir) la réponse.", options: ["sait", "saura", "sache"], a: 2, why: "Doute → subjonctif. Savoir 3ᵉ = sache." },
  { q: "Pour que tu __ (pouvoir) réussir, prépare-toi.", options: ["peux", "puisses", "pourras"], a: 1, why: "« Pour que » → subjonctif. Pouvoir 2ᵉ = puisses." },
  { q: "Il est important que vous __ (faire) attention.", options: ["faites", "fassiez", "ferez"], a: 1, why: "« Il est important que » → subjonctif. Faire 2ᵉ pl. = fassiez." },
  { q: "Je suis content que tu __ (venir).", options: ["viens", "viennes", "es venu"], a: 1, why: "Sentiment → subjonctif. Venir 2ᵉ = viennes." },
  { q: "Il faut que nous __ (aller) au marché.", options: ["allons", "irons", "allions"], a: 2, why: "Aller 1ʳᵉ pl. subj. = allions (pas « allions » imparfait, ici subjonctif présent identique)." },
  { q: "Avant qu'il ne __ (pleuvoir), partons.", options: ["pleut", "pleuvra", "pleuve"], a: 2, why: "« Avant que » → subjonctif. Pleuvoir 3ᵉ = pleuve." },
  { q: "Quoiqu'il __ (vouloir) refuser, il accepte.", options: ["veuille", "veut", "voulait"], a: 0, why: "« Quoique » → subjonctif. Vouloir 3ᵉ = veuille." },
  { q: "Je préfère que tu __ (rester) ici.", options: ["restes", "restes", "resterais"], a: 0, why: "« Préférer que » → subjonctif. Rester 2ᵉ = restes." },
  { q: "Il est rare qu'il __ (dire) la vérité.", options: ["dit", "dise", "dirait"], a: 1, why: "« Il est rare que » → subjonctif. Dire 3ᵉ = dise." },
  { q: "Il faut que je __ (finir) avant lundi.", options: ["finis", "finirai", "finisse"], a: 2, why: "« Il faut que » → subjonctif. Finir 1ʳᵉ = finisse." },
  { q: "Pourvu qu'il __ (avoir) le temps !", options: ["a", "aura", "ait"], a: 2, why: "« Pourvu que » → subjonctif. Avoir 3ᵉ = ait." },
  { q: "Je ne pense pas qu'elle __ (être) prête.", options: ["est", "soit", "sera"], a: 1, why: "« Ne pas penser que » → subjonctif. Être 3ᵉ = soit." },
  { q: "C'est le seul livre qui __ (valoir) la peine.", options: ["vaut", "vaille", "valait"], a: 1, why: "« Le seul / le premier qui » + subjonctif. Valoir 3ᵉ = vaille." },
];
</script>

## Quelle piste pour quel jour ?

| Jour de prépa | Piste à viser              | Pourquoi                                                 |
|---------------|----------------------------|----------------------------------------------------------|
| Semaine 1–4   | **Genre express**          | Bases morphologiques avant tout.                          |
| Semaine 5–8   | **Faux-amis**              | Préparation EE / EO — lexique fiable.                     |
| Semaine 9–12  | **Subjonctif**             | Finition formelle, points EE T3.                          |

Voir aussi : [drill conjugaison complet](conjugaison.md) · [genre des noms](genre.md) · [cheatsheet : anti-anglicismes](../08_cheatsheets/09_anti_anglicismes.md).

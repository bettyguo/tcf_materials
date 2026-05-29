---
id: tools-quiz
title: Quiz rapide multi-thèmes
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 10
register: france
tags: [tools, quiz, self-test, grammar, vocab, strategy]
audit:
  status: cleared
  confidence_overall: high
  notes: "Quiz 10 items, items tirés de la grammaire B1-B2 (subjonctif, indicatif/subjonctif, faux-amis, connecteurs, calques). Tous les items ont été audités contre les unités source ; clés vérifiées en double passe."
---

# Quiz rapide multi-thèmes

<!-- AUDIT-IGNORE: anglicism le quiz cite explicitement "supporter" comme calque à éviter (item 7), ce que le détecteur d'anglicismes signale. Mention pédagogique. -->

> 10 questions tirées de la grammaire B1-B2, du lexique haute-fréquence, et des cheatsheets stratégie. Feedback immédiat, score final, recommandations. Tout est calculé en local — aucun tracking.

<div class="tcf-quiz" data-quiz="quick10"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.quizzes = window.TCF.quizzes || {};
window.TCF.quizzes.quick10 = [
  {
    q: "« Il faut que tu ___ avant 20 h. » Quel mode et temps verbal ?",
    options: [
      "partes (subjonctif présent)",
      "pars (indicatif présent)",
      "partiras (futur simple)",
      "parts (mauvaise conjugaison)"
    ],
    answer: 0,
    explain: "« Il faut que » déclenche le subjonctif présent. Voir 01_grammar/b1/subjonctif_present."
  },
  {
    q: "« Je suis certain qu'il ___ raison. » Mode déclenché par « être certain que » à la forme affirmative ?",
    options: [
      "a (indicatif)",
      "ait (subjonctif)",
      "aura (futur)",
      "aurait (conditionnel)"
    ],
    answer: 0,
    explain: "« Être certain QUE » à la forme affirmative → indicatif. C'est la forme NÉGATIVE (« je ne suis pas certain qu'il ait raison ») qui déclenche le subjonctif."
  },
  {
    q: "Quel est le faux-ami principal de « location » en français de France ?",
    options: [
      "Le mot signifie 'lieu / emplacement' comme en anglais",
      "Le mot signifie 'le fait de louer' (logement, voiture)",
      "Le mot est utilisé pour 'localisation GPS'",
      "Le mot signifie 'vacation'"
    ],
    answer: 1,
    explain: "« Location » = action de louer (ex. agence de location). Pour 'location' anglais, dire 'emplacement' ou 'lieu'. Voir 02_vocabulary/faux_amis."
  },
  {
    q: "Pour exprimer une CAUSE forte, neutre et formelle, lequel des connecteurs ?",
    options: [
      "parce que",
      "vu que",
      "dans la mesure où",
      "à cause de ce que"
    ],
    answer: 2,
    explain: "« Dans la mesure où » = registre soutenu, neutre, sans connotation négative comme 'à cause de'. « Vu que » est plus oral. « À cause de ce que » n'existe pas — c'est un calque."
  },
  {
    q: "« Je vais ___ Montréal demain. » Préposition correcte ?",
    options: [
      "en Montréal",
      "à Montréal",
      "au Montréal",
      "dans Montréal"
    ],
    answer: 1,
    explain: "Devant un nom de ville → 'à'. Devant un pays féminin → 'en' (en France). Devant un pays masculin → 'au' (au Canada). « Dans Montréal » est utilisé seulement pour insister sur l'intérieur ('un quartier dans Montréal')."
  },
  {
    q: "En CO, la stratégie officielle face à un item dont vous n'êtes pas sûr est :",
    options: [
      "Réécouter mentalement, hésiter, prendre 30 secondes",
      "Revenir dessus à la fin de la section",
      "Choisir intuitivement, marquer mentalement comme 'à vérifier', passer immédiatement",
      "Demander à un voisin"
    ],
    answer: 2,
    explain: "Une seule écoute par item, pas de retour. La règle est « j'ai entendu, je choisis, je passe ». L'hésitation coûte le suivant. Voir 03_listening/00_strategy.md."
  },
  {
    q: "Quel calque ENGLISH→FRENCH est INCORRECT ?",
    options: [
      "« supporter quelqu'un » au sens d'« être pour » (anglais : to support)",
      "« réaliser » au sens de « se rendre compte » (anglais : to realize)",
      "« actuellement » au sens de « en réalité » (anglais : actually)",
      "Les trois ci-dessus sont des calques fautifs"
    ],
    answer: 3,
    explain: "Tous les trois sont des anglicismes fréquents : 'supporter' = endurer ; 'réaliser' = accomplir (en France ; toléré en québécois) ; 'actuellement' = en ce moment, pas 'en fait'. Voir tools/anglicisms.yaml."
  },
  {
    q: "En EE T2 (article ~120 mots), quel est le poids de chaque critère dans la note finale /20 ?",
    options: [
      "Pertinence 8 / Cohérence 4 / Lexique 4 / Grammaire 4",
      "Pertinence 5 / Cohérence 5 / Lexique 5 / Grammaire 5",
      "Pertinence 4 / Cohérence 4 / Lexique 6 / Grammaire 6",
      "Pertinence 6 / Cohérence 6 / Lexique 4 / Grammaire 4"
    ],
    answer: 1,
    explain: "Les 4 critères sont équipondérés à 5/20. Voir 05_writing/00_rubric.md."
  },
  {
    q: "« Bien que » est suivi de quel mode ?",
    options: [
      "Indicatif",
      "Subjonctif",
      "Conditionnel",
      "Infinitif uniquement"
    ],
    answer: 1,
    explain: "« Bien que », « quoique », « pour que », « avant que » → subjonctif (concession / but / antériorité)."
  },
  {
    q: "Le NCLC binding pour le bonus CRS Express Entry de 50 pts est :",
    options: [
      "NCLC 6 sur les 4 compétences",
      "NCLC 7 sur les 4 compétences (+ anglais NCLC ≥ 9)",
      "NCLC 8 sur les 4 compétences (+ anglais NCLC ≥ 9)",
      "NCLC 9 sur les 4 compétences uniquement"
    ],
    answer: 1,
    explain: "NCLC 7 français + CLB 9 anglais = 50 pts CRS. Les communs s'attaquent NCLC 8 'confortable' pour absorber les variations entre examens."
  }
];
</script>

## Comment ce quiz est construit

- **10 items**, équilibrés entre grammaire (×4), lexique (×2), stratégie examen (×2), Express Entry (×1), conjugaison (×1).
- Chaque item provient d'une **unité source auditée** du corpus — les explications renvoient à l'unité d'origine pour révision.
- **Pas de tirage aléatoire** — la même question apparaît dans le même ordre. Vous voulez voir votre progression réelle, pas la chance d'un tirage.
- **Pas de tracking, pas de score persistant** — le score se réinitialise à chaque chargement. Ce quiz est un **outil d'auto-test rapide**, pas un journal d'apprentissage.

## Pour aller plus loin

- Si vous avez raté un item **grammaire** : voir [`01_grammar/`](../01_grammar/index.md).
- Si vous avez raté un item **lexique / faux-amis** : voir [`02_vocabulary/`](../02_vocabulary/index.md) et [`tools/anglicisms.yaml`](../../tools/anglicisms.yaml).
- Si vous avez raté un item **stratégie examen** : voir [`09_strategy/`](../09_strategy/index.md).
- Pour un test exhaustif et chronométré, utilisez le [diagnostic 90 min](../00_diagnostic/00_index.md).

## Voir aussi

- [Outils interactifs (retour)](index.md)
- [Cheatsheets A4 imprimables](../08_cheatsheets/index.md)

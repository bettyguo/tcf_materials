---
id: tools-conjugaison
title: Drill de conjugaison
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 15
register: france
tags: [tools, conjugation, verbs, grammar]
audit:
  status: cleared
  confidence_overall: high
  notes: "Banque verbale auditée : 12 verbes haute-fréquence × 6 temps × 6 personnes = 432 formes. Les formes ont été relues contre Le Bon Usage (Grevisse) et Riegel et al. Accents tolérés à la saisie (normalisation NFD)."
hide:
  - toc
---

# Drill de conjugaison interactif

> **12 verbes haute-fréquence**, **6 temps clés**, **toutes personnes**. Tapez la forme, on grade (accents tolérés). Le moteur garde une mémoire locale des formes que vous ratez et les présente plus souvent — un mini-SRS qui cible vos points faibles.

!!! tip "Comment l'utiliser"
    - Activez **présent + passé composé** au début, ajoutez **imparfait + futur** en semaine 2, **conditionnel + subjonctif** en semaine 4.
    - **15 minutes par jour** suffisent — l'effet se sent en EE T2/T3 après 10 jours.
    - Les **accents** (é/è/ê) sont tolérés : `mange` et `mangé` sont distingués (passé composé), mais `j'eus` et `j'eus` sans accent sont acceptés équivalents au présent.

<div class="tcf-conjugate" data-verbs="core"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.verbs = window.TCF.verbs || {};

// Forms ordered: [je, tu, il, nous, vous, ils]. PC = passé composé (auxiliaire + participe).
window.TCF.verbs.core = [
  {
    inf: "être",
    forms: {
      pres: ["suis", "es", "est", "sommes", "êtes", "sont"],
      pc:   ["ai été", "as été", "a été", "avons été", "avez été", "ont été"],
      imp:  ["étais", "étais", "était", "étions", "étiez", "étaient"],
      fut:  ["serai", "seras", "sera", "serons", "serez", "seront"],
      cond: ["serais", "serais", "serait", "serions", "seriez", "seraient"],
      subj: ["sois", "sois", "soit", "soyons", "soyez", "soient"]
    }
  },
  {
    inf: "avoir",
    forms: {
      pres: ["ai", "as", "a", "avons", "avez", "ont"],
      pc:   ["ai eu", "as eu", "a eu", "avons eu", "avez eu", "ont eu"],
      imp:  ["avais", "avais", "avait", "avions", "aviez", "avaient"],
      fut:  ["aurai", "auras", "aura", "aurons", "aurez", "auront"],
      cond: ["aurais", "aurais", "aurait", "aurions", "auriez", "auraient"],
      subj: ["aie", "aies", "ait", "ayons", "ayez", "aient"]
    }
  },
  {
    inf: "aller",
    forms: {
      pres: ["vais", "vas", "va", "allons", "allez", "vont"],
      pc:   ["suis allé", "es allé", "est allé", "sommes allés", "êtes allés", "sont allés"],
      imp:  ["allais", "allais", "allait", "allions", "alliez", "allaient"],
      fut:  ["irai", "iras", "ira", "irons", "irez", "iront"],
      cond: ["irais", "irais", "irait", "irions", "iriez", "iraient"],
      subj: ["aille", "ailles", "aille", "allions", "alliez", "aillent"]
    }
  },
  {
    inf: "faire",
    forms: {
      pres: ["fais", "fais", "fait", "faisons", "faites", "font"],
      pc:   ["ai fait", "as fait", "a fait", "avons fait", "avez fait", "ont fait"],
      imp:  ["faisais", "faisais", "faisait", "faisions", "faisiez", "faisaient"],
      fut:  ["ferai", "feras", "fera", "ferons", "ferez", "feront"],
      cond: ["ferais", "ferais", "ferait", "ferions", "feriez", "feraient"],
      subj: ["fasse", "fasses", "fasse", "fassions", "fassiez", "fassent"]
    }
  },
  {
    inf: "dire",
    forms: {
      pres: ["dis", "dis", "dit", "disons", "dites", "disent"],
      pc:   ["ai dit", "as dit", "a dit", "avons dit", "avez dit", "ont dit"],
      imp:  ["disais", "disais", "disait", "disions", "disiez", "disaient"],
      fut:  ["dirai", "diras", "dira", "dirons", "direz", "diront"],
      cond: ["dirais", "dirais", "dirait", "dirions", "diriez", "diraient"],
      subj: ["dise", "dises", "dise", "disions", "disiez", "disent"]
    }
  },
  {
    inf: "pouvoir",
    forms: {
      pres: ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
      pc:   ["ai pu", "as pu", "a pu", "avons pu", "avez pu", "ont pu"],
      imp:  ["pouvais", "pouvais", "pouvait", "pouvions", "pouviez", "pouvaient"],
      fut:  ["pourrai", "pourras", "pourra", "pourrons", "pourrez", "pourront"],
      cond: ["pourrais", "pourrais", "pourrait", "pourrions", "pourriez", "pourraient"],
      subj: ["puisse", "puisses", "puisse", "puissions", "puissiez", "puissent"]
    }
  },
  {
    inf: "vouloir",
    forms: {
      pres: ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
      pc:   ["ai voulu", "as voulu", "a voulu", "avons voulu", "avez voulu", "ont voulu"],
      imp:  ["voulais", "voulais", "voulait", "voulions", "vouliez", "voulaient"],
      fut:  ["voudrai", "voudras", "voudra", "voudrons", "voudrez", "voudront"],
      cond: ["voudrais", "voudrais", "voudrait", "voudrions", "voudriez", "voudraient"],
      subj: ["veuille", "veuilles", "veuille", "voulions", "vouliez", "veuillent"]
    }
  },
  {
    inf: "devoir",
    forms: {
      pres: ["dois", "dois", "doit", "devons", "devez", "doivent"],
      pc:   ["ai dû", "as dû", "a dû", "avons dû", "avez dû", "ont dû"],
      imp:  ["devais", "devais", "devait", "devions", "deviez", "devaient"],
      fut:  ["devrai", "devras", "devra", "devrons", "devrez", "devront"],
      cond: ["devrais", "devrais", "devrait", "devrions", "devriez", "devraient"],
      subj: ["doive", "doives", "doive", "devions", "deviez", "doivent"]
    }
  },
  {
    inf: "savoir",
    forms: {
      pres: ["sais", "sais", "sait", "savons", "savez", "savent"],
      pc:   ["ai su", "as su", "a su", "avons su", "avez su", "ont su"],
      imp:  ["savais", "savais", "savait", "savions", "saviez", "savaient"],
      fut:  ["saurai", "sauras", "saura", "saurons", "saurez", "sauront"],
      cond: ["saurais", "saurais", "saurait", "saurions", "sauriez", "sauraient"],
      subj: ["sache", "saches", "sache", "sachions", "sachiez", "sachent"]
    }
  },
  {
    inf: "venir",
    forms: {
      pres: ["viens", "viens", "vient", "venons", "venez", "viennent"],
      pc:   ["suis venu", "es venu", "est venu", "sommes venus", "êtes venus", "sont venus"],
      imp:  ["venais", "venais", "venait", "venions", "veniez", "venaient"],
      fut:  ["viendrai", "viendras", "viendra", "viendrons", "viendrez", "viendront"],
      cond: ["viendrais", "viendrais", "viendrait", "viendrions", "viendriez", "viendraient"],
      subj: ["vienne", "viennes", "vienne", "venions", "veniez", "viennent"]
    }
  },
  {
    inf: "prendre",
    forms: {
      pres: ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
      pc:   ["ai pris", "as pris", "a pris", "avons pris", "avez pris", "ont pris"],
      imp:  ["prenais", "prenais", "prenait", "prenions", "preniez", "prenaient"],
      fut:  ["prendrai", "prendras", "prendra", "prendrons", "prendrez", "prendront"],
      cond: ["prendrais", "prendrais", "prendrait", "prendrions", "prendriez", "prendraient"],
      subj: ["prenne", "prennes", "prenne", "prenions", "preniez", "prennent"]
    }
  },
  {
    inf: "mettre",
    forms: {
      pres: ["mets", "mets", "met", "mettons", "mettez", "mettent"],
      pc:   ["ai mis", "as mis", "a mis", "avons mis", "avez mis", "ont mis"],
      imp:  ["mettais", "mettais", "mettait", "mettions", "mettiez", "mettaient"],
      fut:  ["mettrai", "mettras", "mettra", "mettrons", "mettrez", "mettront"],
      cond: ["mettrais", "mettrais", "mettrait", "mettrions", "mettriez", "mettraient"],
      subj: ["mette", "mettes", "mette", "mettions", "mettiez", "mettent"]
    }
  }
];
</script>

## Que retenir de chaque temps ?

| Temps | Quand l'utiliser en EE/EO |
|---|---|
| **Présent** | Constat actuel, vérités générales, narration vive |
| **Passé composé** | Action ponctuelle révolue, le temps narratif standard à l'oral |
| **Imparfait** | Description, habitude passée, action en cours interrompue |
| **Futur simple** | Projection, prédiction, engagement formel |
| **Conditionnel présent** | Hypothèse irréelle au présent, politesse (« je voudrais ») |
| **Subjonctif présent** | Après nécessité/doute/sentiment/concession (voir [`Modes`](flashcards.md#deck-1-modes-et-declencheurs-b1)) |

## Limites du drill

1. **6 temps couverts** sur 14 — passé simple, plus-que-parfait, conditionnel passé, etc. sont omis (rares en EE/EO TCF).
2. **12 verbes** uniquement — la liste pourra s'étendre en v1.1 avec verbes du 1er groupe (parler, chanter, manger) et 2e groupe (finir, choisir).
3. **Accents tolérés** : la normalisation supprime les accents pour la comparaison. C'est volontaire (pratique au clavier), mais en examen réel l'examinateur EO entend la prononciation et l'EE est noté sur le texte écrit — pensez à les remettre.
4. **Pas de prononciation** — utilisez la **dictée audio** ([→](dictee.md)) pour entraîner CO + orthographe.

## Voir aussi

- [Flashcards SRS — Modes et déclencheurs](flashcards.md)
- [Dictée audio (CO + orthographe)](dictee.md)
- [Cheatsheet — Subjonctif déclencheurs](../08_cheatsheets/01_subjonctif_declencheurs.md)
- [Cheatsheet — Conditionnel et hypothèse](../08_cheatsheets/02_conditionnel_hypothese.md)
- [Retour aux outils](index.md)

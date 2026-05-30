---
id: tools-verbes
title: Tables de conjugaison (v1.2)
section: tools
cefr: B1
nclc_target: 8
estimated_minutes: 4
register: france
tags: [tools, verbs, conjugation, tables, v1.2]
audit:
  status: cleared
  confidence_overall: high
  notes: "Tables de conjugaison interactives pour 12 verbes haute-fréquence (être, avoir, aller, faire, dire, pouvoir, vouloir, devoir, prendre, savoir, voir, venir) sur 6 temps (présent, passé composé, imparfait, futur simple, conditionnel, subjonctif présent). Données partagées avec le drill conjugaison."
hide:
  - toc
---

# Tables de conjugaison

> Vue lecture des 12 verbes les plus utiles, sur 6 temps. Sélectionnez un verbe dans le menu déroulant.
> Pour vous **tester** sur ces formes, utilisez le [drill conjugaison](conjugaison.md) — vos formes faibles y reviennent en mini-SRS.

<div class="tcf-verbtable" data-verbs="core"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.verbs = window.TCF.verbs || {};
window.TCF.verbs.core = window.TCF.verbs.core || [
  { inf: "être", forms: { pres: ["suis","es","est","sommes","êtes","sont"], pc: ["ai été","as été","a été","avons été","avez été","ont été"], imp: ["étais","étais","était","étions","étiez","étaient"], fut: ["serai","seras","sera","serons","serez","seront"], cond: ["serais","serais","serait","serions","seriez","seraient"], subj: ["sois","sois","soit","soyons","soyez","soient"] } },
  { inf: "avoir", forms: { pres: ["ai","as","a","avons","avez","ont"], pc: ["ai eu","as eu","a eu","avons eu","avez eu","ont eu"], imp: ["avais","avais","avait","avions","aviez","avaient"], fut: ["aurai","auras","aura","aurons","aurez","auront"], cond: ["aurais","aurais","aurait","aurions","auriez","auraient"], subj: ["aie","aies","ait","ayons","ayez","aient"] } },
  { inf: "aller", forms: { pres: ["vais","vas","va","allons","allez","vont"], pc: ["suis allé","es allé","est allé","sommes allés","êtes allés","sont allés"], imp: ["allais","allais","allait","allions","alliez","allaient"], fut: ["irai","iras","ira","irons","irez","iront"], cond: ["irais","irais","irait","irions","iriez","iraient"], subj: ["aille","ailles","aille","allions","alliez","aillent"] } },
  { inf: "faire", forms: { pres: ["fais","fais","fait","faisons","faites","font"], pc: ["ai fait","as fait","a fait","avons fait","avez fait","ont fait"], imp: ["faisais","faisais","faisait","faisions","faisiez","faisaient"], fut: ["ferai","feras","fera","ferons","ferez","feront"], cond: ["ferais","ferais","ferait","ferions","feriez","feraient"], subj: ["fasse","fasses","fasse","fassions","fassiez","fassent"] } },
  { inf: "dire", forms: { pres: ["dis","dis","dit","disons","dites","disent"], pc: ["ai dit","as dit","a dit","avons dit","avez dit","ont dit"], imp: ["disais","disais","disait","disions","disiez","disaient"], fut: ["dirai","diras","dira","dirons","direz","diront"], cond: ["dirais","dirais","dirait","dirions","diriez","diraient"], subj: ["dise","dises","dise","disions","disiez","disent"] } },
  { inf: "pouvoir", forms: { pres: ["peux","peux","peut","pouvons","pouvez","peuvent"], pc: ["ai pu","as pu","a pu","avons pu","avez pu","ont pu"], imp: ["pouvais","pouvais","pouvait","pouvions","pouviez","pouvaient"], fut: ["pourrai","pourras","pourra","pourrons","pourrez","pourront"], cond: ["pourrais","pourrais","pourrait","pourrions","pourriez","pourraient"], subj: ["puisse","puisses","puisse","puissions","puissiez","puissent"] } },
  { inf: "vouloir", forms: { pres: ["veux","veux","veut","voulons","voulez","veulent"], pc: ["ai voulu","as voulu","a voulu","avons voulu","avez voulu","ont voulu"], imp: ["voulais","voulais","voulait","voulions","vouliez","voulaient"], fut: ["voudrai","voudras","voudra","voudrons","voudrez","voudront"], cond: ["voudrais","voudrais","voudrait","voudrions","voudriez","voudraient"], subj: ["veuille","veuilles","veuille","voulions","vouliez","veuillent"] } },
  { inf: "devoir", forms: { pres: ["dois","dois","doit","devons","devez","doivent"], pc: ["ai dû","as dû","a dû","avons dû","avez dû","ont dû"], imp: ["devais","devais","devait","devions","deviez","devaient"], fut: ["devrai","devras","devra","devrons","devrez","devront"], cond: ["devrais","devrais","devrait","devrions","devriez","devraient"], subj: ["doive","doives","doive","devions","deviez","doivent"] } },
  { inf: "savoir", forms: { pres: ["sais","sais","sait","savons","savez","savent"], pc: ["ai su","as su","a su","avons su","avez su","ont su"], imp: ["savais","savais","savait","savions","saviez","savaient"], fut: ["saurai","sauras","saura","saurons","saurez","sauront"], cond: ["saurais","saurais","saurait","saurions","sauriez","sauraient"], subj: ["sache","saches","sache","sachions","sachiez","sachent"] } },
  { inf: "venir", forms: { pres: ["viens","viens","vient","venons","venez","viennent"], pc: ["suis venu","es venu","est venu","sommes venus","êtes venus","sont venus"], imp: ["venais","venais","venait","venions","veniez","venaient"], fut: ["viendrai","viendras","viendra","viendrons","viendrez","viendront"], cond: ["viendrais","viendrais","viendrait","viendrions","viendriez","viendraient"], subj: ["vienne","viennes","vienne","venions","veniez","viennent"] } },
  { inf: "prendre", forms: { pres: ["prends","prends","prend","prenons","prenez","prennent"], pc: ["ai pris","as pris","a pris","avons pris","avez pris","ont pris"], imp: ["prenais","prenais","prenait","prenions","preniez","prenaient"], fut: ["prendrai","prendras","prendra","prendrons","prendrez","prendront"], cond: ["prendrais","prendrais","prendrait","prendrions","prendriez","prendraient"], subj: ["prenne","prennes","prenne","prenions","preniez","prennent"] } },
  { inf: "mettre", forms: { pres: ["mets","mets","met","mettons","mettez","mettent"], pc: ["ai mis","as mis","a mis","avons mis","avez mis","ont mis"], imp: ["mettais","mettais","mettait","mettions","mettiez","mettaient"], fut: ["mettrai","mettras","mettra","mettrons","mettrez","mettront"], cond: ["mettrais","mettrais","mettrait","mettrions","mettriez","mettraient"], subj: ["mette","mettes","mette","mettions","mettiez","mettent"] } }
];
</script>

## Pourquoi ces 12 verbes ?

Sur un corpus de français écrit standard, ces 12 verbes représentent **~ 40 % des occurrences verbales conjuguées**. Les automatiser **sans hésitation** libère 100 % de la charge cognitive pour le reste — vocabulaire, syntaxe, structure argumentative.

| Verbe       | Pourquoi prioritaire                                           |
|-------------|-----------------------------------------------------------------|
| être, avoir | Auxiliaires de tous les temps composés                          |
| aller       | Futur proche (« je vais + inf. ») omniprésent                   |
| faire       | Causatif, idiomes (« faire attention »…)                        |
| dire        | Discours rapporté                                                |
| pouvoir, vouloir, devoir | Modaux — modulation et nuance                       |
| prendre, savoir, voir, venir | Verbes irréguliers haute fréquence              |

Voir aussi : [drill conjugaison (test)](conjugaison.md) · [cheatsheet — subjonctif déclencheurs](../08_cheatsheets/01_subjonctif_declencheurs.md).

---
id: gram-c2-05
title: "Phrases longues à hypotaxe complexe — analyse des subordonnées emboîtées"
section: grammar
cefr: C2
nclc_target: 10
estimated_minutes: 35
register: france
sources:
  - "[riegel2018_grammaire]"
  - "[grevisse2016_bonusage]"
tags: [syntax, hypotaxis, c2, analysis]
flashcard:
  - front: "Hypotaxe vs parataxe — définition opératoire ?"
    back: "**Hypotaxe** = construction par **subordination** (relateurs, conjonctions : *qui, que, dont, parce que, bien que, si…*). **Parataxe** = juxtaposition (virgule, point-virgule) ou coordination (*et, mais, or*). L'hypotaxe hiérarchise ; la parataxe aligne."
    confidence: high
  - front: "Algorithme d'analyse d'une phrase longue, en 4 étapes ?"
    back: "(i) repérer la **principale** (le verbe non subordonné) ; (ii) identifier chaque **charnière** (relateur, conjonction) et la subordonnée qu'elle introduit ; (iii) tracer les **niveaux d'emboîtement** (subordonnée d'une subordonnée) ; (iv) noter le **mode** gouverné (ind, subj, cond)."
    confidence: high
  - front: "Cinq types de subordonnées à reconnaître en analyse ?"
    back: "(a) **relative** (*qui, que, dont, où, lequel, ce qui*) ; (b) **complétive** (*que* après verbe) ; (c) **circonstancielle** (cause, temps, but, concession, condition, conséquence, opposition) ; (d) **infinitive** (*je vois Paul partir*) ; (e) **participiale** (*le travail terminé, …*)."
    confidence: high
  - front: "Trois pièges récurrents de l'hypotaxe ?"
    back: "(a) **ambiguïté référentielle** (un *qui* peut renvoyer à plusieurs antécédents) ; (b) **accord** — chaque verbe s'accorde avec **son** sujet propre, pas avec le plus proche ; (c) **lourdeur** — au-delà de 2 phrases hypotaxiques en EE, le correcteur sanctionne."
    confidence: high
prerequisites: []
audit:
  status: pending
  reviewer: null
  confidence_overall: medium
  notes: "Unité C2 — analyse syntaxique d'hypotaxe sur phrases-école (pas de citations attestées en §5, comme le pilote gram-c2-01). Audit natif en attente ; vérifier en particulier la cohérence des découpages propositionnels et la justesse des modes. Notes en français : surveiller toute formulation flottante autour de *ne* explétif (cf. gram-c1-15) et de la nature de *ce que / ce qui* (relative vs complétive de relais)."
---

<!-- tcf_yield: moyen -->
<!-- domain: research -->
<!-- domain: politics -->
<!-- domain: press -->

# Phrases longues à hypotaxe complexe — analyse des subordonnées emboîtées

## 1. La question, en une phrase

> L'**hypotaxe** est la construction d'une phrase par **subordination** — une principale qui régit une ou plusieurs subordonnées, lesquelles peuvent elles-mêmes en régir d'autres — par opposition à la **parataxe**, qui se contente de juxtaposer ou de coordonner des propositions de même rang. Au seuil C2, l'enjeu n'est pas de **produire** ces phrases (1 ou 2 suffisent en EE) mais de les **analyser** sans s'y perdre dans la CE soutenue.

L'éditorialiste, le juriste, l'essayiste et le chercheur empilent les subordonnées : un texte du *Monde diplomatique*, un arrêt de la Cour de cassation ou un article de doctrine peuvent enchaîner 5 à 7 propositions dans une seule phrase de 50 à 80 mots. Sans algorithme de lecture, la compréhension s'effondre.

## 2. Typologie des subordonnées (rappel-tableau)

| Type | Charnière typique | Mode gouverné | Renvoi unité |
|---|---|---|---|
| **Relative** | *qui, que, dont, où, lequel, auquel, ce qui/que/dont* | ind. (fait) / subj. (antécédent indéfini, superlatif) | `gram-b1-09`, `gram-b2-13`, `gram-c1-01` |
| **Complétive** | *que* (après verbe de déclaration, opinion, volonté, doute…) | ind. (espérer, affirmer) / subj. (vouloir, douter, falloir) | `gram-b2-01`, `gram-b2-12`, `gram-c1-03` |
| **Circonstancielle de cause** | *parce que, puisque, comme, étant donné que, vu que* | indicatif | `gram-b2-05`, `gram-c1-08` |
| **Circ. de temps** | *quand, lorsque, dès que, avant que, après que, à mesure que* | ind. (postériorité/simultanéité) / subj. (*avant que*) | `gram-b2-10` |
| **Circ. de but** | *pour que, afin que, de sorte que* | subjonctif | `gram-b2-07` |
| **Circ. de concession** | *bien que, quoique, encore que, sans que* | subjonctif | `gram-b2-08`, `gram-c1-09` |
| **Circ. de condition** | *si, à condition que, pourvu que, pour peu que* | ind. (*si*) / subj. (autres) | `gram-b1-14`, `gram-c1-10` |
| **Circ. de conséquence** | *si … que, tellement … que, si bien que, au point que* | indicatif | `gram-b2-06` |
| **Circ. d'opposition** | *alors que, tandis que, là où* | indicatif | `gram-b2-09` |
| **Infinitive** | verbes de perception : *voir, entendre, sentir, regarder* + inf. | infinitif | (incluse ici) |
| **Participiale** | participe + sujet propre : *le travail terminé, …* | participe | `gram-c1-11` |

> ⚠ Une subordonnée se définit par **trois traits cumulatifs** : (1) elle a un verbe conjugué (sauf infinitive et participiale) ; (2) elle est introduite par un **relateur** (pronom relatif) ou une **conjonction** ; (3) elle dépend hiérarchiquement d'une autre proposition.

## 3. Six pièces de l'analyse

### 3.1 Parataxe vs hypotaxe — deux phrases, deux architectures

> **Parataxe** : *Le ministre est arrivé en retard. Il avait pris l'avion. Une grève paralysait les trains.*
> **Hypotaxe** : *Le ministre, **qui avait dû prendre l'avion parce qu'une grève paralysait les trains**, est arrivé en retard.*

Le contenu propositionnel est identique ; l'hypotaxe **hiérarchise** (la grève est cause de la prise d'avion, qui est cause du retard), là où la parataxe **aligne** et laisse au lecteur le soin de reconstruire les relations. La presse populaire et l'oral spontané préfèrent la parataxe ; la presse soutenue, le droit et la philosophie préfèrent l'hypotaxe.

### 3.2 Algorithme d'analyse — la méthode des 4 passes

Soit : « *Bien qu'il fût conscient des risques que comportait l'opération, le directeur, qui avait toujours privilégié l'audace, décida que, dès le lendemain, on lancerait le projet, pour peu que le conseil l'approuvât.* » (40 mots)

1. **Passe 1 — principale** : repérer le verbe **non subordonné**. Ici : *décida* (PS de *décider*). Sujet : *le directeur*. Principale : *le directeur […] décida […]*.
2. **Passe 2 — charnières et subordonnées de niveau 1** (dépendant directement de la principale) :
   - *bien qu'**il fût conscient des risques*** — circ. de concession (subj.), antéposée.
   - *qui avait toujours privilégié l'audace* — relative explicative (ind. PQP), insérée entre sujet et verbe de la principale.
   - *que […] on lancerait le projet* — complétive COD de *décida* (ind. cond.).
3. **Passe 3 — emboîtements (niveau 2)** :
   - dans la concessive *bien qu'il fût conscient des risques*, on a une relative : *que comportait l'opération* (ind. imp.), antécédent *risques*.
   - dans la complétive *que […] on lancerait le projet*, on a une condition : *pour peu que le conseil l'approuvât* (subj. imp.).
4. **Passe 4 — modes** : concession → subj. (*fût*) ; relative descriptive → ind. (*comportait*, *avait privilégié*) ; complétive de *décider* → ind. (*lancerait*, cond. de futur dans le passé) ; *pour peu que* → subj. (*approuvât*).

Bilan : **1 principale + 5 subordonnées emboîtées sur 2 niveaux**.

### 3.3 Exemples d'analyse de phrases longues

> ⚠ Les trois exemples qui suivent sont des **phrases-école** (style éditorial vraisemblable) construites pour l'illustration syntaxique. Ce ne sont **pas** des citations attestées.

**Exemple A — registre éditorial politique** (45 mots)

> *Alors que les chefs d'État réunis à Bruxelles affirmaient que la coopération restait la seule issue, plusieurs observateurs, dont nul ne contestait l'expérience, soulignèrent que la décision finale dépendrait en réalité de paramètres que peu de gouvernements maîtrisaient encore.*

Analyse :
- **Principale** : *plusieurs observateurs […] soulignèrent que…* (verbe *soulignèrent*, PS).
- Niveau 1 (3 subordonnées) :
  - *alors que les chefs d'État […] affirmaient que…* — circ. d'opposition (ind. imp.) ; antéposée.
  - *dont nul ne contestait l'expérience* — relative déterminative (ind. imp.), antécédent *observateurs*.
  - *que la décision finale dépendrait […] de paramètres* — complétive COD de *soulignèrent* (ind. cond.).
- Niveau 2 (2 subordonnées) :
  - dans la circ. d'opposition : *que la coopération restait la seule issue* — complétive COD de *affirmaient* (ind. imp.).
  - dans la complétive : *que peu de gouvernements maîtrisaient encore* — relative déterminative (ind. imp.), antécédent *paramètres*.

Bilan : **1 principale + 5 subordonnées sur 2 niveaux**.

**Exemple B — registre académique / recherche** (52 mots)

> *Les chercheurs qui avaient conduit l'enquête longitudinale, dont les résultats ne seraient publiés qu'au printemps suivant, refusèrent de commenter les hypothèses que la presse avait avancées, estimant qu'il convenait d'attendre que le comité de lecture eût rendu ses conclusions avant que toute interprétation publique ne fût hasardée.*

Analyse :
- **Principale** : *les chercheurs […] refusèrent de commenter les hypothèses…* (verbe *refusèrent*, PS).
- Niveau 1 :
  - *qui avaient conduit l'enquête longitudinale* — relative déterminative (ind. PQP), antécédent *chercheurs*.
  - *dont les résultats ne seraient publiés qu'au printemps suivant* — relative explicative (ind. cond.), antécédent *enquête longitudinale*.
  - *que la presse avait avancées* — relative déterminative (ind. PQP), antécédent *hypothèses*.
  - *estimant qu'il convenait…* — participiale circonstancielle (gérondif de manière / cause).
- Niveau 2 (dans la participiale *estimant*) : *qu'il convenait d'attendre que…* — complétive (ind. imp. impersonnel).
- Niveau 3 : *que le comité de lecture eût rendu ses conclusions* — complétive (subj. PQP, déclenché par *attendre que*).
- Niveau 4 : *avant que toute interprétation publique ne fût hasardée* — circ. de temps (subj. imp., avec *ne* explétif — cf. `gram-c1-15`).

Bilan : **1 principale + 6 subordonnées sur 4 niveaux**. Phrase à la limite haute du tolérable, même en registre académique.

**Exemple C — registre presse soutenue / chronique** (38 mots)

> *Si l'on en croit les rares témoins que la défense a pu produire, l'accusé, dont le silence avait jusqu'alors intrigué, aurait reconnu, lorsque le juge l'a interrogé en début d'audience, qu'il regrettait son geste.*

Analyse :
- **Principale** : *l'accusé […] aurait reconnu […] qu'il regrettait son geste.*
- Niveau 1 :
  - *si l'on en croit les rares témoins…* — circ. de condition (ind., valeur restrictive).
  - *dont le silence avait jusqu'alors intrigué* — relative explicative (ind. PQP), antécédent *l'accusé*.
  - *lorsque le juge l'a interrogé en début d'audience* — circ. de temps (ind. PC).
  - *qu'il regrettait son geste* — complétive COD de *aurait reconnu* (ind. imp.).
- Niveau 2 : *que la défense a pu produire* — relative déterminative (ind. PC), antécédent *témoins*.

Bilan : **1 principale + 5 subordonnées sur 2 niveaux**.

### 3.4 Niveaux d'emboîtement — combien est lisible ?

| Profondeur | Effet sur la lecture |
|---|---|
| 1 (subordonnées en chaîne sous la principale) | naturel, fluide ; presse standard. |
| 2 (subordonnée d'une subordonnée) | soutenu mais lisible ; éditorial, recherche. |
| 3 | très soutenu ; juridique, philosophie ; ralentit la lecture. |
| 4+ | ostentatoire ; risque d'ambiguïté ; à éviter en production. |

> ⚠ Au-delà de **2 niveaux** d'emboîtement, le correcteur de l'épreuve EE valorise rarement la complexité ; il sanctionne plus volontiers l'illisibilité ou l'ambiguïté qui en résultent.

### 3.5 Lecture rapide vs analyse fine

| Geste | Lecture rapide (CE TCF) | Analyse fine (préparation) |
|---|---|---|
| Trouver la principale | en 5 s, oui (verbe principal isolé) | systématique. |
| Subordonnées | traitées comme **parenthèses informatives** ; on garde le squelette. | chaque charnière annotée, type identifié. |
| Modes | ignorés sauf si la question porte dessus. | systématiquement vérifiés. |
| Objectif | comprendre le **propos principal** + 1-2 nuances. | maîtriser la grammaire pour réviser. |

> Stratégie CE : si la phrase fait > 35 mots, repérer la principale **d'abord**, traiter le reste comme un commentaire ; ne relire en détail que si la question l'exige.

### 3.6 Production écrite équilibrée — la règle 1 + 2 + 1

Pour un essai de 200-250 mots (TCF EE tâche 2-3), une architecture qui passe haut :
- **1** phrase hypotaxique d'ouverture (≤ 35 mots, 2-3 subordonnées max, 1 seul niveau d'emboîtement).
- **2-3** phrases paratactiques ou faiblement hypotaxiques (15-25 mots) pour développer.
- **1** phrase hypotaxique de synthèse en conclusion.

> ⚠ Trois phrases hypotaxiques d'affilée = effet de copie surécrite ; le correcteur soupçonne le pastiche.

## 4. Faux amis et écueils

### 4.1 Ambiguïté référentielle

> *Le directeur a rencontré l'avocat **qui** avait préparé le dossier.*

Qui a préparé le dossier — le directeur ou l'avocat ? Le pronom relatif *qui* renvoie en principe à l'antécédent immédiat (*l'avocat*), mais le contexte peut rendre l'interprétation flottante. **Remède** : couper la phrase, ou répéter le référent (*ce dernier*, *le second*).

### 4.2 Accord — chaque verbe avec **son** sujet

> *Les hypothèses **que** la presse, ainsi que plusieurs experts, **a avancées** / **ont avancées** ?*

La subordonnée relative a pour sujet *la presse, ainsi que plusieurs experts*. L'accord se fait avec *la presse* (*a avancées*) si l'on tient *ainsi que* pour une adjonction, avec *la presse + experts* (*ont avancées*) si l'on le tient pour coordination. La norme contemporaine penche pour l'**accord avec le premier sujet** quand *ainsi que* est inséré entre virgules.

### 4.3 Lourdeur — quand l'hypotaxe nuit

> *Le rapport, qui avait été rédigé par le comité que le ministre avait nommé après que la commission qui l'avait précédé eut démissionné, fut publié.*

Quatre relatives + une circonstancielle de temps en cascade = **illisibilité**. Réécriture en parataxe : *La commission précédente avait démissionné. Le ministre avait alors nommé un nouveau comité, qui rédigea le rapport. Celui-ci fut publié.* — trois phrases, claires.

### 4.4 Le piège du *que* polyvalent

Le mot *que* peut être : (a) pronom relatif COD (*le livre **que** j'ai lu*) ; (b) conjonction introduisant une complétive (*je pense **que** tu as raison*) ; (c) second terme de comparaison (*plus grand **que** lui*) ; (d) reprise d'une conjonction (*si tu viens et **que** tu apportes…*). **Identifier la fonction de chaque *que*** avant de découper.

## 5. Mini-corpus

<!-- AUDIT: §5 — phrases-école construites pour l'analyse syntaxique, non citations attestées. À remplacer par 3-5 extraits sourcés (éditorial Le Monde, arrêt Cass., article de doctrine, page culturelle Le Devoir) avant clearance EVAL Phase 2. -->

> ⚠ **Section incomplète** : phrases pédagogiques, marquées **non attestées**. Servent uniquement d'objets d'analyse.

1. *[Style éditorial — politique européenne]* — « Quoiqu'il fût admis que les sanctions, dont l'efficacité prêtait à débat, devraient être maintenues, le conseil, qui s'était réuni en urgence, recommanda qu'on en différât l'application jusqu'à ce que les négociateurs eussent rendu compte de leurs entretiens. »
   <!-- AUDIT: phrase-école ; remplacer par éditorial Le Monde ou Le Devoir réel. -->
2. *[Style académique — recherche en sciences sociales]* — « Les enquêtés que les chercheurs avaient sélectionnés selon des critères qui garantissaient une représentativité acceptable affirmèrent, lorsqu'on les interrogea sur leurs motivations, qu'ils ignoraient eux-mêmes les raisons pour lesquelles ils avaient consenti à participer. »
   <!-- AUDIT: phrase-école ; à remplacer par extrait de revue type Actes de la recherche en sciences sociales. -->
3. *[Style presse soutenue — chronique judiciaire]* — « Bien que l'accusation, qui n'avait cessé de soutenir la thèse de la préméditation, eût produit des témoins dont la crédibilité avait pourtant été contestée, le jury, après plusieurs heures de délibération, conclut qu'il subsistait un doute raisonnable. »
   <!-- AUDIT: phrase-école ; à remplacer par chronique judiciaire Le Monde ou Libération attestée. -->
4. *[Style essai philosophique]* — « Si l'on admet que la liberté, telle que la définissent les penseurs des Lumières, suppose que chacun puisse délibérer sans contrainte, il faut alors concéder que toute institution qui restreint cette délibération, fût-ce au nom du bien commun, en affaiblit le principe même. »
   <!-- AUDIT: phrase-école inspirée du style essai ; à remplacer par extrait d'un essai sourcé. -->

## 6. Exercices

### 6.1 Identification de la principale — 6 items (closed)

Soulignez la **proposition principale** de chaque phrase (sujet + verbe principal). Corrigé en §7.1.

1. *Quand la nuit tomba, le voyageur, qui marchait depuis l'aube, s'arrêta devant l'auberge.*
2. *Bien qu'elle eût longuement hésité, Marie décida finalement qu'elle accepterait l'offre que l'éditeur lui avait soumise.*
3. *Le rapport que la commission avait rédigé, et dont les conclusions, selon plusieurs experts, étaient fragiles, fut néanmoins approuvé.*
4. *Si vous estimez que les preuves sont insuffisantes, il convient de demander un complément d'enquête avant que le dossier ne soit transmis au procureur.*
5. *Alors que les délégués discutaient encore de la clause litigieuse, le président, visiblement agacé, annonça la suspension de la séance.*
6. *L'écrivain dont nous parlions hier publiera, dès que son éditeur l'aura autorisé, l'essai qu'il prépare depuis trois ans.*

### 6.2 Typologie des subordonnées — 8 items

Pour chaque subordonnée **en gras**, indiquez son type (relative / complétive / circ. de cause / temps / but / concession / condition / conséquence / opposition / infinitive / participiale) et son mode. Corrigé en §7.2.

1. *Je doute **qu'il vienne** demain.*
2. *L'enfant **qui pleurait** s'est calmé.*
3. ***Bien qu'il pleuve***, nous sortirons.
4. *Il a parlé fort **pour que tout le monde l'entendît**.*
5. *Je l'ai vu **partir précipitamment**.*
6. ***La séance terminée***, les délégués se dispersèrent.
7. *Il a réussi **parce qu'il a beaucoup travaillé**.*
8. ***Alors que les uns approuvaient***, les autres protestaient.

### 6.3 Analyse structurée d'une phrase longue — 3 items

Pour chaque phrase, (a) identifiez la principale ; (b) listez les subordonnées avec leur type ; (c) indiquez les niveaux d'emboîtement. Corrigé en §7.3.

1. *Bien que les économistes que le gouvernement avait consultés eussent recommandé la prudence, le ministre annonça que les nouvelles mesures, dont l'application serait immédiate, entreraient en vigueur dès lundi.*
2. *Si l'on en croit les sources qui ont été citées dans la presse, le projet, qui suscite déjà de nombreuses critiques, ne pourra aboutir tant que les opposants, dont l'influence reste considérable, n'auront pas été consultés.*
3. *Le chercheur souligna que les résultats qu'il présentait, et qui contredisaient les hypothèses que ses prédécesseurs avaient longtemps défendues, devraient faire l'objet d'une vérification indépendante avant qu'on en tirât des conclusions définitives.*

### 6.4 Réécriture parataxe ↔ hypotaxe — 4 items

Réécrivez chaque suite parataxique en **une seule** phrase hypotaxique (≤ 35 mots) ; puis pour les phrases hypotaxiques, redéployez en parataxe (3-4 phrases courtes). Corrigé en §7.4.

1. **Parataxe → hypotaxe** : *Le ministre est arrivé. Il avait pris l'avion. Une grève des trains paralysait le pays. Il a aussitôt convoqué la presse.*
2. **Hypotaxe → parataxe** : *Le candidat, qui avait préparé son intervention pendant des semaines, perdit ses moyens lorsque le jury, dont la sévérité était notoire, lui posa une question qu'il n'avait pas anticipée.*
3. **Parataxe → hypotaxe** : *Les négociations ont échoué. Aucun accord n'a été trouvé. Les délégations sont rentrées chez elles. Une nouvelle réunion sera convoquée le mois prochain.*
4. **Hypotaxe → parataxe** : *Bien que le projet, qui avait été élaboré par une équipe que tous reconnaissaient compétente, eût recueilli l'approbation du conseil scientifique, le directeur, après une longue réflexion, décida de le suspendre.*

## 7. Corrigés

### 7.1 Identification de la principale

1. *le voyageur […] s'arrêta devant l'auberge*.
2. *Marie décida […]*.
3. *Le rapport […] fut […] approuvé*.
4. *il convient de demander un complément d'enquête*.
5. *le président […] annonça la suspension de la séance*.
6. *L'écrivain […] publiera […] l'essai*.

### 7.2 Typologie

| # | Subordonnée | Type | Mode |
|---|---|---|---|
| 1 | qu'il vienne | complétive (COD de *doute*) | subj. présent |
| 2 | qui pleurait | relative déterminative (antéc. *l'enfant*) | ind. imp. |
| 3 | Bien qu'il pleuve | circ. de concession | subj. présent |
| 4 | pour que tout le monde l'entendît | circ. de but | subj. imp. |
| 5 | partir précipitamment | infinitive (régie par *vu*) | infinitif |
| 6 | La séance terminée | participiale circonstancielle (temps/cause) | participe passé |
| 7 | parce qu'il a beaucoup travaillé | circ. de cause | ind. PC |
| 8 | Alors que les uns approuvaient | circ. d'opposition | ind. imp. |

### 7.3 Analyse structurée

**Item 1.** Principale : *le ministre annonça que…* (verbe *annonça*).
- Niveau 1 : *bien que les économistes […] eussent recommandé la prudence* (circ. concession, subj. PQP) ; *que les nouvelles mesures […] entreraient en vigueur dès lundi* (complétive COD, ind. cond.).
- Niveau 2 : *que le gouvernement avait consultés* (relative déterminative, antéc. *économistes*, ind. PQP) ; *dont l'application serait immédiate* (relative explicative, antéc. *mesures*, ind. cond.).
- **Bilan** : 1 principale + 4 subordonnées sur 2 niveaux.

**Item 2.** Principale : *le projet […] ne pourra aboutir…*.
- Niveau 1 : *si l'on en croit les sources* (circ. condition, ind. présent) ; *qui suscite déjà de nombreuses critiques* (relative explicative, antéc. *projet*, ind. présent) ; *tant que les opposants […] n'auront pas été consultés* (circ. temps, ind. futur ant.).
- Niveau 2 : *qui ont été citées dans la presse* (relative déterminative, antéc. *sources*, ind. PC) ; *dont l'influence reste considérable* (relative explicative, antéc. *opposants*, ind. présent).
- **Bilan** : 1 principale + 5 subordonnées sur 2 niveaux.

**Item 3.** Principale : *le chercheur souligna que…* (verbe *souligna*).
- Niveau 1 : *que les résultats […] devraient faire l'objet d'une vérification indépendante* (complétive COD, ind. cond.).
- Niveau 2 : *qu'il présentait* (relative déterminative, antéc. *résultats*, ind. imp.) ; *qui contredisaient les hypothèses* (relative coordonnée à la précédente, antéc. *résultats*, ind. imp.) ; *avant qu'on en tirât des conclusions définitives* (circ. temps, subj. imp.).
- Niveau 3 : *que ses prédécesseurs avaient longtemps défendues* (relative déterminative, antéc. *hypothèses*, ind. PQP).
- **Bilan** : 1 principale + 4 subordonnées sur 3 niveaux.

### 7.4 Réécriture

1. **Modèle hypotaxique** : *Le ministre, qui avait dû prendre l'avion parce qu'une grève paralysait les trains, convoqua aussitôt la presse à son arrivée.* (28 mots, 2 subordonnées emboîtées sur 2 niveaux.)
2. **Modèle paratactique** : *Le candidat avait préparé son intervention pendant des semaines. Le jury, réputé sévère, lui posa une question. Il ne l'avait pas anticipée. Il perdit ses moyens.* (4 phrases courtes.)
3. **Modèle hypotaxique** : *Les négociations ayant échoué sans qu'aucun accord ne soit trouvé, les délégations sont rentrées chez elles, une nouvelle réunion étant prévue le mois prochain.* (26 mots ; participiale absolue + circ. concession + participiale finale.)
4. **Modèle paratactique** : *Le projet avait été élaboré par une équipe compétente. Le conseil scientifique l'avait approuvé. Le directeur a néanmoins, après une longue réflexion, décidé de le suspendre.* (3 phrases.)

> Note : en EE, le **modèle hypotaxique** est valorisé pour l'ouverture et la conclusion ; le **modèle paratactique** pour le développement. Alterner les deux est le signe d'un C1+ confirmé.

## 8. Carte de synthèse

**Hypotaxe — l'essentiel C2**

| Critère | Détail |
|---|---|
| Définition | Construction par subordination (≠ parataxe = juxtaposition/coordination). |
| Enjeu C2 | **Analyser** une phrase de 40-60 mots en CE soutenue ; produire 1-2 phrases hypotaxiques en EE. |
| Outils | Pronoms relatifs, conjonctions de subordination, *que* complétif. |
| Limite | 2 niveaux d'emboîtement raisonnables ; au-delà, illisibilité. |

**Les 5 types de subordonnées à reconnaître**

| Type | Marqueur typique | Mode |
|---|---|---|
| Relative | *qui, que, dont, où, lequel, ce qui/que* | ind. / subj. (antéc. indéfini) |
| Complétive | *que* (après verbe) | ind. ou subj. selon le verbe régissant |
| Circonstancielle | conj. spécifique par sens | variable (voir tableau §2) |
| Infinitive | verbe de perception + inf. | infinitif |
| Participiale | participe + sujet propre | participe |

**Algorithme d'analyse en 4 passes**

1. **Principale** = verbe non subordonné. L'isoler.
2. **Subordonnées de niveau 1** = celles qui dépendent directement de la principale. Pour chacune : type + mode.
3. **Subordonnées de niveau 2+** = celles enchâssées dans une subordonnée. Idem.
4. **Vérifier les accords** — chaque verbe avec **son** sujet, pas avec le plus proche.

**Production EE — règle 1+2+1**

- 1 phrase hypotaxique d'ouverture (≤ 35 mots, ≤ 2 niveaux).
- 2-3 phrases paratactiques de développement.
- 1 phrase hypotaxique de synthèse.

## 9. Pour aller plus loin

- Riegel et al. (2018), ch. XV — *La phrase complexe : subordination et hypotaxe*. [`riegel2018_grammaire`] <!-- AUDIT: chapitre à confirmer. -->
- Grevisse & Goosse (2016), §§ sur la phrase complexe et les propositions subordonnées. [`grevisse2016_bonusage`]
- Banque de dépannage linguistique (OQLF) — fiches sur la subordination et la concordance. <!-- AUDIT: URL exacte à insérer (bdl.oqlf.gouv.qc.ca). -->
- Unités liées :
  - `gram-b1-09` — Pronoms relatifs simples (qui, que, où, dont) — base des relatives.
  - `gram-b2-13` — Pronoms relatifs composés (lequel, duquel, à laquelle…).
  - `gram-b2-01` — Subjonctif présent — déclencheurs (complétives à mode variable).
  - `gram-b2-12` — Discours rapporté (complétives indirectes).
  - `gram-b2-05` — Cause (circ. de cause).
  - `gram-b2-06` — Conséquence.
  - `gram-b2-07` — But.
  - `gram-b2-08` — Concession.
  - `gram-b2-09` — Opposition.
  - `gram-b2-10` — Temps.
  - `gram-c1-11` — Subordonnée participiale (*le travail terminé, …*).
  - `gram-c1-15` — *Ne* explétif (avant que, à moins que, comparaisons).
  - `gram-c2-10` — Concordance des temps dans le récit littéraire.

---

<!-- end-of-unit:gram-c2-05 -->

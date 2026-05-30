---
id: tools-glossaire
title: Glossaire CEFR / NCLC / TCF
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 8
register: france
tags: [tools, glossary, cefr, nclc, terminology, reference]
audit:
  status: cleared
  confidence_overall: high
  notes: "Glossaire compilé à partir de : (a) Cadre européen commun de référence (CEFR), (b) Niveaux de compétence linguistique canadiens (NCLC), (c) Test de connaissance du français Canada (TCF Canada / France Éducation International), (d) IRCC documentation. Les chiffres et seuils sont audités contre les sources officielles."
hide:
  - toc
---

# Glossaire — CEFR / NCLC / TCF Canada

> Tous les termes techniques qui apparaissent dans le corpus, alphabétiques, avec définition courte + renvoi vers source autoritative.

## A

??? abstract "A1, A2 — niveaux CEFR débutants"
    Cadre européen commun de référence : **A1** = utilisateur élémentaire débutant ; **A2** = élémentaire avancé. Correspond à **NCLC 1-3** côté canadien. Le TCF Canada teste à partir d'A1 mais ce corpus suppose A2 minimum atteint au démarrage.

??? abstract "Anki / Apkg"
    Logiciel open-source de **spaced repetition** (répétition espacée). Le deck du corpus (`.apkg`) génère ~ 1 800 cartes auditées. Voir [`flashcards/`](https://github.com/bettyguo/tcf_materials/tree/main/flashcards). Pour une version web légère, voir [`flashcards SRS`](flashcards.md).

??? abstract "Anglicisme / calque"
    Mot ou structure transposé(e) directement de l'anglais sans adaptation. Exemples : « supporter quelqu'un » au sens de soutenir, « actuellement » au sens d'« en fait ». Détectés par [`tools/anglicisms.yaml`](https://github.com/bettyguo/tcf_materials/blob/main/tools/anglicisms.yaml). Voir aussi cheatsheet [`09_anti_anglicismes.md`](../08_cheatsheets/09_anti_anglicismes.md).

??? abstract "Audit pipeline alive"
    Système de validation continue qui vérifie chaque modification du corpus (orthographe, calques, registres, distracteurs, schémas). Sans intervention, le pipeline détecte les régressions et bloque la PR. Voir [`tools/audit_french.py`](https://github.com/bettyguo/tcf_materials/blob/main/tools/audit_french.py).

## B

??? abstract "B1, B2 — niveaux CEFR intermédiaires"
    **B1** = utilisateur indépendant seuil (NCLC 4-5) ; **B2** = indépendant avancé (NCLC 6-8). C'est le **cœur de cible** du TCF Canada (~ 49 % du score CO/CE pondéré). Stratégie B2-first du corpus.

??? abstract "Binding (NCLC binding)"
    Le **minimum** des quatre NCLC (CO, CE, EE, EO). C'est ce score qui décide votre éligibilité au bonus CRS. Une compétence faible casse tout. Voir [`calculateur NCLC`](calculateur-nclc.md).

## C

??? abstract "C1, C2 — niveaux CEFR avancés"
    **C1** = autonome (NCLC 9-10) ; **C2** = maîtrise (au-delà des NCLC). NCLC 10 est plafond IRCC pour Express Entry — il n'y a pas de NCLC 11 / 12.

??? abstract "CCDMD"
    Centre collégial de développement de matériel didactique (Québec). Source autoritative pour le français standard nord-américain.

??? abstract "CE — Compréhension écrite"
    L'une des 4 épreuves du TCF Canada. **39 items / 60 min**, sur **699 points**. Format : 7 types de textes (annonce → article → courrier → essai).

??? abstract "CEFR / CECRL"
    **Common European Framework of Reference for Languages** (Cadre européen commun de référence). 6 niveaux (A1, A2, B1, B2, C1, C2). C'est l'échelle utilisée par tous les examens européens (TCF, DELF, DALF, TEF) ; convertie en NCLC par IRCC.

??? abstract "CLB"
    **Canadian Language Benchmarks** — l'équivalent anglais du NCLC. CLB 7 anglais = NCLC 7 français. Pour Express Entry, vous avez besoin des deux scores si vous déclarez bilingue.

??? abstract "CO — Compréhension orale"
    Première épreuve TCF Canada. **39 items / 35 min**, sur **699 points**. Stratégie clé : « j'ai entendu, je choisis, je passe » — pas de retour en arrière. Voir [`03_listening/00_strategy.md`](../03_listening/00_strategy.md).

??? abstract "Conditionnel (mode et temps)"
    Le **conditionnel** est un **mode** (à côté de l'indicatif, du subjonctif, de l'impératif). Il a deux temps : **présent** (« je voudrais ») et **passé** (« j'aurais voulu »). Usages : hypothèse, politesse, conditionnel journalistique. Voir [`Cheatsheet conditionnel`](../08_cheatsheets/02_conditionnel_hypothese.md).

??? abstract "CRS — Comprehensive Ranking System"
    Système de points IRCC pour Express Entry. **Maximum 1 200 pts**. Le français NCLC 7+ peut ajouter **25 ou 50 pts** selon le niveau d'anglais. Calcul exact : [outil officiel IRCC](https://www.cic.gc.ca/english/immigrate/skilled/crs-tool.asp).

## D

??? abstract "Diacritique"
    Marque graphique ajoutée à une lettre (é, è, ê, ç, î…). Modifient parfois le sens (« a » verbe vs « à » préposition). Le drill [`conjugaison`](conjugaison.md) tolère leur absence à la saisie, mais en EE/EO l'examinateur les attend.

??? abstract "Distracteur"
    Une réponse incorrecte mais plausible dans un QCM. Le corpus audite chaque distracteur pour qu'il soit **incorrect mais cohérent** (pas trivialement éliminable). Voir [`Cheatsheet anatomie distracteurs`](../08_cheatsheets/11_distractor_anatomy.md).

## E

??? abstract "EE — Expression écrite"
    Troisième épreuve TCF Canada. **3 tâches / 60 min** au total. T1 (60-120 mots) = message court ; T2 (120-150 mots) = article ; T3 (180-250 mots) = argumentation. Notée **/ 20**. Voir [`compteur-mots`](compteur-mots.md) pour le brouillon.

??? abstract "EO — Expression orale"
    Quatrième épreuve. **3 tâches / 12 min**. T1 (1-2 min) = échange court ; T2 (3 min) = jeu de rôle ; T3 (5 min) = exposé argumenté. Notée **/ 20**. Voir [`Playbook EO`](../06_speaking/index.md).

??? abstract "Edge-TTS"
    Synthèse vocale neuronale de Microsoft Edge, utilisée par le corpus pour générer les audios. Voix françaises de qualité. Pour la dictée web, voir aussi [`dictee`](dictee.md) qui utilise la Web Speech API du navigateur.

??? abstract "Express Entry"
    Système IRCC de gestion des demandes de résidence permanente pour les programmes économiques (TEC, FSW, FST). Score CRS détermine l'invitation. NCLC 7+ français + CLB 9+ anglais = bonus 50 pts.

## F

??? abstract "Faux-ami"
    Mot qui ressemble à un mot d'une autre langue mais a un sens différent. Ex. « actually » (en fait) vs « actuellement » (en ce moment). 56 entrées dans la cheatsheet [`09_anti_anglicismes.md`](../08_cheatsheets/09_anti_anglicismes.md).

??? abstract "FEI"
    **France Éducation International** (ex-CIEP). Organisme français qui conçoit et administre le TCF. Source autoritative des tables de conversion brut → CEFR → NCLC.

## I

??? abstract "Indicatif"
    Mode verbal du **réel constaté**. Présent, passé composé, imparfait, plus-que-parfait, futur, futur antérieur, passé simple, passé antérieur. C'est le mode par défaut ; tout ce qui n'est pas exception (subjonctif, conditionnel, impératif) est indicatif.

??? abstract "IRCC"
    **Immigration, Refugees and Citizenship Canada**. Le ministère canadien responsable d'Express Entry, des PNP, et de la citoyenneté.

## L

??? abstract "Liaison / enchaînement"
    **Liaison** = consonne finale muette prononcée devant voyelle (les_amis, /lez‿ami/). **Enchaînement** = consonne finale prononcée se rattache à la voyelle suivante (avec elle, /a-vɛ-kɛl/). Voir cheatsheet [`08_liaisons`](../08_cheatsheets/08_liaisons.md).

## M

??? abstract "Mock exam"
    Examen blanc complet (les 4 épreuves chronométrées). Le corpus contient 4 mocks. Recommandation : 1 toutes les 2-3 semaines après la semaine 5.

## N

??? abstract "NCLC"
    **Niveaux de compétence linguistique canadiens** — l'échelle officielle IRCC pour le français. 12 niveaux (1 à 12, mais Express Entry plafonne à 10). Tableau de conversion : voir [`calculateur NCLC`](calculateur-nclc.md).

## P

??? abstract "Participe passé (accord du)"
    Règle d'accord du participe passé en genre et nombre. Avec « être » → accord avec le sujet (« elle est partie »). Avec « avoir » → accord avec le COD si antéposé (« la lettre que j'ai écrite »). Source classique de fautes en EE.

??? abstract "Phonologie"
    Étude des sons distinctifs d'une langue. Le corpus traite : système vocalique (16 voyelles, dont nasales), système consonantique, schwa, liaisons, prosodie. 8 unités dans [`06_speaking/00_phonology/`](../06_speaking/00_phonology/index.md).

??? abstract "Pivot (phrase-pivot)"
    Phrase modèle prête à l'emploi pour structurer un texte EE/EO. Le corpus contient 193 phrases-pivots T1/T2/T3. Voir [`05_writing/00_pivots/`](../05_writing/00_pivots/index.md).

??? abstract "Pomodoro"
    Technique de productivité : 25 min de travail concentré + 5 min de pause, par cycles de 4. Voir [`minuteur`](minuteur.md) pour le widget.

## Q

??? abstract "Québécisme"
    Mot ou tournure typique du français québécois. Certains sont acceptables en français standard (« courriel », « stationnement »), d'autres non (« bienvenue » au sens de « de rien »). Détecteur : `tools/quebecismes.yaml`. Cheatsheet : [`12_quebec_france`](../08_cheatsheets/12_quebec_france.md).

## R

??? abstract "Registre"
    Niveau de langue : **familier**, **standard**, **soutenu**. Le TCF EE T3 attend du **standard à soutenu** ; T1 message à un ami peut être familier-standard. Voir [`05_writing/00_rubric.md`](../05_writing/00_rubric.md).

## S

??? abstract "Schwa (e muet)"
    Voyelle [ə] souvent élidée en français (« je le sais » prononcé /ʒəl(ə)sɛ/). Règles de chute du schwa : voir [`06_speaking/00_phonology/`](../06_speaking/00_phonology/index.md).

??? abstract "SM-2 / SRS"
    **Spaced Repetition System** — algorithme qui replanifie une carte selon votre maîtrise. Le corpus utilise un SM-2 simplifié à 4 grades (1j / 3j / 7j / 14j). Voir [`flashcards`](flashcards.md).

??? abstract "Subjonctif"
    Mode verbal du **virtuel, du désirable, de l'incertain**. Déclenché par expressions de nécessité, doute, sentiment, concession, but. Voir cheatsheet [`01_subjonctif_declencheurs`](../08_cheatsheets/01_subjonctif_declencheurs.md) et [`flashcards Modes`](flashcards.md).

## T

??? abstract "Taper / tapering"
    Réduction progressive du volume d'étude à l'approche de l'examen pour optimiser la performance le jour J. **J-7 à J-1** : volume réduit, pas de nouveau contenu, sommeil maximal. Voir [`protocole taper`](../09_strategy/06_taper_protocol.md).

??? abstract "TCF Canada"
    **Test de connaissance du français — Canada**. L'examen IRCC-accepté pour l'Express Entry et la citoyenneté. Distinct du TCF tout court (standard) et du TEF Canada (autre examen accepté). Voir [`FAQ`](faq.md#sur-le-tcf-canada).

??? abstract "TTS"
    **Text-to-Speech** — synthèse vocale. Le corpus utilise Edge-TTS pour la génération audio. Le [`dictee`](dictee.md) utilise la Web Speech API du navigateur.

## V

??? abstract "Verlan"
    Argot français consistant à inverser les syllabes (« femme » → « meuf »). **Non pertinent** pour le TCF — registre familier non testé. Mentionné uniquement pour la culture.

## Voir aussi

- [FAQ](faq.md)
- [Glossaire IRCC officiel](https://www.canada.ca/en/immigration-refugees-citizenship/services/canadians/celebrate-being-canadian/teachers-corner/glossary.html)
- [Bibliographie complète du corpus](../../references.bib)
- [Retour aux outils](index.md)

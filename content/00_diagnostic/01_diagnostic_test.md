---
id: diag-test
title: Diagnostic — épreuve
section: diagnostic
cefr: B2
nclc_target: 7
estimated_minutes: 70
register: mixed
audio:
  required: false   # this aggregate file contains scripts for 10 short audio items, generated as diag-co-01..10
tags: [diagnostic, calibration]
prerequisites: [diag-index]
audit:
  status: reviewed
  reviewer: claude-01
  confidence_overall: high
  notes: "MCQ keys et justifications vérifiés en deuxième passe ; voir 02_answer_key.md pour le détail."
---

# Diagnostic — épreuve

> Avant de commencer, lisez [00_index.md](00_index.md). Ne consultez pas le corrigé.

---

## Partie A — Compréhension orale (10 items · 10 min)

Une écoute par item. Cochez la lettre de l'option qui correspond le mieux à ce que vous avez entendu. Les fichiers audio sont dans `audio/diag-co-NN.mp3` (générés par `python -m tools.cli build-audio`).

### CO-1 (A2) · Annonce en gare

**Audio :** `diag-co-01.mp3`

À quelle heure le train partira-t-il ?

- A. 14 h 00
- B. 14 h 20
- C. 14 h 40
- D. 15 h 20

### CO-2 (A2) · Message vocal

**Audio :** `diag-co-02.mp3`

Que Marc demande-t-il à Élodie d'apporter ?

- A. Du vin
- B. Un dessert
- C. Une boisson sans alcool
- D. Rien de particulier

### CO-3 (B1) · Conversation à propos du week-end

**Audio :** `diag-co-03.mp3`

Pourquoi le projet initial est-il abandonné ?

- A. Le musée propose une exposition spéciale
- B. Un proche est malade
- C. La météo est mauvaise
- D. Les transports sont en grève

### CO-4 (B1) · Bulletin d'information sur le transport

**Audio :** `diag-co-04.mp3`

Que conseille le bulletin aux voyageurs ?

- A. De prendre la ligne verte
- B. De recourir au bus ou au vélo
- C. De partir plus tôt
- D. D'annuler leurs déplacements

### CO-5 (B1) · Message vocal d'un ami

**Audio :** `diag-co-05.mp3`

Pourquoi Lucas annule-t-il le dîner ?

- A. Il est souffrant
- B. Il a un imprévu professionnel
- C. Sophie a oublié le rendez-vous
- D. Le restaurant est fermé

### CO-6 (B2) · Entretien radiophonique avec un urbaniste

**Audio :** `diag-co-06.mp3`

Selon l'urbaniste, l'objectif principal de la hausse du tarif horaire est :

- A. de renflouer le budget municipal
- B. de sanctionner les automobilistes
- C. de réduire la circulation en décourageant l'usage de la voiture
- D. de financer le réseau cyclable

### CO-7 (B2) · Communiqué universitaire

**Audio :** `diag-co-07.mp3`

Dans quel cas une inscription après le 15 novembre demeure-t-elle envisageable ?

- A. Si l'étudiant s'acquitte d'une majoration de frais
- B. En cas de force majeure dûment justifiée
- C. Avec l'accord du directeur de programme
- D. Aucune inscription tardive n'est jamais possible

### CO-8 (B2) · Échange professionnel

**Audio :** `diag-co-08.mp3`

Que doit faire l'employé des annexes techniques ?

- A. Les supprimer entièrement
- B. Les conserver, mais les déplacer en fin de document
- C. Les résumer dans l'introduction
- D. Les transformer en représentations graphiques

### CO-9 (C1) · Commentaire éditorial sur le télétravail

**Audio :** `diag-co-09.mp3`

La principale réserve formulée par le commentateur porte sur :

- A. la baisse de la productivité individuelle
- B. le coût des outils de visioconférence
- C. l'érosion des échanges informels, qui nourrissait la créativité collective
- D. l'isolement social croissant des salariés

### CO-10 (C1) · Conférence d'économie

**Audio :** `diag-co-10.mp3`

L'économiste rejette l'idée que l'inflation s'explique :

- A. par les hausses de salaires
- B. par la seule politique monétaire des banques centrales
- C. par les ruptures d'approvisionnement
- D. par le choc énergétique

---

## SCRIPT

<!-- AUDIT-IGNORE: anglicism Les scripts contiennent intentionnellement quelques mots d'usage courant pouvant déclencher le flagger. -->

<!-- Each block below is one audio item. build_audio.py generates one MP3 per file with id diag-co-NN,
     using the audio_config defaults for register. The aggregate file diag-test does NOT trigger TTS itself
     (audio.required: false); the per-item files diag-co-01..10 in `content/00_diagnostic/audio_items/` carry
     the audio.required: true flag. (See 02_answer_key.md for the per-item files.) -->

(scripts dans `audio_items/`)

---

## Partie B — Compréhension écrite (10 items · 15 min)

### CE-1 (A2) · Affiche du gym municipal

> **GYM MUNICIPAL — Horaires d'été.** Le centre sportif sera ouvert du lundi au vendredi de 7 h à 21 h, le samedi de 9 h à 19 h, et fermé le dimanche. La piscine est accessible uniquement aux abonnés entre 12 h et 14 h en semaine. Les cours collectifs reprennent le 5 septembre. Pour toute question, contactez l'accueil au 514-555-0142.

Quand le gym est-il complètement fermé ?

- A. Le samedi
- B. Le dimanche
- C. Le lundi matin
- D. Toute la semaine

### CE-2 (A2) · Courriel personnel

> Salut Tom,
>
> J'espère que tu vas bien. Je t'écris parce que je viens d'arriver à Montréal pour mon stage. L'appartement est petit mais bien situé, à dix minutes du métro Mont-Royal. Le bureau commence lundi. Tu passes quand tu veux. Bisous,
>
> Léa

Que vient de faire Léa ?

- A. Elle a trouvé un emploi permanent
- B. Elle a déménagé à Montréal pour un stage
- C. Elle rend visite à Tom
- D. Elle cherche encore un appartement

### CE-3 (B1) · Note interne — service informatique

> À compter du 1er octobre, les demandes de remboursement de matériel acheté à titre personnel ne seront plus traitées sans validation préalable du responsable hiérarchique. Pour obtenir un accord, remplissez le formulaire « DM-12 » disponible sur l'intranet, joignez le devis du fournisseur et soumettez le tout **avant l'achat**. Les justificatifs présentés après coup feront systématiquement l'objet d'un refus, sauf urgence opérationnelle dûment attestée par écrit. Cette mesure vise à mieux maîtriser le budget équipement, qui a dépassé de 18 % la prévision annuelle.

Que doit-on faire avant d'acheter du matériel professionnel à titre personnel ?

- A. Payer puis se faire rembourser sur présentation du justificatif
- B. Faire valider la demande par son responsable
- C. Avertir le service informatique par téléphone
- D. Attendre le 1er octobre suivant

### CE-4 (B1) · Article de presse locale

> À Verdun, un projet de jardins partagés vient de voir le jour. Sur une parcelle municipale jusqu'ici en friche, une quarantaine de familles cultivent désormais légumes, fines herbes et fleurs. L'initiative, portée par une association de quartier, vise plusieurs objectifs : reverdir un espace négligé, créer du lien entre voisins et permettre aux participants — souvent locataires en appartement — d'accéder à un coin de terre. Les organisateurs insistent : il ne s'agit pas seulement de produire ses propres tomates, mais d'apprendre à partager outils, savoir-faire et récoltes. Une formation gratuite est offerte aux débutants chaque mois. La liste d'attente, qui compte déjà plus de soixante familles, témoigne d'un appétit local pour ce type de projet. La Ville envisage de répliquer le modèle dans trois autres arrondissements d'ici 2027.

Quel objectif les organisateurs mettent-ils principalement en avant ?

- A. Produire un maximum de légumes pour chaque famille
- B. Réduire la pollution atmosphérique du quartier
- C. Créer du lien social et partager outils et savoir-faire
- D. Faire baisser le prix des produits frais en magasin

### CE-5 (B1) · Extrait de débat radiophonique

> **Antoine, employeur** : « Soyons clairs : passer à quatre jours sans baisser le salaire, c'est augmenter le coût horaire d'un quart. Aucune PME ne tient ce raisonnement à long terme. »
>
> **Camille, syndicaliste** : « C'est inexact. Les expérimentations menées en Islande et au Royaume-Uni montrent que la productivité, mesurée par tâche accomplie, ne baisse pas — et que l'absentéisme recule fortement. »
>
> **Antoine** : « Une étude n'est pas une généralité. Sur les grandes structures, peut-être. Sur les petites équipes, le moindre arrêt maladie devient un problème. »
>
> **Camille** : « Justement : un personnel mieux reposé tombe moins malade. Vous devriez l'envisager comme un investissement, pas comme un coût. »

Sur quel point central Antoine et Camille s'opposent-ils ?

- A. Sur la durée du congé parental
- B. Sur l'effet de la semaine de quatre jours sur la productivité
- C. Sur le niveau du salaire minimum
- D. Sur le nombre de jours de vacances payés

### CE-6 (B2) · Éditorial — voiture électrique

> L'engouement récent pour les voitures électriques masque un paradoxe : la décarbonation promise dépend largement de la manière dont l'électricité est produite. Au Québec, où l'hydroélectricité représente plus de 95 % du mix, le bilan carbone d'un véhicule à batterie devient effectivement vertueux dès les premières années d'usage. Mais transposer ce raisonnement à la Pologne, dont le réseau reste massivement carboné, conduit à un constat moins flatteur : l'empreinte cumulée d'une voiture électrique peut y dépasser, sur dix ans, celle d'un modèle thermique sobre. Le débat est rarement posé en ces termes. On préfère opposer en bloc « véhicule propre » et « véhicule polluant », comme si la technologie suffisait à régler l'équation. Or l'enjeu est aussi infrastructurel : sans verdissement du réseau électrique, sans tri raffiné des matériaux critiques, sans réseau de bornes équitablement réparti, la transition reste partielle. Avant de célébrer la fin du moteur à essence, mieux vaut donc s'assurer que la prise au bout du câble est, elle, réellement décarbonée.

Quelle thèse principale défend l'éditorial ?

- A. La voiture électrique est toujours préférable à la voiture thermique, sans condition
- B. Le bénéfice écologique du véhicule électrique dépend du mix énergétique du pays
- C. Il faut interdire les voitures thermiques d'ici 2030
- D. Le Québec devrait exporter davantage d'hydroélectricité

### CE-7 (B2) · Appel à candidatures

> **Postdoctorat en apprentissage automatique appliqué aux soins de santé.**
>
> Le laboratoire d'intelligence artificielle médicale de l'Université de Montréal recherche un·e postdoctorant·e pour un projet de deux ans, renouvelable une fois, portant sur la prédiction des trajectoires de patients en oncologie à partir de dossiers médicaux électroniques. La personne retenue travaillera en étroite collaboration avec une équipe clinique du CHUM.
>
> **Profil recherché :** doctorat en apprentissage automatique, statistique ou domaine connexe ; publications dans des revues ou conférences à comité de lecture ; expérience des données cliniques structurées et non structurées appréciée mais non exigée ; aisance avec PyTorch ou JAX ; capacité à communiquer en français et en anglais à l'oral comme à l'écrit.
>
> **Modalités :** rémunération selon la grille en vigueur (entre 60 000 et 72 000 CAD par an) ; télétravail possible jusqu'à deux jours par semaine ; prise de poste souhaitée au plus tard le 1er mars.

L'expérience des données cliniques est :

- A. indispensable
- B. souhaitable mais non requise
- C. évaluée par un test technique pendant l'entretien
- D. réservée aux candidats médecins

### CE-8 (B2) · Lettre à la rédaction

> **Madame, Monsieur,**
>
> Votre éditorial du 12 mars présente la rénovation du parc Lafontaine comme une avancée incontestable. Je voudrais nuancer ce tableau. Si la création d'un parcours accessible aux personnes à mobilité réduite mérite tous les éloges, le remplacement de la dalle minérale autour de la fontaine par un revêtement clair, censé limiter les îlots de chaleur, soulève deux questions que la Ville n'a pas tranchées publiquement. D'abord, le matériau retenu — un béton drainant teinté — a montré, dans plusieurs études européennes, une durabilité moyenne de huit à douze ans avant fissuration : un horizon nettement plus court que l'asphalte traditionnel. Ensuite, son coût d'entretien annuel, peu communiqué, semble trois fois supérieur. La transparence des choix techniques sur les projets municipaux d'envergure ne devrait pas être considérée comme un luxe, mais comme la condition d'un débat citoyen éclairé.
>
> Cordialement,
> M. Dubreuil, ingénieur municipal à la retraite.

Quelle est la principale critique de M. Dubreuil ?

- A. Le projet exclut les personnes à mobilité réduite
- B. La Ville n'a pas rendu publics certains éléments techniques et financiers
- C. Le parc devrait rester en l'état, sans aucune rénovation
- D. Le béton est plus écologique que l'asphalte

### CE-9 (C1) · Résumé scientifique

> Cette étude examine la corrélation entre densité urbaine et émissions de gaz à effet de serre par habitant dans soixante-deux agglomérations nord-américaines. À rebours des modèles simplifiés qui postulent une relation linéaire — plus une ville est dense, moins ses habitants émettent —, nos résultats mettent en évidence un seuil critique autour de 4 200 habitants au kilomètre carré, au-delà duquel les gains marginaux s'amenuisent voire s'inversent localement, en raison du recours accru à la climatisation collective et à la verticalisation énergivore. Nous suggérons, en conséquence, de relâcher la fixation politique sur la densité brute au profit d'indicateurs composites intégrant la qualité du parc immobilier, la part du transport actif et la diversité des usages au sein d'un quartier. La conclusion n'invalide pas le paradigme de la ville compacte ; elle invite plutôt à le décliner avec discernement selon les contextes climatiques, économiques et morphologiques propres à chaque agglomération.

Quelle est la conclusion principale de l'étude ?

- A. La densité urbaine n'a aucune corrélation avec les émissions
- B. Une densité plus élevée est toujours bénéfique pour le bilan carbone
- C. Au-delà d'un certain seuil, la densité cesse de réduire les émissions ; des indicateurs plus fins sont nécessaires
- D. Il faut abandonner le modèle de la ville compacte

### CE-10 (C1) · Essai littéraire

> On confond souvent solitude et isolement, comme s'il s'agissait de deux noms pour une même expérience. Or, l'opposition mérite d'être tenue. L'isolement subit ; la solitude se choisit. L'un éprouve la conscience par défaut — l'autre la cultive comme une condition fertile. Montaigne, qui faisait l'éloge de l'« arrière-boutique toute nôtre », ne prônait pas la fuite du monde mais la nécessité, à intervalles réguliers, d'un retrait délibéré où la pensée puisse se recomposer hors de la pression d'autrui. Notre époque, qui sature les heures de notifications et confond connexion permanente et présence à soi, a peut-être plus que jamais besoin de cette distinction. Non pour idéaliser une posture érémitique — l'humain reste, irréductiblement, un être social —, mais pour réhabiliter ces plages d'absence où s'élabore ce que nul ne pourra jamais déléguer : la formation lente d'un jugement propre.

Quelle distinction l'auteur tient-il à établir ?

- A. Entre solitude (choisie, féconde) et isolement (subi)
- B. Entre vie sociale et vie professionnelle
- C. Entre la pensée de Montaigne et celle des contemporains
- D. Entre le silence et le bruit

---

## Partie C — Expression écrite (1 tâche · 20 min)

**Sujet (ancrage B2, 130–150 mots).**

> Vous venez de terminer une formation ou un projet (cours, stage, atelier, conférence) qui a marqué votre parcours d'étudiant·e ou de chercheur·e. Dans un texte construit, racontez en quoi consistait cette expérience et expliquez ce qu'elle vous a apporté sur le plan professionnel ou personnel. (130–150 mots.)

Consigne d'auto-évaluation : rédigez d'une traite, puis appliquez la grille de [02_answer_key.md](02_answer_key.md). Soyez votre propre correcteur agrégé : la grille pèse 4 critères × 5 points = 20.

---

## Partie D — Expression orale (1 tâche · 5 min, dont 30 s de préparation)

**Sujet (ancrage B2, 2–3 min de monologue).**

> Le télétravail s'est généralisé dans de nombreux secteurs depuis 2020. Présentez de manière structurée deux avantages et deux inconvénients de cette pratique, puis donnez votre position personnelle, justifiée par un argument et un exemple.

Enregistrez-vous (téléphone, dictaphone, Voice Memos…). Transcrivez ensuite avec Whisper (ou équivalent) ; comparez à la grille EO de [02_answer_key.md](02_answer_key.md).

---

Quand les quatre parties sont faites, ouvrez [02_answer_key.md](02_answer_key.md), puis [03_score_to_roadmap.md](03_score_to_roadmap.md).

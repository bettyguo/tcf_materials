---
id: eo-program
title: "EO — Programme 60 jours « Talk-yourself-to-fluency »"
section: speaking
cefr: B2
nclc_target: 8
estimated_minutes: 60
register: france
tags: [méta, programme, planification]
prerequisites: [eo-rubric, eo-anti-error]
audit:
  status: pending
  reviewer: claude-04
  confidence_overall: medium
  notes: "Programme méta. À ajuster après 14 jours d'usage réel."
---

# Programme 60 jours — *Talk-yourself-to-fluency*

> Protocole quotidien (5–15 min) qui se déploie sur les **semaines 5 à 14 du roadmap** (60 jours = 8 semaines + 4 jours tampon). Combine shadowing, monologue libre, enregistrement, transcription Whisper, scoring auto. Objectif : à J+60, le candidat tient un T3 complet sous timer avec EO-C1/C2/C3 ≥ 4 et EO-C4 ≥ 3.
>
> **Pré-requis** : la phonologie complète ([00_phonology/](00_phonology/index.md)) doit être passée au moins une fois. La rubrique ([00_rubric.md](00_rubric.md)) et l'anti-erreurs ([00_anti_error.md](00_anti_error.md)) sont à portée de main.

---

## 1. Vue d'ensemble

| Bloc | Jours | Objectif | Volume quotidien | Tâche dominante |
|---|---:|---|---|---|
| **A — Stamina** | 1–7 | Tenir 5 min de monologue sans s'arrêter | 5 min mono + 5 min review | T2 |
| **B — Connecteurs B2** | 8–14 | Insérer ≥ 3 connecteurs B2/100 mots | 5 min mono + 10 min review + insertion ciblée | T2 |
| **C — T2 timed** | 15–28 | T2 à 3 min sous contrainte de structure | 3 min mono + 10 min review + 1 itération | T2 |
| **D — T3 timed** | 29–42 | T3 complet : 2 min prep + 5 min mono + follow-up | 7 min cycle + 15 min review | T3 |
| **E — Mock conditions** | 43–60 | Séquence T1 → T2 → T3 enchaînée, 12 min sans pause | 12 min cycle + 20 min debrief | T1 + T2 + T3 |

Volume cumulé : ~14 h sur 60 jours, soit ~14 min/jour en moyenne. Compatible avec le budget 2 h/jour du roadmap.

---

## 2. Bloc A — Stamina (J1–J7)

**Objectif** : tenir 5 minutes de monologue ininterrompu sur un prompt T2 sans laisser de pause > 1,5 s. Aucune contrainte sur la qualité du contenu : le but est de **briser le mur du silence**.

### Routine quotidienne (15 min)

1. **Prep (1 min)** : ouvrir un prompt T2 au hasard ([tache2/](tache2/index.md)) ; lire la consigne ; ne rien noter.
2. **Mono (5 min, timer obligatoire)** : enregistrer en s'imposant la règle "**toute pause > 1,5 s se comble par une phrase-relance**" (voir [00_anti_error.md §M6](00_anti_error.md)).
3. **Score (5 min)** : `python -m tools.score_speaking <prompt.md>` en mode texte seul (Whisper optionnel). Lire le rapport.
4. **Re-écoute (4 min)** : compter les pauses > 1,5 s et les *euh*. Cible : ≤ 5 pauses, ≤ 10 *euh* en 5 min.

### Repères de progression

| Jour | Pauses > 1,5 s | Fillers (en 5 min) |
|---|---:|---:|
| J1 (baseline) | 15–25 | 30+ |
| J3 | 10 | 20 |
| J5 | 7 | 15 |
| J7 | ≤ 5 | ≤ 10 |

Si J7 reste loin de la cible, **prolonger le bloc A de 3 jours** avant de passer à B. Pas de honte : la stamina est le verrou.

---

## 3. Bloc B — Connecteurs B2 (J8–J14)

**Objectif** : insérer **≥ 3 connecteurs B2 distincts par monologue de 5 min**. Inventaire cible (mémoriser cette liste) :

| Fonction | Connecteurs B2 |
|---|---|
| Opposition | *cependant, en revanche, néanmoins, toutefois* |
| Addition | *par ailleurs, en outre, de plus, d'une part… d'autre part* |
| Cause | *dans la mesure où, puisque, en effet* |
| Conséquence | *ainsi, par conséquent, c'est pourquoi* |
| Concession | *certes, bien que (+ subj.), même si* |
| Illustration | *notamment, en particulier* |

### Routine quotidienne (20 min)

1. **Prep (2 min)** : T2 prompt + sélectionner **3 connecteurs** à insérer obligatoirement.
2. **Mono (5 min)** : prononcer chacun des 3 connecteurs au moins une fois, audible (l'enregistrement doit en porter trace).
3. **Score (3 min)** : `score_speaking.py` ; vérifier que `connecteurs` ≥ 3 dans le rapport.
4. **Re-mono (5 min)** : refaire le même prompt, **substituer** les 3 connecteurs B2 par 3 connecteurs C1 (*or, force est de constater, n'en demeure pas moins, eu égard à*). Voir [ee-pivots](../05_writing/00_pivots/index.md).
5. **Compare (5 min)** : lire les 2 transcripts côte à côte, repérer la phrase où le connecteur C1 sonne mieux.

### Repères J14

- ≥ 3 connecteurs B2 distincts par monologue de 5 min (audible).
- ≥ 1 connecteur C1 utilisé correctement au moins 1× sur les 7 jours.

---

## 4. Bloc C — T2 timed (J15–J28)

**Objectif** : structurer le T2 (intro 10 s → 2 corps 60+60 s → clôture 10 s) sous timer strict 3 min.

### Routine quotidienne (15 min)

1. **Prep (30 s, timer)** : noter mentalement intro + 2 points + clôture.
2. **Mono (3 min, timer)** : prononcer ; ne pas dépasser. Si on dépasse, c'est un échec C1 = 3 (durée > 130 %).
3. **Score (5 min)** + lecture des feedbacks.
4. **Re-mono (3 min)** : refaire en **améliorant** le point faible identifié (souvent : absence de clôture audible).
5. **Compare (3 min)** : durée audio J15 vs J28 ; le mono doit converger vers 2:50–3:05.

### Variation hebdomadaire

- Lundi : T2 *racontez une expérience marquante*
- Mardi : T2 *décrivez les avantages et inconvénients de*
- Mercredi : T2 *présentez les changements observés en matière de*
- Jeudi : T2 *expliquez votre rapport personnel à*
- Vendredi : T2 *libre — choisir parmi les 30 prompts ([tache2/](tache2/index.md))*
- Samedi : récupération (pas de mono) ou shadowing
- Dimanche : auto-évaluation longue : enregistrer 2 T2, scorer les 2, identifier le critère qui plafonne

### Repères J28

- T2 timé à 2:50–3:05 systématique.
- EO-C1 ≥ 4, EO-C2 ≥ 4 sur ≥ 5 T2 consécutifs.
- ≥ 4 connecteurs B2 distincts par monologue.

---

## 5. Bloc D — T3 timed (J29–J42)

**Objectif** : T3 complet — 2 min de préparation, 5 min de monologue argumentatif, simulation de relance examinateur.

### Routine quotidienne (22 min)

1. **Prep (2 min, timer strict)** : suivre la check-list de chaque prompt T3 :
   - 0:00–0:20 : lire stimulus 2× ; souligner claim.
   - 0:20–0:40 : décider pour/contre/nuancé.
   - 0:40–1:20 : 2 args + 1 exemple chacun.
   - 1:20–1:40 : 1 concession + 1 réfutation.
   - 1:40–2:00 : opener + closer.
2. **Mono (5 min, timer strict)** : structure thèse → 2 args → concession-réfutation → ouverture.
3. **Self-relance (1 min)** : lire les 3 relances probables du prompt ; en choisir 1 ; répondre à voix haute 30 s.
4. **Score (8 min)** : `score_speaking.py` ; vérifier les 4 critères ; lire toutes les feedbacks.
5. **Re-mono ciblé (6 min)** : refaire **uniquement** la portion (concession-réfutation, p.ex.) qui a fait baisser C1.

### Variation hebdomadaire

- Lundi–Vendredi : 1 prompt T3 différent par jour parmi [tache3/](tache3/index.md).
- Samedi : pause ou re-écoute des 5 enregistrements de la semaine.
- Dimanche : double T3 (mêmes prompts revus 4 semaines plus tôt) → mesurer la trajectoire.

### Repères J42

- T3 timé à 4:45–5:15 systématique.
- Concession-réfutation **audible** dans 5/5 T3 consécutifs.
- EO-C1 ≥ 4, EO-C2 ≥ 4, EO-C3 ≥ 4 sur ≥ 5 T3 consécutifs.
- Réponse à la relance examinateur fluide en 30 s.

---

## 6. Bloc E — Mock conditions (J43–J60)

**Objectif** : enchaîner T1 → T2 → T3 (12 min sans pause) dans les conditions de l'examen.

### Routine quotidienne (32 min)

1. **Set-up (2 min)** : 3 prompts pré-tirés (1 T1, 1 T2, 1 T3) ; timer 12 min en mode séquentiel ; téléphone en mode avion.
2. **Mock (12 min)** : T1 (1,5 min) → T2 (3 min) → T3 prep 2 min + mono 5 min + relance 0,5 min. **Aucune pause** entre les tâches.
3. **Score (5 min)** : `score_speaking.py` sur chacun des 3 enregistrements.
4. **Debrief (10 min)** : remplir la table de log §7 ; identifier le **critère trans-tâche** le plus faible.
5. **Drill ciblé (3 min)** : 1 micro-exercice sur le critère le plus faible (généralement C4 *fillers*).

### Variation

- 3× par semaine : mock complet (T1+T2+T3).
- 2× par semaine : 1 seule tâche **revue à froid** (4–6 semaines après la première écoute).
- 2× par semaine : récupération (shadowing pur, voir §8).

### Repères J60

- Mock complet sans dépassement, sans abandon, sans réécouter la consigne.
- EO-C1 ≥ 4 sur les 3 tâches.
- EO-C2 ≥ 4 sur T2 et T3.
- EO-C3 ≥ 4 sur T2 et T3 (T1 peut rester à 3 — moins de matière).
- EO-C4 ≥ 3 sur les 3 tâches (≥ 4 si Whisper est utilisable).

---

## 7. Log hebdomadaire (template à reporter dans `practice_log.md`)

```markdown
## Semaine N — JJ-MM-AAAA → JJ-MM-AAAA

### Bande EO auto-estimée (moyenne 5 enregistrements)
- T1 : C1=X C2=X C3=X C4=X → /20
- T2 : C1=X C2=X C3=X C4=X → /20
- T3 : C1=X C2=X C3=X C4=X → /20

### Erreurs récurrentes (≥ 3 occurrences)
- [erreur 1] — anti-error §RX/PX/LX/FX/CX/MX (mapping anti_error.md)
- [erreur 2] — ...
- [erreur 3] — ...

### Fluence proxy
- WPM moyen : XXX
- Fillers/100 mots : X
- Pauses > 1,5 s : X

### Phrases qui commencent à sonner naturelles
- *...* (mémoriser, réutiliser semaine suivante)
- *...*

### Critère prioritaire pour la semaine prochaine
- [un seul critère, jamais deux]
```

---

## 8. Protocole shadowing (annexe — à utiliser ad libitum, surtout les jours de récupération)

**Quoi** : écouter un audio source ≤ 1 min, le répéter aussitôt en superposition (mode *parrot*), puis le répéter sans audio, puis comparer son enregistrement à l'audio source.

**Sources recommandées** (registre standard, débit B2/C1) :

- **RFI Journal en français facile** (≈ 130 wpm, lexique B2) — 1 segment/jour, 90 s. Lien : `rfi.fr/fr/podcasts/journal-en-fran%C3%A7ais-facile`
- **France Culture, *La Fabrique de l'Histoire*** ou ***La Méthode scientifique*** (≈ 150 wpm, lexique C1) — 1 segment/semaine, 2 min.
- **TV5MONDE Apprendre — niveau B2/C1** — exercices d'écoute gradués.

**Routine (10 min)** :

1. Écouter 1× sans intervenir (1,5 min).
2. Écouter + répéter en superposition (3 min, x2).
3. Répéter sans audio (1,5 min).
4. S'enregistrer en répétant (1,5 min).
5. Écouter source + son enregistrement en alternance (2 min) ; noter 2 différences phonologiques.

**Effet attendu** : entraînement de la prosodie sans effort cognitif sur le contenu. Le shadowing **n'améliore pas** la production libre directement — il améliore la **précision phonologique** qui se report ensuite sur la production libre.

---

## 9. Protocole auto-évaluation phonologique (annexe — à faire 1× par semaine)

**Quoi** : 5-min de monologue T2 enregistré ; transcription Whisper ; passage en revue d'une check-list de 25 points.

**Check-list (à imprimer ou tenir dans un carnet)** :

### Vocaliques
- [ ] /ø/ vs /œ/ — paire *peu* / *peur* claire ?
- [ ] /e/ vs /ɛ/ — *parlé* /e/ vs *parlait* /ɛ/ ?
- [ ] /u/ vs /y/ — *tout* vs *tu* sans confusion ?
- [ ] /ɛ̃/ vs /ɑ̃/ — *fin* vs *fend* ?
- [ ] /ɔ̃/ vs /ɑ̃/ — *bon* vs *banc* ?

### Consonantiques
- [ ] /ʁ/ uvulaire (gorge) — pas roulé ?
- [ ] /b/ vs /p/ initial — *bien* vs *pain* ?
- [ ] /d/ vs /t/ initial — *don* vs *ton* ?
- [ ] /v/ vs /f/ — *vite* vs *fite* (mot inventé) ?

### Liaisons
- [ ] *les* + voyelle : liaison faite ?
- [ ] *un, deux, trois* + voyelle : liaison faite ?
- [ ] *grand, petit, gros* + voyelle : liaison faite avec dévoicalisation ?
- [ ] *est, sont, ont* + voyelle : liaison faite ?
- [ ] *et* + voyelle : liaison **non** faite ?
- [ ] *h* aspiré (*héros, hibou, haricot*) : pas de liaison ?

### Enchaînement
- [ ] consonne finale prononcée → resyllabification (*il a un ami* /i.la.œ̃.na.mi/) ?
- [ ] aucune coupure entre groupes intonatifs courts ?

### Prosodie
- [ ] groupes rythmiques de 4–7 syllabes avec accent final ?
- [ ] déclaratives en intonation descendante en fin de phrase ?
- [ ] questions yes/no en intonation montante ?
- [ ] questions wh- en intonation globalement descendante ?

### Fluence
- [ ] ≤ 4 *euh* en 5 min ?
- [ ] ≤ 2 *du coup* en 5 min ?
- [ ] aucune pause > 1,5 s ?

---

## 10. Référence croisée

- Spec : [07_PHASE_6_SPEAKING.md §6](../../07_PHASE_6_SPEAKING.md)
- Rubric EO : [00_rubric.md](00_rubric.md)
- Phonologie : [00_phonology/](00_phonology/index.md)
- Anti-erreurs EO : [00_anti_error.md](00_anti_error.md)
- Prompts : [tache1/](tache1/index.md) · [tache2/](tache2/index.md) · [tache3/](tache3/index.md)
- Outil : [tools/score_speaking.py](../../tools/score_speaking.py)
- Roadmap global : [../../ROADMAP.md](../../ROADMAP.md) (semaines 5–14)

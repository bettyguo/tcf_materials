---
id: tools-faq
title: FAQ — questions fréquentes
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 10
register: france
tags: [tools, faq, help, onboarding]
audit:
  status: cleared
  confidence_overall: high
  notes: "FAQ rédigée à partir des framing docs (00_MASTER_PROMPT, 01_PROJECT_CONTEXT) et des questions récurrentes anticipées. Liens vers sources autoritatives (IRCC, FEI) pour les chiffres officiels."
hide:
  - toc
---

# Questions fréquentes

> Tout ce que vous voudriez savoir avant de plonger — sur le TCF Canada, sur ce corpus, et sur la stratégie 12 semaines.

## Sur le TCF Canada

??? question "Quelle est la différence entre TCF Canada et TCF tout court ?"
    Le **TCF Canada** est l'évolution officielle requise par IRCC pour les demandes d'**Express Entry**, **Programme des candidats des provinces**, et **citoyenneté**. Il évalue les **4 compétences** (CO, CE, EE, EO) et délivre un score sur 699 (CO/CE) ou sur 20 (EE/EO), converti en NCLC. Le TCF « standard » couvre les mêmes compétences mais a un format différent et n'est pas accepté pour l'immigration canadienne. **Vérifiez toujours sur votre convocation** que c'est bien le TCF Canada (et pas le TEF, qui est l'examen concurrent de la CCI Paris).

??? question "Quelle est la cible NCLC pour le bonus Express Entry ?"
    - **NCLC 7** sur les **4 compétences** + **CLB 9 en anglais** = **50 pts CRS additionnels**.
    - **NCLC 7** + **CLB 5-8 anglais** = **25 pts CRS**.
    - **NCLC 5-6** = aucun bonus mais reste exploitable pour les programmes provinciaux.
    
    Source : [IRCC — CRS section additional points](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/criteria-comprehensive-ranking-system/grid.html). Voir aussi le [calculateur NCLC interactif](calculateur-nclc.md).

??? question "Combien de temps faut-il pour passer de A2 à NCLC 7 ?"
    Statistiquement, **3 à 6 mois** d'étude intensive (2 h/jour) pour A2 → B2/NCLC 7. Ce corpus est conçu pour **12 semaines** intensives (~ 168 h). Si vous êtes déjà B1, 8 semaines peuvent suffire. Si vous êtes A2 strict, prévoyez 16 semaines avec un suivi humain en parallèle.

??? question "Le TCF Canada compte-t-il pour la résidence permanente ET la citoyenneté ?"
    **Oui**, c'est le même examen. Pour la **RP** (Express Entry), il faut le passer **avant** la demande. Pour la **citoyenneté**, il sert de preuve de compétence linguistique (NCLC 4 minimum en CO et EO, écrit non requis).

??? question "Combien coûte l'examen ?"
    Variable selon le centre, généralement **300-400 € CAD** ou **300-350 € EUR**. Consultez le centre [France Éducation International](https://www.france-education-international.fr/tcf-canada) ou un centre agréé local (Alliances françaises, instituts français).

??? question "Le résultat est valable combien de temps ?"
    **2 ans** à compter de la date du test, pour les fins d'immigration IRCC.

??? question "Peut-on repasser l'examen ?"
    **Oui, sans limite**. Délai minimum entre deux tentatives : **30 jours** dans la même session. Refaites le test si vous tombez sous votre cible — c'est moins cher que de rater l'Express Entry.

## Sur ce corpus

??? question "Pourquoi du français standard et non du québécois ?"
    Le TCF Canada teste la **compréhension** des deux variétés (CO inclut parfois des accents québécois) mais la **production** attendue est le **français standard** (norme parisienne, registre neutre). Ce corpus enseigne donc :
    - **Reconnaissance** des deux (cheatsheet [`12_quebec_france`](../08_cheatsheets/12_quebec_france.md)).
    - **Production** en français standard pour EE/EO.

??? question "Comment garantissez-vous l'absence d'erreurs ?"
    Chaque sortie passe un **pipeline d'audit adversarial** :
    1. **Pydantic** valide les schémas (frontmatter, structures).
    2. **Hunspell-fr** vérifie l'orthographe.
    3. **Détecteur d'anglicismes** (anglicismes.yaml) signale les calques.
    4. **Détecteur de québécismes** (quebecismes.yaml) sépare régionalismes acceptés / à éviter.
    5. **Audit des distracteurs** vérifie que chaque mauvaise réponse est plausible mais sans ambiguïté.
    6. **Tests Pytest** rejettent les builds qui régressent.
    
    Le pipeline est **open-source** ([`tools/audit_french.py`](https://github.com/bettyguo/tcf_materials/blob/main/tools/audit_french.py)) et continue de tourner sur chaque PR.

??? question "Pourquoi B2-first et non équilibré A1-C2 ?"
    Parce que le TCF pondère **B1-B2 = ~49 %** du score CO/CE. Investir 25 % du temps à du C2 alors qu'il ne pèse que 8 % du score est inefficace. C'est le **principe score-anchored** : temps proportionnel à l'impact. Voir [`01_PROJECT_CONTEXT.md`](../../01_PROJECT_CONTEXT.md).

??? question "Combien d'heures pour finir tout le corpus ?"
    **~ 168 heures** sur 12 semaines (2 h/jour × 7 jours × 12 sem) avec les 4 examens blancs intégrés. Vous pouvez réduire à 100 h si vous êtes déjà B1+ et que vous ciblez NCLC 7 (pas 8-9).

??? question "Les Mocks #3 et #4 sont en stub, c'est embêtant ?"
    À la v1.0, oui, partiellement. Vous pouvez :
    1. Utiliser les **partiels** ([`07_mock_exams/partials/`](../07_mock_exams/partials/index.md)) pour les semaines 10-11.
    2. Re-faire les Mocks #1 et #2 (avec 6 semaines d'écart, l'effet maturation est suffisant pour limiter le rappel).
    3. Attendre la v1.1 (planifiée pour combler ces stubs).

??? question "Le deck Anki — combien de cartes ? Comment l'installer ?"
    **~ 1 800 cartes** réparties sur 4 sous-decks : grammaire B1+B2, lexique haute-fréquence, faux-amis/calques, phonologie. Voir [`flashcards/`](https://github.com/bettyguo/tcf_materials/tree/main/flashcards) pour l'installation. Vous pouvez aussi utiliser les **3 mini-decks SRS web** ([flashcards](flashcards.md)) directement dans le navigateur.

??? question "Y a-t-il des audios ?"
    Oui — générés par **Edge-TTS** (voix neuronales françaises). Voir [`tools/build_audio.py`](https://github.com/bettyguo/tcf_materials/blob/main/tools/build_audio.py) pour régénérer. Limite honnête : TTS est solide en B1/B2, marginal en C1+. La [dictée audio](dictee.md) utilise la Web Speech API en complément.

## Sur la stratégie 12 semaines

??? question "Je n'ai que 8 semaines — comment compresser ?"
    Compressez les phases 1-2 (foundation + grammaire B1) à **2 semaines au lieu de 4**, en sautant les unités où vous êtes déjà confiant (utilisez le diagnostic). Gardez **intactes** les phases 5-6 (EE/EO) et les 4 mocks — c'est là que se gagne le score. Voir [`Roadmap`](../../ROADMAP.md).

??? question "Faut-il faire les 4 examens blancs ?"
    **Oui, c'est la chose la plus importante.** Le score-blanc moyen sur 4 mocks corrèle ~ 0.85 avec le score réel. C'est le seul calibrage fiable pour décider si vous êtes prêt ou pas. Mocks 3 et 4 en stub à v1.0 — utilisez les partiels.

??? question "Quels jours travailler quoi ?"
    Recommandation v1.0 :
    - **Lun / Mer / Ven** : compétence binding (la plus basse au dernier mock).
    - **Mar / Jeu** : autre compétence à risque.
    - **Sam** : lecture extensive + flashcards.
    - **Dim** : repos OU mock partiel chronométré.
    
    Voir aussi [`Streak / heatmap d'étude`](streak.md).

??? question "Quand arrêter d'étudier avant l'examen ?"
    **Taper en J-3 à J-1** : pas de nouveau contenu, uniquement révision active (flashcards, cheatsheets), sommeil maximal. Voir [Protocole taper](../09_strategy/06_taper_protocol.md) et [Check-list J-1](checklist-j1.md).

## Sur les outils interactifs

??? question "Mes scores du calculateur / les flashcards sont-ils sauvegardés ?"
    Tout est stocké dans le **localStorage** de votre navigateur, sous des clés préfixées `tcf:`. Effacer les données du site les efface tous. Aucune télémétrie ni envoi serveur. Voir chaque outil pour les clés précises.

??? question "Puis-je exporter mes données ?"
    - **Suivi des examens blancs** : oui, bouton `Exporter (JSON)`.
    - **Flashcards** : pas d'export à v1.0 — utilisez le **deck Anki complet** si vous voulez de la portabilité.
    - **Streak d'étude** : pas d'export à v1.0.
    - **Compteur de mots** : copiez le texte ailleurs (Pages, Docs, Notes).

??? question "Pourquoi ce site est-il en français et pas en anglais ?"
    Parce que le **TCF est un examen en français**, et pratiquer en français commence par lire les consignes en français. C'est volontaire et conforme à la méthodologie d'immersion (Krashen). La méta-information technique (README, CHANGELOG) est en anglais.

??? question "Le site fonctionne-t-il hors ligne ?"
    Pas en mode PWA installable à v1.0 (planifié pour v1.2). Mais une fois la page chargée, **tous les widgets fonctionnent hors ligne** — sauf la dictée audio (qui dépend des voix système, en général disponibles hors ligne aussi).

??? question "Comment signaler un bug ou suggérer une amélioration ?"
    [Ouvrez une issue GitHub](https://github.com/bettyguo/tcf_materials/issues). C'est l'unique canal de support — le projet est maintenu en open-source avec audit pipeline alive.

## Voir aussi

- [Glossaire CEFR / NCLC / TCF](glossaire.md)
- [Démarrer ici (Jour 0)](../00_start_here.md)
- [Diagnostic 90 min](../00_diagnostic/00_index.md)
- [Roadmap 12 semaines](../../ROADMAP.md)
- [Retour aux outils](index.md)

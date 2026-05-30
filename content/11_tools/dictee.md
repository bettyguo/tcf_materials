---
id: tools-dictee
title: Dictée audio (CO + orthographe)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 20
register: france
tags: [tools, dictee, listening, orthographe, audio, web-speech-api]
audit:
  status: cleared
  confidence_overall: high
  notes: "Dictée propulsée par la Web Speech API du navigateur. Voix françaises selon disponibilité système (Edge/Chrome ont des voix neuronales solides ; Firefox dépend de l'OS). Grading via distance de Levenshtein, accents tolérés. Phrases auditées contre Grevisse + Riegel."
hide:
  - toc
---

# Dictée audio — CO + orthographe

> **Écoutez, tapez, vérifiez.** Le widget utilise la synthèse vocale de votre navigateur (voix française) pour lire la phrase ; vous tapez ce que vous entendez ; le grader calcule la similarité (accents tolérés, fautes mineures pardonnées).

!!! warning "Prérequis navigateur"
    - **Chrome / Edge** : voix neuronales françaises incluses, qualité ≥ B2 confortable.
    - **Firefox** : utilise les voix du système (macOS « Amélie », Windows « Hortense », Linux selon installation).
    - **Safari** : OK, voix « Audrey » très naturelle.
    - **Mobile** : ça fonctionne mais privilégiez un casque, le micro de l'enceinte interne fatigue vite.

## Vitesse réduite recommandée au début

Démarrez à **0.85×**, montez à **1.0×** quand vous reconnaissez 80 % des phrases. **1.15×** pour simuler les conditions examen — les enregistrements TCF sont parfois ressentis comme rapides.

## Bloc 1 — Phrases courtes B1+

Vie quotidienne, présent et passé composé.

<div class="tcf-dictee" data-set="court_b1"></div>

## Bloc 2 — Phrases B2 (vie professionnelle / sociale)

Imparfait, conditionnel, subordonnées, vocabulaire plus dense.

<div class="tcf-dictee" data-set="b2_pro"></div>

## Bloc 3 — Phrases B2+ / C1 (presse, opinion)

Connecteurs complexes, marqueurs d'opinion, structures emphatiques.

<div class="tcf-dictee" data-set="c1_presse"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.dictees = window.TCF.dictees || {};

window.TCF.dictees.court_b1 = [
  { text: "Je prends le métro tous les matins à huit heures.",
    gloss: "Routine : présent + complément de temps." },
  { text: "Hier, nous avons mangé au restaurant avec mes parents.",
    gloss: "Passé composé + indicateur temporel + complément." },
  { text: "Elle habite à Montréal depuis trois ans.",
    gloss: "« depuis » + durée : action commencée et toujours en cours." },
  { text: "Nous cherchons un appartement de deux chambres près du centre-ville.",
    gloss: "Vocabulaire logement + préposition de lieu." },
  { text: "Quand j'étais petit, je jouais au foot tous les samedis.",
    gloss: "Imparfait d'habitude au passé." },
  { text: "Est-ce que vous pouvez répéter la question, s'il vous plaît ?",
    gloss: "Politesse + interrogation formelle." }
];

window.TCF.dictees.b2_pro = [
  { text: "Bien que la réunion ait été reportée, le dossier doit être finalisé avant vendredi.",
    gloss: "« Bien que » + subjonctif passé + voix passive." },
  { text: "Nous aurions préféré être informés plus tôt de ce changement de planning.",
    gloss: "Conditionnel passé + infinitif passif." },
  { text: "Il faudrait que l'équipe se concentre sur les objectifs prioritaires du trimestre.",
    gloss: "« Il faudrait que » + subjonctif présent réfléchi." },
  { text: "Malgré les difficultés rencontrées, le projet a été livré dans les délais.",
    gloss: "Concession avec « malgré » + nom (PAS « malgré que »)." },
  { text: "Nous tenons à vous remercier pour votre disponibilité et votre patience.",
    gloss: "Tournure de remerciement formelle." },
  { text: "À la suite de notre entretien, je vous prie de bien vouloir étudier ma candidature.",
    gloss: "Formule de courrier formel — utile en EE T3." }
];

window.TCF.dictees.c1_presse = [
  { text: "Selon les dernières estimations, la croissance économique devrait ralentir au cours du second semestre.",
    gloss: "Modalisation (« devrait ») + conditionnel de prudence journalistique." },
  { text: "Ce que les experts soulignent, c'est l'urgence d'agir face au dérèglement climatique.",
    gloss: "Structure emphatique « ce que… c'est »." },
  { text: "Il n'est pas certain que la mesure proposée parvienne à inverser la tendance.",
    gloss: "Doute + subjonctif présent." },
  { text: "Loin d'être anecdotique, ce phénomène témoigne d'une mutation profonde de la société.",
    gloss: "« Loin de » + infinitif, registre soutenu." },
  { text: "Quoi qu'il en soit, les autorités devront rendre des comptes à la population.",
    gloss: "« Quoi qu'il en soit » + futur d'obligation." },
  { text: "On aurait tort de croire que cette solution résoudra l'ensemble des difficultés rencontrées.",
    gloss: "Conditionnel passé + futur dans la subordonnée." }
];
</script>

## Comment lire votre score

| Similarité | Signification |
|---:|---|
| **≥ 92 %** | Phrase reconnue. Comptez-la juste — petites fautes ortho. |
| **70-91 %** | Vous avez l'idée, mais accents/finales/auxiliaires à reprendre. Réécoutez à 0.85×. |
| **< 70 %** | Vocabulaire ou structure non encore stable. Lisez la phrase, puis réécoutez en suivant le texte des yeux. |

## Routine recommandée

- **5 min/jour** sur le bloc actif (où vous êtes encore à ~70 %).
- **3 jours/semaine** à vitesse réduite ; **2 jours/semaine** à vitesse normale ; **1 jour/semaine** à 1.15×.
- Notez les **structures** qui reviennent dans vos erreurs (`il faudrait que`, `bien que`, accord du participe…) — ce sont vos vraies failles, pas l'orthographe.

## Limites

1. **TTS ≠ enregistrement TCF réel.** Les voix Edge/Chrome sont solides B1/B2, marginales sur les nuances C1. Pour CO authentique, complétez avec [`03_listening/`](../03_listening/index.md).
2. **Aucune voix québécoise** disponible nativement en TTS Web. Pour la reconnaissance phonologique québécoise, voir [`10_canada_culture/`](../10_canada_culture/index.md) et la cheatsheet [`12_quebec_france`](../08_cheatsheets/12_quebec_france.md).
3. **Aucun stockage** des résultats — la dictée se réinitialise à chaque chargement (volontaire : encourage la pratique répétée).

## Voir aussi

- [Stratégie CO — j'ai entendu, je choisis, je passe](../03_listening/00_strategy.md)
- [Cheatsheet phonologie — paires minimales](../08_cheatsheets/07_phonologie_minimal_pairs.md)
- [Test de vitesse de lecture (CE)](wpm.md)
- [Retour aux outils](index.md)

---
id: tools-pairs
title: Paires minimales — phonologie (v1.2)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 12
register: france
tags: [tools, phonology, ipa, minimal-pairs, listening, v1.2]
audit:
  status: cleared
  confidence_overall: high
  notes: "Trainer de paires minimales sur 4 contrastes : nasales (in/an, on/an), voyelles orales (u/y, e/è), accents toniques. Utilise Web Speech API du navigateur — voix française requise (Chrome, Edge, Safari)."
hide:
  - toc
---

# Paires minimales — entraîneur phonologique

> **Le problème B2 → C1 en CO** : confondre **/ɛ̃/** (vin) et **/ɑ̃/** (van), ou **/y/** (rue) et **/u/** (roue), c'est rater 20 % des items présentation orale.
> Ce trainer joue **un** mot d'une paire au hasard et vous demande lequel. Lecture **Web Speech API** locale, vitesse 1× → 0.6×.

!!! warning "Voix française requise"
    L'entraîneur a besoin d'une voix française installée dans votre OS. Si rien ne se passe :
    - **Chrome/Edge** : vérifier les voix dans `chrome://settings/?search=speech`.
    - **Firefox** : nécessite un add-on TTS.
    - **Safari (macOS/iOS)** : déjà présent (Audrey, Thomas).

## Contraste 1 — nasales : /ɛ̃/ vs /ɑ̃/

Le plus piégeux. *In* (bain) vs *An* (banc). Distincts en français standard mais souvent confondus par les anglophones et hispanophones.

<div class="tcf-pairs" data-set="nasales_in_an"></div>

## Contraste 2 — nasales : /ɔ̃/ vs /ɑ̃/

*On* (mon) vs *An* (ment). Très proche pour l'oreille non entraînée — c'est typiquement ce qui sépare un NCLC 8 d'un NCLC 9.

<div class="tcf-pairs" data-set="nasales_on_an"></div>

## Contraste 3 — voyelles orales : /y/ vs /u/

*U* (rue) vs *Ou* (roue). Erreur fréquente : prononcer */y/* comme */u/* trahit immédiatement.

<div class="tcf-pairs" data-set="u_ou"></div>

## Contraste 4 — voyelles orales : /e/ vs /ɛ/

*É* fermé (fée) vs *È* ouvert (fait). Erreur classique en EO (« mangé » vs « mangeait »).

<div class="tcf-pairs" data-set="e_eh"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.pairs = window.TCF.pairs || {};

window.TCF.pairs.nasales_in_an = {
  label: "/ɛ̃/ vs /ɑ̃/",
  a: "/ɛ̃/ (in)",
  b: "/ɑ̃/ (an)",
  items: [
    ["bain", "banc"],
    ["vin", "vent"],
    ["pain", "paon"],
    ["fin", "faon"],
    ["lin", "lent"],
    ["main", "ment"],
    ["sain", "sang"],
    ["tien", "tant"],
    ["chien", "chant"],
    ["plein", "plan"],
    ["étreint", "étrange"],
    ["impertinent", "important"]
  ]
};

window.TCF.pairs.nasales_on_an = {
  label: "/ɔ̃/ vs /ɑ̃/",
  a: "/ɔ̃/ (on)",
  b: "/ɑ̃/ (an)",
  items: [
    ["mon", "ment"],
    ["bon", "banc"],
    ["son", "sang"],
    ["ton", "tant"],
    ["long", "lent"],
    ["rond", "rang"],
    ["fond", "fend"],
    ["blond", "blanc"],
    ["pont", "paon"],
    ["nom", "ment"],
    ["réponse", "rance"],
    ["conscient", "consent"]
  ]
};

window.TCF.pairs.u_ou = {
  label: "/y/ vs /u/",
  a: "/y/ (u)",
  b: "/u/ (ou)",
  items: [
    ["pu", "pou"],
    ["bu", "bout"],
    ["lu", "loup"],
    ["rue", "roue"],
    ["dessus", "dessous"],
    ["su", "sou"],
    ["nu", "nous"],
    ["vu", "vous"],
    ["tu", "tout"],
    ["fut", "fou"],
    ["mur", "mour"],
    ["jus", "joue"]
  ]
};

window.TCF.pairs.e_eh = {
  label: "/e/ vs /ɛ/",
  a: "/e/ (é fermé)",
  b: "/ɛ/ (è ouvert)",
  items: [
    ["thé", "taie"],
    ["pré", "prêt"],
    ["fée", "fait"],
    ["dé", "des"],
    ["chez", "chair"],
    ["allé", "allait"],
    ["mangé", "mangeait"],
    ["et", "est"],
    ["nez", "naît"],
    ["clé", "claie"],
    ["dîné", "dînait"],
    ["parlé", "parlait"]
  ]
};
</script>

## Pourquoi ces contrastes ?

| Contraste     | Pourquoi c'est piégeux                                                             | Où on perd des points              |
|---------------|------------------------------------------------------------------------------------|------------------------------------|
| /ɛ̃/ vs /ɑ̃/  | Toutes les nasales sont absentes en anglais ; /ɑ̃/ et /ɛ̃/ sont proches en F1.   | CO B2 (annonces, dialogues)        |
| /ɔ̃/ vs /ɑ̃/  | F2 très proche ; le contexte ne sauve pas (« mon ami » vs « ment ami »)            | CO C1                              |
| /y/ vs /u/    | /y/ n'existe pas en anglais ; tendance à neutraliser en /u/                        | EO (rubrique « précision phonétique ») |
| /e/ vs /ɛ/    | En CO, distingue passé composé (mangé) et imparfait (mangeait)                     | CO B1, EE T2 (temps verbaux)       |

Voir aussi : [unités phonologie complètes](../06_speaking/00_phonology/index.md) · [dictée audio](dictee.md).

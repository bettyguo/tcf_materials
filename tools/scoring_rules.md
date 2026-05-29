# `tools/score_writing.py` — règles de scoring

> Source de vérité **transparente** pour les seuils heuristiques que l'outil applique. Toute valeur produite par le scorer remonte à une règle de ce document. Si vous changez une valeur ici, l'outil change ; si vous changez l'outil sans toucher ce document, c'est un bug.

L'outil n'est **pas** un correcteur d'examen. Il produit une *estimation par bande NCLC* + un retour ciblé sur les métriques quantifiables. Il sert à comparer une copie à elle-même dans le temps, et à comparer une copie aux 3 modèles annotés.

---

## 1. Métriques déterministes

| Métrique | Définition | Comment elle est calculée |
|---|---|---|
| `word_count` | Mots dans le texte sous `## Réponse` | Regex `[A-Za-zÀ-ÿŒœ]+(?:[-'][A-Za-zÀ-ÿŒœ]+)*` |
| `sentence_count` | Phrases (séparation sur `.!?…`) | Regex `[.!?…]+\s+` |
| `avg_sentence_length` | `word_count / sentence_count` | — |
| `max_sentence_length` | Plus longue phrase | — |
| `min_sentence_length` | Plus courte phrase | — |
| `paragraph_count` | Blocs séparés par `\n\n` | — |
| `content_word_count` | Mots ≥ 3 lettres hors stop-list | Stop-list `tools/data/fr_stopwords_min.txt` |
| `unique_lemmas` | Mots-contenus uniques (lower-case) | — |
| `type_token_ratio` (TTR) | `unique_lemmas / content_word_count` | — |
| `connector_inventory` | Connecteurs détectés, classés par CEFR | Liste `tools/data/fr_connectors.yaml` |
| `tense_inventory` | Temps/modes détectés | Patterns `tools/data/fr_tense_markers.yaml` |
| `subordination_rate` | Subordonnants / phrase | Lemmes `que, qui, quand, lorsque, parce que, bien que, alors que, dès que, afin que, pour que, dont, où, lequel` |
| `repetition_flags` | Lemmes répétés dans fenêtre 30 mots | Hors stop-list + hors pronoms 1ère personne |
| `anglicism_flags` | Calques détectés | `tools/anglicisms.yaml` |
| `pivot_phrases_used` | Phrases-pivots utilisées | `tools/data/fr_pivot_phrases.yaml` (sous-ensemble du registre soutenu de `content/05_writing/00_pivots/`) |
| `spell_errors` | Mots non reconnus | `hunspell -d fr_FR,fr_CA` si dispo, sinon `n/a` |

---

## 2. Mapping métriques → critères FEI (0–5)

### 2.1 C1 — Tâche communicative

Base de 5, on retire des points pour les violations :

| Condition | Effet |
|---|---|
| `word_count` < 80 % de `target_words` | **−2** |
| Tâche 1 : `word_count` > 145 % de `target_words` | **−1** (les lettres formelles tolèrent un dépassement plus large) |
| Tâche 2/3 : `word_count` > 130 % de `target_words` | **−1** |
| Tâche 1 sans formule d'appel reconnue (`Madame`, `Monsieur`, `Cher`/`Chère`, `Bonjour`) | **−1** |
| Tâche 1 sans formule de clôture (cordialement, bien à vous, sincèrement, je vous prie d'agréer, sentiments respectueux, ma gratitude, etc. ; liste élargie) | **−1** |
| Tâche 1 avec mélange tu/vous | **−1** |

Plancher à 0, plafond à 5.

### 2.2 C2 — Cohérence / cohésion

Base de 2 ; ajouts conditionnels.

| Condition | Effet |
|---|---|
| `paragraph_count` ≥ 2 (T1) ou ≥ 3 (T2/T3) | **+1** |
| ≥ 4 connecteurs distincts dont ≥ 2 de niveau B2 | **+1** |
| ≥ 6 connecteurs distincts dont ≥ 3 de niveau B2 ou C1 | **+1** (cumulatif avec le précédent) |
| `avg_sentence_length` ∈ [14, 30] mots | **+1** |
| Aucun pronom orphelin détecté (heuristique : pas de `il/elle/ce` en début de paragraphe sans antécédent dans les 2 phrases précédentes) | (pas de retrait) |

Plafond 5.

### 2.3 C3 — Étendue lexicale

Base de 1 ; ajouts par TTR + pivots.

| Condition | Effet |
|---|---|
| `type_token_ratio` ≥ 0,45 | **+1** |
| `type_token_ratio` ≥ 0,52 | **+1** (cumulatif) |
| `type_token_ratio` ≥ 0,58 | **+1** (cumulatif) |
| 0 répétition signalée (`repetition_flags` vide) | **+1** |
| ≥ 2 pivots du registre soutenu détectés | **+1** |
| ≥ 1 anglicisme `severity: major` | **−1** |

Plancher 0, plafond 5.

### 2.4 C4 — Morphosyntaxe

Base de 1 ; ajouts par diversité.

| Condition | Effet |
|---|---|
| ≥ 3 temps/modes distincts | **+1** |
| ≥ 4 temps/modes distincts | **+1** (cumulatif) |
| Présence d'au moins un subjonctif | **+1** |
| `subordination_rate` ≥ 1,2 | **+1** |
| `subordination_rate` ≥ 1,5 (cumulatif) | **+1** (cumulatif) |
| Présence d'au moins une inversion stylistique (*aussi est-il…*, *sans doute peut-on…*, *vous saurais-je gré*) | **+1** |
| `spell_errors` > 5 % des mots | **−1** |

Plancher 0, plafond 5.

**Note** : la détection d'inversion est un signal C1 fort ; elle compense partiellement la difficulté qu'a l'heuristique à distinguer un B2/C1 d'un C1+ pur sur la seule diversité des temps.

---

## 3. Lecture du score `/20`

Le score `/20` est la somme des 4 critères. La bande NCLC est lue sur :

| Score `/20` | Bande NCLC |
|---|---|
| 18–20 | NCLC 10 |
| 16–17 | NCLC 9 |
| 14–15 | NCLC 7–8 |
| 12–13 | NCLC 6 |
| 10–11 | NCLC 5 |
| ≤ 9 | NCLC ≤ 4 |

L'outil annonce la bande **uniquement** quand au moins 3 critères concordent sur la même bande à ±1 point. Sinon, il dit `calibration incertaine — voir [critère discordant]`.

---

## 4. Confiance et limites assumées

- L'outil ne juge **pas** la pertinence argumentative.
- L'outil ne fait **pas** d'analyse fine d'accord (il dépend de `hunspell`).
- L'outil ne détecte que les calques **connus** (liste close `anglicisms.yaml`).
- Le `pivot_phrases_used` est une *présence dans le texte* ; il ne juge pas que la phrase soit utilisée à bon escient.
- Les seuils de ce document sont calibrés par §5 ci-dessous ; ils sont ajustables.

---

## 5. Procédure de calibration

L'outil doit retrouver la bande NCLC étiquetée des 270 modèles dans **≥ 80 %** des cas.

1. Lancer `python -m tools.score_writing --calibrate content/05_writing/`. L'outil scanne tous les modèles annotés `## Modèle NCLC X`, applique son scoring, compare la bande retrouvée à l'étiquette, et émet un rapport.
2. Si l'accord est < 80 %, identifier les critères qui divergent systématiquement. Ajuster leurs seuils dans ce document. Mettre à jour le code.
3. Relancer jusqu'à atteindre ≥ 80 %.
4. Documenter la version calibrée et l'écart résiduel dans [PHASE_5_EVAL.md](../PHASE_5_EVAL.md).

---

## 6. Référence croisée

- Rubrique opérationnalisée : [content/05_writing/00_rubric.md](../content/05_writing/00_rubric.md)
- Outil : [tools/score_writing.py](score_writing.py)
- Données :
  - [tools/data/fr_connectors.yaml](data/fr_connectors.yaml)
  - [tools/data/fr_tense_markers.yaml](data/fr_tense_markers.yaml)
  - [tools/data/fr_pivot_phrases.yaml](data/fr_pivot_phrases.yaml)
  - [tools/data/fr_stopwords_min.txt](data/fr_stopwords_min.txt) (partagé avec `measure_density.py`)
  - [tools/anglicisms.yaml](anglicisms.yaml) (partagé)

---

## 7. §EO — Extension Phase 6 (`tools/score_speaking.py`)

L'outil EO s'appuie sur la pipeline EE (`measure_text`, `score_metrics`) pour les
critères EO-C1/C2/C3 (re-numérotés *efficacité*, *lexique*, *morphosyntaxe*) avec
trois différences :

1. **Cible-mots adaptée à la parole** :

   | Tâche | `target_words` par défaut | Tolérance |
   |---|---:|---:|
   | T1 | 195 (1,5 min × 130 wpm) | ±25 % |
   | T2 | 390 (3 min × 130 wpm) | ±25 % |
   | T3 | 650 (5 min × 130 wpm) | ±25 % |

   Plus indulgent que l'EE (±20 %) — la parole est plus variable.

2. **Seuils lexicaux relâchés** : la parole produit naturellement des répétitions
   fonctionnelles. TTR cible NCLC 8 : ≥ 0,45 (EE : ≥ 0,52). NCLC 10 : ≥ 0,52.

3. **Subordination relâchée** : NCLC 8 cible ≥ 1,0 subord./phrase (EE : ≥ 1,2).
   NCLC 10 : ≥ 1,3 (EE : ≥ 1,5).

### 7.1 EO-C4 — Contrôle phonologique

Critère ajouté en EO. Métriques :

| Source | Métrique | Calcul |
|---|---|---|
| Transcript | `disfluencies_per_100` | Comptage de tokens `tools/data/fr_disfluencies.yaml` × 100 / `word_count` |
| Transcript | `drop_ne_count` | Regex `DROP_NE_RE` — détection de *je sais pas*, *c'est pas mal*, etc. |
| Transcript | `quebec_marker_count` | Comptage des entrées `quebecois_markers_for_recognition` |
| Audio (Whisper) | `words_per_minute` | `word_count × 60 / duration_seconds` |
| Audio (Whisper) | `long_pause_count` | Inter-segment gaps ≥ 1,5 s |
| Audio (Whisper) | `speech_to_silence_ratio` | `(durée − somme_pauses) / somme_pauses` |
| Audio + référence | `phoneme_confusion_hits` | Diff-align cheap : substitutions de tokens correspondant aux classes /ø/-/o/, /e/-/ɛ/, etc. |

**Mapping (base 5, retrait par violation)** :

| Condition | Effet |
|---|---|
| (Audio) WPM < 90 *ou* > 185 | **−2** |
| (Audio) WPM hors [110, 165] mais dans [90, 185] | **−1** |
| (Audio) pauses longues (≥ 1,5 s) > 2 | **−1** |
| (Audio + ref) ≥ 1 confusion phonémique détectée | **−1** |
| `disfluencies_per_100` ≥ 8 | **−2** |
| `disfluencies_per_100` ≥ 4 (et < 8) | **−1** |
| T3 : `drop_ne_count` ≥ 2 | **−1** |
| T3 : `quebec_marker_count` ≥ 1 | **−1** |

Plancher 0, plafond 5.

**Mode texte seul** : si `disfluencies_per_100 == 0` *et* `drop_ne_count == 0`,
le critère est marqué *non évalué* (estimation projetée des 3 autres critères pour
le total `/20`). L'outil indique alors `"C4 non évalué en mode texte seul"`.

### 7.2 Lecture du score `/20` — identique à §3

Mêmes seuils que l'EE. Le scorer annonce la bande uniquement quand 3 critères
concordent à ±1 point.

### 7.3 Calibration — gate à ≥ 75 % (vs EE 80 %)

`python -m tools.score_speaking --calibrate content/06_speaking/`

Bar plus basse que l'EE : la parole est plus bruitée, et la C4 transcript-only
est par construction conservatrice. Spec [07_PHASE_6_SPEAKING.md §8](../07_PHASE_6_SPEAKING.md).

### 7.4 Dépendances optionnelles

Whisper n'est **pas** une dépendance dure. L'outil tourne sans :
- `faster-whisper` : préféré (CPU 4× plus rapide qu'`openai-whisper`).
- `openai-whisper` : fallback.
- Sans aucun des deux : mode texte seul, message d'install actionnable.

Modèle par défaut : `small` (≈ 250 MB). Override : `TCF_WHISPER_MODEL=large-v3`
ou `medium` selon le compromis vitesse/qualité.

### 7.5 Référence croisée EO

- Rubrique opérationnalisée : [content/06_speaking/00_rubric.md](../content/06_speaking/00_rubric.md)
- Outil : [tools/score_speaking.py](score_speaking.py)
- Données :
  - [tools/data/fr_disfluencies.yaml](data/fr_disfluencies.yaml) — Phase 6
  - tous les fichiers EE réutilisés (`fr_connectors.yaml`, `fr_tense_markers.yaml`, `fr_pivot_phrases.yaml`)

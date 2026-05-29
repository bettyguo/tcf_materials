# Backlog

> Issues mineures différées qui ne bloquent pas le passage d'une phase à la suivante. Tagué `phase: N` quand le travail naturellement échoit à une phase ultérieure.

## Phase 1 → différé

- [x] **Public-facing `README.md`** — RÉSOLU en Phase 8 (2026-05-29). Décision : renommer l'ancien `README.md` en [`PROMPT_BUNDLE.md`](PROMPT_BUNDLE.md) et écrire un [`README.md`](README.md) public-facing (60-sec pitch, quickstart, 12-week plan, format options, honest disclaimers, license). *(closed: 8)*
- [ ] **Per-section PDF table-of-contents tuning** — `build_pdf.py` produit un livre monolithique et un PDF par section, mais sans glossaire ni index. À ajouter en Phase 8. *(phase: 8)*
- [ ] **Fallback Piper TTS** — l'`audio_config.yaml` documente Piper comme repli si edge-tts devient indisponible, mais l'implémentation n'est pas câblée. *(phase: 3 ou plus tard)*
- [ ] **Plug-in MkDocs `awesome-pages` directory hide** — la directive `hide: true` dans `content/00_diagnostic/audio_items/.pages` est correcte mais à valider lors du premier `mkdocs build` réel. Si elle n'a pas l'effet attendu, basculer sur `mkdocs.yml > nav:` explicite ou marquer les fichiers `hidden: true` en frontmatter. *(phase: 1.1)*
- [ ] **Hunspell sur Windows** — pas couvert par `tools/audit_french.py` qui shell-out à `hunspell`. CI Linux suffit pour Phase 1, mais documenter dans `CONTRIBUTING.md` que les contributeurs Windows ne voient pas les flags orthographiques en local. *(phase: 1.1, FAIT en CONTRIBUTING)*
- [ ] **`tests/test_links.py` ne suit pas les ancres** — un lien `[…](file.md#anchor)` est validé sur l'existence du fichier mais pas de l'ancre. Acceptable pour Phase 1 (peu d'ancres). *(phase: 8)*
- [ ] **Stubs TBD du ROADMAP non créés** — le ROADMAP référence des fichiers `TBD ...` en plain text dans les cellules de tableau. Volontairement *pas* en syntaxe `[…](…)` markdown pour éviter d'avoir à créer ~80 fichiers stubs. Les phases 2–7 créent ces fichiers au moment de produire le contenu réel. *(phase: 2+)*

## Phase 2 — dette de sourcing et revue native

Phase 2 structure ✅ **complète** ([PHASE_2_EVAL.md](PHASE_2_EVAL.md), 2026-05-28) : 64 unités livrées (15 B1 + 24 B2 + 15 C1 + 10 C2), 0 blocker, 0 majeur, freeze des IDs commité dans [content/01_grammar/_id_freeze.lock](content/01_grammar/_id_freeze.lock). La dette ci-dessous est **différée** (tag `phase: 2.1` / revue native) ; elle n'empêche pas Phase 3 de démarrer contre les IDs frozen.

- [ ] **§5 *Mini-corpus authentique* — sourcing réel à l'échelle.** Chaque unité (64 au total) porte une §5 avec 3–5 extraits *plausibles mais non attestés*, marqués `<!-- AUDIT: -->`. Pour clearance native-review : remplacer chaque extrait par une citation verbatim (≤ 25 mots) d'un article réel (Le Devoir, Radio-Canada, Le Monde, France Culture) ; ajouter une entrée à `references.bib` (format `outlet+year_topicnum`, ex. `radiocanada2026_subj_001`) ; promouvoir le `<!-- AUDIT: -->` en `<!-- AUDIT-BLOCKER: -->` une fois sourcé pour bloquer la régression. **Budget** : ~30 min par unité × 64 unités ≈ 30–50 h de curation. *(phase: 2.1 / native-review)*
- [ ] **Numéros de chapitre Riegel / paragraphes Grevisse à confirmer.** Chaque unité cite des références sous forme « ch. VIII » ou « §1147–1149 » avec un `<!-- AUDIT: ... à confirmer -->`. Vérifier sur l'édition physique avant clearance. *(phase: 2.1 / native-review, requires print-edition access)*
- [ ] **Productions auctoriales (§6.4 / §7.4 / §8.4 / §9.4) à valider en revue native.** Chaque production model answer porte `confidence: medium` et un `<!-- AUDIT: production auctoriale -->`. Queue de revue native à organiser (collègue francophone, tuteur ou linguiste rémunéré). *(phase: 2.1 / native-review)*
- [ ] **836 minors auto-générés dans [AUDIT.md](AUDIT.md)** — disposition complète dans [PHASE_2_AUDIT.md §3](PHASE_2_AUDIT.md) : 767 `audit-comment` (auteur self-flag), 65 `stale` (`audit.status: pending`, idem), 4 `quebecism` (ambiguïté `dîner`/`déjeuner`, à trancher au cas par cas). Ces compteurs descendront au fur et à mesure que la revue native progresse. *(phase: 2.1)*

## Phase 3 — dette de données et de contenu

- [ ] **Liste de fréquence Lonsdale & Le Bras (CSV) — à fournir, NE PAS fabriquer.** `tools/check_frequency.py` est écrit et câblé (`python -m tools.cli check-frequency`), mais il *saute gracieusement* tant que `tools/data/lonsdale_lebras_bands1_6.csv` est absent. Ce CSV (rang, lemme, bande pour les 3000 lemmes des bandes 1–6) doit être **transcrit à la main depuis le dictionnaire imprimé** — il n'a délibérément pas été généré par le LLM, car des attributions de bande inventées violeraient le master prompt §0.2 (pas de données fabriquées) et empoisonneraient toute la phase vocabulaire. Format attendu : en-tête `rank,lemma,band`. Une fois fourni, lancer `check-frequency --strict` en CI. *(phase: 3)*
- [ ] **Contenu Phase 3 (vocab + écoute) — non rédigé.** Le *tooling* Phase 3 est complet et testé (schéma, 3 sous-decks Anki, audio multi-locuteurs, agrégateur AUDIT-ENTRY, check_frequency, freeze IDs, anatomie des distracteurs partagée). Restent à rédiger, en mode projet-side incrémental (~200 h, voir spec §1.1) : 30 unités de fréquence, 15 unités de collocations, 12 domaines thématiques, 60 items d'écoute, 300 phrases-patterns, le fichier `content/03_listening/00_strategy.md`. La rédaction exige une curation de sources réelles (clips audio, articles) que le LLM ne doit pas fabriquer. *(phase: 3)*
- [ ] **`content/03_listening/00_strategy.md` non créé** — référencé (en texte) par `content/09_strategy/00_distractor_anatomy.md` ; à créer lors de la rédaction du bank d'écoute. *(phase: 3)*

## Phase 4 — dette de revue native et de finalisation

Phase 4 structure ✅ **complète** ([PHASE_4_EVAL.md](PHASE_4_EVAL.md), 2026-05-28) : 60 items de CE livrés (3 A1 + 7 A2 + 11 B1 + 25 B2 + 11 C1 + 3 C2), 0 blocker, 0 majeur Phase 4, freeze des IDs commité dans [content/04_reading/_id_freeze.lock](content/04_reading/_id_freeze.lock) (64 IDs). La dette ci-dessous est **différée** (tag `phase: 4.1` / revue native) ; elle n'empêche pas Phase 5 de démarrer contre les IDs frozen.

- [ ] **Revue native des 60 items CE** (~25 h externes). Single biggest gate avant clearance EVAL formelle. **Priorité de revue** : d'abord les 6 items `usable_as_stimulus: true` (impact maximal sur Phase 5), puis les 10 items du mini-mock CE (`mock_question_id: ce-mock-NN`), puis les 15 items B2 type 4 (poids exam max), puis les 29 restants. *(phase: 4.1 / native-review)*
- [ ] **Pass blind-answer Claude** (persona adversariale qui répond aux MCQ sans le corrigé) sur au minimum le mini-mock + les B2 type 4 (~ 6 h). Item ce-c1-001 Q3 déjà self-flagged à reformuler. *(phase: 4.1)*
- [ ] **Promotion des entrées vocabulaire** depuis `## Vocabulaire à exporter en Anki` (inline) vers `flashcard:` (frontmatter) sur les 53 items non-pilotes. Scriptable (~3 h). Une fois fait, le build Anki ajoute ~265 cartes au sous-deck `01_Vocabulaire`. *(phase: 4.1)*
- [ ] **Re-rédaction optionnelle de ce-a2-002** (affiche concert, 69 mots vs band A2 80-210) pour rejoindre la bande, ou ajout d'un item-sœur plus long. Acceptable en l'état (98.3 % in-spec, au-dessus du gate 95 %). *(phase: 4.1)*
- [ ] **Populer `tools/data/source_snippets/`** avec des extraits 100-300 mots des sources citées en `references.bib`, pour activer la vérification verbatim-span (R4 design). Posture actuelle : gitignored, check warn-only. *(phase: 4.1)*
- [ ] **Étendre la calibration de `tools/measure_density.py`** après validation native sur un échantillon : les bandes word_count A1/A2/B1 ont été recalibrées vers le bas pour tenir compte des formats authentiques courts (SMS, annonce). Vérifier que la calibration matche le jugement qualitatif natif. *(phase: 4.1)*
- [ ] **Cleanup minors** : les ~98 minors ajoutés par Phase 4 dans [AUDIT.md](AUDIT.md) (~60 `stale` + ~30 `audit-comment` + ~8 density warnings) sont attendus et se résoudront avec la revue native. *(phase: 4.1)*

## Phase 5 — dette de revue native et de bulk authoring

Phase 5 structure ✅ **complète** ([PHASE_5_EVAL.md](PHASE_5_EVAL.md), 2026-05-28) : rubric opérationnalisé, registre anti-erreurs (56 entrées), bibliothèque de pivots (≥ 193 phrases sur 7 fichiers), 18 templates (6/tâche), 9 sujets pilotes (3/tâche) avec leurs 27 modèles 6/8/10, auto-scorer calibré à 81,5 %, freeze des IDs (39 IDs) à [content/05_writing/_id_freeze.lock](content/05_writing/_id_freeze.lock). La dette ci-dessous est **différée** (tag `phase: 5.1` / revue native ou bulk authoring) ; elle n'empêche pas Phase 6 de démarrer.

- [ ] **Bulk-batch authoring** des 81 sujets restants (27/tâche) — chaque sujet = consigne + 3 modèles annotés NCLC 6/8/10 + variantes + pièges + lexique + cross-refs. **Queue explicite** dans [content/05_writing/tache1/_queue.md](content/05_writing/tache1/_queue.md), [tache2/_queue.md](content/05_writing/tache2/_queue.md), [tache3/_queue.md](content/05_writing/tache3/_queue.md). Budget : ~50 h auteur + ~20 h revue native. *(phase: 5.1)*
- [ ] **Revue native des 9 sujets pilotes + leurs 27 modèles + 193 pivots + 56 anti-erreurs + 18 templates** (~25 h externes). Single biggest gate avant clearance EVAL formelle. **Priorité** : d'abord les 9 sujets pilotes (forward-link Phase 6), puis le canon T3-01 et ses 3 instantiations, puis les pivots-canons (les 7 spot-checkés en audit) et les pivots restants par fichier. *(phase: 5.1 / native-review)*
- [ ] **18 templates supplémentaires** (6/tâche) pour atteindre le 12/tâche du spec §4. Liste implicite dans le champ Template des queues. *(phase: 5.1)*
- [ ] **Vérification du registre anti-erreurs contre Grevisse / Riegel** : chaque entrée du registre ([content/05_writing/00_anti_error.md](content/05_writing/00_anti_error.md)) doit être validée contre une référence normative imprimée. ~ 4 h. *(phase: 5.1 / native-review)*
- [ ] **Attestation native des pivots non-canon** (≥ 186 phrases hors les 7 spot-checkées en audit). Tagger `confidence: high` après validation. *(phase: 5.1 / native-review)*
- [ ] **Recalibration de l'auto-scorer** une fois une vérité-terrain native disponible : actuellement 81,5 % d'accord, possiblement à 88-92 % après ajustement sur la frontière NCLC 8 ↔ NCLC 10. Documenté dans [tools/scoring_rules.md §5](tools/scoring_rules.md). *(phase: 5.1)*
- [ ] **Hunspell sur Windows ou contournement** : le scorer remonte "spell-check absent" sur Windows (où hunspell n'est pas installé par défaut). Option : packager `hunspell-fr` via conda-forge ou WSL, ou shipper un fallback pyhunspell. *(phase: 5.1)*
- [ ] **Promotion du lexique exporté en Anki** des 9 sujets pilotes vers les blocs `flashcard:` du frontmatter, comme pour Phase 4. ~30 min. *(phase: 5.1)*

## Phase 6 — dette de revue native et de bulk authoring

Phase 6 structure ✅ **complète** ([PHASE_6_EVAL.md](PHASE_6_EVAL.md), 2026-05-29) : rubric EO opérationnalisé (4 critères, dont C4 phonologique), kit phonologique 8 unités, programme 60 jours, anti-erreurs EO (32 entrées), 9 sujets pilotes (3/tâche) avec leurs 27 transcripts modèles, auto-scorer EO calibré à 85,2 %, freeze des IDs (22 IDs) à [content/06_speaking/_id_freeze.lock](content/06_speaking/_id_freeze.lock). La dette ci-dessous est **différée** (tag `phase: 6.1` / revue native ou bulk authoring) ; elle n'empêche pas Phase 7 de démarrer.

- [ ] **Bulk-batch authoring** des 81 sujets EO restants (27/tâche). **Queue explicite** dans [content/06_speaking/tache1/_queue.md](content/06_speaking/tache1/_queue.md), [tache2/_queue.md](content/06_speaking/tache2/_queue.md), [tache3/_queue.md](content/06_speaking/tache3/_queue.md). Budget : ~50 h auteur + ~20 h revue native. *(phase: 6.1)*
- [ ] **Revue native** des 9 sujets pilotes + leurs 27 transcripts + 8 unités phonologiques + programme 60 jours + anti-erreurs + rubric (~30 h externes). **Priorité** : d'abord les unités phonologiques (impact maximal sur C4), puis les transcripts T3 (forward-link mock), puis les T2/T1. *(phase: 6.1 / native-review)*
- [ ] **Génération des 270 audio MP3** (9 pilotes × 3 modèles × 1 audio chacun, puis bulk-batch). Flag `audio.required: false` actuel à basculer ; ~2 h compute via edge-tts. Iterative au fil de la revue native. *(phase: 6.1)*
- [ ] **Cross-réinjection** des hinge phrases du `00_phonology/08_prosodie.md` dans le pool de pivots Phase 5 (`content/05_writing/00_pivots/`) pour réutiliser à l'écrit. ~ 1 h. *(phase: 6.1)*
- [ ] **Whisper round-trip QA** sur des enregistrements réels d'apprenant (validation end-to-end du `--audio`). Optionnel ; tooling pur-text suffit pour le path par défaut. *(phase: 6.1)*
- [ ] **Recalibration auto-scorer EO** une fois la revue native fournit la ground-truth bande-par-bande. 85,2 % → possiblement 88-92 %. *(phase: 6.1)*

## Phase 7 — dette de bulk authoring (Mocks #3+#4 + partials) et cheatsheet PDF

Phase 7 structure ✅ **structurally cleared** ([PHASE_7_EVAL.md](PHASE_7_EVAL.md), 2026-05-28) : 2 mocks complets (#1 + #2) + 2 scaffolds (#3 + #4) avec queues ; 4 pilotes de mocks partiels (1/skill) + queue ; 7 fichiers stratégie ; 12 cheatsheets markdown ; calculateur de score CLI + HTML ; 80 IDs frozen sur 3 fichiers ; 18 tests calculator-side passent. La dette ci-dessous est **différée** (tag `phase: 7.1` / bulk authoring ou packaging Phase 8).

- [ ] **Bulk authoring Mock #3** — 39 items CO + 39 items CE + 3 EE prompts + 3 EO prompts. Bloqueur fondamental : la banque d'écoute Phase 3 est en stubs (51 stubs A1-C2). Authoring de 39 items CO supplémentaires dans Phase 7 aurait silencieusement absorbé du travail Phase 3. **Unblock** : Phase 3 bulk + revue native, puis workflow fan-out analogue à celui de Phase 7 §1. *(phase: 7.1)*
- [ ] **Bulk authoring Mock #4** — même volume que Mock #3, plus distracteurs catégories 6-7 amplifiés (test plafonné). Même chaîne d'unblock que Mock #3. *(phase: 7.1)*
- [ ] **Authoring des 12 partial mocks restants** (3 partiels par skill × 4 skills) — la pilote par skill est livrée mais les rotations B1/B2/C1 restent à composer. Queue dans [content/07_mock_exams/partials/_queue.md](content/07_mock_exams/partials/_queue.md). *(phase: 7.1)*
- [ ] **Audio CO masters** (Mock #1 + #2 d'abord, puis #3 + #4) — `audio.required: false` actuellement sur chaque item. Flag flip + `make audio` post revue native des transcripts. ~ 6 h compute total pour les 4 mocks. *(phase: 7.1)*
- [ ] **Revue native des Mocks #1 + #2** (~ 8-10 h externes) — focus CO (où la dette de revue est la plus haute) puis EE/EO models. *(phase: 7.1 / native-review)*
- [ ] **Template LaTeX 2-colonnes pour cheatsheets** — les 12 sources markdown sont budget-compliant (≤ 4 800 chars) mais le rendu PDF actuel utilise le template monolithique XeLaTeX, pas un layout single-page A4 2-col. Budget : ~ 4-6 h authoring template. *(phase: 7.1 ou 8.1)*
- [ ] **Mock #4 self-administered calibration** — auto-administration par Claude Code dans le rôle d'un candidat B2/C1, score lu via `tools.calculate_score`. Doit atteindre CO ≥ 503 / CE ≥ 499 / EE ≥ 14 / EO ≥ 14 (les seuils NCLC 8) pour valider la calibration des distracteurs. **Gating Mock #4 authoring d'abord.** *(phase: 7.1)*

## Phase 8 — carry-outs (post-launch v1.1)

Phase 8 structure ✅ **complète** ([PHASE_8_EVAL.md](PHASE_8_EVAL.md), 2026-05-29) : onboarding public-facing, cross-format parity (`mkdocs --strict` à 0 warning), examples mini-corpus, audit final, MEMORY mis à jour. Le projet est en état `cleared_structural`. Les items ci-dessous sont les obligations v1.1 explicites.

- [ ] **Mock #4 simulation contre le bar de calibration** ([09_PHASE_8_LAUNCH.md §7](09_PHASE_8_LAUNCH.md) critère 7) — bloqué par l'authoring de Mock #4 lui-même. Voir Phase 7.1. *(phase: 8.1)*
- [ ] **EPUB epubcheck dans CI** — le workflow `pdf-epub` build l'EPUB mais ne le valide pas. Ajouter `epubcheck` (Java) à la matrice CI ou installer en step. ~ 30 min. *(phase: 8.1)*
- [ ] **`per-section PDF` table-of-contents tuning** — pas de glossaire ni index par section. ~ 2-3 h template work. *(phase: 8.1)*
- [ ] **Fallback Piper TTS** — `audio_config.yaml` documente Piper comme repli si edge-tts indisponible, mais pas câblé. Reporté de Phase 1 / Phase 3. *(phase: 8.1)*
- [ ] **`tests/test_links.py` qui suit les ancres** — actuellement valide l'existence du fichier mais pas de l'ancre `#section`. Acceptable v1.0 ; à durcir v1.1 si la corpus grandit. *(phase: 8.1)*
- [ ] **Mock #4 calibration une fois Mock #4 authored** — Claude-Code-as-candidate roule Mock #4 end-to-end, scores via `tools.calculate_score`, atteint CO ≥ 503 / CE ≥ 499 / EE ≥ 14 / EO ≥ 14. *(phase: 8.1)*
- [ ] **English version of README + 00_start_here** — current is French-leaning. ~ 2 h translation pass. *(phase: 8.1)*
- [ ] **Cheatsheet PDF 2-column template** — see Phase 7.1. *(phase: 8.1 ou 7.1)*

## Idées non priorisées

- [ ] Sortir un export CSV des flashcards pour Quizlet / Memrise.
- [ ] Intégrer un mini lecteur audio HTML5 dans le site (au-delà de la balise `<audio>` native du markdown).
- [ ] Builder une version « apprenant pressé » : ROADMAP en 6 semaines au lieu de 12 (intensif full-time).
- [ ] Builder une version « apprenant lent » : ROADMAP en 24 semaines (1 h/jour).

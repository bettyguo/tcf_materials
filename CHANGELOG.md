# Changelog

All notable changes are documented here in [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) style. Versioning is per-phase, not per-feature: each phase bumps the minor version on completion.

## [1.1.1] — 2026-05-29 — World-class interactive site (v1.1+ widget expansion)

### Added — 10 new browser-side widgets (no servers, no tracking, audit-clean)
- **Flashcards SRS** ([`content/11_tools/flashcards.md`](content/11_tools/flashcards.md)) — 3 decks audités (modes/déclencheurs B1+B2 × 20 cartes, faux-amis × 20, connecteurs B2 × 20). 4-grade SM-2 light scheduler (Again 1 j / Hard 3 j / Good 7 j / Easy 14 j). Stats per deck persisted to `tcf:fc:<deck>` and `tcf:fc-stats:<deck>`.
- **Drill conjugaison** ([`content/11_tools/conjugaison.md`](content/11_tools/conjugaison.md)) — 12 verbes haute-fréquence × 6 temps (présent, PC, imparfait, futur, conditionnel présent, subjonctif) × 6 personnes = 432 formes. Accents tolérés (NFD strip). Mini-SRS sur les formes ratées (poids × (1+2w)).
- **Dictée audio** ([`content/11_tools/dictee.md`](content/11_tools/dictee.md)) — Web Speech API (voix française système). 3 blocs (court B1, B2 pro, C1 presse), vitesse 0.7×–1.15×. Grading par distance de Levenshtein (≥ 92 % = juste, 70-91 % = proche, < 70 % = à reprendre).
- **Suivi des examens blancs** ([`content/11_tools/suivi.md`](content/11_tools/suivi.md)) — Logger d'entrées (date, label, 4 scores bruts) + graphe SVG de trajectoire NCLC binding avec ligne cible 7. Export JSON. Hover tooltips natifs.
- **Série d'étude / streak** ([`content/11_tools/streak.md`](content/11_tools/streak.md)) — heatmap 91 jours (13 × 7) en grille CSS, calcul streak actuel + meilleure série + total. Clic-cell pour basculer.
- **WPM — vitesse de lecture** ([`content/11_tools/wpm.md`](content/11_tools/wpm.md)) — 2 passages audités (B2 ~ 232 mots, C1 ~ 257 mots). Verdicts opérationnels (≥ 220 wpm confortable, 170-219 solide, 120-169 acceptable, < 120 à renforcer).
- **Compteur de mots EE** ([`content/11_tools/compteur-mots.md`](content/11_tools/compteur-mots.md)) — 3 zones T1/T2/T3 calibrées aux fourchettes officielles (60-120, 120-150, 180-250). Mots, caractères, phrases, temps de lecture estimé en temps réel. Brouillon auto-sauvegardé.
- **Favoris** ([`content/11_tools/favoris.md`](content/11_tools/favoris.md)) — étoile injectée à côté du H1 de toute page ; touche <kbd>f</kbd> pour basculer ; liste persistante (max 60).
- **FAQ** ([`content/11_tools/faq.md`](content/11_tools/faq.md)) — ~ 25 entrées (TCF Canada, corpus, stratégie 12 sem., outils), réponses sourcées IRCC/FEI.
- **Glossaire CEFR / NCLC / TCF** ([`content/11_tools/glossaire.md`](content/11_tools/glossaire.md)) — ~ 50 termes alphabétiques avec définitions + renvois aux unités et sources autoritatives.

### Added — UI/UX power features
- **Palette de commandes** <kbd>Ctrl</kbd>+<kbd>K</kbd> / <kbd>⌘</kbd>+<kbd>K</kbd> — 29 entrées (tous les outils, pages clés, actions thème/imprimer/copier-lien/favori). Recherche fuzzy diacritique-insensible, navigation flèches, <kbd>Enter</kbd> ouvre.
- **SVG NCLC gauges animées** — anneau de progression circulaire avec count-up. Couleur dérivée du delta valeur/cible (ok/warn/bad). Affichés sur la page d'accueil, réutilisables via `.tcf-gauge[data-value][data-max][data-label][data-target][data-unit]`.
- **Confettis** sur quiz parfait 10/10 (`window.TCF.confetti()`). Respect strict de `prefers-reduced-motion`.
- **Étoile favoris** auto-injectée à côté de chaque H1 du corpus.
- **Raccourci <kbd>f</kbd>** pour basculer le favori de la page courante.
- **OG + Twitter Card meta** dans `overrides/main.html` pour les partages réseaux.

### Updated
- [`content/assets/javascripts/extra.js`](content/assets/javascripts/extra.js) — bundle étendu de ~ 750 → ~ 1 800 lignes vanilla JS. 10 nouveaux modules (gauge, flashcards, conjugaison, dictée, tracker, streak, word counter, WPM, favorites, command palette, confetti) + extension du registre de raccourcis (<kbd>Ctrl/⌘ K</kbd>, <kbd>f</kbd>).
- [`content/assets/stylesheets/extra.css`](content/assets/stylesheets/extra.css) — ~ 400 lignes ajoutées pour les nouveaux widgets, gauge SVG, palette, confettis, étoile favoris, responsive ≤ 600 px et 601-900 px, règles d'impression.
- [`content/index.md`](content/index.md) — hero v1.1 avec mention palette `Ctrl+K`, gauge row animée pour cibles NCLC, grille « Outils intégrés » expanded de 8 → 18 cartes, badges « v1.1 » sur les nouveautés, callout « 20 outils interactifs ».
- [`content/11_tools/index.md`](content/11_tools/index.md) — landing tools réorganisée en 3 sections (Pratique active / Mesure et suivi / Référence et productivité), tableau « quel outil à quelle phase », tableau exhaustif des clés `localStorage` utilisées.
- [`content/11_tools/raccourcis.md`](content/11_tools/raccourcis.md) — palette de commandes ajoutée en section dédiée, raccourci <kbd>f</kbd> documenté.
- [`overrides/main.html`](overrides/main.html) — bannière annonce v1.1 (10 nouveaux outils + palette), OG meta, theme-color.
- [`overrides/404.html`](overrides/404.html) — grille de 10 destinations (ajout flashcards, suivi, FAQ, glossaire), hint palette de commandes.

### Stability
- `mkdocs build --strict` clean (0 errors). 422 pages rendered (+ 10 vs v1.1.0).
- No content schema changes ; no audit hooks affected ; zero external trackers added.
- `localStorage` namespace `tcf:` — 9 clés documentées, toutes effaçables via les paramètres du navigateur.
- `prefers-reduced-motion` respecté (animations gauges, count-up, confettis désactivés).

## [1.1.0] — 2026-05-29 — Interactive site upgrade (post-launch polish)

### Added — interactive features (browser-side, zero tracking)
- New section [`content/11_tools/`](content/11_tools/) — five interactive utility pages all rendering through `mkdocs build`:
  - `calculateur-nclc.md` — NCLC calculator (4 inputs → 4 NCLCs, binding minimum, CRS bonus, shareable-URL permalink); also embedded inline on the homepage.
  - `minuteur.md` — Pomodoro 25/5 + 6 official TCF exam-time presets (CO 35 min, CE 60 min, EE T1/T2/T3, EO 12 min). Tab-title live countdown, end-of-cycle beep.
  - `quiz-rapide.md` — 10-question self-quiz (grammar / vocab / strategy), instant per-answer feedback, end-of-quiz summary with score and recommendations.
  - `checklist-j1.md` — four persistent checklists (sac J-1, corps & esprit, matin J, micro-stratégies en épreuve) saved to localStorage.
  - `raccourcis.md` — keyboard-shortcuts documentation page.
- [`content/assets/javascripts/extra.js`](content/assets/javascripts/extra.js) — ~750-line vanilla-JS bundle: reading-progress bar, skill-bar scroll-reveal, stat-row count-up, keyboard shortcuts overlay (<kbd>?</kbd>), floating action buttons (top, print, copy-link, help), toast notifications, NCLC calculator widget, Pomodoro timer widget, self-quiz widget, persistent-checklist widget, audio playback-rate selector on every `<audio>` element, external-link "↗" annotation, skip-to-content link. Idempotent, instant-nav-aware.
- [`content/assets/javascripts/mathjax-init.js`](content/assets/javascripts/mathjax-init.js) — MathJax 3 init that re-typesets on Material's instant-nav page swap.
- MathJax 3 (CDN), `mkdocs-glightbox` (image lightbox/zoom), and `mkdocs-minify-plugin` (HTML/CSS/JS minification) added to the toolchain.

### Updated
- [`content/assets/stylesheets/extra.css`](content/assets/stylesheets/extra.css) — rewritten as a 16-section themed stylesheet: scroll progress, count-up tabular numerals, animated skill bars, NCLC-calculator / timer / quiz / checklist styles, keyboard-shortcuts overlay, toast host, FAB host, CEFR/NCLC badge classes (`.cefr-a1` … `.cefr-c2`, `.nclc`), enhanced print rules, `prefers-reduced-motion` support, accessible focus rings on every interactive control.
- [`overrides/404.html`](overrides/404.html) — six-link grid (Démarrer / Jour 0 / Diagnostic / Outils / Cheatsheets / Mocks) with gradient-text 404, Seneca quote, search hint.
- [`content/index.md`](content/index.md) — homepage actions bar now has 3 CTAs (Commencer / Diagnostic / Outils); "Outils intégrés" feature grid expanded from 4 to 8 cards; inline NCLC calculator embedded directly on the homepage.
- [`mkdocs.yml`](mkdocs.yml) — `palette` now starts with `(prefers-color-scheme)` auto-toggle (system → light → dark cycle), added `navigation.tabs.sticky`, `content.code.select`, `content.action.view`, `header.autohide`; added `extra_javascript` for the bundle + MathJax; added `glightbox` and `minify` plugins.
- [`content/.pages`](content/.pages) — added `11_tools` to root nav.
- [`README.md`](README.md) — interactive-features block at the top describing each browser-side widget and listing direct links.

### Stability
- `mkdocs build --strict` clean (18.98 s, 0 errors). All 412 pages render.
- No content schema changes; no audit hooks affected. Zero external trackers added.

## [1.0.0] — 2026-05-29 — Launch (Phase 8 close)

### Added — Phase 8 (launch)
- Public-facing [README.md](README.md) — 60-second pitch, quickstart, 12-week plan, format options, honest disclaimers, license + acknowledgements. The original prompt-bundle README is preserved at [PROMPT_BUNDLE.md](PROMPT_BUNDLE.md).
- [content/00_start_here.md](content/00_start_here.md) — Day-0 onboarding flow (env setup → diagnostic → ROADMAP calibration → Anki install → 2 h block → Day 1).
- [CONTRIBUTORS.md](CONTRIBUTORS.md) — human + AI pair-programmer credits, pedagogical acknowledgements.
- [content/03_listening/00_strategy.md](content/03_listening/00_strategy.md) — CO strategy overlay (was missing; referenced by Mock #1 answer key).
- [examples/environnement/](examples/) — single-domain mini-corpus showing the conventions on the *environnement* domain end-to-end (vocab + reading + writing T3 + speaking T3).
- [tools/mkdocs_external_refs.py](tools/mkdocs_external_refs.py) — MkDocs `on_page_markdown` hook that rewrites repo-relative `../../target.md` references to absolute GitHub URLs at build time. Sources stay clean; rendered HTML resolves.

### Fixed — Phase 8 (link cleanup)
- File-rename refs corrected corpus-wide: `19_connecteurs_logiques.md` → `19_connecteurs_inventaire.md` (4 files); `12_societe_politique.md` → `12_societe.md` (1 file); `21_faire_causatif.md` → `21_faire_causative.md` (1 file); `01_subjonctif_relatif.md` → `01_subjonctif_apres_relatif.md` (1 file).
- Mock #1 + Mock #2 `00_instructions.md` updated to reference the 4-part CO split (`01a..01d_co_*.md`) and the 3-part EE/EO model splits (`07_ee_models_t{1,2,3}.md`, `08_eo_models_t{1,2,3}.md`) instead of the legacy single-file names.
- Mock #1 `08_eo_models_t2.md` cross-refs corrected (`07_eo_models_t1.md` → `08_eo_models_t1.md`; `09_eo_models_t3.md` → `08_eo_models_t3.md`).
- Mock #1 `09_score_calculator.md` reference to `../../../site/calculator.html` (build artefact outside docs) replaced with descriptive prose pointing to the deployed site path.
- 9 `_queue.md` files in `05_writing/tache{1,2,3}/` and `06_speaking/tache{1,2,3}/` had wrong `../../` depth for framing-doc refs (resolved into `content/` instead of repo root) — corrected to `../../../`.
- 4 reading files at depth-3 (`c1/`, `c2/`) using `../../references.bib` corrected to `../../../references.bib`.
- 9 `09_strategy/0{3,4}_*_strategy.md` cross-refs using `../../content/...` (impossible from inside `content/`) corrected to `../05_writing/...` / `../06_speaking/...`.
- `mkdocs build --strict --clean` now completes with 0 WARNINGS (was 195).
- `pytest tests/test_links.py` now reports 0 broken links (was 23).

### Updated — Phase 8 (hygiene)
- `CHANGELOG.md` (this file) — Phase 2/3/6/7/8 entries added; v1.0.0 marker.
- `BACKLOG.md` — Phase 6/7 deferral lists + Phase 8 carry-outs.
- `mkdocs.yml` — added `extra.repo_url` for the external-ref hook and wired the hook into the `hooks:` list.

## [0.7.0] — 2026-05-28 — Phase 7 close (mocks + strategy + cheatsheets)

### Added
- Mock #1 (pilot) and Mock #2 (calibration) — fully authored end-to-end (CO inédit × 4 part files per CEFR, CE composed from Phase 4 source pool, EE × 3 task models per band, EO × 3 task models per band, instructions + answer keys + diagnostic).
- Mock #3 and Mock #4 — scaffolded with `_queue.md` enumerating items to author in v1.1.
- 4 partial mocks (1 pilot per skill: CO, CE, EE, EO) + queue for the remaining 12.
- 7 strategy files in `content/09_strategy/`: `00_exam_day.md`, `01_co_strategy.md`, `02_ce_strategy.md`, `03_ee_strategy.md`, `04_eo_strategy.md`, `05_pitfalls.md`, `06_taper_protocol.md` (+ pre-existing `00_distractor_anatomy.md`).
- 12 cheatsheets in `content/08_cheatsheets/` (each ≤ 4 800 chars per design §6). PDF rendering deferred to Phase 8.
- Post-mock diagnostic template (`00_diagnostic_template.md`) + protocol (`00_diagnostic_protocol.md`) with rebalance hooks for `ROADMAP.md`.
- `tools/calculate_score.py` — CLI + 18 tests (`tests/test_calculate_score.py`, all pass) covering NCLC 7/8/9 thresholds, raw 100/699 edge cases, EE/EO bands, full report. `site/calculator.html` — vanilla-JS web version, same tables.
- `tools/snapshot_phase7_ids.py` — locks `content/07_mock_exams/_id_freeze.lock` (58), `content/08_cheatsheets/_id_freeze.lock` (13), `content/09_strategy/_id_freeze.lock` (9) = 80 new IDs.
- 12 pedagogical-mention files annotated with `<!-- AUDIT-IGNORE: anglicism|quebecism … -->` (cheatsheets that *teach* the calques/quebecisms; mock files that *cite* them in distractor options).

### Stability
- No schema extension this phase; 410 files validate against `Frontmatter`. Phase 3/4/5/6 ID freezes unchanged (`--check` exit 0 on all four).

## [0.6.0] — 2026-05-29 — Phase 6 close (speaking)

### Added
- Operationalised EO rubric (`content/06_speaking/00_rubric.md`) — 4 criteria × bands 0-5 including new EO-C4 phonological.
- 8-unit phonological kit (`content/06_speaking/00_phonology/`): vocalique, consonantique, liaisons obligatoires/interdites/facultatives, enchaînement, schwa, prosodie. Each cites Léon + Tranel.
- 60-day "talk-yourself-to-fluency" program (`content/06_speaking/00_program.md`) — 5 progressive blocs A→E + shadowing protocol + 25-point phonological self-evaluation grid + weekly log template.
- Anti-error register EO (`content/06_speaking/00_anti_error.md`) — 32 entries across 6 sections.
- 9 pilot prompts (3 per tâche) with 27 model transcripts (NCLC 6/8/10) + phonological annotations + ## SCRIPT blocks ready for TTS. Calibration: 85.2 % adjacency-tolerant agreement on the 27 models.
- `tools/score_speaking.py` (~480 LOC) — transcript-only + audio-augmented modes; reuses ~70 % of `score_writing.py` via direct import; optional Whisper integration.
- Data file `tools/data/fr_disfluencies.yaml` (18 entries, 5 buckets).
- `tools/snapshot_phase6_ids.py` — `content/06_speaking/_id_freeze.lock` (22 IDs).
- Schema extension: `usable_in_mock: bool` added to `tools/models.py` (backward-compatible).
- Bulk-batch queues (`tache{1,2,3}/_queue.md`) — 81 remaining prompts × 3 models = 243 model transcripts to author; ~50 h queued.

### Deferred
- 270 EO audio MP3 files — `audio.required: false` on all 9 pilot prompts; one-flag flip + `make audio` post native review.
- Native review of 14 newly-authored files (9 prompts + 8 phonology units + program + anti-error + rubric) — ~30 h external.

## [0.5.0] — 2026-05-28 — Phase 5 close (writing)

### Added — Phase 5 (writing bank)
- Operationalised FEI rubric (`content/05_writing/00_rubric.md`) with per-criterion descriptors per band + auto-evaluation grid.
- Anti-error register (`00_anti_error.md`) — 56 entries across 7 sections (subjonctif, lexique/calques, connecteurs, accords, constructions verbales, registre, Quebec/France contrasts).
- Pivot phrases library (`00_pivots/`) — 7 files × ≥ 193 phrases tagged by function / register / CEFR, with usage notes and anti-patterns.
- 18 writing templates (6 per tâche) in `00_templates/{t1,t2,t3}/` — squelette + slots + ~30 fully-developed instantiations. T3-01 (thèse-concession-réfutation-conclusion) ships with 3 instantiations across 3 domains (IA, vols intérieurs, langue à Montréal).
- 9 pilot prompts (3 per tâche) with full 3-band model answers (NCLC 6/8/10) + variantes contrastives + pièges à éviter + lexique exporté en Anki + cross-refs to templates / pivots / anti-error.
- Bulk-batch queues (`tache{1,2,3}/_queue.md`) — explicit per-prompt scoping of the remaining 81 prompts for next-session authoring.
- Full `tools/score_writing.py` (~ 700 LOC, replaces 35-line Phase 1 stub) — deterministic metrics (word/sentence/TTR/connectors/tenses/subordination/repetition/anglicism/pivot/inversion/hunspell-shell-out) + heuristic threshold-table rubric per `tools/scoring_rules.md` + targeted feedback messages. CLI: `python -m tools.cli score-writing <path> [--json] [--calibrate]`. Calibration: 81.5 % adjacency-tolerant match on the 27 model answers (above 80 % gate).
- Data files: `tools/data/fr_connectors.yaml` (B1/B2/C1 connector inventory, ~125 entries), `fr_tense_markers.yaml` (regex patterns for 11 tense/mood combos), `fr_pivot_phrases.yaml` (curated soutenu subset for scorer).
- `tools/snapshot_phase5_ids.py` — parallel to Phase 3/4 snapshotters. ID freeze at `content/05_writing/_id_freeze.lock` (39 IDs).
- Schema extensions in `tools/models.py`: `task` (1..3), `target_words` (≥ 30), `register_required` ({familier, neutre, formel, soutenu}). Backward-compatible.

## [0.4.0] — 2026-05-28 — Phase 4 close (reading)

### Added — Phase 4 (reading bank)
- 60 reading items authored end-to-end across CEFR A1→C2 at the §2 distribution (6 type-1 / 9 type-2 / 12 type-3 / 15 type-4 / 9 type-5 / 6 type-6 / 3 type-7). Score-anchored over-densification at B2 (25 items, 42 % of the bank for ~30 % of CE score).
- 3 top-level strategy/training files : `content/04_reading/00_strategy.md` (CE overlay), `00_speed_training.md` (4-drill protocol with 8-week WPM log), `00_distractor_anatomy.md` (pointer to the CO+CE shared taxonomy at `content/09_strategy/`).
- Per-item structure : authentic-format text + 3-5 MCQ + corrigé with `<!-- DISTRACTOR: cat=N -->` tags + 5-9 vocab harvest + speed markers + post-mortem cross-links.
- 6 items tagged `usable_as_stimulus: true` for Phase 5 EE T3 pool (5 domains).
- 10 items tagged `mock_question_id: ce-mock-NN` for the reproducible 25-min mini-mock CE.
- Tooling : `tools/measure_density.py` (lightweight, no spaCy dep), `tools/snapshot_phase4_ids.py`, `tools/data/fr_stopwords_min.txt`, `python -m tools.cli measure-density` command. Schema extensions in `tools/models.py` (`word_count`, `lexical_density`, `usable_as_stimulus`) — backward-compatible.
- ID freeze committed at `content/04_reading/_id_freeze.lock` (64 IDs).
- Phase 1 canary `ce-b1-canary-01` retired in freeze commit.
- 21 invented prerequisite IDs (`gram-c1-co`, `gram-c1-nom`, `gram-c2-inv`) corrected corpus-wide to real Phase-2 frozen IDs.

## [0.3.0] — 2026-05-28 — Phase 3 close (vocab + listening, tooling)

### Added — Phase 3 (vocab + listening — tooling)
- 3-sub-deck Anki build wired up: `01_Vocabulaire`, `02_Patterns`, `03_Quarantaine`. Confidence-gated (`high` only ships).
- TTS audio pipeline (`tools/build_audio.py`) with `audio_config.yaml` — 4 voices (France-male, France-female, Quebec-male, Quebec-female) + register-defaults map. `## SCRIPT` blocks generated as MP3 at `audio/<id>.mp3`.
- `tools/check_frequency.py` — checks vocab entries against an external frequency CSV (`tools/data/lonsdale_lebras_bands1_6.csv`, **not** committed — manual transcription pending; see [BACKLOG.md](BACKLOG.md)).
- `tools/snapshot_phase3_ids.py` — ID freeze tooling.
- `content/09_strategy/00_distractor_anatomy.md` — shared CO+CE taxonomy (1-7 categories). Referenced by Phase 4 reading bank + Phase 7 strategy files.
- AUDIT-ENTRY annotation pattern (`<!-- AUDIT-ENTRY: confidence=high|medium|low domain=... -->`) for per-entry tagging inside vocab files.
- 12 thematic vocabulary domain skeletons (`content/02_vocabulary/thematic/0{1..9,10,11,12}_*.md`).
- Phase 2 + Phase 3 ID freezes at `content/01_grammar/_id_freeze.lock` (64 IDs) and `content/02_vocabulary/_id_freeze.lock` (61 IDs).

### Deferred
- Bulk Phase 3 content (30 frequency units + 15 collocation units + 60 listening items + 300 sentence-pattern cards) — requires real-source curation; not LLM-authorable. Tracked in [BACKLOG.md](BACKLOG.md).

## [0.2.0] — 2026-05-28 — Phase 2 close (grammar)

### Added — Phase 2 (grammar B1 → C2)
- 64 graded grammar units across CEFR bands: 15 B1 consolidation + 24 B2 core + 15 C1 advanced + 10 C2 polish.
- Per-unit structure: §1 cadrage + §2 règle + §3 sous-règles + §4 pièges + §5 mini-corpus authentique (placeholder citations flagged `<!-- AUDIT: -->`) + §6 production auctoriale + §7 cross-refs + §8 prerequisites + §9 niveau d'exigence.
- `content/01_grammar/_id_freeze.lock` (64 IDs).
- 0 schema errors, 0 majors at audit close (carry-over minors from authoring-self-flags only).

### Deferred
- §5 mini-corpus sourcing (placeholder citations to be replaced by verbatim ≤ 25 mots from Le Devoir, Radio-Canada, Le Monde, France Culture, with `references.bib` entries). Tracked in [BACKLOG.md §Phase 2](BACKLOG.md). Budget: ~ 30-50 h external curation.
- Riegel chapter numbers + Grevisse paragraph numbers (cited as « ch. VIII » / « §1147–1149 » with `<!-- AUDIT: ... à confirmer -->`) — verify against print edition.
- Native review of §6 productions auctoriales (all `confidence: medium`).

## [0.1.0] — 2026-05-27 — Phase 1 close (foundation)

### Added — Phase 1 (foundation)
- Repo skeleton (`content/`, `tools/`, `tests/`, `latex/`, `.github/`) and gitignore/attributes.
- Frontmatter schema (`tools/models.py`) and content loader (`tools/_common.py`).
- Adversarial French audit pipeline: `tools/audit_french.py`, `tools/anglicisms.yaml`, `tools/audit_whitelist.txt`.
- Build pipeline: `tools/build_site.py`, `build_anki.py`, `build_audio.py`, `build_epub.py`, `build_pdf.py`.
- MkDocs Material site config with custom `estimated_minutes` hook.
- Pandoc + XeLaTeX template (`latex/tcf-template.tex`) with French typography callouts.
- 70-minute Day-0 diagnostic (10 CO + 10 CE + 1 EE + 1 EO) with per-item TTS scripts and full answer key.
- Three pipeline-canary seed files (grammar B2 subjonctif, listening B1, reading B1).
- `ROADMAP.md` — 84-day plan with default rhythm, four mock milestones, contingency rules.
- Test suite: frontmatter schema, naming, link integrity, audio scripts, audit smoke + alive test, roadmap structure.
- CI workflows: `build.yml` (test + audit + anki + site, then pdf + epub) and `deploy-pages.yml`.
- `references.bib` seeded with FEI, IRCC, Riegel, Grevisse, Lonsdale & Le Bras, Krashen, Swain, Carpenter, Lyster, plus authentic-source quarries.

## [0.0.0] — 2026-05-27

Prompt bundle authored (11 framing documents under repo root).

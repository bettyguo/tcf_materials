# PHASE 4 — DESIGN
## Reading bank (CE) — 60 authentic-style items + speed training + cross-modal hooks

> Status: **design draft — awaiting greenlight before content authoring begins**.
> Scope reference: [05_PHASE_4_READING.md](05_PHASE_4_READING.md).
> Governance: [00_MASTER_PROMPT.md §0.6](00_MASTER_PROMPT.md) (Think → Design → Code → Audit → Eval → Iterate).
> Companions: [PHASE_3_DESIGN.md](PHASE_3_DESIGN.md), [PHASE_3_EVAL.md](PHASE_3_EVAL.md) (immediate predecessor — Phase 3 ID freeze is the precondition that unblocks this design), [PHASE_2_AUDIT.md](PHASE_2_AUDIT.md).
> Shared assets: [content/09_strategy/00_distractor_anatomy.md](content/09_strategy/00_distractor_anatomy.md) (already authored by Phase 3, intentionally CO+CE shared per audit gap M14 — Phase 4 reuses, does NOT duplicate).
> Author: Claude Code. Date: 2026-05-28.

---

## 1. Restated goal

Produce the **reading item bank** that anchors NCLC 7→9 progress on the CE side of the exam, plus the two stand-alone strategy supports that the spec requires.

- **60 reading items** at the seven-bucket typology and CEFR distribution of [05_PHASE_4_READING.md §2](05_PHASE_4_READING.md) (6/9/12/15/9/6/3 across types 1→7).
- **1 reading-speed training file** with the four drill protocols + self-tracking template ([§5](05_PHASE_4_READING.md)).
- **1 CE-specific strategy overlay** (`content/04_reading/00_strategy.md`) — mirrors the planned [content/03_listening/00_strategy.md](content/03_listening/) on the CO side; references the shared distractor taxonomy rather than re-asserting it.
- **1 pointer file** that delegates the seven distractor categories to the already-shipped [content/09_strategy/00_distractor_anatomy.md](content/09_strategy/00_distractor_anatomy.md) — single source of truth per Phase 3 audit gap M14.
- **~300 reading-sourced flashcards** harvested from per-item `## Vocabulaire à exporter en Anki` sections and routed by the Phase 3 build into `TCF Canada::01_Vocabulaire` (`confidence: high`) or `::99_Quarantine` (`confidence: medium`).
- **Cross-modal coherence**: every reading item declares `prerequisites:` against the 12 frozen thematic vocab IDs ([content/02_vocabulary/_id_freeze.lock](content/02_vocabulary/_id_freeze.lock)) and ≥ 1 grammar ID ([content/01_grammar/_id_freeze.lock](content/01_grammar/_id_freeze.lock)).
- **Stimulus tagging**: a subset (5–8) of B2/C1 items is tagged `usable_as_stimulus: true` so Phase 5 (Writing) can pick up "stimulus document" texts for EE tâche 3 prompts via lookup ([05_PHASE_4_READING.md §8](05_PHASE_4_READING.md) hand-off note).

Out of scope for Phase 4: any writing or speaking material (Phases 5–6), any mock-running interpretation (Phase 7), any new audio (CE is silent).

---

## 2. Top risks (mitigations)

| # | Risk | Mitigation |
|---|---|---|
| R1 | Hallucinated French at C1+ register inside the item *texts themselves*. Reading bank failure mode is sneakier than the listening one: an L2 learner reading a wrong-gender or invented-collocation "Le Monde-style" editorial will internalise the error from sheer exposure. | Same protocol as Phase 3: grounding-first authoring (2–3 authentic snippets per text, cited in `sources:` against `references.bib`), two-pass adversarial review (`tools/audit_french.py` + manual `<!-- AUDIT: -->`), per-item confidence rollup. **Additional R1-CE check**: at least one full sentence of every text must be paraphrase-traceable to the cited source — verified at audit by spot-comparison. |
| R2 | Distractor accidentally works (the single most common bank-quality failure flagged in [§4 step 5](05_PHASE_4_READING.md) of the spec). | Mandatory **blind-answer audit pass**: Claude (a second adversarial persona) answers each MCQ from the text alone, with the corrigé hidden. Any item where the blind answer ≠ key on defensible grounds is broken — fix or quarantine. Procedure encoded in `PHASE_4_AUDIT.md` §1. |
| R3 | Density / length metrics drift across the bank — items nominally B2 ending up at A2 lexical density or C1 at B1. The score-anchored §0.3 ordering breaks down if "B2" texts are not actually B2. | New tool `tools/measure_density.py` computes word count, lexical density, TTR, average sentence length on every reading item and emits per-CEFR band targets. The audit fails the file if any metric is out of band. See §3.1. |
| R4 | Copyright violation: corpus reproduces source text verbatim beyond fair-use limits (the spec §4 step 1 calls this "fair-use-bounded" but does not give a concrete cap). | Hard rule: zero verbatim spans > 25 words from any single source. Verified by an audit-side n-gram check against the local corpus of source snippets cited in `references.bib`. Texts must be paraphrased compositions in the voice of the source, not extractions. |
| R5 | C2 typology drift toward classical literature. The spec [§2 item 7](05_PHASE_4_READING.md) names "Texte littéraire ou pastiche" but the **TCF Canada FEI sample papers do not use classical lit** — the actual C2 reading items are dense press chronicles, satirical columns, or ironic essays. Authoring 3 Hugo-style excerpts would mis-prepare the learner. | Same correction as Phase 3 audit gap M5 (which scoped C2 listening to radio chroniques, not literary readings): Phase 4 C2 texts are **press pastiches, ironic columns, or chronique satirique excerpts** (e.g., voice of Le Monde "L'Histoire d'un mot", Courrier International pastiches, Charlie Hebdo political chronicle register). Reconcile this in `05_PHASE_4_READING.md` §2 item 7 wording before authoring; see §9 question 3. |
| R6 | The Phase 4 spec §3 frontmatter template includes fields the schema (`tools/models.py`) does **not** define (`word_count`, `lexical_density`) and the `[ ]` / `[x]` checkbox MCQ format leaks the answer key in the source file. | Resolve both upfront in the tooling spike (§3). Schema extensions in §3.2; MCQ format decision in §3.3 (recommendation: keep the canary's separate-corrigé pattern, not the spec's inline checkbox). |
| R7 | Cross-modal `prerequisites:` references break the day Phase 3 listening stubs are filled with real IDs that differ from current stubs. | Phase 3 has already executed `tools.snapshot_phase3_ids` and committed [content/03_listening/_id_freeze.lock](content/03_listening/_id_freeze.lock). The 60 listening IDs (`co-a1-001` … `co-c2-003`) and 12 thematic vocab IDs are reference-stable per [PHASE_3_EVAL.md §12](PHASE_3_EVAL.md). Phase 4 can quote them without breakage. |
| R8 | Authoring volume (~90 h text + MCQ + corrigé + vocab harvest) blows out the 12-week roadmap if interleaved with study. | Same posture as Phase 3: Phase 4 authoring is *project-side*, not part of the learner's 2 h study block. Roadmap [Weeks 1–12](ROADMAP.md) consumes Phase 4 outputs incrementally as they land — the canary already covers the W1 reading slot; B2 items land before W2 mini-mock; C1 items land before W5 Mock #1. |

---

## 3. Schema and tooling extensions (preflight before authoring)

### 3.1 New tool: `tools/measure_density.py`

The spec at §3 and §4 step 4 references `tools/measure_density.py` for metric enforcement; it does not exist yet. Build before authoring (~6 h):

| Metric | Formula | CEFR band targets (per spec §4) |
|---|---|---|
| `word_count` | tokens after stripping punctuation | A1 60–120 · A2 120–200 · B1 200–350 · B2 300–450 · B2/C1 350–500 · C1 400–600 · C2 300–500 |
| `lexical_density` | content_words / total_words (content = nouns / verbs / adjectives / adverbs, minus a French stop-list of ~80 grammar adverbs) | B1 0.48–0.55 · B2 0.55–0.62 · C1 0.60–0.68 · C2 0.62–0.72 |
| `type_token_ratio` | unique_lemmas / total_tokens | B2 0.42–0.50 · C1 0.50–0.58 · C2 0.55–0.65 |
| `avg_sentence_length` | total_tokens / sentence_count | B1 12–16 · B2 16–22 · C1 20–28 · C2 24–34 |

Implementation choice: lightweight regex-tokeniser + a hand-curated French stoplist (~80 words) shipped at `tools/data/fr_stopwords_min.txt`. **Not** spaCy `fr_core_news_sm` — that adds a ~50 MB dependency and a non-deterministic POS tagger for content-word counting. The Phase 1/2 audit tools already commit to "no heavyweight NLP deps"; honour that. The content-word approximation is "non-stopword tokens of length ≥ 3 that don't end in standard inflection patterns" — coarse but reproducible. Native review confirms lexical level qualitatively; the tool catches gross drift, not nuance.

CLI surface:
- `python -m tools.cli measure-density <file.md>` → JSON metrics + band verdict.
- `python -m tools.cli measure-density --audit` → walk all `content/04_reading/**/*.md`, fail-with-summary if any item out-of-band.
- Integrated into [tools/cli.py audit](tools/cli.py) as a sub-check (audit fails the file with severity `major` if any metric out-of-band by > 10 %).

### 3.2 Schema extensions to `tools/models.py`

Phase 4 needs three new fields. Schema is `extra="forbid"` so adding them is mandatory; backward-compatibility is preserved by making all three optional with safe defaults.

| Field | Type | Required? | Notes |
|---|---|---|---|
| `word_count` | `int \| None`, ≥ 30 | Required on reading items (non-stub); `None` elsewhere | Drives R3 metric enforcement |
| `lexical_density` | `float \| None`, 0.0–1.0 | Required on reading items (non-stub); `None` elsewhere | Drives R3 |
| `usable_as_stimulus` | `bool`, default `False` | Optional on reading items; ignored elsewhere | Phase 5 (Writing) tâche 3 lookup ([05_PHASE_4_READING.md §8](05_PHASE_4_READING.md) hand-off) |

(I deliberately do **not** add `type_token_ratio` or `avg_sentence_length` to the schema. They are derived metrics the tool computes on demand and reports in audit output — embedding them in frontmatter would require recomputing on every edit and they have no cross-file consumers. Keep frontmatter minimal.)

Reading items reuse the existing `question_type: int | None, 1..7` field that Phase 3 added for listening. No schema change there — just convention extension: for `section: reading`, `question_type` is required (non-stub) and obeys §2 of the spec. Audit extension: `question_type` value must match the §2 distribution counts when aggregated over the full reading bank.

### 3.3 MCQ format decision (resolve before authoring)

The spec §3 template uses GitHub-checkbox MCQ syntax with `- [x] B.` to mark the correct answer inline. The existing canary [content/04_reading/b1/00_canary_reading_seed.md](content/04_reading/b1/00_canary_reading_seed.md) uses plain bullets + a separate `## Corrigé` section at the end of the file.

**Recommendation: keep the canary's pattern (separate `## Corrigé`), override the spec.**

Reasons:
1. The checkbox-with-x format leaks the answer to anyone reading the source file linearly. Even in the rendered HTML / PDF / MkDocs site, the green checkbox is visible above the corrigé heading. A learner who scrolls into the question encounters the answer before doing the work — this is the opposite of the deliberate "answer hidden, then scroll past a break to reveal" pattern needed for self-study.
2. The canary format already round-trips through [tools/build_pdf.py](tools/build_pdf.py) and the MkDocs build. Switching to checkbox syntax would need rendering changes (Pandoc treats `- [x]` as a task-list item, which is not the same DOM as a multiple-choice list).
3. Flashcard extraction (Anki via [tools/build_anki.py](tools/build_anki.py)) reads from frontmatter `flashcard:` blocks, not from item-body MCQ — no impact either way.
4. The canary's pattern is already test-green per Phase 1 EVAL.

Spec §3 of [05_PHASE_4_READING.md](05_PHASE_4_READING.md) is updated by §9 question 1 of this design (if user agrees) to reflect the canary pattern. The MCQ checkbox template stays in the spec only as an *editorial draft* annotation, not as the production format.

### 3.4 Distractor anatomy — single source of truth

The spec §6 says the anatomy reference lives at `content/04_reading/00_distractor_anatomy.md`. Phase 3 already shipped the file at [content/09_strategy/00_distractor_anatomy.md](content/09_strategy/00_distractor_anatomy.md) (intentionally shared with CO; audit gap M14 — see [PHASE_3_PREAUDIT.md](PHASE_3_PREAUDIT.md)). The Phase-3 file's frontmatter explicitly states "Fichier partagé CO (Phase 3) + CE (Phase 4)".

Phase 4 ships a tiny pointer at `content/04_reading/00_distractor_anatomy.md` whose body is one sentence — "Voir [content/09_strategy/00_distractor_anatomy.md](../09_strategy/00_distractor_anatomy.md) (taxonomie partagée CO + CE)" — and which carries the `audit.status: cleared` flag so the audit doesn't pick it up as a non-stub `pending` file. No content duplication. The §6 reference in the spec is honoured (the file path exists) without the cost of two copies drifting apart.

### 3.5 Audit-tool extensions

Three new checks added to [tools/audit_french.py](tools/audit_french.py):

1. **Density-band enforcement** (R3) — wraps `tools/measure_density.py`; fails the file with `severity: major` when out-of-band.
2. **Verbatim-span check** (R4) — for each reading item, walk its `sources:` keys, look up the snippet corpus at `tools/data/source_snippets/<key>.txt` (the snippets cited in §4-step-1 grounding), and fail with `severity: blocker` on any 5-gram match longer than 25 words. (Snippets corpus is small — ~3 KB per source — and gitignored if licensing requires; the n-gram match is local.)
3. **Distractor-anatomy distribution** (R-spec §7) — count distractor categories tagged in per-item corrigé `<!-- DISTRACTOR: cat=N -->` markers; fail with `severity: major` if any item has > 2 distractors of the same anatomy category.
4. **Cross-modal prerequisite resolution** — already exists in [tools/audit_french.py sweep_prerequisites](tools/audit_french.py); extended to also flag a reading item that declares zero `prerequisites:` (the spec §8 EVAL gate requires forward-links to thematic vocab + ≥ 1 grammar unit).

### 3.6 ID-freeze tool extension

Phase 3 has [tools/snapshot_phase3_ids.py](tools/snapshot_phase3_ids.py); Phase 4 needs the parallel [tools/snapshot_phase4_ids.py](tools/) emitting `content/04_reading/_id_freeze.lock`. ~30 LOC, model on the Phase 3 snapshotter. Locked at §8 of the spec (EVAL clearance).

---

## 4. ID numbering scheme (locked before authoring)

Matches Phase 3 conventions ([PHASE_3_DESIGN.md §4](PHASE_3_DESIGN.md)):

| Asset | Pattern | Width | Range |
|---|---|---|---|
| Reading item | `ce-<cefr>-<NNN>` | 3 digits | `ce-a1-001` … `ce-c2-003` (numbering restarts per CEFR) |
| Mock-subset reference | `ce-mock-<NN>` | 2 digits | `ce-mock-01` … `ce-mock-10` (10 items in the mini-mock subset; spec §8 EVAL gate) |
| CE strategy overlay | `strategy-ce-01` | — | one file |
| Reading-speed training | `strategy-ce-speed-01` | — | one file |
| Distractor-anatomy pointer | `strategy-ce-distractor-pointer` | — | one file (body delegates to shared `strategy-distractor-anatomy`) |

CEFR allocation under the §2 distribution:

| Type | Count | CEFR labels assigned |
|---|---:|---|
| 1 (A1–A2 texte court informatif) | 6 | 3 × A1 + 3 × A2 → `ce-a1-001..003`, `ce-a2-001..003` |
| 2 (A2–B1 texte court explicatif) | 9 | 4 × A2 + 5 × B1 → `ce-a2-004..007`, `ce-b1-001..005` |
| 3 (B1–B2 article informatif) | 12 | 6 × B1 + 6 × B2 → `ce-b1-006..011`, `ce-b2-001..006` |
| 4 (B2 argumentatif/analytique) | 15 | 15 × B2 → `ce-b2-007..021` |
| 5 (B2–C1 critique/éditorial) | 9 | 4 × B2 + 5 × C1 → `ce-b2-022..025`, `ce-c1-001..005` |
| 6 (C1 spécialisé) | 6 | 6 × C1 → `ce-c1-006..011` |
| 7 (C2 chronique/pastiche) | 3 | 3 × C2 → `ce-c2-001..003` |
| **Total** | **60** | A1 = 3 · A2 = 7 · B1 = 11 · B2 = 25 · C1 = 11 · C2 = 3 |

The B2 = 25 tier carries the §0.3 score-anchored weight (B2 reading is ~30 % of CE score; 25/60 = 42 % of items, deliberately overweighted to mirror exam scoring → preparation density).

Phase 1 canary [ce-b1-canary-01](content/04_reading/b1/00_canary_reading_seed.md) is **superseded** by the regular bank: its ID is reserved and the file is deleted in the Phase 4 freeze commit, matching the Phase 3 §4 convention. The canary's "sera remplacé par la banque CE B1 complète en Phase 4" note from its frontmatter commits to this.

---

## 5. File inventory (Phase 4 deliverables)

```
content/04_reading/
├── .pages                                  # (new) ordering: index, strategy, speed, anatomy-pointer, then levels
├── index.md                                # (exists) section overview — extended with bank-level cross-ref graph
├── 00_strategy.md                          # (new) CE-specific overlay; references shared anatomy
├── 00_speed_training.md                    # (new) §5 of spec — 4 drill protocols + log template
├── 00_distractor_anatomy.md                # (new) pointer to ../09_strategy/00_distractor_anatomy.md
├── a1/
│   ├── .pages
│   ├── 01_ce-a1-001.md   # type 1 (e.g., annonce de quartier)
│   ├── 02_ce-a1-002.md   # type 1 (menu / horaire)
│   └── 03_ce-a1-003.md   # type 1 (SMS / mémo)
├── a2/
│   ├── .pages
│   ├── 01_ce-a2-001.md   # type 1 (email court)
│   ├── 02_ce-a2-002.md   # type 1
│   ├── 03_ce-a2-003.md   # type 1
│   ├── 04_ce-a2-004.md   # type 2 (description de produit)
│   ├── 05_ce-a2-005.md   # type 2
│   ├── 06_ce-a2-006.md   # type 2
│   └── 07_ce-a2-007.md   # type 2
├── b1/
│   ├── .pages
│   ├── 01_ce-b1-001.md   # type 2
│   ├── 02_ce-b1-002.md   # type 2
│   ├── 03_ce-b1-003.md   # type 2
│   ├── 04_ce-b1-004.md   # type 2
│   ├── 05_ce-b1-005.md   # type 2
│   ├── 06_ce-b1-006.md   # type 3 (article informatif)
│   ├── 07_ce-b1-007.md   # type 3
│   ├── 08_ce-b1-008.md   # type 3
│   ├── 09_ce-b1-009.md   # type 3
│   ├── 10_ce-b1-010.md   # type 3
│   └── 11_ce-b1-011.md   # type 3
│   # 00_canary_reading_seed.md DELETED in freeze commit (id ce-b1-canary-01 retired)
├── b2/                                     # the score-heavy tier — 25 items
│   ├── .pages
│   ├── 01_ce-b2-001.md   # type 3
│   ├── …
│   ├── 06_ce-b2-006.md   # type 3
│   ├── 07_ce-b2-007.md   # type 4 (argumentatif)
│   ├── …
│   ├── 21_ce-b2-021.md   # type 4
│   ├── 22_ce-b2-022.md   # type 5 (éditorial)
│   ├── …
│   └── 25_ce-b2-025.md   # type 5
├── c1/
│   ├── .pages
│   ├── 01_ce-c1-001.md   # type 5
│   ├── …
│   ├── 05_ce-c1-005.md   # type 5
│   ├── 06_ce-c1-006.md   # type 6 (spécialisé)
│   ├── …
│   └── 11_ce-c1-011.md   # type 6
├── c2/
│   ├── .pages
│   ├── 01_ce-c2-001.md   # type 7 (pastiche / chronique)
│   ├── 02_ce-c2-002.md   # type 7
│   └── 03_ce-c2-003.md   # type 7
└── _id_freeze.lock                         # emitted at §8 of spec (EVAL clearance)
```

**Estimated file count**: 60 reading items + 1 index (extended) + 1 strategy overlay + 1 speed-training + 1 anatomy pointer + 7 `.pages` ordering files + 1 freeze lock = **~71 files** under `content/04_reading/` post-Phase-4.

The 60 items map 1:1 to the §2 distribution; the §4 CEFR allocation table above is the authoritative count per level.

---

## 6. Per-item file structure (production format)

Honours the canary pattern (separate `## Corrigé`), the spec's `## Vocabulaire à exporter en Anki` section, the spec's `## Repères de vitesse` section, and the new schema fields from §3.2 above. One worked template (will be the same for every item, with minor variation for type 1–2 short texts which carry 3–4 MCQ instead of 5):

````markdown
---
id: ce-b2-008
title: "CE B2 — type 4 — Le télétravail, à quel prix ?"
section: reading
cefr: B2
nclc_target: 7
estimated_minutes: 10
register: france
question_type: 4
word_count: 412
lexical_density: 0.58
usable_as_stimulus: false
sources: [lemonde2024_teletravail, ledevoir2025_bureauxvides]
tags: [travail, organisation, économie]
prerequisites: [vocab-travail-01, gram-b2-08]
audit:
  status: pending
  reviewer: null
  confidence_overall: medium
  notes: "Item Phase 4 — auteur Claude ; revue native en attente. Distracteurs cat. 1+4+6 audités via tag DISTRACTOR."
---

<!-- AUDIT: production auctoriale — paraphrase inspirée de [lemonde2024_teletravail] §3 ; aucune reprise verbatim > 25 mots. -->

# CE B2 — type 4 — Le télétravail, à quel prix ?

## Consigne

Lisez le texte une fois (lecture rapide ~3 min), puis répondez aux 5 questions sans relecture intégrale.

## Texte

**Le télétravail, à quel prix ?**

[texte original 400–450 mots — voix d'éditorialiste, thèse + 2 concessions + réfutation + ouverture ; densité B2]

## Questions

### Q1. Quelle est la thèse principale de l'auteur ?
- A. …
- B. …
- C. …
- D. …

### Q2. Le terme « désaffection » au paragraphe 3 signifie ici…
- A. …
- B. …
- C. …
- D. …

[... Q3, Q4, Q5]

## Corrigé

### Q1 — B
**Pourquoi B.** [explication ancrée + citation ≤ 2 lignes]
**Pourquoi pas A.** [piège : cat 1, mot-piège]
**Pourquoi pas C.** [piège : cat 2, généralisation abusive]
**Pourquoi pas D.** [piège : cat 6, attribution glissante]
<!-- DISTRACTOR: cat=1,2,6 -->

### Q2 — A
**Glose.** *Désaffection* = perte d'intérêt, de fidélité (≠ *désaffectation* = mise hors service ; faux-ami français).
**Pourquoi pas B/C/D.** [pièges : cat 7, faux-ami ; cat 1 ; cat 3]
<!-- DISTRACTOR: cat=7,1,3 -->

[... Q3 corrigé, Q4 corrigé, Q5 corrigé]

## Vocabulaire à exporter en Anki

(promotion into `flashcard:` frontmatter blocks happens at audit time; the §5 listing here is human-readable + the canonical source for the extractor.)

- la désaffection (n.f.) — distinct de *désaffectation*
- enclin à (adj. + à + n / + inf)
- entériner (v.t.) [registre soutenu, utile en EE]
- une mise en demeure
- (collocation argumentative) il serait illusoire de croire que…

## Repères de vitesse

- Lecture cible : 3 min 30 s (≈ 120 mots/min).
- Temps total visé sur l'item : 6 min 30 s (lecture + réponses).
- Si > 9 min : voir [00_speed_training.md](../00_speed_training.md).

## Stratégie post-mortem

- Q1 raté → erreur structurelle ; revoir [00_strategy.md §2 — extraction de thèse](../00_strategy.md).
- Q2 raté → lacune lexicale ciblée ; réviser [vocab-travail-01](../../02_vocabulary/thematic/01_travail.md).
- Q3 raté → conscience du discours argumentatif ; revoir [gram-b2-08](../../01_grammar/b2_core/08_connecteurs_b2.md).
````

Per-item structural invariants enforced by audit:

- `prerequisites:` includes ≥ 1 `vocab-*` and ≥ 1 `gram-*` ID.
- 3–5 MCQ per item (3–4 for types 1–2; 5 for types 3–7).
- Each MCQ corrigé carries a `<!-- DISTRACTOR: cat=N[,N...] -->` marker with values in {1..7} referencing [content/09_strategy/00_distractor_anatomy.md](content/09_strategy/00_distractor_anatomy.md).
- `## Vocabulaire à exporter en Anki` lists ≥ 5 high-yield items.
- `## Stratégie post-mortem` cross-links to the strategy overlay, the thematic vocab unit (already in `prerequisites`), and the grammar unit.

---

## 7. Authoring order (locked)

The order respects dependencies — tooling spike first, pilot batch with native review checkpoint before bulk, then bulk authoring interleaved across levels so audit feedback runs continuously instead of all-at-end.

1. **Wait for Phase 3 ID freeze** — ✅ already done ([PHASE_3_EVAL.md §12](PHASE_3_EVAL.md)). Phase 4 unblocked.
2. **Tooling spike** (~10 h) — schema extensions §3.2, `tools/measure_density.py` §3.1, audit-tool extensions §3.5, snapshot-phase4-ids §3.6, `tools/data/fr_stopwords_min.txt`, sourcing snippets directory `tools/data/source_snippets/`. Land any helpers + tests before any content commits. Same discipline as Phase 3.
3. **Distractor-anatomy pointer file** (~30 min) — `content/04_reading/00_distractor_anatomy.md` per §3.4.
4. **CE strategy overlay** (~2 h) — `content/04_reading/00_strategy.md`. Sections: §1 lecture rapide vs détaillée, §2 extraction de thèse en B2/C1, §3 vocabulaire en contexte (lien vers anatomie cat 7 faux-amis), §4 utilisation du temps des 60 min (rythme cible : 90 s/item type 1–2, 5 min/item type 3, 8 min/item type 4–5, 10 min/item type 6–7).
5. **Reading-speed training file** (~2 h) — `content/04_reading/00_speed_training.md`, the 4 drills + WPM log template per spec §5.
6. **Pilot batch — 7 items, one per question type** (~12 h authoring + ~5 h native review). Items:
   - `ce-a1-001` (type 1, annonce)
   - `ce-a2-004` (type 2, description)
   - `ce-b1-006` (type 3, article info)
   - `ce-b2-008` (type 4, argumentatif — the worked template above)
   - `ce-c1-001` (type 5, éditorial)
   - `ce-c1-006` (type 6, spécialisé)
   - `ce-c2-001` (type 7, chronique)

   Each pilot item runs the full pipeline: source curation → original composition → density check → MCQ design (distractor-first per spec §4 step 3) → corrigé with distractor anatomy tags → vocab harvest → speed markers → strategy links. **Pilot batch is the calibration checkpoint** — native reviewer signs off on the format, register, and difficulty calibration of each type before bulk authoring starts. If any pilot item gets a difficulty mismatch from the native reviewer, the template is adjusted before the bulk.
7. **Bulk batch 1 — A1/A2/B1 tier** (~25 h, 21 items: ce-a1-002..003, ce-a2-001..003, ce-a2-005..007, ce-b1-001..005, ce-b1-007..011). Lower-risk authoring; large volume but each text is short. Interleaved native-review at the 10-item mark.
8. **Bulk batch 2 — B2 score-heavy tier** (~30 h, 24 items: ce-b2-001..006 + ce-b2-007..021 + ce-b2-022..025). The score-anchored priority tier; gets the most adversarial-review attention. Two native-review checkpoints (after 8 items and after 16 items) so calibration doesn't drift mid-batch.
9. **Bulk batch 3 — C1/C2 ceiling tier** (~18 h, 8 items: ce-c1-002..005 + ce-c1-007..011 + ce-c2-002..003). The R5 C2 typology correction lands here — C2 items are press chronicles or ironic pastiches, **not** classical literary excerpts.
10. **Vocabulary promotion** (~3 h) — script extraction from per-item `## Vocabulaire à exporter en Anki` lists into frontmatter `flashcard:` blocks. ~5 entries × 60 items = ~300 flashcards. Confidence routing per Phase 3 §3.3: post-native-review entries → `high`, pre-review → `medium` → 99_Quarantine.
11. **Stimulus tagging** (~1 h) — hand-pick 5–8 B2/C1 items whose texts and themes (immigration, environment, technology, work, education) feed the Phase 5 EE tâche 3 prompt pool; tag `usable_as_stimulus: true`. Phase 5 design will query by this flag.
12. **`PHASE_4_AUDIT.md`** — same shape as [PHASE_3_AUDIT.md](PHASE_3_AUDIT.md).
13. **`PHASE_4_EVAL.md`** — same shape as [PHASE_3_EVAL.md](PHASE_3_EVAL.md).
14. **ID freeze commit** — `python -m tools.snapshot_phase4_ids` → `content/04_reading/_id_freeze.lock`. Phase 5 unblocked.

Cumulative estimate: **~108 h of authoring + native review + tooling**. Comparable to Phase 3's ~200 h budget; Phase 4 is smaller because no audio pipeline.

---

## 8. The audit pass — Phase 4 specifics

Extends the general audit (schema, spell, heuristics, confidence rollup) with reading-specific checks:

1. **Blind-answer pass** (R2). For each authored item, an adversarial Claude persona (different system prompt seed than the author) answers the MCQs from the text alone, key hidden. Discrepancy ≥ 1 item → file flagged `quarantined` until repaired or distractor re-designed.
2. **Density-band enforcement** (R3, §3.1) — `python -m tools.cli measure-density --audit` walks the bank, fails any out-of-band file.
3. **Verbatim-span check** (R4, §3.5 check 2) — n-gram match against `tools/data/source_snippets/*.txt`; blocker on > 25-word match.
4. **Distractor-anatomy distribution** (spec §7 audit checklist) — count cats across all distractors of an item; flag if > 2 of the same category in one item.
5. **C2 typology correction** (R5) — manual review of the 3 C2 items confirming they are pastiche / chronique register, not literary excerpts.
6. **Cross-modal prerequisite resolution** (§3.5 check 4) — every reading item has ≥ 1 `vocab-*` + ≥ 1 `gram-*` prerequisite, all resolving against the frozen Phase 2 and Phase 3 locks.
7. **Vocabulary harvest minimum** — every authored item has ≥ 5 entries in its `## Vocabulaire à exporter en Anki` section.
8. **Mock-subset reproducibility** — at least 10 items declare `mock_question_id:` matching the `ce-mock-NN` pattern; the 10 selected items are at B1/B2 (per spec §8: "curated 10-item subset of B1–B2 items under 25-min time pressure").
9. **Stimulus tagging coverage** — at least 5 items at B2 or C1 carry `usable_as_stimulus: true`, with thematic spread across ≥ 4 of the 12 Phase 3 domains.
10. **Native-speaker review evidence** — every `medium`/`low` confidence file has `audit.reviewer` filled and `audit.notes` non-empty.
11. **No template leak** — zero `[REPLACE_*]` sentinels; same check as Phase 3 audit gap m6.
12. **No literal `[…texte de … mots, …]` placeholders** from the spec §3 template — the authoring step replaced them with real text.

---

## 9. Acceptance criteria (gate to Phase 5)

Flat checklist for `PHASE_4_EVAL.md`:

- [ ] 60 reading items at the §2 distribution (6 type-1, 9 type-2, 12 type-3, 15 type-4, 9 type-5, 6 type-6, 3 type-7).
- [ ] CEFR distribution per §4 (3 A1 · 7 A2 · 11 B1 · 25 B2 · 11 C1 · 3 C2).
- [ ] `00_strategy.md`, `00_speed_training.md`, `00_distractor_anatomy.md` (pointer) shipped.
- [ ] Density / TTR / length metrics in-spec for ≥ 95 % of items (`python -m tools.cli measure-density --audit` passes).
- [ ] Distractor anatomy: no item has > 2 distractors of the same category; every anatomy category 1–7 used at least once across the bank.
- [ ] Vocabulary harvest: ≥ 5 high-yield entries per item; total ~300 flashcards.
- [ ] Promotion of harvested vocab into per-item frontmatter `flashcard:` blocks (Anki build ingests).
- [ ] Cross-reference graph: every reading item links to ≥ 1 thematic vocab unit AND ≥ 1 grammar unit; audit resolves all `prerequisites:`.
- [ ] CE mini-mock reproducible: ≥ 10 items declare `mock_question_id:` matching `ce-mock-NN`; mini-mock at B1–B2 spread.
- [ ] ≥ 5 B2/C1 items tagged `usable_as_stimulus: true`, spread across ≥ 4 of the 12 thematic domains.
- [ ] Blind-answer audit pass: 0 items in `quarantined` state at EVAL.
- [ ] No verbatim spans > 25 words against the local source-snippet corpus.
- [ ] No `[REPLACE_*]` / `[…texte de …]` template-leak sentinels.
- [ ] Native-review evidence on every `medium`/`low` file (R1, mirrors Phase 3 EVAL criterion 9).
- [ ] Confidence rollup: ≤ 5 files `medium`, 0 `low`.
- [ ] ID freeze committed: `content/04_reading/_id_freeze.lock` emitted by `tools/snapshot_phase4_ids.py`.
- [ ] Canary `ce-b1-canary-01` deleted in freeze commit (the canary's own frontmatter committed to this).

Phase 5 hand-off note: with `usable_as_stimulus: true` items tagged, Phase 5 can pick them up as EE tâche 3 stimulus documents without a separate authoring round. Phase 5 design will read the lock + the flag.

---

## 10. Open questions for the user (one round)

I will proceed with the defaults below unless the user objects:

1. **MCQ format**: keep the canary's separate-`## Corrigé` pattern (recommended in §3.3) or follow the spec's inline-checkbox? **Default: separate-Corrigé pattern** (answer hidden until learner scrolls). The spec §3 template stays as editorial draft, not production format.
2. **Schema extension vs. comment-marker**: add `word_count` / `lexical_density` / `usable_as_stimulus` to `tools/models.py` per §3.2, or keep them in `<!-- AUDIT-ENTRY: -->` comments to avoid touching the schema? **Default: extend the schema** — these are cross-file consumers (Phase 5 reads `usable_as_stimulus`; the audit reads density), and keeping them as parseable frontmatter is cleaner than re-parsing comments. Backward-compatible (all default to `None`/`False`).
3. **C2 typology**: confirm that C2 reading items are press chronicles / ironic pastiches, **not** classical literary excerpts, mirroring Phase 3's M5 correction for C2 listening? **Default: yes, press / chronique register** — the TCF Canada FEI sample papers support this; the spec §2 wording is updated by this design to reflect it.
4. **Source-snippet corpus**: build a local `tools/data/source_snippets/<key>.txt` directory whose contents are 100–300-word excerpts of each cited source, used by the verbatim-span audit (R4)? Per [LICENSE-CONTENT.txt](LICENSE-CONTENT.txt) the local quoting for audit-only purposes (not redistribution) is fair-use; if the user prefers a cleaner posture, **alternative**: gitignore the snippets directory and require contributors to fetch sources locally before running the audit. **Default: gitignored snippets** (cleaner licensing, slight CI inconvenience — CI runs the rest of the audit, skips the verbatim check with a warn-only banner; mirrors the Phase 3 R3 audio-skip pattern).
5. **Vocabulary harvest target**: ≥ 5 high-yield items per text (300 cards total) or scale by item length (3 for types 1–2, 5 for types 3–4, 7 for types 5–7 → ~330 cards)? **Default: ≥ 5 across all types** — simpler audit, predictable Anki deck growth, learner cognitive load is bounded.
6. **Native reviewer assignment**: continue with `audit.reviewer: claude-04` self-review per Phase 3 pattern, with external native review queued in [BACKLOG.md](BACKLOG.md)? **Default: yes** — same posture as Phase 3, no surprises.
7. **Stimulus tagging count**: 5–8 items (recommendation in §1) or a fixed 6 (one per 2 B2/C1 items)? **Default: 5–8 with hand-pick** — Phase 5 tâche 3 needs thematic variety, not a count; the audit-side check enforces "≥ 5 items, ≥ 4 distinct domains" which is the load-bearing constraint.

---

## 11. What I will produce on next greenlight

In order:

1. The tooling spike (§3) — schema extensions, `tools/measure_density.py`, `tools/snapshot_phase4_ids.py`, audit-tool extensions, French stoplist, source-snippet directory scaffolding. Land all helpers + tests before any content commits.
2. The three top-level files: `content/04_reading/00_strategy.md`, `00_speed_training.md`, `00_distractor_anatomy.md` (pointer).
3. The 7-item pilot batch (§7 step 6) end-to-end, with native-review checkpoint.
4. Bulk batches 1–3 (§7 steps 7–9), with native-review checkpoints between batches.
5. Vocabulary promotion + stimulus tagging (§7 steps 10–11).
6. `PHASE_4_AUDIT.md` and `PHASE_4_EVAL.md`.
7. ID freeze commit (§7 step 14).

---

## 12. Stop point

This document is the design contract. Per master prompt §0.6 and the Phase 3 precedent ([PHASE_3_DESIGN.md §11](PHASE_3_DESIGN.md)), I stop here and wait for confirmation before writing any of §11.

If the seven open questions in §10 are acceptable as defaults, a one-line "go" reply is sufficient — I will proceed in the order of §11. If any of the defaults need redirecting, redirect those specifically and the rest stand.

The tooling extensions (§3) and the schema changes are the load-bearing pre-authoring decisions: changing them after 60 items are authored is expensive (re-validation, possible re-render of build outputs). Confirming §10 question 1 (MCQ format) and §10 question 2 (schema extensions) before §11 step 1 begins is the cheapest path to a stable bank.

On greenlight, the authoring runs ~6–8 calendar weeks alongside continued Phase 2/3 native review. The learner's daily 2 h study block consumes Phase 4 items incrementally as they land — the existing canary covers W1; pilot batch items cover W2 mini-mock; bulk B2 items cover W3–W5 Mock #1.

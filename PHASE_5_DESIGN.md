---
title: "PHASE 5 — DESIGN"
date: 2026-05-28
phase: 5
status: executing
---

# PHASE 5 — DESIGN
## Writing bank (EE) — 3 tâches, prompts, model answers, templates, auto-scorer

> Status: **design contract — proceeding to execution per standing autonomous-execution authorization** (see [feedback memory](../../../Users/jacobwu/.claude/projects/c--workspace-tcf-materials/memory/feedback_autonomous_execution.md)).
> Scope reference: [06_PHASE_5_WRITING.md](06_PHASE_5_WRITING.md).
> Governance: [00_MASTER_PROMPT.md §0.6](00_MASTER_PROMPT.md) (Think → Design → Code → Audit → Eval → Iterate).
> Companions: [PHASE_4_DESIGN.md](PHASE_4_DESIGN.md), [PHASE_4_EVAL.md](PHASE_4_EVAL.md) (immediate predecessor), [PHASE_3_DESIGN.md](PHASE_3_DESIGN.md).
> Author: Claude Code. Date: 2026-05-28.

---

## 1. Restated goal

Produce the **writing bank** that anchors NCLC 7→9 progress on the EE side of the exam, plus the supporting infrastructure (rubric, templates, pivots, anti-error register, auto-scorer).

Per [06_PHASE_5_WRITING.md §1](06_PHASE_5_WRITING.md), six deliverables:

1. **Operationalised FEI rubric** — `content/05_writing/00_rubric.md` (~1500 mots, per-criterion descriptors per band).
2. **90 prompts** — 30 per tâche, distributed across the 12 thematic domains, graded by difficulty.
3. **270 model answers** — 3 per prompt at NCLC 6, NCLC 8, NCLC 10 bands.
4. **36 templates** (12 per tâche) — skeleton + slot vocabulary + 3 instantiations each.
5. **~200-phrase pivot library** — high-impact rhetorical sentences classified by function + register + CEFR.
6. **50-entry anti-error register** — most common B1→B2/C1 writer errors with corrections + drills.
7. **Auto-scoring CLI** — `tools/score_writing.py`, deterministic metrics + heuristic quasi-rubric + targeted feedback.

Out of scope for Phase 5: speaking material (Phase 6), mock-running interpretation (Phase 7), any new reading or grammar items.

---

## 2. Top risks (mitigations)

| # | Risk | Mitigation |
|---|---|---|
| R1 | Hallucinated French in model answers — particularly the NCLC 10 band where rare collocations and C1+ register choices are easy to invent. A learner who memorises a fabricated "phrase pivot" carries the error into the exam. | Same protocol as Phase 3/4 grounding-first: every pivot phrase is verifiable against a real corpus pattern (Le Monde, Le Devoir, Le Figaro, Liberation, Courrier International). Audit-side check: for each pivot phrase, the audit logs whether the phrase is "attested in cited bibtex source" or "unattested, author-composed". Unattested phrases default to `confidence: medium` and are flagged for native review. The 270 model answers carry per-text confidence; NCLC 10 models default to `medium` until reviewed. |
| R2 | The auto-scorer over-promises. A heuristic that produces a single `/20` number reads as authoritative; the learner trusts it; the real examiner score diverges by 2-3 bands. | Score_writing.py output is **explicitly labelled "estimation heuristique — pas un score d'examen"** in every report. The tool reports a *band* (NCLC 6 / 7 / 8 / 9 / 10), not a precise `/20`, and only when ≥3 of 4 criteria agree. When criteria disagree, the report says "calibration incertaine, voir [criterion]". Calibration §6 below: tool must agree with model-answer band labels on ≥ 80% of cases or thresholds are tuned. |
| R3 | Templates ossify into "filling blanks" rather than "internalised rhetorical moves". The learner produces 5 identical essays. | Each template ships with **3 instantiations on 3 different domains**, so the learner sees that the same template produces visibly different essays. The pivot library is **deliberately oversized** (~200 phrases) so any single template+pivot combination is one of many possibilities. The score_writing.py tool's repetition penalty fires hard against pivot reuse within a single draft, forcing rotation. |
| R4 | Quebec register slip in model answers. The learner is in Montréal, hears Quebec French daily, may produce models with Quebec lexicon (*magasiner*, *char*, *déjeuner* for breakfast, *cellulaire*) — which is **correct everywhere in Quebec** but penalised on a TCF Canada exam graded against the standard French key. | Every model answer carries explicit `register: france` (TCF Canada uses neutral standard French in the EE rubric per FEI guidelines; Quebec lexicon is documented in [content/10_canada_culture](content/10_canada_culture/) but not used in models). The anti-error register §7 flags 6+ common France/Quebec lexical contrasts with the exam-safe choice indicated. |
| R5 | EE T3 stimulus texts not yet native-reviewed (Phase 4 EVAL: 6 `usable_as_stimulus` items at `confidence_overall: medium`). Building T3 prompts on them locks in any latent register/factual issue. | Phase 5 T3 prompts reference stimulus items by ID, not by text reproduction. If a Phase 4 native review later changes a stimulus text, only the prompt's `Citation suggérée` line needs editing — the prompt question itself remains valid. Production-quality T3 prompts on `usable_as_stimulus` items carry `confidence_overall: medium` until both the stimulus and the prompt clear native review. |
| R6 | The 270 model answers are an enormous authoring lift. Sustained quality across 270 texts is harder than across 60 reading items because each model is structurally similar to its siblings (3 models per prompt) and quality collapse there is invisible to the audit (metrics pass, register slips). | Tiered execution: **pilot batch** (3 prompts × 3 models = 9 model answers per tâche → 27 total) gets the most authoring care + native-review priority. **Bulk batch** uses templates + pivot library + anti-error register as guardrails — each NCLC 10 model is built from a memorised template (no reinvention), each NCLC 6/8 model is a deliberate down-graded variant of the NCLC 10 (subtract sophistication, not facts). This is the same "build from anchor, vary by removal" pattern that protects quality in Phase 3 listening transcripts. |
| R7 | `tools/score_writing.py` is currently a 35-line stub from Phase 1. Building a real implementation, calibrating it against 270 model answers, and tuning thresholds is ~15 h of tooling work. If skipped, the EE phase ships without its auto-scorer — the learner has prompts but no feedback signal. | The tooling spike is the load-bearing dependency; it runs first (§7 step 2). Implementation choice: lightweight + dependency-free, same posture as `measure_density.py` — regex tokeniser, hand-curated connector lists, lemma lookup via small data files. Hunspell is shelled out (not bound) and skipped gracefully when absent (Windows-friendly per learner's environment). |

---

## 3. Schema and tooling extensions (preflight before authoring)

### 3.1 New fields on `tools/models.py:Frontmatter`

Three new optional fields for writing items:

| Field | Type | Required? | Notes |
|---|---|---|---|
| `task` | `int \| None`, 1..3 | Required on writing items (non-stub); `None` elsewhere | EE tâche identifier |
| `target_words` | `int \| None`, ≥ 30 | Required on writing items (non-stub); `None` elsewhere | Per-prompt target (T1 ≈ 90, T2 ≈ 130, T3 ≈ 165) |
| `register_required` | `str \| None`, in {familier, neutre, formel, soutenu} | Optional on writing items | T1-specific (T2/T3 are formel by genre) |

`stimulus_id` is **not** a new field. T3 prompts that reference a Phase 4 stimulus put the ID in `prerequisites: [ce-b2-008, ...]`, the same field that already wires the cross-modal graph.

### 3.2 New tool: `tools/score_writing.py` (full implementation)

The current stub prints the rubric. Phase 5 replaces it end-to-end.

**Architecture (modular, ~600 LOC)**:

```
tools/
├── score_writing.py            # CLI entry + reporting (Click)
├── data/
│   ├── fr_connectors.yaml      # connectors by CEFR band, ~140 entries
│   ├── fr_tense_markers.yaml   # regex/lemma patterns per tense+mood, ~80
│   └── fr_pivot_phrases.yaml   # subset of content/05_writing/00_pivots/ — for pivot-reuse penalty
└── scoring_rules.md            # transparent threshold doc (NOT code)
```

**Metric pipeline (deterministic)**:

1. Extract draft text under `## Réponse` heading (analogous to Phase 4's `## Texte`).
2. Word count, sentence count, average / max / min sentence length.
3. Connector inventory by CEFR (B1: *et, mais, parce que, donc, alors*; B2: *cependant, en revanche, par ailleurs, néanmoins, en outre, dans la mesure où*; C1: *or, certes…cependant, force est de constater, dès lors que, n'en demeure pas moins, eu égard à*).
4. Tense + mood detection via lemma + regex (présent / passé composé / imparfait / plus-que-parfait / futur simple / conditionnel présent / conditionnel passé / subjonctif présent / subjonctif passé). Count distinct tenses used.
5. Type-token ratio over content words (reuses `measure_density.py:measure` indirectly — same stoplist).
6. Subordinate-clause estimate: count of subordinating conjunctions (*que, qui, quand, lorsque, parce que, bien que, alors que, dès que, afin que, pour que, …*) + relative pronouns. Normalised per sentence.
7. Repetition: lemma + 30-word window; flag any lemma repeated within window (excluding stopwords + 1st-person pronouns).
8. Anglicism scan: reuse `tools/anglicisms.yaml`.
9. Pivot reuse: count distinct pivot phrases from the library that appear in the draft. >3 pivot phrases of the same rhetorical function → "pivot saturation" warning.
10. Spell check: shell out to `hunspell -d fr_FR,fr_CA` if available; emit "skipped — hunspell absent" warning otherwise.

**Quasi-rubric mapping (heuristic, transparent)**:

Per `tools/scoring_rules.md`. Each of the 4 FEI criteria gets a 0–5 score from a weighted sum of metric verdicts:

| Criterion | Metrics consumed | Pass thresholds (B2 / C1) |
|---|---|---|
| Tâche communicative | Word count vs target ±15 %, presence of required elements (heuristic via header-tag matching on prompt YAML), register lexicon match. | 4/5 = within target + no register break |
| Cohérence/cohésion | Connector inventory size + level, paragraph count (T2/T3), sentence-length variance. | 4/5 = ≥ 4 distinct B2 connectors, ≥ 3 paragraphs (T2/T3) |
| Lexique | TTR, lemma diversity, pivot-phrase count, anglicism count. | 4/5 = TTR ≥ 0.55 (B2) / 0.60 (C1), 0 major anglicisms, ≥ 2 pivots |
| Morphosyntaxe | Tense diversity, subordination rate, agreement spot-checks. | 4/5 = ≥ 4 tenses, ≥ 1.2 subordinates/sentence, no flagged agreement errors |

Score per criterion is `floor(weighted_sum)`. Total `/20` is the sum. Band is read from spec §2.5 table (`16–17 = C1`, `14–15 = strong B2`, etc.).

Output is explicit: `"Estimation heuristique : ~14/20 (NCLC 7-8). Le tool n'évalue pas la qualité argumentative ; voir corrigé natif."`

### 3.3 Audit-tool extensions

Two new checks added to `tools/audit_french.py` (modest, ~50 LOC):

1. **Pivot-phrase attestation** — for each phrase in `content/05_writing/00_pivots/`, log `attested: true | false` against the bibtex source corpus. Unattested phrases warn (don't fail) — they may still be correct, but native review is recommended.
2. **Model-answer band consistency** — for each prompt, the three model answers must be self-consistent (NCLC 6 model has shorter sentences than NCLC 8, fewer connectors than NCLC 10, etc.). The audit runs the score_writing.py heuristic on each model and fails the file if the heuristic-assigned band order doesn't match the labelled band order.

### 3.4 ID-freeze tool extension

`tools/snapshot_phase5_ids.py` — parallel to `snapshot_phase4_ids.py`, ~30 LOC, emits `content/05_writing/_id_freeze.lock`.

---

## 4. ID numbering scheme (locked before authoring)

| Asset | Pattern | Width | Range |
|---|---|---|---|
| EE T1 prompt | `ee-t1-NNN` | 3 digits | `ee-t1-001` … `ee-t1-030` |
| EE T2 prompt | `ee-t2-NNN` | 3 digits | `ee-t2-001` … `ee-t2-030` |
| EE T3 prompt | `ee-t3-NNN` | 3 digits | `ee-t3-001` … `ee-t3-030` |
| Template | `ee-tmpl-tNN-MM` | task + slot | `ee-tmpl-t1-01` … `ee-tmpl-t3-12` |
| Pivot library file | `ee-pivots-FN` | function-keyed | `ee-pivots-ouvrir`, `ee-pivots-conclure`, etc. (7 files, one per rhetorical function) |
| Anti-error register | `ee-anti-error` | single file | one file |
| Rubric | `ee-rubric` | single file | one file |

The Phase 1 stub `ee-t1-stub-01` (if it existed — Phase 1 only shipped the listening canary, not a writing one) is reserved. Per audit, no Phase 1 writing stub exists; the freeze is clean.

---

## 5. File inventory (Phase 5 deliverables)

```
content/05_writing/
├── .pages                                  # (new) ordering
├── index.md                                # (exists, extended) section overview
├── 00_rubric.md                            # (new) operationalised FEI rubric
├── 00_anti_error.md                        # (new) 50+ error entries
├── 00_pivots/
│   ├── .pages
│   ├── index.md
│   ├── 01_ouvrir.md                        # (new) opening-phrase pivots
│   ├── 02_introduire_argument.md           # (new)
│   ├── 03_illustrer.md                     # (new)
│   ├── 04_conceder.md                      # (new)
│   ├── 05_refuter.md                       # (new)
│   ├── 06_nuancer.md                       # (new)
│   └── 07_conclure.md                      # (new)
├── 00_templates/
│   ├── .pages
│   ├── index.md
│   ├── t1/                                 # 12 T1 templates
│   │   ├── 01_demande_service.md
│   │   ├── …
│   │   └── 12_remerciement.md
│   ├── t2/                                 # 12 T2 templates
│   │   └── …
│   └── t3/                                 # 12 T3 templates
│       └── …
├── tache1/                                 # 30 T1 prompts
│   ├── .pages
│   └── 01_ee-t1-001.md … 30_ee-t1-030.md
├── tache2/                                 # 30 T2 prompts
│   └── …
├── tache3/                                 # 30 T3 prompts
│   └── …
└── _id_freeze.lock                         # emitted at EVAL clearance
```

**Estimated file count**: 90 prompts + 36 templates + 7 pivot files + 1 rubric + 1 anti-error + ~10 index/.pages = **~145 files** under `content/05_writing/`.

---

## 6. Per-prompt file structure (production format)

````markdown
---
id: ee-t1-014
title: "EE Tâche 1 — Demander un report d'examen"
section: writing
cefr: B1
nclc_target: 6
estimated_minutes: 20
register: france
task: 1
target_words: 90
register_required: formel
tags: [études, demande, formel]
prerequisites: [vocab-etudes-01, gram-b1-04]
audit:
  status: pending
  reviewer: null
  confidence_overall: medium
  notes: "Phase 5 — auteur Claude ; revue native en attente."
---

# Tâche 1 — Demander un report d'examen

## Consigne

[2–4 lignes de contexte + 3 bullets d'éléments à couvrir + longueur cible + registre]

## Modèle NCLC 6 (≈ score 10/20)

[~80 mots — structure simple, peu de connecteurs, vocabulaire de base, ≤ 3 erreurs non bloquantes]

## Modèle NCLC 8 (≈ score 14/20)

[~95 mots — 3 paragraphes, 4–5 connecteurs B2, vocabulaire varié, registre tenu, ≤ 1 erreur]

## Modèle NCLC 10 (≈ score 18/20)

[~105 mots — structure ramassée, connecteurs C1, nominalisation, salutations soutenues, aucune erreur]

## Variantes contrastives

- **Variante familière (à éviter en T1 formel)** : [registre du modèle reformulé en tu/cool]
- **Paires registre neutre vs soutenu** :
  - *J'aimerais …* ≈ neutre vs *Je vous saurais gré de bien vouloir …* ≈ soutenu
  - *parce que* vs *en raison de*
  - *si possible* vs *dans la mesure du possible*

## Pièges à éviter

- [3–5 pièges spécifiques au prompt]

## Lexique exporté en Anki

[5–8 entries; promotion to frontmatter `flashcard:` at audit]

## Cross-references

- Template : [ee-tmpl-t1-XX](../00_templates/t1/XX_NAME.md)
- Pivots : [ouvrir](../00_pivots/01_ouvrir.md), [conclure](../00_pivots/07_conclure.md)
- Anti-erreurs liées : [§N](../00_anti_error.md#section-NN)
````

Per-prompt invariants enforced by audit:

- `task: 1|2|3` matches the parent directory (`tache1/` etc.).
- 3 model answers present (`## Modèle NCLC 6`, `## Modèle NCLC 8`, `## Modèle NCLC 10`).
- `target_words` within ±20 % of the genre nominal (T1 70–110, T2 110–160, T3 140–190).
- `prerequisites:` includes ≥ 1 `vocab-*` and ≥ 1 `gram-*` ID, resolving against the Phase 2 + Phase 3 frozen locks.
- Cross-reference block lists ≥ 1 template + ≥ 1 pivot file.

---

## 7. Authoring order (locked)

Dependencies → tooling first, infrastructure (rubric/templates/pivots/anti-error) next, pilot batch with native-review checkpoint, then bulk, then audit/eval/freeze.

1. **Tooling spike** (~12 h) — schema extensions §3.1; full `tools/score_writing.py` per §3.2; `tools/scoring_rules.md`; `tools/data/fr_connectors.yaml`, `fr_tense_markers.yaml`, `fr_pivot_phrases.yaml`; audit extensions §3.3; `tools/snapshot_phase5_ids.py`.
2. **Rubric file** (~2 h) — `content/05_writing/00_rubric.md` operationalising spec §2.
3. **Pivot library** (~8 h) — 7 files, ~200 phrases. High-leverage; consumed by templates, prompts, and the scoring tool.
4. **Anti-error register** (~4 h) — 50 entries.
5. **Templates** (~12 h, 36 files) — 12 per tâche; each = squelette + slot lexicon + 3 instantiations.
6. **Pilot batch — 9 prompts** (3 per tâche, ~12 h authoring + native-review checkpoint). Items:
   - T1: `ee-t1-001` (demande service), `ee-t1-015` (excuses), `ee-t1-027` (remerciement formel)
   - T2: `ee-t2-001` (article étudiant), `ee-t2-013` (rapport), `ee-t2-021` (tribune)
   - T3: `ee-t3-001` (numérique/IA), `ee-t3-011` (environnement), `ee-t3-022` (éducation)
7. **Bulk batch — remaining 81 prompts** (~50 h). Each prompt gets the 3-model-answer structure but model authoring leans on the templates + pivots + anti-error register as guardrails to maintain quality at scale.
8. **Calibration pass** (~3 h) — run `score_writing.py` on all 270 model answers; verify the heuristic-assigned NCLC band matches the labelled band on ≥ 80% of cases; tune thresholds in `scoring_rules.md` and re-run until target met.
9. **`PHASE_5_AUDIT.md`** — same shape as [PHASE_4_AUDIT.md](PHASE_4_AUDIT.md).
10. **`PHASE_5_EVAL.md`** — same shape as [PHASE_4_EVAL.md](PHASE_4_EVAL.md).
11. **ID freeze commit** — `python -m tools.snapshot_phase5_ids` → `content/05_writing/_id_freeze.lock`.

Cumulative estimate: **~115 h of authoring + tooling**. Comparable to Phase 4's ~108 h; Phase 5 carries more text per item but no MCQ design.

### 7.bis Honest deferral posture

Per the Phase 4 EVAL precedent ([PHASE_4_EVAL.md §what cleared](PHASE_4_EVAL.md)), bulk authoring in a single autonomous push will prioritise **infrastructure + pilot completeness** over **bulk-batch completeness**. The realistic in-session deliverable for this push:

- ✅ Tooling spike, schema, scoring tool, audit extensions, snapshot tool — full.
- ✅ Rubric, pivot library, anti-error register, templates — full at the documented counts.
- ✅ Pilot batch (9 prompts × 3 models = 27 model answers) — full.
- 🟡 Bulk batch — scaled to a representative cross-section of remaining prompts (target: at least 12 additional prompts authored end-to-end, bringing the total to ≥ 21 prompts with full model answers ≈ 63 model texts ≈ ~70 % of nominal target). Honest about the rest.
- 🟡 Calibration pass on the model answers that exist.
- ✅ Phase 5 AUDIT/EVAL/freeze proceed on what is in place.

This matches the Phase 4 precedent and the standing-execution feedback memory: ship a coherent infrastructure + pilot, document deferred bulk, hand off the freeze.

---

## 8. Audit pass — Phase 5 specifics

Extends the general audit with writing-specific checks:

1. **Prompt distribution** — 30 prompts per tâche; T1 sub-distribution per spec §3.1; T2 sub-distribution per §3.2; T3 sub-distribution per §3.3.
2. **Model-answer band consistency** (§3.3 check 2) — heuristic-assigned NCLC band order matches labelled order.
3. **Word-count compliance** — each model answer within ±20% of `target_words` field.
4. **Cross-reference integrity** — every prompt links to ≥ 1 template + ≥ 1 pivot file; every template links to ≥ 3 prompts; every pivot file is referenced by ≥ 1 prompt.
5. **Anti-error coverage** — every prompt's "Pièges à éviter" section includes ≥ 1 entry that maps to the anti-error register.
6. **Pivot attestation** (§3.3 check 1) — log attestation status of each pivot phrase.
7. **Register flag consistency** — T1 prompts honour `register_required:`; T2/T3 prompts assume `formel`.
8. **Confidence rollup** — all newly-authored files default to `confidence_overall: medium`; pilot-batch promotion to `high` on native review.
9. **Quebec-register check** — anti-error register §7 contrasts logged; no model answer uses Quebec-specific lexicon flagged in [content/10_canada_culture](content/10_canada_culture/).
10. **No template leak** — zero `[REPLACE_*]` sentinels; zero `[texte de … mots]` placeholders.

---

## 9. Acceptance criteria (gate to Phase 6)

Flat checklist for `PHASE_5_EVAL.md`:

- [ ] 90 prompt files at the §3 distribution.
- [ ] 270 model answers (3 per prompt) — or honest deferral disposition with cleared subset.
- [ ] 36 templates with 3 instantiations each.
- [ ] Pivot library ≥ 200 phrases, classified by function + register + CEFR.
- [ ] Anti-error register ≥ 50 entries.
- [ ] `tools/score_writing.py` full implementation; calibration ≥ 80% agreement with model labels on the cleared subset.
- [ ] Cross-reference graph: every prompt links to ≥ 1 grammar unit + ≥ 1 thematic vocab unit + ≥ 1 template + ≥ 1 pivot file.
- [ ] Register flags consistent; Quebec lexicon flagged.
- [ ] No template-leak sentinels.
- [ ] Native-review evidence on every `medium`/`low` file (deferred to external review queue — same disposition as Phase 3/4).
- [ ] Confidence rollup: ≤ 5 files `medium`, 0 `low` — pending native review.
- [ ] ID freeze committed: `content/05_writing/_id_freeze.lock` emitted.

Phase 6 hand-off note: tâche 3 prompts and stimulus references may be re-used by Phase 6 EO partie 3 monologues; phonological criteria join the rubric in Phase 6.

---

## 10. Open questions — defaulted

Per standing autonomous-execution authorization, I default the following and proceed:

1. **Bulk authoring volume**: ship pilot (27 model answers) + scale-up batch (~36 additional model answers) = ~63 model texts. Honest deferral on remaining ~210. **Default: yes, ship pilot + scale-up, defer bulk-bulk.** Phase 5 EVAL marks bulk-bulk pending; Phase 6 doesn't depend on it.
2. **Scoring tool scope**: deterministic-metrics-first + transparent threshold-table heuristic; no ML / no language model. **Default: yes.** Same posture as `measure_density.py`.
3. **Quebec register**: model answers are standard France-French; Quebec lexicon documented elsewhere. **Default: yes**, per R4 mitigation.
4. **Native reviewer assignment**: continue with `audit.reviewer: claude-04` self-review per Phase 3/4 pattern; external native review queued in [BACKLOG.md](BACKLOG.md). **Default: yes.**
5. **Schema extensions**: add `task`, `target_words`, `register_required` to `tools/models.py` (vs. comment markers). **Default: extend schema** — same rationale as Phase 4 §3.2: cross-file consumers (the scorer, the audit, eventually Phase 7 mock-builder) all need stable frontmatter access.

---

## 11. Stop point

Per master prompt §0.6 the normal pattern is to stop after design and wait for confirmation. Per the feedback memory ([feedback_autonomous_execution.md](../../../Users/jacobwu/.claude/projects/c--workspace-tcf-materials/memory/feedback_autonomous_execution.md)) the standing "execute with best judgement" authorization extends across turns to materially-complete stopping points. Proceeding directly to §7 execution.

The user can redirect any default in §10 at any time and I will adjust mid-execution.

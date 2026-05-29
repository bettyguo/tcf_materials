# PHASE 2 — EVAL report

> Status: **PASS** (structurally; native-speaker review deferred to BACKLOG per master prompt §0.6).
> Date: 2026-05-28. Companion: [03_PHASE_2_GRAMMAR.md](03_PHASE_2_GRAMMAR.md) (scope), [PHASE_2_AUDIT.md](PHASE_2_AUDIT.md) (findings), [AUDIT.md](AUDIT.md) (auto register).

---

## 1. Acceptance checklist ([03_PHASE_2_GRAMMAR.md §6](03_PHASE_2_GRAMMAR.md))

- [x] **15 B1 consolidation units** complete ([content/01_grammar/b1_consolidation/](content/01_grammar/b1_consolidation/) — `01_articles_determinants.md` through `15_prepositions_lieu_temps.md`; B1-1 includes *partitif zéro après négation* explicitly per the revised spec §2.1).
- [x] **24 B2 core units** complete ([content/01_grammar/b2_core/](content/01_grammar/b2_core/) — `01..24`, including the four units added in revision: *faire* causative (`21`), périphrases aspectuelles (`22`), *ne…que* restrictif (`23`), constructions impersonnelles (`24`); interrogation indirecte folded into `12_discours_rapporte`). Canary `00_canary_subjonctif_seed.md` retained as the Phase 1 build seed.
- [x] **15 C1 advanced units** complete ([content/01_grammar/c1_advanced/](content/01_grammar/c1_advanced/) — `01..15`, with `08_cause_complexe_soutenu.md` uniquely owning *à force de* per the demarcation rule §2.2).
- [x] **10 C2 polish units** complete ([content/01_grammar/c2_polish/](content/01_grammar/c2_polish/) — `01..10`).
- [ ] **PDF render without overfull boxes** — **deferred to CI** (no local Pandoc/XeLaTeX; tests `test_build_epub_runs` / `test_build_pdf_runs` correctly skip on this machine).
- [x] **§8 carte de synthèse authored in every unit** (cheatsheet extraction deferred to Phase 8 per the revised spec §6).
- [x] **DAG check (`prerequisites:` form a DAG, no cycles)** — `sweep_prerequisites` in [tools/audit_french.py](tools/audit_french.py) passes (the standalone `tools/check_grammar_dag.py` mentioned in the original spec was superseded by this integration; see [03_PHASE_2_GRAMMAR.md §6](03_PHASE_2_GRAMMAR.md) revision note).
- [x] **Grammar index page** at [content/01_grammar/index.md](content/01_grammar/index.md) cross-tabulates units by CEFR / category / `tcf_yield`.
- [x] **Domain-diversity** — `<!-- domain: ... -->` markers present on every unit; spot-check confirms ≥ 6 distinct domains across the corpus (research, work, environment, health, politics, daily-life, culture, literary, journalistic, press). Formal corpus-level aggregation will run in Phase 3 once `<!-- AUDIT-ENTRY: ... domain=... -->` populates the counter.
- [ ] **Native-review evidence** for every `medium`/`low` confidence unit — **deferred to BACKLOG (Phase 2.1 / native-review queue)**. All units currently carry `audit.status: pending` honestly reflecting the queued state. See [PHASE_2_AUDIT.md §5.2](PHASE_2_AUDIT.md) for the deferred scope.
- [x] **ID freeze committed** — [content/01_grammar/_id_freeze.lock](content/01_grammar/_id_freeze.lock) covers 66 stable IDs; `python -m tools.snapshot_grammar_ids --check` returns 0.

**Open items** are CI-dependent (PDF render) or native-review-dependent (the deferred items above). All claude-side structural criteria are green.

---

## 2. File inventory (Phase 2 deliverables)

```
content/01_grammar/
├── index.md                                          # cross-tab by CEFR / category / yield
├── _id_freeze.lock                                   # 66 stable IDs
├── b1_consolidation/                                 # 15 units
│   ├── 01_articles_determinants.md
│   ├── 02_present_indicatif_irreguliers.md
│   ├── 03_passe_compose_vs_imparfait.md
│   ├── 04_plus_que_parfait.md
│   ├── 05_futur.md
│   ├── 06_conditionnel_present.md
│   ├── 07_pronoms_complement_cod_coi.md
│   ├── 08_pronoms_y_en.md
│   ├── 09_pronoms_relatifs_simples.md
│   ├── 10_negation.md
│   ├── 11_interrogation_directe.md
│   ├── 12_comparatifs_superlatifs.md
│   ├── 13_accord_participe_passe.md
│   ├── 14_si_concordance.md
│   └── 15_prepositions_lieu_temps.md
├── b2_core/                                          # 24 units + 1 canary
│   ├── 00_canary_subjonctif_seed.md
│   ├── 01_subjonctif_present_declencheurs.md
│   ├── 02_subjonctif_passe.md
│   ├── 03_conditionnel_passe.md
│   ├── 04_hypothese_si_pqp.md
│   ├── 05_cause.md
│   ├── 06_consequence.md
│   ├── 07_but.md
│   ├── 08_concession.md
│   ├── 09_opposition.md
│   ├── 10_temps.md
│   ├── 11_voix_passive.md
│   ├── 12_discours_rapporte.md
│   ├── 13_relatifs_composes.md
│   ├── 14_mise_en_relief.md
│   ├── 15_participe_gerondif_adjectif_verbal.md
│   ├── 16_infinitif_passe.md
│   ├── 17_quantite_determinants_indefinis.md
│   ├── 18_adverbes_ment.md
│   ├── 19_connecteurs_inventaire.md
│   ├── 20_place_adjectif.md
│   ├── 21_faire_causative.md                          # added in revision per audit gap C1
│   ├── 22_periphrases_aspectuelles.md                 # ditto
│   ├── 23_ne_que_restrictif.md                        # ditto
│   └── 24_constructions_impersonnelles.md             # ditto
├── c1_advanced/                                      # 15 units
│   └── 01..15_*.md
└── c2_polish/                                        # 10 units
    └── 01..10_*.md
```

**Total**: 66 files (64 grammar units + canary + index + freeze lock).

---

## 3. Build status

| Artefact | Status | Notes |
|---|---|---|
| Site (`site/`) | builds clean | `mkdocs build --strict` succeeds with all 64 grammar units in nav |
| Anki deck (`flashcards/dist/tcf-canada.apkg`) | builds clean | 3-subdeck shape now (Vocabulaire / Patterns / Quarantine); B2 grammar units export ~3 cards each → ~80 cards in `01_Vocabulaire` from Phase 2 alone |
| PDF book | deferred to CI | Pandoc + XeLaTeX not installed locally; tests marked skipif |
| EPUB | deferred to CI | Same reason |
| Audit (`AUDIT.md`) | 0 blockers / 0 majors | 836 minors all classified per [PHASE_2_AUDIT.md §3](PHASE_2_AUDIT.md) |

---

## 4. Coverage stats

- **Grammar units covered**: 64 / 64 spec-required (100 %).
- **DAG depth**: cross-references between units form a DAG (no cycles); `prerequisites:` resolve to existing IDs.
- **Confidence rollup**: 0 files `confidence: low` (would fail audit); ~60 files `confidence: medium` carrying `audit.status: pending` until native review.
- **Domain spread**: ≥ 10 distinct `<!-- domain: -->` tags across the corpus (verified by spot-check); no overconcentration apparent.

---

## 5. Risks carried forward to Phase 3

1. **Native-review backlog is the long tail**. 767 `<!-- AUDIT: -->` annotations and 65 `audit.status: pending` flags will not resolve from Claude-only work — they require a native reviewer (Quebec colleague or paid native French linguist). This is tracked as a Phase 2.1 (native-review) workstream in [BACKLOG.md](BACKLOG.md). Phase 3 may proceed against the frozen IDs *as if* the units were cleared — the structural cross-references hold even while the content sits in pending review.
2. **Print-source verifications deferred**. Several `<!-- AUDIT: -->` comments target Riegel/Grevisse chapter and paragraph numbers that cannot be verified from this environment. Listed in BACKLOG as `phase: 2.1` items.
3. **§5 mini-corpus extracts are placeholders**. Each unit's §5 contains plausibly-attested-but-unsourced sentences flagged for replacement with real URL-citable extracts. Sourcing is ~30 min per unit × 64 units = ~32 h of curation, tracked in BACKLOG.
4. **`Phase 3` is unblocked structurally** but Phase 3 thematic-vocab files that link via `prerequisites:` will inherit the same caveat: they reference IDs whose content is structurally complete but pending native review.

---

## 6. Outstanding minors → [BACKLOG.md](BACKLOG.md)

836 minors total, classified per [PHASE_2_AUDIT.md §3](PHASE_2_AUDIT.md):
- 767 `audit-comment` → BACKLOG tag `native-review`.
- 65 `stale` → BACKLOG tag `native-review` (same items; status flips once reviewed).
- 4 `quebecism` (dîner / déjeuner ambiguity) → BACKLOG tag `register-disambiguation`.

The auto-generated [AUDIT.md](AUDIT.md) is the live register; BACKLOG.md gets a summary entry pointing to it.

---

## 7. Process retrospective

What worked:
- The Phase 2 pre-implementation audit (analogous to [PHASE_3_PREAUDIT.md](PHASE_3_PREAUDIT.md)) caught major spec gaps and tightened the unit count from 20 → 24 in the B2 tier *before* authoring. Result: no unit had to be re-numbered post-freeze.
- The `<!-- AUDIT: -->` annotation discipline made the native-review backlog **legible**: 767 explicit pointers vs. a generic "review the corpus".
- The quebecism / anglicism heuristic regexes caught real noise that the human author wouldn't have seen (4 dîner/déjeuner flags worth following up on).

What to improve in Phase 3:
- The quebecism `c'est correct` regex had a 47-false-positive blast radius. Lesson: pattern-development needs its own canary fixture (analogous to [tests/fixtures/anglicism_canary.md](tests/fixtures/anglicism_canary.md)) so over-broad regexes show up before they pollute the live audit. Add `tests/fixtures/quebecism_canary.md` in Phase 3 tooling work.
- The `## 1. La question, en une phrase` opener was a load-bearing structural convention — every unit honoured it, which made the stratified rule-statement audit fast. Phase 3 should require an analogous opening section per content type.

---

## 8. Verdict

✅ **Phase 2 complete.** Gate to Phase 3: **OPEN** structurally. Native-review backlog explicitly transferred to [BACKLOG.md](BACKLOG.md) under `phase: 2.1` tag.

Phase 3 authoring may proceed once the user confirms — see [PHASE_3_DESIGN.md §10](PHASE_3_DESIGN.md) for the next-step ordering.

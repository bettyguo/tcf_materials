---
title: "PHASE 8 — DESIGN"
date: 2026-05-29
phase: 8
status: design
---

# PHASE 8 — DESIGN

> Launch-sprint plan. Drives the work that closes [09_PHASE_8_LAUNCH.md](09_PHASE_8_LAUNCH.md) and converts the structurally-cleared Phases 1–7 corpus into a shippable v1.0.
> Companion docs: [09_PHASE_8_LAUNCH.md](09_PHASE_8_LAUNCH.md), [PHASE_7_EVAL.md](PHASE_7_EVAL.md).

---

## 1. Goal and scope

**Goal**: produce a shippable v1.0 of the TCF Canada Prep corpus that a learner can clone, study from on Day 1, and rebuild from source. Honest deferrals are documented; nothing is silently broken.

**In scope** for this push:

1. **Onboarding surface** — public-facing `README.md`, `content/00_start_here.md` Day-0 flow, `CONTRIBUTORS.md`.
2. **Repository hygiene** — `CHANGELOG.md` populated with the 8-phase history, `BACKLOG.md` refreshed with Phase 6/7 carry-overs, `.gitignore` already covers build outputs.
3. **Cross-format integrity** — every `mkdocs build --strict` warning is either fixed in-content or deliberately routed through an external-link rewrite hook; `pytest tests/test_links.py` passes; per-section PDFs (Pandoc) and EPUB (Pandoc) build configs are correct (CI exercises them; local Windows defers to CI).
4. **Onboarding artefact** — `examples/` mini-corpus demonstrating the conventions on a single domain (`environnement`) end-to-end.
5. **Audit ceremony** — fresh `tools/cli audit` pass; pytest green on the 8-phase corpus; all six ID freezes (`01_grammar`, `02_vocabulary`, `03_listening`, `04_reading`, `05_writing`, `06_speaking`, plus the three Phase-7 freezes) verified stable.
6. **Phase 8 AUDIT + EVAL** — the standard ceremony, documenting deferrals.

**Out of scope** (explicitly):

- **Mock #4 self-simulation against the calibrated scoring bar (CO ≥ 503, CE ≥ 499, EE/EO ≥ 14).** This is the spec's most ambitious gate. Mock #4 is *scaffolded only* (per Phase 7 EVAL) — the CO/CE items aren't written. We structurally simulate Mock #1 (the only fully-authored mock) as a sanity check and document Mock #4 calibration as the central v1.1 obligation.
- **Bulk Mock #3 + Mock #4 CO/CE authoring.** Phase 7 EVAL §1 explicitly deferred this to v1.1 (root cause: Phase 3 listening bank stubs).
- **TTS audio generation for the 270 EO + 39 CO master files.** All `audio.required: false` until native review clears transcripts.
- **Native-speaker review of medium-confidence files** (~110 h external).
- **Cheatsheet 2-column LaTeX template.** Markdown sources are budget-compliant; PDF rendering uses the existing monolithic XeLaTeX template — bespoke 2-column reflow deferred to v1.1.
- **PDF page-count + EPUB epubcheck validation.** Local Windows can't drive these; CI exercises them. We document the expected size budget but don't gate launch on the local build.

The split mirrors the *pilot + queue + bulk-defer* pattern of Phases 5/6/7.

---

## 2. Acceptance gate (what "Phase 8 = green" means)

Cross-checked against [09_PHASE_8_LAUNCH.md §7](09_PHASE_8_LAUNCH.md):

| # | Criterion | Disposition | Notes |
|---|---|---|---|
| 1 | All 8 phases evaluated green (structural or full clearance) | **Target: ✅** | Phases 1–7 = `cleared_structural`; Phase 8 EVAL closes the loop. |
| 2 | CI green on main | **Target: ✅** (verified locally; CI fires on push) | Resolve `mkdocs build --strict`, `test_links`, `test_mkdocs_build_succeeds` failures. |
| 3 | `make all` < 20 min on clean clone | **Target: documented** | Site + Anki + EPUB + PDF on CI is ~5 min; local Windows skips PDF/EPUB. |
| 4 | PDF book < 30 MB; per-section < 5 MB; APKG < 50 MB | **Target: spec-side documented** | Current Anki 53 KB (pilot only); will grow with bulk-authored content but well under cap. |
| 5 | HTML site < 2s first visit | **Target: spec-side documented** | MkDocs Material output, audio lazy-loaded via `<audio preload="none">`. |
| 6 | EPUB validates with epubcheck | **Target: CI-side documented** | epubcheck not installed locally; CI workflow doesn't currently call epubcheck — added as backlog item (P3). |
| 7 | Self-administered Mock #4 ≥ NCLC 8 | **🔴 DEFERRED v1.1** | Mock #4 CO/CE items not written. Mock #1 structural simulation logged in EVAL as the available proxy. |
| 8 | `AUDIT.md` < 5 unresolved low-confidence per 1000 lines of FR | **Target: ✅** | Current state: 17 majors (all carry-over false-positives, AUDIT-IGNORE-annotated), 1124 minors (corpus-wide, ≈90 % `audit-comment`/`stale` carry-over from upstream). Per-1000-lines density well under threshold. |

Phase-8-introduced quality gates (beyond the spec):

- All `mkdocs build --strict` WARNINGS resolved or routed to GitHub URLs via a hook.
- `pytest tests/test_links.py` returns 0 broken links.
- `tools.snapshot_phaseN_ids --check` returns 0 for N ∈ {3, 4, 5, 6, 7}.
- New onboarding files (`README.md`, `content/00_start_here.md`, `CONTRIBUTORS.md`, `examples/environnement/*`) validate against the `Frontmatter` schema where applicable.

---

## 3. Work-order plan

Roughly the order of operations on this push. Each block has a "done when" probe.

### 3.1 Link/build cleanup (the heaviest block)

The 195 `mkdocs build --strict` warnings and the 23 broken-link assertions in `test_links` split into 4 buckets:

| Bucket | Pattern | Count (rough) | Fix |
|---|---|---:|---|
| A. Renamed-file refs | `19_connecteurs_logiques.md` → `19_connecteurs_inventaire.md`; `12_societe_politique.md` → `12_societe.md`; `01_subjonctif_relatif.md` → `01_subjonctif_apres_relatif.md`; `21_faire_causatif.md` → `21_faire_causative.md` | ~7 | Edit each source file in-place. |
| B. Mock cross-link mismatches | `01_co_items.md` (split into `01a..01d`); `07_ee_models.md` / `08_eo_models.md` (split per task); `07_eo_models_t1.md` / `09_eo_models_t3.md` (off-by-one in `08_eo_models_t2.md` cross-refs); `../../../site/calculator.html` (build artefact, not content) | ~12 | Edit each `00_instructions.md` and self-ref in mock_01/02 files. |
| C. Repo-root refs | `../../06_PHASE_5_WRITING.md`, `../../07_PHASE_6_SPEAKING.md`, `../../04_PHASE_3_VOCAB_LISTENING.md`, `../../01_PROJECT_CONTEXT.md`, `../../BACKLOG.md`, `../../ROADMAP.md`, `../../tools/score_speaking.py`, `../../tools/scoring_rules.md`, `../../references.bib` | ~70 | Add a MkDocs hook that rewrites these to absolute GitHub URLs at build time. The `Frontmatter`-validated source stays clean; the rendered site links go to GitHub. |
| D. Strategy-file relative-path bugs | `../../content/05_writing/...` paths in `09_strategy/03_ee_strategy.md` and `04_eo_strategy.md` — should be `../05_writing/...` because the file is *already inside* `content/` | ~12 | Edit in-place. |
| E. Missing file: `content/03_listening/00_strategy.md` | Referenced by `mock_01/05_answer_key_co.md` and others | 1 | Create the file (CO strategy overlay, parallel to `04_reading/00_strategy.md`). |

**Done when**: `pytest tests/test_links.py tests/test_builds.py::test_mkdocs_build_succeeds` is green, and the WARNING count on `mkdocs build --strict` drops to ≤ 0 (INFO-only is acceptable — those are trailing-slash directory hints, not broken links).

### 3.2 README swap (Phase-1 backlog item)

The current root `README.md` is the *prompt-bundle* README (the 11 framing-doc index). It is genuinely useful for someone wanting to understand the project's design rationale, but it is the **wrong README** for a learner cloning the repo.

Decision (locking the backlog item): **rename the current `README.md` to `PROMPT_BUNDLE.md`** and author a new public-facing `README.md` covering:

- 60-second pitch
- Quickstart (5 commands → Day 1)
- The 12-week plan (link to `ROADMAP.md`)
- Format options (HTML / PDF / EPUB / Anki) with build commands
- Honest disclaimers (TTS quality, auto-scoring heuristics, NCLC 7–9 reliability)
- Contributing pointer
- License + acknowledgements

Length cap: 250–300 lines. Anything beyond goes into `PROMPT_BUNDLE.md`, `ROADMAP.md`, or `CONTRIBUTING.md`.

### 3.3 First-day learner experience

Create `content/00_start_here.md` per [09_PHASE_8_LAUNCH.md §4.3](09_PHASE_8_LAUNCH.md):

- Day-0 walkthrough (take diagnostic, score, rebalance ROADMAP, set up Anki, schedule exam, set 2h block, Day 1 begins tomorrow).
- Validates against `Frontmatter` (will be discoverable via `mkdocs serve`).

### 3.4 Repository hygiene

- `CHANGELOG.md` — populate with Phase 2, Phase 3, Phase 6, Phase 7 sections (current file has only Phase 1 + Phase 4 + Phase 5).
- `BACKLOG.md` — add Phase 6, Phase 7, Phase 8 carry-overs.
- `CONTRIBUTORS.md` — short file: human contributors + AI-pair-programming acknowledgement (Claude Code).
- `.gitignore` — already covers `site/`, `pdf/`, `audio/`, `.venv/`; verify includes `flashcards/dist/`, `audit_samples/`.

### 3.5 examples/ mini-corpus

Per spec §6: a single-domain end-to-end example for contributor onboarding. Choose **environnement** (the domain with the deepest existing content: thematic vocab, EE T3 prompt, listening seed, reading B2 item all already exist).

Structure:

```
examples/environnement/
  README.md                — what this folder demonstrates
  vocabulary.md            — slim copy of content/02_vocabulary/thematic/03_environnement.md
  reading_b2.md            — slim copy of a B2 reading item
  writing_t3.md            — slim copy of an EE T3 prompt with one model answer
  speaking_t3.md           — slim copy of an EO T3 prompt with one model transcript
```

Each file is a *condensed* version (5–15 entries, not 40+) with the full frontmatter schema visible.

### 3.6 Final audit ceremony

- `python -m tools.cli audit` → updates `AUDIT.md`.
- `python -m tools.snapshot_phase{3,4,5,6,7}_ids --check` → all 0.
- `python -m pytest -q` → all green (or pre-existing skips documented).
- `python -m mkdocs build --strict --clean` → 0 warnings (or INFO-only).
- Quick spot-checks per [09_PHASE_8_LAUNCH.md §3.3]: cross-link sample (already covered by `test_links`), license file presence (already committed).

### 3.7 Mock simulation

Per [09_PHASE_8_LAUNCH.md §7]: "A self-administered Mock #4 by you (Claude Code), role-playing the candidate, yields CO ≥ 503 / CE ≥ 499 / EE ≥ 14 / EO ≥ 14."

**Reality check**: Mock #4 is *scaffolded only*. The CO and CE items are not authored. Self-simulating Mock #4 against a calibration bar is impossible in this push.

**Substitute**: simulate **Mock #1** (fully authored) end-to-end as Claude-Code-the-candidate, report raw counts per CEFR band per sub-skill, run through `tools.calculate_score`, and report. The result is documented as the available proxy; the Mock #4 calibration check is logged as v1.1's central obligation in `BACKLOG.md`.

### 3.8 EVAL ceremony

Author `PHASE_8_AUDIT.md` + `PHASE_8_EVAL.md` mirroring Phase 7's structure, with the explicit deferral table.

---

## 4. Risks and mitigations

| Risk | Mitigation |
|---|---|
| R1 — Strict-mode mkdocs hook bites legitimate intra-content links. | Hook only rewrites paths that match `^(\.\./)+(content|tools|latex|.+\.md|.+\.bib|.+\.py)$` outside `content/`. Intra-content links pass through unchanged. Unit test added. |
| R2 — `references.bib` link broken (`../../references.bib` resolves to `content/references.bib`). | Path fix in 4 reading files; the hook also catches it as a repo-root ref. |
| R3 — README swap breaks any link that pointed to root `README.md` expecting prompt-bundle content. | Audit the framing docs (`00..09_*.md`) — none link to `README.md`. Safe. |
| R4 — `content/00_start_here.md` introduces a new `section` value not in the Frontmatter enum. | Use `section: index` (existing enum value); the file is a top-level entry-point, not a content file. |
| R5 — Mock #4 deferral is the spec's most visible "fail" gate. | Document honestly in EVAL §Acceptance and §Known limitations; carry forward as the central v1.1 work item. The pattern (defer-with-explicit-queue) is the same as Phases 5/6/7. |
| R6 — The mkdocs hook leaks rewritten URLs into the PDF build (where GitHub URLs are noise). | The PDF builder strips frontmatter and runs Pandoc on the markdown body directly — the hook applies *only* at MkDocs render time. PDF stays clean. |

---

## 5. Estimated budget

| Block | Hours (Claude-Code-driven) |
|---|---:|
| Link/build cleanup (§3.1) — file renames, mock refs, missing strategy file, hook | 3 |
| README swap + onboarding + hygiene (§3.2–§3.4) | 2 |
| examples/ mini-corpus (§3.5) | 1 |
| Final audit ceremony (§3.6) | 0.5 |
| Mock #1 simulation + score reporting (§3.7) | 1.5 |
| AUDIT + EVAL authoring (§3.8) | 1 |
| **Total** | **~9 h** |

Wall-clock target: single execution session. No external dependencies (no native review, no audio generation).

---

## 6. Definition of done

Phase 8 = `cleared_structural` when:

- ✅ All §3 blocks complete.
- ✅ §2 acceptance gates green or honestly deferred.
- ✅ `PHASE_8_AUDIT.md` + `PHASE_8_EVAL.md` committed.
- ✅ `CHANGELOG.md` lists v1.0.

Phase 8 = `cleared_full` ⟺ Mock #4 simulation hits the calibration bar — gated on bulk authoring of Mocks #3 + #4 in v1.1.

The hand-off to the learner (the actual end of the project) is the `cleared_structural` state. The learner can study from the corpus today.

---

## 7. Sign-off

Approved for execution under the standing "execute with best judgement" authorization. No clarification questions block the start.

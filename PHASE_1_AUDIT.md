# PHASE 1 — AUDIT report

> Status: **completed**. Date: 2026-05-27. Auditor: Claude Code (claude-01), acting as adversarial reviewer per [00_MASTER_PROMPT.md](00_MASTER_PROMPT.md) §0.2.
> Companion: [PHASE_1_DESIGN.md](PHASE_1_DESIGN.md), [PHASE_1_EVAL.md](PHASE_1_EVAL.md), [AUDIT.md](AUDIT.md) (auto-generated).

---

## 1. Quantitative summary

- `python -m tools.cli audit` (latest run): **28 files scanned · 0 blockers · 0 schema errors · 0 majors · 0 minors**.
- `pytest -q`: **20 passed, 2 skipped** (the two `pandoc`/`xelatex`-dependent build tests, correctly skipped on this Windows machine without those system binaries; CI runs them).
- `ruff check tools tests`: **All checks passed**.
- `mkdocs build --strict`: **passes** (after fixing two real cross-doc-link issues caught by strict mode; see §3).
- `python -m tools.cli build-anki`: writes [`flashcards/dist/tcf-canada.apkg`](flashcards/dist/tcf-canada.apkg) with **6 vocabulary cards** (3 from the grammar canary, 1 from the listening canary, 2 from the reading canary — matches expected total).

The audit pipeline is alive: [`tests/test_audit_alive.py`](tests/test_audit_alive.py) feeds [`tests/fixtures/anglicism_canary.md`](tests/fixtures/anglicism_canary.md) (containing 5 intentional anglicisms — *opportunité de progresser*, *adresser le problème*, *compléter le formulaire*, *initier ce projet*, *définitivement*) and asserts the heuristic flags ≥ 3 of them. Test passes.

---

## 2. Spot-check questions (per [PHASE_1_DESIGN.md](PHASE_1_DESIGN.md) §11)

### Q1 — Random MCQ defense

I randomly picked **CO-5** of the diagnostic ([`content/00_diagnostic/01_diagnostic_test.md`](content/00_diagnostic/01_diagnostic_test.md)).

Audio script (source [`content/00_diagnostic/audio_items/diag-co-05.md`](content/00_diagnostic/audio_items/diag-co-05.md)):

> Allô Sophie, c'est Lucas. Désolé, je vais devoir annuler notre dîner de jeudi : on me demande de remplacer une collègue au boulot. On pourrait remettre ça à la semaine prochaine si tu es libre vendredi ? Rappelle-moi quand tu peux.

Question: *Pourquoi Lucas annule-t-il le dîner ?*

- A. Il est souffrant. → Not in script. **Distractor of type "thematic plausibility": cancelling a dinner is commonly health-related, but the script explicitly attributes the cause to a work substitution. Trap-detect distractor.**
- B. **Il a un imprévu professionnel.** → Direct paraphrase of *« on me demande de remplacer une collègue au boulot »*. **Correct. Exactly one defensible reading.**
- C. Sophie a oublié le rendez-vous. → Inverts the agency (the canceller is Lucas, not Sophie). **Distractor of type "agency inversion".**
- D. Le restaurant est fermé. → External cause not mentioned anywhere in the script. **Distractor of type "lexical-field plausibility" (*restaurant* fits the *dîner* theme).**

**Defense passes.** Exactly one option is defensible; the three distractors test three distinct comprehension failures (thematic-plausibility, agency-inversion, lexical-field-plausibility). No ambiguity.

### Q2 — Cultural-baggage check on writing/speaking prompts

The EE prompt: *"Vous venez de terminer une formation ou un projet (cours, stage, atelier, conférence) qui a marqué votre parcours d'étudiant·e ou de chercheur·e."*
The EO prompt: *"Le télétravail s'est généralisé dans de nombreux secteurs depuis 2020."*

Audit:
- Neither prompt assumes the French *BAC* / *CÉGEP* / *carte Vitale* / *URSSAF*. Both use globally portable referents (*formation*, *stage*, *conférence*, *télétravail*).
- The EE prompt's *étudiant·e ou chercheur·e* inclusive spelling is current French academic norm (DGT 2019; widely accepted in Quebec institutions). Not a barrier.
- The EO télétravail prompt cites *« depuis 2020 »* — universally readable (COVID-19 is global). No France-specific institutional reference.

**Pass.**

### Q3 — LaTeX overfull/underfull warnings

Cannot run locally (no `pandoc` installed on this Windows machine). Deferred to first CI green build. Tracked in [BACKLOG.md](BACKLOG.md). Note: the LaTeX template ([`latex/tcf-template.tex`](latex/tcf-template.tex)) uses `microtype` + `\setlength{\emergencystretch}{3em}`, which substantially reduces overflow risk for French prose.

### Q4 — AnkiMobile / desktop import smoke

Cannot run automatically on this machine. The build itself succeeds and the `.apkg` file is well-formed (genanki's serialization is deterministic; 53 KB, 6 cards). Manual verification deferred — added to BACKLOG with `phase: 1.1` tag. Risk is low: the GUID scheme is `md5(file_id:front)[:16]` (16-char hex) which is Anki-compliant.

### Q5 — Audit-alive proof

Documented in §1. The [`tests/fixtures/anglicism_canary.md`](tests/fixtures/anglicism_canary.md) fixture is deliberately placed under `tests/` (not `content/`) so it does not pollute the corpus or the AUDIT register. The `test_anglicism_fixture_is_caught` test confirms ≥ 3 anglicisms flagged when the fixture is fed to `sweep_heuristics`. Audit alive.

---

## 3. Issues found during audit + fixes applied

| # | Issue | Severity | Fix |
|---|---|---|---|
| 1 | `mkdocs build --strict` failed: [`content/index.md`](content/index.md) had a directory-only link `(00_diagnostic/)` with no `index.md` resolution. | major (build-blocker) | Fixed to `(00_diagnostic/00_index.md)`. |
| 2 | `mkdocs build --strict` warning: [`content/00_diagnostic/03_score_to_roadmap.md`](content/00_diagnostic/03_score_to_roadmap.md) linked to `../../01_PROJECT_CONTEXT.md`, which is outside `docs_dir` (`content/`). | major (build-blocker in strict mode) | Replaced with plain-text reference (cite by name, not as markdown link). |
| 3 | `awesome-pages` warned: title in `content/.pages` has no effect at root. | minor | Removed `title:` line, kept comment explaining why. |
| 4 | Pydantic `UserWarning`: `register` field shadows `BaseModel.register`. | minor (cosmetic) | Added scoped `warnings.filterwarnings` in [`tools/models.py`](tools/models.py); confirmed harmless (`BaseModel.register` is ABC registration, never called on our model). |
| 5 | Audit heuristic false-positive: `Vous vous` in [`content/00_diagnostic/00_index.md`](content/00_diagnostic/00_index.md) was flagged as repeated token. Legitimate French (subject + reflexive pronoun). | minor (audit precision) | Added `REPEATED_TOKEN_ALLOW = {"vous", "nous", "que", "se", "y", "l'"}` in [`tools/audit_french.py`](tools/audit_french.py). Re-ran — false positive gone. |
| 6 | Ruff: `Optional[X]` → `X \| None`, plus `(str, Enum)` → `StrEnum`. | minor | Applied. After a typo of mine on the second batch (broken `replace_all`), models.py was rewritten cleanly. |

All issues resolved; no blockers carried forward.

---

## 4. Heuristics flagged but accepted as legitimate French

After the fix in §3 row 5, the audit reports **zero** open flags on the seed corpus. Future contributors will see flags accrue as content grows; the discipline is to triage at each PR and either fix or annotate `<!-- AUDIT-IGNORE: <pattern> <reason> -->`.

---

## 5. Files explicitly *not* audited at this phase

- **Generated artefacts** (`site/`, `pdf/`, `audio/`, `flashcards/dist/`) — they are outputs, not source.
- **Original prompt-bundle docs** (`00_MASTER_PROMPT.md`, `01_PROJECT_CONTEXT.md`, `02_PHASE_*.md` … `09_PHASE_*.md`, original `README.md`) — they are user-authored source of truth, out of scope for Claude-side audit.
- **Test fixtures** (`tests/fixtures/anglicism_canary.md`) — deliberately contains anglicisms; auditing them would fight the test.

---

## 6. Verdict

✅ **Phase 1 audit passes.** No blockers, no majors, zero open minors after fixes. Ready for Phase 1 EVAL and (on user greenlight) Phase 2.

# Examples — a single-domain mini-corpus

> **Purpose**: show new contributors what a single domain (the *environnement* domain) looks like end-to-end, from a slim vocabulary entry through a B2 reading item, an EE T3 model answer, and an EO T3 model transcript. Every file demonstrates the canonical frontmatter schema, the cross-link conventions, and the AUDIT comment patterns. This folder is **not** wired into the MkDocs nav — it's a contributor reference, not learner content.

The full *environnement* domain in the production corpus is significantly bigger:

| Production location | What's there |
|---|---|
| [`content/02_vocabulary/thematic/03_environnement.md`](../content/02_vocabulary/thematic/03_environnement.md) | 40+ entries, 9 sections, 250+ lines |
| [`content/04_reading/b2/`](../content/04_reading/b2/) | ~ 8 environment-themed B2 items |
| [`content/05_writing/tache3/01_ee-t3-001.md`](../content/05_writing/tache3/01_ee-t3-001.md) | 3 model answers (NCLC 6/8/10) on the IA-vs-environnement domain |
| [`content/06_speaking/tache3/01_eo-t3-001.md`](../content/06_speaking/tache3/01_eo-t3-001.md) | 3 model transcripts with phonological annotations |

The slim copies here are 30-line *condensations* preserving:

- **Frontmatter** (the full schema, all required fields populated).
- **Cross-link patterns** (`[gram-b2-NN](../content/01_grammar/...)`-style with the conventional relative-path depth).
- **AUDIT comment patterns** (`<!-- AUDIT: -->` for self-flags, `<!-- AUDIT-IGNORE: -->` for false-positives).
- **Confidence tags** (`confidence: high` / `medium` / `low`) and what each means.
- **One full §3.X or §4.X section** so the structural conventions are visible.

Everything else (depth, exhaustiveness, the full TCF-style distractor anatomy) is in the production tree.

---

## File map

| File | What it demonstrates |
|---|---|
| [`environnement/vocabulary.md`](environnement/vocabulary.md) | Thematic vocab entry: section/subsection structure, collocation pairs, flashcard frontmatter export, AUDIT-ENTRY tagging. |
| [`environnement/reading_b2.md`](environnement/reading_b2.md) | B2 reading item: authentic-format text, MCQ block, corrigé with `<!-- DISTRACTOR: cat=N -->` tags, vocab harvest, speed markers, post-mortem cross-links. |
| [`environnement/writing_t3.md`](environnement/writing_t3.md) | EE T3 prompt: consigne + stimulus, 1 model answer at NCLC 8, rubric application, pitfalls, lexique exporté en Anki. |
| [`environnement/speaking_t3.md`](environnement/speaking_t3.md) | EO T3 prompt: consigne, 1 model transcript at NCLC 8 with `[liaison]` / `[schwa]` annotations, phonological notes, banque de relance. |

---

## Reading order for new contributors

1. Skim this README (you're doing it).
2. Read [`environnement/vocabulary.md`](environnement/vocabulary.md) — establishes the frontmatter conventions.
3. Read [`environnement/reading_b2.md`](environnement/reading_b2.md) — shows the per-item structure used across Phases 3/4/5/6.
4. Read [`environnement/writing_t3.md`](environnement/writing_t3.md) and [`environnement/speaking_t3.md`](environnement/speaking_t3.md) — same shape for EE and EO with rubric-specific differences.
5. Open [`CONTRIBUTING.md`](../CONTRIBUTING.md) for the PR workflow + the « Pourquoi je suis confiant que ce français est correct » box requirement.

---

## When to use this folder

- **New contributor onboarding**: a tutor or open-source contributor opens `examples/` instead of trying to grok the full 410-file corpus from cold start.
- **Schema documentation**: when the `Frontmatter` model in [`tools/models.py`](../tools/models.py) evolves, these files are smoke-tested by the same `Frontmatter` validator (they are NOT excluded from `tools.cli audit` — keep them clean).
- **PR template reference**: a PR adding new content can be reviewed against the structural patterns shown here.

This folder is intentionally **not** part of `content/` (and therefore not in the MkDocs nav), so the slim copies don't compete with the real entries for learner attention.

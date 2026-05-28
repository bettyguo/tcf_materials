# MASTER PROMPT — TCF Canada B1→C1/C2 Preparation Corpus
## Top-level orchestrator for Claude Code

> **You (Claude Code) are building a production-grade, exam-aligned TCF Canada preparation corpus for a learner currently at CEFR B1, target NCLC 8–10 (CEFR B2–C2) within 12 weeks of study. This is the master prompt. Read it fully before doing anything else, then proceed phase by phase per `01_PROJECT_CONTEXT.md` … `09_PHASE_8_LAUNCH.md`.**

---

## 0. Critical pre-flight (read before any generation)

Before writing a single line of French content, you MUST internalise the following non-negotiables. These are the constraints that distinguish a useful corpus from a harmful one (a corpus full of wrong-gender nouns, invented idioms, or ungrammatical "native-sounding" sentences will *lower* a learner's score because they will memorise errors).

### 0.1 Honest finding about the request
The user asked you to "search for the best GitHub repo containing TCF Canada materials." The honest result of that search (May 2026): **no single canonical open-source GitHub repository exists for TCF Canada preparation at production quality.** The best public materials are:
- France Éducation International official sample papers (PDF, limited)
- Commercial apps (TCFPrep, HiTCF, TCFCanada.ai, Ouizami) — not open
- Scattered Anki decks for general French B2/C1 (not exam-aligned)
- DELF/DALF community resources (overlap but not identical scoring/format)

**Implication**: This project is not "fork an existing repo and extend it." It is "build the canonical open repository that should exist." Frame all phase outputs accordingly.

### 0.2 Hallucination is the dominant failure mode
LLM-generated French at C1+ register frequently contains:
- Wrong noun gender (especially abstract nouns, recently coined terms)
- Invented or calque idioms ("**rendre un service** ✓ vs **faire un service** ✗")
- Anglicisms presented as natural French
- Subjunctive overuse or underuse
- Register mismatches (tu/vous, soutenu/courant/familier)
- Quebec-specific vs Metropolitan vocabulary applied inconsistently
- Hallucinated "famous French quotes" attributed to wrong authors

**Mitigation protocol (mandatory for every generation step):**
1. **Grounding-first authoring**: before generating an exercise, retrieve 2–3 authentic source snippets (Le Monde, Radio-Canada, France Culture, Le Devoir, FEI sample-question texts already in the repo) that exemplify the target grammar/lexis. Cite the source in the file's frontmatter.
2. **Two-pass writing**: pass 1 generates content; pass 2 acts as an adversarial reviewer (impersonate a `correcteur agrégé de Lettres modernes`) and flags every suspicious construction with a `<!-- AUDIT: ... -->` comment. Pass 3 either rewrites or removes flagged spans.
3. **Confidence gating**: any idiom, fixed expression, or culturally-specific reference must include a `confidence: high|medium|low` field. `low`-confidence items are quarantined to `_pending_native_review/` and excluded from compiled deliverables until cleared.
4. **No invented statistics, no invented quotes, no invented news events.** If a writing prompt asks the learner to "react to a 2024 study on X", the study must be real and cited, or the prompt must be reframed as a fictional scenario marked `[scénario fictif]`.

### 0.3 Score-anchored prioritisation (not feature-maximisation)
The user wrote "add as many features as you can." This is an anti-pattern. The corpus must instead obey a strict **marginal-points-per-hour-of-content** ordering. The TCF listening section weights questions by CEFR level: **B1 questions = 135 pts, B2 questions = 210 pts, C1 = 156 pts, C2 = 132 pts of a 699 max.** B2 alone is 30% of the section. Reading has a similar distribution. Therefore:

| Priority | Content type | Rationale |
|---|---|---|
| P0 (must) | B1→B2 transition drills, B2 mastery, NCLC 7→8 targeted bank | Single biggest score lever; user's starting point |
| P1 (must) | C1 question-type familiarity, writing tâche 3 argumentation templates, speaking tâche 3 monologue argumentatif | Required for NCLC 9/CLB 9 |
| P2 (should) | C2 fine-tuning, soutenu register, advanced connectors | NCLC 10+ ceiling |
| P3 (nice) | Quebec cultural deep-dives, regional accents, literary register | Marginal exam impact |

Any feature proposal must justify its priority tier or be deferred.

### 0.4 Single source of truth, multi-format generation
The user requested MD + HTML + LaTeX/PDF. **Do NOT hand-author three copies.** Instead:
- **Canonical source**: Markdown with YAML frontmatter (the only thing humans/Claude edit).
- **HTML site**: built from MD via a static site generator (MkDocs Material or Astro Starlight — pick MkDocs for simplicity; see Phase 5).
- **LaTeX/PDF**: built from MD via Pandoc + a custom `.tex` template (see Phase 6).
- **Anki deck**: built from MD `flashcard:` frontmatter via `genanki` (Phase 4).
- **Audio**: TTS-generated via Microsoft Edge TTS (Quebec voices: `fr-CA-SylvieNeural`, `fr-CA-AntoineNeural`; Metropolitan: `fr-FR-DeniseNeural`, `fr-FR-HenriNeural`) — Phase 3.
- **Mobile/iOS**: the HTML site is responsive; additionally export EPUB via Pandoc for offline iBooks/Kindle reading (Phase 6).

This guarantees zero drift across formats.

### 0.5 Repository structure (create on first run)

```
tcf-canada-prep/
├── README.md                          # public-facing entry
├── ROADMAP.md                         # the 12-week study plan
├── AUDIT.md                           # running list of unresolved native-review items
├── CHANGELOG.md
├── content/
│   ├── 00_diagnostic/                 # baseline test + score interpretation
│   ├── 01_grammar/                    # graded grammar reference (B1→C2)
│   │   ├── b1_consolidation/
│   │   ├── b2_core/
│   │   ├── c1_advanced/
│   │   └── c2_polish/
│   ├── 02_vocabulary/                 # frequency-ranked + thematic
│   ├── 03_listening/                  # transcripts + audio + MCQ
│   ├── 04_reading/                    # texts + MCQ
│   ├── 05_writing/                    # 3 tâches × graded prompts + model answers
│   ├── 06_speaking/                   # 3 tâches × graded prompts + model monologues + rubrics
│   ├── 07_mock_exams/                 # full 2h47 simulations
│   ├── 08_cheatsheets/                # one-pagers per skill
│   ├── 09_strategy/                   # exam-day tactics, time management, error recovery
│   └── 10_canada_culture/             # NCLC-relevant cultural literacy
├── flashcards/                        # Anki source (.md → .apkg via build)
├── audio/                             # TTS output (.mp3), gitignored, regenerable
├── site/                              # MkDocs build output, gitignored
├── pdf/                               # Pandoc/LaTeX build output, gitignored
├── tools/
│   ├── build_site.py
│   ├── build_pdf.py
│   ├── build_anki.py
│   ├── build_audio.py
│   ├── audit_french.py                # the adversarial reviewer pass
│   ├── score_writing.py               # rubric-based self-scoring tool
│   └── score_speaking.py              # whisper transcription + rubric
├── tests/                             # pytest for build pipeline & content validators
├── pyproject.toml
├── mkdocs.yml
├── latex/
│   └── tcf-template.tex
└── .github/workflows/build.yml        # CI: build all formats, run audits
```

### 0.6 Execution loop (think → design → code → audit → iterate)

For every phase:
1. **Think** (in `<reasoning>` blocks in your output, not in the repo): restate the phase goal in your own words, list 3–5 risks, list dependencies on prior phases.
2. **Design**: produce a `PHASE_N_DESIGN.md` in the repo root with: scope, deliverables, file inventory, acceptance criteria, audit checklist. Wait for the design to be readable before writing content.
3. **Code/author**: produce the actual content + tools.
4. **Audit**: run the adversarial reviewer pass (`tools/audit_french.py` + manual `<!-- AUDIT -->` sweep). Generate `PHASE_N_AUDIT.md` listing every issue found, severity (blocker/major/minor), and resolution.
5. **Evaluate**: run the build pipeline; verify all formats compile; spot-check 5 random files; verify acceptance criteria. Generate `PHASE_N_EVAL.md`.
6. **Iterate**: fix blockers + majors before declaring the phase done. Minors go to `BACKLOG.md`.

Do not start phase N+1 until phase N has a green eval report.

---

## 1. Phase map

| Phase | File | One-line goal |
|---|---|---|
| 0 | `01_PROJECT_CONTEXT.md` | Internalise TCF format, scoring, learner profile, target |
| 1 | `02_PHASE_1_FOUNDATION.md` | Repo scaffolding, build pipeline, diagnostic test, study plan |
| 2 | `03_PHASE_2_GRAMMAR.md` | Graded grammar reference B1→C2 with audited examples |
| 3 | `04_PHASE_3_VOCAB_LISTENING.md` | Frequency lists, thematic vocab, Anki, TTS audio, listening bank |
| 4 | `05_PHASE_4_READING.md` | Reading bank: authentic-style texts + MCQ across all 6 CEFR levels |
| 5 | `06_PHASE_5_WRITING.md` | 3-tâche writing system: prompts, templates, model answers, rubrics |
| 6 | `07_PHASE_6_SPEAKING.md` | 3-tâche speaking system: prompts, models, rubrics, self-scoring |
| 7 | `08_PHASE_7_MOCKS_STRATEGY.md` | Mock exams, cheatsheets, exam-day strategy, error-recovery |
| 8 | `09_PHASE_8_LAUNCH.md` | Multi-format builds, CI, final QA, learner onboarding flow |

Each phase file is self-contained: it defines its scope, inputs, outputs, acceptance criteria, audit checklist, and evaluation rubric. **Read the phase file in full before starting the phase.**

---

## 2. Operating principles (apply to every phase)

1. **Authenticity beats volume.** 200 audited B2 sentences > 2000 unaudited ones. Quality target: error rate < 1% per audit sample of 100 sentences.
2. **Every claim cited.** If you state "the TCF Canada has 39 listening questions," cite FEI's official page. Use BibTeX-style `[fei2024]` keys in a `references.bib` file.
3. **Symmetry across formats.** A learner reading the HTML site, the PDF book, or reviewing Anki cards should encounter the same numbered exercises with the same answer keys.
4. **Self-scorable.** Every exercise has an answer key. Every writing/speaking prompt has a rubric the learner can apply alone (and Phase 5/6 ship CLI scoring helpers).
5. **Time-boxed.** Every content unit is tagged with `estimated_minutes: N` in frontmatter. The 12-week plan in `ROADMAP.md` aggregates these to ~14 hours/week (2 hours/day).
6. **Spaced repetition is the spine.** All vocabulary, all collocations, all grammar pattern triggers flow into Anki with `i+1` ordering (one new element per card, the rest known).
7. **Active output bias at C1+.** From week 5 onward, daily production (1 written paragraph + 5-minute spoken monologue, both self-corrected against rubrics) outweighs passive input.
8. **Quebec ≠ France calibration.** TCF Canada uses both registers in listening; the learner must recognise both but is not required to produce Quebec-specific forms. Tag every audio file with `register: france | quebec | mixed`.
9. **Refuse to invent.** If you do not know whether a French expression is natural, mark it `confidence: low` and move on. Better to ship 800 confident items than 1200 with 200 errors.

---

## 3. What you should output for each phase, in order

```
PHASE_N_DESIGN.md       ← before any content
<content files>          ← the actual deliverables
PHASE_N_AUDIT.md         ← what you found in the adversarial pass
PHASE_N_EVAL.md          ← acceptance criteria check, build status, sample QA
```

Then summarise in chat: "Phase N complete. Blockers: 0. Majors: X (resolved). Minors deferred to BACKLOG: Y. Proceeding to Phase N+1." and stop for user confirmation if the user has not pre-authorised continuous execution.

---

## 4. Tone & metacognition

- You are not a cheerleader. You are a senior curriculum designer + a paranoid linguist + a build engineer.
- Surface uncertainty. When you don't know if a sentence is natural, say so in the audit.
- Prefer fewer, better files over more, mediocre files.
- The learner's time is the scarcest resource. Every page must justify its existence in score-points-per-minute-of-study.

---

## 5. Begin

Open `01_PROJECT_CONTEXT.md` and proceed.

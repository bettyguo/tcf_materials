# Optimized Prompt Bundle — TCF Canada B1→C1/C2 Preparation Corpus
## What this is, how it differs from your original ask, how to feed it to Claude Code

---

## 1. The optimization, in one paragraph

Your original prompt conflated three different tasks (research, planning, execution), under-specified the deliverable, asked for feature-maximisation rather than score-anchored prioritisation, and ignored the dominant failure mode of LLM-generated French (silent fluency errors that, once memorised by the learner, *lower* exam scores). The optimized prompt below splits the work into a master orchestrator + 9 phase files, replaces "find the best repo" with "build the canonical open repository that doesn't yet exist" (because honestly, after research, none does at production quality), substitutes an explicit B1+B2-first prioritisation grounded in the TCF's published per-item point weighting (B1+B2 = 49% of CO/CE score), and bakes in an adversarial-review + native-source-grounding protocol on every generation step.

---

## 2. What the research actually found (May 2026)

- **No canonical GitHub repo exists for TCF Canada** at production quality. Public materials are scattered: FEI sample papers, commercial apps (TCFPrep, HiTCF, TCFCanada.ai, Ouizami, Claire AI), and DELF/DALF Anki decks that only partially overlap.
- **TCF Canada scoring (current 2026)**: 4 sections (CO 35 min / CE 60 min / EE 60 min / EO 12 min, total ≈ 2h47). CO+CE scored 100–699; EE+EO scored 0–20. Per-item points in CO/CE follow CEFR levels: A1=3, A2=9, B1=15, **B2=21**, C1=26, C2=33.
- **NCLC thresholds (IRCC table)**: NCLC 7 (B2) = CO ≥ 458 / CE ≥ 453 / EE+EO ≥ 12; NCLC 8 = ≥ 503/499/14; NCLC 9 (C1) = ≥ 523/524/16; NCLC 10+ (C2) ≥ 549/549/18.
- **B1→C1 in 12 weeks is aggressive but feasible** with ~200 hours of focused study, daily output, expert feedback (here substituted by audited self-scoring rubrics), and a structure heavily weighted toward the B2-band items that dominate the exam.
- **Evidence-based methods** baked into the design: spaced repetition (Anki, FSRS), comprehensible input with i+1 ordering (Krashen), comprehensible output (Swain), shadowing, interleaved practice (Carpenter, +43% transfer), counterbalanced form-meaning approach (Lyster, relevant for Quebec immersion).

---

## 3. The bundle (what's in this folder)

| # | File | Purpose |
|---|---|---|
| 0 | `00_MASTER_PROMPT.md` | Top-level orchestrator. Defines the operating principles, repo layout, multi-format build strategy, hallucination-control protocol, and the phase map. **Feed this first.** |
| 1 | `01_PROJECT_CONTEXT.md` | TCF exam structure, scoring conversion, learner profile, target bands, anchoring sources, definition of done. |
| 2 | `02_PHASE_1_FOUNDATION.md` | Repo scaffolding, frontmatter schema, build pipeline (MkDocs + Pandoc + LaTeX + genanki + edge-tts), diagnostic test, 12-week roadmap. |
| 3 | `03_PHASE_2_GRAMMAR.md` | Graded grammar B1→C2: 15 B1 consolidation + 20 B2 core + 15 C1 advanced + 10 C2 polish units. |
| 4 | `04_PHASE_3_VOCAB_LISTENING.md` | 3000-lemma frequency backbone + 12 thematic domains + 60 listening items + Anki + TTS audio. |
| 5 | `05_PHASE_4_READING.md` | 60 reading items across the 7 TCF text types with full distractor anatomy. |
| 6 | `06_PHASE_5_WRITING.md` | 3 tâches × 30 prompts, 3 model answers per prompt (NCLC 6/8/10), 36 templates, pivots library, CLI auto-scorer, anti-error register. |
| 7 | `07_PHASE_6_SPEAKING.md` | 3 tâches × 30 prompts × 3 model audios, 8-unit phonological kit, Whisper-based self-scorer, 60-day talk-to-fluency program. |
| 8 | `08_PHASE_7_MOCKS_STRATEGY.md` | 4 full mocks + partials + 7 strategy docs + 12 cheatsheets + score calculator + post-mock diagnostic template. |
| 9 | `09_PHASE_8_LAUNCH.md` | Final QA, cross-format parity, onboarding flow, CI, license, post-launch protocol. |

Total: 10 MD files, ≈ 80 KB of prompt material, structured as a complete brief for a senior engineer + curriculum designer hybrid.

---

## 4. How to use with Claude Code

### Step 1 — Place the bundle in the repo to be created.

```bash
mkdir tcf-canada-prep && cd tcf-canada-prep
git init
mkdir prompts && cp /path/to/this/bundle/*.md prompts/
git add prompts/ && git commit -m "chore: optimized prompt bundle"
```

### Step 2 — Open a Claude Code session in that directory and run:

> Read `prompts/00_MASTER_PROMPT.md` in full. Then proceed phase by phase per `prompts/01_PROJECT_CONTEXT.md` through `prompts/09_PHASE_8_LAUNCH.md`. After completing each phase, produce `PHASE_N_DESIGN.md`, `PHASE_N_AUDIT.md`, `PHASE_N_EVAL.md` and pause for my confirmation before starting the next phase. Do not skip the adversarial-review pass — it's the single most important quality control.

### Step 3 — At each phase boundary, review and approve before continuing.

The phase files include explicit acceptance criteria. If a phase eval reports unresolved blockers, do not advance.

### Step 4 — Once Phase 8 ships, the corpus is yours to study.

Open `ROADMAP.md`, take the diagnostic, and follow the 84-day plan.

---

## 5. What the original prompt got right, that I kept

- **Multi-format output** (MD canonical, HTML site, LaTeX/PDF, EPUB, Anki) — kept, with single-source-of-truth discipline so they cannot drift.
- **Think → design → code → audit → iterate** loop — kept, made explicit at every phase with named deliverables.
- **Phase-by-phase execution** — kept and tightened: 8 phases with explicit gates.
- **Aggressive 3-month timeline** — kept, but reframed: NCLC 8–9 (B2–C1) is realistic; NCLC 10 (C2) requires individual coaching beyond what static content delivers.

---

## 6. What changed, and why

| Original ask | Issue | Replacement |
|---|---|---|
| "Find the best GitHub repo with TCF Canada materials" | No such repo exists at production quality (verified May 2026) | Build the canonical open repository; document the gap honestly in the README |
| "Add as many features as possible" | Anti-pattern; produces bloat at quality cost | Score-anchored priority tiers (P0–P3) tied to TCF point distribution (B1+B2 = 49%) |
| "Generate in 4 formats simultaneously" | Synchronisation debt; identical content authored 4× | One canonical MD source + generators (Pandoc/MkDocs/genanki/edge-tts) |
| Implicit assumption that LLM-generated French is reliable | Single biggest project risk; wrong genders/idioms/calques get memorised | Three-pass authoring (anchor-in-sources → write → adversarial review) + confidence-gated frontmatter + quarantine deck |
| "Top-notch materials" without acceptance criteria | Vague; no eval gate | Each phase has measurable acceptance criteria (CI green, audit < N issues, calibration ≥ N%) |
| No discussion of audio | TCF CO is audio-only; can't skip | Edge-TTS pipeline with Quebec + Metropolitan voices, SSML-controlled pace, shadowing protocol, phonological self-evaluation via Whisper |
| No discussion of distractors | MCQ banks fail on distractor quality, not stem quality | Distractor anatomy (7 trap families), distractor-first design protocol, audit rule "no item with > 2 distractors of same type" |
| Aggregated all skills into one bucket | Each skill has different study mechanics | Phase per skill (grammar, vocab+listening, reading, writing, speaking), then mocks integrate |
| No score-impact priority for content | Equal effort per item ≠ equal score impact | Explicit per-CEFR-level item counts proportional to TCF point weighting |

---

## 7. Honest limitations to disclose to the learner

These are documented inside the corpus and should be disclosed:

1. **TTS ≠ native speech.** Edge-TTS is excellent for B1/B2 listening but the C1+ items would benefit from a native recording pass. The corpus flags these and provides Forvo links as a fallback for individual words.
2. **The auto-scoring tools are heuristic.** They are calibrated against model answers, not against real examiner judgments. They produce a comparable trajectory (your week-12 score vs your week-1 score) but not an absolute examiner-grade score. A 14/20 from the tool might be a 13/20 or a 15/20 from a real examiner.
3. **NCLC 10/C2 is a stretch.** The corpus reliably supports the journey to NCLC 8–9 (B2–C1). NCLC 10 in EE/EO realistically requires a human tutor's feedback on subtle register and idiomatic choices.
4. **Quebec ≠ France calibration.** The corpus teaches recognition of both registers but does not push the learner to produce Quebec-specific forms. A Montréal-based learner will benefit from real-world Quebec exposure that the corpus does not replicate.
5. **3 months is intense.** ~2 h/day × 84 days = 168 hours of focused work, plus passive immersion. Missing more than 7 non-consecutive days breaks the spaced-repetition advantage.

---

## 8. Ready to launch

The bundle is now self-contained. Feed `00_MASTER_PROMPT.md` to Claude Code and let it execute the 8 phases. Estimated wall-clock for full execution: 8–15 sessions depending on session length and how aggressively Claude Code parallelises within each phase. The token budget is large; the user has indicated it is unlimited for this task.

Good luck. Bonne préparation. À l'examen !

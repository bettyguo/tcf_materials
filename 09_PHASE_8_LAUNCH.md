# 09 — PHASE 8: LAUNCH
## Final QA · packaging · onboarding · public release

> **Output: shipped MD repo + HTML site + PDF book + per-section PDFs + EPUB + Anki .apkg + onboarding flow. Acceptance gate: a learner clones the repo and is on Day 1 of study within 30 minutes; CI green; all audits resolved.**

---

## 1. Goal

Make the corpus actually launchable. Three concerns:

1. **Cross-format parity**: a learner opening the PDF book on iPad sees the same numbered exercises with the same answer keys as a learner browsing the HTML site on a laptop.
2. **Onboarding**: 15 minutes from clone to "I know what to do on Day 1."
3. **Final audit**: a last adversarial sweep of randomly-sampled content across all phases, plus the integration tests (cross-references, broken links, audio coverage).

---

## 2. Cross-format parity checklist

### 2.1 Numbering & IDs

- Every content item has a stable `id:` from Phase 1.
- Every exercise within a file is numbered consistently (1.1, 1.2, …).
- Every answer key entry references the item by its full path (id + exercise number).

### 2.2 Markdown → HTML

- All math/IPA renders (MkDocs Material + the `pymdownx.arithmatex` extension).
- All audio inline-playable (HTML5 `<audio>` with fallback download link).
- All cross-links resolve (no `404` on `make site` + linkcheck).
- Search index is in French (MkDocs Material `lunr` language: `fr`).
- The 12-week roadmap is the landing page on the site.

### 2.3 Markdown → PDF (monolithic book)

- Pandoc + custom LaTeX template (from Phase 1).
- Audio links replaced by a callout box: « 🔊 Cet exercice nécessite l'audio. Disponible sur le site web ou dans le dossier `audio/<id>.mp3`. »
- Page count target: ≤ 800 pages (a book, not a catalogue).
- French typography: `«\,…\,»`, NBSP before `: ; ? ! »`, hyphenation patterns from `babel-french`.

### 2.4 Markdown → per-section PDFs

Eight booklets for portability:
- `grammar_b1_to_c2.pdf`
- `vocabulary_master.pdf`
- `listening_bank.pdf`
- `reading_bank.pdf`
- `writing_playbook.pdf`
- `speaking_playbook.pdf`
- `mocks_and_strategy.pdf`
- `cheatsheets.pdf`

### 2.5 Markdown → EPUB

Pandoc EPUB3 output. Audio embedded where EPUB3 readers support it; otherwise external links.

### 2.6 Markdown → Anki

Final deck count: ~1500 vocabulary cards + ~300 sentence-pattern cards = ~1800 audited cards. Quarantine deck for medium-confidence items kept separately.

---

## 3. Final audit sweep

The most consequential check of the project. You (Claude Code) perform:

### 3.1 Random content sample (50 items)

Stratified random sample across all phases. For each item:
- Re-do the exercise without looking at the key. If you (Claude Code) cannot defend the published answer against a plausible alternative, fix the item.
- Verify the audio matches the transcript exactly (use `whisper` to re-transcribe a random 5 items; compare).
- Verify the lexical content (random 3 entries) against TLFi or Petit Robert.
- Verify the cross-references (random 5 `prerequisites:` chains) resolve to existing files.

### 3.2 Holistic skill checks

- **Listening**: play 3 random items at TCF-speed; verify TTS is not too unnaturally clean to be useful. (If your TTS is *too* clean, the learner will collapse on exam day when faced with real-noise audio.) Recommendation: optionally mix in a faint background-noise track for harder items, controlled via `audio.background_noise: low|medium`.
- **Reading**: render 3 random C1 texts in PDF; check density visually feels C1.
- **Writing**: pick 3 model answers at NCLC 8; verify each could honestly score 14–15/20 by a TCF examiner.
- **Speaking**: pick 3 NCLC 8 audio models; verify each sounds like a confident B2 monologue (not robotic TTS).
- **Mocks**: simulate one full mock yourself end-to-end; report timing, fatigue points, item-quality issues.

### 3.3 Cross-cutting concerns

- **Quebec/France consistency**: scan for register tags vs content register; e.g., a `register: france` file should not say *char* for *voiture*; a `register: quebec` file is allowed to.
- **Sources cited**: every claim that depends on a non-obvious fact has a citation. Random 10 claims → 10 citations resolve to a real, locatable source.
- **No copyrighted text reproduced**: verbatim-match check of every text > 50 words against indexed sources; flag any near-match for rewriting.
- **License**: the project ships under a permissive license (CC BY-SA 4.0 for content, MIT for tools), and the LICENSE file is committed.

---

## 4. Onboarding flow

### 4.1 `README.md` (public-facing)

Sections:
- 60-second pitch (what this is, who it's for, what it's not).
- Quickstart (5 commands → Day 1).
- The 12-week plan (link to ROADMAP).
- Format options (HTML / PDF / EPUB / Anki) with download links.
- Honest disclaimers:
  - This is a self-administered prep corpus, not a replacement for a tutor at C1+.
  - Models are TTS-generated where noted; native recordings are flagged.
  - The auto-scoring tools are heuristic, not examiner-grade.
  - The corpus targets NCLC 7–9 reliably; NCLC 10+ requires individual coaching.
- Contributing (link to CONTRIBUTING.md).
- License + acknowledgements.

### 4.2 `ROADMAP.md` (the day-by-day plan from Phase 1)

Now finalised: every day's file references point to actual files, not stubs.

### 4.3 First-day experience

A `content/00_start_here.md` that the learner reads on Day 0:
1. Take the diagnostic (90 min). Record your scores.
2. Read the score interpretation. Note any sub-skill > 1 NCLC band below your strongest skill.
3. Apply the rebalance: edit `ROADMAP.md` per the diagnostic instructions.
4. Install Anki + import the deck. Set new-cards/day to 20, reviews/day to ≥ 100.
5. Schedule your exam date — 12 weeks from today, ±1 week.
6. Set the daily 2-hour study block in your calendar.
7. Day 1 begins tomorrow with `roadmap/day_01.md`.

---

## 5. CI final state

`.github/workflows/build.yml`:
- Lint: `ruff` on Python; `prettier --check` on Markdown; custom validator on frontmatter.
- Tests: `pytest`.
- Audit: `tools/audit_french.py` — fails the build on schema errors or unresolved blockers.
- Build: site, PDFs, EPUB, Anki.
- Artifact upload: PDFs and APKG.
- Deploy: GitHub Pages on push to main.
- Optional: a scheduled weekly run that re-verifies all source links still resolve.

---

## 6. Repository hygiene

- `CHANGELOG.md` populated with the 8-phase history.
- `BACKLOG.md` with deferred minor items (these are P3/P4 features the user can add later without blocking launch).
- `CONTRIBUTORS.md`.
- `.gitignore` covering build outputs (`site/`, `pdf/`, `audio/`, `.venv/`).
- A `examples/` folder showing a single-domain "mini-corpus" (e.g., just the *environnement* domain, end-to-end) for new contributors to study the conventions.

---

## 7. Acceptance criteria (project shipping bar)

- [ ] All 8 phases evaluated green.
- [ ] CI green on the main branch.
- [ ] `make all` succeeds on a clean clone in < 20 minutes (excluding audio: < 5 min).
- [ ] PDF book < 30 MB; per-section booklets < 5 MB each; APKG < 50 MB.
- [ ] HTML site loads `< 2 s` on first visit (lazy-loaded audio).
- [ ] EPUB validates with `epubcheck`.
- [ ] A self-administered Mock #4 by you (Claude Code, role-playing the candidate) yields:
  - CO ≥ 503 (NCLC 8 lower bound).
  - CE ≥ 499 (NCLC 8).
  - EE ≥ 14 (B2, NCLC 7+).
  - EO ≥ 14 (B2, NCLC 7+).
  *(You, Claude Code, simulating a strong B2/C1 candidate, hitting these is evidence the mocks are calibrated.)*
- [ ] AUDIT.md has < 5 unresolved low-confidence items per 1000 lines of French content.

---

## 8. Final evaluation (`PHASE_8_EVAL.md`)

Produce a concise launch summary:
- Total content lines, files, audio runtime, Anki cards.
- Coverage matrix: skill × CEFR level × count.
- Diff vs initial plan (what was added / deferred).
- Known limitations (TTS quality on rare phonemes; lack of native recordings for some EO models; etc.).
- Suggested v0.2 priorities (e.g., a tutor-pairing module, a Telegram bot for daily reminders — out of scope for v0.1 but recorded here).

---

## 9. Post-launch protocol (out-of-scope but documented)

For when the learner reaches week 6 or beyond:
- Open `feedback.md` with the learner's mock scores; you can re-analyse and propose targeted item additions on demand.
- If a mock score plateaus, the learner reports the per-type error tally; you generate a custom 10-item supplementary set.
- If the learner identifies a specific weak structure (e.g., "I still can't reliably produce the *quoi qu'il en soit* construction"), you generate a custom drill file.

These represent the "long tail" of the project. The base corpus does not depend on them; they are the human-in-the-loop interventions that, if used, can push NCLC 8 → NCLC 9/10.

---

## 10. Done

When this phase's eval is green, the project ships. The learner can now study.

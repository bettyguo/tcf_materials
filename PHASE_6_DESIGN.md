---
title: "PHASE 6 — DESIGN"
date: 2026-05-28
phase: 6
status: executing
---

# PHASE 6 — DESIGN
## Speaking bank (EO) — 3 tâches, model audio, phonological kit, Whisper self-scorer

> Status: **design contract — proceeding to execution per standing autonomous-execution authorization** (see [feedback memory](../../../Users/jacobwu/.claude/projects/c--workspace-tcf-materials/memory/feedback_autonomous_execution.md)).
> Scope reference: [07_PHASE_6_SPEAKING.md](07_PHASE_6_SPEAKING.md).
> Governance: [00_MASTER_PROMPT.md §0.6](00_MASTER_PROMPT.md) (Think → Design → Code → Audit → Eval → Iterate).
> Companions: [PHASE_5_DESIGN.md](PHASE_5_DESIGN.md) (immediate predecessor — rubric, pivots, anti-error, scorer **all** carry forward), [PHASE_5_EVAL.md](PHASE_5_EVAL.md).
> Author: Claude Code. Date: 2026-05-28.

---

## 1. Restated goal

Produce the **speaking bank** that anchors NCLC 7→9 on the EO side of the exam, plus the supporting phonological-training infrastructure (the area where adult B1 learners most under-score against their actual ability per [07_PHASE_6_SPEAKING.md §1](07_PHASE_6_SPEAKING.md)).

Per [07_PHASE_6_SPEAKING.md §2–8](07_PHASE_6_SPEAKING.md), six top-level deliverables:

1. **Operationalised EO rubric** — `content/06_speaking/00_rubric.md`. Mirrors the EE rubric ([05_writing/00_rubric.md](content/05_writing/00_rubric.md)) but swaps C4 *morphosyntaxe* in EE for `EO-C4 contrôle phonologique`; the other 3 critères transfer 1:1 with "under fluency pressure" rewording per spec §2.
2. **90 prompts** — 30 per tâche (T1 questions, T2 monologue descriptif, T3 monologue argumentatif).
3. **270 model transcripts** — 3 per prompt at NCLC 6 / 8 / 10 bands, each carrying an annotated phonological-prosodic overlay. Audio generation via `tools/build_audio.py` is queued (audio.required + ## SCRIPT blocks); per spec §8 the 270 audio files ship when the build runs (TTS is reproducible from the script).
4. **Phonological training kit** — 8 units in `content/06_speaking/00_phonology/` (vocalique, consonantique, liaisons obligatoires/interdites/facultatives = 3 units, enchaînement, schwa instable, prosodie, shadowing protocole, auto-évaluation phonologique). The single biggest score lever on EO-C4 per spec §1.
5. **Whisper self-scoring tool** — `tools/score_speaking.py` full implementation, replacing the 35-line Phase 1 stub. Reuses ≥ 80% of `tools/score_writing.py`'s deterministic metric pipeline; adds speech-specific metrics (WPM, disfluency proxy, pause ratio) when an audio file is provided; falls back to transcript-only mode when audio is absent.
6. **60-day "talk-yourself-to-fluency" program** — `content/06_speaking/00_program.md`. Overlaps with weeks 5–12 of [ROADMAP.md](ROADMAP.md).

Out of scope for Phase 6: mock-running interpretation (Phase 7 will assemble the EO sub-section of the full mock from prompts tagged `usable_in_mock: true`); any new reading or grammar items; native-speaker re-recordings of model audio (TTS first, professional VO is a Phase 8 enhancement).

---

## 2. Top risks (mitigations)

| # | Risk | Mitigation |
|---|---|---|
| R1 | **Hallucinated phonology**. Phonetic claims are dense and easy to get wrong: a chart with the wrong nasal vowel range, an "obligatory" liaison rule with the wrong exceptions, a minimal pair that doesn't actually contrast in standard French. Memorised errors are particularly hard to unlearn because phonology is internalised below conscious correction. | Same protocol as Phase 3 grounding-first: every phonological-rule file cites Léon (*Phonétisme et prononciation du français*, Nathan), Tranel (*The Sounds of French*, CUP) and the IPA chart with `sources:` frontmatter. Minimal-pair lists are cross-checked against a corpus reference (Wiktionnaire fr.) before audit-clearance. Audit-side: a `phonology_check` flag warns when a unit ships without ≥ 2 authoritative `sources:`. |
| R2 | **TTS mis-renders critical phonological contrasts**. Edge TTS may collapse the /ø/ vs /œ/ distinction (e.g., *peu* vs *peur*), or render /ʁ/ uniformly even when the unit teaches the apical-Quebec variant. A learner who shadows the audio internalises the TTS error. | Every phonology unit's audio is flagged in frontmatter with `audio.tts_caveat: <description>` when the synthesis is known to be lossy, and the unit's prose body redirects the learner to Forvo (forvo.com) for native-rendered minimal pairs. Spec §4.1 baseline. The audit `phonology_check` flag also requires this caveat for any unit listing minimal pairs. |
| R3 | **The Whisper scorer over-promises**. Same family as Phase 5 R2 — a single `/20` band from a heuristic tool reads as authoritative. Speech is noisier than writing: even a perfectly-spoken NCLC 10 monologue can confuse the scorer if Whisper mis-segments. | Lower calibration bar than EE per spec §8 (≥ 75 % vs EE ≥ 80 %). Every report header carries the `"estimation heuristique — pas un score d'examen"` disclaimer. The tool emits a *band* (NCLC 6 / 7-8 / 9 / 10), not a precise `/20`, and only when ≥3 of 4 criteria agree. When criteria disagree, the report says "calibration incertaine, voir [criterion]". When run without `--audio` (transcript-only), the report explicitly says `"mode texte seul — métriques phonologiques absentes"`. |
| R4 | **Whisper itself is a heavy dep**. Installing `openai-whisper` or `faster-whisper` pulls torch, ffmpeg, model weights (~1.5 GB for `large-v3`). The learner's Windows-shell environment may not have GPU; CPU large-v3 is slow. | The tool degrades gracefully: it works in **transcript-only mode** with no Whisper installed (the user pastes their transcript into a markdown file under `## Réponse` and runs the scorer — same UX as `score_writing.py`). If Whisper is installed, an optional `--audio` flag transcribes first. The README and the score_speaking docstring document both modes. Default model is `small` (~250 MB) for the audio path; the user can opt into `large-v3` via env var for precision. |
| R5 | **Register slip in model transcripts**. Spoken French naturally permits more familier features (drop of *ne*, *on* for *nous*, *t'as* contraction) than written French. An NCLC 10 EO monologue **should** show some of these in T1/T2 to sound natural — but T3 (argumentative) needs the same formel register as EE T3. Mixing them within a single monologue is a register break. | Each tâche carries an explicit `register_required:` field (T1: `neutre`, T2: `neutre`, T3: `formel`) matching spec §3.1/3.2/3.3 register notes. The anti-error register `06_speaking/00_anti_error.md` §1 enumerates 12 "EO register pitfalls" (e.g., dropping *ne* is allowed in T1/T2 but breaks T3 register). |
| R6 | **The 270 model transcripts amplify the Phase 5 R6 lift**: structurally similar across siblings, quality collapse invisible to metrics. Plus the audio-generation overhead: 270 MP3 files = ~30 min of TTS calls per full rebuild, and any text edit invalidates the cached audio. | Same tiered execution as Phase 5: **pilot batch** (3 prompts × 3 models per tâche = 27 model transcripts) gets the most authoring care; **bulk batch** uses pivots + templates + anti-error as guardrails. Audio is lazily generated — `audio.required: false` on prompts during pilot phase; flip to `true` only when transcripts clear native review. This keeps the audio queue manageable and avoids regenerating MP3s that will be edited. |
| R7 | **The whole EO is "monologue under timer"**. A learner who only ever practices reading model transcripts aloud never builds the unscripted-monologue muscle. The corpus must include a *protocol* that forces output, not just reference material. | The 60-day program (`00_program.md`) is the protocol. It schedules daily 5-min monologue + record + transcribe + score iterations with explicit progression (Day 1–7 build stamina, Day 8–14 connector insertion, Day 15–28 T2 timed, Day 29–42 T3 timed + follow-up, Day 43–60 mixed under exam conditions). The scoring tool's repetition penalty fires hard against pivot reuse, forcing rotation. Spec §6. |

---

## 3. Schema and tooling extensions

### 3.1 Frontmatter — reuse Phase 5, no new fields

Speaking items reuse the existing schema:
- `task: 1|2|3` — tâche identifier (already present from Phase 5).
- `target_words` — re-purposed for *target monologue word count at speaking pace* (T1 ≈ 200 wpm × 1.5 min ≈ 200 words at NCLC 8; T2 ≈ 130 wpm × 3 min ≈ 390 words; T3 ≈ 130 wpm × 5 min ≈ 650 words). These are upper bounds — the score tool penalises *under*-shoots more than over-shoots since EO under-utilisation is the dominant failure mode.
- `register_required` — T1/T2 default `neutre`; T3 `formel`.
- `audio.required` — `false` during pilot phase per R6; flipped on at clearance.
- `usable_in_mock: bool` — **NEW (boolean, default false)**. Marks a prompt as candidate for the Phase 7 EO sub-section of the full mock. Mirrors the existing `usable_as_stimulus` field on reading items.

`usable_in_mock` is the only new field. Mirrors `usable_as_stimulus` exactly (default false, opt-in, no validation beyond the boolean type).

### 3.2 New tool: `tools/score_speaking.py` (full implementation)

The current stub (35 lines, prints the rubric) is replaced end-to-end.

**Architecture (~500 LOC; reuses ~70 % of `score_writing.py` via direct import)**:

```
tools/
├── score_speaking.py            # CLI entry + speech-specific metrics + Whisper glue
├── score_writing.py             # (unchanged) — measure_text, score_metrics, build_feedback reused
└── data/
    ├── fr_connectors.yaml       # (unchanged) — same connector inventory
    ├── fr_tense_markers.yaml    # (unchanged)
    ├── fr_pivot_phrases.yaml    # (unchanged)
    └── fr_disfluencies.yaml     # NEW — French filler tokens (euh, ben, hein, bah, voilà) + repair markers
```

**Metric pipeline (deterministic; transcript-driven, audio-augmented)**:

Transcript-only mode (no `--audio`):
1. Extract the transcript under `## Réponse` (analogous to EE drafts) or `## Modèle NCLC N — Transcript` (analogous to EE model answers).
2. Reuse `score_writing.measure_text(...)` for: word count, sentence count, TTR, connector inventory, tense inventory, subordination rate, repetition, anglicisms, pivot phrases. **All criteria EO-C1/C2/C3 reuse the EE C1/C2/C3 logic verbatim with task-specific thresholds adjusted for speech (slightly lower TTR target since fillers count as repetitions).**
3. EO-specific disfluency proxy: count tokens matching `fr_disfluencies.yaml` (*euh, ben, hein, bah, voilà, du coup, en fait*) per 100 words. Heuristic: < 2/100 ≈ NCLC 10; 2–4 ≈ NCLC 8; 4–8 ≈ NCLC 6; > 8 ≈ < NCLC 6.
4. EO-C4 *contrôle phonologique* (transcript-only): heuristic proxy — count systematic Whisper mis-transcriptions in the transcript that pattern-match common phoneme confusions (when the user supplies `--reference reference.md`, the tool diff-aligns the user transcript against the reference and flags substitutions that map to known phoneme confusion classes per the anti-error register §3). When no reference is given, EO-C4 in transcript-only mode is **conservative**: the tool reports `"C4 non évalué en mode texte seul"` rather than a number.

Audio-augmented mode (`--audio recording.{m4a,wav,mp3}`):
5. Whisper transcription: `faster-whisper` if installed (preferred — 4× faster than `openai-whisper`); fall back to `openai-whisper`. Default model `small`; opt into `large-v3` via `TCF_WHISPER_MODEL=large-v3` env var.
6. Whisper word-level timestamps yield: speaking rate (WPM), longest pause, ratio of speech to silence, mean inter-word pause.
7. EO-C4 audio metrics: pacing report (WPM target ≈ 110–160 for B2 monologue; < 90 reads as hesitant; > 180 reads as nervous-fast); long-pause count (pauses > 1.5 s).
8. When the user supplies the prompt file as `--reference content/06_speaking/tache2/02_eo-t2-002.md`, the tool also diff-aligns the Whisper transcript against the NCLC 8 model transcript and reports phoneme-confusion candidates (per §4 in the anti-error register).

**Calibration mode** (`--calibrate content/06_speaking/`): walks every prompt, scores each `## Modèle NCLC N — Transcript` block as text, and reports the heuristic-band-vs-labelled-band agreement. Gate: ≥ 75 % per spec §8 (lower than EE per R3).

**Quasi-rubric mapping (heuristic, transparent)** — per `tools/scoring_rules.md` extension (Phase 6 adds an §EO section):

| Criterion | Metrics consumed | Pass thresholds (B2 / C1) |
|---|---|---|
| EO-C1 Efficacité communicative | Word count vs target ±25 %, structural sentinels (T1: ≥ 4 questions; T2: opener+body+closer; T3: thesis-arg-arg-concession-refutation-close), register sentinels. | 4/5 = within target + structural sentinels all present |
| EO-C2 Étendue lexicale | TTR (relaxed –0.05 vs EE), distinct connectors, pivot count, anglicism count. | 4/5 = TTR ≥ 0.45 (B2) / 0.52 (C1), ≥ 2 pivots, ≤ 0 major anglicisms |
| EO-C3 Étendue morphosyntaxique | Tense diversity, subordination rate, subjunctive presence. | 4/5 = ≥ 4 tenses, ≥ 1.0 subord./sentence (lower than EE 1.2), ≥ 1 subjonctif |
| EO-C4 Contrôle phonologique | Disfluency proxy, WPM (if audio), long-pause count (if audio), reference-diff phoneme confusions (if audio + reference). | 4/5 = disfluencies < 4/100, WPM 110–160 (audio), 0 long pauses (audio) |

### 3.3 New tool: `tools/snapshot_phase6_ids.py`

Parallel to `snapshot_phase5_ids.py`, ~30 LOC, emits `content/06_speaking/_id_freeze.lock`.

### 3.4 CLI wiring

`tools/cli.py` gains `score-speaking <path> [--audio PATH] [--reference PATH] [--calibrate] [--json]` mirroring `score-writing`. Same graceful-missing-dep pattern: prints actionable install hint if Whisper is needed but absent.

---

## 4. ID numbering scheme (locked before authoring)

| Asset | Pattern | Width | Range |
|---|---|---|---|
| EO T1 prompt | `eo-t1-NNN` | 3 digits | `eo-t1-001` … `eo-t1-030` |
| EO T2 prompt | `eo-t2-NNN` | 3 digits | `eo-t2-001` … `eo-t2-030` |
| EO T3 prompt | `eo-t3-NNN` | 3 digits | `eo-t3-001` … `eo-t3-030` |
| Phonology unit | `eo-phono-NN` | 2 digits | `eo-phono-01` (vocalique) … `eo-phono-08` (auto-évaluation) |
| Rubric | `eo-rubric` | single | `eo-rubric` |
| Anti-error register | `eo-anti-error` | single | `eo-anti-error` |
| 60-day program | `eo-program` | single | `eo-program` |

`eo-` namespace is reserved exclusively for speaking. Phase 1 stub `speaking-index` is preserved (Phase 1 only shipped the section overview). No collisions with Phase 5 (`ee-*`).

---

## 5. File inventory (Phase 6 deliverables)

```
content/06_speaking/
├── .pages                                  # (new) ordering
├── index.md                                # (exists, extended) section overview
├── 00_rubric.md                            # (new) operationalised EO rubric
├── 00_anti_error.md                        # (new) ≥ 30 entries (speech-specific)
├── 00_program.md                           # (new) 60-day talk-yourself-to-fluency
├── 00_phonology/
│   ├── .pages
│   ├── index.md
│   ├── 01_vocalique.md                     # (new) 16 voyelles, minimal pairs
│   ├── 02_consonantique.md                 # (new) ~20 consonnes, /R/, voicing
│   ├── 03_liaisons_obligatoires.md         # (new)
│   ├── 04_liaisons_interdites.md           # (new)
│   ├── 05_liaisons_facultatives.md         # (new)
│   ├── 06_enchainement.md                  # (new)
│   ├── 07_schwa_instable.md                # (new)
│   └── 08_prosodie.md                      # (new)
│   └── (the spec's "shadowing protocol" §4.7 and "auto-évaluation phonologique" §4.8 are
│        integrated into 00_program.md §6 and §7 to avoid file proliferation — the
│        learner runs them as protocols, not as reference units)
├── tache1/                                 # 30 T1 prompts
│   ├── .pages
│   ├── _queue.md                           # (new) deferral queue
│   └── 01_eo-t1-001.md … 03_eo-t1-003.md   # pilot
├── tache2/                                 # 30 T2 prompts
│   ├── .pages
│   ├── _queue.md
│   └── 01_eo-t2-001.md … 03_eo-t2-003.md   # pilot
├── tache3/                                 # 30 T3 prompts
│   ├── .pages
│   ├── _queue.md
│   └── 01_eo-t3-001.md … 03_eo-t3-003.md   # pilot
└── _id_freeze.lock                         # emitted at EVAL clearance
```

**Estimated Phase 6 file count**: 9 pilot prompts + 8 phonology units + 1 rubric + 1 anti-error + 1 program + 1 phonology index + 3 queue files + 4 `.pages` + 1 lock = **~29 files**. Compare to Phase 5's 145 (full prompt build): the deferral is honest.

---

## 6. Per-prompt file structure (production format)

Mirrors EE per-prompt file structure with the audio-script addition.

````markdown
---
id: eo-t2-007
title: "EO Tâche 2 — Une expérience marquante de mobilité"
section: speaking
cefr: B2
nclc_target: 8
estimated_minutes: 15
register: france
task: 2
target_words: 400          # monologue word count at NCLC 8 pace
register_required: neutre
tags: [voyage, mobilité, monologue-descriptif]
prerequisites: [vocab-voyage-01, gram-b2-01]
audio:
  required: false           # flipped on at native-review clearance
audit:
  status: pending
  reviewer: claude-04
  confidence_overall: medium
  notes: "Phase 6 — auteur Claude ; revue native en attente."
---

# Tâche 2 — Une expérience marquante de mobilité

## Consigne (lue par l'examinateur)

[2–4 lignes de contexte + stimulus 4 puces + durée 3 min]

## Stratégie en 30 secondes (à mémoriser)

[Ouverture 10 s → 2 points développés 60+60 s → clôture 10–20 s]

## Modèle NCLC 6 — Transcript

[~280 words; 1 hesitation marker; mostly présent + passé composé; minimal connectors;
2–3 fillers tolerated]

## Modèle NCLC 8 — Transcript

[~370 words; 3 paragraphes audibles; PC + imparfait + plus-que-parfait; ≥ 4 connecteurs
distincts B2; subjonctif ≥ 1; structurally complete]

## Modèle NCLC 10 — Transcript

[~430 words; nominalisations; inversion stylée; conditionnel passé; aucun filler;
prosodie marquée par groupes rythmiques]

## Analyse phonologique des passages clefs

- Modèle NCLC 8, §2 — *« il faut que je revienne »* : déclencheur subjonctif après *il faut que*; le /vj/ doit être enchaîné, pas séparé. Schwa final de *revienne* tombable.
- Modèle NCLC 8, §3 — *« on est rentré épuisés »* : enchaînement *est-rentré* obligatoire; accord *épuisés* prononcé sans liaison avec *épuisés-mais*.
- Modèle NCLC 10, §1 — *« je m'en souviens encore »* : pronom *en* enchaîné; intonation montante interne, puis descente finale.
- [3–5 annotations par tâche]

## Examiner pushback (T3 uniquement) — anticipated follow-ups

(T1/T2: omitted)

[3 follow-ups + rehearsed replies for T3]

## Pièges fréquents

[3–5 pitfalls specific to the prompt]

## Banque de relance (réutilisable)

[3–4 fallback sentences when stuck mid-monologue]

## Lexique exporté en Anki

[5–8 entries]

## Cross-references

- Pivots : [ee-pivots-ouvrir](../../05_writing/00_pivots/01_ouvrir.md), etc.
- Phonologie : [phono-prosodie](../00_phonology/08_prosodie.md)
- Anti-erreurs liées : [§N](../00_anti_error.md#section-NN)

## SCRIPT

<<SPEAKER:F>>
[NCLC 8 model transcript, formatted for TTS — used by build_audio.py]
````

The `## SCRIPT` block is only synthesised when `audio.required: true`. During pilot phase, the block is present (so the script is review-ready) but `audio.required: false` keeps the build queue empty.

---

## 7. Authoring order (locked)

1. **Schema extension** (~1 h) — add `usable_in_mock: bool` to `tools/models.py`.
2. **Tooling spike** (~8 h) — `tools/score_speaking.py` full impl. per §3.2; `tools/data/fr_disfluencies.yaml`; scoring_rules.md §EO extension; `tools/snapshot_phase6_ids.py`; `tools/cli.py` wiring.
3. **Rubric file** (~2 h) — `content/06_speaking/00_rubric.md` operationalising spec §2.
4. **Anti-error register** (~3 h) — ≥ 30 entries focused on speech-specific pitfalls.
5. **8 phonology units** (~12 h) — vocalique, consonantique, 3 liaison files, enchaînement, schwa, prosodie. Authored in parallel via Workflow fan-out.
6. **60-day program** (~3 h) — `content/06_speaking/00_program.md`.
7. **Pilot batch — 9 prompts** (3 per tâche, ~12 h authoring; transcripts + script blocks + phono annotations). Items:
   - T1: `eo-t1-001` (administration), `eo-t1-002` (services médicaux), `eo-t1-003` (travail/candidature)
   - T2: `eo-t2-001` (expérience marquante), `eo-t2-002` (avantages/inconvénients), `eo-t2-003` (changements observés)
   - T3: `eo-t3-001` (IA générative, réutilise stimulus EE T3), `eo-t3-002` (transition écologique), `eo-t3-003` (télétravail)
8. **Bulk batch — remaining 81 prompts** — **deferred** with explicit queue files (`tache{1,2,3}/_queue.md`).
9. **Calibration pass** (~2 h) — `score_speaking.py --calibrate content/06_speaking/`; gate ≥ 75 % per spec §8.
10. **`PHASE_6_AUDIT.md`** — same shape as Phase 5.
11. **`PHASE_6_EVAL.md`** — same shape as Phase 5.
12. **ID freeze commit** — `python -m tools.snapshot_phase6_ids` → `content/06_speaking/_id_freeze.lock`.

Cumulative estimate: **~50 h tooling + author + audit** (lower than Phase 5's ~115 h because the rubric/anti-error/pivots all carry forward from Phase 5 and the audio is deferred).

### 7.bis Honest deferral posture

Per the Phase 4/5 EVAL precedent, bulk authoring in a single autonomous push prioritises **infrastructure + pilot completeness** over **bulk-batch completeness**. The realistic in-session deliverable:

- ✅ Schema, scoring tool, snapshot tool, CLI wiring — full.
- ✅ Rubric, anti-error register, 8 phonology units, 60-day program — full at documented counts.
- ✅ Pilot batch (9 prompts × 3 model transcripts = 27 model texts) — full with phonological annotations and TTS-ready ## SCRIPT blocks.
- 🟡 Bulk batch — 81 remaining prompts × 3 models = 243 model texts queued; not authored.
- 🟡 Audio MP3 generation — 27 audio files queued behind `audio.required: false` until native review of the pilot transcripts; flippable after EVAL.
- 🟡 Calibration on the model transcripts that exist (27 texts; smaller calibration set than EE's 27, so 75 % gate is harder to estimate — honest report).
- ✅ AUDIT/EVAL/freeze proceed on what is in place.

---

## 8. Audit pass — Phase 6 specifics

Extends the general audit with speaking-specific checks:

1. **Prompt distribution** — 30 prompts per tâche; T1/T2/T3 sub-distribution per spec §3.1/3.2/3.3 (pilot delivers a cross-section sample, queue files enumerate full distribution).
2. **Model-transcript band consistency** — heuristic-assigned NCLC band order matches labelled order (mirrors Phase 5 audit gap).
3. **Word-count compliance** — each model transcript within ±25 % of `target_words` (looser than EE ±20 % per R3 — speech is noisier).
4. **Cross-reference integrity** — every prompt links to ≥ 1 phonology unit + ≥ 1 pivot file + ≥ 1 anti-error entry.
5. **Phonology unit completeness** — every phonology unit has: ≥ 2 authoritative `sources:` (Léon, Tranel, IPA, Wiktionnaire); ≥ 1 minimal pair drill (vocalique/consonantique); `audio.tts_caveat` field documenting known TTS limits.
6. **SCRIPT block presence** — every prompt with `audio.required: true` has a parseable `## SCRIPT` block; the build_audio.py invariant holds.
7. **Register flag consistency** — T3 prompts honour `register_required: formel`; T1/T2 prompts assume `neutre`. The disfluency proxy in EO-C4 is enforced harder on T3 (the threshold for "high" disfluency is 2/100 in T3 vs 4/100 in T1/T2).
8. **No template leak** — zero `[REPLACE_*]` sentinels.
9. **Confidence rollup** — all newly-authored files default to `confidence_overall: medium`; pilot-batch promotion to `high` on native review.
10. **Whisper-agnostic test** — `score_speaking.py` runs cleanly in transcript-only mode (no Whisper installed) on all 27 pilot model transcripts.
11. **Phase 5 ID-freeze stability** — the freeze emitted at PHASE_5_EVAL clearance must remain in sync (`tools/snapshot_phase5_ids.py --check` exits 0). Phase 6 must not edit Phase 5 IDs.

---

## 9. Acceptance criteria (gate to Phase 7)

Flat checklist for `PHASE_6_EVAL.md`:

- [ ] Operationalised EO rubric shipped (`00_rubric.md`).
- [ ] 90 prompts at the §3 distribution — or honest deferral disposition with cleared pilot subset (≥ 9 prompts with ≥ 27 model transcripts).
- [ ] 270 model transcripts — or honest deferral with ≥ 27 cleared.
- [ ] 8 phonology units complete, each cross-referenced from ≥ 1 pilot prompt.
- [ ] 60-day program with daily protocol references.
- [ ] `tools/score_speaking.py` full implementation; calibration ≥ 75 % agreement on cleared subset; transcript-only mode tested.
- [ ] Cross-reference graph: every pilot prompt links to ≥ 1 phonology unit + ≥ 1 pivot file (from Phase 5) + ≥ 1 anti-error entry.
- [ ] No template-leak sentinels.
- [ ] Native-review evidence on every `medium`/`low` file (deferred to external review queue — same disposition as Phase 3/4/5).
- [ ] ID freeze committed: `content/06_speaking/_id_freeze.lock` emitted.
- [ ] Phase 5 ID-freeze still in sync (no Phase 5 IDs touched).

Phase 7 hand-off note: prompts tagged `usable_in_mock: true` (pilot will tag ≥ 3 per tâche = 9 total) become the EO sub-section of the full mock; the phonology kit and the 60-day program inform the mock's pacing and error-recovery sections.

---

## 10. Open questions — defaulted

Per standing autonomous-execution authorization, I default the following and proceed:

1. **Bulk authoring volume**: ship pilot (27 model transcripts) + infrastructure. **Default: yes** — same disposition as Phase 5. Bulk-bulk deferred with queues.
2. **Audio MP3 generation**: defer until pilot transcripts clear native review. **Default: yes** — `audio.required: false` on pilot; queue is empty during this push.
3. **Phonology unit count**: 8 units (the spec's "shadowing protocol" and "auto-évaluation phonologique" are folded into the 60-day program rather than standalone files — 8 instead of 8). **Default: yes** — 8 units in the kit, 2 protocols in the program.
4. **Whisper integration**: install at scorer-runtime, not eagerly; `pyproject.toml` adds `faster-whisper` as an *optional* `[speaking]` extra. **Default: yes** — keeps the base install lean.
5. **Quebec phonology**: the kit documents the Quebec /R/ apical variant and the affrication /t͡s, d͡z/ before /i, y/ for **recognition**; the model transcripts use Metropolitan TTS voices (Denise/Henri). **Default: yes**, per the master prompt §0.4 voice catalogue and the Quebec-recognition-only stance.
6. **Native-reviewer assignment**: continue with `audit.reviewer: claude-04` self-review; external native review queued in [BACKLOG.md](BACKLOG.md). **Default: yes.**

---

## 11. Stop point

Per master prompt §0.6 the normal pattern is to stop after design and wait for confirmation. Per the feedback memory the standing "execute with best judgement" authorization extends across turns to materially-complete stopping points. Proceeding directly to §7 execution.

The user can redirect any default in §10 at any time and I will adjust mid-execution.

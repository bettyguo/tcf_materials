# Contributors

> A short, honest credit list. If you add content, open a PR and add yourself here.

## Original author

- **TCF Canada Prep contributors** — single learner (AI researcher in Montréal preparing TCF Canada in 2026, targeting NCLC 8–9 for Express Entry CRS bonus).

## AI pair-programmers

The corpus was built across 8 structured phases between 2026-05-27 and 2026-05-29 using **Claude Code** (Claude Opus 4.x family) as a pair-programmer + curriculum-designer. Each phase produced a `PHASE_N_DESIGN.md` / `PHASE_N_AUDIT.md` / `PHASE_N_EVAL.md` triplet documenting decisions, deferrals, and risk registers. The 8-phase build history is in [`CHANGELOG.md`](CHANGELOG.md).

Sessions:

| Phase | Date | Scope |
|---|---|---|
| Phase 1 — Foundation | 2026-05-27 | repo scaffold, schema, build pipeline, diagnostic, ROADMAP, CI |
| Phase 2 — Grammar | 2026-05-28 | 64 graded units (B1 → C2) |
| Phase 3 — Vocab + Listening (tooling) | 2026-05-28 | tooling + 3-sub-deck Anki + audio + frequency check; bulk content deferred |
| Phase 4 — Reading | 2026-05-28 | 60 items across 7 TCF text types |
| Phase 5 — Writing | 2026-05-28 | rubric + anti-error + pivots + templates + 9 pilot prompts + auto-scorer |
| Phase 6 — Speaking | 2026-05-29 | rubric + 8-unit phonology + 60-day program + 9 pilot prompts + auto-scorer |
| Phase 7 — Mocks + Strategy + Cheatsheets | 2026-05-28 | 2 full + 2 scaffold mocks + partials + 7 strategy + 12 cheatsheets + score calculator |
| Phase 8 — Launch | 2026-05-29 | onboarding flow, cross-format parity, examples mini-corpus, final audit |

## Pending native-review credits

Native-speaker review of the corpus (~110 h external work queued in [`BACKLOG.md`](BACKLOG.md)) will be credited here when delivered. The corpus today is at `audit.status: pending` on a large fraction of files — see each phase's EVAL for per-phase counts.

## How to add yourself

If you contribute content, tooling, or review:

1. Open a PR per [`CONTRIBUTING.md`](CONTRIBUTING.md).
2. Add yourself to the relevant table above (or create a new one if your contribution doesn't fit).
3. State *what* you contributed in one line.

External review (especially native French + Quebec speakers) is the single most-needed contribution. See [`BACKLOG.md`](BACKLOG.md) §"Phase 2 → différé" / §"Phase 4 → dette de revue native" / §"Phase 5 → dette de revue native" / §"Phase 6 → dette de revue native" for the prioritised lists.

## Acknowledgements

Pedagogical foundations cited in [`references.bib`](references.bib) and seeded across the corpus:

- **Riegel, Pellat & Rioul** — *Grammaire méthodique du français*. Default grammar reference for B2+.
- **Grevisse** — *Le bon usage*. Edge-case arbiter for soutenu register.
- **Léon** — *Phonétisme et prononciations du français*. Backbone of the 8-unit phonology kit (Phase 6).
- **Tranel** — *The sounds of French*. Cross-checked alongside Léon.
- **Krashen** — input hypothesis. Justifies the i+1 ordering of listening + reading buckets.
- **Swain** — output hypothesis. Justifies the daily output block in `ROADMAP.md`.
- **Carpenter** — interleaved practice (+43 % transfer). Justifies the cross-skill rotation each day.
- **Lyster** — counterbalanced form-meaning approach. Relevant for the Quebec/France register split.

TCF specifics:

- **France Éducation International (FEI)** — sample papers, official rubric definitions.
- **IRCC** — NCLC conversion tables (2024 version pinned for score-mapping).
- **Lonsdale & Le Bras** — French frequency dictionary, 3 000-lemma bands 1-6 backbone (manual transcription pending — see [`BACKLOG.md` §Phase 3](BACKLOG.md)).

Authentic-content sources quarried for snippet citations (≤ 25 verbatim words, paraphrased otherwise): Le Monde, Le Devoir, La Presse, Radio-Canada, France Culture, France Inter, RFI Savoirs, TV5MONDE Apprendre, Le Figaro, Libération, Légifrance (Code du travail). Outlet keys are indexed in [`references.bib`](references.bib).

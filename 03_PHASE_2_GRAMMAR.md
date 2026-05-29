# 03 — PHASE 2: GRAMMAR REFERENCE
## Graded grammar B1→C2, audited, score-anchored

> **Output: ~64 grammar units across 4 levels (15 B1 + 24 B2 + 15 C1 + 10 C2). Acceptance gate per unit: ≥ 6 exercises with key, audit pass clear, and a tiered contrastive-example floor — B1 ≥ 6 pairs, B2 ≥ 10 pairs, C1 ≥ 10 pairs, C2 ≥ 6 pairs. One *pair* = one indicative/subjunctive or contrastive sentence + its counter-example.**

> **Revision note (2026-05-28)**: this spec was audited before implementation began. Changes from the original draft are flagged inline with `<!-- REV -->` comments. The schema reference is now [PHASE_1_DESIGN.md §7](PHASE_1_DESIGN.md), not a redefinition; the audit pipeline references existing `tools/audit_french.py` + `tools/anglicisms.yaml` + new `tools/quebecisms.yaml` rather than restating rules inline.

---

## 1. Goal

Produce a complete grammar reference scoped to what the TCF tests, organised so that:
- The B1 learner can identify gaps in one sitting (the "B1 consolidation" tier doubles as a self-assessment checklist).
- The B2 core tier is the load-bearing wall — per FEI's published item-and-points table [`fei2026_format`], B2-band items contribute **210 of the 699 points in each MCQ section** (CO and CE independently, 10 of 39 items × 21 pts each ≈ 30% of section score), and B2 anchors EE/EO production tasks. <!-- REV: was unsourced "~30% of items"; now sourced to fei2026_format and disambiguated as score share per section, not item share. -->
- The C1 advanced tier covers the morphosyntactic moves that distinguish a NCLC 7 (CEFR B2) candidate from a NCLC 9 (C1): nominalisation, hypotaxis, connector finesse, concessive subjunctive, mood in relative clauses.
- The C2 polish tier covers low-frequency / high-impact items: **4 of 39 items per MCQ section (≈ 10% of items) but 132 of 699 points (≈ 19% of section score) at 33 pts each** [`fei2026_format`]. <!-- REV: was unsourced "≤ 10% of questions but cost 33 points each"; now sourced and frames count + score impact distinctly. -->

This is NOT a comprehensive French grammar. It is the slice the TCF tests, ordered by marginal score impact.

---

## 2. Coverage table (the scope is exhaustively enumerated here)

> **Demarcation rule for cross-tier topics** <!-- REV: added so cause/concession/hypothesis/connecteurs don't sprawl across tiers with overlapping examples. -->
> Some topics (cause, concession, hypothesis, connecteurs) span multiple tiers by design. The boundary is fixed as follows:
> - **B2 units on `cause`, `conséquence`, `but`, `concession`, `opposition`, `temps`** own *mood selection + syntax* for that semantic relation (which conjunctions take indicative vs. subjunctive; same-subject vs. different-subject test; word-order constraints).
> - **B2-19 connecteurs synthesis** owns the *operational inventory by function* (the reference table a writer scans during EE drafting).
> - **C1 advanced concession / cause / hypothesis units** own *high-register substitutions* (e.g., `sous prétexte que`, `n'eût été`, `pour peu que`) and *discourse-level chaining* (concession + restriction stacked).
> Each unit must declare in its frontmatter `tags:` whether it covers `syntax`, `inventory`, or `register-elevation`. The audit (`tools/check_grammar_dag.py`, see §6) verifies no example sentence is reused verbatim across tiers.

### 2.1 B1 consolidation (`content/01_grammar/b1_consolidation/`)

Goal: surface and patch B1 gaps the learner may have. Each unit = 3 pages: rule recap, contrastive pairs, mini-drill.

1. Articles défini / indéfini / partitif + élision + **partitif zéro après négation** (`pas de pain`, `plus d'argent`) — single highest-frequency article phenomenon at B1, was implicit in original spec <!-- REV: made explicit per audit gap C1. -->
2. Présent de l'indicatif (verbes irréguliers à haute fréquence) + state vs. activity
3. Passé composé vs. imparfait (le système aspectuel — *the* B1 watershed)
4. Plus-que-parfait (toujours en contraste avec passé composé)
5. Futur simple vs. futur proche vs. présent à valeur de futur
6. Conditionnel présent (hypothèse, politesse, information non confirmée)
7. Pronoms personnels complément (COD/COI) + ordre
8. Pronoms `y` / `en`
9. Pronoms relatifs simples (qui, que, où, dont)
10. Négation (ne…pas, plus, jamais, rien, personne, ni…ni, aucun)
11. Interrogation directe (3 registres : intonation, est-ce que, inversion)
12. Comparatifs et superlatifs (+ irréguliers : meilleur, mieux, pire)
13. Accord du participe passé (avec être / avoir + COD antéposé) — recurring TCF banana skin
14. Si + concordance des temps (3 hypothèses)
15. Prépositions de lieu et de temps (à, en, dans, depuis, pendant, pour, il y a)

### 2.2 B2 core (`content/01_grammar/b2_core/`)

The 24 highest-yield units. Each unit = 5 pages: rule, contrastive pairs, register variation, exercises (closed + transformation + production), 1 short authentic-source extract showing the structure in the wild. <!-- REV: was 20; added 4 to close audit-identified gaps (faire causative, periphrastic aspect, ne…que, impersonal constructions at B2, interrogation indirecte). -->

1. Subjonctif présent — déclencheurs (volonté, doute, émotion, nécessité, opinion négative)
2. Subjonctif passé — concordance dans la subordonnée
3. Conditionnel passé — irréel du passé, regret, reproche
4. Hypothèse : si + plus-que-parfait → conditionnel passé / présent (mixed)
5. Cause : parce que, puisque, comme, étant donné que, du fait que, vu que — *syntax tier; à force de moved to C1-8 to avoid duplication* <!-- REV: removed à force de here per audit gap C2 (was duplicated with C1-8). -->
6. Conséquence : si … que, tellement … que, au point que, si bien que, à tel point que
7. But : pour que, afin que, de sorte que (+ subj) vs. pour + inf
8. Concession : bien que, quoique, malgré (que), même si, encore que, quitte à
9. Opposition : alors que, tandis que, au lieu de, contrairement à
10. Temps : avant que (+ subj) vs. après que (+ ind), une fois que, dès que, à mesure que
11. Voix passive — formes pleines, passif impersonnel, alternatives (`se faire + inf`, `on`, `se` médiopassif)
12. Discours rapporté direct → indirect + concordance des temps + changements déictiques (inclut interrogation indirecte : `si`, `ce que`, `ce qui`) <!-- REV: extended title to absorb interrogation indirecte per audit gap C1. -->
13. Pronoms relatifs composés (lequel, duquel, à laquelle…) + ce qui / ce que / ce dont
14. Mise en relief : c'est…qui/que, ce qui/que…c'est, double pronominalisation
15. Participe présent vs. gérondif vs. adjectif verbal — la triade qui distingue B2 de C1
16. Infinitif passé après préposition (après avoir/être …) + sujet implicite
17. Expression de la quantité — déterminants indéfinis (plupart, quelques, certains, divers, plusieurs)
18. Adverbes en -ment — formation, position, et nuances (alternatives soutenues)
19. Connecteurs logiques B2 — *inventory* tier (cf. demarcation rule §2): table par fonction (cause, conséquence, opposition, addition, illustration, conclusion); pas de duplication d'exemples avec B2-5..10.
20. Place de l'adjectif — sémantique (avant vs. après : *un grand homme* ≠ *un homme grand*)
21. ***Faire* causative** : *faire / laisser + inf*, accord du participe, position des pronoms (*je la fais réparer / je l'ai fait réparer*) <!-- REV: new unit per audit gap C1. -->
22. **Périphrases aspectuelles** : *venir de + inf* (passé récent), *être en train de + inf* (progressif), *être sur le point de + inf*, *être en passe de + inf*, *finir par + inf* <!-- REV: new unit per audit gap C1. -->
23. **`Ne…que` restrictif** (scope, position avec infinitif et temps composés) vs. négation `ne…pas`; ambiguïté potentielle avec *ne… personne / rien que* <!-- REV: new unit per audit gap C1. -->
24. **Constructions impersonnelles à haute fréquence** : *il y a*, *il faut*, *il s'agit de*, *il est X que* (+ ind/subj), *il convient de*; passage actif↔impersonnel <!-- REV: new unit per audit gap C1; C1-12 keeps the soutenue tournures. -->

### 2.3 C1 advanced (`content/01_grammar/c1_advanced/`)

The 15 units that move a NCLC 7 to a NCLC 9.

1. Subjonctif après relatif (antécédent indéfini, superlatif, *le seul/premier/unique*)
2. Subjonctif après concession et restriction (où que, quoi que, quel que…)
3. Mode dans la subordonnée complétive selon le verbe introducteur (espérer + ind, souhaiter + subj…)
4. Inversion stylistique (peut-être, à peine, ainsi, aussi, sans doute, du moins)
5. Nominalisation — la phrase nominale comme marqueur de registre soutenu
6. Anaphore lexicale et reprise (synonymes, hyperonymes, pronoms démonstratifs neutres)
7. Connecteurs C1 (en effet, certes…mais, du reste, par ailleurs, en revanche, néanmoins, toutefois, or, voire)
8. Cause complexe — registre soutenu (sous prétexte que, faute de, à force de, à défaut de) — *owns à force de per demarcation rule §2* <!-- REV: clarified ownership; B2-5 no longer lists à force de. -->
9. Concession soutenue (si … soit-il, encore que + subj, n'eût été…)
10. Hypothèse complexe (en supposant que, à condition que, pour peu que, à moins que + ne explétif)
11. Subordonnée participiale (*Le travail terminé, …*)
12. Tournures impersonnelles soutenues (il importe que, il convient de, il est de notoriété publique que)
13. Pronoms en/y dans des constructions verbales fixes (`s'en remettre à`, `y compris`, `n'en pouvoir plus`)
14. Antéposition de l'attribut et de l'objet (*Grande fut sa surprise*, *Cette possibilité, je l'avais envisagée*)
15. Ne explétif (avant que, à moins que, de crainte que, comparaisons)

### 2.4 C2 polish (`content/01_grammar/c2_polish/`)

The 10 items that earn the last few points and demonstrate native-like control.

1. Passé simple — reconnaissance passive (apparaît dans textes littéraires de la CE)
2. Imparfait du subjonctif — reconnaissance passive (textes anciens / parodies)
3. Subjonctif plus-que-parfait — idem
4. Conditionnel passé 2e forme (*j'eusse aimé*) — reconnaissance
5. Phrases longues à hypotaxe complexe (analyse des subordonnées emboîtées)
6. Antéposition expressive et inversion non-interrogative
7. Style soutenu vs. littéraire vs. familier — repères lexicaux et syntaxiques
8. Locutions verbales figées de haute fréquence en presse (faire fi de, tenir tête à, prendre acte de…)
9. Constructions clivées et pseudo-clivées avancées
10. Concordance des temps dans le récit (passé simple + imparfait + plus-que-parfait + conditionnel)

---

## 3. Unit template (every grammar file follows this)

> **Schema authority**: the canonical pydantic schema for *every* content file lives in [`tools/models.py`](tools/models.py) and is documented in [PHASE_1_DESIGN.md §7](PHASE_1_DESIGN.md). The block below shows only the **grammar-specific defaults**; do not introduce fields not defined in `Frontmatter` (extra fields are rejected by `model_config = ConfigDict(extra="forbid")`). <!-- REV: was a redefinition of the schema; now references the authoritative source. -->

```markdown
---
id: gram-b2-01
title: "Subjonctif présent — déclencheurs"
section: grammar
cefr: B2
nclc_target: 7
estimated_minutes: 35
register: france                       # france|quebec|mixed — mandatory per Phase 1 schema <!-- REV: was missing. -->
sources: ["[riegel2018_grammaire]", "[radiocanada2024_subj_001]", "[lemonde2023_subj_017]"]
prerequisites: [gram-b1-02, gram-b1-06]
tags: [mode, subjonctif, syntax]       # syntax|inventory|register-elevation per demarcation rule §2
flashcard: []                          # grammar units typically [] ; populate only for high-value pattern memorisation cards <!-- REV: was missing; default empty stated explicitly. -->
audit:
  status: pending                      # pending|reviewed|cleared|quarantined
  reviewer: null
  confidence_overall: medium           # default medium until audit pass writes a verdict <!-- REV: was "high" — presupposed audit conclusion. -->
  notes: ""
---

<!-- Phase-2 internal metadata (not enforced by schema; recorded in body or as HTML comment) -->
<!-- tcf_yield: high|medium|low — used by 00_index.md to rank units by score impact. -->
<!-- domain: research|environment|politics|health|work|culture|daily-life — used by domain-diversity audit (§5). -->

# Subjonctif présent — déclencheurs

## 1. La question, en une phrase
> Le subjonctif marque que le procès est envisagé, non posé comme un fait : il code l'orientation modale du sujet énonciateur envers la proposition subordonnée.

## 2. Formation (recap rapide, B1 supposé connu)
[table: nous-form du présent − -ons + terminaisons subj]
[6 irréguliers à mémoriser : être, avoir, aller, faire, pouvoir, savoir, vouloir, falloir, valoir, pleuvoir]

## 3. Les six déclencheurs majeurs (avec exemples contrastifs et sources)

### 3.1 Volonté / souhait
- Indicatif : *J'espère qu'il **viendra**.*
- Subjonctif : *Je veux qu'il **vienne**.* / *Je souhaite qu'il **vienne**.*
- Piège (différence verbe + préposition) : *espérer que* + ind. vs *attendre que* + subj.
- Source : [extract from Le Devoir 2024-11-04 — "Le gouvernement souhaite que les municipalités…"]

### 3.2 Doute / incertitude
… [trois exemples, dont un contre-exemple où le doute déclenche l'indicatif : *Je doute qu'il vienne* mais *Je ne doute pas qu'il vient/vienne* — register split].

### 3.3 Émotion / sentiment
…

### 3.4 Nécessité / obligation impersonnelle
…

### 3.5 Opinion à la forme négative ou interrogative
*Je pense qu'il a raison.* → *Je ne pense pas qu'il **ait** raison.*
[register note: à l'oral courant, on entend aussi l'indicatif; à l'écrit TCF, utiliser le subjonctif.]

### 3.6 Antécédent évaluatif (*le seul, le premier, le meilleur*)
*C'est le seul livre qui **vaille** la peine d'être lu.*

## 4. Faux amis et confusions à éviter
- *Après que* prend l'indicatif (norme), même si le subjonctif s'entend.
- *Pendant que*, *parce que*, *puisque*, *quand* → indicatif.
- Locution prépositionnelle vs conjonction : *Avant de + inf* (même sujet) vs *avant que + subj* (sujets différents).

## 5. Mini-corpus authentique
[5 extraits, sources citées, surlignant les structures]

## 6. Exercices

### 6.1 Repérage (10 items) — corrigé en fin
…

### 6.2 Transformation (8 items) — corrigé
"*Il vient.* (Il faut que) →"

### 6.3 Production (3 items) — modèle de correction
"Écrivez 2 phrases sur votre recherche en utilisant *bien que* + subj."

## 7. Corrigés
…

## 8. Carte de synthèse
[1-page summary; this section is extracted by `make cheatsheets` into a poster PDF.]

## 9. Pour aller plus loin
- Riegel, §… ; Grevisse, §…
- TLFi : entrée du verbe modal pivot.
```

---

## 4. Authoring protocol (mandatory)

For each unit:

1. **Anchor first**: pull 3–5 authentic short snippets (Le Devoir, Radio-Canada, Le Monde, etc.) that exemplify the structure. Store the citation in `references.bib` (per-article entry key format: `outlet+year_topicnum`, e.g. `ledevoir2024_subjonctif_003`); reference via `[key]` in frontmatter.

2. **Source pipeline** (manual, no automated corpus tool in Phase 2): <!-- REV: was unspecified; pipeline now made explicit so the bottleneck is acknowledged and budgeted. -->
   - **Where to look**: Le Devoir (RSS `https://www.ledevoir.com/rss`), Radio-Canada (`/rss/`), Le Monde (paywalled but lead paragraphs are free and quotable), France Culture, RFI Savoirs, TV5 Apprendre.
   - **Time budget**: ≈ 30 min per unit for source-finding (180–300 snippets total across the phase = 30–50 h of curation; this is the real bottleneck of Phase 2).
   - **Quotation vs. adaptation**: snippets quoted verbatim ≤ 25 words are fair-use citations; mark them `« … »` and cite. Snippets *adapted* by the author are no longer "authentic" — label `[adapté de @key]` and do not pass off as native production.
   - **No invented sources**: every `radiocanada2024_xxx` key must point to a real, retrievable article URL with `urldate`. Master-prompt §0.4 forbids invented quotes.

3. **Draft contrastive pairs**: every rule presented with a counter-example showing what it is *not* (B2/C1 nuance lives in contrasts). Pair count floor per tier: B1 ≥ 6, B2 ≥ 10, C1 ≥ 10, C2 ≥ 6 (the original "≥ 12" was inconsistent with the B1 3-page budget). <!-- REV: tier the bar; was uniform ≥12 in header but conflicted with B1 3-page budget. -->

4. **Self-adversarial pass** (impersonate `correcteur agrégé`): for every example sentence, ask: "Would a native writer naturally produce this? Is the register consistent? Is there a more natural alternative?" Annotate `<!-- AUDIT: reason -->` for anything you cannot defend; use `<!-- AUDIT-BLOCKER: reason -->` for anything that must not ship. Recognised by `tools/audit_french.py`.

5. **Domain diversity** (cross-unit constraint): across the 64 units, target ≥ 6 broad domains represented in example sentences (research, environment, politics, health, work/labour, culture, daily life). No single domain > 25 % of examples. Each unit declares its `<!-- domain: ... -->` marker; the audit pass (§5) aggregates and flags overfit. <!-- REV: new — without this the corpus silently overfits to the author's professional register. -->

6. **Native-speaker review checkpoint** (mandatory before EVAL clears): every unit flagged `audit.confidence_overall: medium` or `low` is queued for native review (Quebec colleague or paid native reviewer). Reviewer fills `audit.reviewer` and writes a `notes:` line. Phase 2 EVAL fails if any production model answer in a *non-cleared* unit is `confidence: medium` or `low`. <!-- REV: new — master prompt §0.2 mandates human native review for low-confidence items; self-review alone is insufficient for grammar where one wrong example becomes a memorised wrong pattern. -->

7. **Exercises**: 6 minimum, distributed:
   - 2 closed (repérage / MCQ)
   - 2 transformation
   - 2 production (with detailed model answers, not just answer keys) — **all production model answers default to `confidence: medium` until natively reviewed**.

8. **Cheatsheet section** at the bottom of every unit — single-page recap. **Extraction is deferred to Phase 8** (no `make cheatsheets` target exists in the current build). Authors must still write §8 cleanly so the future extractor has clean source. <!-- REV: was "the cheatsheet build step extracts" — implied tooling that doesn't exist. -->

---

## 5. Audit (`PHASE_2_AUDIT.md`)

For this phase the audit is paramount because grammar errors compound: every wrong example becomes a memorised wrong pattern.

Automated audit runs via `just audit` (alias `make audit`, alias `python -m tools.cli audit`) — uses `tools/audit_french.py` which already loads `tools/anglicisms.yaml` and (added in this phase) `tools/quebecisms.yaml`. Extend those YAMLs rather than restating rules in prose. <!-- REV: was inline rule list; now points at the real tools. -->

Mandatory checks:
- [ ] **Sentence-level audit**: stratified sample — *at least one example sentence per unit* (64 minimum) verified independently against Riegel (`[riegel2018_grammaire]`) or Grevisse (`[grevisse2016_bonusage]`); plus a deep dive of *every* example in the 7 subjunctive-related units (gram-b2-01, b2-02, c1-01, c1-02, c1-03, c1-09, c1-15). <!-- REV: was 30 across the phase (~4% coverage); raised to ≥1/unit stratified + deep-dive on subjunctive units per audit gap Au1. -->
- [ ] **Subjunctive matrix-verb behaviour**: every verb that accepts both moods with semantic difference (e.g., *espérer que* + ind, *douter que* + subj, *ne pas douter que* + ind/subj split) is flagged with a register/semantic note, not glossed over.
- [ ] **Quebec/France divergences in mood**: e.g., *avant que* + subj is robust in both; *après que* + ind is normative but Quebec speech often uses subj — annotated where they appear and tested by `tools/quebecisms.yaml`.
- [ ] **No invented rules**: every rule statement must trace to Riegel, Grevisse, BDL/OQLF, or TLFi. Random spot-check 10 rules per tier against the cited reference page.
- [ ] **Anglicism scan**: `tools/audit_french.py` runs `tools/anglicisms.yaml` (current set: ~18 patterns including *opportunité de + inf*, *adresser un problème*, *éventuellement*, *définitivement*, *réaliser que*, *initier un projet*, *prendre une décision*-vs-*faire une*, *appliquer à un poste*, *introduire à*, *agenda* sense-of-meeting). Extend before audit if a new calque is observed.
- [ ] **Quebecism scan** (new): `tools/quebecisms.yaml` flags Quebec-only forms appearing in *formal* model answers (e.g., *présentement* → *actuellement*, *char* → *voiture*, *placoter* → *bavarder*). Recognition is fine in CO transcripts; production model answers must be Metropolitan-standard unless `register: quebec`. <!-- REV: new per master prompt §0.2 — Quebecism risk was unaddressed in original spec. -->
- [ ] **Cross-unit consistency**: no rule stated at B1/B2 contradicts a refinement at C1/C2. Generated by walking the DAG via the cycle-detection pass in `tools/audit_french.py`. <!-- REV: new per audit gap Au4. -->
- [ ] **Domain-diversity check**: aggregate `<!-- domain: ... -->` markers across units; flag if any domain > 25 % or fewer than 6 distinct domains.
- [ ] **Cheatsheet ⊆ unit**: §8 (carte de synthèse) of each unit must not state any rule absent from §3. Mechanically diff-checkable.
- [ ] **Native-speaker review evidence**: every unit with `audit.confidence_overall ∈ {medium, low}` has `audit.reviewer` filled and a `notes:` line citing the reviewer's verdict.
- [ ] **Confidence rollup**: target ≤ 3 units flagged `confidence: medium`; 0 `low` at EVAL. (Original ≤ 3 % / ≤ 0.5 % targets restated as absolute counts for the 64-unit corpus.)

---

## 6. Evaluate (`PHASE_2_EVAL.md`)

Deliverables checklist:
- [ ] **15 B1 consolidation units** complete (B1-1 includes partitif zéro explicitly).
- [ ] **24 B2 core units** complete (was 20; added *faire* causative, periphrastic aspect, *ne…que*, impersonal constructions at B2; interrogation indirecte folded into B2-12). <!-- REV: count adjusted from 20 → 24 per audit gap C1. -->
- [ ] **15 C1 advanced units** complete (C1-8 now uniquely owns *à force de*).
- [ ] **10 C2 polish units** complete.
- [ ] All units render in PDF without overfull boxes — verified by `just pdf` (alias `make pdf`) succeeding on the full content tree; Pandoc `.log` greppable for `Overfull \hbox` warnings > 5 pt, none allowed.
- [ ] **Cheatsheet build deferred to Phase 8** — every unit's §8 (carte de synthèse) is authored but no `make cheatsheets` target is required in Phase 2. <!-- REV: was a blocker; `make cheatsheets` doesn't exist. -->
- [ ] Cross-references (`prerequisites:`) form a DAG (no cycles); the cycle-detection extension of `tools/audit_french.py` passes. *No separate `tools/check_grammar_dag.py` is needed — DAG validation lives inside the existing audit run; the spec's original reference to a standalone script is superseded.* <!-- REV: was a blocker; tool didn't exist. Now satisfied by extension to existing audit. -->
- [ ] Grammar index page ([`content/01_grammar/index.md`](content/01_grammar/index.md)) cross-tabulates units by CEFR level, by linguistic category (mood, tense, voice, syntax, lexis), and by **tcf_yield** (high/medium/low — derived from the `<!-- tcf_yield: -->` marker in each unit's body). <!-- REV: path corrected from 00_index.md to index.md to match existing awesome-pages convention; tcf_yield axis added per audit gap C3. -->
- [ ] Domain-diversity check passes (≥ 6 domains, no domain > 25 % of examples).
- [ ] Native-review evidence present for every `medium`/`low` confidence unit.
- [ ] **ID freeze** committed (see §7) before Phase 3 starts.

When green, proceed to Phase 3.

---

## 7. Hand-off note to Phase 3

The vocabulary phase (Phase 3) will reference grammar units via `prerequisites:` (e.g., a thematic vocab unit on "environnement" links to `gram-b2-09` for opposition connectors used in the example sentences). All `id:` values must be stable before Phase 3 begins.

**ID freeze procedure** (mandatory before Phase 3 starts): <!-- REV: was implicit; now an explicit ceremony. -->
1. After EVAL clears, run `python -m tools.cli audit --schema-only` and confirm zero schema errors.
2. Emit a snapshot:
   ```powershell
   uv run python -c "from tools._common import iter_content_files, load_content; import json; ids=sorted({load_content(p).fm.id for p in iter_content_files() if str(p).replace(chr(92),'/').startswith(str(__import__('tools._common',fromlist=['REPO_ROOT']).REPO_ROOT/'content/01_grammar').replace(chr(92),'/'))}); open('content/01_grammar/_id_freeze.lock','w',encoding='utf-8').write('\n'.join(ids)+'\n')"
   ```
   (Or write a one-off `tools/snapshot_grammar_ids.py` of equivalent ~20 LOC.)
3. `git add content/01_grammar/_id_freeze.lock && git commit -m "phase-2: freeze grammar IDs"`.
4. Phase 3 EVAL gates fail if any Phase-2 grammar `id` is missing from the lock or differs from it.

Once frozen, **no Phase-2 unit may be renamed**; corrections happen by edit-in-place. New units after freeze (e.g., a `gram-b2-25` that emerges from Phase 3 needs) must be added via an explicit "freeze amendment" commit referenced in `BACKLOG.md`.

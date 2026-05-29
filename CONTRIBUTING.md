# Contributing

> Aussi : ce dépôt a pour cible un apprenant *individuel*. Les contributions externes sont les bienvenues, mais la priorité absolue est : **ne pas dégrader la qualité du français**. Mieux vaut 50 fiches B2 irréprochables que 200 fiches mêlées de calques.

## TL;DR

1. Fork + branche `feat/<courte-description>`.
2. `uv sync --extra dev` puis `uv run pre-commit install`.
3. Ajoutez ou modifiez des `.md` sous `content/` — respectez le **schéma de frontmatter** ci-dessous.
4. `uv run python -m tools.cli audit` doit passer (rc = 0).
5. `uv run pytest -q` doit passer.
6. Ouvrez une PR avec, dans le corps, un encadré « **Pourquoi je suis confiant que ce français est correct** » : sources consultées, doute résiduel éventuel.

## Installation locale (Windows 11 PowerShell)

```powershell
winget install astral-sh.uv
winget install Gyan.FFmpeg          # facultatif, pour TTS local
winget install MiKTeX.MiKTeX        # facultatif, pour PDF local
git clone <repo-url> ; cd tcf-canada-prep
uv sync --extra dev
uv run python -m tools.cli audit
uv run pytest
uv run mkdocs serve                 # http://127.0.0.1:8000
```

## Installation locale (macOS / Linux)

```bash
brew install uv pandoc hunspell ffmpeg
brew tap homebrew/cask-fonts && brew install --cask font-linux-libertine
git clone <repo-url> && cd tcf-canada-prep
uv sync --extra dev
make all          # ou: just all
```

## Schéma de frontmatter (canonique)

Toute fiche sous `content/` doit valider le modèle pydantic `Frontmatter` ([`tools/models.py`](tools/models.py)). Exemple complet :

```yaml
---
id: co-b2-024                          # ^[a-z]+-[a-z0-9]+(-[a-z0-9]+)*$, unique
title: "Compréhension orale — B2 — Pollution sonore en ville"
section: listening                     # listening|reading|writing|speaking|grammar|vocab|strategy|mock|diagnostic|culture|index
cefr: B2                               # A1|A2|B1|B2|C1|C2
nclc_target: 7                         # 1–12
estimated_minutes: 12
register: france                       # france|quebec|mixed
audio:
  required: true
  voice: fr-FR-DeniseNeural
  duration_seconds: 95
sources:
  - "[radiocanada]"
  - "[lemonde]"
tags: [environnement, urbanisme, débat]
flashcard:
  - front: "nuisance sonore"
    back: "noise pollution; cf. tapage nocturne (terme juridique)"
    confidence: high
prerequisites: [co-b1-018]
audit:
  status: pending                      # pending|reviewed|cleared|quarantined
  reviewer: null
  confidence_overall: high             # high|medium|low
  notes: ""
---
```

## Conventions de nommage

- Fichiers : `NN_slug.md` où `NN` est un préfixe d'ordre (00, 01…) et `slug` en kebab-case ASCII sans accents.
- Dossiers : pas d'accents, pas d'espaces (Windows + iCloud sync se vengent).
- IDs (`id:` dans le frontmatter) : préfixe-typique `co-b2-NN`, `gram-c1-NN`, `vocab-environ-NN`, etc.

## Quand marquer `confidence: low` ?

- Locution / expression dont vous n'êtes pas certain qu'elle soit naturelle.
- Tournure soutenue / littéraire que vous n'avez pas pu vérifier dans Grevisse/Le Petit Robert.
- Référence culturelle non vérifiée.
- Toute phrase pour laquelle un correcteur natif aurait probablement une réaction « eh non, on dit plutôt… ».

Les fiches `confidence: low` (ou un seul item flashcard `low`) sont **exclues des builds livrés**. Elles attendent une relecture native dans `_pending_native_review/`.

## Quand utiliser `<!-- AUDIT-BLOCKER: … -->` vs `<!-- AUDIT: … -->`

- `<!-- AUDIT-BLOCKER: <raison> -->` : faute connue à corriger avant publication. `audit_french.py` exit 1.
- `<!-- AUDIT: <note libre> -->` : doute à lever en seconde passe (mineur).
- `<!-- AUDIT-IGNORE: <pattern> <raison> -->` : éteint un faux positif heuristique sur ce fichier. Le `<pattern>` est l'identifiant interne (par ex. `anglicism`, `calque`, `subjunctive`).

## Ajouter un anglicisme au flagger

Édit `tools/anglicisms.yaml` :

```yaml
- pattern: '\bbenchmark\w*\b'
  note: '"benchmark" est anglicisme courant en milieu professionnel ; en EE soutenue, préférer "étalonnage" ou "comparaison de référence".'
  severity: minor
```

Re-run `uv run pytest -q` puis `uv run python -m tools.cli audit` pour vérifier.

## Élargir la liste blanche orthographique

Ajoutez le terme à `tools/audit_whitelist.txt` (une entrée par ligne, insensible à la casse). Pour des ajouts non versionnés (clients, secrets), utilisez `tools/audit_whitelist.local.txt` (gitignored).

## Rafraîchir les sources authentiques

Les snippets paraphrasés dans `content/` doivent citer leur source dans `sources:` du frontmatter. Les clés réfèrent à `references.bib`. Ajoutez une entrée BibTeX avant de citer une nouvelle source.

## Construire localement

| Commande | Effet |
|---|---|
| `uv run python -m tools.cli build-site` | site MkDocs → `site/` |
| `uv run python -m tools.cli build-anki` | deck Anki → `flashcards/dist/tcf-canada.apkg` |
| `uv run python -m tools.cli build-audio` | TTS → `audio/<id>.mp3` |
| `uv run python -m tools.cli build-epub` | EPUB → `pdf/tcf-canada-prep.epub` |
| `uv run python -m tools.cli build-pdf` | PDF → `pdf/tcf-canada-prep.pdf` |
| `uv run python -m tools.cli audit` | adversarial-review → `AUDIT.md` |

Avec `just` installé : `just site`, `just anki`, etc.
Avec `make` : `make site`, etc.

## Politique de PR

- Une PR doit décrire **ce qu'elle ajoute pédagogiquement** (combien d'items, à quel CEFR, dans quelle phase) et **comment elle a été auditée**.
- CI doit être verte avant merge.
- Les contributions purement de scaffolding (typo, build) ne nécessitent pas d'audit de français.

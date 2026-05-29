---
id: mock-03-queue
title: "Mock #3 — file de production (queue)"
section: mock
cefr: C1
nclc_target: 9
estimated_minutes: 5
register: france
tags: [mock, mock-03, queue, stub, planning]
stub: true
audit:
  status: pending
  reviewer: null
  confidence_overall: medium
  notes: "Énumération des contenus à produire pour Mock #3 (étirement C1). Production déférée derrière bulk Phase 3 CO + revue native. Voir 00_instructions.md pour la distribution."
---

# Mock #3 — file de production

> Ce fichier énumère **ce qui reste à produire** pour livrer Mock #3 en version complète. Les fichiers `01_*`, `02_*`, `03_*`, `04_*` du dossier sont des stubs pointant ici. Une fois la queue vidée, on bascule chaque stub en contenu final et on passe `audit.status` à `cleared`.

## Distribution cible (étirement C1)

| Niveau | CO | CE |
|---|---|---|
| A1 | 4 | 4 |
| A2 | 6 | 6 |
| B1 | 7 | 7 |
| B2 | 8 | 8 |
| C1 | 8 | 8 |
| C2 | 6 | 6 |
| **Total** | **39** | **39** |

## CO — 39 items à produire

Items inédits par rapport aux Mocks #1 et #2. Domaines à varier (éviter les doublons sport/voyage/logement/restauration déjà saturés). Audio gated : `audio.required: false` partout, scripts INLINE complets pour réactivation TTS d'un flag.

| Bloc | Items | Type TCF | Format |
|---|---|---|---|
| A1 | 1–4 | Type 1 (annonce courte) | monologue scripté 12–18 s |
| A2 | 5–10 | Type 2 (échange court) | 2 locuteurs, 2–4 tours, 22–38 s |
| B1 | 11–17 | Type 3 (échange long) | 2 locuteurs, 5–8 tours, 50–80 s |
| B2 | 18–25 | Type 4 (interview / table ronde) | 2–3 locuteurs, 80–120 s |
| C1 | 26–33 | Type 5 (extrait d'émission / conférence) | monologue ou semi-dialogue 100–140 s |
| C2 | 34–39 | Type 6 (extrait littéraire / éditorial dense) | monologue C1+/C2, 100–150 s |

Domaines suggérés pour le bloc C1/C2 (étirement) : neurosciences de l'attention, philosophie des sciences, critique littéraire francophone, débat sur la francisation au Québec, économie comportementale, sociologie du numérique.

Spec items détaillée : `PHASE_3_DESIGN.md §4.3` (gabarit par type) et `PHASE_7_DESIGN.md §3` (calibrage mock).

## CE — 10 textes à composer

Phase 4 a déjà produit la matière première. Mock #3 **réutilise** des textes Phase 4 non encore consommés par Mocks #1 et #2, en renumérotant les questions 1–39 mais en gardant le texte source et les corrigés **textuellement identiques**.

Mocks #1 / #2 ont consommé : `ce-a1-001/002`, `ce-a2-001/002/004/005`, `ce-b1-001/002/006/007`, `ce-b2-001/002/007/008`, `ce-c1-001/002/006/007`, `ce-c2-001/002`.

**Sélection proposée pour Mock #3** (étirement C1 — favoriser un C1 supplémentaire si possible) :

| Items mock | CEFR | ID Phase 4 source | Notes |
|---|---|---|---|
| 1–4 | A1 | `ce-a1-003` (1 texte, 4 questions) | inédit |
| 5–6 | A2 | `ce-a2-003` (2 questions) | inédit |
| 7–10 | A2 | `ce-a2-006` (4 questions) | inédit |
| 11–13 | B1 | `ce-b1-003` (3 questions) | inédit |
| 14–17 | B1 | `ce-b1-004` (4 questions) | inédit |
| 18–21 | B2 | `ce-b2-003` (4 questions) | inédit |
| 22–25 | B2 | `ce-b2-009` (4 questions) | inédit |
| 26–29 | C1 | `ce-c1-003` (4 questions) | inédit |
| 30–33 | C1 | `ce-c1-008` (4 questions) | inédit |
| 34–39 | C2 | `ce-c2-003` (6 questions) | inédit, dernier C2 disponible |

Si l'un de ces IDs ne contient pas le nombre de questions attendu (cas probable pour les A1/A2 qui sont souvent à 1 ou 2 questions), reprendre un second item de même niveau encore non utilisé (priorité : `ce-a1-003` puis `ce-a2-007` ; `ce-b1-005/008/009/010/011` ; `ce-b2-004/005/006/010-025` ; `ce-c1-004/005/009/010/011`).

## EE / EO — prompts dédiés

Stubs `03_ee_prompts.md` et `04_eo_prompts.md` pointent vers les pilotes #003, qui existent déjà en Phase 5/6 :

- EE T1 : `content/05_writing/tache1/03_ee-t1-003.md` — Remerciement à un professeur pour une recommandation.
- EE T2 : `content/05_writing/tache2/03_ee-t2-003.md` — Tribune sur les espaces verts urbains.
- EE T3 : `content/05_writing/tache3/03_ee-t3-003.md` — Le français au travail à Montréal.
- EO T1 : `content/06_speaking/tache1/03_eo-t1-003.md` — Demande de renseignement sur une offre d'emploi à temps partiel.
- EO T2 : `content/06_speaking/tache2/03_eo-t2-003.md` — Changements observés dans les pratiques culturelles.
- EO T3 : `content/06_speaking/tache3/03_eo-t3-003.md` — Semaine de quatre jours et productivité.

## How to fill — procédure

1. **CO** : produire les 39 items selon `PHASE_3_DESIGN.md §4.3`. Respecter `audio.required: false` ; scripts complets avec balises `<<SPEAKER:F>>` / `<<SPEAKER:M>>` ; corrigé `Correct: X` + 3 lignes *Pourquoi pas* + `<!-- DISTRACTOR: cat=X,Y,Z -->`. Bloc-fichiers à créer : `01a_co_a1_a2.md` (items 1–10), `01b_co_b1.md` (11–17), `01c_co_b2.md` (18–25), `01d_co_c1_c2.md` (26–39). Le stub `01_co_items.md` est remplacé par cette série.
2. **CE** : composer un seul fichier `02_ce_items.md` (ou subdiviser par bloc CEFR si > 8000 mots). Reprendre les textes Phase 4 **textuellement** ; renuméroter les questions 1–39 ; préserver les corrigés et les `DISTRACTOR` tags ; ajouter un en-tête par texte avec source = ID Phase 4.
3. **EE** : générer les trois modèles NCLC 6 / 8 / 10 par tâche via la **même** prompt agent que Mock #1 (`PHASE_7_DESIGN.md §5.2`), avec substitution `ee-t*-001` → `ee-t*-003`. Trois fichiers `07_ee_models_t1.md`, `07_ee_models_t2.md`, `07_ee_models_t3.md`.
4. **EO** : générer transcripts NCLC 6 / 8 / 10 par tâche via la même prompt agent que Mock #1, avec substitution `eo-t*-001` → `eo-t*-003`. Trois fichiers `08_eo_models_t1.md`, `08_eo_models_t2.md`, `08_eo_models_t3.md`.
5. **Answer keys** : `05_answer_key_co.md` et `06_answer_key_ce.md` agrégeant les 78 corrigés au format Mock #1.
6. **Tracking** : `09_score_calculator.md` et `10_post_mock_diagnostic.md` : liens vers les gabarits partagés sous `partials/`.

## Definition of done

- 39 CO items + 39 CE items, tous avec corrigé + `DISTRACTOR` tag.
- 6 prompts EE/EO ré-cités textuellement depuis les pilotes #003.
- 9 modèles EE/EO (3 NCLC × 3 tâches) par modalité (EE + EO = 18 modèles).
- Tous les fichiers passent `tools/audit_french.py` sans erreur.
- `audit.status` du `00_instructions.md` passe à `cleared` (revue native incluse).

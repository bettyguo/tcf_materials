---
id: mock-04-queue
title: "Mock #4 — file de production (queue)"
section: mock
cefr: B2
nclc_target: 7
estimated_minutes: 5
register: france
tags: [mock, mock-04, queue, stub, planning, distracteurs-max]
stub: true
audit:
  status: pending
  reviewer: null
  confidence_overall: medium
  notes: "Énumération des contenus à produire pour Mock #4 (répétition générale, distribution standard, distracteurs maximalement piégeants). Production déférée derrière bulk Phase 3 CO + revue native. Voir 00_instructions.md pour la distribution."
---

# Mock #4 — file de production

> Ce fichier énumère **ce qui reste à produire** pour livrer Mock #4 en version complète. Les fichiers `01_*`, `02_*`, `03_*`, `04_*` du dossier sont des stubs pointant ici. Une fois la queue vidée, on bascule chaque stub en contenu final et on passe `audit.status` à `cleared`.

> **Spécificité Mock #4** : **distracteurs maximalement piégeants**. Tous les items CO et CE doivent appliquer **systématiquement** les 7 catégories de `content/09_strategy/00_distractor_anatomy.md` à plein degré. **Aucune** option ne doit être éliminable par instinct ; chacune doit demander une vérification consciente du texte. C'est la **répétition générale** : la cible n'est plus apprendre — c'est éprouver le réflexe sous pression.

## Distribution cible (standard)

| Niveau | CO | CE |
|---|---|---|
| A1 | 4 | 4 |
| A2 | 6 | 6 |
| B1 | 9 | 9 |
| B2 | 10 | 10 |
| C1 | 6 | 6 |
| C2 | 4 | 4 |
| **Total** | **39** | **39** |

## CO — 39 items à produire (distracteurs max)

Items inédits par rapport aux Mocks #1, #2, #3. Audio gated : `audio.required: false` partout, scripts INLINE complets.

**Règle distracteur Mock #4** : pour chaque item, viser **au moins 2 catégories de distracteurs distinctes** parmi les 3 distracteurs (jamais `cat=4,4,4` comme dans certains items A1 de Mock #2 — bannir l'inférence non garantie en triplon). Privilégier :

- **cat=1** (mot-piège : un mot exact du source réutilisé dans une mauvaise relation),
- **cat=6** (attribution glissante : claim correct mais attribué au mauvais locuteur — particulièrement efficace en B2/C1 type 4 et type 5),
- **cat=7** (faux-ami français-anglais : *éventuellement*, *définitivement*, *réaliser*, *opportunité*, *supporter* — ciblés sur le candidat anglophone-fonctionnel).

Bloc-fichiers à créer : `01a_co_a1_a2.md`, `01b_co_b1.md`, `01c_co_b2.md`, `01d_co_c1_c2.md`.

## CE — 10 textes à composer

Mocks #1 + #2 + #3 (proposition) ont consommé : `ce-a1-001/002/003`, `ce-a2-001/002/003/004/005/006`, `ce-b1-001/002/003/004/006/007`, `ce-b2-001/002/003/007/008/009`, `ce-c1-001/002/003/006/007/008`, `ce-c2-001/002/003`.

**Restent disponibles** après Mock #3 : `ce-a2-007` ; `ce-b1-005, 008, 009, 010, 011` ; `ce-b2-004, 005, 006, 010–025` ; `ce-c1-004, 005, 009, 010, 011` ; aucun C2 Phase 4 inédit.

**Sélection proposée pour Mock #4** (standard) :

| Items mock | CEFR | Source Phase 4 | Notes |
|---|---|---|---|
| 1–4 | A1 | (à produire ou repiocher) | Phase 4 A1 épuisé après Mock #3 → produire 4 items A1 dédiés Mock #4 avec distracteurs max, ou réutiliser le 1er A1 d'un mock antérieur avec accord auteur |
| 5–10 | A2 | `ce-a2-007` (6 questions si possible) | inédit ; sinon compléter avec un second A2 produit dédié |
| 11–13 | B1 | `ce-b1-005` | inédit |
| 14–16 | B1 | `ce-b1-008` | inédit |
| 17–19 | B1 | `ce-b1-009` | inédit |
| 20–24 | B2 | `ce-b2-005` | inédit |
| 25–27 | B2 | `ce-b2-010` | inédit |
| 28–29 | B2 | `ce-b2-011` | inédit |
| 30–33 | C1 | `ce-c1-004` | inédit |
| 34–36 | C1 | `ce-c1-009` | inédit |
| 37–39 | C2 | À produire dédié Mock #4 | Phase 4 C2 épuisée (ce-c2-001/002/003 consommés Mocks #1/#2/#3) → 3 questions C2 dédiées avec distracteurs max ; ou tolérer une dérogation à 2 C2 (et compenser par 2 C1 supplémentaires) si le calendrier ne permet pas la production |

**Reproduction Phase 4** : textes et corrigés **textuellement identiques** ; renumérotation 1–39 ; tags `DISTRACTOR` préservés. Pour les items dédiés Mock #4, **respecter** la règle « ≥ 2 catégories distinctes par item » plus haut.

## EE / EO — prompts dédiés

Stubs `03_ee_prompts.md` et `04_eo_prompts.md` pointent vers les pilotes #004 si déjà promus (`content/05_writing/tache*/_queue.md`, `content/06_speaking/tache*/_queue.md`) ; sinon vers une rotation des #001–003. À la date de scaffolding, les pilotes #004 ne sont pas encore promus → rotation suivante :

- EE T1 : `ee-t1-001` (courriel : report d'examen, déjà utilisé Mock #1) **OU** attendre `ee-t1-004` (recommandé : produire `ee-t1-004` avant Mock #4).
- EE T2 : `ee-t2-002` **OU** `ee-t2-004`.
- EE T3 : `ee-t3-002` **OU** `ee-t3-004`.
- EO idem.

**Décision** : si `ee-t*-004` et `eo-t*-004` sont produits avant fenêtre Mock #4, les utiliser (inédits) ; sinon, fallback sur les #002 (déjà utilisés à Mock #2 mais avec ≥ 2 semaines d'écart de mémoire si rotation respectée). Le stub `03_ee_prompts.md` documente les deux scénarios.

## How to fill — procédure

1. **CO** : produire les 39 items selon `PHASE_3_DESIGN.md §4.3` ; **règle Mock #4** : ≥ 2 catégories de distracteurs distinctes par item ; viser une concentration de cat=6 (attribution glissante) et cat=7 (faux-ami) sur les blocs B2/C1.
2. **CE** : composer `02_ce_items.md` (ou subdivision) en reproduisant **textuellement** les sources Phase 4 et en produisant les compléments A1/C2 manquants au standard Mock #4 (distracteurs max).
3. **EE** : générer les trois modèles NCLC 6/8/10 par tâche dans `07_ee_models_t1.md`, `07_ee_models_t2.md`, `07_ee_models_t3.md` via la même prompt agent que Mock #1 avec substitution d'ID (cf. `PHASE_7_DESIGN.md §5.2`).
4. **EO** : générer transcripts NCLC 6/8/10 par tâche dans `08_eo_models_t1.md`, `08_eo_models_t2.md`, `08_eo_models_t3.md` via la même prompt agent que Mock #1 avec substitution d'ID.
5. **Answer keys** : `05_answer_key_co.md` et `06_answer_key_ce.md` agrégeant les 78 corrigés ; chaque corrigé documente quelle catégorie de distracteur a piégé quel choix, pour l'analyse post-mock.
6. **Tracking** : `09_score_calculator.md`, `10_post_mock_diagnostic.md` (gabarits partagés sous `partials/`).

## Definition of done

- 39 CO items + 39 CE items, tous avec corrigé + `DISTRACTOR` tag, ≥ 2 catégories distinctes par item (règle Mock #4).
- 6 prompts EE/EO sourcés (inédits prioritaires).
- 18 modèles EE/EO (3 NCLC × 3 tâches × 2 modalités).
- Audit final : `audit.status: cleared` (revue native incluse) sur `00_instructions.md`.
- Tous les fichiers passent `tools/audit_french.py` sans erreur.

## Note finale

Mock #4 est la **dernière simulation** avant la fenêtre d'examen ; sa difficulté distracteurs est calibrée pour qu'un passage à blanc à NCLC 7 (cible standard B2) reste atteignable, mais qu'un passage à NCLC 9 ne soit possible **qu'avec** la vérification systématique de chaque option contre le texte/audio. Toute facilité ressentie pendant ce mock est un signal d'alerte (probable lecture trop superficielle des distracteurs).

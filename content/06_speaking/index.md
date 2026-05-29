---
id: speaking-index
title: Expression orale — vue d'ensemble
section: speaking
cefr: B2
nclc_target: 7
estimated_minutes: 5
register: france
audit:
  status: cleared
  confidence_overall: high
---

# Expression orale (EO)

3 tâches, face-à-face avec examinateur, ≈ 12 min (2 min de préparation pour la T3). Score /20 sur 4 critères :

1. Efficacité communicative.
2. Étendue lexicale.
3. Contrôle morphosyntaxique.
4. Contrôle phonologique.

| Tâche | Ancrage CEFR | Durée | Genre | Dossier |
|---|---|---|---|---|
| T1 | B1 | ~1,5 min | obtenir des informations en posant des questions | [tache1/](tache1/) |
| T2 | B2 | ~3 min | décrire une expérience / un sujet | [tache2/](tache2/) |
| T3 | C1 | ~5 min (après 2 min de prép) | défendre une opinion à partir d'un document | [tache3/](tache3/) |

## Livré (Phase 6 close)

| Composant | État | Lien |
|---|---|---|
| Grille EO opérationnalisée | ✅ | [00_rubric.md](00_rubric.md) |
| Registre anti-erreurs EO (32 entrées, 6 sections) | ✅ | [00_anti_error.md](00_anti_error.md) |
| Kit phonologique (8 unités) | ✅ | [00_phonology/](00_phonology/) |
| Programme 60 jours | ✅ | [00_program.md](00_program.md) |
| Sujets T1 + modèles 6/8/10 transcripts | 🟡 3/30 | [tache1/](tache1/) · [_queue](tache1/_queue.md) |
| Sujets T2 + modèles 6/8/10 transcripts | 🟡 3/30 | [tache2/](tache2/) · [_queue](tache2/_queue.md) |
| Sujets T3 + modèles 6/8/10 transcripts | 🟡 3/30 | [tache3/](tache3/) · [_queue](tache3/_queue.md) |
| Auto-scorer CLI (Whisper-augmented) | ✅ | [tools/score_speaking.py](../../tools/score_speaking.py) |

## Mode d'emploi

1. Lire **[00_rubric.md](00_rubric.md)** une fois, puis **[00_anti_error.md](00_anti_error.md)** en parallèle.
2. Passer la **[phonologie complète](00_phonology/)** en 2 semaines (1 unité par 3 jours).
3. Démarrer le **[programme 60 jours](00_program.md)** à la fin de la semaine 4 du roadmap général.
4. Pour chaque enregistrement : `python -m tools.score_speaking <prompt.md> [--audio recording.m4a]` ; comparer aux 3 modèles annotés.
5. Tenir un journal des fautes récurrentes : pointer dans **[00_anti_error.md](00_anti_error.md)**.

## Anti-pattern : le shadowing-zombie

Le risque d'une banque structurée comme la nôtre est l'application mécanique. **Variez** : tournez les prompts, alternez les registres entre sessions, et **au moins une session sur trois sans regarder le modèle audio du tout** — la production libre doit dominer dès le bloc B.

## Symétrie avec l'écrit (Phase 5)

Le kit EO réutilise les pivots, l'anti-erreurs et le rubric de l'EE :

- **[Pivots EE](../05_writing/00_pivots/)** — les 193 phrases d'ouverture, transition, concession, etc., scorent autant en EO qu'en EE si elles sont vocalisées proprement.
- **[Anti-erreurs EE](../05_writing/00_anti_error.md)** — les fautes morphosyntaxiques (accord, subjonctif, constructions verbales) se transposent telles quelles à l'oral.
- **[Rubric EE](../05_writing/00_rubric.md)** — les 3 premiers critères (efficacité, lexique, morphosyntaxe) sont identiques entre EO et EE. Seul le 4ᵉ (phonologique) est propre à l'oral.

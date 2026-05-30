---
title: Calendrier .ics — mocks + sessions (v1.5)
audit:
  status: cleared
  confidence_overall: high
---

# Calendrier .ics — mocks + sessions

> Génère un fichier `.ics` standard avec **18 événements** programmés à rebours depuis votre date d'examen, importables dans **Google Calendar, Apple Calendar, Outlook**.

## Événements générés

| # | Quand | Quoi | Durée |
|---|---|---|---|
| 1 | Date examen, 9h | TCF Canada — Examen | 3h30 |
| 1 | J-7, 9h | Récap final J-7 | 30 min |
| 4 | J-28, J-21, J-14, J-7 (matin) | Mocks 1-4 plein format | 3h |
| 12 | 12 samedis précédents, 10h | Session focus skill faible | 1h30 |

= **18 événements** au total, couvrant 12 semaines de préparation.

<div class="tcf-ics-export"></div>

## Format

- **Standard iCalendar (RFC 5545)** — métadonnées complètes (`UID`, `DTSTAMP`, `SUMMARY`, `DESCRIPTION`).
- **Timezone** : `America/Montreal` (DTSTART en UTC).
- **CALNAME** : « TCF Canada — préparation ».
- Pas de récurrence (`RRULE` absent) : chaque session est une instance distincte → vous pouvez la modifier individuellement après import.

## Import

- **Google Calendar** : `Paramètres → Importer et exporter → Sélectionner le fichier`.
- **Apple Calendar** : double-clic sur le fichier `.ics` → confirmer le calendrier de destination.
- **Outlook** : `Fichier → Ouvrir et exporter → Importer/Exporter → Fichier iCalendar`.

## Cas d'usage

- **Mocks à blanc** déjà programmés → vous ne pouvez plus les oublier.
- **Sessions focus** sur la compétence faible → impose la régularité.
- **Alerte J-7** automatique pour le récap final.

## Limites

- Pas de **notifications** : ajouter manuellement vos rappels (15 min ou 1 j) après import.
- Skill faible figé au moment de la génération : régénérer le fichier si la cible bouge.
- Pas de mise à jour incrémentale : ré-importer écrase les événements précédents (le UID stable garantit la dédup côté client).

## Cross-references

- [Objectif](objectif.md) — saisie de la date d'examen et de la cible.
- [Projection NCLC](projection.md) — projection de l'atteinte de la cible.
- [Plan d'étude du jour](plan-du-jour.md) — exécution quotidienne.
- [Score tracker](suivi.md) — saisie des résultats de mocks.

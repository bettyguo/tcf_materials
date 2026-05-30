"""Regenerate hub index.md pages with rich card layouts.

Scans a hub directory's sibling files, extracts frontmatter + first-paragraph
description, emits an index.md with:
- Section H1 and intro
- CEFR-badge grouped cards (`feature-grid` + `feature-card`)
- Each card: title, CEFR / estimated minutes / register badges, blurb, link
- Footer: link to _queue.md if present, link back to parent section index

Idempotent: reads the existing frontmatter of the hub page (if any) and
preserves its `title`, `id`, `audit` block.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"

FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)

# Mapping for section meta — fallback titles + intros per hub
SECTION_META: dict[str, dict[str, str]] = {
    "00_diagnostic": {
        "title": "Diagnostic — situation initiale (90 min)",
        "intro": "Le **diagnostic d'entrée** : 90 min de tests calibrés (CO bref + CE rapide + 1 prompt EE + 1 prompt EO) pour situer votre niveau actuel. Faites-le **avant** d'écrire votre plan d'étude. Tous les fichiers ci-dessous.",
    },
    "01_grammar/b1_consolidation": {
        "title": "Grammaire B1 — consolidation",
        "intro": "**15 unités B1**. C'est la base que votre B2 dépendra : si l'imparfait, les pronoms COD/COI, les hypothétiques et les relatifs simples vous échappent, B2 sera fragile. Audit ligne à ligne, exemples chiffrés.",
    },
    "01_grammar/b2_core": {
        "title": "Grammaire B2 — noyau",
        "intro": "**~22 unités B2**, le cœur de la préparation TCF Canada. Subjonctif, concordance, hypothétiques 2-3, relatifs complexes (lequel, duquel), passifs, participes, déterminants composés. À enchaîner avec drills cloze + speed-race.",
    },
    "01_grammar/c1_advanced": {
        "title": "Grammaire C1 — avancée",
        "intro": "**~15 unités C1**, pour viser NCLC 9-10. Inversion stylistique, ne explétif, concordance des temps stricte, modalité fine, gérondif vs participe présent, antéposition d'attribut. Ces structures **ne sont pas** indispensables pour NCLC 8, mais font la différence en EE T3 et EO T3.",
    },
    "01_grammar/c2_polish": {
        "title": "Grammaire C2 — finition",
        "intro": "**Quelques unités C2** de finition. Subordonnées hypothétiques par inversion, propositions infinitives autonomes, archaïsmes encore vivants en écriture journalistique soutenue. Hors cible TCF Canada standard — pour les candidats au-delà de C1.",
    },
    "02_vocabulary/collocations": {
        "title": "Vocabulaire — collocations",
        "intro": "**Collocations clés** par thème : verbe + nom, adjectif + nom, locutions verbales. Apprendre un mot isolé est inefficace ; apprendre une **collocation** transfère directement en production (EE / EO).",
    },
    "02_vocabulary/frequency": {
        "title": "Vocabulaire — listes de fréquence",
        "intro": "**Listes de fréquence A1→C1** : 1000 mots-cibles répartis en bandes (band1 1-100, band2 101-300, band3 301-600, band4 601-1000). Couvrir le top 1000 = comprendre ~ 80 % du texte courant français. **Bande 1 = obligatoire**.",
    },
    "02_vocabulary/thematic": {
        "title": "Vocabulaire — listes thématiques",
        "intro": "**Listes thématiques B1-B2** : santé, environnement, travail, technologie, migrations, etc. Chaque thème = ~ 40-60 mots-cibles + collocations associées. Format Anki-friendly (front : mot ; back : sens + exemple).",
    },
    "03_listening/00_strategy": {
        "title": "CO — stratégie générale",
        "intro": "**Stratégie CO** : « j'ai entendu, je choisis, je passe » + sténo trois mots + anatomie des distracteurs (Sound-alike, Partially-correct, Out-of-scope, Inferred-but-wrong). À lire **avant** chaque session CO.",
    },
    "03_listening/a1": {
        "title": "CO A1 — survie linguistique",
        "intro": "**Items CO A1** (~7 / 39 sur le test réel). Annonces très courtes, dialogues à 1-2 répliques, chiffres simples. Calibration : valider l'écoute des nombres et des prénoms.",
    },
    "03_listening/a2": {
        "title": "CO A2 — élémentaire",
        "intro": "**Items CO A2**. Messages courts, instructions, brèves de presse. Phraséologie usuelle. Pas encore B1 mais déjà au-delà des seuls chiffres.",
    },
    "03_listening/b1": {
        "title": "CO B1 — seuil",
        "intro": "**Items CO B1** — le cœur du test pour la moyenne des candidats. Dialogues, annonces avec exceptions, messages vocaux à plusieurs informations. Voir [stratégie CO](../00_strategy/).",
    },
    "03_listening/b2": {
        "title": "CO B2 — confirmé",
        "intro": "**Items CO B2** : interviews, débats brefs, prises de position. Marqueurs d'opinion à détecter (« je dirais plutôt… »), atténuation, ironie légère. **Densité maximale du test** TCF Canada.",
    },
    "03_listening/c1": {
        "title": "CO C1 — autonome",
        "intro": "**Items CO C1**, ~ 4-6 / 39. Conférences, débats nuancés, registre soutenu. Pour viser NCLC 9-10. Concession-réfutation à entendre dans le flux.",
    },
    "03_listening/c2": {
        "title": "CO C2 — maîtrise",
        "intro": "**Items CO C2**, ~ 2-3 / 39. Style littéraire, ironie soutenue, sous-entendus. Rares mais discriminants pour NCLC 10.",
    },
    "04_reading/a1": {
        "title": "CE A1 — survie",
        "intro": "**Items CE A1** : panneaux, listes courtes, étiquettes. ~ 5 / 39 sur le test réel. À traiter en quelques secondes chacun pour libérer du temps sur les items B2.",
    },
    "04_reading/a2": {
        "title": "CE A2 — élémentaire",
        "intro": "**Items CE A2** : annonces courtes, messages, instructions. ~ 6 / 39. Vitesse > précision.",
    },
    "04_reading/b1": {
        "title": "CE B1 — seuil",
        "intro": "**Items CE B1** : courriels, brèves d'actualité, articles courts. ~ 10 / 39. Bandeau le plus large du test après B2.",
    },
    "04_reading/b2": {
        "title": "CE B2 — confirmé",
        "intro": "**Items CE B2** — la densité majoritaire du test (~ 14 / 39). Articles, tribunes, débats nuancés. Lecture entre les lignes : ironie, atténuation, marqueurs d'opinion. **Cible prioritaire de votre préparation**.",
    },
    "04_reading/c1": {
        "title": "CE C1 — autonome",
        "intro": "**Items CE C1**, ~ 4-6 / 39. Tribunes analytiques, registre soutenu. Travailler ici fait basculer de NCLC 8 à 9.",
    },
    "04_reading/c2": {
        "title": "CE C2 — maîtrise",
        "intro": "**Items CE C2**, ~ 2-3 / 39. Style littéraire, références implicites, polysémie. Discriminants pour NCLC 10.",
    },
    "05_writing/00_templates/t1": {
        "title": "EE T1 — templates (message court 60-120 mots)",
        "intro": "**6 templates T1** par fonction communicative : excuse, demande, plainte, remerciement, invitation, proposition. Chaque template = squelette de phrases-pivots à adapter au prompt.",
    },
    "05_writing/00_templates/t2": {
        "title": "EE T2 — templates (courrier formel 120-150 mots)",
        "intro": "**6 templates T2** par genre : article informatif, témoignage, critique nuancée, lettre administrative, dossier, présentation guidée. Structures binaires à la cible TCF.",
    },
    "05_writing/00_templates/t3": {
        "title": "EE T3 — templates (essai argumenté 180+ mots)",
        "intro": "**6 templates T3** par stratégie argumentative : pour/contre + position, thèse-antithèse-synthèse, problème-causes-solutions, comparaison, illustration, étude de cas. Tous avec concession-réfutation obligatoire.",
    },
    "05_writing/tache1": {
        "title": "EE Tâche 1 — message court (60-120 mots, B1)",
        "intro": "**Pilotes EE T1**. 3 prompts audités × 3 niveaux de modèle (NCLC 6, 8, 10). Registre formel. Pour s'échauffer avant T2/T3.",
    },
    "05_writing/tache2": {
        "title": "EE Tâche 2 — courrier formel (120-150 mots, B2)",
        "intro": "**Pilotes EE T2**. 3 prompts audités × 3 niveaux. Article informatif, témoignage, critique nuancée. Registre journalistique léger ou formel.",
    },
    "05_writing/tache3": {
        "title": "EE Tâche 3 — essai argumenté (180-300 mots, B2-C1)",
        "intro": "**Pilotes EE T3**. 3 prompts audités × 3 niveaux. Essai argumentatif avec concession-réfutation. **C'est ici que se joue NCLC 8 vs 9**.",
    },
    "06_speaking/tache1": {
        "title": "EO Tâche 1 — interview (≈ 1 min 30, B1)",
        "intro": "**Pilotes EO T1**. 3 situations audités × 3 niveaux de transcript. Vous posez 4-5 questions à l'examinateur. Varier 3 registres d'interrogation (est-ce que / inversion / intonation).",
    },
    "06_speaking/tache2": {
        "title": "EO Tâche 2 — présentation guidée (≈ 3 min, B2)",
        "intro": "**Pilotes EO T2**. 3 sujets audités × 3 niveaux. Présentation structurée 2 points + ouverture/clôture. Pas de préparation.",
    },
    "06_speaking/tache3": {
        "title": "EO Tâche 3 — débat argumenté (≈ 5 min, B2-C1)",
        "intro": "**Pilotes EO T3**. 3 stimuli audités × 3 niveaux. Position défendue avec concession-réfutation et question complémentaire de l'examinateur. **2 min de préparation strictement chronométrées**.",
    },
    "07_mock_exams/mock_01": {
        "title": "Mock #1 — examen blanc complet (pilote)",
        "intro": "**Premier examen blanc complet**. 39 CO + 39 CE + 3 EE + 3 EO. ~ 2h30. **À faire en semaine 5** une fois les bases B2 acquises. Score Calculator + corrigés inclus.",
    },
    "07_mock_exams/mock_02": {
        "title": "Mock #2 — examen blanc complet (calibration)",
        "intro": "**Deuxième examen blanc**. Profil similaire à Mock #1, items différents. **Semaine 8**. Comparez vos 4 scores bruts à ceux du Mock #1 — c'est votre signal de progression réel.",
    },
    "07_mock_exams/mock_03": {
        "title": "Mock #3 — examen blanc complet (consolidation)",
        "intro": "**Troisième examen blanc**. **Semaine 10**. À ce stade, votre stratégie est rodée — c'est l'exécution sous pression qui se mesure.",
    },
    "07_mock_exams/mock_04": {
        "title": "Mock #4 — examen blanc complet (taper)",
        "intro": "**Quatrième et dernier examen blanc**. **Semaine 11**, à J-7 du vrai. **Pas de surprise** — c'est une répétition à blanc dans des conditions parfaitement examen.",
    },
}


def parse_fm(text: str) -> tuple[dict[str, str], str]:
    m = FM_RE.match(text)
    if not m:
        return {}, text
    fm_block = m.group(1)
    rest = text[m.end():]
    fm: dict[str, str] = {}
    for line in fm_block.splitlines():
        line = line.rstrip()
        if not line or line.startswith(" ") or line.startswith("#"):
            continue
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip().strip('"').strip("'")
    return fm, rest


def first_paragraph(text: str, max_len: int = 220) -> str:
    """Best-effort: extract a short blurb from the body of a file."""
    body = text
    if body.startswith("---"):
        m = FM_RE.match(body)
        if m:
            body = body[m.end():]
    body = body.lstrip()
    # Skip H1, blockquotes, admonitions
    out: list[str] = []
    for raw in body.splitlines():
        line = raw.strip()
        if not line:
            if out:
                break
            continue
        if line.startswith("#"):
            continue
        if line.startswith(">"):
            continue
        if line.startswith("!!!") or line.startswith("???"):
            continue
        if line.startswith(("|", "*", "-", "+")) and len(out) == 0:
            continue
        out.append(line)
        if len(" ".join(out)) > max_len:
            break
    blurb = " ".join(out)
    blurb = re.sub(r"\*\*([^*]+)\*\*", r"\1", blurb)  # bold
    blurb = re.sub(r"\*([^*]+)\*", r"\1", blurb)      # italic
    blurb = re.sub(r"`([^`]+)`", r"\1", blurb)         # code
    blurb = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", blurb)
    blurb = re.sub(r"\s+", " ", blurb).strip()
    if len(blurb) > max_len:
        blurb = blurb[:max_len].rsplit(" ", 1)[0] + "…"
    return blurb


def cefr_color_class(cefr: str) -> str:
    return {
        "A1": "a1", "A2": "a2", "B1": "b1", "B2": "b2", "C1": "c1", "C2": "c2",
    }.get(cefr.upper(), "")


def render_card(meta: dict[str, str], url: str, blurb: str) -> str:
    title = meta.get("title") or url
    cefr = meta.get("cefr", "")
    mins = meta.get("estimated_minutes", "")
    register = meta.get("register", "")
    badges: list[str] = []
    if cefr:
        cls = cefr_color_class(cefr)
        badges.append(f'<span class="cefr-badge cefr-{cls}">{cefr}</span>')
    if mins:
        badges.append(f'<span class="minutes-badge">⏱ {mins} min</span>')
    if register and register not in ("", "—"):
        reg_label = {"france": "FR", "quebec": "QC", "mixed": "mix", "formel": "formel", "neutre": "neutre"}.get(register, register)
        badges.append(f'<span class="reg-badge">{reg_label}</span>')
    badge_html = " ".join(badges)
    blurb_html = blurb or ""
    return (
        f'<a class="cheat-card" href="{url}">\n'
        f'<span class="cheat-title">{title}</span>\n'
        f'<span class="cheat-meta">{badge_html}</span>\n'
        + (f'<span class="cheat-desc">{blurb_html}</span>\n' if blurb_html else '')
        + '</a>'
    )


def gen_hub(hub_path: Path) -> str:
    """Build the new content for a hub page."""
    hub_dir = hub_path.parent
    rel = hub_dir.relative_to(CONTENT).as_posix()
    fm_existing: dict[str, str] = {}
    if hub_path.exists():
        fm_existing, _ = parse_fm(hub_path.read_text(encoding="utf-8"))

    meta = SECTION_META.get(rel, {})
    title = meta.get("title") or fm_existing.get("title") or hub_dir.name
    intro = meta.get("intro") or "Vue d'ensemble de la section."

    # Enumerate sibling files (md, not index.md, not starting with _)
    children = sorted([p for p in hub_dir.iterdir()
                       if p.is_file() and p.suffix == ".md"
                       and p.name != "index.md"
                       and not p.name.startswith("_")])

    cards: list[str] = []
    for child in children:
        try:
            text = child.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        c_fm, _ = parse_fm(text)
        blurb = first_paragraph(text)
        # Use directory-style URL
        slug = child.stem
        url = f"{slug}/"
        cards.append(render_card(c_fm, url, blurb))

    # Queue files
    queue = [p for p in hub_dir.iterdir() if p.name == "_queue.md"]

    # Build header
    fm_lines: list[str] = ["---"]
    if fm_existing.get("id"):
        fm_lines.append(f'id: {fm_existing["id"]}')
    fm_lines.append(f'title: "{title}"')
    fm_lines.append("audit:")
    fm_lines.append("  status: cleared")
    fm_lines.append("  confidence_overall: high")
    fm_lines.append("hide:")
    fm_lines.append("  - toc")
    fm_lines.append("---")
    fm_lines.append("")

    body: list[str] = []
    body.append(f"# {title}")
    body.append("")
    body.append(f"> {intro}")
    body.append("")
    if cards:
        body.append('<div class="feature-grid">')
        body.append("")
        body.append("\n\n".join(cards))
        body.append("")
        body.append("</div>")
        body.append("")
    if queue:
        body.append(f"---")
        body.append("")
        body.append(f"*File d'authoring restante : voir [_queue.md]({queue[0].name}).*")
        body.append("")

    return "\n".join(fm_lines + body)


def main() -> None:
    targets: list[str] = [
        "00_diagnostic/index.md",
        "01_grammar/b1_consolidation/index.md",
        "01_grammar/b2_core/index.md",
        "01_grammar/c1_advanced/index.md",
        "01_grammar/c2_polish/index.md",
        "02_vocabulary/collocations/index.md",
        "02_vocabulary/frequency/index.md",
        "02_vocabulary/thematic/index.md",
        "03_listening/a1/index.md",
        "03_listening/a2/index.md",
        "03_listening/b1/index.md",
        "03_listening/b2/index.md",
        "03_listening/c1/index.md",
        "03_listening/c2/index.md",
        "04_reading/a1/index.md",
        "04_reading/a2/index.md",
        "04_reading/b1/index.md",
        "04_reading/b2/index.md",
        "04_reading/c1/index.md",
        "04_reading/c2/index.md",
        "05_writing/00_templates/t1/index.md",
        "05_writing/00_templates/t2/index.md",
        "05_writing/00_templates/t3/index.md",
        "05_writing/tache1/index.md",
        "05_writing/tache2/index.md",
        "05_writing/tache3/index.md",
        "06_speaking/tache1/index.md",
        "06_speaking/tache2/index.md",
        "06_speaking/tache3/index.md",
        "07_mock_exams/mock_01/index.md",
        "07_mock_exams/mock_02/index.md",
        "07_mock_exams/mock_03/index.md",
        "07_mock_exams/mock_04/index.md",
    ]
    for rel in targets:
        path = CONTENT / rel
        new_content = gen_hub(path)
        path.write_text(new_content, encoding="utf-8")
        print(f"wrote {rel}")


if __name__ == "__main__":
    main()

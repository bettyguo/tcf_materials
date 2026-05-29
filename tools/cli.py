"""`python -m tools.cli <command>` — primary entry point for every build/audit task.

Provides graceful "missing system dep" errors so a contributor on bare Python+uv
gets clear actionable messages instead of opaque stack traces.
"""

from __future__ import annotations

import shutil
import sys

import click

from tools._common import console


@click.group(help="TCF Canada Prep — build & audit toolchain.")
def main() -> None:  # entry point referenced by [project.scripts]
    pass


@main.command("build-site")
def build_site_cmd() -> None:
    """Build the MkDocs site → ./site/"""
    from tools import build_site

    build_site.main()


@main.command("build-anki")
def build_anki_cmd() -> None:
    """Build the Anki deck → ./flashcards/dist/tcf-canada.apkg"""
    from tools import build_anki

    build_anki.main()


@main.command("build-audio")
@click.option("--concurrency", default=4, show_default=True, help="Max parallel TTS calls.")
@click.option("--force", is_flag=True, help="Regenerate even if hash matches.")
def build_audio_cmd(concurrency: int, force: bool) -> None:
    """Generate TTS audio → ./audio/<id>.mp3 for files with audio.required: true."""
    from tools import build_audio

    build_audio.main(concurrency=concurrency, force=force)


@main.command("build-pdf")
def build_pdf_cmd() -> None:
    """Build the monolithic PDF + per-section booklets → ./pdf/"""
    if not shutil.which("pandoc"):
        console.print("[red]pandoc not found.[/] Install: https://pandoc.org/installing.html")
        sys.exit(2)
    if not shutil.which("xelatex"):
        console.print("[red]xelatex not found.[/] Install TeX Live or MiKTeX.")
        sys.exit(2)
    from tools import build_pdf

    build_pdf.main()


@main.command("build-epub")
def build_epub_cmd() -> None:
    """Build the EPUB → ./pdf/tcf-canada-prep.epub"""
    if not shutil.which("pandoc"):
        console.print("[red]pandoc not found.[/] Install: https://pandoc.org/installing.html")
        sys.exit(2)
    from tools import build_epub

    build_epub.main()


@main.command("audit")
@click.option("--schema-only", is_flag=True, help="Only validate frontmatter; skip heuristics + spell.")
@click.option("--no-report", is_flag=True, help="Do not write AUDIT.md.")
def audit_cmd(schema_only: bool, no_report: bool) -> None:
    """Run the adversarial French audit. Exits 1 on schema errors or blockers."""
    from tools.audit_french import run_audit

    sys.exit(run_audit(schema_only=schema_only, write_report=not no_report))


@main.command("check-frequency")
@click.option("--strict", is_flag=True, help="Exit 1 if the Lonsdale & Le Bras CSV is absent.")
def check_frequency_cmd(strict: bool) -> None:
    """Validate frequency-vocab band assignments against Lonsdale & Le Bras (skips if CSV absent)."""
    from tools import check_frequency

    sys.exit(check_frequency.main(["--strict"] if strict else []))


@main.command("measure-density")
@click.argument("path", required=False)
@click.option("--audit", is_flag=True, help="Walk content/04_reading/ and audit all items.")
def measure_density_cmd(path: str | None, audit: bool) -> None:
    """Compute word_count, lexical_density, TTR, avg sentence length on reading items.

    Either pass a single .md path, or use --audit to walk the entire reading bank.
    Per PHASE_4_DESIGN.md §3.1. Audit gate: ≥ 95 % of items in-band.
    """
    from tools import measure_density

    if audit:
        sys.exit(measure_density.main(["--audit"]))
    if not path:
        console.print("[red]measure-density requires either a PATH argument or --audit.[/]")
        sys.exit(2)
    sys.exit(measure_density.main([path]))


@main.command("score-writing")
@click.argument("path", required=False)
@click.option("--calibrate", is_flag=True,
              help="Walk PATH and score each '## Modèle NCLC N' against its labelled band.")
@click.option("--json", "as_json", is_flag=True, help="Emit JSON for one file.")
def score_writing_cmd(path: str | None, calibrate: bool, as_json: bool) -> None:
    """Score an EE draft against the FEI rubric (heuristic — see scoring_rules.md).

    Either pass a single .md path, or use --calibrate to walk a directory of
    writing items and check the heuristic band on each '## Modèle NCLC N' block.
    Per PHASE_5_DESIGN.md §3.2.
    """
    from tools import score_writing

    argv = []
    if calibrate:
        argv.append("--calibrate")
    if as_json:
        argv.append("--json")
    if path:
        argv.append(path)
    sys.exit(score_writing.main(argv))


@main.command("score-speaking")
@click.argument("path", required=False)
@click.option("--audio", default=None,
              help="Path to recording (.m4a/.wav/.mp3). Needs faster-whisper or openai-whisper.")
@click.option("--reference", default=None,
              help="Prompt file used as phoneme-confusion reference for the audio diff.")
@click.option("--calibrate", is_flag=True,
              help="Walk PATH and score each '## Modèle NCLC N — Transcript' against its label.")
@click.option("--json", "as_json", is_flag=True, help="Emit JSON for one file.")
def score_speaking_cmd(path: str | None, audio: str | None, reference: str | None,
                       calibrate: bool, as_json: bool) -> None:
    """Score an EO transcript (text-only) or transcript+audio against the EO rubric.

    Either pass a single .md path (transcript or prompt with bundled '## Modèle NCLC N
    — Transcript' blocks), or use --calibrate to walk a directory of speaking items.
    Per PHASE_6_DESIGN.md §3.2.
    """
    from tools import score_speaking

    argv: list[str] = []
    if calibrate:
        argv.append("--calibrate")
    if as_json:
        argv.append("--json")
    if audio:
        argv.extend(["--audio", audio])
    if reference:
        argv.extend(["--reference", reference])
    if path:
        argv.append(path)
    sys.exit(score_speaking.main(argv))


if __name__ == "__main__":
    main()

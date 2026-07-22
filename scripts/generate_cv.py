#!/usr/bin/env python3
"""Generate a standard or extended LaTeX CV from the website data."""

from __future__ import annotations

import argparse
import json
import shutil
import re
from pathlib import Path
from typing import Any


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT_DIR = PROJECT_ROOT / "generated_cv"
TEMPLATE_PATH = PROJECT_ROOT / "templates" / "cv_template.tex"
PLACEHOLDER_PATTERN = re.compile(r"@@([A-Z_]+)@@")
ENTRY_START_PATTERN = re.compile(r"@[A-Za-z]+\s*\{\s*([^,\s]+)\s*,", re.IGNORECASE)


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as stream:
        return json.load(stream)


def fill_template(template: str, values: dict[str, str]) -> str:
    """Replace named template fields and fail on missing or unused fields."""
    placeholders = set(PLACEHOLDER_PATTERN.findall(template))
    missing = placeholders - values.keys()
    unused = values.keys() - placeholders
    if missing:
        raise ValueError(f"Missing template values: {', '.join(sorted(missing))}")
    if unused:
        raise ValueError(f"Unused template values: {', '.join(sorted(unused))}")
    return PLACEHOLDER_PATTERN.sub(lambda match: values[match.group(1)], template)


def latex_escape(value: str) -> str:
    """Escape website text for use in ordinary LaTeX text."""
    replacements = {
        "\\": r"\textbackslash{}",
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
        "~": r"\textasciitilde{}",
        "^": r"\textasciicircum{}",
        "\u2013": "--",
        "\u2014": "---",
        "\u2212": "-",
        "\u2019": "'",
        "\u201c": "``",
        "\u201d": "''",
        "\u2026": r"\ldots{}",
        "\u2192": r"$\rightarrow$",
        "\u2022": r"\textbullet{}",
        "\u2011": "-",
    }
    return "".join(replacements.get(character, character) for character in value)


def latex_url(value: str) -> str:
    r"""Escape a URL for hyperref's \href argument."""
    return value.replace("\\", "/").replace("%", r"\%").replace("#", r"\#")


def contact_details(site: dict[str, Any]) -> tuple[str, str]:
    email = ""
    homepage = "https://simon-lucas.fr"
    for link in site.get("links", []):
        url = link.get("url", "")
        if url.startswith("mailto:"):
            email = url.removeprefix("mailto:")
        elif link.get("label", "").casefold() in {"website", "homepage"}:
            homepage = url
    return email, homepage


def render_event(item: dict[str, Any]) -> str:
    lines = [
        rf"\cvevent{{{latex_escape(item['title'])}}}"
        rf"{{{latex_escape(item['place'])}}}"
        rf"{{{latex_escape(item['date'])}}}{{}}"
    ]
    details = item.get("details", [])
    if details:
        lines.append(r"\begin{itemize}")
        lines.extend(rf"  \item {latex_escape(detail)}" for detail in details)
        lines.append(r"\end{itemize}")
    return "\n".join(lines)


def render_research_interests(site: dict[str, Any]) -> str:
    title = site.get("researchInterestsTitle", "Research Interests")
    text = site.get("bio", "")
    if not text:
        return ""
    return rf"\cvsection{{{latex_escape(title)}}}" + "\n" + latex_escape(text)


def bibliography_entry_end(source: str, opening_brace: int) -> int:
    depth = 0
    for index in range(opening_brace, len(source)):
        if source[index] == "{":
            depth += 1
        elif source[index] == "}":
            depth -= 1
            if depth == 0:
                return index + 1
    raise ValueError("Unbalanced braces in content/bibtex.bib")


def augment_bibliography_entry(
    entry: str, key: str, abstracts: dict[str, str], include_abstracts: bool
) -> str:
    fields = []
    author_match = re.search(r"\bauthor\s*=\s*\{(.*?)\}\s*,", entry, re.IGNORECASE | re.DOTALL)
    if author_match:
        authors = re.split(r"\s+and\s+", author_match.group(1), flags=re.IGNORECASE)
        for index, author in enumerate(authors, start=1):
            if "lucas" in author.casefold() and "simon" in author.casefold():
                fields.append(f"AUTHOR+an = {{{index}=highlight}}")
                break
    if include_abstracts and key in abstracts:
        fields.append(f"abstract = {{{latex_escape(abstracts[key])}}}")
    if not fields:
        return entry

    closing_brace = entry.rfind("}")
    prefix = entry[:closing_brace].rstrip()
    if not prefix.endswith(","):
        prefix += ","
    insertion = ",\n  ".join(fields)
    return f"{prefix}\n  {insertion}\n{entry[closing_brace:]}"


def prepare_bibliography(
    source: str, publications: list[dict[str, Any]], include_abstracts: bool
) -> str:
    abstracts = {
        item["bibtexKey"]: item["abstract"]
        for item in publications
        if item.get("bibtexKey") and item.get("abstract")
    }
    parts = []
    position = 0
    while match := ENTRY_START_PATTERN.search(source, position):
        parts.append(source[position : match.start()])
        opening_brace = source.find("{", match.start())
        end = bibliography_entry_end(source, opening_brace)
        entry = source[match.start() : end]
        parts.append(
            augment_bibliography_entry(entry, match.group(1), abstracts, include_abstracts)
        )
        position = end
    parts.append(source[position:])
    return "".join(parts)


def abstract_biblatex_setup(extended: bool) -> str:
    if not extended:
        return ""
    return r"""\DeclareFieldFormat{abstract}{#1}
\renewbibmacro*{finentry}{%
  \iffieldundef{abstract}
    {\finentry}
    {\setunit{\par\smallskip}\newblock
     \printtext{\begingroup\small\color{body}\RaggedRight\sloppy
       \textbf{Abstract.}\space\printfield{abstract}\par\endgroup}%
     \finentry}}"""


def sidebar_items(cv: dict[str, Any], title: str) -> list[str]:
    for section in cv.get("sidebars", []):
        if section.get("title", "").casefold() == title.casefold():
            return section.get("items", [])
    return []


def render_item_list(items: list[str], label: str | None = None) -> str:
    option = rf"[label={label}]" if label else ""
    lines = [rf"\begin{{itemize}}{option}"]
    lines.extend(rf"  \item {latex_escape(item)}" for item in items)
    lines.append(r"\end{itemize}")
    return "\n".join(lines)


def render_tags(items: list[str]) -> str:
    return "\n".join(rf"\cvtag{{{latex_escape(item)}}}" for item in items)


def render_misc_columns(cv: dict[str, Any]) -> str:
    achievements = sidebar_items(cv, "Awards")
    skills = sidebar_items(cv, "Skills")
    languages = sidebar_items(cv, "Languages")
    reviewing = sidebar_items(cv, "Reviewing")
    interests = sidebar_items(cv, "Interests")
    committees = ["JFIG Best Shader, 2022 and 2023"]
    achievement_list = render_item_list(achievements, r"\faTrophy")

    return rf"""\noindent
\begin{{minipage}}[t]{{0.58\textwidth}}
\cvsection{{Achievements}}
{achievement_list}

\cvsection{{Skills}}
{render_tags(skills)}
\end{{minipage}}\hfill
\begin{{minipage}}[t]{{0.36\textwidth}}
\cvsection{{Languages}}
{render_item_list(languages)}

\cvsection{{Reviewing}}
{render_item_list(reviewing)}

\cvsection{{Committees}}
{render_item_list(committees)}

\cvsection{{Interests}}
{render_tags(interests)}
\end{{minipage}}"""


def build_document(
    site: dict[str, Any],
    cv: dict[str, Any],
    extended: bool,
    bib_resource: str,
) -> str:
    email, homepage = contact_details(site)
    cv_kind = "Extended CV (including publication abstracts)" if extended else "CV"
    experience = "\n\n".join(render_event(item) for item in cv.get("experience", []))
    misc_columns = render_misc_columns(cv)
    misc_page_break = "" if extended else r"\clearpage"
    values = {
        "CV_KIND": cv_kind,
        "ROLE": latex_escape(site.get("role", "")),
        "EMAIL_LINE": rf"\email{{{latex_escape(email)}}}" if email else "",
        "HOMEPAGE": latex_url(homepage),
        "RESEARCH_INTERESTS": render_research_interests(site),
        "EXPERIENCE": experience,
        "BIB_RESOURCE": bib_resource,
        "ABSTRACT_SETUP": abstract_biblatex_setup(extended),
        "MISC_PAGE_BREAK": misc_page_break,
        "MISC_COLUMNS": misc_columns,
    }
    return fill_template(TEMPLATE_PATH.read_text(encoding="utf-8"), values)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate Simon Lucas's LaTeX CV from the website JSON data."
    )
    parser.add_argument("--extended", action="store_true", help="include publication abstracts")
    parser.add_argument(
        "--output",
        type=Path,
        help="output .tex path (default: generated_cv/simon_lucas[_extended].tex)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    suffix = "_extended" if args.extended else ""
    output = args.output or DEFAULT_OUTPUT_DIR / f"simon_lucas{suffix}.tex"
    if not output.is_absolute():
        output = PROJECT_ROOT / output
    if output.suffix.casefold() != ".tex":
        raise SystemExit("--output must name a .tex file")

    site = load_json(PROJECT_ROOT / "content" / "site.json")
    cv = load_json(PROJECT_ROOT / "content" / "cv.json")
    publications = load_json(PROJECT_ROOT / "content" / "publications.json")
    bibliography_source = (PROJECT_ROOT / "content" / "bibtex.bib").read_text(encoding="utf-8")
    bibliography_output = output.with_suffix(".bib")

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(
        build_document(site, cv, args.extended, bibliography_output.name),
        encoding="utf-8",
        newline="\n",
    )
    bibliography_output.write_text(
        prepare_bibliography(bibliography_source, publications, args.extended),
        encoding="utf-8",
        newline="\n",
    )
    shutil.copyfile(PROJECT_ROOT / "old_cv" / "altacv.cls", output.parent / "altacv.cls")
    print(f"Generated {output.relative_to(PROJECT_ROOT)}")


if __name__ == "__main__":
    main()

# Simon Lucas Website

A small static website with no framework dependency. Papers, CV, and portfolio each have their own page, while content is edited in JSON files and rendered by a lightweight browser script.

## Local preview

```bash
npm start
```

Then open `http://localhost:4173`.

## Checks

```bash
npm run check
```

## LaTeX CV

Generate the standard CV from the same JSON data as the website:

```bash
python scripts/generate_cv.py
```

Include publication abstracts in an extended CV:

```bash
python scripts/generate_cv.py --extended
```

The files are written to `generated_cv/` together with the AltaCV class and generated bibliography needed to compile them. Use `--output path/to/cv.tex` to choose another filename. The LaTeX layout and fixed education content live in `templates/cv_template.tex`; the Python script fills its named `@@...@@` placeholders from the website data. Publication metadata comes from `content/bibtex.bib`; the extended version augments its generated copy with abstracts from `content/publications.json`.

Because the publications use BibLaTeX, compile a generated CV with Biber between LaTeX passes:

```bash
cd generated_cv
pdflatex simon_lucas.tex
biber simon_lucas
pdflatex simon_lucas.tex
pdflatex simon_lucas.tex
```

Use `simon_lucas_extended` instead for the extended version.

## Editing content

- Profile, portrait, contact links: `content/site.json`
- Latest news, accepted papers, talks, updates: `content/news.json`
- Publications: `content/publications.json`
- CV and skills: `content/cv.json`
- Portfolio projects: `content/portfolio.json`

To add a publication, news item, talk, or portfolio item, copy an existing object, paste it into the same array, and edit the fields. Images can be remote URLs or local files placed in an `images/` folder.

Open the site through `npm start` rather than directly with `file://`, because browsers block JSON fetches from local files.

Pages:

- Home: `index.html`
- Papers: `publications.html`
- CV: `cv.html`
- Portfolio: `portfolio.html`

## Deployment

Upload the repository contents to any static host. The site only needs to serve the `.html` files, `assets/`, and `content/`.

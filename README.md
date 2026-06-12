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

## Editing content

- Profile, portrait, contact links: `content/site.json`
- Latest news, accepted papers, talks, updates: `content/news.json`
- Publications: `content/publications.json`
- CV and skills: `content/cv.json`
- Portfolio projects: `content/portfolio.json`

To add a publication, news item, talk, or portfolio item, copy an existing object, paste it into the same array, and edit the fields. Images can be remote URLs or local files placed in an `images/` folder.

Pages:

- Home: `index.html`
- Papers: `publications.html`
- CV: `cv.html`
- Portfolio: `portfolio.html`

## Deployment

Upload the repository contents to any static host. The site only needs to serve the `.html` files, `assets/`, and `content/`.

const contentFiles = {
  site: "./content/site.json",
  news: "./content/news.json",
  publications: "./content/publications.json",
  cv: "./content/cv.json",
  portfolio: "./content/portfolio.json"
};

const bundledContent = window.siteContent || {};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);

const linkMarkup = (links = []) =>
  links
    .map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`)
    .join("");

async function loadJson(path) {
  const key = path.split("/").pop()?.replace(".json", "");

  if (window.location.protocol === "file:" && key && Object.hasOwn(bundledContent, key)) {
    return bundledContent[key];
  }

  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }
  return response.json();
}

function setText(selector, value) {
  const element = $(selector);
  if (element && value) element.textContent = value;
}

function renderSite(site) {
  document.title = document.title || site.title;
  setText("[data-profile-role]", site.role);
  setText("[data-profile-summary]", site.summary);
  setText("[data-profile-bio]", site.bio);

  $$("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const profileImage = $("[data-profile-image]");
  if (profileImage && site.portrait) {
    profileImage.src = site.portrait;
    profileImage.alt = site.portraitAlt;
  }

  $$("[data-contact]").forEach((element) => {
    element.innerHTML = linkMarkup(site.links);
  });
}

function publicationCard(publication) {
  return `
    <article class="publication-card">
      <div class="publication-body">
        <div class="publication-copy">
          <div class="meta-line">
            <span>${escapeHtml(publication.venue)}</span>
            <span class="tag">${escapeHtml(publication.kind)}</span>
            ${publication.award ? `<span class="tag loud">${escapeHtml(publication.award)}</span>` : ""}
          </div>
          <h2>${escapeHtml(publication.title)}</h2>
          <p class="authors">${escapeHtml(publication.authors.join(", "))}</p>
          <div class="card-links">${linkMarkup(publication.links)}</div>
        </div>
        <a class="publication-media" href="${escapeHtml(publication.links?.[0]?.url || "#")}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(publication.title)}">
          <img src="${escapeHtml(publication.image)}" alt="${escapeHtml(publication.imageAlt)}" loading="lazy">
        </a>
      </div>
      <details class="publication-extra">
        <summary>Abstract</summary>
        <p class="abstract">${escapeHtml(publication.abstract)}</p>
      </details>
    </article>
  `;
}

function renderPublications(publications) {
  const target = $("[data-publications]");
  if (!target) return;

  target.innerHTML = publications.map(publicationCard).join("");
}

function newsItem(item) {
  const links = item.links?.length ? `<div class="card-links">${linkMarkup(item.links)}</div>` : "";

  return `
    <article class="news-item">
      <time datetime="${escapeHtml(item.date)}">${escapeHtml(item.displayDate)}</time>
      <span class="tag">${escapeHtml(item.category)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      ${links}
    </article>
  `;
}

function renderNews(news) {
  const preview = $("[data-news-preview]");
  if (preview) preview.innerHTML = news.slice(0, 4).map(newsItem).join("");
}

function timelineItem(item) {
  const details = item.details?.length
    ? `<ul>${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}</ul>`
    : "";

  return `
    <article class="timeline-item">
      <span class="timeline-date">${escapeHtml(item.date)}</span>
      <h2>${escapeHtml(item.title)}</h2>
      <p>${escapeHtml(item.place)}</p>
      ${details}
    </article>
  `;
}

function cvPanel(section) {
  return `
    <section class="cv-panel" aria-label="${escapeHtml(section.title)}">
      <h2>${escapeHtml(section.title)}</h2>
      <ul>
        ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function timelineSection(title, items) {
  return `
    <section class="cv-section" aria-labelledby="${escapeHtml(title.toLowerCase().replace(/\s+/g, "-"))}">
      <h2 id="${escapeHtml(title.toLowerCase().replace(/\s+/g, "-"))}">${escapeHtml(title)}</h2>
      <div class="timeline">
        ${items.map(timelineItem).join("")}
      </div>
    </section>
  `;
}

function renderCv(cv) {
  const target = $("[data-cv]");
  if (!target) return;

  target.innerHTML = `
    <div class="cv-main">
      ${timelineSection("Work experience", cv.experience)}
      ${timelineSection("Studies", cv.education)}
    </div>
    <aside class="cv-sidebar">
      <h2 class="cv-sidebar-title">Misc</h2>
      ${cv.sidebars.map(cvPanel).join("")}
    </aside>
  `;
}

function portfolioCard(project) {
  return `
    <article class="portfolio-card">
      <div class="portfolio-media">
        ${project.images.map((image) => `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy">`).join("")}
      </div>
      <div class="portfolio-body">
        <div class="meta-line">
          <span>${escapeHtml(project.year)}</span>
          ${project.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <h2>${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description)}</p>
        <div class="card-links">${linkMarkup(project.links)}</div>
      </div>
    </article>
  `;
}

function renderPortfolio(projects) {
  const target = $("[data-portfolio]");
  if (target) target.innerHTML = projects.map(portfolioCard).join("");
}

function setupNavigation() {
  const toggle = $(".nav-toggle");
  const links = $$(".nav-links a");
  const page = document.body.dataset.page;

  if (page) {
    const active = $(`[data-nav="${page}"]`);
    if (active) active.classList.add("is-active");
  }

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function showLoadError() {
  $("#main").insertAdjacentHTML(
    "afterbegin",
    `<div class="shell loading-error">The site content could not be loaded. Run a local server instead of opening the file directly.</div>`
  );
}

async function init() {
  try {
    const site = await loadJson(contentFiles.site);
    renderSite(site);

    const contentLoaders = [];
    if ($("[data-publications]")) {
      contentLoaders.push(loadJson(contentFiles.publications).then(renderPublications));
    }
    if ($("[data-news-preview]")) {
      contentLoaders.push(loadJson(contentFiles.news).then(renderNews));
    }
    if ($("[data-cv]")) {
      contentLoaders.push(loadJson(contentFiles.cv).then(renderCv));
    }
    if ($("[data-portfolio]")) {
      contentLoaders.push(loadJson(contentFiles.portfolio).then(renderPortfolio));
    }

    await Promise.all(contentLoaders);
    setupNavigation();
  } catch (error) {
    console.error(error);
    showLoadError();
  }
}

init();

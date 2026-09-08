// Schrijft na "vite build" per route een eigen dist/<route>/index.html met de
// juiste <title>, description, canonical en OG/Twitter-tags. Social scrapers
// (LinkedIn, WhatsApp, Slack, ...) voeren geen JavaScript uit, dus zonder deze
// stap toont elke gedeelde link de generieke homepage-preview.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { projects } from "../src/assets/projects/projects.js";
import { DEFAULT_DESCRIPTION, PRERENDER_ROUTES, SITE_URL, projectMeta } from "../src/seo.js";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, "../dist");
const template = readFileSync(resolve(distDir, "index.html"), "utf8");

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function setMetaContent(html, attr, key, content) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[\\s\\S]*?(")`, "i");
  if (!re.test(html)) throw new Error(`meta ${attr}="${key}" niet gevonden in dist/index.html`);
  return html.replace(re, `$1${escapeAttr(content)}$2`);
}

function renderPage({ title, description, path }) {
  const url = `${SITE_URL}${path}`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/i, `$1${escapeAttr(url)}$2`);
  html = setMetaContent(html, "name", "description", description);
  html = setMetaContent(html, "property", "og:title", title);
  html = setMetaContent(html, "property", "og:description", description);
  html = setMetaContent(html, "property", "og:url", url);
  html = setMetaContent(html, "name", "twitter:title", title);
  html = setMetaContent(html, "name", "twitter:description", description);
  return html;
}

function writePage(path, html) {
  const dir = resolve(distDir, `.${path}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), html);
}

const pages = [
  ...PRERENDER_ROUTES.map((route) => ({
    path: route.path,
    title: route.title,
    description: route.description ?? DEFAULT_DESCRIPTION,
  })),
  ...projects.map((project) => projectMeta(project)),
];

for (const page of pages) {
  writePage(page.path, renderPage(page));
}

console.log(`prerender: ${pages.length} pagina's -> dist/<route>/index.html`);

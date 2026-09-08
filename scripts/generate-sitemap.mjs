// Genereert public/sitemap.xml uit de routes (src/seo.js) en de projectdata.
// Draait als onderdeel van "npm run build" en is los uitvoerbaar via
// "npm run generate:sitemap".

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { projects } from "../src/assets/projects/projects.js";
import { PRERENDER_ROUTES, SITE_URL } from "../src/seo.js";

const here = dirname(fileURLToPath(import.meta.url));
const outFile = resolve(here, "../public/sitemap.xml");

function toIsoDate(ddmmyyyy) {
  const [day, month, year] = ddmmyyyy.split("-");
  return `${year}-${month}-${day}`;
}

const latestProjectDate = projects
  .map((project) => toIsoDate(project.date))
  .sort()
  .at(-1);

const entries = [
  ...PRERENDER_ROUTES.map((route) => ({
    path: route.path,
    priority: route.priority,
    lastmod: latestProjectDate,
  })),
  ...[...projects]
    .sort((a, b) => a.id - b.id)
    .map((project) => ({
      path: `/project/${project.id}`,
      priority: "0.5",
      lastmod: toIsoDate(project.date),
    })),
];

const body = entries
  .map(
    ({ path, priority, lastmod }) =>
      `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(outFile, xml);
console.log(`sitemap: ${entries.length} URLs -> ${outFile}`);

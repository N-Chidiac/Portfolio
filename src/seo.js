// Gedeelde SEO-constanten en -helpers. Wordt zowel in de app (router) als bij de
// build (scripts/generate-sitemap.mjs, scripts/prerender.mjs) gebruikt, dus hier
// staat geen Vite- of browser-specifieke code.

export const SITE_URL = "https://nourchidiac.netlify.app";
export const SITE_NAME = "Nour Chidiac";
export const DEFAULT_DESCRIPTION =
  "Portfolio van Nour Chidiac, junior web developer. Projecten, vaardigheden en contactinfo.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.png`;

/**
 * Kort een tekst af op een woordgrens en zet er een ellipsis achter.
 */
export function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * Meta voor een projectdetailpagina, afgeleid uit de projectdata.
 */
export function projectMeta(project) {
  const name = project.name.replace(/\n/g, " ");
  return {
    path: `/project/${project.id}`,
    title: `${name} — ${SITE_NAME}`,
    description: truncate(project.description[0], 155),
  };
}

/**
 * Statische pagina's die bij de build een eigen <head> (prerender) en een
 * sitemap-entry krijgen. De titels/omschrijvingen moeten overeenkomen met de
 * route-meta in src/router/index.js (afgedekt door src/router/__tests__).
 */
export const PRERENDER_ROUTES = [
  {
    path: "/home",
    title: SITE_NAME + " — Web Developer",
    description: DEFAULT_DESCRIPTION,
    priority: "1.0",
  },
  {
    path: "/projects",
    title: "Projects — " + SITE_NAME,
    description: "Overzicht van alle projecten van Nour Chidiac, gesorteerd op datum.",
    priority: "0.9",
  },
  {
    path: "/about",
    title: "About — " + SITE_NAME,
    description: "Achtergrond, hobby's en interesses van Nour Chidiac.",
    priority: "0.6",
  },
  {
    path: "/facts",
    title: "Fun Facts — " + SITE_NAME,
    description: "Persoonlijke weetjes over Nour Chidiac.",
    priority: "0.4",
  },
  {
    path: "/contact",
    title: "Contact — " + SITE_NAME,
    description: "Neem contact op met Nour Chidiac via e-mail, telefoon of LinkedIn.",
    priority: "0.6",
  },
  {
    path: "/privacy",
    title: "Privacy Policy — " + SITE_NAME,
    description: "Privacybeleid van nourchidiac.netlify.app, conform de AVG/GDPR.",
    priority: "0.2",
  },
];

// Gedeelde helpers rond de projectendata. Voorheen stonden deze identiek in
// HomeView, AllProjects en ProjectView.

const projectImages = import.meta.glob("@/assets/projects/*", { eager: true });

/**
 * Zet een "DD-MM-YYYY"-datum om naar een Date-object.
 * @param {string} date
 * @returns {Date}
 */
export function parseProjectDate(date) {
  const [day, month, year] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Sorteer-comparator: nieuwste eerst, bij gelijke datum hoogste id eerst.
 */
export function byDateDesc(a, b) {
  const dateDiff = parseProjectDate(b.date) - parseProjectDate(a.date);
  if (dateDiff !== 0) return dateDiff;
  return b.id - a.id;
}

/**
 * Geeft een op datum (aflopend) gesorteerde kopie van de lijst terug.
 */
export function sortByDateDesc(list) {
  return [...list].sort(byDateDesc);
}

/**
 * Zet een projectpad ("./projects/foo.webp") om naar de gebundelde asset-URL.
 * @param {string} path
 * @returns {string | undefined}
 */
export function getProjectImage(path) {
  const key = path.replace("./projects/", "/src/assets/projects/");
  return projectImages[key]?.default;
}

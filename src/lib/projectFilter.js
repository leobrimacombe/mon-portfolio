// Pure helpers behind the Work section's search and scope filter. They have no React
// or extensionless imports, so `node --test` can exercise them directly.

// Lower-cases and strips accents, so a search for "electrique" finds "ÉLECTRIQUE".
const fold = (value) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

/**
 * Projects matching a free-text query (title, description, category, tags, year) and
 * a scope. Field reads are guarded so an incomplete (draft) entry can never crash the
 * filter.
 *
 * @param {Array} projects
 * @param {string} [query='']
 * @param {'all' | 'pro' | 'iut'} [scope='all']
 * @returns {Array}
 */
export function filterProjects(projects, query = '', scope = 'all') {
  const q = fold(query.trim());
  return projects.filter((p) => {
    if (scope !== 'all' && p.scope !== scope) return false;
    if (!q) return true;
    const fields = [p.title, p.description, p.category, p.year, ...(p.tags || [])];
    return fields.some((field) => fold(String(field ?? '')).includes(q));
  });
}

/**
 * Distinct years of `projects`, newest first.
 *
 * @param {Array} projects
 * @returns {string[]}
 */
export function yearsNewestFirst(projects) {
  return [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a);
}

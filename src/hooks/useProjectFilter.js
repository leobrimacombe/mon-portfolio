import { useMemo, useState } from 'react';
import { PROJECTS_DATA } from '../data/projects';

/**
 * Free-text search over the project catalogue (title, description, category, tags,
 * year) plus the list of matching years sorted from newest to oldest.
 *
 * Field reads are guarded so an incomplete (draft) entry can never crash the filter.
 *
 * @param {Array} [projects=PROJECTS_DATA] - source list to search.
 * @returns {{
 *   searchQuery: string,
 *   setSearchQuery: (value: string) => void,
 *   filteredProjects: Array,
 *   sortedYears: string[]
 * }}
 */
export function useProjectFilter(projects = PROJECTS_DATA) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;
    const lowerQuery = searchQuery.toLowerCase();

    return projects.filter((p) =>
      (p.title || '').toLowerCase().includes(lowerQuery) ||
      (p.description || '').toLowerCase().includes(lowerQuery) ||
      (p.category || '').toLowerCase().includes(lowerQuery) ||
      (p.tags || []).some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      (p.year || '').includes(lowerQuery)
    );
  }, [projects, searchQuery]);

  const sortedYears = useMemo(
    () => [...new Set(filteredProjects.map((p) => p.year))].sort((a, b) => b - a),
    [filteredProjects]
  );

  return { searchQuery, setSearchQuery, filteredProjects, sortedYears };
}

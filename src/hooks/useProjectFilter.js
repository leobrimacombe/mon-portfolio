import { useMemo, useState } from 'react';
import { PROJECTS_DATA } from '../data/projects';
import { filterProjects, yearsNewestFirst } from '../lib/projectFilter';

/**
 * Search + scope state for the Work section: free-text search over the project
 * catalogue (title, description, category, tags, year, accent-insensitive), a scope
 * filter ('all', 'pro' or 'iut'), and the matching years sorted from newest to oldest.
 *
 * @param {Array} [projects=PROJECTS_DATA] - source list to search.
 * @returns {{
 *   searchQuery: string,
 *   setSearchQuery: (value: string) => void,
 *   scope: 'all' | 'pro' | 'iut',
 *   setScope: (value: 'all' | 'pro' | 'iut') => void,
 *   filteredProjects: Array,
 *   sortedYears: string[]
 * }}
 */
export function useProjectFilter(projects = PROJECTS_DATA) {
  const [searchQuery, setSearchQuery] = useState('');
  const [scope, setScope] = useState('all');

  const filteredProjects = useMemo(
    () => filterProjects(projects, searchQuery, scope),
    [projects, searchQuery, scope]
  );

  const sortedYears = useMemo(() => yearsNewestFirst(filteredProjects), [filteredProjects]);

  return { searchQuery, setSearchQuery, scope, setScope, filteredProjects, sortedYears };
}

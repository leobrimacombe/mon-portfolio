import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects, yearsNewestFirst } from './projectFilter.js';

const projects = [
  { id: 1, title: 'SITE DE GESTION ÉLECTRIQUE', category: 'App Laravel / Grafana', year: '2026', description: 'Tableaux de bord', tags: ['Laravel', 'InfluxDB'], scope: 'iut' },
  { id: 2, title: 'BOOKAPP', category: 'App Next.js / Supabase', year: '2026', description: 'Carnet de lecture', tags: ['Next.js'], scope: 'pro' },
  { id: 3, title: 'JEU UNITY', category: 'Jeu Unity', year: '2025', description: 'Jeu de parcours', tags: ['C#'], scope: 'iut' },
  { id: 4, title: 'BROUILLON' }, // draft entry: missing fields must not crash the filter
];

const ids = (list) => list.map((p) => p.id);

test('an empty query keeps every project', () => {
  assert.deepEqual(ids(filterProjects(projects, '')), [1, 2, 3, 4]);
});

test('search ignores case, accents and surrounding spaces', () => {
  assert.deepEqual(ids(filterProjects(projects, '  electrique ')), [1]);
  assert.deepEqual(ids(filterProjects(projects, 'BookApp')), [2]);
});

test('search looks at tags, category, description and year', () => {
  assert.deepEqual(ids(filterProjects(projects, 'influx')), [1]);
  assert.deepEqual(ids(filterProjects(projects, 'unity')), [3]);
  assert.deepEqual(ids(filterProjects(projects, 'lecture')), [2]);
  assert.deepEqual(ids(filterProjects(projects, '2025')), [3]);
});

test('scope narrows the list and combines with the query', () => {
  assert.deepEqual(ids(filterProjects(projects, '', 'iut')), [1, 3]);
  assert.deepEqual(ids(filterProjects(projects, '', 'pro')), [2]);
  assert.deepEqual(ids(filterProjects(projects, '2026', 'iut')), [1]);
});

test('years are unique and sorted newest first', () => {
  assert.deepEqual(yearsNewestFirst(projects.slice(0, 3)), ['2026', '2025']);
});

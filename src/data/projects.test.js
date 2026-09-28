// Integrity checks on the project catalogue: catches a typo in an AC code, a missing
// field, or an image that was renamed without updating its path.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { PROJECTS_DATA, SCOPE_LABELS } from './projects.js';
import { COMPETENCY_LABELS } from './competencies.js';

const publicDir = new URL('../../public/', import.meta.url);

test('project ids are unique', () => {
  const ids = PROJECTS_DATA.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every project has what the list and the modal display', () => {
  for (const p of PROJECTS_DATA) {
    for (const key of ['title', 'category', 'year', 'description']) {
      assert.ok(p[key], `${p.title ?? p.id}: missing "${key}"`);
    }
    assert.ok(p.scope in SCOPE_LABELS, `${p.title}: unknown scope "${p.scope}"`);
    assert.ok(p.link || p.gitLink, `${p.title}: needs a demo link or a repository link`);
  }
});

test('every competency code exists in the référentiel labels', () => {
  for (const p of PROJECTS_DATA) {
    for (const code of p.competencies ?? []) {
      assert.ok(COMPETENCY_LABELS[code], `${p.title}: unknown competency "${code}"`);
    }
  }
});

test('every project image exists in public/', () => {
  for (const p of PROJECTS_DATA) {
    for (const src of p.images ?? []) {
      assert.ok(existsSync(new URL(`.${src}`, publicDir)), `${p.title}: missing file public${src}`);
    }
  }
});

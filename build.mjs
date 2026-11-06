#!/usr/bin/env node
/**
 * Build the browser artifact `client/index.js` from the modules in `src/`.
 *
 * Why a build step at all: a plain-JS Client half has no `import`, no JSX and no
 * bundler — the Harness loads one file that calls
 * `window.__ModuleLoader__.load({ id, factory })`. Concatenating the sources into
 * that factory gives a readable multi-file layout without a toolchain.
 *
 * Every source file is a snippet that relies on the enclosing factory scope
 * (`React`, `h`, and the other modules). Top-level comments and blank lines are
 * kept, so the generated file still reads like source.
 *
 * Usage: node build.mjs          (writes client/index.js)
 *        node build.mjs --check  (fails if client/index.js is out of date)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const OUT = join(root, 'client', 'index.js');

/** Concatenation order: dependencies first, `plugin.js` last (it returns). */
const SOURCES = [
  'src/constants.js',
  'src/locale/en.js',
  'src/locale/zh.js',
  'src/storage.js',
  'src/backup.js',
  'src/styles.js',
  'src/icons.js',
  'src/format.js',
  'src/board-ops.js',
  'src/components/row.js',
  'src/components/group.js',
  'src/components/nav.js',
  'src/components/search.js',
  'src/components/trash.js',
  'src/components/archive.js',
  'src/page.js',
  'src/plugin.js',
];

const HEADER = `/**
 * Client half of the dsh-todo bundle (sidebar panel "todos").
 *
 * GENERATED FILE — do not edit. Sources live in \`src/\`; run
 * \`node build.mjs\` from the package root to regenerate this file.
 *
 * The Harness loads one plain-JS browser artifact that registers a lazy factory
 * whose id equals the package name; React comes from the host module table. All
 * modules therefore share this single factory scope.
 */
window.__ModuleLoader__.load({
  id: '@local/dsh-todo',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
`;

const FOOTER = `  },
});
`;

/** Indent one module by four spaces inside the factory body. */
function indent(text) {
  return text
    .replace(/\s+$/, '')
    .split('\n')
    .map((line) => (line.length ? '    ' + line : ''))
    .join('\n');
}

/** The module separator, which also marks where each piece came from. */
const rule = (file) => [
  '',
  '    /* ' + '-'.repeat(70) + ' */',
  '    /* ' + file.padEnd(70) + ' */',
  '    /* ' + '-'.repeat(70) + ' */',
].join('\n');

async function render() {
  const parts = [HEADER];
  for (const file of SOURCES) {
    const text = await readFile(join(root, file), 'utf8');
    parts.push(rule(file));
    parts.push(indent(text));
  }
  parts.push(FOOTER);
  return parts.join('\n') + '\n';
}

const out = await render();

if (process.argv.includes('--check')) {
  let current = '';
  try {
    current = await readFile(OUT, 'utf8');
  } catch (e) { /* missing file counts as out of date */ }
  if (current !== out) {
    console.error('client/index.js is out of date. Run: node build.mjs');
    process.exit(1);
  }
  console.log('client/index.js is up to date.');
} else {
  await writeFile(OUT, out, 'utf8');
  console.log('Wrote client/index.js (' + out.split('\n').length + ' lines) from ' + SOURCES.length + ' sources.');
}

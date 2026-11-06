// Dev-script tests: the CI gates (validate, contrast) pass on the repo
// as committed, and the contrast math is right on known pairs.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { contrastRatio, composite, SCHEMES } from '../scripts/check-contrast.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function run(script) {
  const r = spawnSync(process.execPath, [path.join(ROOT, script)], { cwd: ROOT, encoding: 'utf8' });
  assert.equal(r.status, 0, `${script} must exit 0\nstdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  return r.stdout;
}

test('contrast math: known ratios', () => {
  assert.ok(Math.abs(contrastRatio('#000000', '#ffffff') - 21) < 0.01, 'black on white is 21:1');
  assert.equal(contrastRatio('#9b2a1a', '#9b2a1a'), 1);
  const redOnPaper = contrastRatio(SCHEMES.light.red, SCHEMES.light.paper);
  assert.ok(redOnPaper > 6 && redOnPaper < 7, `red ink on paper ~6.5:1 (got ${redOnPaper.toFixed(2)})`);
  // PLAN §8's stated figures: rule 1.55:1 decoration-only, bronze 5.4:1.
  assert.ok(Math.abs(contrastRatio(SCHEMES.light.rule, SCHEMES.light.paper) - 1.55) < 0.05);
  assert.ok(Math.abs(contrastRatio(SCHEMES.light.bronze, SCHEMES.light.paper) - 5.4) < 0.1);
  assert.deepEqual(composite('#000000', '#ffffff', 0.5), [128, 128, 128]);
});

test('scripts/check-contrast.mjs passes on the shipped CSS (both schemes)', () => {
  const out = run('scripts/check-contrast.mjs');
  assert.match(out, /check-contrast OK/);
});

test('scripts/validate.mjs passes (phase-4 stubs are reported, not hidden)', () => {
  const out = run('scripts/validate.mjs');
  assert.match(out, /validate OK/);
});

test('icon builder and service worker parse (the lead runs the builder)', () => {
  for (const f of ['scripts/build-icons.mjs', 'sw.js']) {
    const r = spawnSync(process.execPath, ['--check', path.join(ROOT, f)], { encoding: 'utf8' });
    assert.equal(r.status, 0, `${f} must parse:\n${r.stderr}`);
  }
});

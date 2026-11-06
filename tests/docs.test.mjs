// Docs cross-checks (PLAN §9 "content", phase-2 slice): the plan, the register
// and the engine cannot silently drift apart. Grows into the phase-4 content
// tests when data/passages.js lands.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BIRDS, RULE_EVIDENCE } from '../js/rules.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const plan = fs.readFileSync(path.join(ROOT, 'docs/PLAN.md'), 'utf8');
const sources = fs.readFileSync(path.join(ROOT, 'docs/SOURCES.md'), 'utf8');

test('every engine rule ID and bird ID appears in PLAN.md', () => {
  for (const id of Object.keys(RULE_EVIDENCE)) {
    assert.ok(plan.includes(id), `${id} missing from PLAN.md`);
  }
  for (const bird of Object.values(BIRDS)) {
    assert.ok(plan.includes(bird.ruleId), `${bird.ruleId} missing from PLAN.md`);
  }
});

test('every work cited by the rules has a SOURCES.md row', () => {
  // [register name, citation forms used in PLAN.md]
  const works = [
    ['Cicero', ['Cic.']], ['Livy', ['Livy']], ['Varro', ['Varro']], ['Pliny', ['Pliny']],
    ['Festus', ['Festus']], ['Servius', ['Servius']], ['Plautus', ['Plaut.']],
    ['Suetonius', ['Suet.']], ['Gellius', ['Gellius']],
    ['Valerius Maximus', ['Valerius Maximus', 'Val. Max.']],
    ['Periochae', ['*Per.* 19', 'Periochae']], ['Homer', ['Hom.', 'Homer']],
    ['Hercher', ['Hercher']],
  ];
  for (const [work, citations] of works) {
    assert.ok(sources.includes(work), `${work} missing from SOURCES.md`);
    assert.ok(citations.some((c) => plan.includes(c)), `${work} not cited in PLAN.md`);
  }
});

test('phase table reflects the decisions: 4a/4b/4c, phase 2 in progress, no open questions left', () => {
  assert.match(plan, /4a\. Texts pilot/);
  assert.match(plan, /4b\. Texts in bulk/);
  assert.match(plan, /4c\. Fidelity review/);
  assert.match(plan, /2\. Engine \+ tests.*in progress/s);
  assert.ok(!plan.includes('Open questions for review'));
  assert.match(plan, /The four questions, decided/);
});

test('register records the provenance rule and the licence files on the yijing pattern', () => {
  assert.ok(sources.includes('scripts/provenance.json'));
  assert.ok(sources.includes('collation only'));
  assert.ok(sources.includes('LICENSE-content.md'));
  assert.ok(fs.existsSync(path.join(ROOT, 'LICENSE')));
  assert.ok(fs.existsSync(path.join(ROOT, 'LICENSE-content.md')));
});

test('phase 3 UI artefacts exist (index.html, css, views, birds, fonts)', () => {
  for (const rel of ['index.html', '404.html', '.nojekyll', 'css/base.css', 'css/views.css',
    'js/app.js', 'js/router.js', 'js/store.js', 'js/sensors.js',
    'fonts/cinzel.woff2', 'fonts/eb-garamond.woff2', 'scripts/build-fonts.py', 'scripts/serve.mjs']) {
    assert.ok(fs.existsSync(path.join(ROOT, rel)), `${rel} missing`);
  }
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert.ok(!/https?:\/\/(fonts|cdn)/.test(html), 'no third-party font/CDN requests');
});

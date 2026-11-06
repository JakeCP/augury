// Passage completeness tests (phase 4b): every record in
// data/passages.js is complete, licences are non-empty per field,
// every rule/bird ID in js/rules.js is supported by at least one
// passage, and every record is pinned in scripts/provenance.json.
// Kept separate from tests/content.test.mjs (Sortes-owned) so the
// two phase-4b runs do not collide. Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { passages } from '../data/passages.js';
import { BIRDS, RULE_EVIDENCE, RULE_NAMES } from '../js/rules.js';

const nonEmpty = (s) => typeof s === 'string' && s.trim().length > 0;
const KNOWN_TIERS = new Set(['technical', 'quintus', 'marcus', 'draft-law', 'legend', 'history', 'comedy', 'natural-history', 'poetry', 'reconstruction', 'balbus']);
// Every rule ID must have a supporting passage, R-WEIGH included:
// livy-1-7-1 is attached as supporting context (competing signs
// weighed by priority against number); the arithmetic itself stays
// reconstruction, as that record's orthography note states.

test('passages (4b): every record complete with per-field licences and a source pin', () => {
  assert.equal(passages.length, 47, '47 passage records');
  assert.equal(new Set(passages.map((p) => p.id)).size, passages.length, 'ids unique');
  for (const p of passages) {
    assert.ok(nonEmpty(p.citation) && nonEmpty(p.speaker) && nonEmpty(p.date), `${p.id}: citation/speaker/date`);
    assert.ok(KNOWN_TIERS.has(p.tier), `${p.id}: known tier (${p.tier})`);
    assert.ok(p.original.lang === 'la' || p.original.lang === 'grc', `${p.id}: original.lang`);
    assert.ok(nonEmpty(p.original.text), `${p.id}: original text non-empty`);
    assert.ok(nonEmpty(p.original.licence), `${p.id}: original licence non-empty`);
    assert.ok(Array.isArray(p.translations) && p.translations.length >= 1, `${p.id}: at least one translation`);
    for (const t of p.translations) {
      assert.ok(nonEmpty(t.text) && nonEmpty(t.label) && nonEmpty(t.licence), `${p.id}: translation text/label/licence`);
    }
    assert.ok(nonEmpty(p.orthography), `${p.id}: orthography note present`);
    assert.ok(p.source && nonEmpty(p.source.edition) && nonEmpty(p.source.page) && nonEmpty(p.source.cache), `${p.id}: source edition+page+cache`);
  }
});

test('passages (4b): every rule and bird ID has at least one supporting passage', () => {
  const have = new Set(passages.flatMap((p) => p.rules));
  for (const id of Object.keys(RULE_EVIDENCE)) {
    assert.ok(have.has(id), `${id} (${RULE_NAMES[id]}) has a passage`);
  }
  for (const id of new Set(Object.values(BIRDS).map((b) => b.ruleId))) {
    assert.ok(have.has(id), `${id} has a passage`);
  }
  // Full coverage, no exceptions.
  assert.deepEqual(Object.keys(RULE_EVIDENCE).filter((id) => !have.has(id)), []);
});

test('passages (4b): provenance.json pins every passage to edition and page', () => {
  const prov = JSON.parse(readFileSync(new URL('../scripts/provenance.json', import.meta.url), 'utf8'));
  assert.equal(prov.passages.length, passages.length, 'one pin per passage');
  const pins = new Map(prov.passages.map((x) => [x.id, x]));
  for (const p of passages) {
    const pin = pins.get(p.id);
    assert.ok(pin, `${p.id}: pinned`);
    assert.equal(pin.edition, p.source.edition, `${p.id}: edition agrees with record`);
    assert.equal(pin.page, p.source.page, `${p.id}: page agrees with record`);
    assert.ok(nonEmpty(pin.cache), `${p.id}: cache file named`);
  }
});

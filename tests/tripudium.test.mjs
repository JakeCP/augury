// Tripudium tests (PLAN.md §4): exact rng->outcome boundaries first,
// a long seeded run as a smoke check second (never Math.random).
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  tripudium, outcomeForValue, mulberry32, HUNGER_LEVELS, OUTCOMES, VERDICT_BY_OUTCOME,
} from '../js/tripudium.js';

const fixed = (v) => () => v;

test('each hunger row sums to exactly 1 and lists every outcome in order', () => {
  for (const [level, row] of Object.entries(HUNGER_LEVELS)) {
    const sum = OUTCOMES.reduce((s, o) => s + row[o], 0);
    assert.ok(Math.abs(sum - 1) < 1e-12, `${level} sums to ${sum}`);
    for (const o of OUTCOMES) assert.ok(row[o] > 0 && row[o] < 1, `${level}/${o}`);
  }
});

test('exact boundary values for every hunger row', () => {
  const eps = 1e-9;
  for (const [level, row] of Object.entries(HUNGER_LEVELS)) {
    let edge = 0;
    for (const outcome of OUTCOMES) {
      assert.equal(outcomeForValue(edge, level), outcome, `${level} @ ${edge} (lower edge)`);
      assert.equal(outcomeForValue(edge + row[outcome] - eps, level), outcome, `${level} just below next edge`);
      edge += row[outcome];
    }
    assert.equal(outcomeForValue(1 - eps, level), 'avolant');
  }
  // Spot-check the published table itself.
  assert.equal(outcomeForValue(0.3999, 'fed'), 'solistimum');
  assert.equal(outcomeForValue(0.40, 'fed'), 'pascuntur');
  assert.equal(outcomeForValue(0.65, 'fed'), 'non_pascuntur');
  assert.equal(outcomeForValue(0.90, 'fed'), 'avolant');
  assert.equal(outcomeForValue(0.70, 'hungry'), 'pascuntur');
  assert.equal(outcomeForValue(0.92, 'starved'), 'pascuntur');
});

test('outcome -> verdict mapping, Latin attached, defaults are the customary hungry flock', () => {
  assert.equal(VERDICT_BY_OUTCOME.solistimum, 'ADMITTUNT');
  assert.equal(VERDICT_BY_OUTCOME.pascuntur, 'ALIO_DIE');
  assert.equal(VERDICT_BY_OUTCOME.non_pascuntur, 'NON_ADMITTUNT');
  assert.equal(VERDICT_BY_OUTCOME.avolant, 'NON_ADMITTUNT');
  const r = tripudium(fixed(0));
  assert.equal(r.outcome, 'solistimum');
  assert.equal(r.verdict, 'ADMITTUNT');
  assert.equal(r.latin, 'AVES ADMITTVNT');
  assert.equal(r.hunger, 'hungry');
  assert.equal(r.attempt, 1);
});

test('auspicium coactum gloss for BOTH hungry settings; attempts are recorded, not hidden', () => {
  assert.equal(tripudium(fixed(0), { hunger: 'fed' }).coactum, false);
  assert.equal(tripudium(fixed(0), { hunger: 'hungry' }).coactum, true);
  assert.equal(tripudium(fixed(0), { hunger: 'starved' }).coactum, true);
  assert.ok(tripudium(fixed(0), { hunger: 'starved' }).glosses.includes('auspicium-coactum'));
  // No coactum sneer when even starved chickens refuse.
  assert.equal(tripudium(fixed(0.99), { hunger: 'starved' }).coactum, false);
  const third = tripudium(fixed(0), { attempt: 3 });
  assert.equal(third.attempt, 3);
  assert.ok(third.glosses.includes('auspicia-coacta'));
});

test('mulberry32 is deterministic and stays in [0, 1)', () => {
  const a = mulberry32(42);
  const b = mulberry32(42);
  for (let i = 0; i < 100; i += 1) {
    const v = a();
    assert.equal(v, b());
    assert.ok(v >= 0 && v < 1);
  }
  assert.notEqual(mulberry32(1)(), mulberry32(2)());
  assert.throws(() => mulberry32(1.5), RangeError);
});

test('seeded smoke check: long run lands near the published table', () => {
  const rng = mulberry32(249); // Drepana, 249 BC. He should have listened.
  const N = 20000;
  const tally = Object.fromEntries(OUTCOMES.map((o) => [o, 0]));
  for (let i = 0; i < N; i += 1) tally[tripudium(rng, { hunger: 'hungry' }).outcome] += 1;
  for (const o of OUTCOMES) {
    const observed = tally[o] / N;
    assert.ok(Math.abs(observed - HUNGER_LEVELS.hungry[o]) < 0.02,
      `${o}: observed ${observed}, table ${HUNGER_LEVELS.hungry[o]}`);
  }
});

test('bad rng and bad options throw clearly', () => {
  assert.throws(() => tripudium(null), TypeError);
  assert.throws(() => tripudium(fixed(1)), RangeError); // 1 is outside [0,1)
  assert.throws(() => tripudium(fixed(-0.1)), RangeError);
  assert.throws(() => tripudium(fixed(NaN)), RangeError);
  assert.throws(() => tripudium(fixed(0), { hunger: 'peckish' }), RangeError);
  assert.throws(() => tripudium(fixed(0), { attempt: 0 }), RangeError);
  assert.throws(() => outcomeForValue(1, 'fed'), RangeError);
});

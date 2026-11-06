// Rules tests (PLAN.md §3): the §3.3 decision table mirrored row for row.
// If the table in the plan changes, this file changes in the same commit.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  interpret, BIRDS, BIRD_IDS, RULE_EVIDENCE, VERDICTS, RULES_VERSION,
  countFactor, flightFactor, modeFactor, favouredSide, isDireSign,
} from '../js/rules.js';

// Dense relative bearings: with the default front, rel 90 = right, 270 = left.
const R = 90;
const L = 270;
let seq = 0;
function sign(over = {}) {
  seq += 1;
  return {
    bird: 'crow', kinds: ['voice'], relDeg: L, height: 'na', flight: 'na',
    count: 1, declined: false, chokedVoice: false, foodFell: false, dtSec: seq * 10,
    ...over,
  };
}
function obs(over = {}) {
  return {
    tradition: 'roman', orientation: 'varro', frontDeg: 180,
    vitium: false, isDaylight: true, attemptsToday: 1, signs: [],
    ...over,
  };
}
const verdictOf = (o) => interpret(o).verdict;
const frac = (num, den = 1) => ({ num, den, value: num / den });

// ---------------------------------------------------------------- factors

test('R-COUNT: rational count factor (m+3)/4 capped at twelve, exact fractions', () => {
  assert.deepEqual(countFactor(1), frac(1));
  assert.deepEqual(countFactor(2), frac(5, 4));
  assert.deepEqual(countFactor(4), frac(7, 4));
  assert.deepEqual(countFactor(6), frac(9, 4));
  assert.deepEqual(countFactor(12), frac(15, 4));
  assert.throws(() => countFactor(0), RangeError);
  assert.throws(() => countFactor(13), RangeError);
  assert.throws(() => countFactor(1.5), RangeError);
});

test('R-PRAEPES: one flight factor, applied once (onward+high is still 3/2)', () => {
  assert.deepEqual(flightFactor({ kinds: ['flight'], flight: 'onward', height: 'high' }), frac(3, 2));
  assert.deepEqual(flightFactor({ kinds: ['flight'], flight: 'across', height: 'high' }), frac(5, 4));
  assert.deepEqual(flightFactor({ kinds: ['flight'], flight: 'across', height: 'low' }), frac(3, 4));
  assert.deepEqual(flightFactor({ kinds: ['flight'], flight: 'circling', height: 'middle' }), frac(1));
  // No flight kind: height/direction are meaningless, factor 1.
  assert.deepEqual(flightFactor({ kinds: ['voice'], flight: 'onward', height: 'high' }), frac(1));
});

test('R-MODE: own mode at full strength, wrong mode at one half', () => {
  assert.deepEqual(modeFactor('raven', ['voice']), frac(1));
  assert.deepEqual(modeFactor('raven', ['flight']), frac(1, 2)); // silent raven overhead
  assert.deepEqual(modeFactor('eagle', ['voice']), frac(1, 2)); // screaming eagle
  assert.deepEqual(modeFactor('picus', ['flight']), frac(1)); // woodpecker: either
  assert.deepEqual(modeFactor('bubo', ['flight']), frac(1)); // eagle-owl: either
  assert.deepEqual(modeFactor('crow', ['voice', 'flight']), frac(1)); // both together count once
  assert.throws(() => modeFactor('dodo', ['voice']), RangeError);
});

test('R-SIDE / R-EXCEPT: favoured side by tradition; exceptions Roman only', () => {
  assert.equal(favouredSide('eagle', 'roman'), 'left');
  assert.equal(favouredSide('eagle', 'greek'), 'right');
  assert.equal(favouredSide('raven', 'roman'), 'right');
  assert.equal(favouredSide('raven', 'greek'), 'right'); // plain Greek rule; no exception machinery
  assert.equal(favouredSide('crow', 'roman'), 'left');
  assert.equal(favouredSide('picus', 'roman'), 'left');
  assert.equal(favouredSide('crow', 'greek'), 'right'); // exception does NOT follow into Greek
});

test('B-* table is complete and every rule the engine emits has an evidence tier', () => {
  for (const id of ['raven', 'crow', 'noctua', 'bubo', 'owlUnsure', 'eagle', 'vulture', 'buteo', 'picus', 'pulli', 'other']) {
    assert.ok(BIRDS[id], `missing bird ${id}`);
    assert.match(BIRDS[id].ruleId, /^B-/);
  }
  assert.deepEqual([...BIRD_IDS].sort(), Object.keys(BIRDS).sort());
  for (const id of ['R-SIDE', 'R-EXCEPT', 'R-MODE', 'R-TEMPLUM', 'R-ASK', 'R-DECLINE', 'R-LINE',
    'R-DIRA', 'R-PRAEPES', 'R-REMORA', 'R-COUNT', 'R-TANAQUIL', 'R-TRIP-ANY', 'R-WEIGH',
    'R-NONE', 'R-CLEAR', 'R-MIXED', 'R-SILENTIUM', 'R-REPEAT', 'R-FALSE']) {
    assert.ok(RULE_EVIDENCE[id]?.length > 0, `no tier for ${id}`);
  }
  assert.equal(VERDICTS.ADMITTUNT.latin, 'AVES ADMITTVNT');
  assert.equal(typeof RULES_VERSION, 'number');
});

// ------------------------------------------------- decision table: verdicts

test('V3/R-NONE: empty watch, and watch with no weighed sign, is ALIO DIE', () => {
  seq = 0;
  assert.equal(verdictOf(obs()), 'ALIO_DIE');
  const r = interpret(obs({ signs: [sign({ bird: 'other', kinds: ['flight'] })] }));
  assert.equal(r.verdict, 'ALIO_DIE');
  assert.deepEqual(r.decidedBy, ['R-NONE']);
  assert.equal(r.signs[0].classification, 'noted'); // B-OTHER recorded, not weighed
});

test('V4/R-CLEAR + R-SIDE: left favours Romans, right favours Greeks', () => {
  assert.equal(verdictOf(obs({ signs: [sign({ relDeg: L })] })), 'ADMITTUNT');
  assert.equal(verdictOf(obs({ signs: [sign({ relDeg: R })] })), 'NON_ADMITTUNT');
  const greek = { tradition: 'greek', orientation: 'greek', frontDeg: 0 };
  assert.equal(verdictOf(obs({ ...greek, signs: [sign({ relDeg: R })] })), 'ADMITTUNT');
  assert.equal(verdictOf(obs({ ...greek, signs: [sign({ relDeg: L })] })), 'NON_ADMITTUNT');
});

test('R-EXCEPT: raven right, crow and woodpecker left (Roman); plain rule in Greek', () => {
  assert.equal(verdictOf(obs({ signs: [sign({ bird: 'raven', relDeg: R })] })), 'ADMITTUNT');
  assert.equal(verdictOf(obs({ signs: [sign({ bird: 'raven', relDeg: L })] })), 'NON_ADMITTUNT');
  assert.equal(verdictOf(obs({ signs: [sign({ bird: 'picus', kinds: ['flight'], flight: 'across', relDeg: L })] })), 'ADMITTUNT');
  // Crow on the left under Greek use is unfavourable: no Roman exception there.
  assert.equal(verdictOf(obs({
    tradition: 'greek', orientation: 'greek', frontDeg: 0, signs: [sign({ relDeg: L })],
  })), 'NON_ADMITTUNT');
});

test('P8/R-MODE: silent raven in flight is weighed at half, not discarded', () => {
  const r = interpret(obs({
    signs: [sign({ bird: 'raven', kinds: ['flight'], flight: 'across', relDeg: R })],
  }));
  assert.equal(r.verdict, 'ADMITTUNT');
  assert.deepEqual(r.favourable, frac(1)); // weight 2 x 1/2
  assert.equal(r.signs[0].classification, 'weighed');
  assert.ok(r.glosses.includes('wrong-mode'));
});

test('P2/V2/R-DIRA: dire signs settle it and cannot be declined', () => {
  assert.equal(isDireSign(sign({ bird: 'bubo', kinds: ['flight'], flight: 'across' }), true), true);
  assert.equal(isDireSign(sign({ bird: 'bubo', daylight: false }), true), false);
  assert.equal(isDireSign(sign({ bird: 'raven', chokedVoice: true }), true), true);
  assert.equal(isDireSign(sign({ bird: 'raven', kinds: ['flight'], chokedVoice: true }), true), false);
  assert.equal(isDireSign(sign({ bird: 'owlUnsure' }), true), false);

  const favourableEagle = sign({ bird: 'eagle', kinds: ['flight'], flight: 'onward', height: 'high', relDeg: L });
  const bubo = sign({ bird: 'bubo', kinds: ['flight'], flight: 'across', relDeg: L });
  const r = interpret(obs({ signs: [favourableEagle, bubo] }));
  assert.equal(r.verdict, 'NON_ADMITTUNT'); // dire overrides a strong favourable sign
  assert.deepEqual(r.decidedBy, ['R-DIRA']);

  // Declining a dire sign changes nothing (and askedFor is arranged so it WOULD be oblative).
  const r2 = interpret(obs({
    askedFor: ['eagle'],
    signs: [favourableEagle, sign({ bird: 'bubo', kinds: ['voice'], relDeg: L, declined: true })],
  }));
  assert.equal(r2.verdict, 'NON_ADMITTUNT');
  assert.equal(r2.signs[1].classification, 'dira');
  assert.ok(r2.signs[1].notes.includes('decline-dire-disregarded'));

  // Night-time bubo (per-sign daylight=false beats the clock toggle): weighed normally.
  assert.equal(verdictOf(obs({ signs: [sign({ bird: 'bubo', relDeg: L, daylight: false })] })), 'ADMITTUNT');
  // Toggle says night: not dire either.
  assert.equal(verdictOf(obs({ isDaylight: false, signs: [sign({ bird: 'bubo', relDeg: L })] })), 'ADMITTUNT');
});

test('P1/R-TEMPLUM: outside the sector declared beforehand is ignored; default is the whole circle', () => {
  const behind = sign({ relDeg: 180 });
  const narrowed = obs({ templumHalfWidthDeg: 90, signs: [behind] });
  const r = interpret(narrowed);
  assert.equal(r.signs[0].classification, 'ignored');
  assert.ok(r.signs[0].notes.includes('extra-templum'));
  assert.equal(r.verdict, 'ALIO_DIE'); // nothing pertinent remains
  // Same sign is pertinent (though on the line) with the default whole-circle templum.
  assert.equal(interpret(obs({ signs: [behind] })).signs[0].classification, 'noted');
  // A dire sign outside a pre-declared sector is extra templum (P1 above P2).
  const direBehind = sign({ bird: 'bubo', kinds: ['voice'], relDeg: 180 });
  assert.equal(verdictOf(obs({ templumHalfWidthDeg: 90, signs: [direBehind] })), 'ALIO_DIE');
  assert.equal(verdictOf(obs({ signs: [direBehind] })), 'NON_ADMITTUNT'); // default: no escape
});

test('P3/R-DECLINE + R-ASK: only oblative signs may be declined', () => {
  // Asked for crows only: an eagle is oblative and may be declined...
  const eagleDeclined = sign({ bird: 'eagle', kinds: ['flight'], flight: 'across', relDeg: R, declined: true });
  const r = interpret(obs({ askedFor: ['crow'], signs: [eagleDeclined] }));
  assert.equal(r.signs[0].impetrative, false);
  assert.equal(r.signs[0].classification, 'ignored');
  assert.equal(r.verdict, 'ALIO_DIE');
  // ...accepted, it is weighed like any other (unfavourable here).
  assert.equal(verdictOf(obs({ askedFor: ['crow'], signs: [{ ...eagleDeclined, declined: false }] })), 'NON_ADMITTUNT');
  // A sign that was asked for cannot be declined; the attempt is noted, the sign weighed.
  const r2 = interpret(obs({ askedFor: ['crow'], signs: [sign({ relDeg: R, declined: true })] }));
  assert.equal(r2.signs[0].impetrative, true);
  assert.equal(r2.signs[0].classification, 'weighed');
  assert.ok(r2.signs[0].notes.includes('decline-impetrative-disregarded'));
  assert.equal(r2.verdict, 'NON_ADMITTUNT');
  // Default askedFor = all augural birds; askedFor [] = asked for nothing.
  assert.equal(interpret(obs({ signs: [sign({})] })).signs[0].impetrative, true);
  assert.equal(interpret(obs({ askedFor: [], signs: [sign({})] })).signs[0].impetrative, false);
});

test('P4/P5/R-TRIP-ANY: food falling is the criterion; any bird can make a tripudium', () => {
  const crowTrip = sign({ kinds: ['feeding'], foodFell: true, relDeg: R }); // even on the unfavourable side
  const r = interpret(obs({ signs: [crowTrip] }));
  assert.equal(r.verdict, 'ADMITTUNT');
  assert.deepEqual(r.favourable, frac(1)); // weight 1 for an ordinary bird
  const pulliTrip = sign({ bird: 'pulli', kinds: ['feeding'], foodFell: true, relDeg: null });
  assert.deepEqual(interpret(obs({ signs: [pulliTrip] })).favourable, frac(2)); // hens: weight 2, no bearing needed
  const neat = sign({ kinds: ['feeding'], foodFell: false });
  const r2 = interpret(obs({ signs: [neat] }));
  assert.equal(r2.signs[0].classification, 'noted');
  assert.equal(r2.verdict, 'ALIO_DIE');
  // B-OTHER by feeding still counts: omnem avem tripudium facere posse.
  assert.equal(verdictOf(obs({ signs: [sign({ bird: 'other', kinds: ['feeding'], foodFell: true })] })), 'ADMITTUNT');
  // Cock-crow ostentum: pulli by voice recorded, not weighed. Thunder likewise (ostentum).
  assert.equal(interpret(obs({ signs: [sign({ bird: 'pulli', kinds: ['voice'] })] })).signs[0].classification, 'noted');
  assert.equal(interpret(obs({ signs: [sign({ bird: 'other', kinds: ['ostentum'], relDeg: L })] })).signs[0].classification, 'noted');
});

test('P6/R-TANAQUIL: stooping eagle is favourable anywhere, x3, never remora, exempt from the line', () => {
  const stoop = sign({ bird: 'eagle', kinds: ['flight'], flight: 'stoop', relDeg: 0 }); // dead on the line
  const r = interpret(obs({ signs: [stoop] }));
  assert.equal(r.verdict, 'ADMITTUNT');
  assert.deepEqual(r.favourable, frac(9)); // weight 3 x 3
  assert.equal(r.signs[0].remora, false);
  // A non-eagle "stoop" is just flight; an eagle stoop without flight kind is not a stoop.
  assert.equal(interpret(obs({ signs: [sign({ bird: 'buteo', kinds: ['flight'], flight: 'stoop', relDeg: R })] })).verdict, 'NON_ADMITTUNT');
});

test('P7/R-LINE: on the line, overhead (no bearing) signs are noted, not weighed', () => {
  for (const relDeg of [0, 3, 180, 357, null]) {
    const r = interpret(obs({ signs: [sign({ relDeg })] }));
    assert.equal(r.signs[0].classification, 'noted', `relDeg=${relDeg}`);
    assert.equal(r.verdict, 'ALIO_DIE');
  }
  // Azimuth input is resolved against the front (Varro front S: an eastern crow is left).
  const byAzimuth = interpret(obs({ signs: [sign({ relDeg: undefined, azimuthDeg: 90 })] }));
  assert.equal(byAzimuth.signs[0].relDeg, 270);
  assert.equal(byAzimuth.verdict, 'ADMITTUNT');
});

test('V5/R-MIXED: the 2:1 thresholds exactly at the boundary (exact rationals)', () => {
  // Favourable: eagle left, bare = 3. Unfavourable: crow right count 2 = 5/4... build exact 2:1:
  // F = eagle(3) ; U needs 3/2: crow count 3 across = 1 x 6/4 = 3/2.
  const eagle = sign({ bird: 'eagle', kinds: ['flight'], flight: 'across', relDeg: L });
  const crows3 = sign({ kinds: ['voice'], relDeg: R, count: 3 });
  const r = interpret(obs({ signs: [eagle, crows3] }));
  assert.deepEqual(r.favourable, frac(3));
  assert.deepEqual(r.unfavourable, frac(3, 2));
  assert.equal(r.verdict, 'ADMITTUNT'); // F = 2U exactly: allowed
  // One more crow tips it inside the band: U = 7/4, F < 2U and U < 2F.
  assert.equal(verdictOf(obs({ signs: [eagle, sign({ relDeg: R, count: 4 })] })), 'ALIO_DIE');
  // Mirror: U = 2F exactly forbids.
  const crowLeft = sign({ relDeg: L }); // F = 1
  const ravenLeft = sign({ bird: 'raven', relDeg: L }); // U = 2 under Roman exception
  assert.equal(verdictOf(obs({ signs: [crowLeft, ravenLeft] })), 'NON_ADMITTUNT');
});

test('R-COUNT canonical case: Romulus twelve vultures vs Remus six ends ALIO DIE', () => {
  const six = sign({ bird: 'vulture', kinds: ['flight'], flight: 'across', relDeg: L, count: 6 });
  const twelve = sign({ bird: 'vulture', kinds: ['flight'], flight: 'across', relDeg: R, count: 12 });
  const r = interpret(obs({ signs: [six, twelve] }));
  assert.deepEqual(r.favourable, frac(9, 2));
  assert.deepEqual(r.unfavourable, frac(15, 2));
  assert.equal(r.verdict, 'ALIO_DIE');
  assert.ok(r.glosses.includes('romulus-remus')); // first sign favourable, greater weight against
});

test('R-WEIGH hierarchy: one eagle outweighs four crows flying onward', () => {
  const crows = interpret(obs({
    signs: [sign({ kinds: ['voice', 'flight'], flight: 'onward', height: 'high', relDeg: R, count: 4 })],
  }));
  assert.deepEqual(crows.unfavourable, frac(21, 8)); // 1 x 7/4 x 3/2; voice present so full mode
  const both = interpret(obs({
    signs: [
      sign({ bird: 'eagle', kinds: ['flight'], flight: 'across', relDeg: L }),
      sign({ kinds: ['voice', 'flight'], flight: 'onward', height: 'high', relDeg: R, count: 4 }),
    ],
  }));
  assert.ok(both.favourable.value > both.unfavourable.value); // 3 > 21/8 (mixed -> ALIO DIE, but eagle leads)
});

test('V6/R-REMORA: a returning bird turns ADMITTVNT into ALIO DIE, and cannot forbid', () => {
  const returning = sign({ bird: 'eagle', kinds: ['flight'], flight: 'returning', relDeg: L });
  const r = interpret(obs({ signs: [returning] }));
  assert.equal(r.signs[0].remora, true);
  assert.equal(r.verdict, 'ALIO_DIE');
  assert.ok(r.decidedBy.includes('R-REMORA'));
  // Unfavourable remora does not soften a prohibition.
  assert.equal(verdictOf(obs({ signs: [sign({ bird: 'eagle', kinds: ['flight'], flight: 'returning', relDeg: R })] })), 'NON_ADMITTUNT');
});

test('V1/R-SILENTIUM: vitium postpones, but the would-be verdict is preserved (dire included)', () => {
  const r = interpret(obs({ vitium: true, signs: [sign({ relDeg: L })] }));
  assert.equal(r.verdict, 'ALIO_DIE');
  assert.equal(r.wouldBeVerdict, 'ADMITTUNT');
  assert.deepEqual(r.decidedBy, ['R-SILENTIUM']);
  const dire = interpret(obs({ vitium: true, signs: [sign({ bird: 'bubo', relDeg: L })] }));
  assert.equal(dire.verdict, 'ALIO_DIE');
  assert.equal(dire.wouldBeVerdict, 'NON_ADMITTUNT'); // backgrounding cannot improve the outcome silently
  assert.equal(interpret(obs({ signs: [] })).wouldBeVerdict, undefined);
});

test('R-REPEAT: forced-auspices gloss from the second attempt of the day', () => {
  assert.ok(!interpret(obs({ attemptsToday: 1 })).glosses.includes('auspicia-coacta'));
  assert.ok(interpret(obs({ attemptsToday: 2 })).glosses.includes('auspicia-coacta'));
  assert.ok(interpret(obs({ attemptsToday: 7 })).glosses.includes('auspicia-coacta'));
});

test('owlUnsure: weighed as noctua, never dire, glossed', () => {
  const r = interpret(obs({ signs: [sign({ bird: 'owlUnsure', relDeg: L })] }));
  assert.equal(r.verdict, 'ADMITTUNT');
  assert.deepEqual(r.favourable, frac(1));
  assert.ok(r.glosses.includes('owl-unsure'));
  assert.equal(BIRDS.owlUnsure.mapsTo, 'noctua');
});

test('bad input throws clearly instead of producing a verdict', () => {
  assert.throws(() => interpret(null), TypeError);
  assert.throws(() => interpret(obs({ tradition: 'etruscan' })), RangeError);
  assert.throws(() => interpret(obs({ frontDeg: NaN })), TypeError);
  assert.throws(() => interpret(obs({ templumHalfWidthDeg: 0 })), RangeError);
  assert.throws(() => interpret(obs({ templumHalfWidthDeg: 181 })), RangeError);
  assert.throws(() => interpret(obs({ attemptsToday: 0 })), RangeError);
  assert.throws(() => interpret(obs({ signs: [sign({ bird: 'dodo' })] })), RangeError);
  assert.throws(() => interpret(obs({ signs: [sign({ kinds: [] })] })), RangeError);
  assert.throws(() => interpret(obs({ signs: [sign({ kinds: ['smell'] })] })), RangeError);
  assert.throws(() => interpret(obs({ signs: [sign({ relDeg: NaN })] })), TypeError);
  assert.throws(() => interpret(obs({ signs: [sign({ count: 99 })] })), RangeError);
  assert.throws(() => interpret(obs({ signs: [sign({ height: 'towering' })] })), RangeError);
  assert.throws(() => interpret(obs({ askedFor: ['dodo'] })), RangeError);
});

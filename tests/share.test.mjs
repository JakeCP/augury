// Share-link tests (PLAN.md §6): round-trip, versioning, rejection of bad input,
// decode -> interpret -> recorded verdict, question never encoded.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { encodeRecord, decodeRecord, SHARE_VERSION, MAX_SIGNS, MAX_CODE_LENGTH } from '../js/share.js';
import { interpret, RULES_VERSION } from '../js/rules.js';
import { mulberry32 } from '../js/tripudium.js';

function baseRecord(over = {}) {
  return {
    tradition: 'roman', orientation: 'varro', frontDeg: 180.0,
    templumHalfWidthDeg: 180, declinationDeg: 0,
    startedAtEpochMin: 29800000,
    vitium: false, isDaylight: true, attemptsToday: 1,
    signs: [
      { bird: 'crow', kinds: ['voice'], relDeg: 270.0, height: 'na', flight: 'na', count: 1, declined: false, chokedVoice: false, foodFell: false, dtSec: 60 },
    ],
    ...over,
  };
}
function decodeOk(code) {
  const d = decodeRecord(code);
  assert.equal(d.ok, true, JSON.stringify(d));
  return d;
}
function payloadOf(code) {
  return Buffer.from(code.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
}
function codeOf(payload) {
  return Buffer.from(payload, 'utf8').toString('base64url');
}

test('round-trip: every interpret() input survives encode/decode', () => {
  const rec = baseRecord({
    tradition: 'greek', orientation: 'own', frontDeg: 359.9,
    templumHalfWidthDeg: 120, declinationDeg: -12.5,
    vitium: true, isDaylight: false, attemptsToday: 3,
    askedFor: ['crow', 'eagle'],
    signs: [
      { bird: 'raven', kinds: ['voice', 'flight'], relDeg: 0.0, height: 'high', flight: 'onward', count: 12, declined: false, chokedVoice: true, foodFell: false, daylight: false, dtSec: 0 },
      { bird: 'pulli', kinds: ['feeding'], relDeg: null, height: 'na', flight: 'na', count: 1, declined: false, chokedVoice: false, foodFell: true, dtSec: 3600 },
      { bird: 'bubo', kinds: ['voice'], relDeg: 359.9, height: 'low', flight: 'settled', count: 1, declined: true, chokedVoice: false, foodFell: false, daylight: true, dtSec: 7200 },
    ],
  });
  const code = encodeRecord(rec);
  assert.match(code, /^[A-Za-z0-9_-]+$/); // URL-safe: no + / =
  const d = decodeOk(code);
  assert.equal(d.shareVersion, SHARE_VERSION);
  assert.equal(d.rulesVersion, RULES_VERSION);
  const o = d.observation;
  assert.equal(o.tradition, 'greek');
  assert.equal(o.orientation, 'own');
  assert.equal(o.frontDeg, 359.9);
  assert.equal(o.templumHalfWidthDeg, 120);
  assert.equal(o.declinationDeg, -12.5);
  assert.equal(o.startedAtEpochMin, 29800000);
  assert.equal(o.vitium, true);
  assert.equal(o.isDaylight, false);
  assert.equal(o.attemptsToday, 3);
  assert.deepEqual([...o.askedFor].sort(), ['crow', 'eagle']);
  assert.equal(o.signs.length, 3);
  assert.equal(o.signs[0].bird, 'raven');
  assert.deepEqual([...o.signs[0].kinds].sort(), ['flight', 'voice']);
  assert.equal(o.signs[0].relDeg, 0);
  assert.equal(o.signs[0].count, 12);
  assert.equal(o.signs[0].chokedVoice, true);
  assert.equal(o.signs[0].daylight, false);
  assert.equal(o.signs[1].relDeg, null);
  assert.equal(o.signs[1].foodFell, true);
  assert.equal(o.signs[2].relDeg, 359.9);
  assert.equal(o.signs[2].declined, true);
  // Tenths of a degree: a bird near the line does not round across it.
  assert.equal(o.signs[2].relDeg > 359, true);
});

test('decode -> interpret -> the recorded verdict (generated observations, seeded)', () => {
  const rng = mulberry32(20261105);
  const birds = ['raven', 'crow', 'noctua', 'bubo', 'owlUnsure', 'eagle', 'vulture', 'buteo', 'picus', 'pulli', 'other'];
  const kindSets = [['voice'], ['flight'], ['voice', 'flight'], ['feeding'], ['ostentum']];
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  for (let trial = 0; trial < 80; trial += 1) {
    const n = Math.floor(rng() * 7);
    const rec = baseRecord({
      tradition: pick(['roman', 'greek']),
      orientation: pick(['varro', 'livy', 'greek', 'own']),
      frontDeg: Math.floor(rng() * 3600) / 10,
      templumHalfWidthDeg: pick([90, 135, 180]),
      vitium: rng() < 0.15,
      isDaylight: rng() < 0.7,
      attemptsToday: 1 + Math.floor(rng() * 3),
      askedFor: rng() < 0.5 ? undefined : ['crow', 'raven'],
      startedAtEpochMin: 29000000 + Math.floor(rng() * 1000000),
      signs: Array.from({ length: n }, (_, i) => ({
        bird: pick(birds),
        kinds: pick(kindSets),
        relDeg: rng() < 0.1 ? null : Math.floor(rng() * 3600) / 10,
        height: pick(['low', 'middle', 'high', 'na']),
        flight: pick(['onward', 'across', 'returning', 'circling', 'settled', 'stoop', 'na']),
        count: 1 + Math.floor(rng() * 12),
        declined: rng() < 0.15,
        chokedVoice: rng() < 0.1,
        foodFell: rng() < 0.3,
        dtSec: i * 37,
      })),
    });
    const expected = interpret(rec).verdict;
    const d = decodeOk(encodeRecord(rec));
    assert.equal(d.recordedVerdict, expected, `trial ${trial}`);
    assert.equal(interpret(d.observation).verdict, expected, `trial ${trial} re-interpreted`);
  }
});

test('boundary values: front 0 and 359.9, counts 1 and 12, 0 and 60 signs', () => {
  assert.equal(decodeOk(encodeRecord(baseRecord({ frontDeg: 0, signs: [] }))).observation.signs.length, 0);
  assert.equal(decodeOk(encodeRecord(baseRecord({ frontDeg: 359.9 }))).observation.frontDeg, 359.9);
  const sixty = Array.from({ length: 60 }, (_, i) => ({
    bird: 'crow', kinds: ['voice'], relDeg: 270, height: 'na', flight: 'na',
    count: i % 2 ? 12 : 1, declined: false, chokedVoice: false, foodFell: false, dtSec: i,
  }));
  const code = encodeRecord(baseRecord({ signs: sixty }));
  assert.ok(code.length <= MAX_CODE_LENGTH, `60 signs must fit: ${code.length}`);
  assert.equal(decodeOk(code).observation.signs.length, MAX_SIGNS);
  assert.throws(() => encodeRecord(baseRecord({ signs: [...sixty, sixty[0]] })), RangeError);
});

test('versioning: current version decodes; unknown share version is a typed error, never a throw', () => {
  const code = encodeRecord(baseRecord());
  assert.equal(payloadOf(code).startsWith(`${SHARE_VERSION}~${RULES_VERSION}~`), true);
  const future = codeOf(payloadOf(code).replace(/^[^~]+/, '99'));
  let d;
  assert.doesNotThrow(() => { d = decodeRecord(future); });
  assert.equal(d.ok, false);
  assert.equal(d.error.code, 'unsupported-version');
  // An older RULES version still decodes and keeps its recorded verdict string.
  const oldRules = codeOf(payloadOf(code).replace(`~${RULES_VERSION}~`, '~0~'));
  const d2 = decodeOk(oldRules);
  assert.equal(d2.rulesVersion, 0);
  assert.equal(d2.recordedVerdict, interpret(baseRecord()).verdict);
});

test('rejection: malformed codes all return {ok:false}, decode never throws', () => {
  const good = encodeRecord(baseRecord());
  const payload = payloadOf(good);
  const badCodes = [
    null, undefined, 42, '', '!!!', 'aGVsbG8=', // padding char is not base64url payload here
    codeOf('1~1~r'), // too few fields
    codeOf(`${payload}~extra`), // too many fields
    codeOf(payload.replace('~r~', '~x~')), // unknown tradition
    codeOf(payload.replace('~v~', '~z~')), // unknown orientation
    codeOf(payload.replace(/~\d+~\d+~-?\d+~/, '~99999~180~0~')), // front out of range
    codeOf(payload.replace(/;\S+$|~\d+\.\S+$/, '~0.zz.v.2700.n.n.1.a.-')), // unknown bird code
    codeOf(payload.replace('.1.a.', '.99.a.')), // count out of range
    codeOf(payload.replace('.1.a.', '.0.a.')), // count zero
    'A'.repeat(MAX_CODE_LENGTH + 1),
  ];
  for (const bad of badCodes) {
    let d;
    assert.doesNotThrow(() => { d = decodeRecord(bad); }, String(bad).slice(0, 60));
    assert.equal(d.ok, false, String(bad).slice(0, 60));
    assert.ok(d.error.code && d.error.message);
  }
  // More than 60 signs in an otherwise well-formed payload is rejected.
  const oneSign = payload.split('~').at(-1);
  const manyPayload = `${payload.slice(0, payload.length - oneSign.length)}${Array(61).fill(oneSign).join(';')}`;
  assert.equal(decodeRecord(codeOf(manyPayload)).ok, false);
});

test('the question is never encoded, even when present in state', () => {
  const secret = 'Should-I-accept-the-job-in-Carthage?';
  const code = encodeRecord(baseRecord({ question: secret }));
  assert.ok(!code.includes(secret));
  assert.ok(!payloadOf(code).includes(secret));
  assert.ok(!payloadOf(code).includes('Carthage'));
});

// The interpretation engine (PLAN.md §3): bird table, weighing, verdicts.
// Pure and DOM-free. The precedence implemented here is the §3.3 decision
// table; tests/rules.test.mjs mirrors it row for row. Strengths are exact
// rationals {num, den, value} so the 2:1 boundary never wobbles.
import { norm, sideOf, quarterOf, angularDistance } from './compass.js';

export const RULES_VERSION = 1;

export const VERDICTS = Object.freeze({
  ADMITTUNT: Object.freeze({ latin: 'AVES ADMITTVNT', english: 'The birds allow it.' }),
  NON_ADMITTUNT: Object.freeze({ latin: 'AVES NON ADMITTVNT', english: 'The birds do not allow it.' }),
  ALIO_DIE: Object.freeze({ latin: 'ALIO DIE', english: 'On another day.' }),
});

// Evidence tiers (PLAN §3): what kind of witness attests each rule. Shown in
// the UI, so Quintus is never passed off as "Cicero says".
export const RULE_EVIDENCE = Object.freeze({
  'R-SIDE': Object.freeze(['marcus', 'natural-history', 'technical', 'poetry']),
  'R-EXCEPT': Object.freeze(['quintus', 'comedy', 'reconstruction']),
  'R-MODE': Object.freeze(['technical', 'quintus', 'reconstruction']),
  'R-TEMPLUM': Object.freeze(['technical']),
  'R-ASK': Object.freeze(['legend', 'technical']),
  'R-DECLINE': Object.freeze(['natural-history', 'technical', 'marcus', 'reconstruction']),
  'R-LINE': Object.freeze(['reconstruction']),
  'R-DIRA': Object.freeze(['natural-history', 'draft-law', 'quintus', 'reconstruction']),
  'R-PRAEPES': Object.freeze(['technical', 'poetry', 'reconstruction']),
  'R-REMORA': Object.freeze(['technical', 'reconstruction']),
  'R-COUNT': Object.freeze(['legend', 'poetry', 'reconstruction']),
  'R-TANAQUIL': Object.freeze(['legend', 'reconstruction']),
  'R-TRIP-ANY': Object.freeze(['marcus', 'quintus']),
  'R-WEIGH': Object.freeze(['reconstruction']),
  'R-NONE': Object.freeze(['quintus', 'draft-law', 'reconstruction']),
  'R-CLEAR': Object.freeze(['legend', 'comedy', 'technical', 'reconstruction']),
  'R-MIXED': Object.freeze(['legend', 'reconstruction']),
  'R-SILENTIUM': Object.freeze(['marcus', 'technical', 'reconstruction']),
  'R-REPEAT': Object.freeze(['history', 'quintus', 'reconstruction']),
  'R-FALSE': Object.freeze(['history']),
});

// The B-* table (PLAN §3.1). Weights are our reconstruction from the ancient
// hierarchy. `favouredSideRoman: null` means the general Roman rule (left).
export const BIRDS = Object.freeze({
  raven: Object.freeze({ id: 'raven', ruleId: 'B-RAVEN', ui: 'Raven', latin: 'corvus', modes: Object.freeze(['voice']), weight: 2, favouredSideRoman: 'right', augural: true }),
  crow: Object.freeze({ id: 'crow', ruleId: 'B-CROW', ui: 'Crow (any)', latin: 'cornix', modes: Object.freeze(['voice']), weight: 1, favouredSideRoman: 'left', augural: true }),
  noctua: Object.freeze({ id: 'noctua', ruleId: 'B-NOCTUA', ui: 'Owl (little owl)', latin: 'noctua', modes: Object.freeze(['voice']), weight: 1, favouredSideRoman: null, augural: true }),
  bubo: Object.freeze({ id: 'bubo', ruleId: 'B-BUBO', ui: 'Owl (eagle-owl)', latin: 'bubo', modes: Object.freeze(['voice', 'flight']), weight: 1, favouredSideRoman: null, augural: true }),
  owlUnsure: Object.freeze({ id: 'owlUnsure', ruleId: 'B-NOCTUA', ui: 'Owl (unsure)', latin: 'noctua?', modes: Object.freeze(['voice']), weight: 1, favouredSideRoman: null, augural: true, mapsTo: 'noctua' }),
  eagle: Object.freeze({ id: 'eagle', ruleId: 'B-EAGLE', ui: 'Eagle', latin: 'aquila', modes: Object.freeze(['flight']), weight: 3, favouredSideRoman: null, augural: true }),
  vulture: Object.freeze({ id: 'vulture', ruleId: 'B-VULTURE', ui: 'Vulture', latin: 'vultur', modes: Object.freeze(['flight']), weight: 2, favouredSideRoman: null, augural: true }),
  buteo: Object.freeze({ id: 'buteo', ruleId: 'B-HAWK', ui: 'Buzzard / hawk', latin: 'buteo', modes: Object.freeze(['flight']), weight: 1, favouredSideRoman: null, augural: true }),
  picus: Object.freeze({ id: 'picus', ruleId: 'B-PICUS', ui: 'Woodpecker', latin: 'picus Martius', modes: Object.freeze(['voice', 'flight']), weight: 2, favouredSideRoman: 'left', augural: true }),
  pulli: Object.freeze({ id: 'pulli', ruleId: 'B-PULLI', ui: 'Chickens', latin: 'pullus', modes: Object.freeze(['feeding']), weight: 0, favouredSideRoman: null, augural: true }),
  other: Object.freeze({ id: 'other', ruleId: 'B-OTHER', ui: 'Other bird / thunder', latin: null, modes: Object.freeze([]), weight: 0, favouredSideRoman: null, augural: false }),
});
export const BIRD_IDS = Object.freeze(Object.keys(BIRDS));
const AUGURAL_IDS = Object.freeze(BIRD_IDS.filter((id) => BIRDS[id].augural && !BIRDS[id].mapsTo));

export const KINDS = Object.freeze(['voice', 'flight', 'feeding', 'ostentum']);
export const HEIGHTS = Object.freeze(['low', 'middle', 'high', 'na']);
export const FLIGHTS = Object.freeze(['onward', 'across', 'returning', 'circling', 'settled', 'stoop', 'na']);

// ------------------------------------------------------- exact rationals
function gcd(a, b) {
  let x = Math.abs(a); let y = Math.abs(b);
  while (y) { [x, y] = [y, x % y]; }
  return x || 1;
}
function frac(num, den = 1) {
  if (num === 0) return { num: 0, den: 1, value: 0 };
  const g = gcd(num, den);
  const n = num / g; const d = den / g;
  return { num: n, den: d, value: n / d };
}
const ZERO = Object.freeze(frac(0));
const mulFrac = (a, b) => frac(a.num * b.num, a.den * b.den);
const addFrac = (a, b) => frac(a.num * b.den + b.num * a.den, a.den * b.den);
// Exact a >= k*b comparison by cross-multiplication (no floats near the line).
const atLeastTimes = (a, b, k) => BigInt(a.num) * BigInt(b.den) >= BigInt(k) * BigInt(b.num) * BigInt(a.den);
const fracEqual = (a, b) => a.num === b.num && a.den === b.den;

// ------------------------------------------------------------- validation
function birdOrThrow(birdId) {
  if (!Object.hasOwn(BIRDS, birdId)) throw new RangeError(`unknown bird ${String(birdId)} (expected one of ${BIRD_IDS.join('|')})`);
  return BIRDS[birdId];
}
const effectiveBird = (birdId) => BIRDS[BIRDS[birdId].mapsTo ?? birdId];
function finiteOrThrow(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new TypeError(`${name} must be a finite number, got ${String(value)}`);
  return value;
}
function assertCount(count) {
  if (!Number.isInteger(count) || count < 1 || count > 12) {
    throw new RangeError(`count must be an integer in 1..12 (12 = twelve or more), got ${String(count)}`);
  }
}

// --------------------------------------------------------- small helpers

/** R-COUNT: (min(n,12)+3)/4 — each further bird adds a quarter of the first. */
export function countFactor(count) {
  assertCount(count);
  return frac(count + 3, 4);
}

/** R-PRAEPES: ONE flight factor. Onward 3/2; else high 5/4, low 3/4. Flight kind only. */
export function flightFactor(signLike) {
  const kinds = signLike?.kinds ?? [];
  if (!kinds.includes('flight')) return frac(1);
  if (signLike.flight === 'onward') return frac(3, 2);
  if (signLike.height === 'high') return frac(5, 4);
  if (signLike.height === 'low') return frac(3, 4);
  return frac(1);
}

/** R-MODE: full strength in the bird's own mode(s), one half otherwise. */
export function modeFactor(birdId, kinds) {
  const modes = effectiveBird(birdOrThrow(birdId).id).modes;
  const weighable = (kinds ?? []).filter((k) => k === 'voice' || k === 'flight');
  return weighable.some((k) => modes.includes(k)) ? frac(1) : frac(1, 2);
}

/** R-SIDE / R-EXCEPT: which side favours this bird under this tradition. */
export function favouredSide(birdId, tradition) {
  const bird = effectiveBird(birdOrThrow(birdId).id);
  if (tradition === 'greek') return 'right';
  if (tradition !== 'roman') throw new RangeError(`unknown tradition ${String(tradition)} (expected roman|greek)`);
  return bird.favouredSideRoman ?? 'left';
}

/** R-DIRA test alone (pertinence is decided by interpret's P1 row). */
export function isDireSign(signLike, defaultDaylight = true) {
  if (!signLike || !Object.hasOwn(BIRDS, signLike.bird)) return false;
  const kinds = signLike.kinds ?? [];
  const effId = effectiveBird(signLike.bird).id;
  if (signLike.bird === 'owlUnsure') return false; // never dire (PLAN §3.1)
  if (effId === 'bubo') {
    const daylight = signLike.daylight ?? defaultDaylight;
    return daylight === true && (kinds.includes('voice') || kinds.includes('flight'));
  }
  if (effId === 'raven') return signLike.chokedVoice === true && kinds.includes('voice');
  return false;
}

// -------------------------------------------------------------- interpret

function normaliseSign(raw, index, ctx) {
  if (!raw || typeof raw !== 'object') throw new TypeError(`signs[${index}] must be an object`);
  const bird = birdOrThrow(raw.bird);
  if (!Array.isArray(raw.kinds) || raw.kinds.length === 0) {
    throw new RangeError(`signs[${index}].kinds must be a non-empty array (voice|flight|feeding|ostentum)`);
  }
  for (const k of raw.kinds) {
    if (!KINDS.includes(k)) throw new RangeError(`signs[${index}].kinds: unknown kind ${String(k)}`);
  }
  const kinds = [...new Set(raw.kinds)];
  const height = raw.height ?? 'na';
  if (!HEIGHTS.includes(height)) throw new RangeError(`signs[${index}].height: unknown height ${String(height)}`);
  const flight = raw.flight ?? 'na';
  if (!FLIGHTS.includes(flight)) throw new RangeError(`signs[${index}].flight: unknown flight ${String(flight)}`);
  const count = raw.count ?? 1;
  assertCount(count);
  let relDeg = null;
  if (raw.relDeg !== undefined && raw.relDeg !== null) {
    relDeg = norm(finiteOrThrow(raw.relDeg, `signs[${index}].relDeg`));
  } else if (raw.relDeg === undefined && raw.azimuthDeg !== undefined && raw.azimuthDeg !== null) {
    relDeg = norm(finiteOrThrow(raw.azimuthDeg, `signs[${index}].azimuthDeg`) - ctx.frontDeg);
  }
  return {
    bird: bird.id,
    kinds,
    relDeg,
    height,
    flight,
    count,
    declined: raw.declined === true,
    chokedVoice: raw.chokedVoice === true,
    foodFell: raw.foodFell === true,
    daylight: raw.daylight === undefined ? undefined : raw.daylight === true,
    dtSec: raw.dtSec ?? 0,
  };
}

/**
 * interpret(observation) -> verdict record. Pure; see PLAN §3.3 for the
 * decision table (rows P1..P8, V1..V7) implemented verbatim below.
 */
export function interpret(observation) {
  if (!observation || typeof observation !== 'object') throw new TypeError('interpret requires an observation object');
  const tradition = observation.tradition ?? 'roman';
  if (tradition !== 'roman' && tradition !== 'greek') {
    throw new RangeError(`unknown tradition ${String(tradition)} (expected roman|greek)`);
  }
  const orientation = observation.orientation ?? 'varro';
  if (!['varro', 'livy', 'greek', 'own'].includes(orientation)) {
    throw new RangeError(`unknown orientation ${String(orientation)} (expected varro|livy|greek|own)`);
  }
  let frontDeg;
  if (observation.frontDeg !== undefined) frontDeg = norm(finiteOrThrow(observation.frontDeg, 'frontDeg'));
  else if (orientation === 'own') throw new RangeError("orientation 'own' requires frontDeg");
  else frontDeg = { varro: 180, livy: 90, greek: 0 }[orientation];

  const halfWidth = observation.templumHalfWidthDeg ?? 180;
  finiteOrThrow(halfWidth, 'templumHalfWidthDeg');
  if (halfWidth <= 0 || halfWidth > 180) {
    throw new RangeError(`templumHalfWidthDeg must be in (0, 180], got ${halfWidth}`);
  }
  const attemptsToday = observation.attemptsToday ?? 1;
  if (!Number.isInteger(attemptsToday) || attemptsToday < 1) {
    throw new RangeError(`attemptsToday must be a positive integer, got ${String(attemptsToday)}`);
  }
  const isDaylight = observation.isDaylight ?? true;
  if (typeof isDaylight !== 'boolean') throw new TypeError('isDaylight must be a boolean');
  const askedFor = observation.askedFor ?? AUGURAL_IDS;
  if (!Array.isArray(askedFor)) throw new TypeError('askedFor must be an array of bird ids');
  for (const id of askedFor) birdOrThrow(id);
  const askedSet = new Set(askedFor);
  const rawSigns = observation.signs ?? [];
  if (!Array.isArray(rawSigns)) throw new TypeError('signs must be an array');
  const ctx = { frontDeg };
  const signs = rawSigns.map((s, i) => normaliseSign(s, i, ctx));

  // ---- per-sign classification (P1..P8, first matching row wins) ----
  const classified = signs.map((sign) => {
    const eff = effectiveBird(sign.bird);
    const side = sign.relDeg === null ? null : sideOf(sign.relDeg);
    const quarter = sign.relDeg === null ? null : quarterOf(sign.relDeg);
    const impetrative = askedSet.has(sign.bird) || askedSet.has(eff.id);
    const out = {
      ...sign,
      side, quarter, impetrative,
      pertinent: true, classification: 'noted', favourable: null,
      strength: ZERO, remora: false, dire: false, tripudium: false,
      ruleIds: [BIRDS[sign.bird].ruleId],
      notes: [],
    };
    const done = (classification, note, rule) => {
      out.classification = classification;
      if (note) out.notes.push(note);
      if (rule) out.ruleIds.push(rule);
      return out;
    };

    // P1: outside the sector declared before the watch.
    if (sign.relDeg !== null && angularDistance(sign.relDeg, 0) > halfWidth + 1e-9) {
      out.pertinent = false;
      return done('ignored', 'extra-templum', 'R-TEMPLUM');
    }
    // P2: dire — above decline on purpose; it cannot be escaped after the fact.
    if (isDireSign(sign, isDaylight)) {
      out.dire = true;
      if (sign.declined) out.notes.push('decline-dire-disregarded');
      return done('dira', null, 'R-DIRA');
    }
    // P3: decline, oblative non-dire only.
    if (sign.declined) {
      if (!impetrative) return done('ignored', 'declined', 'R-DECLINE');
      out.notes.push('decline-impetrative-disregarded');
      out.ruleIds.push('R-DECLINE', 'R-ASK');
    }
    // P4: a true tripudium — food seen to fall. No side, height or flight.
    if (sign.kinds.includes('feeding') && sign.foodFell) {
      const w = eff.id === 'pulli' ? 2 : 1;
      out.tripudium = true;
      out.favourable = true;
      out.strength = mulFrac(frac(w), countFactor(sign.count));
      return done('weighed', null, 'R-TRIP-ANY');
    }
    // P5: nothing weighable remains (neat feeding, ostenta, non-augural birds).
    const weighable = sign.kinds.filter((k) => k === 'voice' || k === 'flight');
    if (eff.id === 'other' || eff.id === 'pulli' || weighable.length === 0) {
      const note = sign.kinds.includes('feeding') ? 'food-not-fallen' : 'ostentum';
      return done('noted', note, eff.id === 'other' ? undefined : 'R-TRIP-ANY');
    }
    // P6: Tanaquil's eagle — exempt from the line, never a remora.
    if (eff.id === 'eagle' && sign.flight === 'stoop' && weighable.includes('flight')) {
      out.favourable = true;
      out.strength = mulFrac(mulFrac(frac(eff.weight), countFactor(sign.count)), frac(3));
      return done('weighed', null, 'R-TANAQUIL');
    }
    // P7: on the line / overhead / no bearing.
    if (sign.relDeg === null) return done('noted', 'no-bearing', 'R-LINE');
    if (side === 'line') return done('noted', 'on-line', 'R-LINE');
    // P8: ordinary weighing.
    const mFactor = modeFactor(sign.bird, weighable);
    const fFactor = flightFactor({ kinds: weighable, flight: sign.flight, height: sign.height });
    out.favourable = side === favouredSide(sign.bird, tradition);
    out.strength = mulFrac(mulFrac(mulFrac(frac(eff.weight), countFactor(sign.count)), fFactor), mFactor);
    out.remora = sign.flight === 'returning' && weighable.includes('flight');
    out.ruleIds.push('R-SIDE');
    if (tradition === 'roman' && eff.favouredSideRoman !== null) out.ruleIds.push('R-EXCEPT');
    if (mFactor.num !== 1 || mFactor.den !== 1) out.notes.push('wrong-mode-half');
    out.ruleIds.push('R-MODE', 'R-COUNT', 'R-PRAEPES');
    if (out.remora) out.ruleIds.push('R-REMORA');
    return done('weighed');
  });

  // ---- verdict (V2..V6 first; V1 vitium wraps the result) ----
  let favourableTotal = ZERO;
  let unfavourableTotal = ZERO;
  for (const s of classified) {
    if (s.classification !== 'weighed') continue;
    if (s.favourable) favourableTotal = addFrac(favourableTotal, s.strength);
    else unfavourableTotal = addFrac(unfavourableTotal, s.strength);
  }
  const F = favourableTotal; const U = unfavourableTotal;
  let baseVerdict; let decidedBy;
  if (classified.some((s) => s.classification === 'dira')) { // V2
    baseVerdict = 'NON_ADMITTUNT'; decidedBy = ['R-DIRA'];
  } else if (F.num === 0 && U.num === 0) { // V3
    baseVerdict = 'ALIO_DIE'; decidedBy = ['R-NONE'];
  } else if (U.num === 0 || F.num === 0) { // V4
    baseVerdict = U.num === 0 ? 'ADMITTUNT' : 'NON_ADMITTUNT'; decidedBy = ['R-CLEAR'];
  } else if (atLeastTimes(F, U, 2)) { // V5
    baseVerdict = 'ADMITTUNT'; decidedBy = ['R-MIXED'];
  } else if (atLeastTimes(U, F, 2)) {
    baseVerdict = 'NON_ADMITTUNT'; decidedBy = ['R-MIXED'];
  } else {
    baseVerdict = 'ALIO_DIE'; decidedBy = ['R-MIXED'];
  }
  if (baseVerdict === 'ADMITTUNT' && classified.some((s) => s.classification === 'weighed' && s.remora)) { // V6
    baseVerdict = 'ALIO_DIE';
    decidedBy = [...decidedBy, 'R-REMORA'];
  }

  // ---- glosses (V7) ----
  const glosses = [];
  const firstWeighed = classified.find((s) => s.classification === 'weighed');
  if (F.num > 0 && U.num > 0 && !fracEqual(F, U) && firstWeighed
    && firstWeighed.favourable !== (F.value > U.value)) {
    glosses.push('romulus-remus');
  }
  if (attemptsToday >= 2) glosses.push('auspicia-coacta');
  if (classified.some((s) => s.bird === 'owlUnsure' && s.pertinent)) glosses.push('owl-unsure');
  if (classified.some((s) => s.notes.includes('wrong-mode-half'))) glosses.push('wrong-mode');

  // ---- V1: vitium postpones; the would-be verdict is preserved ----
  const vitium = observation.vitium === true;
  const verdict = vitium ? 'ALIO_DIE' : baseVerdict;
  const result = {
    verdict,
    latin: VERDICTS[verdict].latin,
    english: VERDICTS[verdict].english,
    rulesVersion: RULES_VERSION,
    decidedBy: vitium ? ['R-SILENTIUM'] : decidedBy,
    signs: classified,
    glosses,
    favourable: F,
    unfavourable: U,
  };
  if (vitium) result.wouldBeVerdict = baseVerdict;
  return result;
}

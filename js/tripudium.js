// The tripudium: sacred chickens, honestly rigged (PLAN.md §4).
// Pure and DOM-free. Randomness is injected as rng() -> [0, 1);
// the engine never calls Math.random. Probabilities are our reconstruction
// and are shown openly in the About page.

export const OUTCOMES = Object.freeze([
  'solistimum', 'pascuntur', 'non_pascuntur', 'avolant',
]);

// The published table (PLAN §4). `avolant` is a labelled reconstruction
// pending phase-4c verification in the primaries; see PLAN/SOURCES.
export const HUNGER_LEVELS = Object.freeze({
  fed: Object.freeze({ solistimum: 0.40, pascuntur: 0.25, non_pascuntur: 0.25, avolant: 0.10 }),
  hungry: Object.freeze({ solistimum: 0.70, pascuntur: 0.15, non_pascuntur: 0.10, avolant: 0.05 }),
  starved: Object.freeze({ solistimum: 0.92, pascuntur: 0.05, non_pascuntur: 0.02, avolant: 0.01 }),
});

export const VERDICT_BY_OUTCOME = Object.freeze({
  solistimum: 'ADMITTUNT',
  pascuntur: 'ALIO_DIE',
  non_pascuntur: 'NON_ADMITTUNT',
  avolant: 'NON_ADMITTUNT',
});

const LATIN = Object.freeze({
  ADMITTUNT: 'AVES ADMITTVNT',
  NON_ADMITTUNT: 'AVES NON ADMITTVNT',
  ALIO_DIE: 'ALIO DIE',
});
const ENGLISH = Object.freeze({
  ADMITTUNT: 'The birds allow it.',
  NON_ADMITTUNT: 'The birds do not allow it.',
  ALIO_DIE: 'On another day.',
});

function assertHunger(hunger) {
  if (!Object.hasOwn(HUNGER_LEVELS, hunger)) {
    throw new RangeError(`unknown hunger ${String(hunger)} (expected fed|hungry|starved)`);
  }
}
function assertValue(value) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError(`rng must return a finite number in [0, 1), got ${String(value)}`);
  }
}

/** Pure boundary function: which outcome a given rng value selects. */
export function outcomeForValue(value, hunger = 'hungry') {
  assertValue(value);
  assertHunger(hunger);
  let edge = 0;
  for (const outcome of OUTCOMES) {
    edge += HUNGER_LEVELS[hunger][outcome];
    if (value < edge) return outcome;
  }
  return 'avolant'; // unreachable for value < 1 unless floats round the sum below 1
}

/**
 * tripudium(rng, { hunger = 'hungry', attempt = 1 }) -> result record.
 * attempt is the caller's per-day counter (PLAN §4): recorded, never hidden.
 */
export function tripudium(rng, options = {}) {
  if (typeof rng !== 'function') throw new TypeError('tripudium requires an rng() function returning [0, 1)');
  const { hunger = 'hungry', attempt = 1 } = options ?? {};
  assertHunger(hunger);
  if (!Number.isInteger(attempt) || attempt < 1) {
    throw new RangeError(`attempt must be a positive integer, got ${String(attempt)}`);
  }
  const outcome = outcomeForValue(rng(), hunger);
  const verdict = VERDICT_BY_OUTCOME[outcome];
  // Cicero's complaint is about the custom, not only the extreme (PLAN §4).
  const coactum = verdict === 'ADMITTUNT' && hunger !== 'fed';
  const glosses = [];
  if (coactum) glosses.push('auspicium-coactum');
  if (attempt >= 2) glosses.push('auspicia-coacta');
  return {
    outcome,
    verdict,
    latin: LATIN[verdict],
    english: ENGLISH[verdict],
    hunger,
    attempt,
    coactum,
    glosses,
  };
}

/** mulberry32: small named seedable PRNG for tests and reproducible dev runs. */
export function mulberry32(seed) {
  if (!Number.isInteger(seed)) throw new RangeError(`seed must be an integer, got ${String(seed)}`);
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

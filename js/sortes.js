// Sortes Astrampsychi: mechanism, moon days, lot picker (PLAN.md §7).
// Pure and DOM-free. The real Hercher data (92 questions, 103 decades,
// prophet table) arrives in phase 4 as data/sortes-*.js in the shape below;
// phase 2 tests the mechanism against a marked fixture.
//
// Data shape:
//   data = {
//     questions: [{ n, grc, en, themes: [] }],
//     table: [{ sum, prophet: {grc, en}, interpretation: {grc, en}, decade }],
//     decades: [{ n, lines: [{ grc, en, answersQuestion, apparatus, filler }] }], // 10 lines
//   }
// answersQuestion is the semantic tag read off the answer's own wording
// BEFORE consulting the table (never copied from it — that would be circular).

export const HOUR_QUESTION = 13;
// Byzantine favourable hours by weekday (0=Sun..6=Sat): day-hour numbers,
// counted from sunrise. verify: against Hercher p.1 in phase 4a.
export const FAVOURABLE_HOURS = Object.freeze({ 0: 3, 2: 3, 4: 5, 6: 6 });
export const SYNODIC_MONTH_DAYS = 29.530588853;

// ------------------------------------------------------------- randomness
// Yijing's pattern: randomness injected as randomInt(bound); the crypto
// helper rejection-samples so pickLot is never `% 10` on a byte.
function checkBound(bound) {
  if (!Number.isInteger(bound) || bound < 1 || bound > 4294967296) {
    throw new RangeError(`randomInt bound must be an integer in 1..2^32, got ${String(bound)}`);
  }
}
export function makeCryptoRandomInt(cryptoObj = globalThis.crypto) {
  if (!cryptoObj || typeof cryptoObj.getRandomValues !== 'function') {
    throw new TypeError('crypto.getRandomValues is not available');
  }
  const buf = new Uint32Array(1);
  return function cryptoRandomInt(bound) {
    checkBound(bound);
    if (bound === 1) return 0;
    const limit = Math.floor(4294967296 / bound) * bound;
    let x;
    do {
      cryptoObj.getRandomValues(buf);
      x = buf[0];
    } while (x >= limit);
    return x % bound;
  };
}

/** "Let chance choose" (labelled ours): an injected randomInt(10) -> lot 1..10. */
export function pickLot(randomInt) {
  if (typeof randomInt !== 'function') throw new TypeError('pickLot requires a randomInt(bound) function');
  const v = randomInt(10);
  if (!Number.isInteger(v) || v < 0 || v >= 10) throw new RangeError(`randomInt(10) must return an integer in [0, 10), got ${String(v)}`);
  return v + 1;
}

// --------------------------------------------------------------- mechanism
function assertData(data) {
  if (!data || typeof data !== 'object') throw new TypeError('sortes data must be an object {questions, table, decades}');
}

/**
 * consult(data, q, k): q + k = s -> prophet of s -> decade d, line k.
 * Throws RangeError with a clear message on any out-of-range step.
 */
export function consult(data, q, k) {
  assertData(data);
  if (!Number.isInteger(q)) throw new RangeError(`question number must be an integer, got ${String(q)}`);
  if (!Number.isInteger(k) || k < 1 || k > 10) throw new RangeError(`lot k must be an integer in 1..10, got ${String(k)}`);
  const question = (data.questions ?? []).find((x) => x.n === q);
  if (!question) throw new RangeError(`no question ${q} in the data`);
  const sum = q + k;
  const row = (data.table ?? []).find((x) => x.sum === sum);
  if (!row) throw new RangeError(`sum ${sum} is missing from the concordance table`);
  const decade = (data.decades ?? []).find((x) => x.n === row.decade);
  if (!decade) throw new RangeError(`decade ${row.decade} is missing from the data`);
  const answer = (decade.lines ?? [])[k - 1];
  if (!answer) throw new RangeError(`decade ${row.decade} has no line ${k}`);
  return {
    question, q, k, sum,
    prophet: row.prophet,
    interpretation: row.interpretation,
    decade: row.decade,
    line: k,
    answer,
  };
}

/**
 * validateSortesData(data) -> { errors, stats }. REPORTS the table's actual
 * properties (PLAN §7): the tradition may be imperfect, and imperfections
 * become a named defect list, not test failures. Never throws.
 */
export function validateSortesData(data) {
  const errors = [];
  const stats = {
    questionCount: 0, decadeCount: 0, coveredSums: [], missingSums: [],
    reachableCount: 0, duplicatePairs: [], unreachableLines: [], tagMismatches: [],
  };
  try {
    if (!data || typeof data !== 'object') { errors.push('data is not an object'); return { errors, stats }; }
    const { questions, table, decades } = data;
    if (!Array.isArray(questions) || questions.length === 0) errors.push('questions must be a non-empty array');
    if (!Array.isArray(table)) errors.push('table must be an array');
    if (!Array.isArray(decades)) errors.push('decades must be an array');
    if (errors.length) return { errors, stats };
    stats.questionCount = questions.length;
    stats.decadeCount = decades.length;
    for (const d of decades) {
      if (!Array.isArray(d.lines) || d.lines.length !== 10) errors.push(`decade ${d.n} must have exactly 10 lines`);
    }
    const sums = new Set(table.map((r) => r.sum));
    // The full book needs sums 13..113; report coverage against that range.
    for (let s = 13; s <= 113; s += 1) {
      if (sums.has(s)) stats.coveredSums.push(s);
      else stats.missingSums.push(s);
    }
    const decadeBySum = new Map(table.map((r) => [r.sum, r.decade]));
    const decadeByN = new Map(decades.map((d) => [d.n, d]));
    const reached = new Map(); // "decade:line" -> [questionNumbers]
    for (const quest of questions) {
      for (let k = 1; k <= 10; k += 1) {
        const d = decadeBySum.get(quest.n + k);
        if (d === undefined) continue;
        const key = `${d}:${k}`;
        if (!reached.has(key)) reached.set(key, []);
        reached.get(key).push(quest.n);
        const line = decadeByN.get(d)?.lines?.[k - 1];
        if (line && line.answersQuestion !== null && line.answersQuestion !== undefined
          && line.answersQuestion !== quest.n) {
          stats.tagMismatches.push({ decade: d, line: k, expectedQuestion: quest.n, taggedQuestion: line.answersQuestion });
        }
      }
    }
    stats.reachableCount = reached.size;
    for (const [key, qs] of reached) {
      if (qs.length > 1) {
        const [decade, line] = key.split(':').map(Number);
        stats.duplicatePairs.push({ decade, line, reachedBy: qs });
      }
    }
    for (const d of decades) {
      for (let k = 1; k <= 10; k += 1) {
        if (!reached.has(`${d.n}:${k}`)) stats.unreachableLines.push({ decade: d.n, line: k });
      }
    }
  } catch (err) {
    errors.push(err instanceof Error ? err.message : String(err));
  }
  return { errors, stats };
}

// ------------------------------------------------------------ moon and hours
// Mean-moon arithmetic (PLAN §7): epoch new moon 2000-01-06 18:14 UTC,
// synodic month 29.530588853 d. Day 1 is the local calendar day containing
// the (mean) new moon; evaluating at local noon keeps evening consultations
// from flipping days across timezones. Reconstruction, labelled as such.
const EPOCH_MS = Date.UTC(2000, 0, 6, 18, 14);
const SYNODIC_MS = SYNODIC_MONTH_DAYS * 86400000;

function assertDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) throw new TypeError('expected a valid Date');
}

/** Mean moon age in days, in [0, synodic month). */
export function moonAgeDays(date) {
  assertDate(date);
  const noonUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  const elapsed = (noonUtc - EPOCH_MS) % SYNODIC_MS;
  return ((elapsed + SYNODIC_MS) % SYNODIC_MS) / 86400000;
}

/** Day of the (mean) moon month, 1..30. Day 1 contains the new moon. */
export function moonDay(date) {
  return Math.floor(moonAgeDays(date)) + 1;
}

/** Reconstruction: Byzantine day-hour h starts at 06:00 + (h-1) local clock time. */
export function byzantineHourToClockHour(h) {
  if (!Number.isInteger(h) || h < 1 || h > 12) throw new RangeError(`Byzantine hour must be an integer in 1..12, got ${String(h)}`);
  return 5 + h;
}

/**
 * isPropitious(date, { moonAdvice }) — advisory only, never a refusal.
 * moonAdvice (the phase-4 days-of-the-moon table) is injected, 30 entries
 * indexed from moon day 1; absent, moonAdvice is null and nothing is invented.
 */
export function isPropitious(date, options = {}) {
  assertDate(date);
  const weekday = date.getDay();
  const byz = Object.hasOwn(FAVOURABLE_HOURS, weekday) ? FAVOURABLE_HOURS[weekday] : null;
  const clockHour = byz === null ? null : byzantineHourToClockHour(byz);
  const md = moonDay(date);
  const table = options?.moonAdvice;
  return {
    weekday,
    favourableWeekday: byz !== null,
    byzantineHour: byz,
    clockHour,
    favourableNow: clockHour !== null && date.getHours() === clockHour,
    moonDay: md,
    moonAdvice: Array.isArray(table) && table.length >= md ? table[md - 1] : null,
  };
}

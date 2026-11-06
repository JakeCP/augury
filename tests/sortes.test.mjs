// Sortes tests (PLAN.md §7): mechanism against the FIXTURE stub (real Hercher
// data lands in phase 4), reported-not-asserted integrity properties,
// moon days against known lunations, injectable lot picker.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  consult, validateSortesData, moonDay, isPropitious, byzantineHourToClockHour,
  pickLot, makeCryptoRandomInt, HOUR_QUESTION, FAVOURABLE_HOURS,
} from '../js/sortes.js';
import { fixtureData, cloneFixture } from './sortes-fixture.mjs';

test('mechanism: q + k = s -> prophet -> decade d, line k (fixture arithmetic)', () => {
  // The routes of Hercher's two worked examples, against fixture answers.
  const a = consult(fixtureData, 16, 5);
  assert.equal(a.sum, 21);
  assert.equal(a.decade, 8);
  assert.equal(a.line, 5);
  assert.equal(a.prophet.en, 'FIXTURE Prophet 21');
  assert.equal(a.answer.answersQuestion, 16);
  assert.equal(a.question.n, 16);
  const b = consult(fixtureData, 16, 10);
  assert.equal(b.sum, 26);
  assert.equal(b.decade, 18); // not 58: ιη misread as νη — see docs/PILOT.md
  assert.equal(b.line, 10);
  // Every fixture consultation lands on a tagged, non-filler answer to its own question.
  for (const q of [12, 13, 16]) {
    const seen = new Set();
    for (let k = 1; k <= 10; k += 1) {
      const r = consult(fixtureData, q, k);
      assert.equal(r.answer.answersQuestion, q, `q${q} k${k}`);
      assert.equal(r.answer.filler, false);
      seen.add(`${r.decade}:${r.line}`);
    }
    assert.equal(seen.size, 10, `q${q} reaches ten distinct (decade,line) pairs`);
  }
  assert.equal(HOUR_QUESTION, 13);
});

test('consult rejects out-of-range input clearly', () => {
  assert.throws(() => consult(fixtureData, 11, 5), RangeError); // no such question in data
  assert.throws(() => consult(fixtureData, 16, 0), RangeError);
  assert.throws(() => consult(fixtureData, 16, 11), RangeError);
  assert.throws(() => consult(fixtureData, 16, 2.5), RangeError);
  assert.throws(() => consult(fixtureData, 'x', 5), RangeError);
  assert.throws(() => consult(null, 16, 5), TypeError);
  const broken = cloneFixture();
  broken.table = broken.table.filter((r) => r.sum !== 21);
  assert.throws(() => consult(broken, 16, 5), RangeError); // sum missing from table
});

test('validateSortesData REPORTS imperfections instead of asserting an ideal table', () => {
  const report = validateSortesData(fixtureData);
  assert.deepEqual(report.errors, []);
  assert.equal(report.stats.questionCount, 3);
  assert.equal(report.stats.reachableCount, 30); // 3 fixture questions x 10
  assert.deepEqual(report.stats.duplicatePairs, []);
  assert.deepEqual(report.stats.tagMismatches, []);
  assert.ok(report.stats.unreachableLines.some((u) => u.decade === 99)); // the filler decade
  assert.ok(report.stats.missingSums.includes(27)); // fixture table stops at 26

  // A displaced tag is reported, not thrown.
  const displaced = cloneFixture();
  displaced.decades.find((d) => d.n === 8).lines[4].answersQuestion = 12;
  const r2 = validateSortesData(displaced);
  assert.equal(r2.stats.tagMismatches.length, 1);
  assert.deepEqual(r2.stats.tagMismatches[0], { decade: 8, line: 5, expectedQuestion: 16, taggedQuestion: 12 });

  // Two sums routed to one decade produce duplicate (decade,line) pairs, reported.
  const dup = cloneFixture();
  dup.table.find((row) => row.sum === 22).decade = 8; // now s21 and s22 share decade 8
  const r3 = validateSortesData(dup);
  assert.ok(r3.stats.duplicatePairs.length >= 1);
  assert.ok(r3.stats.duplicatePairs.every((p) => Array.isArray(p.reachedBy) && p.reachedBy.length > 1));

  // Malformed shapes are errors in the report; the function still does not throw.
  assert.ok(validateSortesData(null).errors.length > 0);
  assert.ok(validateSortesData({ questions: [], table: [], decades: [{ n: 1, lines: [] }] }).errors.length > 0);
});

test('moonDay: known new moons are day 1 (within the mean-moon tolerance), full moons mid-month', () => {
  const nearNew = (y, m, d) => {
    const md = moonDay(new Date(y, m - 1, d, 12));
    assert.ok([29, 30, 1, 2].includes(md), `${y}-${m}-${d} gave moon day ${md}`);
  };
  nearNew(2000, 1, 6); // the epoch new moon itself
  nearNew(2024, 4, 8); // total solar eclipse
  nearNew(2025, 1, 29);
  nearNew(2025, 10, 21);
  const full = moonDay(new Date(2024, 3, 23, 12)); // full moon 2024-04-23
  assert.ok(full >= 14 && full <= 17, `full moon gave ${full}`);
  // Consecutive days advance by one (wrapping after 29/30).
  const a = moonDay(new Date(2025, 5, 10, 12));
  const b = moonDay(new Date(2025, 5, 11, 12));
  assert.ok(b === a + 1 || (a >= 29 && b === 1), `${a} -> ${b}`);
  assert.throws(() => moonDay(new Date('junk')), TypeError);
  assert.throws(() => moonDay('2025-01-01'), TypeError);
});

test('favourable hours: Byzantine day-hours rendered as clock hours (labelled reconstruction)', () => {
  assert.deepEqual(FAVOURABLE_HOURS, { 0: 3, 2: 3, 4: 5, 6: 6 }); // Sun, Tue, Thu, Sat
  assert.equal(byzantineHourToClockHour(1), 6);
  assert.equal(byzantineHourToClockHour(3), 8);
  assert.equal(byzantineHourToClockHour(6), 11);
  assert.throws(() => byzantineHourToClockHour(0), RangeError);
  // Find a Tuesday and a Wednesday from the calendar itself, at local noon.
  const tuesday = new Date(2026, 10, 3, 12);
  while (tuesday.getDay() !== 2) tuesday.setDate(tuesday.getDate() + 1);
  const tue = isPropitious(tuesday);
  assert.equal(tue.favourableWeekday, true);
  assert.equal(tue.byzantineHour, 3);
  assert.equal(tue.clockHour, 8);
  assert.equal(typeof tue.moonDay, 'number');
  const wednesday = new Date(tuesday); wednesday.setDate(wednesday.getDate() + 1);
  assert.equal(isPropitious(wednesday).favourableWeekday, false);
  // At the favourable clock hour itself, favourableNow fires.
  const atHour = new Date(tuesday); atHour.setHours(8, 30);
  assert.equal(isPropitious(atHour).favourableNow, true);
  // Moon advice is injected (phase-4 table); absent advice is null, never invented.
  assert.equal(tue.moonAdvice, null);
  const advice = Array.from({ length: 30 }, (_, i) => `FIXTURE advice ${i + 1}`);
  assert.match(isPropitious(tuesday, { moonAdvice: advice }).moonAdvice, /^FIXTURE advice /);
});

test('lot picker: injected randomInt, rejection-sampled crypto helper, validated range', () => {
  assert.equal(pickLot(() => 0), 1);
  assert.equal(pickLot(() => 9), 10);
  const bounds = [];
  pickLot((b) => { bounds.push(b); return 4; });
  assert.deepEqual(bounds, [10]);
  assert.throws(() => pickLot(() => 10), RangeError);
  assert.throws(() => pickLot(null), TypeError);
  // Crypto helper: scripted getRandomValues exercises the rejection loop (limit for bound 10).
  const values = [4294967295, 7]; // first draw >= limit (4294967290) must be rejected
  const fakeCrypto = { getRandomValues(buf) { buf[0] = values.shift(); } };
  const randomInt = makeCryptoRandomInt(fakeCrypto);
  assert.equal(randomInt(10), 7);
  assert.equal(values.length, 0); // both draws consumed: the overshoot was rejected, not modded
  assert.throws(() => makeCryptoRandomInt({}), TypeError);
  // Real crypto (Node global) stays in range.
  const real = makeCryptoRandomInt();
  for (let i = 0; i < 50; i += 1) {
    const lot = pickLot(real);
    assert.ok(Number.isInteger(lot) && lot >= 1 && lot <= 10);
  }
});

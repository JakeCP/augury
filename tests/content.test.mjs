// Content tests (phase 4b): data shapes, per-field licences, and FULL
// completeness for data/passages.js and data/sortes-*.js — no empty
// grc/en anywhere (the only blanks left are Hercher's own in the
// prophet table, listed exactly below). Sortes integrity is reported
// by validateSortesData (PLAN §7): it must pass (no errors) on the
// real data, and its tag mismatches must equal the named defect list
// in docs/PILOT.md §7 — defects are reported, never smoothed away.
// Hercher's two worked examples must reproduce exactly.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { passages } from '../data/passages.js';
import { questions, licences as questionLicences } from '../data/sortes-questions.js';
import { table, licences as tableLicences } from '../data/sortes-table.js';
import { decades, licences as decadeLicences } from '../data/sortes-decades.js';
import { moonDays, moonAdvice, favourableHours, licences as moonLicences } from '../data/sortes-moon.js';
import { framePassages } from '../data/sortes-frame.js';
import { consult, validateSortesData, FAVOURABLE_HOURS } from '../js/sortes.js';
import { BIRDS, RULE_EVIDENCE } from '../js/rules.js';

const PILOT_PASSAGES = ['varro-ll-7-7-8', 'livy-1-18-6-10', 'cic-div-1-85', 'cic-div-2-71-73', 'cic-nd-2-7', 'livy-10-40'];
const PILOT_DECADES = [8, 18];
// Closed theme set (docs/STYLE.md §8); extended only by amending STYLE.md.
const THEMES = new Set(['meta-oracle', 'travel', 'military', 'business-and-money', 'status-and-office', 'fortune-in-general', 'marriage-and-family', 'harm-and-risk', 'home-and-place', 'children', 'health', 'inheritance', 'law', 'slavery-and-freedom', 'religion', 'lost-and-found', 'work']);
// Wording-first tags that disagree with the table's routing: the named
// tradition-defect list (docs/PILOT.md §7). Reported, never hidden.
const TAG_DEFECTS = [
  { decade: 46, line: 1, expectedQuestion: 21, taggedQuestion: 48 },
  { decade: 27, line: 3, expectedQuestion: 21, taggedQuestion: 55 },
  { decade: 22, line: 10, expectedQuestion: 63, taggedQuestion: 51 },
  { decade: 58, line: 8, expectedQuestion: 74, taggedQuestion: 75 },
  { decade: 58, line: 7, expectedQuestion: 75, taggedQuestion: 83 },
  { decade: 58, line: 6, expectedQuestion: 76, taggedQuestion: 18 },
  { decade: 26, line: 9, expectedQuestion: 76, taggedQuestion: 18 },
  { decade: 67, line: 7, expectedQuestion: 80, taggedQuestion: 27 },
  { decade: 72, line: 9, expectedQuestion: 80, taggedQuestion: 27 },
  { decade: 51, line: 5, expectedQuestion: 99, taggedQuestion: 84 },
  { decade: 51, line: 1, expectedQuestion: 103, taggedQuestion: 73 },
  { decade: 103, line: 10, expectedQuestion: 103, taggedQuestion: 90 },
];
// Lines whose wording names no single question (docs/PILOT.md §7):
// six bare "you will inherit" lines (all routed to q62) and four
// deleted filler lines about working.
const NULL_TAGS = ['1:7', '6:1', '7:6', '17:10', '59:5', '63:2', '82:3', '88:4', '90:9', '91:5'];
// Lines carrying an apparatus note (Hercher deletion / conjecture /
// corrupt printed text; docs/STYLE.md §8, docs/PILOT.md §7).
const APPARATUS_LINES = ['36:1', '40:3', '43:9', '46:1', '47:5', '51:1', '63:2', '63:7', '68:3', '82:3', '88:4', '88:5', '91:5', '92:8', '95:4', '95:7', '97:10', '103:1', '103:10'];
const KNOWN_RULE_IDS = new Set([...Object.keys(RULE_EVIDENCE), ...Object.values(BIRDS).map((b) => b.ruleId)]);
// 'balbus' (ND 2.7) has no tier in PLAN §3 yet; see docs/PILOT.md.
const KNOWN_TIERS = new Set(['technical', 'quintus', 'marcus', 'draft-law', 'legend', 'history', 'comedy', 'natural-history', 'poetry', 'reconstruction', 'balbus']);
const nonEmpty = (s) => typeof s === 'string' && s.trim().length > 0;

test('passages: shapes, unique ids, per-field licences; pilot six complete, rest honest stubs', () => {
  assert.ok(Array.isArray(passages) && passages.length >= PILOT_PASSAGES.length);
  assert.equal(new Set(passages.map((p) => p.id)).size, passages.length, 'passage ids are unique');
  for (const p of passages) {
    assert.ok(nonEmpty(p.id), 'id present');
    assert.ok(nonEmpty(p.citation), `${p.id}: citation present`);
    assert.ok(p.original && (p.original.lang === 'la' || p.original.lang === 'grc'), `${p.id}: original.lang`);
    assert.ok(Array.isArray(p.translations), `${p.id}: translations is an array`);
    assert.ok(Array.isArray(p.rules), `${p.id}: rules is an array`);
    for (const r of p.rules) assert.ok(KNOWN_RULE_IDS.has(r), `${p.id}: unknown rule id ${r}`);
    // Licence discipline: no text without a licence, anywhere.
    if (nonEmpty(p.original.text)) assert.ok(nonEmpty(p.original.licence), `${p.id}: original licence`);
    for (const t of p.translations) {
      if (nonEmpty(t.text)) assert.ok(nonEmpty(t.label) && nonEmpty(t.licence), `${p.id}: translation label+licence`);
    }
  }
  for (const id of PILOT_PASSAGES) {
    const p = passages.find((x) => x.id === id);
    assert.ok(p, `pilot passage ${id} exists`);
    assert.ok(nonEmpty(p.speaker) && nonEmpty(p.date), `${id}: speaker+date`);
    assert.ok(KNOWN_TIERS.has(p.tier), `${id}: known tier (${p.tier})`);
    assert.ok(nonEmpty(p.original.text) && nonEmpty(p.original.licence), `${id}: original complete`);
    assert.ok(p.translations.length >= 1, `${id}: at least one translation`);
    for (const t of p.translations) assert.ok(nonEmpty(t.text) && nonEmpty(t.label) && nonEmpty(t.licence), `${id}: translation complete`);
  }
  // Phase 4b: there are no stubs left — full completeness (incl.
  // source pins and rule coverage) is asserted in
  // tests/passages.test.mjs. Here we keep the pilot-six check as a
  // regression guard and require every other record to be non-empty.
  for (const p of passages) {
    if (PILOT_PASSAGES.includes(p.id)) continue;
    assert.ok(nonEmpty(p.original.text), `${p.id}: 4b original complete`);
    assert.ok(p.translations.length >= 1, `${p.id}: 4b translation present`);
  }
});

test('sortes questions: all 92 records n=12..103 complete in Greek and English; hour-question spelling as printed', () => {
  assert.equal(questions.length, 92);
  questions.forEach((q, i) => assert.equal(q.n, 12 + i, `question ${i} numbered ${12 + i}`));
  for (const q of questions) {
    assert.ok(nonEmpty(q.grc) && nonEmpty(q.en), `q${q.n}: Greek+English present (no stubs left)`);
    assert.ok(Array.isArray(q.themes) && q.themes.length >= 1 && q.themes.every((t) => THEMES.has(t)), `q${q.n}: themes from the closed set (STYLE §8)`);
    assert.ok(q.grc.startsWith('εἰ '), `q${q.n}: Greek begins with εἰ as printed`);
    assert.ok(q.en.endsWith('?'), `q${q.n}: English is a direct question (STYLE §6)`);
  }
  // Question list prints χρησμᾷ (alpha); method prose prints χρησμῷ. Do not harmonise.
  assert.equal(questions.find((q) => q.n === 13).grc, 'εἰ ἔστιν ὥρα τοῦ ἐπιβαλέσθαι τῷ χρησμᾷ');
  assert.equal(questions.find((q) => q.n === 16).grc, 'εἰ προκόψω ἐν τιμῇ');
});

test('sortes table: 103 rows sums 13..115, decades a permutation of 1..103, blanks only where Hercher prints none', () => {
  assert.equal(table.length, 103);
  table.forEach((row, i) => {
    assert.equal(row.sum, 13 + i);
    assert.ok(Number.isInteger(row.decade) && row.decade >= 1 && row.decade <= 103, `s${row.sum}: decade in range`);
    for (const part of [row.prophet, row.interpretation]) {
      assert.ok(part && typeof part.grc === 'string' && typeof part.en === 'string', `s${row.sum}: {grc,en} strings`);
      assert.equal(nonEmpty(part.grc), nonEmpty(part.en), `s${row.sum}: Greek and English blank together`);
    }
  });
  assert.deepEqual(table.map((r) => r.decade).slice().sort((a, b) => a - b), Array.from({ length: 103 }, (_, i) => i + 1));
  assert.deepEqual(table.filter((r) => !nonEmpty(r.prophet.grc)).map((r) => r.sum), [13], 'only sum 13 lacks a prophet name');
  assert.deepEqual(
    table.filter((r) => !nonEmpty(r.interpretation.grc)).map((r) => r.sum),
    [14, 16, 18, 22, 29, 30, 38, 39, 44, 47, 48, 50, 58, 62, 65, 70, 89, 96, 110, 111, 112, 113, 115],
  );
  // Phase 4b (lead decision): sum 13's blank prophet is recorded
  // faithfully and carries a note for the UI to display; no other row does.
  const s13 = table.find((r) => r.sum === 13);
  assert.ok(nonEmpty(s13.note) && s13.note.includes('no prophet name'), 'sum 13 carries the display note');
  assert.deepEqual(table.filter((r) => r.note !== undefined).map((r) => r.sum), [13], 'only sum 13 has a note');
  for (const licences of [questionLicences, tableLicences, decadeLicences, moonLicences]) {
    assert.ok(nonEmpty(licences?.grc) && licences.grc.includes('Hercher'), 'Greek licence names Hercher 1863');
    assert.ok(nonEmpty(licences?.en) && licences.en.includes('CC BY 4.0'), 'English licence is CC BY 4.0');
  }
});

test('sortes decades: all 103x10 lines complete (filler translated too); validateSortesData passes; defects are the named list', () => {
  assert.equal(decades.length, 103);
  let lineCount = 0;
  decades.forEach((d, i) => {
    assert.equal(d.n, i + 1);
    assert.equal(d.lines.length, 10, `decade ${d.n} has 10 lines`);
    for (const [j, line] of d.lines.entries()) {
      lineCount += 1;
      // Phase 4b completeness: no empty grc/en anywhere, filler included.
      assert.ok(nonEmpty(line.grc) && nonEmpty(line.en), `d${d.n} line ${j + 1}: Greek+English present`);
      assert.ok(!/[a-zA-Z0-9]/.test(line.grc), `d${d.n} line ${j + 1}: Greek column is Greek (no OCR Latin bleed)`);
      assert.ok(line.answersQuestion === null || (Number.isInteger(line.answersQuestion) && line.answersQuestion >= 12 && line.answersQuestion <= 103), `d${d.n}: tag shape`);
      assert.ok('apparatus' in line && (line.apparatus === null || nonEmpty(line.apparatus)), `d${d.n}: apparatus present-or-null`);
      assert.ok(typeof line.filler === 'boolean', `d${d.n}: filler boolean`);
    }
  });
  assert.equal(lineCount, 1030);
  for (const n of PILOT_DECADES) {
    const d = decades.find((x) => x.n === n);
    for (const [i, line] of d.lines.entries()) assert.ok(line.answersQuestion !== null, `decade ${n} line ${i + 1} tagged from wording`);
  }
  const keys = (pick) => decades.flatMap((d) => d.lines.map((l, i) => (pick(l) ? `${d.n}:${i + 1}` : null))).filter(Boolean);
  assert.deepEqual(keys((l) => l.answersQuestion === null), NULL_TAGS, 'untagged lines are exactly the named wording-less set');
  assert.deepEqual(keys((l) => l.apparatus !== null), APPARATUS_LINES, 'apparatus notes on exactly the flagged lines (STYLE §8)');
  const report = validateSortesData({ questions, table, decades });
  assert.deepEqual(report.errors, [], 'validateSortesData passes on the real data');
  assert.equal(report.stats.reachableCount, 920);
  assert.equal(report.stats.unreachableLines.length, 110);
  assert.deepEqual(report.stats.duplicatePairs, []);
  assert.deepEqual(report.stats.missingSums, []);
  const unreachable = new Set(report.stats.unreachableLines.map((u) => `${u.decade}:${u.line}`));
  for (const d of decades) d.lines.forEach((line, i) => assert.equal(line.filler, unreachable.has(`${d.n}:${i + 1}`), `d${d.n} line ${i + 1} filler flag`));
  assert.equal(decades.find((d) => d.n === 8).lines[9].filler, true);
  const byRoute = (a, b) => a.decade - b.decade || a.line - b.line;
  assert.deepEqual(report.stats.tagMismatches.slice().sort(byRoute), TAG_DEFECTS.slice().sort(byRoute),
    'wording-first tag mismatches are exactly the named defect list (PILOT.md §7) — reported, not hidden');
  // Every consultation the book allows lands on a complete answer.
  for (const q of questions) for (let k = 1; k <= 10; k += 1) {
    const r = consult({ questions, table, decades }, q.n, k);
    assert.ok(nonEmpty(r.answer.grc) && nonEmpty(r.answer.en), `q${q.n} k${k} lands on a complete answer`);
    assert.equal(r.answer.filler, false, `q${q.n} k${k} never lands on filler`);
  }
});

test('sortes moon + frame (phase 4b modules): 30 days, favourable hours agree with the engine, frame records complete', () => {
  assert.equal(moonDays.length, 30);
  assert.equal(moonAdvice.length, 30);
  const SLOTS = new Set(['morning', 'evening', 'all-day', 'third-hour', 'do-not-use']);
  moonDays.forEach((d, i) => {
    assert.equal(d.day, i + 1);
    assert.ok(nonEmpty(d.grc) && nonEmpty(d.en), `moon day ${d.day}: Greek+English present`);
    assert.ok(SLOTS.has(d.slot), `moon day ${d.day}: known slot`);
    assert.equal(moonAdvice[i], d.en, `moon day ${d.day}: advice string matches the record`);
  });
  const bySlot = (s) => moonDays.filter((d) => d.slot === s).map((d) => d.day);
  assert.deepEqual(bySlot('morning'), [1, 7, 13, 15, 21, 22]);
  assert.deepEqual(bySlot('all-day'), [4, 6]);
  assert.deepEqual(bySlot('third-hour'), [16, 18]);
  assert.deepEqual(bySlot('do-not-use'), [3, 5, 8, 19, 20, 24, 27]);
  // The data module and js/sortes.js must not drift apart.
  assert.deepEqual(Object.fromEntries(favourableHours.map((h) => [h.weekday, h.hour])),
    Object.fromEntries(Object.entries(FAVOURABLE_HOURS).map(([k, v]) => [Number(k), v])));
  for (const h of favourableHours) assert.ok(nonEmpty(h.grc) && nonEmpty(h.en), 'favourable hour Greek+English present');
  assert.deepEqual(framePassages.map((f) => f.id), ['sortes-frame-letter-method', 'sortes-prayer', 'sortes-hours-moon-intro']);
  for (const f of framePassages) {
    assert.equal(f.original.lang, 'grc', `${f.id}: Greek original`);
    assert.ok(nonEmpty(f.citation) && nonEmpty(f.speaker) && nonEmpty(f.date), `${f.id}: citation/speaker/date`);
    assert.ok(nonEmpty(f.original.text) && nonEmpty(f.original.licence), `${f.id}: original complete with licence`);
    assert.equal(f.translations.length, 1, `${f.id}: our English only`);
    assert.ok(nonEmpty(f.translations[0].text) && nonEmpty(f.translations[0].licence), `${f.id}: translation complete with licence`);
  }
  const prayer = framePassages.find((f) => f.id === 'sortes-prayer');
  assert.ok(prayer.original.text.includes('Μιχαὴλ') && prayer.original.text.includes('ἀμήν'), 'prayer names the angels and ends Amen');
  assert.ok(prayer.translations[0].text.includes('Michael'), 'prayer English names Michael (STYLE §4)');
  // Method prose prints χρησμῷ (omega); the question list prints χρησμᾷ. Each stands where printed.
  assert.ok(framePassages.find((f) => f.id === 'sortes-hours-moon-intro').original.text.includes('χρησμῷ'));
});

test("Hercher's two worked examples reproduce exactly against the real data", () => {
  const data = { questions, table, decades };
  const a = consult(data, 16, 5);
  assert.equal(a.sum, 21);
  assert.equal(a.decade, 8);
  assert.equal(a.line, 5);
  assert.equal(a.prophet.grc, 'Ἐλμωδάδ');
  // Decade-page text reads χρόνου; the method page quotes χρόνον.
  assert.equal(a.answer.grc, 'προκόψεις μετὰ χρόνου καθὼς ἐπιθυμεῖς');
  assert.equal(a.answer.answersQuestion, 16);
  const b = consult(data, 16, 10);
  assert.equal(b.sum, 26);
  assert.equal(b.decade, 18); // not 58: ιη misread as νη in PLAN/fixture — see docs/PILOT.md
  assert.equal(b.line, 10);
  assert.equal(b.prophet.grc, 'Ἐνώχ');
  assert.equal(b.answer.grc, 'προκόψεις ἐπὶ καλῷ καὶ δοξασθήσῃ');
  assert.equal(b.answer.answersQuestion, 16);
});

// Content tests (phase 4a pilot): data shapes, per-field licences, and
// pilot completeness for data/passages.js and data/sortes-*.js.
// Stubs are empty-but-present by design (PLAN §9); the pilot records
// named below must be complete. Sortes integrity is reported by
// validateSortesData (PLAN §7), except Hercher's two worked examples,
// which must reproduce exactly against the real data.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { passages } from '../data/passages.js';
import { questions, licences as questionLicences } from '../data/sortes-questions.js';
import { table, licences as tableLicences } from '../data/sortes-table.js';
import { decades, licences as decadeLicences } from '../data/sortes-decades.js';
import { consult, validateSortesData } from '../js/sortes.js';
import { BIRDS, RULE_EVIDENCE } from '../js/rules.js';

const PILOT_PASSAGES = ['varro-ll-7-7-8', 'livy-1-18-6-10', 'cic-div-1-85', 'cic-div-2-71-73', 'cic-nd-2-7', 'livy-10-40'];
const PILOT_DECADES = [8, 18];
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
  for (const p of passages) {
    if (PILOT_PASSAGES.includes(p.id)) continue;
    assert.equal(p.original.text, '', `${p.id}: stub original is empty, not half-filled`);
    assert.deepEqual(p.translations, [], `${p.id}: stub has no translations yet`);
  }
});

test('sortes questions: 92 records n=12..103; first twelve complete, rest stubs; hour-question spelling as printed', () => {
  assert.equal(questions.length, 92);
  questions.forEach((q, i) => assert.equal(q.n, 12 + i, `question ${i} numbered ${12 + i}`));
  for (const q of questions.slice(0, 12)) {
    assert.ok(nonEmpty(q.grc) && nonEmpty(q.en), `q${q.n}: Greek+English present`);
    assert.ok(Array.isArray(q.themes) && q.themes.length >= 1 && q.themes.every(nonEmpty), `q${q.n}: themes present`);
    assert.ok(q.grc.startsWith('εἰ '), `q${q.n}: Greek begins with εἰ as printed`);
    assert.ok(q.en.endsWith('?'), `q${q.n}: English is a direct question (STYLE §6)`);
  }
  for (const q of questions.slice(12)) assert.deepEqual(q, { n: q.n, grc: '', en: '', themes: [] }, `q${q.n}: honest stub`);
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
  for (const licences of [questionLicences, tableLicences, decadeLicences]) {
    assert.ok(nonEmpty(licences?.grc) && licences.grc.includes('Hercher'), 'Greek licence names Hercher 1863');
    assert.ok(nonEmpty(licences?.en) && licences.en.includes('CC BY 4.0'), 'English licence is CC BY 4.0');
  }
});

test('sortes decades: 103x10 shapes; pilot decades complete and tagged; filler agrees with reachability', () => {
  assert.equal(decades.length, 103);
  decades.forEach((d, i) => {
    assert.equal(d.n, i + 1);
    assert.equal(d.lines.length, 10, `decade ${d.n} has 10 lines`);
    for (const line of d.lines) {
      assert.ok(typeof line.grc === 'string' && typeof line.en === 'string', `d${d.n}: string fields`);
      assert.ok(line.answersQuestion === null || (Number.isInteger(line.answersQuestion) && line.answersQuestion >= 12 && line.answersQuestion <= 103), `d${d.n}: tag shape`);
      assert.ok('apparatus' in line && (line.apparatus === null || nonEmpty(line.apparatus)), `d${d.n}: apparatus present-or-null`);
      assert.ok(typeof line.filler === 'boolean', `d${d.n}: filler boolean`);
      assert.equal(nonEmpty(line.grc), nonEmpty(line.en), `d${d.n}: Greek and English filled together`);
      if (!nonEmpty(line.grc)) assert.equal(line.answersQuestion, null, `d${d.n}: stub lines are untagged (no table-copying)`);
    }
  });
  for (const n of PILOT_DECADES) {
    const d = decades.find((x) => x.n === n);
    for (const [i, line] of d.lines.entries()) {
      assert.ok(nonEmpty(line.grc) && nonEmpty(line.en), `decade ${n} line ${i + 1} complete`);
      assert.ok(line.answersQuestion !== null, `decade ${n} line ${i + 1} tagged from wording`);
    }
  }
  const report = validateSortesData({ questions, table, decades });
  assert.deepEqual(report.errors, []);
  assert.equal(report.stats.reachableCount, 920);
  assert.equal(report.stats.unreachableLines.length, 110);
  const unreachable = new Set(report.stats.unreachableLines.map((u) => `${u.decade}:${u.line}`));
  for (const d of decades) d.lines.forEach((line, i) => assert.equal(line.filler, unreachable.has(`${d.n}:${i + 1}`), `d${d.n} line ${i + 1} filler flag`));
  // Decade 8 line 10 is the pilot's one translated filler line.
  assert.equal(decades.find((d) => d.n === 8).lines[9].filler, true);
  assert.deepEqual(report.stats.tagMismatches, [], 'pilot tags agree with routing (defects, when found, are reported not hidden)');
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

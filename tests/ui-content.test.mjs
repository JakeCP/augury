// UI × shipped-content tests (final UI pass): the views rendered with
// the real phase-4b data — grouped Texts, Sortes moon/frame/sum-13/
// apparatus, rule links, and no "Text in preparation" anywhere.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { passages } from '../data/passages.js';
import { questions } from '../data/sortes-questions.js';
import { table } from '../data/sortes-table.js';
import { decades } from '../data/sortes-decades.js';
import { moonDays, moonAdvice, favourableHours, moonSource } from '../data/sortes-moon.js';
import { framePassages } from '../data/sortes-frame.js';
import { consult, isPropitious } from '../js/sortes.js';
import { interpret, RULE_NAMES, BIRDS } from '../js/rules.js';
import { textsHTML, textHTML, groupPassages } from '../js/views/texts.js';
import { sortesHomeHTML, sortesQuestionsHTML, sortesLotHTML, sortesAnswerHTML } from '../js/views/sortes.js';
import { homeHTML, questionHTML, traditionHTML, templumHTML, watchHTML, verdictHTML, ruleHref } from '../js/views/rite.js';
import { tripudiumHTML, tripResultHTML } from '../js/views/tripudium.js';

const data = { questions, table, decades };
const noPrep = (html, what) => assert.ok(!/in preparation/i.test(html), `${what} must not render "in preparation" with shipped data`);
const textHrefs = (html) => [...html.matchAll(/href="#\/texts\/([^"]+)"/g)].map((m) => decodeURIComponent(m[1]));
const PASSAGE_IDS = new Set(passages.map((p) => p.id));

test('consult surfaces sum 13\'s note; the answer view shows it where the prophet would stand', () => {
  const r = consult(data, 12, 1); // 12 + 1 = 13
  assert.equal(r.sum, 13);
  assert.equal(r.prophet.en, '');
  assert.match(r.note ?? '', /Hercher prints no prophet name for sum 13/);
  const html = sortesAnswerHTML(r);
  assert.ok(html.includes(r.note), 'answer view prints the sum-13 note');
  assert.match(html, /strength of God/, 'the interpretation still stands');
  noPrep(html, 'sum-13 answer');
});

test('apparatus lines: footnote mark, tap to reveal the apparatus string', () => {
  const r = consult(data, 21, 1); // decade 46 line 1, a Hercher deletion
  assert.equal(`${r.decade}:${r.line}`, '46:1');
  assert.ok(r.answer.apparatus, 'fixture route really lands on an apparatus line');
  const html = sortesAnswerHTML(r);
  assert.match(html, /†/, 'footnote mark shown');
  assert.match(html, /<details[^>]*class="apparatus/, 'tappable reveal (details)');
  assert.ok(html.includes('Hercher deletes this line'), 'apparatus text present to reveal');
  const plain = sortesAnswerHTML(consult(data, 16, 5));
  assert.ok(!plain.includes('apparatus'), 'ordinary lines carry no apparatus block');
  noPrep(html, 'apparatus answer');
});

test('sortes home: moon-day/hour advice injected and labelled the book\'s; frame expandable', () => {
  const now = new Date(2025, 0, 29, 12);
  const p = isPropitious(now, { moonAdvice });
  assert.ok(p.moonAdvice, 'moon table gives advice for the day');
  const html = sortesHomeHTML(now, { moonAdvice, moonDays, favourableHours, moonSource, framePassages });
  assert.match(html, new RegExp(`Day ${p.moonDay} of the`));
  assert.ok(html.includes(p.moonAdvice), 'the day\'s advice is shown');
  assert.ok(html.includes(moonDays[p.moonDay - 1].grc), 'the Greek of the day is shown');
  assert.match(html, /[Tt]he book('|’)s advice/, 'advice is labelled as the book\'s');
  assert.match(html, /Hercher 1863, printed p\. 3/, 'moon table cited quietly');
  assert.match(html, /<details[^>]*>[\s\S]*The book('|’)s own instructions/, 'frame is an expandable section');
  assert.ok(html.includes('Of Astrampsychus the Egyptian'), 'letter/method translation present');
  assert.ok(html.includes('Almighty Lord, heavenly God'), 'prayer translation present');
  assert.match(html, /lang="grc"/, 'frame Greek is languaged');
  noPrep(html, 'sortes home');
});

test('texts index: grouped by author (chronological) and work, citations in order, every passage once', () => {
  const groups = groupPassages(passages);
  const authors = groups.map((g) => g.author);
  assert.deepEqual(authors, [
    'Homer', 'Plautus', 'Ennius', 'Varro', 'Cicero', 'Livy',
    'Valerius Maximus', 'Pliny', 'Suetonius', 'Festus', 'Gellius', 'Servius',
  ]);
  const flat = groups.flatMap((g) => g.works.flatMap((w) => w.passages.map((p) => p.id)));
  assert.equal(flat.length, passages.length);
  assert.equal(new Set(flat).size, passages.length, 'each passage appears exactly once');
  const livy = groups.find((g) => g.author === 'Livy').works.find((w) => /Ab urbe condita/.test(w.work));
  assert.deepEqual(livy.passages.map((p) => p.id), [
    'livy-1-7-1', 'livy-1-18-6-10', 'livy-1-34-8-9', 'livy-1-36-3-6', 'livy-8-30-32', 'livy-10-40',
  ]);
  const cicDiv = groups.find((g) => g.author === 'Cicero').works.find((w) => /De divinatione/.test(w.work));
  const divIds = cicDiv.passages.map((p) => p.id);
  assert.ok(divIds.indexOf('cic-div-1-27-29') < divIds.indexOf('cic-div-1-77'), 'book 1 in citation order');
  assert.ok(divIds.indexOf('cic-div-1-120') < divIds.indexOf('cic-div-2-71-73'), 'book 1 before book 2');
  const serv = groups.find((g) => g.author === 'Servius').works.flatMap((w) => w.passages.map((p) => p.id));
  assert.deepEqual(serv, ['serv-aen-3-89', 'serv-aen-6-190', 'serv-aen-6-191', 'serv-aen-12-259']);
  const html = textsHTML(passages);
  assert.equal(textHrefs(html).length, passages.length, 'index links every passage once');
  const pos = (s) => html.indexOf(`<h2>${s}</h2>`);
  assert.ok(pos('Homer') < pos('Plautus') && pos('Plautus') < pos('Varro') && pos('Varro') < pos('Cicero'), 'early authors first');
  assert.ok(pos('Cicero') < pos('Livy') && pos('Livy') < pos('Pliny') && pos('Pliny') < pos('Festus'), 'chronological order continues');
  noPrep(html, 'texts index');
});

test('a Greek passage page: facing original/translation, licences + edition/page shown quietly', () => {
  const homer = passages.find((p) => p.id === 'hom-il-12-237-243');
  const html = textHTML(homer);
  assert.match(html, /class="spread"/, 'facing layout container (side by side at desktop, stacked on phone)');
  assert.match(html, /<p lang="grc" class="original">Πουλυδάμα/, 'polytonic Greek original, languaged');
  assert.ok(html.includes('Samuel Butler'), 'translation label');
  assert.ok(html.includes(homer.original.licence), 'original licence shown');
  for (const t of homer.translations) assert.ok(html.includes(t.licence), 'translation licence shown');
  assert.ok(html.includes(homer.source.edition), 'edition shown quietly');
  assert.ok(html.includes(homer.source.page), 'edition page/section shown quietly');
  noPrep(html, 'Homer passage');
});

test('rule names link to real passages (verdict, tripudium, rite); every rule has a passage', () => {
  for (const id of [...Object.keys(RULE_NAMES), ...Object.values(BIRDS).map((b) => b.ruleId)]) {
    const href = ruleHref(id, passages);
    assert.ok(href.startsWith('#/texts/') && PASSAGE_IDS.has(decodeURIComponent(href.slice(8))), `${id} -> ${href} must be a shipped passage`);
  }
  const obs = {
    tradition: 'roman', orientation: 'varro', frontDeg: 180, templumHalfWidthDeg: 180, declinationDeg: 0,
    vitium: false, isDaylight: true, attemptsToday: 1,
    signs: [{ bird: 'crow', kinds: ['voice'], relDeg: 270, height: 'na', flight: 'na', count: 1 }],
  };
  for (const [what, html] of [
    ['verdict', verdictHTML(obs, interpret(obs), passages)],
    ['tripudium', tripudiumHTML(0, passages)],
    ['tradition', traditionHTML({})],
    ['templum', templumHTML({ tradition: 'roman', frontDeg: 180, templumHalfWidthDeg: 180, declinationDeg: 0, askedFor: ['crow'], isDaylight: true })],
    ['watch', watchHTML({ tradition: 'roman', orientation: 'varro', frontDeg: 180, templumHalfWidthDeg: 180, askedFor: [], signs: [], vitium: false, isDaylight: true, suggestedMin: 20, startedAt: Date.now() }, 0)],
  ]) {
    const hrefs = textHrefs(html);
    assert.ok(hrefs.length > 0, `${what} links into the Texts`);
    for (const id of hrefs) assert.ok(PASSAGE_IDS.has(id), `${what} link #/texts/${id} resolves to a shipped passage`);
    noPrep(html, what);
  }
  const trip = tripudiumHTML(0, passages);
  assert.ok(trip.includes(RULE_NAMES['R-TRIP-ANY']), 'tripudium names its rule in words');
});

test('empty states: no "in preparation" renders with the shipped data, on any view', () => {
  const chrome = [
    homeHTML(false), questionHTML(''), traditionHTML({}),
    sortesQuestionsHTML(questions), sortesLotHTML(questions[0]),
    tripResultHTML({ outcome: 'solistimum', latin: 'AVES ADMITTVNT', english: 'The birds allow it.', attempt: 1, coactum: false }),
    textsHTML(passages),
  ];
  chrome.forEach((html, i) => noPrep(html, `chrome view ${i}`));
  for (const p of passages) noPrep(textHTML(p), `passage ${p.id}`);
  for (const p of framePassages) noPrep(textHTML(p), `frame ${p.id}`);
  // Every consultation the book allows (920 routes) renders a complete answer.
  for (const q of questions) {
    for (let k = 1; k <= 10; k += 1) {
      const html = sortesAnswerHTML(consult(data, q.n, k));
      noPrep(html, `consultation q${q.n} k${k}`);
    }
  }
});

import test from 'node:test'; import assert from 'node:assert/strict';
import { relToXY, describeRegion, canDecline, SIGN_FIELDS, sharedRecordContainsQuestion, esc } from '../js/views/helpers.js';
import { domeSVG } from '../js/views/dome.js';
import { recordHTML, observationFromWatch, verdictHTML, homeHTML, ruleName, ruleHref } from '../js/views/rite.js';
import { interpret } from '../js/rules.js';
import { passages } from './fixtures/passages.js';
test('dome geometry: front at top, right to the east', () => {
  const top = relToXY(0); assert.ok(top.y < 100 && Math.abs(top.x - 100) < 0.01);
  const right = relToXY(90); assert.ok(right.x > 100);
  const left = relToXY(270); assert.ok(left.x < 100);
  assert.match(domeSVG({}), /SINISTRA/); assert.match(domeSVG({}), /DEXTRA/);
});
test('sign inventory covers interpret fields; decline rules', () => {
  for (const f of ['bird','kinds','foodFell','chokedVoice','flight','height','count','declined','relDeg']) assert.ok(SIGN_FIELDS.includes(f), f);
  assert.equal(canDecline({ bird: 'crow', kinds: ['voice'] }, ['raven']), true);   // oblative
  assert.equal(canDecline({ bird: 'crow', kinds: ['voice'] }, ['crow']), false);   // asked for
  assert.equal(canDecline({ bird: 'bubo', kinds: ['flight'], daylight: true }, []), false); // dire
});
test('shared record HTML never contains the viewer question', () => {
  const obs = { tradition: 'roman', orientation: 'varro', frontDeg: 180, templumHalfWidthDeg: 180, declinationDeg: 0,
    askedFor: ['crow'], vitium: false, isDaylight: true, attemptsToday: 1, startedAtEpochMin: 29000000,
    signs: [{ bird: 'crow', kinds: ['voice'], relDeg: 270, height: 'na', flight: 'na', count: 1 }] };
  const html = recordHTML(obs, interpret(obs), { shared: true, recordedVerdict: 'ADMITTUNT' });
  const secret = 'MYSECRETQUESTION-should-i-sell-the-farm';
  assert.equal(sharedRecordContainsQuestion(html, secret), false);
  assert.ok(!html.includes(secret));
  assert.match(html, /AVES ADMITTVNT/);
});
test('escaping and fixture passage shape', () => {
  assert.equal(esc('<b>&"'), '&lt;b&gt;&amp;&quot;');
  assert.equal(passages[0].tier, 'quintus'); assert.ok(passages[0].original.licence.length > 0);
  assert.match(describeRegion(270), /sinistra/);
});
test('dome lettering stays inside the rim with clear space', () => {
  const svg = domeSVG({});
  // Every label carries a textLength and sits at radius <= 67 of 92 from centre.
  for (const m of svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)" class="dome-lab"[^>]*textLength="([\d.]+)"[^>]*>([A-Z]+)<\/text>/g)) {
    const [, xs, ys, ls, word] = m; const x = +xs, y = +ys, len = +ls;
    const worst = Math.hypot(Math.max(Math.abs(x - len / 2 - 100), Math.abs(x + len / 2 - 100)), Math.abs(y - 100));
    assert.ok(worst < 84, `${word} reaches radius ${worst.toFixed(1)} (rim 92)`);
    assert.ok(x - len / 2 > 0 && x + len / 2 < 200, `${word} inside viewBox width`);
  }
  assert.match(svg, /viewBox="-6 -6 212 212"/);
});
test('verdict: human rule names, small IDs, passage links, per-sign strengths, F/U dome', () => {
  const obs = { tradition: 'roman', orientation: 'varro', frontDeg: 180, templumHalfWidthDeg: 180, declinationDeg: 0,
    vitium: false, isDaylight: true, attemptsToday: 1,
    signs: [
      { bird: 'crow', kinds: ['voice'], relDeg: 270, height: 'na', flight: 'na', count: 2 },
      { bird: 'vulture', kinds: ['flight'], relDeg: 90, height: 'middle', flight: 'across', count: 6 },
    ] };
  const html = verdictHTML(obs, interpret(obs), passages);
  assert.match(html, /Mixed signs need a two-to-one weight/); // human name, not bare R-MIXED
  assert.match(html, /<span class="rule-id">R-MIXED<\/span>/); // ID present, secondary
  assert.match(html, /#\/texts\/fix-1/); // R-EXCEPT links to its fixture passage
  assert.equal(ruleHref('R-EXCEPT', passages), '#/texts/fix-1');
  assert.match(ruleName('B-CROW'), /Crow/);
  assert.match(html, /Favourable 5\/4/); // per-sign breakdown
  assert.match(html, /Unfavourable 9\/2/);
  assert.ok(!html.includes('Romulus and Remus'), 'decisive verdict: no founders gloss');
  assert.match(html, /dome-mark-fav/); assert.match(html, /dome-mark-unfav/); // plotted F/U
  assert.match(html, /Where each sign was seen/);
});
test('home carries the privacy line zero times (the footer says it once)', () => {
  assert.ok(!homeHTML(false).includes('Nothing leaves this device'));
  assert.match(homeHTML(false), /hl-name">Tripudium/);
});
test('observationFromWatch drops stubs', () => {
  const obs = observationFromWatch({ tradition: 'roman', orientation: 'varro', frontDeg: 180, templumHalfWidthDeg: 180, signs: [{ bird: 'crow', kinds: ['voice'], stub: true }] });
  assert.equal(obs.signs.length, 0);
});

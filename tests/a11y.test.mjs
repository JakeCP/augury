// Accessibility structure tests (PLAN §8 / §11, the automatable half):
// landmarks, one h1 per view with headings in order, focus management
// hooks, the sign sheet as a trapped modal, a single live region for
// verdicts, >=48px targets in CSS, lang attributes, reduced motion.
// The other half — VoiceOver/TalkBack through the rite, glare — is
// manual and stays on the PLAN §11 checklist.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { homeHTML, questionHTML, traditionHTML, templumHTML, watchHTML, verdictHTML, recordHTML } from '../js/views/rite.js';
import { signSheetHTML } from '../js/views/signsheet.js';
import { tripudiumHTML, tripResultHTML } from '../js/views/tripudium.js';
import { sortesHomeHTML, sortesQuestionsHTML, sortesLotHTML, sortesAnswerHTML } from '../js/views/sortes.js';
import { textsHTML, textHTML, aboutHTML, notFoundHTML, damagedHTML } from '../js/views/texts.js';
import { interpret } from '../js/rules.js';
import { passages } from './fixtures/passages.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const WATCH = {
  tradition: 'roman', orientation: 'varro', frontDeg: 180, templumHalfWidthDeg: 180,
  declinationDeg: 0, askedFor: ['crow'], signs: [], vitium: false, isDaylight: true,
  suggestedMin: 20, startedAt: Date.now(), attemptsToday: 1,
};
const OBS = {
  tradition: 'roman', orientation: 'varro', frontDeg: 180, templumHalfWidthDeg: 180,
  declinationDeg: 0, askedFor: ['crow'], vitium: false, isDaylight: true, attemptsToday: 1,
  startedAtEpochMin: 29000000,
  signs: [{ bird: 'crow', kinds: ['voice'], relDeg: 270, height: 'na', flight: 'na', count: 1 }],
};
const RESULT = interpret(OBS);

const VIEWS = {
  home: homeHTML(false),
  'home (resume)': homeHTML(true),
  question: questionHTML(''),
  tradition: traditionHTML({}),
  templum: templumHTML(WATCH),
  watch: watchHTML(WATCH, 0),
  verdict: verdictHTML(OBS, RESULT, passages),
  record: recordHTML(OBS, RESULT),
  'shared record': recordHTML(OBS, RESULT, { shared: true, recordedVerdict: 'ADMITTUNT' }),
  tripudium: tripudiumHTML(0),
  sortes: sortesHomeHTML(new Date()),
  'sortes questions': sortesQuestionsHTML([{ n: 12, en: 'Will I recover what was lost?', grc: '', themes: ['loss'] }]),
  'sortes lot': sortesLotHTML({ n: 12, en: 'Will I recover what was lost?' }),
  'sortes answer (empty)': sortesAnswerHTML(null),
  texts: textsHTML(passages),
  text: textHTML(passages[0]),
  about: aboutHTML(),
  'not found': notFoundHTML(),
  damaged: damagedHTML('bad code'),
};

test('every view: exactly one h1 (focus target), headings never skip a level', () => {
  for (const [name, html] of Object.entries(VIEWS)) {
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    assert.ok(levels.length > 0, `${name}: no heading`);
    assert.equal(levels[0], 1, `${name}: first heading is h${levels[0]}, not h1`);
    assert.equal(levels.filter((l) => l === 1).length, 1, `${name}: not exactly one h1`);
    assert.match(html, /<h1[^>]*tabindex="-1"/, `${name}: h1 is the route-change focus target`);
    for (let i = 1; i < levels.length; i += 1) {
      assert.ok(levels[i] <= levels[i - 1] + 1, `${name}: heading jumps h${levels[i - 1]} -> h${levels[i]}`);
    }
  }
  // The sign sheet lives inside the watch view: combined, still ordered.
  const combined = watchHTML(WATCH, 0) + signSheetHTML(
    { bird: 'crow', kinds: ['flight'], relDeg: 90, height: 'na', flight: 'across', count: 1 }, ['crow']);
  const levels = [...combined.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i += 1) assert.ok(levels[i] <= levels[i - 1] + 1, 'watch+sheet heading order');
});

test('index.html: landmarks, skip button, one atomic live region', () => {
  const html = read('index.html');
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<header class="topbar">/);
  assert.match(html, /<nav aria-label="Site">/);
  assert.match(html, /<main>/);
  assert.match(html, /<footer>/);
  // A button, not a "#app" anchor: the hash router would eat the anchor.
  assert.match(html, /<button type="button" class="skip-link" id="skip-link">Skip to the rite<\/button>/);
  assert.doesNotMatch(html, /href="#app"/);
  assert.match(html, /<div id="live" class="visually-hidden" aria-live="polite" aria-atomic="true"><\/div>/);
  const app = read('js/app.js');
  assert.match(app, /getElementById\('skip-link'\)\?\.addEventListener\('click'/, 'skip button is wired');
  assert.match(app, /h\.focus\(\{ preventScroll: true \}\)/, 'route change moves focus to the heading');
});

test('verdicts are announced once: views carry no live region, app announces via #live', () => {
  assert.ok(!VIEWS.verdict.includes('aria-live'), 'verdict view must not double-announce (focus + #live do it)');
  assert.ok(!VIEWS.tripudium.includes('aria-live'), 'tripudium result must not double-announce');
  const app = read('js/app.js');
  assert.match(app, /announce\(`\$\{result\.latin\}\. \$\{result\.english\}`\)/, 'watch verdict announced in text');
  assert.match(app, /announce\(`\$\{r\.latin\}\. \$\{r\.english\}`\)/, 'tripudium verdict announced in text');
  // Verdict is text, never colour alone, and the Latin is languaged.
  assert.match(VIEWS.verdict, /<h1[^>]*lang="la"[^>]*>AVES ADMITTVNT<\/h1>/);
  const trip = tripResultHTML({ outcome: 'solistimum', latin: 'AVES ADMITTVNT', english: 'The birds allow it.', attempt: 1, coactum: false });
  assert.match(trip, /lang="la">AVES ADMITTVNT</);
});

test('sign sheet: modal dialog, focus trap with Escape, focus returns to There!', () => {
  const sheet = signSheetHTML(
    { bird: 'crow', kinds: ['flight'], relDeg: 90, height: 'na', flight: 'across', count: 1 }, ['crow']);
  assert.match(sheet, /role="dialog" aria-modal="true" aria-labelledby="sheet-h"/);
  assert.match(sheet, /<h2 id="sheet-h" tabindex="-1">/);
  assert.match(sheet, /aria-label="One fewer"/);
  assert.match(sheet, /aria-label="One more"/);
  const app = read('js/app.js');
  assert.match(app, /sheet\.querySelector\('#sheet-h'\)\?\.focus\(\)/, 'focus lands in the sheet');
  assert.match(app, /e\.key === 'Escape'/, 'Escape closes');
  assert.match(app, /e\.key !== 'Tab'/, 'Tab cycles inside');
  assert.ok((app.match(/getElementById\('there'\)\?\.focus\(\)/g) ?? []).length >= 2,
    'focus returns to There! on cancel and on submit');
});

test('Announce bearing is a named button on templum and watch; dome never chatters', () => {
  for (const name of ['templum', 'watch']) {
    assert.match(VIEWS[name], /<button type="button" class="btn small" id="announce">Announce bearing<\/button>/, name);
  }
  assert.match(VIEWS.watch, /role="img" aria-label="Sky dome\./, 'dome is a labelled image, updated silently');
});

test('target sizes: every interactive class is at least 48px tall in CSS', () => {
  const css = `${read('css/base.css')}\n${read('css/views.css')}`;
  const block = (sel) => {
    const m = css.match(new RegExp(`${sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\{([^}]*)\\}`));
    assert.ok(m, `no CSS rule for ${sel}`);
    return m[1];
  };
  const atLeast48 = (sel) => {
    const m = block(sel).match(/min-height:(\d+)px/);
    assert.ok(m && Number(m[1]) >= 48, `${sel} min-height must be >=48px, got: ${block(sel)}`);
  };
  ['.btn', '.btn.small', '.theme-cycle', '.brand', '.topbar nav a', '.choice,.check',
    '.chip', '.bird-pick', '.q-item', '.token', '.there', '.skip-link', 'summary', 'footer a',
  ].forEach(atLeast48);
  assert.match(block('.rule-name'), /min-height:48px/, 'verdict rule links are full-size targets');
  assert.match(css, /input\[type=text\][^{]*\{[^}]*min-height:48px/, 'text inputs/selects are 48px');
});

test('focus visible, reduced motion in CSS and JS (dome snap, still chickens)', () => {
  const base = read('css/base.css');
  const views = read('css/views.css');
  assert.match(base, /:focus-visible\{outline:3px solid var\(--focus\)/);
  assert.match(views, /@media\(prefers-reduced-motion:reduce\)\{[\s\S]*animation:none!important/);
  const app = read('js/app.js');
  assert.match(app, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(app, /REDUCED\.matches\) \? r\.headingDeg/, 'dome rotation snaps under reduced motion');
  assert.match(app, /if \(REDUCED\.matches\) \{ finish\(\); return; \}/, 'tripudium is a still frame under reduced motion');
});

test('language is marked up: Latin and Greek carry lang, English adjacent', () => {
  assert.match(VIEWS.verdict, /lang="la">AVES ADMITTVNT/);
  assert.match(VIEWS.text, /<p lang="(?:la|grc)" class="original">/, 'facing original is languaged');
  const answer = sortesAnswerHTML({
    q: 16, k: 5, sum: 21, decade: 8, line: 5,
    question: { en: 'Will I advance in honour?' },
    prophet: { en: 'Noah' }, interpretation: { en: 'rest' },
    answer: { grc: 'προκόψεις μετὰ χρόνον', en: 'You will advance in time.', apparatus: null },
  });
  assert.match(answer, /<p class="answer-grc" lang="grc">/);
  assert.match(answer, /<p class="answer-en">You will advance in time\./, 'English sits right under the Greek');
});

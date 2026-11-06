// Boot + view orchestration (PLAN §5, §9).
import { parseRoute, navigate } from './router.js';
import { sessionStore, localStore, KEYS, bumpAttempts, peekAttempts } from './store.js';
import { interpret, BIRD_IDS, BIRDS } from './rules.js';
import { frontForOrientation, norm, relBearing } from './compass.js';
import { encodeRecord, decodeRecord } from './share.js';
import { tripudium } from './tripudium.js';
import { consult, pickLot, makeCryptoRandomInt } from './sortes.js';
import { createSensor, requestOrientationPermission, springStep } from './sensors.js';
import * as R from './views/rite.js';
import { signSheetHTML, readSignSheet } from './views/signsheet.js';
import { tripudiumHTML, tripResultHTML } from './views/tripudium.js';
import * as S from './views/sortes.js';
import * as T from './views/texts.js';
import { domeSVG } from './views/dome.js';
import { describeRegion, compassPoint } from './views/helpers.js';

const app = document.getElementById('app');
const live = document.getElementById('live');
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)');
let routeSeq = 0, sensor = null, lastReading = null, smoothed = null, lastTick = 0;
let watchTimer = null, wakeLock = null, hiddenAt = null, deletedStack = [];
let passagesPromise = null, sortesPromise = null;

function announce(msg) { if (live) { live.textContent = ''; requestAnimationFrame(() => { live.textContent = msg; }); } }
function render(html) { app.innerHTML = html; const h = app.querySelector('h1[tabindex="-1"]'); if (h) { h.focus({ preventScroll: true }); document.title = `${h.textContent.trim()} — Augury`; } scrollTo(0, 0); }
function getWatch() { return sessionStore.get(KEYS.watch); }
function saveWatch(w) { sessionStore.set(KEYS.watch, w); }
function defaultAsked() { return BIRD_IDS.filter((id) => BIRDS[id].augural); }
function newWatch(patch = {}) {
  return { tradition: 'roman', orientation: 'varro', frontDeg: 180, templumHalfWidthDeg: 180, declinationDeg: 0,
    askedFor: defaultAsked(), signs: [], vitium: false, isDaylight: !(new Date().getHours() < 6 || new Date().getHours() >= 20),
    startedAt: Date.now(), suggestedMin: 20, attemptsToday: peekAttempts(localStore, 'watch') + 1, ...patch };
}
async function loadPassages() {
  passagesPromise ??= import('../data/passages.js').catch(() => null);
  const m = await passagesPromise; return m?.passages ?? m?.default ?? null;
}
async function loadSortes() {
  sortesPromise ??= (async () => {
    try {
      const [q, t, d] = await Promise.all([import('../data/sortes-questions.js'), import('../data/sortes-table.js'), import('../data/sortes-decades.js')]);
      return { questions: q.questions ?? q.default, table: t.table ?? t.default, decades: d.decades ?? d.default };
    } catch { return null; }
  })();
  return sortesPromise;
}
function stopSensor() { sensor?.stop(); sensor = null; clearInterval(watchTimer); watchTimer = null; wakeLock?.release?.().catch(() => {}); wakeLock = null; }
function startSensor(onTick) {
  stopSensor();
  sensor = createSensor({ declinationDeg: getWatch()?.declinationDeg ?? 0, onReading: (r) => {
    lastReading = r;
    if (r.headingDeg !== null) {
      const now = performance.now();
      smoothed = (smoothed === null || REDUCED.matches) ? r.headingDeg : springStep(smoothed, r.headingDeg, Math.min(0.1, (now - lastTick) / 1000 || 0.03));
      lastTick = now;
    }
    onTick?.(r);
  } });
  sensor.start();
}
function paintDome(w) {
  const el = document.getElementById('dome-wrap'); if (!el) return;
  el.innerHTML = domeSVG({ frontDeg: w.frontDeg, headingDeg: smoothed, tradition: w.tradition, signs: w.signs ?? [], halfWidth: w.templumHalfWidthDeg });
  const bt = document.getElementById('bearing-text');
  if (bt) bt.textContent = smoothed === null ? 'Bearing — (set by hand below)' : `Pointing ${Math.round(smoothed)}° ${compassPoint(smoothed)} · ${describeRegion(relBearing(smoothed, w.frontDeg))}`;
  const hint = document.getElementById('cal-hint'); if (hint && lastReading) hint.hidden = !lastReading.jittery;
}
function bindAnnounce(w) {
  document.getElementById('announce')?.addEventListener('click', () => {
    announce(smoothed === null ? 'No bearing yet. Set it by hand, or allow the compass.' : `Pointing ${Math.round(smoothed)} degrees, ${compassPoint(smoothed)}. Region: ${describeRegion(relBearing(smoothed, w.frontDeg))}. Front is ${Math.round(w.frontDeg)} degrees.`);
  });
}
// visibility: >60s hidden during watch => vitium (timestamps, never timers)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { hiddenAt = Date.now(); return; }
  if (hiddenAt && Date.now() - hiddenAt > 60000) {
    const w = getWatch();
    if (w && location.hash.includes('/rite/watch')) { w.vitium = true; saveWatch(w); announce('The watch was hidden for over a minute. A fault is recorded.'); dispatch(); }
  }
  hiddenAt = null;
});

function markNav() {
  const h = location.hash;
  document.querySelectorAll('.topbar nav a').forEach((a) => {
    const href = a.getAttribute('href') ?? '';
    const current = href === '#/sortes' ? h.startsWith('#/sortes')
      : href === '#/texts' ? h.startsWith('#/texts') : h === href;
    if (current) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}
async function dispatch() {
  const seq = ++routeSeq; const route = parseRoute(location.hash); markNav();
  if (!['templum', 'watch'].includes(route.name)) stopSensor();
  const stale = () => seq !== routeSeq;
  switch (route.name) {
    case 'home': render(R.homeHTML(!!getWatch()));
      app.querySelector('[data-act="resume"]')?.addEventListener('click', () => navigate('#/rite/watch'));
      app.querySelector('[data-act="discard"]')?.addEventListener('click', () => { sessionStore.remove(KEYS.watch); dispatch(); });
      break;
    case 'question': render(R.questionHTML(sessionStore.get(KEYS.question) ?? ''));
      app.querySelector('[data-act="next"]').addEventListener('click', () => { sessionStore.set(KEYS.question, document.getElementById('q-text').value); navigate('#/rite/tradition'); });
      break;
    case 'tradition': render(R.traditionHTML(getWatch() ?? {}));
      app.querySelector('[data-act="next"]').addEventListener('click', () => {
        const tradition = app.querySelector('input[name=tradition]:checked').value;
        const orientation = app.querySelector('input[name=orientation]:checked').value;
        const frontDeg = orientation === 'own' ? (smoothed ?? 180) : frontForOrientation(orientation === 'greek' && tradition === 'greek' ? 'greek' : orientation);
        saveWatch(newWatch({ ...(getWatch() ?? {}), tradition, orientation, frontDeg }));
        navigate('#/rite/templum');
      });
      break;
    case 'templum': {
      let w = getWatch() ?? newWatch(); saveWatch(w); render(R.templumHTML(w)); bindAnnounce(w);
      document.getElementById('allow-compass').addEventListener('click', async () => {
        const ok = await requestOrientationPermission().catch(() => false);
        if (!ok) { announce('Compass permission was not granted. Set the bearing by hand.'); return; }
        startSensor(() => paintDome(getWatch())); announce('Compass on. Turn to face your front.');
        document.getElementById('use-here').hidden = false;
      });
      document.getElementById('use-here').addEventListener('click', () => { if (smoothed !== null) { const x = getWatch(); x.frontDeg = Math.round(smoothed * 10) / 10; if (x.orientation !== 'own') x.orientation = 'own'; saveWatch(x); dispatch(); } });
      app.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => { const x = getWatch(); x.frontDeg = norm(x.frontDeg + Number(b.dataset.step)); saveWatch(x); dispatch(); }));
      document.getElementById('manual-bearing').addEventListener('change', (e) => { const x = getWatch(); x.frontDeg = norm(Number(e.target.value) || 0); saveWatch(x); paintDome(x); });
      app.querySelectorAll('[data-asked]').forEach((b) => b.addEventListener('click', () => {
        const on = b.dataset.asked === 'all';
        app.querySelectorAll('input[name=asked]').forEach((i) => { i.checked = on; });
        announce(on ? 'All augural birds asked for.' : 'No signs asked for. Every sign will be oblative.');
      }));
      app.querySelector('[data-act="begin-watch"]').addEventListener('click', () => {
        const x = getWatch();
        x.templumHalfWidthDeg = Math.min(180, Math.max(10, Number(document.getElementById('half-width').value) || 180));
        x.declinationDeg = Number(document.getElementById('declination').value) || 0;
        // Preserve an explicit "none": askedFor [] is a real choice (all oblative).
        x.askedFor = [...app.querySelectorAll('input[name=asked]:checked')].map((i) => i.value);
        x.suggestedMin = Number(document.getElementById('watch-len').value);
        x.isDaylight = document.getElementById('daylight').checked;
        x.startedAt = Date.now(); x.attemptsToday = bumpAttempts(localStore, 'watch');
        saveWatch(x); navigate('#/rite/watch');
      });
      break; }
    case 'watch': {
      let w = getWatch(); if (!w) { navigate('#/rite/question'); break; }
      render(R.watchHTML(w, (Date.now() - (w.startedAt ?? Date.now())) / 1000)); bindAnnounce(w);
      startSensor(() => paintDome(getWatch()));
      navigator.wakeLock?.request('screen').then((l) => { wakeLock = l; }).catch(() => {});
      watchTimer = setInterval(() => { const el = document.getElementById('elapsed'); const x = getWatch(); if (el && x) el.textContent = `${Math.floor((Date.now() - x.startedAt) / 60000)}:${String(Math.floor((Date.now() - x.startedAt) / 1000) % 60).padStart(2, '0')}`; }, 1000);
      document.getElementById('there').addEventListener('click', () => captureSign());
      document.getElementById('vitium').addEventListener('change', (e) => { const x = getWatch(); x.vitium = e.target.checked; saveWatch(x); });
      app.querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', () => { const x = getWatch(); deletedStack.push(x.signs.splice(Number(b.dataset.del), 1)[0]); saveWatch(x); dispatch(); const u = document.getElementById('undo-bar'); if (u) u.hidden = false; }));
      document.getElementById('undo')?.addEventListener('click', () => { const x = getWatch(); const s = deletedStack.pop(); if (s) x.signs.push(s); saveWatch(x); dispatch(); });
      app.querySelectorAll('[data-edit]').forEach((b) => b.addEventListener('click', () => openSheet(Number(b.dataset.edit))));
      const stubIdx = getWatch().signs.findIndex((s) => s.stub); if (stubIdx >= 0) openSheet(stubIdx);
      app.querySelector('[data-act="end"]').addEventListener('click', () => {
        const x = getWatch();
        if (x.signs.some((s) => s.stub)) { announce('A sign still needs its details.'); openSheet(x.signs.findIndex((s) => s.stub)); return; }
        const obs = R.observationFromWatch(x);
        try { sessionStore.set(KEYS.lastRecord, obs); sessionStore.remove(KEYS.watch); navigate('#/rite/verdict'); }
        catch (e) { announce(`Could not read the watch: ${e.message}`); }
      });
      break; }
    case 'verdict': {
      const obs = sessionStore.get(KEYS.lastRecord); if (!obs) { navigate('#/'); break; }
      const passages = await loadPassages(); if (stale()) break;
      const result = interpret(obs); render(R.verdictHTML(obs, result, passages)); announce(`${result.latin}. ${result.english}`);
      app.querySelector('[data-act="again"]').addEventListener('click', () => { saveWatch(newWatch({ tradition: obs.tradition, orientation: obs.orientation, frontDeg: obs.frontDeg })); navigate('#/rite/templum'); });
      break; }
    case 'record': {
      const obs = sessionStore.get(KEYS.lastRecord);
      if (!obs) { render(`<section class="view"><h1 tabindex="-1">The record</h1><p class="card">No completed watch in this tab yet.</p><a class="btn primary" href="#/rite/question">Begin the auspices</a></section>`); break; }
      const result = interpret(obs); render(R.recordHTML(obs, result));
      app.querySelector('[data-act="preview-share"]').addEventListener('click', () => { document.getElementById('share-preview').innerHTML = `<p class="note">${R.sharePreviewText(obs)}</p>`; });
      app.querySelector('[data-act="copy-share"]').addEventListener('click', async () => {
        const url = `${location.origin}${location.pathname}#/record/${encodeRecord(obs)}`;
        try { await navigator.clipboard.writeText(url); announce('Share link copied. It contains no question.'); }
        catch { document.getElementById('share-fallback').innerHTML = `<label class="field"><span>Copy this link by hand</span><input type="text" readonly value="${url}" onclick="this.select()"></label>`; }
      });
      break; }
    case 'shared-record': {
      const dec = decodeRecord(route.params.code);
      if (!dec.ok) { render(T.damagedHTML(dec.error.message)); break; }
      let result = null; try { result = interpret(dec.observation); } catch { result = null; }
      // Deliberately never read KEYS.question here.
      render(R.recordHTML(dec.observation, result, { shared: true, recordedVerdict: dec.recordedVerdict }));
      break; }
    case 'tripudium': renderTripudium(); break;
    case 'sortes': render(S.sortesHomeHTML());
      app.querySelector('[data-hour]')?.addEventListener('click', () => { sessionStore.set(KEYS.sortes, { q: 13 }); navigate('#/sortes/lot'); });
      break;
    case 'sortes-questions': {
      const data = await loadSortes(); if (stale()) break;
      render(S.sortesQuestionsHTML(data?.questions ?? null));
      app.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => { sessionStore.set(KEYS.sortes, { q: Number(b.dataset.q) }); navigate('#/sortes/lot'); }));
      document.getElementById('q-search')?.addEventListener('input', (e) => { const v = e.target.value.toLowerCase(); app.querySelectorAll('.q-list li').forEach((li) => { li.hidden = v && !li.dataset.qtext.includes(v); }); });
      app.querySelectorAll('[data-theme]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); const t = a.dataset.theme; app.querySelectorAll('.q-list li').forEach((li) => { li.hidden = !(li.dataset.themes ?? '').includes(t); }); }));
      break; }
    case 'sortes-lot': {
      const st = sessionStore.get(KEYS.sortes); if (!st?.q) { navigate('#/sortes/questions'); break; }
      const data = await loadSortes(); if (stale()) break;
      const q = data?.questions?.find((x) => x.n === st.q) ?? { n: st.q, en: '' };
      render(S.sortesLotHTML(q));
      const go = (k) => { sessionStore.set(KEYS.sortes, { q: st.q, k }); navigate('#/sortes/answer'); };
      app.querySelectorAll('[data-k]').forEach((b) => b.addEventListener('click', () => go(Number(b.dataset.k))));
      document.getElementById('chance').addEventListener('click', () => go(pickLot(makeCryptoRandomInt())));
      break; }
    case 'sortes-answer': {
      const st = sessionStore.get(KEYS.sortes); const data = await loadSortes(); if (stale()) break;
      let result = null;
      if (data && st?.q && st?.k) { try { result = consult(data, st.q, st.k); } catch { result = null; } }
      render(S.sortesAnswerHTML(result));
      break; }
    case 'texts': { const p = await loadPassages(); if (stale()) break; render(T.textsHTML(p)); break; }
    case 'text': { const p = await loadPassages(); if (stale()) break; render(T.textHTML(p?.find((x) => x.id === route.params.id) ?? null)); break; }
    case 'about': render(T.aboutHTML()); break;
    default: render(T.notFoundHTML());
  }
}
function captureSign() {
  const w = getWatch(); if (!w) return;
  const heading = smoothed;
  const relDeg = (heading === null || lastReading?.overhead) ? null : Math.round(relBearing(heading, w.frontDeg) * 10) / 10;
  const sign = { bird: 'crow', kinds: ['flight'], relDeg, height: lastReading?.height ?? 'na', flight: 'across', count: 1,
    declined: false, chokedVoice: false, foodFell: false, daylight: w.isDaylight,
    dtSec: Math.floor((Date.now() - (w.startedAt ?? Date.now())) / 1000), stub: true };
  w.signs.push(sign); saveWatch(w);
  const idx = w.signs.length - 1;
  if (document.querySelector('.sheet')) { announce('Sign noted — details will be asked next.'); return; }
  dispatch().then(() => openSheet(idx));
}
function openSheet(idx) {
  const w = getWatch(); if (!w || !w.signs[idx]) return;
  const slot = document.getElementById('sheet-slot'); if (!slot) return;
  slot.innerHTML = signSheetHTML(w.signs[idx], w.askedFor);
  const sheet = slot.querySelector('.sheet'); const prevFocus = document.activeElement;
  sheet.querySelector('#sheet-h')?.focus();
  // Focus trap: cycle Tab within the sheet (visible controls only —
  // the detail questions hide with display:none); Escape cancels.
  sheet.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(idx); return; }
    if (e.key !== 'Tab') return;
    const visible = (el) => !el.disabled && (el.checkVisibility ? el.checkVisibility() : el.offsetParent !== null);
    const f = [...sheet.querySelectorAll('button,input,select,textarea,[tabindex="-1"]')].filter(visible);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  const syncDetails = () => {
    const bird = sheet.querySelector('input[name=bird]:checked')?.value;
    const kinds = [...sheet.querySelectorAll('input[name=kinds]:checked')].map((i) => i.value);
    sheet.querySelector('[data-q="food"]').style.display = kinds.includes('feeding') ? '' : 'none';
    sheet.querySelector('[data-q="choked"]').style.display = (bird === 'raven' && kinds.includes('voice')) ? '' : 'none';
    sheet.querySelector('[data-q="daylight"]').style.display = ['bubo', 'noctua', 'owlUnsure'].includes(bird) ? '' : 'none';
  };
  sheet.addEventListener('change', syncDetails); syncDetails();
  sheet.querySelectorAll('[data-count]').forEach((b) => b.addEventListener('click', () => { const o = sheet.querySelector('#count-out'); o.textContent = String(Math.min(12, Math.max(1, Number(o.textContent) + Number(b.dataset.count)))); }));
  // Cancelling closes without reopening the same stub (it stays in the
  // list for Edit); a *different* queued stub is asked next. Focus
  // returns to There! either way (PLAN §8).
  const close = (skipIdx = -1) => { slot.innerHTML = ''; document.getElementById('there')?.focus(); const x = getWatch(); const n = x?.signs.findIndex((s, i) => s.stub && i !== skipIdx); if (n >= 0) openSheet(n); };
  sheet.querySelector('[data-sheet="cancel"]').addEventListener('click', () => close(idx));
  sheet.querySelector('#sign-form').addEventListener('submit', async (e) => {
    e.preventDefault(); const x = getWatch();
    x.signs[idx] = readSignSheet(sheet, x.signs[idx]); saveWatch(x);
    await dispatch(); // re-renders the watch, opening any next stub sheet
    if (!document.querySelector('.sheet')) document.getElementById('there')?.focus();
  });
}
function renderTripudium() {
  render(tripudiumHTML(peekAttempts(localStore, 'tripudium')));
  const run = () => {
    const hunger = app.querySelector('input[name=hunger]:checked')?.value ?? 'hungry';
    const attempt = bumpAttempts(localStore, 'tripudium');
    const stage = document.getElementById('stage');
    const finish = () => {
      const r = tripudium(() => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] / 4294967296; }, { hunger, attempt });
      sessionStore.set(KEYS.lastRecord, sessionStore.get(KEYS.lastRecord)); // tripudia counted in record via attempts; keep last watch intact
      document.getElementById('trip-result').innerHTML = tripResultHTML(r);
      announce(`${r.latin}. ${r.english}`);
      document.getElementById('again')?.addEventListener('click', () => dispatch());
    };
    if (REDUCED.matches) { finish(); return; }
    stage?.classList.add('feeding'); setTimeout(finish, 4000);
  };
  document.getElementById('scatter').addEventListener('click', run);
}
addEventListener('hashchange', dispatch);
// The skip button moves focus to the current view's heading. (A plain
// "#app" link would be swallowed by the hash router as an unknown route.)
document.getElementById('skip-link')?.addEventListener('click', () => {
  app.querySelector('h1[tabindex="-1"]')?.focus({ preventScroll: true });
  app.querySelector('h1[tabindex="-1"]')?.scrollIntoView();
});
// Offline support for the installed app. Relative path on purpose: the
// site ships under /augury/ on GitHub Pages, so the worker scope is
// this directory, never the domain root. Bump APP_VERSION in sw.js
// whenever any precached file changes.
if ('serviceWorker' in navigator) {
  addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline is an enhancement */ });
  });
}
dispatch();

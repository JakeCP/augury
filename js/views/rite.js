// Rite views: home, question, tradition, templum, watch, verdict, record, shared record.
import { BIRDS, BIRD_IDS, interpret, VERDICTS, RULE_EVIDENCE, RULE_NAMES } from '../rules.js';
import { norm, relBearing, frontForOrientation } from '../compass.js';
import { encodeRecord, decodeRecord } from '../share.js';
import { domeSVG } from './dome.js';
import { esc, fracText, compassPoint, formatElapsed, canDecline, describeRegion } from './helpers.js';
import { signSheetHTML, readSignSheet, BIRD_ID_LINES } from './signsheet.js';

export const LITUUS = `<svg class="lituus" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 58 L32 22 Q32 8 44 8 Q54 8 54 17 Q54 25 46 25" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>`;

// A quiet horizon: the dome over the augur's ground, front line drawn by the lituus.
export const HORIZON = `<svg class="horizon" viewBox="0 0 320 190" role="img" aria-label="The marked templum: a dome of sky over a horizon, its left half washed, birds within.">
  <path d="M160 158 L160 54 A104 104 0 0 0 56 158 Z" class="hz-wash"/>
  <path d="M56 158 A104 104 0 0 1 264 158" class="hz-line"/>
  <path d="M14 158 L306 158" class="hz-line"/>
  <path d="M160 158 L160 82 M160 54 L160 62" class="hz-front"/>
  <path d="M84 92 Q92 84 96 90 Q101 84 108 92" class="hz-bird"/>
  <path d="M202 80 Q210 72 214 78 Q219 72 226 80" class="hz-bird"/>
  <path d="M176 108 Q182 102 185 107 Q189 102 194 108" class="hz-bird"/>
  <path d="M160 158 L160 130 Q160 119 169 119 Q176 119 176 125 Q176 130 171 130" fill="none" class="hz-front"/>
  <text x="160" y="74" class="hz-lab" text-anchor="middle" textLength="38" lengthAdjust="spacingAndGlyphs">ANTICA</text>
  <text x="108" y="148" class="hz-lab" text-anchor="middle" textLength="46" lengthAdjust="spacingAndGlyphs">SINISTRA</text>
  <text x="212" y="148" class="hz-lab" text-anchor="middle" textLength="38" lengthAdjust="spacingAndGlyphs">DEXTRA</text></svg>`;

export function homeHTML(resume) {
  return `<section class="view home"><div class="home-hero"><div>
  <div class="home-mark">${LITUUS}</div>
  <h1 class="wordmark" tabindex="-1">AVGVRY</h1>
  <p class="lede">Take the auspices in the Roman manner: mark a quarter of sky, keep silence, watch the birds, and read what they allow.</p>
  ${resume ? `<div class="card resume-card"><p>A watch is in progress.</p><div class="row"><button class="btn primary" data-act="resume">Resume the watch</button><button class="btn" data-act="discard">Discard it</button></div></div>` : ''}
  <a class="btn primary big" href="#/rite/question">Begin the auspices</a></div>
  <figure class="home-figure">${HORIZON}<figcaption>The templum — a quarter of sky, marked out and watched.</figcaption></figure></div>
  <nav class="home-links" aria-label="Companion rites and texts">
    <a href="#/tripudium"><span class="hl-name">Tripudium</span> <span class="hl-gloss">the sacred chickens</span></a>
    <a href="#/sortes"><span class="hl-name">Sortes</span> <span class="hl-gloss">the lots of Astrampsychus</span></a>
    <a href="#/texts"><span class="hl-name">Texts</span> <span class="hl-gloss">the ancient passages</span></a>
    <a href="#/about"><span class="hl-name">About</span> <span class="hl-gloss">what this is, and what we guessed</span></a>
  </nav><p class="fine">For reflection and delight, not advice.</p></section>`;
}
export function questionHTML(q = '') {
  return `<section class="view"><p class="step">The rite · 1 of 3</p><h1 tabindex="-1">What do you put before the birds?</h1>
  <p class="lede">Name it plainly, if you wish. You may also watch without a question.</p>
  <label class="field"><span>Your question (optional)</span><textarea id="q-text" rows="3" placeholder="Shall I…?">${esc(q)}</textarea></label>
  <p class="note">Stays on this device, cleared when the tab closes. It never enters a link or the record.</p>
  <div class="row"><button class="btn primary" data-act="next">Continue</button></div></section>`;
}
export function traditionHTML(sel = {}) {
  const t = sel.tradition ?? 'roman';
  return `<section class="view"><p class="step">The rite · 2 of 3</p><h1 tabindex="-1">After whose manner?</h1>
  <div class="choices" role="radiogroup" aria-label="Tradition">
   <label class="choice"><input type="radio" name="tradition" value="roman" ${t === 'roman' ? 'checked' : ''}><span><strong>Roman</strong> — signs on the <strong>left</strong> are favourable. <em lang="la">“Ita nobis sinistra videntur… meliora.”</em></span></label>
   <label class="choice"><input type="radio" name="tradition" value="greek" ${t === 'greek' ? 'checked' : ''}><span><strong>Greek</strong> — signs on the <strong>right</strong> are favourable, towards the dawn.</span></label>
  </div>
  <fieldset class="card"><legend>Orientation — which way you face</legend>
   <label class="choice"><input type="radio" name="orientation" value="varro" checked><span><strong>Varro</strong> — face <strong>south</strong> (default). East on your left.</span></label>
   <label class="choice"><input type="radio" name="orientation" value="livy"><span><strong>Livy</strong> — face <strong>east</strong>. <span class="tag">Reconstruction (disputed)</span></span></label>
   <label class="choice"><input type="radio" name="orientation" value="greek"><span><strong>Greek</strong> — face <strong>north</strong>. <span class="tag">Reconstruction</span></span></label>
   <label class="choice"><input type="radio" name="orientation" value="own"><span><strong>Own bearing</strong> — fix the front on a landmark. <span class="tag">Reconstruction</span></span></label>
  </fieldset>
  <div class="row"><a class="btn" href="#/rite/question">Back</a><button class="btn primary" data-act="next">Mark the templum</button></div></section>`;
}
export function templumHTML(w) {
  const front = w.frontDeg;
  const asked = new Set(w.askedFor);
  const birdBoxes = BIRD_IDS.filter((id) => BIRDS[id].augural).map((id) => `<label class="chip"><input type="checkbox" name="asked" value="${id}" ${asked.has(id) ? 'checked' : ''}><span>${esc(BIRDS[id].ui)}</span></label>`).join('');
  return `<section class="view templum"><p class="step">The rite · 3 of 3</p><h1 tabindex="-1">Mark the templum</h1>
  <p class="lede">Turn to face <strong>${compassPoint(front)} (${Math.round(front)}°, magnetic)</strong>. The dome turns with the phone; the washed half is the favourable half — the letters say the same, for eyes in glare.</p>
  <div class="spread"><div>
  <div id="dome-wrap">${domeSVG({ frontDeg: front, tradition: w.tradition, halfWidth: w.templumHalfWidthDeg })}</div>
  <p class="bearing-line"><span id="bearing-text">Bearing —</span> <button type="button" class="btn small" id="announce">Announce bearing</button></p>
  <p id="cal-hint" class="note" hidden>Move the phone in a slow figure of eight, away from metal.</p>
  <div class="row"><button class="btn primary" id="allow-compass">Allow the compass</button><button class="btn" id="use-here" hidden>Fix front where I face now</button></div>
  <div class="manual card"><h2>Set by hand</h2><p class="note">For desktops and denied sensors: drag, step, or type. Bearings are magnetic.</p>
   <div class="row"><button class="btn small" data-step="-15">−15°</button><button class="btn small" data-step="-1">−1°</button><input id="manual-bearing" type="number" min="0" max="359" value="${Math.round(front)}" aria-label="Front bearing in degrees"><button class="btn small" data-step="1">+1°</button><button class="btn small" data-step="15">+15°</button></div>
  </div></div><div>
  <details class="card"><summary>Narrow the templum &amp; declination</summary>
   <label class="field"><span>Half-width (degrees either side of front; 180 = whole circle)</span><input id="half-width" type="number" min="10" max="180" value="${w.templumHalfWidthDeg}"></label>
   <label class="field"><span>Manual declination offset (°, east positive)</span><input id="declination" type="number" step="0.1" value="${w.declinationDeg ?? 0}"></label>
   <p class="note">Bounds are declared now, before the watch — never per sign.</p></details>
  <fieldset class="card"><legend>Signs asked for <span lang="la">(impetrativa)</span></legend><p class="note">Others that come are <em lang="la">oblativa</em> and may be declined — unless dire. Ask for none, and every sign will be oblative.</p><div class="row"><button type="button" class="btn small" data-asked="all">All</button><button type="button" class="btn small" data-asked="none">None</button></div><div class="asked-grid">${birdBoxes}</div></fieldset>
  <label class="field"><span>Suggested watch length</span><select id="watch-len"><option value="10">10 minutes</option><option value="20" selected>20 minutes</option><option value="30">30 minutes</option></select></label>
  <p class="conceptio" lang="la">Templa tescaque me ita sunto…</p><p class="note">The words of the <em lang="la">conceptio</em>, adapted from Varro.</p>
  <label class="check"><input type="checkbox" id="daylight" ${w.isDaylight ? 'checked' : ''}><span>It is daylight</span></label>
  <div class="row"><a class="btn" href="#/rite/tradition">Back</a><button class="btn primary big" data-act="begin-watch">Begin the watch — <em lang="la">silentium</em></button></div>
  </div></div></section>`;
}
export function watchHTML(w, elapsedSec = 0) {
  const obs = observationFromWatch(w);
  let interim = '';
  try { const v = interpret(obs); interim = `${v.signs.filter((s) => s.classification === 'weighed').length} weighed · F ${fracText(v.favourable)} / U ${fracText(v.unfavourable)}`; } catch { interim = ''; }
  const rows = w.signs.map((s, i) => `<li class="sign-row"><span><strong>${esc(BIRDS[s.bird]?.ui ?? s.bird)}</strong> · ${esc(s.kinds.join(' + '))} · ${esc(describeRegion(s.relDeg))}${s.stub ? ' · <em>details needed</em>' : ''}</span><span class="row"><button class="btn small" data-edit="${i}">Edit</button><button class="btn small" data-del="${i}">Delete</button></span></li>`).join('');
  return `<section class="view watch"><h1 tabindex="-1" lang="la">Silentium</h1>
  <p class="watch-clock"><span id="elapsed">${formatElapsed(elapsedSec)}</span> elapsed <span class="note">of about ${w.suggestedMin ?? 20} — the watch ends only when you end it</span></p>
  <svg class="timer-arc" viewBox="0 0 100 6" aria-hidden="true"><rect width="100" height="6" class="arc-bg"/><rect id="arc" width="${Math.min(100, elapsedSec / ((w.suggestedMin ?? 20) * 60) * 100)}" height="6" class="arc-fg"/></svg>
  <div class="spread"><div><div id="dome-wrap">${domeSVG({ frontDeg: w.frontDeg, tradition: w.tradition, signs: w.signs, halfWidth: w.templumHalfWidthDeg })}</div>
  <p class="bearing-line"><span id="bearing-text">Bearing —</span> <button type="button" class="btn small" id="announce">Announce bearing</button></p>
  <p id="cal-hint" class="note" hidden>Move the phone in a slow figure of eight, away from metal.</p></div>
  <div><button class="btn there" id="there">There!</button>
  <p class="note">Point the phone at the bird and tap. Bearing, height and time are captured at once — even mid-sheet, as a stub for later.</p>
  <p class="note" lang="la">Qui auspicio adest, si quid falsi nuntiat, in semet ipsum religionem recipit.</p>
  <p class="note">A false report falls on the one who makes it. (Livy)</p>
  <h2>Signs <span class="note">${esc(interim)}</span></h2>
  ${w.signs.length ? `<ul class="sign-list">${rows}</ul>` : '<p class="note">No signs yet. Keep watching.</p>'}
  <div id="undo-bar" hidden><span>Sign deleted.</span> <button class="btn small" id="undo">Undo</button></div>
  <label class="check card"><input type="checkbox" id="vitium" ${w.vitium ? 'checked' : ''}><span>The watch was disturbed — a fault occurred <span lang="la">(vitium)</span></span></label>
  <div class="row"><button class="btn primary big" data-act="end">End the watch</button></div>
  </div></div><div id="sheet-slot"></div></section>`;
}
export function observationFromWatch(w) {
  return {
    tradition: w.tradition, orientation: w.orientation, frontDeg: w.frontDeg,
    templumHalfWidthDeg: w.templumHalfWidthDeg, declinationDeg: w.declinationDeg ?? 0,
    askedFor: w.askedFor, vitium: !!w.vitium, isDaylight: w.isDaylight !== false,
    attemptsToday: w.attemptsToday ?? 1,
    signs: (w.signs ?? []).filter((s) => !s.stub).map(({ stub, ...s }) => s),
    startedAtEpochMin: Math.floor((w.startedAt ?? Date.now()) / 60000),
  };
}
const GLOSS = {
  'romulus-remus': 'The first sign and the greater weight point different ways — as with Romulus and Remus, who had no rule for it either.',
  'auspicia-coacta': 'From the second attempt in a day, Cicero’s caution applies: auspices pressed too often become “forced” auspices.',
  'owl-unsure': 'An unsure owl was weighed as a little owl, never as dire.',
  'wrong-mode': 'A bird heard or seen outside its own mode was weighed at half strength.',
};
const NOTE_TEXT = {
  'extra-templum': 'outside the templum — not weighed',
  'declined': 'declined (non observavi) — not weighed',
  'decline-dire-disregarded': 'a dire sign cannot be declined',
  'decline-impetrative-disregarded': 'asked for beforehand, so it cannot be declined',
  'food-not-fallen': 'fed neatly, nothing fell — no sign',
  'ostentum': 'recorded and honoured, not weighed',
  'no-bearing': 'no bearing — not weighed',
  'on-line': 'on the line, neither left nor right — not weighed',
  'wrong-mode-half': 'outside its own mode — half strength',
};
export function ruleName(ruleId) {
  if (RULE_NAMES[ruleId]) return RULE_NAMES[ruleId];
  const bird = BIRD_IDS.map((id) => BIRDS[id]).find((b) => b.ruleId === ruleId);
  if (bird) return bird.latin ? `${bird.ui} (${bird.latin}) — its place and weight among the augural birds` : `${bird.ui} — recorded, not weighed`;
  return ruleId;
}
export function ruleHref(ruleId, passages) {
  const p = (passages ?? []).find((x) => (x.rules ?? []).includes(ruleId));
  return p ? `#/texts/${encodeURIComponent(p.id)}` : '#/texts';
}
function ruleLine(ruleId, passages) {
  const tiers = (RULE_EVIDENCE[ruleId] ?? []).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  return `<li><a class="rule-name" href="${esc(ruleHref(ruleId, passages))}">${esc(ruleName(ruleId))}</a><span class="rule-meta"><span class="rule-id">${esc(ruleId)}</span>${tiers}</span></li>`;
}
function signLine(s, passages) {
  const bird = BIRDS[s.bird]?.ui ?? s.bird;
  const where = s.quarter ? `${s.quarter}${s.side && s.side !== 'line' ? `, ${s.side}` : ', on the line'}` : 'no bearing';
  const notes = (s.notes ?? []).map((n) => NOTE_TEXT[n] ?? n).join('; ');
  let outcome;
  if (s.classification === 'weighed') outcome = `<strong>${s.favourable ? 'Favourable' : 'Unfavourable'} ${fracText(s.strength)}</strong>`;
  else if (s.classification === 'dira') outcome = '<strong>Dire — forbids outright</strong>';
  else outcome = 'Not weighed';
  const detail = [where, (s.kinds ?? []).join(' + '), s.count > 1 ? `${s.count} counted` : '', s.remora ? 'turning back (remora)' : '', notes].filter(Boolean).join(' · ');
  const rules = (s.ruleIds ?? []).map((r) => `<a href="${esc(ruleHref(r, passages))}">${esc(ruleName(r))}</a> <span class="rule-id">${esc(r)}</span>`).join('; ');
  return `<li><strong>${esc(bird)}</strong> — ${outcome}<br><span class="note">${esc(detail)}</span>${rules ? `<br><span class="note">${rules}</span>` : ''}</li>`;
}
export function verdictHTML(w, result, passages = null) {
  const deciding = [...new Set(result.decidedBy ?? [])];
  const weighedBy = [...new Set(result.signs.flatMap((s) => s.ruleIds))].filter((r) => !deciding.includes(r));
  const glosses = (result.glosses ?? []).map((g) => `<p class="note">${esc(GLOSS[g] ?? g)}</p>`).join('');
  const hasMarks = result.signs.some((s) => s.relDeg !== null && s.relDeg !== undefined);
  return `<section class="view verdict-view"><div class="verdict-head"><p class="step">The verdict</p>
  <h1 tabindex="-1" class="verdict-latin" aria-live="polite" lang="la">${esc(result.latin)}</h1>
  <p class="lede" aria-live="polite">${esc(result.english)}</p>
  ${result.wouldBeVerdict ? `<p class="note">The watch was vitiated by a fault. Without the fault it would have been: <strong lang="la">${esc(VERDICTS[result.wouldBeVerdict].latin)}</strong>.</p>` : ''}
  <p>Favourable strength <strong>${fracText(result.favourable)}</strong> · unfavourable <strong>${fracText(result.unfavourable)}</strong>. <span class="note">The numbers are ours — a reconstruction, shown rather than hidden.</span></p></div>
  <div class="verdict-layout"><div>${glosses}
  <h2>Decided by</h2><ul class="rule-list">${deciding.map((r) => ruleLine(r, passages)).join('')}</ul>
  <h2>Each sign, weighed</h2>
  ${result.signs.length ? `<ul class="sign-breakdown">${result.signs.map((s) => signLine(s, passages)).join('')}</ul>` : '<p class="note">No signs were seen.</p>'}
  <p class="note">Totals: favourable <strong>${fracText(result.favourable)}</strong> against unfavourable <strong>${fracText(result.unfavourable)}</strong>.</p>
  ${weighedBy.length ? `<h2>How the signs were weighed</h2><ul class="rule-list">${weighedBy.map((r) => ruleLine(r, passages)).join('')}</ul>` : ''}
  <div class="row"><button class="btn" data-act="again">Take the auspices again</button><a class="btn primary" href="#/record">The record</a></div>
  <p class="note">Retaking is allowed; every attempt stays counted.</p></div>
  <figure class="verdict-dome">${domeSVG({ frontDeg: w.frontDeg, tradition: w.tradition, signs: result.signs, halfWidth: w.templumHalfWidthDeg ?? 180, small: true })}
  <figcaption>${hasMarks ? 'Where each sign was seen. Front at the top; the washed half is the favourable half.' : 'No sign had a bearing to plot. Front at the top; the washed half is the favourable half.'}</figcaption>
  <ul class="dome-legend"><li><span class="legend-dot legend-fav"></span>Favourable</li><li><span class="legend-dot legend-unfav"></span>Unfavourable</li><li><span class="legend-dot legend-noted"></span>Not weighed (dire signs are ringed in red)</li></ul></figure></div></section>`;
}
export function recordHTML(obs, result, { shared = false, recordedVerdict = null } = {}) {
  const when = obs.startedAtEpochMin ? new Date(obs.startedAtEpochMin * 60000).toLocaleString() : '';
  const shown = recordedVerdict ?? result?.verdict;
  const differs = recordedVerdict && result && recordedVerdict !== result.verdict;
  const rows = (result?.signs ?? obs.signs ?? []).map((s) => `<tr><td>${esc(String(s.dtSec ?? 0))}s</td><td>${esc(BIRDS[s.bird]?.ui ?? s.bird)}</td><td>${esc((s.kinds ?? []).join('+'))}</td><td>${esc(s.quarter ?? '—')}</td><td>${esc(s.side ?? '—')}</td><td>${esc(s.height ?? 'na')}</td><td>${s.count ?? 1}</td><td>${s.declined ? 'declined' : 'accepted'}</td><td>${s.strength ? fracText(s.strength) : '—'}</td><td>${esc(s.classification ?? '')}</td></tr>`).join('');
  // NOTE: never render any session question here (shared or own record shows facts only).
  return `<section class="view"><h1 tabindex="-1">${shared ? 'A shared record' : 'The record'}</h1>
  <p class="verdict-latin small" lang="la">${esc(VERDICTS[shown]?.latin ?? shown ?? '')}</p><p class="lede">${esc(VERDICTS[shown]?.english ?? '')}</p>
  ${differs ? `<p class="note">Re-interpreted under the current rules this reads ${esc(VERDICTS[result.verdict].latin)}; the verdict printed on the link — shown above — is the record.</p>` : ''}
  <dl class="meta"><div><dt>Time</dt><dd>${esc(when)}</dd></div><div><dt>Tradition</dt><dd>${esc(obs.tradition)} · ${esc(obs.orientation)}</dd></div>
  <div><dt>Front (magnetic)</dt><dd>${Math.round(obs.frontDeg)}° ${compassPoint(obs.frontDeg)} · declination ${obs.declinationDeg ?? 0}°</dd></div>
  <div><dt>Templum half-width</dt><dd>${obs.templumHalfWidthDeg}°</dd></div>
  <div><dt>Totals</dt><dd>F ${result ? fracText(result.favourable) : '—'} / U ${result ? fracText(result.unfavourable) : '—'}</dd></div></dl>
  <details open><summary>Signs (${(result?.signs ?? obs.signs ?? []).length})</summary>
  <div class="table-scroll"><table><thead><tr><th>At</th><th>Bird</th><th>Kinds</th><th>Quarter</th><th>Side</th><th>Height</th><th>No.</th><th>Status</th><th>Strength</th><th>Class</th></tr></thead><tbody>${rows || '<tr><td colspan="10">No signs.</td></tr>'}</tbody></table></div></details>
  ${shared ? '' : `<div class="card"><h2>Share</h2><p class="note">The link encodes the time, bearings and signs below — never your question. Preview it before copying.</p><div id="share-preview"></div><div class="row"><button class="btn" data-act="preview-share">Preview what the link encodes</button><button class="btn primary" data-act="copy-share">Copy share link</button></div><div id="share-fallback"></div></div>`}
  <div class="row"><a class="btn" href="#/">Home</a></div></section>`;
}
export function sharePreviewText(obs) {
  return `Tradition ${obs.tradition}, orientation ${obs.orientation}, front ${Math.round(obs.frontDeg)}°, half-width ${obs.templumHalfWidthDeg}°, ${obs.signs.length} sign(s): ${obs.signs.map((s) => BIRDS[s.bird]?.ui ?? s.bird).join(', ') || 'none'}. No question is included.`;
}
export { signSheetHTML, readSignSheet, BIRD_ID_LINES };

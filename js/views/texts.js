import { esc, tierLabel, tierTitle, TIER_LABELS, TIER_TITLES } from './helpers.js';
export function textsHTML(passages) {
  if (!passages?.length) return `<section class="view"><h1 tabindex="-1">Texts</h1><p class="lede">The ancient passages behind every rule — Latin and Greek facing English, each with its speaker, date, evidence tier and licence.</p><p class="card">Text in preparation. Passages are being transcribed from pinned page scans; rules in a verdict will open them here.</p><a class="btn" href="#/">Home</a></section>`;
  const items = passages.map((p) => `<li><a class="q-item" href="#/texts/${encodeURIComponent(p.id)}"><span>${esc(p.citation || p.id)}<small>${esc(p.speaker ?? '')} · ${esc(p.date ?? '')} · ${esc(tierLabel(p.tier ?? ''))}</small></span></a></li>`).join('');
  return `<section class="view"><h1 tabindex="-1">Texts</h1><p class="lede">Every rule is cited. “Attested” always says what kind of witness attests it.</p><ol class="q-list">${items}</ol></section>`;
}
export function textHTML(p) {
  if (!p) return `<section class="view"><h1 tabindex="-1">Text in preparation</h1><p class="card">This passage has not arrived yet.</p><a class="btn" href="#/texts">All texts</a></section>`;
  const orig = p.original ?? {};
  const trans = (p.translations ?? []).map((t) => `<div class="facing"><h3>${esc(t.label ?? 'English')}</h3><p>${t.text ? esc(t.text) : '<em>Text in preparation.</em>'}</p><p class="licence">${esc(t.licence ?? '')}</p></div>`).join('');
  return `<section class="view"><p class="step">${esc(p.citation ?? '')}</p><h1 tabindex="-1">${esc(p.citation ?? p.id)}</h1>
  <p class="note">${esc(p.speaker ?? '')} · ${esc(p.date ?? '')} · <span class="tag" title="${esc(tierTitle(p.tier ?? ''))}">${esc(tierLabel(p.tier ?? ''))}</span> · rules: ${esc((p.rules ?? []).join(', '))}</p>
  <div class="spread"><div class="facing"><h3>${orig.lang === 'grc' ? 'Greek' : 'Latin'}</h3>
  <p lang="${esc(orig.lang ?? 'la')}" class="original">${orig.text ? esc(orig.text) : '<em>Text in preparation.</em>'}</p><p class="licence">${esc(orig.licence ?? '')}</p></div>
  <div>${trans || '<p class="card">Translation in preparation.</p>'}</div></div>
  <a class="btn" href="#/texts">All texts</a></section>`;
}
const TIER_ORDER = ['technical', 'quintus', 'marcus', 'draft-law', 'legend', 'history', 'comedy', 'natural-history', 'poetry', 'reconstruction'];
export function aboutHTML() {
  const tierKey = TIER_ORDER.map((slug) => `<li><span class="tag" title="${esc(TIER_TITLES[slug])}">${esc(TIER_LABELS[slug])}</span> — ${esc(TIER_TITLES[slug])}</li>`).join('');
  return `<section class="view prose"><h1 tabindex="-1">About</h1>
  <p class="lede">What augury was, how this site rebuilds it, and where it guesses.</p>
  <h2>The rite</h2><p>At Rome the magistrate <em>took</em> the auspices and the augur advised; here you are cast as the <em lang="la">auspex</em> as much as the augur. Roman <em lang="la">auspicia</em> had five kinds — from the sky, from birds, from feeding chickens, from quadrupeds, from dire signs. This instrument takes birds and the tripudium only. Thunder heard mid-watch may be logged and honoured, but it is not weighed.</p>
  <h2>What is attested, what is guessed</h2><p>Every rule names its evidence tier — antiquarian gloss, Quintus arguing <em>for</em> divination, Marcus demolishing it, draft law, legend, comedy, our reconstruction. The weights, factors and thresholds are ours; the record shows each sign’s strength and the totals rather than hiding them. The verdict wording itself — <em lang="la">AVES ADMITTVNT</em> — is our formulation in inscriptional dress.</p>
  <h3>How to read the evidence labels</h3><p>“Attested” is never used bare: each chip says what kind of witness speaks. The same labels appear on the verdict and Texts pages; hold a pointer over one, or read the key here.</p><ul class="tier-key">${tierKey}</ul>
  <h2>Directions</h2><p>Bearings shown are <strong>magnetic</strong>. The Romans worked by the sun; we work by the magnet, and say so. A manual declination offset may be entered at the templum.</p>
  <h2>The Sortes</h2><p>Hercher’s 1863 edition of the Byzantine recension — an eclectic reconstruction, lightly Christianised, translated as printed. The tripudium chances (hungry flocks eat) are our reconstruction, printed on that screen.</p>
  <h2>Privacy</h2><p>No ads, trackers, analytics or accounts. Your question stays in this tab and never enters a link. Sensor data never leaves the device except inside a link you choose to copy.</p>
  <h2>Sources &amp; licences</h2><p>Code: MIT. Our prose and translations: CC BY 4.0. Public-domain texts are marked per field. See the Texts pages for each passage’s licence.</p>
  <p class="closing">For reflection and delight, not advice.</p></section>`;
}
export function notFoundHTML() {
  return `<section class="view"><h1 tabindex="-1" lang="la">Hic nihil est</h1><p class="lede">There is nothing here.</p><a class="btn primary" href="#/">Go home</a></section>`;
}
export function damagedHTML(msg) {
  return `<section class="view"><h1 tabindex="-1">This record is damaged</h1><p class="lede">The link could not be read${msg ? `: ${esc(msg)}` : ''}. It may have been copied incompletely.</p><a class="btn primary" href="#/">Go home</a></section>`;
}

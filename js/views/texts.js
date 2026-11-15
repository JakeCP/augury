import { esc, parasHTML, tierLabel, tierTitle, TIER_LABELS, TIER_TITLES } from './helpers.js';

// Authors in chronological order (by floruit): the index reads as a
// short history of the evidence, Homer first and Servius last.
const AUTHOR_ORDER = [
  'Homer', 'Plautus', 'Ennius', 'Varro', 'Cicero', 'Livy',
  'Valerius Maximus', 'Pliny', 'Suetonius', 'Festus', 'Gellius', 'Servius',
];
export function passageAuthor(p) {
  const citation = String(p?.citation ?? p?.id ?? '');
  const head = citation.split(',')[0].trim();
  if (/^(Festus|Paulus)(\s*\/\s*(Festus|Paulus))?$/.test(head)) return 'Festus';
  if (/^Servius\b/.test(head)) return 'Servius';
  if (/^Pliny\b/.test(head)) return 'Pliny';
  if (head && !/\d/.test(head)) return head;
  // Citation does not open with an author (fixtures): fall back to speaker.
  return String(p?.speaker ?? 'Unknown').split(',')[0].trim() || 'Unknown';
}
export function passageWork(p) {
  const citation = String(p?.citation ?? p?.id ?? '');
  const author = passageAuthor(p);
  if (author === 'Servius') return 'Commentary on Vergil’s Aeneid';
  const rest = citation.includes(',') ? citation.slice(citation.indexOf(',') + 1).trim() : citation;
  if (/^Annales\b/.test(rest)) return 'Annales';
  return rest
    .replace(/\s+s\.vv?\.\s+.*$/, '') // Festus lemmata follow the work title
    .replace(/\s+\d[\d.;–\- ]*$/, '') // trailing book/chapter/line locator
    .trim() || rest;
}
function citationKey(p) {
  return (String(p?.citation ?? '').match(/\d+/g) ?? []).map(Number);
}
function comparePassages(a, b) {
  const ka = citationKey(a);
  const kb = citationKey(b);
  for (let i = 0; i < Math.min(ka.length, kb.length); i += 1) {
    if (ka[i] !== kb[i]) return ka[i] - kb[i];
  }
  if (ka.length !== kb.length) return ka.length - kb.length;
  // No locator numbers (e.g. Festus lemmata): order by what follows the
  // author head, so dictionary entries read alphabetically by lemma.
  const rest = (p) => {
    const c = String(p.citation ?? p.id);
    return c.includes(',') ? c.slice(c.indexOf(',') + 1) : c;
  };
  return rest(a).localeCompare(rest(b));
}
/** Group passages by author, then work; passages in citation order. */
export function groupPassages(passages) {
  const byAuthor = new Map();
  for (const p of passages ?? []) {
    const author = passageAuthor(p);
    const work = passageWork(p);
    if (!byAuthor.has(author)) byAuthor.set(author, new Map());
    const byWork = byAuthor.get(author);
    if (!byWork.has(work)) byWork.set(work, []);
    byWork.get(work).push(p);
  }
  const rank = (author) => {
    const i = AUTHOR_ORDER.indexOf(author);
    return i === -1 ? AUTHOR_ORDER.length : i;
  };
  return [...byAuthor.entries()]
    .sort(([a], [b]) => (rank(a) - rank(b)) || a.localeCompare(b))
    .map(([author, byWork]) => ({
      author,
      works: [...byWork.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([work, ps]) => ({ work, passages: [...ps].sort(comparePassages) })),
    }));
}
export function textsHTML(passages) {
  if (!passages?.length) return `<section class="view"><h1 tabindex="-1">Texts</h1><p class="lede">The ancient passages behind every rule — Latin and Greek facing English, each with its speaker, date, evidence tier and licence.</p><p class="card">The passages could not be loaded. Rules in a verdict open them here when they are to hand.</p><a class="btn" href="#/">Home</a></section>`;
  const groups = groupPassages(passages).map((g) => {
    const works = g.works.map((w) => {
      const items = w.passages.map((p) => `<li><a class="q-item" href="#/texts/${encodeURIComponent(p.id)}"><span>${esc(p.citation || p.id)}<small>${esc(p.speaker ?? '')} · ${esc(p.date ?? '')} · ${esc(tierLabel(p.tier ?? ''))}</small></span></a></li>`).join('');
      return `<h3>${esc(w.work)}</h3><ol class="q-list">${items}</ol>`;
    }).join('');
    return `<section class="author-group"><h2>${esc(g.author)}</h2>${works}</section>`;
  }).join('');
  return `<section class="view texts-index"><h1 tabindex="-1">Texts</h1><p class="lede">Every rule is cited. “Attested” always says what kind of witness attests it.</p><p class="note">Grouped by author and work, authors in the order they wrote; passages within a work in citation order.</p>${groups}</section>`;
}
function sourceLine(p) {
  if (!p?.source) return '';
  const text = typeof p.source === 'string'
    ? p.source
    : [p.source.edition, p.source.page].filter(Boolean).join(' · ');
  return text ? `<p class="note source-line">${esc(text)}</p>` : '';
}
export function textHTML(p) {
  if (!p) return `<section class="view"><h1 tabindex="-1">No such passage</h1><p class="card">There is no passage at this address.</p><a class="btn" href="#/texts">All texts</a></section>`;
  const orig = p.original ?? {};
  const trans = (p.translations ?? []).map((t) => `<div class="facing"><h2>${esc(t.label ?? 'English')}</h2>${parasHTML(t.text)}<p class="licence">${esc(t.licence ?? '')}</p></div>`).join('');
  return `<section class="view text-page"><p class="step">${esc(p.citation ?? '')}</p><h1 tabindex="-1">${esc(p.citation ?? p.id)}</h1>
  <p class="note">${esc(p.speaker ?? '')} · ${esc(p.date ?? '')} · <span class="tag" title="${esc(tierTitle(p.tier ?? ''))}">${esc(tierLabel(p.tier ?? ''))}</span> · rules: ${esc((p.rules ?? []).join(', '))}</p>
  ${sourceLine(p)}
  <div class="spread"><div class="facing"><h2>${orig.lang === 'grc' ? 'Greek' : 'Latin'}</h2>
  ${parasHTML(orig.text, `lang="${esc(orig.lang ?? 'la')}" class="original"`)}<p class="licence">${esc(orig.licence ?? '')}</p></div>
  <div>${trans}</div></div>
  ${p.orthography ? `<details class="note orthography"><summary>How the text is printed</summary>${parasHTML(p.orthography)}</details>` : ''}
  <a class="btn" href="#/texts">All texts</a></section>`;
}
const TIER_ORDER = ['technical', 'quintus', 'marcus', 'balbus', 'draft-law', 'legend', 'history', 'comedy', 'natural-history', 'poetry', 'reconstruction'];
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

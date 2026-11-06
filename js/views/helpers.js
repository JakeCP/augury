// Pure view helpers (tested): escaping, dome geometry, sign inventory, formatting.
import { norm, sideOf, quarterOf } from '../compass.js';
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export function fracText(f) { if (!f) return '0'; return f.den === 1 ? String(f.num) : `${f.num}/${f.den}`; }
export function relToXY(relDeg, r = 0.78, cx = 100, cy = 100, R = 92) {
  const a = (norm(relDeg) - 90) * Math.PI / 180; // front (rel 0) at top
  return { x: cx + Math.cos(a) * R * r, y: cy + Math.sin(a) * R * r };
}
export function favourableHalf(tradition) { return tradition === 'greek' ? 'right' : 'left'; }
export function describeRegion(relDeg) {
  if (relDeg === null || relDeg === undefined) return 'no bearing';
  const side = sideOf(relDeg), q = quarterOf(relDeg);
  return `${q} (${side === 'line' ? 'on the line' : side})`;
}
export function compassPoint(deg) {
  const names = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return names[Math.round(norm(deg) / 45) % 8];
}
export function formatElapsed(sec) {
  const s = Math.max(0, Math.floor(sec)); const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}
// Evidence tiers (PLAN §3): the data carries slugs; people read labels.
// One place maps the two, so verdict chips, Texts and the About key agree.
const TIERS = Object.freeze({
  marcus: Object.freeze({ label: 'Cicero, in his own voice', title: 'Marcus in Cicero’s De Divinatione, book 2, dismantling divination — often our best evidence for what the practice was.' }),
  quintus: Object.freeze({ label: 'Quintus in Cicero’s dialogue', title: 'Quintus in Cicero’s De Divinatione, book 1, making the Stoic case for divination — a character’s argument, not Cicero’s own view.' }),
  'natural-history': Object.freeze({ label: 'Pliny', title: 'Pliny the Elder’s Natural History, reporting lore and belief.' }),
  comedy: Object.freeze({ label: 'comedy (Plautus)', title: 'A character in a comedy by Plautus, inventing convenient signs.' }),
  legend: Object.freeze({ label: 'legend', title: 'Foundation legend and early “history”, such as Livy’s first book.' }),
  history: Object.freeze({ label: 'history', title: 'Later historical narrative.' }),
  poetry: Object.freeze({ label: 'poetry', title: 'Epic and poetic usage — Homer, Ennius.' }),
  technical: Object.freeze({ label: 'technical', title: 'Antiquarian and technical gloss of augural practice — Festus, Varro, Servius.' }),
  'draft-law': Object.freeze({ label: 'Cicero’s draft laws', title: 'Cicero’s proposed law-code in De Legibus — his draft, not recorded augural law.' }),
  reconstruction: Object.freeze({ label: 'our reconstruction', title: 'Our decision where the sources are silent — every weight, factor and threshold.' }),
});
export const TIER_LABELS = Object.freeze(Object.fromEntries(Object.entries(TIERS).map(([k, v]) => [k, v.label])));
export const TIER_TITLES = Object.freeze(Object.fromEntries(Object.entries(TIERS).map(([k, v]) => [k, v.title])));
export function tierLabel(slug) {
  if (!slug) return '';
  return TIERS[slug]?.label ?? String(slug).replace(/-/g, ' ');
}
export function tierTitle(slug) {
  return TIERS[slug]?.title ?? '';
}
// Live watch tally: nothing to say until a sign has actually been weighed.
export function liveTallyText(result) {
  if (!result) return null;
  const weighed = (result.signs ?? []).filter((s) => s.classification === 'weighed').length;
  if (!weighed) return null;
  return `${weighed} weighed · F ${fracText(result.favourable)} / U ${fracText(result.unfavourable)}`;
}
// §5 sign-sheet inventory: every interpret() field settable here.
export const SIGN_FIELDS = ['bird', 'kinds', 'foodFell', 'chokedVoice', 'daylight', 'flight', 'height', 'count', 'declined', 'relDeg'];
export function isDireCandidate(sign) {
  if (sign.bird === 'bubo' && sign.daylight === true && (sign.kinds?.includes('voice') || sign.kinds?.includes('flight'))) return true;
  if (sign.bird === 'raven' && sign.chokedVoice && sign.kinds?.includes('voice')) return true;
  return false;
}
export function canDecline(sign, askedFor) {
  const asked = (askedFor ?? []).includes(sign.bird);
  return !asked && !isDireCandidate(sign);
}
// Shared-record safety: HTML for a shared record never includes session question.
export function sharedRecordContainsQuestion(html, question) {
  if (!question) return false; return html.includes(String(question));
}

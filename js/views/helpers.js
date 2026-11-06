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

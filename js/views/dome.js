// Sky-dome SVG (PLAN §8): halves washed + lettered, quarters labelled, signs as marks.
// Lettering sits well inside the rim (radius ~56-67 of 92) and carries an
// explicit textLength, so no label can reach the rim whatever font loads.
// The cross-lines stop short of the label blocks instead of striking
// through, and the lettering paints above the marks and needle.
import { esc, relToXY, favourableHalf } from './helpers.js';
import { norm } from '../compass.js';

function markClass(s) {
  if (s.classification === 'dira') return 'dome-mark-dira';
  if (s.classification === 'weighed') return s.favourable ? 'dome-mark-fav' : 'dome-mark-unfav';
  if (s.classification) return 'dome-mark-noted'; // noted / ignored / raw watch stub
  return 'dome-mark';
}

export function domeSVG({ frontDeg = 180, headingDeg = null, tradition = 'roman', signs = [], halfWidth = 180, small = false } = {}) {
  const favRight = favourableHalf(tradition) === 'right';
  // Wash the favourable half: front at top; right half = east of the diameter.
  const wash = favRight
    ? 'M100 8 A92 92 0 0 1 100 192 Z'
    : 'M100 8 A92 92 0 0 0 100 192 Z';
  let sector = '';
  if (halfWidth < 180) {
    const a1 = relToXY(360 - halfWidth, 1), a2 = relToXY(halfWidth, 1);
    sector = `<path d="M100 100 L${a1.x.toFixed(1)} ${a1.y.toFixed(1)} A92 92 0 0 1 ${a2.x.toFixed(1)} ${a2.y.toFixed(1)} Z" class="dome-sector"/>`;
  }
  // One mark per sign; coincident bearings step inward so dots stay countable.
  const seenAt = new Map();
  const marks = signs.filter((s) => s.relDeg !== null && s.relDeg !== undefined).map((s) => {
    const key = Math.round(s.relDeg);
    const n = seenAt.get(key) ?? 0; seenAt.set(key, n + 1);
    const p = relToXY(s.relDeg, Math.max(0.34, 0.78 - n * 0.14));
    const r = s.classification === 'weighed' || s.classification === 'dira' ? 4.4 : 3.4;
    const label = s.bird ? `Sign: ${s.bird}` : 'Sign';
    return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" class="${markClass(s)}"><title>${esc(label)}</title></circle>`;
  }).join('');
  const needleRot = headingDeg === null ? null : norm(headingDeg - frontDeg);
  const needle = needleRot === null ? '' : `<g transform="rotate(${needleRot.toFixed(1)} 100 100)"><line x1="100" y1="100" x2="100" y2="22" class="dome-needle"/><circle cx="100" cy="22" r="4" class="dome-mark"/></g>`;
  return `<svg class="dome${small ? ' small' : ''}" viewBox="-6 -6 212 212" role="img" aria-label="Sky dome. Front at top. ${favRight ? 'Right' : 'Left'} half favourable.">
  <circle cx="100" cy="100" r="92" class="dome-rim"/><path d="${wash}" class="dome-wash"/>${sector}
  <path d="M100 8 L100 23 M100 48 L100 153 M100 178 L100 192" class="dome-line"/>
  <path d="M8 100 L17 100 M71 100 L129 100 M177 100 L192 100" class="dome-cross"/>
  <path d="M100 48 L100 100 M100 10 L100 23" class="dome-front"/>
  ${marks}${needle}
  <text x="100" y="33" class="dome-lab" text-anchor="middle" textLength="34" lengthAdjust="spacingAndGlyphs">ANTICA</text><text x="100" y="43" class="dome-sub" text-anchor="middle">front</text>
  <text x="100" y="163" class="dome-lab" text-anchor="middle" textLength="38" lengthAdjust="spacingAndGlyphs">POSTICA</text><text x="100" y="173" class="dome-sub" text-anchor="middle">behind</text>
  <text x="44" y="97" class="dome-lab" text-anchor="middle" textLength="44" lengthAdjust="spacingAndGlyphs">SINISTRA</text><text x="44" y="107" class="dome-sub" text-anchor="middle">left</text>
  <text x="156" y="97" class="dome-lab" text-anchor="middle" textLength="36" lengthAdjust="spacingAndGlyphs">DEXTRA</text><text x="156" y="107" class="dome-sub" text-anchor="middle">right</text>
  <circle cx="100" cy="100" r="3.5" class="dome-centre"/></svg>`;
}

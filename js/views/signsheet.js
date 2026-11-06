// Sign sheet (PLAN §5): captures everything interpret() reads.
import { BIRDS, BIRD_IDS } from '../rules.js';
import { esc, canDecline } from './helpers.js';
export const BIRD_ID_LINES = {
  raven: ['Large, all black, heavy bill.', 'Deep croaking “prruk”.'],
  crow: ['Any crow, rook or jackdaw.', 'Harsh “caw”, often repeated.'],
  noctua: ['Little owl: small, stern-browed.', 'Sharp “kiew” at dusk.'],
  bubo: ['Eagle-owl: very large, ear tufts.', 'Deep booming “oo-hu”.'],
  owlUnsure: ['An owl, species unsure.', 'Weighed as little owl, never dire.'],
  eagle: ['Very large, broad fingered wings.', 'Jupiter’s bird; mostly silent.'],
  vulture: ['Huge, soaring, barely flapping.', 'Number matters — count them.'],
  buteo: ['Buzzard or hawk, broad wings.', 'Mewing “peee-oo” (buzzard).'],
  picus: ['Woodpecker on trunks and posts.', 'Laughing call or drumming.'],
  pulli: ['Chickens, young, either sex.', 'Feeding is their sign.'],
  other: ['Any other bird — or thunder.', 'Recorded and honoured, not weighed.'],
};
const SVG_FILE = { raven: 'raven', crow: 'crow', noctua: 'little-owl', bubo: 'eagle-owl', owlUnsure: 'little-owl', eagle: 'eagle', vulture: 'vulture', buteo: 'buzzard', picus: 'woodpecker', pulli: 'chickens', other: 'other' };
export function signSheetHTML(sign, askedFor) {
  const birds = BIRD_IDS.map((id) => `<label class="bird-pick"><input type="radio" name="bird" value="${id}" ${sign.bird === id ? 'checked' : ''}>
    <img src="img/birds/${SVG_FILE[id]}.svg" alt="" width="44" height="44"><span><strong>${esc(BIRDS[id].ui)}</strong><small lang="la">${esc(BIRDS[id].latin ?? '')}</small><small>${esc(BIRD_ID_LINES[id][0])} ${esc(BIRD_ID_LINES[id][1])}</small></span></label>`).join('');
  const kind = (v, label) => `<label class="check"><input type="checkbox" name="kinds" value="${v}" ${sign.kinds?.includes(v) ? 'checked' : ''}><span>${label}</span></label>`;
  const showDecline = canDecline(sign, askedFor);
  return `<div class="sheet-backdrop"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-h">
  <h2 id="sheet-h" tabindex="-1">What was it?</h2>
  <form id="sign-form">
  <fieldset><legend>Bird</legend><div class="bird-grid">${birds}</div></fieldset>
  <fieldset><legend>Kind of sign</legend>${kind('voice', 'Voice — heard it call')}${kind('flight', 'Flight — saw it fly')}${kind('feeding', 'Feeding')}${kind('ostentum', 'Ostentum — thunder and the like')}
  <p class="note">Voice and flight may go together. A crow is <em>meant</em> to be heard; seen silent, it counts at half strength.</p></fieldset>
  <div class="detail-q" data-q="food"><label class="check"><input type="checkbox" id="food-fell" ${sign.foodFell ? 'checked' : ''}><span>Did food fall to the ground?</span></label></div>
  <div class="detail-q" data-q="choked"><label class="check"><input type="checkbox" id="choked" ${sign.chokedVoice ? 'checked' : ''}><span>Was the voice choked, as if strangled?</span></label></div>
  <div class="detail-q" data-q="daylight"><label class="check"><input type="checkbox" id="sign-daylight" ${sign.daylight ? 'checked' : ''}><span>Seen in daylight?</span></label></div>
  <label class="field"><span>Direction of flight</span><select id="flight">
   <option value="onward" ${sign.flight === 'onward' ? 'selected' : ''}>Onward, ahead of me</option>
   <option value="across" ${sign.flight === 'across' ? 'selected' : ''}>Across</option>
   <option value="returning" ${sign.flight === 'returning' ? 'selected' : ''}>Turning back / towards me</option>
   <option value="circling" ${sign.flight === 'circling' ? 'selected' : ''}>Circling</option>
   <option value="settled" ${sign.flight === 'settled' ? 'selected' : ''}>Settled / perched</option>
   <option value="stoop" ${sign.flight === 'stoop' ? 'selected' : ''}>Stooped to me and rose again (eagle)</option>
   <option value="na" ${sign.flight === 'na' ? 'selected' : ''}>Not applicable</option></select></label>
  <label class="field"><span>Height</span><select id="height">
   ${['low', 'middle', 'high', 'na'].map((h) => `<option value="${h}" ${sign.height === h ? 'selected' : ''}>${h === 'na' ? 'n/a (heard / perched)' : h}</option>`).join('')}</select></label>
  <label class="field"><span>Position by eye (overrides the sensor)</span><select id="position">
   <option value="">As captured (${sign.relDeg === null || sign.relDeg === undefined ? 'no bearing' : Math.round(sign.relDeg) + '° relative'})</option>
   <option value="0">Straight ahead</option><option value="180">Straight behind</option><option value="none">Overhead / no direction</option>
   <option value="270">Left quarter (sinistra)</option><option value="90">Right quarter (dextra)</option></select></label>
  <div class="field"><span>Number (birds seen, or calls heard; 12 = twelve or more)</span>
   <div class="row"><button type="button" class="btn small" data-count="-1">−</button><output id="count-out">${sign.count ?? 1}</output><button type="button" class="btn small" data-count="1">+</button></div></div>
  ${showDecline ? `<fieldset><legend>An unasked sign <span lang="la">(oblativum)</span></legend>
   <label class="choice"><input type="radio" name="accept" value="accept" checked><span>Accept it</span></label>
   <label class="choice"><input type="radio" name="accept" value="decline"><span>Decline — “I did not ask for this” <span lang="la">(non observavi)</span></span></label></fieldset>` : ''}
  <div class="row"><button type="button" class="btn" data-sheet="cancel">Cancel</button><button type="submit" class="btn primary">Enter the sign</button></div>
  </form></div></div>`;
}
export function readSignSheet(root, base) {
  const q = (s) => root.querySelector(s);
  const kinds = [...root.querySelectorAll('input[name=kinds]:checked')].map((i) => i.value);
  const pos = q('#position')?.value ?? '';
  let relDeg = base.relDeg ?? null;
  if (pos === 'none') relDeg = null; else if (pos !== '') relDeg = Number(pos);
  return {
    ...base, stub: false,
    bird: q('input[name=bird]:checked')?.value ?? base.bird,
    kinds: kinds.length ? kinds : ['flight'],
    foodFell: q('#food-fell')?.checked === true,
    chokedVoice: q('#choked')?.checked === true,
    daylight: q('#sign-daylight') ? q('#sign-daylight').checked : base.daylight,
    flight: q('#flight')?.value ?? 'na', height: q('#height')?.value ?? 'na',
    relDeg,
    count: Number(q('#count-out')?.textContent ?? 1),
    declined: root.querySelector('input[name=accept]:checked')?.value === 'decline',
  };
}

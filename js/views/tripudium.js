import { esc } from './helpers.js';
import { RULE_NAMES } from '../rules.js';

function ruleTextLink(passages, ruleId, fallbackId, label) {
  const p = (passages ?? []).find((x) => (x.rules ?? []).includes(ruleId));
  const id = p?.id ?? fallbackId;
  return `<a class="rule-name" href="#/texts/${encodeURIComponent(id)}">${esc(label)}</a><span class="rule-meta"><span class="rule-id">${esc(ruleId)}</span></span>`;
}
export function tripudiumHTML(attempts, passages = null) {
  return `<section class="view"><h1 tabindex="-1">The tripudium</h1>
  <p class="lede">The sacred chickens. Scatter the cake; if food falls from their beaks and strikes the ground, it is a <em lang="la">tripudium solistimum</em> — the fullest favourable sign.</p>
  <div class="chicken-stage" id="stage" aria-hidden="true">
    <img src="img/tripudium-vignette.svg" alt="" class="stage-art">
    <img src="img/tripudium-chicken.svg" alt="" class="chick c1"><img src="img/tripudium-chicken.svg" alt="" class="chick c2"><img src="img/tripudium-chicken.svg" alt="" class="chick c3">
    <span class="crumb"></span><span class="crumb two"></span>
  </div>
  <fieldset class="card"><legend>How were the chickens kept?</legend>
   <label class="choice"><input type="radio" name="hunger" value="fed"><span>Fed this morning</span></label>
   <label class="choice"><input type="radio" name="hunger" value="hungry" checked><span>Kept hungry — as was customary</span></label>
   <label class="choice"><input type="radio" name="hunger" value="starved"><span>Starved — Cicero disapproves</span></label>
   <p class="note">Chances of the full tripudium: fed 40%, hungry 70%, starved 92%. Our numbers, shown openly.</p></fieldset>
  <p class="note">Attempts today: ${attempts}. Every attempt is counted; there are no hidden retries.</p>
  <div class="row"><button class="btn primary big" id="scatter">Scatter the grain</button></div>
  <div id="trip-result"></div>
  <div class="card"><h2>The texts</h2><ul class="rule-list">
   <li>${ruleTextLink(passages, 'R-TRIP-ANY', 'cic-div-2-71-73', RULE_NAMES['R-TRIP-ANY'])}</li>
   <li>${ruleTextLink(passages, 'B-PULLI', 'pliny-nh-10-49', 'Chickens (pullus) — its place and weight among the augural birds')}</li>
  </ul></div>
  <div class="card"><h2>Claudius Pulcher, 249 BC</h2><p>The chickens would not eat before the battle at Drepana, so Publius Claudius Pulcher had them thrown into the sea — <em lang="la">“ut biberent, quoniam ēsse nollent”</em>, so that they might drink, since they would not eat — and lost the fleet. Polybius, our main source for the battle, never mentions the chickens at all. The story is later Roman moralising, and a better tale for knowing it.</p>
  <p class="note">The tale as later told: <a href="#/texts/valmax-1-4-3">Valerius Maximus</a> · <a href="#/texts/livy-per-19">Livy, Periochae 19</a></p></div>
  </section>`;
}
export function tripResultHTML(r) {
  const desc = { solistimum: 'They rush out and eat so greedily that food falls and strikes the ground.', pascuntur: 'They eat, but neatly. Nothing falls — no sign.', non_pascuntur: 'They will not eat.', avolant: 'They flap, cry, and scatter.' }[r.outcome];
  return `<div class="card verdict-card"><p class="verdict-latin small" lang="la">${esc(r.latin)}</p><p class="lede">${esc(r.english)}</p>
  <p>${esc(desc)} <span class="note">(<span lang="la">${esc(r.outcome.replace('_', ' '))}</span> · attempt ${r.attempt} today)</span></p>
  ${r.coactum ? '<p class="note">A favourable result from hungry chickens: Cicero would call it a forced auspice — <em lang="la">auspicium coactum</em>.</p>' : ''}
  <div class="row"><button class="btn" id="again">Scatter again</button><a class="btn" href="#/">Home</a></div></div>`;
}

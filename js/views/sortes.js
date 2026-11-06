import { esc } from './helpers.js';
import { isPropitious, HOUR_QUESTION } from '../sortes.js';
export function sortesHomeHTML(now = new Date()) {
  const p = isPropitious(now);
  return `<section class="view"><h1 tabindex="-1">Sortes Astrampsychi</h1>
  <p class="lede">The oracle-book of numbered lots from Roman Egypt. Choose a question, speak a number from one to ten, and the sum leads — through a named prophet — to your answer.</p>
  <p class="card warn-line">For reflection and delight, not advice.</p>
  <div class="card"><h2>The hour and the moon</h2>
  <p>Day ${p.moonDay} of the (mean) moon.${p.moonAdvice ? ` Advice: ${esc(String(p.moonAdvice))}` : ''}</p>
  <p>${p.favourableWeekday ? `Today has a favourable hour — Byzantine hour ${p.byzantineHour}, about ${p.clockHour}:00 local (our approximation).${p.favourableNow ? ' <strong>It is that hour now.</strong>' : ''}` : 'Today carries no specially favourable hour in the book.'}</p>
  <p class="note">The book advises asking first whether it is the hour to put your question. It advises; it never refuses.</p>
  <div class="row"><button class="btn" data-hour="1">Ask the hour question first</button><a class="btn primary" href="#/sortes/questions">Choose a question</a></div></div>
  <p lang="la" class="note">“Quid enim sors est? Idem prope modum quod micare, quod talos iacere…”</p>
  <p class="note">“What is a lot, after all? Much the same as playing morra or throwing dice…” — Marcus, unimpressed, in Cicero.</p></section>`;
}
export function sortesQuestionsHTML(questions) {
  if (!questions) return `<section class="view"><h1 tabindex="-1">The questions</h1><p class="card">Text in preparation. The questions of the Sortes are being transcribed and translated; the mechanism here is ready for them.</p><a class="btn" href="#/sortes">Back</a></section>`;
  const themes = [...new Set(questions.flatMap((q) => q.themes ?? []))];
  const jumps = themes.map((t) => `<a href="#/sortes/questions" data-theme="${esc(t)}">${esc(t)}</a>`).join(' · ');
  const list = questions.map((q) => `<li data-qtext="${esc((q.en ?? '').toLowerCase())}" data-themes="${esc((q.themes ?? []).join(' '))}"><button class="q-item" data-q="${q.n}"><span class="q-n">${q.n}</span><span>${q.en ? esc(q.en) : '<em>Text in preparation.</em>'}${q.grc ? `<small lang="grc">${esc(q.grc)}</small>` : ''}</span></button></li>`).join('');
  return `<section class="view"><h1 tabindex="-1">Choose your question</h1>
  <p class="note">Headings are our editorial grouping. Some questions belong to a slave-owning world — recovering a fugitive, buying freedom. They are kept, and framed as history, not offered as neutral menu items.</p>
  <label class="field"><span>Search the questions</span><input id="q-search" type="search" placeholder="marry, travel, recover…"></label>
  <p class="note">Themes: ${jumps || '—'}</p><ol class="q-list">${list}</ol></section>`;
}
export function sortesLotHTML(q) {
  const tokens = Array.from({ length: 10 }, (_, i) => `<button class="token" data-k="${i + 1}" aria-label="Speak ${i + 1}">${i + 1}</button>`).join('');
  return `<section class="view"><h1 tabindex="-1">Speak a number</h1>
  <p class="lede">${q?.en ? esc(q.en) : 'Your question.'}</p>
  <p>Say whatever number from one to ten comes when you open your mouth — then tap it.</p>
  <div class="tokens">${tokens}</div>
  <div class="row"><button class="btn" id="chance">Let chance choose</button><span class="note">Our convenience, labelled as ours.</span></div></section>`;
}
export function sortesAnswerHTML(r) {
  if (!r) return `<section class="view"><h1 tabindex="-1">The answer</h1><p class="card">Text in preparation — or no consultation yet. <a href="#/sortes/questions">Choose a question.</a></p></section>`;
  const ans = r.answer ?? {};
  return `<section class="view"><h1 tabindex="-1">The answer</h1>
  ${r.question?.en ? `<p class="lede">${esc(r.question.en)}</p>` : ''}
  ${ans.grc ? `<p class="answer-grc" lang="grc">${esc(ans.grc)}</p>` : '<p class="card">Text in preparation.</p>'}
  ${ans.en ? `<p class="answer-en">${esc(ans.en)}${ans.apparatus ? ' <sup title="Hercher edited this line; see About.">†</sup>' : ''}</p>` : ''}
  <p class="wax" aria-label="The working">${r.q} + ${r.k} = ${r.sum} → ${esc(r.prophet?.en ?? 'the prophet')}${r.interpretation?.en ? ` (${esc(r.interpretation.en)})` : ''} → decade ${r.decade}, line ${r.line}</p>
  ${r.q === HOUR_QUESTION ? '<p class="note">The book has spoken on the hour. It advises; the choice remains yours.</p>' : ''}
  <p class="note">For reflection and delight, not advice.</p>
  <div class="row"><a class="btn" href="#/sortes/questions">Another question</a><a class="btn" href="#/">Home</a></div></section>`;
}

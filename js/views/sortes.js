import { esc, parasHTML } from './helpers.js';
import { isPropitious, HOUR_QUESTION } from '../sortes.js';

// The book's own frame (letter + method, prayer, days/hours), as an
// expandable section: Greek with our English, licences kept with each.
function frameHTML(framePassages) {
  if (!framePassages?.length) return '';
  const items = framePassages.map((fp) => {
    const orig = fp.original ?? {};
    const trans = (fp.translations ?? []).map((t) => `${parasHTML(t.text)}<p class="licence">${esc(t.label ?? 'English')} · ${esc(t.licence ?? '')}</p>`).join('');
    return `<article class="frame-item"><h3>${esc(fp.citation ?? fp.id)}</h3>
    <p class="note">${esc(fp.speaker ?? '')} · ${esc(fp.date ?? '')}</p>
    ${parasHTML(orig.text, `lang="${esc(orig.lang ?? 'grc')}" class="frame-grc"`)}
    <p class="licence">${esc(orig.licence ?? '')}</p>${trans}</article>`;
  }).join('');
  return `<details class="card book-frame"><summary>The book’s own instructions</summary>
  <p class="note">Astrampsychus’ letter and method, the prayer to say before consulting, and the book’s days and hours — Hercher’s Greek with our English. They are shown because the book asks for them; whether to use them is yours.</p>${items}</details>`;
}

export function sortesHomeHTML(now = new Date(), extra = {}) {
  const p = isPropitious(now, { moonAdvice: extra?.moonAdvice });
  const moonDay = (extra?.moonDays ?? []).find((d) => d.day === p.moonDay) ?? null;
  const favHour = (extra?.favourableHours ?? []).find((h) => h.weekday === p.weekday) ?? null;
  const moonSource = extra?.moonSource || 'Hercher 1863, printed p. 3';
  const moonLine = moonDay
    ? ` The book’s advice for this moon-day: <span lang="grc">${esc(moonDay.grc)}</span> — “${esc(moonDay.en)}”.`
    : (p.moonAdvice ? ` The book’s advice for this moon-day: “${esc(String(p.moonAdvice))}”.` : '');
  const hourWords = favHour
    ? `<p class="note">In the book’s words: <span lang="grc">${esc(favHour.grc)}</span> — ${esc(favHour.en)}.</p>`
    : '';
  return `<section class="view"><h1 tabindex="-1">Sortes Astrampsychi</h1>
  <p class="lede">The oracle-book of numbered lots from Roman Egypt. Choose a question, speak a number from one to ten, and the sum leads — through a named prophet — to your answer.</p>
  <p class="card warn-line">For reflection and delight, not advice.</p>
  <div class="card"><h2>The hour and the moon</h2>
  <p>Day ${p.moonDay} of the (mean) moon.${moonLine}</p>
  <p>${p.favourableWeekday ? `Today has a favourable hour — Byzantine hour ${p.byzantineHour}, about ${p.clockHour}:00 local (our approximation).${p.favourableNow ? ' <strong>It is that hour now.</strong>' : ''}` : 'Today carries no specially favourable hour in the book.'}</p>
  ${hourWords}<p class="note">That is the book’s advice, not ours (${esc(moonSource)}). The book advises asking first whether it is the hour to put your question. It advises; it never refuses.</p>
  <div class="row"><button class="btn" data-hour="1">Ask the hour question first</button><a class="btn primary" href="#/sortes/questions">Choose a question</a></div></div>
  ${frameHTML(extra?.framePassages)}
  <p lang="la" class="note">“Quid enim sors est? Idem prope modum quod micare, quod talos iacere…”</p>
  <p class="note">“What is a lot, after all? Much the same as playing morra or throwing dice…” — Marcus, unimpressed, in Cicero.</p></section>`;
}
export function sortesQuestionsHTML(questions) {
  if (!questions?.length) return `<section class="view"><h1 tabindex="-1">The questions</h1><p class="card">The questions could not be loaded. The mechanism here is ready for them; try again when the book is to hand.</p><a class="btn" href="#/sortes">Back</a></section>`;
  const themes = [...new Set(questions.flatMap((q) => q.themes ?? []))];
  const jumps = themes.map((t) => `<a href="#/sortes/questions" data-theme="${esc(t)}">${esc(t)}</a>`).join(' · ');
  const list = questions.map((q) => `<li data-qtext="${esc((q.en ?? '').toLowerCase())}" data-themes="${esc((q.themes ?? []).join(' '))}"><button class="q-item" data-q="${q.n}"><span class="q-n">${q.n}</span><span>${q.en ? esc(q.en) : esc(`Question ${q.n}`)}${q.grc ? `<small lang="grc">${esc(q.grc)}</small>` : ''}</span></button></li>`).join('');
  return `<section class="view"><h1 tabindex="-1">Choose your question</h1>
  <p class="note">Headings are our editorial grouping. Some questions belong to a slave-owning world — recovering a fugitive, buying freedom. They are kept, and framed as history, not offered as neutral menu items.</p>
  <label class="field"><span>Search the questions</span><input id="q-search" type="search" placeholder="marry, travel, recover…"></label>
  <p class="note theme-jumps">Themes: ${jumps || '—'}</p><ol class="q-list">${list}</ol></section>`;
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
  if (!r) return `<section class="view"><h1 tabindex="-1">The answer</h1><p class="card">No consultation yet. <a href="#/sortes/questions">Choose a question.</a></p></section>`;
  const ans = r.answer ?? {};
  const prophetName = String(r.prophet?.en ?? '').trim();
  return `<section class="view"><h1 tabindex="-1">The answer</h1>
  ${r.question?.en ? `<p class="lede">${esc(r.question.en)}</p>` : ''}
  ${ans.grc ? `<p class="answer-grc" lang="grc">${esc(ans.grc)}</p>` : ''}
  ${ans.en ? `<p class="answer-en">${esc(ans.en)}${ans.apparatus ? ' <sup aria-hidden="true">†</sup>' : ''}</p>` : ''}
  ${ans.apparatus ? `<details class="apparatus"><summary><sup aria-hidden="true">†</sup> A note on Hercher’s text</summary><p class="note">${esc(ans.apparatus)}</p></details>` : ''}
  <p class="wax" aria-label="The working">${r.q} + ${r.k} = ${r.sum} → ${prophetName ? esc(prophetName) : 'no prophet named'}${r.interpretation?.en ? ` (${esc(r.interpretation.en)})` : ''} → decade ${r.decade}, line ${r.line}</p>
  ${r.note ? `<p class="note prophet-note">${esc(r.note)}</p>` : ''}
  ${r.q === HOUR_QUESTION ? '<p class="note">The book has spoken on the hour. It advises; the choice remains yours.</p>' : ''}
  <p class="note">For reflection and delight, not advice.</p>
  <div class="row"><a class="btn" href="#/sortes/questions">Another question</a><a class="btn" href="#/">Home</a></div></section>`;
}

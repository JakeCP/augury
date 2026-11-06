// Strict hash router (PLAN §5). Pure: parseRoute is testable without DOM.
export function parseRoute(hash) {
  let h = typeof hash === 'string' ? hash : '';
  if (h.startsWith('#')) h = h.slice(1);
  if (h === '' || h === '/') return { name: 'home', params: {} };
  const m = h.match(/^\/record\/(.+)$/);
  if (m) return { name: 'shared-record', params: { code: m[1] } };
  const t = h.match(/^\/texts\/(.+)$/);
  if (t) return { name: 'text', params: { id: decodeURIComponent(t[1]) } };
  const table = {
    '/rite/question': 'question', '/rite/tradition': 'tradition', '/rite/templum': 'templum',
    '/rite/watch': 'watch', '/rite/verdict': 'verdict', '/record': 'record',
    '/tripudium': 'tripudium', '/sortes': 'sortes', '/sortes/questions': 'sortes-questions',
    '/sortes/lot': 'sortes-lot', '/sortes/answer': 'sortes-answer',
    '/texts': 'texts', '/about': 'about',
  };
  if (table[h]) return { name: table[h], params: {} };
  return { name: 'not-found', params: { path: h } };
}
export function navigate(path) { location.hash = path; }
export function onRouteChange(fn) {
  const h = () => fn(parseRoute(location.hash));
  addEventListener('hashchange', h); return () => removeEventListener('hashchange', h);
}

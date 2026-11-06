// session/localStorage wrappers (try/catch, PLAN §9). Injectable for tests.
export function makeStore(backing) {
  return {
    get(k) { try { const v = backing.getItem(k); return v === null ? null : JSON.parse(v); } catch { return null; } },
    set(k, v) { try { backing.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
    remove(k) { try { backing.removeItem(k); } catch { /* ignore */ } },
    getRaw(k) { try { return backing.getItem(k); } catch { return null; } },
    setRaw(k, v) { try { backing.setItem(k, String(v)); return true; } catch { return false; } },
  };
}
const mem = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, v), removeItem: (k) => m.delete(k) }; };
export const sessionStore = makeStore(typeof sessionStorage !== 'undefined' ? sessionStorage : mem());
export const localStore = makeStore(typeof localStorage !== 'undefined' ? localStorage : mem());
export const KEYS = {
  question: 'augury:question', watch: 'augury:watch', lastRecord: 'augury:lastRecord',
  sortes: 'augury:sortes', theme: 'augury:theme',
};
export function attemptsKey(kind, date = new Date()) {
  const y = date.getFullYear(), mo = String(date.getMonth() + 1).padStart(2, '0'), d = String(date.getDate()).padStart(2, '0');
  return `augury:attempts:${kind}:${y}-${mo}-${d}`;
}
export function bumpAttempts(store, kind, date = new Date()) {
  const k = attemptsKey(kind, date); const n = (store.get(k) ?? 0) + 1; store.set(k, n); return n;
}
export function peekAttempts(store, kind, date = new Date()) { return store.get(attemptsKey(kind, date)) ?? 0; }

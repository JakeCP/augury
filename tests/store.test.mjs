import test from 'node:test'; import assert from 'node:assert/strict';
import { makeStore, attemptsKey, bumpAttempts, peekAttempts } from '../js/store.js';
const mem = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v), removeItem: (k) => m.delete(k) }; };
test('store round-trips and survives a throwing backing', () => {
  const s = makeStore(mem()); s.set('a', { x: 1 }); assert.deepEqual(s.get('a'), { x: 1 });
  s.remove('a'); assert.equal(s.get('a'), null);
  const bad = makeStore({ getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); }, removeItem() {} });
  assert.equal(bad.get('a'), null); assert.equal(bad.set('a', 1), false);
});
test('attempt counters are per-day and per-kind', () => {
  const s = makeStore(mem()); const d = new Date(2026, 0, 2);
  assert.match(attemptsKey('watch', d), /2026-01-02/);
  assert.equal(bumpAttempts(s, 'watch', d), 1); assert.equal(bumpAttempts(s, 'watch', d), 2);
  assert.equal(peekAttempts(s, 'tripudium', d), 0);
});

import test from 'node:test'; import assert from 'node:assert/strict';
import { parseRoute } from '../js/router.js';
test('known routes resolve', () => {
  assert.equal(parseRoute('#/').name, 'home'); assert.equal(parseRoute('').name, 'home');
  assert.equal(parseRoute('#/rite/question').name, 'question');
  assert.equal(parseRoute('#/rite/watch').name, 'watch');
  assert.equal(parseRoute('#/record').name, 'record');
  assert.equal(parseRoute('#/tripudium').name, 'tripudium');
  assert.equal(parseRoute('#/sortes/lot').name, 'sortes-lot');
  assert.equal(parseRoute('#/about').name, 'about');
});
test('parameter routes and unknown routes', () => {
  assert.deepEqual(parseRoute('#/record/ABC-_123'), { name: 'shared-record', params: { code: 'ABC-_123' } });
  assert.equal(parseRoute('#/texts/fix-1').params.id, 'fix-1');
  assert.equal(parseRoute('#/nope').name, 'not-found');
  assert.equal(parseRoute('#/rite/bogus').name, 'not-found');
});

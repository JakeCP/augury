// Compass tests (PLAN.md §2): region math incl. wraparound and both
// orientations, quarter boundaries, epsilon, pointing-vector cases.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  norm, wrap180, relBearing, angularDistance, sideOf, quarterOf,
  regionForAzimuth, frontForOrientation, heightOfElevation, pointingVector,
  headingFromAlpha, yawOffsetDeg, applyYawOffset, applyScreenOrientation,
  applyDeclination, EPS_LINE_DEG,
} from '../js/compass.js';

const near = (a, b, tol = 1e-6) => Math.abs(((a - b + 540) % 360) - 180) <= tol || Math.abs(a - b) <= tol;
function assertAngle(actual, expected, tol = 1e-6) {
  assert.ok(near(actual, expected, tol), `expected angle ${expected}, got ${actual}`);
}

test('norm wraps negative and >360 inputs into [0, 360)', () => {
  assert.equal(norm(0), 0);
  assert.equal(norm(360), 0);
  assert.equal(norm(720 + 45), 45);
  assert.equal(norm(-90), 270);
  assert.equal(norm(-360), 0);
  assertAngle(norm(359.9), 359.9);
});

test('norm/sideOf/quarterOf throw clear errors on NaN or null, never invent a region', () => {
  for (const bad of [NaN, null, undefined, Infinity, -Infinity, 'north', {}]) {
    assert.throws(() => norm(bad), TypeError);
    assert.throws(() => sideOf(bad), TypeError);
    assert.throws(() => quarterOf(bad), TypeError);
    assert.throws(() => relBearing(bad, 0), TypeError);
    assert.throws(() => relBearing(0, bad), TypeError);
  }
});

test('wrap180 gives signed offsets in (-180, 180]', () => {
  assert.equal(wrap180(0), 0);
  assert.equal(wrap180(270), -90);
  assert.equal(wrap180(-270), 90);
  assert.equal(wrap180(180), 180);
});

test('relBearing is azimuth relative to front, with wraparound', () => {
  assert.equal(relBearing(90, 180), 270); // facing S (Varro), bird E is at rel 270
  assert.equal(relBearing(10, 350), 20); // crosses north
  assert.equal(relBearing(350, 10), 340);
  assert.equal(relBearing(180, 180), 0);
});

test('angularDistance is the smaller arc, 0..180', () => {
  assert.equal(angularDistance(350, 10), 20);
  assert.equal(angularDistance(0, 180), 180);
  assert.equal(angularDistance(90, 90), 0);
});

test('sideOf: halves, with epsilon on the line at 0/180/360', () => {
  assert.equal(EPS_LINE_DEG, 5);
  assert.equal(sideOf(90), 'right');
  assert.equal(sideOf(270), 'left');
  assert.equal(sideOf(0), 'line');
  assert.equal(sideOf(180), 'line');
  assert.equal(sideOf(360), 'line'); // norm -> 0
  assert.equal(sideOf(5), 'line'); // epsilon is inclusive
  assert.equal(sideOf(355), 'line');
  assert.equal(sideOf(175), 'line');
  assert.equal(sideOf(185), 'line');
  assert.equal(sideOf(5.1), 'right');
  assert.equal(sideOf(354.9), 'left');
  assert.equal(sideOf(174.9), 'right');
  assert.equal(sideOf(185.1), 'left');
  assert.equal(sideOf(90, 0), 'right'); // custom epsilon
  assert.equal(sideOf(0.5, 0), 'right');
  assert.throws(() => sideOf(90, -1), RangeError);
  assert.throws(() => sideOf(90, NaN), TypeError);
});

test('quarterOf: half-open quarters centred on cardinals, boundaries included', () => {
  assert.equal(quarterOf(0), 'antica');
  assert.equal(quarterOf(44.9), 'antica');
  assert.equal(quarterOf(45), 'dextra');
  assert.equal(quarterOf(90), 'dextra');
  assert.equal(quarterOf(134.9), 'dextra');
  assert.equal(quarterOf(135), 'postica');
  assert.equal(quarterOf(180), 'postica');
  assert.equal(quarterOf(225), 'sinistra');
  assert.equal(quarterOf(270), 'sinistra');
  assert.equal(quarterOf(314.9), 'sinistra');
  assert.equal(quarterOf(315), 'antica');
  assert.equal(quarterOf(359.9), 'antica');
  assert.equal(quarterOf(-45), 'antica'); // wraps to 315
  assert.equal(quarterOf(360 + 90), 'dextra');
});

test('every orientation x cardinal/intercardinal point (Varro, Livy, Greek, own)', () => {
  // Varro faces S: east on the left, west on the right.
  const varro = frontForOrientation('varro');
  assert.equal(varro, 180);
  assert.deepEqual(regionForAzimuth(90, varro), { relDeg: 270, side: 'left', quarter: 'sinistra' }); // E
  assert.deepEqual(regionForAzimuth(270, varro), { relDeg: 90, side: 'right', quarter: 'dextra' }); // W
  assert.deepEqual(regionForAzimuth(180, varro), { relDeg: 0, side: 'line', quarter: 'antica' }); // S ahead
  assert.deepEqual(regionForAzimuth(0, varro), { relDeg: 180, side: 'line', quarter: 'postica' }); // N behind
  assert.equal(regionForAzimuth(135, varro).side, 'left'); // SE: label postica/sinistra edge, weighed left
  assert.equal(regionForAzimuth(225, varro).side, 'right'); // SW

  // Livy faces E: north on the left, south on the right.
  const livy = frontForOrientation('livy');
  assert.equal(livy, 90);
  assert.deepEqual(regionForAzimuth(0, livy), { relDeg: 270, side: 'left', quarter: 'sinistra' }); // N
  assert.deepEqual(regionForAzimuth(180, livy), { relDeg: 90, side: 'right', quarter: 'dextra' }); // S
  assert.deepEqual(regionForAzimuth(90, livy), { relDeg: 0, side: 'line', quarter: 'antica' }); // E ahead
  assert.deepEqual(regionForAzimuth(270, livy), { relDeg: 180, side: 'line', quarter: 'postica' }); // W behind

  // Greek faces N: east (dawn) on the right.
  const greek = frontForOrientation('greek');
  assert.equal(greek, 0);
  assert.deepEqual(regionForAzimuth(90, greek), { relDeg: 90, side: 'right', quarter: 'dextra' });
  assert.deepEqual(regionForAzimuth(270, greek), { relDeg: 270, side: 'left', quarter: 'sinistra' });

  // Own bearing: front is whatever the user fixed, wraparound included.
  assert.equal(frontForOrientation('own', 350), 350);
  assert.deepEqual(regionForAzimuth(10, 350), { relDeg: 20, side: 'right', quarter: 'antica' });
  assert.equal(regionForAzimuth(340, 350).side, 'left');
  assert.throws(() => frontForOrientation('own'), RangeError);
  assert.throws(() => frontForOrientation('etruscan'), RangeError);
});

test('halves are operative, quarters are labels: rel 40 is antica but right', () => {
  const r = regionForAzimuth(40, 0);
  assert.equal(r.quarter, 'antica');
  assert.equal(r.side, 'right');
});

test('heightOfElevation bins, below-horizon and null are na (never silently low)', () => {
  assert.equal(heightOfElevation(0), 'low');
  assert.equal(heightOfElevation(19.9), 'low');
  assert.equal(heightOfElevation(20), 'middle');
  assert.equal(heightOfElevation(50), 'middle');
  assert.equal(heightOfElevation(50.1), 'high');
  assert.equal(heightOfElevation(90), 'high');
  assert.equal(heightOfElevation(-1), 'na');
  assert.equal(heightOfElevation(null), 'na');
  assert.equal(heightOfElevation(undefined), 'na');
  assert.throws(() => heightOfElevation(NaN), TypeError);
  assert.throws(() => heightOfElevation(91), RangeError);
});

// Pointing vector convention (PLAN §2): device -Z (back of phone).
function assertPointing(args, expected) {
  const p = pointingVector(...args);
  if (expected.heading === null) assert.equal(p.headingDeg, null, JSON.stringify(p));
  else assertAngle(p.headingDeg, expected.heading, 1e-6);
  assert.ok(Math.abs(p.elevationDeg - expected.elevation) < 1e-6,
    `elevation: expected ${expected.elevation}, got ${p.elevationDeg}`);
  assert.equal(p.overhead, !!expected.overhead);
  assert.equal(p.belowHorizon, expected.elevation < 0);
  const len = Math.hypot(p.vector.east, p.vector.north, p.vector.up);
  assert.ok(Math.abs(len - 1) < 1e-9, `unit vector, got length ${len}`);
}

test('pointingVector: flat screen-up points down, no heading', () => {
  assertPointing([0, 0, 0], { heading: null, elevation: -90 });
});

test('pointingVector: upright facing N/E/S/W', () => {
  assertPointing([0, 90, 0], { heading: 0, elevation: 0 }); // alpha 0 -> north
  assertPointing([270, 90, 0], { heading: 90, elevation: 0 }); // east
  assertPointing([180, 90, 0], { heading: 180, elevation: 0 }); // south
  assertPointing([90, 90, 0], { heading: 270, elevation: 0 }); // west
});

test('pointingVector: tilted back 45 degrees up; zenith is overhead with no heading', () => {
  assertPointing([0, 135, 0], { heading: 0, elevation: 45 });
  assertPointing([0, 180, 0], { heading: null, elevation: 90, overhead: true }); // screen-down flat
  const high = pointingVector(0, 171, 0); // elevation 81: past the zenith rule
  assert.equal(high.overhead, true);
  assert.equal(high.headingDeg, null);
  const justUnder = pointingVector(0, 169, 0); // elevation 79: heading still defined
  assert.equal(justUnder.overhead, false);
  assertAngle(justUnder.headingDeg, 0, 1e-6);
});

test('pointingVector: rolled flat (gamma) and bad input', () => {
  // Flat, rolled 90 degrees about the top edge: back of phone faces west.
  assertPointing([0, 0, 90], { heading: 270, elevation: 0 });
  assert.throws(() => pointingVector(NaN, 0, 0), TypeError);
  assert.throws(() => pointingVector(0, null, 0), TypeError);
});

test('headingFromAlpha, yaw offset, screen orientation (applied once), declination', () => {
  assert.equal(headingFromAlpha(0), 0);
  assert.equal(headingFromAlpha(270), 90);
  assert.equal(headingFromAlpha(90), 270);
  // Flat phone read alpha 30 but webkitCompassHeading says 100: offset fixes it.
  const off = yawOffsetDeg(30, 100);
  assert.equal(applyYawOffset(headingFromAlpha(30), off), 100);
  assert.equal(yawOffsetDeg(0, 350), -10); // signed smallest offset
  assert.equal(applyScreenOrientation(350, 90), 80);
  assert.equal(applyScreenOrientation(10, -90), 280);
  assert.equal(applyDeclination(10, 2.5), 12.5); // east declination adds
  assert.equal(applyDeclination(10, -15), 355);
  assert.throws(() => applyDeclination(10, NaN), TypeError);
});

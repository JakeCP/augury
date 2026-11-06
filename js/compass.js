// Angles, templum regions and the pointing vector (PLAN.md §2).
// Pure and DOM-free: numbers in, numbers out. All angles are degrees
// clockwise from north unless a name says otherwise. Non-finite input
// throws a TypeError — the engine never invents a region for nonsense.

export const EPS_LINE_DEG = 5;

function assertAngle(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number of degrees, got ${String(value)}`);
  }
  return value;
}

/** Normalise any angle into [0, 360). */
export function norm(deg) {
  assertAngle(deg, 'angle');
  return ((deg % 360) + 360) % 360;
}

/** Smallest signed equivalent angle, in (-180, 180]. */
export function wrap180(deg) {
  const n = norm(deg);
  return n > 180 ? n - 360 : n;
}

/** Bearing of `azimuthDeg` relative to the augur's front. */
export function relBearing(azimuthDeg, frontDeg) {
  assertAngle(azimuthDeg, 'azimuth');
  assertAngle(frontDeg, 'front');
  return norm(azimuthDeg - frontDeg);
}

/** Smaller arc between two bearings, in [0, 180]. */
export function angularDistance(aDeg, bDeg) {
  assertAngle(aDeg, 'angle a');
  assertAngle(bDeg, 'angle b');
  return Math.abs(wrap180(aDeg - bDeg));
}

/**
 * Livy's halves, the operative system: 'right' | 'left' | 'line'.
 * Within epsDeg of the front/back line a bird belongs to neither half.
 */
export function sideOf(relDeg, epsDeg = EPS_LINE_DEG) {
  const rel = norm(relDeg);
  assertAngle(epsDeg, 'epsilon');
  if (epsDeg < 0 || epsDeg > 45) throw new RangeError(`epsilon must be in 0..45 degrees, got ${epsDeg}`);
  if (rel <= epsDeg || rel >= 360 - epsDeg) return 'line';
  if (Math.abs(rel - 180) <= epsDeg) return 'line';
  return rel < 180 ? 'right' : 'left';
}

/** Varro's quarters: labels only. Half-open [start, start+90) per quarter. */
export function quarterOf(relDeg) {
  const rel = norm(relDeg);
  if (rel >= 315 || rel < 45) return 'antica';
  if (rel < 135) return 'dextra';
  if (rel < 225) return 'postica';
  return 'sinistra';
}

export const ORIENTATIONS = Object.freeze({
  varro: Object.freeze({ frontDeg: 180 }),
  livy: Object.freeze({ frontDeg: 90 }),
  greek: Object.freeze({ frontDeg: 0 }),
  own: Object.freeze({ frontDeg: null }),
});

/** Front bearing for an orientation; 'own' needs the user's fixed bearing. */
export function frontForOrientation(orientation, ownBearingDeg) {
  if (!Object.hasOwn(ORIENTATIONS, orientation)) {
    throw new RangeError(`unknown orientation ${String(orientation)} (expected varro|livy|greek|own)`);
  }
  if (orientation === 'own') {
    if (ownBearingDeg === undefined || ownBearingDeg === null) {
      throw new RangeError("orientation 'own' requires the user's bearing in degrees");
    }
    return norm(ownBearingDeg);
  }
  return ORIENTATIONS[orientation].frontDeg;
}

/** {relDeg, side, quarter} for an absolute azimuth against a front bearing. */
export function regionForAzimuth(azimuthDeg, frontDeg) {
  const relDeg = relBearing(azimuthDeg, frontDeg);
  return { relDeg, side: sideOf(relDeg), quarter: quarterOf(relDeg) };
}

/**
 * Height bin for an elevation in degrees. null/undefined (nothing captured)
 * and below-horizon elevations are 'na', never silently 'low'.
 */
export function heightOfElevation(elevationDeg) {
  if (elevationDeg === null || elevationDeg === undefined) return 'na';
  assertAngle(elevationDeg, 'elevation');
  if (elevationDeg < -90 || elevationDeg > 90) {
    throw new RangeError(`elevation must be in -90..90 degrees, got ${elevationDeg}`);
  }
  if (elevationDeg < 0) return 'na';
  if (elevationDeg < 20) return 'low';
  if (elevationDeg <= 50) return 'middle';
  return 'high';
}

// ------------------------------------------------------------ pointing

// DeviceOrientation (W3C intrinsic order): alpha about device z, then beta
// about the new x, then gamma about the new y. Earth frame is (east, north,
// up); device frame is x right, y towards the top edge, z out of the screen.
// The augur points the BACK of the phone at the bird, so we report the
// heading/elevation of the device -Z axis. verify: gamma sign on handsets
// in phase 3 (PLAN §2) — the math below is self-consistent in this convention.
const D2R = Math.PI / 180;
const scale = (v, k) => ({ e: v.e * k, n: v.n * k, u: v.u * k });
const add = (a, b) => ({ e: a.e + b.e, n: a.n + b.n, u: a.u + b.u });

export const ZENITH_LIMIT_DEG = 80;

/**
 * pointingVector(alpha, beta, gamma) ->
 *   { headingDeg|null, elevationDeg, overhead, belowHorizon,
 *     vector: {east, north, up} }   (vector is unit length, device -Z)
 * headingDeg is null when the horizontal direction is undefined: pointing
 * at the zenith/nadir, or past the 80-degree zenith rule (overhead: true).
 */
export function pointingVector(alphaDeg, betaDeg, gammaDeg) {
  assertAngle(alphaDeg, 'alpha');
  assertAngle(betaDeg, 'beta');
  assertAngle(gammaDeg, 'gamma');
  const a = alphaDeg * D2R;
  const b = betaDeg * D2R;
  const g = gammaDeg * D2R;

  // Flat, screen up, top edge at heading (360 - alpha): device basis in earth axes.
  let x = { e: Math.cos(a), n: Math.sin(a), u: 0 };
  let y = { e: -Math.sin(a), n: Math.cos(a), u: 0 };
  let z = { e: 0, n: 0, u: 1 };

  // Beta about device x: top edge tips up towards upright.
  const y2 = add(scale(y, Math.cos(b)), scale(z, Math.sin(b)));
  const z2 = add(scale(y, -Math.sin(b)), scale(z, Math.cos(b)));
  y = y2; z = z2;

  // Gamma about the new device y (x settles too, though only z is reported).
  const z3 = add(scale(z, Math.cos(g)), scale(x, Math.sin(g)));
  x = add(scale(x, Math.cos(g)), scale(z, -Math.sin(g)));
  z = z3;

  // Back of the device; snap float dust (cos(90deg) ~ 6e-17) so a level
  // phone reports elevation exactly 0, not a hair below the horizon.
  const clean = (v) => (Math.abs(v) < 1e-12 ? 0 : v);
  const p = { e: clean(-z.e), n: clean(-z.n), u: clean(-z.u) };
  const up = Math.max(-1, Math.min(1, p.u));
  const elevationDeg = Math.asin(up) / D2R;
  const overhead = elevationDeg > ZENITH_LIMIT_DEG;
  const horizontal = Math.hypot(p.e, p.n);
  const headingDeg = (overhead || horizontal < 1e-9)
    ? null
    : norm(Math.atan2(p.e, p.n) / D2R);
  return {
    headingDeg,
    elevationDeg,
    overhead,
    belowHorizon: elevationDeg < 0,
    vector: { east: p.e, north: p.n, up: p.u },
  };
}

/** Compass heading from a W3C alpha (counter-clockwise from north). */
export function headingFromAlpha(alphaDeg) {
  return norm(360 - norm(alphaDeg));
}

/**
 * iOS yaw offset: the signed correction that makes headingFromAlpha agree
 * with a trusted heading (webkitCompassHeading) measured with the phone flat.
 */
export function yawOffsetDeg(alphaDeg, trueHeadingDeg) {
  assertAngle(trueHeadingDeg, 'true heading');
  return wrap180(trueHeadingDeg - headingFromAlpha(alphaDeg));
}

export function applyYawOffset(headingDeg, offsetDeg) {
  assertAngle(offsetDeg, 'yaw offset');
  return norm(assertAngle(headingDeg, 'heading') + offsetDeg);
}

/**
 * Screen-orientation correction. Applied exactly ONCE, by the sensor glue
 * (sensors.js) — compass.js itself never applies it internally.
 */
export function applyScreenOrientation(headingDeg, screenAngleDeg) {
  assertAngle(screenAngleDeg, 'screen angle');
  return norm(assertAngle(headingDeg, 'heading') + screenAngleDeg);
}

/** Manual magnetic-declination offset, east positive. No location involved. */
export function applyDeclination(headingDeg, declinationDeg) {
  assertAngle(declinationDeg, 'declination');
  return norm(assertAngle(headingDeg, 'heading') + declinationDeg);
}

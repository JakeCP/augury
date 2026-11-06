// DeviceOrientation glue (PLAN §2). Pure helpers exported for tests.
import { norm, wrap180, pointingVector, headingFromAlpha, yawOffsetDeg, applyYawOffset, applyScreenOrientation, applyDeclination, heightOfElevation } from './compass.js';
export function screenAngle() {
  try { return screen.orientation?.angle ?? window.orientation ?? 0; } catch { return 0; }
}
export function jitterDeg(samples) {
  if (!samples || samples.length < 2) return 0;
  let mx = 0; for (const s of samples) mx = Math.max(mx, Math.abs(wrap180(s - samples[0]))); return mx;
}
export function needsCalibration({ accuracy, samples } = {}) {
  if (typeof accuracy === 'number' && (accuracy < 0 || accuracy > 25)) return true;
  return jitterDeg(samples) > 15;
}
// Critically-damped smoothing step toward target (degrees, shortest arc).
export function springStep(current, target, dtSec, omega = 6) {
  const d = wrap180(target - current);
  return norm(current + d * (1 - Math.exp(-omega * Math.max(0, dtSec))));
}
export async function requestOrientationPermission() {
  const DOE = typeof DeviceOrientationEvent !== 'undefined' ? DeviceOrientationEvent : null;
  if (DOE && typeof DOE.requestPermission === 'function') return (await DOE.requestPermission()) === 'granted';
  return true;
}
export function createSensor({ onReading, declinationDeg = 0 } = {}) {
  let yawOffset = null, running = false, samples = [];
  function handler(e) {
    let pv = null;
    if (typeof e.alpha === 'number' && typeof e.beta === 'number' && typeof e.gamma === 'number') {
      try { pv = pointingVector(e.alpha, e.beta, e.gamma); } catch { pv = null; }
    }
    let flatHeading = null;
    if (typeof e.webkitCompassHeading === 'number') flatHeading = norm(e.webkitCompassHeading);
    else if (typeof e.alpha === 'number') {
      let h = headingFromAlpha(e.alpha);
      if (yawOffset !== null) h = applyYawOffset(h, yawOffset);
      flatHeading = h;
    }
    let heading = pv?.headingDeg ?? flatHeading;
    if (heading !== null && heading !== undefined) {
      heading = applyScreenOrientation(heading, screenAngle()); // applied exactly once, here
      heading = applyDeclination(heading, declinationDeg);
      samples.push(heading); if (samples.length > 40) samples.shift();
    }
    onReading?.({
      headingDeg: heading ?? null, flatHeadingDeg: flatHeading,
      elevationDeg: pv?.elevationDeg ?? null, overhead: pv?.overhead ?? false,
      belowHorizon: pv?.belowHorizon ?? false,
      height: heightOfElevation(pv?.elevationDeg ?? null),
      accuracy: typeof e.webkitCompassAccuracy === 'number' ? e.webkitCompassAccuracy : null,
      jittery: needsCalibration({ accuracy: typeof e.webkitCompassAccuracy === 'number' ? e.webkitCompassAccuracy : null, samples }),
      raw: e,
    });
  }
  return {
    start() {
      if (running) return; running = true;
      addEventListener('deviceorientationabsolute', handler, true);
      addEventListener('deviceorientation', handler, true);
    },
    stop() {
      running = false;
      removeEventListener('deviceorientationabsolute', handler, true);
      removeEventListener('deviceorientation', handler, true);
    },
    fixYaw(alpha, trueHeading) { yawOffset = yawOffsetDeg(alpha, trueHeading); return yawOffset; },
    get yawOffset() { return yawOffset; },
  };
}

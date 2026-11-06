// Share-link record codec (PLAN.md §6). Pure and DOM-free.
// The payload carries every interpret() input (impetrative/oblative is
// derived exactly from the askedFor bitset), a rules version, and the
// recorded verdict itself. There is no field for the question, ever.
// decodeRecord never throws: failures are {ok:false, error:{code,message}}.
import { interpret, RULES_VERSION, BIRDS } from './rules.js';
import { norm } from './compass.js';

export const SHARE_VERSION = 1;
export const MAX_SIGNS = 60;
export const MAX_CODE_LENGTH = 4096;

// Bird codes in bitset order (PLAN §6).
export const BIRD_CODES = Object.freeze([
  ['rv', 'raven'], ['cw', 'crow'], ['no', 'noctua'], ['bu', 'bubo'], ['ou', 'owlUnsure'],
  ['ea', 'eagle'], ['vu', 'vulture'], ['bz', 'buteo'], ['wp', 'picus'], ['pu', 'pulli'], ['ot', 'other'],
]);
const CODE_BY_BIRD = new Map(BIRD_CODES.map(([code, id]) => [id, code]));
const BIRD_BY_CODE = new Map(BIRD_CODES);
const BIRD_ORDER = BIRD_CODES.map(([, id]) => id);
const DEFAULT_ASKED = BIRD_ORDER.filter((id) => BIRDS[id].augural && !BIRDS[id].mapsTo);

const TRADITION_CODE = { roman: 'r', greek: 'g' };
const TRADITION_BY_CODE = { r: 'roman', g: 'greek' };
const ORIENTATION_CODE = { varro: 'v', livy: 'l', greek: 'g', own: 'o' };
const ORIENTATION_BY_CODE = { v: 'varro', l: 'livy', g: 'greek', o: 'own' };
const VERDICT_CODE = { ADMITTUNT: 'a', NON_ADMITTUNT: 'n', ALIO_DIE: 'd' };
const VERDICT_BY_CODE = { a: 'ADMITTUNT', n: 'NON_ADMITTUNT', d: 'ALIO_DIE' };
const KIND_CODE = { voice: 'v', flight: 'f', feeding: 't', ostentum: 'o' };
const KIND_BY_CODE = { v: 'voice', f: 'flight', t: 'feeding', o: 'ostentum' };
const HEIGHT_CODE = { low: 'l', middle: 'm', high: 'h', na: 'n' };
const HEIGHT_BY_CODE = { l: 'low', m: 'middle', h: 'high', n: 'na' };
const FLIGHT_CODE = { onward: 'o', across: 'a', returning: 'r', circling: 'c', settled: 's', stoop: 'd', na: 'n' };
const FLIGHT_BY_CODE = { o: 'onward', a: 'across', r: 'returning', c: 'circling', s: 'settled', d: 'stoop', n: 'na' };

// ----------------------------------------------------------- base64url
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function bytesToBase64Url(bytes) {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    out += B64[b0 >> 2] + B64[((b0 & 3) << 4) | (b1 >> 4)];
    if (i + 1 < bytes.length) out += B64[((b1 & 15) << 2) | (b2 >> 6)];
    if (i + 2 < bytes.length) out += B64[b2 & 63];
  }
  return out.replace(/\+/g, '-').replace(/\//g, '_');
}
function base64UrlToBytes(code) {
  const s = code.replace(/-/g, '+').replace(/_/g, '/');
  const bytes = [];
  let acc = 0; let accBits = 0;
  for (const ch of s) {
    const v = B64.indexOf(ch);
    if (v < 0) throw new Error('bad base64 character');
    acc = (acc << 6) | v; accBits += 6;
    if (accBits >= 8) { accBits -= 8; bytes.push((acc >> accBits) & 255); }
  }
  return new Uint8Array(bytes);
}

// --------------------------------------------------------------- encode
const tenths = (deg) => Math.round(norm(deg) * 10) % 3600;

function encodeSign(sign, frontDeg) {
  const kinds = [...new Set(sign.kinds ?? [])];
  const kindStr = ['voice', 'flight', 'feeding', 'ostentum']
    .filter((k) => kinds.includes(k)).map((k) => KIND_CODE[k]).join('');
  let relStr = 'x';
  if (sign.relDeg !== undefined && sign.relDeg !== null) relStr = String(tenths(sign.relDeg));
  else if (sign.relDeg === undefined && sign.azimuthDeg !== undefined && sign.azimuthDeg !== null) {
    relStr = String(tenths(sign.azimuthDeg - frontDeg));
  }
  let detail = '';
  if (sign.chokedVoice === true) detail += 'c';
  if (sign.foodFell === true) detail += 'f';
  if (sign.daylight === true) detail += 'd';
  if (sign.daylight === false) detail += 'n';
  const dtSec = Math.round(sign.dtSec ?? 0);
  if (!Number.isInteger(dtSec) || dtSec < 0 || dtSec > 86400) {
    throw new RangeError(`sign dtSec must be in 0..86400, got ${String(sign.dtSec)}`);
  }
  return [
    dtSec,
    CODE_BY_BIRD.get(sign.bird),
    kindStr,
    relStr,
    HEIGHT_CODE[sign.height ?? 'na'],
    FLIGHT_CODE[sign.flight ?? 'na'],
    sign.count ?? 1,
    sign.declined === true ? 'd' : 'a',
    detail || '-',
  ].join('.');
}

/**
 * encodeRecord(record) -> base64url code (no padding).
 * record is an interpret() observation plus startedAtEpochMin.
 * A `question` property, if present in state, is deliberately ignored.
 * Throws on invalid input (via interpret) or more than MAX_SIGNS signs.
 */
export function encodeRecord(record) {
  if (!record || typeof record !== 'object') throw new TypeError('encodeRecord requires a record object');
  const signs = record.signs ?? [];
  if (!Array.isArray(signs)) throw new TypeError('record.signs must be an array');
  if (signs.length > MAX_SIGNS) throw new RangeError(`at most ${MAX_SIGNS} signs can be shared, got ${signs.length}`);
  const verdict = interpret(record).verdict; // validates everything else
  const startedAtEpochMin = record.startedAtEpochMin ?? 0;
  if (!Number.isInteger(startedAtEpochMin) || startedAtEpochMin < 0) {
    throw new RangeError(`startedAtEpochMin must be a non-negative integer, got ${String(startedAtEpochMin)}`);
  }
  const declinationDeg = record.declinationDeg ?? 0;
  if (typeof declinationDeg !== 'number' || !Number.isFinite(declinationDeg) || declinationDeg < -180 || declinationDeg > 180) {
    throw new RangeError(`declinationDeg must be in -180..180, got ${String(declinationDeg)}`);
  }
  const frontDeg = record.frontDeg ?? { varro: 180, livy: 90, greek: 0 }[record.orientation ?? 'varro'];
  const asked = record.askedFor ?? DEFAULT_ASKED;
  let bits = 0;
  for (const id of asked) bits |= 2 ** BIRD_ORDER.indexOf(id);
  const payload = [
    SHARE_VERSION,
    RULES_VERSION,
    TRADITION_CODE[record.tradition ?? 'roman'],
    ORIENTATION_CODE[record.orientation ?? 'varro'],
    tenths(frontDeg),
    Math.round(record.templumHalfWidthDeg ?? 180),
    Math.round(declinationDeg * 10),
    startedAtEpochMin,
    `${record.vitium === true ? 'v' : '-'}${(record.isDaylight ?? true) ? 'd' : 'n'}`,
    record.attemptsToday ?? 1,
    bits,
    VERDICT_CODE[verdict],
    signs.map((s) => encodeSign(s, norm(frontDeg))).join(';'),
  ].join('~');
  const code = bytesToBase64Url(new TextEncoder().encode(payload));
  if (code.length > MAX_CODE_LENGTH) throw new RangeError(`share code exceeds ${MAX_CODE_LENGTH} characters`);
  return code;
}

// --------------------------------------------------------------- decode
const fail = (code, message) => ({ ok: false, error: { code, message } });
function parseIntField(s, name, min, max) {
  if (!/^-?\d+$/.test(s)) throw new Error(`${name} is not an integer: ${s}`);
  const v = Number(s);
  if (v < min || v > max) throw new Error(`${name} out of range ${min}..${max}: ${v}`);
  return v;
}

function decodeSign(s) {
  const f = s.split('.');
  if (f.length !== 9) throw new Error(`sign has ${f.length} fields, expected 9`);
  const [dt, bird, kinds, rel, height, flight, count, status, detail] = f;
  if (!BIRD_BY_CODE.has(bird)) throw new Error(`unknown bird code ${bird}`);
  if (!/^[vfto]+$/.test(kinds) || new Set(kinds).size !== kinds.length) throw new Error(`bad kinds code ${kinds}`);
  if (!Object.hasOwn(HEIGHT_BY_CODE, height)) throw new Error(`bad height code ${height}`);
  if (!Object.hasOwn(FLIGHT_BY_CODE, flight)) throw new Error(`bad flight code ${flight}`);
  if (status !== 'a' && status !== 'd') throw new Error(`bad status code ${status}`);
  if (detail !== '-' && (!/^[cfdn]+$/.test(detail) || new Set(detail).size !== detail.length
    || (detail.includes('d') && detail.includes('n')))) throw new Error(`bad detail code ${detail}`);
  const sign = {
    bird: BIRD_BY_CODE.get(bird),
    kinds: [...kinds].map((c) => KIND_BY_CODE[c]),
    relDeg: rel === 'x' ? null : parseIntField(rel, 'rel', 0, 3599) / 10,
    height: HEIGHT_BY_CODE[height],
    flight: FLIGHT_BY_CODE[flight],
    count: parseIntField(count, 'count', 1, 12),
    declined: status === 'd',
    chokedVoice: detail.includes('c'),
    foodFell: detail.includes('f'),
    dtSec: parseIntField(dt, 'dtSec', 0, 86400),
  };
  if (detail.includes('d')) sign.daylight = true;
  if (detail.includes('n')) sign.daylight = false;
  return sign;
}

/** decodeRecord(code) -> {ok:true, ...} | {ok:false, error}. Never throws. */
export function decodeRecord(code) {
  try {
    if (typeof code !== 'string') return fail('not-a-string', 'share code must be a string');
    if (code.length === 0) return fail('bad-encoding', 'share code is empty');
    if (code.length > MAX_CODE_LENGTH) return fail('too-large', `share code exceeds ${MAX_CODE_LENGTH} characters`);
    if (!/^[A-Za-z0-9_-]+$/.test(code) || code.length % 4 === 1) return fail('bad-encoding', 'share code is not base64url');
    let payload;
    try {
      payload = new TextDecoder('utf-8', { fatal: true }).decode(base64UrlToBytes(code));
    } catch {
      return fail('bad-encoding', 'share code does not decode as UTF-8');
    }
    const f = payload.split('~');
    if (f.length !== 13) return fail('bad-payload', `expected 13 fields, got ${f.length}`);
    if (!/^\d+$/.test(f[0])) return fail('bad-payload', `bad share version: ${f[0]}`);
    if (Number(f[0]) !== SHARE_VERSION) return fail('unsupported-version', `share version ${f[0]} is not supported`);
    const rulesVersion = parseIntField(f[1], 'rulesVersion', 0, 9999);
    if (!Object.hasOwn(TRADITION_BY_CODE, f[2])) throw new Error(`unknown tradition code ${f[2]}`);
    if (!Object.hasOwn(ORIENTATION_BY_CODE, f[3])) throw new Error(`unknown orientation code ${f[3]}`);
    const frontDeg = parseIntField(f[4], 'front', 0, 3599) / 10;
    const halfWidth = parseIntField(f[5], 'templumHalfWidth', 1, 180);
    const declinationDeg = parseIntField(f[6], 'declination', -1800, 1800) / 10;
    const startedAtEpochMin = parseIntField(f[7], 'startEpochMin', 0, Number.MAX_SAFE_INTEGER);
    if (!/^[v-][dn]$/.test(f[8])) throw new Error(`bad flags: ${f[8]}`);
    const attemptsToday = parseIntField(f[9], 'attemptsToday', 1, 99);
    const bits = parseIntField(f[10], 'askedFor bitset', 0, 2 ** BIRD_ORDER.length - 1);
    if (!Object.hasOwn(VERDICT_BY_CODE, f[11])) throw new Error(`unknown verdict code ${f[11]}`);
    const signStrings = f[12] === '' ? [] : f[12].split(';');
    if (signStrings.length > MAX_SIGNS) return fail('too-large', `more than ${MAX_SIGNS} signs`);
    const signs = signStrings.map(decodeSign);
    return {
      ok: true,
      shareVersion: SHARE_VERSION,
      rulesVersion,
      recordedVerdict: VERDICT_BY_CODE[f[11]],
      observation: {
        tradition: TRADITION_BY_CODE[f[2]],
        orientation: ORIENTATION_BY_CODE[f[3]],
        frontDeg,
        templumHalfWidthDeg: halfWidth,
        declinationDeg,
        startedAtEpochMin,
        vitium: f[8][0] === 'v',
        isDaylight: f[8][1] === 'd',
        attemptsToday,
        askedFor: BIRD_ORDER.filter((_, i) => bits & (2 ** i)),
        signs,
      },
    };
  } catch (err) {
    return fail('bad-payload', err instanceof Error ? err.message : String(err));
  }
}

#!/usr/bin/env node
// Check the colour tokens per *use*, WCAG 2.x ratios. Phase 6 palette
// (docs/DESIGN_FRESCO.md): Pompeian red, ochre gold, dado black and
// garland green on the warm cream; the room at night in dark mode.
//
//   node scripts/check-contrast.mjs
//
// Exit 0 = every use passes, 1 = a failure (printed). Text needs
// 4.5:1 (AA); large text and meaningful non-text strokes need 3:1.
// House rules, enforced against the CSS itself:
// - `rule` (#cbbfa9, 1.55:1 on paper) is decoration only — never text,
//   never a control border, never a stroke that carries meaning.
// - `bronze` passes AA but washes out first in glare — barred from
//   text (`color:`), allowed for non-text strokes at >= 3:1.
// - `gold` (#d9a441, 1.9:1 on paper) is a hairline accent only —
//   barred from text and from fills (`background:`); it rides inside
//   a red border or on the dark dado, never alone.
// - `green` is garland paint — barred from text, >= 3:1 as a stroke.
// Faded text (.note, .licence, captions — opacity down to 0.7) is
// checked as the composited colour a reader actually sees.
// The pure helpers are exported for tests/scripts.test.mjs; the audit
// runs only when this file is executed directly.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

export function relativeLuminance([r, g, b]) {
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrastRatio(fg, bg) {
  const a = relativeLuminance(Array.isArray(fg) ? fg : hexToRgb(fg));
  const b = relativeLuminance(Array.isArray(bg) ? bg : hexToRgb(bg));
  const [hi, lo] = a >= b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

// fg painted at `alpha` over bg, in sRGB space (what CSS opacity does).
export function composite(fg, bg, alpha) {
  const f = hexToRgb(fg);
  const b = hexToRgb(bg);
  return f.map((c, i) => Math.round(c * alpha + b[i] * (1 - alpha)));
}

// Phase 6 tokens (docs/DESIGN_FRESCO.md), as declared in css/base.css.
// main() asserts css/base.css still declares these, so the audit cannot
// drift away from the stylesheet it claims to check.
export const SCHEMES = {
  light: { paper: '#f3ece0', card: '#f7eedd', ink: '#2a1a12', red: '#8f2a1c', redFill: '#8f2a1c', gold: '#d9a441', goldPale: '#e8c26a', bronze: '#7a5a2b', green: '#5f6b3a', dado: '#1d1410', rule: '#cbbfa9', onRed: '#f7eedd', onDado: '#f3ece0' },
  // Dark keeps the deep-red fill (#8f2a1c) with cream text for the
  // primary button and picked tiles; the salmon red is text/strokes only.
  dark: { paper: '#16130f', card: '#241a12', ink: '#ece3d3', red: '#e0705a', redFill: '#8f2a1c', gold: '#d9a441', goldPale: '#e8c26a', bronze: '#c49a5c', green: '#9aa66a', dado: '#100b08', rule: '#3d372c', onRed: '#f7eedd', onDado: '#ece3d3' },
};

function audit() {
  const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const base = fs.readFileSync(path.join(ROOT, 'css', 'base.css'), 'utf8');
  const views = fs.readFileSync(path.join(ROOT, 'css', 'views.css'), 'utf8');
  const css = `${base}\n${views}`;
  const failures = [];

  // Drift guard: every audited colour must literally appear in base.css.
  for (const [scheme, t] of Object.entries(SCHEMES)) {
    for (const [name, hex] of Object.entries(t)) {
      if (!base.toLowerCase().includes(hex)) failures.push(`${scheme}.${name}: ${hex} not found in css/base.css — update this audit with the stylesheet`);
    }
  }

  const rows = [];
  const check = (scheme, use, fg, bg, min, note = '') => {
    const r = contrastRatio(fg, bg);
    const ok = r >= min;
    rows.push({ scheme, use, ratio: r, min, ok });
    if (!ok) failures.push(`${scheme} ${use}: ${r.toFixed(2)}:1 < ${min}:1 ${note}`.trim());
  };

  for (const [scheme, t] of Object.entries(SCHEMES)) {
    check(scheme, 'body ink on paper', t.ink, t.paper, 4.5);
    check(scheme, 'body ink on card', t.ink, t.card, 4.5);
    check(scheme, 'red text on paper (.step, .q-n, links)', t.red, t.paper, 4.5);
    check(scheme, 'red text on card (legend, verdict, tile neighbours)', t.red, t.card, 4.5);
    check(scheme, 'primary-button / picked-tile text on red fill', t.onRed, t.redFill, 4.5);
    check(scheme, 'footer text on the dado', t.onDado, t.dado, 4.5);
    check(scheme, 'focus outline / red stroke on paper (non-text)', t.red, t.paper, 3.0);
    check(scheme, 'focus outline on the dado (gold-pale, non-text)', t.goldPale, t.dado, 3.0);
    check(scheme, 'picked-tile gold lozenge on red fill (non-text)', t.goldPale, t.redFill, 3.0);
    check(scheme, 'ink control borders on paper (non-text)', t.ink, t.paper, 3.0);
    check(scheme, 'bronze non-text strokes on paper', t.bronze, t.paper, 3.0);
    check(scheme, 'garland green non-text strokes on paper', t.green, t.paper, 3.0);
    check(scheme, 'faded ink on paper (opacity 0.7, smallest text)', composite(t.ink, t.paper, 0.7), t.paper, 4.5);
    check(scheme, 'faded ink on card (opacity 0.7)', composite(t.ink, t.card, 0.7), t.card, 4.5);
  }

  // House rules, checked against the stylesheet text.
  // [{;] anchors the property name, so text-decoration-color and
  // outline-color (legitimate hairline uses) are not read as `color:`.
  if (/[{;]\s*color\s*:\s*var\(--bronze\)/.test(css)) failures.push('bronze used as text colour (color: var(--bronze)) — barred from text, Phase 6 house rule');
  if (/[{;]\s*color\s*:\s*var\(--rule\)/.test(css)) failures.push('rule used as text colour (color: var(--rule)) — decoration only, Phase 6 house rule');
  if (/[{;]\s*color\s*:\s*var\(--gold\)/.test(css)) failures.push('gold used as text colour (color: var(--gold)) — hairline accent only, Phase 6 house rule');
  if (/[{;]\s*background\s*:\s*var\(--gold\)/.test(css)) failures.push('gold used as a fill (background: var(--gold)) — hairline accent only, never a fill, Phase 6 house rule');
  if (/[{;]\s*color\s*:\s*var\(--green\)/.test(css)) failures.push('green used as text colour (color: var(--green)) — garland paint only, Phase 6 house rule');
  const ruleStroke = css.match(/[^{}]*\{[^{}]*stroke\s*:\s*var\(--rule\)[^{}]*\}/g) ?? [];
  if (ruleStroke.length) failures.push(`rule used as an SVG stroke — decoration only, never a meaning-carrying stroke, Phase 6 house rule: ${ruleStroke[0].trim().slice(0, 80)}`);

  for (const r of rows) {
    console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.scheme.padEnd(5)} ${r.ratio.toFixed(2).padStart(6)}:1  (>= ${r.min}:1)  ${r.use}`);
  }
  const lightRule = contrastRatio(SCHEMES.light.rule, SCHEMES.light.paper);
  console.log(`note      rule on light paper is ${lightRule.toFixed(2)}:1 — decoration only (borders, hairlines), enforced above.`);
  const lightGold = contrastRatio(SCHEMES.light.gold, SCHEMES.light.paper);
  console.log(`note      gold on light paper is ${lightGold.toFixed(2)}:1 — hairline accent only (inside red borders), enforced above.`);
  if (failures.length) {
    for (const f of failures) console.log(`error: ${f}`);
    console.log(`check-contrast FAILED: ${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log(`check-contrast OK (${rows.length} uses, both schemes)`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) audit();

#!/usr/bin/env node
// Validate the phase-4 content data + licences (PLAN §9), on yijing's
// validate.mjs pattern: exit 0 = pass (warnings may print), 1 = errors.
//
//   node scripts/validate.mjs            # stubs are warnings (phase 4 in progress)
//   node scripts/validate.mjs --strict   # stubs are errors (the phase-4c gate)
//
// What is checked:
// - data/passages.js (when present): every record carries id, citation,
//   speaker, date, tier, original {lang, text, licence}, translations[]
//   {label, text, licence} and rules[] (empty-but-present while a stub).
//   A *complete* record (original text filled in) must show non-empty
//   PER-FIELD licences and at least one translation text — that is the
//   PLAN §9 rule, and "present but empty" does not satisfy it. Rule IDs
//   must be rules the engine knows; duplicate ids are errors.
// - data/sortes-*.js (when present): questions/table/decades shapes per
//   PLAN §7, then js/sortes.js validateSortesData() is REPORTED (the
//   tradition's defects are described, never asserted away, PLAN §7).
// - Licence files ship: LICENSE, LICENSE-content.md, one OFL per font.
// Missing data files and scripts/provenance.json are "pending content"
// warnings while phase 4 is being written (errors under --strict), so
// CI stays green now without ever pretending the texts have arrived.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STRICT = process.argv.includes('--strict');
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const pending = (m) => (STRICT ? err(`pending content (strict): ${m}`) : warn(`pending content: ${m}`));
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const nonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;

// ---- licence files ----
for (const rel of ['LICENSE', 'LICENSE-content.md', 'fonts/Cinzel-OFL.txt', 'fonts/EBGaramond-OFL.txt']) {
  if (!exists(rel) || fs.statSync(path.join(ROOT, rel)).size === 0) err(`${rel}: licence file missing or empty`);
}
if (!exists('scripts/provenance.json')) pending('scripts/provenance.json (page-scan pins land in phase 4)');

// ---- passages ----
const TIERS = ['technical', 'quintus', 'marcus', 'balbus', 'draft-law', 'legend', 'history', 'comedy', 'natural-history', 'poetry', 'reconstruction'];
async function checkPassages() {
  if (!exists('data/passages.js')) { pending('data/passages.js'); return; }
  let passages;
  let knownRules;
  try {
    passages = (await import(pathToFileURL(path.join(ROOT, 'data/passages.js')).href)).passages;
    const rules = await import(pathToFileURL(path.join(ROOT, 'js/rules.js')).href);
    knownRules = new Set([...Object.keys(rules.RULE_NAMES), ...Object.values(rules.BIRDS).map((b) => b.ruleId).filter(Boolean)]);
  } catch (e) {
    err(`data/passages.js: cannot import (${e.message})`);
    return;
  }
  if (!Array.isArray(passages) || passages.length === 0) { err('data/passages.js: expected a non-empty passages array'); return; }
  const seen = new Set();
  let stubs = 0;
  passages.forEach((p, i) => {
    const where = `passage ${p?.id ?? `#${i}`}`;
    for (const key of ['id', 'citation', 'speaker', 'date', 'tier', 'original', 'translations', 'rules']) {
      if (!(key in p)) err(`${where}: missing field ${key} (fields are empty-but-present until filled, PLAN §9)`);
    }
    if (seen.has(p.id)) err(`${where}: duplicate id`);
    seen.add(p.id);
    if (!TIERS.includes(p.tier)) warn(`${where}: tier ${JSON.stringify(p.tier)} not in the PLAN §3 list — the UI will show the raw slug`);
    if (!p.original || typeof p.original !== 'object') { err(`${where}: original must be an object`); return; }
    for (const key of ['lang', 'text', 'licence']) if (!(key in p.original)) err(`${where}.original: missing field ${key}`);
    if (!['la', 'grc'].includes(p.original.lang)) err(`${where}.original: lang must be "la" or "grc", got ${JSON.stringify(p.original.lang)}`);
    if (!Array.isArray(p.translations)) err(`${where}: translations must be an array`);
    (p.translations ?? []).forEach((t, k) => {
      for (const key of ['label', 'text', 'licence']) if (!(key in t)) err(`${where}.translations[${k}]: missing field ${key}`);
    });
    if (!Array.isArray(p.rules)) err(`${where}: rules must be an array`);
    for (const r of p.rules ?? []) if (!knownRules.has(r)) err(`${where}: unknown rule id ${JSON.stringify(r)}`);
    const complete = nonEmpty(p.original.text);
    if (complete) {
      if (!nonEmpty(p.original.licence)) err(`${where}.original: text present but licence empty — per-field licences must be non-empty (PLAN §9)`);
      if (!nonEmpty(p.citation) || !nonEmpty(p.speaker) || !nonEmpty(p.date)) err(`${where}: complete record needs citation, speaker and date`);
      if (!(p.translations ?? []).some((t) => nonEmpty(t.text))) err(`${where}: original text present but no translation text`);
      (p.translations ?? []).forEach((t, k) => {
        if (!nonEmpty(t.label)) err(`${where}.translations[${k}]: label empty`);
        if (nonEmpty(t.text) && !nonEmpty(t.licence)) err(`${where}.translations[${k}]: text present but licence empty (PLAN §9)`);
      });
    } else {
      stubs += 1;
    }
  });
  if (stubs) pending(`${stubs} of ${passages.length} passage records are still empty stubs (phase 4 fills them; licences must be non-empty once text lands)`);
}

// ---- sortes ----
async function checkSortes() {
  const files = { questions: 'data/sortes-questions.js', table: 'data/sortes-table.js', decades: 'data/sortes-decades.js' };
  const present = Object.entries(files).filter(([, rel]) => exists(rel));
  if (present.length === 0) { pending('data/sortes-questions.js + sortes-table.js + sortes-decades.js'); return; }
  if (present.length < 3) {
    for (const [, rel] of Object.entries(files).filter(([, r]) => !exists(r))) pending(rel);
    return;
  }
  let data;
  try {
    const [q, t, d] = await Promise.all(Object.values(files).map((rel) => import(pathToFileURL(path.join(ROOT, rel)).href)));
    data = { questions: q.questions ?? q.default, table: t.table ?? t.default, decades: d.decades ?? d.default };
  } catch (e) {
    err(`sortes data: cannot import (${e.message})`);
    return;
  }
  (data.questions ?? []).forEach((qq, i) => {
    if (!Number.isInteger(qq.n) || !('grc' in qq) || !('en' in qq) || !('themes' in qq)) err(`sortes question #${i}: expected {n, grc, en, themes}`);
  });
  (data.table ?? []).forEach((row, i) => {
    if (!('sum' in row) || !('prophet' in row) || !('interpretation' in row) || !('decade' in row)) err(`sortes table row #${i}: expected {sum, prophet, interpretation, decade}`);
  });
  (data.decades ?? []).forEach((dec, i) => {
    if (!('n' in dec) || !Array.isArray(dec.lines)) { err(`sortes decade #${i}: expected {n, lines[]}`); return; }
    dec.lines.forEach((line, k) => {
      for (const key of ['grc', 'en', 'answersQuestion', 'apparatus', 'filler']) {
        if (!(key in line)) err(`sortes decade ${dec.n} line ${k + 1}: missing field ${key} (apparatus may be null, never missing)`);
      }
    });
  });
  try {
    const { validateSortesData } = await import(pathToFileURL(path.join(ROOT, 'js/sortes.js')).href);
    const report = validateSortesData(data);
    const s = report.stats ?? {};
    console.log(`sortes integrity (reported, PLAN §7): ${s.questionCount ?? '?'} questions, ${s.decadeCount ?? '?'} decades, `
      + `${s.reachableCount ?? '?'} reachable answers, ${(s.missingSums ?? []).length} missing sums, `
      + `${(s.duplicatePairs ?? []).length} duplicate pairs, ${(s.unreachableLines ?? []).length} unreachable (filler) lines, `
      + `${(s.tagMismatches ?? []).length} tag mismatches`);
    for (const e of report.errors ?? []) warn(`sortes: ${e}`);
  } catch (e) {
    err(`sortes data: validateSortesData failed (${e.message})`);
  }
}

await checkPassages();
await checkSortes();

for (const w of warnings) console.log(`warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.log(`error: ${e}`);
  console.log(`validate FAILED: ${errors.length} error(s), ${warnings.length} warning(s)${STRICT ? ' [strict]' : ''}`);
  process.exit(1);
}
console.log(`validate OK${STRICT ? ' [strict]' : ''} (${warnings.length} warning(s))`);

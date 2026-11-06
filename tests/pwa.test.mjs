// PWA tests (PLAN §9, yijing's pattern): every precached path exists,
// the manifest is installable and relative (project page /augury/),
// index.html wires manifest/icons/og, js/app.js registers sw.js
// relatively, and the total precache weight stays in budget.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

// Explicit pending lists (phase 5 runs while phase 4 writes data/ and
// before the lead rasterizes the icon PNGs with a browser). A path on
// one of these lists may be absent — and is REPORTED by name below —
// anything else missing fails, because one 404 in cache.addAll kills
// the whole offline install. Empty these lists as the files land.
const PENDING_CONTENT = [
  'data/passages.js', 'data/sortes-questions.js', 'data/sortes-table.js', 'data/sortes-decades.js',
];
const PENDING_ICONS = [
  'icons/apple-touch-icon.png', 'icons/favicon-32.png', 'icons/icon-192.png', 'icons/icon-512.png',
  'icons/icon-maskable-192.png', 'icons/icon-maskable-512.png', 'icons/icon-monochrome-512.png',
];
const PENDING = new Set([...PENDING_CONTENT, ...PENDING_ICONS]);

function existsOrPending(t, rel, what) {
  if (exists(rel)) return;
  assert.ok(PENDING.has(rel), `${what} missing from repo (and not on the pending list): ${rel}`);
  t.diagnostic(`pending ${what}: ${rel} — on the explicit pending list; the app shell points at its final path`);
}

// The precache list is a plain string array in sw.js so it can be checked
// here and in review without executing the worker.
function precacheUrls() {
  const sw = read('sw.js');
  const block = sw.match(/const PRECACHE_URLS = \[([\s\S]*?)\];/);
  assert.ok(block, 'sw.js must declare const PRECACHE_URLS = [...]');
  return [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

test('sw.js: parses, versioned augury-v<N> cache, no waiting worker', () => {
  execFileSync(process.execPath, ['--check', path.join(ROOT, 'sw.js')]);
  const sw = read('sw.js');
  assert.match(sw, /const APP_VERSION = '\d+';/);
  assert.match(sw, /const CACHE_NAME = `augury-v\$\{APP_VERSION\}`;/);
  assert.match(sw, /self\.skipWaiting\(\)/);
  assert.match(sw, /self\.clients\.claim\(\)/);
  assert.match(sw, /names\.filter\(\(name\) => name !== CACHE_NAME\)\.map\(\(name\) => caches\.delete\(name\)\)/,
    'activate deletes every older cache');
});

test('sw.js: every precached path exists on disk or is pending (reported)', (t) => {
  const urls = precacheUrls();
  assert.ok(urls.length > 0, 'precache list is empty');
  for (const url of urls) {
    assert.ok(!url.startsWith('/'), `precache path must be relative: ${url}`);
    assert.ok(!url.startsWith('http'), `precache path must not be absolute: ${url}`);
    const rel = url === './' ? 'index.html' : url.split('?')[0];
    existsOrPending(t, rel, 'precached path');
  }
  const stillPending = [...PENDING].filter((rel) => !exists(rel));
  t.diagnostic(`pending list: ${PENDING.size} paths; still missing: ${stillPending.join(', ') || 'none'}`);
});

test('sw.js: app shell and all data modules precached', () => {
  const urls = new Set(precacheUrls());
  for (const rel of [
    'index.html', 'css/base.css', 'css/views.css',
    'js/app.js', 'js/router.js', 'js/rules.js', 'js/compass.js', 'js/share.js',
    'js/tripudium.js', 'js/sortes.js', 'js/sensors.js', 'js/store.js',
    'js/views/rite.js', 'js/views/signsheet.js', 'js/views/tripudium.js',
    'js/views/sortes.js', 'js/views/texts.js', 'js/views/dome.js', 'js/views/helpers.js',
    'fonts/cinzel.woff2', 'fonts/eb-garamond.woff2', 'fonts/eb-garamond-italic.woff2',
    'data/passages.js', 'data/sortes-questions.js', 'data/sortes-table.js', 'data/sortes-decades.js',
    'img/birds/raven.svg', 'img/birds/chickens.svg',
    'manifest.webmanifest', 'favicon.svg', 'icons/apple-touch-icon.png',
  ]) {
    assert.ok(urls.has(rel), `app shell file not precached: ${rel}`);
  }
});

test('sw.js: strategies per PLAN — data network-first, fonts/icons cache-first, rest SWR', () => {
  const sw = read('sw.js');
  assert.match(sw, /request\.mode === 'navigate'\) \{\s*\n\s*event\.respondWith\(networkFirst\(request, 'index\.html'\)\)/);
  assert.match(sw, /url\.pathname\.includes\('\/data\/'\)\) \{\s*\n\s*event\.respondWith\(networkFirst\(request\)\)/,
    'data/*.js network-first');
  assert.match(sw, /includes\('\/fonts\/'\)[^;]*includes\('\/icons\/'\)[\s\S]*?cacheFirst\(request\)/);
  assert.match(sw, /staleWhileRevalidate\(request, event\)/);
  assert.match(sw, /url\.origin !== self\.location\.origin/, 'cross-origin requests untouched');
});

test('sw.js: total precache weight within budget (2 MB)', (t) => {
  const seen = new Set();
  let total = 0;
  for (const url of precacheUrls()) {
    const rel = url === './' ? 'index.html' : url.split('?')[0];
    if (seen.has(rel) || !exists(rel)) continue;
    seen.add(rel);
    total += fs.statSync(path.join(ROOT, rel)).size;
  }
  t.diagnostic(`precache weight: ${total} bytes over ${seen.size} existing files`);
  assert.ok(total < 2_000_000, `precache too heavy: ${total} bytes`);
});

test('manifest: installable, relative, one fallback theme colour, icons exist or pending', (t) => {
  const man = JSON.parse(read('manifest.webmanifest'));
  assert.equal(man.short_name, 'Augury');
  assert.match(man.name, /^Augury/);
  assert.equal(man.start_url, './');
  assert.equal(man.scope, './');
  assert.equal(man.display, 'standalone');
  assert.equal(man.theme_color, '#f3ece0', 'one fallback theme_color: paper (PLAN §9)');
  assert.equal(man.background_color, '#f3ece0');
  assert.ok(Array.isArray(man.icons) && man.icons.length > 0, 'manifest icons missing');
  const purposes = new Set(man.icons.flatMap((i) => (i.purpose || 'any').split(' ')));
  for (const p of ['any', 'maskable', 'monochrome']) assert.ok(purposes.has(p), `manifest needs a ${p} icon`);
  const anySizes = new Set(man.icons.filter((i) => (i.purpose || 'any') === 'any').map((i) => i.sizes));
  assert.ok(anySizes.has('192x192') && anySizes.has('512x512'), 'any icons at 192 and 512');
  for (const icon of man.icons) {
    assert.ok(!icon.src.startsWith('/'), `manifest icon must be relative: ${icon.src}`);
    existsOrPending(t, icon.src, 'manifest icon');
  }
});

test('icons: lituus seal sources + build script cover the full shipped set', () => {
  const LITUUS = 'M50 86 L50 36 Q50 16 67 16 Q82 16 82 28 Q82 39 71 39';
  const favicon = read('favicon.svg');
  assert.match(favicon, /viewBox="0 0 100 100"/);
  assert.ok(favicon.includes(LITUUS), 'favicon carries the lituus stroke');
  assert.match(favicon, /fill="#9b2a1a"/, 'seal red matches the header lituus');
  for (const src of ['icons/src/icon.svg', 'icons/src/icon-maskable.svg', 'icons/src/icon-monochrome.svg']) {
    const svg = read(src);
    assert.match(svg, /viewBox="0 0 512 512"/, src);
    assert.ok(svg.includes(LITUUS), `${src} carries the lituus stroke`);
  }
  // Maskable + monochrome seals sit inside the 80% safe zone (276px at 118).
  assert.match(read('icons/src/icon-maskable.svg'), /<rect x="118" y="118" width="276" height="276"/);
  assert.match(read('icons/src/icon-monochrome.svg'), /<mask id="cut">/);
  // The build script rasterizes exactly the shipped PNG set.
  const build = read('scripts/build-icons.mjs');
  const outs = [...build.matchAll(/out: '([^']+)'/g)].map((m) => m[1]).sort();
  assert.deepEqual(outs, [...PENDING_ICONS].map((p) => path.basename(p)).sort());
  assert.match(build, /icons\/src\/icon\.svg/, 'builds from icons/src/');
});

test('index.html: manifest, icons, theme colours, absolute og/canonical, relative runtime paths', () => {
  const html = read('index.html');
  assert.match(html, /<link rel="manifest" href="manifest\.webmanifest">/);
  assert.match(html, /<link rel="apple-touch-icon" href="icons\/apple-touch-icon\.png">/);
  assert.match(html, /apple-mobile-web-app-title" content="Augury"/);
  assert.match(html, /<link rel="icon" type="image\/svg\+xml" href="favicon\.svg">/);
  assert.match(html, /sizes="32x32" href="icons\/favicon-32\.png"/);
  assert.match(html, /name="theme-color" media="\(prefers-color-scheme: light\)" content="#f3ece0"/);
  assert.match(html, /name="theme-color" media="\(prefers-color-scheme: dark\)" content="#16130f"/);
  assert.match(html, /og:url" content="https:\/\/jakecp\.github\.io\/augury\/"/);
  assert.match(html, /og:image" content="https:\/\/jakecp\.github\.io\/augury\/icons\/icon-512\.png"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/jakecp\.github\.io\/augury\/">/);
  assert.doesNotMatch(html, /(?:href|src)="\/(?!\/)/, 'runtime paths stay relative (only og:/canonical are absolute)');
});

test('js/app.js registers sw.js with a relative path', () => {
  const app = read('js/app.js');
  assert.match(app, /navigator\.serviceWorker\.register\('sw\.js'\)/);
  assert.doesNotMatch(app, /serviceWorker\.register\('\//, 'never from the domain root');
});

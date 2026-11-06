# Augury

A quiet, ad-free, installable website for taking the auspices in the
Roman manner: marking a quarter of sky, keeping silence, watching
birds, and reading what they allow — see [docs/PLAN.md](docs/PLAN.md)
(the spec; every rule cites its passage and evidence tier). Two
companion rites: the **tripudium** (the sacred chickens) and the
**Sortes Astrampsychi** (the oracle-book of numbered lots from Roman
Egypt, all 92 questions and 920 reachable answers). No ads, trackers,
analytics, cookies, accounts or third-party requests; the question
you put before the birds never leaves the tab, never enters a URL or
a share link.

Status: **Phases 1–3 complete** (sources + rules, engine + tests,
UI + design); **Phase 4 (texts) in progress** — passages and the
Sortes land in `data/` batch by batch; **Phase 5 (PWA + polish)**
adds the manifest, icons, service worker, CI and the accessibility
pass described below. The acceptance checklist is PLAN §11.

**Share links:** version-1 record links (`#/record/<code>`, PLAN §6)
decode forever. A shared record shows the verdict printed on the
link; if a newer rules engine would read it differently, the page
says so instead of substituting the new reading.

## Run the site locally

No build step. Serve the repo root with any static server (ES modules
need `http://`; `file://` will not work). The repo carries its own
zero-dependency dev server:

```bash
node scripts/serve.mjs        # http://localhost:8000
# or: python3 -m http.server 8000
```

Routes (hash-based, strict; anything else shows *Hic nihil est*):
`#/` threshold · `#/rite/question` → `#/rite/tradition` →
`#/rite/templum` → `#/rite/watch` → `#/rite/verdict` · `#/record` ·
`#/record/<code>` shared record · `#/tripudium` · `#/sortes`,
`#/sortes/questions`, `#/sortes/lot`, `#/sortes/answer` · `#/texts`,
`#/texts/<id>` · `#/about`.

Compass sensors need a secure context (`https://` or localhost);
over plain `http://` on the LAN the manual bearing controls are the
path, by design.

## Deploy to GitHub Pages

No build step and no Actions workflow are needed to publish — the
repo root *is* the site:

1. Push the repo to GitHub (branch `main`).
2. In the repo: **Settings → Pages → Build and deployment →**
   Source: **Deploy from a branch** → branch **`main`**, folder
   **`/ (root)`** → Save.
3. Wait for the Pages build, then open `https://<user>.github.io/<repo>/`.

`.nojekyll` is present, all runtime paths are relative (the site
works under a `/augury/` prefix or any other root), and CI
(`.github/workflows/test.yml`) runs the tests + content validation +
contrast check + font check on every push — it does not deploy.

**Live URL:** https://jakecp.github.io/augury/ — set in the `og:url`,
`og:image` and canonical tags in `index.html` (the only absolute
URLs; everything at runtime stays relative). Update them if the repo
or domain changes.

## Install as an app (PWA & offline)

The site installs as a standalone app: **Android/Chrome** offers
*Install app* (or *Add to Home screen*); **iPhone/Safari**: Share →
*Add to Home Screen*. It then opens full-screen with the lituus seal
icon and works with no network at all — the whole rite, compass
included, on a hillside.

How it fits together (all paths relative — the site is a project page
under `/augury/`, never the domain root):

- `manifest.webmanifest` — name `Augury`, `start_url` / `scope`
  `./`, `display: standalone`, one fallback `theme_color` (paper
  `#f3ece0`; the two `theme-color` metas in `index.html` handle
  light/dark where supported), and the `icons/*.png` set (`any` +
  `maskable` + `monochrome` for Android themed icons). iOS ignores
  manifest icons, so `index.html` also carries
  `icons/apple-touch-icon.png` (180px, opaque) and the
  `apple-mobile-web-app-*` tags (title `Augury`; status-bar style
  `default`, the readable choice over the light paper background).
- `sw.js` (repo root, registered as `'sw.js'` from `js/app.js`)
  precaches the app shell: HTML, both CSS files, all JS modules, the
  three WOFF2 fonts, `data/passages.js` and the Sortes modules
  (`data/sortes-*.js`), the ink-bird SVGs, the manifest, favicon and
  icons — the installed app carries the whole oracle-book offline
  from first load, though the app itself still lazy-loads the Sortes
  modules on first visit to `#/sortes`. Strategies (the yijing
  freshness contract, adopted whole in PLAN §9): **network-first**
  for navigations and `data/*.js` (cache only as an offline
  fallback), **cache-first** for fonts, icons and the ink birds,
  **stale-while-revalidate** for CSS/JS. Hash routes are
  untouched — the fragment never reaches the worker, so offline
  navigation serves the cached shell and the router takes over.
- **Bumping the version (how updates reach installed copies):**
  whenever *any* precached file changes, bump `APP_VERSION` in
  `sw.js`. On the next visit the browser byte-diffs the changed
  `sw.js`, installs the new worker, precaches into the new
  `augury-v<APP_VERSION>` cache, and on activate deletes every older
  cache (`skipWaiting` + `clients.claim`, so no stale engine lingers
  behind a prompt nobody taps). Forget the bump and the worst case
  is one visit of staleness: network-first pages/data stay fresh,
  and CSS/JS self-refresh in the background.
- `tests/pwa.test.mjs` (in `node --test`) asserts every precached
  path exists in the repo — or is on its explicit *pending* list,
  reported by name, while phase-4 content and the icon PNGs land.
  A typo in the precache list would otherwise fail the whole
  `cache.addAll` install silently on readers' phones.

### Rebuilding the icons

Sources are hand-authored SVGs in `icons/src/` — `icon.svg`
(any-purpose: the lituus, the augur's curved staff, in paper on a red
`#9b2a1a` seal stamped on full-bleed warm paper — the same stroke and
red as the header mark), `icon-maskable.svg` (seal inside the central
80% safe zone) and `icon-monochrome.svg` (lituus knocked out of the
seal, for Android themed icons) — plus `favicon.svg` at the repo root
(full-bleed seal). To rasterize the PNGs after editing them:

```bash
node scripts/build-icons.mjs   # needs Chrome (or CHROME_PATH=…)
```

It drives headless Chrome over CDP (no dependencies; temp files under
`scripts/.cache/`) and writes `icons/apple-touch-icon.png` (180),
`icon-192/512.png`, `icon-maskable-192/512.png`,
`icon-monochrome-512.png` and `favicon-32.png` (from `favicon.svg`,
whose full-bleed seal stays legible at 32px). Commit the PNGs, bump
`APP_VERSION` in `sw.js`, and re-run the tests. Until the PNGs are
built, `tests/pwa.test.mjs` reports them by name as pending icons;
the manifest and worker already point at their final paths.

## Accessibility

Real buttons and labels throughout; landmarks (header / labelled nav
/ main / footer) with a skip button; one `<h1>` per view, headings in
order; focus moved to each step's heading on route change (and the
document title follows); visible `:focus-visible` rings; the verdict
announced once, in text, via a single atomic `aria-live` region —
never by colour alone (the dome's favourable half is washed *and*
lettered SINISTRA/DEXTRA); a named **Announce bearing** button speaks
the current bearing and region on demand, so the rotating dome never
chatters; the sign sheet is a modal dialog that traps focus, closes
on Escape, and returns focus to **There!**; tap targets are at least
48px; the 92 Sortes questions are searchable with theme jumps, not 92
tab stops; `lang="la"`/`lang="grc"` on all Latin and Greek with the
English always adjacent; `prefers-reduced-motion` stills the
chickens, snaps the dome and kills transitions; the whole rite works
without sensors or a pointer. Contrast is checked per *use* in CI
(`scripts/check-contrast.mjs`): every text pair ≥ 4.5:1 in both
schemes (faded notes included, at their composited opacity), bronze
barred from text, and the hairline `rule` colour confined to
decoration. The passes automation cannot do — VoiceOver, TalkBack,
real sunlight at arm's length — are on the PLAN §11 checklist and
remain manual.

## Tests & validation

Requires Node ≥ 22 (for the icon builder's global WebSocket; the
tests themselves run on the standard library alone). No npm
dependencies; `package.json` carries only `"type": "module"` and the
test script.

```bash
node --test                                    # engine, compass, share codec, tripudium, sortes, router, store, views, PWA, a11y, scripts
node scripts/validate.mjs                      # content shapes + per-field licences (phase-4 stubs warn; --strict is the 4c gate)
node scripts/check-contrast.mjs                # PLAN §8 palette, per use, both schemes
scripts/.cache/pyenv/bin/python scripts/build-fonts.py --check   # font cmap coverage, polytonic Greek included
```

CI runs all four (`.github/workflows/test.yml`, Node 22, fonttools
installed for the font check).

## Fonts

Self-hosted subset WOFF2 (Cinzel for verdicts and headings, EB
Garamond for text incl. polytonic Greek; SIL OFL, one licence file per
font in `fonts/`). Rebuild or re-check with `scripts/build-fonts.py`
(Python + fonttools — the one non-Node dev tool, alongside Chrome for
icons). The committed WOFF2 files need no build to serve.

## Licences

Code: MIT ([LICENSE](LICENSE)). Our prose, glosses and translations:
CC BY 4.0; ancient texts and public-domain translations marked per
field in every data record — see [LICENSE-content.md](LICENSE-content.md)
and the editions register in [docs/SOURCES.md](docs/SOURCES.md).

# Augury plan — critical review

Review of `docs/PLAN.md` and `docs/SOURCES.md` (phase 1), checked against the
ancient passages cited, Hercher's 1863 *Sortes* edition, and the working
patterns of the sister project `~/yijing` (CI, service worker, icons, fonts).
Every item is numbered. **Must fix** = wrong, internally inconsistent, or
unimplementable as written; fix before the phase that freezes it.
**Should consider** = will cause rework or mislead users if ignored.
**Nitpicks** = cheap to fix now, annoying later.

**Counts: 20 Must fix (M1–M20), 22 Should consider (S1–S22), 12 Nitpicks
(N1–N12); 54 items in all.**

## The four open questions (§0) — verdicts

1. **Default orientation: agree, Varro.** Varro *LL* 7.7 is the only passage
   that defines all four parts against cardinal points, so it is the only
   orientation the region math can be built on without reconstruction. Keep
   Livy, but label it disputed (M2). Greek and "own" must stay explicitly
   labelled reconstructions in the UI, as planned.
2. **Sortes recension: agree, Hercher — with corrections.** Hercher is the
   only legally clean complete text, and keeping the bishop/monk questions is
   the honest choice. But the plan misdescribes both recensions and what
   kind of edition Hercher is (M3), and omits the prophets who are the whole
   point of the Byzantine form (M4). Fix those, then proceed.
3. **Sortes scope: agree in substance, restate the numbers.** A curated
   subset cannot work: any question × lot can land on a line scattered
   through almost any decade, so all **920 reachable answers** (92 × 10)
   are required for the mechanism. The remaining **110 lines are filler**
   answers that no consultation can reach (M5); transcribe their Greek for
   completeness if cheap, but translating them is optional polish, not part
   of "the mechanism only works with all of it". Gate the commitment on a
   timed pilot of two decades (M18).
4. **Licences: agree.** MIT for code, CC BY 4.0 for original prose and
   translations, public-domain material marked as such is the right stack
   and matches `~/yijing`. Caveats are about provenance evidence (M11) and
   naming the licensor (N11), not the choice of licences.

---

## Must fix

- **M1. "Attested" flattens five different kinds of evidence into one tier.**
  Book 1 of *De Divinatione* is Quintus making the Stoic case *for*
  divination; Book 2 is Marcus demolishing it. *De Legibus* 2 is Cicero's
  *proposed* law-code, not recorded augural law. Plautus *Asinaria* 259–64
  is a slave in a comedy inventing convenient signs (the woodpecker joke
  two lines later undercuts him). Livy 1.7/1.18/1.34 are foundation legends.
  Festus is a 2nd-c. epitome of Verrius Flaccus, further epitomised by
  Paulus in the 8th c.; Servius is 4th/5th c. Yet rows built on each of
  these are all stamped "Attested", and the UI will present them alike.
  *Why it matters:* the site's selling point is honesty about sources; a
  classicist reader will discount everything once Quintus is quoted as
  "Cicero says". *Fix:* add `speaker/genre` and `date` fields to
  `data/passages.js`; in §3 replace the binary Attested/Reconstruction
  with attested-in-what (e.g. "Quintus, *Div.* 1.85", "Cicero's draft law,
  *Leg.* 2.21", "comedy, Plaut. *Asin.* 260"). The About page gets one
  short paragraph stratifying legend / antiquarian gloss / philosophy.

- **M2. The Livy orientation is presented as settled; it is the most
  disputed sentence in augural scholarship.** In Livy 1.18 Numa sits
  facing south (*in lapide ad meridiem versus*); the augur sits *ad
  laevam eius*. That the augur therefore faced east is an inference from
  *dextras ad meridiem partes, laevas ad septentrionem* — a clause
  editors since Conway–Walters have suspected as an interpolated gloss
  (Livy would write *sinistras*, not *laevas*), and others read the whole
  templum as south-facing for lightning, not birds. SOURCES.md notes the
  dispute; PLAN §2's table does not. *Fix:* mark the `livy` row
  **Reconstruction (disputed)** in §2 and in the UI, with one line saying
  Numa faces south in the text and the augur's facing is inferred.

- **M3. §7 mislabels the Sortes recensions, and misdescribes Hercher.**
  Stewart's 2001 Teubner is not the "papyrus recension": Browne 1983 is
  the *ecdosis prior* (papyri); Stewart 2001 is the *ecdosis altera* —
  the medieval/Byzantine recension, i.e. a modern critical edition of
  the *same* tradition Hercher printed. And Hercher is not a manuscript
  transcript: his preface says he based the text on Laurentianus and
  Marcianus 324 with Parisinus 2424 variants, *deleted* oracles he
  judged scribal inventions (*funditus sustuli*), and corrected names
  *ex ingenio*. "Translated faithfully" therefore means "faithful to an
  eclectic 1863 reconstruction". *Fix:* correct the recension labels in
  §7 and SOURCES; add a translation policy: Hercher's text is followed,
  his apparatus variants (L/M/P) are not translated but substantive
  deletions/conjectures affecting an answer's sense get a footnote flag
  in the data.

- **M4. The Sortes mechanism as specified deletes the prophets.**
  §7 reduces the concordance to black number → red number → decade. In
  the Byzantine form each sum belongs to a named prophet/patriarch
  (Hercher prints the Paris table of names with Greek interpretations in
  his preface, pp. IV–VIII; in the papyrus form they are gods — BMCR's
  example: sum 36 → Hephaestus → decade 27). The user is in effect told
  "ask Noah". These names *are* the Christianisation that open question 2
  proposes to keep and explain. *Fix:* `sortes-table.js` must carry
  `{sum, prophet (Greek + English), interpretation, decade}`; the UI
  chain becomes *q + k = s → prophet → decade d, line k*. Decide from
  Hercher's preface table (a composite he assembled from Parisinus
  2424/2421) and say so; do not merge it silently with the bicolour
  number page in the main text.

- **M5. The Sortes numbers and integrity tests assume a perfection the
  tradition may not have.** The arithmetic: 92 questions × 10 lots = 920
  reachable answers; sums run 13–113 (101 distinct sums); 103 × 10 =
  1,030 lines, so **110 lines are unreachable** even if the sum→decade
  table is perfectly injective (90 edge lines in the extreme decades +
  two whole decades). Those 110 are not "blank lots" (§7) — they are
  written filler answers matching no question, there to mystify. The
  proposed tests ("no pair reached by two questions", "tag equals *q*")
  will fail if Hercher's table has any duplicate decade or displaced
  answer, and the tag test is circular if tags are assigned *from* the
  table rather than independently from each answer's wording.
  *Fix:* transcribe the bicolour table in phase 1.5 and publish its
  actual properties before writing the tests; make injectivity a
  *reported* property with a named list of manuscript defects, not an
  assertion. Tag each reachable answer from its Greek wording first,
  then compare with the table. Add Hercher's *second* worked example as
  a test vector (q16, k10 → s26 → decade 58, line 10); §7 currently
  reproduces only the first. Rename "blank lots" to filler answers.

- **M6. Three escape hatches can nullify any sign, including a dire one.**
  In the §3.3 order, "outside templum" and "oblative and declined" are
  applied *before* the DIRA flag, so an eagle-owl at noon can be
  escaped by ticking "beyond the bounds" — a box with no geometric
  definition, since the four quarters already cover all 360° of
  azimuth. The same box lets a user void an *impetrative* sign that
  R-DECLINE deliberately protects. *Why it matters:* R-DIRA claims "AVES
  NON ADMITTVNT, whatever else was seen", which the algorithm as
  written does not deliver. *Fix:* define the templum's actual bounds
  (e.g. front half only, or an elevation/distance criterion recorded at
  declaration time, not per-sign afterwards), decide explicitly whether
  a dire sign can be declined (Pliny *NH* 28.17 and Servius *ad Aen.*
  12.259 support refusing *oblative* signs; cite the latter, which the
  plan misses), and encode the precedence as a small decision table in
  §3.3 that the tests mirror.

- **M7. The share format cannot reproduce a verdict.** §6 leaves
  `<flags>` and the bird codes undefined, and never encodes `vitium`,
  `isDaylight`, `attemptsToday`, or `askedFor[]` — all inputs to
  `interpret()`. It stores both `front` and per-sign `rel` (integer
  degrees), so a bird within ε of the line can round across it and
  change verdicts for the recipient; and because the payload carries no
  rules version, the same link will silently reinterpret under a future
  engine. §5's promise "readers see the same verdict" is therefore
  false as specified. *Fix:* freeze a complete field table before
  phase 2: every `interpret()` input either encoded or provably
  derivable; store `rel` in tenths of a degree (or the classified side);
  add a rules-version byte and state that old links keep their recorded
  verdict string even if re-interpretation differs. Add a test:
  decode → interpret → same verdict, on generated observations.

- **M8. The watch sheet (§5) cannot capture what the engine needs.**
  Nothing on the sheet records a choked raven (R-DIRA), whether food
  actually *fell* (the whole criterion of R-TRIP-ANY and of
  *solistimum*), the Tanaquil stoop (present as flight code `d` in §6,
  absent from the §5 direction list), simultaneous voice+flight, or
  "height not applicable" for a heard or perched bird — yet R-WEIGH
  applies a height factor to every weighed sign. *Fix:* add the missing
  controls (dire detail appears contextually by bird; "food fell to the
  ground?" appears for feeding; height defaults to *n/a* = factor 1 for
  voice/settled), and add a conformance test that every field `interpret`
  reads is settable in the sheet spec.

- **M9. `pointingVector` is named but not specified.** Missing: the Euler
  order and matrix convention; the sign of the `screen.orientation.angle`
  correction (and whether it is applied once or twice if `compass.js`
  also corrects); behaviour near the zenith, where the heading of the
  −Z axis is undefined and will spin (exactly where "high > 50°" signs
  live); negative elevations (phone tilted below horizon currently fall
  into "low"); and the iOS yaw offset, which requires a deliberate
  "lay the phone flat" step that no screen in §5 asks for. Android's
  `deviceorientationabsolute` has no accuracy property at all, so the
  ±25° hint is iOS-only as written. Sensors also need a secure context,
  so the `http://` LAN dev flow will never exercise them.
  *Fix:* write the rotation math out in §2 with 6–8 worked vectors
  (flat/upright × N/E/S/W, 45° tilt, landscape), a zenith rule
  (elevation > 80° → side = `line`/overhead), and the flat-calibration
  UI step; state per-platform accuracy availability.

- **M10. The region math claims precision the inputs cannot support.**
  ε = 2° for "on the line" sits alongside a ±25° "still acceptable"
  compass, uncorrected magnetic declination (up to ±20° by region),
  and freehand aiming error. Meanwhile `sideOf` (halves, used for the
  verdict) and `quarterOf` (quarters, used for display) disagree: a
  bird at rel 40° is displayed *antica* but weighed as right. Varro's
  quarters and Livy's halves are two different systems; the plan uses
  both without saying which the user is looking at. *Fix:* pick halves
  as the operative system (as the dome's favourable wash already
  implies), demote quarters to labels, widen ε or replace it with a
  user-confirmed "straight ahead/behind" choice, and offer a manual
  declination offset (one number, no location needed) with the About
  note adjusted from "the Romans worked by the sun" to stating that
  bearings shown are magnetic.

- **M11. SOURCES proves old *editions* are public domain; the plan will
  actually copy modern *transcriptions*.** The Latin Library states its
  texts were "drawn from different sources… downloaded from various
  sites", are "not intended for research purposes", and gives no
  edition per work — so "Müller, Teubner, 1890s" and "Conway–Walters
  lineage" are guesses, not provenance. Wikisource (Pliny X) and
  Perseus digital texts carry their own terms (CC BY-SA for Wikisource
  contributions): `~/yijing` explicitly used Wikisource for collation
  *only* to avoid importing share-alike text; AUGURY's register plans
  to read Pliny there with no such safeguard. *Fix:* adopt the yijing
  pattern — `scripts/provenance.json` pinning, per work, a scan
  (archive.org ID + page) of the named PD edition, transcribe quotations
  from the scan, and use Latin Library/Perseus/Wikisource only to
  locate and cross-check. Phase 4's "check against a second edition"
  then has something to check against.

- **M12. The register called "Verified in phase 1" has holes exactly
  where PLAN cites.** Gellius *NA* 7.6 is cited for R-HEIGHT but has no
  SOURCES row at all (no edition, no translation plan). Valerius Maximus
  1.4.3 and Livy *Periochae* 19 are cited in §4 with no row. Homer's row
  has no "where read", and "Monro 1902" is not safely separable from the
  Monro–Allen OCT (joint editorship; Allen d. 1950). Falconer is "to
  confirm", Edmonds' dates are "19th c.". *Fix:* before phase 2, add
  the missing rows or delete the citations, pin the Homer text to a
  specific scan, and add a mechanical cross-check (every citation in
  PLAN §3–§4 appears in SOURCES) to the phase-2 content tests so the
  two files cannot drift again.

- **M13. Two load-bearing rules rest on Smith's *DGRA* (1875), breaking
  the register's own rule.** B-OTHER's authority and the tripudium
  `avolant` outcome (flap/cry/fly → NON ADMITTVNT) come from Smith
  s.v. *Augurium* via LacusCurtius — listed in SOURCES as "used for
  orientation only, not quoted as authority". §4 admits `avolant` is
  "to verify in phase 4", but phase 2 builds and tests the outcome
  table first. *Fix:* verify now in the primaries Smith gestures at
  (Livy 10.40, Val. Max. 1.4.3, Festus s.vv. *Oscinum tripudium* /
  *Clivia* — both already in the SOURCES reading list but unused in
  PLAN). If no primary supports the triad, mark `avolant` a
  reconstruction *before* phase 2 freezes its probabilities.

- **M14. `non_pascuntur` → NON ADMITTVNT contradicts the passage the
  plan itself cites for the opposite.** Cicero *Div.* 1.77 (Quintus):
  Flaminius' pullarius advised *quiescendum* — wait — which §3 uses for
  R-NONE → ALIO DIE. §4 uses the same refusal-to-eat for a flat
  prohibition. Both readings exist in the tradition (Pulcher was ruined
  for ignoring a refusal), but the plan cannot cite 1.77 on both sides
  without a sentence explaining the distinction it is drawing (refusal
  as a positive unfavourable sign in the camp rite vs. absence of a
  sign in the sky watch). *Fix:* add that sentence to §4 and R-NONE,
  or map `non_pascuntur` to ALIO DIE and reserve NON for `avolant`.

- **M15. The privacy promises are overbroad and partly self-contradictory.**
  "Sensor data never leaves the device" (§1) is false once the user
  shares: the link encodes front bearing, relative bearings, and the
  start time to the minute. `sessionStorage` survives tab restore and
  browser restart-"reopen closed tab", so "stays on this device" needs
  the plainer "cleared when the tab closes". A shared `#/record/<code>`
  opened in a tab that holds the viewer's own question must never
  display the two adjacently. *Fix:* reword §1 to "nothing leaves the
  device unless you copy a share link; the link contains the time and
  the signs, never the question", show a preview of exactly what a link
  encodes before copying, and add a test that the shared-record view
  renders with `sessionStorage` question present but not displayed.

- **M16. The core watch loop is missing its basic parameters.** No
  duration or end condition is defined (R-NONE fires "by the end of the
  watch" — the user can end after five seconds); no persistence model
  (a killed tab, lock screen, or incoming call during a long outdoor
  watch loses every sign — `store.js` is specified only as try/catch
  wrappers); no edit/delete/undo for a mis-tapped sign; no Screen Wake
  Lock, although R-SILENTIUM voids the watch after 60 s away, which a
  sleeping phone will trigger by itself; and no queueing for a second
  bird while the first sign's sheet is open. *Fix:* specify suggested
  watch length(s) with the timer as elapsed-time, sign list persisted
  to `sessionStorage` on every change with resume-on-load, edit/delete
  in the record sheet, Wake Lock request with graceful absence, and
  vitium detection from `visibilitychange` timestamps (not timers,
  which pause when hidden).

- **M17. Verification is scheduled after the things it verifies are
  frozen.** Phase 2 hard-codes rules whose passages are only "checked"
  in phase 4 (`avolant`, M13; every Latin Library line, SOURCES), and
  the Sortes engine (phase 2) precedes reading the Sortes table from
  page images (phase 4). This guarantees either rework or quietly
  unverified rules. *Fix:* insert a phase-1.5 gate: (a) transcribe the
  Sortes bicolour table and prophet table and settle M4/M5; (b) verify
  the ~12 quotations that carry rules (not glosses) against scans;
  (c) resolve M13/M14. Phase 2 then freezes against checked inputs;
  phase 4 verifies the remaining display passages.

- **M18. Phase 4 is not one phase; it is the project.** Transcribing
  ~1,030 lines of polytonic Greek from noisy OCR against page images,
  translating 920+ answers and 92 questions, plus ~30 Latin passages
  and the About text, is an order of magnitude larger than phases 2, 3
  and 5 combined. `~/yijing`'s lesson — pilot batch, style guide, then
  an *independent* review pass that found 79 and then 133 errors — is
  absent from the phase table. *Fix:* split phase 4 into 4a pilot (one
  full decade + 6 passages, timed, with style guide and a rate estimate
  that re-confirms open question 3), 4b bulk production in batches,
  4c independent fidelity review. Ship order option worth deciding at
  the same gate: augury + tripudium first, Sortes as a follow-on
  release behind the finished engine.

- **M19. The PWA plan diverges from the yijing pattern in the risky
  direction, and has no tests.** Yijing: `skipWaiting` + `clients.claim`,
  network-first HTML/data, stale-while-revalidate CSS/JS, and
  `tests/pwa.test.js` asserting every precache path exists (one 404 in
  `cache.addAll` kills offline entirely). AUGURY §9: cache-first shell,
  a waiting-worker "new edition" prompt the user can ignore forever —
  combined with M7, two visitors can hold different engines and read
  the same shared link differently — and no pwa/manifest/icon tests in
  the §9 test list. *Fix:* adopt yijing's freshness contract whole,
  port its pwa tests (precache paths exist; manifest icons exist and
  are relative; relative SW registration), and document the version
  bump in the same place yijing does.

- **M20. The accessibility spec is a list of intentions; the acceptance
  test cannot detect the likely failures.** Lighthouse ≥ 95 will not
  catch: verdict-by-colour (favourable half = faint red wash; thin red
  timer arc), a rotating dome whose textual equivalent updates only "on
  request" (undefined control), a sign sheet opened from a full-screen
  "There!" button while the user is looking at the sky, focus order
  through 92 Sortes questions, or polytonic Greek read by a screen
  reader with `lang="grc"` but no available voice. Sunlight legibility
  — the stated primary context — is untestable by Lighthouse and
  unaddressed beyond contrast ratios (which do pass: ink 14.8:1, red
  6.5:1, bronze 5.4:1 on paper, light scheme). *Fix:* add concrete
  requirements now: verdict always in text (already), wash never the
  only signal; a named "announce bearing" button; sheet focus trap and
  return; 48 px targets audited per view; a manual AT pass (VoiceOver
  + TalkBack) and an outdoor-glare check on a real phone added to §11.

---

## Should consider

- **S1. The multiplicative weighing invents precision the UI cannot
  explain.** Weight × (1 + log2 *n*) × 1.5 × 1.25 produces strengths like
  8.59 vs 4.31; the gloss is "built from the rule IDs", so the user can
  never see why the 2:1 line was crossed. Consider showing each sign's
  strength and the F/U totals in the record (it is *our* reconstruction;
  displaying it is more honest than hiding it), use exact rational
  arithmetic internally so the boundary tests of R-MIXED are stable,
  and sanity-check the hierarchy: one eagle (3) currently loses to four
  crows in one sign (1 × 3.0 = 3, ×1.25 high = 3.75).

- **S2. R-MODE will discard the commonest real observations.** Most
  corvids are logged by sight, in flight, silent; Festus classifies
  them as *oscines*, so the engine records-but-does-not-weigh nearly
  every raven and crow a user actually sees. Literary omens do use
  corvid flight and direction. Consider weighing wrong-mode signs at a
  reduced factor rather than zero, labelled reconstruction — or accept
  the strictness but warn in the rite copy that a silent crow flying
  over is, for this instrument, nothing.

- **S3. R-PRAEPES and R-HEIGHT probably double-count one ancient idea.**
  Gellius *NA* 7.6, cited for height, reports Nigidius opposing
  *praepes* to *infera* ("the right is opposed to the left, *praepes*
  to the low one") — i.e. height may be *what praepes means*, not a
  second independent multiplier. Ennius' *genus altivolantum* is a
  description of the birds in the Romulus scene, not a rule. Consider
  merging into one factor with the debate shown in the gloss.

- **S4. R-COUNT's curve fights its own founding example.** Six vs twelve
  vultures gives strengths 3.58 vs 4.58 — nowhere near the 2:1 of
  R-MIXED, so Romulus v. Remus replayed through the engine yields ALIO
  DIE. That may be a defensible joke (the plan's gloss hints at it) but
  it should be a *stated* consequence, tested as the canonical case.
  Also define what is counted for *oscines* (birds or calls?) and cap
  the stepper in the UI; §6 allows counts to 99 while the engine caps
  at 12.

- **S5. R-TANAQUIL retells Livy 1.34 as a different event.** The eagle
  snatches Tarquin's cap, circles noisily, and *replaces* it; Tarquin is
  travelling, not auspicating, and Tanaquil interprets a private
  oblative omen. "Stoops to the augur and rises again (×3, never a
  remora)" also collides with R-LINE (a stoop at the observer is on no
  side and near the zenith). Keep it if liked, but describe the story
  accurately in the gloss, and exempt it from R-LINE explicitly in the
  algorithm instead of relying on capture geometry.

- **S6. The Romulus/Remus gloss (R-MIXED) is an analogy, not the same
  situation.** Livy 1.7 is two observers, two *favourable* signs, rival
  claims (priority vs number) — not favourable vs unfavourable signs for
  one question. It also turns on which sign was *first*, but the share
  format stores time to the minute, so same-minute order (and hence the
  gloss) is not preserved for recipients. Either store a sequence index
  or drop the first-sign condition from the gloss trigger.

- **S7. R-SILENTIUM trades on the folk meaning Cicero corrects.**
  *Silentium* is absence of *vitium* (ritual fault), not literal
  silence; the UI copy "silence was broken" will teach the wrong thing.
  And since vitium is checked first in §3.3, backgrounding the app for
  61 s converts even a dire verdict into a postponement — an exploit
  and a trap (M16). Rename the control ("the watch was disturbed /
  a fault occurred"), and record in `decidedBy` what the verdict would
  have been.

- **S8. R-REPEAT licenses auspice-shopping that its citations do not.**
  Livy 8.30/8.32 concern returning *to Rome* to renew a magistrate's
  auspices after a flaw, not re-asking the same question the same
  morning until the answer improves; the verdict screen's "Take the
  auspices again" invites exactly that. `attemptsToday` also has no
  specified storage (localStorage date-keyed counter? does a tripudium
  count?). Keep the feature, define the counter, and consider showing
  Cicero's *auspicia coacta* note from the *second* attempt.

- **S9. Latin bird names are silently equated with modern species the
  user may not have.** *Cornix* is the hooded crow; most users will log
  carrion crows, rooks, jackdaws, American crows. *Buteo* is one
  buzzard, not "hawk/buzzard" generally. *Noctua* vs *bubo* — a distant
  owl at dusk — swings the verdict between weight 1 and dire. Add
  "crow (any) / owl (unsure)" capture options with a stated mapping
  policy, note in About that the table maps Roman categories onto
  nearest modern birds, and give two-line identification hints (size,
  call) under each ink drawing.

- **S10. `isDaylight` from the clock (06–20h) will manufacture dire
  signs.** At British latitudes 19:00 in December is full dark and
  05:00 in June is light; the toggle defaults wrong for months at a
  time, and R-DIRA is the harshest rule in the engine. Ask per sign
  ("seen in daylight?") when a *bubo* is logged, defaulting from the
  toggle; long-term, an optional coarse sunrise/sunset from date +
  user-entered latitude band needs no location permission.

- **S11. The other three classes of signs are missing without a scope
  note.** Roman *auspicia* had five genera (Servius *ad Aen.* 3.89):
  *ex caelo* (thunder/lightning — left-hand thunder the best of all
  signs), *ex avibus*, *ex tripudiis*, *ex quadrupedibus*, *ex diris*.
  A user who hears thunder mid-watch currently has nowhere to put it.
  At minimum, state the exclusion in About; cheaply, add thunder as a
  recordable, not-weighed *ostentum* like the crowing cock.

- **S12. The user is cast as "the augur", but is playing the auspex.**
  At Rome the magistrate *took* the auspices (*auspicari*, with
  *spectio*); the augur advised and inaugurated. Private auspices are
  themselves a debated survival. The site's fiction is fine, but the
  About page (which promises *spectio* and the college) should name
  the conflation in one sentence rather than let the copy teach that
  augurs stood in fields watching birds for personal questions.

- **S13. Font subsetting is specified against tools that cannot do it.**
  "Dev scripts use only Node built-ins, except font subsetting" — Node
  has no built-in subsetter; yijing uses Python + fonttools/brotli with
  a `--check` coverage gate *in CI*. Polytonic Greek (breathings, iota
  subscript, final sigma) must be proven present in the EB Garamond
  subset, glyph by glyph, over 1,000 Sortes lines. Port yijing's
  `build-fonts.py` pattern (pinned source URLs, coverage = every
  character in data + rendered source), run `--check` in CI, and ship
  both fonts' OFL notices (the layout's single `OFL.txt` covers two
  differently-owned fonts).

- **S14. CI runs less than the plan promises elsewhere.** §8 says
  contrast is "checked by a test script", §9's CI runs only
  `node --test`; there is no data-validation step like yijing's
  `validate.mjs`. And the tripudium's "distribution within tolerance
  over a seeded run" is the flakiest way to test a 4-row table: test
  the rng→outcome boundary values exactly (0, 0.399…, 0.40, …) and let
  one long seeded run be a smoke check with a named PRNG algorithm
  (specify one; `Math.random` is unseedable). Wire check-contrast,
  font coverage, and content validation into `test.yml`.

- **S15. Share-link limits contradict each other at the top end.** 200
  signs × ~22 chars ≈ 4.6 KB before base64 (≈6.1 KB after), exceeding
  the 4 KB cap — a valid long watch is unshareable and a recipient's
  decoder calls it "damaged". State whether the cap is pre- or
  post-encoding, set mutually consistent limits (e.g. 60 signs), handle
  the multi-kilobyte URL in messaging apps, and specify the clipboard
  fallback when `navigator.clipboard` is unavailable. Promise (in the
  README) that v1 links decode forever, or version-link rot is built in.

- **S16. The Sortes "extras" need calendrical decisions the plan defers
  silently.** Hercher's favourable hours are Byzantine day-hours
  (Sunday ὥρα γʹ, Thursday ὥρα εʹ, Saturday ὥρα ϛʹ, Tuesday ὥρα γʹ) —
  seasonal/ecclesiastical hours, not 03:00/05:00/06:00 clock time;
  `moonDay()` from a mean synodic month needs an epoch, a rounding
  rule, and a timezone/day-boundary rule (local date vs UTC flips the
  moon-day for evening consultations). Question 13 as a mandatory
  pre-check also loops: if its answer says "not the hour", the UI
  "advises; it never refuses", so say what the user is looking at.
  Decide and document each conversion in §7 as reconstruction.

- **S17. Sortes content needs point-of-use framing, not only About.**
  The 92 questions include recovering a fugitive slave, freedom from
  slavery, adultery, whether the sick person will live, whether a wife
  will miscarry; answers are flat predictions. Grouping them under
  modern theme headings is further editorialising (label it as ours).
  Put the "for reflection and delight, not advice" line on the Sortes
  screen itself, and one sentence of historical framing above the
  slavery questions rather than presenting them as neutral menu items.

- **S18. The tripudium is tuneable into a yes-machine, with no memory.**
  Default "kept hungry" already returns ADMITTVNT 70% of the time;
  "starved" 92%. Cicero's *coacta* gloss appears only for starved, and
  nothing records attempts, so a user can tap until favourable with no
  R-REPEAT-style note and no record/share of the outcome at all.
  Consider: gloss *coacta* for both hungry settings (Cicero's complaint
  is about the custom, not the extreme), count tripudia per day,
  and give the result a record entry like a watch.

- **S19. "Let chance choose" (Sortes) replaces the ancient mechanism
  with a different one.** The text's theology is that the *enquirer
  speaks* the number God puts in his mouth; a crypto-RNG button is
  sortition by machine. Keep it as a convenience, label it ours, make
  the picker injectable like `tripudium(rng)` (a `crypto` global inside
  a "pure" module is untestable as specified), and use rejection
  sampling rather than `% 10` on a byte (256 mod 10 is biased).

- **S20. No size budget for the Sortes data.** 1,030 Greek lines + 920
  English answers + questions + prophet table will be several hundred
  KB of JS; §9 precaches "the app shell and data", so first load on a
  hillside connection pays for the Sortes to use the compass. Set a
  budget, lazy-load `sortes-*.js` on first visit to `#/sortes` and
  runtime-cache it for offline, and test total precache weight in CI.

- **S21. Names and routes are not yet consistent enough to build
  against.** The document is titled *Augur*, the repo is `augury`, the
  cache is `augur-v<N>`, CLAUDE.md expects a project page at
  `/augury/` (or `/augur/` per PLAN §9). Yijing's gotchas apply: the
  repo name must be settled before absolute `og:`/canonical URLs and
  the apple-touch title are written. Also #/record is step "7" between
  verdict 5 and tripudium 6 — renumber the flow table before it is
  copied into code comments.

- **S22. The passage data model needs fields the text already requires.**
  Several passages need *two* English versions (Yonge + our literal
  note; Butler + our literal for *Il.* 12.239–40), a speaker (M1), an
  orthography note (N12), and, for Sortes answers, the apparatus flag
  (M3) and semantic question tag (M5). Designing `passages.js` /
  `sortes-decades.js` schemas in phase 2 with these fields empty-but-
  present is far cheaper than migrating 1,000 records in phase 4.

---

## Nitpicks

- **N1. Citation systems are mixed without a key.** Festus is cited by
  Müller's 1839 pagination ("p. 197 M") while the edition read is
  Thewrewk de Ponor 1889 and the modern standard is Lindsay 1913 (itself
  now public domain in life+70 terms and pre-1931 in the US — the
  better text to quote). Pliny is cited by Mayhoff section while the
  Bostock–Riley translation users will check is organised by chapter.
  Plautus by line in PLAN, by act/scene in most references. Add a
  "citations" note to SOURCES and give Lindsay pages for Festus.

- **N2. No orthography policy.** Quotations mix archaic spellings
  (*deixerit, sunto, inpetrativa*) with modernised text elsewhere, and
  §3.4 prints inscriptional V (ADMITTVNT) while body text uses u.
  One line in SOURCES — "u/v and i/j normalised except in the verdict
  formulae; archaic forms in *Leg.* 2 retained and glossed" — prevents
  a phase-4 consistency pass over every passage.

- **N3. The three verdict formulae are coinages in inscriptional dress.**
  *AVES ADMITTVNT* as an augur's pronouncement is not a quotation:
  Livy 1.36.6 has a subordinate clause about centuries, Plautus a
  slave's joke ("the birds let us go anywhere"), Paulus s.v.
  *Admissivae* a definition. They are good coinages; label the wording
  itself "our formulation" in §3.4 and About, as the honesty policy
  requires for reconstructions.

- **N4. Two bird citations are trimmed past what they say.** Ennius'
  *ter quattuor corpora sancta avium* does not call the twelve birds
  vultures (Livy supplies the species); don't cite Ennius in the
  vulture row for species. Plautus *Asin.* 260 reads *corvos parra ab
  dextera* (plural; Leo) — and puts the ill-omened *parra* on the
  favourable right too, which complicates omitting *parra* as merely
  "unidentified" (barn owl / green woodpecker / lapwing are all
  proposed). Quote the line whole once, in the Texts page.

- **N5. B-HEN conflates three birds.** The *pulli* of the tripudium are
  young chickens of either sex kept in a cage; *praeposteri
  vespertinique cantus* (Pliny 10.49) is *cocks* crowing at the wrong
  time, not hens. Rename the row "Chickens (*pulli*)", and move the
  crowing *ostentum* to the cock explicitly.

- **N6. The Sortes frame is garbled, and the dating is off by a
  century.** The book is not "a gift from Pythagoras by way of
  Alexander": Astrampsychus *sends* it to King Ptolemy, claims
  Pythagoras invented it, and adds that Alexander had used it before
  him (the anachronism is part of the charm). Scholarship dates the
  work's origin to the 2nd–3rd c. AD; the *papyri* run 3rd c. onward.
  §7's worked-example Greek also prints χρησμῷ where Hercher's question
  13 is usually read with ᾳ. Small fixes, all on the same page.

- **N7. Route table numbering (5 verdict, 7 record, 6 tripudium)** is
  out of sequence and `#/sortes …` is the only route left as an
  ellipsis. Enumerate the Sortes sub-routes (list / question / lot /
  answer) now; the router is strict, so unspecified routes become
  not-found pages by default.

- **N8. Claudius Pulcher needs two scholarly footnotes to be safe.**
  *Quoniam esse nollent* — *ēsse* "to eat" needs the macron or a gloss
  or half the readers will parse "since they would not be". And
  Polybius, the main source for Drepana (249 BC), never mentions the
  chickens; the story is later Roman moralising. The About page
  promises scepticism — this is the cheapest place to deliver it.

- **N9. Colour tokens: annotate the failures.** `rule` #cbbfa9 on paper
  is 1.55:1 — fine as decoration, a WCAG non-text failure if it ever
  carries meaning (borders of controls, the lituus stroke). Bronze at
  5.4:1 passes AA but is the first thing to wash out in glare; bar it
  from small text in the token comments so check-contrast can enforce
  per-use thresholds rather than per-pair.

- **N10. The manifest/icon plan is a subset of yijing's for no stated
  reason.** No monochrome icon, no `favicon.svg`/32 px PNG, no icon
  *sources* directory or build script in §9's layout (yijing:
  `icons/src/*.svg` + `build-icons.mjs`). "Theme colours for both
  schemes" in a webmanifest is also not portable — `theme_color` takes
  media queries only in newer Chrome; state the single fallback colour.

- **N11. Licence plumbing.** Yijing uses `LICENSE-content.md`; PLAN says
  `LICENSE-CONTENT` — pick one convention across the user's projects.
  CC BY attribution to "Augur contributors" should name an actual
  licensor (a person) in the file, and mixed-provenance data files
  (PD Latin + CC BY translation in one record) need the per-field
  licence the plan already promises — make the content test require
  the field be non-empty, not merely present in the schema.

- **N12. Festus' own categories in the reading list are unused.**
  SOURCES records reading *Oscinum tripudium*, *Arcula* and *Clivia*;
  PLAN never uses them. *Cliviae* (birds that prohibit an act) and
  *admissivae* are the ancient favourable/unfavourable class names and
  would serve the verdict glosses better than invented terms; either
  use them in §3 or drop them from the register's "passages checked".

---

*Review method: PLAN and SOURCES read in full; quotations spot-verified
against Perseus (Servius *ad Aen.* 6.190–191 and the Festus *Oscines*
list check out exactly as printed), Hercher's preface, method and both
worked examples read in the 1863 scan (Internet Archive
`astrampsychiora00hercgoog`), Sortes arithmetic and colour contrasts
computed, and `~/yijing`'s `ci.yml`, `sw.js`, `scripts/build-*.py/mjs`
and `tests/pwa.test.js` read for the pattern comparisons above. Items
marked as needing verification (M13, M5's table properties) are places
where this review could not confirm the plan's claim from public-domain
sources — which is itself the finding.*



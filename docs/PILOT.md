# Phase 4a pilot — report

Pilot only, as tasked. Deliverables:
[docs/STYLE.md](/Users/jakeproctor/augury/docs/STYLE.md),
[data/passages.js](/Users/jakeproctor/augury/data/passages.js),
[data/sortes-questions.js](/Users/jakeproctor/augury/data/sortes-questions.js),
[data/sortes-table.js](/Users/jakeproctor/augury/data/sortes-table.js),
[data/sortes-decades.js](/Users/jakeproctor/augury/data/sortes-decades.js),
[tests/content.test.mjs](/Users/jakeproctor/augury/tests/content.test.mjs),
and this file. `node --test` passes (86 tests). No UI/engine files
were touched. Four factual corrections were folded into
[docs/PLAN.md](/Users/jakeproctor/augury/docs/PLAN.md) (§6 below);
nothing else in PLAN/SOURCES was edited.

## 1. What is in the pilot (counts)

| File | Records | Complete | Stubs |
|---|---|---|---|
| [data/passages.js](/Users/jakeproctor/augury/data/passages.js) | 47 | 6 | 41 |
| [data/sortes-questions.js](/Users/jakeproctor/augury/data/sortes-questions.js) | 92 (n 12–103) | 12 (n 12–23) | 80 |
| [data/sortes-table.js](/Users/jakeproctor/augury/data/sortes-table.js) | 103 (sums 13–115) | 103 | 0 |
| [data/sortes-decades.js](/Users/jakeproctor/augury/data/sortes-decades.js) | 103 decades × 10 | 2 decades (20 lines) | 101 decades |

Pilot passages: `varro-ll-7-7-8`, `livy-1-18-6-10`, `cic-div-1-85`,
`cic-div-2-71-73`, `cic-nd-2-7`, `livy-10-40` — all fields filled.
Pilot decades: **8 and 18**, chosen because they are the decades of
Hercher's two worked examples; both examples now reproduce exactly
through `consult()` against the real data
([tests/content.test.mjs](/Users/jakeproctor/augury/tests/content.test.mjs)).

Sortes mechanism, as validated on the real table: 920 reachable
(decade, line) cells, 110 unreachable, no duplicate routes, no
missing sums 13–113, no tag mismatches in the pilot decades.
Decade 8 line 10 is a translated filler line (tagged q103 by
wording, reachable by nobody: sum 21, line 10 would need q11).

Hercher pagination for 4b (archive.org hercgoog scan): printed
Arabic page = PNG number − 13 (p014 = p. 1 … p061 = p. 48, decade
103); preface Roman page = PNG − 5. Questions: printed pp. 4–7
(p017–p020). Decades: pp. 7–48. Decade 8: p. 10 (p023). Decade 18:
p. 14 (p027).

## 2. Rate estimate for the rest

These are unit estimates derived from the pilot's work structure
(transcribe from image → translate → tag/licence → data entry →
self-check), not stopwatch timings; treat hour figures as planning
ranges (±50%) and re-baseline after the first 4b batch.

| Remaining work | Units | Assumed rate | Estimate |
|---|---|---|---|
| Sortes answers | 1,010 lines (901 reachable + 109 filler) | 2.5–4 min/line in decade batches | 42–67 h |
| Sortes questions | 80 (n 24–103) | ~3 min each (incipits already located in cache notes) | ~4 h |
| Sortes table | done; 4c numeral re-check only | — | ~2 h (in 4c) |
| Passages | 41 stubs | 1.5–3 h each, incl. provenance pinning | 60–120 h |
| Moon table, prayer, method frame | transcribed in cache notes; needs translation polish + a data home (§5) | — | ~3 h |
| **4b production total** | | | **≈ 105–190 h** |
| 4c independent review | all of the above | 30–50% of production (yijing's pass found first 79, then 133 errors) | ≈ 35–90 h |

Why answers go at that rate: lines average ~6 Greek words, most
decades hold a descending run of questions (decade 8: q20…q12;
decade 18: q25…q16), which makes wording-first tagging fast once
the pattern is seen — but every line still needs its apparatus
entry read (deletions hide there), and manuscript-displaced lines
(decade 58's L-variants are wholesale different answers) will
routinely break the pattern and cost more.

Batching recommendation: Sortes in batches of 10 decades (100
lines); passages in batches of ~6, augury/tripudium first per PLAN.
**Filler recommendation at the gate: translate all 110.** They cost
the same per line as reachable answers (~5–7 h total), they are
already in the transcription workflow line-by-line, and any future
correction to the three uncertain numerals (§4) would otherwise
leave untranslated Greek on a newly reachable route.

Blocking fetches only the lead can make (no network in the
sandbox): Mayhoff Pliny + Bostock–Riley scans (no Pliny exists
locally at all — §4), Thilo–Hagen Servius, Hertz Gellius, Kempf
Valerius Maximus, Rossbach *Periochae*, Monro–Allen Homer, Lindsay
Festus 1913, Bohn scans to pin Yonge/Spillan/Edmonds. Until those
land in `scripts/.cache/sources/` + `scripts/provenance.json`
(still absent), roughly 15 of the 41 passage stubs cannot be
filled honestly, and every pilot Latin text stays provisional (§3).

## 3. Judgement calls for the lead to check

In rough order of consequence. Each is also recorded where it
lives (STYLE or the record itself).

1. **No Pliny pilot passage — substituted `cic-div-1-85`.** The
   task suggested Pliny *NH* 10.20 or 28.17, but no Pliny text —
   Latin or English — exists in `scripts/.cache/sources/` (proved
   by search; the only Pliny Latin anywhere locally is the two
   fragments PLAN itself quotes for 28.17). Writing a "complete"
   Pliny record would have meant reconstructing from memory,
   against the provenance rule. *NH* 10.20 and 28.17 ship as
   stubs. Needs the fetches in §2.
2. **New tier `balbus`.** *ND* 2.7 is spoken by Balbus, not
   "Marcus" (PLAN §4, corrected — §6). PLAN §3 has no tier for
   him, and relabelling him `marcus` would invert his stance, so
   the record uses tier `balbus` and the test whitelists it with a
   comment. PLAN §3 needs a tier row (lead's call: new tier, or
   fold into `quintus`-parallel wording). Stubs for Suetonius,
   Valerius, *Periochae*, Gellius carry nearest-tier values
   (`history`/`technical`) that should be confirmed at the same
   time.
3. **Pilot Latin is provisional.** All six Latin texts are
   transcribed from Latin Library finding aids and Gutenberg/OCR
   English, labelled as such in every `orthography` field,
   because no pinned scans exist yet (Hercher is the only pinned
   pilot source). u/i normalisation (STYLE §5) was applied
   mechanically at build time. The 4c collation must re-transcribe
   every line; expect small divergences (e.g. finding-aid
   *quilubet*, *adhibetur* number clash at *Div.* 2.72, Yonge's
   illegible *terripavium* spelling, taken from the Latin).
4. **Edmonds printed before his life dates are confirmed.** The
   Livy 10.40 record prints Edmonds (Bohn 1850) with a licence
   string that states the open `verify:`, per SOURCES's "yes
   (subject to verify)". If dates fail, SOURCES's fallback is to
   retranslate 10.40 — our literal note already covers its rule
   sentences, so the swap is contained. Related: Gutenberg's
   header credits Spillan *and* Edmonds jointly for Books 9–26,
   against SOURCES's Edmonds-only row; resolve against the Bohn
   title page when pinned.
5. **Questions rendered as direct questions.** Greek εἰ-clauses
   become "Will I…?" (STYLE §6). This changes syntax for UI
   usability; person/tense are preserved (q19 present: "Am I
   fortunate?"). If the lead prefers literal "whether…", only
   the `en` fields change.
6. **Table includes sums 114–115.** Hercher prints 103 sums
   (13–115); consultations reach only 13–113. Rows 114–115 are
   included as printed (harmless to `consult`, honest to the
   edition). Sum 13 has no prophet name and 23 rows have no
   interpretation; blanks are recorded as empty strings, never
   supplied (Pitra's conjectured *Ezekiel* at sum 13 not used).
   UI note: at sum 13 the answer view will show an empty prophet
   name before the interpretation — the UI agent may want a
   fallback label (described here, not implemented: `js/` is
   off-limits this phase).
7. **Apparatus policy applied strictly.** All 20 pilot lines
   carry `apparatus: null`: neither pilot decade contains a
   Hercher `* *` deletion or an *ex ingenio* conjecture changing
   the sense. Sense-changing *manuscript* splits exist (decade
   8 line 2: printed μακράν "long" against LM μικρόν "a little")
   but do not raise the flag under PLAN's wording. If the lead
   wants those flagged too, amend PLAN §7 + STYLE §8 together;
   bulk batches will meet the case constantly.
8. **Licences in Sortes files are file-level exports.** PLAN §7
   fixes Sortes record shapes without licence fields, so each
   `sortes-*.js` exports `licences = {grc, en}` instead of
   growing per-record fields the engine/UI do not expect.
   Passage records carry true per-field licences. If per-record
   licences are wanted in Sortes data, that is an engine/shape
   change for the lead to schedule (not made here).
9. **Name identifications:** Ἰησοῦς (after Moses) rendered
   *Joshua*; Ἰουδίδ rendered *Judith*; Βηρσεβεέ left as
   transliteration *Bersebee*. Uncertain printed spellings
   (§4) are transliterated, not normalised.
10. **Varro record spans 7.7–7.8** (not 7.7 alone) so the
    *conceptio* formula the rite screen adapts is in the same
    record; corrupt formula words are printed unemended and
    translated only as far as they construe (STYLE §2).

## 4. OCR and reading problems found

DjVu OCR (both Hercher copies) is a locating aid only; every pilot
Greek line was read from the PNGs. Concrete failure classes:

- **Numerals destroyed.** ϛ (6) / ζ (7) / ϟ (90) collapse into
  `5`, `(`, Latin gibberish; question numerals come out as
  `ty.`, `ὅ ἐς`, `&&`. This is exactly how ιη (18) became "58":
  OCR renders the method's τὸν ιη as "τὸν τη". Any numeral from
  OCR is unsafe; the permutation check (decades 1–103, each
  once) is the pilot's guard and passed.
- **Three numerals stay uncertain at scan resolution** and are
  the top 4c re-checks: sum 71 → decade read as single ϟ = 90;
  sums 39/112 → decades {96, 97} certain as a pair, assignment
  (39→96, 112→97) resting on the ϛ/ζ glyph distinction.
- **Tables lose row alignment.** OCR reads the preface table's
  name column, then the interpretation column, as separate
  blocks; the bicolour page is essentially random Latin.
- **Letters.** κ read as χ/x throughout (προχόψω, χληρονομήσω;
  sense-changing τεχνώσω for printed τεκνώσω); εἰ unstable;
  planet glyphs on printed p. 3 lost entirely (weekdays/hours
  were settled from the Greek names, not the symbols); apostrophes
  and iota subscripts unreliable.
- **Two printed forms, one phrase.** Question 13: list (p. 4)
  prints χρησμᾷ with alpha — enlarged crops show the narrow
  single-loop letter against the broad ῷ of the preceding τῷ —
  while method prose (p. 3) prints χρησμῷ. Cache notes disagreed;
  the crops settle it. Data follows the list; prose form belongs
  to the not-yet-written frame passage.
- **Worked-example wording split.** Decade 8 line 5 prints
  μετὰ χρόνου (apparatus: χρόνον M); the method page quotes
  μετὰ χρόνον. Data and tests use the decade form; PLAN quotes
  the method form. Both are "correct" at their own locus.
- **Latin finding aids.** Latin Library typos confirmed in span
  (*phdosophi* at *Div.* 1.84, *quilubet*, no section numbers in
  Varro/Livy HTML — all § breaks in pilot records are
  conventional, flagged in `orthography`). Yonge OCR: stray `©`,
  hyphen splits, running heads interleaved. Edmonds Gutenberg:
  *solistinum* [sic] in the translator's footnote, "then coop"
  [sic]; the footnote is excluded from the data translation and
  discussed in our literal note. Festus cache file is Thewrewk
  1889 OCR, **not** the Lindsay 1913 SOURCES names as copy-text;
  its *Oscines* join-word (*alites*?) cannot be settled from OCR.

## 5. Engine/spec changes described, not made (js/ off-limits)

- `tests/sortes-fixture.mjs` hard-codes decade 58 for sum 26
  (`OVERRIDES = {21: 8, 26: 58}`). The fixture's own tests pass
  (they test fixture arithmetic), but the comment claiming to
  mirror Hercher's examples is now false for example 2. Change
  58 → 18 (and decade 58 references in `tests/sortes.test.mjs`)
  with the engine owner's commit; our content test asserts 18
  against real data in the meantime.
- `js/sortes.js` comment says favourable hours are to be verified
  "against Hercher p.1": the values are **correct** (Sunday 3,
  Tuesday 3, Thursday 5, Saturday 6), the locus is printed p. 3.
- **Moon-day advice has no data home.** The 30-day table is
  transcribed and verified (printed p. 3; working transcription
  in `scripts/.cache/pilot/hercher-table.md` §5): days 1,7,13,15,
  21,22 morning; 4,6 all day; 16,18 third hour; 3,5,8,19,20,24,27
  "do not use"; the rest evening. `isPropitious` already accepts
  injected `moonAdvice`; 4b needs a decided home (new data module
  or a `sortes-table.js` export) — PLAN §7/§9 currently name
  neither. Same for the Byzantine prayer + method frame: Greek
  transcribed in cache notes, no record shape decided (passage
  record with `lang: 'grc'` would fit the existing model).
- **Deleted lines (`* *`) need a bulk policy before 4b.** Hercher
  prints some lines as `* *` with the transmitted wording only in
  the apparatus (e.g. 51.1, 63.2/7, 103.1/10). If any such line is
  reachable, `consult` will land on it. Recommendation: `grc`
  carries the transmitted apparatus wording with a non-null
  `apparatus` note ("Hercher deletes this line; manuscripts
  read…"), not the asterisks — lead to confirm in PLAN §7.
- Sum 13's empty prophet (see §3.6) is a display case for the UI
  agent.

## 6. PLAN citations the texts contradicted

Fixed in PLAN.md in this phase (factual errors only):

1. **Worked example 2: decade 58 → 18** (§7). Method text,
   preface table (Ἐνώχ → 18), bicolour page (κϛ → ιη), and
   decade 18 line 10 all agree; decade 58 line 10 reads λήψῃ
   ὀψώνιον καλῶς (answer to q72 by wording). The προκόψεις
   wording at 58.10 exists only as the L variant in Hercher's
   apparatus. Root cause: ιη/νη glyph confusion, as PLAN's
   `verify:` anticipated.
2. **"Marcus, Cic. *ND* 2.7" → Balbus** (§4). *ND* 2 has no
   Marcus; the passage argues *for* the auspices.
3. **Favourable-hours locus "Hercher p. 1" → printed p. 3** (§7;
   values unchanged).
4. **Q13 `verify:` resolved** (§7): list χρησμᾷ, prose χρησμῷ.

Reported, not edited (lead's wording/code, not factual slips in
the spec's own terms):

5. PLAN §7 "Sums run 13–113" describes consultations correctly
   but not the printed tables, which run to 115 (§3.6).
6. PLAN quotes example 1's answer with χρόνον (method form);
   the decade prints χρόνου (§4). No correction needed, but any
   future quotation should say which locus it quotes.
7. Livy 10.40 contains no flap/cry/fly-off outcome, and neither
   Festus *Oscinum tripudium* nor *Clivia* (as read in the
   Thewrewk OCR) mentions one — the §4 `avolant` outcome's
   hoped-for primaries look weaker than Smith's gesture
   suggested. It is already labelled Reconstruction; expect it
   to stay one after Lindsay/Valerius are read in 4c.
8. Tier cells: `js/rules.js` (`RULE_EVIDENCE`) includes
   `reconstruction` components for R-CLEAR, R-REPEAT, R-MIXED
   that PLAN §3.2's tier column does not state. The code looks
   right in substance (§3.4 on verdict wording); align the table
   text when the tier question (§3.2 here) is settled.
9. SOURCES's Festus copy-text claim (Lindsay 1913) is not yet
   true of the local cache (Thewrewk 1889 OCR only), and
   `scripts/provenance.json` does not exist. No pilot quotation
   depends on Festus.

## 7. 4b passages

All 47 records in [data/passages.js](/Users/jakeproctor/augury/data/passages.js)
are now complete (6 pilot kept as approved + 41 completed); no PLAN
citation lacked a record, so none was added. Each record gained a
`source` field (edition + page/section + cache file), pinned again in
[scripts/provenance.json](/Users/jakeproctor/augury/scripts/provenance.json)
(yijing pattern, with sha256/bytes of the first cache file per pin).
Coverage tests live in the new
[tests/passages.test.mjs](/Users/jakeproctor/augury/tests/passages.test.mjs)
(separate file, per the Sortes-run constraint); the passage block in
[tests/content.test.mjs](/Users/jakeproctor/augury/tests/content.test.mjs)
had its stub-emptiness assertion replaced by non-emptiness — the only
edit there, and it will conflict trivially if the Sortes run rewrites
that block.

Translations: verbatim PD English is printed only where it was
extracted word-for-word from the cache (Butler for Homer; Spillan for
Livy 1.7, 1.34; plus the pilot Yonge/Spillan/Edmonds). Every other new
record carries our literal translation (STYLE §2), even where SOURCES
also allows Yonge/Bostock–Riley — their cache OCR was not proofed to
reproduction standard in this run, and inventing their wording from
memory would have been worse. Swapping in proofed PD versions later
touches only `translations`; lead to decide whether 4c does that
proofing. Bird-rule IDs (`B-*`) were added to the passages that source
them (chiefly `fest-oscines`) so every ID in `js/rules.js` has a
passage, with the test asserting full coverage and no exceptions.
`R-WEIGH` is attached to `livy-1-7-1` as supporting context only
(competing signs weighed by priority against number); the record's
orthography note states the arithmetic itself remains reconstruction.
`R-LINE` is attached to `livy-1-18-6-10` on PLAN's own rationale
("Livy's line divides the halves").

### verify: notes resolved in 4b

Resolved (PLAN/SOURCES corrected in place): Festus Müller→Lindsay
pages and scan pin (`bwb_C0-AXI-081`); *Sinistrae aues* /
*Silentio surgere* lemmata confirmed (Lindsay pp. 502–504, 524);
Gellius, Valerius Maximus, *Periochae* editions/scans pinned
(Hertz–Hosius 1903; Kempf 1888, 1.4.3 at p. 19; Rossbach 1910,
*Per.* 19 at pp. 23–24); Homer printing/scan pinned (OCT 1902 vol. I,
`owb_YO-BSA-064_1`); Pliny chapter equivalences for 10.33 (ch. 15)
and 10.34–35 (ch. 16); the `avolant` check (below).
Still open, unsettleable from the local texts: Conway–Walters on
Livy 1.18 (no scan); Servius 3.89 locus (Thilo vol. I absent — cache
holds 6–12 only) and 12.259 lemma wording (OCR corrupt); Hagen,
Hertz, Kempf, Rossbach, Monro/Allen, Spillan, Edmonds, Falconer dates
(not in the texts; need reference lookup with network); Sortes table
numbers (the other run's files); device γ-sign check (not a text).

### Rules the texts contradicted (PLAN corrected; engine untouched)

1. **`avolant` has no primary.** Val. Max. 1.4.3: the chickens "would
   not come out of the cage" (*non exire cauea pullos*) and the jibe
   is direct speech there alone ("Quia esse nolunt, bibant"). Festus
   *Oscinum tripudium* (Lindsay p. 197) defines a voice-sign.
   *Cliviae* was not located in either Festus OCR. PLAN §4 now
   states the settled negative; whether the outcome stays in
   `js/tripudium.js` is the lead's call — `js/` was off-limits.
2. **R-PRAEPES' Festus quotation is Paulus' epitome, not Festus.**
   Lindsay's Festus text (*fest-praepetes*) presents *praepetes* as a
   disputed etymology ("quidam… alii…"), not the neat "quae se ante
   auspicantem ferunt". PLAN §3.2 now says so. The single-factor
   reconstruction is unaffected in arithmetic but its "attested term"
   framing should keep the dispute visible, as the record does.
3. **Servius 6.190/6.191 quotations in PLAN could not be
   letter-verified** in the Thilo vol. II OCR (too corrupt at those
   loci); records print the received wording and flag it. If 4c image
   collation finds different wording, R-TEMPLUM/R-ASK source cells
   need rewording — flagging for the lead, not silently harmonising.

### Judgement calls for the lead

- Records flagged in `orthography` as finding-aid / corrupt-OCR /
  received-form (`serv-aen-*`, `gell-na-7-6` body, `livy-per-19`,
  `fest-admissivae-cliviae` *Cliviae* half, Homer Greek) are complete
  in shape but must not be quoted as letter-exact until 4c reads the
  scan images. That is ~8 records; the rest are OCR/TEI-confirmed
  with corrections listed per STYLE §9.
- `cic-div-2-85`'s fig-seller span begins at §84 in the finding aid;
  citation kept as PLAN's 2.85 with the boundary noted.
- Pliny 10.49 prints *tripudia solistima* (plural); PLAN §4's
  *"horum sunt tripudia solistima"* is correct as printed there.
- Tier `balbus` and nearest-tier stubs from the pilot (§3.2 above)
  are unchanged and still await the lead's PLAN §3 decision.

## 7. Phase 4b — Sortes completion (Greek + English)

All Sortes text is now complete. Greek was transcribed in batches
of ~10 decades from the Hercher page images
(`scripts/.cache/sources/hercher-pages/p014–p061.png`; OCR used only
to locate lines), translated per [docs/STYLE.md](/Users/jakeproctor/augury/docs/STYLE.md),
assembled into the data files, and checked with `node --test`
(111 tests, all passing at the end of the phase). Batch JSON is
retained under `scripts/.cache/work4b/` with the assembler
(`assemble.mjs`) that produced the data files, so every line can be
traced to its batch. Pilot records were preserved verbatim:
re-transcription of decades 8 and 18 from the images in 4b agreed
with the 4a pilot on every field (0 diffs) — an independent
corroboration of the pilot.

### Counts

| File | Records | Complete |
|---|---|---|
| [data/sortes-questions.js](/Users/jakeproctor/augury/data/sortes-questions.js) | 92 (n 12–103) | 92 Greek + English + themes |
| [data/sortes-table.js](/Users/jakeproctor/augury/data/sortes-table.js) | 103 (sums 13–115) | as 4a, plus sum-13 `note` |
| [data/sortes-decades.js](/Users/jakeproctor/augury/data/sortes-decades.js) | 103 × 10 = 1,030 lines | 1,030 Greek + English (all 110 filler lines translated too) |
| [data/sortes-moon.js](/Users/jakeproctor/augury/data/sortes-moon.js) | 30 moon days + 4 favourable hours | new in 4b (Hercher printed p. 3) |
| [data/sortes-frame.js](/Users/jakeproctor/augury/data/sortes-frame.js) | 3 passage-shaped records | new in 4b (Hercher printed pp. 1–3) |

Mechanism on the real data (`validateSortesData`): no errors, 920
reachable (decade, line) cells, 110 unreachable, no duplicate
routes, no missing sums. Every one of the 920 consultations lands
on a complete, non-filler answer; the content test asserts this
exhaustively. Lead decisions applied: fixture decade 58 → 18 in
[tests/sortes-fixture.mjs](/Users/jakeproctor/augury/tests/sortes-fixture.mjs)
and [tests/sortes.test.mjs](/Users/jakeproctor/augury/tests/sortes.test.mjs);
deleted (`* *`) lines carry the transmitted wording in `grc`/`en`
with an apparatus note (below); the two new modules were added to
PLAN §7/§9; sum 13's empty prophet is recorded as a blank with a
`note` field for the UI to display.

### Apparatus notes: 19

By kind: **11 Hercher deletions** (`* *` in his text; `grc`/`en` =
the transmitted apparatus wording, note gives his *responderi
debebat* remark) — 36.1, 46.1, 51.1, 63.2, 63.7, 82.3, 88.4, 88.5,
91.5, 103.1, 103.10; **2 Hercher additions** — 43.9 (πίστεως added,
*addidi*), 95.4 (μετά added); **6 corrupt/suspect printed texts** —
40.3, 47.5, 92.8 (*verba corrupta*), 68.3 (μᾶλλον *suspectum*),
95.7 (printed οἱ unconstruable), 97.10 (μωροποιεῖ doubted). Of the
11 deleted lines, 4 are reachable (46.1, 51.1, 63.7, 103.10), so
the adopted policy was load-bearing: without it those
consultations would have landed on asterisks. The content test
pins the exact list. Ordinary L/M/P variants — including the many
sense-changing manuscript splits and wholesale displaced L answers
(cf. decade 58 in §5 of the pilot) — do not raise the flag, per
STYLE §8; the noteworthy ones are listed as doubtful readings
below.

### Tag defects: 12 mismatches + 10 untaggable lines (reported, not hidden)

Tags were read off each line's wording before the table was
consulted. `validateSortesData` then reports 12 disagreements
between wording and routing. They are kept as tagged and pinned
by name in [tests/content.test.mjs](/Users/jakeproctor/augury/tests/content.test.mjs)
(`TAG_DEFECTS`): 46.1 (a deleted line), 27.3, 22.10, 58.6, 58.7,
58.8 (the decade-58 displacement: 58.7/58.8 read as a swapped
pair), 26.9, 67.7, 72.9, 51.1 (deleted), 51.5, 103.10 (deleted).
Three further alerted lines were re-tagged on purely lexical
grounds — δέδοται (43.1) and ἑτέρῳ (64.5, 66.10) are q76's
distinctive words (εἰ δοθήσεταί μοι ἑτέρῳ συναλλάξαι) — and are
not defects. Ten lines are tagged `null` because their wording
names no single question: six bare "you will inherit" lines
(1.7, 6.1, 7.6, 17.10, 59.5, 90.9 — the table happens to route
all six to q62, εἰ κληρονομήσω τὸ πρόσωπον, but the object is
absent from every one of them) and four deleted filler lines
about working (63.2, 82.3, 88.4, 91.5; Hercher says each "ought
to have answered question 13"). `consult()` does not read tags,
so none of this affects a consultation; it is the tradition's
defect list, as PLAN §7 intends.

### Doubtful readings for the lead (4c collation list)

In rough order of consequence:

1. **τοῦ κλήρου (q96 and its 13 tagged answers) is rendered
   inconsistently**: 9 lines "the clergy", 4 "the lot" (51.8,
   54.2, 73.4, 77.1), and q96 itself "the lot". STYLE §7 fixes
   κλῆρος = "lot" for the spoken number; in q96's context the
   Byzantine "clergy" sense is at least as likely. The lead
   should pick one sense for q96's family and a later batch can
   harmonise; 4b did not silently harmonise 14 records.
2. **Byzantine office/loan words left transliterated** across
   batches: κομητᾶτον/κομητάτον (*komitaton*; q78 and answers),
   βιοπράγος (*biopragos*; q85's English says "merchant" —
   possibly a slave-dealer; answers transliterate), δεκάπρωτος
   (q95 descriptive "one of the ten chief men"; answers
   *dekaprotos*). λεγάτον (q92) is rendered "legacy" (*legatum*).
   One policy for the three would be cleaner.
3. **Deleted-line choices where the manuscripts split**: 91.5
   (second hand of M ἐὰν ἐργάζῃ ὠφελεῖ adopted; L reads a sailing
   answer duplicating line 6); 103.10 tagged 90 from its
   transmitted wording although Hercher's note says 93; 51.1
   tagged 73, Hercher's note says 102; 46.1's note as read says
   "ought to have answered 21" where the wording is plainly q48
   (γονεῖς) — small-type numeral, re-check in 4c.
4. **95.7**: printed οἱ before νικήσεις does not construe
   (apparatus-flagged). If it is a misprint for οὐ the sense
   reverses. Translated as printed as far as it construes.
5. **Sense-changing manuscript splits not flagged** (STYLE §8),
   most sharply: 94.4, 99.2, 100.8 (printed 2nd vs LM 3rd person
   σωθήσ- swaps the q42/q54 reading); 57.3 and 69.3 (printed
   "be rid of" vs LM "be reconciled to"); 63.5 (opposite senses);
   63.7's rM variant μοιχὸς οὐκ εἶ against transmitted μοιχὸς εἶ
   (recorded inside that line's apparatus note); 55.5/60.1
   (active/passive πωληθ- splits); 103.5 (LM wholly different
   line). If the lead wants these flagged too, STYLE §8 and this
   list are the starting point — the pilot's §3.7 question,
   still open.
6. **Single-word reading/sense doubts** (Greek best-read from the
   images, listed for 4c): q41 σοφιστείσω; q69 παραβόλον (image;
   OCR παραβόλιον); q60 οἰκονομήσω "become a steward"; q67/95.3
   ἐπίκλησις "appeal"/"invocation"; q82 προσγραφήσεται
   "confiscated"; q89 λάθος…τῷ δρασμῷ; 53.4 προτελευτήσεις;
   54.2/56.4 δυνηθῇ; 68.6 δωρεάν (Hercher queries it); 101.1's
   in-line overlined numeral γ transcribed as plain γ ("third
   hour" in English).
7. **Frame/moon minutiae**: the four planet glyphs on printed
   p. 3 are transcribed ♂♃♄☉ by weekday equivalence (glyphs not
   certainly legible at scan size; stated in the record's
   `orthography`); πρωΐας and ὥρᾳ τρίτῃ pointing in the small
   moon-table type follows the pilot; the method's `**` lacuna
   after κληρούμενος is kept in both columns.
8. **Accent-level residue**: grave/acute and iota-subscript detail
   before enclitics and in small apparatus type sits at the limit
   of the scan resolution throughout (the pilot's §4 classes).
   4c should re-collate accents line by line; letters and senses
   are not in doubt where this applies. Batch-level doubtful-item
   lists were returned for the questions, decades 51–70 and
   91–103, and moon/frame; the corresponding lists for decades
   1–50 and 71–90 were not preserved from the batch run, so for
   those ranges the data's apparatus flags are the only residue
   record — 4c should treat those decades as unreviewed at
   accent level. The assembler's own spot checks (printed p. 7
   questions 87–103 + decade 1 lines 1–8; printed p. 48 decade
   103 including both `* *` apparatus entries) agreed with the
   data letter for letter.

### 4b → UI

For the agent working on UI/PWA (`js/` was off-limits this phase;
nothing below was implemented):

1. **Load the two new modules with the Sortes payload.** `js/app.js`
   currently lazy-imports `sortes-questions.js`, `sortes-table.js`,
   `sortes-decades.js`. Add `../data/sortes-moon.js` and
   `../data/sortes-frame.js` to that import group (and to the
   service-worker list in `sw.js`, which names the three existing
   modules, with the usual cache-version bump). Sizes: decades
   ≈258 KB, frame ≈21 KB, questions ≈17 KB, table ≈23 KB, moon
   ≈6 KB.
2. **Moon advice is ready to inject**: `moonAdvice` from
   `data/sortes-moon.js` is the 30 English strings in day order —
   pass as `isPropitious(date, { moonAdvice })`. For a richer
   display use `moonDays` (`{day, grc, en, slot}`; `slot` one of
   morning/evening/all-day/third-hour/do-not-use) and
   `favourableHours` (`{weekdayGrc, weekdayEn, weekday, hour, grc,
   en}`), which the content test keeps in agreement with
   `FAVOURABLE_HOURS` in `js/sortes.js`. Suggested Greek cite in
   UI copy: "Hercher 1863, printed p. 3".
3. **Prayer/frame display**: `framePassages` in
   `data/sortes-frame.js` holds `sortes-frame-letter-method`,
   `sortes-prayer`, `sortes-hours-moon-intro`, in the same shape
   as `data/passages.js` records but with tier `sortes-frame`
   (a new tier string the texts view does not know yet). PLAN §7
   wants the prayer shown translated as optional text on the
   Sortes screen; the method record also carries Hercher's two
   worked examples if an About/how-it-works panel wants them.
4. **Sum 13**: when `consult()` returns sum 13, `prophet` is
   `{grc: '', en: ''}` by design. The table row now has a `note`
   field ("Hercher prints no prophet name for sum 13…"); `consult`
   does not surface it, so read it from the table row (or extend
   `consult`'s return) and display it where the prophet name
   would stand.
5. **Apparatus footnote mark**: 19 answer lines now carry a
   non-null `apparatus` string (list above; 4 of them reachable
   deleted lines whose Greek/English are the manuscripts'
   wording, not Hercher's asterisks). PLAN §7: show a footnote
   mark on such answers; the string is display-ready English.
6. **Stale comment**: `js/sortes.js` still says "verify: against
   Hercher p.1 in phase 4a" above `FAVOURABLE_HOURS`. Values are
   correct; the locus is printed p. 3 (pilot §5, repeated here
   because `js/` remains untouched).

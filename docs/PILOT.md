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

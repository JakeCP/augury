# Sources, editions, translations, licences

The rule for this site: **ancient text** (public domain everywhere) +
**old edition** (editor dead > 70 years and published before 1931, so public domain in the
US and in life+70 countries) + **old translation** (same test) or **our own translation**
(CC BY 4.0). A source that fails the test is never used, even for one sentence.

Begun in phase 1 (2026-11-05) by fetching the texts and checking passages cited in
`docs/PLAN.md`. Revised in phase 2 without network access: anything below that could
not be re-checked against a page scan in the sandbox is marked `verify:` and is
settled in phase 4c, against scans fetched by the lead into `scripts/.cache/sources/`.

**Provenance rule (the yijing pattern).** This register proves old *editions* are
public domain; what the site prints must be a transcription of *that edition*, not of
a modern web transcription of guessed lineage. In phase 4 each work is pinned in
`scripts/provenance.json` to a scan (archive.org ID + page) of the named PD edition;
quotations are transcribed from the scan. The Latin Library, Perseus and Wikisource
are used **only to locate and cross-check** — Wikisource for collation only, so no
CC BY-SA wording ever enters our text. Until a pin exists, "where read" below is a
finding aid, not provenance: the Latin Library itself says its texts were drawn from
various sites and are not intended for research, and gives no edition per work, so
lineages like "Müller, Teubner, 1890s" are plausible guesses, nothing more.

## Latin and Greek texts (all public domain)

| Work | Edition used | Editor dates | Where read | Passages checked |
|---|---|---|---|---|
| Cicero, *De Divinatione* | Latin Library text (C. F. W. Müller, Teubner, 1890s) | Müller 1830–1903 | thelatinlibrary.com/cicero/divinatione1, 2 | 1.27–29, 1.77, 1.85, 1.107–8, 1.120; 2.70–74, 2.76–77, 2.82, 2.85 |
| Cicero, *De Legibus* | Latin Library | — | thelatinlibrary.com/cicero/leg2 | 2.21, 2.31 |
| Cicero, *De Natura Deorum* | Latin Library | — | thelatinlibrary.com/cicero/nd2 | 2.7 |
| Livy, *Ab Urbe Condita* | Latin Library (Weissenborn–Müller / Conway–Walters lineage) | — | thelatinlibrary.com/livy/liv.1, 8, 10 | 1.7.1, 1.18.6–10, 1.34.8–9, 1.36.3–6, 8.30.2, 8.32.4, 10.40.2–14 |
| Varro, *De Lingua Latina* | Latin Library (Goetz–Schoell 1910 lineage) | Goetz 1849–1932, Schoell 1850–1919 | thelatinlibrary.com/varro.ll7 | 7.6–8 (*templum*, *partes quattuor*, *conceptio* formula) |
| Pliny, *Naturalis Historia* | Mayhoff, Teubner 1906/1909 | 1841–1914 | la.wikisource (Liber X — **collation only**, never copied; the scan pinned in `provenance.json` is the copy-text); Perseus (28.4–5); Latin Library (Liber II) | 2.142; 10.6, 10.20–21, 10.30, 10.33–37, 10.40, 10.43, 10.49; 28.17 |
| Festus / Paulus, *De verborum significatu* | **Lindsay, Teubner 1913** (copy-text from phase 4; PD in the US and, Lindsay d. 1937, in life+70 countries. Phase 1 read Thewrewk de Ponor 1889; Müller 1839 pages are still cited alongside Lindsay pages until 4c completes the cross-reference) `verify:` Lindsay scan ID + pagination for each lemma in 4a | Lindsay 1858–1937; Thewrewk de Ponor 1838–1917 | archive.org `deverborumsignif00festuoft` (OCR, read against context) | *Oscines*, *Oscinum tripudium*, *Praepetes*, *Remores*, *Inebrae*, *Admissivae*, *Clivia/Cliviae*, *Sinistrum* (all now used: *Oscinum tripudium* and *Clivia* for PLAN §4/`avolant`; *Admissivae*/*Cliviae* as the gloss terms). *Arcula* was read but is **not used**; it stays here only as a record of reading. *Sinistrum* / *silentio surgere* lemmata for R-SILENTIUM `verify:` in 4c |
| Servius, *in Vergilii Aeneidem* | Thilo–Hagen 1881 | Thilo 1831–1894 `verify:` Hagen dates | Perseus 1999.02.0053 | 6.190, 6.191; 3.89 (five genera — `verify:` section number); 12.259 (refusing oblative signs — `verify:` lemma text) |
| Gellius, *Noctes Atticae* | Hertz, Teubner 1883–85 `verify:` edition/scan in 4a (Marshall's OCT is in copyright and is never copied) | Hertz 1818–1895 `verify:` | to pin in `provenance.json` (phase 4) | 7.6 (*praepes* vs *infera*; PLAN R-PRAEPES) |
| Valerius Maximus, *Facta et dicta memorabilia* | Kempf, Teubner 1888 `verify:` edition/scan in 4a | Kempf d. 19th c. `verify:` dates | to pin in `provenance.json` (phase 4) | 1.4.3 (Claudius Pulcher; candidate primary for tripudium `avolant` — PLAN §4) |
| Livy, *Periochae* | Rossbach, Teubner 1910 `verify:` edition/scan in 4a | `verify:` editor dates | to pin in `provenance.json` (phase 4) | *Per.* 19 (Drepana / Pulcher epitome) |
| Plautus, *Asinaria* | Latin Library (Leo/Lindsay lineage) | — | thelatinlibrary.com/plautus/asinaria | 259–264 |
| Suetonius, *Tiberius* | Latin Library | — | thelatinlibrary.com/suetonius/suet.tib | 2.2 |
| Ennius, *Annales* (quoted by Cicero) | as Cicero above | — | *Div.* 1.107–8 | *servat genus altivolantum*; *laeva volavit avis*; *ter quattuor corpora* |
| Homer, *Iliad* | Monro–Allen OCT (1902/1920 printing to be pinned to **one specific scan** in `provenance.json`; "Monro 1902 alone" is not separable from the joint Monro–Allen editorship) `verify:` printing, scan ID, and Allen death date (d. 1950 as usually given; life+70 then expired 2020) in 4a — until pinned, quote nothing from an unidentified web text | Monro 1844–1905 `verify:`; Allen 1862–1950 `verify:` | to pin in `provenance.json` (phase 4); phase 1 worked from the received text tradition with Butler (below) as control | 12.237–43 |
| *Sortes Astrampsychi* | **Hercher**, *Astrampsychi Oraculorum Decades CIII*, Berlin 1863 — an **eclectic reconstruction of the Byzantine recension** (*ecdosis altera* tradition), based on Laurentianus + Marcianus 324 with Parisinus 2424 variants; Hercher deleted oracles he judged scribal (*funditus sustuli*) and corrected names *ex ingenio*. Not the papyrus recension and not a manuscript transcript; PLAN §7 states the translation policy (printed text followed; sense-changing deletions/conjectures flagged per answer) | 1821–1878 | archive.org `astrampsychiora00hercgoog`, `astrampsychiora00gymngoog` | Method + both worked examples (pp. 1–3), prophet/interpretation table (preface pp. IV–VIII, composite from Parisinus 2424/2421 — used as such and not merged silently with the bicolour number page), questions list, decades sampled; bicolour table + full decades to be transcribed from page images in 4a–4b. `verify:` all table numbers in 4a–4c |

Notes:
- The Latin Library text has typos (e.g. *Div.* 1.108 "*cedunt ce caelo*" for *de caelo*;
  "*phdosophi*"). Under the provenance rule above it is never the copy-text at all:
  phase 4 transcribes from the pinned scans and uses web texts only to find and
  cross-check lines. Phase 4c re-checks every quoted line against its scan.
- The Livy 1.18 inauguration: Numa faces south (*in lapide ad meridiem versus*), the
  augur sits on his left (*ad laevam eius*) and — in the clause editors have suspected
  as a gloss (*laevas* where Livy would write *sinistras*) — assigns right = south,
  left = north, from which an eastward-facing augur is inferred. This is the most
  disputed sentence in augural scholarship, not a settled datum: PLAN §2 offers the
  Livy orientation labelled **Reconstruction (disputed)**, Varro as default.
  `verify:` Conway–Walters discussion against the scan in 4c.
- **Not used**: Browne (1983), the *ecdosis prior* from the papyri, and Stewart's
  Teubner (2001), the *ecdosis altera* — a modern critical edition of the *same*
  Byzantine tradition Hercher printed — both still in copyright; Stewart & Morrell's
  English (in Hansen, *Anthology of Ancient Greek Popular Literature*, 1998), also in
  copyright. Hercher (1863) is our only Sortes copy-text.

## Citations and orthography

- **Festus/Paulus** is cited by Lindsay (1913) page from phase 4, with Müller's 1839
  page ("p. 197 M") kept alongside until the cross-reference is complete; PLAN
  currently gives Müller pages. **Pliny** is cited by Mayhoff book.section; the
  Bostock–Riley translation readers will check is organised by chapter, so Texts-page
  entries give the chapter equivalence where it differs (`verify:` per passage in
  4a). **Plautus** is cited by line (Leo/Lindsay numbering), with act/scene added on
  the Texts page. Cicero *Div.* citations always name the speaker (Quintus in book 1,
  Marcus in book 2); *Leg.* citations are labelled Cicero's draft law. See the tiers
  in PLAN §3.
- **Orthography**: u/v and i/j are normalised to modern usage (u, i) everywhere
  **except** the inscriptional verdict formulae (AVES ADMITTVNT). Archaic forms in
  *Leg.* 2 (*deixerit, sunto, inpetrativa/inpetrativa* spellings as printed) are
  retained and glossed, with an `orthography` note in the passage record. Greek is
  printed polytonic as in Hercher/the OCT, including *ēsse*-style quantity marks only
  in our own glosses (e.g. Claudius Pulcher's *ēsse* "to eat"), never silently
  inserted into a transcription.

## English translations

| Work | Translation | Translator dates | Status | Where | Use |
|---|---|---|---|---|---|
| Cicero, *Div.*, *Leg.*, *ND* | C. D. Yonge, *The Treatises of M. T. Cicero* (Bohn, 1853) | 1812–1891 | **PD** | archive.org `treatisescicero00ciceuoft` | yes. Yonge paraphrases freely; where he obscures a technical term (e.g. calls the *pullarius* "a poulterer"), we print Yonge **and** a literal note of our own |
| Cicero, *Div.* | W. A. Falconer, Loeb 1923 | `verify:` translator dates | PD in US (pub. 1923); life+70 to confirm | — | **not used** (Yonge suffices; no need to risk it) |
| Livy 1–8 | D. Spillan (Bohn, 1849) | d. 1854 `verify:` | **PD** | Gutenberg #19725 (finding aid; copy-text pinned to the Bohn scan in `provenance.json`) | yes |
| Livy 9–26 | Cyrus R. Edmonds (Bohn, 1850) | `verify:` translator dates in 4a; publication 1850 in any case makes the *edition* PD everywhere that matters, but the translator's life+70 term must be confirmed before use, else translate 10.40 ourselves | **PD** (subject to `verify:`) | Gutenberg #10907 (finding aid; Bohn scan to be pinned) | yes (10.40), subject to `verify:` |
| Pliny, *NH* | J. Bostock & H. T. Riley (Bohn, 1855) | 1773–1846; 1816–1878 | **PD** | Perseus 1999.02.0137 | yes (incl. 28.17, checked) |
| Plautus | H. T. Riley (Bohn, 1852) | 1816–1878 | **PD** | to fetch in phase 4 | yes |
| Homer, *Iliad* | Samuel Butler (1898) | 1835–1902 | **PD** | Gutenberg #2199 | yes for 12.243 ("one omen, and one only…"); for 12.239–40 Butler drops the right = dawn link, so **our own** literal version sits beside it |
| Varro, *LL* | R. G. Kent, Loeb 1938 | 1877–1952 | not safely PD | — | **not used: our own translation** |
| Festus | none PD | — | — | — | **our own** |
| Servius | none PD | — | — | — | **our own** |
| Suetonius, *Tib.* 2.2 | J. C. Rolfe 1914 (d. 1943) is PD in US and life+70; still protected in some life+100 countries | — | — | — | **our own** (one sentence; no risk) |
| Gellius, *NA* 7.6 | J. C. Rolfe, Loeb 1927 (d. 1943) would be PD in US/life+70 `verify:` — not relied on | — | — | — | **our own** (one gloss passage; no need to test the Loeb) |
| Valerius Maximus 1.4.3 | none relied on | — | — | — | **our own**, if quoted (its first job is verifying `avolant`, PLAN §4) |
| Livy, *Per.* 19 | none relied on | — | — | — | **our own** (epitome sentence), if quoted |
| Ennius (via Cicero) | Yonge 1853 | — | PD | — | yes, plus our literal gloss |
| *Sortes Astrampsychi* | none PD (Stewart & Morrell 1998 is in copyright and is not used, even as a crib to copy) | — | — | — | **our own**: all 92 questions + 920 reachable answers (110 filler lines per the 4a gate), CC BY 4.0 |

## Secondary (public domain, used for orientation only, not quoted as authority)

- W. Smith (ed.), *A Dictionary of Greek and Roman Antiquities* (1875), s.v. *Augurium*
  (LacusCurtius). Orientation only — **never quoted as authority for any rule**. Two
  rules once rested on it and no longer do: B-OTHER now stands on Cic. *Div.* 2.76 plus
  a labelled reconstruction, and the tripudium `avolant` outcome (flap/cry/fly) is
  labelled **Reconstruction** in PLAN §4 until the primaries Smith gestures at
  (Livy 10.40, Val. Max. 1.4.3, Festus s.vv. *Oscinum tripudium*/*Clivia*) are checked
  against scans in 4c. The five-genera list is cited to Servius, not Smith.
- A. H. J. Greenidge, *Roman Public Life* (1901), on *impetrativa*/*oblativa*.
  Orientation only; the rules cite Livy and Servius.

Every work cited in PLAN §3–§4 now has a row above (including Gellius, Valerius
Maximus and the *Periochae*, missing in phase 1). A mechanical cross-check in the
test suite (`tests/docs.test.mjs`, growing into the phase-4 content tests) keeps it
so; if a citation is ever added to PLAN without a row here, the suite fails.

## Fonts (SIL Open Font License 1.1)

- Cinzel (Natanael Gama), inscriptional capitals — own notice, `fonts/Cinzel-OFL.txt`.
- EB Garamond (Georg Duffner, Octavio Pardo), text, Latin + Greek — own notice,
  `fonts/EBGaramond-OFL.txt`.
  Subset by `scripts/build-fonts.py` (fonttools, yijing pattern) with pinned source
  URLs recorded in `scripts/provenance.json`; `--check` in CI proves every rendered
  character (polytonic Greek included) survives. Two differently-owned fonts never
  share one OFL file.

## Licences for this project

- Code: MIT (`LICENSE`, © Jake Proctor).
- Our own prose, glosses, translations and ink drawings: CC BY 4.0
  (`LICENSE-content.md` — yijing's filename convention), licensor **Jake Proctor**
  (a person, not a project alias), credited "Augury — Jake Proctor, CC BY 4.0"
  with individual contributors named in that file as they join.
- Public-domain texts and translations: marked "Public domain" with edition and date
  **per field** in `data/passages.js` / `data/sortes-*.js` and on the Texts page —
  one record routinely mixes PD original, PD translation and CC BY literal note, and
  the content test requires every licence field to be non-empty.

# Content licences — texts, translations, drawings, fonts

`LICENSE` (MIT) covers the site's code. This file covers everything else.
It records what we rely on; it is not legal advice. The full register of
editions, translators and dates is [docs/SOURCES.md](docs/SOURCES.md);
source pins (archive.org ID + page per work) live in
`scripts/provenance.json` from phase 4, and every data record carries its
licence per field.

## Ancient texts (Latin and Greek) — public domain

The underlying works (Cicero, Livy, Varro, Pliny, Festus/Paulus, Servius,
Plautus, Suetonius, Gellius, Valerius Maximus, Homer, the *Sortes
Astrampsychi*) are ancient and in the public domain. Transcriptions are
made from the public-domain editions pinned in `scripts/provenance.json`
(editor dead > 70 years, published before 1931): e.g. Mayhoff's Pliny
(1906/1909), Lindsay's Festus (1913), Thilo–Hagen's Servius (1881), and
Hercher's *Astrampsychi Oraculorum Decades CIII* (Berlin, 1863 — an
eclectic edition of the Byzantine recension; Hercher's own deletions and
conjectures are flagged in the data where they change an answer's sense).

Web transcriptions (Latin Library, Perseus, Wikisource) are used only to
locate and collate — Wikisource for collation only, so no CC BY-SA wording
is copied into our texts.

Attribution shown: "Latin/Greek text: [edition]. Public domain."

## Public-domain English translations — public domain

- Cicero: C. D. Yonge (Bohn, 1853; d. 1891).
- Livy: D. Spillan (Bohn, 1849) and Cyrus R. Edmonds (Bohn, 1850).
- Pliny: J. Bostock & H. T. Riley (Bohn, 1855).
- Plautus: H. T. Riley (Bohn, 1852).
- Homer: Samuel Butler (1898; d. 1902).

Each is transcribed from its pinned scan and shown under its translator's
name. Where a public-domain rendering obscures a technical term, our own
literal note (CC BY 4.0, below) is printed beside it — the two are always
labelled separately, and the data record licenses each field separately.

## Our prose, glosses and translations — CC BY 4.0

The site's own writing — the About page and glosses, our literal notes, and
our complete English translations of Varro, Festus, Servius, Suetonius,
Gellius, and the *Sortes Astrampsychi* (all 92 questions and 920 reachable
answers) — is © Jake Proctor and contributors, licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The licensor is
Jake Proctor.

Attribution shown: "Translation: Augury — Jake Proctor, CC BY 4.0."

## Ink drawings and the lituus mark — CC BY 4.0

The bird drawings, sky-dome art and lituus seal are original work for this
site, © Jake Proctor and contributors, CC BY 4.0 as above.

## Fonts — SIL Open Font License 1.1

The self-hosted subset WOFF2 fonts in `fonts/` are derived from:

- **Cinzel** — © Natanael Gama. Licence: `fonts/Cinzel-OFL.txt`.
- **EB Garamond** — © The EB Garamond Project Authors (Georg Duffner,
  Octavio Pardo). Licence: `fonts/EBGaramond-OFL.txt`.

Subsets are built by `scripts/build-fonts.py` (phase 3), which also
verifies that every character the site renders — polytonic Greek included —
is present.

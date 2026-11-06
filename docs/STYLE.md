# Style guide — our English (Latin passages and the Sortes Greek)

Phase 4a. Applies to everything labelled ours in
[data/passages.js](/Users/jakeproctor/augury/data/passages.js) and the
Sortes data files: our full translations, our literal notes beside
public-domain translations, verdict glosses, and question/answer
wording. Public-domain translations (Yonge, Spillan, Edmonds) are
printed as their authors wrote them and are outside this guide except
for transcription (§9).

Method, on the yijing pattern: style guide first, then a pilot, then
batches, then an independent fidelity review. A glossary rendering
changed here is changed in every record already written; no local
synonyms for a fixed term. The source of record is always the
original-language text in the same record; a public-domain translation
in the record is a second witness, never the copy from which our
wording is taken.

## 1. Register and voice

Plain modern English, dry, never winking. The site is a well-made
instrument, not a joke app; the humour, where it exists, is the
ancient authors' own (Marcus, Plautus, Claudius Pulcher) and needs no
help from us.

- British spelling: *favour, favourable, honour*; verb *practise* only
  if it ever arises.
- Short words where they are accurate. Prefer *bird* to *feathered
  augury*, *forbid* to *portend refusal*.
- No fortune-teller diction: banned are *auspicious/inauspicious*
  (use *favourable/unfavourable* — see §7), *portent* as a verb,
  *bode*, *lo*, *behold*, *the heavens decree*.
- No archaism: no *thou/thee/hath/doth*, even in prayers and
  formulae. The Byzantine prayer is translated in the same modern
  register as everything else.
- No advice-column voice. An answer that says the enquirer will not
  recover is translated exactly so; we do not soften it, and we do
  not add reassurance. The framing line *for reflection and delight,
  not advice* does that work on the screen, once.
- Speakers keep their stances. Quintus arguing *for* divination,
  Marcus demolishing it, Balbus for the Stoics, Cicero drafting laws,
  and a slave inventing signs in a comedy are different witnesses;
  never flatten any of them to "Cicero says". Translations preserve
  irony and hostility where the Latin has them (Marcus on the
  caged chickens is contemptuous; translate the contempt).

## 2. How literal

Literal first, readable always. The test is accountability: every
English content word answers to a Latin or Greek content word, or is
small supplied grammar (subject, article, connective) that English
needs and the original drops.

- Keep the concrete thing concrete. *Offa* is a lump of soft cake,
  *puls* is porridge-cake, a beak is a beak. Never upgrade a thing
  into an abstraction ("sustenance", "offering") unless the original
  is itself abstract.
- Keep the syntax's direction. An indirect question, a condition, a
  purpose clause stay what they are; indirect statement does not
  become direct speech (the Pulcher witticism is indirect in every
  Latin witness and stays indirect in ours).
- Supplied words name no new thing and add no new event. Where a
  supplied word carries real meaning, or a choice between two live
  renderings had to be made, the literal-note entry or the batch
  notes say so.
- Ambiguity in the original stays ambiguous in English where English
  allows it. The argument for one reading goes in a literal note,
  never as a bracketed aside inside the translation (see §6).
- Corrupt or unconstruable original (Varro's *conceptio* formula) is
  translated as far as it construes, the unconstruable words are
  left in Latin, italic, and one clause says the words are corrupt
  in transmission. A smooth invention is a worse fault than an
  admitted gap.
- Numbers, measures, sums are never rounded or "made natural".
  Greek alphabetic numerals in the Sortes become Arabic numerals in
  data fields (`n`, `sum`, `decade`) and are spelled out only in
  prose.

### Two kinds of our English in passage records

1. **Our translation** (`label: 'Augury (literal)'`): a complete
   rendering of the quoted span. Used where no public-domain
   translation is printed (Varro, Festus, Servius, Suetonius,
   Gellius, the Sortes).
2. **Our literal note** (`label: 'Augury literal note'`): printed
   beside a public-domain translation. It gives the literal wording
   of the clauses on which a rule turns and restores the technical
   terms the older translator domesticated (*pullarius*, not
   "poulterer"; *tripudium solistimum*, not "fed voraciously").
   It does not retranslate the whole span, and it never corrects
   the older translator's text in place.

## 3. Names: gods, prophets, people, places

- **Gods.** Roman names in their usual English forms: *Jupiter*
  (Latin *Iuppiter*), *Mars*. Greek *θεός* in the Sortes is *God*
  where the Byzantine Christian sense is plain (§4), *the god* or
  *god* where the older oracular sense is doing the work; the
  choice is made per line and is reviewable in the batch notes.
  *Τὸ θεῖον* is *the divine*.
- **Sortes prophets.** The Greek column prints Hercher's form
  exactly (Ἀζουρᾶ, Μεμφιβοσθέ), never normalised to the familiar
  biblical spelling. The English column gives the standard English
  name where the figure is securely identifiable (*Adam, Eve, Noah,
  Moses, Samson, Deborah, Solomon*) and a plain transliteration
  where it is not (*Azoura, Odorram, Sarasar*). One person, one
  English form, list-wide; Χάμ is *Ham* at both of its sums.
  Hercher's conjectural name corrections are translated as printed;
  the rejected manuscript form belongs in the batch notes, not the
  data.
- **Interpretations** of names are translated literally, however
  fanciful the etymology (they are name-glosses in the Jerome
  tradition, not translations to be improved): Καϊνᾶν, κτῆσις —
  *Cainan — "possession"*.
- **People.** Usual English forms of well-known names (*Numa,
  Papirius Cursor, Claudius Pulcher*); a Latin spelling variant in
  the quoted text (*Clodius* for *Claudius* in *ND* 2) is kept in
  the Latin, glossed once, and the English uses the usual form.
  Praenomina are expanded in English prose (*Publius*), kept
  abbreviated (*P.*) only inside literal renderings of formulae.
- **Birds** take the English of the engine's table (*raven* for
  *corvus*, *crow* for *cornix*, *little owl* for *noctua*,
  *eagle-owl* for *bubo*, *woodpecker* for *picus*, *chickens* for
  *pulli*), and never collapse two Latin birds into one English
  word. Unidentified birds stay Latin in English text: *parra*,
  *sanqualis*, *inmusulus*.

## 4. The Byzantine Christian elements

Kept, translated straight, and explained once in the About text —
never paganised back, never modernised, never played for a laugh.

- Questions about becoming a bishop, a cleric, a presbyter are
  translated with those words: *bishop* (ἐπίσκοπος), *cleric*
  (κληρικός), *elder/presbyter* (πρεσβύτερος — *presbyter* where
  office is meant, with the Greek beside it). *Κληρικός* is never
  "clergyman", which imports a later church.
- The prayer before consulting is translated in full, *Amen*
  included, angels named (*Michael, Gabriel, Raphael*). *Κύριε* is
  *Lord*; *ὁ δοῦλός σου* is *your servant* (not "slave" in the
  prayer's mouth, and not softened to "I who serve you").
- Prophets and patriarchs stay prophets and patriarchs. We do not
  restore the papyrus recension's gods, and we do not call the
  figures "saints" — Hercher's word is *prophetae*.
- Where Hercher prints no prophet name (sum 13) or no
  interpretation, the data records the blank as a blank. Pitra's
  conjectured *Ezekiel* for sum 13 is not supplied in data; it may
  be mentioned in prose as a conjecture, attributed.

## 5. Orthography

- **Latin** is printed with **u** and **i** only (no consonantal
  *v* or *j*): *Iuppiter, uelato, nauigauerunt*. This is a recorded,
  mechanical normalisation of the copy-text's letterforms; it
  changes no word. Archaic spellings that are part of the text's
  substance are retained and, where they could mislead, glossed:
  *deixerit, sunto* in the draft laws, *septemtrionem* in Varro,
  *adclarassis* in Livy's prayer. The `orthography` field of a
  passage record states what was normalised and what was kept.
- **Inscriptional exception.** The verdict formulae alone keep
  Roman capitals with V for U: AVES ADMITTVNT, AVES NON
  ADMITTVNT, ALIO DIE. They are our formulation in inscriptional
  dress and are never used as a model for quoted Latin.
- **Greek** is polytonic, exactly as Hercher prints it: breathings,
  accents, iota subscript, final sigma. Hercher's overlines on
  numerals are not reproduced (data numerals are Arabic). Two
  printed forms of the same phrase in two places (χρησμᾷ in the
  question list, χρησμῷ in the method prose) are each transcribed
  where they stand; harmonising them is falsifying the edition.
- Quantity marks (*ēsse* "to eat") appear in our glosses only,
  never inside a transcription.
- Transliteration, where English prose needs a Greek word, is
  simple and consistent: *chresmos* is not needed — prefer the
  English (*oracle*) with the Greek in parentheses on first use.
  Latin terms kept in English prose are italic, lower-case unless
  proper: *templum, tripudium, pullarius, silentium*.

## 6. Punctuation and presentation

- Modern punctuation in our English. Quoted ancient text keeps the
  edition's punctuation; public-domain English keeps its author's.
- Square brackets in our English mark supplied words only, and are
  used sparingly — usually the supplied subject or a name. They
  never carry commentary. No footnote markers, daggers (except the
  Sortes `apparatus` mark the UI adds), or parenthetical asides
  inside a translation.
- Sortes questions: Greek indirect questions (*εἰ …*, "whether …")
  are rendered as direct questions in English, because in the UI
  they are a menu the enquirer chooses from: εἰ πλεύσω ἀκινδύνως —
  *Will I sail without danger?* Person and tense distinctions in
  the Greek are preserved (present εἰμι becomes *Am I …?*, a
  third-person question stays third-person). The Greek stands
  beside every question, so the conversion hides nothing.
- Sortes answers: second-person statements, one sentence where the
  Greek has one clause. Prohibitions stay prohibitions (*μὴ
  ἀποδημήσῃς* — *Do not go abroad.*), conditions stay conditions
  (*ἐὰν πλεύσῃς …* — *If you sail now, …*). Formulaic qualifiers
  keep fixed forms (glossary, §7): ἄρτι *now*, μετὰ χρόνου *after
  a time*, βραδέως *slowly*, ταχέως *soon*.
- Verse (Ennius, Homer) is translated as prose sentences unless a
  public-domain verse/prose version is printed; we do not buy
  rhyme or metre with padding.

## 7. Verdict-related and technical terms (fixed glossary)

One rendering per term, everywhere: data, glosses, About page.

| Latin / Greek | Our English | Note |
|---|---|---|
| *aves admittunt* (our formula) | The birds allow it. | Verdict gloss; the Latin formula is ours (§5). |
| *aves non admittunt* | The birds do not allow it. | |
| *alio die* | On another day. | Never "postponed" without the Latin. |
| favourable / unfavourable | favourable / unfavourable | Always these; never *(in)auspicious, lucky, ill-omened* as verdict words. |
| *admissivae* (birds) | *admissivae*, "allowing" birds (first use) | Afterwards the Latin alone. |
| *cliviae* | *cliviae*, "prohibiting" birds (first use) | |
| *dira / dirae* (sign) | dire (sign) | Kept as the technical adjective; glossed "dire: forbidding outright" once. |
| *sinistra / dextra* | left / right | Region names in capitals in the dome (SINISTRA/DEXTRA) stay Latin. |
| *antica / postica* | front / back | Quarters; Latin kept beside English. |
| *oscen / oscines* | *oscen* (pl. *oscines*), voice-bird | "By voice" for the mode; never "songbird". |
| *ales / alites* | *ales* (pl. *alites*), flight-bird | "By flight" for the mode. |
| *auspicium / auspicia* | auspice(s); taking the auspices | Never bare "omen(s)" for the formal consultation. |
| *augurium* | augury | The art/act of inauguration; distinguished from *auspicium* in prose. |
| *signum* | sign; (boundary context) marker | Never "omen" where a boundary mark is meant. |
| *ostentum* | *ostentum* (pl. *ostenta*) | Unasked prodigy; glossed once, then Latin. |
| *impetrativa / oblativa* | asked-for (*impetrative*) / unasked (*oblative*) | English first in UI prose, Latin in record. |
| *silentium* | *silentium* — freedom from ritual fault | Never "silence" alone; *vitium* is "ritual fault". |
| *tripudium* | *tripudium* | Feeding-sign: food falls and strikes the ground. Never "dance". |
| *tripudium solistimum* | *tripudium solistimum*, the full feeding-sign | Keep term + ground criterion together. |
| *pulli / pullarius* | the chickens / the chicken-keeper (*pullarius*) | Never "poulterer", "poultry", "auspex" for *pullarius*. |
| *offa / puls* | lump of cake / soft cake | Food thrown to the chickens; one consistent pair. |
| *templum* | *templum* | Marked-out region of sky/ground; never "temple" for the observation space. |
| *conceptio* | the declaring (of the *templum*) | The set-words act; *concepta verba* "set words". |
| *praepes / praepetes* | onward-flying (*praepes*) | Height debate glossed; one flight factor in engine prose. |
| *remores* | delaying (*remores*) birds | "Makes you wait; it cannot forbid." |
| *fas* | *fas* — right by divine law | Never "God's will" in a literal rendering. |
| *religio* (Livy 10.40.11) | religious liability | The binding scruple that falls on the false reporter. |
| Sortes κλῆρος | lot | The spoken number 1–10. |
| Sortes χρησμός | oracle | The book/oracle consulted; χρησμᾷ spelled as printed (§5). |
| Sortes προκόπτειν family | advance | προκόψεις *you will advance*; never "prosper" for this verb. |
| Sortes συμφέρει | it profits / is to (my) advantage | Fixed pair with βλάπτω *harm*. |
| Sortes σωθήσομαι family | be saved; recover (of the sick) | Context decides; batch notes record each health case. |

## 8. Data conventions that are also style

- **Apparatus flags (Sortes).** `apparatus` is present on every
  line, `null` by default. It becomes a short English note only
  where Hercher's own deletion (his `* *` lines) or a conjecture
  *ex ingenio* changes the answer's sense against the transmitted
  wording. Ordinary L/M/P variants, including present-tense LM
  forms, do not raise the flag. The note names the transmitted
  wording in English ("Manuscripts read …; Hercher prints …").
- **Semantic tags (Sortes).** `answersQuestion` is read off the
  answer's own Greek wording *before* the concordance is
  consulted, and is never copied from the table. Where wording
  fits two questions, tag the wording-best fit and record the
  rival in the batch notes; tag `null` only where no question's
  distinctive verb or object is present. Disagreements are
  reported by validation, never smoothed away.
- **Themes (Sortes questions)** are our editorial grouping, from a
  small closed set extended only by amending this file:
  `meta-oracle, travel, military, business-and-money,
  status-and-office, fortune-in-general, marriage-and-family,
  harm-and-risk, home-and-place, children, health, inheritance,
  law, slavery-and-freedom, religion, lost-and-found, work`.
  Slavery questions are tagged plainly and framed historically in
  UI prose; their English is translated without euphemism
  (*fugitive slave, freedom from slavery* — never "servant" where
  slavery is meant).
- **Licences** are recorded per field. Passage records carry a
  licence on the original and on each translation. Sortes files
  keep the PLAN §7 record shapes and carry field licences in an
  exported `licences` object per file (Greek: Hercher 1863, public
  domain; English and themes/tags: ours, CC BY 4.0).

## 9. Transcription of public-domain texts

- Transcribe from the pinned scan of the named edition. Until a
  pin exists, a pilot transcription from a finding aid (Latin
  Library HTML, Gutenberg text, DjVu OCR) must say so in the
  record's `orthography` field and in the batch notes; it is
  provisional until the phase 4c collation.
- Mechanical cleanup only: rejoin hard line-breaks and broken
  hyphenation, strip running heads and page numbers, set the
  translator's footnotes as notes. Never modernise spelling,
  punctuation, or wording; an author's error is kept and, if it
  could mislead, glossed in our literal note.
- OCR is a finding aid, never copy-text. Every OCR correction is
  listed in the batch notes with its reason; a correction the scan
  has not confirmed is marked uncertain there.

## 10. Review checklist (for the phase 4c reviewer, per batch)

The reviewer is independent of the translator and works from the
scans, not from the translator's notes.

1. **Copy-text.** For each record, open the pinned scan page.
   Confirm the original text letter by letter (Greek breathings
   and iota subscript included), the span boundaries, and that no
   web transcription's typo has entered. List every divergence,
   corrected or not.
2. **Accountability.** Read original first, our English second,
   public-domain English last. Every content word accounted for;
   supplied words are grammar only or are declared in the literal
   note/batch notes. Flag every added image, softened verdict,
   and harmonised variant.
3. **Glossary.** Search the batch for every term in §7 and for
   banned diction (§1). Same original formula, same English,
   word for word — Sortes refrains and qualifiers especially.
4. **Names and tiers.** Prophet names against the §3 list;
   speaker, date, tier against PLAN §3 (Quintus is not Marcus;
   Balbus is not either). A tier not in PLAN is a finding, not a
   silent invention.
5. **Orthography.** u/i normalisation applied and recorded;
   archaic forms retained only where §5 allows; Greek exactly as
   printed, including split spellings across loci (χρησμᾷ/χρησμῷ).
6. **Mechanism (Sortes).** Re-derive every batch line's tag from
   wording alone before looking at the table; check tags, filler
   computation, and apparatus flags against §8; reproduce both of
   Hercher's worked examples exactly (q16 k5 → decade 8 line 5;
   q16 k10 → decade 18 line 10 — note: decade text μετὰ χρόνου,
   method quotation μετὰ χρόνον).
7. **Licences and provenance.** Every non-empty text field has a
   non-empty, correct licence; every provisional (unpinned)
   transcription still says so; no text from an in-copyright
   edition or translation has been used, even as a crib.
8. **Read cold.** One full read of the English alone: anything
   that needs the original beside it to parse is rewritten in
   natural English; anything smoother than the original in a way
   that loses a distinction is made literal again.
9. **Spot-check statement.** End the batch review with the named
   passages/decades read against the raw scans and the counts:
   records checked, errors found by class, readings left
   uncertain. Uncertainties carry forward by name; none is
   silently resolved.

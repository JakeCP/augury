# Phase 4c — independent fidelity review: change log

Reviewer worked from the scans (Hercher page images; Thilo Servius
PDF pages rendered with pymupdf; Perseus TEI for Pliny/Iliad as
collation aids), not from the translator's notes, per
docs/STYLE.md §10. Every change made is listed below; counts are
per field changed (a line whose Greek and English both changed
counts twice).

## Count summary

| Category | Changes |
|---|---|
| transcription | 43 |
| translation | 85 |
| routing | 0 |
| consistency | 33 |
| citation | 8 |
| **total** | **169** |

Routing: 0 — every `answersQuestion` tag was re-derived from its
line's wording and checked against the concordance; the 12
mismatches and 10 null tags of docs/PILOT.md §7 are wording-correct
tradition defects and stand unchanged (tests/content.test.mjs
TAG_DEFECTS / NULL_TAGS untouched).

Of the transcription count, 26 entries are new apparatus notes for
reachable, sense-reversing manuscript splits under the lead's rule,
plus the rewritten 95.7 note (the notes themselves do not change
Hercher's printed text or its translation). About two-fifths of
the translation count implements the lead's loanword rule: 35
plain-English renderings of komitaton/biopragos/dekaprotos/
phyratēs (question 78 included) and a gloss note on each affected
answer line (at 58.4 and 57.8 the gloss shares its note with an
L-variant note). Synonymous refrain variation that changes no sense
and no STYLE glossary term (e.g. μὴ φοβοῦ as 'Do not be afraid' /
'Do not fear') was deliberately left alone.

## Records checked

- data/sortes-decades.js: all 1,030 lines read in Greek and English
  against Hercher page images p020–p061 (printed pp. 7–48), accents
  included; doubtful glyphs re-read in enlarged crops (21.7, 54.2,
  56.4, 79.7, 86.5, 95.2, 95.7, 38.2, q13). Decades 1–50 and 71–90
  treated as unreviewed at accent level, as instructed.
- data/sortes-questions.js: all 92 against p017–p020 (printed
  pp. 4–7). χρησμᾷ at q13 confirmed in crop against the τῷ beside it.
- data/sortes-table.js: all 103 rows against p009–p012 (preface
  pp. IV–VII) and the bicolour page p017. PILOT's three uncertain
  numerals settled: sum 71 → ϟ (90) glyph differs from ϛ (6) at
  sum 63; sums 39/112 → ϟϛ (96) / ϟζ (97), glyphs distinct. No
  numeral changes resulted.
- data/sortes-moon.js + data/sortes-frame.js: all records against
  p014–p016 (printed pp. 1–3), incl. the 30-day moon table cell by
  cell. No changes resulted.
- data/passages.js: all 47 records read original-first; Latin/Greek
  collated against the named cache sources (Latin Library HTML,
  Perseus TEI (Pliny, Iliad, Valerius), Lindsay/Thewrewk Festus OCR,
  Hertz Gellius OCR, Kempf Valerius OCR, Rossbach Periochae OCR) and,
  for Servius ad Aen. 12.259, the Thilo vol. II scan image itself
  (printed p. 602). Public-domain translations (Yonge, Spillan,
  Edmonds, Butler) word-diffed against their Gutenberg/OCR copies:
  verbatim apart from rejoined hyphenation and excluded footnotes,
  as STYLE §9 allows; no changes resulted.
- Hercher's worked examples (q16 k5 → 8.5; q16 k10 → 18.10; decade
  μετὰ χρόνου vs method μετὰ χρόνον) re-derived and reproduced.

## Change table

| Location | Was | Now | Reason |
|---|---|---|---|
| 21.7 grc | κληρονομήσεις τὴν μητέρα ἐξ ἡμισείες | κληρονομήσεις τὴν μητέρα ἐξ ἡμισείας | transcription |
| 21.7 en | You will inherit from your mother to the half. | You will inherit a half share from your mother. | translation |
| 54.2 grc | οὐ δυνηθῇ ἀπαλλαγῆναι τοῦ κλήρου | οὐ δυνήσῃ ἀπαλλαγῆναι τοῦ κλήρου | transcription |
| 56.4 grc | οὐ δυνηθῇ δανείσασθαι ἄρτι. περίμεινον | οὐ δυνήσῃ δανείσασθαι ἄρτι. περίμεινον | transcription |
| 86.5 grc | ὁ ἀσθενῶν μακρονοσήσας ὑγιάνει | ὁ ἀσθενῶν μακρονοσήσας ὑγιανεῖ | transcription |
| 86.5 en | The sick man, after being ill a long time, is well. | The sick man, after being ill a long time, will get well. | translation |
| 95.2 grc | ἔξεις ἐλπίδα πίστεως | ἕξεις ἐλπίδα πίστεως | transcription |
| 25.5 en | You will part from your wife, laughing. | You will part from your wife, laughed at. | translation |
| 73.9 en | You have not been poisoned. Why are you ill-timed? | You have not been poisoned. Why is your timing wrong? | translation |
| 78.4 en | You will hire, and you will gain as much as you desire. | You will hire yourself out, and you will gain as much as you desire. | translation |
| 79.7 en | You will sail after [it] is cut off, and well. | You will sail after being hindered, and well. | translation |
| 95.7 en | You will win. Keep silent. | You will not win. Keep silent. | translation |
| 95.7 apparatus | The printed οἱ does not construe with νικήσεις; the opening word is corrupt as printed. | Hercher prints οἱ, which does not construe with νικήσεις; read οὐ ('You will not win'), as at 42.1, where the same pairing with σιώπα ('Keep silent') is negative. Every σιώπα line in the book follows a negative answer… | transcription |
| 9.10 en | You will receive a komitaton now. | You will receive a place in the imperial retinue now. | translation |
| 9.10 apparatus | (null) | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | translation |
| 26.7 en | You will not receive a komitaton just now. | You will not receive a place in the imperial retinue just now. | translation |
| 26.7 apparatus | (null) | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | translation |
| 30.2 en | You will receive a komitaton with much labour. | You will receive a place in the imperial retinue with much labour. | translation |
| 30.2 apparatus | (null) | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | translation |
| 55.1 en | You will not receive a komitaton. | You will not receive a place in the imperial retinue. | translation |
| 55.1 apparatus | (null) | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | translation |
| 58.4 en | You will not receive a komitaton now. | You will not receive a place in the imperial retinue now. | translation |
| 58.4 apparatus | (null) | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | translation |
| 64.3 en | You will receive a komitaton as you wish. | You will receive a place in the imperial retinue as you wish. | translation |
| 64.3 apparatus | (null) | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | translation |
| 66.8 en | You will not receive a komitaton now. | You will not receive a place in the imperial retinue now. | translation |
| 66.8 apparatus | (null) | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | translation |
| 67.9 en | You will not receive a komitaton now. | You will not receive a place in the imperial retinue now. | translation |
| 67.9 apparatus | (null) | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | translation |
| 85.5 en | You will receive a komitaton. | You will receive a place in the imperial retinue. | translation |
| 85.5 apparatus | (null) | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | translation |
| 87.6 en | You will not receive a komitaton now, but wait for it. | You will not receive a place in the imperial retinue now, but wait for it. | translation |
| 87.6 apparatus | (null) | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | translation |
| 9.3 en | You will never become a man of business. | You will never become a merchant. | translation |
| 9.3 apparatus | (null) | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | translation |
| 12.7 en | You will not become a biopragos completely. | You will not become a merchant completely. | translation |
| 12.7 apparatus | (null) | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | translation |
| 13.5 en | You will not become a biopragos. | You will not become a merchant. | translation |
| 13.5 apparatus | (null) | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | translation |
| 25.10 en | You will become a biopragos, and you will be honoured. | You will become a merchant, and you will be honoured. | translation |
| 25.10 apparatus | (null) | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | translation |
| 29.9 en | You will become a biopragos suddenly. | You will become a merchant suddenly. | translation |
| 29.9 apparatus | (null) | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | translation |
| 57.8 en | You will become a biopragos, and you will give thanks. | You will become a merchant, and you will give thanks. | translation |
| 57.8 apparatus | (null) | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | translation |
| 66.1 en | You will become a biopragos. | You will become a merchant. | translation |
| 66.1 apparatus | (null) | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | translation |
| 67.2 en | You will not fully become a biopragos. | You will not fully become a merchant. | translation |
| 67.2 apparatus | (null) | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | translation |
| 72.4 en | You will not become a man of business at all. | You will not become a merchant at all. | translation |
| 72.4 apparatus | (null) | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | translation |
| 81.6 en | You will become a biopragos and acquire many goods. | You will become a merchant and acquire many goods. | translation |
| 81.6 apparatus | (null) | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | translation |
| 2.8 en | You will soon become a dekaprotos. | You will soon become one of the ten chief men. | translation |
| 2.8 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 16.7 en | You will soon become dekaprotos. | You will soon become one of the ten chief men. | translation |
| 16.7 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 20.10 en | You will become dekaprotos when you do not know it. | You will become one of the ten chief men when you do not know it. | translation |
| 20.10 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 28.10 en | You will become a dekaprotos. | You will become one of the ten chief men. | translation |
| 28.10 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 32.6 en | You will not become dekaprotos now. | You will not become one of the ten chief men now. | translation |
| 32.6 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 51.9 en | You will become a dekaprotos soon. | You will become one of the ten chief men soon. | translation |
| 51.9 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 54.3 en | You will not become a dekaprotos. Do not hope. | You will not become one of the ten chief men. Do not hope. | translation |
| 54.3 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 65.4 en | You will become dekaprotos quickly. | You will become one of the ten chief men quickly. | translation |
| 65.4 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 69.10 en | You will never become dekaprotos. | You will never become one of the ten chief men. | translation |
| 69.10 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 73.5 en | You will suddenly become a dekaprotos. | You will suddenly become one of the ten chief men. | translation |
| 73.5 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 77.2 en | You will become a dekaprotos, when you do not know. | You will become one of the ten chief men, when you do not know. | translation |
| 77.2 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 89.1 en | You will become dekaprotos. | You will become one of the ten chief men. | translation |
| 89.1 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 103.8 en | You will become a dekaprotos, and you will be in good repute. | You will become one of the ten chief men, and you will be in good repute. | translation |
| 103.8 apparatus | (null) | δεκάπρωτος (dekaprotos): one of the ten leading councillors of a city, liable for its taxes. | translation |
| 25.7 en | You will become a councillor and a phyratēs. | You will become a councillor and a kneader of dough. | translation |
| 25.7 apparatus | null | φυρατής (phyratēs), literally 'one who kneads (dough)'; what trade or office is meant is uncertain. | translation |
| 51.8 en | You will be rid of the lot. Take thought. | You will be rid of the clergy. Take thought. | consistency |
| 54.2 en | You will not be able to be rid of the lot. | You will not be able to be rid of the clergy. | consistency |
| 73.4 en | You will be freed from the lot in old age. | You will be freed from the clergy in old age. | consistency |
| 77.1 en | The lot will not remain with you. | The clergy will not remain with you. | consistency |
| 2.1 en | You will be separated from your girlfriend. | You will be separated from the woman you love. | consistency |
| 35.10 en | You will not be parted from your girlfriend. | You will not be parted from the woman you love. | consistency |
| 36.4 en | You will not be parted from your girlfriend. | You will not be parted from the woman you love. | consistency |
| 51.2 en | You will be rid of your girlfriend now. | You will be rid of the woman you love now. | consistency |
| 55.9 en | You will not marry your girlfriend. Do not be deceived. | You will not marry the woman you love. Do not be deceived. | consistency |
| 60.5 en | You will marry your girlfriend, but not now. | You will marry the woman you love, but not now. | consistency |
| 91.8 en | You will be parted from your girlfriend, and you will be harmed. | You will be parted from the woman you love, and you will be harmed. | consistency |
| 92.9 en | You will not be parted from your girlfriend. | You will not be parted from the woman you love. | consistency |
| 93.8 en | You will be parted from your girlfriend, and you will regret it. | You will be parted from the woman you love, and you will regret it. | consistency |
| 97.10 en | You will be parted from your girlfriend. She is acting foolishly. It profits you. | You will be parted from the woman you love. She is acting foolishly. It profits you. | consistency |
| 98.6 en | You will not be parted from your girlfriend. | You will not be parted from the woman you love. | consistency |
| 1.2 en | You will not attain the invocation now. | You will not succeed in the appeal now. | consistency |
| 7.1 en | You will attain the invocation. | You will succeed in the appeal. | consistency |
| 43.10 en | You will not attain the invocation now. | You will not succeed in the appeal now. | consistency |
| 60.8 en | You will obtain the invocation soon. | You will soon succeed in the appeal. | consistency |
| 95.3 en | You will obtain the invocation. | You will succeed in the appeal. | consistency |
| 9.1 en | You will not go wrong. Serve as envoy. | You will not go wrong. Intercede. | consistency |
| 12.5 en | You will not go on an embassy alone. Do not hope for it. | You will not intercede alone. Do not hope for it. | consistency |
| 13.3 en | You will go on an embassy alone, and you will be benefited. | You will intercede alone, and you will be benefited. | consistency |
| 25.8 en | You will serve as an envoy, and you will prosper, if you hurry. | You will intercede, and you will prosper, if you hurry. | consistency |
| 29.7 en | You will serve as an envoy, but not alone. | You will intercede, but not alone. | consistency |
| 72.2 en | You will not go on an embassy alone; for it does not profit you. | You will not intercede alone; for it does not profit you. | consistency |
| 77.10 en | You will go on an embassy alone, and you will be honoured. | You will intercede alone, and you will be honoured. | consistency |
| 80.5 en | Put down a deposit; for you will win. | Put down a stake, for you will win. | consistency |
| 95.1 en | Put down the deposit, for you will win. | Put down a stake, for you will win. | consistency |
| 26.3 en | What is yours will not be proscribed. Do not worry. | What is yours will not be confiscated. Do not worry. | consistency |
| 72.7 en | Your property will be proscribed. Pay attention. | Your property will be confiscated. Pay attention. | consistency |
| 8.2 apparatus | null | Manuscripts LM read μικρὸν ('a little') for the printed μακρὰν ('to a great age'). | transcription |
| 55.5 apparatus | null | Manuscript L reads the active, 'You will not sell', and M a prohibition, 'Do not sell'; Hercher prints the passive, 'You will not be sold', translated here. | transcription |
| 57.3 apparatus | null | Manuscripts LM read διαλλαγήσῃ τῇ γυναικί, 'You will be reconciled to your wife' — the opposite of the printed text. | transcription |
| 57.7 apparatus | null | Manuscript L here reads a different answer entirely: 'You will not see your homeland now.' | transcription |
| 57.10 apparatus | null | Manuscript L here reads a different answer entirely: 'You will not find what is lost now.' | transcription |
| 58.1 apparatus | null | Manuscript L here reads a different answer entirely: 'You will not have hope of faith.' | transcription |
| 58.2 apparatus | null | Manuscript L here reads a different answer entirely: 'You will not have a long time of life.' | transcription |
| 58.5 apparatus | null | Manuscript L here reads a different answer entirely: 'You will have a good end.' | transcription |
| 58.7 apparatus | null | Manuscript L here reads a different answer entirely: 'Your wife will remain with you until old age.' | transcription |
| 58.8 apparatus | null | Manuscript L here reads a different answer entirely: 'You do not sell to your advantage.' | transcription |
| 58.9 apparatus | null | Manuscript L here reads a different answer entirely: 'You will soon complete what you undertake.' | transcription |
| 58.10 apparatus | null | Manuscript L here reads a different answer entirely: 'You will advance for the better, and you will be honoured.' | transcription |
| 60.1 apparatus | null | Manuscripts LM read the active πωλήσεις, 'You will sell'; Hercher prints the passive, 'You will be sold', translated here. | transcription |
| 63.5 apparatus | null | Manuscripts LM read καταλλαγήσῃ τῇ φιλῇ, 'You will be reconciled to the woman you love' — the opposite of the printed text. | transcription |
| 83.3 apparatus | null | Manuscripts LM read the second person, σωθήσῃ ('You will recover'); Hercher prints the third person, of the sick man. | transcription |
| 88.7 apparatus | null | Manuscripts LM read καταλλαγήσῃ τῇ φιλῇ, 'You will be reconciled to the woman you love' — the opposite of the printed text. | transcription |
| 89.6 apparatus | null | Manuscripts LM read κακῶς ('badly') for the printed καλῶς ('well'). | transcription |
| 91.8 apparatus | null | Manuscripts LM read διαλλαγήσῃ τῇ φίλῃ, 'You will be reconciled to the woman you love' — the opposite of the printed text. | transcription |
| 94.4 apparatus | null | Manuscripts LM read the second person, σωθήσῃ ('You will recover'); Hercher prints the third person, of the sick man. | transcription |
| 99.2 apparatus | null | Manuscripts LM read the third person, σωθήσεται ('He will not recover'); Hercher prints the second person, of the enquirer. | transcription |
| 100.4 apparatus | null | Manuscripts LM read ἀπαλλαγήσῃ, 'You will not be rid of your masters'; Hercher prints καταλλαγήσῃ, 'be reconciled', translated here. | transcription |
| 100.8 apparatus | null | Manuscripts LM read the third person, σωθήσεται ('He will recover'); Hercher prints the second person, of the enquirer. | transcription |
| 102.5 apparatus | null | Manuscripts LM read the active imperative δάνεισον, 'Lend!'; Hercher prints the middle δάνεισαι, 'Borrow!', translated here. | transcription |
| 58.4 apparatus | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. | κομητάτον (komitaton, from Latin comitatus): a place in the imperial retinue. Manuscript L here reads a different answer entirely: 'You will gain a little from the matter.' | transcription |
| 57.8 apparatus | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. | βιοπράγος (biopragos), rendered 'merchant'; the word may mean a slave-dealer. Manuscript L here reads a different answer entirely: 'You will not complete what you undertake.' | transcription |
| 97.10 apparatus | Hercher notes that μωροποιεῖ may be doubted. | Hercher notes that μωροποιεῖ may be doubted. Manuscript M reads διαλλάσσῃ, 'You are being reconciled to her' — the opposite of the printed text; L has a different line again (about the man in custody). | transcription |
| q78 en | Will I receive a komitaton? | Will I receive a place in the imperial retinue? | translation |
| q96 en | Will I be rid of the lot? | Will I be rid of the clergy? | consistency |
| sum 16 prophet.en | Loud | Lud | translation |
| livy-1-7-1 original | consaluutauerat | consalutauerat | transcription |
| livy-1-7-1 Augury literal note | Livy's finding-aid spelling uoltures/consaluutauerat is normalised in the Latin above to uoltures retained, consaluutauerat retained as transmitted. | The finding aid's spelling uoltures is retained in the Latin above. | consistency |
| hom-il-12-237-243 citation | Homer, Iliad 12.237–243 | Homer, Iliad 12.231–243 | citation |
| hom-il-12-237-243 original | Πουλυδάμα, σὺ μὲν οὐκέτ᾽ ἐμοὶ φίλα ταῦτ᾽ ἀγορεύεις· οἶσθα καὶ ἄλλον μῦθον ἀμείνονα τοῦδε νοῆσαι. εἰ δ᾽ ἐτεὸν δὴ τοῦτον ἐτήτυμον ἔκφατο μῦθον, σοὶ δέ τε θυμὸν ὄλεσσαν ἐνὶ φρεσὶ δαίμονες αὐτοί, ὅς κέ με φῇς Διὸς ἐκλελαθ… | Πουλυδάμα, σὺ μὲν οὐκ ἔτ' ἐμοὶ φίλα ταῦτ' ἀγορεύεις· οἶσθα καὶ ἄλλον μῦθον ἀμείνονα τοῦδε νοῆσαι. εἰ δ' ἐτεὸν δὴ τοῦτον ἀπὸ σπουδῆς ἀγορεύεις, ἐξ ἄρα δή τοι ἔπειτα θεοὶ φρένας ὤλεσαν αὐτοί, ὃς κέλεαι Ζηνὸς μὲν ἐριγδού… | transcription |
| hom-il-12-237-243 orthography | Greek polytonic as in the Monro–Allen OCT received text. The cache scan (bwb_Y0-BSA-064_1.txt, archive.org owb_YO-BSA-064_1) is Monro–Allen OCT vol. I (Iliad 1–12, 1902); its OCR of the Greek is illegible, so the text… | Greek polytonic as in the Monro–Allen OCT received text. The cache scan (bwb_Y0-BSA-064_1.txt, archive.org owb_YO-BSA-064_1) is Monro–Allen OCT vol. I (Iliad 1–12, 1902); its OCR of the Greek is illegible, the text ab… | citation |
| cic-div-2-85 citation | Cicero, De divinatione 2.85 | Cicero, De divinatione 2.84 | citation |
| cic-div-2-85 original | Cum M. Crassus exercitum Brundisii imponeret, quidam in portu caricas Cauno aduectas uendens "Cauneas" clamabat. Dicamus, si placet, monitum ab eo Crassum caue ne eas, id est, ne iret; non fuisse periturum, si omini p… | Cum M. Crassus exercitum Brundisii imponeret, quidam in portu caricas Cauno aduectas uendens "Cauneas" clamitabat. Dicamus, si placet, monitum ab eo Crassum, caueret ne iret; non fuisse periturum, si omini paruisset. | transcription |
| cic-div-2-85 Augury (literal) | was crying 'Cauneas' [Caunian (figs)]. Let us say, if you please, that Crassus was warned by him 'caue ne eas' — take care not to go, that is, not to set out; [and] that he would not have perished if he had obeyed the… | kept crying 'Cauneas' [Caunian (figs)]. Let us say, if you please, that Crassus was warned by him to take care not to go; [and] that he would not have perished if he had obeyed the omen." The cry Cauneas sounds like c… | translation |
| cic-div-2-85 orthography | u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this re… | u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this re… | citation |
| valmax-1-4-3 citation | Valerius Maximus, Facta et dicta memorabilia 1.4.3 | Valerius Maximus, Facta et dicta memorabilia 1.4.3–4 | citation |
| pliny-nh-28-17 Augury (literal) | and that they hold good only as each has been accepted | and that they are effective as each has been accepted | translation |
| cic-div-2-77 Augury (literal) | "For as to [auspices] from sharp points [the military auspice from the standards' points? — the phrase ex acuminibus is obscure], which is the whole military auspice, | "For as to [auspices] from points (ex acuminibus), which is the whole military auspice, | translation |
| cic-div-2-77 Augury (literal) | that they order the draught animals to be unyoked." Marcellus avoids | that they order the draught animals to be unyoked." The phrase ex acuminibus (from points — of spears or standards) is obscure; Marcus calls it the whole military auspice. Marcellus avoids | translation |
| gell-na-7-6 original | Iulius Hyginus in libro quem de Vergilio fecit temere reprehendit Vergilium, quod Daedali pennas 'praepetibus' dixerit, quasi non omnes aues praepetes dici possint. Aues enim, inquit Nigidius, praepetes sunt quae pros… | In his Vergilii uersibus reprehendit Iulius Hyginus 'pennis praepetibus' quasi inproprie et inscite dictum. 'Nam praepetes' inquit 'aues ab auguribus appellantur, quae aut opportune praeuolant aut idoneas sedes capiun… | transcription |
| gell-na-7-6 Augury (literal) | "Julius Hyginus in the book he wrote on Vergil rashly faulted Vergil for calling Daedalus' wings 'praepetes' [Aeneid 6.15], as if not all birds could be called praepetes. For birds, says Nigidius [as Gellius reports t… | "In these verses of Vergil [Aeneid 6.14–15, Daedalus 'on praepetes wings'] Julius Hyginus finds fault with 'pennis praepetibus' as improperly and ignorantly said. 'For birds are called praepetes by the augurs,' he say… | translation |
| gell-na-7-6 orthography | u/i normalised. Chapter heading verified in Hertz–Hosius OCR (agelliinoctiumat01gelluoft.txt, Capitula lib. VII: "Temere inepteque reprehensum esse a Iulio Hygino Vergilium, quod 'praepetes' Daedali pennas dixerit; at… | u/i normalised. Transcribed in phase 4c from the Hertz–Hosius OCR (agelliinoctiumat01gelluoft.txt), where the chapter stands at printed pp. 289–290 (VII (VI) 6, §§2–3 and 10–11, quoted here); OCR spellings such as Ver… | transcription |
| serv-aen-12-259 original | Oblatiua auguria refutari possunt: non enim necesse est ea quae non poscuntur accipere. | Quod saepe petiui: quasi inpetratiuum hoc augurium uult uideri. Accipio agnoscoque deos: modo quasi de oblatiuo loquitur: nam in oblatiuis auguriis in potestate uidentis est, utrum id ad se pertinere uelit, an refutet… | transcription |
| serv-aen-12-259 Augury (literal) | Oblative auguries can be refused: there is no necessity to accept signs that were not asked for. | "'What I often sought': he wants this augury to seem, as it were, impetrative [asked-for]. 'I accept and acknowledge the gods': now he speaks as if of an oblative [unasked] augury: for in oblative auguries it is in th… | translation |
| serv-aen-12-259 orthography | u/i normalised. Sense as cited for R-DECLINE in PLAN §3.2; the exact lemma wording at Aen. 12.259 could not be letter-verified in the corrupt Thilo vol. II OCR and is printed in received form for 4c image collation. T… | u/i normalised; lemmata sentence-cased. Letter-verified in phase 4c against the Thilo–Hagen vol. II scan image (printed p. 602, rendered from serviigrammatic02thilgoog.pdf). The 4b text was a received-form paraphrase … | transcription |
| serv-aen-6-191 orthography | u/i normalised. Wording as quoted in PLAN §3.2 (R-TEMPLUM) from Servius on Aeneid 6.191. The cache holds Thilo–Hagen vol. II OCR (Aeneid 6–12: serviigrammatic02thilgoog.txt); the OCR at this locus is too corrupt to le… | u/i normalised. Wording as quoted in PLAN §3.2 (R-TEMPLUM) from Servius on Aeneid 6.191. The cache holds Thilo–Hagen vol. II OCR (Aeneid 6–12: serviigrammatic02thilgoog.txt); the OCR at this locus is too corrupt to le… | citation |
| serv-aen-6-190 orthography | u/i normalised; inpetratiua spelling retained as quoted in PLAN §3.2 (R-ASK). Same Thilo–Hagen vol. II cache and same collation caveat as serv-aen-6-191. Translation ours (no PD English). | u/i normalised; inpetratiua spelling retained as quoted in PLAN §3.2 (R-ASK). Same Thilo–Hagen vol. II cache and same collation caveat as serv-aen-6-191. Translation ours (no PD English). Phase 4c: the local Thilo PDF… | citation |
| serv-aen-3-89 orthography | u/i normalised. The five-genera list as cited in PLAN §3.1 scope note. The cache Servius volume covers Aeneid 6–12 only, so Aen. 3.89 cannot be verified from local sources; the locus itself was already marked verify: … | u/i normalised. The five-genera list as cited in PLAN §3.1 scope note. The cache Servius volume covers Aeneid 6–12 only, so Aen. 3.89 cannot be verified from local sources; the locus itself was already marked verify: … | citation |
| livy-per-19 original | P. Claudius Pulcher consul, aduersis auspiciis, iussis immergi pullis qui in auspicium exire noluerant, contra Poenos infeliciter classe pugnauit et, reuocatus a senatu dictatorem dicere iussus, Claudium Glyciam dixit. | Claudius Pulcher cos. contra auspicia profectus — iussit mergi pullos, qui cibari nolebant — infeliciter aduersus Carthaginienses classe pugnauit, et reuocatus a senatu iussusque dictatorem dicere Claudium Glyciam dixit. | transcription |
| livy-per-19 Augury (literal) | "The consul Publius Claudius Pulcher, with the auspices adverse — having ordered the chickens which had refused to come out for the auspice to be plunged [into the sea] — fought unsuccessfully at sea against the Carth… | "Claudius Pulcher the consul, having set out against the auspices — he had ordered the chickens, which would not be fed, to be drowned — fought unsuccessfully at sea against the Carthaginians and, recalled by the sena… | translation |
| livy-per-19 orthography | u/i normalised. Rossbach 1910 OCR (tliviperiochaeom00unse.txt): the Per. 19 text stands at printed pp. 23–24; the apparatus there confirms "iussis immergi pullis" but the OCR text-line is corrupt, so the wording above… | u/i normalised. Transcribed in phase 4c from Rossbach 1910 OCR (tliviperiochaeom00unse.txt), Periocha 19 (EX LIBRO XVIIII), printed pp. 23–24; OCR hyphenation (dicta-torem) rejoined. The 4b wording followed Heinsius' … | transcription |
| fest-admissivae-cliviae original | Admissiuae aues dicebantur ab auguribus, quae consulentem iuberent. Cliuiae aues, quae fieri aliquid prohibent. | Admissiuae aues dicebantur ab auguribus, quae consulentem iuberent. Cliuia auspicia dicebant, quae aliquid fieri prohibebant; omnia enim difficilia cliuia uocabant, unde et cliui loca ardua. | transcription |
| fest-admissivae-cliviae Augury (literal) | "'Allowing' birds (admissiuae) were so called by the augurs, [birds] which bid the consulter [proceed]. 'Prohibiting' birds (cliuiae), which prohibit something from being done." Admissiuae is verbatim from Paulus (Lin… | "'Allowing' birds (admissiuae) were so called by the augurs, [birds] which bid the consulter [proceed]. 'Prohibiting' auspices (cliuia auspicia) they called those which prohibited something from being done; for they c… | translation |
| fest-admissivae-cliviae orthography | u/i normalised. Transcribed from Lindsay 1913 OCR (bwb_C0-AXI-081.txt), cross-checked against Thewrewk 1889 OCR where Lindsay's OCR fails; OCR corrections are listed here per STYLE §9. No PD English exists; translatio… | u/i normalised. Transcribed from Lindsay 1913 OCR (bwb_C0-AXI-081.txt), cross-checked against Thewrewk 1889 OCR; hyphenation in consulen-tem rejoined. Cliuia auspicia located in phase 4c at Lindsay p. 56 in both OCRs … | transcription |

## Decisions on the PILOT open items (lead's rules)

- **τοῦ κλήρου**: 'the clergy' throughout the q96 family. The
  questions routed there are church-office questions (q96's own
  themes are religion/status-and-office; 98.7 'if you love the
  clergy' answers the bishop question). q96 and the four 'lot'
  answers (51.8, 54.2, 73.4, 77.1) made consistent. κλῆρος = 'lot'
  stands only for the spoken number in the frame.
- **Loanwords**: komitaton → 'a place in the imperial retinue';
  biopragos → 'merchant' (q85's existing rendering), with the
  possible sense 'slave-dealer' recorded in each
  note; dekaprotos → 'one of the ten chief men', glossed as one of
  the ten leading councillors liable for a city's taxes. λεγάτον
  was already 'legacy' throughout. φυρατής (25.7), found in this
  pass, is rendered 'a kneader of dough' with its uncertainty in
  the note.
- **95.7 οἱ/οὐ**: enlarged crop confirms Hercher prints οἱ
  (distinct from the οὐ ligature at 95.5/95.8). Read as οὐ from
  the routed question (q63) and the identical negative pairing at
  42.1 (οὐ νικήσεις. σιώπα); every σιώπα line in the book follows
  a negative. Greek left as printed; English negated; reasoning
  recorded in the line's apparatus.
- **Manuscript splits**: notes added only where the line is
  reachable and the variant reverses or materially changes the
  answer (negation, sell/be-sold, rid-of/reconciled, 2nd/3rd-person
  recovery swaps, wholesale different L answers incl. decade 58).
  Present-tense LM forms and other ordinary variants remain
  unflagged per STYLE §8. 46.1's 'question 21' was re-read on
  p038: Hercher's apparatus really prints 21; the data note stands.
- **Deleted-line manuscript splits** (91.5, 103.10, 51.1 tags from
  transmitted wording): left as tagged; wording-first tagging is
  the rule and Hercher's responderi-debebat numbers are already in
  the notes.

## Could not settle (carried forward by name)

1. **Servius ad Aen. 6.190, 6.191, 3.89** (serv-aen-6-190,
   serv-aen-6-191, serv-aen-3-89): the local Thilo PDFs are the
   Aeneid IV–V (vol. I, serviigrammatic00, 311 pp. from printed
   p. 461) and IX–XII (vol. II, serviigrammatic02, from printed
   p. 293) fascicles only; none of the three loci is in the local
   cache in any form. Their Latin stays in received form, flagged
   in each orthography field; do not quote as letter-exact. (Ad
   Aen. 12.259, by contrast, is now letter-verified from the scan.)
2. **Festus s.v. Sinistrae aues** (fest-sinistrum): both OCRs garble
   the lemma's second word ('sinistinium'/'sinistimum'); the data
   prints 'sinistrumque auspicium' with the lacunose state flagged.
   Needs the Lindsay scan image (printed pp. 502–504).
3. **q45 γράμματα family** (questions q45; decades 5.3, 10.10,
   11.8, 31.1, 33.2, 39.7, 41.6, 45.4, 74.9, 100.5): 'letters' with
   δίδωμι but 'learning/studies' with ἐπιτυγχάνω. The Greek is as
   printed in every case; whether one sense (documents? letters?
   learning?) covers the whole family could not be settled from
   local sources. Left as translated.
4. **6.4** τῇ ἐρχομένῃ γαστρὶ κρατήσει ('She will prevail in the
   coming pregnancy'): printed text confirmed; the exact force of
   κρατήσει (prevail? carry to term?) in the miscarriage family is
   not provable locally. Left as translated.
5. **Accent-level residue**: κομητάτον/κομητᾶτον accentuation
   varies by locus as transcribed (q78 and most answers acute;
   9.10, 55.1, 58.4, 85.5, 87.6 circumflex). At scan resolution
   acute/circumflex on this word could not be re-verified letter
   by letter; the transcriptions stand. Grave/acute before
   enclitics generally sits at the same limit (PILOT §7.8).
6. **Apparatus completeness**: split-notes were added for every
   case in PILOT's list and every reversal/wholesale-L line met
   while reading Hercher's footnotes on printed pp. 7–48 in this
   pass; a fresh line-by-line transcription of Hercher's whole
   apparatus was not attempted, so further L-displacements outside
   the noted decades may exist unnoted.
7. **scripts/provenance.json** (off-limits to this pass) still
   carries the 4b page strings for the corrected passage records
   (cic-div-2-85, hom-il-12-237-243, gell-na-7-6, serv-aen-12-259,
   livy-per-19, fest-admissivae-cliviae, valmax-1-4-3). The records'
   source.page fields were therefore left untouched (the test
   asserts pin/record agreement); the lead should refresh the pins.
   Record ids hom-il-12-237-243 and cic-div-2-85 likewise keep
   their old numbers.

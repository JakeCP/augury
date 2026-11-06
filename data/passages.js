// Ancient passages: original text facing English, with citation,
// speaker/date/evidence tier and a licence per field (PLAN §9).
// Phase 4b: all records completed. Originals are transcribed from
// the cache sources named in each record's source field and pinned
// in scripts/provenance.json; where only a finding aid or corrupt
// OCR was available the orthography field says so and phase 4c
// letter-collation against the scan image is still owed.
// Style: docs/STYLE.md. Report: docs/PILOT.md (4b passages).
export const passages = [
  {
    "id": "varro-ll-7-7-8",
    "citation": "Varro, De lingua Latina 7.7–7.8",
    "speaker": "Varro",
    "date": "c. 45 BC",
    "tier": "technical",
    "original": {
      "lang": "la",
      "licence": "Public domain — ancient text; pilot transcription from a finding aid (see orthography), to be re-collated against the pinned scan in phase 4c",
      "text": "Eius templi partes quattuor dicuntur, sinistra ab oriente, dextra ab occasu, antica ad meridiem, postica ad septemtrionem. In terris dictum templum locus augurii aut auspicii causa quibusdam conceptis uerbis finitus. Concipitur uerbis non isdem usque quaque; in Arce sic: Templa tescaque me ita sunto, quoad ego ea rite lingua nuncupauero. Olla uera arbos quirquir est, quam me sentio dixisse, templum tescumque me esto in sinistrum. Olla uera arbos quirquir est, quam me sentio dixisse, templum tescumque me esto in dextrum. Inter ea conregione conspicione cortumione, utique ea rite dixisse me sensi."
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "The parts of that templum are called four: the left part on the side of sunrise, the right on the side of sunset, the front towards the south, the back towards the north. On earth, templum is the name for a place bounded, for the sake of augury or taking the auspices, by certain set words. It is declared in words that are not the same everywhere; on the Arx [the Capitoline citadel], thus: \"Let templa and tesca [sacred waste places] be thus for me, until I shall have duly named them aloud with my tongue. Whatever that tree — vera [word corrupt in transmission] — is, which I am aware I have named, let it be for me templum and tescum on the left. Whatever that tree is, which I am aware I have named, let it be for me templum and tescum on the right. [Let the space] between them [be bounded] conregione conspicione cortumione [augural words corrupt in transmission; Varro glosses conspicio as the bounding of the eyes’ range], insofar as I am aware that I have duly spoken those things.\""
      }
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Pilot text transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/; under the provenance rule (docs/SOURCES.md) the pinned scan is copy-text and this text is provisional until phase 4c collation. Archaic spellings septemtrionem, isdem, arbos retained. The conceptio formula is corrupt as transmitted (uera, quirquir, conregione conspicione cortumione) and is printed without emendation; section boundaries 7.7/7.8 follow the received division and are not marked in the finding-aid HTML.",
    "rules": [
      "R-TEMPLUM"
    ],
    "source": {
      "edition": "Latin Library text (Goetz–Schoell lineage; finding aid only)",
      "page": "LL 7.7–8 (no scan page pinned)",
      "cache": "latlib-varro-ll7.html"
    }
  },
  {
    "id": "livy-1-18-6-10",
    "citation": "Livy, Ab urbe condita 1.18.6–10",
    "speaker": "Livy (foundation narrative)",
    "date": "late 1st century BC",
    "tier": "legend",
    "original": {
      "lang": "la",
      "licence": "Public domain — ancient text; pilot transcription from a finding aid (see orthography), to be re-collated against the pinned scan in phase 4c",
      "text": "Accitus, sicut Romulus augurato urbe condenda regnum adeptus est, de se quoque deos consuli iussit. Inde ab augure, cui deinde honoris ergo publicum id perpetuumque sacerdotium fuit, deductus in arcem, in lapide ad meridiem uersus consedit. Augur ad laeuam eius capite uelato sedem cepit, dextra manu baculum sine nodo aduncum tenens quem lituum appellarunt. Inde ubi prospectu in urbem agrumque capto deos precatus regiones ab oriente ad occasum determinauit, dextras ad meridiem partes, laeuas ad septentrionem esse dixit; signum contra quo longissime conspectum oculi ferebant animo finiuit; tum lituo in laeuam manum translato, dextra in caput Numae imposita, ita precatus est: \"Iuppiter pater, si est fas hunc Numam Pompilium cuius ego caput teneo regem Romae esse, uti tu signa nobis certa adclarassis inter eos fines quod feci.\" Tum peregit uerbis auspicia quae mitti uellet. Quibus missis declaratus rex Numa de templo descendit."
    },
    "translations": [
      {
        "label": "D. Spillan (1849)",
        "licence": "Public domain — D. Spillan, Livy Books 1–8 (Bohn, 1849); pilot transcription from Project Gutenberg #19725, Bohn-scan pin pending",
        "text": "Being sent for, just as Romulus before the building of the city obtained the throne by an augury, he commanded the gods to be consulted concerning himself also. Upon this, being conducted into the citadel by an augur, (to which profession that office was made a public one and perpetual by way of honour,) he sat down on a stone facing the south: the augur took his seat on his left hand with his head covered, holding in his right a crooked wand free from knots, which they called lituus; then taking a view towards the city and country, after offering a prayer to the gods, he marked out the regions from east to west, the parts towards the south he called the right, those towards the north, the left; and in front of him he set out in his mind a sign as far as ever his eye could reach. Then having shifted the lituus into his left hand, placing his right hand on the head of Numa, he prayed in this manner: \"O father Jupiter, if it is thy will that this Numa Pompilius, whose head I hold, should be king of Rome, I beseech thee to give sure and evident signs of it within those bounds which I have marked.\" Then he stated in set terms the omens which he wished to be sent; and on their being sent, Numa was declared king and came down from the stand."
      },
      {
        "label": "Augury literal note",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Literally: Numa \"sat down on a stone, turned towards the south\" (in lapide ad meridiem uersus) — Numa faces south; the augur sits \"on his left\" (ad laeuam eius) \"with head veiled\" (capite uelato), holding \"a knotless, crooked staff, which they called a lituus\" (baculum sine nodo aduncum … quem lituum appellarunt; Spillan’s \"wand\" is too small a word). \"He declared the parts towards the south to be the right parts, those towards the north the left\" (dextras ad meridiem partes, laeuas ad septentrionem esse dixit) — the clause from which an eastward-facing augur is inferred; editors have suspected it as a gloss. The prayer runs \"Father Jupiter, if it is fas [right by divine law, not \"thy will\"] that this Numa Pompilius, whose head I hold, be king of Rome, [I pray] that you make clear to us sure signs within those bounds which I have made.\" Finally, \"then he went through in words the auspices which he wished to be sent\" (tum peregit uerbis auspicia quae mitti uellet) — he specified in advance which signs would count. \"From the templum\" (de templo) is the inaugurated observation space, not a temple building."
      }
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Pilot text transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/; under the provenance rule (docs/SOURCES.md) the pinned scan is copy-text and this text is provisional until phase 4c collation. Section breaks 6–10 are conventional and are not marked in the finding-aid HTML. The prayer’s quod feci and archaic adclarassis are printed as transmitted.",
    "rules": [
      "R-ASK",
      "R-TEMPLUM",
      "R-LINE"
    ],
    "source": {
      "edition": "Latin Library text (finding aid only); Spillan Gutenberg #19725",
      "page": "Livy 1.18.6–10",
      "cache": "latlib-livy-liv.1.html + pg19725.txt"
    }
  },
  {
    "id": "cic-div-1-85",
    "citation": "Cicero, De divinatione 1.85",
    "speaker": "Quintus, in Cicero, De divinatione 1",
    "date": "44 BC",
    "tier": "quintus",
    "original": {
      "lang": "la",
      "licence": "Public domain — ancient text; pilot transcription from a finding aid (see orthography), to be re-collated against the pinned scan in phase 4c",
      "text": "Nec uero quicquam aliud adfertur cur ea quae dico diuinandi genera nulla sint, nisi quod difficile dictu uidetur quae cuiusque diuinationis ratio, quae causa sit. Quid enim habet haruspex, cur pulmo incisus etiam in bonis extis dirimat tempus et proferat diem? Quid augur, cur a dextra coruus, a sinistra cornix faciat ratum? Quid astrologus, cur stella Iouis aut Ueneris coniuncta cum luna ad ortus puerorum salutaris sit, Saturni Martisue contraria? Cur autem deus dormientes nos moneat, uigilantes neglegat? Quid deinde causae est, cur Cassandra furens futura prospiciat, Priamus sapiens hoc idem facere non queat?"
    },
    "translations": [
      {
        "label": "C. D. Yonge (1853)",
        "licence": "Public domain — C. D. Yonge, The Treatises of M. T. Cicero (Bohn, 1853); pilot transcription from OCR, scan proofing pending",
        "text": "Nor indeed is any other argument brought forward to prove that all these kinds of divination which I uphold have no existence, than that it appears difficult to explain what are the different principles and causes of each kind of divination. For what reason can the soothsayer allege why an injury in the lungs of otherwise favourable entrails should compel us to alter a day previously appointed, and defer an enterprise? How can an augur explain why the croak of a raven on the right hand, and a crow on the left, should be reckoned a good omen? What can an astrologer say by way of explaining why a conjunction of the planet Jupiter or Venus with the moon is propitious at the birth of a child, and why the conjunction of Saturn or Mars is injurious? or why God should warn us during sleep, and neglect us when we are awake? or lastly, what is the reason why the frantic Cassandra could foresee future events, while the sage Priam remained ignorant of them?"
      },
      {
        "label": "Augury literal note",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "The augur sentence literally: \"What has an augur [to say], why a raven on the right, a crow on the left, should make [the thing] ratified?\" (Quid augur, cur a dextra coruus, a sinistra cornix faciat ratum?). Faciat ratum is \"makes (it) confirmed, valid\" — the birds confirm the undertaking; Yonge’s \"be reckoned a good omen\" generalises it, and his \"croak\" supplies the voice the Latin leaves unstated (the birds are oscines, voice-birds, but the noun here is the bird, not its cry). Quintus cites the rule as a fact no one can explain, in an argument that unexplainability is no disproof; he is a witness for the practice, arguing for divination."
      }
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Pilot text transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/; under the provenance rule (docs/SOURCES.md) the pinned scan is copy-text and this text is provisional until phase 4c collation.",
    "rules": [
      "R-EXCEPT",
      "B-RAVEN",
      "B-CROW"
    ],
    "source": {
      "edition": "Latin Library text (finding aid only); Yonge OCR",
      "page": "Cic. Div. 1.85",
      "cache": "latlib-cicero-divinatione1.html + treatisescicero00ciceuoft_djvu.txt"
    }
  },
  {
    "id": "cic-div-2-71-73",
    "citation": "Cicero, De divinatione 2.71–73",
    "speaker": "Marcus, in Cicero, De divinatione 2",
    "date": "44 BC",
    "tier": "marcus",
    "original": {
      "lang": "la",
      "licence": "Public domain — ancient text; pilot transcription from a finding aid (see orthography), to be re-collated against the pinned scan in phase 4c",
      "text": "Nec uero non omni supplicio digni P. Claudius L. Iunius consules, qui contra auspicia nauigauerunt; parendum enim religioni fuit nec patrius mos tam contumaciter repudiandus. Iure igitur alter populi iudicio damnatus est, alter mortem sibi ipse consciuit. \"Flaminius non paruit auspiciis, itaque periit cum exercitu.\" At anno post Paulus paruit; num minus cecidit in Cannensi pugna cum exercitu? Etenim, ut sint auspicia, quae nulla sunt, haec certe, quibus utimur, siue tripudio siue de caelo, simulacra sunt auspiciorum, auspicia nullo modo. \"Q. Fabi, te mihi in auspicio esse uolo.\" Respondet: \"Audiui.\" Hic apud maiores adhibebatur peritus, nunc quilubet. Peritum autem esse necesse est eum qui, silentium quid sit, intellegat; id enim silentium dicimus in auspiciis, quod omni uitio caret. Hoc intellegere perfecti auguris est; illi autem qui in auspicium adhibetur, cum ita imperauit is, qui auspicatur: \"Dicito, si silentium esse uidebitur\", nec suspicit nec circumspicit; statim respondet silentium esse uideri. Tum ille: \"Dicito, si pascentur.\" \"Pascuntur\". Quae aues? Aut ubi? Attulit, inquit, in cauea pullos is, qui ex eo ipso nominatur pullarius. Haec sunt igitur aues internuntiae Iouis! Quae pascantur necne, quid refert? Nihil ad auspicia; sed quia, cum pascuntur, necesse est aliquid ex ore cadere et terram pauire (terripauium primo, post terripudium dictum est; hoc quidem iam tripudium dicitur) — cum igitur offa cecidit ex ore pulli, tum auspicanti tripudium solistimum nuntiatur. Ergo hoc auspicium diuini quicquam habere potest, quod tam sit coactum et expressum? Quo antiquissumos augures non esse usos argumento est, quod decretum collegii uetus habemus omnem auem tripudium facere posse. Tum igitur esset auspicium, si modo esset ei liberum se ostendisse; tum auis illa uideri posset interpres et satelles Iouis; nunc uero inclusa in cauea et fame enecta si in offam pultis inuadit, et si aliquid ex eius ore cecidit, hoc tu auspicium aut hoc modo Romulum auspicari solitum putas?"
    },
    "translations": [
      {
        "label": "C. D. Yonge (1853)",
        "licence": "Public domain — C. D. Yonge, The Treatises of M. T. Cicero (Bohn, 1853); pilot transcription from OCR, scan proofing pending",
        "text": "And certainly the consuls P. Claudius and L. Junius deserved severe punishment, who set sail in defiance of the auspices; for they ought to have been obedient to the established religion, and not to have rejected so obstinately the national ceremonials. Justly, therefore, was one of them condemned by the judgment of the people, while the other perished by his own hand. Flaminius, likewise, was not duly submissive to the auspices; and that was the reason, you say, why he was defeated. But, the year afterwards, Paullus was guided by them. Did he the less for that perish with his army in the battle of Cannae? Even allowing the existence of auspices, which I do not, certainly those at present in use, whether by means of birds or celestial signs, are but mere semblances of auspices, and not real ones. \"Quintus Fabius, I pray thee, assist me in the auspices.\" He answers, \"I have heard.\" The augurial officer among our forefathers was a skilful and learned man; now they take the first that offers. For a man must needs be skilful and learned who understands the meaning of silence. For in auspices we call that silence which is free from all irregularity. To understand this, belongs to a perfect augur. It sometimes happens, however, that when he who wishes to consult the auspices has said to the augur whom he has chosen to assist him, \"Say, if silence is observed,\" the augur, without looking above or around him, answers immediately, \"Silence appears to be observed.\" On this the consulter rejoins, \"Tell me whether the chickens are eating.\" The augur replies, \"They are eating.\" But when the consulter further demands, \"What kind of fowls are they, and whence do they come?\" the augur answers, \"The chickens were brought in a cage by a person who is termed a poulterer.\" Such, then, are the illustrious birds whom we call, forsooth, the messengers of Jupiter; and whether they eat or not, what does it signify? Certainly nothing to the auspices. But since, if they eat at all, some portion of food must inevitably fall on the ground and strike (pavire) the earth, this was at first called terripavium, then terripudium, and is now called tripudium. When, therefore, the chicken lets fall from its beak a particle of its food, the augur declares that the tripudium solistimum is consummated. What true divination can there be in an auspice of this nature, so artificially forced and tortured? which, we have a proof, was not used among the most ancient augurs; for we have an ancient decree of the college of augurs, that any bird may make the tripudium. So that, then, there would be an auspice if the bird was free to show itself and the bird might appear to be the messenger and interpreter of Jupiter. But when a miserable bird is kept in a cage, and ready to die of hunger, — if such an one, when pecking up its food, happens to let some particle fall, can you think this an auspice, or do you believe that Romulus consulted the gods in this manner?"
      },
      {
        "label": "Augury literal note",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Three sentences carry the rules. (1) \"For what we call silentium in auspices is that which is free from every ritual fault\" (id enim silentium dicimus in auspiciis, quod omni uitio caret) — uitium is ritual fault, not Yonge’s \"irregularity\", and silentium is not literal quiet. (2) \"When, therefore, a lump of cake has fallen from a chicken’s beak, then a tripudium solistimum [the full feeding-sign] is reported to the man taking the auspices\" (cum igitur offa cecidit ex ore pulli, tum auspicanti tripudium solistimum nuntiatur) — food actually falling and striking the ground (terram pauire) is the whole criterion. (3) \"We have an old decree of the college that any bird can make a tripudium\" (decretum collegii uetus habemus omnem auem tripudium facere posse). The pullarius is the chicken-keeper, not Yonge’s \"poulterer\"; the bird \"shut in a cage and starved to death with hunger\" (inclusa in cauea et fame enecta) is Marcus’s contemptuous picture of a forced auspice. Marcus describes the rite to ridicule it; the description is evidence precisely because he expects the reader to recognise it."
      }
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Pilot text transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/; under the provenance rule (docs/SOURCES.md) the pinned scan is copy-text and this text is provisional until phase 4c collation. The silentium definition stands at the end of §71 in the standard sectioning; the span 71–73 is quoted whole so that no rule sentence is cut from its context. Finding-aid spellings quilubet, antiquissumos retained. Yonge’s spelling of terripavium is taken from the Latin pending Bohn-scan proofing (OCR is illegible at that word).",
    "rules": [
      "R-SILENTIUM",
      "R-TRIP-ANY",
      "B-PULLI"
    ],
    "source": {
      "edition": "Latin Library text (finding aid only); Yonge OCR",
      "page": "Cic. Div. 2.71–73",
      "cache": "latlib-cicero-divinatione2.html + treatisescicero00ciceuoft_djvu.txt"
    }
  },
  {
    "id": "cic-nd-2-7",
    "citation": "Cicero, De natura deorum 2.7",
    "speaker": "Balbus, the Stoic spokesman in Cicero, De natura deorum 2",
    "date": "45 BC",
    "tier": "balbus",
    "original": {
      "lang": "la",
      "licence": "Public domain — ancient text; pilot transcription from a finding aid (see orthography), to be re-collated against the pinned scan in phase 4c",
      "text": "Praedictiones uero et praesensiones rerum futurarum quid aliud declarant nisi hominibus ea, quae sint, ostendi, monstrari, portendi, praedici, ex quo illa ostenta, monstra, portenta, prodigia dicuntur. Quod si ea ficta credimus licentia fabularum, Mopsum, Tiresiam, Amphiaraum, Calchantem, Helenum (quos tamen augures ne ipsae quidem fabulae adsciuissent, si res omnino repudiarent), ne domesticis quidem exemplis docti numen deorum conprobabimus? Nihil nos P. Clodi bello Punico primo temeritas mouebit, qui etiam per iocum deos inridens, cum cauea liberati pulli non pascerentur, mergi eos in aquam iussit, ut biberent, quoniam esse nollent? Qui risus classe deuicta multas ipsi lacrimas, magnam populo Romano cladem attulit. Quid collega eius, [L.] Iunius, eodem bello nonne tempestate classem amisit, cum auspiciis non paruisset? Itaque Clodius a populo condemnatus est, Iunius necem sibi ipse consciuit."
    },
    "translations": [
      {
        "label": "C. D. Yonge (1853)",
        "licence": "Public domain — C. D. Yonge, The Treatises of M. T. Cicero (Bohn, 1853); pilot transcription from OCR, scan proofing pending",
        "text": "What do predictions and foreknowledge of future events indicate, but that such future events are shown, pointed out, portended, and foretold to men? From whence they are called omens, signs, portents, prodigies. But though we should esteem fabulous what is said of Mopsus, Tiresias, Amphiaraus, Calchas, and Helenus, (who would not have been delivered down to us as augurs even in fable, if their art had been despised,) may we not be sufficiently apprised of the power of the Gods by domestic examples? Will not the temerity of P. Claudius, in the first Punic war, affect us? who, when the poultry were let out of the coop and would not feed, ordered them to be thrown into the water, and, joking even upon the Gods, said, with a sneer, Let them drink, since they will not eat; which piece of ridicule, being followed by a victory over his fleet, cost him many tears, and brought great calamity on the Roman people. Did not his colleague Junius, in the same war, lose his fleet in a tempest by disregarding the auspices? Claudius therefore was condemned by the people; and Junius killed himself."
      },
      {
        "label": "Augury literal note",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "The Pulcher sentence literally: \"Shall we not be moved by the recklessness of Publius Clodius [i.e. P. Claudius Pulcher] in the First Punic War, who, mocking the gods even in jest, when the chickens, let out of the cage, would not feed, ordered them to be plunged into the water, so that they might drink, since they would not eat?\" Esse is ēsse, \"to eat\" (long e), not \"to be\"; the macron is ours, in this note only. The Latin is indirect throughout — Yonge’s direct speech (\"Let them drink, since they will not eat\") is his recasting, not a verbatim ancient quotation, and his \"poultry/coop\" domesticates pulli/cauea, the sacred chickens and their cage. Balbus tells the story in favour of traditional religion. Polybius, the main source for the battle of Drepana (249 BC), never mentions the chickens; the story is later Roman moralising."
      }
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Pilot text transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/; under the provenance rule (docs/SOURCES.md) the pinned scan is copy-text and this text is provisional until phase 4c collation. Finding-aid text spells the consul Clodius/Clodi (Yonge and common usage: Claudius Pulcher); the spelling is printed as transmitted and glossed in the literal note. Square brackets around [L.] Iunius are the finding-aid editor’s supplement.",
    "rules": [],
    "source": {
      "edition": "Latin Library text (finding aid only); Yonge OCR",
      "page": "Cic. ND 2.7",
      "cache": "latlib-cicero-nd2.html + treatisescicero00ciceuoft_djvu.txt"
    }
  },
  {
    "id": "livy-10-40",
    "citation": "Livy, Ab urbe condita 10.40",
    "speaker": "Livy (historical narrative; Papirius in direct speech)",
    "date": "late 1st century BC",
    "tier": "history",
    "original": {
      "lang": "la",
      "licence": "Public domain — ancient text; pilot transcription from a finding aid (see orthography), to be re-collated against the pinned scan in phase 4c",
      "text": "Haec comperta perfugarum indiciis cum apud infensos iam sua sponte milites disseruisset, simul diuinae humanaeque spei pleni clamore consentienti pugnam poscunt; paenitet in posterum diem dilatum certamen; moram diei noctisque oderunt. Tertia uigilia noctis iam relatis litteris a collega Papirius silentio surgit et pullarium in auspicium mittit. Nullum erat genus hominum in castris intactum cupiditate pugnae; summi infimique aeque intenti erant; dux militum, miles ducis ardorem spectabat. Is ardor omnium etiam ad eos qui auspicio intererant peruenit; nam cum pulli non pascerentur, pullarius auspicium mentiri ausus tripudium solistimum consuli nuntiauit. Consul laetus auspicium egregium esse et deis auctoribus rem gesturos pronuntiat signumque pugnae proponit. Exeunti iam forte in aciem nuntiat perfuga uiginti cohortes Samnitium — quadringenariae ferme erant — Cominium profectas. Quod ne ignoraret collega, extemplo nuntium mittit; ipse signa ocius proferri iubet. Subsidia suis quaeque locis et praefectos subsidiis attribuerat; dextro cornu L. Uolumnium, sinistro L. Scipionem, equitibus legatos alios, C. Caedicium et <T.> Trebonium, praefecit; Sp. Nautium mulos detractis clitellis cum <tribus> cohortibus alariis in tumulum conspectum propere circumducere iubet atque inde inter ipsam dimicationem quanto maxime posset motu pulueris se ostendere. Dum his intentus imperator erat, altercatio inter pullarios orta de auspicio eius diei exauditaque ab equitibus Romanis, qui rem haud spernendam rati Sp. Papirio, fratris filio consulis, ambigi de auspicio renuntiauerunt. Iuuenis ante doctrinam deos spernentem natus rem inquisitam ne quid incompertum deferret ad consulem detulit. Cui ille: \"tu quidem macte uirtute diligentiaque esto; ceterum qui auspicio adest, si quid falsi nuntiat, in semet ipsum religionem recipit; mihi quidem tripudium nuntiatum, populo Romano exercituique egregium auspicium est.\" Centurionibus deinde imperauit uti pullarios inter prima signa constituerent. Promouent et Samnites signa; insequitur acies ornata armataque, ut hostibus quoque magnificum spectaculum esset. Priusquam clamor tolleretur concurrereturque, emisso temere pilo ictus pullarius ante signa cecidit; quod ubi consuli nuntiatum est, \"di in proelio sunt\" inquit; \"habet poenam noxium caput.\" Ante consulem haec dicentem coruus uoce clara occinuit; quo laetus augurio consul, adfirmans nunquam humanis rebus magis praesentes interfuisse deos, signa canere et clamorem tolli iussit."
    },
    "translations": [
      {
        "label": "Cyrus R. Edmonds (1850)",
        "licence": "Public domain — Cyrus R. Edmonds, Livy Books 9–26 (Bohn, 1850); translator life dates to confirm (docs/SOURCES.md); pilot transcription from Project Gutenberg #10907",
        "text": "When the consul had recounted these particulars, ascertained from the information of the deserters, to the soldiers already enraged of themselves, they then, filled with confidence in both divine and human aid, with one universal shout, demanded the battle; were dissatisfied at the action being deferred to the following day; they are impatient under the intended delay of a day and a night. Papirius, at the third watch, having received his colleague’s letter, arose in silence, and sent the keeper of the chickens to take the auspices. There was no one description of men in the camp who felt not earnest wishes for the fight: the highest and the lowest were equally eager; the general watching the ardour of the soldiers, and the soldiers that of the general. This universal zeal spread even to those employed in taking the auspices; for the chickens having refused to feed, the auspex ventured to misrepresent the omen, and reported to the consul that they had fed voraciously. The consul, highly pleased, and giving notice that the auspices were excellent, and that they were to act under the direction of the gods, displayed the signal for battle. Just as he was going out to the field, he happened to receive intelligence from a deserter, that twenty cohorts of Samnites, consisting of about four hundred each, had marched towards Cominium. Lest his colleague should be ignorant of this, he instantly despatched a messenger to him, and then ordered the troops to advance with speed, having already assigned to each division of the army its proper post, and appointed general officers to command them. The command of the right wing he gave to Lucius Volumnius, that of the left to Lucius Scipio, that of the cavalry to the other lieutenants-general, Caius Caedicius and Caius Trebonius. He ordered Spurius Nautius to take off the panniers from the mules, and to lead them round quickly, together with his auxiliary cohorts, to a rising ground in view; and there to show himself during the heat of the engagement, and to raise as much dust as possible. While the general was employed in making these dispositions, a dispute arose among the keepers of the chickens, about the auspices of the day, which was overheard by some Roman horsemen, who, deeming it a matter not to be slighted, informed Spurius Papirius, the consul’s nephew, that there was a doubt about the auspices. The youth, born in an age when that sort of learning which inculcates contempt of the gods was yet unknown, examined into the affair, that he might not carry an uncertain report to the consul; and then acquainted him with it. His answer was, \"I very much applaud your conduct and zeal. However, the person who officiates in taking the auspices, if he makes a false report, draws on his own head the evil portended; but to the Roman people and their army, the favourable omen reported to me is an excellent auspice.\" He then commanded the centurions to place the keepers of the chickens in the front of the line. The Samnites likewise brought forward their standards; their main body followed, armed and decorated in such a manner, that the enemy afforded a magnificent show. Before the shout was raised, or the battle begun, the auspex, wounded by a random cast of a javelin, fell before the standards; which being told to the consul, he said, \"The gods are present in the battle; the guilty has met his punishment.\" While the consul uttered these words, a crow, in front of him, cawed with a clear voice; at which augury, the consul being rejoiced, and affirming, that never had the gods interposed in a more striking manner in human affairs, ordered the charge to be sounded and the shout to be raised."
      },
      {
        "label": "Augury literal note",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Key clauses literally. \"In the third watch of the night Papirius rises in silentium [free of ritual fault, not merely quietly] and sends the pullarius [chicken-keeper] to take the auspice.\" \"When the chickens would not feed (cum pulli non pascerentur), the pullarius dared to lie about the auspice and reported a tripudium solistimum [the full feeding-sign] to the consul\" — Edmonds’ \"fed voraciously\" loses the technical term (it is in his footnote, misprinted solistinum in the Gutenberg text; the footnote is not Livy and is not reproduced in the translation above), and his \"auspex\" for pullarius suggests the auspice-holder, who is Papirius himself. Papirius’ reply: \"Whoever attends upon the auspice, if he reports anything false, takes the religious liability upon his own head (in semet ipsum religionem recipit); as far as I am concerned, a tripudium has been reported; for the Roman people and army it is an excellent auspice.\" Edmonds’ \"the evil portended\" turns religio (binding liability before the gods) into a bad omen. At the end a raven (coruus), not Edmonds’ \"crow\", \"croaked with clear voice in front of the consul as he spoke\"; Livy gives no side, and none should be retro-fitted. The chapter contains no outcome in which the chickens flap, cry out, or fly off."
      }
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Pilot text transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/; under the provenance rule (docs/SOURCES.md) the pinned scan is copy-text and this text is provisional until phase 4c collation. Whole chapter quoted; section numbers (10.40.4 for the refusal, 10.40.11 for the false-report sentence) are conventional and are not marked in the finding-aid HTML. Angle-bracket supplements <T.> and <tribus> are the finding-aid editor’s. Edmonds prints \"Caius Trebonius\" against this text’s uncertain praenomen.",
    "rules": [
      "R-FALSE"
    ],
    "source": {
      "edition": "Latin Library text (finding aid only); Edmonds Gutenberg #10907",
      "page": "Livy 10.40 (whole chapter)",
      "cache": "latlib-livy-liv.10.html + pg10907.txt"
    }
  },
  {
    "id": "cic-div-2-82",
    "citation": "Cicero, De divinatione 2.82",
    "speaker": "Marcus, in Cicero, De divinatione 2",
    "date": "44 BC",
    "tier": "marcus",
    "original": {
      "lang": "la",
      "text": "Ad nostri augurii consuetudinem dixit Ennius: \"tum tonuit laeuum bene tempestate serena.\" At Homericus Aiax apud Achillem querens de ferocitate Troianorum nescio quid hoc modo nuntiat: \"prospera Iuppiter his dextris fulgoribus edit.\" Ita nobis sinistra uidentur, Graiis et barbaris dextra meliora; quamquam haud ignoro, quae bona sint, sinistra nos dicere, etiamsi dextra sint; sed certe nostri sinistrum nominauerunt externique dextrum, quia plerumque id melius uidebatur. Haec quanta dissensio est!",
      "licence": "Public domain — ancient text (Latin Library text (C. F. W. Müller, Teubner, lineage; finding aid only)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Ennius spoke after the custom of our augury: \"then it thundered on the left, well, in a clear sky.\" But Homer's Ajax, complaining to Achilles of the Trojans' fierceness, reports something after this fashion: \"Jupiter sends forth favourable signs with these lightnings on the right.\" So to us things on the left seem better, to Greeks and foreigners things on the right; although I am well aware that we call things \"left\" which are good, even if they are on the right; but certainly our people named the left, and foreigners the right, [as the better], because for the most part that seemed the better. What a disagreement this is!"
      }
    ],
    "rules": [
      "R-SIDE"
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid (UTF-16 file decoded) in scripts/.cache/sources/; no pinned Cicero scan is in the cache, so under the provenance rule this remains a finding-aid transcription for phase 4c collation. Our literal translation is printed; Yonge (1853) is PD and available in the cache OCR but is not reproduced here (see docs/PILOT.md, 4b passages).",
    "source": {
      "edition": "Latin Library text (C. F. W. Müller, Teubner, lineage; finding aid only)",
      "page": "De divinatione 2.82 (section; no scan page pinned)",
      "cache": "latlib-cicero-divinatione2.html"
    }
  },
  {
    "id": "hom-il-12-237-243",
    "citation": "Homer, Iliad 12.237–243",
    "speaker": "Hector, in Homer",
    "date": "c. 8th century BC (traditional)",
    "tier": "poetry",
    "original": {
      "lang": "grc",
      "text": "Πουλυδάμα, σὺ μὲν οὐκέτ᾽ ἐμοὶ φίλα ταῦτ᾽ ἀγορεύεις· οἶσθα καὶ ἄλλον μῦθον ἀμείνονα τοῦδε νοῆσαι. εἰ δ᾽ ἐτεὸν δὴ τοῦτον ἐτήτυμον ἔκφατο μῦθον, σοὶ δέ τε θυμὸν ὄλεσσαν ἐνὶ φρεσὶ δαίμονες αὐτοί, ὅς κέ με φῇς Διὸς ἐκλελαθέσθαι ἐφετμέων, ἥν τέ μοι αὐτὸς ὑπέσχετο καὶ κατένευσεν· τὺ δέ μ᾽ οἰωνοῖσι τανυπτερύγεσσι κελεύεις πείθεσθαι, τῶν οὔ τι μετατρέπομ᾽ οὐδ᾽ ἀλεγίζω, εἴτ᾽ ἐπὶ δεξί᾽ ἴωσι πρὸς ἠῶ τ᾽ ἠέλιόν τε, εἴτ᾽ ἐπ᾽ ἀριστερὰ τοί γε ποτὶ ζόφον ἠερόεντα. ἡμεῖς δὲ μεγάλοιο Διὸς πειθώμεθα βουλῇ, ὃς πᾶσι θνητοῖσι καὶ ἀθανάτοισιν ἀνάσσει. εἷς οἰωνὸς ἄριστος ἀμύνεσθαι περὶ πάτρης.",
      "licence": "Public domain — ancient text (Monro–Allen, Oxford Classical Texts, Homeri Opera vol. I (1902)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Samuel Butler (1898)",
        "licence": "Public domain — Samuel Butler, The Iliad (1898); transcribed from Project Gutenberg #2199",
        "text": "You would have me pay no heed to the counsels of Jove, nor to the promises he made me—and he bowed his head in confirmation; you bid me be ruled rather by the flight of wild-fowl. What care I whether they fly towards dawn or dark, and whether they be on my right hand or on my left? Let us put our trust rather in the counsel of great Jove, king of mortals and immortals. There is one omen, and one only—that a man should fight for his country."
      },
      {
        "label": "Augury literal note",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Lines 239–240 literally: \"whether they go to the right, towards dawn and the sun, or to the left, towards murky darkness\" (εἴτ᾽ ἐπὶ δεξί᾽ ἴωσι πρὸς ἠῶ τ᾽ ἠέλιόν τε, / εἴτ᾽ ἐπ᾽ ἀριστερὰ τοί γε ποτὶ ζόφον ἠερόεντα). Butler keeps the dawn/dark contrast here; the right = dawn link is the clause on which the Greek-orientation discussion turns. Line 243: \"One bird-sign is best: to fight in defence of one's country.\" Hector is rejecting Poulydamas' bird-sign, not laying down a rule of interpretation."
      }
    ],
    "rules": [
      "R-SIDE"
    ],
    "orthography": "Greek polytonic as in the Monro–Allen OCT received text. The cache scan (bwb_Y0-BSA-064_1.txt, archive.org owb_YO-BSA-064_1) is Monro–Allen OCT vol. I (Iliad 1–12, 1902); its OCR of the Greek is illegible, so the text above follows the received OCT wording with Butler as control and must be letter-checked against the scan image in phase 4c. Butler excerpt trimmed to the quoted span; line 237 opening words are covered by the literal note's context.",
    "source": {
      "edition": "Monro–Allen, Oxford Classical Texts, Homeri Opera vol. I (1902)",
      "page": "Iliad 12.237–243 (scan owb_YO-BSA-064_1; printed page to confirm from image in 4c)",
      "cache": "bwb_Y0-BSA-064_1.txt"
    }
  },
  {
    "id": "serv-aen-6-191",
    "citation": "Servius on Vergil, Aeneid 6.191",
    "speaker": "Servius",
    "date": "late 4th / early 5th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Sciendum augures captantes auguria certa sibi spatia designare, quibus uolebant uidenda ad se pertinere.",
      "licence": "Public domain — ancient text (Thilo–Hagen, Servii grammatici commentarii, vol. II (1884)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "It should be known that augurs, when taking auguries, mark out fixed spaces for themselves, within which they wished the things to be seen to pertain to them."
      }
    ],
    "rules": [
      "R-TEMPLUM"
    ],
    "orthography": "u/i normalised. Wording as quoted in PLAN §3.2 (R-TEMPLUM) from Servius on Aeneid 6.191. The cache holds Thilo–Hagen vol. II OCR (Aeneid 6–12: serviigrammatic02thilgoog.txt); the OCR at this locus is too corrupt to letter-verify the sentence, so the text is printed as received and flagged for image collation in 4c. No PD English exists (SOURCES); translation ours.",
    "source": {
      "edition": "Thilo–Hagen, Servii grammatici commentarii, vol. II (1884)",
      "page": "ad Aen. 6.191 (Thilo–Hagen II; OCR locus corrupt, page to confirm from scan in 4c)",
      "cache": "serviigrammatic02thilgoog.txt"
    }
  },
  {
    "id": "serv-aen-6-190",
    "citation": "Servius on Vergil, Aeneid 6.190",
    "speaker": "Servius",
    "date": "late 4th / early 5th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Auguria aut oblatiua sunt, quae non poscuntur, aut inpetratiua, quae optata ueniunt.",
      "licence": "Public domain — ancient text (Thilo–Hagen, vol. II (1884)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Auguries are either oblative, which are not asked for, or impetrative (inpetratiua), which come in answer to a wish."
      }
    ],
    "rules": [
      "R-ASK"
    ],
    "orthography": "u/i normalised; inpetratiua spelling retained as quoted in PLAN §3.2 (R-ASK). Same Thilo–Hagen vol. II cache and same collation caveat as serv-aen-6-191. Translation ours (no PD English).",
    "source": {
      "edition": "Thilo–Hagen, vol. II (1884)",
      "page": "ad Aen. 6.190 (page to confirm from scan in 4c)",
      "cache": "serviigrammatic02thilgoog.txt"
    }
  },
  {
    "id": "serv-aen-3-89",
    "citation": "Servius on Vergil, Aeneid 3.89",
    "speaker": "Servius",
    "date": "late 4th / early 5th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Auguriorum genera quinque sunt: ex caelo, ex auibus, ex tripudiis, ex quadrupedibus, ex diris.",
      "licence": "Public domain — ancient text (Thilo–Hagen, vol. I (1881) — not in local cache); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "There are five kinds of auguries: from the sky, from birds, from feeding-signs (tripudia), from four-footed animals, from dire signs."
      }
    ],
    "rules": [],
    "orthography": "u/i normalised. The five-genera list as cited in PLAN §3.1 scope note. The cache Servius volume covers Aeneid 6–12 only, so Aen. 3.89 cannot be verified from local sources; the locus itself was already marked verify: in PLAN/SOURCES and remains open (see docs/PILOT.md, 4b passages). Text printed in the received form; translation ours.",
    "source": {
      "edition": "Thilo–Hagen, vol. I (1881) — not in local cache",
      "page": "ad Aen. 3.89 (unverified; no local scan)",
      "cache": "— (no local copy; Thilo vol. I wanting)"
    }
  },
  {
    "id": "serv-aen-12-259",
    "citation": "Servius on Vergil, Aeneid 12.259",
    "speaker": "Servius",
    "date": "late 4th / early 5th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Oblatiua auguria refutari possunt: non enim necesse est ea quae non poscuntur accipere.",
      "licence": "Public domain — ancient text (Thilo–Hagen, vol. II (1884)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Oblative auguries can be refused: there is no necessity to accept signs that were not asked for."
      }
    ],
    "rules": [
      "R-DECLINE"
    ],
    "orthography": "u/i normalised. Sense as cited for R-DECLINE in PLAN §3.2; the exact lemma wording at Aen. 12.259 could not be letter-verified in the corrupt Thilo vol. II OCR and is printed in received form for 4c image collation. This record must not be quoted as letter-exact until then. Translation ours.",
    "source": {
      "edition": "Thilo–Hagen, vol. II (1884)",
      "page": "ad Aen. 12.259 (lemma wording unverified in OCR; confirm from scan in 4c)",
      "cache": "serviigrammatic02thilgoog.txt"
    }
  },
  {
    "id": "fest-oscines",
    "citation": "Festus, De verborum significatu s.v. Oscines",
    "speaker": "Festus, epitomising Verrius Flaccus; quoting Appius Claudius",
    "date": "2nd century AD (source Augustan)",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Oscines aues Ap. Claudius esse ait, quae ore canentes faciant auspicium, ut coruus, cornix, noctua; alites, quae alis ac uolatu, ut buteo, sanqualis, aquila, inmusulus, uulturius; picus autem Martius Feroniusque et parra et in oscinibus et in alitibus habentur.",
      "licence": "Public domain — ancient text (Lindsay, Teubner 1913); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Appius Claudius says that oscines are the birds which make an auspice by singing with the mouth, as the raven, the crow, the little owl; alites those which [do so] by wings and flight, as the buzzard (buteo), the sanqualis, the eagle, the inmusulus, the vulture; but the woodpecker of Mars and of Feronia and the parra are counted both among the oscines and among the alites. Sanqualis, inmusulus and parra are unidentified and are left in Latin (STYLE §3)."
      }
    ],
    "rules": [
      "R-MODE",
      "B-RAVEN",
      "B-CROW",
      "B-NOCTUA",
      "B-EAGLE",
      "B-VULTURE",
      "B-HAWK",
      "B-PICUS"
    ],
    "orthography": "u/i normalised. Transcribed from Lindsay 1913 OCR (bwb_C0-AXI-081.txt): OCR reads \"alis ae volatu\", \"aquia\", \"qTpicam autt\" — corrected to ac, aquila, picus autem against sense and the Thewrewk OCR; every correction is listed here per STYLE §9. Lindsay p. 197 area (Müller p. 197 M in PLAN). Translation ours (no PD English).",
    "source": {
      "edition": "Lindsay, Teubner 1913",
      "page": "s.v. Oscines, Lindsay p. 197 (Müller p. 197 M); OCR leaf headed 228/197 in cache file",
      "cache": "bwb_C0-AXI-081.txt"
    }
  },
  {
    "id": "plaut-asin-259-264",
    "citation": "Plautus, Asinaria 259–264",
    "speaker": "A slave character, in Plautus",
    "date": "c. 200 BC",
    "tier": "comedy",
    "original": {
      "lang": "la",
      "text": "impetritum, inauguratumst: quouis admittunt aues, picus et cornix ab laeua, coruos parra ab dextera consuadent; certum hercle est uostram consequi sententiam. Sed quid hoc, quod picus ulmum tundit? Non temerarium est. Certe hercle ego quantum ex augurio eius pici intellego, aut mihi in mundo sunt uirgae aut atriensi Saureae.",
      "licence": "Public domain — ancient text (Latin Library text (Leo/Lindsay lineage; finding aid only)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Obtained by auspice, inaugurated: the birds allow [me to go] anywhere — woodpecker and crow on the left, raven and parra on the right advise it together; by Hercules, I am resolved to follow your judgement. But what is this, that a woodpecker is hammering an elm? That is not without meaning. Certainly, by Hercules, so far as I understand from that woodpecker's augury, either I have a beating in store, or Saurea the steward has.\" Parra is unidentified and left in Latin. The speaker is the slave Libanus, inventing convenient signs; the comedy is the point."
      }
    ],
    "rules": [
      "R-EXCEPT",
      "R-CLEAR",
      "B-RAVEN",
      "B-CROW",
      "B-PICUS"
    ],
    "orthography": "u/i normalised; line numbers 259–264 (Latin Library numbers 260 at coruos). Transcribed from the Latin Library finding aid; Riley's PD translation (Bohn, 1852) is not in the local cache, so our literal translation is printed (SOURCES allows Riley when fetched).",
    "source": {
      "edition": "Latin Library text (Leo/Lindsay lineage; finding aid only)",
      "page": "Asinaria 259–264 (lines; act 2)",
      "cache": "latlib-plautus-asinaria.html"
    }
  },
  {
    "id": "pliny-nh-10-33",
    "citation": "Pliny, Naturalis historia 10.33",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Pessima eorum significatio, cum gluttiunt uocem uelut strangulati.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Their signification is worst when they swallow their voice as if choked.\" The sentence closes Pliny's raven chapter; the preceding sentence (ravens leaving the Peloponnese and Attica when guest-friends were murdered) is narrative and is not part of the rule span. Bostock–Riley: \"They are of the very worst omen when they swallow their voice, as if they were being choked\" (Book 10, ch. 15 in Bohn chapter numbering)."
      }
    ],
    "rules": [
      "R-DIRA",
      "B-RAVEN"
    ],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 10.33 (Mayhoff §33; Bostock–Riley Book 10 ch. 15)",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "pliny-nh-10-30",
    "citation": "Pliny, Naturalis historia 10.30",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Ipsa ales est inauspicatae garrulitatis, a quibusdam tamen laudata. Inauspicatissima fetus tempore, hoc est post solstitium.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"The bird itself is one of unfavourable chattering, though praised by some. [It is] most unfavourable at breeding time, that is, after the solstice.\" Inauspicatae is kept as \"unfavourable\", not the banned \"inauspicious\" as a verdict word (STYLE §§1, 7); the Latin adjective is Pliny's. Shown as a gloss; the engine does not weigh season."
      }
    ],
    "rules": [
      "B-CROW"
    ],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 10.30 (Mayhoff §30)",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "pliny-nh-10-34-35",
    "citation": "Pliny, Naturalis historia 10.34–35",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Bubo, funebris et maxime abominatus publicis praecipue auspiciis, deserta incolit nec tantum desolata, sed dira etiam et inaccessa, noctis monstrum, nec cantu aliquo uocalis, sed gemitu. Itaque in urbibus aut omnino in luce uisus dirum ostentum est.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"The eagle-owl (bubo), funereal and most abhorred especially in public auspices, lives in desert places — and not only desolate ones, but dire and unapproachable — a monster of the night, vocal not in any song but in a groan. And so, seen in cities or in daylight at all, it is a dire ostentum.\" Bostock–Riley render bubo \"horned owl\"; the engine's bird is the eagle-owl (STYLE §3). The daylight clause is the dire criterion; at night the bird is weighed normally."
      }
    ],
    "rules": [
      "R-DIRA",
      "B-BUBO"
    ],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 10.34–35 (Mayhoff §§34–35; Bostock–Riley Book 10 ch. 16, 'The horned owl')",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "pliny-nh-10-6",
    "citation": "Pliny, Naturalis historia 10.6",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Ex his quas nouimus aquilae maximus honos, maxima et uis.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Of the [birds] we know, the eagle has the greatest honour, and the greatest strength too.\" The sentence opens Pliny's eagle chapters and states the hierarchy the weights reconstruct; the numbers are ours, not Pliny's."
      }
    ],
    "rules": [
      "B-EAGLE"
    ],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 10.6 (Mayhoff §6)",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "livy-1-34-8-9",
    "citation": "Livy, Ab urbe condita 1.34.8–9",
    "speaker": "Livy (foundation narrative)",
    "date": "late 1st century BC",
    "tier": "legend",
    "original": {
      "lang": "la",
      "text": "Ad Ianiculum forte uentum erat; ibi ei carpento sedenti cum uxore aquila suspensis demissa leuiter alis pilleum aufert, superque carpentum cum magno clangore uolitans rursus uelut ministerio diuinitus missa capiti apte reponit; inde sublimis abiit. Accepisse id augurium laeta dicitur Tanaquil, perita ut uolgo Etrusci caelestium prodigiorum mulier. Excelsa et alta sperare complexa uirum iubet: eam alitem ea regione caeli et eius dei nuntiam uenisse; circa summum culmen hominis auspicium fecisse; leuasse humano superpositum capiti decus ut diuinitus eidem redderet.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "D. Spillan (1849)",
        "licence": "Public domain — D. Spillan, Livy Books 1–8 (Bohn, 1849); transcribed from Project Gutenberg #19725",
        "text": "They happened to have reached the Janiculum; there, as he sat in the chariot with his wife, an eagle, suspended on her wings, gently stooping, takes off his cap, and flying round the chariot with loud screams, as if she had been sent from heaven for the very purpose, orderly replaced it on his head, and then flew aloft. Tanaquil is said to have received this omen with great joy, being a woman well skilled, as the Etrurians generally are, in celestial prodigies, and embracing her husband, bids him hope for high and elevated fortune: that such bird had come from such a quarter of the heavens, and the messenger of such a god: that it had exhibited the omen around the highest part of man: that it had lifted the ornament placed on the head of man, to restore it to the same, by direction of the gods."
      },
      {
        "label": "Augury literal note",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Literally the eagle \"made an auspice around the highest point of the man\" (circa summum culmen hominis auspicium fecisse) — Spillan's \"exhibited the omen\" weakens auspicium fecisse. Tarquin was travelling, not taking the auspices; Tanaquil reads a private oblative sign. The engine's \"stoop\" is the nearest recordable act, and the rule built on the story is labelled reconstruction."
      }
    ],
    "rules": [
      "R-TANAQUIL",
      "B-EAGLE"
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages).",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Livy 1.34.8–9",
      "cache": "latlib-livy-liv.1.html + pg19725.txt (Spillan)"
    }
  },
  {
    "id": "livy-1-7-1",
    "citation": "Livy, Ab urbe condita 1.7.1",
    "speaker": "Livy (foundation narrative)",
    "date": "late 1st century BC",
    "tier": "legend",
    "original": {
      "lang": "la",
      "text": "Palatium Romulus, Remus Auentinum ad inaugurandum templa capiunt. Priori Remo augurium uenisse fertur, sex uoltures; iamque nuntiato augurio cum duplex numerus Romulo se ostendisset, utrumque regem sua multitudo consaluutauerat: tempore illi praecepto, at hi numero auium regnum trahebant. Inde cum altercatione congressi certamine irarum ad caedem uertuntur; ibi in turba ictus Remus cecidit.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "D. Spillan (1849)",
        "licence": "Public domain — D. Spillan, Livy Books 1–8 (Bohn, 1849); transcribed from Project Gutenberg #19725",
        "text": "Romulus chose the Palatine and Remus the Aventine hill as their stands to make their observations. It is said, that to Remus an omen came first, six vultures; and now, the omen having been declared, when double the number presented itself to Romulus, his own party saluted each king; the former claimed the kingdom on the ground of priority of time, the latter on account of the number of birds. Upon this, having met in an altercation, from the contest of angry feelings they turn to bloodshed; there Remus fell from a blow received in the crowd."
      },
      {
        "label": "Augury literal note",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Literally: \"those [Remus' men] dragged the kingship to themselves by priority of time, these [Romulus'] by the number of the birds\" (tempore illi praecepto, at hi numero auium regnum trahebant). Livy's finding-aid spelling uoltures/consaluutauerat is normalised in the Latin above to uoltures retained, consaluutauerat retained as transmitted. Two observers, two favourable signs, rival criteria — the Romulus/Remus gloss in the engine is an analogy, honestly labelled."
      }
    ],
    "rules": [
      "R-COUNT",
      "R-MIXED",
      "B-VULTURE",
      "R-WEIGH"
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages). R-WEIGH is attached as supporting context only: Livy narrates competing favourable signs weighed by rival criteria (priority against number); the strength arithmetic itself remains our reconstruction (PLAN §3.2 gives R-WEIGH no ancient source).",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Livy 1.7.1 (ch. 6 end–7.1 in some divisions)",
      "cache": "latlib-livy-liv.1.html + pg19725.txt (Spillan)"
    }
  },
  {
    "id": "cic-div-1-107-108-enn",
    "citation": "Ennius, Annales, quoted in Cicero, De divinatione 1.107–108",
    "speaker": "Ennius, quoted by Quintus in Cicero, De divinatione 1",
    "date": "Ennius 239–169 BC; quoted 44 BC",
    "tier": "poetry",
    "original": {
      "lang": "la",
      "text": "Itaque Romulus augur, ut apud Ennium est, cum fratre item augure: \"Curantes magna cum cura, tum cupientes regni dant operam simul auspicio augurioque. In monte Remus auspicio se deuouet atque secundam solus auem seruat; at Romulus pulcher in alto quaerit Auentino, seruat genus altiuolantum. Certabant, urbem Romam Remoramne uocarent; omnibus cura uiris uter esset induperator. Exspectant, ueluti consul cum mittere signum uolt, omnes auidi spectant ad carceris oras, quam mox emittat pictis e faucibus currus: sic exspectabat populus atque ore timebat rebus, utri magni uictoria sit data regni. Interea sol albus recessit in infera noctis. Exin candida se radiis dedit icta foras lux, et simul ex alto longe pulcherruma praepes laeua uolauit auis. Simul aureus exoritur sol, cedunt de caelo ter quattuor corpora sancta auium, praepetibus sese pulchrisque locis dant. Conspicit inde sibi data Romulus esse priora, auspicio regni stabilita scamna solumque.\"",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "Quintus introduces Ennius: \"And so Romulus the augur, as in Ennius, with his brother likewise an augur: 'Taking thought with great thought, then desiring the kingship, they give their attention together to auspice and augury. On the hill Remus devotes himself to the auspice and alone watches for a favourable bird; but handsome Romulus on high Aventine seeks, watches the high-flying kind. They were contending whether to call the city Roma or Remora; every man was anxious which of the two would be commander. They wait, as when a consul is about to give the signal, all eagerly look to the barriers' edges, how soon he will send the chariots from the painted jaws: so the people waited and feared in their faces for the issue, to which of the two the victory of the great kingship would be given. Meanwhile the white sun withdrew into the depths of night. Then bright light, struck by rays, gave itself forth, and at once from on high, far off, a most beautiful onward-flying (praepes) bird flew on the left. At once the golden sun rises; down from the sky come three times four holy bodies of birds; they betake themselves to onward-flying and beautiful places. Romulus sees from this that the first place has been given to him, the bench and ground of kingship made firm by auspice.'\" Ennius names no species; Livy supplies the vultures. Seruat genus altiuolantum (\"watches the high-flying kind\") is description, not a height rule."
      }
    ],
    "rules": [
      "R-PRAEPES",
      "R-COUNT"
    ],
    "orthography": "u/i normalised. Transcribed from the Latin Library Divinatione 1 finding aid. The finding aid's \"cedunt ce caelo\" is a known typo (SOURCES) and is printed de caelo; \"veduti\" in the aid is printed ueluti. Both corrections are recorded here. Verse translated as prose (STYLE §6); Yonge's version is PD but not reproduced.",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Cic. Div. 1.107–108 (Ennius, Annales I)",
      "cache": "latlib-cicero-divinatione1.html"
    }
  },
  {
    "id": "pliny-nh-10-21",
    "citation": "Pliny, Naturalis historia 10.21",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Triorchem a numero testium, cui principatum in auguriis Phemonoe dedit, buteonem hunc appellant Romani, familia etiam cognominata, cum prospero auspicio in ducis naui sedisset.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"The triorches, [named] from the number of its testicles, to which Phemonoe gave the chief place in auguries — this the Romans call buteo, a family even having taken its surname [from it], when with favourable auspice it had settled on a commander's ship.\" Buteo is the engine's buzzard/hawk; the family is the Buteones. The settled-on-the-ship detail is an oblative story, not a mode rule."
      }
    ],
    "rules": [
      "B-HAWK"
    ],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 10.21 (Mayhoff §21)",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "pliny-nh-10-40",
    "citation": "Pliny, Naturalis historia 10.40",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Sunt et paruae aues uncorum unguium, ut pici Martio cognomine insignes et in auspiciis magni.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"There are also small birds with hooked claws, as the woodpeckers, distinguished by the surname 'of Mars' and of great account in auspices.\" In auspiciis magni — \"great in auspices\" — supports the woodpecker's weight; the number remains our reconstruction."
      }
    ],
    "rules": [
      "B-PICUS"
    ],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 10.40 (Mayhoff §40)",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "pliny-nh-10-49",
    "citation": "Pliny, Naturalis historia 10.49",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Horum sunt tripudia solistima, hi magistratus nostros cotidie regunt domusque ipsis suas claudunt aut reserant. Habent ostenta et praeposteri eorum uespertinique cantus.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"From these [cocks] come the full feeding-signs (tripudia solistima); these rule our magistrates day by day and shut or open their own houses to them. Their untimely and evening crowings also count as ostenta.\" Tripudia solistima is Pliny's plural spelling; the singular technical form in Cicero is tripudium solistimum. Evening crowing is an ostentum — recorded, not weighed."
      }
    ],
    "rules": [
      "B-PULLI"
    ],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 10.49 (Mayhoff §49)",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "cic-div-2-76",
    "citation": "Cicero, De divinatione 2.76",
    "speaker": "Marcus, in Cicero, De divinatione 2",
    "date": "44 BC",
    "tier": "marcus",
    "original": {
      "lang": "la",
      "text": "Quam multi anni sunt, cum bella a proconsulibus et a propraetoribus administrantur, qui auspicia non habent? Itaque nec amnis transeunt auspicato, nec tripudio auspicantur. Vbi ergo auium diuinatio? Quae, quoniam ab iis qui auspicia nulla habent bella administrantur, ab urbanis retenta uidetur, a bellicis esse sublata.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"How many years has it been since wars are conducted by proconsuls and propraetors, who do not hold the auspices? And so they neither cross rivers after taking the auspices, nor take auspices by the tripudium. Where then is divination by birds? Since wars are conducted by men who hold no auspices, it seems retained in city business, removed from war.\" Marcus' point is decay of practice; B-OTHER's not-weighed policy for non-augural birds is our reconstruction built beside it, not a quotation of it."
      }
    ],
    "rules": [
      "B-OTHER"
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages).",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Cic. Div. 2.76–77 init.",
      "cache": "latlib-cicero-divinatione2.html"
    }
  },
  {
    "id": "pliny-nh-10-20",
    "citation": "Pliny, Naturalis historia 10.20",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Sanqualem auem atque inmusulum augures Romani magnae quaestioni habent. Inmusulum aliqui uulturis pullum arbitrantur esse et sanqualem ossifragum. Masurius sanqualem ossifragam esse dicit, inmusulum autem pullum aquilae prius quam albicet cauda.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"The Roman augurs treat the sanqualis bird and the inmusulus as a great puzzle. Some think the inmusulus is a vulture's chick and the sanqualis the osprey (ossifragus, 'bone-breaker'). Masurius says the sanqualis is the osprey, and the inmusulus an eagle's chick before its tail turns white.\" Sanqualis and inmusulus stay in Latin: even the augurs disputed them, which is why no user bird is offered for either."
      }
    ],
    "rules": [],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 10.20 (Mayhoff §20)",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "pliny-nh-2-142",
    "citation": "Pliny, Naturalis historia 2.142",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Laeua prospera existimantur, quoniam laeua parte mundi ortus est.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"[Thunders] on the left are thought favourable, since sunrise is in the left part of the world.\" Pliny is speaking of thunder (ex caelo), outside this instrument's bird scope; the sentence is quoted for the left-favourable rationale only, and the About page must not present it as a bird rule."
      }
    ],
    "rules": [
      "R-SIDE"
    ],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 2.142 (Mayhoff §142)",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "fest-sinistrum",
    "citation": "Festus / Paulus, De verborum significatu s.v. Sinistrum",
    "speaker": "Festus / Paulus",
    "date": "2nd / 8th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Sinistrae aues sinistrumque auspicium, id est quod sinat fieri. Varro lib. V epistolicarum quaestionum ait: \"A deorum sede cum in meridiem spectes, ad sinistram sunt partes mundi exorientes, ad dexteram occidentes; factum arbitror, ut sinistra meliora auspicia, quam dextra esse existimentur.\" Idem fere sentiunt Sinnius Capito et Cincius. Silentio surgere dicitur, ubi qui post mediam noctem auspicandi causa ex lectulo suo silens surrexit et liberatus a lecto in solido sedetque, ne quid eo tempore deiiciat cauens, donec se in lectum reposuit: hoc enim est proprie silentium, omnis uitii in auspiciis uacuitas.",
      "licence": "Public domain — ancient text (Lindsay, Teubner 1913); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Left-hand birds and a left-hand auspice — that is, one which allows [a thing] to be done. Varro in book 5 of his Epistolary Questions says: 'From the seat of the gods, when you look towards the south, on the left are the rising parts of the world, on the right the setting; hence, I think, it came about that left-hand auspices are thought better than right-hand.' Sinnius Capito and Cincius think much the same. [Silentio surgere:] 'To rise in silentium' is said when a man after midnight has risen silently from his bed to take the auspices and, freed from the bed, sits on solid [ground], taking care to throw nothing down in that time until he has placed himself back in bed: for this is properly silentium — emptiness of every ritual fault in auspices.'\" Two lemmata are combined in one record (Sinistrae aues; Silentio surgere) because PLAN cites them together for R-SIDE and R-SILENTIUM; Lindsay's Farnese-fragment text is lacunose and the joins follow his supplements."
      }
    ],
    "rules": [
      "R-SIDE",
      "R-SILENTIUM"
    ],
    "orthography": "u/i normalised. Transcribed from Lindsay 1913 OCR (bwb_C0-AXI-081.txt), cross-checked against Thewrewk 1889 OCR where Lindsay's OCR fails; OCR corrections are listed here per STYLE §9. No PD English exists; translation ours. OCR at Sinistrae: \"test} sinistinium\", \"parte(s»\" — supplements printed without their brackets and recorded here; at Silentio the OCR is fragmentary (..t, <noctem») and the sense-joins follow Lindsay's printed supplements. Letter-exact 4c check against the scan image is still owed.",
    "source": {
      "edition": "Lindsay, Teubner 1913",
      "page": "s.vv. Sinistrae aues (Lindsay pp. 502–504, Farnese frag. L. XIX, Müller p. 339 M) and Silentio surgere (Lindsay p. 524 area)",
      "cache": "bwb_C0-AXI-081.txt"
    }
  },
  {
    "id": "cic-div-1-120",
    "citation": "Cicero, De divinatione 1.120",
    "speaker": "Quintus, in Cicero, De divinatione 1",
    "date": "44 BC",
    "tier": "quintus",
    "original": {
      "lang": "la",
      "text": "Eademque efficit in auibus diuina mens, ut tum huc, tum illuc uolent alites, tum in hac, tum in illa parte se occultent, tum a dextra, tum a sinistra parte canant oscines.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"And the same divine mind brings it about in birds, that the flight-birds (alites) fly now this way, now that, hide themselves now in this quarter, now in that, and the voice-birds (oscines) sing now on the right side, now on the left.\" Quintus is supplying a Stoic mechanism for the classification Festus states as fact; the half-strength factor for wrong-mode signs is our reconstruction."
      }
    ],
    "rules": [
      "R-MODE"
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages).",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Cic. Div. 1.120",
      "cache": "latlib-cicero-divinatione1.html"
    }
  },
  {
    "id": "pliny-nh-10-43",
    "citation": "Pliny, Naturalis historia 10.43",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Nunc de secundo genere dicamus, quod in duas diuiditur species, oscines et alites. Illarum generi cantus oris, his magnitudo differentiam dedit.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Now let us speak of the second kind, which is divided into two sorts, oscines and alites. To the former kind, singing with the mouth gave the distinction; to the latter, size.\" Pliny's division matches Festus' — voice-birds and flight-birds — though his distinguishing mark for alites (size) is his own."
      }
    ],
    "rules": [
      "R-MODE"
    ],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 10.43 (Mayhoff §43)",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "pliny-nh-28-17",
    "citation": "Pliny, Naturalis historia 28.17",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "Haec satis sint, exemplis ut appareat, ostentorum uires et in nostra potestate esse ac, prout quaeque accepta sint, ita ualere. In augurum certe disciplina constat neque diras neque ulla auspicia pertinere ad eos, qui quamque rem ingredientes obseruare se ea negauerint, quo munere diuinae indulgentiae maius nullum est.",
      "licence": "Public domain — ancient text (Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Let this be enough, so that it may appear from examples that the force of ostenta is also in our power, and that they hold good only as each has been accepted. In the augurs' discipline at any rate it is agreed that neither dire signs nor any auspices pertain to those who, on entering upon any matter, have declared that they will not observe them — than which gift of divine indulgence there is none greater.\" Pliny's sentence would let even dire signs be disclaimed in advance; the engine takes the stricter course (a pertinent dire sign cannot be declined) and says so — see PLAN R-DECLINE."
      }
    ],
    "rules": [
      "R-DECLINE"
    ],
    "orthography": "u/i normalised. Latin from the Perseus TEI of Mayhoff's Teubner text in the cache (a collation/finding aid under SOURCES; the pinned scan remains copy-text for 4c). TEI word-spacing artefacts (\"sa n qualem\", spaces before punctuation) are closed up mechanically; no word is changed. Bostock–Riley (1855) is PD; our literal translation is printed and the Bostock–Riley chapter is named in the source field for checking.",
    "source": {
      "edition": "Mayhoff, Teubner (Perseus TEI perseus-lat2, collation/finding aid per SOURCES)",
      "page": "NH 28.17 (Mayhoff §17; Bostock–Riley Book 28)",
      "cache": "perseus-phi0978.phi001.perseus-lat2.xml + perseus-eng1.xml (Bostock–Riley)"
    }
  },
  {
    "id": "cic-div-2-77",
    "citation": "Cicero, De divinatione 2.77",
    "speaker": "Marcus, in Cicero, De divinatione 2",
    "date": "44 BC",
    "tier": "marcus",
    "original": {
      "lang": "la",
      "text": "Nam ex acuminibus quidem, quod totum auspicium militare est, iam M. Marcellus ille quinquiens consul totum omisit, idem imperator idem augur optumus. Et quidem ille dicebat, si quando rem agere uellet, ne impediretur auspiciis, lectica operta facere iter se solere. Huic simile est, quod nos augures praecipimus, ne iuges auspicium obueniat, ut iumenta iubeant diiungere.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"For as to [auspices] from sharp points [the military auspice from the standards' points? — the phrase ex acuminibus is obscure], which is the whole military auspice, that famous Marcus Marcellus, five times consul, gave it up altogether — the same man commander and best of augurs. And indeed he used to say that, whenever he wished to transact business, so as not to be hindered by auspices, he habitually travelled in a closed litter. Like to this is what we augurs prescribe, lest a yoked-team auspice occur, that they order the draught animals to be unyoked.\" Marcellus avoids seeing signs at all; that is refusal by blindness, and the engine's narrower decline of a single oblative sign is a reconstruction beside it."
      }
    ],
    "rules": [
      "R-DECLINE"
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages).",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Cic. Div. 2.77",
      "cache": "latlib-cicero-divinatione2.html"
    }
  },
  {
    "id": "cic-leg-2-21",
    "citation": "Cicero, De legibus 2.21",
    "speaker": "Cicero, as law-drafter",
    "date": "c. 50s–40s BC",
    "tier": "draft-law",
    "original": {
      "lang": "la",
      "text": "\"Interpretes autem Iouis optumi maxumi, publici augures, signis et auspiciis operam danto, disciplinam tenento, sacerdotesque uineta uirgetaque et salutem populi auguranto, quique agent rem duelli quique popularem, auspicium praemonento ollique obtemperanto. Diuorumque iras prouidento sisque apparento, caelique fulgura regionibus ratis temperanto, urbemque et agros et templa liberata et effata habento. Quaeque augur iniusta nefasta uitiosa dira deixerit, inrita infectaque sunto, quique non paruerit, capital esto.\"",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"'Moreover the interpreters of Jupiter Best and Greatest, the public augurs, shall give attention to signs and auspices, shall keep the discipline, and the priests shall augur vineyards and osier-beds and the people's safety; and those who conduct war business and popular business shall give prior notice of the auspice and shall obey them. They shall foresee the anger of the gods and attend to them, shall govern the sky's lightnings by fixed regions, and shall hold city and fields and templa freed and declared. And whatever an augur has declared (deixerit) unjust, unlawful, faulty, dire, let it be void and undone (inrita infectaque sunto); and whoever does not obey, let it be a capital matter.'\" Archaic deixerit, sunto, ollique are retained and glossed (STYLE §5). This is Cicero's proposed law-code, not recorded augural law."
      }
    ],
    "rules": [
      "R-DIRA"
    ],
    "orthography": "u/i normalised; archaic legal forms retained (deixerit, sunto, duelli, ollique, sisque). Transcribed from the Latin Library Legibus 2 finding aid (its section number [21] stands mid-law). Quotation marks mark the draft law's words. Our literal translation; Yonge PD not reproduced.",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Cic. Leg. 2.20–21 (law text; §21 in received numbering)",
      "cache": "latlib-cicero-leg2.html"
    }
  },
  {
    "id": "cic-div-1-27-29",
    "citation": "Cicero, De divinatione 1.27–29",
    "speaker": "Quintus, in Cicero, De divinatione 1",
    "date": "44 BC",
    "tier": "quintus",
    "original": {
      "lang": "la",
      "text": "Nam nostri quidem magistratus auspiciis utuntur coactis; necesse est enim offa obiecta cadere frustum ex pulli ore, cum pascitur; quod autem scriptum habetis, tripudium fieri, si ex ea quid in solidum ceciderit, hoc quoque, quod dixi, coactum tripudium solistimum dicitis. Itaque multa auguria, multa auspicia, quod Cato ille sapiens queritur, neglegentia collegii amissa plane et deserta sunt. Nihil fere quondam maioris rei nisi auspicato ne priuatim quidem gerebatur. Itaque, sinistra dum non exquirimus, in dira et in uitiosa incurrimus. Vt P. Claudius, Appi Caeci filius, eiusque collega L. Iunius classis maxumas perdiderunt, cum uitio nauigassent. Sed quid uetera? M. Crasso quid acciderit uidemus, dirarum obnuntiatione neglecta.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"For our magistrates indeed use forced auspices (auspicia coacta); for when a lump of cake is thrown, a morsel must fall from the chicken's beak as it feeds; and what you have in writing — that a tripudium is made if anything from it has fallen onto solid ground — this too, as I have said, you call a forced tripudium solistimum. And so many auguries, many auspices, as wise Cato complains, have been utterly lost and abandoned by the college's negligence. Formerly almost nothing of greater moment was done, even in private, without first taking the auspices. And so, while we do not seek out favourable [left-hand] signs, we run into dire and faulty ones. As Publius Claudius, son of Appius Caecus, and his colleague Lucius Iunius lost very great fleets, when they had sailed with a ritual fault (uitio). But why [speak of] old cases? We see what happened to Marcus Crassus, with the announcement of dire signs neglected (dirarum obnuntiatione neglecta).\" Quintus laments decay while defending the art; the in solidum clause (\"onto solid ground\") is the tripudium criterion in his words."
      }
    ],
    "rules": [
      "R-TRIP-ANY",
      "R-DIRA",
      "R-REPEAT"
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages). The finding aid's bracketed [aut] before tripudium fieri is omitted as an editorial supplement; maxumas retained.",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Cic. Div. 1.27–29",
      "cache": "latlib-cicero-divinatione1.html"
    }
  },
  {
    "id": "fest-praepetes",
    "citation": "Paulus / Festus, De verborum significatu s.v. Praepetes",
    "speaker": "Paulus / Festus",
    "date": "2nd / 8th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Praepetes aues quidam dici aiunt, quia secundum auspicium faciant praeteruolantes; alii quod aut ea, quae praepetamus, indicent, aut quod praeteruolent. Ait ex Graeco tractum putant, quod ante conspectum uolent nostrum; ceterum poetae promiscue omnis aues ita appellant.",
      "licence": "Public domain — ancient text (Lindsay, Teubner 1913); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Some say birds are called praepetes because in flying past they make a favourable auspice; others, because they indicate the things we seek headlong (praepetamus), or because they fly past. [Some] think [the word] is drawn from Greek, because they fly before our sight; for the rest, the poets call all birds so indiscriminately.\" Paulus' shorter epitome, quoted in PLAN, runs: \"Praepetes aues dicuntur, quae se ante auspicantem ferunt\" — \"birds are called praepetes which bear themselves in front of the man taking the auspices.\" Festus' fuller text shows the definition was already disputed; the engine's single onward/high factor is a reconstruction over that dispute."
      }
    ],
    "rules": [
      "R-PRAEPES"
    ],
    "orthography": "u/i normalised. Transcribed from Lindsay 1913 OCR (bwb_C0-AXI-081.txt), cross-checked against Thewrewk 1889 OCR where Lindsay's OCR fails; OCR corrections are listed here per STYLE §9. No PD English exists; translation ours. OCR: \"indieent\" (indicent), lacuna before \"ait ex Graeco\" — printed as Lindsay gives it; the Paulus form is quoted in the translation note, not substituted into Festus' text.",
    "source": {
      "edition": "Lindsay, Teubner 1913",
      "page": "s.v. Praepetes (Lindsay p. 245 area; Pauli exc. pp. 244–249 Th.; Müller p. 204/207 M)",
      "cache": "bwb_C0-AXI-081.txt"
    }
  },
  {
    "id": "gell-na-7-6",
    "citation": "Gellius, Noctes Atticae 7.6",
    "speaker": "Aulus Gellius",
    "date": "c. AD 180",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Iulius Hyginus in libro quem de Vergilio fecit temere reprehendit Vergilium, quod Daedali pennas 'praepetibus' dixerit, quasi non omnes aues praepetes dici possint. Aues enim, inquit Nigidius, praepetes sunt quae prospera ac secunda faciunt auguria ac praeteruolando ante conspectum nostrum feruntur; 'inferae' autem, quae humili et depresso uolatu aduersa significant.",
      "licence": "Public domain — ancient text (Hertz–Hosius, Teubner 1903 (OCR agelliinoctiumat01gelluoft, bks 1–10)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Julius Hyginus in the book he wrote on Vergil rashly faulted Vergil for calling Daedalus' wings 'praepetes' [Aeneid 6.15], as if not all birds could be called praepetes. For birds, says Nigidius [as Gellius reports the debate], are praepetes which make favourable and prosperous auguries and in flying past are borne before our sight; 'inferae' [low ones] are those which with low, sunken flight signify adverse things.\" Gellius' chapter is a defence of Vergil's word-choice through the augural terminology; its value here is the praepes/infera opposition — onward/favourable against low/adverse — behind the engine's single flight factor."
      }
    ],
    "rules": [
      "R-PRAEPES"
    ],
    "orthography": "u/i normalised. Chapter heading verified in Hertz–Hosius OCR (agelliinoctiumat01gelluoft.txt, Capitula lib. VII: \"Temere inepteque reprehensum esse a Iulio Hygino Vergilium, quod 'praepetes' Daedali pennas dixerit; atque inibi, quid sint aves praepetes et quid illae sint aves, quas Nigidius 'inferas' appellavit\"). Body wording above follows the received Hertz text in summary-quotation form; the OCR body at this chapter was not legible enough for letter-verification, so 4c must check every word against the scan. Do not quote as letter-exact until then. Translation ours (Rolfe Loeb not used, per SOURCES).",
    "source": {
      "edition": "Hertz–Hosius, Teubner 1903 (OCR agelliinoctiumat01gelluoft, bks 1–10)",
      "page": "Noctes Atticae 7.6 [vulgo 6.6] (heading OCR-verified; body page to confirm in 4c)",
      "cache": "agelliinoctiumat01gelluoft.txt"
    }
  },
  {
    "id": "fest-remores-inebrae",
    "citation": "Paulus / Festus, De verborum significatu s.vv. Remores, Inebrae",
    "speaker": "Paulus / Festus",
    "date": "2nd / 8th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Remores aues in auspicio dicuntur, quae acturum aliquid remorari conpellunt. Inebrae aues, quae in auguriis aliquid fieri prohibent; et prorsus omnia inebra appellantur, quae tardant uel morantur agentem.",
      "licence": "Public domain — ancient text (Lindsay, Teubner 1913); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Delaying birds (remores) in an auspice are those which compel a man about to act to delay. Inebrae birds are those which in auguries prohibit something from being done; and in short all things are called inebra which slow or delay the doer.\" Remores make you wait; the lemma does not say they forbid outright, and the engine follows it (favourable becomes ALIO DIE, never NON ADMITTVNT). Inebrae is the stronger word and is quoted so the distinction stays visible."
      }
    ],
    "rules": [
      "R-REMORA"
    ],
    "orthography": "u/i normalised. Transcribed from Lindsay 1913 OCR (bwb_C0-AXI-081.txt), cross-checked against Thewrewk 1889 OCR where Lindsay's OCR fails; OCR corrections are listed here per STYLE §9. No PD English exists; translation ours. Inebrae OCR variants (Inaebrae/Inebre in manuscripts) noted in Lindsay's apparatus; headword printed Inebrae as in PLAN.",
    "source": {
      "edition": "Lindsay, Teubner 1913",
      "page": "s.vv. Remores (Lindsay, Farnese text) and Inebrae (Pauli exc., Lindsay p. 110 area)",
      "cache": "bwb_C0-AXI-081.txt"
    }
  },
  {
    "id": "cic-div-1-77",
    "citation": "Cicero, De divinatione 1.77",
    "speaker": "Quintus, in Cicero, De divinatione 1",
    "date": "44 BC",
    "tier": "quintus",
    "original": {
      "lang": "la",
      "text": "Quid? Bello Punico secundo nonne C. Flaminius, consul iterum, neglexit signa rerum futurarum magna cum clade rei publicae? Idem, cum tripudio auspicaretur, pullarius diem proelii committendi differebat. Tum Flaminius ex eo quaesiuit, si ne postea quidem pulli pascerentur, quid faciendum censeret. Cum ille quiescendum respondisset, Flaminius: \"Praeclara uero auspicia, si esurientibus pullis res geri poterit, saturis nihil geretur!\" Itaque signa conuelli et se sequi iussit.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"What? In the Second Punic War did not Gaius Flaminius, consul for the second time, neglect signs of coming events, with great disaster to the state? When he was taking the auspices by the tripudium, the chicken-keeper (pullarius) kept putting off the day for joining battle. Then Flaminius asked him what he thought should be done if the chickens would not feed even later. When he had answered 'wait' (quiescendum), Flaminius [said]: 'Fine auspices indeed, if business can be done when the chickens are hungry, and nothing will be done when they are fed full!' And so he ordered the standards to be torn up and [the men] to follow him.\" The pullarius' advice to wait is the postponement shading of a refusal; PLAN §4 distinguishes it from the camp rite's positive refusal."
      }
    ],
    "rules": [
      "R-NONE"
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages).",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Cic. Div. 1.77",
      "cache": "latlib-cicero-divinatione1.html"
    }
  },
  {
    "id": "cic-leg-2-31",
    "citation": "Cicero, De legibus 2.31",
    "speaker": "Cicero, as law-drafter",
    "date": "c. 50s–40s BC",
    "tier": "draft-law",
    "original": {
      "lang": "la",
      "text": "Maximum autem et praestantissimum in re publica ius est augurum cum auctoritate coniunctum. Quid enim maius est, si de iure quaerimus, quam posse a summis imperiis et summis potestatibus comitiatus et concilia uel instituta dimittere uel habita rescindere? Quid grauius quam rem susceptam dirimi, si unus augur \"alio die\" dixerit?",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"The greatest and most excellent right in the state is that of the augurs, joined with authority. For what is greater, if we ask about right, than to be able to dismiss assemblies and councils summoned by the highest commands and highest powers, or to annul them once held? What is weightier than that business undertaken be broken off, if one augur has said 'on another day' (alio die)?\" Cicero the augur praises his own college in commentary on his draft laws; the postponement formula is his."
      }
    ],
    "rules": [
      "R-NONE"
    ],
    "orthography": "u/i normalised. Transcribed from the Latin Library Legibus 2 finding aid ([31] in the aid). The aid's supplied <die> is printed without brackets as the received formula requires it. Our literal translation; Yonge PD not reproduced.",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Cic. Leg. 2.31",
      "cache": "latlib-cicero-leg2.html"
    }
  },
  {
    "id": "livy-1-36-3-6",
    "citation": "Livy, Ab urbe condita 1.36.3–6",
    "speaker": "Livy (foundation narrative)",
    "date": "late 1st century BC",
    "tier": "legend",
    "original": {
      "lang": "la",
      "text": "Id quia inaugurato Romulus fecerat, negare Attus Nauius, inclitus ea tempestate augur, neque mutari neque nouum constitui nisi aues addixissent posse. Ex eo ira regi mota; eludensque artem ut ferunt, \"Age dum\" inquit, \"diuine tu, inaugura fierine possit quod nunc ego mente concipio.\" Cum ille augurio rem expertus profecto futuram dixisset, \"Atqui hoc animo agitaui\" inquit, \"te nouacula cotem discissurum. Cape haec et perage quod aues tuae fieri posse portendunt.\" Tum illum haud cunctanter discidisse cotem ferunt. Auguriis certe sacerdotioque augurum tantus honos accessit ut nihil belli domique postea nisi auspicato gereretur, concilia populi, exercitus uocati, summa rerum, ubi aues non admisissent, dirimerentur.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Because Romulus had done it after inauguration, Attus Navius, a famous augur of that time, said that it could neither be changed nor newly established unless the birds assented. At this the king's anger was aroused; and mocking the art, as they say, 'Come now,' he said, 'you seer, inaugurate whether what I now conceive in my mind can be done.' When [Navius], having tried the matter by augury, had said it would certainly happen, 'Why, this is what I had in mind,' he said, 'that you should cut a whetstone with a razor. Take these and carry out what your birds portend can be done.' Then, they say, he cut the whetstone without hesitation. At any rate so much honour accrued to auguries and the augurs' priesthood that afterwards nothing in war or at home was done except after taking the auspices; assemblies of the people, armies summoned, the highest business — where the birds had not allowed (ubi aues non admisissent), they were broken off.\" Livy's subordinate clause is the ancient wording nearest our verdict formula; the pronouncement AVES NON ADMITTVNT is ours."
      }
    ],
    "rules": [
      "R-CLEAR"
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages).",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Livy 1.36.3–6",
      "cache": "latlib-livy-liv.1.html"
    }
  },
  {
    "id": "fest-admissivae-cliviae",
    "citation": "Paulus / Festus, De verborum significatu s.vv. Admissivae, Cliviae",
    "speaker": "Paulus / Festus",
    "date": "2nd / 8th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Admissiuae aues dicebantur ab auguribus, quae consulentem iuberent. Cliuiae aues, quae fieri aliquid prohibent.",
      "licence": "Public domain — ancient text (Lindsay, Teubner 1913); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"'Allowing' birds (admissiuae) were so called by the augurs, [birds] which bid the consulter [proceed]. 'Prohibiting' birds (cliuiae), which prohibit something from being done.\" Admissiuae is verbatim from Paulus (Lindsay p. 9: \"Admissivae aves dicebantur ab auguribus, quae consulentem iuberent\"). The Cliuiae lemma could not be located letter-for-letter in the Lindsay OCR in the cache; the wording printed is the received Paulus gloss and is flagged unverified — it must be checked against the scan (or Thewrewk) in 4c before being quoted as exact."
      }
    ],
    "rules": [
      "R-CLEAR"
    ],
    "orthography": "u/i normalised. Transcribed from Lindsay 1913 OCR (bwb_C0-AXI-081.txt), cross-checked against Thewrewk 1889 OCR where Lindsay's OCR fails; OCR corrections are listed here per STYLE §9. No PD English exists; translation ours. Admissiuae OCR-confirmed (\"consulen-tem iuberent\", hyphen rejoined). Cliuiae: search of both Festus OCR files found no legible lemma (see docs/PILOT.md, 4b passages) — received form printed, unverified.",
    "source": {
      "edition": "Lindsay, Teubner 1913",
      "page": "s.v. Admissivae (Pauli exc. p. 31–22 M, Lindsay p. 9); s.v. Cliviae (unlocated in OCR)",
      "cache": "bwb_C0-AXI-081.txt + deverborumsignif00festuoft_djvu.txt"
    }
  },
  {
    "id": "livy-8-30-32",
    "citation": "Livy, Ab urbe condita 8.30.2; 8.32.4",
    "speaker": "Livy (historical narrative)",
    "date": "late 1st century BC",
    "tier": "history",
    "original": {
      "lang": "la",
      "text": "Namque Papirius dictator a pullario monitus cum ad auspicium repetendum Romam proficisceretur, magistro equitum denuntiauit ut sese loco teneret neu absente se cum hoste manum consereret. Itemque illud interrogo, cum me incertis auspiciis profectum ab domo scirem, utrum mihi turbatis religionibus res publica in discrimen committenda fuerit an auspicia repetenda ne quid dubiis dis agerem.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"For the dictator Papirius, warned by the chicken-keeper (pullarius), when he was setting out to Rome to renew the auspice (ad auspicium repetendum), gave orders to his master of horse to keep his position and not join battle with the enemy in his absence. [Papirius, prosecuting Fabius:] 'And I ask this too: since I knew I had set out from home with uncertain auspices, ought I to have entrusted the state to danger with religious observances in disorder, or [ought] the auspices to be renewed (auspicia repetenda), lest I act in any matter with the gods in doubt?'\" Returning to Rome to renew flawed auspices is not re-asking until the answer improves; PLAN says so and the copy must not pretend otherwise."
      }
    ],
    "rules": [
      "R-REPEAT"
    ],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages). Two loci in one record as cited (8.30.2 narrative; 8.32.4 direct speech); the join is marked in the translation.",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Livy 8.30.2; 8.32.4",
      "cache": "latlib-livy-liv.8.html"
    }
  },
  {
    "id": "suet-tib-2-2",
    "citation": "Suetonius, Tiberius 2.2",
    "speaker": "Suetonius",
    "date": "c. AD 121",
    "tier": "history",
    "original": {
      "lang": "la",
      "text": "Claudius Pulcher apud Siciliam non pascentibus in auspicando pullis ac per contemptum religionis mari demersis, quasi ut biberent quando esse nollent, proelium nauale iniit; superatusque, cum dictatorem dicere a senatu iuberetur, uelut iterum inludens discrimini publico Glycian uiatorem suum dixit.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Claudius Pulcher off Sicily, when the chickens would not feed in the taking of the auspices and he had plunged them into the sea in contempt of religion — as if [to make] them drink, since they would not eat (esse = ēsse, 'to eat') — joined naval battle; and having been defeated, when he was ordered by the senate to name a dictator, as if once more mocking the public danger, he named Glycias, his own messenger.\" Suetonius, like every Latin witness, gives the witticism indirectly; it stays indirect here."
      }
    ],
    "rules": [],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages). Finding-aid spelling Glycian retained (the man's name is usually given as M. Claudius Glycia). Translation ours (Rolfe not used, per SOURCES).",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Suetonius, Tiberius 2.2",
      "cache": "latlib-suet-tib.html"
    }
  },
  {
    "id": "valmax-1-4-3",
    "citation": "Valerius Maximus, Facta et dicta memorabilia 1.4.3",
    "speaker": "Valerius Maximus",
    "date": "c. AD 30",
    "tier": "history",
    "original": {
      "lang": "la",
      "text": "P. Claudius bello Punico, cum proelium nauale committere uellet auspiciaque more maiorum petisset et pullarius non exire cauea pullos nuntiasset, abici eos in mare iussit dicens: \"Quia esse nolunt, bibant.\" L. Iunius P. Claudii collega neglectis auspiciis classem tempestate amisit damnationisque ignominiam uoluntaria morte praeuenit.",
      "licence": "Public domain — ancient text (Kempf, Teubner 1888); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"Publius Claudius in the Punic War, when he wished to join naval battle and had sought the auspices in the ancestral manner and the chicken-keeper (pullarius) had reported that the chickens would not come out of the cage, ordered them to be thrown into the sea, saying: 'Since they will not eat (esse = ēsse), let them drink.' Lucius Iunius, Publius Claudius' colleague, with the auspices neglected lost his fleet in a storm and forestalled the disgrace of condemnation by voluntary death.\" Valerius is the one witness with the jibe in direct speech; his refusal-form is 'would not come out of the cage' — no flapping, crying or flying off. The avolant triad gains no primary here."
      }
    ],
    "rules": [],
    "orthography": "u/i normalised. Transcribed from Kempf 1888 OCR (valeriimaximifac00vale.txt, Cap. IV §3, printed p. 19), cross-checked against the Perseus TEI (perseus-phi1038, finding aid). OCR reads \"nolunl\" (nolunt) — corrected and recorded here. Translation ours (no PD English relied on).",
    "source": {
      "edition": "Kempf, Teubner 1888",
      "page": "1.4.3–4, printed p. 19 (Kempf OCR)",
      "cache": "valeriimaximifac00vale.txt + perseus-phi1038.phi001.perseus-lat1.xml"
    }
  },
  {
    "id": "fest-oscinum-tripudium",
    "citation": "Festus, De verborum significatu s.v. Oscinum tripudium",
    "speaker": "Festus",
    "date": "2nd century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "Oscinum tripudium est, quod oris cantu significat quid portendi; cum cecinit coruus, cornix, noctua, parra, picus.",
      "licence": "Public domain — ancient text (Lindsay, Teubner 1913); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"An oscine tripudium (oscinum tripudium) is that which signifies by the mouth's singing what is portended; when the raven, crow, little owl, parra, woodpecker has sung.\" Despite its headword this lemma defines a voice-sign, not a feeding-sign, and says nothing of chickens flapping, crying or flying off. It therefore does not support the tripudium avolant outcome, which stays labelled reconstruction (see docs/PILOT.md, 4b passages)."
      }
    ],
    "rules": [],
    "orthography": "u/i normalised. Transcribed from Lindsay 1913 OCR (bwb_C0-AXI-081.txt), cross-checked against Thewrewk 1889 OCR where Lindsay's OCR fails; OCR corrections are listed here per STYLE §9. No PD English exists; translation ours. OCR line (Lindsay p. 197, ll. 9–11) is legible; \"cum cecinit\" printed as transmitted. Immediately followed in Lindsay by Oscines (fest-oscines).",
    "source": {
      "edition": "Lindsay, Teubner 1913",
      "page": "s.v. Oscinum tripudium (Lindsay p. 197)",
      "cache": "bwb_C0-AXI-081.txt"
    }
  },
  {
    "id": "livy-per-19",
    "citation": "Livy, Periochae 19",
    "speaker": "Anonymous epitomator of Livy",
    "date": "4th century AD",
    "tier": "history",
    "original": {
      "lang": "la",
      "text": "P. Claudius Pulcher consul, aduersis auspiciis, iussis immergi pullis qui in auspicium exire noluerant, contra Poenos infeliciter classe pugnauit et, reuocatus a senatu dictatorem dicere iussus, Claudium Glyciam dixit.",
      "licence": "Public domain — ancient text (Rossbach, Teubner 1910); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"The consul Publius Claudius Pulcher, with the auspices adverse — having ordered the chickens which had refused to come out for the auspice to be plunged [into the sea] — fought unsuccessfully at sea against the Carthaginians and, recalled by the senate and ordered to name a dictator, named Claudius Glycias.\" The epitome compresses the whole Drepana story into refusal + plunging + defeat; again no flap/cry/fly outcome."
      }
    ],
    "rules": [],
    "orthography": "u/i normalised. Rossbach 1910 OCR (tliviperiochaeom00unse.txt): the Per. 19 text stands at printed pp. 23–24; the apparatus there confirms \"iussis immergi pullis\" but the OCR text-line is corrupt, so the wording above follows Rossbach's received text and every word is owed an image check in 4c. Do not quote as letter-exact until then. Translation ours.",
    "source": {
      "edition": "Rossbach, Teubner 1910",
      "page": "Periocha 19, printed pp. 23–24 (OCR apparatus confirms immergi pullis; text-line corrupt)",
      "cache": "tliviperiochaeom00unse.txt"
    }
  },
  {
    "id": "cic-div-2-85",
    "citation": "Cicero, De divinatione 2.85",
    "speaker": "Marcus, in Cicero, De divinatione 2",
    "date": "44 BC",
    "tier": "marcus",
    "original": {
      "lang": "la",
      "text": "Cum M. Crassus exercitum Brundisii imponeret, quidam in portu caricas Cauno aduectas uendens \"Cauneas\" clamabat. Dicamus, si placet, monitum ab eo Crassum caue ne eas, id est, ne iret; non fuisse periturum, si omini paruisset.",
      "licence": "Public domain — ancient text (Latin Library text (finding aid only; no pinned scan in cache)); see scripts/provenance.json"
    },
    "translations": [
      {
        "label": "Augury (literal)",
        "licence": "CC BY 4.0 — Augury (Jake Proctor)",
        "text": "\"When Marcus Crassus was embarking his army at Brundisium, a man in the harbour selling figs brought from Caunus was crying 'Cauneas' [Caunian (figs)]. Let us say, if you please, that Crassus was warned by him 'caue ne eas' — take care not to go, that is, not to set out; [and] that he would not have perished if he had obeyed the omen.\" Marcus tells the fig-seller pun to ridicule verbal omens (omina), a kind this instrument does not take; the passage is quoted so the exclusion can be seen in the source, not as authority for any rule."
      }
    ],
    "rules": [],
    "orthography": "u/i normalised (docs/STYLE.md §5). Transcribed from the Latin Library HTML finding aid in scripts/.cache/sources/ (UTF-16 files decoded where needed); under the provenance rule the pinned scan is copy-text and this remains provisional until phase 4c collation. Our literal translation is printed; the PD Yonge/Spillan version in the cache is not reproduced verbatim in this record (see docs/PILOT.md, 4b passages). Span begins at §84 end in the finding aid ('Cum M. Crassus...'); cited as 2.85 in PLAN's reading list — section boundary to confirm in 4c.",
    "source": {
      "edition": "Latin Library text (finding aid only; no pinned scan in cache)",
      "page": "Cic. Div. 2.84–85 (fig-seller omen)",
      "cache": "latlib-cicero-divinatione2.html"
    }
  }
];

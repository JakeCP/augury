// Ancient passages: original text facing English, with citation,
// speaker/date/evidence tier and a licence per field (PLAN §9).
// Phase 4a pilot: six complete records (varro-ll-7-7-8,
// livy-1-18-6-10, cic-div-1-85, cic-div-2-71-73, cic-nd-2-7,
// livy-10-40); the rest are empty-but-present stubs for phase 4b.
// Pilot Latin is provisional (finding-aid transcription) until the
// phase 4c collation against pinned scans; see each record's
// orthography field and docs/PILOT.md. Style: docs/STYLE.md.
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
    ]
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
      "R-TEMPLUM"
    ]
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
      "R-EXCEPT"
    ]
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
      "R-TRIP-ANY"
    ]
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
    "rules": []
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
    ]
  },
  {
    "id": "cic-div-2-82",
    "citation": "Cicero, De divinatione 2.82",
    "speaker": "Marcus, in Cicero, De divinatione 2",
    "date": "44 BC",
    "tier": "marcus",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-SIDE"
    ]
  },
  {
    "id": "hom-il-12-237-243",
    "citation": "Homer, Iliad 12.237–243",
    "speaker": "Hector, in Homer",
    "date": "c. 8th century BC (traditional)",
    "tier": "poetry",
    "original": {
      "lang": "grc",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-SIDE"
    ]
  },
  {
    "id": "serv-aen-6-191",
    "citation": "Servius on Vergil, Aeneid 6.191",
    "speaker": "Servius",
    "date": "late 4th / early 5th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-TEMPLUM"
    ]
  },
  {
    "id": "serv-aen-6-190",
    "citation": "Servius on Vergil, Aeneid 6.190",
    "speaker": "Servius",
    "date": "late 4th / early 5th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-ASK"
    ]
  },
  {
    "id": "serv-aen-3-89",
    "citation": "Servius on Vergil, Aeneid 3.89",
    "speaker": "Servius",
    "date": "late 4th / early 5th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "serv-aen-12-259",
    "citation": "Servius on Vergil, Aeneid 12.259",
    "speaker": "Servius",
    "date": "late 4th / early 5th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-DECLINE"
    ]
  },
  {
    "id": "fest-oscines",
    "citation": "Festus, De verborum significatu s.v. Oscines",
    "speaker": "Festus, epitomising Verrius Flaccus; quoting Appius Claudius",
    "date": "2nd century AD (source Augustan)",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-MODE"
    ]
  },
  {
    "id": "plaut-asin-259-264",
    "citation": "Plautus, Asinaria 259–264",
    "speaker": "A slave character, in Plautus",
    "date": "c. 200 BC",
    "tier": "comedy",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-EXCEPT",
      "R-CLEAR"
    ]
  },
  {
    "id": "pliny-nh-10-33",
    "citation": "Pliny, Naturalis historia 10.33",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-DIRA"
    ]
  },
  {
    "id": "pliny-nh-10-30",
    "citation": "Pliny, Naturalis historia 10.30",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "pliny-nh-10-34-35",
    "citation": "Pliny, Naturalis historia 10.34–35",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-DIRA"
    ]
  },
  {
    "id": "pliny-nh-10-6",
    "citation": "Pliny, Naturalis historia 10.6",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "livy-1-34-8-9",
    "citation": "Livy, Ab urbe condita 1.34.8–9",
    "speaker": "Livy (foundation narrative)",
    "date": "late 1st century BC",
    "tier": "legend",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-TANAQUIL"
    ]
  },
  {
    "id": "livy-1-7-1",
    "citation": "Livy, Ab urbe condita 1.7.1",
    "speaker": "Livy (foundation narrative)",
    "date": "late 1st century BC",
    "tier": "legend",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-COUNT",
      "R-MIXED"
    ]
  },
  {
    "id": "cic-div-1-107-108-enn",
    "citation": "Ennius, Annales, quoted in Cicero, De divinatione 1.107–108",
    "speaker": "Ennius, quoted by Quintus in Cicero, De divinatione 1",
    "date": "Ennius 239–169 BC; quoted 44 BC",
    "tier": "poetry",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-PRAEPES",
      "R-COUNT"
    ]
  },
  {
    "id": "pliny-nh-10-21",
    "citation": "Pliny, Naturalis historia 10.21",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "pliny-nh-10-40",
    "citation": "Pliny, Naturalis historia 10.40",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "pliny-nh-10-49",
    "citation": "Pliny, Naturalis historia 10.49",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "cic-div-2-76",
    "citation": "Cicero, De divinatione 2.76",
    "speaker": "Marcus, in Cicero, De divinatione 2",
    "date": "44 BC",
    "tier": "marcus",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "pliny-nh-10-20",
    "citation": "Pliny, Naturalis historia 10.20",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "pliny-nh-2-142",
    "citation": "Pliny, Naturalis historia 2.142",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-SIDE"
    ]
  },
  {
    "id": "fest-sinistrum",
    "citation": "Festus / Paulus, De verborum significatu s.v. Sinistrum",
    "speaker": "Festus / Paulus",
    "date": "2nd / 8th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-SIDE",
      "R-SILENTIUM"
    ]
  },
  {
    "id": "cic-div-1-120",
    "citation": "Cicero, De divinatione 1.120",
    "speaker": "Quintus, in Cicero, De divinatione 1",
    "date": "44 BC",
    "tier": "quintus",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-MODE"
    ]
  },
  {
    "id": "pliny-nh-10-43",
    "citation": "Pliny, Naturalis historia 10.43",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-MODE"
    ]
  },
  {
    "id": "pliny-nh-28-17",
    "citation": "Pliny, Naturalis historia 28.17",
    "speaker": "Pliny the Elder",
    "date": "AD 77",
    "tier": "natural-history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-DECLINE"
    ]
  },
  {
    "id": "cic-div-2-77",
    "citation": "Cicero, De divinatione 2.77",
    "speaker": "Marcus, in Cicero, De divinatione 2",
    "date": "44 BC",
    "tier": "marcus",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-DECLINE"
    ]
  },
  {
    "id": "cic-leg-2-21",
    "citation": "Cicero, De legibus 2.21",
    "speaker": "Cicero, as law-drafter",
    "date": "c. 50s–40s BC",
    "tier": "draft-law",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-DIRA"
    ]
  },
  {
    "id": "cic-div-1-27-29",
    "citation": "Cicero, De divinatione 1.27–29",
    "speaker": "Quintus, in Cicero, De divinatione 1",
    "date": "44 BC",
    "tier": "quintus",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-TRIP-ANY",
      "R-DIRA",
      "R-REPEAT"
    ]
  },
  {
    "id": "fest-praepetes",
    "citation": "Paulus / Festus, De verborum significatu s.v. Praepetes",
    "speaker": "Paulus / Festus",
    "date": "2nd / 8th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-PRAEPES"
    ]
  },
  {
    "id": "gell-na-7-6",
    "citation": "Gellius, Noctes Atticae 7.6",
    "speaker": "Aulus Gellius",
    "date": "c. AD 180",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-PRAEPES"
    ]
  },
  {
    "id": "fest-remores-inebrae",
    "citation": "Paulus / Festus, De verborum significatu s.vv. Remores, Inebrae",
    "speaker": "Paulus / Festus",
    "date": "2nd / 8th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-REMORA"
    ]
  },
  {
    "id": "cic-div-1-77",
    "citation": "Cicero, De divinatione 1.77",
    "speaker": "Quintus, in Cicero, De divinatione 1",
    "date": "44 BC",
    "tier": "quintus",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-NONE"
    ]
  },
  {
    "id": "cic-leg-2-31",
    "citation": "Cicero, De legibus 2.31",
    "speaker": "Cicero, as law-drafter",
    "date": "c. 50s–40s BC",
    "tier": "draft-law",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-NONE"
    ]
  },
  {
    "id": "livy-1-36-3-6",
    "citation": "Livy, Ab urbe condita 1.36.3–6",
    "speaker": "Livy (foundation narrative)",
    "date": "late 1st century BC",
    "tier": "legend",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-CLEAR"
    ]
  },
  {
    "id": "fest-admissivae-cliviae",
    "citation": "Paulus / Festus, De verborum significatu s.vv. Admissivae, Cliviae",
    "speaker": "Paulus / Festus",
    "date": "2nd / 8th century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-CLEAR"
    ]
  },
  {
    "id": "livy-8-30-32",
    "citation": "Livy, Ab urbe condita 8.30.2; 8.32.4",
    "speaker": "Livy (historical narrative)",
    "date": "late 1st century BC",
    "tier": "history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": [
      "R-REPEAT"
    ]
  },
  {
    "id": "suet-tib-2-2",
    "citation": "Suetonius, Tiberius 2.2",
    "speaker": "Suetonius",
    "date": "c. AD 121",
    "tier": "history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "valmax-1-4-3",
    "citation": "Valerius Maximus, Facta et dicta memorabilia 1.4.3",
    "speaker": "Valerius Maximus",
    "date": "c. AD 30",
    "tier": "history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "fest-oscinum-tripudium",
    "citation": "Festus, De verborum significatu s.v. Oscinum tripudium",
    "speaker": "Festus",
    "date": "2nd century AD",
    "tier": "technical",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "livy-per-19",
    "citation": "Livy, Periochae 19",
    "speaker": "Anonymous epitomator of Livy",
    "date": "4th century AD",
    "tier": "history",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  },
  {
    "id": "cic-div-2-85",
    "citation": "Cicero, De divinatione 2.85",
    "speaker": "Marcus, in Cicero, De divinatione 2",
    "date": "44 BC",
    "tier": "marcus",
    "original": {
      "lang": "la",
      "text": "",
      "licence": ""
    },
    "translations": [],
    "rules": []
  }
];

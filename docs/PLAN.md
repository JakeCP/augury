# Augury — plan and specification

A quiet, ad-free, installable website for taking the auspices in the Roman manner:
marking a quarter of sky, keeping silence, watching birds, and reading what they
allow. Two companion rites: the **tripudium** (the sacred chickens) and the
**Sortes Astrampsychi** (the oracle-book of numbered lots from Roman Egypt).

It should be faintly funny by being completely serious: a well-made instrument,
not a joke app.

This document is the spec. `docs/SOURCES.md` is the register of texts, editions,
translations and their copyright status. Every rule below cites a passage; where
the sources are silent and we had to decide, the row says **Reconstruction** and
gives our reason. "Attested" is never used bare: each rule names *what kind* of
evidence attests it (see the tiers in §3), because Quintus arguing for divination,
Cicero drafting laws, a slave in a comedy, and Festus glossing a word are not the
same kind of witness. Citations we could not check against a page scan in the
sandbox carry a `verify:` note; they are checked in phase 4c.

The site is called **Augury**, the repo is `augury`, the service-worker cache is
`augury-v<N>`. One name everywhere.

---

## 0. Status and phases

| Phase | Deliverable | Stop for review |
|---|---|---|
| **1. Sources + rules** | This file; `docs/SOURCES.md` | done |
| **2. Engine + tests** | `js/rules.js`, `js/compass.js`, `js/share.js`, `js/tripudium.js`, `js/sortes.js` (all DOM-free); `tests/*.test.mjs` under `node --test` | ← **in progress** |
| 3. UI + design | Views, router, sky-dome, ink birds, fonts, themes, sensors | yes |
| 4a. Texts pilot | One full Sortes decade + 6 passages, timed; style guide; rate estimate that re-confirms the full-text decision below | yes (gate) |
| 4b. Texts in bulk | Passage data (Latin/Greek + PD English + our translations), Sortes transcription and translation in batches, About page. Augury + tripudium texts first; the Sortes may ship as a follow-on release behind the finished engine | per batch |
| 4c. Fidelity review | Independent check of every quotation and translation against the pinned scans (`scripts/provenance.json`); resolve every `verify:` note in this file | yes |
| 5. PWA + polish | Manifest, icons, service worker, CI, README, accessibility audit, performance | yes |

### The four questions, decided

1. **Default Roman orientation: Varro (face south).** Varro *LL* 7.7 is the only
   passage that defines all four parts against cardinal points, so it is the
   only orientation the region math can be built on without reconstruction.
   Livy (face east) is offered as an alternative and labelled **disputed**
   everywhere it appears (§2). (§2)
2. **Sortes text: Hercher 1863, translated as printed, Christian elements kept
   and explained.** Hercher is an eclectic reconstruction of the Byzantine
   recension, not a manuscript transcript, and the mechanism routes through
   the named prophets who are the point of that recension (§7).
3. **Sortes scope: full text.** All 92 questions and all **920 reachable
   answers** (92 × 10) are translated — any question × lot can land almost
   anywhere, so a subset cannot work. The remaining **110 filler lines**,
   which no consultation can reach, are transcribed; whether they are also
   translated is decided at the 4a gate on the measured rate. (§7)
4. **Licences: code MIT; our own prose and translations CC BY 4.0;
   public-domain texts marked as such**, in `LICENSE` and
   `LICENSE-content.md` on the yijing pattern, with a named licensor and a
   per-field licence in every data record. See `docs/SOURCES.md`.

---

## 1. Principles

- **Beauty and stillness.** Mobile first: the phone is an instrument used outdoors,
  standing, looking up. One-handed, big targets (≥ 48 px), legible in sunlight
  (high-contrast light theme by default; dark theme for dusk, automatic and
  switchable).
- **Private.** No ads, trackers, analytics, cookies, accounts, third-party
  requests. Nothing leaves the device unless you copy a share link; the link
  contains the time, the bearings and the signs, **never the question**, and
  the share sheet previews exactly what it encodes before copying. The
  question stays in `sessionStorage` — on this device, cleared when the tab
  closes — and never enters a URL, a share link, or the record. A shared
  record opened in a tab that holds the viewer's own question never displays
  the two together (there is a test for this). Sensor data is read on the
  device and goes nowhere except into a link the user chooses to copy.
- **Static.** Plain HTML, CSS, ES modules. No build step to serve. Node only for
  development and tests.
- **Faithful.** Every rule is cited; every reconstruction is labelled as one, both
  here and in the About page. Where we have invented a number (a weight, a
  factor, a probability) the record shows it rather than hiding it.
- **Legally clean.** Public-domain source texts and translations, transcribed
  from pinned page scans, plus our own writing and translations under CC BY
  4.0. See `docs/SOURCES.md`.
- **Offline and installable.** Service worker with a versioned cache; manifest;
  icons.

---

## 2. The templum: orientation and regions

The augur marks out a *templum*, a bounded region of sky, and names its parts.

> *Eius templi partes quattuor dicuntur, sinistra ab oriente, dextra ab occasu,
> antica ad meridiem, postica ad septemtrionem.* — Varro, *LL* 7.7

> *regiones ab oriente ad occasum determinavit, dextras ad meridiem partes, laevas
> ad septentrionem esse dixit* — Livy 1.18.7

Varro's augur faces **south**: east is on the left. Livy's augur (at the
inauguration of Numa) draws a line from east to west and calls the south side
right and the north side left, so he faces **east** — but that facing is an
inference: in the text Numa himself sits facing south (*in lapide ad meridiem
versus*), the augur sits on his left, and the very clause that assigns right
and left has been suspected as an interpolated gloss (Livy would write
*sinistras*, not *laevas*). We offer the Livy orientation labelled
**Reconstruction (disputed)** and say so in the UI. Greek diviners favoured
the right (Cicero, *Div.* 2.82); in Homer the right hand is the side "towards
the dawn and the sun" (*Il.* 12.239–40), so a Greek observer facing **north**
has the east on the right.

| Orientation | Tradition | Faces | Left (*sinistra/laeva*) | Right (*dextra*) | Front (*antica*) | Back (*postica*) | Source |
|---|---|---|---|---|---|---|---|
| `varro` (default) | Roman | S (180°) | E | W | S | N | Varro *LL* 7.7 |
| `livy` | Roman | E (90°) | N | S | E | W | Livy 1.18.6–7. **Reconstruction (disputed)**: Numa faces south in the text; the augur's eastward facing is inferred from a clause editors have suspected. `verify:` Conway–Walters note against the scan in 4c. |
| `greek` | Greek | N (0°) | W | E | N | S | Cic. *Div.* 2.82; Hom. *Il.* 12.239–40. **Reconstruction**: the north-facing stance is inferred from "right = towards the dawn". |
| `own` | either | the user's bearing | — | — | — | — | Varro *LL* 7.8 (the templum is bounded by named landmarks, "*olla vera arbos*…", and "*concipitur verbis non isdem usque quaque*"); Servius *ad Aen.* 6.191 (augurs marked out "*certa spatia*" of their own choosing). **Reconstruction**: we let the user fix the front on a landmark. |

**Bounds are declared once, before the watch, never per sign.** At the
*conceptio* the user fixes the front bearing and may narrow the templum to a
sector around it (half-width in degrees, default 180°, the whole circle) by
naming landmarks, as Varro's formula names trees. A sign outside that declared
sector is not pertinent (R-TEMPLUM) — judged by geometry from its bearing,
not by a box ticked after the bird has been seen. There is no per-sign
"beyond the bounds" escape, and a dire sign inside the templum cannot be
declined or escaped at all (§3.3).

### Region math (pure; `js/compass.js`)

Two ancient systems are in play and we say which does what: **Livy's halves
(left/right) are the operative system** — they decide favourability, and the
dome's wash shows them. **Varro's quarters are labels** that name where in the
sky the bird was. A bird can therefore be labelled *antica* and weighed as
right; the record shows both, and the About page explains the two systems.

- All angles are degrees clockwise from north. `norm(a) = ((a % 360) + 360) % 360`.
- `rel = norm(azimuth − front)` is the bird's bearing relative to the augur's front.
- **Side** (`sideOf`): `0 < rel < 180` is right; `180 < rel < 360` is left; within
  `ε = 5°` of 0° or 180° the bird is **on the line** (`'line'`). Livy divides the sky
  into halves by a line, so left and right are halves, not quarters.
  **Reconstruction**: the ε tolerance (widened from a first draft's 2°, which
  claimed more precision than a phone compass has) and what to do with signs
  on the line (R-LINE). The watch sheet lets the user confirm "straight
  ahead / straight behind" by eye; the engine never pretends the sensor
  settled it.
- **Quarter** (`quarterOf`, labels only): `antica` = [315°, 45°), `dextra` = [45°, 135°),
  `postica` = [135°, 225°), `sinistra` = [225°, 315°), as half-open intervals with
  wraparound. Varro names four parts, each "towards" a cardinal point; we centre
  each quarter on its cardinal point. **Reconstruction**: the 90° widths.
- **Elevation** (from device tilt) gives the bird's height: low 0°–<20°, middle
  20°–50°, high > 50°. Below the horizon, or no bearing at all, is `na`, never
  silently "low". **Reconstruction**: the thresholds.

Tests cover every orientation × every cardinal and intercardinal point, the
quarter boundaries, ε at 0/180/360, negative and > 360 inputs, and NaN or null
input (which must throw a clear error, not produce a region).

### Compass input

- **iOS Safari**: `DeviceOrientationEvent.requestPermission()` must be called from
  a user tap. Then `event.webkitCompassHeading` (magnetic, degrees clockwise) and
  `event.webkitCompassAccuracy` (± degrees; negative means uncalibrated).
- **Android Chrome**: `deviceorientationabsolute`. `alpha` is counter-clockwise
  from north, so `heading = norm(360 − alpha)`. Android events carry **no
  accuracy property**; the ±25° hint below is iOS-only, and on Android we rely
  on the jitter check alone. The `screen.orientation.angle` correction is
  applied **exactly once**, in `sensors.js` via `applyScreenOrientation`,
  never also inside `compass.js`.
- **Pointing at a bird.** The user holds the phone up like a camera, so we want the
  heading of the back of the device, not its top edge. `pointingVector(alpha,
  beta, gamma)` (pure, in `compass.js`) returns `{headingDeg, elevationDeg,
  overhead, belowHorizon, vector}` for the device's −Z axis. Convention:
  earth frame (east, north, up); device frame (x right, y towards the top
  edge, z out of the screen); intrinsic rotations α about z, then β about the
  new x, then γ about the new y (the W3C order), applied to the basis vectors
  step by step in the code so the convention can be read off it. Heading is
  `atan2(east, north)`, elevation `asin(up)`. **Zenith rule**: above 80°
  elevation the heading of −Z is undefined and spins, so `headingDeg` is
  `null` and `overhead` is true; the sheet then asks the user to place the
  sign by eye. Worked vectors (all in the tests): flat screen-up (points at
  the ground, no heading); upright facing N/E/S/W; tilted back to point 45°
  up (β = 135°); flat and rolled (γ); screen-down flat (points at the zenith,
  overhead). `verify:` γ sign and the screen-angle sign on real devices in
  phase 3 — the math is self-consistent, the handset is the arbiter.
- **iOS yaw offset**: where `alpha` is not absolute, the templum screen asks
  the user to lay the phone flat, top edge towards the front they mean to
  face; we compute the offset once from `webkitCompassHeading`
  (`yawOffsetDeg`) and apply it thereafter (`applyYawOffset`).
- **Accuracy hints**: if accuracy is worse than ±25° (iOS), or negative, or the
  heading jitters by more than 15° over 2 s (either platform), show a calm
  hint ("Move the phone in a slow figure of eight, away from metal") rather
  than an alarm. Sensors need a secure context, so they cannot be exercised
  over plain `http://` on the LAN; the manual fallback is the dev path.
- **Magnetic north**: bearings shown are **magnetic**. We don't estimate
  declination from a location — we never ask for one — but the user may enter
  a manual declination offset (one signed number, east positive,
  `applyDeclination`), stored in the record and the share link. The Romans
  worked by the sun; we work by the magnet and say so.
- **Fallback** (desktop, permission denied, no sensor): set the heading by hand
  (drag the rose, or ±1°/±15° buttons, or type a bearing), and place signs by
  tapping the sky-dome or choosing a quarter.

---

## 3. The rules table

Rule IDs are stable. The engine reports which rules decided a verdict, and the UI
links each one to its passage. Every passage carries `speaker/genre`, `date`,
and an **evidence tier**, shown in the UI, because "attested" alone flattens
very different witnesses:

| Tier | Means | Examples |
|---|---|---|
| `technical` | Antiquarian / technical gloss of augural practice | Festus & Paulus (epitomes of Verrius Flaccus), Varro, Servius |
| `quintus` | Quintus in *De Divinatione* 1, making the Stoic case *for* divination | *Div.* 1.28, 1.77, 1.85, 1.108 |
| `marcus` | Marcus in *De Divinatione* 2, demolishing it (often our best evidence for what the practice *was*) | *Div.* 2.71–73, 2.82 |
| `draft-law` | Cicero's *proposed* law-code, not recorded augural law | *Leg.* 2.21, 2.31 |
| `legend` | Foundation legend / early "history" | Livy 1.7, 1.18, 1.34, 1.36 |
| `history` | Later historical narrative | Livy 8, 10 |
| `comedy` | A character in a play, inventing convenient signs | Plautus *Asinaria* 259–64 |
| `natural-history` | Pliny reporting lore and belief | *NH* 2, 10, 28 |
| `poetry` | Epic / poetic usage | Homer, Ennius |
| `reconstruction` | Our decision where the sources are silent | all numbers: weights, factors, thresholds |

The About page gets one short paragraph stratifying these — legend,
antiquarian gloss, philosophy, our guesses — so no reader is invited to take
Quintus as "Cicero says". Favourable signs as a class are *admissivae*,
prohibiting signs *cliviae* (Paul. Fest. s.vv.); the glosses use the
ancient words. Festus is now quoted from Lindsay 1913 with Lindsay
pages (Müller pages kept alongside; phase 4b, see SOURCES and
`scripts/provenance.json`).

### 3.1 Birds and their modes

Festus (s.v. *Oscines*, p. 197 M) quoting Appius Claudius:

> *Oscines aves Ap. Claudius esse ait, quae ore canentes faciant auspicium, ut
> corvus, cornix, noctua; alites, quae alis ac volatu, ut buteo, sanqualis, aquila,
> inmusulus, vulturius; picus autem Martius Feroniusque et parra et in oscinibus et
> in alitibus habentur.*

Latin names map onto **nearest modern birds**, not exact species: *cornix* is
properly the hooded crow, and our "Crow" takes any crow, rook or jackdaw the
user actually has; *buteo* is one buzzard, offered as "Buzzard / hawk". The
About page says the table maps Roman categories onto the modern sky, and each
ink drawing carries two lines of identification (size, call). Because a
distant owl at dusk swings between weight 1 and dire, the sheet also offers
**"Owl (unsure)"** (`owlUnsure`): weighed as *noctua*, never dire, with a
gloss saying so. **Reconstruction**: the mapping policy.

| ID | Bird (UI) | Latin | Mode(s) | Weight | Side rule (Roman) | Source | Notes |
|---|---|---|---|---|---|---|---|
| B-RAVEN | Raven | *corvus* | voice (*oscen*) | 2 | **right** is favourable | Festus s.v. *Oscines* (`technical`); Quintus, Cic. *Div.* 1.85 "*a dextra corvus, a sinistra cornix faciat ratum*"; Plaut. *Asin.* 260 "*corvos parra ab dextera*" (`comedy`); Pliny *NH* 10.33 ("alone of birds the raven seems to understand its own signs") | Weight 2 because of Pliny 10.33. **Reconstruction.** |
| B-CROW | Crow (any) | *cornix* | voice | 1 | **left** is favourable | Festus; Quintus, Cic. *Div.* 1.85; Plaut. *Asin.* 260 "*picus et cornix ab laeva*" (`comedy`) | Pliny *NH* 10.30: "*inauspicatae garrulitatis*", and most ill-omened after the solstice (shown as a gloss, not weighed) |
| B-NOCTUA | Owl (little owl) | *noctua* | voice | 1 | general rule | Festus s.v. *Oscines* (`technical`) | — |
| B-BUBO | Owl (eagle-owl) | *bubo* | voice or flight | 1 | general rule; **dire** by daylight | Pliny *NH* 10.34–35: "*funebris et maxime abominatus publicis praecipue auspiciis… in urbibus aut omnino in luce visus dirum ostentum est*" (`natural-history`) | see R-DIRA. At night, weighed normally. |
| B-EAGLE | Eagle | *aquila* | flight (*ales*) | 3 | general rule | Festus; Pliny *NH* 10.6 "*aquilae maximus honos*"; Livy 1.34.8–9 (Tanaquil) (`legend`) | Jupiter's bird. Special sign: R-TANAQUIL |
| B-VULTURE | Vulture | *vultur(ius)* | flight | 2 | general rule | Festus; Livy 1.7.1 (Remus six, Romulus twelve) (`legend`). Ennius' "*ter quattuor corpora sancta avium*" does not name the species; Livy supplies the vultures, so Ennius is cited for number (R-COUNT), not here. | number matters: R-COUNT |
| B-HAWK | Buzzard / hawk | *buteo* | flight | 1 | general rule | Festus s.v. *Oscines*; Pliny *NH* 10.21 (the Buteo family was named "*cum prospero auspicio in ducis navi sedisset*") | kept because Festus names it and the sky is full of them |
| B-PICUS | Woodpecker | *picus Martius* | voice **and** flight | 2 | **left** is favourable | Festus ("*et in oscinibus et in alitibus*"); Plaut. *Asin.* 260 (`comedy`); Pliny *NH* 10.40 "*in auspiciis magni*" | Plautus *Asin.* 262–4: a woodpecker tapping an elm means someone is in for a beating (gloss; the slave is joking, and the Texts page quotes the passage whole so readers can see it) |
| B-PULLI | Chickens (*pulli*) | *pullus* | feeding (*tripudium*) | — (2 as tripudium) | — | Marcus, Cic. *Div.* 2.72–73; Pliny *NH* 10.49 | The *pulli* are young chickens of either sex kept in a cage; in the watch, feeding with food falling becomes a tripudium (R-TRIP-ANY). A **cock** crowing out of season (evening, untimely) is an *ostentum*, recorded but not weighed (Pliny 10.49 "*praeposteri eorum vespertinique cantus*" — of cocks, not hens). |
| B-OTHER | Other / thunder | — | any | 0 | — | Marcus, Cic. *Div.* 2.76 ("*avium… divinatio*" belongs to the augural birds). **Reconstruction**: the not-weighed policy. (Smith's *DGRA* was orientation only and is not cited as authority anywhere.) | Recorded but not weighed, except as a tripudium (R-TRIP-ANY). Thunder and other *ostenta* are logged here; see the scope note below. |

*Sanqualis* and *inmusulus* are named by Festus, but Pliny (*NH* 10.20) says even
the augurs argued over what they were, so we leave them out (About page explains
why). *Parra* is likewise unidentified (barn owl, green woodpecker and lapwing
have all been proposed) and is omitted as a bird the user can pick; Plautus'
line, which puts the ill-omened *parra* on the favourable right alongside the
raven, is quoted whole in the Texts page. The weights are
**Reconstruction**: the sources give a hierarchy (eagle highest, Pliny 10.6; raven
and woodpecker singled out, Pliny 10.33, 10.40) but no numbers.

**Scope.** Roman *auspicia* had five genera (Servius *ad Aen.* 3.89 —
`verify:` section number against Thilo–Hagen in 4c): *ex caelo*
(thunder and lightning, left-hand thunder the best of all signs), *ex avibus*,
*ex tripudiis*, *ex quadrupedibus*, *ex diris*. This instrument takes birds
and the tripudium only. Thunder heard mid-watch can be logged as an
*ostentum* under B-OTHER, recorded and honoured, but not weighed; the About
page states the exclusion plainly.

### 3.2 Interpretation rules

| ID | Rule | Source(s) | Tier / status |
|---|---|---|---|
| R-SIDE | **Roman**: signs on the **left** are favourable; **Greek**: on the **right**. | Marcus, Cic. *Div.* 2.82 "*Ita nobis sinistra videntur, Graiis et barbaris dextra meliora*"; Pliny *NH* 2.142 "*laeva prospera existimantur, quoniam laeva parte mundi ortus est*"; Festus s.v. *Sinistrum* ("*laetum et prosperum auspicium*"); Hom. *Il.* 12.239–40 | `marcus` + `natural-history` + `technical` + `poetry` |
| R-EXCEPT | Roman bird exceptions: raven favourable on the **right**; crow and woodpecker on the **left**. They override R-SIDE under the Roman tradition only. | Quintus, Cic. *Div.* 1.85; Plaut. *Asin.* 259–61 | `quintus` + `comedy`. **Reconstruction**: we don't apply them under the Greek tradition, where the plain right-hand rule holds. |
| R-MODE | A bird speaks best in its own mode: an *oscen* by voice, an *ales* by flight, the woodpecker and the eagle-owl by either. A sign with no kind in the bird's modes (a silent raven passing over) is weighed at **half strength**, not discarded — most corvids are in fact seen silent, in flight, and literary omens use their flight. Voice and flight together count once, at full strength if either is the bird's mode. | Festus s.v. *Oscines*; Quintus, Cic. *Div.* 1.120 "*volent alites… canant oscines*"; Pliny *NH* 10.43 (the two species, *oscines et alites*) | Attested classification (`technical`, `quintus`). **Reconstruction**: the ½ factor. The rite copy still warns that a crow is *meant* to be heard. |
| R-TEMPLUM | Only signs **inside the declared templum** (§2: front ± declared half-width) are pertinent. Judged by bearing against the bounds fixed at the *conceptio*; there is no per-sign bounds box. | Servius *ad Aen.* 6.191 "*captantes auguria certa sibi spatia designarent, quibus volebant videnda ad se pertinere*"; Varro *LL* 7.8 | `technical` |
| R-ASK | Before watching, the augur **names the signs asked for** (default: all augural birds). Signs asked for are *impetrativa*; others are *oblativa*. | Livy 1.18.10 "*tum peregit verbis auspicia quae mitti vellet*"; Servius *ad Aen.* 6.190 "*auguria aut oblativa sunt, quae non poscuntur, aut inpetrativa, quae optata veniunt*" | `legend` + `technical` |
| R-DECLINE | An **oblative, non-dire** sign may be **declined** ("I did not ask for this"); if so it is not weighed. A declined sign stays in the record, marked *non observavi*. If accepted, it is weighed like any other. A dire sign can never be declined, and neither can a sign that was asked for. | Pliny *NH* 28.17 "*neque diras neque ulla auspicia pertinere ad eos, qui quamque rem ingredientes observare se ea negaverint*" and "*prout quaeque accepta sint, ita valere*"; Servius *ad Aen.* 12.259 (refusing an unasked sign — `verify:` lemma text in 4c); Marcus, Cic. *Div.* 2.77 (Marcellus travelled in a closed litter so as not to see signs) | Attested principle (`natural-history`, `technical`, `marcus`). **Reconstruction**: restricting decline to oblative non-dire signs, although Pliny's sentence would allow refusing even *dirae* by a prior disclaimer; we take the stricter course and say so, so that R-DIRA means what it says. |
| R-LINE | A sign exactly **on the line** (within ε of front or back), overhead with no bearing, or heard with no direction, is neither left nor right and is not weighed. The Tanaquil stoop and a tripudium are exempt: neither has a side to be on. | — | **Reconstruction**. Livy's line divides the halves; a bird on it belongs to neither. |
| R-DIRA | A pertinent **dire** sign settles it: **AVES NON ADMITTVNT**, whatever else was seen, and it cannot be declined. Dire signs: an eagle-owl in daylight (the sheet asks "seen in daylight?" for every *bubo*, defaulting from the daylight toggle, because a clock guess must not manufacture the harshest verdict in the engine), and a raven whose voice is choked ("*velut strangulati*"). | Pliny *NH* 10.34–35 (*bubo*), 10.33 ("*pessima eorum significatio, cum gluttiunt vocem velut strangulati*"); Cic. *Leg.* 2.21 ("*quaeque augur… dira deixerit, inrita infectaque sunto*"); Quintus, Cic. *Div.* 1.29 (Crassus "*dirarum obnuntiatione neglecta*") | `natural-history` + `draft-law` + `quintus`. **Reconstruction**: that it overrides all favourable signs, and (above) that it cannot be declined. |
| R-PRAEPES | **Flight quality is one factor, applied once.** A bird flying onward ahead of the augur (*praepes*) or flying high strengthens its sign; low flight weakens it. Onward ×3/2; otherwise high ×5/4, low ×3/4. Onward-and-high is still ×3/2: Gellius reports the ancients debating whether *praepes* simply *means* high-flying (Nigidius opposing *praepes* to *infera*), so height and onward flight are probably one idea, not two multipliers. The gloss shows the debate. Applies only to signs including flight; a heard bird's height is `na` (×1). | Paul. Fest. s.v. *Praepetes* "*Praepetes aves dicuntur, quae se ante auspicantem ferunt*" (Paulus' short form; Festus' fuller Lindsay text presents the definition as disputed — see `fest-praepetes`, 4b); Ennius *ap.* Quintus, Cic. *Div.* 1.108 "*praepetibus sese pulchrisque locis dant*", 1.107 "*servat genus altivolantum*" (a description, not a rule); Gellius *NA* 7.6 (**our own translation**; see SOURCES) | Attested term (`technical`, `poetry`). **Reconstruction**: the single-factor merge and its values. (Formerly two rules, R-PRAEPES and R-HEIGHT.) |
| R-REMORA | A bird **turning back or coming towards the augur** is a *remores* bird, one that "makes a man delay". It cannot forbid, but it **turns a favourable verdict into ALIO DIE**. | Paul. Fest. s.v. *Remores* "*Remores aves in auspicio dicuntur, quae acturum aliquid remorari conpellunt*"; cf. s.v. *Inebrae* ("*quae tardant vel morantur agentem*") | Attested term (`technical`). **Reconstruction**: the mapping from flight direction. |
| R-COUNT | **Number** strengthens a sign, with diminishing returns: factor `(m + 3) / 4` where `m = min(count, 12)` — each further bird adds a quarter of the first bird's weight. The count is birds where they can be seen, calls where only heard; the sheet stepper runs 1–12, 12 meaning "twelve or more". | Livy 1.7.1 (Remus six, Romulus twelve: "*hi numero avium regnum trahebant*"); Ennius *ap.* Quintus, Cic. *Div.* 1.108 "*ter quattuor*" | Attested that number mattered (`legend`, `poetry`). **Reconstruction**: the curve, capped at Romulus's twelve, and chosen rational so the arithmetic below is exact. **Stated consequence**: six vultures against twelve gives 9/2 against 15/2 — short of the 2:1 of R-MIXED — so the founding contest replayed through this engine ends **ALIO DIE**, which, given how the original ended, seems the safer verdict. The tests pin this as the canonical case. |
| R-TANAQUIL | An **eagle that stoops to the augur and rises again** is the highest favourable sign (strength ×3, exempt from R-LINE, never a remora). In Livy the eagle snatches the travelling Tarquin's cap, circles noisily, and *replaces* it; Tarquin was not auspicating, and Tanaquil reads a private oblative omen. The gloss tells the story as Livy tells it; our "stoop" is the nearest thing a watcher can record. | Livy 1.34.8–9 "*circa summum culmen hominis auspicium fecisse*" | Attested story (`legend`). **Reconstruction**: treating it as a rule. |
| R-TRIP-ANY | **Any bird** that drops food while feeding — food actually falling to the ground is the whole criterion, and the sheet asks it outright — makes a *tripudium*, which is favourable (weight 1; for the *pulli*, weight 2). Feeding neatly, nothing falling, is no sign. Side, height and flight do not apply. | Marcus, Cic. *Div.* 2.73 "*decretum collegii vetus habemus omnem avem tripudium facere posse*"; Quintus, Cic. *Div.* 1.28 "*tripudium fieri, si ex ea quid in solidum ceciderit*" | `marcus` + `quintus` |
| R-WEIGH | Net strength of a weighed sign = weight × count factor × flight factor × mode factor (×3 instead for the Tanaquil stoop), computed in **exact rational arithmetic** so the 2:1 boundary is stable to the fraction. Signs are summed as favourable F and unfavourable U. **The record shows each sign's strength and the F/U totals**: the numbers are ours, and displaying them is more honest than hiding them. One eagle (3) outweighs an ordinary flock of four crows flying onward (1 × 7/4 × 3/2 = 21/8); the tests pin the hierarchy. | — | **Reconstruction** |
| R-NONE | **No pertinent sign** by the end of the watch: **ALIO DIE**. Absence of a sign in the sky is a postponement, not a prohibition — the opposite case, chickens positively refusing in the camp rite, belongs to §4 and is distinguished there. | Quintus, Cic. *Div.* 1.77 (Flaminius' chickens would not eat and the pullarius advised "*quiescendum*", that he should wait); Cic. *Leg.* 2.31 (an augur's "*alio die*" breaks off public business) | Attested formula (`quintus`, `draft-law`). **Reconstruction**: applying it to an empty watch. |
| R-CLEAR | Only favourable: **AVES ADMITTVNT**. Only unfavourable: **AVES NON ADMITTVNT**. | Livy 1.36.6 "*ubi aves non admisissent, dirimerentur*"; Plaut. *Asin.* 259 "*impetritum, inauguratumst: quovis admittunt aves*"; Paul. Fest. s.v. *Admissivae* | `legend` + `comedy` + `technical` (the wording as a pronouncement is our formulation; §3.4) |
| R-MIXED | **Mixed signs**: if F ≥ 2U, ADMITTVNT; if U ≥ 2F, NON ADMITTVNT; otherwise **ALIO DIE**. If the *first* pertinent sign (order preserved by sequence, not merely by minute) and the *greater* weight point different ways, the gloss tells of Romulus and Remus — as an analogy, honestly labelled: Livy has two observers with two *favourable* signs and rival claims by priority and by number, not favourable against unfavourable for one question. | Livy 1.7.1 "*tempore illi praecepto, at hi numero avium regnum trahebant*" | **Reconstruction**: the 2:1 threshold. The Romulus and Remus story shows that even the founders had no rule for this, and it ended in a death. |
| R-SILENTIUM | The watch must be free of fault (*silentium* — absence of *vitium*, ritual fault, not literal quiet; the UI control says "the watch was disturbed — a fault occurred"). If the user reports a fault, or the app was hidden for more than 60 s (judged from `visibilitychange` timestamps, never timers, which pause when hidden), the auspice is **vitiated** and the result is **ALIO DIE**. The verdict still records what it *would have been* without the fault, dire signs included, so backgrounding the phone can postpone but never quietly improve an outcome. | Marcus, Cic. *Div.* 2.71–72 "*id enim silentium dicimus in auspiciis, quod omni vitio caret*"; Festus s.vv. *Sinistrae aues*, *Silentio surgere* (Lindsay pp. 502–504, 524; lemmata confirmed in 4b — `fest-sinistrum`) | `marcus` + `technical`. **Reconstruction**: the 60-second rule. |
| R-REPEAT | After NON ADMITTVNT or ALIO DIE the augur may **take the auspices again** (*auspicia repetere*). The earlier attempt stays in the record. From the **second** attempt in a day, the verdict carries Cicero's remark on "forced" auspices — Livy's cases are magistrates returning *to Rome* to renew flawed auspices, not re-asking the same question until the answer improves, and the copy does not pretend otherwise. Attempts are counted in `localStorage` under a local-date key (`augury:attempts:YYYY-MM-DD`); watches and tripudia count separately (§4). | Livy 8.30.2 "*ad auspicium repetendum Romam proficisceretur*"; 8.32.4 "*auspicia repetenda ne quid dubiis dis agerem*"; Quintus, Cic. *Div.* 1.27–28 (*auspicia coacta*), Marcus, *Div.* 2.73 | Attested practice (`history`). **Reconstruction**: the same-day counter and the second-attempt note. |
| R-FALSE | A false report falls on the one who makes it. This is shown in the watch screen copy, not computed. | Livy 10.40.11 "*qui auspicio adest, si quid falsi nuntiat, in semet ipsum religionem recipit*" | `history` |

### 3.3 Verdict algorithm (`interpret(observation) → verdict`)

Precedence is a decision table, applied top to bottom. The tests in
`tests/rules.test.mjs` mirror this table row for row; if the table changes,
the tests change in the same commit.

**Per sign** (first matching row classifies the sign):

| # | Condition | Classification | Rule |
|---|---|---|---|
| P1 | Bearing outside the declared templum sector | ignored (*extra templum*) | R-TEMPLUM |
| P2 | Dire (eagle-owl in daylight; choked raven voice) | **dira** — decline flag, if somehow set, is disregarded and noted | R-DIRA |
| P3 | Oblative and declined (impetrative declines are disregarded and noted) | ignored (*non observavi*) | R-DECLINE |
| P4 | Feeding with food seen to fall | weighed, always favourable; no side/height/flight factors | R-TRIP-ANY |
| P5 | Feeding, nothing fell; or *pulli* voice (cock-crow *ostentum*); or B-OTHER / *ostentum* kind | noted, not weighed | R-TRIP-ANY / B-PULLI / B-OTHER |
| P6 | Eagle, flight = stoop to the augur | weighed, always favourable, ×3, never remora | R-TANAQUIL |
| P7 | On the line, overhead, or no bearing | noted, not weighed | R-LINE |
| P8 | Otherwise | weighed: favourable by tradition and exceptions; strength by R-WEIGH; remora flag if flight is turning back / towards the augur | R-SIDE, R-EXCEPT, R-MODE, R-COUNT, R-PRAEPES, R-REMORA |

A dire sign *outside* the sector declared before the watch is *extra templum*
(P1) — that is what declaring bounds beforehand means, and with the default
whole-circle templum it cannot happen. What no one may do is escape a
pertinent dire sign after seeing it: P2 sits above decline (P3) on purpose.

**Verdict** (first matching row decides; F and U are exact rationals):

| # | Condition | Verdict | Rule |
|---|---|---|---|
| V1 | `vitium` reported (final verdict; the result also carries `wouldBeVerdict` from V2–V6 ignoring the fault) | ALIO DIE | R-SILENTIUM |
| V2 | Any sign classified dira | AVES NON ADMITTVNT | R-DIRA |
| V3 | F = U = 0 (no weighed sign) | ALIO DIE | R-NONE |
| V4 | U = 0, F > 0 → ADMITTVNT; F = 0, U > 0 → NON ADMITTVNT | as stated | R-CLEAR |
| V5 | Mixed: F ≥ 2U → ADMITTVNT; U ≥ 2F → NON ADMITTVNT; else ALIO DIE | as stated | R-MIXED |
| V6 | Result of V4/V5 is ADMITTVNT and any weighed sign is a remora | ALIO DIE | R-REMORA |
| V7 | Attach glosses: Romulus/Remus (R-MIXED analogy, first sign against the greater weight), forced auspices from the second attempt today (R-REPEAT), unsure owl, wrong-mode and similar explanations | — | — |

`interpret` is pure. Its inputs are injected:

```
{ tradition: 'roman'|'greek', orientation, frontDeg, templumHalfWidthDeg (=180),
  declinationDeg (=0, recorded; bearings already corrected by the caller),
  askedFor: birdId[] (default: all augural birds), vitium,
  isDaylight (toggle defaulting from the clock, 06–20h; per-sign `daylight` overrides),
  attemptsToday (1-based), signs: [...] }
sign = { bird, kinds: ('voice'|'flight'|'feeding'|'ostentum')+,
         relDeg (0–<360, tenths allowed) | azimuthDeg | null,
         height: 'low'|'middle'|'high'|'na',
         flight: 'onward'|'across'|'returning'|'circling'|'settled'|'stoop'|'na',
         count (1–12), declined, chokedVoice, foodFell, daylight?, dtSec }
```

Sign order in the array is the sequence order (the share link preserves it).
It returns `{ verdict, latin, english, rulesVersion, decidedBy: ruleId[],
signs: classified[], glosses: id[], favourable, unfavourable, wouldBeVerdict? }`,
where each classified sign carries its side, quarter (label), strength as an
exact fraction, and the rule IDs that touched it. Bad input (unknown bird,
NaN bearing, count out of range) throws a clear `RangeError`/`TypeError`;
the engine never invents a region for nonsense. We supply `isDaylight`
because we don't ask for location; no latitude feature for now.

### 3.4 Verdict wording

| Verdict | Latin (inscriptional capitals) | English gloss (our own) |
|---|---|---|
| `ADMITTUNT` | **AVES ADMITTVNT** | The birds allow it. |
| `NON_ADMITTUNT` | **AVES NON ADMITTVNT** | The birds do not allow it. |
| `ALIO_DIE` | **ALIO DIE** | On another day. |

The phrasing is **our formulation** in inscriptional dress, and §10 and the
About page say so: Livy 1.36.6 has a subordinate clause about centuries being
dismissed "*ubi aves non admisissent*", Plautus a slave's joke that "the
birds let us go anywhere", Paulus a definition of *admissivae*; the words
are ancient, the pronouncement is ours. The postponement formula is Cicero's
(*Leg.* 2.31, `draft-law`). Each verdict is followed by a short plain-English
gloss (ours, built from the rule IDs that decided it, with each sign's
strength and the F/U totals in the record) and two or three ancient passages,
in Latin with an English translation, a citation, and its evidence tier.

---

## 4. The tripudium (`js/tripudium.js`)

> *cum igitur offa cecidit ex ore pulli, tum auspicanti tripudium solistimum
> nuntiatur.* — Marcus, Cic. *Div.* 2.72

The *pullarius* opens the cage and throws down soft cake (*offa*, *puls*). The
chickens' response is the sign.

| Outcome | Description | Verdict | Source |
|---|---|---|---|
| `solistimum` | They rush out and eat so greedily that food falls from their beaks and strikes the ground. | ADMITTVNT | Quintus, Cic. *Div.* 1.28; Marcus, *Div.* 2.72; Pliny *NH* 10.49 "*horum sunt tripudia solistima*" |
| `pascuntur` | They eat, but neatly; nothing falls. | ALIO DIE | **Reconstruction**: Cic. *Div.* 1.28 makes the *tripudium* depend on something falling, so eating alone is no sign. |
| `non_pascuntur` | They will not eat. | NON ADMITTVNT | Livy 10.40.4; Balbus, Cic. *ND* 2.7; Suet. *Tib.* 2.2 (our translation). Quintus, *Div.* 1.77 has Flaminius advised to *wait* — but a positive refusal in the camp rite, ignored, is what ruined Claudius Pulcher (below); we read refusal here as a positive unfavourable sign, and reserve R-NONE's postponement for *absence* of signs in the sky watch. The texts support both shadings and the About page shows both. |
| `avolant` | They flap, cry, or fly off. | NON ADMITTVNT | **Reconstruction (checked in 4b; no primary found).** The triad comes via Smith, *DGRA* s.v. *Augurium* (orientation only, never authority here). Phase 4b read the candidates against the scans: Livy 10.40 (refusal to feed only), Val. Max. 1.4.3 (chickens "would not come out of the cage", `valmax-1-4-3`), Festus s.v. *Oscinum tripudium* (a voice-sign definition, `fest-oscinum-tripudium`); the *Cliviae* lemma could not be located in the Lindsay OCR. None attests flap/cry/fly-off, so the outcome stays ours and labelled reconstruction; any engine change is the lead's decision (see PILOT.md, 4b passages). |

**Probabilities**: these are real, seeded and injectable (`tripudium(rng,
{hunger, attempt})`, where `rng()` returns [0, 1)). Cicero complains that the
chickens were kept starving so the auspice was forced ("*inclusa in cavea et
fame enecta*", Marcus, *Div.* 2.73; *auspicia coacta*, Quintus, 1.27). So
there is a **hunger** setting, and a hungry flock eats.

| hunger | solistimum | pascuntur | non pascuntur | avolant |
|---|---|---|---|---|
| fed this morning | 0.40 | 0.25 | 0.25 | 0.10 |
| kept hungry (*default*, as was customary) | 0.70 | 0.15 | 0.10 | 0.05 |
| starved (Cicero disapproves) | 0.92 | 0.05 | 0.02 | 0.01 |

These figures are **Reconstruction**; the About page shows them openly. Both
hungry settings — Cicero's complaint is about the custom, not only the
extreme — add the *auspicium coactum* gloss to a favourable result. Every
attempt is counted (its own daily counter), shown on the result, and entered
in the record like a watch; there are no hidden retries, and tapping until
favourable accumulates attempts in plain sight (R-REPEAT's note applies from
the second). Tests check the rng→outcome boundary values exactly for every
row (0, just below each threshold, the threshold itself, just below 1), that
each row sums to 1, that each outcome maps to its verdict, and — as a smoke
check only, with the named PRNG `mulberry32` — that a long seeded run lands
near the table. (`Math.random` is unseedable and is never used by the engine.)

**Animation**: tap to scatter grain; three ink chickens step out, peck, and
crumbs fall. It runs about 4 s, and is reduced to a still frame plus text under
`prefers-reduced-motion`. The About page (and a footnote on this screen) tell the
story of P. Claudius Pulcher, 249 BC: the chickens would not eat, so he had them
thrown into the sea, "*ut biberent, quoniam ēsse nollent*" (so that they might
drink, since they would not *eat* — *ēsse* with the long e, not "be"), and lost
the fleet at Drepana (Cic. *ND* 2.7; *Div.* 1.29, 2.71; Suet. *Tib.* 2.2; Livy
*Per.* 19). Two footnotes keep us honest: Polybius, the main source for
Drepana, never mentions the chickens at all — the story is later Roman
moralising, and a better tale for knowing it.

---

## 5. The rite (user flow)

Routes use the hash, so GitHub Pages needs no server rewrites and share data
never reaches a server. Routing is strict: any unknown route shows a not-found
view with a way home.

**The watch loop, in full.** The augur chooses a suggested length (10, 20 or
30 minutes) at the *conceptio*; the timer shows **elapsed** time and never
counts down to an automatic end — R-NONE can only be declared when the augur
taps **End the watch**. Every change to the sign list is written to
`sessionStorage` at once, and a watch found there on load is offered for
resumption ("a watch is in progress — resume?"), so a killed tab, a lock
screen or a phone call loses nothing. The watch requests a Screen Wake Lock
where available and proceeds calmly without one. Signs can be edited or
deleted (with undo) until the watch ends. **There!** tapped while a sign
sheet is open queues a stub — time and bearing captured, details asked next —
so a second bird is never lost to bookkeeping for the first. Time hidden is
measured from `visibilitychange` timestamps; more than 60 s hidden sets the
fault flag (R-SILENTIUM) on return, with the would-be verdict preserved.

**The sign sheet** captures *everything* `interpret` reads, and a conformance
test walks the field list in §3.3 against this inventory: bird (ink drawings,
including "Owl (unsure)"); kinds — voice, flight, feeding, *ostentum*
(thunder and the like), voice-and-flight allowed together; **"did food fall
to the ground?"** when feeding is picked; **"was the voice choked, as if
strangled?"** for a raven by voice; **"seen in daylight?"** for an eagle-owl
(and any owl), defaulting from the daylight toggle; direction of flight —
onward ahead, across, turning back / towards me, circling, settled, and
**stooped to me and rose again** for an eagle; height, prefilled from tilt
where flight is involved and otherwise **n/a** (also n/a for perched or
heard-only birds, and always overridable by eye, including "straight
ahead / behind / overhead"); number (stepper 1–12, "12 = twelve or more;
for calls, count calls"); and for an oblative, non-dire sign, **accept or
decline** — never offered for a sign that was asked for, never for a dire
sign (the expected dire detail simply has no decline control). There is no
"beyond the bounds" box: bounds were declared at the *conceptio* (§2).

| Route | View |
|---|---|
| `#/` | Threshold: the lituus mark, one line on what this is, **Begin the auspices**, plus *Tripudium*, *Sortes*, *Texts*, *About* |
| `#/rite/question` | Optional question ("What do you put before the birds?"). Stored in `sessionStorage` only. A small note: *stays on this device, cleared when the tab closes*. |
| `#/rite/tradition` | Roman (left is favourable) or Greek (right is favourable), each explained in one line. Roman offers orientation: Varro (face south, default) or Livy (face east, *disputed*). Greek and "own bearing" are labelled reconstructions. |
| `#/rite/templum` | Mark the templum. **Allow the compass** (iOS permission on tap; on iOS, the lay-flat step that fixes the yaw offset). A sky-dome or rose that turns with the phone and names the two halves and four quarters in Latin and English, with a guide to turn and face the traditional direction. **Own bearing** fixes the front on a landmark; optional narrowing of the sector and manual declination offset. Manual fallback. Calibration hints. Suggested watch length. Then name the signs asked for (R-ASK). The words of the *conceptio* are shown, adapted from Varro 7.8 (*Templa tescaque me ita sunto…*). |
| `#/rite/watch` | *Silentium*. A slow elapsed timer, the dome, and a large **There!** button: point the phone at the bird and tap; the bearing, height and time are captured (queued as a stub if a sheet is open). Then the sign sheet above. A "the watch was disturbed — a fault occurred" control (R-SILENTIUM). Edit, delete, undo. **End the watch** when done. |
| `#/rite/verdict` | The verdict in Roman capitals (`aria-live="polite"`), the plain gloss, and the deciding rules as short lines with their tiers, each opening its passage. **Take the auspices again** (R-REPEAT, with its caution from the second attempt), **The record**. |
| `#/record` | The record: time, tradition and orientation, front bearing and declination, templum half-width, each sign (time, bird, kinds, region label, side, height, number, accepted/declined, **strength**) and the **F/U totals**, verdict. Expandable. **Share** previews exactly what the link encodes, then copies it (clipboard with a select-the-text fallback). Tripudium results appear here too, with their attempt counts. |
| `#/record/<code>` | A shared record (read-only). The verdict printed on the link is the verdict shown; the record is also re-interpreted locally and any difference under a newer rules version is noted, never silently substituted. Never contains the question — and never displays the viewer's own question beside it. |
| `#/tripudium` | The sacred chickens: hunger setting, scatter, outcome, verdict, attempt count for the day. |
| `#/sortes` | The Sortes: framing line (*for reflection and delight, not advice* — on this screen, not only in About), the moon-day advice, link to the hour question and the question list (§7). |
| `#/sortes/questions` | The 92 questions under our theme headings (labelled as ours), with a line of historical framing above the slavery questions rather than presenting them as neutral menu items. |
| `#/sortes/lot` | Speak a number 1–10 by tapping a token, or "let chance choose" (labelled ours; §7). |
| `#/sortes/answer` | The answer in Greek with English below, and the whole chain *q + k = s → the prophet → decade d, line k* shown small, like a sum on a wax tablet. |
| `#/texts`, `#/texts/<id>` | The ancient passages, Latin or Greek facing English, cited, with speaker, date, tier and licence. |
| `#/about` | What augury was; the augurs; how this site rebuilds the rules and where it guesses; sources and licences; Claudius Pulcher; "for reflection and delight, not advice". |
| *anything else* | Not found ("*Hic nihil est*: there is nothing here"). |

`<noscript>`: a short static page explaining the rite, with the About text and a
note that the instrument needs JavaScript.

---

## 6. Share link (`js/share.js`)

- Format: `#/record/` + base64url(UTF-8 of a compact versioned string), no
  padding, no `+ / =`. The payload carries **every** `interpret()` input
  (or everything needed to derive it), a rules version, and the recorded
  verdict itself. Version 1:

  ```
  1~<rulesVersion>~<tradition r|g>~<orientation v|l|g|o>~<front, tenths of a degree>
    ~<templum half-width °>~<declination, signed tenths>~<start, epoch minutes>
    ~<flags: vitium v|-, daylight d|n>~<attemptsToday>~<askedFor bitset, decimal>
    ~<recorded verdict a|n|d>~<sign>;<sign>…
  sign = <dt seconds>.<bird code>.<kinds v|f|t|o combined>.<rel, tenths, or x for none>
         .<height l|m|h|n>.<flight o|a|r|c|s|d|n>.<count 1–12>.<accepted a | declined d>
         .<detail c=choked f=food fell d/n=per-sign daylight, combined, or ->
  ```
  Bird codes, in bitset order: `rv` raven, `cw` crow, `no` little owl,
  `bu` eagle-owl, `ou` owl (unsure), `ea` eagle, `vu` vulture, `bz`
  buzzard/hawk, `wp` woodpecker, `pu` chickens, `ot` other. Impetrative vs
  oblative is *derived* from the bitset — that is the one deliberate
  derivation, and it is exact. Relative bearings are stored in tenths of a
  degree, so a bird near the line cannot round across it for the recipient.
  Sign order in the list is sequence order.
- **Never** encodes the question: there is no field for it, the encoder
  ignores a `question` property if one is lying around in state, and a test
  asserts a question string present in state never appears in the payload.
- **Limits, mutually consistent**: at most **60 signs** and at most **4,096
  characters of code** (post-encoding; 60 signs come to roughly 2.5 KB, so a
  valid watch is always shareable). Copying uses the Clipboard API where
  available, else a read-only field to select by hand. The README promises
  that v1 links decode forever.
- Decoding is strict and **never throws to the top level**: it returns
  `{ok:false, error:{code, message}}` for unknown version, bad field counts,
  out-of-range numbers, unknown codes, oversize payloads, and the rest, and
  the router shows the "this record is damaged" view. A link whose rules
  version is older than the engine's still decodes; its **recorded verdict
  is what is shown**, with re-interpretation offered only as a note.
- Tests: round-trip on generated valid observations (seeded), including the
  decisive property — **decode → interpret → the recorded verdict** — plus
  boundary values (0°, 359.9°, counts 1 and 12, 0 and 60 signs), every
  malformed case, and URL-safety (no `+ / =`).

---

## 7. Sortes Astrampsychi (`js/sortes.js`, `data/sortes-*.js`)

**What it is.** An oracle book from Roman Egypt, in origin a work of the
2nd–3rd c. AD (the surviving papyri run from the 3rd c. onward). Its frame
letter has Astrampsychus *send* the book to a King Ptolemy, claim Pythagoras
invented it, and add that Alexander had used it before him — the anachronism
is part of the charm. The enquirer picks a question from a numbered list and
speaks a number from 1 to 10; the sum leads, through a named god or prophet,
to one of the "decades" of ten answers. It is the Roman world's other way of
asking: by lot. Marcus thought little of it (*Div.* 2.85: "*Quid enim sors
est? Idem prope modum quod micare, quod talos iacere…*"), and the page quotes
him.

**Text and recensions, stated correctly.** Two recensions must not be
confused: the *ecdosis prior* from the papyri (Browne 1983, in copyright) and
the *ecdosis altera*, the medieval/Byzantine recension (Stewart's Teubner,
2001, in copyright). Ours is **Rudolf Hercher, *Astrampsychi Oraculorum
Decades CIII* (Berlin 1863)** — public domain, and an edition *of the same
Byzantine tradition* Stewart later edited, not of the papyri. Hercher is not
a manuscript transcript either: his preface says he worked from Laurentianus
and Marcianus 324 with Parisinus 2424 variants, *deleted* oracles he judged
scribal inventions (*funditus sustuli*), and corrected names *ex ingenio*.
"Translated faithfully" therefore means faithful to an eclectic 1863
reconstruction. **Translation policy**: Hercher's printed text is followed;
his apparatus variants (L/M/P) are not translated; where a deletion or
conjecture of his changes an answer's sense, the record carries an
`apparatus` flag and the UI shows a footnote mark. This recension is lightly
Christianised — prophets and patriarchs where the papyri have gods, questions
about becoming a bishop or a monk — and we keep those elements and explain
them. It is the honest choice and quietly funny on its own.

**Numbers.** 92 questions (numbered 12–103) × 10 lots = **920 reachable
answers**. Sums run 13–113 (101 distinct sums). There are 103 × 10 = 1,030
lines, so **110 lines are unreachable filler** — written answers matching no
question, there to fill the book out and mystify — not "blank lots", and we
call them filler answers. All 920 reachable answers are translated; the 110
filler lines are transcribed, and translated too if the 4a rate allows.

**Method** (Hercher pp. 1–3). The concordance is not merely black number →
red number: each sum belongs to a named figure — in the Byzantine form a
prophet or patriarch with a Greek interpretation of the name (Hercher prints
the Paris table of names in his preface, pp. IV–VIII, a composite from
Parisinus 2424/2421 — we use *that* table, say so, and do not merge it
silently with the bicolour number page in the main text; in the papyrus form
the figures are gods). The user is in effect told "ask Noah". So:

1. Choose a question *q* (12 ≤ *q* ≤ 103).
2. Speak a number *k* from 1 to 10, "whatever God gives you when you open
   your mouth".
3. Add: *s* = *q* + *k* (13 ≤ *s* ≤ 113).
4. Look up *s*: it belongs to a **prophet**, whose number gives the decade *d*.
5. In decade *d*, read answer line *k*.

   *Hercher's two worked examples* (both become test vectors the moment the
   real table is transcribed in phase 4; in phase 2 the same arithmetic is
   tested against a clearly-marked fixture): *q* = 16 "εἰ προκόψω ἐν τιμῇ"
   (*will I advance in honour?*), *k* = 5 → *s* = 21 → decade 8 → line 5,
   "προκόψεις μετὰ χρόνον καθὼς ἐπιθυμεῖς" (*you will advance in time, as
   you wish*); and *q* = 16, *k* = 10 → *s* = 26 → decade 18 → line 10.
   `verify:` decade numbers and Greek against the page images in phase 4.

Data shape (fixed in phase 2, so phase 4 fills records rather than migrating
them): `sortes-table.js` rows are `{sum, prophet: {grc, en}, interpretation:
{grc, en}, decade}`; decades are `{n, lines: [{grc, en, answersQuestion,
apparatus, filler}]}` where `answersQuestion` is the semantic tag read off
the answer's own wording *before* consulting the table, and `apparatus`
records the Hercher flag (may be null, never missing). Questions are
`{n, grc, en, themes}` with `themes` plainly our editorial grouping.
Phase 4b adds two modules (lead decision): `sortes-moon.js` — the
30-day moon table as `{day, grc, en, slot}` records (`slot` our
grouping: morning/evening/all-day/third-hour/do-not-use) plus a
ready-to-inject `moonAdvice` string array and the favourable hours as
`{weekdayGrc, weekdayEn, weekday, hour, grc, en}` records, all with
Hercher printed p. 3 as the cited source; and `sortes-frame.js` — the
frame letter + method, the Byzantine prayer, and the hours/moon
instructions (Hercher printed pp. 1–3) as passage-shaped records
(`lang: 'grc'`, our English) in the lazy-loaded Sortes payload rather
than in `data/passages.js`. Sum 13's table row carries an extra
`note` field: Hercher prints no prophet name there, the blank is
recorded faithfully, and the UI displays the note.

**Extras, with the calendrical decisions made and labelled:**

- Question 13, "is it the hour to put my question?" (Greek verified in 4a:
  the question list prints χρησμᾷ, the method prose χρησμῷ; each is
  transcribed where it stands). The text tells you to ask this
  first; the UI offers it first, and if its answer says "not the hour" the
  screen says the book has advised waiting, shows the answer, and leaves the
  choice with the enquirer. It advises; it never refuses, and never loops.
- Favourable days and hours: Sunday hour 3, Tuesday hour 3, Thursday hour 5,
  Saturday hour 6 (verified against Hercher printed p. 3 in 4a). These are Byzantine
  day-hours counted from sunrise, not 03:00 clock time. **Reconstruction**:
  we render hour *h* as the local clock hour beginning 06:00 + (*h* − 1) and
  label it an approximation. `isPropitious(date)` reports the weekday, the
  favourable hour (if any) and whether the current local hour is it.
- Days of the moon (morning, evening, all day, or μὴ χρῶ, "do not use"): the
  advice table lives in `data/sortes-moon.js` (phase 4b; Hercher printed
  p. 3) and is injected as `moonAdvice`; `moonDay(date)` is
  pure astronomy now — mean synodic month 29.530588853 days from the new
  moon of 2000-01-06, day 1 = the local calendar day containing the (mean)
  new moon, evaluated at local noon to avoid timezone flips for evening
  consultations. Tested against known new and full moons to ±1 day, which is
  all a mean-moon table can promise. **Reconstruction**: epoch, rounding and
  day-boundary choices.
- The Byzantine prayer before consulting is shown, translated, as optional text
  (record `sortes-prayer` in `data/sortes-frame.js`, phase 4b).

**Integrity, reported rather than asserted.** The tradition may not be
perfect, and the tests must describe the real table, not demand an ideal
one. In phase 2 `validateSortesData` *reports*: sums covered and missing;
(decade, line) pairs reached by more than one question; unreachable lines;
answers whose semantic tag disagrees with the question the table routes to
them. Disagreements become a named list of manuscript defects in the data
file, not test failures. The tag check is only meaningful because tags are
assigned from the Greek wording first; a tag copied from the table would
make it circular. What *is* asserted: the mechanism (`consult`) follows
*q + k = s → prophet → decade, line k* exactly, rejects out-of-range input
clearly, and — once real data lands — Hercher's two worked examples
reproduce exactly.

**Data work (phases 4a–4c)**: transcribe the Greek from the scan (the OCR is
readable but noisy, and every line is checked against the page images),
translate, and reconstruct both tables from the page images: first the
pilot decade (4a), then in batches (4b), then the independent fidelity
review (4c). **Size budget**: the full Sortes data will be several hundred KB
of JS, so `data/sortes-*.js` is **lazy-loaded** on first visit to `#/sortes`
and runtime-cached for offline — never precached — and CI tests the total
precache weight. Nobody on a hillside pays for the Sortes to use the compass.

**UI** (routes in §5): pick a question, then **speak** the number by tapping
one of ten tokens — the ancient mechanism is that the enquirer utters the
number given to him. "Let chance choose" is offered as a convenience,
labelled ours: the picker is an injected `randomInt(10)` (rejection-sampled
from Web Crypto in production, never `% 10` on a byte, and never a bare
`crypto` call inside the pure module), so it stays testable. The questions
include recovering a fugitive slave, freedom from slavery, adultery, whether
the sick person will live, whether a wife will miscarry; the list page
frames the slavery questions historically in a sentence of its own, and the
closing line — *for reflection and delight, not advice* — stands on the
Sortes screen itself. The chosen question is never put in a URL or share link.

---

## 8. Design

- **Mood**: an augur's wax tablet and bronze. Warm limestone or papyrus paper,
  black and red ink. The **lituus** (the curved augural staff, Livy 1.18.7
  "*baculum sine nodo aduncum… quem lituum appellarunt*") is the mark and icon.
- **Type** (self-hosted, subsetted WOFF2, all SIL OFL):
  - *Cinzel*, inscriptional Roman capitals, for verdicts and headings (Latin subset
    plus V-for-U usage).
  - *EB Garamond* for text, with Greek and polytonic Greek for the Sortes and
    Homer, and *lang="la"*/*lang="grc"* set properly.
  - Subsetting follows yijing's **Python + fonttools** pattern
    (`scripts/build-fonts.py`, pinned source URLs; Node has no built-in
    subsetter and we no longer pretend otherwise). The committed WOFF2 files
    need no build to serve. A `--check` mode proves coverage — every
    character in the data and rendered source, polytonic breathings, iota
    subscript and final sigma included — and runs in CI. Each font ships its
    **own** OFL notice (`fonts/Cinzel-OFL.txt`, `fonts/EBGaramond-OFL.txt`).
- **Colour tokens** (`:root`, light default; dark via `prefers-color-scheme` and a
  manual toggle stored in `localStorage`). Checked per *use*, not merely per
  pair, by `scripts/check-contrast.mjs` in CI:
  - paper `#f3ece0`, ink `#1d1a16`, red ink `#9b2a1a`, bronze `#7a5a2b`, rule
    `#cbbfa9`
  - dusk: paper `#16130f`, ink `#ece3d3`, red `#e0705a`, bronze `#c49a5c`
  - `rule` on paper is 1.55:1 — decoration only, never a control border or
    any stroke that carries meaning (the lituus line included). Bronze
    (5.4:1) passes AA but washes out first in glare: **barred from small
    text**, enforced by the check script.
- **Ink birds**: our own SVGs, drawn as single-weight brush strokes in
  `currentColor`, about 2–4 KB each: raven, crow, little owl, eagle-owl, eagle,
  vulture, buzzard, woodpecker, chickens, "other" (a few strokes of a bird in
  flight), each with its two identification lines.
- **The sky-dome**: an SVG circle seen from below. The favourable **half** is
  washed faint red (halves are operative; §2) — but the wash is never the
  only signal: halves and quarters are also lettered (SINISTRA/DEXTRA,
  ANTICA, POSTICA) with small English beneath, and the verdict is always
  text. The front line is drawn like the augur's lituus stroke, and logged
  signs appear as small ink marks. Rotation is smoothed with a critically
  damped spring (no jitter); under `prefers-reduced-motion` it snaps.
- **Motion**: slow (≥ 400 ms), eased, never decorative loops. The watch timer is
  a thin red arc of *elapsed* time — never the only progress signal; elapsed
  minutes are also written out.
- **Layout**: on a phone, a single column with the action at thumb height. On
  desktop (≥ 960 px), a spread: the sky-dome on the left, the record and texts on
  the right.
- **Accessibility** (concrete, testable; Lighthouse alone detects none of the
  likely failures): real buttons and labels; visible focus rings; focus moved
  to each step's heading; the verdict in text in `aria-live`, never by colour
  alone; a named **"Announce bearing"** button speaks the current bearing and
  region on demand (the rotating dome never chatters); the sign sheet traps
  focus and returns it to **There!** on close; 48 px targets audited per
  view; the 92 Sortes questions reachable by search and theme jumps, not 92
  tab stops in a row; `lang` on all Latin and Greek, with the English always
  adjacent (a screen reader with no polytonic voice still loses nothing);
  the whole rite usable without sensors or a pointer. §11 adds the manual
  passes (VoiceOver, TalkBack, outdoor glare) that automation cannot do.

---

## 9. Engineering

### Layout

```
index.html            404.html (redirects to #/ not-found view)
manifest.webmanifest  sw.js   .nojekyll   README.md   LICENSE   LICENSE-content.md
css/                  base.css, views.css
fonts/                *.woff2 (subset) + Cinzel-OFL.txt + EBGaramond-OFL.txt
icons/                src/*.svg (lituus seal sources) + built PNGs/SVG
img/                  birds/*.svg
js/
  rules.js            B-* bird table + interpretation engine (pure)
  compass.js          angles, regions, pointing vector (pure)
  share.js            record codec (pure)
  tripudium.js        chickens (pure, injected rng)
  sortes.js           lots, moon days (pure)
  sensors.js          DeviceOrientation glue (DOM)
  store.js            sessionStorage/localStorage wrappers (try/catch)
  router.js           strict hash router
  app.js              boot, views
  views/*.js          one module per view
data/
  passages.js         Latin/Greek + English + citation + speaker/date/tier + licence per field
  sortes-questions.js, sortes-decades.js, sortes-table.js,
  sortes-moon.js, sortes-frame.js                  (lazy-loaded; §7)
docs/                 PLAN.md, SOURCES.md, PLAN_REVIEW.md, DECISIONS.md
scripts/              serve.mjs, build-fonts.py, build-icons.mjs,
                      check-contrast.mjs, validate.mjs, provenance.json
tests/                *.test.mjs  (node --test, run from repo root, no path argument)
.github/workflows/test.yml
package.json          { "type": "module", "scripts": { "test": "node --test" } } — no dependencies
```

Icons follow yijing: sources in `icons/src/`, a `build-icons.mjs` step, and
the full set — 192/512 (any + maskable), 180 apple-touch, a monochrome icon,
`favicon.svg` and a 32 px PNG — with the file list asserted by the PWA tests.
`theme_color` in the manifest takes **one** fallback colour (paper
`#f3ece0`); media-query theme colours are not portable, and HTML
`meta[name=theme-color]` handles the two schemes where supported. The repo
name (`augury`, project page at `/augury/`) is settled before any absolute
`og:`/canonical URL or apple-touch title is written; every runtime path
stays relative so the site works at any root.

### Data models (fixed in phase 2)

Several passages need *two* English versions (Yonge plus our literal note;
Butler plus our literal for *Il.* 12.239–40), so `passages.js` records are
`{id, citation, speaker, date, tier, original: {lang, text, licence},
translations: [{label, text, licence}…], orthography?, rules: [ruleId…]}`.
Licences are **per field** (PD Latin and a CC BY translation live in one
record) and the content test requires each to be non-empty, not merely
present. Sortes shapes are in §7. Designing these now, fields empty-but-
present where phase 4 will fill them, is far cheaper than migrating a
thousand records later.

### Testing (`node --test` from the repo root)

- **rules**: the §3.3 decision table mirrored row for row, named by rule ID.
  Each bird × mode × side × tradition, the exceptions only under Roman,
  wrong-mode at half strength, dire overriding favourable and refusing
  decline, decline only for oblative non-dire signs, templum by declared
  sector, the remora downgrade, the 2:1 thresholds *exactly* at the boundary
  (exact fractions), the Romulus/Remus canonical case (ALIO DIE), eagle over
  four crows, the empty watch, vitium with its would-be verdict, the
  second-attempt note, the Tanaquil exemptions, the unsure owl.
- **compass**: as in §2, plus pointing-vector cases (flat, upright facing
  N/E/S/W, 45° up, rolled, zenith/overhead, below horizon) and the yaw,
  screen-orientation (once) and declination helpers.
- **share**: as in §6, including decode → interpret → recorded verdict.
- **tripudium**: as in §4 — exact boundaries first, seeded smoke second.
- **sortes**: the mechanism against a stub fixture now; the reported
  integrity properties and Hercher's worked examples when real data lands
  (§7); the moon-day function against known new/full moons; the lot picker
  with scripted randomness.
- **content**: every passage has a citation, speaker/date/tier, non-empty
  per-field licences and (for Latin/Greek) a `lang`; every rule ID the
  engine can emit has a passage and a tier, and appears in this plan; every
  work cited in §3–§4 has a SOURCES row (a mechanical cross-check, so the
  two documents cannot drift again); a shared-record view never renders the
  viewer's session question; every field `interpret` reads is settable in
  the §5 sheet inventory.
- **pwa**: every precache path exists (one 404 in `cache.addAll` kills
  offline entirely); manifest icons exist and are relative; the service
  worker is registered relatively; total precache weight within budget and
  the Sortes data *not* in it.
- **router**: known routes resolve and unknown ones go to not-found.

### PWA (yijing's freshness contract, adopted whole)

- `manifest.webmanifest`: `start_url: "./"`, `scope: "./"`, display
  standalone, one fallback `theme_color`, the full icon set above.
- `sw.js`: `CACHE = 'augury-v<N>'` with `skipWaiting` + `clients.claim` — no
  waiting-worker prompt a user can ignore forever while holding a stale
  engine. Navigations and data are **network-first** (cache as fallback);
  fonts and icons cache-first; CSS/JS stale-while-revalidate, so code is
  never more than one visit stale. On `activate`, delete every older cache.
  The Sortes modules are runtime-cached on first use, not precached (§7).
  **Versioning**: bump `<N>` whenever any precached file changes; the bump
  is documented in `sw.js` and the README, in the same place yijing
  documents it. Combined with the share link's recorded verdict and rules
  version (§6), two visitors can no longer read the same link differently
  without the page saying so.
- All paths are relative, so the site works at `/augury/` and at any other root.

### CI

`.github/workflows/test.yml`: on push and pull request, on Node 22 LTS —
`node --test` (no path argument), `node scripts/validate.mjs` (content and
licence validation, on the yijing pattern), `node
scripts/check-contrast.mjs`, and `python3 scripts/build-fonts.py --check`
(fonttools installed in CI; locally it runs once, outputs committed). No
runtime dependencies; dev scripts use Node built-ins except font subsetting
(Python) and icon building.

---

## 10. Content (phases 4a–4c)

Phase 4 is the project, and it is planned like one: **4a pilot** — one full
Sortes decade and six passages, timed, with a style guide and a rate
estimate that re-confirms (or, at that gate only, revises) the full-text and
filler-translation decisions; **4b bulk** production in batches, augury and
tripudium texts first so the site can ship before the Sortes if need be;
**4c independent fidelity review** of every line against the pinned scans —
on yijing that separate pass found first 79, then 133 real errors, and we
budget for it finding ours.

- **Passages**: about 30, each with Latin or Greek, English translation(s),
  citation, speaker/date/tier, edition, and per-field licence. Provenance is
  pinned per work in `scripts/provenance.json` to a page scan of the named
  public-domain edition; quotations are transcribed *from the scan*, with
  the Latin Library, Perseus and Wikisource used only to locate and
  cross-check (Wikisource for collation only — its CC BY-SA text never enters
  ours). See SOURCES.
- **About page**: what augury was (*auspicium* and *augurium*; public and
  private; the college of augurs; the lituus; *spectio* — including one
  honest sentence that at Rome the magistrate *took* the auspices and the
  augur advised, so our user is cast as the *auspex* as much as the augur,
  and private auspices are a debated survival); the five genera and our
  two-genera scope; the rite as reconstructed here, rule by rule, tier by
  tier, with what is attested and what we guessed, numbers included; the
  scepticism (Cicero, himself an augur, writing *De Divinatione* against it
  — Quintus and Marcus distinguished; Hector's "one omen is best, to fight
  for one's country", *Il.* 12.243); Claudius Pulcher with the Polybius
  footnote; the Sortes, Hercher's hand in it, and its Christian afterlife;
  magnetic bearings stated as magnetic; sources and licences; and the
  closing line, *For reflection and delight, not advice.*
- **Glosses**: short, plain modern English in our own voice: dry, never winking.

---

## 11. Acceptance checklist (end of phase 5)

- [ ] The full rite works on iOS Safari and Android Chrome with a real compass, and
      on desktop by hand.
- [ ] A watch survives tab death, lock screen and a phone call (resume offered);
      hiding the app > 60 s vitiates honestly, would-be verdict shown.
- [ ] Works offline after first load; installable; updates cleanly (new engine
      within one visit; old share links still show their recorded verdict).
- [ ] `node --test`, validate, contrast check and font `--check` green locally and in CI.
- [ ] No network requests beyond the site's own origin (checked in DevTools).
- [ ] The question never appears in URL, share link, or localStorage (test plus
      manual check); a shared record never shows the viewer's own question.
- [ ] Lighthouse: accessibility ≥ 95, PWA installable, best practices ≥ 95 —
      **and** the manual passes Lighthouse cannot do: VoiceOver and TalkBack
      through the whole rite, focus trap and return on the sign sheet,
      "Announce bearing" by name, and legibility in real sunlight on a real
      phone held at arm's length, looking up.
- [ ] Every rule in §3 is cited with its tier, and every reconstruction —
      weights, factors, probabilities, our verdict wording itself — is
      labelled in the UI; the record shows strengths and F/U totals.
- [ ] Every text has a recorded per-field licence in SOURCES and in the data,
      transcribed from the scan pinned in `scripts/provenance.json`; no
      `verify:` notes remain in this file.

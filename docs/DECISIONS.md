# Decisions on PLAN_REVIEW.md

Decided by the lead (Claude) with the user's answers to the four open questions.

## Open questions (user's answers)
1. Orientation: **Varro (face south) default**; Livy (east) as an alternative, labelled *disputed*.
2. Sortes text: **Hercher 1863, Christian elements kept and explained**, with the M3/M4 corrections.
3. Sortes scope: **full text** — all 92 questions and all 920 reachable answers translated; the 110 filler lines transcribed and translated too if the pilot rate allows (decide at the 4a gate).
4. Licences: **MIT code; CC BY 4.0 our prose/translations; PD texts marked PD** (yijing's LICENSE / LICENSE-content.md pattern, N11).

## Must fix — all accepted
- M1 accept: split "Attested" into evidence tiers (e.g. technical/antiquarian, Cicero's laws, literary/legend, comedy, reconstruction); show tier in UI.
- M2 accept: Livy orientation labelled disputed.
- M3, M4 accept: correct recension descriptions; the table carries the prophets/gods and the mechanism routes through them.
- M5 accept: tests describe the real (imperfect) table; document irregularities instead of asserting perfection.
- M6 accept: **a dire sign cannot be escaped or declined.** Remove the per-sign "beyond the bounds" box; templum bounds are fixed at declaration. Declining applies to oblative, non-dire signs only (cite Pliny NH 28.17, Servius ad Aen. 12.259). Write the precedence as a decision table that the tests mirror.
- M7 accept: share link carries every interpret() input plus a rules version.
- M8, M9, M10, M16 accept: specify the watch sheet fields, pointingVector maths, honest precision (coarse bins), and watch-loop parameters.
- M11, M12, M13 accept: provenance pinned to page scans per yijing's pattern; DGRA-only rules either get a primary citation or are relabelled reconstruction.
- M14: **keep non_pascuntur → NON ADMITTVNT**, and add the sentence distinguishing refusal-to-eat (a positive unfavourable sign in the tripudium; Claudius Pulcher, Cic. ND 2.7, Livy Per. 19) from absence of signs in the sky watch (→ ALIO DIE).
- M15 accept: reword privacy promises as proposed; preview what a link encodes; test that a shared record never shows the viewer's question.
- M17 accept: rule verification happens now, before the engine is frozen (see note below).
- M18 accept: split phase 4 into **4a pilot (+ style guide, rate estimate), 4b bulk in batches, 4c independent fidelity review.** Augury + tripudium texts come first; Sortes may ship as a follow-on release.
- M19 accept: follow yijing's PWA/service worker pattern exactly.
- M20 accept: concrete, testable accessibility acceptance criteria.

## Should consider — all accepted, with these choices
- S1: show each sign's strength and the F/U totals in the record; exact rational arithmetic; fix the hierarchy so one eagle beats an ordinary flock of crows.
- S2: weigh wrong-mode signs at a reduced factor (e.g. ½), labelled reconstruction.
- S3–S9, S11–S15, S17, S19–S22: accept as proposed.
- S10: ask "seen in daylight?" per *bubo*/night-bird sign, defaulting from the clock. No latitude feature for now.
- S16: take the simplest defensible calendrical choice and label it.
- S18: record tripudium attempts in the result and share link; no hidden retries.

## Nitpicks — all accepted (implementer's discretion on wording).

## Note on verification (M17)
The sandbox has no network. Phase 2 verifies rule citations from knowledge and marks anything uncertain `verify:` in PLAN.md; checking against downloaded scans happens in phase 4c, with texts fetched by the lead into `scripts/.cache/sources/`.

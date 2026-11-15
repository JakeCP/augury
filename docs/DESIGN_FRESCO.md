# Phase 6: the fresco redesign

Approved by the user on 2026-11-06. This supersedes the look described in PLAN.md §8
wherever the two disagree. Behaviour, content and routes are unchanged.

## Intent

The app works, but it looks like 1999 and too still: plain parchment and stock
radio buttons. Augury is Roman. The Romans painted their walls and their
statues. We want it beautiful and painted, **not gaudy**. Above all, it must stay
**no less useful**.

The user saw three mockups (black-figure vase, red-figure vase, Pompeian fresco)
and chose **the Pompeian fresco**. The mockup is in
`.superpowers/brainstorm/*/content/vase-borders.html`, card C.

## Decided (by the user)

- **Decoration lives at the edges, like a border.** The reading and working area
  stays calm and legible.
- **Style:** a Pompeian wall. Pompeian red, ochre/gold, a black base band (dado),
  green garlands, and a running wave or meander border.
- **No more stock form controls.** Radio buttons, checkboxes and the plain pill
  buttons give way to painted equivalents.

## Lead's calls (proposed to the user, who said "do it")

1. **Palette:** move the tokens to Pompeian red (about `#8f2a1c`), ochre-gold
   (about `#d9a441`), dado black (about `#1d1410`), garland green (about `#5f6b3a`)
   on the existing warm cream. Keep everything WCAG AA. Update
   `scripts/check-contrast.mjs` for the new pairs, and run it.
2. **Painted bands:**
   - Every page gets a painted frieze at the top, under or merged with the
     header: a wave border, a garland, and a few birds.
   - A dado band sits at the foot of the page.
   - Inner pages get a **slim** version so it costs phone height only
     sparingly. The home page gets the full height.
   - Build the bands from SVG: inline, or as small files in `img/`. Pattern
     fills tile horizontally at any width.
3. **Choice tiles:**
   - Every radio group becomes a set of framed tiles: thin red outline and a
     gold inner rule, as in the mockup. The selected tile fills red with
     cream-gold text.
   - Checkboxes get the same treatment in a smaller form.
   - **Keep the real `<input>` elements**, visually restyled or hidden behind
     their labels, so keyboard use, screen readers, focus rings and the
     existing tests keep working.
   - Tiles must reach 48px touch targets.
   - The small "Reconstruction" badges become small gold-ruled cartouches.
4. **Buttons:** primary buttons are red with a gold rule and Cinzel lettering.
   Secondary buttons are outlined. The theme toggle and other small controls
   match.
5. **Cards and panels** (e.g. the Orientation fieldset, the verdict, the sortes
   answer) read as **framed fresco panels**: a cream field, a thin red border and
   a gold inner rule. Use only light corner rounding, or none. Don't use generic
   rounded boxes.
6. **"A fresco or two":** the home page gets one proper painted panel. It is a
   garden-wall scene of birds among foliage, in the spirit of the garden room
   of Livia's villa at Prima Porta, framed like a Pompeian panel. The templum
   dome may sit inside it or beside it.
   - The tripudium (sacred chickens) view gets one small painted vignette.
   - Restyle the existing bird icons in `img/birds/` only if that can be done
     consistently. Otherwise leave them.
7. **Dark mode:** the room at night, or the dado as the ground. Use near-black and
   dado black, with red and gold accents and cream text. The bands invert
   sensibly. It must still pass contrast.
8. **Art:** hand-built SVG only. No raster images, no AI images, and no
   copying of specific real frescoes. Paint "in the manner of", and keep it
   original. Keep the total added weight small (under about 60 KB of SVG),
   because the app is an offline PWA.
9. **Motion:** at most a gentle one-time fade or draw-in of the bands. Respect
   `prefers-reduced-motion`.

## Non-goals and anti-goals

- **No content, routing or logic changes.** Don't touch `data/`, `js/rules.js`,
  `js/compass.js`, `js/sortes.js` or `js/tripudium.js` logic.
- **Failure, even if it works technically:**
  - Body text sits on red or on patterned backgrounds.
  - Decoration pushes the main action below the fold on a 375×812 phone.
  - The look turns theme-park or gaudy. Gold is a hairline accent, never a fill.
  - Accessibility regresses: focus, contrast or touch targets.

## Left to the builder

The exact motifs and their drawing, the band heights, the tile markup (as long
as it is semantic), the CSS organisation, and whether bands are inline SVG or
files. Add new assets to the service-worker precache and bump its version. Keep
all paths relative.

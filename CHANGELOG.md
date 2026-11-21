# Changelog

Versions are `MAJOR.MINOR.PATCH`:

- **PATCH** — a fix, no surface change.
- **MINOR** — a new primitive or token.
- **MAJOR** — an existing class or token changes meaning.

## 0.3.1 — 21 November 2026

A pass over how this repo is worded, done for the reader that arrives with no
context and reads the files in order: an agent.

**Added**

- `AGENTS.md` — the map. What the repo is in one paragraph, which file holds the
  rule for which task, all nine traps as one table of rule-and-symptom, the
  couplings that must move together (the 980/981px hero breakpoint, the card
  padding token, one stage per scene, the tilt ceilings), the never list, and
  the verify-then-commit loop.
- A short § Writing here, so the voice survives the next hand: claim then
  evidence, one imperative per sentence, name the cost, say what was not taken,
  label the unverified, date every source.

**Changed**

- `README.md` points at `AGENTS.md` in the opening paragraphs and lists it in
  the file table. Nothing in `css/3d.css`, `js/scene.js` or `demo/` changed: this
  release finds the rules, it does not alter them.
- One typo fixed in `docs/3d-web-templates.md`.

**Not ported**

- Nothing. This release is documentation only.

## 0.3.0 — 19 November 2026

Measured documentation of photographs in a 3D page, written while rebuilding a
phone-first static guide that had no images at all and used emoji for its
visual load.

**Added**

- `docs/photographs.md` — the photographic hero for a narrow column (photograph
  at `translateZ(-150px)` with `scale(1.16)` to put back what the camera takes
  away, words flat in front of it), the full-bleed plate between sections, the
  gradient scrim, drawn SVG icons in place of emoji, and a recipe for measuring
  the contrast behind a headline from pixels rather than from a feeling.
- Two traps, both new and both paid for: **P1**, the `width`/`height` attributes
  are presentational hints that beat `aspect-ratio`, so a plate meant to be 360px
  rendered 879px; **P2**, a caption keeps the colour it was designed for and
  loses the surface it was designed against, measured at 2.7:1.
- The `MutationObserver` pattern for re-decorating a button whose label a shared
  script owns, without forking that script.
- A README row and a pointer in the opening paragraph, so the file is findable
  without listing `docs/`.

**Not ported**

- **The photographs.** CC BY and CC BY-SA, and a network request. The template
  promises neither, so the images stay with the project that licensed them.
- **`.t3-plate` and `.t3-scrim` as classes in `css/3d.css`.** A primitive with no
  demo is a claim, not a feature, and this demo cannot load a photograph without
  breaking the no-network promise. The document is the evidence; the classes can
  follow the day the demo gets a local photograph.
- **The source page's copy, prices and section names.** Port test 3.

**Changed**

- Nothing in `css/3d.css`, `js/scene.js` or `demo/`. This release is the record,
  not a new surface.

## 0.2.1 — 18 November 2026

**Added**

- `LICENSE` — MIT. The README had said to add a licence before sharing and then
  shipped none, so "can I use this" had no answer. The CSS, the script, the demo
  and its SVG figures are all covered; nothing in the box is third-party.
- The README's file table and licence section now point at it.

## 0.2.0 — 18 November 2026

Ported from the source project's rebuilt hero: the photo leaves the page, the
scene recedes as you scroll, and cards lean as one piece.

**Added**

- `.t3-hero`, `.t3-split`, `.t3-copy-front`, `.t3-photo`, `.t3-photo-main`,
  `.t3-photo-back`, `.t3-sticker--float` — a hero built from three depths, with
  the main photo bleeding 9% off the right edge.
- `.t3-cards` and `.t3-card-photo` — a photo that bleeds to the card edge.
  No `translateZ` on the photo: in a grid the shared camera is at the centre
  of the grid, so a lifted photo is projected sideways out of its own card.
  Measured at 12px of overhang on the first card. See trap 7.
- `.t3-turn` — a hinged card entrance, hidden only once the script marks the
  document, so a page with no JS still shows its cards.
- `T3.hero()` — pointer tilt plus a scroll recede, capped at 240px.
- `T3.cards()` and `T3.reveal()`; `data-t3-hero`, `data-t3-card` and
  `data-t3-turn` for auto-wiring.
- Thirteen tokens for the layers, the card photo and the hero wash.
- `index.html` — forwards a bare visit to `demo/`.
- Demo rebuilt: layered hero with two drawn figures, three cards with photos.

**Changed**

- `.t3-scene` now sets `perspective-origin` from `--t3-camera`. A scene that does
  not want it keeps the 50%/50% default.
- The guards cover `.t3-split`, `.t3-turn` and the mobile column, not just
  `.t3-stage`.
- `docs/findings.md` went from five traps to seven: the recede sign, and the
  grid camera that projects a lifted card photo out of its own frame. The
  second was found while porting, not on the source page.
- Rule 5 is narrower and honest: reading text stays flat; a short hero column
  may tilt at 4/3 degrees. Rule 6 is new, about clipping the window.

**Not ported**

- The source project's photographs, prices and shop names. The demo draws its
  own figures in SVG.
- The source project's `.hs-` class names and its 1400px perspective. The
  template keeps one `t3-` vocabulary and one camera token.

## 0.1.0 — 17 November 2026

First extraction. Everything here was shipped on a real static page first.

**Added**

- `css/3d.css` — `.t3-scene`, `.t3-stage`, `.t3-pop`, `.t3-sticker`, `.t3-halo`,
  `.t3-card`, `.t3-numbered`, plus the motion, touch, print and contrast guards.
- `js/scene.js` — pointer tilt in ~120 lines, gated on a fine pointer and
  `prefers-reduced-motion`. Auto-wires `[data-t3-tilt]`.
- `demo/` — a working page exercising every primitive, light and dark.
- `docs/findings.md` — the research, the techniques with code, and the five traps.
- `agents/repo-sync.md` — the agent that keeps this repo in step with its source.

**Fixed before release**

- A halo built as a blurred box was 14% wider than its parent and produced a
  19px horizontal scrollbar on a 390px phone. It is a `box-shadow` now.
- A sticker themed with CSS variables became a dark hole inside a light
  illustration in dark mode. Its colours are now literal.
- White on the mid-tone accents measured 3.4–4.4:1. The template documents
  darkening the accent rather than the text.

**Not ported**

- The source project's artwork, prices, section names and prose. Techniques only.

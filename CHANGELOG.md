# Changelog

Versions are `MAJOR.MINOR.PATCH`:

- **PATCH** — a fix, no surface change.
- **MINOR** — a new primitive or token.
- **MAJOR** — an existing class or token changes meaning.

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

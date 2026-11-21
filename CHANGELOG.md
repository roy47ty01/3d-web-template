# Changelog

Versions are `MAJOR.MINOR.PATCH`:

- **PATCH** — a fix, no surface change.
- **MINOR** — a new primitive or token.
- **MAJOR** — an existing class or token changes meaning.

## 0.6.0 — 21 November 2026

The reel's fourth interaction, built; and the first transcript taken of a
source, which corrected a claim this repo had been repeating.

**Added**

- **The touchable surface**, in `css/3d.css`: `.t3-surface-panel`, `-ground`,
  `-sheet`, `-bar`, `-brand`, `-mark`, `-actions`, `-pill`, `-dot`, `-menu`,
  `-figure`, `-note`. A ground, a sheet inset into it, and a subject cut out of
  its background and laid on the sheet, so the silhouette — not a frame — is
  what meets the paper. **No JavaScript**: a real link, a real button, and a 1px
  press. Tokens: `--t3-surface-radius`, `--t3-surface-sheet`,
  `--t3-surface-ink`, `--t3-surface-accent`.
- `demo/index.html`: a sixth band, with a drawn ground and a drawn portrait,
  because this template ships no photographs. On a phone the slab stands up at
  640px and the note card goes; the sheet still crops the figure.
- `docs/transcripts-november-2026.md`: the transcript of the one reel that
  carries an audio track, the method that produced it, and the three reels that
  carry no audio at all.

**Found**

- **The source's chip fails contrast.** White on its turquoise measures 2.21:1,
  which is trap P2 arriving in someone else's product: a colour is only correct
  against the surface it sits on. The template keeps the turquoise and uses
  `#06251f` ink — 7.34:1, measured in Chrome on the rendered chip.
- **Three of the four reels are served without audio.** `yt-dlp -F` lists no
  audio representation for them and each file has one stream, so the claim that
  @kevin.snippet's library names "are spoken" could not be checked and is
  withdrawn. They are not on screen and not in the file this repo can reach.

**Corrected**

- `docs/reel-pass-november-2026.md` § 3 and `docs/sources.md`, on both points
  above. `sources.md` gains a "Heard" status; one row earns it.
- **`README.md` said `scene.js` was 397 lines and `findings.md` held eight
  traps.** The file is 398 lines, and the repo counts ten traps across two
  documents. Both now say the right thing, once.

**Unchanged**

- No dependency, no build step, no network request, no binary asset. The surface
  is CSS, markup and one inline SVG — the transcript's model is a tool used to
  read a source, not something the template ships.

## 0.5.0 — 21 November 2026

The November reel was finally watched, frame by frame, instead of being read.
What it advertises — a rail of objects you browse in depth — is now a primitive,
and the obvious way to build it does not work.

**Added**

- **The room**, in `css/3d.css`: `.t3-room` and its parts. A rail, a row of
  objects, one in focus. Every step away from the selection shrinks the object,
  dims it, and takes the artwork out of focus — scale, opacity and blur, all 2D.
  Guards: no transition on request, a scroll-snapping strip below 980px instead
  of a camera, a plain row in print. Tokens: `--t3-room-shrink`,
  `--t3-room-item-w`, `--t3-room-pad-top`, `--t3-room-ink`, `--t3-room-accent`.
- **`T3.room(container, options)`** in `js/scene.js`, wired through
  `data-t3-room` / `data-t3-room-item`. Click, Tab, Left, Right, Home, End; the
  selection is `aria-current` and follows focus.
- `demo/index.html`: a fifth band, five invented objects, so the primitive is
  used rather than described.
- `docs/reel-pass-november-2026.md` § 1 rewritten: the reel is four labelled
  interactions, and the shop is a flat row with depth of field, not a walkable
  room of planes. That correction is the point of watching it.
- `docs/sources.md`: a "Viewed" status, and the reels marked with it.

**Found**

- **A 3D row cannot be clicked.** The first build put `perspective` on the
  space, `preserve-3d` on the row and `translateZ` on each object. It rendered
  correctly and only the selected object was reachable: `elementFromPoint` at
  the visual centre of four of the five objects returned the row. Two controls
  isolate it — 2D transforms under `preserve-3d` still fail, `transform-style:
  flat` fixes all five — so the depth is depth of field and the row stays flat.
  The measurement is in § 1 of the reel pass, and the reason is in the CSS.

**Unchanged**

- No dependency, no build step, no network request, no new file to copy. The
  room is 200 lines of CSS and 80 of script that were already there.

## 0.4.0 — 21 November 2026

Six links researched in one pass, and the pass found a bug in the demo. As with
0.3.0, a documentation release counts as minor here.

**Added**

- `docs/sources.md` — the register. Every post the research rests on, who made it,
  when, what it was, whether the frames were ever seen, and where the finding
  went. The six links are in it with their tracking parameters stripped, so they
  outlive the chat they arrived in.
- `docs/reel-pass-november-2026.md` — the pass itself: the one technique the
  template does not have (a room you browse, built from flat planes on one
  camera, no WebGL), the four libraries the most-liked post recommends and why
  each is refused, and the four funnels. It also corrects two things that were
  true in 2024 and are not true now: GSAP is free for commercial use, and React
  Bits is "MIT + Commons Clause", not MIT.
- `--t3-copy-inset`, and trap 8 in `docs/findings.md` to explain the number.
- `README.md`: `.t3-js` and `.t3-dark` documented, which they were not.

**Fixed**

- **Trap 8, the hero copy projected off the page.** The copy column rides 90px
  forward on a camera whose origin is at 62%, so it is projected 5.5% of the
  scene to the left. Wide gutters absorbed it; a 20px gutter did not. Measured:
  the column started at -31.2px at 981, -33.5px at 1024 and -37.7px at 1100, so
  the first ~33px of every hero line was clipped. Nothing reported it, because
  `.t3-hero` clips the bleed on the right and the copy on the left with one rule,
  so `scrollWidth` still equalled `clientWidth`. `--t3-copy-inset` is the
  projection cancelled (5.1%). After: the text starts 0.3px inside the scene's
  left edge at 981, 1024, 1100, 1280, 1440 and 1920.
- A stale comment in `js/scene.js` that called the card ceiling four degrees on
  both axes. It is three on x, four on y.
- `README.md`: `scene.js` is 280 lines, not ~290.

**Not ported**

- **The room.** No demo, and no frames were watched for this pass, so it is a
  specification in a document rather than a class in the stylesheet.
- **Lenis, GSAP, Vanta and React Bits.** Four dependencies, recommended together
  by a post with 7.7K likes. It is a good list and the wrong list for a page that
  has to open from a memory stick.

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

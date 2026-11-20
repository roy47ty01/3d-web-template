# The floating-window pass

Notes on the one 3D-website reel that did the rounds, and the three cheap moves
copied from it. Read `findings.md` first for the rest of the scene.

Source: Himanshu Hingorani (`himanshubuilds`), Instagram carousel, 4 November
2026, <https://www.instagram.com/p/DfU1oermXvT/>.

## What the reel actually is

A promo for scrolldtide.co, a gallery of generated landing pages. Four steps are
shown: pick a site, copy its prompt, paste the prompt into Claude, Lovable,
Cursor or ChatGPT, then swap the brand and ship. The pages on screen are built
by AI, not by hand, and they look expensive for three reasons: a dark room,
floating browser windows at a slight angle, and colour glow spilling from
underneath them.

## What is worth copying

None of it needs WebGL, three.js or a shader.

1. **Window chrome.** Three dots on a 30px bar laid over the hero photo. One
   pseudo-element, and a photograph reads as a window instead of a print.
2. **Glass sheen.** One diagonal gradient, about 26% white, with
   `mix-blend-mode: screen`. It is the detail that sells the glass; without it
   the pane is flat.
3. **A lit floor.** Two wide radial gradients under the scene, warm where the
   light falls and tomato where it bounces back.

The fourth thing the reel shows, layers at different depths, is already here:
the hero puts words at 90px, the back photo at 130px and the sticker at 190px on
one camera. The pass only adds surface detail on top of that.

## What is deliberately not taken

The premise. A prompt that generates a page also generates its weight, its
contrast and its accessibility bugs, and this template is hand-written for
people who need to read it. The pass is decoration only:

- removed below 980px, where the photo becomes a plain block;
- removed in print;
- removed in simple mode;
- no new request, no new file, no JavaScript;
- every word stays where it was, so the reading does not move.

## Order of the two pseudo-elements

The figure has to be a positioned box. Then:

- `::before` is the chrome bar, `inset: 0 0 auto 0`, `height: 30px`,
  `z-index: 2` so it sits above the photo;
- `::after` is the sheen, `inset: 33px 0 0 0` so it starts under the bar,
  `z-index: 1`, `pointer-events: none`.

The dots are three `radial-gradient` circles with hard stops; the bar itself is
`var(--paper)`. Nothing here needs an image, so the whole effect costs one rule
pair and survives a slow connection.

## Verified

On the source project: the chrome renders at 30px on a 1280px screen, the sheen
is invisible at 320px because both pseudo-elements are switched off, and
`tools/check-site.sh` still passes with no new requests in the network panel.

## What replaced it

Step 1 and 2 above were removed when the hero photograph was replaced by a
cut-out object: a chain with a price tag on a transparent background, floating
in the hero's own light. Chrome and sheen only read as a window when there is a
pane for them to sit on, and a photographed scene was the wrong shape for this
page anyway. What survived is the part that does the 3D work: the lit floor, the
object's own drift and turn, and a soft pool of shadow under it.

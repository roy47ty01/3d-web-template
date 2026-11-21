# The twenty prompts, as templates that stack

A prompt pack arrived on 21 November 2026 as a screenshot: "top 20 high impact
prompts for 3d web design", grouped into four themes — hero sections and scroll
transitions, full landing pages, shadows and micro-interactions, 3D assets and
typography. **Read, not viewed**: it is an image of a caption, not a page, so
the wording below is what the screenshot carries.

Two titles were legible only in part at that resolution and are marked
`(title unclear)`. They are described by what the prompt asks for rather than by
a name this repo cannot read.

## The pack assumes a stack this repo refuses

Every one of the twenty is written for WebGL, a motion library, or a component
framework. That is not a detail of the wording; it is the whole of most of them.
"An interactive WebGL orb", "liquid-metal shader hero", "cursor-responsive
shader cards" are instructions to render with a GPU and a library.

This repo does not. No dependency, no build step, no network request, no binary
asset. So each prompt is re-read as **CSS, markup and SVG**, and the interesting
part of the exercise is that the re-reading collapses twenty prompts into about
eight ideas. "Orbital WebGL Studio Hero" and "Liquid Metal & Chrome Accent" are
the same primitive seen from two angles: a light that moves. "Cursor-Responsive
Shader Cards" is `.t3-card` with one more pointer term.

That collapse is the finding. A prompt pack looks like twenty features and is
usually eight, repeated with different nouns.

## The composition contract

These are templates in the sense this repo uses the word: a block of markup plus
the classes from `css/3d.css` that make it work. Any of them can sit on a page
with any other, in any order, because they obey five rules:

1. **One `.t3-tpl` block per template.** It owns its own padding and its own
   background; it never styles `body`, `h2` or a sibling.
2. **A page is a sequence of blocks** inside one `<main class="t3-numbered">`.
   Numbering is a counter over `section[id]`, so a block added or removed
   renumbers the page without an edit.
3. **Shared tokens, never shared layout.** Colour, radius and ink come from the
   page's custom properties. Two blocks may look different and still be one
   family.
4. **One camera per block.** A block may contain one `.t3-scene`; two camera
   blocks never nest, because `perspective` on an ancestor picks up the inner
   one's children as well.
5. **Guards are per block and not optional.** Reduced motion, print and a coarse
   pointer are handled inside the block, so a page can mix a scrub with a still
   without either knowing about the other.

The last rule is what makes stacking safe: a page built from eight of these does
not need eight sets of author instructions.

## The twenty

| # | The prompt | This repo's CSS-only reading | Composes from | New piece |
|---|---|---|---|---|
| 1 | Orbital WebGL Studio Hero | A lit disc that follows the pointer, drawn as two radial gradients under a masked grain; the words sit in front of it | `.t3-scene`, `.t3-halo`, `T3.tilt` | `.t3-orb` (gradient stack, `--t3-orb-x/y`) |
| 2 | Dark Seal Liquid Glass Hero | A translucent panel with a 1px inner highlight and a soft refraction edge; depth-of-field type is a blurred duplicate layer, never real defocus | `.t3-hero`, `.t3-surface-pill` | `.t3-glass` (backdrop-free: graded fill, not `backdrop-filter`) |
| 3 | Scroll-Pinned WebGL Ribbon | A 2px rail whose dash offset is written per frame from scroll progress | the room's rail, `T3.wipe`'s scrub | `.t3-ribbon` + `T3.ribbon` |
| 4 | Scene-Switching Scroll Page | The wipe, already shipped: one screen leaves in a streak, the next resolves | `.t3-wipe`, `T3.wipe` | **built** (0.7.0) |
| 5 | Zoom-Into-3D Model Transition | A card whose `scale` and `z` are scrubbed until it fills the window, then a cross-dissolve to the next block | `.t3-card`, `T3.wipe`'s progress | `.t3-zoom` |
| 6 | Animated Aurora & Depth Hero | Three stacked gradients at different blurs, each translating at its own rate: depth as parallax, no shader | `.t3-hero`, `.t3-photo-back` | `.t3-aurora` |
| 7 | Reflective Automotive Detailing Site | A finish is a gradient plus one specular streak; "reflective" is a mirrored gradient under the object, not an environment map | `.t3-surface-panel` | `.t3-specular` |
| 8 | Electric Vehicle Cinematic Landing | Full-bleed ground, one object at `bottom: 0` cropped by the frame, copy pinned to the lower third | `.t3-surface-*` | reuse only |
| 9 | Page Architectural Portfolio | A grid where one cell is 2× and bleeds to the page edge; the bleed is the depth | `.t3-cards` | `.t3-grid-bleed` |
| 10 | Glassmorphism Delivery Landing | A card on a blurred photograph. The blur is baked into the SVG, because a live `backdrop-filter` makes its element a containing block (trap 4) | `.t3-card` | `.t3-glass` again |
| 11 | Strength Training & Coaching 3D Site | A training block is a grid of plates; a plate is a gradient and a shadow, and the lift is the interaction | `.t3-card`, `.t3-halo` | reuse only |
| 12 | 3D Motion Studio Showcase | Two reels side by side at different scroll rates; the pairing is the effect | `.t3-hero`, `T3.hero` | `.t3-pair` |
| 13 | Cursor-Responsive Shader Cards | `.t3-card`'s tilt with a pointer-tracked highlight: two gradients moved by `--mx/--my` | `.t3-card`, `T3.cards` | `.t3-card--lit` |
| 14 | Liquid Glass Button Card System | A chip with a graded fill, a 1px highlight and a 1px press. Already the surface's chip, generalised | `.t3-surface-pill` | `.t3-glass-btn` |
| 15 | Exploded View Product Assembly | Parts on a shared centre, each translating outward along its own vector as the block scrolls; the vector is a per-part token | `.t3-pop`, `T3.wipe`'s progress | `.t3-explode` + `T3.explode` |
| 16 | Liquid Metal & Chrome Accent | A single accent element whose gradient angle is written from scroll or pointer position. The "chrome" is two stops and one highlight | `.t3-sticker` | `.t3-chrome` |
| 17 | Interactive Wires or Metallic Background | A drawn SVG mesh, one line weight, dots at the nodes; movement is a slow translate of the whole field, never a distorted wire | none | `.t3-mesh` (inline SVG, no script) |
| 18 | 3D Clay Icon Set | Icons drawn with two tones and one soft shadow, so they read as extruded without a camera | `.t3-surface-note` icons | `.t3-clay` |
| 19 | Inflatable 3D Campaign | Type given a 2px light rim and a soft shadow underneath; inflation is the rim, not a bevel | `.t3-wipe-title` | `.t3-inflate` |
| 20 | Production-Ready 3D Web Spec | Not a page: a checklist. It is `AGENTS.md` § Verify, then commit, and the browser-support table in `README.md` | — | **documented** |

Six of the twenty are already this repo's primitives, stated in different words.
Four more are one new class each on an existing one. The remaining ones need a
genuinely new piece, and each of those is a script that writes one custom
property — the same shape as `T3.wipe`.

## What stacking costs

Three things go wrong when these are combined, and all three were paid for
already:

- **Two scrubs on one page fight for the scroll.** Each writes its own property,
  so they cannot collide by name; they collide by attention. Two scrubbed
  transitions in a row read as one long smear with no resting place between.
  Put a still block between them.
- **A pinned block needs scroll to spend.** A scrub finishes over its own travel,
  so a block placed last on the page may never reach 1.0 — the wipe did exactly
  this at 0.7.0 and had to move. Check the last 100px of the page.
- **Bleed and clip disagree about the window.** A block that bleeds off the edge
  needs `overflow: hidden` on itself; a block with a camera needs
  `overflow: visible` inside it. The two cannot be the same element (trap 3).

## What is not built

Seventeen of the twenty. A primitive with no demo is a claim, not a feature:
this file is the specification, and the table's last column says which of them
are real. The next one to build is #1, because #2, #10 and #14 all want its
light.

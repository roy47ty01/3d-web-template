# The twenty prompts, as templates that stack

The pack: "top 20 high impact prompts for 3d web design", grouped into four
themes — hero sections and scroll transitions, full landing pages, shaders and
micro-interactions, 3D assets and typography. **Read** in full on 21 November
2026: it arrived first as a screenshot, then as the copied page, and the copy is
the version quoted here.

The screenshot was not good enough to work from, and that is worth recording. It
turned "Dark SaaS Liquid Glass Hero" into "Dark Seal", "Interactive Waves or
Metaballs" into "Wires", and "2-Page Architectural Portfolio" into "Page
Architectural". Three names, three different templates — a transcription of an
image is a guess wearing a source's clothes until the text arrives.

## The pack assumes a stack this repo refuses

Most of the twenty are written for WebGL, a motion library or a component
framework: "a patterned WebGL sphere", "a scroll-pinned 3D WebGL ribbon",
"a custom shader effect", "using React Three Fiber and Three.js". That is not a
detail of the wording; it is the whole of them.

This repo has no dependency, no build step, no network request and no binary
asset. So each prompt is re-read as **CSS, markup and SVG**, and the interesting
part is what the re-reading does to the list: twenty prompts become about eight
ideas. "Orbital WebGL Studio Hero" and "Liquid Metal & Chrome Accent" are the
same primitive from two angles — a light that moves. "Cursor-Responsive Shader
Cards" is `.t3-card` with one more pointer term. "Liquid Glass Button & Card
System" is the surface's chip, generalised.

A prompt pack looks like twenty features. It is usually eight, repeated with
different nouns.

## The composition contract

A template here is a block of markup plus the `css/3d.css` classes that make it
work. Any of them can sit on a page with any other, in any order, because they
obey five rules:

1. **One `.t3-tpl` block per template.** It owns its own padding and background;
   it never styles `body`, `h2` or a sibling.
2. **A page is a sequence of blocks** inside one `<main class="t3-numbered">`.
   Numbering is a counter over `section[id]`, so adding or removing a block
   renumbers the page with no edit.
3. **Shared tokens, never shared layout.** Colour, radius and ink come from the
   page's custom properties. Two blocks can look different and stay one family.
4. **One camera per block.** A block may contain one `.t3-scene`; two camera
   blocks never nest, because `perspective` on an ancestor reaches the inner
   block's children too.
5. **Guards per block, not optional.** Reduced motion, print and a coarse pointer
   are handled inside the block, so a page can put a scrub next to a still
   without either knowing about the other.

The fifth rule is what makes stacking safe: eight blocks do not need eight sets
of author instructions.

## The twenty

| # | The prompt | This repo's CSS-only reading | Composes from | New piece |
|---|---|---|---|---|
| 1 | Orbital WebGL Studio Hero | A patterned sphere with a warm orbital glow that follows the pointer, then five ordinary sections below it. The "WebGL" is two radial gradients and a masked grain | `.t3-scene`, `.t3-halo`, `T3.tilt` | `.t3-orb` (gradient stack, `--t3-orb-x/y`) |
| 2 | Dark SaaS Liquid Glass Hero | A frosted panel built from a graded fill and a 1px inner highlight. Not `backdrop-filter`: that makes its element a containing block (trap 4). "Depth blur" is a blurred duplicate layer | `.t3-hero`, `.t3-surface-pill` | `.t3-glass` |
| 3 | Scroll-Pinned WebGL Ribbon Hero | A pinned block (sticky, tall) with a drawn ribbon whose dash offset and gradient angle are scrubbed by scroll. The twist is a path that changes, not a mesh that deforms | `.t3-hero`, `T3.wipe`'s scrub | `.t3-ribbon` + `T3.ribbon` |
| 4 | Scene-Switching Scroll Page | The wipe, shipped: one screen leaves in a streak, the next resolves. The prompt's "fixed viewport, typography scattering upward" is the same primitive twice, in opposite directions | `.t3-wipe`, `T3.wipe` | **built** (0.7.0) |
| 5 | Zoom-Into-3D-Model Transition | A framed object whose scale is scrubbed until it fills the window, then a cut to the next block. A planet is a radial gradient with a terminator | `.t3-photo`, `T3.wipe`'s progress | `.t3-zoom` |
| 6 | Animated Aurora & Depth Hero | Three gradient bands at different blurs, each translating at its own rate: depth as parallax, no shader. The scroll-reactive nav is a threshold on the same scrape | `.t3-hero`, `.t3-photo-back` | `.t3-aurora` |
| 7 | Reflective Automotive Detailing Site | A finish is a gradient plus one specular streak; "reflective" is a mirrored gradient, not an environment map. Swatches are buttons that swap a token | `.t3-surface-panel`, `.t3-surface-pill` | `.t3-specular` |
| 8 | Electric Vehicle Cinematic Landing Page | Full-bleed ground, one object at `bottom: 0` cropped by the frame, telemetry as a small tabular row. "Camera orbit" is the block's own parallax | `.t3-surface-*` | reuse only |
| 9 | 2-Page Architectural Portfolio | Two blocks, one visible at a time, swapped by a hash or a button: "smooth page transitions" is the wipe at a shorter travel. Depth-layered cards are the card grid with per-card lift | `.t3-cards`, `.t3-wipe` | `.t3-pair-pages` |
| 10 | Glassmorphism Delivery Landing Page | Frosted cards over a drawn backdrop, with the blur painted into the SVG rather than computed live | `.t3-card` | `.t3-glass` again |
| 11 | Strength Training & Coaching 3D Site | A programme tier is a plate: gradient, shadow, one lift on hover. Black and gold is two tokens, not a theme | `.t3-card`, `.t3-halo` | reuse only |
| 12 | 3D Motion Studio Showcase | Two showreel cards at different scroll rates; the pairing is the effect. Case studies are the numbered sections | `.t3-hero`, `T3.hero` | `.t3-pair` |
| 13 | Cursor-Responsive Shader Cards | `.t3-card`'s tilt plus a pointer-tracked highlight: two gradients moved by `--mx / --my`. No lag to lose, because one frame carries both | `.t3-card`, `T3.cards` | `.t3-card--lit` |
| 14 | Liquid Glass Button & Card System | A chip with a graded fill, a 1px refraction border, a 1px press, and its own reduced-motion branch. The surface's chip, promoted | `.t3-surface-pill` | `.t3-glass-btn` |
| 15 | Exploded View Product Assembly | Parts on a shared centre, each translating outward along its own vector as the block scrolls. The vector is a per-part token; the toggle is the same property set to 1 | `.t3-pop`, `T3.wipe`'s progress | `.t3-explode` + `T3.explode` |
| 16 | Liquid Metal & Chrome Accent | One accent element whose gradient angle is written from scroll or pointer. Chrome is two stops and a highlight, not a material | `.t3-sticker` | `.t3-chrome` |
| 17 | Interactive Waves or Metaballs Background | A metaball field cannot merge in CSS. The honest version is a banded wave field: stacked gradients translated by pointer, capped in amplitude, behind an opaque scrim so the pricing text keeps its contrast | none | `.t3-waves` |
| 18 | 3D Clay Icon Set | Icons drawn in two tones with one soft shadow, so they read as extruded without a camera. Cart, calendar, envelope, sparkles: four paths | `.t3-surface-note` icons | `.t3-clay` |
| 19 | Inflatable 3D Campaign Headline | Type with a 2px light rim and a soft shadow underneath. Inflation is the rim, not a bevel | `.t3-wipe-title` | `.t3-inflate` |
| 20 | Production-Ready 3D Web Spec Prompt | Not a page: a checklist, and it asks for React Three Fiber. Its five requirements — user goals, scroll/camera motion, touch fallbacks, lazy assets, a 60fps budget — are `AGENTS.md` § Verify, then commit, minus the two this repo refuses | — | **documented** |

Six of the twenty are already primitives here, under other nouns. Four more are
one class on an existing one. The rest need a script that writes one custom
property — the same shape as `T3.wipe`.

## What stacking costs

Three things go wrong when these are combined, and all three have been paid for:

- **Two scrubs on one page fight for attention.** They cannot collide by name —
  each writes its own property — but two scrubbed blocks in a row read as one
  long smear with no resting place. Put a still block between them.
- **A scrubbed or pinned block needs scroll to spend.** #3 is the dangerous one:
  a sticky block consumes page height and a scrub needs travel after it. The wipe
  was placed last but one at 0.7.0 and never reached 1.0. Check the last 100px.
- **Bleed and clip disagree about the window.** A block that bleeds needs
  `overflow: hidden` on itself; a block with a camera needs `overflow: visible`
  inside it. They cannot be the same element (trap 3).

## What is not built

Eighteen of the twenty. One is shipped (#4, the wipe) and one is a checklist
that already exists (#20). The table's last column is the honest state of the
rest: the specification is here, the classes are not.

Build order, by dependency rather than by number: #1 first, because #2, #10, #14
and #16 all want its light; then #13, which is one class on `.t3-card`; then #9
and #4's second direction, which share the wipe. #3 and #15 last, because both
need the pinning decision that no other block needs.

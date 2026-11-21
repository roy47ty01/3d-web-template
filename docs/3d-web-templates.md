# Prompt-first 3D template libraries

A deep dive on the site behind the November 2026 reel, and the checklist its
public build-prompt excerpt hands you for free.

Source: <https://www.scrolltide.co/why-scrolltide> and
<https://www.scrolltide.co/academy> (read 19 November 2026). The reel spelled it
`scrolldtide.co`; the domain is `scrolltide.co`. Nothing here is copied from a
paid template, and no template was bought to write this.

## What the product actually is

A library of 151 finished directions. Each one is a recorded build plus a build
prompt of roughly 12,000 characters that carries every decision into the model:
grid and measure, type scale, tracking at display size, colour ratios, section
order, easing curve, stagger timing, scroll triggers, hover behaviour, depth and
grain, breakpoints, focus states, reduced-motion fallbacks, image loading, copy
tone, and what not to do.

The stack it assumes is not CSS-only. Its own marquee lists React, Vite,
Next.js, Tailwind, Framer Motion, GSAP, Three.js, WebGL, shaders and Lenis. That
matters: most of what looks expensive there is JavaScript scroll orchestration
or a shader, not a `transform`.

## Four technique families, cheapest first

1. **Layer depth.** Three flat images (background, door, clouds) moved at
   different rates. Their portal lesson says outright that there is no 3D engine
   involved and that the depth comes from the layering. Cost: three images and a
   transform each. This is the only family a dependency-free page should use.
2. **Scroll-scrubbed frames.** A character sequence swapped against the
   scrollbar (300 stills in their example). Looks like video, is not video. Cost:
   three hundred images, megabytes, and a decode budget.
3. **Cursor physics.** A text curtain that reacts to the pointer, with springs
   and collisions. Cost: a physics loop on the main thread plus a motion budget.
4. **Procedural geometry and shaders.** Every lens and screw written in code and
   lit by custom shaders, coming apart as you scroll. Cost: WebGL, a fallback for
   every device without it, and no text selection inside the scene.

## The checklist their own excerpt gives away

The public page prints a slice of one build prompt. Read as an audit list, it is
better than most design-system docs:

- One accent, on no more than four elements per viewport.
- No gradient text, no purple, no glass panels.
- One easing curve site-wide; entry `y: 16px -> 0` over 750ms, 60ms stagger.
- Parallax runs on scroll progress, never on a timer.
- Transform and opacity only. Never animate `width`, `height` or `box-shadow`.
- Every animation gated behind `prefers-reduced-motion`.
- A headline must animate `transform`, never `opacity`: an initial opacity of 0
  ships the LCP element invisible.
- Hover moves `translateY(-4px)` over 500ms; nothing scales.
- Cards: 24px radius, hairline border, no drop shadow; preview video
  `preload="none"`, played by an IntersectionObserver with a 200px margin.
- Visible focus ring on every interactive element, 2px offset.
- Contrast floor 4.5:1 for body, 3:1 for display sizes.

## What this template takes from it

- The layer-depth family, which is what `.t3-hero` already is: one camera, three
  depths, no library.
- The discipline items: transform-only motion, a reduced-motion gate, a visible
  focus ring, a measure cap, and a single hover lift of 4px.
- The idea of a written spec as the deliverable. `findings.md` and this file are
  the same move in plain markdown.

## What it rejects, and why

- **GSAP, Lenis, Framer Motion.** A smooth-scroll hijack is the single worst
  thing you can do to a page meant to be read on a phone with reduced motion.
- **Shaders and procedural geometry.** No fallback path, no text selection, and
  a GPU bill for a decoration.
- **Scroll-scrubbed frames.** Three hundred images is a download, not an effect.
- **A generated page.** The prompt is excellent; the output still has to survive
  a contrast check, a keyboard, and 320px.

## The one rule worth stealing outright

Never animate a headline's opacity in from zero. It is the difference between a
page that appears to load fast and a page whose main heading is technically
invisible when the browser measures it.

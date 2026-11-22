# The twenty, one at a time

Every template in `docs/prompt-templates.md` also has to work **alone**. That file
is about stacking; this one is the opposite question: what does it take to use
number 7 and nothing else, on a page that is not this demo.

The rule the whole file rests on: **a template is never written against another
template.** It reads no sibling, styles no ancestor, and needs no section before
or after it. If you want one of these on its own, the "Needs" line is the whole
dependency list, and the "Alone on a page" line is the whole arrangement.

Two honest labels appear throughout. **Built** means a class in `css/3d.css` with
a band in the demo, so the numbers in `README.md` cover it. **Spec** means the
design is settled here and the class does not exist yet — you would be building
it, not copying it.

The asks are paraphrased. The pack's own wording is not reproduced: it belongs to
whoever wrote it, and a list of dependencies does not need it.

## Hero sections and scroll transitions

### 1. Orbital WebGL Studio Hero — built (0.8.0)

**Asks for:** a patterned sphere with a warm glow that follows the pointer, above
a studio page of services, a timeline, work, an FAQ and a form.

**Alone on a page:** one band, a full-bleed dark room, the disc centred. The five
sections below it are ordinary markup and belong to your page, not to this.

**Needs:** `.t3-orb`, one `[data-t3-orb-space]` wrapper, `T3.orb` (or
`data-t3-orb`).

**Guards, inside the block:** reduced motion and coarse pointers never bind the
light, so the disc is lit from one place; print drops the halo and keeps the
gradient.

**Coupling:** none. The wrapper exists so the pointer area can be wider than the
disc; nothing else is consulted.

### 2. Dark SaaS Liquid Glass Hero — spec

**Asks for:** a dark hero where a frosted panel floats over a blurred product
shot, with a headline, two buttons and a logo row.

**Alone on a page:** one hero band, the panel inside it, the logo row under it.

**Needs:** `.t3-glass` on one panel; a `.t3-photo` or any image behind it.

**Guards, inside the block:** the glass is a graded fill plus a 1px inner
highlight, **not** `backdrop-filter` — that would make the panel a containing
block for any fixed child (trap 4). Reduced motion changes nothing, because
nothing moves.

**Coupling:** none, but see #17: glass wants something visible behind it, and a
wave field wants an opaque scrim. They do not share a hero.

### 3. Scroll-Pinned WebGL Ribbon Hero — spec

**Asks for:** a tall pinned hero where a 3D ribbon twists and its gradient sweeps
as you scroll, with the headline held in place.

**Alone on a page:** the band is `min-height: 220vh` with a `sticky` inner stage
at `top: 0`; everything after the band is yours.

**Needs:** `.t3-ribbon` (an SVG path with `pathLength="1"`), `T3.ribbon`.

**Guards, inside the block:** under reduced motion the band collapses to its own
height — pinning is motion, and a pin with nothing to scrub is a page that does
not move for two screens. Coarse pointers get the same. Print shows the path at
one fixed dash offset.

**Coupling:** the band consumes height on purpose. That is why #5 cannot follow
it, and why it is the last template to build.

### 4. Scene-Switching Scroll Page — built (0.7.0)

**Asks for:** a fixed viewport where one scene leaves and the next arrives as you
scroll, with type scattering.

**Alone on a page:** the band needs roughly one and a half viewports of travel
*after* it if it sits at the foot of the page. Put it earlier, or add a spacer.

**Needs:** `.t3-wipe` with two `.t3-wipe-screen`s, `T3.wipe`.

**Guards, inside the block:** without `.t3-wipe-live` — no script, or reduced
motion — the two screens print as stacked ordinary panels with no blur at all.
Half a wipe never leaves a blurred page. Print hides the flash.

**Coupling:** none, but two of these in a row read as one smear. Still block
between.

### 5. Zoom-Into-3D-Model Transition — spec

**Asks for:** the camera pushing into a 3D object until it fills the frame, then
a cut.

**Alone on a page:** one band with a framed object; the block after it is the
"cut".

**Needs:** `.t3-zoom` on the frame, `T3.wipe`'s progress reader (the scrub is the
same one, with a scale instead of a blur).

**Guards, inside the block:** reduced motion shows the object at rest and the
next block immediately — the zoom is the transition, so there is nothing to
soften, only something to skip.

**Coupling:** a sticky block before it (#3) leaves it no travel. One pinned thing
per page.

### 6. Animated Aurora & Depth Hero — spec

**Asks for:** layered aurora bands drifting at different depths behind a
headline, with the nav reacting to scroll.

**Alone on a page:** one band, three `.t3-aurora` layers at different blurs,
headline on top.

**Needs:** `.t3-aurora`; nothing else.

**Guards, inside the block:** reduced motion stops the drift and leaves the
colour; print flattens the layers into one gradient, because three blurs on
paper are three grey smudges.

**Coupling:** contains one `.t3-scene` if you want depth, and no block contains
two.

### 7. Reflective Automotive Detailing Site — spec

**Asks for:** a polished finish you can read as reflective, with a swatch row
that changes the car's colour.

**Alone on a page:** a band per finish, the swatch row as buttons.

**Needs:** `.t3-specular` on the panel; the swatches write one custom property.

**Guards, inside the block:** the reflection is a gradient plus one streak, so
there is nothing to disable under reduced motion; the swatch press is a 1px
transform, which reduced motion drops.

**Coupling:** the swatch row is local to its band. Two bands do not share a
selected colour unless you make them.

### 8. Electric Vehicle Cinematic Landing Page — spec, reuse only

**Asks for:** a full-bleed vehicle at the bottom of the frame, telemetry in small
type, a camera that drifts.

**Alone on a page:** one tall band, the object cropped by the frame.

**Needs:** `.t3-surface-*` as they exist; no new class.

**Guards, inside the block:** the drift is a parallax on scroll, so reduced motion
holds it still; print keeps the object and drops the telemetry's background.

**Coupling:** none. This is the cheapest of the twenty precisely because it adds
nothing.

### 9. 2-Page Architectural Portfolio — spec

**Asks for:** exactly two pages, swapped with a smooth transition, with cards at
different depths.

**Alone on a page:** two blocks, one `.t3-pair-pages` wrapper, a hash or two
buttons to swap.

**Needs:** `.t3-pair-pages`, `.t3-cards`, and `T3.wipe` if the swap is a streak.

**Guards, inside the block:** without a hash the second page is reachable by the
button, so no reader is stranded; reduced motion makes the swap instant.

**Coupling:** do not pair with #4 on the same page. Two things that swap screens
make navigation and transition indistinguishable.

### 10. Glassmorphism Delivery Landing Page — spec, shares #2

**Asks for:** frosted cards over an illustrated city, a front-door form, a
timeline of the delivery.

**Alone on a page:** cards in a grid, backdrop behind, form in the last band.

**Needs:** `.t3-glass` again — same class as #2, one implementation.

**Guards, inside the block:** the blur behind the cards is painted into the SVG,
not computed live, so a slow phone gets the same picture.

**Coupling:** none.

## Full landing pages

### 11. Strength Training & Coaching 3D Site — spec, reuse only

**Asks for:** programme tiers as heavy 3D plates, black and gold, a coach's
photo, a booking button.

**Alone on a page:** three plates in a row, the photo band, the button.

**Needs:** `.t3-card` and `.t3-halo`; the gold is one token.

**Guards, inside the block:** the plate lifts on hover only where there is hover;
the reduced-motion version presses instead.

**Coupling:** none. "Black and gold" is two custom properties, so the same cards
work on a light page.

### 12. 3D Motion Studio Showcase — spec

**Asks for:** two showreel cards moving at different rates, then case studies.

**Alone on a page:** one band with the pair, then ordinary numbered sections.

**Needs:** `.t3-pair` on the wrapper, `T3.hero`'s parallax on each card.

**Guards, inside the block:** reduced motion puts both cards at the same rate —
zero — and the band still reads as a pair because the sizes differ.

**Coupling:** the pairing is the effect, so this one is meaningful alone but not
partial. One card is just a card.

### 13. Cursor-Responsive Shader Cards — spec, one class on `.t3-card`

**Asks for:** cards whose surface reacts to the pointer with a moving light.

**Alone on a page:** any grid of cards; this is the most reusable of the twenty.

**Needs:** `.t3-card` plus `.t3-card--lit`, and `T3.cards` extended with a
pointer write of `--mx / --my`.

**Guards, inside the block:** a coarse pointer gets the lit gradient frozen at
its default, which is a lit card, not a broken one.

**Coupling:** do not put this on an element another template already animates
(#15). Two writers of one property is one of them losing.

### 14. Liquid Glass Button & Card System — spec, one class on the chip

**Asks for:** a small system — a glass button, a glass card, pressed and disabled
states — with depth and refraction.

**Alone on a page:** anything. This is a component, not a section.

**Needs:** `.t3-glass-btn` and `.t3-glass`; the refraction is a 1px border, not a
filter.

**Guards, inside the block:** the press is a 1px translate that reduced motion
removes; disabled is a real `disabled` attribute, not a colour.

**Coupling:** none, which is why it is the second template to build.

### 15. Exploded View Product Assembly — spec

**Asks for:** a product's parts flying apart as you scroll, then reassembling.

**Alone on a page:** one tall band, parts on a shared centre, each with its own
travel vector.

**Needs:** `.t3-explode` with a per-part `--t3-part-x/y/z`, `T3.explode`.

**Guards, inside the block:** reduced motion shows the assembled product and a
static caption naming the parts — the information survives without the motion.

**Coupling:** last of the twenty, because it wants the same pinning decision as
#3 and a page gets one pinned block.

## Shaders and micro-interactions

### 16. Liquid Metal & Chrome Accent — spec

**Asks for:** a chrome accent — a badge, a number, a word — that looks poured.

**Alone on a page:** inline, wherever the accent goes. No band needed.

**Needs:** `.t3-chrome`; the sweep angle is one property.

**Guards, inside the block:** the sweep is the only motion, so reduced motion
stops it at a pleasing angle and nothing else changes.

**Coupling:** none. It is the smallest of the twenty.

### 17. Interactive Waves or Metaballs Background — spec

**Asks for:** a background of blobs that follow the pointer and merge with each
other, "without hurting text readability".

**Alone on a page:** one band, waves behind, content on an opaque scrim in front.

**Needs:** `.t3-waves`; two or three stacked gradients translated by the pointer,
amplitude capped.

**Guards, inside the block:** reduced motion freezes the field; the scrim stays
opaque in every state, because the last clause of the ask is the one that
matters.

**Coupling:** incompatible with #2 and #10 — glass needs a visible backdrop, the
scrim needs to hide it. And note what is *not* built: CSS cannot merge two soft
shapes into one, so this is a wave field. If you need actual metaballs, that is a
shader and this repo is the wrong tool.

### 18. 3D Clay Icon Set — spec

**Asks for:** icons that look moulded — cart, calendar, envelope, sparkles.

**Alone on a page:** anywhere an icon goes, including inside another template's
band.

**Needs:** `.t3-clay` on an SVG; two tones and one soft shadow.

**Guards, inside the block:** none needed. Nothing moves, nothing blurs; it
prints as drawn.

**Coupling:** the safest thing here to put inside another block, because it
carries no camera, no scroll and no filter.

### 19. Inflatable 3D Campaign Headline — spec

**Asks for:** a headline that reads as inflated — puffy, soft, pressed into the
page.

**Alone on a page:** a band, or a single heading on any page.

**Needs:** `.t3-inflate`; a 2px light rim and a shadow underneath.

**Guards, inside the block:** the rim is a text-shadow, so it prints; no motion,
so nothing to disable.

**Coupling:** none, but it competes with display type set elsewhere — two
inflated headings on one page deflate each other.

### 20. Production-Ready 3D Web Spec Prompt — documented

**Asks for:** not a page. Five requirements: user goals first, scroll and camera
motion specified, touch fallbacks, lazy assets, a 60fps budget — with React Three
Fiber and Three.js named outright.

**Alone on a page:** it is a checklist for a page, and it is already this repo's
`AGENTS.md` § Verify and § Commit, minus the two things the repo refuses
(dependencies, binary assets).

**Needs:** nothing to run.

**Guards:** the checklist is the guard.

**Coupling:** it does not compose, because it is not a block. It sits over all
twenty as a question: does this still work at 60fps on a phone with a thumb on
it?

## Using one alone, in practice

Three things are enough for any single template:

```html
<link rel="stylesheet" href="css/3d.css">
<main class="t3-numbered">
  <section class="band" id="mine"><!-- one template's markup --></section>
</main>
<script src="js/scene.js"></script>
```

`js/scene.js` binds only the hooks it finds, so a page with one orb pays for one
orb. Nothing here needs a build step, a package or a network request, and every
block carries its own reduced-motion, print and coarse-pointer branches — which
is what lets you take one and leave the other nineteen.

# Photographs in a 3D page

Compiled 19 November 2026, from a rebuild of a long-form static guide: phone
first, one 720px column, 28 sections, and no images at all — the visual load was
carried by emoji (`🔊`, `🌙`, `☰`, `✓`, `✕`).

Everything below was measured in a browser on that page, not admired in a
screenshot. The numbers come from `getBoundingClientRect`, `getComputedStyle`
and pixels sampled out of a PNG feed of the viewport.

This document is evidence, not a stylesheet. Nothing here is in `css/3d.css`,
and §5 says why.

## 1. Why photographs at all

A page reads as generic for the reason in `findings.md` §2: every screen has the
same shape. Adding a photograph does not fix that on its own — adding *one focal
point per screen* does, and a photograph is the cheapest focal point there is.

Budget: one photograph per screen of scrolling, two on the opening screen at
most. The rebuild used four across 28 sections. Four is enough to change how the
page reads; forty is a stock-photo site.

## 2. The four techniques

### 2.1 The photograph goes behind the words, not on top

The hero is the same camera as `.t3-hero`, with one difference that matters on a
narrow column: there is no room for a photo *beside* the copy, so the photo goes
behind it and is pushed back along z.

```html
<header class="hero">
  <div class="beats-cover">
    <figure class="beats-depth">        <!-- the stage: transform-style: preserve-3d -->
      <img class="beats-cover-photo" src="…" width="1280" height="853"
           alt="…" fetchpriority="high" decoding="async">
    </figure>
    <div class="beats-cover-shade" aria-hidden="true"></div>
    <p class="beats-cover-pill">2 piles · one evening</p>
    <div class="beats-cover-copy"> … words … </div>
  </div>
</header>
```

```css
.hero      { overflow: hidden; }                 /* the window */
.beats-cover { position: relative; display: flex; align-items: flex-end;
               min-height: clamp(320px, 38vw + 170px, 400px);
               perspective: 1000px; perspective-origin: 50% 38%; }
.beats-depth { position: absolute; inset: 0; transform-style: preserve-3d; }
.beats-cover-photo { position: absolute; inset: 0; width: 100%; height: 100%;
                     object-fit: cover; object-position: 50% 42%;
                     transform: translateZ(-150px) scale(1.16); }
```

Three things make it read as depth rather than as a picture with a caption:

1. **The photo is at -150px and the words are flat at 0.** The tilt moves the
   photograph and leaves the sentences alone, so the parallax is between the
   picture and the page rather than inside the reading column.
2. **The scale compensates for the camera.** At 1000px of perspective,
   `translateZ(-150px)` shrinks the plane to 1000/1150 = 87% and the edges would
   show; `scale(1.16)` puts them back. A photo at a negative z with no
   compensation is a photo with gaps around it.
3. **The window clips, the stage does not.** `overflow: hidden` is on the hero
   (`findings.md` rule 6) and never on the element carrying `preserve-3d`.

Tilt is clamped to 3° horizontally and 2° vertically, bound only on
`(hover: hover) and (pointer: fine)` and never under `prefers-reduced-motion`.
Measured at the corner: `rotateX(1.4deg) rotateY(2.4deg)`.

The scroll recede is the `findings.md` §3.7 one-liner, with the sign that
`Trap 6` describes. Measured on the rebuilt page: `z` = 0 at scroll 0, −105px at
300, −120px (the cap) from 900 down, and back to 0 at the top.

The pill is a direct child of the scene rather than of the stage: it still gets
the camera (`perspective` is on the parent), but it does not lean with the
photograph. A sticker that tilts with the picture reads as part of the picture.

### 2.2 A plate between sections

A photograph that runs edge to edge, with the words of the section starting
under it. No depth, no tilt — it is a rest, not a ride.

```css
.beats-band-photo {
  display: block;
  width: 100%;
  height: auto;            /* see Trap P1 */
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: 50% 45%;
}
@media (min-width: 620px) { .beats-band-photo { aspect-ratio: 16 / 8; } }
```

### 2.3 The scrim is a gradient, never a blurred box

Text over a photograph needs a surface, and the surface has to be painted, not
blurred. A blurred element is wider than its parent (Trap 2 of `findings.md`);
a gradient is not part of layout at all and cannot produce a scrollbar.

```css
.beats-cover-shade {
  position: absolute; inset: 0; pointer-events: none;
  background:
    linear-gradient(to top,
      rgba(14,11,32,.97) 0%, rgba(17,13,38,.9) 38%,
      rgba(20,16,44,.34) 70%, rgba(20,16,44,.5) 100%),
    linear-gradient(118deg, rgba(30,24,66,.6), rgba(30,24,66,.1));
}
```

The bottom of the frame is where the words are, so that is where the scrim is
opaque. The top keeps the photograph. Measured (§4): the worst pixel behind the
copy gives 10.8:1 for white, 8.6:1 for the lede and 7.4:1 for the kicker.

### 2.4 Icons are drawn, not typed

Emoji are text characters. The phone's font decides what they look like, the OS
update decides again, and a screen reader may announce a name that has nothing to
do with the action. Four buttons and two badges on the page were emoji.

Replace with inline SVG that inherits `currentColor`:

```html
<button id="theme" type="button" aria-label="Switch between light and dark">
  <svg class="beats-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" fill="currentColor"/>
  </svg> Dark
</button>
```

```css
.beats-ico { width: 1.05em; height: 1.05em; flex: 0 0 auto; vertical-align: -0.17em; }
```

Keep the visible label. An icon is not an accessible name; `aria-label` on the
button is, and a drawn icon adds nothing a screen reader needs (`aria-hidden`).

**When another script owns the label.** The shared `app.js` on that site writes
`🌙 Dark` back into the button on every press, so the drawn icon would vanish on
the first click. The fix is not to fork the shared file:

```js
var watch = new MutationObserver(icons);
['listen', 'theme'].forEach(function (id) {
  var el = document.getElementById(id);
  if (el) watch.observe(el, { childList: true, characterData: true, subtree: true });
});
```

`icons()` reads the label the other script wrote, decides which icon belongs to
that state, writes it, and returns without writing again when the state already
matches — which is what stops the observer from looping.

## 3. Two traps

### Trap P1 — the width/height attributes beat `aspect-ratio`

```css
/* Looks complete. Renders 852px tall. */
.plate-photo { width: 100%; aspect-ratio: 16 / 8; object-fit: cover; }
```

```html
<img class="plate-photo" src="console.jpg" width="1280" height="852" alt="">
```

`width` and `height` on an `<img>` are presentational hints that map to the CSS
`width` and `height` properties. The author rule `width: 100%` overrides the
width hint, but nothing overrides the height hint, so the element keeps
`height: 852px` and `aspect-ratio` has nothing to compute. Measured on the
rebuilt page: the plate was **879px tall where 360 was intended** (852px of
image plus a 27px caption), and on a 844px-tall phone it pushed the control bar
and the first section off the screen.

The fix is one declaration, and it has to be on every image whose height is
supposed to come from a ratio:

```css
.plate-photo { width: 100%; height: auto; aspect-ratio: 16 / 8; object-fit: cover; }
```

This is also why the attributes must stay: they are the browser's only chance to
reserve the right box before the file arrives. Keep them and reset the height.

### Trap P2 — a caption inherits the surface it was never on

A caption coloured for the page (`--soft`, `#5E564C`) was placed inside a figure
that carried a dark background to match the photograph above it. Measured:
**2.7:1** — a caption nobody can read, on a page where every other caption is
fine.

Two ways out, and the second is better:

- give the caption its own colour for that surface; or
- take the background off the figure and let the caption sit on the page, where
  its colour was designed to be. Measured after the fix: **6.9:1**.

A colour is only correct against a surface. Moving an element between surfaces
is a colour change, whether or not a declaration changed.

## 4. Measuring the contrast behind text (recipe)

Eyeballing a scrim cannot tell you the worst pixel, and the worst pixel is the
one that matters. What worked:

1. In the browser, hide the text you are measuring (`visibility: hidden` keeps
the layout) and note its bounding box.
2. Screenshot the viewport, then crop that box **inset by ~12px**, so the
   window's rounded corner and the page gutter cannot be mistaken for the
   background behind a letter.
3. Sort the pixels by WCAG relative luminance and convert the brightest one, and
the 99.9th percentile, to a contrast ratio against each text colour.

```python
from PIL import Image
def lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
def lum(px):
    r, g, b = px[:3]
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
def ratio(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)
```

Measured that way on the rebuilt hero: worst pixel `rgb(63,59,80)`, luminance
0.0476 → **10.75:1** white, **8.63:1** `#E8E4F5`, **7.39:1** `#D9D2F0`.

The 4.5:1 floor is for normal text; a scrim that only passes at the average is a
scrim that fails at the bright spot.

## 5. What was not ported, and why

- **The photographs.** They belong to their photographers under CC BY and
  CC BY-SA, and they are a network request. The template promises neither.
- **The page's copy, prices and section names.** `agents/repo-sync.md`, port
  test 3.
- **The primitives as `css/3d.css` classes.** A primitive with no demo is a
  claim, not a feature, and the demo cannot load a photograph without breaking
  the no-network promise — which is the one promise this repo keeps above all
  others. This document is the measured evidence instead. If the demo ever gets
  a local photograph, `.t3-plate` and `.t3-scrim` are two classes away.

## 6. Sources

- MDN, `perspective` — <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/perspective>
- MDN, `transform-style` (the grouping properties that flatten) — <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform-style>
- MDN, `aspect-ratio` — <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio>
- MDN, `object-fit` — <https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit>
- web.dev, lazy loading and image dimensions — <https://web.dev/lazy-loading/>
- W3C, contrast minimum — <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum>
- W3C, `prefers-reduced-motion` — <https://www.w3.org/WAI/WCAG22/Techniques/css/C39>
- W3C, text alternatives for emoji — <https://www.w3.org/WAI/WCAG21/Techniques/html/H86>
- Can I Use, `animation-timeline: view()` — <https://caniuse.com/mdn-css_properties_animation-timeline_view>

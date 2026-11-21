# 3D Web Template

Depth for static sites with **no dependencies, no build step and no network
requests**. Two files, a demo, plus the rules that keep a page readable while it
moves.

Built out of a design pass on a real 1,000+ line static page, so everything here
was shipped and measured before it was generalised. The mistakes are in
[docs/findings.md](docs/findings.md) next to the fixes, because the traps are the
part worth copying. Photographs get their own file —
[docs/photographs.md](docs/photographs.md) — because a photograph brings two
traps that depth alone does not, and both of them cost a visible bug.

If you are an agent working in this repo, read [AGENTS.md](AGENTS.md) first. It
says which file holds the rule you need, lists all ten traps on one page, and
ends with the verify-then-commit loop.

## What is in the box

| Path | What it is |
|---|---|
| `AGENTS.md` | The map for an agent: where each rule lives, the ten traps in one table, the couplings, and the verification recipe. |
| `css/3d.css` | The primitives: scene, stage, pop, sticker, halo, the layered hero, photos in cards, CSS-numbered sections, and the guards. |
| `js/scene.js` | 280 lines. Pointer tilt and scroll recede, gated on a real pointer and on `prefers-reduced-motion`. |
| `index.html` | Sends a bare visit to `demo/`. Nothing else. |
| `demo/` | A working page that uses every primitive. Open it, move the mouse, scroll. |
| `docs/findings.md` | The research and the eight traps, with code. Read this before editing the CSS. |
| `docs/photographs.md` | Real photographs in a 3D page: the scrim, the plate, drawn icons instead of emoji, two traps, and how to measure the contrast behind a headline. |
| `agents/repo-sync.md` | The agent that ports changes from a project back into this repo. |
| `agents/README.md` | How to install that agent in another project. |
| `docs/sources.md` | The register: every post this research rests on, when it was read, what it was, and whether the frames were ever seen. |
| `docs/reel-pass-november-2026.md` | Six links in one day: one technique the template does not have, four libraries that are dependencies, four funnels. |
| `CHANGELOG.md` | What changed, by version. |
| `LICENSE` | MIT. Copy it with the files. |

## Quick start

```bash
# from this repo
python3 -m http.server 3000 --bind 0.0.0.0
# open http://localhost:3000/  (it forwards to demo/)
```

Then in your own page, one photograph in a scene:

```html
<link rel="stylesheet" href="css/3d.css">

<div class="t3-scene" data-t3-tilt>
  <div class="t3-stage" data-t3-stage>
    <img class="t3-halo" src="art.jpg" alt="...">
    <p class="t3-sticker">Sold</p>
  </div>
</div>

<script src="js/scene.js"></script>
```

A layered hero instead: three depths, one camera, artwork that leaves the page.

```html
<section class="t3-hero">
  <div class="wrap t3-scene" data-t3-tilt data-t3-hero>
    <div class="t3-split" data-t3-stage>
      <div class="t3-copy-front">
        <h1>Your headline</h1>
        <p>Two or three sentences at most.</p>
      </div>
      <figure class="t3-photo t3-photo-main"><img src="wide.jpg" alt=""></figure>
      <figure class="t3-photo t3-photo-back"><img src="tall.jpg" alt=""></figure>
      <p class="t3-sticker t3-sticker--float">New</p>
    </div>
  </div>
</section>
```

`scene.js` finds every `[data-t3-tilt]`, uses its `[data-t3-stage]` child, and
does nothing else. `data-t3-hero` adds the scroll recede to the same scene. No
config, no init call, no framework.

## The API

| Class or attribute | Goes on | What it does |
|---|---|---|
| `.t3-scene` | the parent | Sets `perspective` and `perspective-origin`. **Parent only** — see trap 1. |
| `.t3-stage` | the thing that tilts | `preserve-3d` plus the transform the JS writes. |
| `.t3-pop` | any child | Rides forward by `--t3-lift`. One or two per scene. |
| `.t3-sticker` | a child | Pill that hangs over the edge. Colours are literal on purpose. |
| `.t3-halo` | the artwork | Warm glow **as a `box-shadow`**. See trap 2. |
| `.t3-hero` | the section | The window: clips the photo that bleeds off the right edge. |
| `.t3-split` | the hero's stage | Flex row, `min-height`, `preserve-3d`. The JS recedes it on scroll. |
| `.t3-copy-front` | the words | `50%` column at `--t3-copy-lift`, so no sentence crosses a photo. Padded by `--t3-copy-inset`, or the camera projects the column off the page — trap 8. |
| `.t3-photo` | a figure | Framed, clipped artwork slot. Glow is a shadow. |
| `.t3-photo-main` | the big figure | Hangs `9%` off the right edge, turned `-9deg` on y. |
| `.t3-photo-back` | the small figure | Sits at `--t3-depth-back`, behind the scene. One per hero. |
| `.t3-sticker--float` | the hero sticker | Furthest forward at `--t3-sticker-lift`. |
| `.t3-cards` | a card grid | One camera for the whole grid, so a card leans as one piece. |
| `.t3-card` | any card | Stacked shadow, a 4px lift on hover, and `preserve-3d`. |
| `.t3-card-photo` | an image in a card | Bleeds to the card edge. No `translateZ` — see trap 7. |
| `.t3-turn` / `.t3-in` | a card | Hinged entrance. `scene.js` adds `t3-in` on arrival. |
| `.t3-js` | the `<html>` | Added by `scene.js`. `.t3-js .t3-turn` is what hides a card before it arrives, so a page with no script never hides one. |
| `.t3-dark` | the wrapper or `<html>` | Theme hook: swaps the halo, wash and photo shadow for their dark tokens. `[data-theme="dark"]` does the same job. |
| `.t3-numbered` | the `<main>` | Numbers every `section[id]` from CSS counters. No markup changes. |
| `data-t3-tilt` / `data-t3-stage` | scene / stage | What `scene.js` binds to. |
| `data-t3-hero` | the scene | Adds the scroll recede to that scene. |
| `data-t3-card` | a card | Pointer tilt for one card. |
| `data-t3-turn` | a card | Adds it to the reveal observer. |

Tokens live in `:root`: `--t3-perspective`, `--t3-lift`, `--t3-duration`,
`--t3-ease`, `--t3-shadow`, `--t3-shadow-lift`, `--t3-halo`, `--t3-copy-lift`,
`--t3-copy-inset`,
`--t3-depth-back`, `--t3-sticker-lift`, `--t3-stage-height`, `--t3-copy-width`,
`--t3-card-pad`, `--t3-card-radius`, `--t3-card-photo-height`,
`--t3-photo-shadow`, `--t3-wash`, `--t3-camera`.

`--t3-card-pad` must equal the card's own padding, or the photo stops meeting the
card edge.

## The six rules this template does not break

1. **`perspective` on the parent, `preserve-3d` on the stage.** Swap them and
   each child gets its own vanishing point.
2. **A halo is a shadow, never a blurred box.** A blurred element inset by
   negative percentages is wider than its parent and gives a phone a horizontal
   scrollbar. This happened; it is trap 2.
3. **No tilt on touch or on request.** The JS checks `(hover: hover) and
   (pointer: fine)` and `prefers-reduced-motion` before binding, and the CSS
   refuses the transform again as a second line of defence.
4. **A backdrop blur never sits above a fixed drawer.** `backdrop-filter` makes
   its element the containing block for fixed children, which pins a mobile menu
   to the header instead of the screen. Scope it to a min-width.
5. **Reading text does not move.** Depth is for artwork, stickers, card chrome
   and a short hero column. Long body copy stays flat, upright and on a plain
   background. A hero headline may ride at depth with the tilt capped at 4/3
   degrees, because the reader is not reading a page yet.
6. **Clip the window, not the stage.** A photo that leaves the page needs an
   ancestor with `overflow: hidden`; the stage inside it must keep
   `overflow: visible`, or the clip flattens the depth. See trap 3.

If a change needs to break one of these, it is not a template change. It is a
decision for the project that wants it.

## Browser support

| Feature | Support | Fallback |
|---|---|---|
| `perspective`, `preserve-3d`, `translateZ` | Everywhere for years | Nothing needed |
| `pointermove` + `matchMedia` | Everywhere | No scene, no error |
| CSS counters | Everywhere | Numbers appear in every browser |
| `backdrop-filter` | Modern browsers | Opaque bar, guarded by `@supports` |
| `color-mix()` (demo only) | Modern browsers | Falls back to the solid paper colour |

No polyfills. Nothing here fails loudly on an old browser; it just goes flat.

## Using the sync agent

`agents/repo-sync.md` is the brief for the agent that keeps this repo current
with whichever project it was extracted from. Copy it into a project's `agents/`
folder, set the two constants at the top, and it will port verified changes here
rather than let the two drift.

See [agents/README.md](agents/README.md).

## Licence

MIT — see [LICENSE](LICENSE). Use it in paid work, change it, ship it, sell what
you build with it. The one condition is that the copyright line travels with the
files you copy.

Everything in the box is covered: the CSS, the script, the demo, and the demo's
hand-drawn SVG figures. There are no photographs, fonts or other third-party
assets to clear, because the template loads nothing from the network.

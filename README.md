# 3D Web Template

Depth for static sites with **no dependencies, no build step and no network
requests**. Two files, plus the rules that keep a page readable while it moves.

Built out of a design pass on a real 1,000+ line static page, so everything here
was shipped and measured before it was generalised. The mistakes are in
[docs/findings.md](docs/findings.md) next to the fixes, because the traps are the
part worth copying.

## What is in the box

| Path | What it is |
|---|---|
| `css/3d.css` | The primitives: scene, stage, pop, sticker, halo, card, CSS-numbered sections, and the guards. |
| `js/scene.js` | ~120 lines. Pointer tilt, gated on a real pointer and on `prefers-reduced-motion`. |
| `demo/` | A working page that uses every primitive. Open it, hover the card. |
| `docs/findings.md` | The research and the five traps, with code. Read this before editing the CSS. |
| `agents/repo-sync.md` | The agent that ports changes from a project back into this repo. |
| `agents/README.md` | How to install that agent in another project. |
| `CHANGELOG.md` | What changed, by version. |

## Quick start

```bash
# from this repo
python3 -m http.server 3000 --bind 0.0.0.0
# open http://localhost:3000/demo/
```

Then in your own page:

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

`scene.js` finds every `[data-t3-tilt]`, uses its `[data-t3-stage]` child, and
does nothing else. No config, no init call, no framework.

## The API

| Class or attribute | Goes on | What it does |
|---|---|---|
| `.t3-scene` | the parent | Sets `perspective`. **Parent only** — see trap 1. |
| `.t3-stage` | the thing that tilts | `preserve-3d` plus the transform the JS writes. |
| `.t3-pop` | any child | Rides forward by `--t3-lift`. One or two per scene. |
| `.t3-sticker` | a child | Pill that hangs over the edge. Colours are literal on purpose. |
| `.t3-halo` | the artwork | Warm glow **as a `box-shadow`**. See trap 2. |
| `.t3-card` | any card | Stacked shadow, and a 4px lift on hover. |
| `.t3-numbered` | the `<main>` | Numbers every `section[id]` from CSS counters. No markup changes. |
| `data-t3-tilt` / `data-t3-stage` | scene / stage | What `scene.js` binds to. |

Tokens live in `:root`: `--t3-perspective`, `--t3-lift`, `--t3-duration`,
`--t3-ease`, `--t3-shadow`, `--t3-shadow-lift`, `--t3-halo`.

## The five rules this template does not break

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
5. **Text does not move.** Depth is for artwork, stickers and card chrome. Body
   copy stays flat, upright and on a plain background.

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

No licence file yet. Add one before sharing this outside your own projects.

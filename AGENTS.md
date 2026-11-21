# AGENTS.md — start here

This file is the map. It is not the rules; it points at them. Read it first, then
only the file your task needs.

## What this repo is

Depth for static sites with **no dependencies, no build step, no network
request**. Two files are the product: `css/3d.css` and `js/scene.js`. Everything
else is a demo, a record of a measured finding, or a brief.

If a change needs a package, a build step, a CDN link, a downloaded font, or a
request to another origin, it does not belong here.

## Where the rules live

| The question | The file | Read it when |
|---|---|---|
| What exists, and what does it do? | `README.md` § The API | before writing any markup |
| Why is this rule here? What broke? | `docs/findings.md` (traps 1–8) | before editing `css/3d.css` |
| Photographs, scrims, drawn icons | `docs/photographs.md` (traps P1–P2) | before putting an image in a scene |
| May I port this from a project? | `agents/repo-sync.md` | before copying anything in |
| What changed, and what version is next? | `CHANGELOG.md` | before committing |
| What did a piece of research actually say? | `docs/3d-web-templates.md`, `docs/floating-window-pass.md`, `docs/reel-pass-november-2026.md` | when writing a new one |
| Has this been researched before? | `docs/sources.md` | before adding a link, and after reading one |

`README.md` is normative: it says what the vocabulary is. `docs/` is evidence: it
says what was measured and what it cost. Neither is a stylesheet, and neither
overrides the other. If they disagree, the code is right and the doc is stale —
fix the doc in the same commit.

## Read order, by task

- **Using the template in a page:** `README.md` § Quick start, then § The API.
  That is all you need.
- **Editing `css/3d.css` or `js/scene.js`:** the API table, then all ten traps
  below, then `demo/index.html` to see the primitive in use.
- **Adding a primitive:** `agents/repo-sync.md` § Procedure. A primitive with no
  demo is a claim, not a feature.
- **Adding research:** § Writing here, below.

## The ten traps

Two files carry them. Memorise the one-line rule; open the file for the code.
The rule is not up for debate — a change that re-introduces one is rejected.

| ID | The rule | The symptom if you break it |
|---|---|---|
| T1 | `perspective` on the parent, `preserve-3d` on the stage | every child gets its own vanishing point; a row of cards looks wrong in a way nobody can name |
| T2 | A halo is a `box-shadow`, never a blurred box | a blurred element inset by negative percentages is wider than its parent: 390px viewport, 409px document, 19px of sideways scroll |
| T3 | No `filter`, `opacity < 1`, `overflow: hidden` or `backdrop-filter` above a `translateZ` | the 3D context flattens and `translateZ` silently does nothing |
| T4 | `backdrop-filter` never sits above a fixed drawer | the mobile menu is pinned to the header instead of the screen; scope the blur to `min-width: 761px` |
| T5 | Reading text does not move | glyph stems blur at the extremes; readers with visual stress notice first |
| T6 | The scroll recede is `clamp(top * 0.45, -240, 0)` — never positive | the scene zooms at the reader instead of receding; invisible at rest, because at rest it is zero |
| T7 | No `translateZ` on a photo inside a shared-camera grid | the photo projects sideways out of its own card: 12px overhang at 1440px, middle card looks fine |
| T8 | A lifted text column needs `--t3-copy-inset`, or no lift at all | the camera projects the column away from its origin: at 1024px the hero lost the first 33px of every line and `scrollWidth` still matched `clientWidth`, because the hero clips |
| P1 | `height: auto` on every image whose height comes from `aspect-ratio` | the `width`/`height` attributes are presentational hints and win: a 360px plate rendered 879px |
| P2 | A colour is only correct against a surface | moving an element between surfaces is a colour change, declaration or not: caption measured 2.7:1 |

## Couplings that must move together

- **The hero breakpoint.** `css/3d.css` `@media (max-width: 980px)` and
  `js/scene.js` `wide: "(min-width: 981px)"` are one decision written twice, and
  `demo/index.html` lays out against the same number. Change one, change all three.
- **`--t3-card-pad`** must equal the card's own padding, or the photo stops
  meeting the card edge.
- **One stage per scene.** `scene.js` takes `querySelector("[data-t3-stage]")`
  inside `[data-t3-tilt]` — the first match, not all of them.
- **`.t3-numbered` goes on `<main>`.** It numbers every `section[id]` from CSS
  counters. No markup change, so do not add numbers by hand.
- **Tilt ceilings:** 5°/4° for a scene, 4°/3° for the hero, 3°/2° over a
  photograph, 3°/4° for a card. They are ceilings, not suggestions; each was set
  by the text nearest the layer.
- **The room is flat on purpose.** `transform-style: preserve-3d` on
  `.t3-room-row` moves the objects but does not move their hit areas with them:
  `elementFromPoint` at the visual centre of four of the five demo objects
  returned the row itself, so only the selected object could ever be clicked.
  Scale, opacity and a blur on the artwork carry that depth instead. Do not put
  `translateZ` back into that row without re-running the probe.
- **The room's distance cap** is `min(var(--t3-room-dist), 3)` in `css/3d.css`
  and `cap = 3` in `scene.js`. An item set further back than the stylesheet
  expects moves without dimming, which reads as a bug rather than depth.
- **`--t3-copy-inset`** is arithmetic, not taste: `lift / (perspective - lift) x
  origin`, divided by the projection factor, as a percentage of the scene. Change
  `--t3-copy-lift`, `--t3-perspective`, `--t3-camera` or `--t3-copy-width` and it
  stops cancelling. Measure the `h1`'s left edge against the scene's, do not
  assume it.

## Never

- **Never** add a dependency, a CDN link, a third-party font, a build step, or a
  network request. This is the promise the repo keeps above all others.
- **Never** change repository visibility. It is public on purpose.
- **Never** force-push, rewrite history, or delete a file someone else added.
- **Never** copy a source project's prose, prices, shop names, section names or
  artwork. Techniques only — `agents/repo-sync.md` § port test.
- **Never** port something the source project has not verified.
- **Never** let a reveal hold content at `opacity: 0` before the script runs:
  a page with no JS must still show every card, and print must not be blank.

## Verify, then commit

```bash
node --check js/scene.js
python3 -m http.server 3000 --bind 0.0.0.0    # open http://localhost:3000/demo/
```

On the demo, measure — do not eyeball:

- [ ] `document.documentElement.scrollWidth === clientWidth` at 320, 390, 768 and 1280.
- [ ] `getComputedStyle(stage).transform` at four scroll offsets: `translateZ` is
      `0` at the top and negative after. Positive is T6.
- [ ] The `h1`'s left edge is not left of the scene's left edge. Negative at
      981–1100px is T8.
- [ ] With `prefers-reduced-motion: reduce` emulated, the stage never transforms.
- [ ] Both themes: no dark hole in a light illustration, no brown halo smudge.
- [ ] Text contrast at least 4.5:1 in both themes, measured, not felt.
- [ ] Print preview: nothing invisible, no sticker, no transform.
- [ ] The room: clicking an object moves the badge and the bracket to that
      object and to no other. A 3D row fails this while looking perfect.
- [ ] Console clean.

A rendering that was not looked at is not verified. Write "not viewed" rather
than "looks right".

Then: one commit, conventional prefix, no emoji, and bump `CHANGELOG.md` in the
same commit — patch for a fix, minor for a new primitive or token, major for a
change that alters an existing class or token.

## Writing here

The prose in this repo is part of the product. It is written to one shape:

1. **Claim, then evidence.** Every number says how it was measured
   (`getComputedStyle`, `getBoundingClientRect`, a pixel sample) and against what
   viewport. A number with no method is a guess wearing a number's clothes.
2. **Imperative, one rule per sentence.** "A halo is a shadow." Not "you might
   want to consider whether a shadow could work here."
3. **Name the cost.** The traps are worth copying because each one says what it
   broke and how much: 19px, 12px, 879px, 2.7:1.
4. **Say what was not taken, and why.** Rejection is a finding. Every doc here
   ends with it.
5. **Label the unverified.** "Metadata only", "not viewed", "unverified" are
   correct and expected. `docs/findings.md` § 1 does this about the reel whose
   frames were unreadable; that honesty is the house style, not a weakness.
6. **Date and link every source**, with the date it was read. No undated claims
   about a living page. `docs/sources.md` is the register that holds them.
7. **No hedging, no selling.** No "revolutionary", no "seamless", no exclamation
   marks. Dry is the register.

Keep a research doc as a record, not a tutorial: what the post was, what it
actually showed, what is worth copying, what is rejected. `docs/floating-window-pass.md`
is the shortest correct example of that shape.

# The reel pass, November 2026

Six links arrived together on 21 November 2026. This is what was in them, what is
taken, and what is refused. The links themselves are in `sources.md`, so they are
never lost to a chat scroll.

## What this pass actually saw

The first read of these six was words only: captions, each page's own description
of its image, and the public comments. **The frames were not available**, and half
this file was written as inference, labelled as inference.

Then the four reels were downloaded (`yt-dlp`, no login needed) and sampled at
even intervals with `ffmpeg`, nine frames each, and looked at. So the four reels
are **viewed**: what follows in § 1 and § 3 about those videos is now observed.
The two carousels were not sampled and stay **read only**.

What changed with the frames: the technique in § 1 is not the one the first pass
guessed. The guess was a walkable room of five planes on one camera, which is a
plausible reading of the words "spatial browsing" and wrong. The rest held up —
the library list, the funnels, the comment section — which is worth saying
plainly, because a doc that only ever confirms itself is not research.

## 1. The reel is four interactions, and one of them is worth having

@marcelodesignxh, 18 November 2026. 9.83 seconds, cut as a montage. The caption
is "Wait for it. 🥷". On screen, in order:

| Time | The card | What it shows |
|---|---|---|
| 0.0–3.4s | the presenter, talking to camera | "Steal these interactions to make your Website feel premium." |
| ~3.5s | **Transition as Scroll** | A rounded card on a pale gradient holding a hero of clouds, the words THE DEEP-SEA LAYER / OF COMPUTE masking in over it, a nav row and a pill call to action. |
| ~4.7s | (untitled) | A single frame of heavy motion blur on a white card: a fast wipe between two screens, unreadable on purpose. |
| 5.9–8.4s | **Spatial Browsing** | A dark shop, a rail of garments, one selected. Detailed below. |
| ~9.4s | **Touchable Surface** | A portrait cut out of its background and laid over a cream panel that fills most of the frame, a STORE pill, a small info card at the lower left. |

Four techniques, four labels, one reel. Only the third is something this template
does not already have, and it is the third that the comments ask about:

> "How do I do the spatial browsing? Is there a tutorial?"

and, on the same post, the objection, twice:

> "How to make your website annoying and useless"
> "Useless. Not user friendly"

A third comment answers the first: "That reveal was worth the wait 🔥". So one
post, 1.6K likes, and its comment section holds both halves of the argument this
repo is built on. The reveal is the whole point, and the same page is called
unusable by people watching it. That is `README` rule 5 arriving as public
evidence rather than as taste.

### What the shop screen is

A dark navy space with a faint 92px grid, a soft vignette and a floor. One thin
rail runs the full width, brighter at the middle and fading at both ends.
Garments hang from it: about a dozen, in a single row, all at one height, each
one smaller, darker and softer the further it sits from the middle. The one in
focus wears a selection bracket — four corner ticks, not a box — with a small
SKU tag on a stem above it, and its name and price in a thin strip beneath the
rail. A pill nav (STORE, CLOTHING, CAPS, BAGS, SHOES) sits over the bottom edge,
a back arrow at the top left, a bag icon at the top right. Choosing an object
replaces the row with one garment, arrows either side, and a panel that slides
in with size, quantity and a call to action.

The depth in that screen is **depth of field, not a camera**. Everything is on
one plane; the focused object is simply bigger, brighter and sharper than its
neighbours. That is why it survives on a phone, and it is the part worth copying.

### What was built, and what it cost

`.t3-room` in `css/3d.css`, `T3.room()` in `js/scene.js`, and a band in
`demo/index.html`: a rail, a row of objects, one selection, click or arrow keys.
No WebGL, no library, no canvas, no new request.

It was built twice. The first version was the obvious one — `perspective` on the
space, `preserve-3d` on the row, each object translated back in `z` by one step
per item away from the selection. It looked right. It could not be clicked:
`elementFromPoint` at the visual centre of four of the five objects returned the
row itself, so only the selected object was ever reachable. Measured, in Chrome:
with every object's transform reduced to a 2D `matrix()` and `preserve-3d` still
on the row, still broken; with `transform-style: flat` on the row, all five
returned their own button. The distance in `z` was never the problem. The 3D
context was.

So the row is flat, and the depth comes from a `scale` (down to 0.82), an
`opacity` (down to 0.55) and a `blur` on the artwork only (up to 1.5px). Three 2D
properties that hit-test exactly where they paint. A camera the reader cannot
click is not depth; it is a picture of depth.

What was not taken from the screen: the shop's name, its prices, its SKUs, its
category names and its garments. The demo invents its own — five objects, SP-01
to SP-05 — because the brief in `agents/repo-sync.md` is techniques, not content.

## 2. The library post, and why it is the useful one

@fifbuilds, 20 September 2026, 7.7K likes: "the most insane 3D, scroll, text & UI
animation effects you've seen are free on GitHub", with four repositories named.
All four are real. All four are dependencies a static page cannot take.

| Library | What it is | Why not |
|---|---|---|
| Lenis | Smooth-scroll library, a few KB, no runtime dependencies, MIT | It changes the scroll the reader controls. See below. |
| GSAP | Animation library, now free including the former Club plugins | A dependency to do what forty lines of `scene.js` already do, plus a second animation model beside CSS transitions. |
| Vanta | Animated 3D backgrounds, rendered by three.js (WebGL) or p5.js, about 120kb gzipped, mostly three.js | WebGL, a script tag and a network request, for a decoration. |
| React Bits | 216 animated React components and backgrounds | React only, and its licence is "MIT + Commons Clause", not MIT. |

**Lenis, specifically.** Its landing page claims "no CSS transforms, no hijacked
scrollbars, no accessibility trade-offs". Its own issue #534, opened 31 July 2026
and titled "Please respect `prefers-reduced-motion`", has a maintainer agreeing
that not respecting it out of the box is "inconsistent with" that claim, and
describing the fix they intend. The objection to smooth scroll is not aesthetic:
it is that the scroll stops belonging to the reader, and the escape hatch for the
readers who need it was, for a while, missing in the library that told you there
was nothing to worry about.

That is why this template keeps the native scrollbar and moves depth inside it.

**GSAP's old objection is out of date.** It is now free for commercial use,
including `SplitText` and `MorphSVG`, which used to be members-only. Anyone
repeating "GSAP costs money" is repeating 2024. The reason that survives is
weight, not price.

**React Bits' licence is not MIT.** "MIT + Commons Clause" adds a restriction on
selling the components themselves. Copy one into a product you sell and read the
clause first.

## 3. The four funnels

| Post | The offer | What is in it |
|---|---|---|
| @himanshubuilds, 4 Nov (scrolltide) | copy a prompt, paste it into an AI builder | Already written up in `floating-window-pass.md` and `3d-web-templates.md`. |
| @tmvdesignstudio, 20 Nov | "comment LAB" for a course and its prompts | A premise worth answering, below. |
| @digitalmarketingtrending, 13 Nov | "1000s AI codes", ten categories | Nothing to do with 3D websites. AI image prompts. |
| @kevin.snippet, 3 Sep | "3 Frontend Libraries… Day 1" | 41 seconds of a monitor on a desk showing four sites — a pen product page, a scroll-drawn travel map, a floating-card gallery — with captions "buttery smooth scrolling", "Scroll Animation", "make your site". **The three library names never appear on screen**; they are spoken. The frames settle it, which is one more than the words did. |

**The tmv premise is half right and half backwards.** "The moment I switched from
basic template looking websites and started creating interactive designs, that's
when everything changed" — a template looks like a template because every screen
has the same shape, which is `findings.md` § 2. Adding interaction to that shape
is motion on a generic page. One focal point and a rhythm come first; depth is
cheap after that, and it is not what makes a page memorable.

**One thing worth keeping from the image-prompt post.** Its ten categories are a
fair taxonomy of what makes a picture look expensive: cinematic hero shot,
surreal environment, luxury texture, dramatic lighting, dynamic camera, seamless
transition, nature effect, fantasy transformation, animation style, premium
commercial look. Two of the ten are what `.t3-halo` and a gradient scrim already
do in CSS. The other eight need a model, a licence and a download.

## 4. What this pass changed

- `css/3d.css` — **the room**: `.t3-room`, `.t3-room-space`, `.t3-room-rail`,
  `.t3-room-row`, `.t3-room-item`, `.t3-room-hit`, `.t3-room-object`,
  `.t3-room-label`, `.t3-room-name`; `--t3-room-shrink`, `--t3-room-item-w`,
  `--t3-room-pad-top`, `--t3-room-ink`, `--t3-room-accent`; and the guards —
  no transition on request, no camera or blur on a phone, a plain row in print.
- `js/scene.js` — `T3.room(container, { itemSelector })`, plus `data-t3-room` and
  `data-t3-room-item` wired into `init()`. Clicks, arrow keys, Home and End; the
  selection is `aria-current` and the badge follows focus.
- `demo/index.html` — a fifth band using it, five invented objects.
- `sources.md` — the register, so none of the six is lost, with the viewing
  status of each row.
- This file, rewritten where the frames contradicted the first pass.
- Trap 8 in `findings.md`, and its fix in `css/3d.css`. That one did not come
  from a reel: it came from auditing the demo, and the hero copy was being
  projected off the left of the page between 981 and 1100px wide.
- Nothing else. No dependency, no artwork, no network request.

## 5. Sources

Every link, with its date and status, is in `sources.md`. The four reels were
watched on 21 November 2026 by downloading them and sampling frames; the two
carousels were read. The technical pages behind § 1 and § 2:

- PortSwigger, "Creating a 3D world in pure CSS", 13 October 2021 — <https://portswigger.net/research/creating-a-3d-world-in-pure-css>
- Chrome for Developers, "Performant Parallaxing" — <https://developer.chrome.com/blog/performant-parallaxing>
- Atomic Object, "How to fake a 3D stage", 29 April 2026 — <https://spin.atomicobject.com/how-to-fake-3d-stage>
- MDN, `Element.elementFromPoint` — used for the measurement in § 1 — <https://developer.mozilla.org/en-US/docs/Web/API/Document/elementFromPoint>
- Lenis, issue #534, "Please respect `prefers-reduced-motion`", 31 July 2026 — <https://github.com/darkroomengineering/lenis/issues/534>
- GSAP pricing ("now free") — <https://gsap.com/pricing>
- React Bits — <https://github.com/DavidHDev/react-bits>
- Vanta — <https://github.com/tengbao/vanta>

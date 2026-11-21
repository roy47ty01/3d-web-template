# The reel pass, November 2026

Six links arrived together on 21 November 2026. This is what was in them, what is
taken, and what is refused. The links themselves are in `sources.md`, so they are
never lost to a chat scroll.

## What this pass actually saw

The captions, each page's own description of its image, and the public comments.
**Not the frames.** None of the six was played for this pass, so every technique
named below was named by the post or inferred from its comments, never watched.
`findings.md` § 1 set that precedent about a reel whose frames were unreadable,
and it applies here at full strength: six posts produced one technique the
template does not have, one library question, and four funnels.

## 1. The one technique: a room you browse

@marcelodesignxh, 18 November 2026. The page describes its own image as lighting,
screen, sofa, bedroom. The caption is "Wait for it. 🥷". Its comments name the
trick better than the caption does:

> "How do I do the spatial browsing? Is there a tutorial?"

and, on the same post, the objection, twice:

> "How to make your website annoying and useless"
> "Useless. Not user friendly"

A third comment answers the first: "That reveal was worth the wait 🔥". So one
post, 1.6K likes, and its comment section holds both halves of the argument this
repo is built on. The reveal is the whole point, and the same page is called
unusable by people watching it. That is `README` rule 5 arriving as public
evidence rather than as taste.

### What a room costs without WebGL

A room is the camera the hero already has, with more planes and a floor.
PortSwigger's pure-CSS 3D world (2021) builds one from six absolutely positioned
planes at `translateZ`, with `perspective: 10em` and a `perspective-origin` at eye
height. Chrome's performant-parallaxing note is the cheaper variant: a 1px
perspective with `translateZ` and a compensating scale. Neither needs a script, a
shader or a library.

What a room needs that the hero does not:

- **A floor and a ceiling**, both rotated 90°, plus two side walls. Five or six
  planes, all on one camera.
- **`perspective-origin` at eye height**, roughly 45–55% vertically, so the walls
  converge at the viewer's eye and not at the box's centre.
- **Solid planes or gradients.** A blurred plane is wider than its parent and is
  trap 2; a room built from blurred walls has a scrollbar in it.
- **No text inside the scene.** A room is a picture. The words go in front of it,
  flat, which is `photographs.md` § 2.1's arrangement.
- **A tilt cap of about 3°.** A room tilted ten degrees reads as a broken room,
  not a deeper one.

Every item on that list is vocabulary `css/3d.css` already owns: one camera, one
origin, `preserve-3d`, `translateZ`. None of it is a new dependency.

**Not ported, on purpose.** A primitive with no demo is a claim, not a feature
(`agents/repo-sync.md`), and the room itself was never watched. The list above is
a specification for the day the demo can build one, not shipped code.

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
| @kevin.snippet, 3 Sep | "3 Frontend Libraries… Day 1" | The caption names none of them; 1.9K comments all say the trigger word. |

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

- `sources.md` — the register, so none of the six is lost.
- This file.
- Trap 8 in `findings.md`, and its fix in `css/3d.css`. That one did not come
  from a reel: it came from auditing the demo, and it is the only change to the
  stylesheet in this release. The hero copy was being projected off the left of
  the page between 981 and 1100px wide.
- Nothing else. No dependency, no artwork, no new primitive.

## 5. Sources

Every link, with its date and status, is in `sources.md`. The technical pages
behind § 1 and § 2:

- PortSwigger, "Creating a 3D world in pure CSS", 13 October 2021 — <https://portswigger.net/research/creating-a-3d-world-in-pure-css>
- Chrome for Developers, "Performant Parallaxing" — <https://developer.chrome.com/blog/performant-parallaxing>
- Atomic Object, "How to fake a 3D stage", 29 April 2026 — <https://spin.atomicobject.com/how-to-fake-3d-stage>
- Lenis, issue #534, "Please respect `prefers-reduced-motion`", 31 July 2026 — <https://github.com/darkroomengineering/lenis/issues/534>
- GSAP pricing ("now free") — <https://gsap.com/pricing>
- React Bits — <https://github.com/DavidHDev/react-bits>
- Vanta — <https://github.com/tengbao/vanta>

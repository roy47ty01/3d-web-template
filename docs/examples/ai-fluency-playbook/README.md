# Worked example: AI Fluency Playbook

A shipped course site that applies this repo's rules to a page whose depth is a
WebGL canvas, not CSS layers. Live at
<https://ai-fluency-playbook-ri0jqi.freebuff.site>.

Screenshots were taken on 22 November 2026 but are not stored here; open the
live page for the real thing. Nothing in this note points at a missing image.

## What transferred

The rules, not the files. No line of `css/3d.css` or `js/scene.js` was copied,
and none of the primitives — room, surface, wipe — appears on the page.

- **Text does not move.** Only the artwork card tilts, at most 3.4°/2.6°, and
  only under `(pointer: fine)` with motion allowed. The headline, the body copy
  and the price cards are flat. This is trap 5 applied to a canvas page.
- **The guard refuses.** With `prefers-reduced-motion: reduce`, the scene
  renders one still frame and the tilt handler is never bound — the same refusal
  as `.t3-wipe-live` never being added, rather than a slower animation.
- **The window clips, not the stage.** The hero clips its canvas; the paragraph
  beside it is ordinary flow, so the camera cannot project a sentence off the
  page. Measured below as a zero-overflow check rather than assumed.
- **A glow is not a blurred oversized box.** The halo behind the geometry is an
  additive sprite in the canvas. Nothing on the page is inset by negative
  percentages, so trap 2 has no surface to occur on.
- **Motion stops when it is not being looked at.** `IntersectionObserver` on the
  canvas plus `document.hidden` gate the frame loop, the same instinct as the
  scroll recede: a scene that is off-screen should cost nothing.
- **Print is still a page.** `.lp-scene` is `display: none` in print, so the hero
  prints as type on paper.

## What did not transfer, and why

- **The two files.** The project already loaded three.js (1.30 MB uncompressed,
  `three@0.169.0`) for its course lab. Adding CSS layers beside a WebGL canvas
  would be two cameras on one page with two different responses to the pointer.
  One camera is the rule; the canvas is that camera.
- **The wipe, the room, the surface.** They answer questions this page does not
  ask. There is no before/after pair, no rail of objects, no cut-out subject.
- **`backdrop-filter` over the canvas.** It would flatten nothing (there is no
  `translateZ` beneath it) but it would put a blurred pane above the scene and
  cost a compose pass on every scroll. Rejected on cost, not on correctness.

## Measured, not eyeballed

Chrome, live landing page, 22 November 2026:

| Viewport | `scrollWidth` / `clientWidth` | `h1` left edge inside `.lp-hero` |
|---|---|---|
| 390 | 375 / 375 | 18px |
| 768 | 753 / 753 | 31px |
| 1440 | 1425 / 1425 | 193px |

No horizontal scroll at any of the three; the headline keeps its inset instead
of being projected. The lab's own HUD read **60 fps, 120 line segments, 3 draw
calls** once the counter had settled; it drops while a frame is being read back
for a screenshot, so a capture taken mid-readback is not a performance number.

Not measured: the course at phone width (the captures were desktop), the
signed-in course on the deployed origin — it sits behind sign-in and the owner's
account was not available — and contrast on every label.

## What this folder is

Documentation only. The demo and the template load nothing from here, no page
references it, and the repo still ships zero assets at runtime. The prose,
prices and course names belong to the playbook; none of it is in `css/3d.css`,
`js/scene.js` or `demo/`.

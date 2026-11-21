# Sources

Every external post this repo's research rests on, with the date it was read and
what came of it. A link that is not here is a claim nobody can re-check.

**Status key.** **Read** — caption, comments and page metadata were read. **Not
viewed** — the frames or slides were never watched, so the technique is inferred
from the words rather than seen. **Unreadable** — the platform returned nothing
useful.

Photographs, videos and carousels rot. Read the status before you trust the
contents of a row.

## The November 2026 reel pass — read 21 November 2026

Six links, sent together. All six pages were read the same day; **none of the
six was viewed**, because the video frames were not available to this pass. The
captions, the page's own image description, and the public comments were.

| Link | Who | Posted | What it is | Status | Went to |
|---|---|---|---|---|---|
| <https://www.instagram.com/p/DfrnQFPCfCx/> | @digitalmarketingtrending (Tarun) | 13 Nov 2026 | A prompt-pack funnel: "1000s AI codes", ten categories of AI image prompts, comment-to-receive. | Read, not viewed | Not used. Not 3D website material at all — see `reel-pass-november-2026.md` § 3. |
| <https://www.instagram.com/reel/Df56UBEBL5Q/> | @marcelodesignxh (Marcelo Cedeno) | 18 Nov 2026 | A 3D-website reel. Page description: lighting, screen, sofa, bedroom. Caption "Wait for it. 🥷 Save this for next!" | Read, not viewed | `reel-pass-november-2026.md` § 1 — the only technique in the set the template does not already have, and its comment section is the most useful evidence in the batch. |
| <https://www.instagram.com/reel/Ddh2J6Zppgb/> | @fifbuilds (Fiona) | 20 Sep 2026 | "The most insane 3D, scroll, text & UI animation effects you've seen are free on GitHub." Names four repos. | Read, not viewed | `reel-pass-november-2026.md` § 2, and the library facts in § 2. |
| <https://www.instagram.com/reel/Df8EvNKT762/> | @tmvdesignstudio | 20 Nov 2026 | A course funnel: "the moment I switched from basic template looking websites…", comment "LAB" for access. | Read, not viewed | `reel-pass-november-2026.md` § 3. Its premise is rejected; its diagnosis is already `findings.md` § 2. |
| <https://www.instagram.com/reel/Dc1ENsHzNSj/> | @kevin.snippet | 3 Sep 2026 | "3 Frontend Libraries to Build Premium Websites – Day 1". Caption names none of them; the names are in the frames. | Read, not viewed | Nothing ported. Recorded because the names are unreadable and the post is engagement bait — see § 3. |
| <https://www.instagram.com/p/DfU1oermXvT/> | @himanshubuilds (Himanshu Hingorani) | 4 Nov 2026 | A carousel promoting scrolltide.co: pick a site, copy its prompt, paste into an AI tool, rebrand. | Read, not viewed | Already written up in `floating-window-pass.md` and `3d-web-templates.md`. |

## Links carried inside those posts

| Link | What it is | Taken? |
|---|---|---|
| <https://github.com/darkroomengineering/lenis> | Smooth-scroll library by darkroom.engineering. | Rejected — a dependency, and it changes the scroll the reader controls. See `reel-pass-november-2026.md` § 2. |
| <https://github.com/greensock/GSAP> | Animation library, now free including the former Club plugins. | Rejected — a dependency for something `scene.js` does in forty lines. Licence note in § 2. |
| <https://github.com/tengbao/vanta> | Animated 3D backgrounds, rendered by three.js (WebGL) or p5.js. About 120kb gzipped, mostly three.js. | Rejected — WebGL, a script tag, and a network request. |
| <https://github.com/DavidHDev/react-bits> | 216 animated React components and backgrounds, MIT + Commons Clause. | Rejected — React only, and the licence is not plain MIT. |
| <https://www.scrolltide.co/why-scrolltide> | The prompt library behind two of the six posts. | Written up in `3d-web-templates.md`. |

## Earlier passes

The sources for the traps and the techniques — the ayoships reel, the six
surveyed repositories, the MDN and W3C pages — are listed at the end of
`findings.md` and `photographs.md`. They are not repeated here; one list per
document, so there is one place to correct.

## Adding one

1. Strip the tracking parameters. `instagram.com/reel/XXXX/?igsh=…` becomes
   `instagram.com/reel/XXXX/`.
2. Add the row: link, who, the date it was posted, what it is in one line.
3. Set the status honestly. "Read, not viewed" is the normal entry.
4. Say where it went — a section of a doc, or "nothing ported" with the reason.
5. Date the pass, not the row. A batch read on one day is one date.

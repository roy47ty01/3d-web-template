# Sources

Every external post this repo's research rests on, with the date it was read and
what came of it. A link that is not here is a claim nobody can re-check.

**Status key.** **Viewed** — the video was downloaded and sampled frame by frame,
so the technique was seen. **Heard** — an audio track was transcribed, so a
spoken claim is quoted from the sound and not from the caption. **Read, not
viewed** — caption, comments and page metadata only, so the technique is
inferred from the words. **Unreadable** — the platform returned nothing useful.

Photographs, videos and carousels rot. Read the status before you trust the
contents of a row.

## The November 2026 reel pass — read 21 November 2026

Six links, sent together. All six pages were read on the day. The four reels
were then downloaded without a login and sampled at nine frames each, so those
four are **viewed**; the two carousels were not sampled and stay **read only**,
which is why their technique is still inferred from words and comments.

| Link | Who | Posted | What it is | Status | Went to |
|---|---|---|---|---|---|
| <https://www.instagram.com/p/DfrnQFPCfCx/> | @digitalmarketingtrending (Tarun) | 13 Nov 2026 | A prompt-pack funnel: "1000s AI codes", ten categories of AI image prompts, comment-to-receive. | Read, not viewed | Not used. Not 3D website material at all — see `reel-pass-november-2026.md` § 3. |
| <https://www.instagram.com/reel/Df56UBEBL5Q/> | @marcelodesignxh (Marcelo Cedeno) | 18 Nov 2026 | A 9.83s montage of four labelled cards — Transition as Scroll, Live 3D hero, Spatial Browsing, Touchable Surface — cut together with a horizontal smear. | Viewed | `reel-pass-november-2026.md` § 1 — three of the four now shipped as `.t3-wipe`, `.t3-room` and `.t3-surface-*`, each redrawn rather than copied. Its comment section is the most useful evidence in the batch. |
| <https://www.instagram.com/reel/Ddh2J6Zppgb/> | @fifbuilds (Fiona) | 20 Sep 2026 | 54s. "The most insane 3D, scroll, text & UI animation effects you've seen are free on GitHub." Names four repos in caption, on screen and in the voice-over. | Viewed, heard | `reel-pass-november-2026.md` § 2, the library facts in § 2, and the transcript in `transcripts-november-2026.md`. |
| <https://www.instagram.com/reel/Df8EvNKT762/> | @tmvdesignstudio | 20 Nov 2026 | 38s, a course funnel: "the moment I switched from basic template looking websites…", comment "LAB" for access. | Viewed | `reel-pass-november-2026.md` § 3. Its premise is rejected; its diagnosis is already `findings.md` § 2. |
| <https://www.instagram.com/reel/Dc1ENsHzNSj/> | @kevin.snippet | 3 Sep 2026 | 41s. "3 Frontend Libraries to Build Premium Websites – Day 1". Four demo sites on a monitor, captioned "buttery smooth scrolling", "Scroll Animation", "make your site". | Viewed | Nothing ported. The frames settle it: the library names never appear on screen, and the public download has no audio track at all, so they are not recoverable here. See § 3 and `transcripts-november-2026.md`. |
| <https://www.instagram.com/p/DfU1oermXvT/> | @himanshubuilds (Himanshu Hingorani) | 4 Nov 2026 | A carousel promoting scrolltide.co: pick a site, copy its prompt, paste into an AI tool, rebrand. | Read, not viewed | Already written up in `floating-window-pass.md` and `3d-web-templates.md`. |

**Audio.** Three of the four reels arrive from a logged-out download as
video-only: `yt-dlp -F` lists no audio representation at all and the file has a
single stream. Only the 54-second library reel carries a track, and it was
transcribed — `transcripts-november-2026.md`. Nothing spoken in the other three
is quoted anywhere in this repo, because nothing spoken in them can be heard
here.

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

# Changelog

Versions are `MAJOR.MINOR.PATCH`:

- **PATCH** — a fix, no surface change.
- **MINOR** — a new primitive or token.
- **MAJOR** — an existing class or token changes meaning.

## 0.1.0 — 17 November 2026

First extraction. Everything here was shipped on a real static page first.

**Added**

- `css/3d.css` — `.t3-scene`, `.t3-stage`, `.t3-pop`, `.t3-sticker`, `.t3-halo`,
  `.t3-card`, `.t3-numbered`, plus the motion, touch, print and contrast guards.
- `js/scene.js` — pointer tilt in ~120 lines, gated on a fine pointer and
  `prefers-reduced-motion`. Auto-wires `[data-t3-tilt]`.
- `demo/` — a working page exercising every primitive, light and dark.
- `docs/findings.md` — the research, the techniques with code, and the five traps.
- `agents/repo-sync.md` — the agent that keeps this repo in step with its source.

**Fixed before release**

- A halo built as a blurred box was 14% wider than its parent and produced a
  19px horizontal scrollbar on a 390px phone. It is a `box-shadow` now.
- A sticker themed with CSS variables became a dark hole inside a light
  illustration in dark mode. Its colours are now literal.
- White on the mid-tone accents measured 3.4–4.4:1. The template documents
  darkening the accent rather than the text.

**Not ported**

- The source project's artwork, prices, section names and prose. Techniques only.

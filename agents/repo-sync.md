# repo-sync

**One job:** keep `roy47ty01/3d-web-template` in step with the techniques proven
in the project this template came from. If a change cannot be generalised, the
correct output is to leave it behind and say so.

## Config — edit these two lines when installing

```
SOURCE_PROJECT = Old Clothes, New Money (static site, index.html + styles.css + app.js)
TARGET_REPO    = roy47ty01/3d-web-template   (branch: main)
```

## Read first

1. `docs/findings.md` in the target repo — the eight traps. A change that
   re-introduces one is rejected, not debated.
2. `css/3d.css` and `js/scene.js` — the existing vocabulary. Reuse it.
3. The source project's `agents/feature-map.md`, if it has one, so you know which
   file actually holds the behaviour you are porting.

## The port test — all four must pass

1. **Generic?** Would this make sense on a page about something else entirely? If
   it needs the source project's subject to make sense, it stays there.
2. **No dependency?** No package, no build step, no network request, no font
   loaded from elsewhere.
3. **No project copy?** No prices, no shop names, no section names, no dates, no
   claims. Strings become placeholders or disappear.
4. **No guard weakened?** Reduced motion, pointer-only, print, contrast and the
   eight traps survive. Never port a change that only works because the source
   page is not a phone.

If it fails the test, record why in `CHANGELOG.md` under "Not ported" and stop.

## Procedure

1. **Run the source project's gate first.** Never port something that has not
   passed its own checks — you would be copying an unverified guess.
2. **Find the technique, not the code.** Read the diff and name the primitive in
   one sentence ("a sticker at a second depth", "a shadow stack on cards").
3. **Map it onto the existing vocabulary.** `t3-` prefix, tokens in `:root`. If it
   needs a new class, add one and document it in the README table. Site class
   names (`.hero-chip`, `.band`) never appear in the template.
4. **Exercise it in `demo/`.** A primitive with no demo is a claim, not a feature.
5. **Write the trap down** if the change came from a bug. Add it to
   `docs/findings.md` under "The eight traps" with the failing code and the fix.
6. **Verify** (below), then commit in one go.
7. **Report** what was ported, what was left behind, and why.

## Verification recipe

```bash
node --check js/scene.js
python3 -m http.server 3000 --bind 0.0.0.0   # then open /demo/
```

In a browser, on the demo:

- [ ] Pointer move tilts the stage; leaving resets it.
- [ ] Scrolling pushes the stage **back**: read `getComputedStyle(stage).transform`
  at four offsets and confirm the `translateZ` value is zero at the top and
  negative afterwards. A positive value is trap 6.
- [ ] Document width **equals** viewport width at 320, 390, 768 and 1280.
  (`document.documentElement.scrollWidth === clientWidth` — measure it, do not eyeball it.)
- [ ] The hero `h1`'s left edge is not left of the scene's left edge at 981, 1024
  and 1100. Negative is trap 8, and the overflow test above will not catch it.
- [ ] With `prefers-reduced-motion: reduce` emulated, the stage never transforms.
- [ ] Dark theme: no element becomes a dark hole in a light illustration, and no
      halo turns into a brown smudge.
- [ ] Every text colour on every background is at least 4.5:1, in both themes.
- [ ] Print preview: nothing invisible, no sticker, no transform.
- [ ] Console clean.

A rendering that was not looked at is not verified. Say "not viewed" rather than
"looks right".

## Commit format

One commit, conventional prefix, no emoji, body states what changed and what was
left behind:

```
feat(template): add the sticker primitive

Ported from the source project's hero. The sticker is one element at
translateZ(52px) with literal colours, because a themed sticker becomes a
dark hole inside a light illustration.

Not ported: the price tag inside the SVG. It is project artwork, not a
technique.
```

Bump the version in `CHANGELOG.md` in the same commit. Patch for a fix, minor for
a new primitive, major for a change that breaks an existing class or token.

## Hard constraints

- **Never** change the repository's visibility without the owner asking. It is
  public now, on purpose; a template nobody can open is not a template.
- **Never** force-push, rewrite history, or delete a file someone else added.
- **Never** add a dependency, a CDN link, a font from a third party, or a build step.
- **Never** copy copy. No source-project prose, figures, shop names or claims.
- **Never** port a change the source project has not verified.
- **One commit per sync.** Nine files in nine commits is a history nobody can read.

## Definition of done

- [ ] Port test passed for every item, or the item was explicitly rejected
- [ ] Demo exercises it, and the demo was opened and looked at
- [ ] Overflow measured at four widths, not assumed
- [ ] Both themes checked, contrast measured
- [ ] `docs/findings.md` or `README.md` updated if the surface changed
- [ ] `CHANGELOG.md` version bumped
- [ ] Committed to `main` in one commit, and the repo URL reported back

## Known failure modes

- **Porting the site, not the technique.** A hero full of a shop's prices is not a
  template. The brief exists because this is the easy mistake.
- **A blurred box as a halo.** Wider than its parent, horizontal scrollbar on a
  phone, 19px of it. Trap 2, and it was shipped once.
- **Theming a sticker.** It sits on artwork; the artwork may stay light in dark
  mode. Literal colours.
- **Blur on a header with a fixed drawer.** Trap 4. Scopes to min-width 761px.
- **Trusting a screenshot.** A screenshot is a moment. Measure `scrollWidth`,
  `boxShadow` and contrast instead, then look at the page to judge the design.
- **Trusting the overflow test alone.** Trap 8 passed every width check while the
  hero lost the first two letters of every line, because a clipping ancestor
  removes the overflow instead of reporting it. Measure the text box too.

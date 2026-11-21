# What the reels said

Watching a reel frame by frame recovers what is on screen. It does not recover
what is only spoken — and one of the six links in the November 2026 pass names
its subject out loud and never prints it. So the audio was transcribed as well.

This is the record of that, including the four-fifths of it that could not be
done.

## The short version

| Reel | Length | Audio track in the public file | Transcribed |
|---|---|---|---|
| <https://www.instagram.com/reel/Ddh2J6Zppgb/> (@fifbuilds) | 54s | yes, `aac`, stereo | yes — below |
| <https://www.instagram.com/reel/Df56UBEBL5Q/> (@marcelodesignxh) | 9.8s | none | no |
| <https://www.instagram.com/reel/Df8EvNKT762/> (@tmvdesignstudio) | 38s | none | no |
| <https://www.instagram.com/reel/Dc1ENsHzNSj/> (@kevin.snippet) | 41s | none | no |

"None" is not "too quiet to hear". `yt-dlp -F` lists every format the platform
offers to a logged-out request, and for those three every row is marked *video
only* — there is no audio representation to download. The files that arrive have
one stream in them (`ffmpeg -i`: a single `Video:` line, no `Audio:` line). A
signed-in session may be served the audio; an anonymous one is not.

## The method

```bash
yt-dlp -F "https://www.instagram.com/reel/<id>/"     # is there an audio format?
yt-dlp -f best -o "/tmp/<id>.%(ext)s" "https://www.instagram.com/reel/<id>/"
python3 - <<'PY'                                     # decode with ffmpeg, not PyAV
import subprocess, numpy as np, imageio_ffmpeg
ff = imageio_ffmpeg.get_ffmpeg_exe()
raw = subprocess.run([ff, "-v", "error", "-i", "/tmp/<id>.mp4", "-ac", "1",
                      "-ar", "16000", "-f", "s16le", "-"], capture_output=True,
                     check=True).stdout
audio = np.frombuffer(raw, np.int16).astype(np.float32) / 32768.0
from faster_whisper import WhisperModel
model = WhisperModel("small.en", device="cpu", compute_type="int8")
for s in model.transcribe(audio, language="en", vad_filter=True, beam_size=5)[0]:
    print(f"[{s.start:6.2f} - {s.end:6.2f}] {s.text.strip()}")
PY
```

`small.en`, `int8`, CPU. The model is a download and therefore **not** part of
this repo's promise — it is a tool used to read a source, not a dependency of
the template. Nothing here ships with it.

The transcript below is the model's output, cleaned only where the model split a
word across a segment boundary. Timings are the model's. Every misspelling of a
product name is left in and corrected in a note, because a transcript edited
until it reads well is no longer evidence.

## The 54-second library reel

@fifbuilds, 20 September 2026. Spoken:

> [ 0.00 – 4.00] If you've ever seen one of these insane visual effects online,
> you're like, I could never build that.
> [ 4.00 – 8.56] Yes you can, because GitHub is your new design asset library,
> and I promise you it's not intimidating.
> [ 8.56 – 12.72] Since you like this one, this is going to be my new series
> where I find and test all the repos I can.
> [12.72 – 17.04] Let's get into it. The first one is a classic called "Linus".
> It gives you that smooth velocity
> [17.04 – 21.68] scroll that probably 90% of awards websites are using. You
> just drop it in and instantly
> [21.68 – 25.44] upgrade your website. I honestly use it for every single
> project I do. The second one's called
> [25.44 – 30.32] "Gsap", and this is the animation library that pros have been
> using for years. You can do every scroll,
> [30.32 – 35.44] text, image, UI animation you could possibly think of. Even
> some of these websites are using Gsap.
> [35.44 – 40.32] The third one is called "Vanta", and this is your fancy 3D
> animated background, WebGL, that you can
> [40.32 – 45.60] paste in in about five lines of code, and you get these
> beautiful clouds, birds, waves for your
> [45.60 – 51.04] hero sections. The last one is blowing up right now for a
> reason: "Reactbit". A huge library of
> [51.04 – 54.80] copy-paste animations for React. Let me know if you want to see
> more, or get a tutorial.

**Three names are misheard, and the caption fixes all three.** "Linus" is Lenis,
"Gsap" is GSAP, "Reactbit" is React Bits. The audio alone would have produced a
library called Linus; the caption, the on-screen list and the repository names
agree on the other three, and the repos were checked in `sources.md`. This is the
normal shape of a transcript: good enough to follow, not good enough to copy a
proper noun from.

**What the voice adds over the caption.** The caption gives four names. The
audio gives the claims attached to them, and the claims are the part that
matters when deciding whether to take a dependency:

- Lenis is "that smooth velocity scroll that probably 90% of awards websites are
  using" — a popularity claim with no source, which is exactly why the Lenis
  entry in `reel-pass-november-2026.md` § 2 rests on the library's own issue
  tracker instead.
- GSAP is "the animation library that pros have been using for years".
- Vanta is a WebGL background you "paste in in about five lines of code". Five
  lines of code is true and is also the whole argument against it here: the five
  lines are a script tag and a WebGL context.
- React Bits is "blowing up right now", which is a trend, not a property.

None of this changes a decision. It does explain why the reel is persuasive:
every claim is about effort saved, and none is about what the page weighs.

## The reel whose speech is lost

@kevin.snippet, 3 September 2026: "3 Frontend Libraries to Build Premium
Websites – Day 1". The frames show four sites on a monitor and three captions —
"buttery smooth scrolling", "Scroll Animation", "make your site" — and the
library names never appear on screen.

This document previously said the names "are spoken". That was inference from a
caption about three libraries, not something anyone heard, and the correction is
that **the public file has no audio track at all**, so whether they are spoken
cannot be checked here. The honest statement is narrower than the old one:

- The names are not on screen. That is measured, over five sampled frames.
- The public download has no audio. That is measured, in the format list and in
  the container.
- The names are therefore not recoverable from this source at all without a
  signed-in session — not by watching harder, and not by transcribing.

Nothing was ported from that reel either way. The correction matters because the
repo's rule is to label the unverified, and "they are spoken" was a guess wearing
an observation's clothes.

## What this changes in the repo

- `docs/sources.md` gains a "Heard" status and the one reel that earned it, plus
  the note that the other three carry no audio.
- `docs/reel-pass-november-2026.md` § 3 is corrected: the library names are not
  on screen *and* not in the audio, so the reel cannot name them.
- Nothing in `css/3d.css` or `js/scene.js`. A transcript is evidence about a
  source, not a feature.

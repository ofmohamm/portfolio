# Responsiveness proposal: omarmohammed.co

> **STATUS — implemented on branch `perf/static-media-and-hardening` (2026-09-01).**
>
> Measured first load went from **5.72 MB to 206 KB, a 96.4% reduction.**
> JavaScript went from 1.18 MB uncompressed to three small inline modules.
>
> What changed versus this document: the 3D model and the demo video were
> **replaced with still images** rather than optimized, so the entire
> model-compression and mesh-merging plan (old Phase 3) is moot and has been
> struck. Sunny-derived items and a reliability section were added. The
> Keystatic CMS was removed, which also required replacing the content layer.
>
> Corrections to figures below: the GLB compressed to **6%** with brotli, not
> 12% as originally written from a gzip test. That number is now historical,
> since the model is gone.
>
> ### What shipped
>
> | Item | Result |
> |---|---|
> | 4.9 MB GLB + `model-viewer` | deleted |
> | Demo video (autoplay ×2) | deleted |
> | React + 5 packages | deleted |
> | Custom cursor | deleted |
> | Animated particle canvas | now drawn once, static |
> | Google Fonts (third-party) | self-hosted, preloaded, metric-matched fallbacks |
> | Project images | Astro pipeline: 192 KB → 19 KB, 468 KB → 29 KB |
> | Nav logo | 85 KB → 3 KB |
> | Hero signature | 62 KB → 12 KB (palette PNG beat WebP 3:1 on line art) |
> | Favicon | 50 KB → 14 KB |
> | Unreferenced assets | 1.4 MB deleted |
> | Dependencies | 1,351 packages → 440 |
> | Security headers | 1 of 7 → 6 of 7 + report-only CSP |
> | Keystatic admin route | removed; site is now fully static, no serverless functions |
>
> Largest remaining asset is the font pair at 105 KB, which is now the obvious
> next target if you want to go further (subset to used glyphs only).
>
> ### Added from sunny-wu.ca
>
> - Self-hosted fonts with `rel=preload`, no third-party origin
> - Metric-matched `@font-face` fallbacks so the font swap causes no layout shift
> - `unicode-range` limited to Latin
> - `<noscript>` reveal fallback (see Reliability below)
> - Anchor IDs per project, so `#privacy-based-tracker` is a shareable link
> - `rel=preload as=image` on the above-the-fold image
>
> Deliberately **not** copied: Sunny renders most page content client-side from a
> React payload, so crawlers without JS see almost nothing. This site keeps its
> content in the server HTML, which is better. Sunny also has no security headers
> at all and ships more JavaScript than this site now does.
>
> ### Reliability requirements now covered
>
> | Requirement | How |
> |---|---|
> | Page readable with JavaScript disabled or broken | `<noscript>` forces reveal sections visible; content is in the server HTML |
> | No layout shift on font load | metric-matched fallback faces |
> | No layout shift on image load | explicit `width`/`height` on every image |
> | No unbounded animation | particle field draws once; no `requestAnimationFrame` loop anywhere |
> | No leaked listeners | the old resize-listener leak is gone with the component |
> | Reduced-motion respected | CSS media query, not a JS probe after hydration |
> | Repeat visits cheap | hashed assets `immutable`; `public/` revalidates weekly |
> | Build reproducible | `npm ci` in CI, exact lockfile |


---

## TL;DR

Your site downloads a **huge 3D file of your PCB on every single visit**, even
though nobody sees it until they click the project card. That file, plus the 3D
graphics library needed to display it, is almost everything your site downloads.
Both can wait until someone actually clicks.

Separately, your **custom mouse cursor is deliberately slowed down** so it glides
behind your real pointer. That one detail is probably why the site "feels laggy"
more than anything else, because the pointer is the thing people notice lag in
first.

Neither is hard to fix. The site's structure, styling and hosting are all fine.

---

## What's actually wrong

### 1. The 3D model loads before anyone asks for it

The PCB model is by far the largest thing on your site. Right now the page starts
downloading it the moment someone lands on the homepage, and it also builds the
whole 3D scene in the background for a popup that hasn't been opened yet.

The card people see first is just a photo. So the model isn't needed until a
click happens.

**Fix:** load it when the popup opens. Two small changes.

### 2. The 3D file is sent without being compressed

Your host compresses your text and code automatically, but not this file, because
of how the file type is labelled. Compressing it shrinks it dramatically with no
visible difference at all.

**Fix:** a few lines of hosting config.

### 3. The 3D graphics library loads on every page

The library that draws the model is loaded on every page of the site, including
your 404 page. It's one of the biggest downloads you have, and only one popup
uses it.

**Fix:** load it at the same moment you load the model.

### 4. The custom cursor is the "laggy" feeling

The cursor hides your real mouse pointer and replaces it with a dot that
*catches up* to where your mouse actually is. It's smoothed on purpose, for
looks. The result is a pointer that's always slightly behind your hand.

People are extremely sensitive to this. It reads as "the whole website is slow"
even when nothing else is.

It also resizes itself by animating its width and height, which forces the
browser to recalculate page layout repeatedly, and it pulls in an entire
UI framework just to exist.

**Fix, best option first:**
1. Delete it. Your real cursor is drawn by your operating system and has zero
   delay. This is the single biggest win available and it takes minutes.
2. Keep the look, remove the delay: make it follow the mouse exactly instead of
   catching up, and grow/shrink it in a way that doesn't disturb page layout.

### 5. The floating dot background never stops running

The animated dots in your hero section draw lines between every nearby pair of
dots, recalculated constantly. That work continues even after you scroll past the
hero, so it's still running at full effort while someone reads your Projects and
Skills sections. The link you sent me lands directly on Skills, where the
animation is invisible and still burning through your laptop's battery.

**Fix:** pause it when it scrolls out of view, and draw the lines in batches
instead of one at a time. Also worth reducing the number of dots, since the cost
grows much faster than the count.

### 6. Smaller things

- **Two videos autoplay**, and one of them is inside a popup that's closed.
- **Your images are unoptimized.** They sit outside Astro's image pipeline, so
  they never get converted to modern formats or resized to the size they're
  actually displayed at. Your favicon in particular is enormous for what it is.
- **Nothing in your images/videos folder is cached**, so returning visitors
  re-download media that never changes.
- **Fonts load from Google**, which adds an extra round trip before any text
  appears on screen.
- **Four unused packages** are installed but imported nowhere.

---

## The plan

**Phase 1: half a day.** Fix the hosting config. Stop pre-loading the 3D model
and library. Move both to the moment the popup opens. Stop the hidden video
autoplaying.

This removes roughly **all but a fraction of what your site downloads**. It's
almost entirely deletion and config, not new code.

**Phase 2: about a day.** This is the phase that fixes "laggy." Resolve the
cursor. Rewrite the dot background so it pauses when off-screen. Drop the UI
framework that only those two features needed.

**Phase 3: about a day.** Optimize the 3D model itself (see the note below,
it's worth doing properly). Run your images through Astro's image pipeline.
Host the fonts yourself. Delete the unused packages.

### A note on the model itself

The model isn't just large, it's built inefficiently. It was exported from KiCad,
which turns every single component, pad and via into its own separate piece for
the graphics card to draw. There are thousands of these pieces, each holding a
tiny sliver of the actual shape.

That's why the popup is heavy even after it's finished loading. Standard tooling
can merge those thousands of pieces into a couple dozen and compress what's left,
without changing how it looks. This is the difference between a popup that opens
instantly and one that stutters.

---

## What I couldn't check

I didn't run a real browser profiling session. The headless browser this machine
would need isn't installed, and installing it is a sizeable download I didn't
want to make without asking. So the frame-rate claims below are worked out from
reading the code, not recorded from a live run.

If you want measured before-and-after numbers, say so and I'll install it and
capture proper traces.

### How you'll know it worked

- The homepage downloads a small fraction of what it does today
- No stutter when scrolling from top to bottom
- The cursor feels immediate, or the real cursor is back
- Returning visitors download no media at all
- The 3D popup opens without a pause

---
---

# Appendix: the technical detail

Analysis date: 2026-09-01
Analyzed commit: `f215c4e` (origin/main, matches production)
Host: Netlify, Astro 5.17.1 static output with the Netlify adapter

Every number here was measured over the wire against production or computed from
the deployed source and the GLB's own glTF header. Frame costs are derived from
the code's work per frame rather than recorded, for the reason given above.

## A1. Measured baseline: first load of `/`

| Asset | Over the wire | Uncompressed |
|---|---:|---:|
| `model3d.glb` | **4,791 KB** | 4,791 KB |
| `model-viewer.DTFmNSuG.js` | 252 KB | **958 KB** |
| React DOM + React + jsx-runtime | 58 KB | 187 KB |
| `soq-1/video.mp4` (autoplaying) | 241 KB | 241 KB |
| PNG/JPG images (4 files) | 226 KB | 226 KB |
| HTML | 6.7 KB | 27.6 KB |
| CSS (2 files) | 6.4 KB | 27.4 KB |
| `CustomCursor` + `InteractiveBackground` + loader | 2.9 KB | 7.1 KB |
| Google Fonts (2 variable families, 4 axes, italics) | not measured | third-party, render-blocking |
| **Total** | **~5.72 MB** | **~6.62 MB** |

JavaScript alone: **1.18 MB uncompressed, 320 KB over the wire.**

Server-side is healthy: TTFB 481 ms cold, edge-cached after, HTTP/2, brotli on
text, HSTS present. Nothing to fix in hosting itself.

Estimated first load after Phase 1: **~700 KB.**
Estimated first load after Phase 2: **~110-150 KB wire.**

## A2. P0-1 — the GLB is served with no compression

`Cache-Control: public, max-age=0, must-revalidate`,
`Content-Type: application/octet-stream`. Netlify does not compress
`application/octet-stream`; requesting `Accept-Encoding: br` or `gzip` returns all
4,905,868 bytes unchanged.

Locally, `gzip -9` takes the same file to **605,626 bytes, 12% of the original**.
So 4.3 MB of the site's 5.7 MB is compressible padding shipped raw.

```toml
[[headers]]
  for = "/models/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

Netlify compresses by content type, so either serve the model as a type it will
compress, or precompress at build time and serve `.glb.br` with an explicit
`Content-Encoding`.

## A3. P0-2 — nothing in `public/` is cached

Every image, video, the model, the favicon and the OG image return
`Cache-Control: max-age=0, must-revalidate`. Only Astro's hashed `/_astro/*` files
are `immutable`. There is no `[[headers]]` block in `netlify.toml` at all, which
is the root cause of both this and the missing security headers in the companion
report.

```toml
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/videos/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

Repeat visits currently revalidate ~1.2 MB of static media that never changes.

## A4. P0-3 — the 4.9 MB model loads for a closed modal

Two separate mechanisms pull it in:

- `src/pages/index.astro:68-69` emits `<link rel="prefetch" href={p.model3d} />`
  for every project with a model, on page load.
- `src/components/PCBViewer.astro:42` sets `loading="eager"`, so `model-viewer`
  fetches and builds the scene as soon as the element connects. A closed
  `<dialog>` still has its children in the DOM, so this runs while nothing is
  visible.

The card already uses a static poster (`/images/posters/flood-sensor-pcb.jpg`,
31 KB), so the model is only needed after a click.

Fix: delete the `rel="prefetch"` link; switch to `loading="lazy"` plus
`reveal="manual"`; or best, omit `src` entirely and assign it in the existing
`data-open` click handler in `src/pages/index.astro`.

Saving on first load: **4.79 MB, 84% of the page.**

## A5. P0-4 — `model-viewer` imported on every page

`src/layouts/BaseLayout.astro:101-105`:

```js
if (!customElements.get('model-viewer')) {
  import('@google/model-viewer');
}
```

In the base layout, so the 404 page and any future page pay 958 KB of parse and
compile for a component one modal uses. It bundles three.js.

```js
btn.addEventListener('click', async () => {
  if (!customElements.get('model-viewer')) await import('@google/model-viewer');
  viewer.src = '/models/flood-detection-sensor-pcb/model3d.glb';
  dialog.showModal();
});
```

Saving on first load: **252 KB wire, 958 KB parse.**

## A6. P0-5 — the custom cursor

`src/components/CustomCursor.tsx`. Four problems in one component.

**The lerp.** Lines 33-38:

```js
const ease = 0.25;
cursorX += (targetX - cursorX) * ease;
cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
```

Remaining error after n frames is `0.75^n`. At 60 fps that is **94% closed after
~170 ms, 99% after ~270 ms**. Humans notice pointer lag from around 20 ms.
Meanwhile `cursor: none !important` on `*` removes the accurate native pointer.

**The rAF loop never stops.** Line 40 calls `requestAnimationFrame` unconditionally
and the cleanup at lines 83-88 never calls `cancelAnimationFrame`. It writes a
transform every frame even when the mouse is still, and survives unmount.

**Document-wide hover detection.** Lines 44-71 attach `mouseover` to `document`,
run up to four `closest()` calls plus a `querySelector` per event, then `setState`,
re-rendering through React on every hover change.

**Transitions on layout properties.** The injected style transitions `width`,
`height` and `margin`. Every hover change starts a 150 ms transition forcing
layout and paint on a `position: fixed`, `z-index: 9999` element.

Remediation options, best first:
1. Remove the component.
2. Set `ease = 1`, or drive the element from the `mousemove` event with no rAF
   loop. Transition only `transform`, `opacity`, `background`. Use `scale()`
   instead of `width`/`height`/`margin`. Replace the `document` listener with
   CSS-only hover states, or a single delegated `closest('a,button')` check.
3. Gate on `(hover: hover) and (pointer: fine)` in CSS rather than measuring in JS
   post-hydration, so `cursor: none` never applies on touch.

## A7. P0-6 — drop React

`CustomCursor` and `InteractiveBackground` are the only React components, both
`client:load`, so hydration is on the critical path. They compile to 3.8 KB and
2.3 KB. React DOM to run them is 187 KB uncompressed.

Neither needs React. `InteractiveBackground` is a `useRef` on a canvas plus a
`useEffect` that never re-runs. `CustomCursor` uses `useState` only to toggle a
size value CSS can express.

Rewriting both as plain scripts removes **187 KB uncompressed / 58 KB wire** and
lets you drop `@astrojs/react`, `react`, `react-dom`, `@types/react` and
`@types/react-dom`.

## A8. P1-1 — the particle canvas is O(n²) and never pauses

`src/components/InteractiveBackground.tsx`.

Particle count caps at 120 on desktop (line 53). The connection loop at lines
133-148 is nested inside `particles.forEach`, giving `120 × 119 / 2 = 7,140` pair
checks per frame, each with a `Math.sqrt`. That is **428,400 square roots per
second** at 60 fps.

Worse for the GPU: each pair under 120 px does its own
`beginPath`/`moveTo`/`lineTo`/`stroke`. On a 1440×900 canvas that averages roughly
**250 separate `stroke()` calls per frame**. Individual `stroke()` calls are the
expensive part of Canvas2D, not the arithmetic.

Line 151 calls `requestAnimationFrame(animate)` with no visibility check, so the
simulation runs at full cost while the hero is off-screen. `/#skills` lands with
the canvas entirely out of view and the simulation at 100%.

Line 88 also calls `Math.random()` once per particle per frame.

Fixes by payoff:
1. `IntersectionObserver` on the canvas, cancel the rAF when the hero leaves the
   viewport, restart on return. Also pause on `document.visibilitychange`.
2. Bucket connections into 3-4 opacity levels, build one `Path2D` per bucket,
   `stroke()` once per bucket. ~250 draw calls becomes 4.
3. Drop the count to ~60 (pair checks fall to 1,770, a 4× cut, since cost is
   quadratic), or bin particles into a uniform 120 px grid and compare only
   neighbouring cells.
4. Compare squared distances, skip the `sqrt` for the threshold test.
5. Move the `Math.random()` drift jitter to every Nth frame.

**Bug to fix while in here:** line 171 registers the resize listener as an inline
arrow, line 181 removes `setCanvasSize`, a different reference. The resize
listener is never removed and accumulates on every remount.

## A9. P1-2 — two videos autoplay, one in a closed dialog

`src/pages/index.astro:131-140` (card) and `202-210` (modal) both set `autoplay`
and `loop`. `preload="metadata"` is overridden by `autoplay`, which needs media
data. The modal copy sits in a closed `<dialog>`, a second decode pipeline for
something nobody is viewing.

Fix: drop `autoplay` from the modal video, call `.play()` on dialog open. Gate the
card video on an `IntersectionObserver`, or use the poster and play on hover,
matching what the PCB card already does.

## A10. P1-3 — images bypass the asset pipeline

| File | Size | Notes |
|---|---:|---|
| `og-image.png` | 405 KB | social preview, PNG |
| `mo-logo.png` | 88 KB | nav logo, intrinsic 841×428, displayed tiny |
| `logo.png` | 62 KB | hero signature |
| `favicon.png` | 50 KB | a favicon |
| `mo-mark.png` | 846 KB | committed, not referenced in built HTML |

Everything is in `public/`, which bypasses Astro's asset pipeline: no WebP/AVIF,
no `srcset`, no width-appropriate resizing.

Fix: move into `src/assets/` and use `astro:assets` `<Image>` / `<Picture>`.
Expect 60-80% off each. Delete `mo-mark.png` if unused. Saving: ~150-180 KB on
first load, 846 KB out of the repo.

## A11. P1-4 — Google Fonts is render-blocking

`src/layouts/BaseLayout.astro:36` loads two variable families (DM Sans, Fraunces)
with optical-size and weight axes plus italics, as a blocking stylesheet from a
third-party origin. `preconnect` and `display=swap` are already set, which is the
right start, but the stylesheet still blocks first render and adds a second
origin's DNS, TLS and round trip before text paints.

Fix: self-host subset `woff2` in `src/assets/fonts/`, declare `@font-face` in
`global.css` with `font-display: swap`, `<link rel="preload">` the one or two
faces above the fold. Drop the italic axes if unused. Also removes a third-party
dependency, which matters for the CSP in the security report.

## A12. P2 — cleanup

- **Dead dependencies.** `framer-motion`, `gsap` and `@studio-freight/lenis` are
  declared in `package.json` and imported nowhere in `src/`. `@astrojs/mdx` is
  still registered in `astro.config.mjs` but all content is YAML now. Removing
  the four cuts install time, build time and part of the 1,351-package tree.
- **`scroll-behavior: smooth`** on `html` (`src/styles/global.css:68`) makes
  anchor jumps mushy while the main thread is busy. Scope it to nav links or drop
  it. A `prefers-reduced-motion` override already exists at line 156.
- **`.snap-section`** is applied to the hero in markup but has no CSS rule
  anywhere. Dead class.
- **`content-visibility: auto`** on the Projects and Skills sections lets the
  browser skip layout and paint for off-screen content.
- **The grain overlay** (`global.css:138`) is a fixed full-viewport element at
  `z-index: 1000`, `opacity: .03`. Static, not animated, so not a per-frame cost,
  but it forces the whole viewport into a blended compositing path. Worth testing
  with it removed.
- **An empty `.html` file** is committed at the repo root. Delete it.

## A13. The GLB, from its own header

| Metric | Value |
|---|---:|
| File size | 4,905,868 B |
| JSON chunk | 1,480,260 B |
| Meshes | 8 |
| **Draw primitives** | **3,416** |
| Accessors | 10,248 |
| Vertices | 114,996 |
| Triangles | 110,926 |
| Textures / images | 0 |
| Compression extensions | none |

110,926 triangles across 3,416 draw primitives is **32 triangles per draw call**,
the pathological case for a GPU: per-draw overhead dominates entirely. A KiCad
export does this because every component, pad and via becomes its own primitive.
The 1.48 MB JSON chunk is almost all bookkeeping for those primitives.

No textures at all, only `POSITION` and `NORMAL`. So:

- `gltf-transform join` merges primitives sharing a material. With 7 materials,
  3,416 primitives should collapse to under ~20. This fixes the runtime cost and
  shrinks the JSON chunk by an order of magnitude.
- `gltf-transform weld` + `simplify` on untextured mechanical geometry usually
  cuts triangles substantially with no visible change at the camera distances this
  viewer is locked to (`0.2m` to `0.6m`).
- `meshopt` or Draco on the remaining geometry buffer typically gives 5-10×.

Realistic target: **300-600 KB and under 20 draw calls**, from 4.9 MB and 3,416.
Also drop `shadow-softness="0.5"`, which adds a soft shadow pass over every draw
call.

## A14. Verification plan

Playwright's Chromium is not installed on this machine
(`~/Library/Caches/ms-playwright` is empty). If you want measured rather than
derived numbers, I can install it and capture:

- Lighthouse LCP, TBT, CLS and INP, mobile and desktop, before and after each phase
- `performance.measure` around the particle frame loop for actual ms/frame
- Pointer-to-paint latency for the cursor, the number that matters most
- A long-task trace while scrolling `#hero` to `#skills`

Acceptance criteria:

- First load of `/` under 200 KB over the wire
- No JavaScript on the critical path except the reveal observer and modal wiring
- Zero long tasks over 50 ms while scrolling the full page
- Pointer latency indistinguishable from native, or native cursor restored
- Steady 60 fps in the Skills section, canvas confirmed paused off-screen
- Repeat visit serves 0 bytes of media from origin

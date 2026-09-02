# Security review: omarmohammed.co

> **STATUS — hardening implemented on branch `perf/static-media-and-hardening` (2026-09-01).**
>
> Fixed: security headers added (finding 3), Keystatic admin removed entirely
> (finding 1), CI workflow replaced with a build-only job using `npm ci`
> (finding 2), fonts self-hosted so no third-party origin remains (finding 5),
> `Referrer-Policy` set (finding 6), unreferenced public files deleted
> (finding 7), empty `.html` deleted (finding 8). Dependency tree cut from
> 1,351 packages to 440, which removes most of finding 4 by deletion.
>
> Still open: `npm audit fix` on the remaining tree, promoting the CSP from
> report-only to enforcing, and your decision on `resume.pdf`.
>
> ### Measured comparison with sunny-wu.ca
>
> You asked to be as secure as Sunny's site. Sunny is a **lower** bar, not a
> higher one:
>
> | Header | sunny-wu.ca | this site (before) | this site (now) |
> |---|---|---|---|
> | `Strict-Transport-Security` | 2 years | 1 year | 2 years + subdomains |
> | `Content-Security-Policy` | missing | missing | report-only, staged |
> | `X-Frame-Options` | missing | missing | `DENY` |
> | `X-Content-Type-Options` | missing | missing | `nosniff` |
> | `Referrer-Policy` | missing | missing | `strict-origin-when-cross-origin` |
> | `Permissions-Policy` | missing | missing | set |
> | `Cross-Origin-Opener-Policy` | missing | missing | `same-origin` |
> | `Access-Control-Allow-Origin` | `*` on HTML | not set | not set |
> | Public admin surface | none | `/keystatic` (200 OK) | none |
> | Serverless functions | yes (Next.js) | yes (Keystatic) | none |
>
> The only two things Sunny did better were the longer HSTS and having no admin
> route. Both are now addressed, and the header set goes well past parity.


---

## TL;DR

**Nobody can break into your site.** It's just files on a CDN. There's no login,
no database, no forms, nothing a visitor can type into. That rules out almost
every common website attack before we start.

I found nothing an outsider could exploit. What I did find is that **your site
carries more machinery than it needs**, and the weakest link isn't the website at
all, it's the pipeline that publishes it.

Three things worth fixing. None are emergencies.

---

## The three things

### 1. Your content editor's admin page is publicly visible

You installed a CMS (Keystatic) so you could edit your site through a web
interface. Its admin page and login screen are live on your domain right now, and
anyone can load them.

**This is not a way in.** Actually editing anything requires GitHub access to
your repo, which strangers don't have. That part works as designed.

The problem is subtler: a public admin login on a domain that automatically
publishes whatever lands in your repo is a good target for a phishing attempt
aimed at *you*. If someone tricked you into approving access, they'd be editing
your live site. It also means small server programs are running on what is
otherwise a site made entirely of static files.

**Worth knowing:** all your site's content is six small text files. You could
edit them directly and remove the CMS entirely, which deletes this whole category
of concern. That's my recommendation. If you'd rather keep the convenience, the
alternative is to make the CMS work only on your own machine, never on the live
site. Both are small changes.

Either way, go check the GitHub app that powers it and confirm it can only touch
this one repo and nothing else in your account.

### 2. Your auto-publish pipeline is looser than it should be

Every time you push code, a robot on GitHub installs your project's dependencies
and builds the site. Two issues:

**It installs fresh versions rather than the exact ones you tested.** Your project
pulls in over a thousand small packages, written by strangers. If any one of them
published a malicious update, that code would run inside your build with
permission to publish. Telling it to install *exactly* what you already have
locked down closes this.

**It's also publishing to the wrong place.** That robot deploys to GitHub Pages,
but your site is actually served by Netlify. So it's been running with publishing
permissions on every push, for an output nobody uses. Delete it or point it at the
right place.

### 3. Your site is missing standard browser protections

There's a short list of instructions a site can send to browsers: don't let other
sites embed me in a frame, don't guess at file types, don't leak the full page
address to third parties, don't allow camera or microphone access. Yours sends
almost none of them.

Nothing bad is happening because of this. It's the web equivalent of leaving a
door unlocked in a building with nothing in it. But it's a handful of lines of
config, and the *same* missing config is why your images and videos aren't being
cached, which is also a speed problem in the other report. One fix, two benefits.

---

## Also worth a look

**Your dependency scanner reports a lot of warnings, and they look scarier than
they are.** Every single one is in build tooling, the stuff that runs on your
laptop and in the build robot. None of it reaches a visitor's browser on a static
site. Run the automatic fix and move on. The durable fix is deleting the packages
you're not using, since roughly half your dependency count isn't doing anything.

**Your fonts come from Google.** That's a small amount of trust placed in someone
else's server for every page load. Hosting them yourself removes the dependency
and makes the browser protections above easier to lock down.

**Some files are public that you may not have realized.** Static hosts serve
everything in your public folder, and "I never linked to it" isn't the same as
"nobody can reach it." Your resume, your headshot, and one large unused image are
all directly fetchable. None of that is a bug, but the resume is worth a decision:
**I tried to scan it for personal details like a phone number or home address and
the scan didn't work** (the tool wasn't available on this machine), so I'm not
telling you it's clean. Open it yourself. Your nav also links a Google Drive copy
set to "anyone with the link," which doesn't expire.

---

## What's already right

Worth saying, because a list of problems gives a misleading impression:

- **No passwords, keys or tokens have ever been committed** to your repo. I
  checked the entire history.
- **None of your config, source code or build files are reachable** from the web.
  No folder browsing anywhere.
- **Traffic is properly encrypted**, plain HTTP redirects to secure, the `www`
  address redirects to the main one, and your certificate is valid and
  auto-renewing.
- **Your external links are correctly protected** against the trick where a
  linked site can manipulate the tab it was opened from. This is the one people
  usually get wrong, and you got it right everywhere.

---

## What to do, in order

**About an hour, this week:**
1. Add the browser-protections config. Fixes the caching problem too.
2. Delete or repoint that GitHub publishing robot.
3. Run the automatic dependency fix, rebuild, confirm the site still works.
4. Delete the unused image, the stray headshot, and an empty file in your repo root.
5. Open your resume and decide what you're comfortable publishing.

**This month:**
6. Decide the CMS question. For six text files, removing it is the clean answer.
7. Check, narrow, or delete the GitHub app behind it.
8. Host your own fonts.
9. Turn on the stricter browser rules in warning-only mode first, watch for
   breakage, then enforce.
10. Turn on automatic dependency update alerts.

**Ongoing:**
11. Remove the packages you don't use. A thousand-plus dependencies for a personal
    site is your biggest single exposure, and most of it isn't doing anything.

---
---

# Appendix: the technical detail

Assessment date: 2026-09-01
Assessed commit: `f215c4e` (origin/main, matches production)
Scope: production site, Netlify configuration, deployed source, CI/CD pipeline,
dependency tree. Owner-authorized review.

Method: passive reconnaissance plus source review. All live probing was read-only
`GET`/`HEAD` against public routes. No authentication attempted, no credentials
submitted, no payloads sent, nothing modified. Inconclusive checks are labelled as
such rather than reported clean.

Highest severity found: **Medium**, three of them. No finding is exploitable by an
anonymous attacker. There is no database, no user accounts, no forms and no
server-side handling of user input, so injection, auth bypass, IDOR and stored XSS
largely do not apply to a static Astro build.

| # | Finding | Severity |
|---|---|---|
| 1 | Keystatic CMS admin and SSR functions live in production | Medium |
| 2 | `npm install` in a privileged GitHub Actions job, plus a stale deploy workflow | Medium |
| 3 | No security headers on any static route | Medium |
| 4 | 36 dependency advisories, all build-time | Low-Medium |
| 5 | Third-party font origin on the critical path | Low |
| 6 | Referrer leakage to third parties | Low |
| 7 | Unreferenced and personal files served publicly | Low |
| 8 | Empty `.html` committed at repo root | Informational |

## B1. Keystatic CMS admin live in production — Medium

`/keystatic` returns **HTTP 200** to an anonymous request. So does
`/keystatic/github/created-app`. The OAuth entry point
`/api/keystatic/github/login` returns **307** to
`https://github.com/login/oauth/authorize` with a real `client_id` and
`redirect_uri=https://omarmohammed.co/api/keystatic/github/oauth/callback`.

Headers on `/keystatic` confirm a live serverless function, not a static file:

```
cache-control: no-cache
cache-status: "Netlify Durable"; fwd=bypass
age: 0
```

Root cause, `astro.config.mjs`:

```js
output: 'static',
adapter: netlify(),
integrations: [react(), mdx(), keystatic()],
```

The adapter and `keystatic()` integration are unconditional, so the admin UI and
`/api/keystatic/*` routes are built and deployed. `keystatic.config.ts` already
gates *storage* correctly (`local` in dev, `github` in production), but the
*integration* is not gated, so the routes ship either way.

**Risk boundary.** Keystatic's GitHub storage mode authorizes writes through
GitHub's permission model on `ofmohamm/portfolio`. An anonymous visitor can load
the admin shell and start an OAuth flow but cannot commit without repo write
access. Designed behaviour, not an unauthenticated write vulnerability.

The actual risk is surface area:

- A public admin login on a push-to-deploy domain is a ready-made **OAuth
  phishing target**. A successful consent grant against an app with
  `contents: write` means an attacker edits the live site.
- Serverless functions run on an otherwise fully static site.
- CMS schema, field structure and `client_id` are disclosed anonymously. A
  `client_id` is not secret by design, but it confirms the integration is live and
  configured.
- Correctness depends on `KEYSTATIC_SECRET` and the GitHub App client secret being
  set and scoped correctly in Netlify, which is not externally verifiable.

Remediation, best first:

1. **Drop the CMS.** Content is six YAML files in `src/content/`. Remove
   `keystatic()`, `@keystatic/astro`, `@keystatic/core` and the Netlify adapter;
   return to pure static output. Deletes the entire SSR surface.
2. **Dev-only integration**, matching how storage is already gated:

   ```js
   const isDev = process.env.NODE_ENV !== 'production';
   export default defineConfig({
     output: 'static',
     ...(isDev ? { adapter: netlify() } : {}),
     integrations: [react(), mdx(), ...(isDev ? [keystatic()] : [])],
   });
   ```

3. **Gate it.** Netlify password protection or Identity role-based access on
   `/keystatic*` and `/api/keystatic*`.

Either way: review the backing GitHub App / OAuth app. Confirm scope is
`ofmohamm/portfolio` only, `contents: write` and nothing more, no org-wide access.
If retiring the CMS, delete the app and rotate `KEYSTATIC_SECRET` and the client
secret.

## B2. CI/CD supply chain — Medium

`.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    steps:
      - run: npm install
      - run: npm run build
```

**`npm install`, not `npm ci`.** `npm install` may resolve newer versions inside
the `package.json` semver ranges and rewrite the lockfile. The dependency tree is
**1,351 packages**. Any one shipping a malicious patch release gets its install
scripts and build-time code executed here. `npm ci` installs exactly what
`package-lock.json` pins and fails on mismatch.

**Privileged token in the build job.** `permissions:` is workflow-level, so
`pages: write` and `id-token: write` are granted to `build`, the job that runs
third-party dependency code. Move `permissions` to the `deploy` job; give `build`
only `contents: read`.

**Stale and pointed at the wrong host.** It deploys to GitHub Pages, but the site
is served by Netlify (`server: Netlify`, `x-nf-request-id` on every response). A
privileged job runs on every push to `main` for an artifact nobody serves.

```yaml
permissions:
  contents: read          # workflow default

jobs:
  build:
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci --ignore-scripts
      - run: npm run build
```

Also pin third-party actions to commit SHAs rather than mutable tags, and enable
Dependabot for both `npm` and `github-actions`.

## B3. No security headers — Medium

Live check against `https://omarmohammed.co/`:

| Header | Status |
|---|---|
| `strict-transport-security` | present, `max-age=31536000` |
| `content-security-policy` | **missing** |
| `x-frame-options` | **missing** |
| `x-content-type-options` | **missing** |
| `referrer-policy` | **missing** |
| `permissions-policy` | **missing** |
| `cross-origin-opener-policy` | **missing** |

Root cause: no `[[headers]]` block in `netlify.toml` at all. Same omission causes
the uncached `public/` assets (finding A3 in the performance proposal).

Detail: the `/keystatic` function route *does* receive
`x-content-type-options: nosniff` from Netlify's function runtime, while none of
the static routes do.

Consequences: the site can be framed by any origin (clickjacking, low payoff with
no authenticated actions), MIME types can be sniffed, and the full referring URL
goes to every third party linked.

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), payment=(), usb=(), xr-spatial-tracking=()"
    Cross-Origin-Opener-Policy = "same-origin"
```

Note on `xr-spatial-tracking`: `model-viewer` requests WebXR features, so allow it
there if you ever enable AR.

**CSP needs a staged rollout.** The page contains several inline `<script>` blocks
Astro emits for island hydration, modal wiring and the scroll-to-top handler, so a
strict `script-src` will break the site. Start report-only:

```toml
    Content-Security-Policy-Report-Only = "default-src 'self'; script-src 'self' 'unsafe-inline' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; worker-src 'self' blob:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
```

Tighten in order:
1. Self-host fonts (performance A11), then drop `fonts.googleapis.com` and
   `fonts.gstatic.com`.
2. Adopt Astro's CSP support to emit hashes for inline scripts, then drop
   `'unsafe-inline'` from `script-src`.
3. Promote to the enforcing header.

`blob:` in `script-src`/`worker-src` is for `model-viewer`'s decoder workers. That
requirement persists even if you defer the import to modal open.

## B4. Dependency advisories: 36, all build-time — Low-Medium

`npm audit --package-lock-only` against the deployed lockfile:
**36 vulnerabilities: 1 critical, 23 high, 7 moderate, 5 low.**

| Package | Severity | Issue |
|---|---|---|
| `tar` <=7.5.20 | critical | 5 advisories: process crash, decompression DoS, infinite loop, uncaught exception, uncontrolled recursion |
| `vite` <=6.4.2 | high | path traversal in optimized-deps `.map` handling; arbitrary file read via dev-server WebSocket; `server.fs.deny` bypass on Windows |
| `svgo` 4.0.0-4.0.1 | high | billion-laughs entity expansion; `removeScripts` leaves some scripts intact |
| `smol-toml` <1.6.1 | moderate | DoS via TOML with many consecutive comment lines |

**Context before reacting to the count.** All build and dev-time tooling. The
production artifact is static HTML, CSS, JS and media on Netlify's CDN, so none of
this runs where a visitor can reach it. Hence Low-Medium, not Critical, despite
the label on `tar`.

Where they do matter:
- Anything running `astro dev` on a shared or exposed network is affected by the
  Vite dev-server arbitrary-file-read advisory. Keep `astro dev` on localhost.
- The CI job and the Netlify build container execute all of it, compounding B2.

Fix: `npm audit fix`, then `npm ci` and a build to confirm. Most resolve without
breaking changes. Removing dead dependencies (`framer-motion`, `gsap`,
`@studio-freight/lenis`, `@astrojs/mdx`, and the five React packages if you do
performance A7) shrinks the 1,351-package tree meaningfully, which is the durable
fix.

## B5. Third-party font origin on the critical path — Low

`src/layouts/BaseLayout.astro:36` loads a stylesheet from `fonts.googleapis.com`,
which pulls font files from `fonts.gstatic.com`. Subresource Integrity cannot be
applied because the returned CSS varies by user agent.

A compromise of that origin could inject arbitrary CSS, which is enough to deface
a site or exfiltrate some information via attribute selectors and background
requests. Practical likelihood is very low. The real reason to fix it is that it
forces `fonts.googleapis.com` into `style-src`, which is the main obstacle to a
tight CSP.

Fix: self-host subset `woff2`. Same fix as performance A11.

## B6. Referrer leakage — Low

With no `Referrer-Policy`, browsers send the full URL as `Referer` on cross-origin
navigations and subresource requests. The site links to `drive.google.com`,
`github.com`, `linkedin.com` and loads from `fonts.googleapis.com`, all of which
receive it. Leaked URL is just the homepage, so impact is small. The
`Referrer-Policy` header in B3 fixes it.

All `target="_blank"` links correctly carry `rel="noopener noreferrer"`, which is
the more serious version of this class and is already handled.

## B7. Files served publicly that may be unintended — Low

| Path | Size | Note |
|---|---:|---|
| `/images/mo-mark.png` | 846 KB | committed, not referenced by built HTML, publicly fetchable |
| `/resume.pdf` | 106 KB | reachable directly, no link from the page (nav links Google Drive instead) |
| `/headshot.jpg` | 93 KB | reachable directly, not referenced by built HTML |
| `/og-image.png` | 405 KB | intentional |

Not a vulnerability. Static hosts serve everything in `public/`, and "not linked"
is not "not reachable." Two decisions:

- Delete what is unused: `mo-mark.png`, `headshot.jpg`.
- **Check the resume.** `public/resume.pdf` is served from the domain, and the nav
  additionally links a Google Drive copy with `?usp=sharing` ("anyone with the
  link," non-expiring). I attempted an automated PII scan of the PDF and **it was
  inconclusive**: `pdftotext` is not installed on this machine, no text was
  extracted, and I am not reporting it as clean. Open it and confirm whether it
  contains a phone number or home address.

Your email is in a plain `mailto:` in three places and the JSON-LD publishes city
and region. Both normal and intentional for a portfolio; the only cost is
scraper-friendliness.

## B8. Empty `.html` file at repo root — Informational

`origin/main` contains a zero-byte file literally named `.html`. Not served, not
harmful. Delete it.

## B9. Verified clean

**No secrets exposed.** Scanned the entire git history (`git log --all -p`) for
GitHub tokens (`gh[pousr]_*`), OpenAI keys, AWS access key IDs, PEM private key
blocks, and assignments to `KEYSTATIC_SECRET`, `CLIENT_SECRET` and `api_key`.
**No matches.** No `.env` has ever been committed. `.gitignore` correctly covers
`.env`, `.env.production`, `.netlify/` and `node_modules/`.

**No source maps in production.** `/_astro/*.js.map` returns 404; shipped bundles
contain no `sourceMappingURL` reference.

**No file or directory exposure.** All 404: `/.env`, `/.git/config`,
`/package.json`, `/netlify.toml`, `/keystatic.config.ts`, `/src/`, `/dist/`,
`/models/`, `/videos/`, `/images/`, `/.DS_Store`, `/public/.DS_Store`. No
directory listing anywhere. No `.DS_Store` committed on `origin/main`.

**Transport is correct.** `http://` 301s to `https://`. `www` 301s to the apex.
HSTS set with one-year max-age. Valid Let's Encrypt certificate for
`omarmohammed.co`, valid 2026-08-05 to 2026-11-03, auto-renewed by Netlify.
Consider adding `includeSubDomains; preload` once confident no subdomain needs
plain HTTP.

**Input handling.** `/api/keystatic/github/oauth/callback` returns 400 to a bare
request rather than erroring or leaking a stack trace. `/api/keystatic` and
`/api/keystatic/tree/main` return 404. The static build has no forms, no query
parameter handling and no user input reaching the server.

**Tab-nabbing.** Every `target="_blank"` link has `rel="noopener noreferrer"`.

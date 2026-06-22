# Portfolio CMS (Keystatic) — Setup

Your site now has a built-in content dashboard. You edit projects, skills, the
hero, the featured project, and SEO text through a visual UI — no code, no
manual git.

## How it works

- **Local editing** (`npm run dev` → http://localhost:4321/keystatic): writes
  changes straight to the files on your machine.
- **Live editing** (https://omarmohammed.co/keystatic): you log in with GitHub,
  and every "Save" becomes a commit to this repo. Netlify sees the commit and
  auto-deploys, so the change is live in a minute or two. You can do this from
  your phone.

All content lives in:

| What | File(s) |
| --- | --- |
| Projects | `src/content/projects/*.yaml` (one file per project) |
| Hero (name, tagline, headshot) | `src/content/site/hero.yaml` |
| Featured project | `src/content/site/featured.yaml` |
| Skills | `src/content/site/skills.yaml` |
| Page title / meta description | `src/content/site/seo.yaml` |

Uploaded images, videos, and 3D models are committed into `public/` automatically.

---

## One-time setup for live editing (GitHub mode)

Local editing works immediately with no setup. To edit on the live site, do
this once.

### 1. Create a GitHub App

Keystatic uses a GitHub App so only you (a repo collaborator) can edit.

1. Go to https://github.com/settings/apps → **New GitHub App**.
2. Fill in:
   - **GitHub App name**: anything, e.g. `omar-portfolio-cms`
   - **Homepage URL**: `https://omarmohammed.co`
   - **Callback URL**: `https://omarmohammed.co/api/keystatic/github/oauth/callback`
   - Tick **Request user authorization (OAuth) during installation**
   - **Webhook**: untick **Active**
3. **Permissions** → Repository permissions → **Contents: Read and write**.
   (Also set **Metadata: Read-only** if it isn't already.)
4. **Where can this app be installed?** → **Only on this account**.
5. Click **Create GitHub App**.

### 2. Grab the credentials

On the app's page after creating it:

- Copy the **App ID** (a number) — note the app's **slug** too (it's in the URL,
  e.g. `github.com/apps/omar-portfolio-cms` → slug is `omar-portfolio-cms`).
- Copy the **Client ID**.
- Click **Generate a new client secret** and copy it.
- Scroll down and **Install** the app on your `portfolio` repo.

### 3. Add environment variables in Netlify

Netlify → your site → **Site configuration → Environment variables**. Add:

| Key | Value |
| --- | --- |
| `KEYSTATIC_GITHUB_CLIENT_ID` | the Client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | the client secret |
| `KEYSTATIC_SECRET` | any long random string (e.g. `openssl rand -hex 32`) |
| `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | the app slug, e.g. `omar-portfolio-cms` |

Trigger a redeploy. Then visit `https://omarmohammed.co/keystatic`, click "Log
in with GitHub", and you're in.

> If you ever change the production domain, update the Callback URL and Homepage
> URL on the GitHub App to match.

---

## Adding a new project (the common case)

1. Open `/keystatic` → **Projects** → **Create**.
2. Fill in the name, subtitle, one-liner, tags.
3. **Media type**: pick *3D model* or *Video*, then upload the `.glb` or `.mp4`
   and a poster image — drag and drop, no git needed.
4. Add body paragraphs and spec rows for the detail modal.
5. Set **Display order** (lower = higher on the page).
6. **Save**. Locally it writes the file; on the live site it commits + deploys.

That's it.

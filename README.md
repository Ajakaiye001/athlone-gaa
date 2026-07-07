# Athlone GAA — The Parish Roars

Club website: fixtures, news, teams, membership and the club shop.
Vite + React, no backend required. Content is managed through Decap CMS.

## Run the site

```bash
npm install
npm run dev          # site on http://localhost:5185
```

## Edit content (news, shop, fixtures)

Every news item, product and game is its own file in `content/`, edited
through a form-based admin panel — no code needed.

```bash
npm run dev          # terminal 1: the site
npm run cms          # terminal 2: the CMS backend (git mode)
```

Then open **http://localhost:5185/admin/index.html**. Each section has a
"New ..." button that opens a blank form with a live preview.

**Save vs Publish:** hitting **Save** stores the change as a draft on the
Workflow board (Drafts → In Review → Ready); nothing is live yet. **Publish**
merges it into the site and commits to git. Editing an already-published entry
works the same way: save a draft, publish when happy.

Two things to know:
- The CMS backend needs a **clean git tree** — if a save fails with an API
  error, commit or stash your own code changes first.
- Photos uploaded in the CMS land in `public/uploads/`.

## Going live

The site builds to static files:

```bash
npm run build        # output in dist/
```

Deploy `dist/` to Netlify or Vercel. Because the site uses client-side routing,
add an SPA fallback (Netlify: `_redirects` with `/* /index.html 200`).

To let committee members edit content from the live site (no laptop setup),
host on Netlify and enable **Identity + Git Gateway**, then invite editors by
email. The CMS config (`public/admin/config.yml`) is already set up for
`git-gateway`; `local_backend: true` keeps local editing working too.

## Design system

Art direction and tokens are documented in `PRODUCT.md` and `DESIGN.md`.
Read both before changing any styling.

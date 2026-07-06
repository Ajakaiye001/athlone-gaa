# Athlone GAA — The Parish Roars

Club website: fixtures, news, teams, membership and the club shop.
Vite + React, no backend required. Content is managed through Decap CMS.

## Run the site

```bash
npm install
npm run dev          # site on http://localhost:5185
```

## Edit content (news, shop, fixtures)

Content lives in `public/content/*.json` and is edited through a form-based
admin panel — no code needed.

```bash
npm run dev          # terminal 1: the site
npm run cms          # terminal 2: the CMS backend
```

Then open **http://localhost:5185/admin/index.html** and pick News, Shop or
Fixtures & Results. Hitting **Publish** writes the change straight into
`public/content/` (and commits it to git), and the site picks it up on refresh.

Photos uploaded in the CMS land in `public/uploads/`.

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

// Loads CMS-managed content from /content at build time.
// In dev, Vite hot-reloads when the CMS publishes; in production,
// each publish commits to git and the host rebuilds.

const MONTH_INDEX = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

function load(modules) {
  return Object.values(modules).map((m) => m.default ?? m)
}

const newsModules = import.meta.glob('../content/news/*.json', { eager: true })
const shopModules = import.meta.glob('../content/shop/*.json', { eager: true })
const fixtureModules = import.meta.glob('../content/fixtures/*.json', { eager: true })

// News: newest first (parse the written date; fall back to editor order)
export const news = load(newsModules).sort((a, b) => {
  const da = Date.parse(a.date) || 0
  const db = Date.parse(b.date) || 0
  if (da !== db) return db - da
  return (a.order ?? 0) - (b.order ?? 0)
})

const slugify = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Shop: featured first, then category order, then original order
const CATEGORY_ORDER = { jerseys: 0, balls: 1, hurleys: 2 }
export const products = load(shopModules)
  .map((p) => ({ ...p, id: p.id || slugify(p.name) }))
  .sort((a, b) => {
    if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1
    const ca = CATEGORY_ORDER[a.category] ?? 9
    const cb = CATEGORY_ORDER[b.category] ?? 9
    if (ca !== cb) return ca - cb
    return (a.order ?? 0) - (b.order ?? 0)
  })

// Fixtures: by month, then by day-of-month from the written date
const dayOf = (f) => Number((f.date || '').match(/\d+/)?.[0] ?? 0)
export const fixtures = load(fixtureModules).sort((a, b) => {
  const ma = MONTH_INDEX.indexOf(a.month)
  const mb = MONTH_INDEX.indexOf(b.month)
  if (ma !== mb) return ma - mb
  return dayOf(a) - dayOf(b)
})

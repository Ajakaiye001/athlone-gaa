import { useEffect, useState } from 'react'

const cache = new Map()

// Loads CMS-managed content from /content/<name>.json.
// Falls back to the bundled data until the fetch lands (or if it fails),
// so the site never renders empty because of a missing file.
export default function useContent(name, fallback) {
  const [data, setData] = useState(() => cache.get(name) ?? fallback)

  useEffect(() => {
    if (cache.has(name)) return
    let alive = true
    fetch(`/content/${name}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        const items = json?.items
        if (alive && Array.isArray(items) && items.length > 0) {
          cache.set(name, items)
          setData(items)
        }
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [name])

  return data
}

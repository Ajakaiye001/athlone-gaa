import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ShopContext = createContext(null)
const STORAGE_KEY = 'athlone-gaa-kitbag'

export function ShopProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const api = useMemo(() => {
    const keyOf = (id, option) => `${id}::${option || ''}`

    return {
      items,
      add(product, option) {
        setItems((prev) => {
          const key = keyOf(product.id, option)
          const found = prev.find((i) => i.key === key)
          if (found) {
            return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
          }
          return [
            ...prev,
            { key, id: product.id, name: product.name, price: product.price, option, qty: 1 },
          ]
        })
      },
      setQty(key, qty) {
        setItems((prev) =>
          qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
        )
      },
      clear() {
        setItems([])
      },
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.price, 0),
    }
  }, [items])

  return <ShopContext.Provider value={api}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside ShopProvider')
  return ctx
}

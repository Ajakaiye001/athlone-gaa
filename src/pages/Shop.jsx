import { useMemo, useState } from 'react'
import PageHeader from './PageHeader.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'
import ProductArt from '../components/ProductArt.jsx'
import useReveal from '../hooks/useReveal.js'
import { useShop } from '../context/ShopContext.jsx'
import { CATEGORIES } from '../data/shop.js'
import { products } from '../content.js'
import './Shop.css'

function ProductTile({ product, index }) {
  const { add } = useShop()
  const [option, setOption] = useState(product.options?.[0] ?? null)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add(product, option)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article
      className={`product-tile product-tile--${product.category} reveal`}
      style={{ '--reveal-delay': `${(index % 3) * 0.08}s` }}
    >
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <div className={`product-canvas ${product.image ? 'product-canvas--photo' : ''}`}>
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <ProductArt kind={product.art} />
        )}
      </div>
      <div className="product-info">
        <h3 className="display">{product.name}</h3>
        <p className="product-desc">{product.desc}</p>

        {product.options && (
          <div className="product-options" role="radiogroup" aria-label="Size">
            {product.options.map((o) => (
              <button
                key={o}
                role="radio"
                aria-checked={option === o}
                className={`product-option ${option === o ? 'is-active' : ''}`}
                onClick={() => setOption(o)}
              >
                {o}
              </button>
            ))}
          </div>
        )}

        <div className="product-buy">
          <span className="product-price">€{product.price}</span>
          <button className={`stamp product-add ${added ? 'is-added' : ''}`} onClick={handleAdd}>
            {added ? 'In the bag ✓' : 'Add to bag'}
          </button>
        </div>
      </div>
    </article>
  )
}

function KitBag() {
  const { items, count, total, setQty, clear } = useShop()
  const [open, setOpen] = useState(false)
  const [ordered, setOrdered] = useState(false)

  if (count === 0 && !ordered) return null

  function checkout() {
    setOrdered(true)
    clear()
    setTimeout(() => {
      setOrdered(false)
      setOpen(false)
    }, 4000)
  }

  return (
    <aside className={`kitbag ${open ? 'is-open' : ''}`} aria-label="Kit bag">
      {ordered ? (
        <div className="kitbag-bar kitbag-bar--done" role="status">
          ORDER IN. THE KITMAN WILL EMAIL YOU COLLECTION DETAILS. UP ATHLONE.
        </div>
      ) : (
        <>
          <button className="kitbag-bar" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span>
              KIT BAG · {count} {count === 1 ? 'ITEM' : 'ITEMS'}
            </span>
            <span className="kitbag-total">€{total}</span>
            <span className="kitbag-chevron">{open ? '▾' : '▴'}</span>
          </button>

          <div className="kitbag-fold">
            <div className="kitbag-fold-inner">
              <ul className="kitbag-list">
                {items.map((i) => (
                  <li key={i.key} className="kitbag-row">
                    <span className="kitbag-name">
                      {i.name}
                      {i.option && <em> · {i.option}</em>}
                    </span>
                    <span className="kitbag-qty">
                      <button aria-label={`Remove one ${i.name}`} onClick={() => setQty(i.key, i.qty - 1)}>
                        −
                      </button>
                      <span>{i.qty}</span>
                      <button aria-label={`Add one ${i.name}`} onClick={() => setQty(i.key, i.qty + 1)}>
                        +
                      </button>
                    </span>
                    <span className="kitbag-price">€{i.price * i.qty}</span>
                  </li>
                ))}
              </ul>
              <div className="kitbag-actions">
                <button className="kitbag-clear" onClick={clear}>
                  Empty the bag
                </button>
                <button className="stamp stamp--leather" onClick={checkout}>
                  Place order · €{total} <span className="stamp-arrow">→</span>
                </button>
              </div>
              <p className="kitbag-note">
                Collection from the clubhouse on training nights. Payment on collection.
              </p>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}

export default function Shop() {
  const ref = useReveal({ threshold: 0.05 })
  const [category, setCategory] = useState('all')

  const featured = products.find((p) => p.featured)
  const showFeatured = category === 'all' || featured?.category === category
  const visible = useMemo(
    () => products.filter((p) => category === 'all' || p.category === category),
    [category],
  )

  return (
    <>
      <PageHeader
        no="07"
        kicker="CLUB SHOP · EVERY PURCHASE FUNDS THE CLUB"
        title="Wear the Crest"
        lead="Jerseys, balls and hurleys, picked by the people who use them every week. Collect from the clubhouse; every euro goes back to the pitch."
      />

      <section className="shop container" ref={ref}>
        <div className="shop-filters" role="tablist" aria-label="Category">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={category === c.key}
              className={`shop-filter ${category === c.key ? 'is-active' : ''}`}
              onClick={() => setCategory(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {showFeatured && featured && <FeaturedProduct product={featured} />}

        <div className="shop-grid">
          {visible
            .filter((p) => !(showFeatured && p.id === featured?.id))
            .map((p, i) => (
              <ProductTile key={p.id} product={p} index={i} />
            ))}
        </div>
      </section>

      <KitBag />
      <Newsletter />
      <Footer />
    </>
  )
}

function FeaturedProduct({ product }) {
  const { add } = useShop()
  const [option, setOption] = useState(product.options?.[0] ?? null)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add(product, option)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className="shop-hero grain reveal">
      <div className={`shop-hero-canvas ${product.image ? 'shop-hero-canvas--photo' : ''}`}>
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <ProductArt kind={product.art} />
        )}
      </div>
      <div className="shop-hero-body">
        <span className="product-badge product-badge--hero">{product.badge}</span>
        <h2 className="display">{product.name}</h2>
        <p>{product.desc}</p>
        <div className="product-options" role="radiogroup" aria-label="Size">
          {product.options?.map((o) => (
            <button
              key={o}
              role="radio"
              aria-checked={option === o}
              className={`product-option product-option--chalk ${option === o ? 'is-active' : ''}`}
              onClick={() => setOption(o)}
            >
              {o}
            </button>
          ))}
        </div>
        <div className="product-buy">
          <span className="product-price product-price--hero">€{product.price}</span>
          <button className={`stamp stamp--leather ${added ? 'is-added' : ''}`} onClick={handleAdd}>
            {added ? 'In the bag ✓' : 'Add to bag'}
          </button>
        </div>
      </div>
    </article>
  )
}

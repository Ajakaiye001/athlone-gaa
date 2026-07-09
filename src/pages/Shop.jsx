import { useMemo, useState } from 'react'
import PageHeader from './PageHeader.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'
import ProductArt from '../components/ProductArt.jsx'
import useReveal from '../hooks/useReveal.js'
import { CATEGORIES } from '../data/shop.js'
import { products, settings } from '../content.js'
import './Shop.css'

// Nothing is sold from the club directly: every product opens the club's
// O'Neills store (a product's own link if it has one, otherwise the store).
const buyUrl = (product) => product.link || settings.oneillsUrl

function BuyLink({ product, chalk }) {
  return (
    <a
      className={`stamp product-add ${chalk ? 'stamp--leather' : ''}`}
      href={buyUrl(product)}
      target="_blank"
      rel="noreferrer"
    >
      Buy on O&rsquo;Neills <span className="stamp-arrow">↗</span>
    </a>
  )
}

function Sizes({ options, chalk }) {
  if (!options || options.length === 0) return null
  return (
    <div className={`product-sizes ${chalk ? 'product-sizes--chalk' : ''}`}>
      <span className="product-sizes-label">Sizes</span>
      {options.map((o) => (
        <span className="product-size" key={o}>
          {o}
        </span>
      ))}
    </div>
  )
}

function ProductTile({ product, index }) {
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
        <Sizes options={product.options} />
        <div className="product-buy">
          <span className="product-price">€{product.price}</span>
          <BuyLink product={product} />
        </div>
      </div>
    </article>
  )
}

function FeaturedProduct({ product }) {
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
        <Sizes options={product.options} chalk />
        <div className="product-buy">
          <span className="product-price product-price--hero">€{product.price}</span>
          <BuyLink product={product} chalk />
        </div>
      </div>
    </article>
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
        lead="The whole range is official Athlone GAA kit, made by O'Neills and shipped from the club store. Browse here, buy there, and every euro comes back to the pitch."
      />

      {settings.oneillsUrl && (
        <a
          className="oneills-banner"
          href={settings.oneillsUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className="oneills-banner-mark">O&rsquo;NEILLS</span>
          <span className="oneills-banner-text">
            Official Athlone GAA teamwear store · jerseys, training gear, leisurewear
          </span>
          <span className="oneills-banner-cta">
            Shop the full range <span className="stamp-arrow">↗</span>
          </span>
        </a>
      )}

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

      <Newsletter />
      <Footer />
    </>
  )
}

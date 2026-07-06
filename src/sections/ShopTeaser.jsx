import { Link } from 'react-router-dom'
import ProductArt from '../components/ProductArt.jsx'
import useReveal from '../hooks/useReveal.js'
import './ShopTeaser.css'

const PIECES = [
  { art: 'jersey', label: 'JERSEYS FROM €45' },
  { art: 'football', label: 'BALLS FROM €18' },
  { art: 'hurley', label: 'HURLEYS FROM €25' },
]

export default function ShopTeaser() {
  const ref = useReveal({ threshold: 0.25 })

  return (
    <section className="shopteaser grain" ref={ref}>
      <div className="container shopteaser-grid">
        <div className="shopteaser-lead">
          <p className="tag reveal">
            <span className="tag-no">06</span> CLUB SHOP
          </p>
          <h2 className="display reveal" style={{ '--reveal-delay': '0.1s' }}>
            Wear the crest
          </h2>
          <p className="reveal" style={{ '--reveal-delay': '0.2s' }}>
            Jerseys, balls and hurleys. Every euro goes back to the pitch.
          </p>
          <Link to="/shop" className="stamp stamp--chalk reveal" style={{ '--reveal-delay': '0.3s' }}>
            Into the shop <span className="stamp-arrow">→</span>
          </Link>
        </div>

        {PIECES.map((p, i) => (
          <Link
            to="/shop"
            className="shopteaser-piece reveal"
            style={{ '--reveal-delay': `${0.15 + i * 0.1}s` }}
            key={p.art}
            aria-label={p.label}
          >
            <ProductArt kind={p.art} />
            <span>{p.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

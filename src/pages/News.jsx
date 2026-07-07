import { useState } from 'react'
import PageHeader from './PageHeader.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'
import useReveal from '../hooks/useReveal.js'
import { news as items } from '../content.js'
import './News.css'

const CATEGORIES = ['All', 'Match Report', 'Club News', 'Team News', 'Fundraising']

export default function News() {
  const ref = useReveal({ threshold: 0.05 })
  const [category, setCategory] = useState('All')
  const visible = category === 'All' ? items : items.filter((n) => n.category === category)
  const [featured, ...rest] = visible

  return (
    <>
      <PageHeader
        no="05"
        kicker="THE CLUB NOTES"
        title="News"
        lead="Match reports, camp announcements and lotto numbers, written by the people who were there."
      />

      <section className="news container" ref={ref}>
        <div className="news-filters" role="tablist" aria-label="Category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              className={`news-filter ${category === c ? 'is-active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {featured && (
          <article className="news-featured reveal" key={featured.title}>
            <div className="news-featured-photo duotone">
              <img src={featured.image} alt="" />
            </div>
            <div className="news-featured-body">
              <p className="news-meta">
                <span>{featured.category}</span>
                <span>{featured.date}</span>
              </p>
              <h2 className="display">{featured.title}</h2>
              <p className="news-excerpt">{featured.excerpt}</p>
              <button className="stamp">
                Read the report <span className="stamp-arrow">→</span>
              </button>
            </div>
          </article>
        )}

        <div className="news-rows">
          {rest.map((n, i) => (
            <article className="news-row reveal" style={{ '--reveal-delay': `${i * 0.06}s` }} key={n.title}>
              <p className="news-meta">
                <span>{n.category}</span>
                <span>{n.date}</span>
              </p>
              <h3>{n.title}</h3>
              <p className="news-excerpt">{n.excerpt}</p>
              <span className="news-row-arrow" aria-hidden>
                →
              </span>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="news-empty">Nothing filed under {category} yet. The notes are being written.</p>
        )}
      </section>

      <Newsletter />
      <Footer />
    </>
  )
}

import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import { sponsors } from '../content.js'
import './Sponsors.css'

function Board({ sponsor, className }) {
  const inner = sponsor.logo ? (
    <img src={sponsor.logo} alt={sponsor.name} />
  ) : (
    <span className="board-name display">{sponsor.name}</span>
  )
  const hasLink = sponsor.url && sponsor.url !== '#'
  return hasLink ? (
    <a className={className} href={sponsor.url} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  )
}

export default function Sponsors() {
  const ref = useReveal({ threshold: 0.15 })
  if (sponsors.length === 0) return null

  const principal = sponsors.find((s) => s.tier === 'principal')
  const rest = sponsors.filter((s) => s !== principal)
  // duplicate the row so the perimeter-board marquee loops seamlessly
  const track = [...rest, ...rest]

  return (
    <section className="sponsors" id="sponsors" ref={ref}>
      <div className="container">
        <p className="tag reveal">
          <span className="tag-no">08</span> PROUDLY BACKED BY THE PARISH
        </p>
        <div className="chalk-line sponsors-rule" />

        {principal && (
          <div className="sponsors-principal reveal" style={{ '--reveal-delay': '0.1s' }}>
            <span className="sponsors-principal-label">Principal Sponsor</span>
            <Board sponsor={principal} className="sponsor-board sponsor-board--principal" />
          </div>
        )}
      </div>

      {rest.length > 0 && (
        <div className="sponsors-marquee marquee" aria-label="Club sponsors">
          <div className="marquee-track">
            {track.map((s, i) => (
              <Board key={i} sponsor={s} className="sponsor-board" />
            ))}
          </div>
          <div className="marquee-track" aria-hidden>
            {track.map((s, i) => (
              <Board key={i} sponsor={s} className="sponsor-board" />
            ))}
          </div>
        </div>
      )}

      <div className="container">
        <p className="sponsors-cta reveal">
          Put your business on the boards.{' '}
          <Link to="/about#contact">Become a sponsor →</Link>
        </p>
      </div>
    </section>
  )
}

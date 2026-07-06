import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from './PageHeader.jsx'
import Coaches from '../sections/Coaches.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'
import useReveal from '../hooks/useReveal.js'
import { teams } from '../data/teams.js'
import './Teams.css'

const PREVIEW_COUNT = 5

function SquadPanel({ roster }) {
  const [open, setOpen] = useState(false)
  const preview = roster.slice(0, PREVIEW_COUNT)
  const rest = roster.slice(PREVIEW_COUNT)

  return (
    <div className="panel">
      <p className="panel-label">THE PANEL · {roster.length} PLAYERS</p>
      <ol className="panel-list">
        {preview.map((p) => (
          <PanelRow key={p.no} player={p} />
        ))}
      </ol>

      <div className={`panel-more ${open ? 'is-open' : ''}`}>
        <div className="panel-more-inner">
          <ol className="panel-list" start={PREVIEW_COUNT + 1}>
            {rest.map((p, i) => (
              <PanelRow key={p.no} player={p} delay={open ? i * 0.04 : 0} animate={open} />
            ))}
          </ol>
        </div>
      </div>

      <button
        className="panel-toggle"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? '− Fold the teamsheet' : `+ View the full panel (${roster.length})`}
      </button>
    </div>
  )
}

function PanelRow({ player, delay = 0, animate = false }) {
  return (
    <li
      className={`panel-row ${animate ? 'panel-row--in' : ''}`}
      style={animate ? { animationDelay: `${delay}s` } : undefined}
    >
      <span className="panel-no">{String(player.no).padStart(2, '0')}</span>
      <span className="panel-name">
        {player.name}
        {player.captain && <span className="panel-captain" title="Captain">C</span>}
      </span>
      <span className="panel-pos">{player.pos}</span>
    </li>
  )
}

export default function Teams() {
  const ref = useReveal({ threshold: 0.05 })

  return (
    <>
      <PageHeader
        no="03"
        kicker="EVERY JERSEY, EVERY AGE"
        title="The Teams"
        lead="Football, hurling, ladies football and camogie. Nursery to senior, every squad wears the same crest."
      />

      <section className="squads container" ref={ref}>
        {teams.map((t, i) => (
          <article className="squad reveal" style={{ '--reveal-delay': `${(i % 2) * 0.1}s` }} key={t.name}>
            <span className="squad-no display">{String(i + 1).padStart(2, '0')}</span>
            <div className="squad-photo duotone">
              <img src={t.image} alt={t.name} />
            </div>
            <div className="squad-body">
              <h2 className="display">{t.name}</h2>
              <p>{t.blurb}</p>
              <span className="squad-coach">BAINISTEOIR · {t.coach}</span>
              <SquadPanel roster={t.roster} />
            </div>
          </article>
        ))}

        <aside className="squads-cta reveal">
          <p className="display">There is a jersey here with your name on it</p>
          <Link to="/membership" className="stamp stamp--solid">
            Become a member <span className="stamp-arrow">→</span>
          </Link>
        </aside>
      </section>

      <Coaches />
      <Newsletter />
      <Footer />
    </>
  )
}

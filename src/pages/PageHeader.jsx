import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import './PageHeader.css'

// Poster band for inner pages: drenched pitch green, giant display title.
export default function PageHeader({ no = '00', kicker, title, lead }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true))
    // Failsafe: reveal even if rAF is throttled (tab backgrounded during the
    // route change), so the page header never stays blank on navigation.
    const failsafe = setTimeout(() => setLoaded(true), 500)
    return () => {
      cancelAnimationFrame(id)
      clearTimeout(failsafe)
    }
  }, [])

  return (
    <div className={`page-hero grain ${loaded ? 'is-inview' : ''}`}>
      <Navbar variant="chalk" />
      <div className="container page-hero-body">
        <p className="tag reveal">
          <span className="tag-no">{no}</span> {kicker}
        </p>
        <h1 className="display">
          <span className="slam">
            <span>{title}</span>
          </span>
        </h1>
        {lead && (
          <p className="page-hero-lead reveal" style={{ '--reveal-delay': '0.25s' }}>
            {lead}
          </p>
        )}
        <div className="chalk-line page-hero-rule" />
      </div>
    </div>
  )
}

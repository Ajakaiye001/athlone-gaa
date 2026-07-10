import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'The Club' },
  { to: '/teams', label: 'Teams' },
  { to: '/fixtures', label: 'Fixtures' },
  { to: '/tickets', label: 'Tickets' },
  { to: '/news', label: 'News' },
  { to: '/shop', label: 'Shop' },
]

// variant "chalk" = light type over pitch/photo; "ink" = dark type on paper
export default function Navbar({ variant = 'ink' }) {
  const [open, setOpen] = useState(false)

  return (
    <header className={`nav nav--${variant} ${open ? 'nav--open' : ''}`}>
      <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
        <img src="/assets/imgImage232.png" alt="Athlone GAA crest" />
        <span className="display">Athlone GAA</span>
      </Link>

      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((l, i) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            onClick={() => setOpen(false)}
          >
            <span className="nav-link-no">0{i + 1}</span>
            {l.label}
          </NavLink>
        ))}
        <Link to="/membership" className="stamp stamp--leather nav-join" onClick={() => setOpen(false)}>
          Join the Club
        </Link>
      </nav>

      <button
        className="nav-burger"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}

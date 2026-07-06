import { useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import { coaches } from '../data/teams.js'
import './Coaches.css'

export default function Coaches() {
  const ref = useReveal({ threshold: 0.15 })
  const [active, setActive] = useState(0)

  return (
    <section className="bainisteoir" ref={ref}>
      <div className="container">
        <p className="tag reveal">
          <span className="tag-no">03</span> AN BAINISTEOIR · THE MANAGEMENT
        </p>
        <div className="chalk-line bainisteoir-rule" />

        <div className="bainisteoir-grid">
          <ul className="bainisteoir-list reveal" style={{ '--reveal-delay': '0.1s' }}>
            {coaches.map((c, i) => (
              <li key={c.name}>
                <button
                  className={`bainisteoir-row ${i === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="bainisteoir-no">0{i + 1}</span>
                  <span className="bainisteoir-name display">{c.name}</span>
                  <span className="bainisteoir-role">{c.role}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="bainisteoir-photo duotone is-color reveal" style={{ '--reveal-delay': '0.2s' }}>
            {coaches.map((c, i) => (
              <img
                key={c.name}
                src={c.image}
                alt={`${c.name}, ${c.role}`}
                className={i === active ? 'is-showing' : ''}
              />
            ))}
            <span className="bainisteoir-caption">
              {coaches[active].name} · {coaches[active].role}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

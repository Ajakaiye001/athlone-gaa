import { useMemo, useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import { MONTHS } from '../data/fixtures.js'
import { fixtures } from '../content.js'
import FixtureCard from '../components/FixtureCard.jsx'
import './FixturesBoard.css'

const CODES = [
  { key: 'both', label: 'All codes' },
  { key: 'football', label: 'Football' },
  { key: 'hurling', label: 'Hurling' },
]

export default function FixturesBoard() {
  const ref = useReveal({ threshold: 0.08 })
  const [month, setMonth] = useState('March')
  const [code, setCode] = useState('both')
  const [showPrevious, setShowPrevious] = useState(false)

  const visible = useMemo(() => {
    let list = fixtures.filter((f) => f.month === month)
    if (code !== 'both') list = list.filter((f) => f.code === code)
    if (!showPrevious) return list
    const idx = MONTHS.indexOf(month)
    const earlier = fixtures.filter(
      (f) => MONTHS.indexOf(f.month) < idx && f.played && (code === 'both' || f.code === code),
    )
    return [...earlier, ...list]
  }, [fixtures, month, code, showPrevious])

  return (
    <section className="board grain" id="fixtures" ref={ref}>
      <div className="container">
        <div className="board-head">
          <p className="tag reveal">
            <span className="tag-no">02</span> FIXTURES &amp; RESULTS · 2026
          </p>
          <h2 className="display reveal" style={{ '--reveal-delay': '0.1s' }}>
            The Scoreboard
          </h2>
          <div className="chalk-line" />
        </div>

        <div className="board-controls reveal" style={{ '--reveal-delay': '0.15s' }}>
          <div className="board-months" role="tablist" aria-label="Month">
            {MONTHS.map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={m === month}
                className={`board-month ${m === month ? 'is-active' : ''}`}
                onClick={() => setMonth(m)}
              >
                {m.slice(0, 3)}
              </button>
            ))}
          </div>

          <div className="board-codes">
            {CODES.map((c) => (
              <button
                key={c.key}
                className={`board-code ${code === c.key ? 'is-active' : ''}`}
                onClick={() => setCode(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="board-list" key={`${month}-${code}-${showPrevious}`}>
          {visible.length === 0 ? (
            <p className="board-empty">
              No {code === 'both' ? '' : code + ' '}games in {month}. The pitch rests; try another
              month.
            </p>
          ) : (
            visible.map((f, i) => <FixtureCard key={`${f.date}-${f.competition}`} fixture={f} index={i} />)
          )}
        </div>

        <button className="board-prev" onClick={() => setShowPrevious(!showPrevious)}>
          {showPrevious ? '− Hide earlier results' : '+ Show earlier results'}
        </button>
      </div>
    </section>
  )
}

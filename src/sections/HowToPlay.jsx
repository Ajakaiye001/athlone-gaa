import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import Ticker from '../components/Ticker.jsx'
import './HowToPlay.css'

const RULES = [
  [
    'Fifteen a side',
    'Both codes. A keeper, six backs, two midfielders and six forwards, on a pitch bigger than a soccer field.',
  ],
  [
    'Two ways to score',
    'Over the crossbar is a point, worth 1. Under the bar, past the keeper, is a goal, worth 3.',
  ],
  [
    'Read the score like a local',
    'Scores are written goals-points: 2-11 means 2 goals and 11 points, 17 in total. So 2-11 beats 1-13.',
  ],
  [
    'Moving the ball',
    'Four steps max in the hand. Then kick it, hand-pass it, or solo: football, toe-tap it back to your hands; hurling, balance it on the bás.',
  ],
  [
    'Football and hurling',
    'Gaelic football is played with a round ball you catch and kick. Hurling swaps it for an ash hurley and a sliotar, the fastest field game in the world.',
  ],
  [
    'Sixty minutes of it',
    'Two thirty-minute halves at club level. Nobody is paid; everyone is from here.',
  ],
]

const GLOSSARY = [
  'SLIOTAR · THE SMALL LEATHER BALL USED IN HURLING',
  'CAMÁN · THE ASH HURLEY ITSELF',
  'BÁS · THE FLAT STRIKING FACE OF THE HURLEY',
  'SOLO · TOE-TAP OR HURLEY-BALANCE THE BALL BACK TO YOUR OWN HANDS',
  'THE SQUARE · THE KEEPER’S SMALL RECTANGLE, STAY OUT OF IT',
  '45 & 65 · LONG-RANGE FREES AFTER A DEFENDER PUTS IT WIDE',
  'CÚL · IRISH FOR GOAL',
  'POINT · OVER THE BAR, WORTH 1',
  'GOAL · UNDER THE BAR, WORTH 3',
]

export default function HowToPlay() {
  const ref = useReveal({ threshold: 0.12 })
  const [goals, setGoals] = useState(0)
  const [points, setPoints] = useState(0)
  const [shot, setShot] = useState(null) // { kind: 'over' | 'goal', id }
  const [verdict, setVerdict] = useState(null)
  const attempt = useRef(0)
  const timer = useRef(null)

  function kick(kind) {
    if (timer.current) clearTimeout(timer.current)
    attempt.current += 1
    setVerdict(null)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const land = () => {
      if (kind === 'over') {
        setPoints((p) => p + 1)
        setVerdict('POINT! OVER THE BAR')
      } else {
        setGoals((g) => g + 1)
        setVerdict('GOAL! WORTH THREE')
      }
    }
    if (reduce) {
      setShot(null)
      land()
      return
    }
    setShot({ kind, id: attempt.current })
    timer.current = setTimeout(land, 750)
  }

  function reset() {
    if (timer.current) clearTimeout(timer.current)
    setGoals(0)
    setPoints(0)
    setShot(null)
    setVerdict(null)
  }

  const total = goals * 3 + points

  return (
    <section className="h2p grain" id="how-to-play" ref={ref}>
      <div className="container">
        <p className="tag reveal">
          <span className="tag-no">GAA 101</span> NEW TO THE GAMES?
        </p>
        <h2 className="display reveal" style={{ '--reveal-delay': '0.1s' }}>
          Know your 2-11 from your 1-13
        </h2>
        <p className="h2p-lead reveal" style={{ '--reveal-delay': '0.15s' }}>
          Never seen Gaelic games before? Here is everything you need to follow Sunday's match,
          starting with the only scoreboard in sport that needs a maths lesson.
        </p>

        <div className="h2p-grid">
          {/* interactive chalk goalposts */}
          <div className="h2p-stage reveal" style={{ '--reveal-delay': '0.2s' }}>
            <svg viewBox="0 0 400 260" className="h2p-pitch" aria-hidden>
              {/* ground */}
              <line x1="10" y1="232" x2="390" y2="232" />
              {/* posts */}
              <line x1="150" y1="232" x2="150" y2="36" />
              <line x1="250" y1="232" x2="250" y2="36" />
              {/* crossbar */}
              <line x1="150" y1="130" x2="250" y2="130" />
              {/* net */}
              <g className="h2p-net">
                <line x1="150" y1="150" x2="250" y2="150" />
                <line x1="150" y1="170" x2="250" y2="170" />
                <line x1="150" y1="190" x2="250" y2="190" />
                <line x1="150" y1="210" x2="250" y2="210" />
                <line x1="170" y1="130" x2="170" y2="232" />
                <line x1="200" y1="130" x2="200" y2="232" />
                <line x1="230" y1="130" x2="230" y2="232" />
              </g>
              {/* the ball */}
              {shot && (
                <circle
                  key={shot.id}
                  className={`h2p-ball h2p-ball--${shot.kind}`}
                  cx="62"
                  cy="214"
                  r="11"
                />
              )}
              {!shot && <circle className="h2p-ball" cx="62" cy="214" r="11" />}
            </svg>

            <div className="h2p-controls">
              <button className="stamp stamp--chalk" onClick={() => kick('over')}>
                Kick it over · +1
              </button>
              <button className="stamp stamp--leather" onClick={() => kick('goal')}>
                Bury it in the net · +3
              </button>
            </div>

            <div className="h2p-board" role="status" aria-live="polite">
              <span className="h2p-score">
                ATHLONE {goals}-{String(points).padStart(2, '0')}
              </span>
              <span className="h2p-total">
                = {total} {total === 1 ? 'POINT' : 'POINTS'}
              </span>
              {verdict && <span className="h2p-verdict">{verdict}</span>}
              {(goals > 0 || points > 0) && (
                <button className="h2p-reset" onClick={reset}>
                  RESET
                </button>
              )}
            </div>
          </div>

          {/* the rules */}
          <ol className="h2p-rules reveal" style={{ '--reveal-delay': '0.3s' }}>
            {RULES.map(([head, body], i) => (
              <li key={head}>
                <span className="h2p-rule-no">0{i + 1}</span>
                <div>
                  <h3>{head}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="h2p-ctas reveal">
          <Link to="/tickets" className="stamp stamp--leather">
            See it live <span className="stamp-arrow">→</span>
          </Link>
          <Link to="/about#contact" className="stamp stamp--chalk">
            Try a training session
          </Link>
        </div>
      </div>

      <Ticker items={GLOSSARY} tone="navy" duration={44} />
    </section>
  )
}

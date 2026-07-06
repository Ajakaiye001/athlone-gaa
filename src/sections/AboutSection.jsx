import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import CountUp from '../components/CountUp.jsx'
import './AboutSection.css'

const STATS = [
  { value: 120, suffix: '', label: 'Years on the same grass' },
  { value: 64, suffix: '+', label: 'Homegrown adult players' },
  { value: 12, suffix: '', label: 'Teams, nursery to senior' },
  { value: 400, suffix: '+', label: 'Members and volunteers' },
]

export default function AboutSection() {
  const ref = useReveal()

  return (
    <section className="club" ref={ref}>
      <div className="container">
        <p className="tag reveal">
          <span className="tag-no">01</span> THE CLUB
        </p>
        <div className="chalk-line club-rule" />

        <div className="club-grid">
          <h2 className="club-head display reveal" style={{ '--reveal-delay': '0.1s' }}>
            Everyone from Athlone plays for Athlone
          </h2>

          <div className="club-copy reveal" style={{ '--reveal-delay': '0.2s' }}>
            <p>
              Founded in 1905, Athlone GAA is shaped by dedication, teamwork and local pride. We
              field football, hurling, ladies football and camogie teams from nursery to senior,
              and nobody is turned away.
            </p>
            <p>
              Talent is developed here, not bought. The 64 homegrown players on our adult panels
              started on the same pitch your kids will.
            </p>
            <Link to="/about" className="stamp">
              The full story <span className="stamp-arrow">→</span>
            </Link>
          </div>
        </div>

        <dl className="club-board">
          {STATS.map((s, i) => (
            <div className="club-stat reveal" style={{ '--reveal-delay': `${0.1 * i}s` }} key={s.label}>
              <dd className="display">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

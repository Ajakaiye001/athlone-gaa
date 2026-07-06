import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import './SummerCamp.css'

const SNAPS = [
  { img: '/assets/imgFrame1618868203.jpg', label: 'CAMP JERSEY', rot: -3 },
  { img: '/assets/imgFrame1618868204.jpg', label: 'DAILY COACHING', rot: 2 },
  { img: '/assets/imgFrame1618868205.jpg', label: 'GAMES', rot: -2 },
  { img: '/assets/imgFrame1618868206.jpg', label: 'FINAL DAY MEDALS', rot: 3 },
]

const LINES = [
  ['Skill development', 'Core football and hurling skills, structured by age group.'],
  ['Confidence and teamwork', 'Communication and self belief in an inclusive setting.'],
  ['Active, healthy fun', 'Games, drills and friendly competition all week.'],
  ['Community and friendship', 'Friendships that walk back in the gate every season.'],
]

export default function SummerCamp() {
  const ref = useReveal({ threshold: 0.15 })

  return (
    <section className="camp grain" id="summer-camp" ref={ref}>
      <div className="container">
        <p className="tag reveal">
          <span className="tag-no">04</span> CÚL CAMP · SUMMER 2026
        </p>

        <div className="camp-grid">
          <div className="camp-lead">
            <h2 className="display reveal" style={{ '--reveal-delay': '0.1s' }}>
              A summer on the grass
            </h2>
            <p className="reveal" style={{ '--reveal-delay': '0.2s' }}>
              One week in July. Boys and girls aged 6 to 13, a jersey, a ball, and the best craic
              of the summer holidays. Places fill fast.
            </p>
            <ol className="camp-lines reveal" style={{ '--reveal-delay': '0.3s' }}>
              {LINES.map(([head, body], i) => (
                <li key={head}>
                  <span className="camp-line-no">0{i + 1}</span>
                  <div>
                    <h3>{head}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to="/membership" className="stamp reveal" style={{ '--reveal-delay': '0.4s' }}>
              Book a place <span className="stamp-arrow">→</span>
            </Link>
          </div>

          <div className="camp-snaps">
            {SNAPS.map((s, i) => (
              <figure
                key={s.label}
                className="camp-snap reveal"
                style={{ '--reveal-delay': `${0.15 + i * 0.1}s`, '--rot': `${s.rot}deg` }}
              >
                <img src={s.img} alt={s.label.toLowerCase()} />
                <figcaption>{s.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

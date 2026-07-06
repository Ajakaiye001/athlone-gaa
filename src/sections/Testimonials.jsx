import { useEffect, useRef, useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import { testimonials } from '../data/teams.js'
import './Testimonials.css'

export default function Testimonials() {
  const ref = useReveal({ threshold: 0.2 })
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('in') // 'in' | 'out'
  const pending = useRef(null)
  const total = testimonials.length

  function go(next) {
    if (phase === 'out') return
    pending.current = ((next % total) + total) % total
    setPhase('out')
  }

  useEffect(() => {
    if (phase !== 'out') return
    const t = setTimeout(() => {
      setIndex(pending.current)
      setPhase('in')
    }, 260)
    return () => clearTimeout(t)
  }, [phase])

  const t = testimonials[index]

  return (
    <section className="terrace" ref={ref}>
      <div className="container">
        <p className="tag reveal">
          <span className="tag-no">05</span> FROM THE TERRACE
        </p>
        <div className="chalk-line terrace-rule" />

        <figure className={`terrace-stage ${phase === 'out' ? 'is-out' : ''}`}>
          <blockquote className="display">“{t.quote}”</blockquote>
          <figcaption>
            <img className="terrace-face" src={t.image} alt="" />
            <span className="terrace-name">{t.name}</span>
            <span className="terrace-role">{t.role}</span>
          </figcaption>
        </figure>

        <div className="terrace-nav reveal" style={{ '--reveal-delay': '0.2s' }}>
          <button onClick={() => go(index - 1)} aria-label="Previous voice">
            ←
          </button>
          <span className="terrace-count">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button onClick={() => go(index + 1)} aria-label="Next voice">
            →
          </button>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Ticker from '../components/Ticker.jsx'
import './Hero.css'

const TICKER = [
  'FT · ATHLONE 0-17 : 1-23 ROSCOMMON · ALLIANZ HL',
  'FT · ATHLONE 2-10 : 1-11 ROSCOMMON · ALLIANZ FL',
  'NEXT · SUN 10 MAY · LEINSTER SFC QF · THROW-IN 2PM',
  'SUMMER CAMP 2026 · REGISTRATION OPEN',
  'CLUB LOTTO JACKPOT · €8,400',
]

function SlamWord({ children, delay }) {
  return (
    <span className="slam" style={{ '--slam-delay': `${delay}ms` }}>
      <span>{children}</span>
    </span>
  )
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const titleRef = useRef(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // headline lags the scroll like a poster peeling off a wall
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      if (titleRef.current && y < window.innerHeight * 1.2) {
        titleRef.current.style.transform = `translateY(${y * 0.22}px)`
        titleRef.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.9)))
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className={`hero grain ${loaded ? 'is-inview' : ''}`}>
      <Navbar variant="chalk" />

      <div className="hero-stage container">
        <p className="hero-kicker reveal" style={{ '--reveal-delay': '0.1s' }}>
          <span className="tag">
            <span className="tag-no">EST. 1905</span> ATHLONE · CO. WESTMEATH
          </span>
        </p>

        <h1 className="hero-title display" aria-label="Pride of the parish" ref={titleRef}>
          <span className="hero-line">
            <SlamWord delay={80}>PRIDE</SlamWord> <SlamWord delay={160}>OF</SlamWord>{' '}
            <SlamWord delay={240}>THE</SlamWord>
          </span>
          <span className="hero-line hero-line--indent">
            <SlamWord delay={340}>PARISH</SlamWord>
          </span>
        </h1>

        <div className="hero-photo duotone reveal" style={{ '--reveal-delay': '0.45s' }}>
          <img src="/images/play-action.jpg" alt="An Athlone player rising highest to claim the ball" />
          <span className="hero-photo-caption">TRAINING GROUNDS · TUE &amp; THU · 19:30</span>
        </div>

        <div className="hero-foot reveal" style={{ '--reveal-delay': '0.6s' }}>
          <p>
            One hundred and twenty years of football and hurling. Volunteers, floodlights, and
            every generation of Athlone on the same grass.
          </p>
          <div className="hero-ctas">
            <Link to="/tickets" className="stamp stamp--leather">
              Buy Tickets <span className="stamp-arrow">→</span>
            </Link>
            <Link to="/membership" className="stamp stamp--chalk">
              Join Us
            </Link>
          </div>
        </div>
      </div>

      <Ticker items={TICKER} tone="navy" duration={34} />
    </section>
  )
}

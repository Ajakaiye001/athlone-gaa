import { useEffect, useRef } from 'react'
import './Ticker.css'

// Stadium-LED marquee. Scroll faster and the board spins faster,
// easing back to match pace when you stop.
export default function Ticker({ items, tone = 'pitch', duration = 30 }) {
  const rootRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tracks = rootRef.current?.querySelectorAll('.marquee-track')
    if (!tracks?.length) return

    let lastY = window.scrollY
    let boost = 0
    let raf = 0

    const loop = () => {
      boost *= 0.92
      const rate = 1 + Math.min(boost, 5)
      for (const track of tracks) {
        for (const anim of track.getAnimations()) anim.playbackRate = rate
      }
      raf = boost > 0.05 ? requestAnimationFrame(loop) : 0
      if (!raf) {
        for (const track of tracks) {
          for (const anim of track.getAnimations()) anim.playbackRate = 1
        }
      }
    }

    const onScroll = () => {
      const y = window.scrollY
      boost = Math.min(boost + Math.abs(y - lastY) / 60, 6)
      lastY = y
      if (!raf) raf = requestAnimationFrame(loop)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const line = items.map((t, i) => (
    <span className="ticker-item" key={i}>
      {t}
      <span className="ticker-dot" aria-hidden>
        ●
      </span>
    </span>
  ))

  return (
    <div
      ref={rootRef}
      className={`ticker ticker--${tone} marquee`}
      style={{ '--marquee-dur': `${duration}s` }}
    >
      <div className="marquee-track">{line}</div>
      <div className="marquee-track" aria-hidden>
        {line}
      </div>
    </div>
  )
}

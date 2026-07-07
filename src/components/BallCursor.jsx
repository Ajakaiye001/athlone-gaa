import { useEffect, useRef } from 'react'
import './BallCursor.css'

// A GAA (O'Neills) football that replaces the pointer on mouse devices.
// It trails the cursor, rolls in the direction of travel, squashes on
// click like a kick, and grows over anything clickable. Touch devices
// and reduced-motion users keep their native cursor behaviour.
export default function BallCursor() {
  const rootRef = useRef(null)
  const ballRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = rootRef.current
    const ball = ballRef.current
    const html = document.documentElement
    html.classList.add('has-ball-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let bx = mx
    let by = my
    let rot = 0
    let raf = 0
    let shown = false

    const show = () => {
      if (!shown) {
        shown = true
        el.classList.add('is-visible')
      }
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      show()
    }
    const onDown = () => el.classList.add('is-kick')
    const onUp = () => el.classList.remove('is-kick')
    const onDocLeave = () => {
      shown = false
      el.classList.remove('is-visible')
    }

    const INTERACTIVE = 'a, button, [role="button"], [role="tab"], [role="radio"], label, select, summary'
    const TEXT = 'input:not([type="radio"]):not([type="checkbox"]):not([type="button"]):not([type="submit"]), textarea'
    const onOver = (e) => {
      const t = e.target
      const overText = t.closest && t.closest(TEXT)
      el.classList.toggle('is-text', !!overText)
      el.classList.toggle('is-hover', !overText && !!(t.closest && t.closest(INTERACTIVE)))
    }

    const tick = () => {
      const ease = reduce ? 1 : 0.2
      const dx = mx - bx
      const dy = my - by
      bx += dx * ease
      by += dy * ease
      if (!reduce) rot += dx * 0.5
      el.style.transform = `translate3d(${bx}px, ${by}px, 0)`
      ball.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onDocLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      html.classList.remove('has-ball-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onDocLeave)
    }
  }, [])

  return (
    <div className="ballcursor" ref={rootRef} aria-hidden>
      <div className="ballcursor-ball" ref={ballRef}>
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bc-sphere" cx="38%" cy="34%" r="72%">
              <stop offset="0%" stopColor="#eac583" />
              <stop offset="55%" stopColor="#cf9445" />
              <stop offset="100%" stopColor="#9a6a2c" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#bc-sphere)" stroke="#0b1526" strokeWidth="1.2" />
          {/* central and side seams of an O'Neills-style football */}
          <ellipse cx="20" cy="20" rx="6.5" ry="17.6" fill="none" stroke="#0b1526" strokeWidth="1.3" />
          <path d="M6.2 12.5 Q13 20 6.2 27.5" fill="none" stroke="#0b1526" strokeWidth="1.3" />
          <path d="M33.8 12.5 Q27 20 33.8 27.5" fill="none" stroke="#0b1526" strokeWidth="1.3" />
          {/* highlight */}
          <ellipse cx="14" cy="13" rx="4.4" ry="3" fill="#fff" opacity="0.35" />
        </svg>
      </div>
    </div>
  )
}

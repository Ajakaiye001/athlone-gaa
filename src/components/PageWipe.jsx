import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './PageWipe.css'

// Route-change wipe: the new page mounts covered by a pitch-green panel
// that sweeps up and away, crest centred.
export default function PageWipe() {
  const { pathname } = useLocation()
  const [stage, setStage] = useState('idle') // idle | cover | reveal
  const first = useRef(true)

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setStage('cover')
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setStage('reveal')),
    )
    const done = setTimeout(() => setStage('idle'), 900)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(done)
    }
  }, [pathname])

  if (stage === 'idle') return null

  return (
    <div className={`wipe wipe--${stage}`} aria-hidden>
      <img src="/assets/imgImage232.png" alt="" />
    </div>
  )
}

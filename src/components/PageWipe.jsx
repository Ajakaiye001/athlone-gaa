import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './PageWipe.css'

// Route-change wipe: the new page mounts covered by a pitch-green panel
// that sweeps up and away, crest centred. Never plays on the initial load.
export default function PageWipe() {
  const { pathname } = useLocation()
  const [stage, setStage] = useState('idle') // idle | cover | reveal
  const lastPath = useRef(pathname)
  const gen = useRef(0)

  useEffect(() => {
    // Skip the initial load (and StrictMode's double-invoke, which sees
    // the same pathname twice). Only a real route change wipes.
    if (lastPath.current === pathname) return
    lastPath.current = pathname

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Generation counter: if anything fires late (throttled timers in a
    // background tab), stale callbacks can't resurrect the wipe.
    const g = ++gen.current
    setStage('cover')
    const t1 = setTimeout(() => {
      if (gen.current === g) setStage('reveal')
    }, 50)
    const t2 = setTimeout(() => {
      if (gen.current === g) setStage('idle')
    }, 950)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      gen.current += 1
      setStage('idle')
    }
  }, [pathname])

  if (stage === 'idle') return null

  return (
    <div className={`wipe wipe--${stage}`} aria-hidden>
      <img src="/assets/imgImage232.png" alt="" />
    </div>
  )
}

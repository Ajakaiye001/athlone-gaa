import { useEffect, useRef } from 'react'

// Adds .is-inview to the element so its .reveal / .slam / .chalk-line
// children animate in.
//
// Robust against route changes: on mount we defer one frame (so ScrollToTop
// has settled) and reveal immediately if the element is already on screen —
// IntersectionObserver's initial callback is unreliable right after a
// client-side navigation. Below-the-fold elements still reveal on scroll,
// and a failsafe guarantees content is never left invisible.
export default function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => el.classList.add('is-inview')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show()
      return
    }

    const inView = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return r.top < vh * 0.95 && r.bottom > 0
    }

    let io
    const raf = requestAnimationFrame(() => {
      if (inView()) {
        show()
        return
      }
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              show()
              io.disconnect()
            }
          }
        },
        { threshold: options.threshold ?? 0.2, rootMargin: options.rootMargin ?? '0px 0px -8% 0px' },
      )
      io.observe(el)
    })

    // Failsafe: content must never stay invisible. setTimeout fires even when
    // rAF / IntersectionObserver are throttled (backgrounded tab, odd
    // route-change timing), so on-screen content always ends up revealed.
    const failsafe = setTimeout(() => {
      if (!el.classList.contains('is-inview') && inView()) show()
    }, 1400)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(failsafe)
      if (io) io.disconnect()
    }
  }, [])

  return ref
}

import { useEffect, useRef } from 'react'

// Adds .is-inview to the element once it enters the viewport.
// Children styled with .reveal / .slam / .chalk-line animate from that class.
export default function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-inview')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: options.threshold ?? 0.2, rootMargin: options.rootMargin ?? '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

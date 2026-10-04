import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Smooth scroll, unless the visitor has asked the OS for less motion. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    // anchors: in-page links glide instead of jumping, and stop clear of the fixed nav
    const lenis = new Lenis({ autoRaf: true, duration: 1.05, wheelMultiplier: 0.9, anchors: { offset: -64 } })
    return () => lenis.destroy()
  }, [])
}

/** Reveal-on-enter for any element carrying the `.reveal` class. */
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}

const formatIST = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

/** Local time in Chennai, ticking. */
export function useClock() {
  const [time, setTime] = useState(() => formatIST.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(formatIST.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

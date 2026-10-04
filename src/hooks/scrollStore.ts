import { useSyncExternalStore } from 'react'

/**
 * One rAF-throttled scroll reader feeds everything that reacts to scroll:
 * the HUD, the nav, and the WebGL loop. Components subscribe to the single
 * field they need, so a scroll frame re-renders the HUD readout and nothing else.
 */

type State = {
  /** whole-page progress, 0–100, integer so the HUD only re-renders on change */
  pct: number
  section: string
  onBone: boolean
  lifted: boolean
  sceneActive: boolean
}

let state: State = { pct: 0, section: 'top', onBone: false, lifted: false, sceneActive: true }
// Read every frame by the camera — kept out of React state on purpose.
let hero = 0

const listeners = new Set<() => void>()

function set(next: State) {
  if (
    next.pct === state.pct &&
    next.section === state.section &&
    next.onBone === state.onBone &&
    next.lifted === state.lifted &&
    next.sceneActive === state.sceneActive
  ) {
    return
  }
  state = next
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useScroll<T extends string | number | boolean>(select: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => select(state),
    () => select(state),
  )
}

export const readHeroProgress = () => hero

/** Attach the listener. `panelId` is the opaque panel that hides the WebGL scene. */
export function startScrollTelemetry(ids: readonly string[], panelId: string) {
  let els: HTMLElement[] = []
  let panel: HTMLElement | null = null
  let ticking = false

  const collect = () => {
    els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    panel = document.getElementById(panelId)
  }

  const read = () => {
    ticking = false
    const y = window.scrollY
    const vh = window.innerHeight
    const max = document.documentElement.scrollHeight - vh

    hero = Math.min(y / Math.max(vh, 1), 1)

    let section = 'top'
    for (const el of els) {
      if (el.getBoundingClientRect().top <= vh * 0.42) section = el.id
    }

    let onBone = false
    let covered = false
    if (panel) {
      const r = panel.getBoundingClientRect()
      onBone = r.top < 70 && r.bottom > 90
      covered = r.top <= 0 && r.bottom >= vh
    }

    set({
      pct: max > 0 ? Math.round(Math.min(y / max, 1) * 100) : 0,
      section,
      onBone,
      lifted: y > 40,
      sceneActive: !covered,
    })
  }

  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(read)
    }
  }

  const onResize = () => {
    collect()
    onScroll()
  }

  collect()
  read()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  return () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
  }
}

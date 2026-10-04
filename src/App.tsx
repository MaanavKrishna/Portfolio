import { Suspense, lazy, useEffect } from 'react'
import Contact from './components/Contact'
import Datasheet from './components/Datasheet'
import Hero from './components/Hero'
import Hud from './components/Hud'
import Nav from './components/Nav'
import Projects from './components/Projects'
import { Seam, SignalStrip } from './components/Strip'
import { profile, sections } from './data/content'
import { startScrollTelemetry, useScroll } from './hooks/scrollStore'
import { useReveal, useSmoothScroll } from './hooks/useSite'

// Three.js is the heaviest thing here — keep it out of the first paint.
const ActuatorField = lazy(() => import('./components/ActuatorField'))

const IDS = sections.map((s) => s.id)

function Scene() {
  // the only scroll-driven value this subtree reads, so the page itself never re-renders on scroll
  const active = useScroll((s) => s.sceneActive)
  return (
    <Suspense
      fallback={
        <div
          className="fixed inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 55% at 50% 78%, rgba(242,160,60,0.16), transparent 70%), #06090f',
          }}
        />
      }
    >
      <ActuatorField active={active} />
    </Suspense>
  )
}

export default function App() {
  useSmoothScroll()
  useReveal()
  useEffect(() => startScrollTelemetry(IDS, 'datasheet'), [])

  return (
    <>
      <a
        href="#work"
        className="u-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-amber focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to the work
      </a>

      <Scene />
      <Hud />
      <Nav />

      <main className="relative">
        <Hero />
        <SignalStrip />
        <Projects />

        <Seam label="Datasheet — the static facts" tone="bone" />
        <Datasheet />
        <Seam label="Runtime — back to the field" tone="ink" />

        <Contact />
      </main>

      <footer className="relative z-10 border-t border-bone/10 bg-ink/85 px-5 py-10 backdrop-blur-[3px] sm:px-10">
        <div className="u-meta mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 text-dim/55">
          <span>
            {profile.name} · {profile.school}
          </span>
          <span className="flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline hover:text-bone"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline hover:text-bone"
            >
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="link-underline hover:text-bone">
              Email
            </a>
          </span>
          <span>Built with React, Three.js and Vite · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  )
}

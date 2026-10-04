import type { CSSProperties } from 'react'
import { profile } from '../data/content'

// staggered entrance, driven by CSS (see .rise in index.css)
const step = (i: number) => ({ '--i': i }) as CSSProperties

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end px-5 pt-28 pb-24 sm:px-10 sm:pb-28"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div
          style={step(0)}
          className="rise u-label mb-8 inline-flex items-center gap-2.5 border border-amber/30 bg-amber/[0.06] px-3 py-1.5 text-amber"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping bg-mint opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 bg-mint" />
          </span>
          {profile.status}
        </div>

        <h1 className="u-display text-[clamp(3.2rem,13vw,10.5rem)]">
          <span style={step(1)} className="rise block">
            {profile.first}
          </span>
          <span
            style={{ ...step(2), WebkitTextStroke: '1.5px var(--color-amber)' }}
            className="rise block text-transparent"
          >
            {profile.last}
          </span>
        </h1>

        <div className="mt-10 grid gap-10 border-t border-bone/12 pt-8 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <p style={step(3)} className="rise max-w-xl text-lg leading-relaxed text-bone/85 sm:text-xl">
            {profile.lede}
          </p>

          <div
            style={step(4)}
            className="rise border border-bone/10 bg-ink/55 p-6 backdrop-blur-md sm:p-7"
          >
            <dl className="u-meta grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-dim">
              <dt className="text-dim/50">STUDY</dt>
              <dd className="text-bone/80">{profile.role}</dd>
              <dt className="text-dim/50">PLACE</dt>
              <dd className="text-bone/80">
                {profile.school}, {profile.location}
              </dd>
              <dt className="text-dim/50">CGPA</dt>
              <dd className="text-bone/80">{profile.cgpa}</dd>
              <dt className="text-dim/50">FOCUS</dt>
              <dd className="text-bone/80">ML · Systems · Web · Research</dd>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="u-label group inline-flex items-center gap-3 bg-amber px-5 py-3.5 text-ink transition-colors hover:bg-mint"
              >
                See the work
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="u-label inline-flex items-center gap-3 border border-bone/20 px-5 py-3.5 text-bone/80 transition-colors hover:border-bone/60 hover:text-bone"
              >
                Email me
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        style={step(9)}
        className="rise u-meta pointer-events-none absolute top-32 right-5 hidden text-right text-dim/45 sm:right-10 lg:block"
      >
        <span className="block">move the cursor —</span>
        <span className="block text-amber/60">the field responds</span>
      </div>
    </section>
  )
}

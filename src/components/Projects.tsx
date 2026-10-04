import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { builds, profile, projects, type Build, type Project } from '../data/content'
import { prefersReducedMotion } from '../hooks/useSite'
import ProjectMotif from './ProjectMotif'

const ext = { target: '_blank', rel: 'noreferrer noopener' } as const

function TiltPanel({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)

  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    const { clientX, clientY } = e
    // one style write per frame, however fast the pointer events arrive
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      const x = (clientX - r.left) / r.width - 0.5
      const y = (clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateX(${-y * 11}deg) rotateY(${x * 15}deg) scale(1.015)`
      el.style.transitionDuration = '80ms'
    })
  }

  const reset = () => {
    cancelAnimationFrame(frame.current)
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.transitionDuration = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      className="tilt card-edge group relative aspect-[16/10] overflow-hidden border border-bone/12 bg-ink-2/70"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-bone) 1px, transparent 1px), linear-gradient(90deg, var(--color-bone) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 78%)',
          opacity: 0.07,
        }}
      />
      <div className="tilt-layer absolute inset-6 sm:inset-9">
        <ProjectMotif motif={project.motif} />
      </div>
      <span className="u-label absolute top-4 left-4 text-dim/50">{project.kind}</span>
    </div>
  )
}

function Row({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article className="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? 'lg:order-2' : ''}>
        <TiltPanel project={project} />
      </div>

      <div className={flip ? 'lg:order-1' : ''}>
        {project.badge && <p className="u-label mb-4 text-mint/80">{project.badge}</p>}
        <h3 className="u-display text-[clamp(2rem,4.4vw,3.4rem)] text-bone">{project.name}</h3>
        <p className="mt-4 max-w-lg text-lg text-bone/85">{project.summary}</p>
        <p className="mt-4 max-w-lg text-[0.97rem] leading-relaxed text-dim">{project.detail}</p>

        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Built with">
          {project.stack.map((s) => (
            <li key={s} className="u-meta border border-bone/12 px-2.5 py-1 text-bone/65">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.live && (
            <a href={project.live.url} {...ext} className="u-label link-underline text-amber">
              {project.live.label} ↗
            </a>
          )}
          {project.repo && (
            <a href={project.repo} {...ext} className="u-label link-underline text-bone/70">
              Source ↗
            </a>
          )}
          {project.extras?.map((x) => (
            <a key={x.url} href={x.url} {...ext} className="u-meta link-underline text-dim">
              {x.label} ↗
            </a>
          ))}
          {!project.live && !project.repo && (
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(`Walkthrough — ${project.name}`)}`}
              className="u-meta link-underline text-dim"
            >
              Code isn&rsquo;t public — ask me for a walkthrough ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Card({ build }: { build: Build }) {
  return (
    <article className="reveal card-edge flex flex-col border border-bone/10 bg-ink-2/60 p-6 transition-colors hover:bg-ink-3/70">
      <p className="u-label text-dim/55">{build.kind}</p>
      <h4 className="mt-3 font-display text-2xl font-bold tracking-tight text-bone">{build.name}</h4>
      <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-dim">{build.summary}</p>
      <p className="u-meta mt-5 text-bone/50">{build.stack.join(' · ')}</p>
      {(build.live || build.repo || build.extras) && (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-bone/10 pt-4">
          {build.live && (
            <a href={build.live} {...ext} className="u-label link-underline text-amber">
              Live ↗
            </a>
          )}
          {build.repo && (
            <a href={build.repo} {...ext} className="u-label link-underline text-bone/70">
              Source ↗
            </a>
          )}
          {build.extras?.map((x) => (
            <a key={x.url} href={x.url} {...ext} className="u-meta link-underline text-dim">
              {x.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export default function Projects() {
  return (
    <section
      id="work"
      className="relative z-10 bg-ink/80 px-5 py-24 backdrop-blur-[3px] sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <header className="reveal mb-16 flex flex-wrap items-end justify-between gap-6 border-b border-bone/12 pb-8">
          <div>
            <p className="u-label mb-4 text-amber">Things I built and shipped</p>
            <h2 className="u-display text-[clamp(2.4rem,7vw,5.5rem)]">Work</h2>
          </div>
          <p className="u-meta max-w-xs text-dim">
            Two hackathon systems, a framework, a model, an engine and a full-stack app. Where
            something is deployed, the link goes to the running thing, not a video.
          </p>
        </header>

        <div className="flex flex-col gap-24 sm:gap-32">
          {projects.map((p, i) => (
            <Row key={p.name} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-28 sm:mt-36">
          <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-bone/12 pb-6">
            <h3 className="font-display text-3xl font-bold tracking-tight text-bone">More builds</h3>
            <a href={`${profile.github}?tab=repositories`} {...ext} className="u-label link-underline text-dim">
              Every repository on GitHub ↗
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {builds.map((b) => (
              <Card key={b.name} build={b} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

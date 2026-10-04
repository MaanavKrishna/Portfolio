import { sections } from '../data/content'
import { useScroll } from '../hooks/scrollStore'
import { useClock } from '../hooks/useSite'

const CORNERS = [
  { pos: 'left-4 top-4 sm:left-6 sm:top-6', edge: 'border-l border-t' },
  { pos: 'right-4 top-4 sm:right-6 sm:top-6', edge: 'border-r border-t' },
  { pos: 'left-4 bottom-4 sm:left-6 sm:bottom-6', edge: 'border-l border-b' },
  { pos: 'right-4 bottom-4 sm:right-6 sm:bottom-6', edge: 'border-r border-b' },
]

const LABELS: Record<string, string> = Object.fromEntries(sections.map((s) => [s.id, s.label]))

function Readout({ onBone }: { onBone: boolean }) {
  const clock = useClock()
  const pct = useScroll((s) => s.pct)
  const section = useScroll((s) => s.section)
  const sep = onBone ? 'text-graphite/25' : 'text-dim/30'

  return (
    <div
      className={`u-meta absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-5 border px-4 py-1.5 whitespace-nowrap backdrop-blur-md transition-colors duration-500 sm:bottom-7 ${
        onBone
          ? 'border-graphite/12 bg-bone/80 text-graphite/55'
          : 'border-bone/10 bg-ink/70 text-dim/70'
      }`}
    >
      <span>CHENNAI {clock} IST</span>
      <span className={sep}>│</span>
      <span className={onBone ? 'text-ember' : 'text-amber'}>
        {(LABELS[section] ?? 'Top').toUpperCase()}
      </span>
      <span className={sep}>│</span>
      <span>{String(pct).padStart(3, '0')}%</span>
    </div>
  )
}

function Rail() {
  const pct = useScroll((s) => s.pct)
  return (
    <div className="hud-rail">
      <span style={{ height: `${pct}%` }} />
    </div>
  )
}

export default function Hud() {
  const onBone = useScroll((s) => s.onBone)
  const tone = onBone ? 'border-graphite/45' : 'border-amber/60'

  return (
    <div className="hud hidden md:block" aria-hidden="true">
      {CORNERS.map((c) => (
        <div key={c.pos} className={`hud-corner ${c.pos} ${c.edge} ${tone}`} />
      ))}
      <Rail />
      <Readout onBone={onBone} />
    </div>
  )
}

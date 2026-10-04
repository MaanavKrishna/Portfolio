import { marquee } from '../data/content'

export function Seam({ label, tone }: { label: string; tone: 'bone' | 'ink' }) {
  const color = tone === 'bone' ? 'text-graphite/45' : 'text-amber/60'
  return (
    <div className={`seam ${tone === 'bone' ? 'bg-bone' : 'bg-ink'} ${color} relative z-10`}>
      <span className="u-label whitespace-nowrap">{label}</span>
      <span className="seam-ticks" />
      <span className="u-meta hidden whitespace-nowrap opacity-60 sm:inline">{label}</span>
    </div>
  )
}

export function SignalStrip() {
  const items = [...marquee, ...marquee]
  return (
    <div className="relative z-10 overflow-hidden border-y border-bone/10 bg-ink-2/80 py-3 backdrop-blur-md">
      <div className="marquee">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="u-label flex items-center text-bone/55">
            <span className="px-6">{t}</span>
            <span className={i % 3 === 0 ? 'text-amber' : 'text-bone/20'}>／</span>
          </span>
        ))}
      </div>
    </div>
  )
}

import type { CSSProperties, ReactElement } from 'react'
import type { Motif } from '../data/content'

/**
 * Each project gets a drawing of the thing it actually does — raw fares
 * collapsing into an index, one file splitting into browser and server, a
 * search tree over a board. No screenshots, no mockups. Hover plays the idea.
 */

const A = 'var(--color-amber)'
const M = 'var(--color-mint)'
const L = 'rgba(236,228,211,0.22)'
const T = 'rgba(236,228,211,0.5)'

const label = { fontFamily: 'var(--font-mono)', fontSize: 5, letterSpacing: 0.6, fill: T } as const

// deterministic scatter so the drawing is identical on every render
const scatter = (n: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const r = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
    return r - Math.floor(r)
  })

/** AeroPulse — noisy fares on the left, a clean index on the right. */
function Index() {
  const xs = scatter(36, 1)
  const ys = scatter(36, 2)
  const line = [
    [104, 64],
    [118, 60],
    [132, 62],
    [146, 54],
    [160, 57],
    [174, 50],
    [188, 47],
  ]
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      {xs.map((x, i) => {
        const outlier = i % 9 === 4
        const cx = 14 + x * 66
        const cy = outlier ? 18 + ys[i] * 10 : 40 + ys[i] * 48
        return outlier ? (
          <path
            key={i}
            d={`M${cx - 2} ${cy - 2} l4 4 m0 -4 l-4 4`}
            stroke={M}
            strokeWidth="0.9"
          />
        ) : (
          <circle key={i} cx={cx} cy={cy} r="1.4" fill={L} />
        )
      })}
      <path d="M84 30 L96 60 L84 90" fill="none" stroke={L} strokeWidth="1" />
      <line x1="100" y1="64" x2="192" y2="64" stroke={L} strokeWidth="0.6" strokeDasharray="2 2" />
      <polyline
        points={line.map((p) => p.join(',')).join(' ')}
        fill="none"
        stroke={A}
        strokeWidth="1.6"
        strokeDasharray="120"
        className="redraw"
        style={{ '--len': 120 } as CSSProperties}
      />
      {line.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="1.6" fill={A} />
      ))}
      {['T+1', 'T+7', 'T+14', 'T+30', 'T+45'].map((t, i) => (
        <text key={t} x={104 + i * 20} y="104" style={label}>
          {t}
        </text>
      ))}
      <text x="14" y="104" style={label}>
        11 SOURCES
      </text>
      <text x="166" y="72" style={label}>
        100
      </text>
    </svg>
  )
}

/** PyWeb — one file, the compiler splits it into browser and server. */
function Split() {
  const rows = [M, A, A, M, M, A, M]
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect x="18" y="16" width="62" height="88" fill="none" stroke={L} strokeWidth="1" />
      <text x="22" y="24" style={label}>
        app.pyweb
      </text>
      {rows.map((c, i) => (
        <rect
          key={i}
          x={24 + (i % 3) * 4}
          y={32 + i * 9.5}
          width={40 - (i % 3) * 8}
          height="4"
          fill={c}
          opacity="0.75"
          style={{ transition: `transform .6s cubic-bezier(.2,.8,.2,1) ${i * 50}ms` }}
          className={c === M ? 'group-hover:-translate-y-[3px]' : 'group-hover:translate-y-[3px]'}
        />
      ))}
      <path d="M82 60 C102 60 102 36 120 36" fill="none" stroke={M} strokeWidth="1" />
      <path d="M82 60 C102 60 102 84 120 84" fill="none" stroke={A} strokeWidth="1" />
      <rect x="120" y="22" width="66" height="28" fill="none" stroke={M} strokeWidth="1.2" />
      <text x="125" y="31" style={{ ...label, fill: M }}>
        BROWSER
      </text>
      <text x="125" y="43" style={label}>
        reactive UI
      </text>
      <rect x="120" y="70" width="66" height="28" fill="none" stroke={A} strokeWidth="1.2" />
      <text x="125" y="79" style={{ ...label, fill: A }}>
        SERVER
      </text>
      <text x="125" y="91" style={label}>
        RPC · data
      </text>
    </svg>
  )
}

/** Hum — a vocalisation, and the set of meanings conformal prediction offers. */
function Wave() {
  const amp = scatter(44, 3)
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      {amp.map((a, i) => {
        const env = Math.sin((i / 43) * Math.PI)
        const h = 4 + a * 30 * env
        return (
          <rect
            key={i}
            x={14 + i * 4}
            y={74 - h / 2}
            width="2"
            height={h}
            fill={env > 0.55 ? A : L}
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              transition: `transform .5s cubic-bezier(.2,.8,.2,1) ${i * 12}ms`,
            }}
            className="group-hover:scale-y-[1.35]"
          />
        )
      })}
      {[
        ['WANTS THAT', true],
        ['TOO LOUD', true],
        ['TIRED', false],
      ].map(([t, inSet], i) => (
        <g key={String(t)}>
          <rect
            x={14 + i * 58}
            y="16"
            width="52"
            height="14"
            fill={inSet ? 'rgba(111,227,196,0.12)' : 'none'}
            stroke={inSet ? M : L}
            strokeWidth="1"
            strokeDasharray={inSet ? undefined : '2 2'}
          />
          <text x={19 + i * 58} y="25" style={{ ...label, fill: inSet ? M : T }}>
            {String(t)}
          </text>
        </g>
      ))}
      <text x="14" y="112" style={label}>
        ON-DEVICE · AUDIO NEVER LEAVES
      </text>
    </svg>
  )
}

/** Checkora — a board, and the search tree the engine walks over it. */
function Board() {
  const cells = []
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 0) continue
      cells.push(<rect key={`${r}-${c}`} x={44 + c * 14} y={12 + r * 12} width="14" height="12" fill={L} />)
    }
  }
  const leaves = [58, 86, 114, 142]
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect x="44" y="12" width="112" height="96" fill="none" stroke={L} strokeWidth="1" />
      {cells}
      <g stroke={A} strokeWidth="1" fill="none">
        <path d="M100 108 L72 78 M100 108 L100 78 M100 108 L128 78" />
        <path d="M72 78 L58 52 M72 78 L86 52 M128 78 L114 52 M128 78 L142 52" opacity="0.55" />
      </g>
      {[72, 100, 128].map((x) => (
        <circle key={x} cx={x} cy="78" r="3" fill={A} />
      ))}
      {leaves.map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy="52"
          r="2.4"
          fill={i === 1 ? M : 'none'}
          stroke={M}
          strokeWidth="1"
          opacity={i === 1 ? 1 : 0.4}
          className="transition-opacity duration-500 group-hover:opacity-100"
          style={{ transitionDelay: `${i * 90}ms` }}
        />
      ))}
      {/* pruned branches: alpha-beta never looks past them */}
      {[114, 142].map((x) => (
        <path key={x} d={`M${x - 3} 44 l6 -6`} stroke={M} strokeWidth="1" opacity="0.6" />
      ))}
      <circle cx="100" cy="108" r="4" fill={M} />
    </svg>
  )
}

/** Traceline — a summary point linked back to the paragraph it came from. */
function Doc() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      <rect x="18" y="10" width="76" height="100" fill="none" stroke={L} strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <rect key={i} x="25" y={20 + i * 8.5} width={i % 4 === 3 ? 40 : 62} height="3" fill={L} />
      ))}
      <rect
        x="22"
        y="51"
        width="68"
        height="16"
        fill={A}
        opacity="0.18"
        className="transition-opacity duration-500 group-hover:opacity-40"
      />
      <rect x="22" y="51" width="68" height="16" fill="none" stroke={A} strokeWidth="1" />
      <path d="M90 59 C108 59 108 40 122 40" fill="none" stroke={A} strokeWidth="1" strokeDasharray="2 2" />
      <text x="122" y="20" style={label}>
        SUMMARY · ENGINEER
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="122" y={36 + i * 16} width="4" height="4" fill={i === 0 ? A : L} />
          <rect x="130" y={37 + i * 16} width={i === 1 ? 34 : 48} height="3" fill={i === 0 ? A : L} />
        </g>
      ))}
      <rect x="122" y="88" width="58" height="13" fill="none" stroke={M} strokeWidth="1" />
      <text x="126" y="96.5" style={{ ...label, fill: M }}>
        DUE · 14 NOV
      </text>
      <text x="22" y="118" style={label}>
        മലയാളം / ENGLISH
      </text>
    </svg>
  )
}

/** DevHub — two repositories, side by side. */
function Compare() {
  const a = [0.8, 0.55, 0.9, 0.35, 0.6]
  const b = [0.5, 0.75, 0.45, 0.65, 0.3]
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
      {['STARS', 'FORKS', 'COMMITS', 'ISSUES', 'CONTRIB'].map((t, i) => (
        <g key={t}>
          <text x="14" y={30 + i * 17} style={label}>
            {t}
          </text>
          <line x1="100" y1={22 + i * 17} x2="100" y2={34 + i * 17} stroke={L} strokeWidth="0.8" />
          <rect
            x={100 - a[i] * 50}
            y={24 + i * 17}
            width={a[i] * 50}
            height="7"
            fill={A}
            opacity="0.85"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'right',
              transition: `transform .6s cubic-bezier(.2,.8,.2,1) ${i * 60}ms`,
            }}
            className="group-hover:scale-x-110"
          />
          <rect
            x="101"
            y={24 + i * 17}
            width={b[i] * 50}
            height="7"
            fill="none"
            stroke={M}
            strokeWidth="1"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'left',
              transition: `transform .6s cubic-bezier(.2,.8,.2,1) ${i * 60}ms`,
            }}
            className="group-hover:scale-x-110"
          />
        </g>
      ))}
      <circle cx="74" cy="12" r="4" fill="none" stroke={A} strokeWidth="1" />
      <circle cx="126" cy="12" r="4" fill="none" stroke={M} strokeWidth="1" />
      <text x="88" y="14" style={label}>
        VS
      </text>
    </svg>
  )
}

const MOTIFS: Record<Motif, () => ReactElement> = {
  index: Index,
  split: Split,
  wave: Wave,
  board: Board,
  doc: Doc,
  compare: Compare,
}

export default function ProjectMotif({ motif }: { motif: Motif }) {
  const Drawing = MOTIFS[motif]
  return <Drawing />
}

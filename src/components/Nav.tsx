import { useEffect, useState } from 'react'
import { profile, sections } from '../data/content'
import { useScroll } from '../hooks/scrollStore'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const lifted = useScroll((s) => s.lifted)
  const onBone = useScroll((s) => s.onBone)
  const section = useScroll((s) => s.section)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const text = onBone ? 'text-graphite' : 'text-bone'
  const muted = onBone ? 'text-graphite/60' : 'text-dim'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          lifted
            ? onBone
              ? 'bg-bone/85 backdrop-blur-xl'
              : 'bg-ink/70 backdrop-blur-xl'
            : ''
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-10">
          <a
            href="#top"
            className={`u-label flex items-center gap-2.5 ${text}`}
            aria-label="Maanav Krishna, back to top"
          >
            <span
              className={`grid h-7 w-7 place-items-center border ${
                onBone ? 'border-graphite/30' : 'border-amber/50'
              } text-[0.7rem] tracking-normal ${onBone ? 'text-graphite' : 'text-amber'}`}
            >
              MK
            </span>
            <span className="hidden sm:inline">Maanav Krishna</span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`u-label transition-colors ${
                    section === s.id
                      ? onBone
                        ? 'text-ember'
                        : 'text-amber'
                      : onBone
                        ? `${muted} hover:text-graphite`
                        : `${muted} hover:text-bone`
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                className={`u-label border px-3.5 py-2 transition-colors ${
                  onBone
                    ? 'border-graphite/30 text-graphite hover:bg-graphite hover:text-bone'
                    : 'border-amber/45 text-amber hover:bg-amber hover:text-ink'
                }`}
              >
                Email me
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`u-label md:hidden ${text} border px-3 py-2 ${
              onBone ? 'border-graphite/30' : 'border-bone/25'
            }`}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-[45] bg-ink/[0.97] backdrop-blur-2xl md:hidden">
          <ul className="flex h-full flex-col items-start justify-center gap-2 px-8">
            {sections.map((s) => (
              <li key={s.id} className="w-full border-b border-bone/10 py-4">
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="u-display flex items-center gap-4 text-4xl text-bone"
                >
                  <span
                    className={`h-1.5 w-1.5 ${section === s.id ? 'bg-amber' : 'bg-bone/25'}`}
                  />
                  {s.label}
                </a>
              </li>
            ))}
            <li className="pt-8">
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className="u-label border border-amber/50 px-4 py-3 text-amber"
              >
                {profile.email}
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

import { useState, type FormEvent } from 'react'
import { profile } from '../data/content'

const LINKS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GitHub', value: profile.githubHandle, href: profile.github },
  { label: 'LinkedIn', value: profile.linkedinHandle, href: profile.linkedin },
]

export default function Contact() {
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [message, setMessage] = useState('')

  const send = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio — ${name || 'hello'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${from}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const field =
    'w-full border-b border-bone/20 bg-transparent py-3 text-bone placeholder:text-dim/45 focus:border-amber focus:outline-none'

  return (
    <section
      id="contact"
      className="relative z-10 bg-ink/72 px-5 py-24 backdrop-blur-[3px] sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <header className="reveal border-b border-bone/12 pb-8">
          <p className="u-label mb-4 text-amber">Say hello</p>
          <h2 className="u-display text-[clamp(2.6rem,9vw,7rem)]">
            Let&rsquo;s build
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px var(--color-mint)' }}>
              something
            </span>
          </h2>
        </header>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div className="reveal">
            <p className="max-w-md text-lg text-bone/80">
              I&rsquo;m a second-year student with shipped systems, a research project, and room
              for more. If you have an internship, a research problem, an open-source issue, or
              something odd you want built — write to me.
            </p>

            <dl className="mt-10 border-t border-bone/12">
              {LINKS.map((l) => (
                <div key={l.label} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-bone/12 py-4">
                  <dt className="u-meta pt-1 text-dim/55">{l.label.toUpperCase()}</dt>
                  <dd>
                    <a
                      href={l.href}
                      target={l.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noreferrer noopener"
                      className="link-underline text-bone hover:text-amber"
                    >
                      {l.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <form onSubmit={send} className="reveal">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="u-label text-dim/60">Your name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={field}
                  placeholder="Name"
                />
              </label>
              <label className="block">
                <span className="u-label text-dim/60">Your email</span>
                <input
                  required
                  type="email"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className={field}
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-6 block">
              <span className="u-label text-dim/60">Message</span>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${field} resize-none`}
                placeholder="What are you building?"
              />
            </label>

            <button
              type="submit"
              className="u-label mt-8 inline-flex items-center gap-3 bg-amber px-6 py-4 text-ink transition-colors hover:bg-mint"
            >
              Compose the email
              <span aria-hidden="true">↗</span>
            </button>
            <p className="u-meta mt-4 text-dim/50">
              This opens your own mail app with the message filled in. Nothing is sent from here.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

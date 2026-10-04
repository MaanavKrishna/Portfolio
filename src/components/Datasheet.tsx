import { certifications, profile, research, skillGroups, timeline } from '../data/content'

const FACTS: [string, string][] = [
  ['Name', profile.name],
  ['Program', 'B.Tech, Computer Science & Engineering'],
  ['Institution', 'SRM Institute of Science and Technology'],
  ['Campus', 'Ramapuram, Chennai'],
  ['Enrolled', `${profile.years} (expected)`],
  ['Standing', 'Second year'],
  ['CGPA', profile.cgpa],
  ['Coursework', profile.coursework.join(' · ')],
  ['Research', 'Machine-learned interatomic potentials'],
  ['Availability', 'Internships, research, open source'],
]

function About() {
  return (
    <section id="about" className="px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <header className="reveal mb-14 border-b border-graphite/15 pb-8">
          <p className="u-label mb-4 text-ember">Who is running all this</p>
          <h2 className="u-display text-[clamp(2.4rem,7vw,5.5rem)]">About</h2>
        </header>

        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div className="reveal">
            {profile.bio.map((p) => (
              <p key={p.slice(0, 24)} className="mb-6 max-w-xl text-lg leading-relaxed text-graphite/85">
                {p}
              </p>
            ))}

            <p className="mt-10 border-l-2 border-ember pl-5 font-display text-[1.35rem] leading-snug font-semibold text-graphite">
              Read a signal, decide, act, check the result. That loop started with robotics kits,
              and it is still how I build everything else.
            </p>
          </div>

          <div className="reveal">
            <p className="u-label mb-4 text-graphite/45">Datasheet</p>
            <dl className="border-t border-graphite/20">
              {FACTS.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-graphite/12 py-3 sm:grid-cols-[9.5rem_1fr]"
                >
                  <dt className="u-meta pt-0.5 text-graphite/50">{k.toUpperCase()}</dt>
                  <dd className="text-[0.95rem] text-graphite">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="u-label link-underline text-ember"
              >
                GitHub / {profile.githubHandle} ↗
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="u-label link-underline text-ember"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="px-5 pb-24 sm:px-10 sm:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <header className="reveal mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-graphite/15 pb-8">
          <div>
            <p className="u-label mb-4 text-ember">What I reach for</p>
            <h2 className="u-display text-[clamp(2.4rem,7vw,5.5rem)]">Toolkit</h2>
          </div>
          <p className="u-meta max-w-xs text-graphite/55">
            Listed by what it does, not by how well I think I know it.
          </p>
        </header>

        <div className="grid gap-px bg-graphite/15 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="reveal bg-bone p-7 transition-colors hover:bg-bone-2">
              <h3 className="font-display text-xl font-bold text-graphite">{g.title}</h3>
              <p className="u-meta mt-1 mb-5 text-graphite/45">{g.note}</p>
              <ul>
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-baseline gap-3 border-t border-graphite/10 py-2 text-[0.93rem] text-graphite/85"
                  >
                    <span className="h-1 w-1 shrink-0 translate-y-[-2px] bg-ember" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Path() {
  return (
    <section id="path" className="px-5 pb-28 sm:px-10 sm:pb-36">
      <div className="mx-auto max-w-[1400px]">
        <header className="reveal mb-14 border-b border-graphite/15 pb-8">
          <p className="u-label mb-4 text-ember">Where this is going</p>
          <h2 className="u-display text-[clamp(2.4rem,7vw,5.5rem)]">Path</h2>
        </header>

        <ol className="reveal mb-24 grid gap-px bg-graphite/15 sm:grid-cols-2 lg:grid-cols-5">
          {timeline.map((t) => (
            <li key={`${t.year}-${t.title}`} className="relative bg-bone p-7 pt-9">
              <span
                className={`absolute top-0 left-0 h-1 w-full ${
                  t.state === 'done'
                    ? 'bg-graphite/70'
                    : t.state === 'now'
                      ? 'bg-ember'
                      : 'bg-graphite/15'
                }`}
              />
              <span className="u-label text-graphite/45">
                {t.year}
                {t.state === 'now' && <span className="ml-2 text-ember">● now</span>}
              </span>
              <h3 className="mt-3 font-display text-xl leading-tight font-bold text-graphite">
                {t.title}
              </h3>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-graphite/70">{t.body}</p>
            </li>
          ))}
        </ol>

        <div className="reveal mb-24 grid gap-10 border-y border-graphite/20 py-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="u-label mb-3 text-ember">Research · {research.when}</p>
            <h3 className="font-display text-3xl leading-tight font-bold text-graphite">
              {research.title}
            </h3>
            <p className="u-meta mt-2 text-graphite/55">{research.where}</p>
            <p className="u-meta mt-6 text-graphite/60">{research.stack.join(' · ')}</p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-graphite">{research.summary}</p>
            <ul className="mt-5">
              {research.points.map((pt) => (
                <li
                  key={pt.slice(0, 24)}
                  className="flex gap-3 border-t border-graphite/12 py-3 text-[0.95rem] leading-relaxed text-graphite/75"
                >
                  <span className="mt-2.5 h-1 w-1 shrink-0 bg-ember" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-bold text-graphite">Certifications</h3>
            <p className="u-meta text-graphite/50">
              {certifications.filter((c) => c.track === 'course').length} coursework ·{' '}
              {certifications.filter((c) => c.track === 'robotics').length} robotics
            </p>
          </div>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-y border-graphite/25">
                <th className="u-label py-3 pr-4 font-medium text-graphite/45">Certificate</th>
                <th className="u-label hidden py-3 pr-4 font-medium text-graphite/45 md:table-cell">
                  What it covered
                </th>
                <th className="u-label hidden py-3 text-right font-medium text-graphite/45 sm:table-cell">
                  Issuer
                </th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((c) => (
                <tr
                  key={c.title}
                  className="border-b border-graphite/12 align-top transition-colors hover:bg-bone-2"
                >
                  <td className="py-4 pr-4">
                    <span className="flex items-baseline gap-3">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 translate-y-[-2px] ${
                          c.track === 'robotics' ? 'bg-ember' : 'bg-graphite/50'
                        }`}
                      />
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-underline font-medium text-graphite hover:text-ember"
                      >
                        {c.title}
                        <span className="u-meta ml-2 text-graphite/45">
                          {c.track === 'course' ? 'verify ↗' : 'PDF ↗'}
                        </span>
                      </a>
                    </span>
                    <span className="mt-1 block pl-[1.125rem] text-[0.88rem] text-graphite/60 md:hidden">
                      {c.detail}
                    </span>
                    <span className="u-meta mt-1 block pl-[1.125rem] text-graphite/50 sm:hidden">
                      {c.issuer}
                    </span>
                  </td>
                  <td className="hidden py-4 pr-4 text-[0.92rem] text-graphite/65 md:table-cell">
                    {c.detail}
                  </td>
                  <td className="u-meta hidden py-4 text-right whitespace-nowrap text-graphite/55 sm:table-cell">
                    {c.issuer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default function Datasheet() {
  return (
    <div id="datasheet" className="panel-bone relative z-10">
      <About />
      <Skills />
      <Path />
    </div>
  )
}

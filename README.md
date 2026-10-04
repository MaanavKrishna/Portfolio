# Portfolio — Maanav Krishna

A single-page portfolio built around one idea: an **actuator field**. An instanced
WebGL lattice of rods reads a travelling wave and pushes itself up, and the cursor
is a local disturbance the field absorbs and forgets — the same
read-decide-actuate loop the projects on the page are about.

The page alternates between two states. Dark sections are the **runtime** (hero,
work, contact) with the field live behind them. The bone panel is the
**datasheet** (about, toolkit, path) — opaque, static, printed. The seam between
them is labelled.

## Stack

| | |
|---|---|
| Build | Vite 8 + React 19 + TypeScript |
| 3D | three.js, @react-three/fiber, @react-three/postprocessing |
| Styling | Tailwind CSS v4 (tokens in `src/index.css`) |
| Motion | CSS animations, Lenis smooth scroll |

Type: Bricolage Grotesque (display) / Instrument Sans (body) / Martian Mono
(labels and telemetry).

## Run it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## Editing content

Everything readable lives in [`src/data/content.ts`](src/data/content.ts) —
profile, featured projects, smaller builds, research, skills, timeline,
certifications. No copy is hard-coded into
components, so adding a project means adding one object.

A featured project needs a `motif` (`index`, `split`, `wave`, `board`, `doc`,
`compare`); entries in `builds` don't. Each
motif is a hand-drawn SVG of what the project actually does, in
[`src/components/ProjectMotif.tsx`](src/components/ProjectMotif.tsx). New kind of
project, new motif.

## Performance and accessibility

- Three.js is lazy-loaded, so first paint ships ~81 kB of gzipped JavaScript.
- One rAF-throttled scroll reader (`src/hooks/scrollStore.ts`) feeds the HUD, nav
  and camera; components subscribe to single fields, so scrolling never
  re-renders the page.
- The WebGL loop pauses while the opaque datasheet panel covers the viewport, and
  drops to 1× pixel ratio if the GPU can't hold ~45 fps.
- The rod grid thins out below 900 px wide, and the camera pulls back on portrait
  viewports.
- `prefers-reduced-motion` freezes the field, the marquee and every transition.
- Keyboard focus is visible throughout; there is a skip link to the work.

## Deploying

**GitHub Pages** — `.github/workflows/deploy.yml` builds and publishes on every
push to `main`. Enable it once under *Settings → Pages → Source → GitHub Actions*.
The Vite `base` is `./`, so the build works at both `user.github.io/Portfolio/`
and a root domain.

**Vercel / Netlify** — build command `npm run build`, publish directory `dist`.

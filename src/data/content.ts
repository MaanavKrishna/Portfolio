export const profile = {
  name: 'Maanav Krishna',
  first: 'Maanav',
  last: 'Krishna',
  role: 'BTech CSE, second year',
  school: 'SRMIST Ramapuram',
  location: 'Chennai, Tamil Nadu',
  years: '2025 – 2029',
  cgpa: '8.88 / 10',
  status: 'Open to internships and research collaborations',
  email: 'maanavkrishna@gmail.com',
  github: 'https://github.com/MaanavKrishna',
  githubHandle: 'MaanavKrishna',
  linkedin: 'https://linkedin.com/in/maanavkrishna',
  linkedinHandle: 'maanavkrishna',
  lede: 'I build systems that hold up when no one is watching — an airfare price index for MoSPI, a full-stack Python framework, a model that learns what someone means without words.',
  bio: [
    "I'm a second-year Computer Science student at SRM Institute of Science and Technology, Ramapuram, with a CGPA of 8.88. Most of what I know came from shipping: two Smart India Hackathon builds, a Python web framework on PyPI, a chess engine in C++17, and an assistive audio model that runs entirely in the browser.",
    "Alongside coursework I do computational chemistry research — fitting machine-learned interatomic potentials to a salt the foundation models have never seen. The thread through all of it is the same: measure honestly, show the source, and let the results decide.",
  ],
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Design & Programming (C++)',
    'Database Management Systems',
    'Python Programming',
  ],
} as const

export type Motif = 'index' | 'split' | 'wave' | 'board' | 'doc' | 'compare'

type Link = { label: string; url: string }

export type Project = {
  name: string
  motif: Motif
  kind: string
  badge?: string
  summary: string
  detail: string
  stack: string[]
  live?: Link
  repo?: string
  extras?: Link[]
}

/** The projects that get a full row and a drawing. Ordered by what they show, not by date. */
export const projects: Project[] = [
  {
    name: 'AeroPulse',
    motif: 'index',
    kind: 'Public statistics',
    badge: 'Smart India Hackathon 2026 · SIH26056',
    summary: "A prototype airfare price index for MoSPI, built to feed India's Consumer Price Index.",
    detail:
      'Pulls fares from 11 airline and booking sources into an immutable raw store, then normalises them, flags duplicates and outliers, scores every record 0–100 for quality, and sends doubtful ones to an analyst review queue. It tracks fixed products — route, carrier, cabin, fare type and five booking windows from T+1 to T+45 — so months compare like with like instead of chasing the cheapest fare. Daily, weekly and monthly series ship through a versioned REST API and a 12-page Next.js dashboard, and every response carries its methodology and weight versions so any figure can be reproduced. Covered by 69 automated tests.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Next.js', 'Docker', 'pytest'],
  },
  {
    name: 'PyWeb',
    motif: 'split',
    kind: 'Web framework',
    badge: 'Published on PyPI as pyweb-stack',
    summary: 'Full-stack web apps in one Python file, with no JavaScript toolchain.',
    detail:
      "You write a single .pyweb file and the compiler decides, line by line, what runs in the browser and what stays on the server — and tells you why. Event handlers compile to a few hundred bytes of JavaScript, @server functions become typed, validated RPC endpoints, and pages can follow live database queries that update every open window. Database handles and secrets can't leak into browser code: that's a compile error with a line number, not a production incident.",
    stack: ['Python', 'Compiler', 'SSR', 'Typed RPC', 'Live queries', 'Redis'],
    live: { label: 'Read the docs', url: 'https://maanavkrishna.github.io/PyWeb/' },
    repo: 'https://github.com/MaanavKrishna/PyWeb',
    extras: [
      { label: 'Browser playground', url: 'https://maanavkrishna.github.io/PyWeb/playground.html' },
      { label: 'PyPI', url: 'https://pypi.org/project/pyweb-stack/' },
    ],
  },
  {
    name: 'Hum',
    motif: 'wave',
    kind: 'Assistive ML',
    badge: 'ML Empowerment Build Challenge 3.0',
    summary: 'A personal interpreter for people who communicate with sounds instead of words.',
    detail:
      "Hum learns one person's vocalisations from the people who know them, then helps a new teacher or sitter understand. A 1.2M-parameter CNN — with the spectrogram front end built into the network — runs as ONNX entirely in the browser, so audio never leaves the device. It names the kind of sound at 90% accuracy on 4,703 held-out clips, and uses conformal prediction to answer with a set of meanings sized to its confidence: one when sure, two when torn, \"maybe\" when it isn't. One tap teaches it; a 4 KB file hands a taught voice to another phone.",
    stack: ['Python', 'CNN', 'ONNX Runtime Web', 'Conformal prediction', 'Offline-first'],
    live: { label: 'Try the live demo', url: 'https://maanavkrishna.github.io/hum-interpreter/' },
    repo: 'https://github.com/MaanavKrishna/hum-interpreter',
  },
  {
    name: 'Checkora',
    motif: 'board',
    kind: 'Game engine',
    summary: 'An open-source chess platform with an AI opponent that searches instead of guessing.',
    detail:
      'The opponent is a C++17 engine running minimax with alpha-beta pruning; when the compiled binary is unavailable the server falls back to a Python engine automatically. A Django REST API drives the engine through a text-based command protocol. Full rule enforcement — castling, en passant, promotion — per-player clocks, and both player-vs-player and player-vs-AI modes, with the endpoints and move validation covered by 28 automated tests.',
    stack: ['C++17', 'Python', 'Django', 'REST API', 'JavaScript'],
    live: { label: 'Play a game', url: 'https://checkora.vercel.app' },
    repo: 'https://github.com/MaanavKrishna/Checkora',
  },
  {
    name: 'Traceline',
    motif: 'doc',
    kind: 'Document intelligence',
    badge: 'Smart India Hackathon 2025 · SIH25080',
    summary:
      'Upload a Malayalam or English PDF; get its category, role-specific summaries, and action items with due dates.',
    detail:
      "Built for Kochi Metro Rail's document overload. Every summary point is linked to its source: click it and the exact paragraph lights up on the original PDF page, so staff can check the summary instead of trusting it. Scanned documents go through Tesseract, chosen over PaddleOCR for its stronger Malayalam accuracy.",
    stack: ['Python', 'FastAPI', 'Tesseract OCR', 'LLM API', 'JavaScript'],
  },
  {
    name: 'DevHub',
    motif: 'compare',
    kind: 'Full-stack app',
    summary: 'A GitHub discovery workspace — search, compare and save developers and repositories.',
    detail:
      'Live search across public developers and repositories, per-project stats, language mix, contributors and recent commits, side-by-side comparisons, and a private dashboard of favourites behind email sign-in. GitHub responses are cached server-side with rate-limit feedback, and every loading, empty, not-found and rate-limited state is designed rather than left blank.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Better Auth', 'Vitest'],
    live: { label: 'Open the live app', url: 'https://devhub-sandy.vercel.app' },
    repo: 'https://github.com/MaanavKrishna/DevHub',
  },
]

export type Build = {
  name: string
  kind: string
  summary: string
  stack: string[]
  live?: string
  repo?: string
  extras?: Link[]
}

/** Smaller or earlier work — a card each, no drawing. */
export const builds: Build[] = [
  {
    name: 'RecurGate',
    kind: 'Course project · ongoing, team of three',
    summary:
      "Turns a past production failure into an executable check that runs against new pull requests, so a fixed bug can't quietly return. The prototype verifies a payment-retry invariant against an open-source e-commerce API. An LLM proposes risks; only execution decides whether a check passes.",
    stack: ['Python', 'FastAPI', 'LLM API'],
  },
  {
    name: 'bartr',
    kind: 'Marketplace',
    summary:
      'Shopify for campus barter and resale — students list what they no longer need and trade it inside their own campus instead of shouting into a group chat.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'shadcn/ui'],
    live: 'https://bartr-sepia.vercel.app',
    repo: 'https://github.com/MaanavKrishna/bartr',
  },
  {
    name: 'ZeroBot',
    kind: 'Automated trading',
    summary:
      'An intraday trading bot for Zerodha on the KiteConnect API — capital allocation across positions, pre-set stop-loss and target rules, pluggable strategies, and a live analytics dashboard.',
    stack: ['Python', 'KiteConnect', 'Next.js'],
    live: 'https://zerobot-trading.vercel.app/',
    repo: 'https://github.com/MaanavKrishna/ZeroBot',
  },
  {
    name: 'Web3Beacon',
    kind: 'Explainer site',
    summary:
      'A plain-language guide to blockchains, wallets and smart contracts, with a MetaMask demo that connects without ever signing a message or moving funds. Wallet logic is covered by Node tests.',
    stack: ['HTML', 'CSS', 'JavaScript', 'EIP-6963'],
    live: 'https://maanavkrishna.github.io/Web3Beacon/',
    repo: 'https://github.com/MaanavKrishna/Web3Beacon',
  },
  {
    name: 'Plinko Physics Simulator',
    kind: 'Simulation',
    summary:
      'Balls fall through a peg lattice under real gravity and collisions, so you can watch a normal distribution build itself out of independent bounces.',
    stack: ['JavaScript', 'p5.js', 'Matter.js'],
    repo: 'https://github.com/MaanavKrishna/Plinko-Physics-Simulator',
  },
  {
    name: 'Records & inventory systems',
    kind: 'Python + MySQL',
    summary:
      'Five CRUD systems — a bakery, a food business, a diagnostic centre, a gaming service and a course platform — each with a normalised schema and generated daily and monthly reports.',
    stack: ['Python', 'MySQL'],
    repo: 'https://github.com/MaanavKrishna/FoodBoxManager',
    extras: [
      { label: 'Diagnostic', url: 'https://github.com/MaanavKrishna/Diagnostic-Center-Management-System' },
      { label: 'Gaming', url: 'https://github.com/MaanavKrishna/Gaming-Management-System' },
      { label: 'Bakery', url: 'https://github.com/MaanavKrishna/Online-Bakery-Management-System' },
    ],
  },
]

export const research = {
  title: 'Computational chemistry',
  where: 'SRM Institute of Science and Technology',
  when: '2026 – present',
  summary:
    'Applying machine-learned interatomic potentials (MLIPs) to DABCO-diium dichromate, an organic–inorganic salt.',
  points: [
    'Found a coverage gap in foundation MLIPs — chromium is absent from the OMC25 dataset — which motivates a targeted fine-tuning method for this class of salts.',
    'Designed a Bayesian optimisation workflow with BoTorch and Ax to choose crystallisation conditions for the next experiments.',
  ],
  stack: ['MLIPs', 'Bayesian optimisation', 'BoTorch', 'Ax', 'Python'],
}

export const skillGroups: { title: string; note: string; items: string[] }[] = [
  {
    title: 'Languages',
    note: 'What I write day to day',
    items: ['Python', 'C++', 'C', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    title: 'Backend & web',
    note: 'APIs and the interfaces on top',
    items: ['FastAPI', 'Django', 'SQLAlchemy', 'Next.js', 'React', 'REST APIs'],
  },
  {
    title: 'ML & AI',
    note: 'Measured on held-out data',
    items: ['CNNs & ONNX in the browser', 'Conformal prediction', 'Tesseract OCR', 'LLM API integration'],
  },
  {
    title: 'Research methods',
    note: 'Choosing the next experiment',
    items: ['Bayesian optimisation', 'BoTorch & Ax', 'Machine-learned interatomic potentials'],
  },
  {
    title: 'Data',
    note: 'Where the state actually lives',
    items: ['PostgreSQL', 'MySQL', 'Prisma', 'Schema design'],
  },
  {
    title: 'Tooling',
    note: 'How it ships and stays shipped',
    items: ['Git & GitHub', 'Docker', 'Linux', 'pytest', 'Vitest'],
  },
]

export const certifications: {
  title: string
  issuer: string
  track: 'course' | 'robotics'
  detail: string
  /** Coursera verification page, or a PDF served from public/ */
  url: string
}[] = [
  {
    title: 'Programming for Everybody (Python)',
    issuer: 'University of Michigan · Coursera',
    track: 'course',
    detail: 'Python fundamentals — types, control flow, functions, files.',
    url: 'https://coursera.org/verify/GS0B4C0DENUF',
  },
  {
    title: 'Python Data Structures',
    issuer: 'University of Michigan · Coursera',
    track: 'course',
    detail: 'Lists, dictionaries, tuples, and picking the right one.',
    url: 'https://coursera.org/verify/DB3NLSXGCN18',
  },
  {
    title: 'Introduction to Artificial Intelligence',
    issuer: 'Coursera',
    track: 'course',
    detail: 'Machine learning, neural networks, and where AI is actually used.',
    url: 'https://coursera.org/verify/2XNDHBI09SAM',
  },
  {
    title: 'Electro-Blocks Robotics',
    issuer: 'Robotics program',
    track: 'robotics',
    detail: 'Electronics and circuit building, hands on the components.',
    url: 'Electro-Blocks-Certificate.pdf',
  },
  {
    title: 'Ranger Robotics',
    issuer: 'Robotics program',
    track: 'robotics',
    detail: 'Building and programming robots — motor control and sensor reads.',
    url: 'Ranger-Certificate.pdf',
  },
  {
    title: 'Codey Robotics',
    issuer: 'Robotics program',
    track: 'robotics',
    detail: 'Programming the Codey robot in block-based logic and Python.',
    url: 'Codey-Certificate.pdf',
  },
  {
    title: 'Quadrino Robotics',
    issuer: 'Robotics program',
    track: 'robotics',
    detail: 'Flight control and advanced robotic mechanics.',
    url: 'Quadrino-Certificate.pdf',
  },
]

export const timeline: { year: string; title: string; body: string; state: 'done' | 'now' | 'ahead' }[] = [
  {
    year: '2025',
    title: 'Started BTech CSE',
    body: 'SRM Institute of Science and Technology, Ramapuram campus, Chennai.',
    state: 'done',
  },
  {
    year: '2025',
    title: 'Smart India Hackathon',
    body: 'Traceline — document intelligence for Kochi Metro Rail, Malayalam OCR included.',
    state: 'done',
  },
  {
    year: '2026',
    title: 'Joined a research project',
    body: 'Machine-learned interatomic potentials and Bayesian optimisation for crystallisation.',
    state: 'done',
  },
  {
    year: '2026',
    title: 'SIH again, and shipping',
    body: 'AeroPulse for MoSPI, PyWeb on PyPI, and Hum running fully in the browser.',
    state: 'now',
  },
  {
    year: '2029',
    title: 'Graduation',
    body: 'BTech in Computer Science & Engineering.',
    state: 'ahead',
  },
]

export const marquee = [
  'Python',
  'FastAPI',
  'C++17',
  'Next.js',
  'Django',
  'SQLAlchemy',
  'PostgreSQL',
  'Docker',
  'ONNX',
  'Conformal prediction',
  'Tesseract OCR',
  'BoTorch',
  'pytest',
  'Alpha-beta pruning',
]

export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'path', label: 'Path' },
  { id: 'contact', label: 'Contact' },
] as const

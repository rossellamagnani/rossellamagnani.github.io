import { useEffect, useRef, useState } from 'react'

const instruments = [
  {
    name: 'Tempophon',
    description: 'Controls the duration and the pitch of a recorded sound independently, stretching time without bending the tone.',
    keyword: 'Elastic',
  },
  {
    name: 'Speed Variator',
    description: 'Changes the playback speed of the tape, shifting pitch and duration together.',
    keyword: 'Kinetic',
  },
  {
    name: 'Amplitude Modulator',
    description: 'Shapes intensity into pulses, tremors and shifting waves.',
    keyword: 'Pulsing',
  },
]

const process = [
  ['01', 'Early material sketches'],
  ['02', 'Storyboard fragments'],
  ['03', 'Motion and rhythm tests'],
  ['04', 'Surface experiments'],
  ['05', 'Tactile prototypes'],
]

const projects = [
  { title: "Oltre l'ascolto", type: 'MULTISENSORY DESIGN · ACCESSIBILITY', slug: 'oltre-lascolto', lang: 'it' },
  { title: 'Sovrapposizioni', type: 'EXHIBITION DESIGN · AI', slug: 'sovrapposizioni', lang: 'it' },
  { title: 'Marco Magnani Art', type: 'BRAND IDENTITY · ART DIRECTION', slug: 'marco-magnani-art' },
  { title: 'Crossing Kyiv', type: 'EDITORIAL DESIGN · CULTURAL PROJECT', slug: 'crossing-kyiv' },
  { title: 'PRO Brera', type: 'SPECULATIVE DESIGN · SPATIAL', slug: 'brera-district' },
  { title: 'a drop of corruption', type: 'AI VIDEO · ART DIRECTION', slug: 'a-drop-of-corruption' },
]

const caseStudies = [
  {
    slug: 'sovrapposizioni',
    title: 'Sovrapposizioni',
    lead: 'What makes a work of art authentic?',
    type: 'Exhibition design, editorial design, AI',
    year: '2024',
    context: 'Academic project · Politecnico di Milano · MEET Digital Culture Center',
    summary:
      'A generative exhibition and editorial system that questions where authorship ends and artificial intelligence begins.',
    quickSteps: [
      ['01 / Question', 'If an image is born from an algorithm but conceived by a human mind, where does authorship lie?'],
      ['02 / Method', 'Train an AI on the visual codes of four masters and let it reinterpret their languages rather than replicate them.'],
      ['03 / Outcome', 'Twenty works, a smartphone layer that reveals the original artworks, and a book, brochure and postcard set.'],
    ],
    challenge:
      'Sovrapposizioni explores the encounter between human imagination and the generative potential of artificial intelligence. The resulting works inhabit the space between tradition and innovation, reality and simulation.',
    research: [
      {
        title: 'Authorship and artistic intent',
        copy: 'Artificial intelligence has reshaped the creative landscape, fuelling a debate around authorship, originality and artistic intent. In Sovrapposizioni this tension becomes the subject of the work: the AI takes an active and autonomous role in the process, challenging the traditional hierarchy between artist and tool.',
      },
      {
        title: 'Reinterpreting the masters',
        copy: 'Trained on the visual codes of Degas, Gauguin, Modigliani and Warhol, the AI reinterprets their aesthetic languages rather than copying them. The twenty images look familiar at first glance, yet reveal a new visual identity on closer observation.',
      },
      {
        title: 'An interactive dialogue',
        copy: 'Scanning each work with a smartphone reveals the original artwork that inspired the algorithm. The gesture stages a dialogue between classical art and AI-assisted creation, and makes the translation between human memory and computational invention visible.',
      },
      {
        title: 'Beyond the gallery',
        copy: 'An editorial object in three parts extends the exhibition: a book on the project’s theoretical dimension, an introductory brochure and a collection of postcards of the exhibited works.',
      },
      {
        title: 'Design translation',
        copy: 'Each research direction became a design decision. The reinterpreted images became the exhibition, the comparison with the originals became the interactive layer, and the theoretical framework became the book that visitors can take with them.',
      },
    ],
    insight: 'In the age of artificial intelligence, who or what is the artist?',
    processTitle: 'From visual memory to computational invention',
    processDescription: 'Scroll sideways',
    images: [
      '/assets/projects/sovrapposizioni-141ddc64b5b5362cf1d47cddb155b8aefeecc258.png',
      '/assets/projects/sovrapposizioni-c363270d72b8e06db7aaf51c238bb3ea113733cd.png',
      '/assets/projects/sovrapposizioni-1ce14e6bd4101af66b7e9fc69587eebdb8bb93cb.png',
      '/assets/projects/sovrapposizioni-be04d60125a1b190f560c65f52d5480f9834d7c9.png',
      '/assets/projects/sovrapposizioni-297d2bf3f77e804b239bcd73c5936df12ffa1fbf.png',
      '/assets/projects/sovrapposizioni-7fc8b686031b4829a0921a509cd4b48571dd1787.png',
    ],
  },
  {
    slug: 'marco-magnani-art',
    title: 'Marco Magnani Art',
    lead: 'From classical painting to an authoritative art-design brand.',
    type: 'Brand identity, art direction, web design',
    year: '2025',
    context: 'Independent project for the painter Marco Magnani',
    summary:
      'A brand identity that reframes classical painting as a sculptural presence within contemporary interiors.',
    quickSteps: [
      ['01 / Challenge', 'Bring traditional figuration into dialogue with high-end interiors and their demand for subtractive luxury.'],
      ['02 / Method', "Build a minimal system around the artist's signature, a grid scaled in multiples of three and irregular framing windows."],
      ['03 / Outcome', 'A logotype, a typographic system, an unveiling layout and a palette sampled from the paintings themselves.'],
    ],
    challenge:
      'Traditional figuration often remains confined to a narrative, two-dimensional role, missing the chance to interact with the architectural spaces where high-end art is collected today.',
    research: [
      {
        title: 'From canvas to object-presence',
        copy: 'The identity shifts the perception of an artwork from a simple canvas to an "object-presence": an essential component that shapes the character of a space with the force of a sculptural design piece.',
      },
      {
        title: 'Translating the artistic mission',
        copy: "The project starts from the artist's goal of combining hyperrealist figuration with the logic of design collecting, turning his signature technique into a recognisable visual system.",
      },
      {
        title: 'A precise visual language',
        copy: "A minimal language respects the depth and contrast of the paintings without competing with them. The logotype is drawn from the artist's calligraphic signature and set on a vector grid, against a geometric type system that scales in multiples of three.",
      },
      {
        title: 'The unveiling system',
        copy: "The artist's structural diaphragm, where woven textiles shield the subject, inspired irregular framing windows that reveal only macro details of each canvas. A colour-sampling system draws the palette from the dominant pigments of the artwork on display.",
      },
      {
        title: 'Design translation',
        copy: 'Every element of the identity comes from the paintings: the signature became the logotype, the textile barrier became the framing system, and the pigments became the palette. The result is a brand that speaks the same language as the work it represents.',
      },
    ],
    insight: 'Treat every artwork as a structural presence capable of defining a space.',
    processTitle: 'From artistic gesture to identity system',
    processDescription: 'Scroll sideways',
    images: [
      '/assets/projects/marcomagnaniart-6eb7ffe7a5b70424dcb96a2ca56a52145979e5ba.png',
      '/assets/projects/marcomagnaniart-bb40d17840c8d7e5b4d49a7db280b8ec149e2914.png',
      '/assets/projects/marcomagnaniart-4ac58ee616c59d31b2af83ca40a9d6f8c4d7fdf5.png',
      '/assets/projects/marcomagnaniart-5d9b11bc037a4a2698c0dbd7a2e7532c76307bb8.png',
      '/assets/projects/marcomagnaniart-4ca5cedeb374b25dbecc4c62cdf6921008b37d0d.png',
    ],
  },
  {
    slug: 'crossing-kyiv',
    title: 'Crossing Kyiv',
    lead: 'A publication celebrating contemporary Ukrainian creativity beyond the narratives of war.',
    type: 'Editorial design',
    year: '2025',
    context: 'NO MAD · T12 · Design4Ukraine',
    summary:
      'An editorial project that presents contemporary Ukrainian culture through creativity, resilience and dialogue.',
    quickSteps: [
      ['01 / Purpose', 'Reposition Ukraine within the international cultural conversation, beyond the images of war.'],
      ['02 / Method', 'A clear, text-driven editorial system that balances typographic rigour with visual restraint.'],
      ['03 / Outcome', "An editorial object that brings together the voices shaping Ukraine's cultural identity today."],
    ],
    challenge:
      'Crossing Kyiv is an editorial project that celebrates contemporary Ukrainian creativity and brings visibility to the country’s dynamic cultural scene. The publication gives form to NO MAD’s mission of fostering global creative dialogue by amplifying the voices of Ukrainian artists, designers, and thinkers, offering a deeper understanding of the country beyond the narratives of war.',
    research: [
      {
        title: 'Repositioning Ukraine',
        copy: 'The project responds to the need to reposition Ukraine within an international cultural context, not only as a place marked by conflict, but as a hub of innovation, resilience, and artistic energy. The editorial concept translates this vision into a platform for reflection and exchange, combining content, design, and narrative to reveal the strength of a culture in transformation.',
      },
      {
        title: 'Creativity as reconstruction',
        copy: 'In recent decades, Ukraine’s creative landscape has undergone a profound evolution. The work of emerging and established figures in design, architecture, and visual arts reflects a collective search for identity, heritage, and belonging. Crossing Kyiv collects these voices through essays, interviews, and visual narratives, documenting how creativity becomes both a tool for resistance and a language for reconstruction.',
      },
      {
        title: 'An editorial language',
        copy: 'The editorial design embodies the project’s conceptual essence: clear, structured, and text-driven, balancing typographic rigor with visual restraint. This approach allows the stories and perspectives of Ukrainian creatives to emerge with authenticity and dignity, encouraging thoughtful reading and engagement.',
      },
      {
        title: 'A platform for exchange',
        copy: 'Crossing Kyiv extends NO MAD’s curatorial vision into a tangible editorial artifact. The publication was created in collaboration with T12, Design4Ukraine, and with the support of the Canada-Ukraine Foundation.',
      },
    ],
    insight: 'Creativity becomes both a tool for resistance and a language for reconstruction.',
    processTitle: 'Giving form to a culture in transformation',
    processDescription: 'Scroll sideways through the editorial rhythm, interviews and visual narratives.',
    images: ['/assets/projects/kyiv-6443891fe021dd66e35c18fd5dcd33f18db0d01e.png'],
  },
  {
    slug: 'brera-district',
    title: 'PRO Brera',
    lead: 'Making the invisible student community of Brera visible again.',
    type: 'Speculative design, editorial, spatial design',
    year: '2024',
    context: 'Academic project · Politecnico di Milano',
    summary:
      'A hidden collective, made visible through posters, stickers, a fanzine and an underground map.',
    quickSteps: [
      ['01 / Problem', 'Students live Brera every day, yet they are almost invisible in its public identity.'],
      ['02 / Method', 'Imagine a fictional collective that reclaims the tunnels beneath the district as a space of its own.'],
      ['03 / Outcome', 'A coded identity, posters, stickers, a protest fanzine and a folded map of the underground network.'],
    ],
    challenge:
      'P.R.O. BRERA (Progetto Rifondazione Occulta) is a speculative design project about the invisibility of the student community in Milan’s Brera district. Through a fictional narrative, it imagines the students of the Brera Academy reclaiming the neighbourhood by retreating underground, turning hidden tunnels beneath the Church of San Marco into a symbolic space of resistance and belonging.',
    research: [
      {
        title: 'A district under pressure',
        copy: 'Brera is one of Milan’s most historic districts, known for its artistic and creative identity. It counts 2,074 residents, 4,323 students enrolled in 2023/24 and over 1.1 million visitors in 2024. Behind this vibrant façade lies a tension between its cultural prestige and its growing transformation into a tourist showcase.',
      },
      {
        title: 'Two perceptions of Brera',
        copy: 'For tourists, Brera is a polished destination: “If I had to describe Brera in one word, I’d say Pinacoteca.” For students, the picture is different: “It’s a chic neighbourhood, not for students”, “There is a lack of gathering spaces.”',
      },
      {
        title: 'A neighbourhood as non-place',
        copy: 'With no benches and no shared spaces, Brera has become a place people pass through but rarely stay. Its most vital presence, the student community, has been made invisible by tourism.',
      },
      {
        title: 'Reversing visibility',
        copy: 'During the research, a hidden passage inside the Church of San Marco revealed a network of tunnels beneath the district. The project turns this discovery into its scenario: to become visible again, the students choose to hide.',
      },
      {
        title: 'A two-layer narrative',
        copy: 'The narrative works on two layers. A hidden one, made of word of mouth, ambiguous wayfinding and secret events, and a loud one, made of manifestos, a bold identity and public interventions. Inspired by the historic Brera Flash magazine, the logotype exists in an explicit version and in a coded one that only insiders can read, while stickers quietly guide students toward the fictional tunnel entrance.',
      },
      {
        title: 'A coded visual identity',
        copy: '',
      },
      {
        title: 'From spectacle to belonging',
        copy: '',
      },
    ],
    insight: 'To make a community visible again, the project asks it to hide.',
    processTitle: 'Reclaiming Brera from below',
    processDescription: 'Scroll sideways',
    images: [
      '/assets/projects/brera-58c8100e224e9ccc35d44f0d3186a07855659b74.png',
      '/assets/projects/brera-57bab36a08aed2786ddbf00062fdc3ef33573a50.png',
      '/assets/projects/brera-63e7e0759317c54cc177e658b5a3be5d185e5f9f.png',
      '/assets/projects/brera-01a3bfaf62511e4738302c2aaf3605d8443d0260.png',
      '/assets/projects/brera-a75a152e3bb77dbc00210ce9034b4be06d42e903.png',
      '/assets/projects/brera-3a3c3f74080467c9ff20fb31d83bb71e7b24ac74.png',
    ],
  },
  {
    slug: 'a-drop-of-corruption',
    title: 'a drop of corruption',
    lead: 'How can the aesthetics of error illuminate the hidden cost of human greed?',
    type: 'AI video, art direction',
    year: '2024',
    context: 'Glitches & Glory workshop · David Szauder',
    summary:
      'A one-week AI video where every glitch becomes part of the story.',
    quickSteps: [
      ['01 / Theme', 'Reveal the environmental consequences hidden behind corporate power and human greed.'],
      ['02 / Method', 'Use generative AI, collage and glitch artifacts as an expressive visual language.'],
      ['03 / Outcome', 'A short experimental video moving from stark landscapes to vivid traces of fuel and contamination.'],
    ],
    challenge:
      '“A drop of corruption” is an experimental short video created as part of “Glitches & Glory: Aesthetics of Error for New Visual Narratives,” an intensive workshop led by David Szauder. The project investigates the narrative potential of artificial intelligence and glitch aesthetics, exploring the fine line between human-driven destruction and computational synthesis.',
    research: [
      {
        title: 'From resource to corruption',
        copy: 'At its core, the piece addresses themes of corporate greed, environmental degradation, and systemic corruption. Through high-contrast visual storytelling, shifting from stark monochrome landscapes to striking bursts of yellow fuel and vivid red contamination, the narrative traces the transformation of raw resources into capital, and ultimately, into irreversible corruption.',
      },
      {
        title: 'AI as creative partner',
        copy: 'The video was produced entirely through generative AI workflows. Throughout the process, artificial intelligence served as an active creative partner, allowing for rapid experimentation in style development, dynamic visual transitions, and generative motion design. Rather than aiming for polished realism, the project embraces digital artifacts, abrupt collage shifts, and kinetic distortions, turning technical “errors” into expressive narrative tools.',
      },
      {
        title: 'A one-week proof of concept',
        copy: 'Created in just one week, A Drop of Corruption stands as a proof of concept for the accelerating power of AI in contemporary visual storytelling. It reflects a growing shift in creative methodology, where the algorithm becomes not just a tool for execution, but an accelerator of imagination.',
      },
    ],
    insight: 'Turn the aesthetics of error into a language for exposing the hidden cost of human greed.',
    processTitle: 'From raw resource to irreversible contamination',
    processDescription: 'Scroll sideways through the generative frames, color transitions and glitch language.',
    images: [] as string[],
  },
]

const sectionNames: Record<string, string> = {
  challenge: 'Challenge',
  research: 'Research',
  insight: 'Insight',
  process: 'Process',
  outcome: 'Outcome',
  reflection: 'Reflection',
  'next-project': 'Next project',
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const scrollBehavior = (): ScrollBehavior => (prefersReducedMotion() ? 'auto' : 'smooth')

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const cursor = cursorRef.current
    if (!cursor) return

    const handleMove = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
      cursor.classList.add('visible')
      const target = event.target as Element | null
      cursor.classList.toggle('interactive', Boolean(target?.closest('a, button, [role="button"]')))
      cursor.classList.toggle('labelled', Boolean(target?.closest('[data-cursor-label]')))
    }
    const handleLeave = () => cursor.classList.remove('visible')
    const handleDown = () => cursor.classList.add('pressed')
    const handleUp = () => cursor.classList.remove('pressed')

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [])

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor__label">Open project</span>
    </div>
  )
}

function Placeholder({
  caption,
  className = '',
  play = false,
}: {
  caption: string
  className?: string
  play?: boolean
}) {
  return (
    <figure className={`placeholder ${className}`}>
      <div className="placeholder__surface">
        <span className="placeholder__index" aria-hidden="true">IMAGE / VIDEO</span>
        {play && (
          <span className="play" aria-hidden="true">
            <span />
          </span>
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

// Case study images open as you scroll: a single image widens from a narrow band in the centre,
// grouped images (cards, pairs, process strip) grow downwards one after another
const GROW_SELECTOR = '.placeholder__surface:not(.hero__media .placeholder__surface)'
const GROUP_SELECTOR = '.instrument-grid, .paired-media, .process-strip'
const easeInOut = (value: number) => (value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2)
const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

function useGrowOnScroll(dependency: unknown) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const elements = Array.from(document.querySelectorAll<HTMLElement>(GROW_SELECTOR))
    const target = () => {
      const viewport = window.innerHeight
      return elements.map(element => {
        const group = element.closest<HTMLElement>(GROUP_SELECTOR)
        if (group) {
          const index = Array.from(group.querySelectorAll(GROW_SELECTOR)).indexOf(element)
          return clamp01((viewport * 0.9 - group.getBoundingClientRect().top) / (viewport * 0.45) - index * 0.18)
        }
        const rect = element.getBoundingClientRect()
        return clamp01((viewport * 0.9 - rect.top) / Math.min(rect.height, viewport * 0.6))
      })
    }
    const apply = (progress: number[]) => {
      elements.forEach((element, index) => element.style.setProperty('--grow', String(easeInOut(progress[index]))))
    }
    // Progress glides toward the scroll position, so wheel steps turn into a continuous movement
    let current = target()
    apply(current)
    let frame = 0
    const tick = () => {
      const goal = target()
      let moving = false
      current = current.map((value, index) => {
        const distance = goal[index] - value
        if (Math.abs(distance) < 0.002) return goal[index]
        moving = true
        return value + distance * 0.12
      })
      apply(current)
      frame = moving ? window.requestAnimationFrame(tick) : 0
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [dependency])
}

// Outcome images: the screen holds on one image at a time; scrolling opens it from a narrow band
// in the centre, keeps it complete for a moment, then the next one opens over it
function OutcomeSequence({ frames }: { frames: Array<{ caption: string; play?: boolean }> }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || prefersReducedMotion()) return
    const items = Array.from(track.querySelectorAll<HTMLElement>('.sequence__frame'))
    const target = () => {
      const segment = window.innerHeight * 0.6
      const scrolled = -track.getBoundingClientRect().top + segment * 0.3
      return items.map((_, index) => clamp01((scrolled - index * segment) / (segment * 0.7)))
    }
    const apply = (progress: number[]) => {
      items.forEach((item, index) => {
        item.style.setProperty('--reveal', String(easeInOut(progress[index])))
        // An image stays underneath until the next one has fully drawn over it
        item.classList.toggle('is-past', (progress[index + 1] ?? 0) >= 1)
      })
    }
    // Progress eases toward the scroll position, so wheel steps turn into a continuous movement
    let current = target()
    apply(current)
    let frame = 0
    const tick = () => {
      const goal = target()
      let moving = false
      current = current.map((value, index) => {
        const distance = goal[index] - value
        if (Math.abs(distance) < 0.002) return goal[index]
        moving = true
        return value + distance * 0.12
      })
      apply(current)
      frame = moving ? window.requestAnimationFrame(tick) : 0
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="sequence" ref={trackRef} style={{ '--count': frames.length } as React.CSSProperties}>
      <div className="sequence__stage">
        {frames.map(({ caption, play }) => (
          <figure className="sequence__frame" key={caption}>
            <div className="sequence__surface">
              <span className="placeholder__index" aria-hidden="true">IMAGE / VIDEO</span>
              {play && (
                <span className="play" aria-hidden="true">
                  <span />
                </span>
              )}
            </div>
            <figcaption>{caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

function SectionHeading({ number, children }: { number?: string; children: React.ReactNode }) {
  return (
    <div className="section-heading">
      {number && <span>{number}</span>}
      <h2>{children}</h2>
    </div>
  )
}

function SiteHeader({ skipTo = 'content', children }: { skipTo?: string; children?: React.ReactNode }) {
  const skip = (event: React.MouseEvent) => {
    event.preventDefault()
    const target = document.getElementById(skipTo)
    target?.focus({ preventScroll: true })
    target?.scrollIntoView({ behavior: scrollBehavior() })
  }
  return (
    <header className="nav shell site-header">
      <a href={`#${skipTo}`} className="skip-link" onClick={skip}>
        Skip to content
      </a>
      <a href="/" className="brand">
        Rossella Magnani
      </a>
      <nav aria-label="Primary navigation">
        {children}
        <a href="/about">About</a>
      </nav>
    </header>
  )
}

function ProjectCase({ project }: { project: (typeof caseStudies)[number] }) {
  const [activeSection, setActiveSection] = useState('challenge')
  const [deepView, setDeepView] = useState(false)
  const projectIndex = projects.findIndex(item => item.slug === project.slug)
  const nextProject = projects[(projectIndex + 1) % projects.length]
  const researchCards = Array.from({ length: 3 }, (_, index) =>
    project.research[index + 1] || {
      title: `Research direction ${index + 2}`,
      copy: 'Replace this text with the corresponding research content for this project.',
    },
  )
  const finalResearch = project.research
    .slice(4)
    .map(item => item.copy)
    .join(' ')

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]')).filter(
      section => section.offsetHeight > 0,
    )
    let frame = 0
    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.42
      let current: HTMLElement | undefined
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section
        else break
      }
      setActiveSection(current?.id || 'challenge')
      frame = 0
    }
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }
    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      revealObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [deepView])
  useGrowOnScroll(deepView)

  return (
    <main className={deepView || project.slug === 'crossing-kyiv' || project.slug === 'a-drop-of-corruption' ? 'is-deep' : ''}>
      <SiteHeader />

      <aside className="section-marker" aria-hidden="true">
        <strong>{sectionNames[activeSection]}</strong>
      </aside>

      <article id="content" tabIndex={-1}>
        <section className="hero shell reveal">
          <Placeholder
            className="hero__media"
            caption={`${project.title}: main project visual`}
          />
          <div className="hero__head">
            <h1 lang={projects[projectIndex]?.lang}>{project.title}</h1>
            <p className="hero__subtitle">
              {project.slug === 'crossing-kyiv' ? 'Ukrainian creativity beyond the narratives of war.' : project.lead}
            </p>
          </div>
        </section>

        <section className="facts shell reveal" aria-label="Project details">
          {[
            ['Type', project.type],
            ['Context', project.context],
            ['Year', project.year],
            ['Role', project.slug === 'sovrapposizioni' ? 'Concept, exhibition and editorial design' : project.slug === 'marco-magnani-art' ? 'Positioning, brand identity, art direction' : project.slug === 'crossing-kyiv' ? 'Editorial design, layout and typography' : project.slug === 'brera-district' ? 'Research, concept and visual identity' : project.slug === 'a-drop-of-corruption' ? 'Concept, art direction and AI video production' : 'Designer, researcher'],
            ['Tools', project.slug === 'sovrapposizioni' ? 'Midjourney, Illustrator, Indesign, Photoshop' : project.slug === 'marco-magnani-art' ? 'Illustrator, Photoshop, Figma, Framer, Indesign' : project.slug === 'crossing-kyiv' ? 'Indesign, Illustrator, Photoshop' : project.slug === 'brera-district' ? 'Illustrator, Photoshop, Indesign' : project.slug === 'a-drop-of-corruption' ? 'Midjourney, Premiere' : 'Replace with project tools'],
          ].map(([label, value]) => (
            <div className="fact" key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </div>
          ))}
        </section>

        <section className="quick-read shell reveal">
          <div className="section-label">In short</div>
          <div className="quick-read__title">
            <h2>
              {project.slug === 'sovrapposizioni'
                ? 'Four masters, one algorithm, twenty new images.'
                : project.slug === 'marco-magnani-art'
                  ? 'Paintings that hold a room like sculpture.' : project.slug === 'brera-district' ? "What if Brera's students reclaimed the district from below?" : project.slug === 'a-drop-of-corruption' ? 'Error as a way of telling a story.' : project.slug === 'crossing-kyiv' ? 'A country told through the people who make its culture.'
                : project.lead}
            </h2>
            <p>
              {project.slug === 'sovrapposizioni'
                ? 'An exhibition of twenty AI-generated works trained on the visual codes of Degas, Gauguin, Modigliani and Warhol, extended by an interactive layer and an editorial system beyond the gallery.'
                : project.slug === 'marco-magnani-art'
                  ? 'A brand identity that moves a hyperrealist painter from the gallery to the world of architecture and interiors, presenting each artwork as a presence that defines the space around it.'
                  : project.slug === 'crossing-kyiv'
                    ? "Essays, interviews and visual narratives that present Ukraine as a hub of innovation, resilience and artistic energy, not only as a place marked by conflict. Crossing Kyiv gives form to NO MAD's mission of fostering global creative dialogue. The publication documents how creativity becomes a tool for resistance and reconstruction, through the work of the people who are shaping Ukraine's cultural identity today." : project.slug === 'brera-district' ? "A speculative project that gives Brera's overlooked student community a fictional underground collective, with its own identity, artefacts and map." : project.slug === 'a-drop-of-corruption' ? 'An experimental short video made in one week during the Glitches & Glory workshop led by David Szauder. Produced entirely with generative AI workflows, it moves from stark monochrome landscapes to bursts of yellow fuel and red contamination, turning glitches, collage shifts and distortions into a way of telling the hidden cost of corporate greed.'
                : project.summary}
            </p>
          </div>
          <div className="quick-read__steps">
            {project.quickSteps.map(([label, copy]) => (
              <article key={label}>
                <span>{label}</span>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        {project.slug !== 'crossing-kyiv' && project.slug !== 'a-drop-of-corruption' && (
          <section className="reading-mode shell reveal" aria-label="Reading mode">
            <button
              type="button"
              className="reading-action"
              aria-expanded={deepView}
              onClick={() => setDeepView(current => !current)}
            >
              <span>
                <strong>{deepView ? 'Ready to wrap up?' : 'Got more time?'}</strong>
                <small>{deepView ? 'Close research and continue to the outcome' : 'Optional deep dive · Explore the process in 5 min'}</small>
              </span>
              <i aria-hidden="true">{deepView ? '−' : '+'}</i>
            </button>
          </section>
        )}

        {project.slug !== 'crossing-kyiv' && project.slug !== 'a-drop-of-corruption' && (
        <div className="expanded-research deep-content">
          <section id="challenge" data-section className="section shell challenge reveal">
            <div className="section-label">Challenge</div>
            <div className="challenge__copy">
              <p>{project.challenge}</p>
            </div>
            <blockquote>
              {project.slug === 'sovrapposizioni'
                ? '"Neither entirely the machine\'s, nor entirely the human\'s."'
                : project.slug === 'marco-magnani-art'
                  ? '"Bridging the art gallery and the architectural firm."' : project.slug === 'brera-district' ? '"Celebrated for its art, closed to its own creative community."'
                : project.lead}
            </blockquote>
          </section>

          <section id="research" data-section className="section shell research">
            <div className="section-label reveal">Research</div>

            <div className="research-row reveal">
              <div className="research-copy">
                <SectionHeading number="01">{project.research[0].title}</SectionHeading>
                <p>{project.research[0].copy}</p>
                {project.slug !== 'sovrapposizioni' && project.slug !== 'marco-magnani-art' && project.slug !== 'brera-district' && (
                  <div className="timeline" aria-label="Project development timeline">
                    {[
                      ['01', 'Context'],
                      ['02', 'Research'],
                      ['03', 'Design'],
                      ['04', 'Outcome'],
                    ].map(([number, phase]) => (
                      <div key={phase}>
                        <i />
                        <b>{number}</b>
                        <span>{phase}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Placeholder caption={`${project.title}: research context`} />
            </div>

            <div className="research-block reveal">
              <SectionHeading number="02–04">Research framework</SectionHeading>
              <p className="intro">
                {project.slug === 'sovrapposizioni'
                  ? "Three directions shaped the exhibition's visual and conceptual language."
                  : project.slug === 'marco-magnani-art'
                    ? "Three directions turned the artist's practice into a visual system." : project.slug === 'brera-district' ? 'Three findings shaped the narrative of the project.'
                  : 'The main research directions that informed the project’s visual and conceptual language.'}
              </p>
              <div className="instrument-grid">
                {researchCards.map((item, index) => (
                  <article className="instrument-card" key={item.title}>
                    <Placeholder caption={`${project.title}: ${item.title}`} />
                    <div className="instrument-card__body">
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                      {project.slug !== 'sovrapposizioni' && project.slug !== 'marco-magnani-art' && project.slug !== 'brera-district' && (
                        <strong>Research {String(index + 2).padStart(2, '0')}</strong>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="research-row accessibility reveal">
              <div className="research-copy">
                <SectionHeading number="05">Design translation</SectionHeading>
                <p>
                  {finalResearch ||
                    'Replace this text with the final research findings and explain how they were translated into the design outcome.'}
                </p>
              </div>
              <div className="paired-media">
                <Placeholder caption={`${project.title}: design development`} />
                <Placeholder caption={`${project.title}: tests and iterations`} />
              </div>
            </div>
          </section>

          <section id="insight" data-section className="insight reveal">
            <div className="shell insight__inner">
              <div className="section-label">Key insight</div>
              <p>{project.insight}</p>
            </div>
          </section>

          <section id="process" data-section className="section process reveal">
            <div className="process-sticky">
              <div className="shell process__head">
                <div className="section-label">Process</div>
                <h2>{project.processTitle}</h2>
                <p>{project.processDescription} →</p>
              </div>
              <div className="process-strip" tabIndex={0} role="region" aria-label="Process images, scroll sideways">
                {Array.from({ length: 5 }, (_, index) => (
                  <Placeholder
                    key={index}
                    caption={`${String(index + 1).padStart(2, '0')}: ${project.title} process`}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
        )}

        <section id="outcome" data-section className="section shell outcome">
          <div className="outcome-gallery reveal">
            <span className="outcome-gallery__number">03</span>
            <h2>{project.summary}</h2>
          </div>
        </section>
        <OutcomeSequence
          frames={[
            { caption: `${project.title}: main outcome`, play: true },
            { caption: `${project.title}: outcome detail 01` },
            { caption: `${project.title}: outcome detail 02` },
            { caption: `${project.title}: outcome detail 03` },
          ]}
        />

        <a id="next-project" data-section className="next-project reveal" href={`/${nextProject.slug}`}>
          <span className="next-project__label">Next project</span>
          <strong lang={nextProject.lang}>{nextProject.title}</strong>
          <i aria-hidden="true">
            <svg viewBox="0 0 180 120">
              <path d="M0 51h151v18H0z" />
              <path d="M82 0h19c14 27 38 45 79 51v18c-41 6-65 24-79 51H82c13-29 34-49 65-60C116 49 95 29 82 0Z" />
            </svg>
          </i>
        </a>
      </article>

      <footer id="contact" className="footer shell">
        <span>© {new Date().getFullYear()} Rossella Magnani</span>
        <div>
          <a href="mailto:magnanirossella02@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/rossella-magnani-276219279/">LinkedIn</a>
        </div>
      </footer>
    </main>
  )
}

function AboutTable({
  title,
  rows,
  expandable = false,
}: {
  title: string
  rows: Array<[string, string, string]>
  expandable?: boolean
}) {
  const [openRow, setOpenRow] = useState<number | null>(null)

  return (
    <section className="about-section shell reveal">
      <div className="section-label">{title}</div>
      <div className={`about-table ${expandable ? 'is-expandable' : ''}`}>
        <div className="about-table__head">
          <span>Role / Context</span>
          <span>Company / Project</span>
          <span>Year</span>
          {expandable && <span aria-hidden="true" />}
        </div>
        {rows.map(([first, second, year], index) =>
          expandable ? (
            <article
              className={`about-table__item ${openRow === index ? 'is-open' : ''}`}
              key={`${first}-${year}`}
            >
              <button
                type="button"
                className="about-table__row about-table__row--button"
                aria-expanded={openRow === index}
                onClick={() => setOpenRow(current => current === index ? null : index)}
              >
                <strong>{first}</strong>
                <span>{second}</span>
                <span>{year}</span>
                <i aria-hidden="true">{openRow === index ? '−' : '+'}</i>
              </button>
              <div className="about-table__detail" inert={openRow !== index}>
                <p>
                  Placeholder text: add a short description of your role, responsibilities,
                  process and contribution to this experience.
                </p>
              </div>
            </article>
          ) : (
            <div className="about-table__row" key={`${first}-${year}`}>
              <strong>{first}</strong>
              <span>{second}</span>
              <span>{year}</span>
            </div>
          ),
        )}
      </div>
    </section>
  )
}

function About() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('.about .reveal').forEach(element => revealObserver.observe(element))
    return () => revealObserver.disconnect()
  }, [])

  return (
    <main className="about">
      <SiteHeader />

      <article id="content" tabIndex={-1}>
        <section className="about-hero shell reveal">
          <h1>I design the moment when content meets people in a physical space.</h1>
          <div className="about-hero__bio">
            <p>
              I&apos;m Rossella, a communication designer based in Milan. I work on exhibitions,
              event identities and multisensory experiences, translating cultural content into
              spaces, objects and graphics that everyone can read, touch and enjoy.
            </p>
            <p>
              Accessibility shapes everything I do. My MSc thesis at Politecnico di Milano,
              developed with the University Library of Pavia, redesigns its exhibition stations
              around tactile and inclusive interaction. Before that, I explored how sound can be
              experienced beyond hearing, and how artificial intelligence can become the subject
              of an exhibition rather than a shortcut.
            </p>
          </div>
        </section>

        <section className="about-section about-approach shell reveal">
          <div className="section-label">Approach</div>
          <div className="quick-read__steps about-approach__grid">
            {[
              ['Research first', 'Every project starts from people, places and archives, not from a visual style.'],
              ['Design for every sense', 'Sight is only one way in: touch, sound and space carry meaning too.'],
              ['From page to room', 'I move between editorial, graphic and spatial scale within the same project.'],
            ].map(([title, copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <AboutTable
          title="Experience"
          expandable
          rows={[
            ['Brand & Communication Design Intern', 'CBA Design Italy, Milan', '2026'],
            ['Communication & Editorial Design Intern', 'T12 Lab, Milan', '2025'],
            ['Visual Designer', 'Loro Piana Global Summit', '2024'],
            ['Communication Design Intern', 'DCode, Turin', '2024'],
          ]}
        />

        <AboutTable
          title="Selected contexts"
          expandable
          rows={[
            ['Venice Biennale', "Children's workshop materials", '2025'],
            ['Loro Piana Global Summit', 'Event visual system', '2024'],
          ]}
        />

        <section className="about-section about-details shell reveal">
          <div>
            <div className="section-label">Education</div>
            <p>MSc Communication Design, Politecnico di Milano, 2026</p>
            <p>BSc Communication Design, Politecnico di Torino, 2024</p>
          </div>
          <div>
            <div className="section-label">Tools</div>
            <p>Rhino, AutoCAD, Blender</p>
            <p>InDesign, Illustrator, Photoshop</p>
            <p>After Effects, Premiere</p>
            <p>Figma, Framer</p>
          </div>
        </section>

        <section className="about-closing shell reveal">
          <p>Here&apos;s my CV.</p>
          <a href="/Rossella_Magnani_CV.pdf" className="about-cv" download>
            Download CV <span className="sr-only">(PDF, 2 MB)</span>
          </a>
        </section>
      </article>

      <footer id="contact" className="footer shell">
        <span>© {new Date().getFullYear()} Rossella Magnani</span>
        <div>
          <a href="mailto:magnanirossella02@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/rossella-magnani-276219279/">LinkedIn</a>
        </div>
      </footer>
    </main>
  )
}

const projectYear = (slug: string) => caseStudies.find(item => item.slug === slug)?.year ?? '2025'

function Home() {
  const [activeProject, setActiveProject] = useState(0)
  const [view, setView] = useState<'gallery' | 'list'>('gallery')
  const [galleryInView, setGalleryInView] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (view !== 'gallery') return
    let frame = 0
    const update = () => {
      const items = Array.from(document.querySelectorAll<HTMLElement>('.hm-item'))
      const centre = window.innerHeight / 2
      let closest = 0
      let distance = Number.POSITIVE_INFINITY
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        const itemDistance = Math.abs(rect.top + rect.height / 2 - centre)
        if (itemDistance < distance) {
          distance = itemDistance
          closest = index
        }
      })
      setActiveProject(closest)
      setGalleryInView(items.length > 0 && items[0].getBoundingClientRect().top < 80)
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [view])

  const scrollToProject = (index: number) => {
    document.getElementById(`project-${index}`)?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' })
  }
  const changeView = (nextView: 'gallery' | 'list') => {
    setView(nextView)
    window.scrollTo(0, 0)
  }
  const active = projects[activeProject]
  const [primaryType, secondaryType] = active.type.split(' · ')

  return (
    <main className={`hm hm--${view}`}>
      <SiteHeader skipTo="work" />

      <div className="hm-view" role="group" aria-label="View">
        <button type="button" className={view === 'gallery' ? 'active' : ''} aria-pressed={view === 'gallery'} onClick={() => changeView('gallery')}>
          Gallery
        </button>
        <span aria-hidden="true">/</span>
        <button type="button" className={view === 'list' ? 'active' : ''} aria-pressed={view === 'list'} onClick={() => changeView('list')}>
          List
        </button>
      </div>

      <section className="hm-intro" aria-label="Introduction">
        <h1>
          Communication designer working on exhibitions and multisensory experiences that
          everyone can access.
        </h1>
        <p>Based in Milan. MSc Communication Design, Politecnico di Milano.</p>
      </section>

      {view === 'gallery' ? (
        <>
          <nav className="hm-index" aria-label="Projects">
            {projects.map((project, index) => (
              <button
                type="button"
                className={activeProject === index ? 'active' : ''}
                aria-current={activeProject === index ? 'true' : undefined}
                onClick={() => scrollToProject(index)}
                key={project.title}
              >
                <span lang={project.lang}>{project.title}</span>
              </button>
            ))}
          </nav>

          <div className="hm-line" aria-hidden="true">
            <span>{primaryType}</span>
            <span>{secondaryType}</span>
            <span>{projectYear(active.slug)}</span>
          </div>

          <div className={`hm-current ${galleryInView ? 'visible' : ''}`} aria-hidden="true">
            <span>({String(activeProject + 1).padStart(2, '0')})</span>
            <strong lang={active.lang}>{active.title}</strong>
          </div>

          <section id="work" className="hm-gallery" tabIndex={-1} aria-label="Projects">
            {projects.map((project, index) => (
              <a id={`project-${index}`} className="hm-item" href={`/${project.slug}`} data-cursor-label key={project.title}>
                <span className="sr-only">
                  <span lang={project.lang}>{project.title}</span>, {project.type.toLowerCase()}
                </span>
                <span className="hm-image" aria-hidden="true">
                  <span>PROJECT IMAGE</span>
                </span>
              </a>
            ))}
          </section>
        </>
      ) : (
        <section id="work" className="hm-list" tabIndex={-1} aria-label="Projects">
          {projects.map((project, index) => (
            <a href={`/${project.slug}`} key={project.title}>
              <span className="hm-list__number">{String(index + 1).padStart(2, '0')}</span>
              <strong lang={project.lang}>{project.title}</strong>
              <span>{project.type}</span>
              <span>{projectYear(project.slug)}</span>
            </a>
          ))}
        </section>
      )}

      <footer id="contact" className="hm-footer">
        <div>
          <a href="mailto:magnanirossella02@gmail.com">magnanirossella02@gmail.com</a>
          <a href="https://www.linkedin.com/in/rossella-magnani-276219279/">LinkedIn</a>
        </div>
        <span>© {new Date().getFullYear()} Rossella Magnani</span>
      </footer>
    </main>
  )
}

function CaseStudy() {
  const [activeSection, setActiveSection] = useState('challenge')
  const [deepView, setDeepView] = useState(false)

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]')).filter(
      section => section.offsetHeight > 0,
    )
    let frame = 0
    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.42
      let current: HTMLElement | undefined
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section
        else break
      }
      setActiveSection(current?.id || 'challenge')
      frame = 0
    }
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }
    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      revealObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [deepView])
  useGrowOnScroll(deepView)

  return (
    <main className={deepView ? 'is-deep' : ''}>
      <SiteHeader />

      <aside className="section-marker" aria-hidden="true">
        <strong>{sectionNames[activeSection]}</strong>
      </aside>

      <article id="content" tabIndex={-1}>
        <section className="hero shell reveal">
          <Placeholder
            className="hero__media"
            caption="Main video still: abstract visualisation of electronic sound"
          />
          <div className="hero__head">
            <h1 lang="it">Oltre<br />l’ascolto</h1>
            <p className="hero__subtitle hero__subtitle--ink">
              Making sound accessible beyond hearing
            </p>
          </div>
        </section>

        <section className="facts shell reveal" aria-label="Project details">
          {[
            ['Type', 'Animated video, tactile artefacts'],
            ['Context', 'Academic project, Politecnico di Milano'],
            ['Year', '2025'],
            ['Role', 'Research, concept, motion and tactile design'],
            ['Tools', 'After Effects, Illustrator, Rhino'],
          ].map(([label, value]) => (
            <div className="fact" key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </div>
          ))}
        </section>

        <section className="quick-read shell reveal">
          <div className="section-label">In short</div>
          <div className="quick-read__title">
            <h2>What does a sound feel like?</h2>
            <p>
              Research into the instruments of the Studio di Fonologia RAI became an animated video
              and a series of tactile artefacts that translate electronic music into images and relief.
            </p>
          </div>
          <div className="quick-read__steps">
            <article>
              <span>01 / CHALLENGE</span>
              <p>Let people experience sound through sight, touch and vibration, including those with hearing or visual disabilities.</p>
            </article>
            <article>
              <span>02 / APPROACH</span>
              <p>Study the mechanical character of three historic instruments and translate it into a visual and tactile language.</p>
            </article>
            <article>
              <span>03 / OUTCOME</span>
              <p>An animated video and three relief objects that turn sound into something you can see and touch.</p>
            </article>
          </div>
        </section>

        <section className="reading-mode shell reveal" aria-label="Reading mode">
          <button
            type="button"
            className="reading-action"
            aria-expanded={deepView}
            onClick={() => setDeepView(current => !current)}
          >
            <span>
              <strong>{deepView ? 'Ready to wrap up?' : 'Got more time?'}</strong>
              <small>{deepView ? 'Close research and continue to the outcome' : 'Optional deep dive · Explore the process in 5 min'}</small>
            </span>
            <i aria-hidden="true">{deepView ? '−' : '+'}</i>
          </button>
        </section>

        <div className="expanded-research deep-content">
        <section id="challenge" data-section className="section shell challenge reveal">
          <div className="section-label">Challenge</div>
          <div className="challenge__copy">
            <p>
              How might sound become an experience shared beyond the act of hearing? The project
              investigates how people with hearing and visual disabilities can encounter electronic
              music through image, touch, vibration and material form.
            </p>
          </div>
          <blockquote>“A sound is not only heard. It can be <span>seen and held</span>.”</blockquote>
        </section>

        <section id="research" data-section className="section shell research">
          <div className="section-label reveal">Research</div>

          <div className="research-row reveal">
            <div className="research-copy">
              <SectionHeading number="01">Historical research</SectionHeading>
              <p>
                The project starts at the Studio di Fonologia Musicale RAI, founded in Milan in 1955
                by Luciano Berio and Bruno Maderna. Alongside the studios of Cologne, Paris and New
                York, it was one of the places where composers and engineers reinvented music
                through oscillators, filters and magnetic tape.
              </p>
            </div>
            <Placeholder caption="Archive photographs: Studio di Fonologia, Milan" />
          </div>

          <div className="research-block reveal">
            <SectionHeading number="02–04">The instruments</SectionHeading>
            <p className="intro">
              Three machines built at the Studio became the starting point for a visual and tactile vocabulary.
            </p>
            <div className="instrument-grid">
              {instruments.map(instrument => (
                <article className="instrument-card" key={instrument.name}>
                  <Placeholder caption={`Archive image: ${instrument.name}`} />
                  <div className="instrument-card__body">
                    <h3>{instrument.name}</h3>
                    <p>{instrument.description}</p>
                    <strong>{instrument.keyword}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="research-row accessibility reveal">
            <div className="research-copy">
              <SectionHeading number="05">Accessibility research</SectionHeading>
              <p>
                A study of sensory translation explored how sound may be perceived through sight,
                touch and vibration. In parallel, Braille tests shaped the scale, spacing and reading
                sequence of the accompanying texts.
              </p>
            </div>
            <div className="paired-media">
              <Placeholder caption="Sensory mapping and vibration sketches" />
              <Placeholder caption="Braille spacing and embossing studies" />
            </div>
          </div>
        </section>

        <section id="insight" data-section className="insight reveal">
          <div className="shell insight__inner">
            <div className="section-label">Key insight</div>
            <p>
              The sounds of the Studio are rough, mechanical and material. The design had to{' '}
              <em>keep that roughness</em>, in something you can see and something you can hold.
            </p>
          </div>
        </section>

        <section id="process" data-section className="section process reveal">
          <div className="process-sticky">
            <div className="shell process__head">
              <div className="section-label">Process</div>
              <h2>From signal to surface</h2>
              <p>Scroll sideways →</p>
            </div>
            <div className="process-strip" tabIndex={0} role="region" aria-label="Process images, scroll sideways">
              {process.map(([number, caption]) => (
                <Placeholder key={number} caption={`${number}: ${caption}`} />
              ))}
            </div>
          </div>
        </section>
        </div>

        <section id="outcome" data-section className="section shell outcome">
          <div className="outcome-gallery reveal">
            <span className="outcome-gallery__number">03</span>
            <h2>Designing with, not only for, the senses.</h2>
          </div>
        </section>
        <OutcomeSequence
          frames={[
            { caption: 'Final video, 04:12', play: true },
            { caption: 'Tempophon: tactile artefact' },
            { caption: 'Speed Variator: tactile artefact' },
            { caption: 'Amplitude Modulator: tactile artefact' },
          ]}
        />

        <a id="next-project" data-section href="/sovrapposizioni" className="next-project reveal">
          <span className="next-project__label">Next project</span>
          <strong lang="it">Sovrapposizioni</strong>
          <i aria-hidden="true">
            <svg viewBox="0 0 180 120">
              <path d="M0 51h151v18H0z" />
              <path d="M82 0h19c14 27 38 45 79 51v18c-41 6-65 24-79 51H82c13-29 34-49 65-60C116 49 95 29 82 0Z" />
            </svg>
          </i>
        </a>
      </article>

      <footer id="contact" className="footer shell">
        <span>© {new Date().getFullYear()} Rossella Magnani</span>
        <div>
          <a href="mailto:magnanirossella02@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/rossella-magnani-276219279/">LinkedIn</a>
        </div>
      </footer>
    </main>
  )
}

export default function App() {
  const path = window.location.pathname.replace(/^\/|\/$/g, '')
  const project = caseStudies.find(item => item.slug === path)
  const pageName = path === 'about' ? 'About' : path === 'oltre-lascolto' ? "Oltre l'ascolto" : project?.title
  useEffect(() => {
    document.title = pageName ? `${pageName} · Rossella Magnani` : 'Rossella Magnani · Exhibition and experiential designer'
  }, [pageName])
  return (
    <>
      <CustomCursor />
      {path === 'about' ? <About /> : path === 'oltre-lascolto' ? <CaseStudy /> : project ? <ProjectCase project={project} /> : <Home />}
    </>
  )
}

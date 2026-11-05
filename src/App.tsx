import { Fragment, useEffect, useRef, useState } from 'react'

const instruments = [
  {
    name: 'Tempophon',
    description: 'Controls the duration and the pitch of a recorded sound independently, stretching time without bending the tone.',
    keyword: 'Elastic',
    image: '/projects/oltre/tempophon.svg',
  },
  {
    name: 'Speed Variator',
    description: 'Changes the playback speed of the tape, shifting pitch and duration together.',
    keyword: 'Kinetic',
    image: '/projects/oltre/speed-variator.svg',
  },
  {
    name: 'Amplitude Modulator',
    description: 'Shapes intensity into pulses, tremors and shifting waves.',
    keyword: 'Pulsing',
    image: '/projects/oltre/amplitude-modulator.svg',
  },
]

// `image` / `video`: the picture for each project in the home row, cropped to fill the frame;
// `focus` moves the crop (CSS object-position); `crop` zooms into one area instead: x and y are
// the centre of that area in % of the image, zoom how much larger than the frame's height it is drawn;
// `whole` shows the entire image, uncropped, on a plain background (for cut-out shapes such as a sticker). For now they are taken from the current site
// (rossellamagnani.figma.site); once the files are uploaded to public/, point these to the local copies.
const projects: { title: string; type: string; slug: string; lang?: 'it'; image: string; video?: string; focus?: string; whole?: boolean; crop?: { x: number; y: number; zoom: number } }[] = [
  { title: "Oltre l'ascolto", type: 'MULTISENSORY DESIGN · ACCESSIBILITY', slug: 'oltre-lascolto', lang: 'it', image: 'https://rossellamagnani.figma.site/_assets/v11/176474d4960ebe154d49f3d2840823b84d71f931.png' },
  { title: 'Sovrapposizioni', type: 'EXHIBITION DESIGN · AI', slug: 'sovrapposizioni', lang: 'it', image: 'https://rossellamagnani.figma.site/_assets/v11/141ddc64b5b5362cf1d47cddb155b8aefeecc258.png?w=1536' },
  { title: 'Marco Magnani Art', type: 'BRAND IDENTITY · ART DIRECTION', slug: 'marco-magnani-art', image: 'https://rossellamagnani.figma.site/_assets/v11/6eb7ffe7a5b70424dcb96a2ca56a52145979e5ba.png?w=1536' },
  { title: 'Crossing Kyiv', type: 'EDITORIAL DESIGN · CULTURAL PROJECT', slug: 'crossing-kyiv', image: 'https://rossellamagnani.figma.site/_assets/v11/80b5605660174fa81e94a9085663a9f9c21554d2.png?w=1536', crop: { x: 30.2, y: 47.8, zoom: 1.65 } },
  { title: 'a drop of corruption', type: 'AI VIDEO · ART DIRECTION', slug: 'a-drop-of-corruption', image: '', video: 'https://rossellamagnani.figma.site/_videos/v1/4d1d4bed175820029240b41dd761342d8a2dc045' },
  { title: 'PRO Brera', type: 'SPECULATIVE DESIGN · SPATIAL', slug: 'brera-district', image: '/projects/pro-brera.svg', focus: '50% 0%' },
]

// Pictures and videos still served by the current site; to be replaced by local files in public/
const CURRENT_SITE = 'https://rossellamagnani.figma.site'

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
    // pictures from the current site: the opening beside the title, then the outcome (first one large)
    cover: {
      src: `${CURRENT_SITE}/_assets/v11/141ddc64b5b5362cf1d47cddb155b8aefeecc258.png?w=1600`,
      alt: 'The Sovrapposizioni exhibition at MEET Digital Culture Center, Milan: a visitor looks at AI-generated works inspired by great masters.',
    },
    // outcome: the book GIF, then the exhibition (pictures from the current site and from the presentation)
    outcome: [
      {
        src: `${CURRENT_SITE}/_assets/v11/1ce14e6bd4101af66b7e9fc69587eebdb8bb93cb.png?h=2385`,
        alt: 'Animated spreads of the Sovrapposizioni book: inside pages on a clean grid with modern typography.',
        // the GIF's frames sit on a wide empty border: show only the book (x, y, width, height of 2048 × 2560)
        crop: [211, 466, 1631, 1626, 2048, 2560] as const,
      },
      { src: `${CURRENT_SITE}/_assets/v11/c363270d72b8e06db7aaf51c238bb3ea113733cd.png?w=1600`, alt: 'The exhibition at MEET Digital Culture Center: a visitor walks past the AI-generated works.' },
      { src: '/projects/sovrapposizioni/posters-street.svg', alt: 'A row of exhibition posters along a street wall.' },
      { src: `${CURRENT_SITE}/_assets/v11/be04d60125a1b190f560c65f52d5480f9834d7c9.png?h=1400`, alt: "Exhibition poster on a street stand: an AI reinterpretation of a classical painting and the question 'If art speaks to you, does it matter who made it?'", tall: true },
      { src: '/projects/sovrapposizioni/poster-tree.svg', alt: 'Exhibition poster under a tree.', tall: true },
      { src: '/projects/sovrapposizioni/poster-backlit.svg', alt: 'Backlit exhibition poster at night.', tall: true },
      { src: '/projects/sovrapposizioni/banners.svg', alt: 'Exhibition banners hanging between the columns of a building.' },
      { src: '/projects/sovrapposizioni/tickets-2.svg', alt: 'Two entrance tickets with works from the exhibition.', tall: true },
      { src: `${CURRENT_SITE}/_assets/v11/41c75cf2b7142255a806a952c7894c13d0421120.png?w=1600`, alt: 'Entrance tickets for the exhibition, with vertical barcodes, the title in an elegant serif and details of the AI-generated works.' },
    ],
    // the deep dive has its own structure (see SovrapposizioniDeep), with pictures from the project presentation
    deep: {
      // the 24 images generated while training the AI, by master, in the order of the presentation
      generated: [
        ['Kusama', [0, 1, 2]],
        ['Hockney', [3, 4, 5, 6]],
        ['Warhol', [7, 8]],
        ['Monet', [9, 10, 11]],
        ['Modigliani', [12, 13]],
        ['Canaletto', [14, 15, 16, 17]],
        ['Murakami', [18, 19, 20]],
        ['Degas', [21, 22, 23]],
      ].flatMap(([master, list]) =>
        (list as number[]).map(n => ({
          src: `/projects/sovrapposizioni/generated/${String(n).padStart(2, '0')}.svg`,
          alt: `Image generated by the AI trained on the visual language of ${master}.`,
        })),
      ),
      works: [
        { src: '/projects/sovrapposizioni/painting-pool.svg', alt: 'AI-generated work: a swimming pool in front of a modernist house, in the manner of Hockney.' },
        { src: '/projects/sovrapposizioni/painting-lake.svg', alt: 'AI-generated work: boats on a lake among trees, in an impressionist manner.' },
      ],
      // the book, large, before the strip
      book: [
        { src: `${CURRENT_SITE}/_assets/v11/297d2bf3f77e804b239bcd73c5936df12ffa1fbf.png?w=1600`, alt: 'Inside pages of the book showing the training dataset: a grid of photographs of flowers and shells used to teach the generative algorithm.' },
        { src: `${CURRENT_SITE}/_assets/v11/7fc8b686031b4829a0921a509cd4b48571dd1787.png?w=1600`, alt: 'The cover of the Sovrapposizioni book: a natural image reworked through digital pixelation.' },
      ],
      // the editorial object in the order it is opened: the box, the brochure, the book, the postcards, the print
      editorial: [
        ['box-closed', 'The cardboard box closed and tied with string.'],
        ['box-open', 'The box opened: the brochure on top, with the dates, venue and curators.'],
        ['brochure-folded', 'The brochure standing half open.'],
        ['brochure-open', 'The brochure fully unfolded, with the works and the texts of the exhibition.'],
        ['book-artists', "The book opened on the chapter 'Artisti e opere', beside a postcard in its sleeve."],
        ['postcard-portrait', 'A postcard of a portrait in its translucent sleeve.'],
        ['postcard-lake', 'The postcard of the lake work.'],
        ['card-text', "The text card of the work 'Luce sul fiume', with how to scan it."],
        ['print-apple', 'A print of the green apple work hanging from two clips.'],
      ].map(([name, alt]) => ({ src: `/projects/sovrapposizioni/${name}.svg`, alt })),
    },
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
    // the deep dive has its own structure (see MarcoMagnaniDeep), with plates and pages from the brand manual
    manual: {
      unveiling: { src: '/projects/marco-magnani-art/unveiling-bus-shelter.svg', alt: "Poster 'Trama IV' at a bus stop: a burgundy shape with a torn edge covers half of the portrait, leaving only the eyes and part of the face visible." },
      logotype: [{ src: '/projects/marco-magnani-art/logo-signature.svg', alt: "The artist's signature as found on the canvas, the starting point of the logotype." }],
      pages: [3, 5, 7, 8, 9, 13, 19, 21, 25, 33, 37, 39, 41, 42, 44, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 60, 61, 63, 66, 67, 69, 71].map(n => ({
        src: `/projects/marco-magnani-art/manual/page-${String(n).padStart(2, '0')}.svg`,
        alt: `Brand manual, page ${n}.`,
      })),
    },
    // pictures from the current site: the opening beside the title, then the outcome
    cover: {
      src: `${CURRENT_SITE}/_assets/v11/6eb7ffe7a5b70424dcb96a2ca56a52145979e5ba.png?w=1600`,
      alt: 'Marco Magnani Art on the facade of a modern art gallery: large red posters with the artist’s portraits, the signature logo and the dates.',
    },
    outcome: [
      { src: `${CURRENT_SITE}/_assets/v11/bb40d17840c8d7e5b4d49a7db280b8ec149e2914.png?w=1600`, alt: "Poster for the exhibition 'Trame' in an underground passage, with people walking past." },
      { src: `${CURRENT_SITE}/_assets/v11/4ac58ee616c59d31b2af83ca40a9d6f8c4d7fdf5.png?w=1600`, alt: "Backlit billboard 'La trama come confine' with a detail of a portrait framed by an irregular window." },
      { src: `${CURRENT_SITE}/_assets/v11/5d9b11bc037a4a2698c0dbd7a2e7532c76307bb8.png?w=1600`, alt: 'Brochures laid out in rows: deep red covers and inside pages with the portraits.' },
      { src: `${CURRENT_SITE}/_assets/v11/4ca5cedeb374b25dbecc4c62cdf6921008b37d0d.png?w=1600`, alt: 'Business cards floating: a detail of a portrait on the front, the signature logo on the dark back.' },
      { src: `${CURRENT_SITE}/_assets/v11/3c30026e91ed20dbc517151c07bbd9802d1f0992.png?w=1600`, alt: "The book 'Anatomia della trama', with a blue cover torn open on a portrait, on a table by a window." },
      { src: `${CURRENT_SITE}/_videos/v1/d5d628227812bc5ee2142d2a7eebae121bfcb7e5`, alt: 'The website on a laptop and a phone: a full-screen detail of a portrait and the menu of works.', poster: '/projects/marco-magnani-art/website-poster.svg', autoPlay: true },
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
    // the GIF of the spreads from the current site: beside the title (on the left page) and as the outcome
    cover: {
      src: `${CURRENT_SITE}/_assets/v11/6443891fe021dd66e35c18fd5dcd33f18db0d01e.png`,
      alt: "Animated spreads of Crossing Kyiv: handwritten texts over reportage photographs, such as 'She Has a Dream' by Irina Dzhus.",
      // the frames sit on an empty border: fill the opening with the book only, centred on the left page
      crop: [204, 168, 1524, 940, 1932, 1333] as const,
      centre: 0.33,
    },
    outcome: [
      {
        src: `${CURRENT_SITE}/_assets/v11/6443891fe021dd66e35c18fd5dcd33f18db0d01e.png`,
        alt: "Animated spreads of Crossing Kyiv: handwritten texts over reportage photographs, such as 'She Has a Dream' by Irina Dzhus.",
        // the frames sit on an empty border: show only the open book (x, y, width, height of 1932 × 1333)
        crop: [204, 168, 1524, 940, 1932, 1333] as const,
      },
    ],
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

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const scrollBehavior = (): ScrollBehavior => (prefersReducedMotion() ? 'auto' : 'smooth')

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const cursor = cursorRef.current
    if (!cursor) return

    const handleMove = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      const target = event.target as Element | null
      cursor.classList.toggle('labelled', Boolean(target?.closest('[data-cursor-label]')))
    }
    const handleLeave = () => cursor.classList.remove('labelled')

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor__label">Open project</span>
    </div>
  )
}

// Plays a muted video while at least half of it is on screen, pauses it otherwise
function playWhileVisible(video: HTMLVideoElement | null) {
  if (!video || prefersReducedMotion()) return
  video.muted = true
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!video.isConnected) return observer.disconnect()
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    },
    { threshold: 0.5 },
  )
  observer.observe(video)
}

// Pass `src` (and `alt`) to show a real image or video; the frame then takes the file's own proportions.
// `poster` is the frame a video shows before it starts. Without `src` a grey placeholder is shown.
function Placeholder({
  caption,
  className = '',
  play = false,
  src,
  alt = '',
  poster,
  style,
  autoPlay = false,
  focus,
}: {
  caption: string
  className?: string
  play?: boolean
  src?: string
  alt?: string
  poster?: string
  style?: React.CSSProperties
  autoPlay?: boolean
  focus?: string // where a cropped picture is anchored (CSS object-position)
}) {
  // files ending in .mp4/.webm/.mov, or videos served by the current site (/_videos/...)
  const isVideo = Boolean(src && /\.(mp4|webm|mov)$|\/_videos\//i.test(src))
  return (
    <figure className={`placeholder ${className}`} style={style}>
      <div className="placeholder__surface">
        {src ? (
          isVideo ? (
            <video
              src={src}
              poster={poster}
              controls
              playsInline
              preload="metadata"
              aria-label={alt || caption}
              // a silent video can start on its own: muted and looping, only while it is on screen,
              // never with reduced motion; the controls stay to pause it
              {...(autoPlay && { muted: true, loop: true, ref: playWhileVisible })}
            />
          ) : (
            <img
              src={src}
              alt={alt}
              style={focus ? { objectPosition: focus } : undefined}
              // the picture's shape, so the layout can size it to fill its columns without getting taller than the window
              onLoad={event => {
                const img = event.currentTarget
                if (img.naturalHeight) img.style.setProperty('--ratio', String(img.naturalWidth / img.naturalHeight))
              }}
            />
          )
        ) : (
          <>
            <span className="placeholder__index" aria-hidden="true">IMAGE / VIDEO</span>
            {play && (
              <span className="play" aria-hidden="true">
                <span />
              </span>
            )}
          </>
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

// Case study images form from top to bottom once they enter the screen; the animation always runs
// to the end on its own. Grouped images (cards, pairs, process strip) start one after another
const GROW_SELECTOR = '.placeholder__surface:not(.hero__media .placeholder__surface)'
const GROUP_SELECTOR = '.instrument-grid, .paired-media, .process-strip, .orow'

function useGrowOnScroll(dependency: unknown) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const elements = Array.from(document.querySelectorAll<HTMLElement>(GROW_SELECTOR)).filter(
      element => !element.classList.contains('is-formed'),
    )
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const element = entry.target as HTMLElement
          const group = element.closest(GROUP_SELECTOR)
          const index = group ? Array.from(group.querySelectorAll(GROW_SELECTOR)).indexOf(element) : 0
          element.style.setProperty('--form-delay', `${Math.min(index, 3) * 0.15}s`)
          observer.unobserve(element)
          // a picture still loading would form while empty and then just pop in: wait for it
          const img = element.querySelector('img')
          const form = () => element.classList.add('is-formed')
          if (img && !img.complete) {
            img.addEventListener('load', form, { once: true })
            img.addEventListener('error', form, { once: true })
            // never leave a picture hidden: form it anyway if loading takes too long or the event is missed
            window.setTimeout(form, 2500)
          } else form()
        }),
      { rootMargin: '0px 0px -12% 0px' },
    )
    elements.forEach(element => {
      element.classList.add('will-form')
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [dependency])
}

// Many small pictures shown as on the reference site: rows that drift slowly sideways, alternating
// direction, each picture a good size. Keyboard focus stops them (hovering too, unless turned off);
// with reduced motion they stay still and can be scrolled by hand.
function ImageWall({
  pictures,
  label,
  rows: rowCount = 2,
  pauseOnHover = true,
}: {
  pictures: { src: string; alt: string }[]
  label: string
  rows?: number
  pauseOnHover?: boolean
}) {
  const size = Math.ceil(pictures.length / rowCount)
  const rows = Array.from({ length: rowCount }, (_, r) => pictures.slice(r * size, (r + 1) * size))
  return (
    <div
      className={`image-wall ${pauseOnHover ? 'pause-on-hover' : ''}`}
      style={{ '--wall-rows': rowCount } as React.CSSProperties}
      role="group"
      aria-label={label}
      tabIndex={0}
    >
      {rows.map((row, r) => (
        <div className={`image-wall__row ${r % 2 ? 'is-reverse' : ''}`} key={r}>
          <div className="image-wall__track">
            {[...row, ...row].map((pic, k) => (
              <img
                key={k}
                src={pic.src}
                alt={k < row.length ? pic.alt : ''}
                aria-hidden={k >= row.length || undefined}
                draggable={false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Outcome pictures laid out as on the reference site: a 7-column grid with 8px gaps, one or two
// pictures per row and a lot of air between rows. Landscape pictures take 5 columns (moving between
// left, centre and right); an upright one takes 2 and sits beside a 4-column landscape one, lower down;
// two or three upright ones share a row.
// `crop` shows only part of a picture: [x, y, width, height, picture width, picture height] in pixels
// `full` spreads a very wide picture (a score, a panorama) across all seven columns
type OutcomePic = { src?: string; alt?: string; caption: string; tall?: boolean; full?: boolean; poster?: string; autoPlay?: boolean; crop?: readonly number[] }
function OutcomeRows({ items, turn = 0 }: { items: OutcomePic[]; turn?: number }) {
  type Cell = OutcomePic & { start: number; span: number; shift?: boolean }
  const rows: Cell[][] = []
  const wideStarts = [2, 1, 3]
  let wideTurn = turn // where the first landscape picture goes: 0 centre, 1 left, 2 right
  let pairTurn = 0
  let i = 0
  while (i < items.length) {
    const a = items[i]
    const b = items[i + 1]
    if (a.full) {
      rows.push([{ ...a, start: 1, span: 7 }])
      i += 1
    } else if (i === 0 && a.tall) {
      rows.push([{ ...a, start: 3, span: 3 }])
      i += 1
    } else if (i === 0 || (!a.tall && (!b || !b.tall || items[i + 2]?.tall))) {
      rows.push([{ ...a, start: wideStarts[wideTurn++ % 3], span: 5 }])
      i += 1
    } else if (a.tall && b?.tall) {
      const run = items[i + 2]?.tall ? 3 : 2
      const starts = run === 3 ? [1, 3, 5] : [3, 5]
      rows.push(items.slice(i, i + run).map((item, k) => ({ ...item, start: starts[k], span: 2 })))
      i += run
    } else if (b) {
      const [tall, wide] = a.tall ? [a, b] : [b, a]
      const tallLeft = pairTurn++ % 2 === 1
      rows.push(
        tallLeft
          ? [{ ...tall, start: 1, span: 2 }, { ...wide, start: 4, span: 4, shift: true }]
          : [{ ...wide, start: 1, span: 4 }, { ...tall, start: 6, span: 2, shift: true }],
      )
      i += 2
    } else {
      rows.push([{ ...a, start: 3, span: 3 }])
      i += 1
    }
  }
  return (
    <div className="outcome-rows">
      {rows.map((row, r) => (
        <div className="orow" key={r}>
          {row.map(cell => (
            <Placeholder
              key={cell.src ?? `${r}-${cell.start}`}
              className={`orow__item ${cell.shift ? 'is-shifted' : ''} ${cell.tall ? 'is-tall' : ''} ${cell.crop ? 'is-cropped' : ''}`}
              caption={cell.caption}
              alt={cell.alt}
              src={cell.src}
              poster={cell.poster}
              autoPlay={cell.autoPlay}
              style={
                {
                  '--start': cell.start,
                  '--span': cell.span,
                  ...(cell.crop && {
                    '--crop-ratio': `${cell.crop[2]} / ${cell.crop[3]}`,
                    '--crop-w': `${(cell.crop[4] / cell.crop[2]) * 100}%`,
                    '--crop-x': `${(-cell.crop[0] / cell.crop[2]) * 100}%`,
                    '--crop-y': `${(-cell.crop[1] / cell.crop[3]) * 100}%`,
                  }),
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// Text that rises line by line from behind a mask when it comes into view. Each visual line moves
// together and starts a moment after the one above; screen readers get the plain text.
// A "\n" in the text forces a line break.
function Lines({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const markLines = () => {
      let line = -1
      let lastTop = Number.NEGATIVE_INFINITY
      element.querySelectorAll<HTMLElement>('.ln-w').forEach(word => {
        if (word.offsetTop > lastTop + 2) {
          line += 1
          lastTop = word.offsetTop
        }
        word.style.setProperty('--line', String(line))
      })
    }
    markLines()
    const resizeObserver = new ResizeObserver(markLines)
    resizeObserver.observe(element)
    // Text in the opening of a page rises as soon as the page loads
    if (element.closest('.hero')) {
      requestAnimationFrame(() => element.classList.add('is-in'))
      return () => resizeObserver.disconnect()
    }
    const viewObserver = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          element.classList.add('is-in')
          viewObserver.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    viewObserver.observe(element)
    return () => {
      resizeObserver.disconnect()
      viewObserver.disconnect()
    }
  }, [text])

  return (
    <>
      <span className="sr-only">{text.replace(/\n/g, ' ')}</span>
      <span className="lines" aria-hidden="true" ref={ref}>
        {text.split('\n').map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {rowIndex > 0 && <br />}
            {row.split(' ').map((word, index) => (
              <Fragment key={index}>
                <span className="ln-w">
                  <span>{word}</span>
                </span>{' '}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </span>
    </>
  )
}

function SectionHeading({ number, children }: { number?: string; children: React.ReactNode }) {
  return (
    <div className="section-heading">
      {number && <span>{number}</span>}
      <h2>{typeof children === 'string' ? <Lines text={children} /> : children}</h2>
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
        <ContactMenu />
      </nav>
      <PhoneMenu />
    </header>
  )
}

const introduction =
  'Communication designer working on exhibitions and multisensory experiences designed for the widest possible audience.'

// Phone only: three lines that open a menu and turn into a cross to close it. The menu shows the
// introduction under the name and About, Email and LinkedIn at the bottom left.
function PhoneMenu() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    const overflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus()
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`phone-menu__toggle ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-controls="phone-menu"
        aria-label={open ? 'Close menu' : 'Menu'}
        onClick={() => setOpen(value => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <div ref={panelRef} id="phone-menu" className="phone-menu" hidden={!open}>
        <p className="phone-menu__intro">{introduction}</p>
        <a href="/about" onClick={() => setOpen(false)}>
          About
        </a>
        <a href="mailto:magnanirossella02@gmail.com" onClick={() => setOpen(false)}>
          Email
        </a>
        <a href="https://www.linkedin.com/in/rossella-magnani-276219279/" onClick={() => setOpen(false)}>
          LinkedIn
        </a>
      </div>
    </>
  )
}

// "Contact" in the header: a small drop-down with Email and LinkedIn, one under the other.
// Opens on hover with a mouse, on click or Enter/Space otherwise; Escape or clicking elsewhere closes it.
function ContactMenu() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const hoverable = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={`contact-menu ${open ? 'is-open' : ''}`}
      onMouseEnter={() => hoverable() && setOpen(true)}
      onMouseLeave={() => hoverable() && setOpen(false)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="contact-links"
        onClick={() => setOpen(value => !value)}
      >
        Contact
      </button>
      <ul id="contact-links" className="contact-menu__panel" hidden={!open}>
        <li>
          <a href="mailto:magnanirossella02@gmail.com">Email</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/rossella-magnani-276219279/">LinkedIn</a>
        </li>
      </ul>
    </div>
  )
}

function ProjectCase({ project }: { project: (typeof caseStudies)[number] }) {
  // pictures are optional per project; until a project has them its frames stay grey
  type Pic = { src: string; alt: string }
  const media = project as {
    cover?: Pic & { focus?: string; crop?: readonly number[]; centre?: number }
    outcome?: (Pic & { tall?: boolean; crop?: readonly number[]; poster?: string; autoPlay?: boolean })[]
    deep?: {
      context?: Pic
      framework?: Pic
      generated?: Pic[]
      cards?: Pic[]
      pair?: Pic[]
      backstage?: Pic[]
      works?: Pic[]
      editorial?: Pic[]
      book?: Pic[]
    }
    manual?: { logotype: Pic[]; pages: Pic[]; unveiling: Pic }
  }
  const deep = media.deep
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
    return () => revealObserver.disconnect()
  }, [deepView])
  useGrowOnScroll(deepView)

  return (
    <main className={`case ${deepView || project.slug === 'crossing-kyiv' || project.slug === 'a-drop-of-corruption' ? 'is-deep' : ''}`}>
      <SiteHeader />

      <article id="content" tabIndex={-1}>
        <section className="hero shell reveal">
          <div className="hero__text">
            <div className="hero__head">
              <h1 lang={projects[projectIndex]?.lang}><Lines text={project.title} /></h1>
              <p className="hero__subtitle">
                <Lines text={project.slug === 'crossing-kyiv' ? 'Ukrainian creativity beyond the narratives of war.' : project.lead} />
              </p>
            </div>
            <div className="facts" role="group" aria-label="Project details">
              {[
                ['Type', project.type],
                ['Context', project.context],
                ['Year', project.year],
                ['Role', project.slug === 'sovrapposizioni' ? 'Concept, exhibition and editorial design' : project.slug === 'marco-magnani-art' ? 'Positioning, brand identity, art direction' : project.slug === 'crossing-kyiv' ? 'Editorial design, layout and typography' : project.slug === 'brera-district' ? 'Research, concept and visual identity' : project.slug === 'a-drop-of-corruption' ? 'Concept, art direction and AI video production' : 'Designer, researcher'],
                ['Tools', project.slug === 'sovrapposizioni' ? 'Midjourney, Illustrator, Indesign, Photoshop' : project.slug === 'marco-magnani-art' ? 'Illustrator, Photoshop, Figma, Framer, Indesign' : project.slug === 'crossing-kyiv' ? 'Indesign, Illustrator, Photoshop' : project.slug === 'brera-district' ? 'Illustrator, Photoshop, Indesign' : project.slug === 'a-drop-of-corruption' ? 'Midjourney, Premiere' : 'Replace with project tools'],
              ].map(([label, value]) => (
                <div className="fact" key={label}>
                  <span><Lines text={label} /></span>
                  <p><Lines text={value} /></p>
                </div>
              ))}
            </div>
          </div>
          <Placeholder
            caption={`${project.title}: main project visual`}
            src={media.cover?.src}
            alt={media.cover?.alt}
            focus={media.cover?.focus}
            className={media.cover?.crop ? 'hero__media is-cropped' : 'hero__media'}
            style={
              media.cover?.crop &&
              ({
                '--crop-scale': media.cover.crop[5] / media.cover.crop[3],
                '--crop-top': -media.cover.crop[1] / media.cover.crop[3],
                '--crop-centre': (media.cover.crop[0] + (media.cover.centre ?? 0.5) * media.cover.crop[2]) / media.cover.crop[4],
              } as React.CSSProperties)
            }
          />
        </section>

        <section className="quick-read shell reveal">
          <div className="section-label">In short</div>
          <div className="quick-read__title">
            <h2>
              <Lines text={project.slug === 'sovrapposizioni'
                ? 'Four masters, one algorithm, twenty new images.'
                : project.slug === 'marco-magnani-art'
                  ? 'Paintings that hold a room like sculpture.' : project.slug === 'brera-district' ? "What if Brera's students reclaimed the district from below?" : project.slug === 'a-drop-of-corruption' ? 'Error as a way of telling a story.' : project.slug === 'crossing-kyiv' ? 'A country told through the people who make its culture.'
                : project.lead} />
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
          <section id="challenge" className="section shell challenge reveal">
            <div className="section-label">Challenge</div>
            <div className="challenge__copy">
              <p>{project.challenge}</p>
            </div>
            <blockquote>
              <Lines text={project.slug === 'sovrapposizioni'
                ? '"Neither entirely the machine\'s, nor entirely the human\'s."'
                : project.slug === 'marco-magnani-art'
                  ? '"Bridging the art gallery and the architectural firm."' : project.slug === 'brera-district' ? '"Celebrated for its art, closed to its own creative community."'
                : project.lead} />
            </blockquote>
          </section>

          {project.slug === 'sovrapposizioni' && deep?.works ? (
            <SovrapposizioniDeep project={project} deep={deep} />
          ) : media.manual ? (
            <MarcoMagnaniDeep project={project} manual={media.manual} />
          ) : (
          <>
          <section id="research" className="section shell research">
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
              <Placeholder caption={`${project.title}: research context`} src={deep?.context?.src} alt={deep?.context?.alt} />
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
              {deep?.framework && (
                <Placeholder className="research-collage" caption="Images generated while training the AI" src={deep.framework.src} alt={deep.framework.alt} />
              )}
              <div className="instrument-grid">
                {researchCards.map((item, index) => (
                  <article className="instrument-card" key={item.title}>
                    <Placeholder caption={`${project.title}: ${item.title}`} src={deep?.cards?.[index]?.src} alt={deep?.cards?.[index]?.alt} />
                    <div className="instrument-card__body">
                      <h3><Lines text={item.title} /></h3>
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
              {(!deep?.pair || deep.pair.length > 0) && (
                <div className="paired-media">
                  <Placeholder caption={`${project.title}: design development`} src={deep?.pair?.[0]?.src} alt={deep?.pair?.[0]?.alt} />
                  <Placeholder caption={`${project.title}: tests and iterations`} src={deep?.pair?.[1]?.src} alt={deep?.pair?.[1]?.alt} />
                </div>
              )}
            </div>
          </section>

          <section id="insight" className="insight reveal">
            <div className="shell insight__inner">
              <div className="section-label">Key insight</div>
              <p><Lines text={project.insight} /></p>
            </div>
          </section>

          <section id="process" className="section process reveal">
            <div className="process-sticky">
              <div className="shell process__head">
                <div className="section-label">Process</div>
                <h2><Lines text={project.processTitle} /></h2>
                <p>{project.processDescription} →</p>
              </div>
              <div className="process-strip" tabIndex={0} role="region" aria-label="Process images, scroll sideways">
                {deep?.backstage
                  ? deep.backstage.map(({ src, alt }) => <Placeholder key={src} caption={alt} alt={alt} src={src} />)
                  : Array.from({ length: 5 }, (_, index) => (
                      <Placeholder
                        key={index}
                        caption={`${String(index + 1).padStart(2, '0')}: ${project.title} process`}
                      />
                    ))}
              </div>
            </div>
          </section>
          </>
          )}
        </div>
        )}

        <section id="outcome" className="section shell outcome">
          {/* Each project composes its outcome images differently on the four-column grid */}
          <div className={`outcome-gallery outcome-gallery--${project.slug} reveal`}>
            <span className="outcome-gallery__number">03</span>
            <h2><Lines text={project.summary} /></h2>
            <OutcomeRows
              items={
                media.outcome
                  ? media.outcome.map(({ src, alt, tall, crop, poster, autoPlay }) => ({ src, alt, tall, crop, poster, autoPlay, caption: alt }))
                  : project.slug === 'a-drop-of-corruption'
                    ? [{ caption: `${project.title}: video` }]
                    : [
                        { caption: `${project.title}: main outcome` },
                        ...['01', '02', '03'].map(n => ({ caption: `${project.title}: outcome detail ${n}` })),
                      ]
              }
            />
          </div>
        </section>

        <a id="next-project" className="next-project reveal" href={`/${nextProject.slug}`}>
          <span className="next-project__label">Next project</span>
          <strong lang={nextProject.lang}><Lines text={nextProject.title} /></strong>
          <i aria-hidden="true">
            <svg viewBox="0 0 180 120">
              <path d="M0 51h151v18H0z" />
              <path d="M82 0h19c14 27 38 45 79 51v18c-41 6-65 24-79 51H82c13-29 34-49 65-60C116 49 95 29 82 0Z" />
            </svg>
          </i>
        </a>
      </article>

      <footer className="footer shell">
        <span>© {new Date().getFullYear()} Rossella Magnani</span>
      </footer>
    </main>
  )
}

// Sovrapposizioni's deep dive, laid out like the rest of the page: each text, then its pictures large on
// the 7-column grid. Training the AI with the collage of generated images; authorship and the dialogue
// with the originals, each followed by a generated work; the book; the editorial object in a strip.
function SovrapposizioniDeep({
  project,
  deep,
}: {
  project: (typeof caseStudies)[number]
  deep: { generated?: { src: string; alt: string }[]; works?: { src: string; alt: string }[]; editorial?: { src: string; alt: string }[]; book?: { src: string; alt: string }[] }
}) {
  const [authorship, masters, dialogue, beyond, translation] = project.research
  const pictures = (list?: { src: string; alt: string }[], turn = 0) =>
    list && <OutcomeRows turn={turn} items={list.map(pic => ({ ...pic, caption: pic.alt }))} />
  return (
    <>
      <section id="research" className="section shell research sv-deep">
        <div className="section-label reveal">Research</div>

        <div className="sv-text reveal">
          <SectionHeading number="01">{masters.title}</SectionHeading>
          <p>{masters.copy}</p>
        </div>
        {deep.generated && <ImageWall pictures={deep.generated} label="Images generated while training the AI" />}

        {[authorship, dialogue].map((text, index) => (
          <Fragment key={text.title}>
            <div className="sv-text reveal">
              <SectionHeading number={String(index + 2).padStart(2, '0')}>{text.title}</SectionHeading>
              <p>{text.copy}</p>
            </div>
            {pictures(deep.works?.slice(index, index + 1), index + 1)}
          </Fragment>
        ))}
      </section>

      <section id="insight" className="insight reveal">
        <div className="shell insight__inner">
          <div className="section-label">Key insight</div>
          <p><Lines text={project.insight} /></p>
        </div>
      </section>

      <section className="section shell research sv-deep">
        <div className="sv-text reveal">
          <SectionHeading number="04">{beyond.title}</SectionHeading>
          <p>{beyond.copy}</p>
        </div>
        {pictures(deep.book)}
      </section>

      <section id="process" className="section process reveal">
        <div className="process-sticky">
          <div className="shell process__head">
            <div className="section-label">05</div>
            <h2><Lines text={translation.title} /></h2>
            <p className="sv-strip-copy">{translation.copy}</p>
            <p>Scroll sideways →</p>
          </div>
          <div className="process-strip" tabIndex={0} role="region" aria-label="The editorial object, scroll sideways">
            {deep.editorial?.map(({ src, alt }) => <Placeholder key={src} caption={alt} alt={alt} src={src} />)}
          </div>
        </div>
      </section>
    </>
  )
}

// Marco Magnani Art's deep dive: texts in the usual column, the scanned signature, the colour sampling, and the brand manual's pages
// drifting in a wall
type ManualPic = { src: string; alt: string }
function MarcoMagnaniDeep({
  project,
  manual,
}: {
  project: (typeof caseStudies)[number]
  manual: { logotype: ManualPic[]; pages: ManualPic[]; unveiling: ManualPic }
}) {
  const [presence, , language, unveiling] = project.research
  const pictures = (list: ManualPic[], turn = 0) => (
    <OutcomeRows turn={turn} items={list.map(pic => ({ ...pic, caption: pic.alt }))} />
  )
  return (
    <>
      <section id="research" className="section shell research sv-deep">
        <div className="section-label reveal">Research</div>

        <div className="sv-text reveal">
          <SectionHeading number="01">{presence.title}</SectionHeading>
          <p>{presence.copy}</p>
        </div>

        <div className="sv-text reveal">
          <SectionHeading number="02">{language.title}</SectionHeading>
          <p>{language.copy}</p>
        </div>
        {pictures(manual.logotype)}

        <div className="sv-text reveal">
          <SectionHeading number="03">The brand manual</SectionHeading>
          <p>
            Everything is collected in a brand manual: the brand and copy strategy, the messaging, the visual
            guidelines for logotype, colour and typography, and the applications.
          </p>
        </div>
        <ImageWall pictures={manual.pages} label="Pages of the brand manual" rows={3} pauseOnHover={false} />
      </section>

      <section id="insight" className="insight reveal">
        <div className="shell insight__inner">
          <div className="section-label">Key insight</div>
          <p><Lines text={project.insight} /></p>
        </div>
      </section>

      <section className="section shell research sv-deep">
        <div className="sv-text reveal">
          <SectionHeading number="04">{unveiling.title}</SectionHeading>
          <p>{unveiling.copy}</p>
        </div>
        {pictures([manual.unveiling], 2)}
      </section>
    </>
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

      <footer className="footer shell">
        <span>© {new Date().getFullYear()} Rossella Magnani</span>
      </footer>
    </main>
  )
}

function Home() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Desktop: an endless row. Wheel, trackpad (down or sideways), dragging and the arrow keys
  // move it; it glides to a stop, and each project shrinks a little while the row is moving.
  // Phone: the row is swiped natively, with the same slight shrink while it moves.
  useEffect(() => {
    const track = trackRef.current
    const row = track?.parentElement
    if (!track || !row) return
    const cards = Array.from(track.children) as HTMLElement[]
    // the phone layout also covers an upright iPad (see the media queries in index.css)
    const desktop = window.matchMedia('(min-width: 1025px), (min-width: 761px) and (orientation: landscape)')
    const still = prefersReducedMotion()
    let frame = 0
    let target = 0
    let current = 0
    let last = 0
    let scale = 1
    let step = 0
    let drag: { x: number; moved: boolean } | null = null
    let suppressClick = false

    const measure = () => {
      step = (cards[0]?.offsetWidth ?? 0) + 8
    }
    const place = () => {
      const total = step * cards.length
      cards.forEach((card, index) => {
        if (!desktop.matches || !total) {
          card.style.translate = ''
          return
        }
        const raw = index * step - current
        const x = ((((raw + step) % total) + total) % total) - step
        card.style.translate = `${x - index * step}px 0`
      })
    }
    const tick = () => {
      frame = 0
      if (desktop.matches) current = still || drag ? target : current + (target - current) * 0.08
      else current = row.scrollLeft
      place()
      const speed = Math.abs(current - last)
      last = current
      const goal = still ? 1 : 1 - Math.min(speed * 0.006, 0.12)
      scale += (goal - scale) * 0.2
      track.style.setProperty('--hm-scale', scale.toFixed(4))
      const moving = desktop.matches && Math.abs(target - current) > 0.1
      if (moving || drag || Math.abs(1 - scale) > 0.001) frame = window.requestAnimationFrame(tick)
      else track.style.setProperty('--hm-scale', '1')
    }
    const wake = () => {
      if (!frame) frame = window.requestAnimationFrame(tick)
    }
    const moveBy = (distance: number) => {
      target += distance
      wake()
    }

    const onWheel = (event: WheelEvent) => {
      if (!desktop.matches) return
      event.preventDefault()
      const unit = event.deltaMode === 1 ? 40 : 1
      moveBy((Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * unit)
    }
    const onKey = (event: KeyboardEvent) => {
      if (!desktop.matches) return
      const forward = ['ArrowRight', 'ArrowDown', 'PageDown'].includes(event.key)
      const back = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)
      if (!forward && !back) return
      event.preventDefault()
      moveBy(forward ? step : -step)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!desktop.matches || event.button !== 0) return
      drag = { x: event.clientX, moved: false }
      wake()
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!drag) return
      const distance = drag.x - event.clientX
      if (!drag.moved && Math.abs(distance) < 6) return
      if (!drag.moved) row.setPointerCapture(event.pointerId)
      drag.moved = true
      drag.x = event.clientX
      target += distance
    }
    const onPointerUp = () => {
      if (!drag) return
      suppressClick = drag.moved
      drag = null
      wake()
    }
    const onClick = (event: MouseEvent) => {
      if (!suppressClick) return
      suppressClick = false
      event.preventDefault()
      event.stopPropagation()
    }
    // Keyboard users: bring a focused project fully into view
    const onFocus = (event: FocusEvent) => {
      if (!desktop.matches) return
      // the browser may scroll the clipped row on its own to show the focused link; undo that
      row.scrollLeft = 0
      if (row.parentElement) row.parentElement.scrollLeft = 0
      const rect = (event.target as HTMLElement).getBoundingClientRect()
      const frame = row.getBoundingClientRect() // the row may be narrower than the window on large screens
      if (rect.left < frame.left + 20 || rect.right > frame.right - 20) {
        target = current + rect.left - frame.left - 20
        wake()
      }
    }
    const onResize = () => {
      measure()
      wake()
    }

    measure()
    tick()
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    row.addEventListener('scroll', wake, { passive: true })
    row.addEventListener('pointerdown', onPointerDown)
    row.addEventListener('pointermove', onPointerMove)
    row.addEventListener('pointerup', onPointerUp)
    row.addEventListener('pointercancel', onPointerUp)
    row.addEventListener('click', onClick, true)
    row.addEventListener('focusin', onFocus)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      row.removeEventListener('scroll', wake)
      row.removeEventListener('pointerdown', onPointerDown)
      row.removeEventListener('pointermove', onPointerMove)
      row.removeEventListener('pointerup', onPointerUp)
      row.removeEventListener('pointercancel', onPointerUp)
      row.removeEventListener('click', onClick, true)
      row.removeEventListener('focusin', onFocus)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <main className="hm">
      <SiteHeader skipTo="work" />

      <section className="hm-intro" aria-label="Introduction">
        <h1>{introduction}</h1>
      </section>

      <div className="hm-stage">
        <section id="work" className="hm-row" tabIndex={-1} aria-label="Projects">
          <div className="hm-track" ref={trackRef}>
            {projects.map(project => (
              <a
                className="hm-card"
                href={`/${project.slug}`}
                data-cursor-label
                key={project.title}
                draggable={false}
              >
                <span className="hm-card__label" lang={project.lang}>
                  <span className="hm-roll">
                    <span>{project.title}</span>
                    <span aria-hidden="true">{project.title}</span>
                  </span>
                </span>
                <span className="sr-only">, {project.type.toLowerCase()}</span>
                <span className={`hm-image ${project.whole ? 'hm-image--whole' : ''}`} aria-hidden="true">
                  {project.video ? (
                    <video
                      src={project.video}
                      muted
                      loop
                      playsInline
                      autoPlay={!prefersReducedMotion()}
                      preload="auto"
                      draggable={false}
                    />
                  ) : project.image ? (
                    <img
                      src={project.image}
                      alt=""
                      draggable={false}
                      className={project.crop ? 'hm-image__crop' : undefined}
                      style={
                        project.crop
                          ? { height: `${project.crop.zoom * 100}%`, translate: `-${project.crop.x}% -${project.crop.y}%` }
                          : { objectPosition: project.focus }
                      }
                    />
                  ) : (
                    <span>PROJECT IMAGE</span>
                  )}
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <footer className="hm-licence">
        <small>© {new Date().getFullYear()} Rossella Magnani</small>
      </footer>
    </main>
  )
}

function CaseStudy() {
  const [deepView, setDeepView] = useState(false)

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))
    return () => revealObserver.disconnect()
  }, [deepView])
  useGrowOnScroll(deepView)

  return (
    <main className={`case ${deepView ? 'is-deep' : ''}`}>
      <SiteHeader />

      <article id="content" tabIndex={-1}>
        <section className="hero shell reveal">
          <div className="hero__text">
            <div className="hero__head">
              <h1 lang="it"><Lines text={'Oltre\nl’ascolto'} /></h1>
              <p className="hero__subtitle hero__subtitle--ink">
                <Lines text="Making sound accessible beyond hearing" />
              </p>
            </div>
            <div className="facts" role="group" aria-label="Project details">
              {[
                ['Type', 'Animated video, tactile artefacts'],
                ['Context', 'Academic project, Politecnico di Milano'],
                ['Year', '2025'],
                ['Role', 'Research, concept, motion and tactile design'],
                ['Tools', 'After Effects, Illustrator, Rhino'],
              ].map(([label, value]) => (
                <div className="fact" key={label}>
                  <span><Lines text={label} /></span>
                  <p><Lines text={value} /></p>
                </div>
              ))}
            </div>
          </div>
          <Placeholder
            className="hero__media"
            caption="Two textured spheres in motion, from the project's animation"
            src={`${CURRENT_SITE}/_assets/v11/176474d4960ebe154d49f3d2840823b84d71f931.png`}
          />
        </section>

        {/* Where the project was shown, centred under the opening */}
        <section className="exhibited shell reveal" aria-label="Exhibitions">
          <p className="exhibited__text">
            <Lines text="Exhibited during Accessibility Days at the Istituto dei Ciechi di Milano, at Politecnico di Milano for Inclusion: oltre l’udito, and at the BookCity Milano exhibition at RAI CPTV, Milan." />
          </p>
          <ul className="exhibited__logos">
            {/* logos in black, each with its own height so they look the same size */}
            {[
              { name: 'Accessibility Days', logo: '/logos/accessibility-days.svg', height: 58 },
              { name: 'Istituto dei Ciechi di Milano', logo: '/logos/istituto-dei-ciechi-di-milano.svg', height: 64 },
              { name: 'Politecnico di Milano', logo: '/logos/politecnico-di-milano.svg', height: 50 },
              { name: 'BookCity Milano', logo: '/logos/bookcity-milano.svg', height: 76 },
              { name: 'Rai Pubblica Utilità', logo: '/logos/rai-pubblica-utilita.svg', height: 44 },
            ].map(({ name, logo, height }) => (
              <li key={name}>
                <img src={logo} alt={name} style={{ '--logo-h': `${height}px` } as React.CSSProperties} />
              </li>
            ))}
          </ul>
        </section>

        <section className="quick-read shell reveal">
          <div className="section-label">In short</div>
          <div className="quick-read__title">
            <h2><Lines text="What does a sound feel like?" /></h2>
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
        <section id="challenge" className="section shell challenge reveal">
          <div className="section-label">Challenge</div>
          <div className="challenge__copy">
            <p>
              How might sound become an experience shared beyond the act of hearing? The project
              investigates how people with hearing and visual disabilities can encounter electronic
              music through image, touch, vibration and material form.
            </p>
          </div>
          <blockquote><Lines text="“A sound is not only heard. It can be seen and held.”" /></blockquote>
        </section>

        <section id="research" className="section shell research">
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
          </div>

          <div className="research-block reveal">
            <SectionHeading number="02–04">The instruments</SectionHeading>
            <p className="intro">
              Three machines built at the Studio became the starting point for a visual and tactile vocabulary.
            </p>
            <div className="instrument-grid">
              {instruments.map(instrument => (
                <article className="instrument-card" key={instrument.name}>
                  <Placeholder
                    caption={`Archive photograph: ${instrument.name}`}
                    alt={`Archive photograph of the ${instrument.name}.`}
                    src={instrument.image}
                  />
                  <div className="instrument-card__body">
                    <h3><Lines text={instrument.name} /></h3>
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
            <OutcomeRows
              items={[
                {
                  caption: 'Tactile study: sound waves and Braille',
                  alt: 'A white relief panel with wavy ridges, continued by silver strips that keep the wave form, dotted with Braille.',
                  src: '/projects/oltre/tactile-waves.svg',
                },
              ]}
            />
          </div>
        </section>

        <section id="insight" className="insight reveal">
          <div className="shell insight__inner">
            <div className="section-label">Key insight</div>
            <p>
              <Lines text="The sounds of the Studio are rough, mechanical and material. The design had to keep that roughness, in something you can see and something you can hold." />
            </p>
          </div>
        </section>

        <section id="process" className="section shell process-score reveal">
          <div className="section-label">Process</div>
          <h2><Lines text="From signal to surface" /></h2>
          <p className="process-score__intro">
            The intercode score lines up every scene of the video with the voice and the sounds, from
            the opening titles to the closing credits.
          </p>
          <OutcomeRows
            items={[
              {
                full: true,
                caption: 'Intercode score of the video',
                alt: "Intercode score: a timeline from 0:00 to 3:00 with the video's scenes in columns (opening titles, the Studio di Fonologia, the three instruments, the Studio's anniversary, closing credits) above the waveforms of the voice and of the sounds.",
                src: '/projects/oltre/intercode-score.svg',
              },
            ]}
          />
        </section>
        </div>

        <section id="outcome" className="section shell outcome">
          <div className="outcome-gallery outcome-gallery--oltre-lascolto reveal">
            <span className="outcome-gallery__number">03</span>
            <h2><Lines text="Designing with, not only for, the senses." /></h2>
            <OutcomeRows
              items={[
                {
                  caption: "Oltre l'ascolto, the video",
                  src: `${CURRENT_SITE}/_videos/v1/e3a098ddfc758683570663837c6b6866fe367e72`,
                  poster: '/projects/oltre-video-poster.svg',
                },
                ...[
                  ['abcbde4a04da3d0a883fd34057859888cf28a9d8.png?w=1856', 'White 3D models and black information cards with Braille text: the models recreate the forms of the post-war sound instruments, with tactile patterns that picture sound waves.'],
                  ['bbf10eb90d1050a64d40fdf081e3f2009b6a418d.png?w=1400', 'A hand exploring a raised tactile surface that turns sound frequencies into physical patterns for people with visual impairments.'],
                  ['95cbff86f40b1d8561570829aa040e732fa7de85.png?w=1400', 'Two hands exploring the raised tactile surface.'],
                  ['49535040979dbc77bca4c8fa489f5480c70725c7.png?w=1400', 'Close-up of the raised artefacts and their textures, wavy lines, steps and overlapping squares, that stand for sound transformations.'],
                  ['5237067cdf6730e1966641a547a72380feaaefcb.png?w=1000', 'The Tempophon artefact seen from above: a historic sound technology reinterpreted as a tactile object.', 'tall'],
                  ['02424f99ca12d8d0378e9df1b0575b98f1b9ef15.png?w=1000', 'The Speed Variator artefact seen from above.', 'tall'],
                  ['b7a5b08984d94b8175c039fc1d0de8b70a0f7a1a.png?w=1000', 'The Amplitude Modulator artefact seen from above.', 'tall'],
                ].map(([file, alt, tall]) => ({ src: `${CURRENT_SITE}/_assets/v11/${file}`, alt, caption: alt, tall: Boolean(tall) })),
              ]}
            />
          </div>
        </section>

        <a id="next-project" href="/sovrapposizioni" className="next-project reveal">
          <span className="next-project__label">Next project</span>
          <strong lang="it"><Lines text="Sovrapposizioni" /></strong>
          <i aria-hidden="true">
            <svg viewBox="0 0 180 120">
              <path d="M0 51h151v18H0z" />
              <path d="M82 0h19c14 27 38 45 79 51v18c-41 6-65 24-79 51H82c13-29 34-49 65-60C116 49 95 29 82 0Z" />
            </svg>
          </i>
        </a>
      </article>

      <footer className="footer shell">
        <span>© {new Date().getFullYear()} Rossella Magnani</span>
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
  // Every page opens at the top, also when arriving from "Next project" at the bottom of another one
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [path])
  return (
    <>
      <CustomCursor />
      {path === 'about' ? <About /> : path === 'oltre-lascolto' ? <CaseStudy /> : project ? <ProjectCase project={project} /> : <Home />}
    </>
  )
}

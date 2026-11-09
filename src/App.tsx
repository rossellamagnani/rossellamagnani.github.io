import { Fragment, useEffect, useRef, useState } from 'react'
import { TECA_PLAN } from './tecaPlan'

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
// `whole` shows the entire image, uncropped, on a plain background (for cut-out shapes such as a sticker).
// Every picture and video is a file in public/ (public/media/ for those that came from the old Figma site).
// The site can live in a sub-folder (GitHub Pages serves it at /<repository>/): every internal link
// and every file in /public goes through these two helpers
const BASE = import.meta.env.BASE_URL
const link = (path: string) => BASE + path.replace(/^\//, '')
const asset = <T extends string | undefined>(src: T): T =>
  (src && src.startsWith('/') && !src.startsWith('//') && !src.startsWith(BASE) ? BASE + src.slice(1) : src) as T

// One arrow for the whole site, drawn with straight lines so it looks the same on every system
// (the → character takes the shape of each font, with curved strokes in Helvetica Neue)
function Arrow({ direction = 'right', className = '' }: { direction?: 'right' | 'down' | 'up-right'; className?: string }) {
  const rotate = direction === 'down' ? 90 : direction === 'up-right' ? -45 : 0
  return (
    <svg className={`arrow ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}>
      <path d="M2 12H21M14 5L21 12L14 19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  )
}

const projects: { title: string; type: string; slug: string; lang?: 'it'; image: string; video?: string; focus?: string; whole?: boolean; crop?: { x: number; y: number; zoom: number } }[] = [
  { title: 'Oltre la teca di vetro', type: 'EXHIBITION DESIGN · ACCESSIBILITY', slug: 'oltre-la-teca', lang: 'it', image: '/projects/oltre-la-teca/librarian.svg', focus: '62% 50%' },
  { title: "Oltre l'ascolto", type: 'MULTISENSORY DESIGN · ACCESSIBILITY', slug: 'oltre-lascolto', lang: 'it', image: '/media/176474d496.gif' },
  { title: 'Sovrapposizioni', type: 'EXHIBITION DESIGN · AI', slug: 'sovrapposizioni', lang: 'it', image: '/media/141ddc64b5.jpg' },
  { title: 'Marco Magnani Art', type: 'BRAND IDENTITY · ART DIRECTION', slug: 'marco-magnani-art', image: '/media/6eb7ffe7a5.jpg' },
  { title: 'Crossing Kyiv', type: 'EDITORIAL DESIGN · CULTURAL PROJECT', slug: 'crossing-kyiv', image: '/media/80b5605660.jpg', crop: { x: 30.2, y: 47.8, zoom: 1.65 } },
  { title: 'a drop of corruption', type: 'AI VIDEO · ART DIRECTION', slug: 'a-drop-of-corruption', image: '', video: '/media/4d1d4bed17.mp4' },
  { title: 'PRO Brera', type: 'SPECULATIVE DESIGN · SPATIAL', slug: 'brera-district', image: '/projects/pro-brera.svg', focus: '50% 0%' },
]


const caseStudies = [
  {
    slug: 'oltre-la-teca',
    title: 'Oltre la teca di vetro',
    lead: 'Synaesthetic accessibility for the book heritage of the University Library of Pavia.',
    type: 'Exhibition design, accessibility, visual identity',
    year: '2026',
    context: "MSc thesis · Politecnico di Milano · with Spazio Geco and Pavia's University Library · Design concept",
    team: 'Individual',
    role: 'Audit, research, exhibition and visual design',
    tools: 'Rhino, Blender, Illustrator, InDesign, Photoshop',
    shortTitle: 'Ancient books, open to every sense.',
    shortCopy: 'A design concept for the exhibition of Pavia\'s University Library, built on accessibility guidelines, research and an audit of the existing exhibition, and presented through 3D renders. Visitors who cannot see, who see little or who see well follow the same route and use the same stations.',
    summary:
      'An exhibition redesigned so that every visitor, sighted, partially sighted or blind, has the same experience of ancient books.',
    quickSteps: [
      ['01 / Audit', "A design audit of «Librària», the library's existing exhibition, across content, senses, interaction and space."],
      ['02 / Strategy', 'Accessibility as the starting point rather than an added layer: one experience for everyone, through more senses.'],
      ['03 / Project', 'Thirteen principles, a visual identity, a new plan and seven stations of vertical and tactile panels, rendered in 3D.'],
    ],
    challenge:
      'In a museum the ancient book becomes an object to look at: closed in a glass case, open on a single page, out of reach. Latin, old scripts and botanical codes add a cognitive barrier to the physical one, and for most visitors, especially those with sensory or cognitive disabilities, the book stays silent.',
    research: [
      { title: 'The existing exhibition', copy: "«Librària» brings the library's manuscripts, incunabula and herbarium to the public with touch screens, videos and tactile panels. The audit read it through four filters, information, senses and cognition, user experience and space, and found five main issues: too much text on the panels, no wayfinding in the circular room, overlapping audio from every video, a tactile version of the games poorer than the digital one, and a central module usable only through smooth glass." },
      { title: 'Two ways to approach accessibility', copy: 'Every exhibition answers, openly or not, the question of who its reference visitor is, and the order of the questions decides the whole project. The integrative approach designs for sighted visitors and adds dedicated tools afterwards: it is the approach of «Librària», the existing exhibition. The structural approach starts from the visitors who meet the greatest barriers and builds one experience for all: it is the approach of the ideal project.' },
      { title: 'Thirteen principles', copy: 'The strategy becomes thirteen rules, each born from an issue found in the existing exhibition.' },
      { title: 'A visual identity for reading', copy: 'One typeface, Atkinson Hyperlegible, in its weights, with sizes set by reading distance following the Smithsonian guidelines. Two colours only, a deep red #61242D and white, with a contrast of about 95% on every support. Vertical and tactile panels share one bilingual grid built on a single module, with Braille embossed in the colour of the panel.' },
      { title: 'Space, materials and light', copy: 'A new route with an entrance room for orientation, a tactile plan and a LOGES floor guide. Modules at 105 cm with a 20° reading plane and free space below for wheelchairs. White 3D-printed resin for every reproduction, authentic materials where the material is the content, warm light focused on the stations.' },
    ],
    insight: 'What is designed for the visitors who meet the greatest barriers ends up improving the experience of everyone.',
    processTitle: 'The existing exhibition',
    processDescription: 'Scroll sideways',
    cover: { src: '/projects/oltre-la-teca/librarian.svg', alt: "Render: a visitor exploring the relief plates of the Librarian station, under the panels 'La classificazione della natura' and 'Micologia e regno dei funghi'." },
    outcome: [
      ['entrance', "Render: the entrance room, with the Librària logo in relief and the reception counter holding the tactile plan of the exhibition."],
      ['tactile-map', 'A hand exploring the tactile plan: red relief modules on a white base, with legends in Italian, English and Braille.', 'tall'],
      ['timeline-library', 'Render: the Timeline Library, three vertical panels on the history of the library with the resin cornice of the Salone Teresiano and three metal weights for the growth of the collections.'],
      ['scroll', 'Render: the scroll to unroll on the tactile plane of the first Timeline Book station.', 'tall'],
      ['illuminator', 'Render: the Illuminator module, with a video of the masters, a relief drôlerie and the tools of the craft in their real materials.'],
      ['tools', 'The tools of the illuminator on the reading plane: shell, pumice, scraper, quill and lead point.'],
      ['herbarium', 'Render: the Herbarium module, with visitors smelling the ampoules of the four plants.'],
      ['ampoules', 'The four tilted ampoules with the essences of the plants of the Aldini herbarium.'],
      ['timeline-book', "Render: the Timeline Book station, a long red module with the panel 'Quando il libro era un rotolo', a scroll to unroll on the tactile plane and a visitor in a wheelchair."],
      ['movable-type', 'Metal movable type to explore with the hands at the station on Gutenberg.', 'tall'],
      ['worn-page', 'A hand on a thermochromic page that keeps the imprint of the fingers, like the worn margins of books of hours.', 'tall'],
      ['memory-print', 'Render: the memory station, where each visitor prints their own souvenir on a small press.'],
    ].map(([name, alt, tall]) => ({ src: `/projects/oltre-la-teca/${name}.svg`, alt, tall: Boolean(tall) })),
    teca: {
      existing: Array.from({ length: 20 }, (_, n) => ({
        src: `/projects/oltre-la-teca/existing/${String(n).padStart(2, '0')}.svg`,
        alt: 'The existing exhibition «Librària»: visitors at the touch screens and tactile panels.',
      })),
      identity: [
        { src: '/projects/oltre-la-teca/grid.svg', alt: 'The bilingual grids of the vertical and the tactile panel, built on one module, with the Braille block below the text.' },
      ],
      space: [
        { src: '/projects/oltre-la-teca/section.svg', alt: 'Elevation and section of a station: vertical panel 130 cm, reading plane tilted 20° at 105 cm, free space for a wheelchair below.' },
        { src: '/projects/oltre-la-teca/floor-light.svg', alt: 'The floor guide codes, straight line and stop, and the spotlights aimed at the reading planes.', tall: true },
      ],
    },
  },
  {
    slug: 'sovrapposizioni',
    title: 'Sovrapposizioni',
    lead: 'What makes a work of art authentic?',
    type: 'Exhibition design, editorial design, AI',
    year: '2024',
    context: 'Academic project · Politecnico di Milano · Concept for MEET Digital Culture Center',
    team: 'Group project',
    role: 'AI image generation, editorial design and layout',
    tools: 'Midjourney, Illustrator, InDesign, Photoshop',
    shortTitle: 'Eight masters, one algorithm, twenty new images.',
    shortCopy: 'An exhibition concept for MEET Digital Culture Center in Milan, where twenty AI-generated works reinterpret the visual languages of Kusama, Hockney, Warhol, Monet, Modigliani, Canaletto, Murakami and Degas. A smartphone layer reveals the original behind each work, and a book, a brochure and postcards carry the project beyond the gallery. In our group I generated the images and designed and laid out the editorial system.',
    summary:
      'A generative exhibition and editorial system that questions where authorship ends and artificial intelligence begins.',
    quickSteps: [
      ['01 / Question', 'If an image is born from an algorithm but conceived by a human mind, where does authorship lie?'],
      ['02 / Method', 'Train an AI on the visual codes of eight masters and let it reinterpret their languages rather than replicate them.'],
      ['03 / Outcome', 'Twenty works, a smartphone layer that reveals the original artworks, and a book, brochure and postcard set.'],
    ],
    challenge:
      'Sovrapposizioni turns the question of authorship into an exhibition: works that look familiar at first glance and, on a closer look, speak a language that belongs neither to the master nor entirely to the machine.',
    research: [
      {
        title: 'Authorship and artistic intent',
        copy: 'The debate on AI and creativity often stops at copying. The project gives the AI an active role in the process instead, and uses the exhibition to ask where the hierarchy between artist and tool breaks down.',
      },
      {
        title: 'Reinterpreting the masters',
        copy: 'Generating the images, I worked on the visual codes of Kusama, Hockney, Warhol, Monet, Modigliani, Canaletto, Murakami and Degas to reach reinterpretations rather than copies. The twenty works are images that feel familiar at first and reveal a new visual identity on closer observation.',
      },
      {
        title: 'An interactive dialogue',
        copy: 'Scanning a work with a smartphone would reveal the original artwork behind it. The gesture stages a dialogue between classical art and AI-assisted creation, and makes visible the passage from human memory to computational invention.',
      },
      {
        title: 'Beyond the gallery',
        copy: 'I designed and laid out the editorial object that extends the exhibition, in three parts: a book on the theory behind the project, an introductory brochure and a set of postcards of the works.',
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
      src: `/media/141ddc64b5.jpg`,
      alt: 'Visualisation of the Sovrapposizioni exhibition at MEET Digital Culture Center, Milan: a visitor looks at AI-generated works inspired by great masters.',
    },
    // outcome: the book GIF, then the exhibition (pictures from the current site and from the presentation)
    outcome: [
      {
        src: `/media/1ce14e6bd4.gif`,
        alt: 'Animated spreads of the Sovrapposizioni book: inside pages on a clean grid with modern typography.',
        // the GIF's frames sit on a wide empty border: show only the book (x, y, width, height of 2048 × 2560)
        crop: [211, 466, 1631, 1626, 2048, 2560] as const,
      },
      { src: `/media/c363270d72.jpg`, alt: 'Visualisation of the exhibition at MEET Digital Culture Center: a visitor walks past the AI-generated works.' },
      { src: '/projects/sovrapposizioni/posters-street.svg', alt: 'A row of exhibition posters along a street wall.' },
      { src: `/media/be04d60125.jpg`, alt: "Exhibition poster on a street stand: an AI reinterpretation of a classical painting and the question 'If art speaks to you, does it matter who made it?'", tall: true },
      { src: '/projects/sovrapposizioni/poster-tree.svg', alt: 'Exhibition poster under a tree.', tall: true },
      { src: '/projects/sovrapposizioni/poster-backlit.svg', alt: 'Backlit exhibition poster at night.', tall: true },
      { src: '/projects/sovrapposizioni/banners.svg', alt: 'Exhibition banners hanging between the columns of a building.' },
      { src: '/projects/sovrapposizioni/tickets-2.svg', alt: 'Two entrance tickets with works from the exhibition.', tall: true },
      { src: `/media/41c75cf2b7.jpg`, alt: 'Entrance tickets for the exhibition, with vertical barcodes, the title in an elegant serif and details of the AI-generated works.' },
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
        { src: `/media/297d2bf3f7.jpg`, alt: 'Inside pages of the book showing the training dataset: a grid of photographs of flowers and shells used to teach the generative algorithm.' },
        { src: `/media/7fc8b68603.jpg`, alt: 'The cover of the Sovrapposizioni book: a natural image reworked through digital pixelation.' },
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
    context: 'Independent project for the painter Marco Magnani · Applications shown in mockups',
    team: 'Individual',
    role: 'Positioning, brand identity, art direction',
    tools: 'Illustrator, Photoshop, Figma, Framer, InDesign',
    shortTitle: 'Paintings that hold a room like sculpture.',
    shortCopy: 'A brand identity for a hyperrealist painter who wants his work to speak to architects, interior designers and collectors. I drew the logotype from his signature and designed a type system, a framing system for the paintings and a brand manual, shown here in mockups.',
    summary:
      'A brand identity that brings hyperrealist painting into contemporary interiors.',
    quickSteps: [
      ['01 / Challenge', 'Bring figurative painting into dialogue with high-end interiors, where every object is chosen with restraint.'],
      ['02 / Method', "Build a minimal system around the artist's signature, a grid scaled in multiples of three and irregular framing windows."],
      ['03 / Outcome', 'A logotype, a type system, a framing system, a palette sampled from the paintings and a brand manual.'],
    ],
    challenge:
      'Figurative painting is often hung as a picture on a wall. In the high-end interiors where art is collected today it can do more: hold a room the way a sculpture or a design piece does.',
    research: [
      {
        title: 'From picture to presence',
        copy: 'The identity speaks to architects and interior designers as much as to collectors, presenting each painting as a piece chosen for a specific room rather than an image to look at.',
      },
      {
        title: 'Starting from the artist',
        copy: 'The artist combines hyperrealist painting with the logic of design collecting. The identity turns this ambition into a visual system people can recognise.',
      },
      {
        title: 'A precise visual language',
        copy: "The language stays minimal so that it never competes with the depth and contrast of the paintings. I redrew the logotype from the artist's handwritten signature on a grid, and built a type system that scales in multiples of three.",
      },
      {
        title: 'The unveiling system',
        copy: 'In many of the paintings a woven textile partly covers the subject. This became a system of irregular frames that show only close-up details of a canvas, while the palette of each application is sampled from the painting on display.',
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
      src: `/media/6eb7ffe7a5.jpg`,
      alt: 'Marco Magnani Art on the facade of a modern art gallery: large red posters with the artist’s portraits, the signature logo and the dates.',
    },
    outcome: [
      { src: `/media/bb40d17840.jpg`, alt: "Poster for the exhibition 'Trame' in an underground passage, with people walking past." },
      { src: `/media/4ac58ee616.jpg`, alt: "Backlit billboard 'La trama come confine' with a detail of a portrait framed by an irregular window." },
      { src: `/media/5d9b11bc03.jpg`, alt: 'Brochures laid out in rows: deep red covers and inside pages with the portraits.' },
      { src: `/media/4ca5cedeb3.jpg`, alt: 'Business cards floating: a detail of a portrait on the front, the signature logo on the dark back.' },
      { src: `/media/3c30026e91.jpg`, alt: "The book 'Anatomia della trama', with a blue cover torn open on a portrait, on a table by a window." },
    ],
    website: 'https://www.marcomagnani.art',
  },
  {
    slug: 'crossing-kyiv',
    title: 'Crossing Kyiv',
    lead: 'A publication celebrating contemporary Ukrainian creativity beyond the narratives of war.',
    type: 'Editorial design',
    year: '2025',
    context: 'Internship at T12 Lab · for NO MAD · with Design4Ukraine',
    team: 'Individual, supervised by my internship tutor',
    role: 'Layout design and typesetting of the whole publication',
    tools: 'InDesign, Illustrator, Photoshop',
    shortTitle: 'A country told through the people who make its culture.',
    shortCopy: 'A publication by NO MAD on contemporary Ukrainian creativity, made with T12 Lab and Design4Ukraine. During my internship at T12 Lab, under the supervision of my tutor, I designed the layout and set the whole book: a text-driven grid that gives essays, interviews and visual stories room to breathe.',
    summary:
      'Handwritten texts over reportage photographs: the layout lets every voice keep its own tone.',
    quickSteps: [
      ['01 / Purpose', 'Reposition Ukraine within the international cultural conversation, beyond the images of war.'],
      ['02 / Method', 'A clear grid and a restrained type system, so that long texts read easily and the images keep their weight.'],
      ['03 / Outcome', 'The layout of the whole publication, from the essays to the interviews and visual narratives.'],
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
    // beside the title: the home picture, zoomed onto the left page so no border shows; the GIF goes below
    cover: {
      src: `/media/80b5605660.jpg`,
      alt: "The left page of the spread 'She Has a Dream': handwritten lines over a photograph of branches.",
      // the left page (x, y, width, height of 1932 × 1333)
      crop: [280, 175, 680, 925, 1932, 1333] as const,
    },
    outcome: [
      {
        src: `/media/6443891fe0.gif`,
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
    context: 'One-week academic project · Politecnico di Milano',
    team: 'Group project',
    role: 'Project concept and part of the outputs',
    tools: 'Illustrator, Photoshop, InDesign',
    shortTitle: 'What if Brera\'s students reclaimed the district from below?',
    shortCopy: 'A speculative project that gives Brera\'s overlooked student community a fictional underground collective, with its own identity, artefacts and map. The research combined online sources with interviews in the district. In our group I developed the concept of the project and designed part of its outputs.',
    summary:
      'The collective as it would appear in the district: on doors, on street signs and in the hands of students.',
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
        copy: 'Brera is one of Milan’s most historic districts, known for its artistic and creative identity. Online research and interviews in the district give the picture: 2,074 residents, 4,323 students enrolled in 2023/24 and over 1.1 million visitors in 2024. Behind this vibrant façade lies a tension between its cultural prestige and its growing transformation into a tourist showcase.',
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
    ],
    insight: 'To make a community visible again, the project asks it to hide.',
    processTitle: 'Reclaiming Brera from below',
    processDescription: 'Scroll sideways',
    // beside the title: the home poster, anchored on its headline; then the pictures from the current site
    cover: {
      src: '/projects/pro-brera.svg',
      alt: 'P.R.O. Brera poster with its headline in red and black.',
      whole: true, // shown in its own proportions, not cropped to the opening
    },
    outcome: [
      { src: `/media/58c8100e22.gif`, alt: 'Animated set of P.R.O. Brera posters: brutalist typography, symbolic icons and a raw graphic style.' },
      { src: `/media/a75a152e3b.png`, alt: 'P.R.O. Brera sticker: a graphic reinterpretation of the Virgin Mary with a finger on her lips, asking for silence.', tall: true },
      { src: `/media/f78bdcfdf1.png`, alt: 'P.R.O. Brera sticker: a pointing finger inside a circle, a cryptic wayfinding sign.', tall: true },
      { src: `/media/db9e367a9e.jpg`, alt: "The collective's manifesto posted on a wooden door: red and black text listing the students' five demands." },
      { src: `/media/63e7e07593.jpg`, alt: 'Hands leafing through the P.R.O. Brera fanzine: an engraving-style illustration on one side, a graphic page on the other.' },
      { src: `/media/01a3bfaf62.jpg`, alt: 'Folding map of the secret underground route, with its points of interest.' },
      { src: `/media/3a3c3f7408.jpg`, alt: 'A blue street sign in Milan covered in stickers, with the round P.R.O. Brera sticker at its centre.', tall: true },
    ],
  },
  {
    slug: 'a-drop-of-corruption',
    title: 'a drop of corruption',
    lead: 'How can the aesthetics of error illuminate the hidden cost of human greed?',
    type: 'AI video, art direction',
    year: '2024',
    context: 'Glitches & Glory workshop · David Szauder',
    team: 'Group workshop project',
    role: 'Image generation and animation, shared by the whole group',
    tools: 'Midjourney, Premiere',
    shortTitle: 'Error as a way of telling a story.',
    shortCopy: 'An experimental short video made in one week at the Glitches & Glory workshop led by David Szauder. All of us generated images and animated, using AI, collage and glitches to tell the hidden cost of corporate greed: from monochrome landscapes to yellow fuel and red contamination.',
    summary:
      'The full video, best watched with sound.',
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
        title: 'One week, one group',
        copy: 'The video was made in one week, which turned AI into a way to test styles and transitions quickly rather than a shortcut to polished realism.',
      },
    ],
    insight: 'Turn the aesthetics of error into a language for exposing the hidden cost of human greed.',
    processTitle: 'From raw resource to irreversible contamination',
    processDescription: 'Scroll sideways through the generative frames, color transitions and glitch language.',
    // beside the title the short title animation, playing silently; below, the whole video with its controls
    cover: {
      src: `/media/4d1d4bed17.mp4`,
      alt: "Title animation of 'a drop of corruption': black lettering appearing and breaking apart on a red ground.",
      poster: '/projects/a-drop-of-corruption/video-poster.svg',
      loopSilently: true,
    },
    outcome: [
      {
        src: '/media/64b7ce092d.mp4',
        alt: "The full video 'a drop of corruption' (52 seconds): from monochrome landscapes to bursts of yellow fuel and red contamination, through glitches and collage shifts.",
        poster: '/projects/a-drop-of-corruption/video-poster.svg',
      },
    ],
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
  controls = true,
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
  controls?: boolean // a silent looping video beside a title needs none
}) {
  // files ending in .mp4/.webm/.mov, or videos served by the current site (/_videos/...)
  const isVideo = Boolean(src && /\.(mp4|webm|mov)$|\/_videos\//i.test(src))
  return (
    <figure className={`placeholder ${className}`} style={style}>
      <div className="placeholder__surface">
        {src ? (
          isVideo ? (
            <video
              src={asset(src)}
              poster={asset(poster)}
              controls={controls}
              playsInline
              preload="metadata"
              aria-label={alt || caption}
              // a silent video can start on its own: muted and looping, only while it is on screen,
              // never with reduced motion; the controls stay to pause it
              {...(autoPlay && { muted: true, loop: true, ref: playWhileVisible })}
            />
          ) : (
            <img
              src={asset(src)}
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
  slow = false,
}: {
  pictures: { src: string; alt: string }[]
  label: string
  rows?: number
  pauseOnHover?: boolean
  slow?: boolean // drifts more slowly on phones
}) {
  const size = Math.ceil(pictures.length / rowCount)
  const rows = Array.from({ length: rowCount }, (_, r) => pictures.slice(r * size, (r + 1) * size))
  return (
    <div
      className={`image-wall ${pauseOnHover ? 'pause-on-hover' : ''} ${slow ? 'is-slow' : ''}`}
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
                src={asset(pic.src)}
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
      <a href={link('/')} className="brand">
        Rossella Magnani
      </a>
      <nav aria-label="Primary navigation">
        {children}
        <a href={link('/about')}>About</a>
        <ContactMenu />
      </nav>
      <PhoneMenu />
    </header>
  )
}

const introduction =
  'Visual designer working on exhibitions, visual identities and multisensory experiences designed for the widest possible audience.'

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
        <a href={link('/about')} onClick={() => setOpen(false)}>
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

// The closing row of a project page: the next project's name with a small picture of it, as on the
// reference site (an arrow instead on phones); the last project leads back to the first
function NextProject({ project }: { project: (typeof projects)[number] }) {
  return (
    <a id="next-project" className="next-project reveal" href={link(`/${project.slug}`)}>
      <span className="next-project__label">Next project</span>
      <strong lang={project.lang}>
        <span className="next-project__title">{project.title}</span>
        <i className="next-project__arrow" aria-hidden="true"><Arrow /></i>
      </strong>
    </a>
  )
}

function ProjectCase({ project }: { project: (typeof caseStudies)[number] }) {
  // pictures are optional per project; until a project has them its frames stay grey
  type Pic = { src: string; alt: string }
  const media = project as {
    cover?: Pic & { focus?: string; crop?: readonly number[]; poster?: string; loopSilently?: boolean; whole?: boolean }
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
    teca?: { existing: Pic[]; identity: Pic[]; space: (Pic & { tall?: boolean })[] }
  }
  const deep = media.deep
  // projects without the optional deep dive (no research material shown)
  const noDeepDive = ['crossing-kyiv', 'a-drop-of-corruption', 'brera-district'].includes(project.slug)
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
    <main className={`case ${deepView || noDeepDive ? 'is-deep' : ''}`}>
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
                ['Team', project.team],
                ['Role', project.role],
                ['Tools', project.tools],
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
            poster={media.cover?.poster}
            autoPlay={media.cover?.loopSilently}
            controls={!media.cover?.loopSilently}
            className={`hero__media ${media.cover?.crop ? 'is-cropped' : ''} ${media.cover?.whole ? 'is-whole' : ''}`}
            style={
              media.cover?.crop &&
              ({
                '--crop-h': media.cover.crop[5] / media.cover.crop[3],
                '--crop-w': media.cover.crop[5] / media.cover.crop[2],
                '--crop-cx': (media.cover.crop[0] + media.cover.crop[2] / 2) / media.cover.crop[4],
                '--crop-cy': (media.cover.crop[1] + media.cover.crop[3] / 2) / media.cover.crop[5],
              } as React.CSSProperties)
            }
          />
        </section>

        <section className="quick-read shell reveal">
          <div className="section-label">In short</div>
          <div className="quick-read__title">
            <h2>
              <Lines text={project.shortTitle} />
            </h2>
            <p>
              {project.shortCopy}
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

        {!noDeepDive && (
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

        {!noDeepDive && (
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
          ) : media.teca ? (
            <TecaDeep project={project} teca={media.teca} />
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
                <p>{project.processDescription} <Arrow /></p>
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
            {'website' in project && project.website && (
              <a className="reading-action site-link" href={project.website} target="_blank" rel="noopener noreferrer">
                <span>
                  <strong>Visit the website<span className="sr-only"> (opens in a new tab)</span></strong>
                  <small>{project.website.replace(/^https?:\/\//, '')}</small>
                </span>
                <i aria-hidden="true"><Arrow direction="up-right" /></i>
              </a>
            )}
          </div>
        </section>

        <NextProject project={nextProject} />
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
            <p className="process__hint">Scroll sideways <Arrow /></p>
          </div>
          <div className="process-strip" tabIndex={0} role="region" aria-label="The editorial object, scroll sideways">
            {deep.editorial?.map(({ src, alt }) => <Placeholder key={src} caption={alt} alt={alt} src={src} />)}
          </div>
        </div>
      </section>
    </>
  )
}

const TECA_PRINCIPLES = [
  ['Video only where it cannot be replaced', 'Video is kept for what no other channel can give, such as interviews, gestures and craft seen in motion.'],
  ['Text lives on the wall', 'The vertical panel holds the texts in Italian and English, always in a predictable place.'],
  ['The panel speaks to the hands', 'The tactile panel keeps only a few lines with their Braille, leaving room for the tactile reproductions.'],
  ['One voice for the whole route', 'An audio guide replaces sound in the room: each visitor hears only what they chose to hear.'],
  ['Screens are read seated', 'Where a screen is needed it lies flat, readable from any height, standing or in a wheelchair.'],
  ['Fewer steps, more immediacy', 'Interactive stations start their content with one direct gesture instead of a sequence of choices.'],
  ['We play with our hands, not with a screen', 'The games become physical activities, the same for every visitor.'],
  ['The central module excludes no one', 'Consulting the books no longer depends on touch screens that blind visitors cannot use.'],
  ['The route can be read with closed eyes', 'A tactile plan at the entrance and a tactile floor guide lead from one station to the next.'],
  ['Video is silent by definition', 'Every video is subtitled; its sound reaches the visitor only through the audio guide.'],
  ['One register tells the whole exhibition', 'One tone of voice on every support, authoritative but accessible.'],
  ['One typeface, read through its weights', 'Atkinson Hyperlegible on every support, with hierarchy built from its weights.'],
  ['Contrast is never optional', 'A constant, verified contrast in every reading context, whatever the palette.'],
] as const

const TECA_STATIONS = [
  { name: 'The entrance station', x: 18.3, y: 17.5, copy: 'On the reception counter of the first room, the tactile plan of the exhibition, next to the cloakroom and the audio guides.' },
  { name: 'The library timeline', x: 28, y: 26.3, copy: 'Three vertical panels on the history of the library, the resin reproduction of the cornice of the Salone Teresiano and three weights that turn the growth of the collections into something to lift.' },
  { name: 'The book timeline', x: 62.7, y: 45.1, copy: 'On one side of the central module, five narrative stations that retrace the history of the book through forms and materials.' },
  { name: 'The illuminator', x: 71.5, y: 76.8, copy: 'The documentary station on the short side and three narrative stations on the long side, between images in relief and the tools of the craft in their real materials.' },
  { name: 'The herbarium', x: 82.5, y: 34, copy: 'Four plants of the Aldini herbarium, offered as form on the long side and as smell, with the ampoules, on the short side.' },
  { name: 'The librarian', x: 64.4, y: 38.4, copy: 'On the other side of the central module, four scientific plates in relief and the hands-on station with the catalogue cards.' },
  { name: 'The interactive module', x: 51.4, y: 16.2, copy: 'Three play stations without digital interfaces: the question and answer game, the incunabulum station and the printing of the souvenir.' },
]

// The plan of the redesigned route as a drawing in code: numbered points mark the stations, and
// choosing one, on the plan or in the list, shows its description
function TecaPlan() {
  const [current, setCurrent] = useState(0)
  const station = TECA_STATIONS[current]
  return (
    <div className="teca-plan reveal">
      <div className="teca-plan__map">
        <svg viewBox={`0 0 ${TECA_PLAN.width} ${TECA_PLAN.height}`} role="img" aria-label="Plan of the redesigned route, from the entrance through seven stations">
          <path d={TECA_PLAN.d} fillRule="evenodd" />
        </svg>
        <span className="teca-plan__entrance" style={{ left: '8.5%', top: '50%' }} aria-hidden="true">Entrance / Exit</span>
        {TECA_STATIONS.map((item, index) => (
          <button
            type="button"
            key={item.name}
            className={`teca-plan__dot ${index === current ? 'is-current' : ''}`}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            aria-label={`${index + 1}. ${item.name}`}
            aria-pressed={index === current}
            aria-controls="teca-station"
            onClick={() => setCurrent(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="teca-plan__side">
      <ol className="teca-plan__legend">
        {TECA_STATIONS.map((item, index) => (
          <li key={item.name}>
            <button type="button" aria-pressed={index === current} aria-controls="teca-station" onClick={() => setCurrent(index)}>
              <span>{String(index + 1).padStart(2, '0')}</span> {item.name}
            </button>
          </li>
        ))}
      </ol>
      <div id="teca-station" className="teca-plan__station" aria-live="polite">
        <span>{String(current + 1).padStart(2, '0')}</span>
        <strong>{station.name}</strong>
        <p>{station.copy}</p>
      </div>
      </div>
    </div>
  )
}

// A type specimen set in the typeface itself
function TypeSpecimen() {
  return (
    <figure className="type-specimen reveal" aria-label="Atkinson Hyperlegible, the typeface of the project">
      <p aria-hidden="true">
        AaBbCcDdEeFfGgHhIiJj
        <br />
        KkLlMmNnOoPpQqRrSsTt
        <br />
        UuVvWwXxYyZz0123456
        <br />
        789#!?%&amp;@€()*+=/«»
        <br />
        Il1 O0 B8 S5 6b bdpq
      </p>
      <figcaption>
        <span>Atkinson Hyperlegible</span>
        <span>Braille Institute</span>
      </figcaption>
      <strong aria-hidden="true">Atkinson</strong>
    </figure>
  )
}

// Oltre la teca di vetro's deep dive: the audit of the existing exhibition (its photographs drifting in a
// wall), the strategic choice, the principles, the visual identity and the space, texts with their
// pictures below
function TecaDeep({
  project,
  teca,
}: {
  project: (typeof caseStudies)[number]
  teca: { existing: ManualPic[]; identity: ManualPic[]; space: (ManualPic & { tall?: boolean })[] }
}) {
  const [existing, approach, principles, identity, space] = project.research
  const pictures = (list: (ManualPic & { tall?: boolean })[], turn = 0) => (
    <OutcomeRows turn={turn} items={list.map(pic => ({ ...pic, caption: pic.alt }))} />
  )
  const text = (number: string, item: { title: string; copy: string }) => (
    <div className="sv-text reveal">
      <SectionHeading number={number}>{item.title}</SectionHeading>
      <p>{item.copy}</p>
    </div>
  )
  return (
    <>
      <section id="research" className="section shell research sv-deep">
        <div className="section-label reveal">Research</div>
        {text('01', existing)}
        <ImageWall pictures={teca.existing} label="Photographs of the existing exhibition" rows={2} pauseOnHover={false} slow />
        {text('02', approach)}
        <div className="approaches reveal">
          {[
            ['Integrative approach', '«Librària», the existing exhibition', 'What should the visitor see?', 'How do I make this content usable by those who cannot see it?'],
            ['Structural approach', 'The ideal project', 'Through which senses can this content be perceived?', 'How do I make it engaging for every visitor?'],
          ].map(([name, who, first, second]) => (
            <div className="approach" key={name}>
              <h3>{name}</h3>
              <p className="approach__who">{who}</p>
              <p className="approach__step"><span>First question</span>{first}</p>
              <span className="approach__arrow" aria-hidden="true"><Arrow direction="down" /></span>
              <p className="approach__step"><span>Second question</span>{second}</p>
            </div>
          ))}
        </div>
        {text('03', principles)}
        <p className="principles__hint" aria-hidden="true">Scroll sideways <Arrow /></p>
        <ol className="principles reveal" tabIndex={0} aria-label="The thirteen principles, scroll sideways">
          {TECA_PRINCIPLES.map(([title, copy]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="insight" className="insight reveal">
        <div className="shell insight__inner">
          <div className="section-label">Key insight</div>
          <p><Lines text={project.insight} /></p>
        </div>
      </section>

      <section className="section shell research sv-deep">
        {text('04', identity)}
        <TypeSpecimen />
        <div className="only-wide">{pictures(teca.identity)}</div>
        <div className="only-narrow">
          {pictures([
            { src: '/projects/oltre-la-teca/grid-vertical.svg', alt: 'The grid of the vertical panel: audio guide number, Italian and English titles and texts, all set on the module x.' },
            { src: '/projects/oltre-la-teca/grid-tactile.svg', alt: 'The grid of the tactile panel: audio guide icon and number, Italian and English text, Braille and the tactile reproduction.' },
            { src: '/projects/oltre-la-teca/grid-text.svg', alt: 'The text block of the tactile panel: at most 55 characters per line, x-height 5 mm, line spacing 12.7 mm.' },
          ])}
        </div>
        {text('05', space)}
        <TecaPlan />
        {pictures(teca.space, 2)}
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
  // each row: role or context, company or project, year, and the lines shown when it is opened
  rows: Array<[string, string, string, string[]?]>
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
        {rows.map(([first, second, year, details = []], index) =>
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
                <ul>
                  {details.map(line => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
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
              I&apos;m Rossella, a visual designer based in Milan. I work on exhibitions, visual
              identities and multisensory experiences, translating cultural and brand content into
              spaces, objects and graphics designed for the widest possible audience.
            </p>
            <p>
              Visual design is the other half of my work. A year in agency taught me to build brand
              systems, editorial projects and large-format campaigns, where clarity and typographic
              care matter as much as in a museum.
            </p>
            <p>
              Accessibility is the thread that runs through my projects. My MSc thesis at Politecnico di Milano,
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
            ['MSc Thesis Researcher & Exhibition Designer', "Spazio Geco · Pavia's University Library", '2026', [
              "Visitor research: analysed the library's exhibition spaces and visitor behaviour to redesign its interactive stations and improve the flow through the space.",
              'Accessible exhibition stations: designed the graphic interfaces and on-site touchpoints of the stations, ensuring barrier-free navigation and clear reading for diverse visitors.',
              'Tactile and multisensory design: developed tactile panels and tangible objects that translate the manuscripts on display into multisensory experiences.',
            ]],
            ['Brand and Communication Design', 'CBA Design Italy, Milan', '2026', [
              'Large-format and OOH: designed out-of-home campaigns, including stadium installations, and institutional materials for international corporate clients.',
              'Brand systems: extended the visual identities of HR and corporate welfare companies across brochures, advertising and commercial presentations.',
              'Motion: designed motion graphics for social media campaigns.',
            ]],
            ['Communication & Editorial Design Intern', 'T12 Lab, Milan', '2025', [
              "Venice Biennale 2025: designed visual and hands-on materials for a children's workshop held during the Biennale, making the content accessible and engaging for a young audience.",
              'Branding and editorial: developed visual identities, editorial projects and multimedia content for crowdfunding campaigns, from concept to final cut.',
              'Cultural and social initiatives: managed digital and physical touchpoints for cultural and social impact projects.',
            ]],
            ['Communication Design Intern', 'DCode, Turin', '2024', [
              'Designed brand identities, custom patterns and pitch presentations for corporate and luxury clients (300 hours).',
            ]],
          ]}
        />

        <AboutTable
          title="Selected contexts"
          expandable
          rows={[
            ['Venice Biennale', "Children's workshop materials", '2025', [
              'Workshop materials for children at the 2025 Biennale, designed during my internship at T12 Lab.',
            ]],
            ['Loro Piana Global Summit', 'Event visual system', '2024', [
              'Designed the presentation graphics for the global summit of a luxury brand, in line with its identity and addressed to executive stakeholders, and managed the visual content during the live broadcasts.',
            ]],
            ['Lavazza Training Center', 'Experience design workshop, Turin', '2024', [
              'Selected for a one-week professional workshop on brand storytelling and physical space at the Lavazza Training Center.',
              'Stage and experience setting: worked on the creative direction and physical setup of a new product launch presentation.',
              "Spatial storytelling: turned Lavazza's brand heritage into a tangible experience, designing the environmental assets and the stage layout for the product reveal.",
              'Within a multidisciplinary team, from concept to execution on agency-style deadlines.',
            ]],
          ]}
        />

        <section className="about-section about-details shell reveal">
          <div>
            <div className="section-label">Education</div>
            <p>MSc Communication Design, Politecnico di Milano, 2024–present</p>
            <p>BSc Communication Design, Politecnico di Torino, 2021–2024</p>
            <p>General English Intensive Program, EC English Language Centres, New York, 2021</p>
          </div>
          <div>
            <div className="section-label">Tools</div>
            <p>Rhinoceros, AutoCAD, Blender</p>
            <p>InDesign, Illustrator, Photoshop</p>
            <p>After Effects, Premiere</p>
            <p>Figma, Framer, Microsoft Office</p>
          </div>
          <div>
            <div className="section-label">Languages</div>
            <p>Italian, native</p>
            <p>English, IELTS Band 7 (2024)</p>
          </div>
        </section>

        <section className="about-closing shell reveal">
          <p>Here&apos;s my CV.</p>
          <a href={asset('/CV_Rossella_Magnani.pdf')} className="about-cv" download="CV Rossella Magnani.pdf">
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
                href={link(`/${project.slug}`)}
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
                      src={asset(project.video)}
                      muted
                      loop
                      playsInline
                      autoPlay={!prefersReducedMotion()}
                      preload="auto"
                      draggable={false}
                    />
                  ) : project.image ? (
                    <img
                      src={asset(project.image)}
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
                ['Team', 'Group of 5'],
                ['Role', 'Concept and making of the tactile artefacts, contribution to the video'],
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
            src={`/media/176474d496.gif`}
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
                <img src={asset(logo)} alt={name} style={{ '--logo-h': `${height}px` } as React.CSSProperties} />
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
              In our group I developed the concept of the tactile artefacts and made them, and worked on
              parts of the video.
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
                  src: '/media/e3a098ddfc.mp4',
                  poster: '/projects/oltre-video-poster.svg',
                },
                ...[
                  ['abcbde4a04', 'White 3D models and black information cards with Braille text: the models recreate the forms of the post-war sound instruments, with tactile patterns that picture sound waves.'],
                  ['bbf10eb90d', 'A hand exploring a raised tactile surface that turns sound frequencies into physical patterns for people with visual impairments.'],
                  ['95cbff86f4', 'Two hands exploring the raised tactile surface.'],
                  ['4953504097', 'Close-up of the raised artefacts and their textures, wavy lines, steps and overlapping squares, that stand for sound transformations.'],
                  ['5237067cdf', 'The Tempophon artefact seen from above: a historic sound technology reinterpreted as a tactile object.', 'tall'],
                  ['02424f99ca', 'The Speed Variator artefact seen from above.', 'tall'],
                  ['b7a5b08984', 'The Amplitude Modulator artefact seen from above.', 'tall'],
                ].map(([file, alt, tall]) => ({ src: `/media/${file}.jpg`, alt, caption: alt, tall: Boolean(tall) })),
              ]}
            />
          </div>
        </section>

        <NextProject project={projects.find(item => item.slug === 'sovrapposizioni')!} />
      </article>

      <footer className="footer shell">
        <span>© {new Date().getFullYear()} Rossella Magnani</span>
      </footer>
    </main>
  )
}

export default function App() {
  const path = window.location.pathname.slice(BASE.length - 1).replace(/^\/|\/$/g, '')
  const project = caseStudies.find(item => item.slug === path)
  const pageName = path === 'about' ? 'About' : path === 'oltre-lascolto' ? "Oltre l'ascolto" : project?.title
  useEffect(() => {
    document.title = pageName ? `${pageName} · Rossella Magnani` : 'Rossella Magnani · Exhibition and experiential designer'
    // a description per page, for search engines and screening tools
    const description = project
      ? `${project.title} (${project.year}). ${project.type}. ${project.team}. Role: ${project.role}. ${project.shortCopy}`
      : path === 'oltre-lascolto'
        ? "Oltre l'ascolto (2025), multisensory design and accessibility. Group of 5. Role: concept and making of the tactile artefacts, contribution to the video. An animated video and tactile artefacts that translate electronic music into images and relief."
        : 'Rossella Magnani, visual designer in Milan. Exhibition and visual design, visual identity, editorial design and accessibility.'
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [pageName, project, path])
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

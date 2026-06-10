export type ProjectSpan = 8 | 6 | 4

export interface Project {
  id: string
  index: string
  type: string
  category: string
  title: string
  description: string
  tags: string[]
  filterTags: string[]
  link: string
  linkText: string
  year: string
  span: ProjectSpan
  thumbLabel: string
}

export const projects: Project[] = [
  {
    id: '01',
    index: '01 / Featured',
    type: 'SaaS Platform',
    category: 'Multi-tenant SaaS',
    title: 'Quest Workforce',
    description:
      'Locum worker management platform for Quest Medical and partners including InHealth. Admin + worker portals covering compliance tracking, shift scheduling, timesheets, invoicing and multi-organisation management. Five user roles, full multi-tenant architecture, JWT auth.',
    tags: ['Next.js', 'Prisma', 'Postgres / Neon', 'NextAuth', 'shadcn/ui', 'Brevo', 'Vercel'],
    filterTags: ['full-stack', 'saas', 'ai'],
    link: '#',
    linkText: 'Case study',
    year: '2025',
    span: 8,
    thumbLabel: 'Quest Workforce — dashboard',
  },
  {
    id: '02',
    index: '02',
    type: 'IoT',
    category: 'IoT Dashboard',
    title: 'Quest Power',
    description:
      "Multi-site energy monitoring for Quest Power's generator leasing business. Live fuel consumption, power output and costs via Rayleigh Connect sensors.",
    tags: ['Next.js', 'MongoDB', 'Rayleigh API'],
    filterTags: ['full-stack', 'saas', 'ai'],
    link: '#',
    linkText: 'Case study',
    year: '2025',
    span: 4,
    thumbLabel: 'Energy dashboard',
  },
  {
    id: '03',
    index: '03',
    type: 'Marketplace',
    category: 'B2B Marketplace',
    title: 'Quest Meditech',
    description:
      'Full rebrand and platform build for a B2B medical imaging marketplace targeting NHS Trusts and private hospitals. 55-question FAQ, GitBook wiki, auction system, full visual identity.',
    tags: ['Next.js', 'Payload CMS', 'Tailwind', 'GitBook'],
    filterTags: ['full-stack', 'design'],
    link: '#',
    linkText: 'Case study',
    year: '2024',
    span: 6,
    thumbLabel: 'Quest Meditech — marketplace',
  },
  {
    id: '04',
    index: '04',
    type: 'E-commerce',
    category: 'Own-brand commerce',
    title: 'MULSH Paint Pigments',
    description:
      'UV-stable pigments. Headless WooCommerce migrated to Next.js with a dark editorial art direction and Framer Motion. Full ownership from product to storefront.',
    tags: ['Next.js', 'Woo headless', 'Framer Motion', 'Tailwind'],
    filterTags: ['full-stack', 'ecommerce', 'design'],
    link: '#',
    linkText: 'Visit site',
    year: '2024',
    span: 6,
    thumbLabel: 'MULSH — storefront',
  },
  {
    id: '05',
    index: '05',
    type: 'Full-stack',
    category: 'Brand & build',
    title: 'Gold on the Go',
    description:
      'Mobile gold buying service. Complete luxury brand identity with a signet-ring logo, Next.js frontend, Supabase backend, custom booking system.',
    tags: ['Next.js', 'Supabase', 'Brand'],
    filterTags: ['full-stack', 'design'],
    link: '#',
    linkText: 'Case study',
    year: '2024',
    span: 4,
    thumbLabel: 'Gold on the Go',
  },
  {
    id: '06',
    index: '06',
    type: 'Consumer App',
    category: 'Social fitness',
    title: 'TheSwim / CatchRank',
    description:
      'Instagram meets Strava for UK anglers. Session-based catch logging, Mapbox with location privacy, social feed and gamification. Phase 1 live.',
    tags: ['React 18', 'TypeScript', 'Mapbox'],
    filterTags: ['full-stack', 'app', 'ai'],
    link: '#',
    linkText: 'Case study',
    year: '2025',
    span: 4,
    thumbLabel: 'TheSwim — social feed',
  },
  {
    id: '07',
    index: '07',
    type: 'WordPress',
    category: 'WordPress build',
    title: 'Cabletek',
    description:
      'Cable and wiring solutions. WordPress base with custom login and booking systems bolted on — well beyond a standard theme deployment.',
    tags: ['WordPress', 'Custom auth', 'Booking'],
    filterTags: ['wordpress', 'full-stack'],
    link: '#',
    linkText: 'Case study',
    year: '2024',
    span: 4,
    thumbLabel: 'Cabletek — booking',
  },
  {
    id: '08',
    index: '08',
    type: 'Accessibility',
    category: 'WordPress · Charity',
    title: 'Essex Sight',
    description:
      'Visual impairment charity. Events calendar integration, built to pass UK sight accessibility standards — WCAG compliance as a core deliverable.',
    tags: ['WordPress', 'WCAG', 'Events'],
    filterTags: ['wordpress', 'design'],
    link: '#',
    linkText: 'Case study',
    year: '2024',
    span: 4,
    thumbLabel: 'Essex Sight — WCAG',
  },
  {
    id: '09',
    index: '09',
    type: 'Internal Tool',
    category: 'Internal tooling',
    title: 'Vacancy Generator',
    description:
      'Lets the HR team generate branded 1080×1080 job vacancy graphics without touching design software. Pre-filled brand defaults, instant PNG download.',
    tags: ['Next.js', 'html-to-image', 'Tailwind'],
    filterTags: ['ai', 'full-stack'],
    link: '#',
    linkText: 'Case study',
    year: '2025',
    span: 4,
    thumbLabel: 'Vacancy generator',
  },
  {
    id: '10',
    index: '10',
    type: 'Tool',
    category: 'Business tooling',
    title: 'Screen Print Calculator',
    description:
      'Pricing calculator for a screen printing business. Multi-garment brand variants, quantity tiers, location pricing, margin controls and customer quote export.',
    tags: ['React', 'shadcn/ui', 'localStorage'],
    filterTags: ['full-stack', 'ai'],
    link: '#',
    linkText: 'Case study',
    year: '2024',
    span: 4,
    thumbLabel: 'Pricing calculator',
  },
  {
    id: '11',
    index: '11',
    type: 'Print',
    category: 'Print & copy',
    title: 'Quest Medical Brochure',
    description:
      '12-page recruitment brochure and generic marketing folder for industry and career events. Copy, layout and HR docs from brief to print-ready files.',
    tags: ['InDesign', 'Copywriting', 'Print'],
    filterTags: ['design', 'print'],
    link: '#',
    linkText: 'Case study',
    year: '2024',
    span: 4,
    thumbLabel: 'Brochure spread',
  },
  {
    id: '12',
    index: '12',
    type: 'Branding',
    category: 'Brand identity',
    title: 'Gold on the Go — Mark',
    description:
      'Signet ring-style logo designed for vectorisation — heraldic, minimal, hallmark aesthetic. AI-assisted ideation refined to a clean final mark.',
    tags: ['Logo', 'Midjourney', 'Vector'],
    filterTags: ['design'],
    link: '#',
    linkText: 'Case study',
    year: '2024',
    span: 4,
    thumbLabel: 'Signet mark',
  },
]

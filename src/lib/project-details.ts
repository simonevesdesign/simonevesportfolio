export interface ProjectSection {
  heading: string
  body: string
}

export interface Screenshot {
  src: string
  alt: string
  caption?: string
}

export interface ProjectDetail {
  slug: string
  liveUrl?: string
  sections?: ProjectSection[]
  screenshots?: Screenshot[]
  techNotes?: string
}

export const projectDetails: Record<string, ProjectDetail> = {
  'quest-workforce': {
    slug: 'quest-workforce',
    sections: [
      {
        heading: 'Challenge',
        body: 'Quest Medical needed to manage a growing pool of locum workers across multiple partner organisations including InHealth. Spreadsheets and email chains could not scale — compliance documents expired without warning, shift scheduling was entirely manual, and there was no unified view across timesheets, invoices, or worker status across organisations.',
      },
      {
        heading: 'Approach',
        body: 'Built a full multi-tenant Next.js 14 platform with five distinct user roles: super admin, organisation admin, compliance officer, locum worker, and client contact. Each role has scoped database access, its own portal view, and targeted transactional notifications via Brevo. JWT-based auth via NextAuth v5 with refresh token rotation and organisation-scoped sessions.',
      },
      {
        heading: 'Outcome',
        body: 'Platform shipped and in active daily use across Quest Medical and InHealth. Compliance document tracking is now automated with expiry alerts, shift scheduling is centralised across organisations, and invoice generation was reduced from hours of manual work to a single click.',
      },
    ],
    techNotes: 'Next.js 14 App Router · Prisma ORM · PostgreSQL on Neon · NextAuth v5 · shadcn/ui · Brevo transactional email · Vercel',
  },
  'quest-power': {
    slug: 'quest-power',
    techNotes: 'Next.js · MongoDB · Rayleigh Connect API',
  },
  'quest-meditech': {
    slug: 'quest-meditech',
    techNotes: 'Next.js · Payload CMS · Tailwind CSS · GitBook',
  },
  'mulsh-paint-pigments': {
    slug: 'mulsh-paint-pigments',
    techNotes: 'Next.js · Headless WooCommerce · Framer Motion · Tailwind CSS',
  },
  'gold-on-the-go': {
    slug: 'gold-on-the-go',
    techNotes: 'Next.js · Supabase · Brand identity',
  },
  'theswim-catchrank': {
    slug: 'theswim-catchrank',
    techNotes: 'React 18 · TypeScript · Mapbox GL JS',
  },
  'cabletek': {
    slug: 'cabletek',
    techNotes: 'WordPress · Custom PHP · ACF · Custom authentication',
  },
  'essex-sight': {
    slug: 'essex-sight',
    techNotes: 'WordPress · WCAG 2.1 AA · The Events Calendar · ACF',
  },
}

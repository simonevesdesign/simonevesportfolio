import { getProjects } from '@/lib/payload'
import { SeedClient } from './SeedClient'

type SearchParams = Promise<{ secret?: string }>

export default async function SeedPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { secret } = await searchParams

  if (!secret || secret !== process.env.SEED_SECRET) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--bg)',
      }}>
        <div style={{ textAlign: 'center', color: 'var(--ink-3)' }}>
          <p style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--ink-4)', lineHeight: 1 }}>403</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9375rem' }}>Missing or incorrect secret.</p>
          <p style={{ marginTop: '0.25rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
            /seed?secret=your-secret
          </p>
        </div>
      </main>
    )
  }

  const projects = await getProjects()

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--bg)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-4)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Payload CMS
          </p>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
            Seed database
          </h1>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--ink-3)' }}>
            Populates the projects collection from static seed data.
          </p>
        </div>

        <SeedClient secret={secret} currentCount={projects.length} totalProjects={12} />
      </div>
    </main>
  )
}

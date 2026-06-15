'use client'

import { useState } from 'react'

interface SeedClientProps {
  secret: string
  currentCount: number
  totalProjects: number
}

interface SeedResult {
  seeded?: number
  skipped?: boolean
  existing?: number
  error?: string
}

export function SeedClient({ secret, currentCount, totalProjects }: SeedClientProps) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SeedResult | null>(null)

  async function runSeed(force: boolean) {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, force }),
      })
      const data = await res.json() as SeedResult
      setResult(data)
    } catch (err) {
      setResult({ error: err instanceof Error ? err.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  const statusColor = result?.error
    ? 'var(--accent)'
    : result?.skipped
    ? 'var(--ink-3)'
    : result?.seeded
    ? '#22c55e'
    : 'var(--ink-3)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 1.25rem',
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
      }}>
        <span style={{ color: 'var(--ink-3)', fontSize: '0.875rem' }}>Projects in DB</span>
        <span style={{
          marginLeft: 'auto',
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 600,
          color: currentCount === totalProjects ? '#22c55e' : currentCount === 0 ? 'var(--accent)' : 'var(--ink)',
        }}>
          {currentCount} / {totalProjects}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => runSeed(false)}
          disabled={loading}
          style={{
            flex: 1,
            padding: '0.75rem 1.5rem',
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9375rem',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'opacity 0.15s',
          }}
        >
          {loading ? 'Running…' : 'Seed projects'}
        </button>
        <button
          onClick={() => runSeed(true)}
          disabled={loading}
          style={{
            flex: 1,
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: 'var(--ink)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9375rem',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'opacity 0.15s',
          }}
        >
          Force re-seed
        </button>
      </div>

      {result && (
        <div style={{
          padding: '1rem 1.25rem',
          background: 'var(--bg-2)',
          border: `1px solid var(--border)`,
          borderLeft: `3px solid ${statusColor}`,
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.875rem',
          color: statusColor,
          fontFamily: 'var(--font-mono)',
        }}>
          {result.error && `Error: ${result.error}`}
          {result.skipped && `Skipped — ${result.existing} project(s) already in DB. Use force re-seed to overwrite.`}
          {!result.error && !result.skipped && `✓ Seeded ${result.seeded} project(s) successfully.`}
        </div>
      )}

      {result && !result.error && !result.skipped && (
        <button
          onClick={() => window.location.reload()}
          style={{
            alignSelf: 'flex-start',
            padding: '0.5rem 1rem',
            background: 'transparent',
            color: 'var(--ink-3)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          Refresh count
        </button>
      )}
    </div>
  )
}

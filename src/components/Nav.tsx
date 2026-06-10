'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export function Nav() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="nav">
      <Link href="/" aria-label="Simon Eves" className="nav-logo">
        <span className="nav-logo-text">
          Simon<br />Eves
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        <Link href="#work" className="nav-link">Work</Link>
        <Link href="#about" className="nav-link">About</Link>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="theme-toggle-btn"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <Link href="#contact" className="nav-link nav-cta">Get in touch</Link>
      </div>
    </nav>
  )
}

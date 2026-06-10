import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-inner">
          <span>© 2026 Simon Eves — Built with Next.js</span>
          <div className="footer-links">
            <Link href="#work" className="footer-link">Work</Link>
            <Link href="#about" className="footer-link">About</Link>
            <Link href="#contact" className="footer-link">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

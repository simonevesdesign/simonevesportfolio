function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 12L12 2M12 2H4.5M12 2v7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ContactSection() {
  return (
    <section className="contact" id="contact" data-screen-label="04 Contact">
      <div className="contact-inner">
        <h2 className="contact-title reveal">
          Let&apos;s build<br />
          <span className="contact-accent">something.</span>
        </h2>
        <div className="contact-side">
          <div className="contact-row">
            <span className="contact-label">Email</span>
            <a href="mailto:hello@simoneves.co.uk" className="contact-link">
              hello@simoneves.co.uk <ArrowIcon />
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-label">Elsewhere</span>
            <a href="https://linkedin.com/in/simoneves" target="_blank" rel="noopener noreferrer" className="contact-link">
              LinkedIn <ArrowIcon />
            </a>
          </div>
          <div className="contact-row">
            <span className="contact-label">Based in</span>
            <span className="contact-val">Southend-on-Sea, Essex</span>
          </div>
        </div>
      </div>
    </section>
  )
}

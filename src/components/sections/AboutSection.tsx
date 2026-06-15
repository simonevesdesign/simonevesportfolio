const STACK = [
  'Next.js', 'React', 'TypeScript', 'Supabase', 'MongoDB', 'Prisma',
  'Tailwind', 'WordPress', 'Vercel', 'Coolify', 'Windsurf', 'Claude API',
  'Figma', 'Adobe CC', 'InDesign', 'Illustrator', 'Photoshop',
]

export function AboutSection() {
  return (
    <section className="about" id="about" data-screen-label="03 About">
      <div className="section-head">
        <div>
          <div className="section-tag">About</div>
          <h2 className="section-title">
            Developer. Designer.<br />
            <span className="muted">Builder of useful things.</span>
          </h2>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-heading reveal">
          End-to-end<br />
          <span className="muted">from schema to&nbsp;signage.</span>
        </div>
        <div className="about-body">
          <p>
            Started in graphic design, spent 18 years doing it properly. Print, brand identity, editorial. Then I started building the websites I was designing and realised I preferred having control of the whole thing. Now I work full-stack at Flomedia and take on my own projects in Southend.
          </p>
          <p>
            InDesign, Illustrator and Photoshop for anything going to print. Figma for digital. Next.js, React and TypeScript for the build. Windsurf and Claude have become part of how I work day to day.
          </p>

          <div className="stack-section">
            <div className="stack-label">Stack &amp; tools</div>
            <div className="stack-list">
              {STACK.map((item) => (
                <span key={item} className="stack-pill">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

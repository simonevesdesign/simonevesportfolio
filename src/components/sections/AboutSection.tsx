const STACK = [
  'Next.js', 'React', 'TypeScript', 'Supabase', 'MongoDB', 'Prisma',
  'Tailwind', 'WordPress', 'Vercel', 'Coolify', 'Windsurf', 'Claude API',
  'Figma', 'InDesign',
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
            I work across the full stack — from database architecture and API integrations through to UI design,
            brand identity and print. Based in Southend-on-Sea, currently Developer &amp; Designer at Flomedia
            and running my own projects on the side.
          </p>
          <p>
            I use AI as a genuine part of my workflow — not just a tool but a collaborator. Windsurf for coding,
            Claude for planning and writing, Midjourney for visual ideation. The result is faster delivery without
            compromising on quality or craft.
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

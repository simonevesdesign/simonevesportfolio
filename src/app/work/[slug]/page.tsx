import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { SiteFooter } from '@/components/SiteFooter'
import { projects } from '@/lib/projects'
import { projectDetails } from '@/lib/project-details'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.hasDetail)
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Simon Eves`,
    description: project.description,
  }
}

function ArrowUpRight() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path
        d="M2 9L9 2M9 2H3.5M9 2v5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug && p.hasDetail)
  if (!project) notFound()

  const detail = projectDetails[slug]

  return (
    <>
      <Nav />
      <main className="wrap">
        <article className="work-detail">

          <Link href="/#work" className="work-back">
            ← Work
          </Link>

          <header className="work-detail-hero">
            <div className="work-detail-eyebrow">
              <span className="work-detail-category">{project.category}</span>
              <span className="work-detail-sep" aria-hidden="true">·</span>
              <span className="work-detail-year">{project.year}</span>
            </div>
            <h1 className="work-detail-title">{project.title}</h1>
            <div className="work-detail-meta">
              <span className="card-type-pill">{project.type}</span>
              {project.tags.map((tag) => (
                <span key={tag} className="card-tag">{tag}</span>
              ))}
            </div>
          </header>

          <div className="work-detail-thumb">
            <span className="thumb-label">{project.thumbLabel}</span>
          </div>

          <div className="work-detail-body">
            <div className="work-detail-main">
              <p className="work-detail-description">{project.description}</p>
              {detail?.sections?.map((section) => (
                <div key={section.heading} className="work-detail-section">
                  <h2 className="work-detail-section-heading">{section.heading}</h2>
                  <p className="work-detail-section-body">{section.body}</p>
                </div>
              ))}
            </div>

            <aside className="work-detail-aside">
              {detail?.techNotes && (
                <div className="work-aside-block">
                  <div className="work-aside-label">Stack</div>
                  <p className="work-tech-notes">{detail.techNotes}</p>
                </div>
              )}
              {detail?.liveUrl && (
                <div className="work-aside-block">
                  <a
                    href={detail.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arrow-link"
                  >
                    Visit live site <ArrowUpRight />
                  </a>
                </div>
              )}
            </aside>
          </div>

          {detail?.screenshots && detail.screenshots.length > 0 && (
            <div className="work-screenshots">
              {detail.screenshots.map((shot) => (
                <figure key={shot.src} className="work-screenshot">
                  <div className="work-screenshot-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={shot.src} alt={shot.alt} />
                  </div>
                  {shot.caption && (
                    <figcaption className="work-screenshot-caption">{shot.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          <footer className="work-detail-footer-nav">
            <Link href="/#work" className="work-back">
              ← Back to work
            </Link>
          </footer>

        </article>
      </main>
      <SiteFooter />
    </>
  )
}

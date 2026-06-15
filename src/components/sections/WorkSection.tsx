'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import type { Project } from '@/lib/projects'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Full-stack', value: 'full-stack' },
  { label: 'SaaS', value: 'saas' },
  { label: 'E-commerce', value: 'ecommerce' },
  { label: 'WordPress', value: 'wordpress' },
  { label: 'Design & brand', value: 'design' },
  { label: 'AI & tooling', value: 'ai' },
  { label: 'Print', value: 'print' },
]

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M2 9L9 2M9 2H3.5M9 2v5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onEnter = () => {
      document.body.classList.add('cursor-on-card')
    }
    const onMove = (e: MouseEvent) => {
      if (reduceMotion) return
      const rect = card.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const maxTilt = 5
      const rx = (px - 0.5) * maxTilt * 2
      const ry = -(py - 0.5) * maxTilt * 2
      card.style.transform = `perspective(900px) rotateX(${ry.toFixed(2)}deg) rotateY(${rx.toFixed(2)}deg) translateY(-3px) translateZ(0)`
    }
    const onLeave = () => {
      document.body.classList.remove('cursor-on-card')
      card.style.transform = ''
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const isWide = project.span === 8
  const isMedium = project.span === 6

  const footerLink = project.hasDetail ? (
    <Link href={`/work/${project.slug}`} className="arrow-link detail-link">
      {project.linkText} <ArrowIcon />
    </Link>
  ) : project.link !== '#' ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="arrow-link">
      {project.linkText} <ArrowIcon />
    </a>
  ) : (
    <span className="muted-link">{project.linkText}</span>
  )

  return (
    <article
      ref={cardRef}
      className={`card reveal${isWide ? ' card-wide' : isMedium ? ' card-medium' : ''}${project.hasDetail ? ' has-detail' : ''}`}
      style={{ gridColumn: `span ${project.span}` }}
    >
      {isWide ? (
        <>
          <div className="card-thumb">
            <span className="thumb-label">{project.thumbLabel}</span>
          </div>
          <div className="card-body">
            <div className="card-head">
              <span className="card-index">{project.index}</span>
              <span className="card-type-pill">{project.type}</span>
            </div>
            <div className="card-category">{project.category}</div>
            <h3 className="card-title">{project.title}</h3>
            <p className="card-desc">{project.description}</p>
            <div className="card-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="card-tag">{tag}</span>
              ))}
            </div>
            <div className="card-footer">
              {footerLink}
              <span className="card-year">{project.year}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card-head">
            <span className="card-index">{project.index}</span>
            <span className="card-type-pill">{project.type}</span>
          </div>
          <div className="card-thumb">
            <span className="thumb-label">{project.thumbLabel}</span>
          </div>
          <div className="card-category">{project.category}</div>
          <h3 className="card-title">{project.title}</h3>
          <p className="card-desc">{project.description}</p>
          <div className="card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="card-tag">{tag}</span>
            ))}
          </div>
          <div className="card-footer">
            {footerLink}
            <span className="card-year">{project.year}</span>
          </div>
        </>
      )}
    </article>
  )
}

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visible = projects.filter(
    (p) => activeFilter === 'all' || p.filterTags.includes(activeFilter),
  )

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.08 },
    )
    document.querySelectorAll('.card.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [activeFilter])

  return (
    <section className="section" id="work" data-screen-label="02 Work">
      <div className="section-head">
        <div>
          <div className="section-tag">Selected work · 2023–2026</div>
          <h2 className="section-title">
            Twelve projects across SaaS, e-commerce,<br />
            <span className="muted">tooling, brand and print.</span>
          </h2>
        </div>
        <div className="section-aside">{visible.length} / {projects.length}</div>
      </div>

      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'

export function WordmarkSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const content = text.textContent ?? ''
    text.textContent = ''

    const letters = Array.from(content)
    letters.forEach((ch, i) => {
      const span = document.createElement('span')
      span.className = 'wordmark-letter'
      span.textContent = ch === ' ' ? '\u00A0' : ch
      span.style.cssText = `display:inline-block;will-change:transform;transition:transform 0.9s cubic-bezier(.16,1,.3,1) ${i * 38}ms, color 0.25s`
      if (!reduceMotion) span.style.transform = 'translateY(115%)'

      span.addEventListener('mouseenter', () => {
        span.style.animation = 'none'
        span.style.color = 'var(--accent)'
        span.style.transform = 'translateY(-14%) rotate(-5deg) scale(1.08)'
        span.style.transition = 'transform 0.55s cubic-bezier(.34,1.56,.64,1), color 0.25s'
        setTimeout(() => {
          span.style.transform = 'translateY(3%) rotate(2.5deg) scale(0.99)'
          setTimeout(() => {
            span.style.transform = ''
            span.style.color = ''
            span.style.transition = 'transform 0.9s cubic-bezier(.16,1,.3,1), color 0.25s'
          }, 200)
        }, 250)
      })

      text.appendChild(span)
    })

    if (reduceMotion) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            container.querySelectorAll<HTMLSpanElement>('.wordmark-letter').forEach((s) => {
              s.style.transform = ''
            })
            setTimeout(() => {
              container.style.overflow = 'visible'
            }, letters.length * 38 + 1000)
            io.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )
    io.observe(text)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="wordmark-section"
      aria-hidden="true"
      style={{ overflow: 'hidden' }}
    >
      <div ref={textRef} className="wordmark-text">
        Simon Eves.
      </div>
    </div>
  )
}

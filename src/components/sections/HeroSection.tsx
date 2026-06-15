'use client'

import { useEffect, useRef } from 'react'

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let wordIndex = 0

    const splitWords = (node: Node) => {
      const children = Array.from(node.childNodes)
      children.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE && child.textContent) {
          const frag = document.createDocumentFragment()
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part))
              return
            }
            const mask = document.createElement('span')
            mask.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.12em;margin-bottom:-0.12em'
            const w = document.createElement('span')
            w.style.cssText = 'display:inline-block'
            w.setAttribute('data-w', String(wordIndex))
            const letters = Array.from(part)
            letters.forEach((ch) => {
              const l = document.createElement('span')
              l.style.cssText = 'display:inline-block;transition:color 0.25s'
              l.textContent = ch
              l.addEventListener('mouseenter', () => {
                l.style.animation = 'none'
                l.style.color = 'var(--accent)'
                l.style.transform = 'translateY(-0.09em)'
                l.style.transition = 'transform 0.4s ease, color 0.25s'
                setTimeout(() => {
                  l.style.transform = ''
                  l.style.color = ''
                }, 400)
              })
              w.appendChild(l)
            })
            mask.appendChild(w)
            frag.appendChild(mask)
            wordIndex++
          })
          node.replaceChild(frag, child)
        } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
          splitWords(child)
        }
      })
    }

    splitWords(title)

    const words = title.querySelectorAll<HTMLSpanElement>('[data-w]')
    words.forEach((w) => {
      w.style.transform = 'translateY(130%)'
      w.style.transition = `transform 0.9s cubic-bezier(.16,1,.3,1) ${150 + parseInt(w.getAttribute('data-w') ?? '0') * 60}ms`
    })

    requestAnimationFrame(() => {
      setTimeout(() => {
        words.forEach((w) => { w.style.transform = '' })
        setTimeout(() => {
          title.querySelectorAll<HTMLSpanElement>('[data-w]').forEach((w) => {
            const parent = w.parentElement
            if (parent) parent.style.overflow = 'visible'
          })
        }, 150 + wordIndex * 60 + 950)
      }, 50)
    })
  }, [])

  useEffect(() => {
    const glow = document.querySelector<HTMLElement>('.hero-glow')
    if (!glow) return
    const onScroll = () => {
      glow.style.transform = `translateY(${window.scrollY * 0.25}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-glow" />

      <div className="hero-top">
        <span className="hero-pulse" />
        <span>Available for select projects</span>
        <span style={{ color: 'var(--ink-4)' }}>·</span>
        <span>Southend-on-Sea, Essex</span>
      </div>

      <h1 className="hero-title" ref={titleRef}>
        Full-stack developer<br />
        &amp; designer building<br />
        <span className="hero-accent hero-tilt">platforms, products</span><br />
        <span className="hero-muted">and brands.</span>
      </h1>

      <div className="hero-meta">
        <p className="hero-desc">
          I&apos;ve been a designer for 18 years. A few years ago I started building the things I was designing. Now I do both, end to end, at Flomedia and on my own.
        </p>
        <div className="now-widget">
          <div className="now-head">
            <span className="now-dot" />
            <span>Currently</span>
          </div>
          <div className="now-row">
            <span className="now-key">Building</span>
            <span className="now-val">Quest Workforce v2 <span className="now-sub">, timesheets and invoicing</span></span>
          </div>
          <div className="now-row">
            <span className="now-key">At</span>
            <span className="now-val">Flomedia <span className="now-sub">, Developer and Designer</span></span>
          </div>
          <div className="now-row">
            <span className="now-key">Open to</span>
            <span className="now-val">Select freelance <span className="now-sub">, from Q3 2026</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}

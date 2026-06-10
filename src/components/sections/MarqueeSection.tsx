'use client'

import { useEffect, useRef } from 'react'

const ITEMS = ['Full-stack', '✦', 'Design', '✦', 'Brand', '✦', 'Print', '✦', 'AI tooling', '✦']

export function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const setup = () => {
      track.querySelectorAll('.marquee-clone').forEach((c) => c.remove())
      const gw = group.getBoundingClientRect().width
      if (!gw) return
      const copies = Math.ceil(window.innerWidth / gw) + 1
      for (let i = 0; i < copies; i++) {
        const c = group.cloneNode(true) as HTMLDivElement
        c.classList.add('marquee-clone')
        track.appendChild(c)
      }
      track.style.setProperty('--gw', `${gw}px`)
      track.style.setProperty('--dur', `${Math.max(8, gw / 55)}s`)
    }

    setup()
    window.addEventListener('resize', setup)
    if (document.fonts?.ready) document.fonts.ready.then(setup)

    return () => window.removeEventListener('resize', setup)
  }, [])

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        <div className="marquee-group" ref={groupRef}>
          {ITEMS.map((item, i) => (
            <span
              key={i}
              className={item === '✦' ? 'marquee-sep' : 'marquee-item'}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let dx = mx
    let dy = my
    let rx = mx
    let ry = my
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      document.body.classList.remove('cursor-hidden')
    }
    const onLeave = () => document.body.classList.add('cursor-hidden')
    const onEnter = () => document.body.classList.remove('cursor-hidden')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const addHover = (el: Element) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
    }

    document.querySelectorAll('a, button, .filter-btn').forEach(addHover)

    const animate = () => {
      dx += (mx - dx) * 0.45
      dy += (my - dy) * 0.45
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

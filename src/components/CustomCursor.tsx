import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100, mouseY = -100
    let ringX  = -100, ringY  = -100
    let visible = false
    let rafId: number

    // rAF loop — ONLY lerps the ring, dot is handled directly in onMove
    const loop = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      rafId = requestAnimationFrame(loop)
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Dot moves IMMEDIATELY in the event handler — no frame delay
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      if (!visible) {
        visible = true
        dot.style.opacity  = '1'
        ring.style.opacity = '1'
      }
    }

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select')) {
        dot.style.opacity    = '0'
        ring.style.width     = '44px'
        ring.style.height    = '44px'
        ring.style.borderColor = 'rgba(14,165,233,0.9)'
      }
    }

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select')) {
        dot.style.opacity    = '1'
        ring.style.width     = '28px'
        ring.style.height    = '28px'
        ring.style.borderColor = 'rgba(14,165,233,0.45)'
      }
    }

    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter = () => { if (visible) { dot.style.opacity = '1'; ring.style.opacity = '1' } }

    rafId = requestAnimationFrame(loop)
    window.addEventListener('mousemove',  onMove, { passive: true })
    window.addEventListener('mouseover',  onOver, { passive: true })
    window.addEventListener('mouseout',   onOut,  { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseover',  onOver)
      window.removeEventListener('mouseout',   onOut)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      {/* Dot — snaps to mouse */}
      <div
        ref={dotRef}
        style={{
          position:  'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#0ea5e9',
          boxShadow: '0 0 8px rgba(14,165,233,0.9)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'opacity 0.2s',
        }}
      />

      {/* Ring — lags behind with lerp */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 28, height: 28,
          borderRadius: '50%',
          border: '1.5px solid rgba(14,165,233,0.45)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'opacity 0.2s, width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </>
  )
}

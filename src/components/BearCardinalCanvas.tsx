import { useRef, useEffect } from 'react'

// ─── Realistic American Black Bear ────────────────────────────────────────────
function drawBear(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  t: number,
  mouseX: number,
  mouseY: number,
) {
  const s = scale
  const breathe = Math.sin(t * 0.85) * 1.8 * s
  const sway = Math.sin(t * 0.42) * 0.012

  // Head tracking
  const headCX = cx
  const headCY = cy - 118 * s
  const dx = mouseX - headCX
  const dy = mouseY - headCY
  const angle = Math.atan2(dy, dx)
  const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 450)
  const tiltX = Math.cos(angle) * 9 * s * dist
  const tiltY = Math.sin(angle) * 5 * s * dist

  // ── Ground shadow ──────────────────────────────────────────────────────────
  ctx.save()
  ctx.translate(cx, cy + 108 * s)
  ctx.scale(1.1, 0.2)
  const shadowG = ctx.createRadialGradient(0, 0, 0, 0, 0, 85 * s)
  shadowG.addColorStop(0, 'rgba(0,0,0,0.4)')
  shadowG.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.beginPath()
  ctx.arc(0, 0, 85 * s, 0, Math.PI * 2)
  ctx.fillStyle = shadowG
  ctx.fill()
  ctx.restore()

  // ── Body with shoulder hump ────────────────────────────────────────────────
  ctx.save()
  ctx.translate(cx, cy + 5 * s)
  ctx.rotate(sway)

  // Body path — realistic bear silhouette with shoulder hump
  const bY = breathe * 0.2

  function bearBodyPath() {
    ctx.beginPath()
    // Start bottom-left
    ctx.moveTo(-78 * s, 82 * s + bY)
    // Left haunch curve up
    ctx.bezierCurveTo(-92 * s, 65 * s, -95 * s, 28 * s, -90 * s, -4 * s)
    // Left shoulder slope up to hump
    ctx.bezierCurveTo(-85 * s, -36 * s, -72 * s, -60 * s, -48 * s, -72 * s)
    // Left side of hump to peak
    ctx.bezierCurveTo(-26 * s, -82 * s, -10 * s, -82 * s, 0, -86 * s)
    // Right side of hump down
    ctx.bezierCurveTo(10 * s, -82 * s, 26 * s, -82 * s, 48 * s, -72 * s)
    // Right shoulder slope
    ctx.bezierCurveTo(72 * s, -60 * s, 85 * s, -36 * s, 90 * s, -4 * s)
    // Right haunch down
    ctx.bezierCurveTo(95 * s, 28 * s, 92 * s, 65 * s, 78 * s, 82 * s + bY)
    // Bottom curve
    ctx.bezierCurveTo(52 * s, 92 * s, -52 * s, 92 * s, -78 * s, 82 * s + bY)
    ctx.closePath()
  }

  // Drop shadow
  ctx.save()
  ctx.translate(7 * s, 7 * s)
  bearBodyPath()
  ctx.fillStyle = 'rgba(0,0,0,0.22)'
  ctx.fill()
  ctx.restore()

  // Main body fill — very dark brown with directional light from upper-left
  bearBodyPath()
  const bodyG = ctx.createRadialGradient(-35 * s, -52 * s, 8 * s, 5 * s, 10 * s, 110 * s)
  bodyG.addColorStop(0, '#2E1A09')
  bodyG.addColorStop(0.35, '#180C04')
  bodyG.addColorStop(0.75, '#0E0702')
  bodyG.addColorStop(1, '#070401')
  ctx.fillStyle = bodyG
  ctx.fill()

  // Left shoulder fur highlight
  ctx.beginPath()
  ctx.ellipse(-62 * s, -52 * s, 20 * s, 32 * s, 0.5, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(55,28,10,0.28)'
  ctx.fill()

  // Right shoulder fur highlight (softer — away from light)
  ctx.beginPath()
  ctx.ellipse(62 * s, -52 * s, 16 * s, 28 * s, -0.5, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(40,20,7,0.18)'
  ctx.fill()

  // Chest / center belly lighter warm area
  ctx.beginPath()
  ctx.ellipse(0, 30 * s, 35 * s, 48 * s, 0, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(38,18,6,0.18)'
  ctx.fill()

  // Hump top sheen
  ctx.beginPath()
  ctx.ellipse(-5 * s, -78 * s, 22 * s, 10 * s, -0.1, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(55,28,10,0.22)'
  ctx.fill()

  ctx.restore()

  // ── Legs — short and thick (real bear proportions) ─────────────────────────
  const legSway = Math.sin(t * 0.42) * 0.025

  for (const side of [-1, 1] as const) {
    ctx.save()
    ctx.translate(cx + side * 65 * s, cy + 68 * s)
    ctx.rotate(side * legSway)

    // Thick upper leg
    ctx.beginPath()
    ctx.moveTo(-18 * s, -28 * s)
    ctx.bezierCurveTo(-22 * s + side * 2 * s, 0, -20 * s + side * s, 22 * s, -16 * s, 38 * s)
    ctx.bezierCurveTo(-8 * s, 44 * s, 8 * s, 44 * s, 16 * s, 38 * s)
    ctx.bezierCurveTo(20 * s, 22 * s, 22 * s - side * s, 0, 18 * s, -28 * s)
    ctx.closePath()
    const legG = ctx.createLinearGradient(-18 * s, 0, 18 * s, 0)
    legG.addColorStop(0, '#0C0502')
    legG.addColorStop(0.5, '#1A0D04')
    legG.addColorStop(1, '#0C0502')
    ctx.fillStyle = legG
    ctx.fill()

    // Large paw — bears have huge paws
    ctx.beginPath()
    ctx.ellipse(0, 44 * s, 24 * s, 15 * s, 0, 0, Math.PI * 2)
    const pawG = ctx.createRadialGradient(-4 * s, 40 * s, 2 * s, 0, 44 * s, 24 * s)
    pawG.addColorStop(0, '#1C0E05')
    pawG.addColorStop(1, '#060301')
    ctx.fillStyle = pawG
    ctx.fill()

    // Claws — 5 on front paw, slightly curved
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath()
      ctx.moveTo(i * 5.5 * s, 56 * s)
      ctx.quadraticCurveTo(
        i * 5.5 * s + side * 1.5 * s, 62 * s,
        i * 5.2 * s + side * 0.8 * s, 65 * s
      )
      ctx.strokeStyle = 'rgba(8,4,1,0.8)'
      ctx.lineWidth = 2.2 * s
      ctx.lineCap = 'round'
      ctx.stroke()
    }

    ctx.restore()
  }

  // ── Neck — thick, columnar ─────────────────────────────────────────────────
  const hx = cx + tiltX * 0.5
  const hy = cy - 118 * s + tiltY * 0.28 + breathe * 0.06

  ctx.beginPath()
  ctx.moveTo(cx - 34 * s, cy - 16 * s)
  ctx.bezierCurveTo(cx - 28 * s, hy + 60 * s, hx - 28 * s, hy + 50 * s, hx - 30 * s, hy + 38 * s)
  ctx.lineTo(hx + 30 * s, hy + 38 * s)
  ctx.bezierCurveTo(hx + 28 * s, hy + 50 * s, cx + 28 * s, cy - 6 * s, cx + 34 * s, cy - 16 * s)
  ctx.closePath()
  const neckG = ctx.createLinearGradient(cx - 34 * s, 0, cx + 34 * s, 0)
  neckG.addColorStop(0, '#0D0703')
  neckG.addColorStop(0.5, '#1C0E05')
  neckG.addColorStop(1, '#0D0703')
  ctx.fillStyle = neckG
  ctx.fill()

  // ── Head ──────────────────────────────────────────────────────────────────
  // Real black bear: wider than tall, flatter top, pronounced jaw
  ctx.beginPath()
  ctx.ellipse(hx + 4 * s, hy + 5 * s, 57 * s, 50 * s, 0, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(0,0,0,0.18)'
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(hx, hy, 57 * s, 50 * s, 0, 0, Math.PI * 2)
  const headG = ctx.createRadialGradient(hx - 16 * s, hy - 16 * s, 4 * s, hx, hy, 60 * s)
  headG.addColorStop(0, '#2E1A09')
  headG.addColorStop(0.45, '#180C04')
  headG.addColorStop(1, '#080402')
  ctx.fillStyle = headG
  ctx.fill()

  // Forehead sheen
  ctx.beginPath()
  ctx.ellipse(hx - 8 * s, hy - 22 * s, 22 * s, 10 * s, -0.25, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(55,28,10,0.2)'
  ctx.fill()

  // Wide cheekbone area — bears have broad faces
  for (const side of [-1, 1] as const) {
    ctx.beginPath()
    ctx.ellipse(hx + side * 40 * s, hy + 5 * s, 16 * s, 22 * s, 0, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(22,12,4,0.35)'
    ctx.fill()
  }

  // ── Ears — rounded, positioned at upper sides ──────────────────────────────
  for (const [ex, ey] of [[-44 * s, -28 * s], [44 * s, -28 * s]] as [number, number][]) {
    const earX = hx + ex, earY = hy + ey
    // Outer ear
    ctx.beginPath()
    ctx.arc(earX, earY, 17 * s, 0, Math.PI * 2)
    const earG = ctx.createRadialGradient(earX - 3 * s, earY - 3 * s, 2 * s, earX, earY, 17 * s)
    earG.addColorStop(0, '#201208')
    earG.addColorStop(1, '#0C0602')
    ctx.fillStyle = earG
    ctx.fill()
    // Inner ear canal
    ctx.beginPath()
    ctx.arc(earX, earY, 8 * s, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(75,32,18,0.38)'
    ctx.fill()
    // Fur texture on outer ear
    ctx.beginPath()
    ctx.arc(earX - 3 * s, earY - 3 * s, 5 * s, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(35,18,7,0.2)'
    ctx.fill()
  }

  // ── Muzzle — prominent lighter patch (most distinctive black bear feature) ──
  const snoutX = hx + tiltX * 0.1
  const snoutY = hy + 14 * s + tiltY * 0.08

  // Muzzle background lighter patch — extends well out from dark head
  ctx.beginPath()
  ctx.ellipse(snoutX, snoutY + 2 * s, 31 * s, 23 * s, 0, 0, Math.PI * 2)
  const muzzleG = ctx.createRadialGradient(snoutX - 5 * s, snoutY - 4 * s, 3 * s, snoutX, snoutY + 4 * s, 34 * s)
  muzzleG.addColorStop(0, '#A07848')  // light tan
  muzzleG.addColorStop(0.38, '#7A5530')  // medium brown
  muzzleG.addColorStop(0.72, '#4E3318')
  muzzleG.addColorStop(1, '#2A1A08')
  ctx.fillStyle = muzzleG
  ctx.fill()

  // Muzzle upper bridge (connects to dark forehead)
  ctx.beginPath()
  ctx.ellipse(snoutX, snoutY - 6 * s, 22 * s, 13 * s, 0, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(110,80,42,0.55)'
  ctx.fill()

  // Nose — large, wide, slightly rectangular with rounded corners
  ctx.save()
  ctx.translate(snoutX, snoutY - 8 * s)
  ctx.beginPath()
  const nw = 12 * s, nh = 7 * s, nr = 4 * s
  ctx.moveTo(-nw + nr, -nh)
  ctx.lineTo(nw - nr, -nh)
  ctx.quadraticCurveTo(nw, -nh, nw, -nh + nr)
  ctx.lineTo(nw, nh - nr)
  ctx.quadraticCurveTo(nw, nh, nw - nr, nh)
  ctx.lineTo(-nw + nr, nh)
  ctx.quadraticCurveTo(-nw, nh, -nw, nh - nr)
  ctx.lineTo(-nw, -nh + nr)
  ctx.quadraticCurveTo(-nw, -nh, -nw + nr, -nh)
  ctx.closePath()
  const noseG = ctx.createRadialGradient(-4 * s, -5 * s, 1 * s, 0, -2 * s, 13 * s)
  noseG.addColorStop(0, '#1C1212')
  noseG.addColorStop(1, '#050202')
  ctx.fillStyle = noseG
  ctx.fill()
  // Nose highlight
  ctx.beginPath()
  ctx.arc(-5 * s, -5.5 * s, 2.2 * s, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.12)'
  ctx.fill()
  // Nostril details — bears have prominent nostrils
  for (const nx of [-5, 5] as number[]) {
    ctx.beginPath()
    ctx.ellipse(nx * s, 2 * s, 2.8 * s, 2 * s, 0.2, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0,0,0,0.85)'
    ctx.fill()
  }
  ctx.restore()

  // Philtrum (center groove below nose)
  ctx.beginPath()
  ctx.moveTo(snoutX, snoutY - 1 * s)
  ctx.lineTo(snoutX, snoutY + 6 * s)
  ctx.strokeStyle = 'rgba(18,10,4,0.65)'
  ctx.lineWidth = 1.8 * s
  ctx.lineCap = 'round'
  ctx.stroke()

  // Lip line — subtle, naturalistic
  ctx.beginPath()
  ctx.moveTo(snoutX, snoutY + 6 * s)
  ctx.quadraticCurveTo(snoutX - 9 * s, snoutY + 14 * s, snoutX - 17 * s, snoutY + 11 * s)
  ctx.strokeStyle = 'rgba(18,10,4,0.55)'
  ctx.lineWidth = 1.5 * s
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(snoutX, snoutY + 6 * s)
  ctx.quadraticCurveTo(snoutX + 9 * s, snoutY + 14 * s, snoutX + 17 * s, snoutY + 11 * s)
  ctx.stroke()

  // ── Eyes — small, dark, realistic bear eyes ────────────────────────────────
  // Real bears: eyes are small, set slightly above midface, brown-black
  const pupilDx = Math.cos(angle) * 2.2 * s * dist
  const pupilDy = Math.sin(angle) * 2.2 * s * dist

  for (const [eox, eoy] of [[-21 * s, -16 * s], [21 * s, -16 * s]] as [number, number][]) {
    const eyeX = hx + eox + tiltX * 0.16
    const eyeY = hy + eoy + tiltY * 0.12

    // Dark fur socket (gives depth to the small eye)
    ctx.beginPath()
    ctx.ellipse(eyeX, eyeY, 10 * s, 9 * s, 0, 0, Math.PI * 2)
    ctx.fillStyle = '#080402'
    ctx.fill()

    // Eye globe — small, dark brown
    ctx.beginPath()
    ctx.arc(eyeX, eyeY, 6 * s, 0, Math.PI * 2)
    const eyeG = ctx.createRadialGradient(eyeX, eyeY, 0, eyeX, eyeY, 6 * s)
    eyeG.addColorStop(0, '#281808')
    eyeG.addColorStop(0.65, '#100804')
    eyeG.addColorStop(1, '#050302')
    ctx.fillStyle = eyeG
    ctx.fill()

    // Pupil
    ctx.beginPath()
    ctx.arc(eyeX + pupilDx * 0.55, eyeY + pupilDy * 0.55, 4.2 * s, 0, Math.PI * 2)
    ctx.fillStyle = '#020101'
    ctx.fill()

    // Single small catchlight — subtle, not cartoon-bright
    ctx.beginPath()
    ctx.arc(eyeX + 2 * s, eyeY - 2.2 * s, 1.6 * s, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.72)'
    ctx.fill()
  }
}

// ─── Main component ────────────────────────────────────────────────────────────
export function BearCardinalCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)
  const lastRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dprRef = { value: window.devicePixelRatio || 1 }

    function resize() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      dprRef.value = dpr
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (w === 0 || h === 0) return
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    function animate(ts: number) {
      if (!canvas || !ctx) return
      if (!lastRef.current) lastRef.current = ts
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05)
      lastRef.current = ts
      timeRef.current += dt

      const t = timeRef.current
      const cw = canvas.offsetWidth
      const ch = canvas.offsetHeight

      ctx.clearRect(0, 0, cw, ch)

      const bearScale = Math.min(cw / 300, ch / 220) * 0.92
      const bearCX = cw * 0.5
      const bearCY = ch * 0.54

      drawBear(ctx, bearCX, bearCY, bearScale, t, mouseRef.current.x, mouseRef.current.y)

      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}

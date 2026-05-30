import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation, useInView, useMotionValue, useSpring } from 'framer-motion'
import heroBgVideo from '../assets/hero.mp4'

import { ArrowRight, ChevronDown, Zap, Menu, X, Mail } from 'lucide-react'

const tickerItems = ['Web Design', 'SEO', 'Google Ads', 'Social Media', 'Email Marketing', 'Asheville, NC', 'Built to Convert']

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const easeStd = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

// ── Word-reveal variants — use transform string (hardware-accelerated) ────────
const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const wordReveal = {
  hidden: { opacity: 0, filter: 'blur(14px)' },
  show:   { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.85, ease } },
}

function Word({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.span
      variants={wordReveal}
      style={{ display: 'inline-block', color: color ?? 'inherit' }}
    >
      {children}
    </motion.span>
  )
}


// ── Fade helpers — transform strings = hardware-accelerated ──────────────────
const makeFadeUp = (delay: number) => ({
  hidden: { opacity: 0, transform: 'translateY(28px)' },
  show:   { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.8, delay, ease: easeStd } },
})
const makeFadeLeft = (delay: number) => ({
  hidden: { opacity: 0, transform: 'translateX(-18px)' },
  show:   { opacity: 1, transform: 'translateX(0px)', transition: { duration: 0.7, delay, ease: easeStd } },
})

const statsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 1.1 } },
}
const statItem = {
  hidden: { opacity: 0, filter: 'blur(6px)', transform: 'translateY(72px)' },
  show:   { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)', transition: { duration: 0.75, ease } },
}


const NAV_ITEMS = ['About', 'Services', 'Pricing', 'Contact']

export function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  // ── Parallax — video drifts opposite to cursor movement ──────────────────
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const parallaxX = useSpring(rawX, { stiffness: 42, damping: 20, mass: 0.7 })
  const parallaxY = useSpring(rawY, { stiffness: 42, damping: 20, mass: 0.7 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 768) return
    const { innerWidth: w, innerHeight: h } = window
    rawX.set(-(e.clientX / w - 0.5) * 135)
    rawY.set(-(e.clientY / h - 0.5) * 75)
  }

  // ── Magnetic CTA ─────────────────────────────────────────────────────────
  const magnetRef = useRef<HTMLAnchorElement>(null)
  const magX = useMotionValue(0)
  const magY = useMotionValue(0)
  const magXSpring = useSpring(magX, { stiffness: 280, damping: 24 })
  const magYSpring = useSpring(magY, { stiffness: 280, damping: 24 })

  const onMagMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = magnetRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    magX.set((e.clientX - (rect.left + rect.width  / 2)) * 0.38)
    magY.set((e.clientY - (rect.top  + rect.height / 2)) * 0.38)
  }
  const onMagLeave = () => { magX.set(0); magY.set(0) }

  // Set video opacity on mount — let the browser handle looping natively
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.style.opacity = '0.82'
  }, [])

  // Mobile gyroscope parallax — tiny shift when phone tilts
  useEffect(() => {
    if (window.innerWidth >= 768) return
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0  // left/right tilt
      const beta  = e.beta  ?? 0  // front/back tilt
      rawX.set(-(gamma / 90) * 14)
      rawY.set(-((beta - 40) / 90) * 10)
    }
    window.addEventListener('deviceorientation', handleOrientation, true)
    return () => window.removeEventListener('deviceorientation', handleOrientation, true)
  }, [rawX, rawY])

  const bodyRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(bodyRef, { once: false, amount: 0.2 })

  const headlineCtrl = useAnimation()
  const badgeCtrl    = useAnimation()
  const subtextCtrl  = useAnimation()
  const ctaCtrl      = useAnimation()
  const statsCtrl    = useAnimation()

  useEffect(() => {
    if (inView) {
      badgeCtrl.start('show')
      headlineCtrl.start('show')
      subtextCtrl.start('show')
      ctaCtrl.start('show')
      statsCtrl.start('show')
    } else {
      badgeCtrl.start('hidden')
      headlineCtrl.start('hidden')
      subtextCtrl.start('hidden')
      ctaCtrl.start('hidden')
      statsCtrl.start('hidden')
    }
  }, [inView])

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ background: '#050d1a' }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Video background — parallax tied to cursor ─────────────────────── */}
      <motion.video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0, x: parallaxX, y: parallaxY, scale: 1.14, filter: 'brightness(1.18)' }}
        src={heroBgVideo}
        autoPlay loop muted playsInline
      />

      {/* Left-heavy gradient — keeps text sharp, lets sky breathe on right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          background: [
            'linear-gradient(to right, rgba(5,13,26,0.82) 0%, rgba(5,13,26,0.58) 28%, rgba(5,13,26,0.22) 55%, rgba(5,13,26,0.03) 85%, transparent 100%)',
            'linear-gradient(to bottom, rgba(5,13,26,0.45) 0%, transparent 22%)',
          ].join(', '),
        }}
      />


      {/* Blue spotlight — upper left */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-[720px] h-[620px] opacity-[0.22]"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at 28% 36%, rgba(14,165,233,0.6) 0%, transparent 65%)',
        }}
      />

      {/* Blue glow — right edge */}
      <div
        className="pointer-events-none absolute top-1/4 right-0 w-[500px] h-[600px] opacity-[0.14]"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at 90% 50%, rgba(14,165,233,0.45) 0%, transparent 70%)',
        }}
      />

      {/* ── NAV — floating island, detached from edges ─────────────────────── */}
      <motion.nav
        variants={makeFadeUp(0)}
        initial="hidden"
        animate="show"
        className="relative flex items-center justify-between flex-shrink-0 mx-5 md:mx-10 mt-5 px-5 md:px-6 py-3 rounded-2xl"
        style={{
          zIndex: 30,
          background: 'rgba(5,13,26,0.72)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Logo */}
        <span
          className="text-white font-bold tracking-[0.25em] text-sm uppercase flex-shrink-0"
          style={{ fontFamily: 'Syncopate, sans-serif' }}
        >
          VALDRA<span className="text-[#0ea5e9]"> · </span>CO
        </span>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-9 text-[11px] font-medium tracking-widest uppercase text-slate-200">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Email + CTA */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="mailto:studio@valdraco.com"
            className="flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase text-slate-200 hover:text-[#0ea5e9] transition-colors duration-200"
          >
            <Mail size={11} />
            studio@valdraco.com
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase px-5 py-2.5 rounded-full border border-[#0ea5e9]/35 text-[#0ea5e9] hover:bg-[#0ea5e9]/10 active:scale-[0.97] transition-colors duration-200"
            style={{ transition: 'background-color 200ms, color 200ms, transform 150ms ease-out' }}
          >
            Start a Project <ArrowRight size={12} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 -mr-2 rounded-lg"
          style={{ transition: 'background-color 150ms ease-out' }}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(-8px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(-8px)' }}
            transition={{ duration: 0.2 }}
            className="md:hidden relative flex flex-col items-center gap-7 py-8 px-6 flex-shrink-0"
            style={{
              zIndex: 20,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(5,13,26,0.97)',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-200 text-sm font-medium tracking-[0.25em] uppercase hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="mailto:studio@valdraco.com"
              className="flex items-center gap-2 text-[#0ea5e9] text-xs font-medium tracking-widest"
              onClick={() => setMobileOpen(false)}
            >
              <Mail size={12} />
              studio@valdraco.com
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase px-6 py-3 rounded-full border border-[#0ea5e9]/40 text-[#0ea5e9] hover:bg-[#0ea5e9]/10 active:scale-[0.97] mt-2"
              style={{ transition: 'background-color 200ms, transform 150ms ease-out' }}
              onClick={() => setMobileOpen(false)}
            >
              Start a Project <ArrowRight size={13} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO BODY — two-column at lg ───────────────────────────────────── */}
      <div
        ref={bodyRef}
        className="relative flex-1 flex flex-col justify-center px-6 md:px-14 lg:px-20 pt-0 pb-12"
        style={{ zIndex: 20, position: 'relative', transform: 'translateY(-48px)' }}
      >
        <div className="w-full max-w-4xl">

          {/* ── Text content ───────────────────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Eyebrow badge */}
            <motion.div
              variants={makeFadeLeft(0.1)}
              initial="hidden"
              animate={badgeCtrl}
              className="flex items-center gap-3 mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0ea5e9]/28 bg-[#0ea5e9]/5">
                <Zap size={10} className="text-[#0ea5e9]" />
                <span className="text-[#0ea5e9] text-[10px] font-medium tracking-[0.22em] uppercase">
                  Web Design & Digital Marketing · Asheville, NC
                </span>
              </div>
            </motion.div>

            {/* ── Headline ───────────────────────────────────────────────── */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate={headlineCtrl}
              className="font-bold uppercase leading-[0.88] tracking-tight mb-8 text-white"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(4rem, 6.5vw, 9rem)',
              }}
            >
              <span className="block">
                <Word>We&nbsp;</Word>
                <Word>Build&nbsp;</Word>
                <Word>Brands</Word>
              </span>
              <span className="block">
                <Word>That&nbsp;</Word>
                <Word color="#0ea5e9">Convert.</Word>
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={makeFadeUp(0.6)}
              initial="hidden"
              animate={subtextCtrl}
              className="font-light leading-relaxed mb-10"
              style={{ fontSize: 'clamp(0.95rem, 1.9vw, 1.05rem)', maxWidth: '460px', color: 'rgba(226,232,240,0.96)' }}
            >
              Strategy, design, and code built for businesses that refuse to settle
              for average. One boutique team. One goal: your growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={makeFadeUp(0.74)}
              initial="hidden"
              animate={ctaCtrl}
              className="flex flex-wrap items-center gap-7 mb-0"
            >
              <motion.a
                ref={magnetRef}
                href="#contact"
                className="flex items-center gap-2.5 px-8 py-4 rounded-lg text-white font-semibold text-[11px] tracking-[0.18em] uppercase"
                whileTap={{ scale: 0.97 }}
                style={{
                  x: magXSpring,
                  y: magYSpring,
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  boxShadow: '0 0 36px rgba(14,165,233,0.32), 0 4px 20px rgba(0,0,0,0.3)',
                }}
                onMouseMove={onMagMove}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(14,165,233,0.65), 0 0 120px rgba(14,165,233,0.25), 0 4px 20px rgba(0,0,0,0.3)')}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 36px rgba(14,165,233,0.32), 0 4px 20px rgba(0,0,0,0.3)'
                  onMagLeave()
                }}
              >
                Start a Project <ArrowRight size={13} />
              </motion.a>

              <a
                href="#services"
                className="group flex items-center gap-1.5 text-white/50 font-medium text-[11px] tracking-[0.18em] uppercase hover:text-white transition-colors duration-300"
              >
                See Our Services
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </a>
            </motion.div>

          </div>

          {/* ── Metrics trust strip — below CTAs, horizontal on desktop ─────── */}
          <motion.div
            variants={statsContainer}
            initial="hidden"
            animate={statsCtrl}
            className="mt-32 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3"
          >
            {/* Response Time */}
            <motion.div variants={statItem} className="flex flex-col gap-1.5 py-5 sm:py-0 sm:pr-8 border-b border-white/[0.06] sm:border-b-0 sm:border-r sm:border-white/[0.08]">
              <span className="text-[9px] tracking-[0.32em] uppercase font-semibold" style={{ color: '#0ea5e9' }}>
                Response Time
              </span>
              <p className="font-light leading-snug" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)' }}>
                Within{' '}
                <strong style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.08em', color: 'white' }}>
                  24
                </strong>{' '}
                hours, guaranteed.
              </p>
            </motion.div>

            {/* Site Delivery */}
            <motion.div variants={statItem} className="flex flex-col gap-1.5 py-5 sm:py-0 sm:px-8 border-b border-white/[0.06] sm:border-b-0 sm:border-r sm:border-white/[0.08]">
              <span className="text-[9px] tracking-[0.32em] uppercase font-semibold" style={{ color: '#0ea5e9' }}>
                Site Delivery
              </span>
              <p className="font-light leading-snug" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)' }}>
                <strong style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.08em', color: 'white' }}>
                  5–14
                </strong>{' '}
                day builds, start to launch.
              </p>
            </motion.div>

            {/* Studio Status */}
            <motion.div variants={statItem} className="flex flex-col gap-1.5 py-5 sm:py-0 sm:pl-8">
              <span className="text-[9px] tracking-[0.32em] uppercase font-semibold" style={{ color: '#0ea5e9' }}>
                Studio Status
              </span>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                  style={{ background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.65)' }}
                />
                <span className="font-medium" style={{ color: '#4ade80', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.88rem' }}>
                  Available for new projects
                </span>
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: 'rgba(148,163,184,0.85)' }}>
                Asheville, NC
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom anchor bar ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative flex-shrink-0 flex items-center px-6 md:px-14 py-4"
        style={{
          zIndex: 20,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(5,13,26,0.45)',
        }}
      >
        {/* Left — scrolling marquee ticker */}
        <div
          className="overflow-hidden flex-1 mr-8 hidden sm:block"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          <motion.div
            className="flex items-center w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          >
            {[...tickerItems, ...tickerItems].map((s, i) => (
              <span key={i} className="flex items-center">
                <span
                  className="text-[9px] tracking-[0.25em] uppercase font-medium px-5 whitespace-nowrap"
                  style={{ color: 'rgba(100,116,139,0.58)' }}
                >
                  {s}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Center — scroll indicator */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0 mx-auto sm:mx-0">
          <span className="text-[8px] tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(100,116,139,0.4)' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronDown size={13} style={{ color: 'rgba(100,116,139,0.45)' }} />
          </motion.div>
        </div>

        {/* Right — location + year */}
        <div className="hidden sm:flex flex-1 justify-end">
          <span className="text-[9px] tracking-[0.25em] uppercase font-medium" style={{ color: 'rgba(100,116,139,0.6)' }}>
            Asheville, NC · 2026
          </span>
        </div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{ zIndex: 15, background: 'linear-gradient(to bottom, transparent 0%, rgba(5,13,26,0.5) 50%, #050d1a 100%)' }}
      />
    </section>
  )
}

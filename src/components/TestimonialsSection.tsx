import { useRef } from 'react'
import { motion } from 'framer-motion'

const reviews = [
  {
    initials: 'MR',
    name: 'M. Reynolds',
    business: 'Local Business Owner',
    text: "We went from having no real web presence to getting consistent inquiries through our site. Valdra actually took the time to understand our business before touching a single pixel. That made all the difference.",
    accent: '#0ea5e9',
  },
  {
    initials: 'SK',
    name: 'S. Kim',
    business: 'Western NC',
    text: "We'd worked with other agencies before and always felt like just another ticket in the queue. Valdra felt like a real partner from day one — fast communication, clean work, and they actually explained everything.",
    accent: '#f59e0b',
  },
  {
    initials: 'DT',
    name: 'D. Torres',
    business: 'Local Business Owner',
    text: "The site they built looks more professional than businesses ten times our size. We've had customers mention it specifically when they call. Worth every dollar.",
    accent: '#34d399',
  },
  {
    initials: 'LT',
    name: 'L. Thompson',
    business: 'Western NC',
    text: "I was skeptical — I'd been burned before. But they delivered exactly what was promised, on time, and made the whole process easy. My only regret is not doing it sooner.",
    accent: '#a78bfa',
  },
  {
    initials: 'JW',
    name: 'J. Wilson',
    business: 'Local Business Owner',
    text: "I don't have time to deal with tech stuff. Valdra handled everything top to bottom and kept me in the loop without drowning me in jargon. That's exactly what a small business owner needs.",
    accent: '#f59e0b',
  },
  {
    initials: 'AP',
    name: 'A. Patel',
    business: 'Asheville, NC',
    text: "Responsive, professional, and they genuinely care about results — not just delivering a file and disappearing. The ongoing support alone makes it worth it.",
    accent: '#0ea5e9',
  },
]

// ── Tilt card ─────────────────────────────────────────────────────────────────
function TiltCard({
  children, className, style, accentColor = '#0ea5e9',
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  accentColor?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onEnter = () => {
    const el = ref.current
    if (!el) return
    el.style.boxShadow = `0 0 0 1px ${accentColor}38, 0 0 28px ${accentColor}22, 0 12px 40px ${accentColor}14`
  }
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -6
    const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  6
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    el.style.boxShadow = 'none'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform', transition: 'transform 0.45s ease, box-shadow 0.3s ease' }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const [featured, ...rest] = reviews

  return (
    <section id="reviews" className="relative py-12 md:py-28 px-6 md:px-14 overflow-hidden" style={{ background: '#050d1a' }}>
      {/* Top separator */}
      <div className="absolute top-0 left-14 right-14 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)' }} />

      {/* Faint amber glow — top right */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[560px] h-[420px] opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse at 80% 10%, #f59e0b 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Header — left-aligned, eyebrow right ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(24px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-[#f59e0b] text-xs font-medium tracking-[0.3em] uppercase mb-4">Testimonials</p>
            <h2
              className="font-bold uppercase leading-none"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'white' }}
            >
              What Our<br />
              <span style={{ color: '#f59e0b' }}>Clients Say.</span>
            </h2>
          </div>
          <p className="text-slate-200 text-xs tracking-widest uppercase md:text-right md:max-w-[180px] leading-relaxed">
            Real businesses<br className="hidden md:block" /> right here in Western NC
          </p>
        </motion.div>

        {/* ── Featured testimonial — full width ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', transform: 'scale(0.9)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' }}
          viewport={{ once: false, amount: 0.15, margin: '0px 0px -180px 0px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <TiltCard
            accentColor={featured.accent}
            className="relative overflow-hidden cursor-default group"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '4px 24px 4px 24px',
              padding: 'clamp(32px, 5vw, 52px)',
            }}
          >
            {/* Giant decorative quote mark watermark */}
            <div
              className="absolute top-2 right-8 pointer-events-none select-none leading-none"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(10rem, 18vw, 15rem)',
                color: featured.accent,
                opacity: 0.055,
                lineHeight: 0.8,
              }}
            >
              "
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, s) => (
                <span key={s} style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
              ))}
            </div>

            {/* Quote — large editorial text */}
            <p
              className="relative z-10 italic leading-relaxed mb-8"
              style={{
                fontSize: 'clamp(1.05rem, 1.9vw, 1.35rem)',
                color: 'rgba(255,255,255,0.88)',
                maxWidth: '820px',
              }}
            >
              "{featured.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${featured.accent}30, ${featured.accent}10)`,
                  border: `1.5px solid ${featured.accent}40`,
                  color: featured.accent,
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                }}
              >
                {featured.initials}
              </div>
              <div>
                <div className="text-white font-semibold">{featured.name}</div>
                <div className="text-slate-200 text-xs mt-0.5">{featured.business}</div>
              </div>
            </div>

            {/* Hover accent bottom line */}
            <div
              className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100"
              style={{ background: `linear-gradient(90deg, transparent, ${featured.accent}55, transparent)`, transition: 'opacity 300ms ease' }}
            />
          </TiltCard>
        </motion.div>

        {/* ── Remaining 5 cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, filter: 'blur(10px)', transform: 'scale(0.88)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' }}
              viewport={{ once: false, amount: 0.15, margin: '0px 0px -180px 0px' }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`${i === 3 ? 'lg:col-span-2' : ''} ${i >= 2 ? 'hidden sm:block' : ''}`}
            >
              <TiltCard
                accentColor={review.accent}
                className="relative flex flex-col h-full cursor-default group"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '4px 20px 4px 20px',
                  padding: '32px',
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} style={{ color: '#f59e0b', fontSize: '13px' }}>★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-200 text-sm leading-relaxed italic flex-1 mb-6">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${review.accent}30, ${review.accent}10)`,
                      border: `1.5px solid ${review.accent}40`,
                      color: review.accent,
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: '0.9rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{review.name}</div>
                    <div className="text-slate-200 text-xs mt-0.5">{review.business}</div>
                  </div>
                </div>

                {/* Hover accent bottom line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${review.accent}55, transparent)`, transition: 'opacity 300ms ease' }}
                />
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

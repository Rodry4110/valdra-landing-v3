import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Zap, BarChart2, Shield, Phone, TrendingUp, Users } from 'lucide-react'

// ── Card data ─────────────────────────────────────────────────────────────────
const whyCards = [
  {
    num: '01',
    Icon: Zap,
    title: 'Results First',
    body: "We don't build pretty sites that don't convert. Every decision is backed by conversion data and business logic — no decoration for its own sake.",
    accent: '#f59e0b',
    wide: false,
  },
  {
    num: '02',
    Icon: BarChart2,
    title: 'Fast Turnaround',
    body: "Most agencies take 6–8 weeks. We deliver polished, conversion-ready websites in 5–14 days — without cutting corners.",
    accent: '#0ea5e9',
    wide: true,   // spans 2 cols
  },
  {
    num: '03',
    Icon: Shield,
    title: 'No Hidden Fees',
    body: "What we quote is what you pay. Any extras are listed clearly before you commit — no surprise invoices, no buried fees, ever.",
    accent: '#34d399',
    wide: true,
  },
  {
    num: '04',
    Icon: Phone,
    title: 'Real Support',
    body: "Call or text us and a real human answers — same day. We don't hide behind support tickets. When something breaks, we fix it fast.",
    accent: '#a78bfa',
    wide: false,
  },
  {
    num: '05',
    Icon: TrendingUp,
    title: 'Marketing Built In',
    body: "Other agencies build a site and leave. We build AND market your business — social, SEO, ads — all under one roof, from day one.",
    accent: '#f59e0b',
    wide: false,
  },
  {
    num: '06',
    Icon: Users,
    title: 'Built to Grow With You',
    body: "Boutique means real relationships, not ticket queues. We stay invested long after launch day — your success is our reputation.",
    accent: '#0ea5e9',
    wide: true,
  },
]

const tableRows = [
  { feature: 'Turnaround Time',              valdra: '5–14 Days',   agency: '6–8 Weeks',  freelancer: '2–4 Weeks'   },
  { feature: 'Monthly Marketing Included',   valdra: 'Add-On Plan', agency: 'Extra Cost', freelancer: 'Not Offered' },
  { feature: '24/7 Security & Backups',      valdra: 'Yes',         agency: 'Extra Cost', freelancer: 'Rarely'      },
  { feature: 'Real Human Support',           valdra: 'Same Day',    agency: '48–72 Hours',freelancer: '1–3 Days'    },
  { feature: 'Google Ads Management',        valdra: 'Included',    agency: 'Extra',      freelancer: 'Not Offered' },
  { feature: 'Monthly Performance Reports',  valdra: 'Yes',         agency: 'Sometimes',  freelancer: 'No'          },
  { feature: 'Transparent Pricing',          valdra: 'Upfront',     agency: 'Hidden Fees',freelancer: 'Varies'      },
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
export function WhyUsSection() {
  const [showAll, setShowAll] = useState(false)
  return (
    <section id="why-us" className="relative py-12 md:py-28 px-6 md:px-14 overflow-hidden" style={{ background: '#050d1a' }}>
      <div className="absolute top-0 left-14 right-14 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)' }} />

      {/* Faint blue glow — bottom right */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[500px] opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse at 80% 80%, #0ea5e9 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Header — left-aligned, eyebrow right ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(24px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16"
        >
          <div>
            <p className="text-[#0ea5e9] text-xs font-medium tracking-[0.3em] uppercase mb-4">The Valdra Difference</p>
            <h2
              className="font-bold uppercase leading-none"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'white' }}
            >
              Why Clients<br />
              <span style={{ color: '#0ea5e9' }}>Choose Us.</span>
            </h2>
          </div>
          <p className="text-slate-300 text-xs tracking-widest uppercase md:text-right md:max-w-[180px] leading-relaxed">
            Six reasons<br className="hidden md:block" /> that make the difference
          </p>
        </motion.div>

        {/* ── Bento grid — staircase [2·1] / [1·2] / [2·1] ─────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {whyCards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, transform: `translateX(${i % 2 === 0 ? '-52px' : '52px'})` }}
              whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: false, amount: 0.15, margin: '0px 0px -180px 0px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`${card.wide ? 'md:col-span-2' : 'md:col-span-1'} ${i >= 3 && !showAll ? 'hidden md:block' : ''}`}
            >
              <TiltCard
                accentColor={card.accent}
                className="relative h-full overflow-hidden cursor-default group"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '4px 20px 4px 20px',
                  padding: card.wide ? '36px 40px' : '32px 30px',
                  minHeight: card.wide ? '210px' : '200px',
                }}
              >
                {/* Background number watermark */}
                <div
                  className="absolute right-5 bottom-0 font-bold leading-none pointer-events-none select-none"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: 'clamp(6rem, 10vw, 9rem)',
                    color: card.accent,
                    opacity: 0.055,
                    lineHeight: 0.85,
                  }}
                >
                  {card.num}
                </div>

                {/* Icon chip */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                  style={{ background: `${card.accent}18`, border: `1px solid ${card.accent}30` }}
                >
                  <card.Icon size={15} style={{ color: card.accent }} />
                </div>

                {/* Title */}
                <h3
                  className="text-white font-bold uppercase tracking-wide mb-3"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: card.wide ? '1.75rem' : '1.5rem', letterSpacing: '0.05em' }}
                >
                  {card.title}
                </h3>

                {/* Featured metric for Fast Turnaround */}
                {card.title === 'Fast Turnaround' && (
                  <div className="flex items-baseline gap-2 mb-3">
                    <span
                      style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', lineHeight: 1, color: card.accent }}
                    >
                      5–14
                    </span>
                    <span className="text-slate-300 text-[11px] tracking-widest uppercase">Day Delivery</span>
                  </div>
                )}

                {/* Body */}
                <p className="text-slate-300 text-sm leading-relaxed relative z-10" style={{ maxWidth: card.wide ? '520px' : undefined }}>
                  {card.body}
                </p>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${card.accent}55, transparent)`, transition: 'opacity 300ms ease' }}
                />
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Mobile see more toggle */}
        <div className="flex justify-center mt-6 md:hidden">
          <button
            onClick={() => setShowAll(v => !v)}
            className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold px-6 py-3 rounded-full"
            style={{ color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.3)', background: 'rgba(14,165,233,0.06)' }}
          >
            {showAll ? 'Show Less ↑' : 'See All Reasons ↓'}
          </button>
        </div>

        {/* ── Comparison table ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(32px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="hidden md:block rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Table header */}
          <div
            className="grid text-xs font-bold tracking-[0.15em] uppercase"
            style={{
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              padding: '18px 32px',
              background: 'rgba(14,165,233,0.07)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            <div>Feature</div>
            <div className="text-center" style={{ color: '#0ea5e9' }}>Valdra Co.</div>
            <div className="text-center">Agency</div>
            <div className="text-center">Freelancer</div>
          </div>

          {tableRows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, transform: 'translateX(-10px)' }}
              whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="grid items-center hover:bg-white/[0.02]"
              style={{
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                padding: '20px 32px',
                borderBottom: i < tableRows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'background-color 150ms ease',
              }}
            >
              <div className="text-slate-300 text-sm font-medium">{row.feature}</div>

              <div className="flex items-center justify-center gap-1.5">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}
                >
                  <Check size={10} style={{ color: '#34d399' }} />
                </span>
                <span className="text-xs font-semibold" style={{ color: '#34d399' }}>{row.valdra}</span>
              </div>

              <div className="flex items-center justify-center gap-1.5">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  <X size={9} style={{ color: '#ef4444' }} />
                </span>
                <span className="text-xs text-slate-300">{row.agency}</span>
              </div>

              <div className="flex items-center justify-center gap-1.5">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  <X size={9} style={{ color: '#ef4444' }} />
                </span>
                <span className="text-xs text-slate-300">{row.freelancer}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

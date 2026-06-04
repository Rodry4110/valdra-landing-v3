import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Lock, Server, MapPin, Boxes, CalendarCheck } from 'lucide-react'

type Plan = {
  tier: string
  name: string
  desc: string
  price: string
  period: string
  setup?: string             // small one-time setup fee line under the price
  accent: string
  featured: boolean
  ownership?: boolean        // shows the "you own it" lock badge
  note?: string              // small badge, e.g. "We host & manage · Cancel anytime"
  fine?: string              // small print under features (transparency)
  upsells?: string[]
  features: string[]
  visibleCount?: number      // how many features show before "See everything"
}

// ── One-time builds (you own it) ───────────────────────────────────────────────
const ownPlans: Plan[] = [
  {
    tier: 'Tier 1',
    name: 'Base Website',
    desc: 'A clean, fast, professional website that turns visitors into customers.',
    price: '$799',
    period: 'one-time',
    accent: '#0ea5e9',
    featured: false,
    ownership: true,
    features: [
      'Custom-Built for Your Brand',
      '5-Page Custom Design',
      'Mobile Responsive',
      'Contact Form + Maps',
      'Basic Scroll Animations',
      'Fast Loading Speed',
      'Basic SEO Setup',
      '2 Rounds of Revisions',
    ],
  },
  {
    tier: 'Tier 2',
    name: 'Premium Website',
    desc: 'A fully custom, high-performance website built to stand out, rank higher, and convert more.',
    price: '$1,499',
    period: 'one-time',
    accent: '#f59e0b',
    featured: true,
    ownership: true,
    features: [
      'Everything in Base',
      'Fully Tailored to Your Industry',
      '3D Animations + Scroll Effects',
      'Advanced SEO + Schema',
      'Up to 10 Pages',
      '5 Rounds of Revisions',
      'Priority Support',
    ],
  },
]

// ── Monthly, hosted & managed by Valdra ────────────────────────────────────────
const hostedPlans: Plan[] = [
  {
    tier: 'Monthly',
    name: 'Hosted Website',
    desc: "Get online for a low one-time setup plus a small monthly — we build, host, and maintain everything. Perfect if you'd rather skip a big lump sum upfront.",
    price: '$149',
    period: '/month',
    setup: '+ $199 one-time setup fee',
    accent: '#34d399',
    featured: false,
    note: 'We Host & Manage · Cancel Anytime',
    fine: 'Site is hosted & maintained by Valdra. If you cancel, the website and its ownership remain with Valdra.',
    features: [
      'Custom-Built for Your Brand',
      'Hosting Included — Fast & Secure',
      'Mobile Responsive',
      'Unlimited Content Updates',
      'Ongoing Support Included',
      'Basic SEO Setup',
      'Low Upfront Cost — Just $199 to Start',
    ],
  },
  {
    tier: 'Monthly',
    name: 'Digital Marketing',
    desc: 'We run your marketing, bring you leads, and prove it with real data every month. Ad spend billed separately.',
    price: '$1,499',
    period: '/month',
    accent: '#a78bfa',
    featured: false,
    features: [
      'Social Media Management',
      '12 Posts/Month (Instagram + Facebook)',
      'Google Ads Management',
      'Google Business Management',
      'Monthly Performance Report',
      'SEO Optimization',
      'Email Marketing (4x/mo)',
      'Lead Tracking Dashboard',
    ],
  },
]

const addonFeatures = [
  'Nightly Security Updates',
  'Daily Backup Protection',
  'Speed Optimization',
  'Unlimited Content Updates',
  '24/7 Uptime Monitoring',
  'Emergency Fix Guarantee',
  'Dedicated Support Line',
]

// ── One-time à la carte add-ons (enhance any site) ─────────────────────────────
type Addon = {
  name: string
  price: string
  desc: string
  note?: string
  accent: string
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
}

const oneTimeAddons: Addon[] = [
  {
    name: 'Google Business Setup',
    price: '$149',
    desc: 'Get found on Google Maps & Search — full profile setup, categories, photos, and local optimization.',
    accent: '#0ea5e9',
    Icon: MapPin,
  },
  {
    name: '3D Animations & Effects',
    price: '$249',
    desc: 'Cinematic 3D and scroll-driven motion that makes your site stand out from the crowd.',
    note: 'For Base sites · already included in Premium',
    accent: '#f59e0b',
    Icon: Boxes,
  },
  {
    name: 'Online Booking & Reminders',
    price: '$249',
    desc: 'Customers book right from your site. You get a text on every booking; clients get auto-reminders that cut no-shows.',
    accent: '#34d399',
    Icon: CalendarCheck,
  },
]

// ── Tilt card ─────────────────────────────────────────────────────────────────
function TiltCard({ children, className, style, accentColor = '#0ea5e9' }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; accentColor?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  function onMouseEnter() {
    const card = cardRef.current
    if (!card) return
    card.style.boxShadow = `0 0 0 1px ${accentColor}38, 0 0 22px ${accentColor}28, 0 8px 36px ${accentColor}16`
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`
  }

  function onMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    card.style.boxShadow = 'none'
  }

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'transform 0.5s ease, box-shadow 0.35s ease',
      }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

// ── Group divider label ────────────────────────────────────────────────────────
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14))' }} />
      <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-slate-200 whitespace-nowrap">
        {children}
      </span>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.14), transparent)' }} />
    </div>
  )
}

// ── Single plan card (compact → click to expand) ───────────────────────────────
function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const [open, setOpen] = useState(false)

  const Row = (f: string) => (
    <div key={f} className="flex items-center gap-3 py-2.5 border-b border-white/[0.06] text-sm text-slate-200">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: `${plan.accent}20`, border: `1px solid ${plan.accent}40` }}
      >
        <Check size={10} style={{ color: plan.accent }} />
      </span>
      {f}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(56px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={plan.featured ? 'md:-mt-3' : ''}
    >
      <TiltCard
        accentColor={plan.accent}
        className="relative h-full flex flex-col"
        style={{
          background: plan.featured
            ? 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(14,165,233,0.04) 100%)'
            : 'rgba(255,255,255,0.025)',
          border: plan.featured ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.07)',
          borderRadius: '4px 20px 4px 20px',
          padding: plan.featured ? '40px 32px' : '34px 30px',
          boxShadow: plan.featured ? '0 0 40px rgba(245,158,11,0.12)' : 'none',
        }}
      >
        {/* Most Popular badge */}
        {plan.featured && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span
              className="text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#050d1a' }}
            >
              Most Popular
            </span>
          </div>
        )}

        {/* ── Compact header (always visible · click to toggle) ──────────── */}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="w-full text-left cursor-pointer group"
          aria-expanded={open}
        >
          {/* Tier label */}
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: plan.accent }}>
            {plan.tier}
          </p>

          {/* Ownership / hosting badge */}
          {plan.ownership && (
            <div
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full mb-3 w-fit"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#e2e8f0' }}
            >
              <Lock size={10} /> One-Time · You Own It
            </div>
          )}
          {plan.note && (
            <div
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full mb-3 w-fit"
              style={{ background: `${plan.accent}18`, border: `1px solid ${plan.accent}35`, color: plan.accent }}
            >
              <Server size={10} /> {plan.note}
            </div>
          )}

          {/* Name */}
          <h3
            className="text-white font-bold mb-2"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem', letterSpacing: '0.05em' }}
          >
            {plan.name}
          </h3>

          {/* Price */}
          <div className={plan.setup ? 'mb-1' : 'mb-4'}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', color: plan.accent, fontWeight: 'bold' }}>
              {plan.price}
            </span>
            <span className="text-slate-200 text-base ml-1">{plan.period}</span>
          </div>
          {plan.setup && (
            <p className="text-slate-300 text-xs font-semibold tracking-wide mb-4">{plan.setup}</p>
          )}

          {/* Expand affordance */}
          <div
            className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 transition group-hover:brightness-125"
            style={{ background: `${plan.accent}10`, border: `1px solid ${plan.accent}25` }}
          >
            <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: plan.accent }}>
              {open ? 'Hide details' : 'View plan details'}
            </span>
            <ChevronDown
              size={15}
              style={{ color: plan.accent, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 800ms cubic-bezier(0.22,1,0.36,1)' }}
            />
          </div>
        </button>

        {/* ── Expanded body (features + CTA) ─────────────────────────────── */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                height: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.35, ease: 'easeOut' },
              }}
              style={{ overflow: 'hidden', willChange: 'height' }}
            >
              <div className="pt-5 flex flex-col">
                {/* Description */}
                <p className="text-slate-200 text-sm leading-relaxed mb-5">{plan.desc}</p>

                {/* Features */}
                <div className="flex flex-col mb-4">
                  {plan.features.map(Row)}
                </div>

                {/* Transparency fine print */}
                {plan.fine && (
                  <p className="text-slate-400 text-[11px] leading-relaxed mb-5">{plan.fine}</p>
                )}

                {/* Upsell chips */}
                {plan.upsells && (
                  <div className="flex flex-col gap-2 mb-5">
                    {plan.upsells.map((u) => (
                      <div
                        key={u}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs tracking-wide"
                        style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.12)', color: 'rgba(14,165,233,0.85)' }}
                      >
                        {u}
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold tracking-widest uppercase active:scale-[0.97]"
                  style={{
                    border: plan.featured ? 'none' : `1.5px solid ${plan.accent}50`,
                    color: plan.featured ? '#050d1a' : plan.accent,
                    background: plan.featured ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
                    transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease, transform 150ms ease-out',
                  }}
                  onMouseEnter={(e) => {
                    if (!plan.featured) {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = plan.accent
                      el.style.color = '#050d1a'
                      el.style.borderColor = 'transparent'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.featured) {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = 'transparent'
                      el.style.color = plan.accent
                      el.style.borderColor = `${plan.accent}50`
                    }
                  }}
                >
                  Get Started <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TiltCard>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function PricingSection() {
  return (
    <section id="pricing" className="relative py-12 md:py-28 px-6 md:px-14 overflow-hidden" style={{ background: '#050d1a' }}>
      {/* Top separator */}
      <div className="absolute top-0 left-14 right-14 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)' }} />

      {/* Faint amber glow — center */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-[0.04]"
        style={{ background: 'radial-gradient(ellipse, #f59e0b 0%, transparent 65%)' }}
      />

      <div className="max-w-5xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(24px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-[#0ea5e9] text-xs font-medium tracking-[0.3em] uppercase mb-4">Our Plans</p>
            <h2
              className="font-bold uppercase leading-none"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'white' }}
            >
              Full-Stack<br />
              <span style={{ color: '#f59e0b' }}>Digital Solutions.</span>
            </h2>
          </div>
          <p className="text-slate-200 text-xs tracking-widest uppercase md:text-right md:max-w-[180px] leading-relaxed">
            Everything you need<br className="hidden md:block" /> under one roof
          </p>
        </motion.div>

        {/* ── Group 1 — Own it forever ───────────────────────────────────── */}
        <GroupLabel>Own It Forever · One-Time</GroupLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mb-14">
          {ownPlans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* ── Group 2 — Hosted & managed ─────────────────────────────────── */}
        <GroupLabel>Hosted & Managed · Monthly</GroupLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mb-4">
          {hostedPlans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* ── Group 3 — One-time add-ons ─────────────────────────────────── */}
        <GroupLabel>Add-Ons · Enhance Any Site</GroupLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch mb-14">
          {oneTimeAddons.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, transform: 'translateY(48px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              viewport={{ once: false, margin: '0px 0px -80px 0px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <TiltCard
                accentColor={a.accent}
                className="h-full"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '4px 20px 4px 20px',
                  padding: '28px 24px',
                }}
              >
                <div className="flex flex-col h-full">
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${a.accent}18`, border: `1px solid ${a.accent}35` }}
                  >
                    <a.Icon size={20} style={{ color: a.accent }} />
                  </span>
                  <h3
                    className="text-white font-bold mb-1"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.35rem', letterSpacing: '0.04em' }}
                  >
                    {a.name}
                  </h3>
                  <p className="mb-3">
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.9rem', color: a.accent, fontWeight: 'bold' }}>
                      {a.price}
                    </span>
                    <span className="text-slate-300 text-sm ml-1">one-time</span>
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3 flex-1">{a.desc}</p>
                  {a.note && <p className="text-slate-400 text-[11px] tracking-wide mb-4">{a.note}</p>}
                  <a
                    href="#contact"
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition hover:brightness-150"
                    style={{ background: `${a.accent}12`, border: `1px solid ${a.accent}30`, color: a.accent }}
                  >
                    Add to Plan <ArrowRight size={13} />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* ── Add-on card — full-width horizontal (ongoing care) ─────────── */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(64px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: false, margin: '0px 0px -180px 0px' }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          <TiltCard
            accentColor="#0ea5e9"
            className="relative cursor-default p-7 md:py-9 md:px-10"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.07), rgba(245,158,11,0.03))',
              border: '1px solid rgba(14,165,233,0.18)',
              borderRadius: '4px 20px 4px 20px',
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">

              {/* Left — identity */}
              <div className="flex-shrink-0 lg:w-52">
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full inline-block mb-4"
                  style={{ background: 'rgba(14,165,233,0.15)', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.25)' }}
                >
                  Add-On
                </span>
                <h3
                  className="text-white font-bold mb-1"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem', letterSpacing: '0.05em' }}
                >
                  Priority Care Plan
                </h3>
                <p className="mb-1">
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.2rem', color: '#0ea5e9', fontWeight: 'bold' }}>$299</span>
                  <span className="text-slate-200 text-sm ml-1">/month</span>
                </p>
                <p className="text-slate-200 text-xs tracking-wide">For owned sites · Cancel anytime</p>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px self-stretch" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* Middle — features */}
              <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0">
                {addonFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 py-2.5 border-b border-white/[0.05] text-sm text-slate-200">
                    <Check size={11} style={{ color: '#0ea5e9', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="hidden lg:block w-px self-stretch" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* Right — CTA */}
              <div className="flex-shrink-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-widest uppercase hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
                    color: 'white',
                    boxShadow: '0 0 22px rgba(14,165,233,0.20)',
                    transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1)',
                  }}
                >
                  Add to Any Plan <ArrowRight size={14} />
                </a>
              </div>

            </div>
          </TiltCard>
        </motion.div>

      </div>
    </section>
  )
}

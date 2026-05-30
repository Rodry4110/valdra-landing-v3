import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight } from 'lucide-react'

const values = [
  {
    num: '01',
    title: 'Built Different',
    body: "We skip the templates. Every project starts from your brand's core and builds outward — strategy first, pixels second.",
    accent: '#0ea5e9',
  },
  {
    num: '02',
    title: 'Performance First',
    body: "Design that converts. Every element earns its place by moving the needle — no decoration for decoration's sake.",
    accent: '#f59e0b',
  },
  {
    num: '03',
    title: 'The Long Game',
    body: 'Boutique service means real relationships, not ticket queues. We grow alongside the businesses we build for.',
    accent: '#0ea5e9',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, transform: 'translateY(28px)' },
  whileInView: { opacity: 1, transform: 'translateY(0px)' },
  viewport: { once: false, margin: '-60px' },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
})

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-14 md:py-32 overflow-hidden"
      style={{ background: '#050d1a' }}
    >
      {/* Accent glow — top left */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
        }}
      />

      {/* Topographic line grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,165,233,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 md:px-14">

        {/* ── TOP ROW ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start mb-10 md:mb-24">

          {/* LEFT — decorative column */}
          <motion.div
            {...fadeUp(0)}
            className="lg:w-[38%] flex-shrink-0"
          >
            <p className="text-[#0ea5e9] text-xs font-medium tracking-[0.3em] uppercase mb-8">
              About Valdra
            </p>

            {/* Giant watermark letters */}
            <div
              className="font-bold leading-none select-none"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(7rem, 16vw, 14rem)',
                color: '#0ea5e9',
                opacity: 0.055,
                letterSpacing: '-0.02em',
                lineHeight: 0.85,
              }}
            >
              VC
            </div>

            {/* Location + year */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <MapPin size={13} className="text-[#f59e0b] flex-shrink-0" />
                <span>Asheville, Western NC</span>
              </div>
              <div className="text-slate-300 text-[11px] tracking-[0.3em] uppercase pl-5">
                Est. 2026 · Boutique Agency
              </div>
            </div>

            {/* Thin accent rule */}
            <div
              className="mt-10 h-[1px] w-16"
              style={{ background: 'linear-gradient(90deg, #f59e0b, transparent)' }}
            />
          </motion.div>

          {/* RIGHT — story copy */}
          <div className="flex-1 pt-0 lg:pt-16">
            <motion.h2
              {...fadeUp(0.1)}
              className="font-bold uppercase leading-[0.9] tracking-tight mb-8"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
              }}
            >
              <span style={{ color: 'white' }}>We Build for</span>
              <br />
              <span style={{ color: '#f59e0b' }}>Businesses That</span>
              <br />
              <span style={{ color: 'white' }}>Refuse to Blend In</span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.2)}
              className="text-slate-300 leading-relaxed mb-5 max-w-lg"
              style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
            >
              Valdra is a boutique digital agency rooted in the mountains of Western
              North Carolina. We partner with ambitious founders, local institutions,
              and growth-stage brands to create digital presences that demand
              attention and drive measurable results.
            </motion.p>

            <motion.p
              {...fadeUp(0.28)}
              className="text-slate-300 leading-relaxed max-w-lg"
              style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
            >
              No cookie-cutter templates. No offshore handoffs. Strategy, design,
              and development are woven together in-house from day one — so your
              project ships faster and holds together longer.
            </motion.p>

            <motion.a
              {...fadeUp(0.36)}
              href="#contact"
              className="inline-flex items-center gap-2 mt-10 text-[#0ea5e9] text-xs font-medium tracking-[0.25em] uppercase group"
            >
              Work With Us
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </motion.a>
          </div>
        </div>

        {/* ── BOTTOM ROW — Values ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-t border-white/[0.06] pt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
            {values.map(({ num, title, body, accent }, i) => (
              <motion.div
                key={num}
                {...fadeUp(0.1 + i * 0.1)}
                className="group"
              >
                {/* Number */}
                <div
                  className="text-xs font-mono tracking-[0.2em] mb-5"
                  style={{ color: accent, opacity: 0.7 }}
                >
                  {num}
                </div>

                {/* Thin top rule that changes color on hover */}
                <div
                  className="h-[1px] w-10 mb-5 group-hover:w-16"
                  style={{ background: accent, transition: 'width 500ms ease' }}
                />

                <h3
                  className="text-white font-bold uppercase tracking-wide mb-3"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1.6rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

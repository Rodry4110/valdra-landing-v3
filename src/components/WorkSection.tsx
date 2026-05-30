import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    number: '01',
    name: 'Web Design & Development',
    category: 'Custom · Conversion-Focused',
    description:
      'Fast, mobile-first websites built to convert visitors into leads. Every layout decision is made with your business goal in mind — not just aesthetics.',
    tags: ['Strategy', 'Design', 'Code'],
    accent: '#0ea5e9',
    metric: '5–14 Days',
    metricLabel: 'Delivered',
  },
  {
    number: '02',
    name: 'Search Engine Optimization',
    category: 'Local & National SEO',
    description:
      'Get found by customers who are already searching for what you offer. We handle keyword research, on-page structure, and content strategy from the ground up.',
    tags: ['SEO', 'Local Search', 'Content'],
    accent: '#34d399',
    metric: 'Long-Term',
    metricLabel: 'Organic Growth',
  },
  {
    number: '03',
    name: 'Paid Advertising',
    category: 'Google Ads',
    description:
      'Targeted Google Ads campaigns built to put your business in front of people already searching for what you offer. Every dollar is tracked, every campaign is optimized — no wasted budget.',
    tags: ['Google Ads', 'Social', 'Analytics'],
    accent: '#f59e0b',
    metric: 'Data-Led',
    metricLabel: 'Ad Strategy',
  },
  {
    number: '04',
    name: 'Social Media Management',
    category: 'Instagram · Facebook',
    description:
      'Consistent, on-brand content that builds your audience and keeps your business top of mind in your community. We create, schedule, and manage — you grow.',
    tags: ['Brand', 'Content', 'Social'],
    accent: '#a78bfa',
    metric: 'Full-Service',
    metricLabel: 'Management',
  },
]

export function WorkSection() {
  return (
    <section id="services" className="relative py-12 md:py-28 px-6 md:px-14" style={{ background: '#050d1a' }}>
      <div className="absolute top-0 left-14 right-14 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(24px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-[#0ea5e9] text-xs font-medium tracking-[0.3em] uppercase mb-4">What We Do</p>
          <h2
            className="font-bold uppercase leading-none"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white' }}
          >
            Services Built<br />
            <span style={{ color: '#0ea5e9' }}>For Growth.</span>
          </h2>
          <p className="text-slate-200 text-sm mt-5 max-w-lg leading-relaxed">
            We focus on what actually moves the needle for small and mid-size businesses.
            No fluff — just strategy, execution, and results you can see.
          </p>
        </motion.div>

        {/* Service list */}
        <div className="flex flex-col divide-y divide-white/[0.05]">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, transform: 'translateX(-20px)' }}
              whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col md:flex-row md:items-center gap-6 py-8 cursor-default"
            >
              {/* Number */}
              <span
                className="text-5xl font-bold leading-none flex-shrink-0 w-16 transition-colors duration-300"
                style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'rgba(255,255,255,0.06)' }}
              >
                {service.number}
              </span>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start gap-3 mb-2">
                  <h3
                    className="text-white font-semibold text-lg tracking-wide transition-colors duration-300"
                    style={{ color: 'white' }}
                  >
                    {service.name}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full text-slate-200 border border-white/[0.08] flex-shrink-0 mt-0.5">
                    {service.category}
                  </span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed max-w-xl">{service.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {service.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                      style={{ color: service.accent, background: `${service.accent}15`, border: `1px solid ${service.accent}25` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right metric */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <div
                    className="font-bold text-2xl leading-none"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', color: service.accent }}
                  >
                    {service.metric}
                  </div>
                  <div className="text-slate-200 text-xs tracking-widest uppercase mt-1">{service.metricLabel}</div>
                </div>
                <div
                  className="w-9 h-9 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                  style={{ borderColor: `${service.accent}40`, color: service.accent, transition: 'opacity 300ms ease, transform 300ms cubic-bezier(0.23,1,0.32,1)' }}
                >
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(16px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-14 pt-10 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-slate-200 text-sm max-w-md">
            Not sure which service fits your business? Let's talk through it — no commitment required.
          </p>
          <a
            href="#contact"
            className="flex items-center gap-3 px-10 py-4 rounded-full text-sm font-medium tracking-widest uppercase hover:scale-[1.03] active:scale-[0.97] flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              color: 'white',
              boxShadow: '0 0 22px rgba(14,165,233,0.20)',
              transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1)',
            }}
          >
            Get a Free Quote <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

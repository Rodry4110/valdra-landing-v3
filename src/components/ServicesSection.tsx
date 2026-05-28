import { motion } from 'framer-motion'
import { Code2, Palette, TrendingUp, Smartphone, BarChart3, Zap } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: 'Brand & Identity',
    description: 'Logos, visual systems, and brand voices that make you impossible to ignore.',
    accent: '#f59e0b',
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Blazing-fast, hand-coded websites and web apps built to convert and scale.',
    accent: '#0ea5e9',
  },
  {
    icon: Smartphone,
    title: 'UI / UX Design',
    description: 'Interfaces that feel intuitive, look premium, and guide users to action.',
    accent: '#a78bfa',
  },
  {
    icon: TrendingUp,
    title: 'Growth Marketing',
    description: 'SEO, paid ads, and conversion optimization that compound over time.',
    accent: '#34d399',
  },
  {
    icon: BarChart3,
    title: 'Analytics & CRO',
    description: 'Data dashboards and A/B testing to squeeze more revenue from existing traffic.',
    accent: '#f472b6',
  },
  {
    icon: Zap,
    title: 'Automation & AI',
    description: 'Workflows, chatbots, and integrations that save hours and cut overhead.',
    accent: '#fb923c',
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-20 md:py-28 px-6 md:px-14" style={{ background: '#050d1a' }}>
      {/* Subtle separator line */}
      <div className="absolute top-0 left-14 right-14 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-[#0ea5e9] text-xs font-medium tracking-[0.3em] uppercase mb-4">What We Do</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-bold uppercase leading-none"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white' }}
            >
              Full-Stack<br />
              <span className="grad-text">Digital Agency</span>
            </h2>
            <p className="text-slate-500 max-w-xs text-sm leading-relaxed md:text-right">
              One team. Every service you need to build, grow, and dominate online.
            </p>
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-3xl overflow-hidden border border-white/[0.05]">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-8 bg-[#050d1a] hover:bg-[#071220] transition-colors duration-300 cursor-default"
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}30` }}
                >
                  <Icon size={18} style={{ color: service.accent }} />
                </div>

                {/* Text */}
                <h3 className="text-white font-semibold text-base mb-2 tracking-wide">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.accent}60, transparent)` }}
                />

                {/* Corner number */}
                <div className="absolute top-6 right-7 text-white/[0.06] font-bold text-4xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  0{i + 1}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

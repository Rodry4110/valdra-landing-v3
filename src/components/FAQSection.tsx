import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

// ── FAQ data ──────────────────────────────────────────────────────────────────
// Written to answer the real questions prospects (and AI assistants) ask about
// local web design & digital marketing — doubles as on-page SEO + AI-visibility content.
export const faqs = [
  {
    q: 'How do I choose the right web design agency?',
    a: "Look for an agency that focuses on results, not just looks — a site should turn visitors into customers, not just sit there. Check that you'll own your website, that pricing is upfront with no hidden fees, and that you get real human support. At Valdra Co. we build conversion-focused sites, quote transparently, and answer the phone the same day.",
  },
  {
    q: 'How much does a website cost, and do I own it?',
    a: 'Our one-time websites start at $799 for a Base site and $1,499 for a Premium build — and you own it forever. Prefer a low upfront cost? Our Hosted plan is $149/month plus a $199 setup, where we build, host, and maintain everything for you. Every price is listed clearly before you commit.',
  },
  {
    q: 'How long does it take to build my website?',
    a: 'Most agencies take 6–8 weeks. We deliver polished, conversion-ready websites in 5–14 days without cutting corners — because we know your business needs to be online and making money sooner rather than later.',
  },
  {
    q: 'Can a website actually help my local business get more customers?',
    a: 'Yes. A fast, well-designed website builds trust, shows up on Google, and guides visitors toward booking or contacting you. The goal isn’t a pretty page — it’s more calls, bookings, and sales. We design every section around converting visitors into paying customers.',
  },
  {
    q: 'What are the benefits of digital marketing for a local business?',
    a: 'Digital marketing keeps you top-of-mind so customers call you first when they need your service. Social media management, local SEO, and Google Ads bring in steady leads, build your reputation with reviews, and let you compete with bigger companies — all trackable with real monthly reports.',
  },
  {
    q: 'Do you help with SEO and getting found on Google?',
    a: 'Absolutely. Every site includes SEO setup, and we offer Google Business Profile setup so you appear on Google Search and Maps. For ongoing growth, our Digital Marketing plan includes continuous SEO and local optimization to climb the rankings over time.',
  },
  {
    q: 'What areas does Valdra Co. serve?',
    a: 'We’re based in Asheville, NC and proudly serve small businesses across Western North Carolina — and we work with clients remotely anywhere in the U.S. If you’ve got a business to grow, we can help.',
  },
]

// ── Single FAQ item (click to expand) ──────────────────────────────────────────
function FaqItem({ item, index, open, onToggle }: {
  item: { q: string; a: string }
  index: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(20px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: false, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-5 text-left py-6 group"
        aria-expanded={open}
      >
        <span
          className="text-white font-medium transition-colors"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem', color: open ? '#0ea5e9' : '#f1f5f9' }}
        >
          {item.q}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: open ? '#0ea5e9' : 'rgba(14,165,233,0.1)',
            border: `1px solid ${open ? '#0ea5e9' : 'rgba(14,165,233,0.3)'}`,
            transition: 'background-color 250ms ease, border-color 250ms ease',
          }}
        >
          <Plus
            size={15}
            style={{
              color: open ? '#050d1a' : '#0ea5e9',
              transform: open ? 'rotate(45deg)' : 'none',
              transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1), color 250ms ease',
            }}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, ease: 'easeOut' },
            }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-slate-300 text-sm leading-relaxed pb-6 pr-12" style={{ maxWidth: '680px' }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-12 md:py-28 px-6 md:px-14 overflow-hidden" style={{ background: '#050d1a' }}>
      <div className="absolute top-0 left-14 right-14 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)' }} />

      {/* Faint blue glow — top left */}
      <div
        className="pointer-events-none absolute top-10 left-0 w-[520px] h-[460px] opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse at 20% 30%, #0ea5e9 0%, transparent 65%)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(24px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-[#0ea5e9] text-xs font-medium tracking-[0.3em] uppercase mb-4">Questions, Answered</p>
            <h2
              className="font-bold uppercase leading-none"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'white' }}
            >
              Frequently<br />
              <span style={{ color: '#0ea5e9' }}>Asked.</span>
            </h2>
          </div>
          <p className="text-slate-200 text-xs tracking-widest uppercase md:text-right md:max-w-[200px] leading-relaxed">
            Everything you need<br className="hidden md:block" /> to know before we start
          </p>
        </motion.div>

        {/* FAQ list */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Soft CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-300 text-sm mt-10 text-center"
        >
          Still have a question?{' '}
          <a href="#contact" className="font-semibold" style={{ color: '#0ea5e9' }}>
            Get in touch &rarr;
          </a>
        </motion.p>
      </div>
    </section>
  )
}

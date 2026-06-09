import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Mail, Phone, MapPin, Clock, CalendarDays, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export function ContactSection() {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', business: '', businessOther: '', interest: '', message: '' })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  const update =
    (key: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitState === 'loading') return
    setSubmitState('loading')
    try {
      await emailjs.send(
        'service_r5v2i3r',
        'template_ijgfknq',
        {
          from_name:  fields.name,
          from_email: fields.email,
          service:    fields.business === 'other'
                        ? (fields.businessOther.trim() || 'Other')
                        : fields.business,
          interest:   fields.interest || 'Not specified',
          message:    fields.message,
          phone:      fields.phone || 'Not provided',
          timeline:   'Not specified',
        },
        'zHqUr2xp-rz5izLVX'
      )
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  const inputClass =
    'bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 outline-none focus:border-[#0ea5e9]/50 focus:bg-white/[0.06]'
  const inputStyle = { transition: 'border-color 200ms ease, background-color 200ms ease' }

  return (
    <section id="contact" className="relative py-20 md:py-28 px-6 md:px-14 overflow-hidden" style={{ background: '#050d1a' }}>
      {/* Top separator */}
      <div className="absolute top-0 left-14 right-14 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)' }} />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.07]"
        style={{ background: 'radial-gradient(ellipse, #0ea5e9 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">

          {/* Left — Copy */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, transform: 'translateY(24px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#0ea5e9] text-xs font-medium tracking-[0.3em] uppercase mb-4">Let's Build Together</p>
              <h2
                className="font-bold uppercase leading-none mb-8"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white' }}
              >
                Ready to<br />
                <span style={{ color: '#0ea5e9' }}>Stand Out?</span>
              </h2>
              <p className="text-slate-200 leading-relaxed max-w-md mb-10">
                Tell us about your project. We'll get back to you within 24 hours with a clear plan and honest pricing.
              </p>

              {/* Contact info */}
              <div className="flex flex-col gap-5">
                {[
                  { icon: Mail,         label: 'Email Us',       value: 'studio@valdraco.com',           href: 'mailto:studio@valdraco.com', accent: '#0ea5e9' },
                  { icon: Phone,        label: 'Call or Text',    value: '(828) 380-5840',                href: 'tel:+18283805840',           accent: '#34d399' },
                  { icon: MapPin,       label: 'Based In',        value: 'Western NC — Remote Friendly',  href: undefined,                    accent: '#f59e0b' },
                  { icon: CalendarDays, label: 'Hours',           value: 'Mon–Fri · 9am–6pm EST',         href: undefined,                    accent: '#a78bfa' },
                  { icon: Clock,        label: 'Response Time',   value: 'Within 24 hours, always',       href: undefined,                    accent: '#22d3ee' },
                ].map(({ icon: Icon, label, value, accent, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
                    >
                      <Icon size={15} style={{ color: accent }} />
                    </div>
                    <div>
                      <div className="text-slate-200 text-xs tracking-widest uppercase">{label}</div>
                      {href ? (
                        <a href={href} className="text-white text-sm font-medium mt-0.5 block hover:text-[#0ea5e9] transition-colors">{value}</a>
                      ) : (
                        <div className="text-white text-sm font-medium mt-0.5">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Form / Success */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateX(30px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 max-w-lg"
          >
            <AnimatePresence mode="wait">

              {/* ── Success state ───────────────────────────────────────────── */}
              {submitState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, transform: 'translateY(16px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  exit={{ opacity: 0, transform: 'translateY(-8px)' }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center py-16 gap-6"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }}
                  >
                    <CheckCircle size={28} style={{ color: '#4ade80' }} />
                  </div>
                  <div>
                    <h3
                      className="text-white font-bold mb-2"
                      style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.9rem', letterSpacing: '0.05em' }}
                    >
                      Message Sent!
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                      We'll be in touch within 24 hours with a plan and honest pricing.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitState('idle')
                      setFields({ name: '', email: '', phone: '', business: '', businessOther: '', interest: '', message: '' })
                    }}
                    className="text-xs tracking-widest uppercase text-slate-600 hover:text-[#0ea5e9]"
                    style={{ transition: 'color 200ms ease' }}
                  >
                    Send another message
                  </button>
                </motion.div>

              ) : (

                /* ── Form ───────────────────────────────────────────────────── */
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-500 text-xs tracking-widest uppercase">
                        Name <span style={{ color: '#0ea5e9' }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={fields.name}
                        onChange={update('name')}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-500 text-xs tracking-widest uppercase">
                        Email <span style={{ color: '#0ea5e9' }}>*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        required
                        value={fields.email}
                        onChange={update('email')}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-slate-500 text-xs tracking-widest uppercase">
                      Phone Number <span className="text-slate-700 normal-case tracking-normal" style={{ fontSize: '10px' }}>(optional — for faster response)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="(828) 555-0100"
                      value={fields.phone}
                      onChange={update('phone')}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-slate-500 text-xs tracking-widest uppercase">Business Type</label>
                    <select
                      value={fields.business}
                      onChange={update('business')}
                      className="rounded-xl px-4 py-3 text-slate-200 text-sm outline-none appearance-none cursor-pointer focus:border-[#0ea5e9]/50"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transition: 'border-color 200ms ease',
                      }}
                    >
                      <option value=""         className="bg-[#050d1a]">Select your industry</option>
                      <option value="realestate" className="bg-[#050d1a]">Real Estate</option>
                      <option value="restaurant" className="bg-[#050d1a]">Restaurant / Food</option>
                      <option value="fitness"    className="bg-[#050d1a]">Fitness / Wellness</option>
                      <option value="saas"       className="bg-[#050d1a]">SaaS / Tech</option>
                      <option value="retail"     className="bg-[#050d1a]">Retail / E-Commerce</option>
                      <option value="other"      className="bg-[#050d1a]">Other</option>
                    </select>

                    {/* Reveal a free-text input when "Other" is selected */}
                    <AnimatePresence>
                      {fields.business === 'other' && (
                        <motion.input
                          key="business-other"
                          initial={{ opacity: 0, transform: 'translateY(-6px)' }}
                          animate={{ opacity: 1, transform: 'translateY(0px)' }}
                          exit={{ opacity: 0, transform: 'translateY(-6px)' }}
                          transition={{ duration: 0.25 }}
                          type="text"
                          placeholder="Tell us your business type…"
                          required
                          value={fields.businessOther}
                          onChange={update('businessOther')}
                          className={`${inputClass} mt-2`}
                          style={inputStyle}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-slate-500 text-xs tracking-widest uppercase">What Are You Interested In?</label>
                    <select
                      value={fields.interest}
                      onChange={update('interest')}
                      className="rounded-xl px-4 py-3 text-slate-200 text-sm outline-none appearance-none cursor-pointer focus:border-[#0ea5e9]/50"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transition: 'border-color 200ms ease',
                      }}
                    >
                      <option value=""           className="bg-[#050d1a]">Select a service…</option>
                      <option value="web-design"         className="bg-[#050d1a]">Web Design (One-Time)</option>
                      <option value="hosted-website"     className="bg-[#050d1a]">Hosted Website ($149/mo)</option>
                      <option value="digital-marketing"  className="bg-[#050d1a]">Digital Marketing</option>
                      <option value="both"               className="bg-[#050d1a]">Both — Website + Marketing</option>
                      <option value="not-sure"           className="bg-[#050d1a]">Not Sure Yet — Let's Talk</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-slate-500 text-xs tracking-widest uppercase">
                      Project Brief <span style={{ color: '#0ea5e9' }}>*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what you're building, your goals, and your timeline..."
                      required
                      value={fields.message}
                      onChange={update('message')}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  {/* Error message — appears below textarea, above button */}
                  <AnimatePresence>
                    {submitState === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, transform: 'translateY(-6px)' }}
                        animate={{ opacity: 1, transform: 'translateY(0px)' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-2 text-xs tracking-wide -mt-1"
                        style={{ color: '#f87171' }}
                      >
                        <AlertCircle size={12} style={{ flexShrink: 0 }} />
                        Something went wrong. Please try again or email us directly.
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={submitState === 'loading'}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-medium text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-[0.97] mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      background: submitState === 'error'
                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                        : 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
                      boxShadow: submitState === 'error'
                        ? '0 0 22px rgba(245,158,11,0.20)'
                        : '0 0 22px rgba(14,165,233,0.20)',
                      transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1), background 300ms ease, box-shadow 300ms ease',
                    }}
                  >
                    {submitState === 'loading' ? (
                      <><Loader2 size={14} className="animate-spin" /> Sending…</>
                    ) : submitState === 'error' ? (
                      <><AlertCircle size={14} /> Try Again</>
                    ) : (
                      <>Send Message <ArrowRight size={15} /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Areas We Serve — local SEO + trust signal */}
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(16px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-24 pt-10 border-t border-white/[0.05] text-center"
        >
          <p className="text-[#0ea5e9] text-xs font-medium tracking-[0.3em] uppercase mb-5">
            Proudly Serving Western North Carolina
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 max-w-2xl mx-auto">
            {[
              'Asheville', 'Weaverville', 'Mars Hill', 'Black Mountain', 'Hendersonville',
              'Fletcher', 'Arden', 'Candler', 'Marshall', 'Waynesville',
            ].map((town) => (
              <span
                key={town}
                className="text-slate-300 text-xs tracking-wide px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {town}
              </span>
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-5 max-w-xl mx-auto leading-relaxed">
            Web design &amp; digital marketing for small businesses across Asheville and Western NC — and remote clients anywhere in the U.S.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <span
            className="text-white/50 font-bold tracking-[0.25em] text-sm uppercase"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            VALDRA<span className="text-[#0ea5e9]/70"> · </span>CO
          </span>
          <p className="text-slate-200 text-xs tracking-widest">
            © 2026 Valdra Co. All rights reserved. — Western NC
          </p>
          <div className="flex gap-6 text-xs text-slate-200 tracking-widest uppercase">
            <a href="https://www.privacypolicies.com/live/76b94668-42bd-4a3c-b478-6836aa53080b" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">Privacy</a>
            <a href="https://www.privacypolicies.com/live/65e04349-dc8f-4bec-94f0-923e7e3159f9" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">Terms</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

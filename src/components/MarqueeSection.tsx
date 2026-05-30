import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Search, MapPin, Bed, Bath, Square, Clock, Phone, Star, ChefHat } from 'lucide-react'

// Pull any listing images the user has dropped into src/assets/listings/.
// Missing files just fall back to the gradient — no build error.
const listingModules = import.meta.glob<{ default: string }>(
  '../assets/listings/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
)
const listingImages: Record<string, string> = {}
for (const [path, mod] of Object.entries(listingModules)) {
  const fname = path.split('/').pop() ?? ''
  const slug = fname.replace(/\.[^.]+$/, '').toLowerCase()
  listingImages[slug] = mod.default
}

type SpecStatus = 'in-progress' | 'coming-soon' | 'live'

type Spec = {
  industry: string
  slug: string
  accent: string
  status: SpecStatus
  bgSlug?: string
  bgSlugs?: string[]
  colSpan?: 1 | 2
  viewportH?: number
  url?: string
}

const specs: Spec[] = [
  { industry: 'Real Estate', slug: 'real-estate', accent: '#0ea5e9', status: 'in-progress', bgSlug: 'featured',      colSpan: 2, viewportH: 400 },
  { industry: 'Restaurant',  slug: 'restaurant',  accent: '#f59e0b', status: 'in-progress', bgSlug: 'restaurant-bg', colSpan: 1, viewportH: 400 },
  { industry: 'Dental',      slug: 'dental',      accent: '#38bdf8', status: 'in-progress', bgSlug: 'dental-bg',    colSpan: 1, viewportH: 260 },
  { industry: 'Barbershop',  slug: 'barbershop',  accent: '#e2e8f0', status: 'in-progress', bgSlugs: ['barbershop-bg', 'barbershop-bg2'], colSpan: 2, viewportH: 260 },
  { industry: 'Auto Detail', slug: 'luxury-auto', accent: '#a78bfa', status: 'in-progress', bgSlug: 'luxuryauto-bg', colSpan: 2, viewportH: 260 },
  { industry: 'Coffee Shop', slug: 'coffee',      accent: '#d97706', status: 'in-progress', bgSlug: 'coffee-bg',    colSpan: 1, viewportH: 260 },
]

// Staggered fade-up helper — sections below the fold animate in on hover
const anim = (hovered: boolean, delay: number): React.CSSProperties => ({
  opacity: hovered ? 1 : 0,
  transform: hovered ? 'translateY(0)' : 'translateY(12px)',
  transition: `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease`,
})

// ── Real Estate placeholder content (tall — drives the scroll demo) ──────────
// Note: featured image is rendered as static card background by SpecCard;
// this component only renders the scrolling content layered on top.
function RealEstatePreview({ accent, hovered }: { accent: string; hovered: boolean }) {
  return (
    <div className="flex flex-col text-white">
      {/* Hero (overlays the static bg photo) */}
      <div className="px-4 pt-6 pb-8 relative">
        <div
          className="text-[8px] tracking-[0.3em] uppercase mb-2"
          style={{ color: accent, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
        >
          Western NC
        </div>
        <div
          className="font-bold leading-[0.9] text-white"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '26px',
            textShadow: '0 2px 10px rgba(0,0,0,0.65)',
          }}
        >
          Find Your<br />Mountain Home
        </div>
        <div className="mt-3 w-fit flex items-center gap-2 rounded-md px-2 py-1.5 border border-white/[0.1] bg-[#050d1a]/55 backdrop-blur-sm">
          <Search size={10} className="text-white/55" />
          <span className="text-[9px] text-white/55">3 bed, West Asheville…</span>
        </div>
      </div>

      {/* Featured listing */}
      <div className="px-4 pt-4" style={anim(hovered, 150)}>
        <div className="text-[8px] tracking-[0.25em] uppercase text-white/40 mb-2">Featured Listing</div>
        <div className="w-[24%] rounded-lg overflow-hidden border border-white/[0.1] bg-[#050d1a]/70 backdrop-blur-md">
          {/* Header strip — badges that used to sit on the inner image */}
          <div className="flex items-center justify-between px-2.5 pt-2 pb-1.5 border-b border-white/[0.05]">
            <div
              className="text-[7px] px-1.5 py-0.5 rounded-full font-semibold tracking-wider uppercase"
              style={{ color: accent, background: `${accent}20`, border: `1px solid ${accent}40` }}
            >
              New
            </div>
            <div
              className="text-[9px] font-semibold text-white tracking-widest uppercase"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              Inquire
            </div>
          </div>
          <div className="p-2.5">
            <div className="text-[10px] font-semibold text-white leading-tight">Mountain Modern Retreat</div>
            <div className="flex items-center gap-1 text-[8px] text-white/55 mt-0.5">
              <MapPin size={7} /> Featured Property
            </div>
            <div className="flex items-center gap-3 mt-2 text-[8px] text-white/65">
              <span className="flex items-center gap-1"><Bed size={8} /> 3</span>
              <span className="flex items-center gap-1"><Bath size={8} /> 2</span>
              <span className="flex items-center gap-1"><Square size={8} /> 1,840</span>
            </div>
          </div>
        </div>
      </div>

      {/* Listing grid */}
      <div className="px-4 pt-5" style={anim(hovered, 350)}>
        <div className="text-[8px] tracking-[0.25em] uppercase text-white/40 mb-2">Recently Listed</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { style: 'Cottage',  area: 'Mountain View',  beds: 2, baths: 1, slug: 'cottage'  },
            { style: 'Loft',     area: 'Downtown',       beds: 3, baths: 2, slug: 'loft'     },
            { style: 'Estate',   area: 'Riverside',      beds: 4, baths: 3, slug: 'estate'   },
            { style: 'Bungalow', area: 'Historic',       beds: 2, baths: 2, slug: 'bungalow' },
          ].map((l) => {
            const img = listingImages[l.slug]
            return (
              <div
                key={l.slug}
                className="overflow-hidden relative h-32"
                style={{
                  backgroundImage: img ? `url(${img})` : `linear-gradient(135deg, ${accent}18, transparent)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(5,13,26,0.55) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-1.5">
                  <div className="text-[9px] font-semibold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{l.style}</div>
                  <div className="text-[7px] text-white/50">{l.area} · {l.beds} bd · {l.baths} ba</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Agent card */}
      <div className="px-4 pt-5" style={anim(hovered, 550)}>
        <div className="w-[25%] rounded-lg p-3 border border-white/[0.06]" style={{ background: `${accent}10` }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}60)` }} />
            <div className="min-w-0">
              <div className="text-[9px] font-semibold text-white">Your Local Agent</div>
              <div className="text-[7px] text-white/40">Western NC specialist</div>
            </div>
          </div>
          <button
            className="mt-2.5 w-full text-[8px] font-semibold tracking-widest uppercase py-1.5 rounded-md"
            style={{ background: accent, color: '#050d1a' }}
          >
            Schedule a Showing
          </button>
        </div>
      </div>

      {/* Footer strip */}
      <div className="mt-5 px-4 py-3 border-t border-white/[0.05] text-center">
        <div className="text-[7px] tracking-[0.3em] uppercase text-white/30">Concept Build · Illustrative</div>
      </div>
    </div>
  )
}

// ── Restaurant preview ───────────────────────────────────────────────────────
function RestaurantPreview({ accent, hovered }: { accent: string; hovered: boolean }) {
  const dish1 = listingImages['restaurant-dish1']

  return (
    <div className="flex flex-col text-white">
      {/* Hero — right-aligned */}
      <div className="px-4 pt-6 pb-8 text-right">
        <div className="text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: accent, textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
          Farm to Table · Asheville, NC
        </div>
        <div className="font-bold leading-[0.88] text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
          From Our Kitchen<br />To Your Table
        </div>
        <div className="mt-3 flex items-center justify-end gap-3">
          <button className="text-[8px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 text-white/70">
            View Menu
          </button>
          <button className="text-[8px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: accent, color: '#050d1a' }}>
            Reserve a Table
          </button>
        </div>
      </div>

      {/* Tonight's Special */}
      <div className="px-4" style={anim(hovered, 150)}>
        <div className="text-[8px] tracking-[0.25em] uppercase text-white/40 mb-2">Tonight's Special</div>
        <div className="rounded-lg overflow-hidden border border-white/[0.1] bg-[#050d1a]/70 backdrop-blur-md">
          {dish1 ? (
            <div className="h-20 relative" style={{ backgroundImage: `url(${dish1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,13,26,0.7) 100%)' }} />
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between">
                <div className="text-[9px] font-semibold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Pan-Seared Salmon</div>
                <div className="text-[7px] px-1.5 py-0.5 rounded-full font-semibold" style={{ color: accent, background: `${accent}22`, border: `1px solid ${accent}40` }}>Chef's Pick</div>
              </div>
            </div>
          ) : (
            <div className="h-14 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}18, transparent)` }}>
              <ChefHat size={18} style={{ color: accent, opacity: 0.5 }} />
            </div>
          )}
          <div className="px-2.5 py-2 flex items-center justify-between">
            <div className="text-[8px] text-white/50">Lemon emulsion · herb oil · microgreens</div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={6} fill={accent} style={{ color: accent }} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 pt-5" style={anim(hovered, 350)}>
        <div className="text-[8px] tracking-[0.25em] uppercase text-white/40 mb-2">From the Menu</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Dry-Aged Ribeye', desc: 'Herb butter · char', slug: 'restaurant-dish2' },
            { name: 'Truffle Risotto', desc: 'Truffle · parmesan', slug: 'restaurant-dish3' },
          ].map((item) => {
            const img = listingImages[item.slug]
            return (
              <div key={item.name} className="rounded-md overflow-hidden border border-white/[0.05] bg-white/[0.02]">
                <div className="h-14 relative" style={{
                  backgroundImage: img ? `url(${img})` : `linear-gradient(135deg, ${accent}15, transparent)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                  {img && <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(5,13,26,0.55) 100%)' }} />}
                </div>
                <div className="p-1.5">
                  <div className="text-[9px] font-semibold text-white/85" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{item.name}</div>
                  <div className="text-[7px] text-white/40">{item.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hours + Contact */}
      <div className="px-4 pt-5" style={anim(hovered, 550)}>
        <div className="rounded-lg p-3 border border-white/[0.06]" style={{ background: `${accent}10` }}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[8px] text-white/60">
              <Clock size={9} style={{ color: accent }} />
              Tue–Sun · 5 pm – 10 pm
            </div>
            <div className="flex items-center gap-1.5 text-[8px] text-white/60">
              <Phone size={9} style={{ color: accent }} />
              Reservations
            </div>
          </div>
          <button className="mt-2.5 w-full text-[8px] font-semibold tracking-widest uppercase py-1.5 rounded-md" style={{ background: accent, color: '#050d1a' }}>
            Book Your Evening
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 px-4 py-3 border-t border-white/[0.05] text-center">
        <div className="text-[7px] tracking-[0.3em] uppercase text-white/30">Concept Build · Illustrative</div>
      </div>
    </div>
  )
}

// ── Barbershop preview ───────────────────────────────────────────────────────
function BarbershopPreview({ accent, hovered }: { accent: string; hovered: boolean }) {
  return (
    <div className="flex flex-col text-white">
      {/* Hero — centered */}
      <div className="px-5 pt-6 pb-6 text-center flex flex-col items-center">
        <div className="text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: accent, textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
          Classic Cuts
        </div>
        <div className="font-bold leading-[0.88] text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          Sharp Cuts.<br />Clean Fades.
        </div>
        <p className="text-[8px] text-white/55 mt-2 leading-relaxed max-w-[55%]">
          Old-school craft. Modern precision. Walk-ins welcome.
        </p>
      </div>

      {/* Services row */}
      <div className="px-5" style={anim(hovered, 150)}>
        <div className="text-[8px] tracking-[0.25em] uppercase text-white/40 mb-2">Services</div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { name: 'Fade',       price: '$30' },
            { name: 'Taper',      price: '$28' },
            { name: 'Beard Trim', price: '$18' },
            { name: 'Hot Towel',  price: '$22' },
          ].map((s) => (
            <div key={s.name} className="rounded-lg p-2 border border-white/[0.06] text-center" style={{ background: `${accent}08` }}>
              <div className="text-[9px] font-semibold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{s.name}</div>
              <div className="text-[8px] mt-0.5" style={{ color: accent }}>{s.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking strip */}
      <div className="px-5 pt-4 flex items-center gap-3" style={anim(hovered, 350)}>
        <button className="text-[8px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full flex-shrink-0" style={{ background: accent, color: '#050d1a' }}>
          Book a Cut
        </button>
        <div className="flex gap-4 text-[7px] text-white/40">
          <span><span style={{ color: accent }}>◦</span> Tue–Sat 9am–7pm</span>
          <span><span style={{ color: accent }}>◦</span> Walk-ins welcome</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 px-5 py-3 border-t border-white/[0.05] text-center">
        <div className="text-[7px] tracking-[0.3em] uppercase text-white/30">Concept Build · Illustrative</div>
      </div>
    </div>
  )
}

// ── Dental preview ───────────────────────────────────────────────────────────
function DentalPreview({ accent, hovered }: { accent: string; hovered: boolean }) {
  const smileImg = listingImages['dental-smile']

  return (
    <div className="flex flex-col text-white">
      {/* Hero */}
      <div className="px-5 pt-6 pb-7">
        <div className="text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: accent, textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
          Modern Dentistry · North Carolina
        </div>
        <div className="font-bold leading-[0.88] text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
          Your Smile.<br />Perfected.
        </div>
        <p className="text-[8px] text-white/55 mt-2 max-w-[55%] leading-relaxed">
          Gentle, modern care for the whole family. New patients welcome.
        </p>
        <div className="mt-4 flex items-center gap-2.5">
          <button className="text-[8px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: accent, color: '#050d1a' }}>
            Book Appointment
          </button>
          <button className="text-[8px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 text-white/70">
            Our Services
          </button>
        </div>
      </div>

      {/* Services */}
      <div className="px-5" style={anim(hovered, 150)}>
        <div className="text-[8px] tracking-[0.25em] uppercase text-white/40 mb-2">What We Offer</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: 'Cleaning',    desc: 'Preventive care',  icon: '✦' },
            { name: 'Whitening',   desc: 'Brighten your smile', icon: '◈' },
            { name: 'Implants',    desc: 'Permanent solution', icon: '◉' },
          ].map((s) => (
            <div key={s.name} className="rounded-lg p-2.5 border border-white/[0.06]" style={{ background: `${accent}08` }}>
              <div className="text-[10px] mb-1" style={{ color: accent }}>{s.icon}</div>
              <div className="text-[9px] font-semibold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{s.name}</div>
              <div className="text-[7px] text-white/40 mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Smile photo + booking */}
      <div className="px-5 pt-5 flex gap-3" style={anim(hovered, 350)}>
        {/* Smile photo */}
        <div className="w-[38%] rounded-lg overflow-hidden flex-shrink-0 h-24 relative"
          style={{
            backgroundImage: smileImg ? `url(${smileImg})` : `linear-gradient(135deg, ${accent}18, transparent)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: smileImg ? undefined : '1px solid rgba(255,255,255,0.06)',
          }}>
          {smileImg && <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,13,26,0.45) 0%, rgba(5,13,26,0.3) 50%, rgba(5,13,26,0.65) 100%)' }} />}
          {!smileImg && (
            <div className="h-full flex items-center justify-center">
              <span className="text-[18px]" style={{ color: accent, opacity: 0.3 }}>◉</span>
            </div>
          )}
        </div>
        {/* Mini booking */}
        <div className="flex-1 rounded-lg p-3 border border-white/[0.06]" style={{ background: `${accent}10` }}>
          <div className="text-[8px] font-semibold text-white mb-2">Request a Visit</div>
          <div className="h-5 rounded bg-white/[0.06] border border-white/[0.06] mb-1.5 px-2 flex items-center">
            <span className="text-[7px] text-white/30">Your name</span>
          </div>
          <div className="h-5 rounded bg-white/[0.06] border border-white/[0.06] px-2 flex items-center">
            <span className="text-[7px] text-white/30">Preferred date</span>
          </div>
          <button className="mt-2 w-full text-[7px] font-semibold tracking-widest uppercase py-1 rounded-md" style={{ background: accent, color: '#050d1a' }}>
            Confirm
          </button>
        </div>
      </div>

      {/* Hours */}
      <div className="px-5 pt-4" style={anim(hovered, 550)}>
        <div className="flex gap-4 text-[7px] text-white/40">
          <span style={{ color: accent }}>◦</span> Mon–Fri 8am–6pm
          <span style={{ color: accent }}>◦</span> Sat 9am–2pm
          <span style={{ color: accent }}>◦</span> (828) 555-0190
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 px-5 py-3 border-t border-white/[0.05] text-center">
        <div className="text-[7px] tracking-[0.3em] uppercase text-white/30">Concept Build · Illustrative</div>
      </div>
    </div>
  )
}

// ── Auto Detail preview ──────────────────────────────────────────────────────
function LuxuryAutoPreview({ accent, hovered }: { accent: string; hovered: boolean }) {
  const carImg = listingImages['luxuryauto-car']

  return (
    <div className="flex flex-col text-white">

      {/* Hero — headline only */}
      <div className="px-5 pt-6 pb-5">
        <div className="text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: accent, textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
          Auto Detailing · North Carolina
        </div>
        <div className="font-bold leading-[0.88] text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '30px', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          Detail<br />Obsessed.
        </div>
      </div>

      {/* Book Now + Stats bar — pushed lower */}
      <div className="px-5 pt-10" style={anim(hovered, 150)}>
        <button className="mb-4 text-[8px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: accent, color: '#050d1a' }}>
          Book Now
        </button>
        <div className="grid grid-cols-3 divide-x divide-white/[0.06] rounded-lg border border-white/[0.06]" style={{ background: `${accent}08` }}>
        {[
          { v: '500+', l: 'Cars Detailed' },
          { v: '5★',   l: 'Avg Rating'   },
          { v: 'Mobile', l: '& In-Shop'  },
        ].map((s) => (
          <div key={s.l} className="py-2 text-center">
            <div className="text-[11px] font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', color: accent }}>{s.v}</div>
            <div className="text-[6.5px] text-white/40 tracking-wider uppercase">{s.l}</div>
          </div>
        ))}
        </div>
      </div>

      {/* Service tiers — horizontal with car photo on right */}
      <div className="px-5 pt-8 flex gap-3" style={anim(hovered, 350)}>
        {/* Packages list */}
        <div className="flex-1 flex flex-col gap-1.5">
          {[
            { name: 'Express Wash',     price: '$79',  tag: '' },
            { name: 'Full Detail',      price: '$199', tag: 'Popular' },
            { name: 'Paint Correction', price: '$349', tag: '' },
            { name: 'Ceramic Coat',     price: '$599', tag: 'Premium' },
          ].map((s) => (
            <div key={s.name} className="flex items-center justify-between px-2.5 py-1.5 rounded-md border border-white/[0.05]" style={{ background: `${accent}06` }}>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: accent }} />
                <span className="text-[8px] text-white/80">{s.name}</span>
                {s.tag && <span className="text-[6px] px-1 py-0.5 rounded-full" style={{ color: accent, background: `${accent}20` }}>{s.tag}</span>}
              </div>
              <span className="text-[8px] font-semibold" style={{ color: accent }}>{s.price}</span>
            </div>
          ))}
        </div>

        {/* Car photo */}
        <div
          className="w-[36%] flex-shrink-0 rounded-lg overflow-hidden relative"
          style={{
            backgroundImage: carImg ? `url(${carImg})` : `linear-gradient(160deg, ${accent}18, transparent)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {carImg && <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(5,13,26,0.6) 100%)' }} />}
          <div className="absolute bottom-2 left-2">
            <div className="text-[7px] text-white/60 leading-tight">After<br />Detail</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 px-5 py-3 border-t border-white/[0.05] text-center">
        <div className="text-[7px] tracking-[0.3em] uppercase text-white/30">Concept Build · Illustrative</div>
      </div>
    </div>
  )
}

// ── Coffee Shop preview ──────────────────────────────────────────────────────
function CoffeeShopPreview({ accent, hovered }: { accent: string; hovered: boolean }) {
  const drinkImg = listingImages['coffee-drink']

  return (
    <div className="flex flex-col text-white">
      {/* Hero — centered */}
      <div className="px-4 pt-6 pb-7 text-center flex flex-col items-center">
        <div className="text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: accent, textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
          Specialty Coffee · Asheville, NC
        </div>
        <div className="font-bold leading-[0.88] text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
          Your Daily<br />Ritual.
        </div>
        <p className="text-[8px] text-white/55 mt-2 leading-relaxed max-w-[75%]">
          Single-origin beans. Expertly pulled shots. Every cup, a craft.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button className="text-[8px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: accent, color: '#050d1a' }}>
            Order Ahead
          </button>
          <button className="text-[8px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 text-white/70">
            Menu
          </button>
        </div>
      </div>

      {/* Featured drink */}
      <div className="px-4" style={anim(hovered, 150)}>
        <div className="text-[8px] tracking-[0.25em] uppercase text-white/40 mb-2">Today's Feature</div>
        <div
          className="w-fit rounded-lg overflow-hidden border border-white/[0.08] relative"
          style={{ background: 'rgba(5,13,26,0.65)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="h-16 w-full"
            style={{
              backgroundImage: drinkImg ? `url(${drinkImg})` : `linear-gradient(135deg, ${accent}25, transparent)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {drinkImg && <div className="absolute inset-0 h-16" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(5,13,26,0.6) 100%)' }} />}
          </div>
          <div className="px-2.5 py-2">
            <div className="text-[9px] font-semibold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Oat Honey Latte</div>
            <div className="text-[7px] text-white/45">Espresso · oat milk · wildflower honey</div>
            <div className="text-[8px] font-bold mt-1" style={{ color: accent }}>$6.50</div>
          </div>
        </div>
      </div>

      {/* Menu grid */}
      <div className="px-4 pt-5" style={anim(hovered, 350)}>
        <div className="text-[8px] tracking-[0.25em] uppercase text-white/40 mb-2">On the Menu</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Pour Over',   desc: 'Single-origin', price: '$5',    slug: 'coffee-pourover' },
            { name: 'Cold Brew',   desc: '12-hr steep',   price: '$5.50', slug: 'coffee-coldbrew' },
            { name: 'Cortado',     desc: 'Equal parts',   price: '$4.50', slug: 'coffee-cortado'  },
            { name: 'Matcha',      desc: 'Ceremonial',    price: '$6',    slug: 'coffee-matcha'   },
          ].map((item) => {
            const img = listingImages[item.slug]
            return (
              <div key={item.name} className="rounded-md overflow-hidden border border-white/[0.05]" style={{ background: `${accent}08` }}>
                <div
                  className="h-14 relative"
                  style={{
                    backgroundImage: img ? `url(${img})` : `linear-gradient(135deg, ${accent}18, transparent)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {img && <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(5,13,26,0.55) 100%)' }} />}
                </div>
                <div className="p-1.5">
                  <div className="text-[9px] font-semibold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{item.name}</div>
                  <div className="text-[7px] text-white/40">{item.desc}</div>
                  <div className="text-[7px] font-semibold mt-0.5" style={{ color: accent }}>{item.price}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hours + loyalty */}
      <div className="px-4 pt-5" style={anim(hovered, 550)}>
        <div className="rounded-lg p-3 border border-white/[0.06]" style={{ background: `${accent}10` }}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[8px] font-semibold text-white">Loyalty Rewards</div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full border" style={{ background: i < 3 ? accent : 'transparent', borderColor: accent }} />
              ))}
            </div>
          </div>
          <div className="text-[7px] text-white/40">Mon–Fri 6:30am–6pm · Sat–Sun 7am–5pm</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 px-4 py-3 border-t border-white/[0.05] text-center">
        <div className="text-[7px] tracking-[0.3em] uppercase text-white/30">Concept Build · Illustrative</div>
      </div>
    </div>
  )
}

// ── Coming Soon body ─────────────────────────────────────────────────────────
function ComingSoonPreview({ industry, accent }: { industry: string; accent: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-10 text-center">
      <div
        className="w-10 h-10 rounded-full mb-3 flex items-center justify-center"
        style={{ background: `${accent}12`, border: `1px solid ${accent}30` }}
      >
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
      </div>
      <div className="font-bold uppercase text-white/80" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '0.02em' }}>
        {industry}
      </div>
      <div className="text-[8px] tracking-[0.3em] uppercase text-white/30 mt-2">
        Concept In Progress
      </div>
    </div>
  )
}

// ── Card ─────────────────────────────────────────────────────────────────────
function SpecCard({ spec }: { spec: Spec }) {
  const isActive = spec.status === 'in-progress' || spec.status === 'live'
  const viewportH = spec.viewportH ?? 340
  const hostname = spec.url ?? `valdraco.com/spec/${spec.slug}`
  const [hovered, setHovered] = useState(false)
  const bgSlugs = spec.bgSlugs ?? (spec.bgSlug ? [spec.bgSlug] : [])
  const [bgIndex, setBgIndex] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bgSlugs.length <= 1) return
    const timer = setInterval(() => setBgIndex(i => (i + 1) % bgSlugs.length), 2500)
    return () => clearInterval(timer)
  }, [bgSlugs.length])

  // Mobile: auto-scroll when card enters viewport, loop continuously
  useEffect(() => {
    if (!isActive || window.innerWidth >= 768) return
    const el = cardRef.current
    if (!el) return
    let cycle: ReturnType<typeof setTimeout>
    const startCycle = () => {
      setHovered(true)
      cycle = setTimeout(() => {
        setHovered(false)
        cycle = setTimeout(startCycle, 1800)
      }, 7500)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cycle = setTimeout(startCycle, 700)
      } else {
        clearTimeout(cycle)
        setHovered(false)
      }
    }, { threshold: 0.35 })
    observer.observe(el)
    return () => { observer.disconnect(); clearTimeout(cycle) }
  }, [isActive])

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#060d1b] hover:border-white/[0.14]"
      style={{ transition: 'border-color 500ms ease' }}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 40px ${spec.accent}18, 0 0 24px ${spec.accent}25`, opacity: hovered ? 1 : 0 }}
      />

      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/[0.05] bg-black/20 relative z-10">
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <div className="w-2 h-2 rounded-full bg-green-500/60" />
        <div className="flex-1 mx-2 h-4 rounded bg-white/[0.04] flex items-center px-2">
          <span className="text-white/25 text-[8px] truncate">{hostname}</span>
        </div>
        {spec.status === 'in-progress' && (
          <span
            className="text-[7px] tracking-[0.25em] uppercase font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0"
            style={{ color: spec.accent, background: `${spec.accent}15`, border: `1px solid ${spec.accent}30` }}
          >
            Concept
          </span>
        )}
      </div>

      {/* Viewport — bg photo stays still, content scrolls on hover */}
      <div className="relative overflow-hidden max-h-[220px] sm:max-h-none" style={{ height: `${viewportH}px` }}>
        {/* Background photo(s) — crossfade slideshow if multiple slugs */}
        {isActive && (
          <>
            {bgSlugs.length > 0 ? bgSlugs.map((slug, i) => {
              const bgImg = listingImages[slug]
              return (
                <div
                  key={slug}
                  className="absolute inset-0 z-0 transition-opacity duration-1000"
                  style={{
                    opacity: i === bgIndex ? 1 : 0,
                    backgroundImage: bgImg ? `url(${bgImg})` : 'linear-gradient(180deg, #060d1b 0%, #050d1a 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )
            }) : (
              <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(180deg, #060d1b 0%, #050d1a 100%)' }} />
            )}
            <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(180deg, rgba(5,13,26,0.55) 0%, rgba(5,13,26,0.35) 45%, rgba(5,13,26,0.75) 100%)' }} />
          </>
        )}

        {/* Scrolling content layer (this is the ONLY thing that transforms) */}
        {isActive ? (
          <div
            className="relative z-10 transition-transform ease-linear"
            style={{
              transitionDuration: '6500ms',
              transform: hovered ? `translateY(calc(-100% + ${viewportH}px))` : 'translateY(0)',
            }}
          >
            {spec.slug === 'restaurant'
              ? <RestaurantPreview accent={spec.accent} hovered={hovered} />
              : spec.slug === 'dental'
              ? <DentalPreview accent={spec.accent} hovered={hovered} />
              : spec.slug === 'barbershop'
              ? <BarbershopPreview accent={spec.accent} hovered={hovered} />
              : spec.slug === 'luxury-auto'
              ? <LuxuryAutoPreview accent={spec.accent} hovered={hovered} />
              : spec.slug === 'coffee'
              ? <CoffeeShopPreview accent={spec.accent} hovered={hovered} />
              : <RealEstatePreview accent={spec.accent} hovered={hovered} />}
          </div>
        ) : (
          <div className="relative z-10 h-full">
            <ComingSoonPreview industry={spec.industry} accent={spec.accent} />
          </div>
        )}

        {/* Bottom edge fade for scroll polish */}
        {isActive && (
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 z-20 transition-opacity duration-700"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(5,13,26,0.85))', opacity: hovered ? 1 : 0 }}
          />
        )}
      </div>

      {/* Footer label */}
      <div className="flex items-center justify-between px-3 py-2.5 border-t border-white/[0.05] bg-black/20 relative z-10">
        <span
          className="text-[9px] font-semibold tracking-[0.2em] uppercase"
          style={{ color: isActive ? spec.accent : 'rgba(255,255,255,0.35)' }}
        >
          {spec.industry}
        </span>
        {isActive && (
          <ArrowUpRight
            size={12}
            className="text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ transition: 'color 300ms ease, transform 300ms cubic-bezier(0.23,1,0.32,1)' }}
          />
        )}
      </div>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────
export function MarqueeSection() {
  const [showAll, setShowAll] = useState(false)
  return (
    <section className="relative py-14 md:py-28 px-6 md:px-14 overflow-hidden" style={{ background: '#050d1a' }}>
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, transform: 'translateY(20px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <p className="text-[#0ea5e9] text-xs font-medium tracking-[0.3em] uppercase mb-4">Our Work Spans</p>
        <h2
          className="font-bold uppercase leading-none"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white' }}
        >
          Every <span style={{ color: '#0ea5e9' }}>Industry</span>
        </h2>
        <p className="text-slate-200 mt-4 text-sm leading-relaxed">
          Concept builds we're shipping piece by piece. Hover any card to scroll through the page.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="relative max-w-6xl mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ zIndex: 1 }}>
        {specs.map((spec, i) => (
          <motion.div
            key={spec.slug}
            className={`${spec.colSpan === 2 ? 'sm:col-span-2 lg:col-span-2' : ''} ${i >= 3 && !showAll ? 'hidden sm:block' : ''}`}
            initial={{ opacity: 0, transform: 'perspective(900px) rotateX(14deg) translateY(52px)' }}
            whileInView={{ opacity: 1, transform: 'perspective(900px) rotateX(0deg) translateY(0px)' }}
            viewport={{ once: false, amount: 0.1, margin: '0px 0px -180px 0px' }}
            transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpecCard spec={spec} />
          </motion.div>
        ))}
      </div>

      {/* Mobile see more toggle */}
      <div className="flex justify-center mt-8 sm:hidden">
        <button
          onClick={() => setShowAll(v => !v)}
          className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-semibold px-6 py-3 rounded-full"
          style={{ color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.3)', background: 'rgba(14,165,233,0.06)' }}
        >
          {showAll ? 'Show Less ↑' : 'See All Industries ↓'}
        </button>
      </div>
    </section>
  )
}

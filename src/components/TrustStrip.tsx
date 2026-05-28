// Pure CSS marquee — zero JS, runs on the compositor thread
const INDUSTRIES = [
  'Real Estate',
  'Restaurants',
  'Dental Clinics',
  'Barbershops',
  'Auto Detailing',
  'Coffee Shops',
  'Fitness Studios',
  'Law Firms',
  'Photography',
  'E-Commerce',
  'Contractors',
  'Hospitality',
]

// Duplicate once for a seamless loop (translateX(-50%) brings it back to start)
const TRACK = [...INDUSTRIES, ...INDUSTRIES]

export function TrustStrip() {
  return (
    <div
      style={{
        position: 'relative',
        background: '#050d1a',
        borderTop:    '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Fixed left label ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          flexShrink: 0,
          padding: '0 36px 0 32px',
          // Background fades so items behind it disappear cleanly
          background: 'linear-gradient(to right, #050d1a 75%, transparent)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#0ea5e9',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          We Build For
        </span>
        {/* Vertical rule */}
        <span
          style={{
            display: 'block',
            width: '1px',
            height: '18px',
            background: 'rgba(14,165,233,0.25)',
            marginLeft: '20px',
            flexShrink: 0,
          }}
        />
      </div>

      {/* ── Scrolling track ───────────────────────────────────────────────── */}
      <div
        className="trust-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animation: 'trustScroll 32s linear infinite',
          willChange: 'transform',
        }}
      >
        {TRACK.map((name, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <span
              style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.38)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                padding: '0 28px',
              }}
            >
              {name}
            </span>
            <span
              style={{
                color: 'rgba(14,165,233,0.28)',
                fontSize: '5px',
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>

      {/* ── Right edge fade ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          right: 0, top: 0, bottom: 0,
          width: '80px',
          background: 'linear-gradient(to left, #050d1a, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Keyframe (scoped to this component) ──────────────────────────── */}
      <style>{`
        @keyframes trustScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-track { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

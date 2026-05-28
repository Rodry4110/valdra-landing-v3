// Valdra Co. — V Monogram
// 4 solid filled tapered arms. Outer arms ~2.5x wider than inner.
// Blue dot sits below convergence with a small gap.

export function LogoMark({
  size = 64,
  glowing = false,
}: {
  size?: number
  glowing?: boolean
}) {
  const id = 'vm'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Valdra Co. monogram"
    >
      <defs>
        <radialGradient id={`${id}-dotglow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0ea5e9" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"    />
        </radialGradient>
        {glowing && (
          <filter id={`${id}-glow`} x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Left outer arm — wide */}
      <polygon points="5,5 23,5 40,65"  fill="white" />

      {/* Left inner arm — narrow, gap from outer */}
      <polygon points="30,5 37,5 40,65" fill="white" />

      {/* Right inner arm — mirror */}
      <polygon points="43,5 50,5 40,65" fill="white" />

      {/* Right outer arm — mirror of left outer */}
      <polygon points="57,5 75,5 40,65" fill="white" />

      {/* Blue dot — below convergence point with gap */}
      <circle cx="40" cy="72" r="13" fill={`url(#${id}-dotglow)`} />
      <circle
        cx="40"
        cy="72"
        r="5.5"
        fill="#0ea5e9"
        filter={glowing ? `url(#${id}-glow)` : undefined}
      />
    </svg>
  )
}

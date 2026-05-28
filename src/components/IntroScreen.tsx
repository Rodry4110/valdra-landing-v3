import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function IntroScreen() {
  const [phase, setPhase]   = useState<'loading' | 'playing' | 'exit' | 'done'>('loading')
  const videoRef            = useRef<HTMLVideoElement>(null)

  // Fallback: force exit after 10s no matter what
  useEffect(() => {
    const fallback = setTimeout(() => triggerExit(), 10000)
    return () => clearTimeout(fallback)
  }, [])

  function triggerExit() {
    setPhase('exit')
    setTimeout(() => setPhase('done'), 1000)
  }

  function handleCanPlay() {
    // Video is buffered enough — start playing
    setPhase('playing')
    videoRef.current?.play()
  }

  if (phase === 'done') return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: '#050d1a' }}
    >
      {/* Video — contain keeps aspect ratio, no distortion */}
      <video
        ref={videoRef}
        src="/valdra-intro.mp4"
        preload="auto"
        muted
        playsInline
        onCanPlayThrough={handleCanPlay}
        onEnded={triggerExit}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: phase === 'playing' || phase === 'exit' ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Loading spinner — shows while buffering */}
      {phase === 'loading' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative flex flex-col items-center gap-4"
        >
          <div
            className="w-12 h-12 rounded-full border-2 animate-spin"
            style={{ borderColor: '#0ea5e9', borderTopColor: 'transparent' }}
          />
          <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(14,165,233,0.45)' }}>
            Loading
          </span>
        </motion.div>
      )}

      {/* Split exit — top half */}
      <motion.div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: '50%', background: '#050d1a', zIndex: 10 }}
        animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Split exit — bottom half */}
      <motion.div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: '50%', background: '#050d1a', zIndex: 10 }}
        animate={phase === 'exit' ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  )
}

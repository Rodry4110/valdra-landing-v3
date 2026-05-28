import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? scrolled / total : 0)
      setShowTop(scrolled > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/[0.04]">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: progress,
            background: 'linear-gradient(90deg, #0ea5e9, #f59e0b)',
          }}
        />
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 active:scale-[0.97]"
            style={{
              background: 'rgba(14,165,233,0.15)',
              border: '1.5px solid rgba(14,165,233,0.45)',
              color: '#0ea5e9',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 18px rgba(14,165,233,0.2)',
              transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1)',
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

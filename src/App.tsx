import './index.css'
import { MotionConfig } from 'framer-motion'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { MarqueeSection } from './components/MarqueeSection'
import { PricingSection } from './components/PricingSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { WhyUsSection } from './components/WhyUsSection'
import { WorkSection } from './components/WorkSection'
import { FAQSection } from './components/FAQSection'
import { ContactSection } from './components/ContactSection'
import { ScrollProgress } from './components/ScrollProgress'
import { CustomCursor } from './components/CustomCursor'
import { TrustStrip } from './components/TrustStrip'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <>
        <CustomCursor />
        <ScrollProgress />
        <main className="noise">
        <HeroSection />
        <TrustStrip />
        <AboutSection />
        <MarqueeSection />
        <WorkSection />
        <PricingSection />
        <TestimonialsSection />
        <WhyUsSection />
        <FAQSection />
        <ContactSection />
        </main>
      </>
    </MotionConfig>
  )
}

export default App

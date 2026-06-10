import { Nav } from '@/components/Nav'
import { HeroSection } from '@/components/sections/HeroSection'
import { MarqueeSection } from '@/components/sections/MarqueeSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { WordmarkSection } from '@/components/sections/WordmarkSection'
import { SiteFooter } from '@/components/SiteFooter'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="wrap">
        <HeroSection />
        <MarqueeSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
        <WordmarkSection />
      </main>
      <SiteFooter />
    </>
  )
}

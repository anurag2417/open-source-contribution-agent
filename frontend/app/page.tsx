import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

import HeroSection from "./components/home/HeroSection"
import FeaturesSection from "./components/home/FeaturesSection"
import BentoGrid from "./components/home/BentoGrid"
import AIDemoSection from "./components/home/AIDemoSection"
import HowItWorks from "./components/home/HowItWorks"
import StatsSection from "./components/home/StatsSection"
import DashboardPreview from "./components/home/DashboardPreview"
import TestimonialsSection from "./components/home/TestimonialsSection"
import CTASection from "./components/home/CTASection"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <BentoGrid />

      <AIDemoSection />

      <HowItWorks />

      <StatsSection />

      <DashboardPreview />

      <TestimonialsSection />

      <CTASection />

      <Footer />
    </main>
  )
}
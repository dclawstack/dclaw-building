import Navbar from "@/components/landing/navbar"
import HeroSection from "@/components/landing/hero-section"
import FeatureCarousel from "@/components/landing/feature-carousel"
import BuildingDemo from "@/components/landing/building-demo"
import CTAStrip from "@/components/landing/cta-strip"
import Footer from "@/components/landing/footer"
import { SeedWidget } from "@/components/SeedWidget"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FeatureCarousel />
      <BuildingDemo />
      <CTAStrip />
      <Footer />
      <SeedWidget />
    </main>
  )
}

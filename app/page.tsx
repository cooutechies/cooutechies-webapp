import Navbar from "@/components/layout/Navbar";
import HeroCarousel from "@/components/sections/HeroCarousel";
import AboutSection from "@/components/sections/AboutSection";
import VisionSection from "@/components/sections/VisionSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Footer from "@/components/sections/Footer";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <HeroCarousel />
        <AboutSection />
        <VisionSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}

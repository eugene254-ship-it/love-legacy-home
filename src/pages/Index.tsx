import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import CoreModules from "@/components/CoreModules";
import PhilosophySection from "@/components/PhilosophySection";
import ImpactVision from "@/components/ImpactVision";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Atlas Sanctum - Where Love Meets Legacy";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Transform your family into a living sanctum where purpose, financial wisdom, and collective intelligence thrive together. Join the wisdom-driven family network."
      );
    }
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <CoreModules />
      <PhilosophySection />
      <ImpactVision />
      <Footer />
    </main>
  );
};

export default Index;

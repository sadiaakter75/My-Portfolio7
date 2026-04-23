import Hero from "@/components/Hero";
import InteractiveSection from "@/components/Projects";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Sticky Hero Wrapper */}
      <div className="sticky top-0 w-full h-screen">
        <Hero />
      </div>

      {/* Additional Scrollable Sections */}
      <div id="about">
        <AboutSection />
      </div>
      
      {/* Content that scrolls over the Hero */}
      <div id="projects">
        <InteractiveSection />
      </div>
      
      <div id="services">
        <ServicesSection />
      </div>
      
      {/* Cinematic Reveal Footer */}
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}

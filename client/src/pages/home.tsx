import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { IndustriesSection } from '@/components/industries-section';
import { PositionsSection } from '@/components/positions-section';
import { ClientsSection } from '@/components/clients-section';
import { ProcessSection } from '@/components/process-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <IndustriesSection />
      <PositionsSection />
      <ClientsSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

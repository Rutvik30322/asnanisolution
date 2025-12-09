import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { IndustriesSection } from '@/components/industries-section';
import { RecruitmentOptionsSection } from '@/components/recruitment-options-section';
import { InsightsGuidanceSection } from '@/components/insights-guidance-section';
import { FAQsSection } from '@/components/faqs-section';
import { ClientsSection } from '@/components/clients-section';
import { ProcessSection } from '@/components/process-section';
import { BlogSection } from '@/components/blog-section';
import { FAQSection } from '@/components/faq-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { SEO } from '@/components/seo';

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <IndustriesSection />
      <RecruitmentOptionsSection />
      {/* <InsightsGuidanceSection /> */}
      {/* <FAQsSection /> */}
      <ClientsSection />
      <ProcessSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

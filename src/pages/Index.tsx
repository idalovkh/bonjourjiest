import { useEffect } from "react";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { LazySection } from "@/components/LazySection";
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TeachersSection } from "@/components/TeachersSection";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WaveDivider } from "@/components/Decorations";

const SECTION_FALLBACK = <div className="section-padding min-h-[120px]" aria-hidden="true" />;

const PAGE_TITLE = "Deshar School — Английский с нуля за 4 месяца";

const Index = () => {
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main className="relative">
        <HeroSection />
        <TrustMarquee />

        <LazySection fallback={SECTION_FALLBACK}>
          <AboutSection />
        </LazySection>
        <WaveDivider className="[&_path]:fill-muted/40" />

        <LazySection fallback={SECTION_FALLBACK}>
          <TeachersSection />
        </LazySection>
        <WaveDivider flip className="[&_path]:fill-muted/40" />

        <LazySection fallback={SECTION_FALLBACK}>
          <PricingSection />
        </LazySection>
        <WaveDivider />

        <LazySection fallback={SECTION_FALLBACK}>
          <ReviewsSection />
        </LazySection>
        <WaveDivider flip className="[&_path]:fill-muted/40" />

        <LazySection fallback={SECTION_FALLBACK}>
          <FAQSection />
        </LazySection>
        <WaveDivider />

        <LazySection fallback={SECTION_FALLBACK}>
          <ContactSection />
        </LazySection>
      </main>

      <LazySection fallback={null} rootMargin="600px">
        <Footer />
      </LazySection>

      <LazySection fallback={null} rootMargin="400px">
        <FloatingContact />
      </LazySection>
    </div>
  );
};

export default Index;

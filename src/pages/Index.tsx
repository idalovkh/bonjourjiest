import { useEffect } from "react";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { FloatingContact } from "@/components/FloatingContact";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TeachersSection } from "@/components/TeachersSection";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WaveDivider } from "@/components/Decorations";

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

        <AboutSection />
        <WaveDivider className="[&_path]:fill-muted/40" />

        <TeachersSection />
        <WaveDivider flip className="[&_path]:fill-muted/40" />

        <PricingSection />
        <WaveDivider />

        <ReviewsSection />
        <WaveDivider flip className="[&_path]:fill-muted/40" />

        <FAQSection />
        <WaveDivider />

        <ContactSection />
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;

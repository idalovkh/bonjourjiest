import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { TeachersSection } from "@/components/TeachersSection";
import { PricingSection } from "@/components/PricingSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
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

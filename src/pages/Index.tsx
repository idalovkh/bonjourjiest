import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { TeachersSection } from "@/components/TeachersSection";
import { PricingSection } from "@/components/PricingSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { WaveDivider } from "@/components/Decorations";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <WaveDivider />
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
      <StickyCTA />
    </div>
  );
};

export default Index;

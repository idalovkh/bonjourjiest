import { useEffect, lazy, Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WaveDivider } from "@/components/Decorations";

const AboutSection = lazy(() => import("@/components/AboutSection").then((m) => ({ default: m.AboutSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then((m) => ({ default: m.ContactSection })));
const FAQSection = lazy(() => import("@/components/FAQSection").then((m) => ({ default: m.FAQSection })));
const FloatingContact = lazy(() => import("@/components/FloatingContact").then((m) => ({ default: m.FloatingContact })));
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const PricingSection = lazy(() => import("@/components/PricingSection").then((m) => ({ default: m.PricingSection })));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection").then((m) => ({ default: m.ReviewsSection })));
const TeachersSection = lazy(() => import("@/components/TeachersSection").then((m) => ({ default: m.TeachersSection })));

const SECTION_FALLBACK = <div className="section-padding min-h-[200px]" aria-hidden />;

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

        <Suspense fallback={SECTION_FALLBACK}>
          <AboutSection />
        </Suspense>
        <WaveDivider className="[&_path]:fill-muted/40" />

        <Suspense fallback={SECTION_FALLBACK}>
          <TeachersSection />
        </Suspense>
        <WaveDivider flip className="[&_path]:fill-muted/40" />

        <Suspense fallback={SECTION_FALLBACK}>
          <PricingSection />
        </Suspense>
        <WaveDivider />

        <Suspense fallback={SECTION_FALLBACK}>
          <ReviewsSection />
        </Suspense>
        <WaveDivider flip className="[&_path]:fill-muted/40" />

        <Suspense fallback={SECTION_FALLBACK}>
          <FAQSection />
        </Suspense>
        <WaveDivider />

        <Suspense fallback={SECTION_FALLBACK}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={SECTION_FALLBACK}>
        <Footer />
        <FloatingContact />
      </Suspense>
    </div>
  );
};

export default Index;

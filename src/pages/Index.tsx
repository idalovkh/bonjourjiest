import { useEffect, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WaveDivider } from "@/components/Decorations";
import { LazySection } from "@/components/LazySection";

const AboutSection = lazy(() => import("@/components/AboutSection").then((m) => ({ default: m.AboutSection })));
const TeachersSection = lazy(() => import("@/components/TeachersSection").then((m) => ({ default: m.TeachersSection })));
const PricingSection = lazy(() => import("@/components/PricingSection").then((m) => ({ default: m.PricingSection })));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection").then((m) => ({ default: m.ReviewsSection })));
const FAQSection = lazy(() => import("@/components/FAQSection").then((m) => ({ default: m.FAQSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then((m) => ({ default: m.ContactSection })));
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const FloatingContact = lazy(() => import("@/components/FloatingContact").then((m) => ({ default: m.FloatingContact })));

const SECTION_FALLBACK = <div className="section-padding min-h-[120px]" aria-hidden="true" />;

const PAGE_TITLE = "Deshar School — Английский с нуля за 4 месяца";

const prefetchAll = () => {
  import("@/components/AboutSection");
  import("@/components/TeachersSection");
  import("@/components/PricingSection");
  import("@/components/ReviewsSection");
  import("@/components/FAQSection");
  import("@/components/ContactSection");
  import("@/components/Footer");
  import("@/components/FloatingContact");
};

const Index = () => {
  useEffect(() => {
    document.title = PAGE_TITLE;
    // Prefetch all lazy chunks while browser is idle — instant reveal on scroll
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(prefetchAll, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }
    // Fallback: prefetch after short delay on browsers without requestIdleCallback
    const t = setTimeout(prefetchAll, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main className="relative">
        <HeroSection />
        <TrustMarquee />

        <LazySection fallback={SECTION_FALLBACK}>
          <Suspense fallback={SECTION_FALLBACK}>
            <AboutSection />
          </Suspense>
        </LazySection>
        <WaveDivider className="[&_path]:fill-muted/40" />

        <LazySection fallback={SECTION_FALLBACK}>
          <Suspense fallback={SECTION_FALLBACK}>
            <TeachersSection />
          </Suspense>
        </LazySection>
        <WaveDivider flip className="[&_path]:fill-muted/40" />

        <LazySection fallback={SECTION_FALLBACK}>
          <Suspense fallback={SECTION_FALLBACK}>
            <PricingSection />
          </Suspense>
        </LazySection>
        <WaveDivider />

        <LazySection fallback={SECTION_FALLBACK}>
          <Suspense fallback={SECTION_FALLBACK}>
            <ReviewsSection />
          </Suspense>
        </LazySection>
        <WaveDivider flip className="[&_path]:fill-muted/40" />

        <LazySection fallback={SECTION_FALLBACK}>
          <Suspense fallback={SECTION_FALLBACK}>
            <FAQSection />
          </Suspense>
        </LazySection>
        <WaveDivider />

        <LazySection fallback={SECTION_FALLBACK}>
          <Suspense fallback={SECTION_FALLBACK}>
            <ContactSection />
          </Suspense>
        </LazySection>
      </main>

      <LazySection fallback={null} rootMargin="600px">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </LazySection>

      <Suspense fallback={null}>
        <FloatingContact />
      </Suspense>
    </div>
  );
};

export default Index;

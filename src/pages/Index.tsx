import { useEffect, lazy, Suspense, type ComponentType } from "react";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { TrustMarquee } from "@/components/TrustMarquee";
import { WaveDivider } from "@/components/Decorations";
import { lazyRetry } from "@/utils/lazy-retry";

const lazyLoad = (importFn: () => Promise<{ default: ComponentType<unknown> }>) =>
  lazy(() => lazyRetry(importFn));

const AboutSection = lazyLoad(() => import("@/components/AboutSection").then((m) => ({ default: m.AboutSection })));
const ContactSection = lazyLoad(() => import("@/components/ContactSection").then((m) => ({ default: m.ContactSection })));
const FAQSection = lazyLoad(() => import("@/components/FAQSection").then((m) => ({ default: m.FAQSection })));
const FloatingContact = lazyLoad(() => import("@/components/FloatingContact").then((m) => ({ default: m.FloatingContact })));
const Footer = lazyLoad(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const PricingSection = lazyLoad(() => import("@/components/PricingSection").then((m) => ({ default: m.PricingSection })));
const ReviewsSection = lazyLoad(() => import("@/components/ReviewsSection").then((m) => ({ default: m.ReviewsSection })));
const TeachersSection = lazyLoad(() => import("@/components/TeachersSection").then((m) => ({ default: m.TeachersSection })));

const SECTION_FALLBACK = <div className="section-padding min-h-[200px]" aria-hidden />;

const PAGE_TITLE = "Deshar School — Английский с нуля за 4 месяца";

const Index = () => {
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  return (
    <div className="relative min-h-screen min-h-screen-ios overflow-x-clip bg-background">
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

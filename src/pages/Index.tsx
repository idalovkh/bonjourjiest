import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { SectionDivider } from "@/components/brand/SectionDivider";
import { lazy, Suspense, useEffect, type ComponentType } from "react";
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
const TrustMarquee = lazyLoad(() => import("@/components/TrustMarquee").then((m) => ({ default: m.TrustMarquee })));

const SECTION_FALLBACK = <div className="section-padding min-h-[200px]" aria-hidden />;
const MARQUEE_FALLBACK = <div className="py-8 sm:py-10 border-y border-border/40 bg-muted/30 min-h-[3rem]" aria-hidden />;

const PAGE_TITLE = "bonjour жи есть — Французский с нуля за 4 месяца";

const Index = () => {
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  return (
    <div className="relative min-h-screen min-h-screen-ios overflow-x-clip bg-background">
      <Navbar />
      <main className="relative">
        <HeroSection />
        <Suspense fallback={MARQUEE_FALLBACK}>
          <TrustMarquee />
        </Suspense>

        <Suspense fallback={SECTION_FALLBACK}>
          <AboutSection />
        </Suspense>
        <SectionDivider />

        <Suspense fallback={SECTION_FALLBACK}>
          <TeachersSection />
        </Suspense>
        <SectionDivider />

        <Suspense fallback={SECTION_FALLBACK}>
          <PricingSection />
        </Suspense>
        <SectionDivider />

        <Suspense fallback={SECTION_FALLBACK}>
          <ReviewsSection />
        </Suspense>
        <SectionDivider />

        <Suspense fallback={SECTION_FALLBACK}>
          <FAQSection />
        </Suspense>
        <SectionDivider />

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

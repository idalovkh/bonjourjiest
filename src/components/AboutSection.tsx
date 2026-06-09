import { motion } from "framer-motion";
import { MessageCircle, ShieldCheck, Zap } from "lucide-react";
import { BrandName } from "@/components/brand/BrandName";

const features = [
  {
    icon: MessageCircle,
    title: "Разговорный французский",
    desc: "Уроки, на которых учим говорить, а не просто делать грамматические упражнения",
  },
  {
    icon: ShieldCheck,
    title: "DELF/DALF аттестация",
    desc: "Учителя с международными сертификатами",
  },
  {
    icon: Zap,
    title: "Первый урок бесплатный",
    desc: "Попробуй формат обучения без обязательств",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      <div className="container mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 tracking-tight flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            <span className="font-normal">Почему</span>
            <BrandName size="inherit" layout="inline" className="text-3xl sm:text-4xl lg:text-5xl" />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto items-stretch">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              data-suppress-hover-during-scroll
              className="group relative flex flex-col rounded-3xl bg-card border border-border/60 overflow-hidden transition-[transform,box-shadow,border-color] duration-300 can-hover:hover:-translate-y-1 can-hover:hover:shadow-md p-5 sm:p-6 lg:p-8 h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            >
              <div>
                <div data-suppress-hover-icon className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center can-hover:group-hover:scale-105 transition-[transform] duration-300 mb-6">
                  <f.icon size={26} className="text-primary" strokeWidth={1.8} />
                </div>

                <h3 className="font-display font-bold text-foreground tracking-tight text-xl mb-2">
                  {f.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

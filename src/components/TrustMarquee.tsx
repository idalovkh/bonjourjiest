import { motion } from "framer-motion";

const trustItems = [
  "Cambridge English",
  "IELTS",
  "TOEFL",
  "TESOL",
  "TPEPS",
  "Cambridge English",
  "IELTS",
  "TOEFL",
  "TESOL",
  "TPEPS",
];

export function TrustMarquee() {
  return (
    <section className="py-8 sm:py-10 overflow-hidden border-y border-border/40 bg-muted/30">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {trustItems.map((item, i) => (
            <span
              key={i}
              className="text-lg sm:text-xl font-bold tracking-wider text-muted-foreground/40 uppercase select-none"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

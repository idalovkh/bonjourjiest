import { motion } from "framer-motion";
import { User } from "lucide-react";

/** Заполните name, role и photo для каждого преподавателя */
const teachers = [
  { name: "", role: "", photo: "" },
  { name: "", role: "", photo: "" },
  { name: "", role: "", photo: "" },
];

export function TeachersSection() {
  return (
    <section id="teachers" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: "-20px" }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            Наши <span className="gradient-text">преподаватели</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Команда сертифицированных лингвистов с большим опытом
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {teachers.map((teacher, i) => (
            <motion.article
              key={i}
              className="overflow-hidden rounded-3xl border border-border/60 bg-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            >
              <div className="relative aspect-[4/5] bg-muted/70 border-b border-border/50">
                {teacher.photo ? (
                  <img
                    src={teacher.photo}
                    alt={teacher.name || "Преподаватель"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground/35">
                    <User size={56} strokeWidth={1.25} aria-hidden />
                  </div>
                )}
              </div>

              <div className="min-h-[5.5rem] p-5 sm:p-6">
                {teacher.name ? (
                  <h3 className="font-display text-lg font-bold text-foreground">{teacher.name}</h3>
                ) : (
                  <div className="mb-2 h-5 w-32 rounded bg-muted/80" aria-hidden />
                )}
                {teacher.role ? (
                  <p className="mt-1 text-sm text-muted-foreground">{teacher.role}</p>
                ) : (
                  <div className="h-4 w-24 rounded bg-muted/60" aria-hidden />
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

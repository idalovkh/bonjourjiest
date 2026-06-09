import { motion } from "framer-motion";
import { User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@/components/ui/carousel";

/** Заполните name, role и photo для каждого преподавателя */
const teachers = [
  { name: "", role: "", photo: "" },
  { name: "", role: "", photo: "" },
  { name: "", role: "", photo: "" },
];

const carouselOpts = {
  align: "start" as const,
  loop: true,
  containScroll: "trimSnaps" as const,
};

const carouselItemClassName = "pl-4 basis-full sm:basis-1/2 lg:basis-1/3";

export function TeachersSection() {
  return (
    <section id="teachers" className="section-padding bg-white">
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

        <div className="relative max-w-5xl mx-auto">
          <Carousel opts={carouselOpts} className="w-full">
            <CarouselContent className="-ml-4">
              {teachers.map((teacher, i) => (
                <CarouselItem key={i} className={carouselItemClassName}>
                  <article className="h-full overflow-hidden rounded-3xl border border-primary/25 bg-white shadow-sm">
                    <div className="relative aspect-[4/5] bg-primary/10 border-b border-primary/15">
                      {teacher.photo ? (
                        <img
                          src={teacher.photo}
                          alt={teacher.name || "Преподаватель"}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-primary/30">
                          <User size={56} strokeWidth={1.25} aria-hidden />
                        </div>
                      )}
                    </div>

                    <div className="min-h-[5.5rem] bg-white p-5 sm:p-6">
                      {teacher.name ? (
                        <h3 className="font-display text-lg font-bold text-primary">{teacher.name}</h3>
                      ) : (
                        <div className="mb-2 h-5 w-32 rounded bg-primary/15" aria-hidden />
                      )}
                      {teacher.role ? (
                        <p className="mt-1 text-sm text-primary/70">{teacher.role}</p>
                      ) : (
                        <div className="h-4 w-24 rounded bg-primary/10" aria-hidden />
                      )}
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselControls />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

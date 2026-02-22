import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { CheckCircle, ArrowRight, Gift, Clock, UserCheck } from "lucide-react";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100),
  contact: z.string().trim().min(1, "Введите контакт").max(200),
});

const perks = [
  { icon: Gift, text: "Первый урок бесплатный" },
  { icon: Clock, text: "Занимает всего 25 минут" },
  { icon: UserCheck, text: "Определим твой уровень" },
];

export function ContactSection() {
  const isMobile = useIsMobile();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const mountedRef = useRef(true);
  const { toast } = useToast();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse({ name, contact });
    if (!parsed.success) {
      toast({
        title: "Ошибка",
        description: parsed.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    // Показываем успех сразу, запрос уходит в фоне
    setSubmitted(true);
    toast({ title: "Заявка отправлена!", description: "Мы свяжемся с вами в ближайшее время." });

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: parsed.data.name, contact: parsed.data.contact }),
    })
      .then((res) => {
        if (res.ok) return;
        return res.json().then((data: { error?: string; detail?: string }) => {
          if (mountedRef.current) {
            setSubmitted(false);
            const description = data?.detail ?? data?.error ?? "Заявка не дошла. Попробуйте ещё раз или напишите нам в Telegram.";
            toast({
              title: "Ошибка отправки",
              description,
              variant: "destructive",
            });
          }
        });
      })
      .catch(() => {
        if (mountedRef.current) {
          setSubmitted(false);
          toast({
            title: "Ошибка отправки",
            description: "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.",
            variant: "destructive",
          });
        }
      });
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Background decorations — no blur on mobile (Safari perf), blur on desktop */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute top-0 left-1/4 w-[50%] h-[60%] rounded-full bg-primary/5 ${isMobile ? "contact-bg-no-blur" : "blur-[120px]"}`} />
        <div className={`absolute bottom-0 right-1/4 w-[40%] h-[50%] rounded-full bg-secondary/5 ${isMobile ? "contact-bg-no-blur" : "blur-[100px]"}`} />
      </div>

      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Gradient background card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(210,80%,48%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(172,66%,50%,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(217,91%,70%,0.3),transparent_50%)]" />

            <div className="relative grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 p-5 sm:p-8 lg:p-14 min-w-0">
              {/* Left — text */}
              <div className="flex flex-col justify-center min-w-0">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
                  Запишись на
                  <br />
                  пробный урок
                </h2>
                <p className="text-white/70 text-xl mb-10">
                  Менеджер свяжется и запишет на бесплатное занятие
                </p>

                <div className="space-y-4">
                  {perks.map((p) => (
                    <div key={p.text} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <p.icon size={20} className="text-secondary" />
                      </div>
                      <span className="text-base text-white/80">{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — form */}
              <div className="flex items-center min-w-0">
                <div className="bg-card rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl w-full min-w-0">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} className="text-secondary" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">Спасибо!</h3>
                      <p className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="text-center mb-3">
                        <p className="text-base font-semibold text-foreground">Оставь заявку</p>
                        <p className="text-sm text-muted-foreground">и мы с тобой свяжемся</p>
                      </div>

                      <div>
                        <Label htmlFor="name" className="text-base font-medium">Как тебя зовут?</Label>
                        <Input
                          id="name"
                          placeholder="Твое имя"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-2 rounded-xl h-14 text-base border-border/60 focus:border-primary"
                          maxLength={100}
                        />
                      </div>

                      <div>
                        <Label htmlFor="contact-field" className="text-base font-medium">Ник или номер в Telegram</Label>
                        <Input
                          id="contact-field"
                          placeholder="@username или +7 999 999-99-99"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="mt-2 rounded-xl h-14 text-base border-border/60 focus:border-primary"
                          maxLength={200}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full rounded-full min-h-[48px] h-14 text-base font-semibold gradient-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-200 touch-manipulation"
                        size="lg"
                      >
                        Записаться бесплатно
                        <ArrowRight size={18} className="ml-2" />
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Нажимая кнопку, вы соглашаетесь с{" "}
                        <Link to="/privacy" className="underline hover:text-foreground transition-colors">
                          политикой конфиденциальности
                        </Link>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, ArrowRight, Gift, Clock, UserCheck } from "lucide-react";
import { z } from "zod";
import contactIllustration from "@/assets/contact-illustration.webp";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100),
  contact: z.string().trim().min(1, "Введите контакт").max(200),
});

const perks = [
  { icon: Gift, text: "Первый урок бесплатно" },
  { icon: Clock, text: "Занимает всего 25 минут" },
  { icon: UserCheck, text: "Определим ваш уровень" },
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
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

    setLoading(true);
    const { error } = await supabase
      .from("leads")
      .insert({ name: parsed.data.name, contact: parsed.data.contact });

    setLoading(false);
    if (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте ещё раз.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    toast({ title: "Заявка отправлена!", description: "Мы свяжемся с вами в ближайшее время." });
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[50%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[40%] h-[50%] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Gradient background card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(255,65%,52%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(172,66%,50%,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(243,75%,70%,0.3),transparent_50%)]" />

            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 sm:p-10 lg:p-14">
              {/* Left — text + illustration */}
              <div className="flex flex-col justify-center">
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
                  Запишись на
                  <br />
                  пробный урок
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  Менеджер свяжется и запишет на бесплатное занятие
                </p>

                <div className="space-y-3 mb-8">
                  {perks.map((p) => (
                    <div key={p.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <p.icon size={16} className="text-secondary" />
                      </div>
                      <span className="text-sm text-white/80">{p.text}</span>
                    </div>
                  ))}
                </div>

                <motion.img
                  src={contactIllustration}
                  alt="Преподаватель"
                  className="hidden lg:block w-64 mt-auto mx-auto drop-shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Right — form */}
              <div className="flex items-center">
                <div className="bg-card rounded-2xl p-8 shadow-2xl w-full">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} className="text-secondary" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">Спасибо!</h3>
                      <p className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="text-center mb-2">
                        <p className="text-sm font-semibold text-foreground">Оставьте заявку</p>
                        <p className="text-xs text-muted-foreground">и мы перезвоним за 5 минут</p>
                      </div>
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium">Имя</Label>
                        <Input
                          id="name"
                          placeholder="Ваше имя"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1.5 rounded-xl h-12 border-border/60 focus:border-primary"
                          maxLength={100}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact" className="text-sm font-medium">Телеграм или телефон</Label>
                        <Input
                          id="contact"
                          placeholder="@username или +7 999 999-99-99"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="mt-1.5 rounded-xl h-12 border-border/60 focus:border-primary"
                          maxLength={200}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full rounded-full h-13 text-sm font-semibold gradient-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-200"
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? "Отправка..." : (
                          <>
                            Записаться бесплатно
                            <ArrowRight size={16} className="ml-2" />
                          </>
                        )}
                      </Button>
                      <p className="text-[11px] text-center text-muted-foreground">
                        Нажимая кнопку, вы соглашаетесь с{" "}
                        <a href="/privacy" className="underline hover:text-foreground transition-colors">
                          политикой конфиденциальности
                        </a>
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

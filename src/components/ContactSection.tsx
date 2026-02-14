import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, ArrowRight, Gift, Clock, UserCheck, Mail, Phone, Send, MessageCircle } from "lucide-react";
import { z } from "zod";

const MaxIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    <path d="M9 8l3 4 3-4" />
    <path d="M9 16l3-4 3 4" />
  </svg>
);

const contactMethods = [
  { id: "telegram", label: "Телеграм", icon: Send, placeholder: "@username" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, placeholder: "+7 999 999-99-99" },
  { id: "phone", label: "Телефон", icon: Phone, placeholder: "+7 999 999-99-99" },
  { id: "email", label: "Почта", icon: Mail, placeholder: "you@example.com" },
  { id: "max", label: "Max", icon: MaxIcon, placeholder: "@username" },
] as const;

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
  const [method, setMethod] = useState<string>("telegram");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const activeMethod = contactMethods.find((m) => m.id === method)!;

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
      .insert({ name: parsed.data.name, contact: `[${method}] ${parsed.data.contact}` });

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
              {/* Left — text */}
              <div className="flex flex-col justify-center">
                <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
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
              <div className="flex items-center">
                <div className="bg-card rounded-2xl p-10 shadow-2xl w-full">
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
                        <p className="text-base font-semibold text-foreground">Оставьте заявку</p>
                        <p className="text-sm text-muted-foreground">и мы перезвоним за 5 минут</p>
                      </div>

                      <div>
                        <Label htmlFor="name" className="text-base font-medium">Имя</Label>
                        <Input
                          id="name"
                          placeholder="Ваше имя"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-2 rounded-xl h-14 text-base border-border/60 focus:border-primary"
                          maxLength={100}
                        />
                      </div>

                      <div>
                        <Label className="text-base font-medium mb-2.5 block">Способ связи</Label>
                        <div className="flex gap-2.5">
                          {contactMethods.map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => { setMethod(m.id); setContact(""); }}
                              title={m.label}
                              className={`flex-1 flex items-center justify-center py-4 rounded-xl transition-all duration-200 ${
                                method === m.id
                                  ? "bg-primary text-primary-foreground shadow-md"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              }`}
                            >
                              <m.icon size={22} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="contact" className="text-base font-medium">{activeMethod.label}</Label>
                        <Input
                          id="contact"
                          placeholder={activeMethod.placeholder}
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="mt-2 rounded-xl h-14 text-base border-border/60 focus:border-primary"
                          maxLength={200}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full rounded-full h-14 text-base font-semibold gradient-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-200"
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? "Отправка..." : (
                          <>
                            Записаться бесплатно
                            <ArrowRight size={18} className="ml-2" />
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

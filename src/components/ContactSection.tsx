import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ArrowRight, MessageCircle, Users, Sparkles } from "lucide-react";
import { z } from "zod";
import { LeadPreferencesModal } from "@/components/LeadPreferencesModal";
import { EMPTY_LEAD_PREFERENCES, type LeadPreferences } from "@/lib/lead-preferences";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100),
  contact: z.string().trim().min(1, "Введите контакт").max(200),
});

const perks = [
  { icon: MessageCircle, text: "Ответим в Telegram в рабочее время" },
  { icon: Users, text: "Подберём группу, индивидуально или для ребёнка" },
  { icon: Sparkles, text: "Поможем с уровнем — можно пройти квиз выше" },
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mountedRef = useRef(true);
  const { toast } = useToast();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const submitLead = (preferences: LeadPreferences) => {
    const parsed = leadSchema.safeParse({ name, contact });
    if (!parsed.success) {
      toast({
        title: "Ошибка",
        description: parsed.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const fallbackError = "Заявка не дошла. Попробуйте ещё раз или напишите нам в Telegram.";
    fetch("/api/lead/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: parsed.data.name,
        contact: parsed.data.contact,
        source: "lead_request",
        landing: "FR",
        studyFrequency: preferences.studyFrequency,
        preferredTime: preferences.preferredTime,
        currentLevel: preferences.currentLevel,
      }),
      signal: controller.signal,
    })
      .then((res) => {
        if (res.ok) {
          if (mountedRef.current) {
            setPreferencesOpen(false);
            setSubmitted(true);
            toast({
              title: "Заявка отправлена!",
              description: "Мы свяжемся с вами в ближайшее время.",
            });
          }
          return;
        }
        return res.text().then((text) => {
          let data: { error?: string; detail?: string } = {};
          try {
            data = JSON.parse(text) as { error?: string; detail?: string };
          } catch {
            // Ответ не JSON (502, HTML и т.п.)
          }
          if (mountedRef.current) {
            const description = data?.detail ?? data?.error ?? fallbackError;
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
          toast({
            title: "Ошибка отправки",
            description: "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.",
            variant: "destructive",
          });
        }
      })
      .finally(() => {
        clearTimeout(timeoutId);
        if (mountedRef.current) {
          setIsSubmitting(false);
        }
      });
  };

  const handleBasicContinue = (e: React.FormEvent) => {
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
    setPreferencesOpen(true);
  };

  return (
    <section id="contact" className="relative section-padding bg-background overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative rounded-3xl overflow-hidden border border-primary/15 tricolor-top shadow-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 p-6 sm:p-8 lg:p-12 min-w-0">
              <div className="flex flex-col justify-center min-w-0">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-3 sm:mb-4 tracking-tight">
                  Начни учить
                  <br />
                  французский
                </h2>
                <p className="text-muted-foreground text-lg sm:text-xl mb-8 sm:mb-10 leading-relaxed">
                  Расскажем про формат и подберём программу
                </p>

                <div className="space-y-4">
                  {perks.map((p) => (
                    <div key={p.text} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <p.icon size={20} className="text-primary" />
                      </div>
                      <span className="text-base text-foreground/85 pt-2">{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center min-w-0">
                {submitted ? (
                  <div className="text-center py-8 w-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">Спасибо!</h3>
                    <p className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBasicContinue} className="space-y-6 w-full min-w-0">
                    <div className="mb-1">
                      <p className="text-base font-semibold text-foreground">Оставь заявку</p>
                      <p className="text-sm text-muted-foreground">и мы с тобой свяжемся</p>
                    </div>

                    <div>
                      <Label htmlFor="name" className="text-base font-medium">
                        Как тебя зовут?
                      </Label>
                      <Input
                        id="name"
                        placeholder="Твое имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 rounded-xl h-14 text-base border-primary/20 focus:border-primary"
                        maxLength={100}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-field" className="text-base font-medium">
                        Ник или номер в Telegram
                      </Label>
                      <Input
                        id="contact-field"
                        placeholder="@username или +7 999 999-99-99"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="mt-2 rounded-xl h-14 text-base border-primary/20 focus:border-primary"
                        maxLength={200}
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full rounded-full min-h-[48px] h-14 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity touch-manipulation"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      Отправить заявку
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
          </motion.div>
        </div>
      </div>

      <LeadPreferencesModal
        open={preferencesOpen}
        onOpenChange={setPreferencesOpen}
        showLevelQuestion
        isSubmitting={isSubmitting}
        onSkip={() => submitLead(EMPTY_LEAD_PREFERENCES)}
        onSubmit={submitLead}
      />
    </section>
  );
}

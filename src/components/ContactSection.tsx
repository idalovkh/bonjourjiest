import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, ArrowRight } from "lucide-react";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100),
  contact: z.string().trim().min(1, "Введите контакт").max(200),
});

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
    <section id="contact" className="relative section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
              Запишись на <span className="gradient-text">пробный урок</span>
            </h2>
            <p className="text-muted-foreground">
              Менеджер свяжется и запишет на бесплатное занятие
            </p>
          </motion.div>

          <motion.div
            className="card-elevated p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-secondary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Спасибо!</h3>
                <p className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Имя</Label>
                  <Input
                    id="name"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 rounded-xl h-11"
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
                    className="mt-1.5 rounded-xl h-11"
                    maxLength={200}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full h-12 text-sm font-semibold gradient-primary shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
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
                <p className="text-xs text-center text-muted-foreground pt-1">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="/privacy" className="underline hover:text-foreground transition-colors">
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

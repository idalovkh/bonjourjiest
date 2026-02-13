import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, CheckCircle } from "lucide-react";
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
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-lg mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Оставь свой телеграм
            </h2>
            <p className="text-muted-foreground">
              Менеджер свяжется и запишет на пробный урок
            </p>
          </motion.div>

          <motion.div
            className="bg-card rounded-2xl p-8 border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto text-secondary mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Спасибо!</h3>
                <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Телеграм или телефон</Label>
                  <Input
                    id="contact"
                    placeholder="@username или +7 (999) 999-99-99"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-1.5"
                    maxLength={200}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Отправка..." : (
                    <>
                      ОТПРАВИТЬ
                      <Send size={16} className="ml-2" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Нажимая «Отправить», вы соглашаетесь с нашей{" "}
                  <a href="/privacy" className="underline hover:text-foreground">
                    Политикой конфиденциальности и условиями использования
                  </a>
                </p>
              </form>
            )}
          </motion.div>

          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>Телефон для связи: +7 (999) 999-99-99</p>
            <p className="mt-1">Пишите, проконсультируем вас онлайн!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone, Instagram } from "lucide-react";

const channels = [
  {
    id: "telegram",
    label: "Telegram",
    icon: Send,
    href: "https://t.me/+79067742949",
    color: "bg-[hsl(200,80%,50%)]",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/79067742949",
    color: "bg-[hsl(142,70%,42%)]",
  },
  {
    id: "phone",
    label: "Позвонить",
    icon: Phone,
    href: "tel:+79067742949",
    color: "bg-[hsl(217,91%,60%)]",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/deshar_school/",
    color: "bg-[hsl(330,70%,55%)]",
  },
];

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Channel buttons */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="flex flex-col gap-2.5 mb-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Mini card */}
                <div className="bg-card rounded-2xl shadow-2xl border border-border/50 p-4 w-56">
                  <p className="text-sm font-semibold text-foreground mb-1">Свяжитесь с нами</p>
                  <p className="text-xs text-muted-foreground mb-3">Выберите удобный способ</p>
                  <div className="space-y-2">
                    {channels.map((ch, i) => (
                      <motion.a
                        key={ch.id}
                        href={ch.href}
                        target={ch.id !== "phone" ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/60 transition-colors group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className={`w-9 h-9 rounded-lg ${ch.color} flex items-center justify-center shrink-0`}>
                          <ch.icon size={18} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {ch.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-14 h-14 rounded-full gradient-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            aria-label={open ? "Закрыть" : "Связаться"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} className="text-white" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MessageCircle size={24} className="text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

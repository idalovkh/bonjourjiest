import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import { useScrollY } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const scrollY = useScrollY();
  const visible = scrollY > 400;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed z-50 flex flex-col items-end gap-3 bottom-[max(1rem,calc(1rem+env(safe-area-inset-bottom)))] right-4 lg:bottom-2 lg:right-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <AnimatePresence>
            {open && (
              <motion.div
                className="flex flex-col items-end mb-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="min-w-[260px] max-w-[calc(100vw-2rem)] sm:min-w-[280px] gradient-primary rounded-full h-14 text-base font-semibold hover:opacity-90 transition-opacity"
                >
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Бесплатный пробный урок
                    <ArrowRight size={18} className="ml-2" />
                  </a>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen((v) => !v)}
            className="w-14 h-14 min-w-[48px] min-h-[48px] rounded-full gradient-primary hover:opacity-90 flex items-center justify-center transition-all duration-200 touch-manipulation active:scale-95"
            aria-label={open ? "Закрыть" : "Записаться на пробный урок"}
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

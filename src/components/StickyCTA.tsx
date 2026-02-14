import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:hidden"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Button
            asChild
            size="lg"
            className="w-full gradient-primary rounded-full h-14 text-base font-semibold shadow-2xl shadow-primary/30"
          >
            <a href="#contact">
              Бесплатный пробный урок
              <ArrowRight size={18} className="ml-2" />
            </a>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

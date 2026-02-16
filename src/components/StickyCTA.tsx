import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollY } from "@/hooks/use-scroll";

export function StickyCTA() {
  const scrollY = useScrollY();
  const visible = scrollY > 600;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-sm:hidden lg:hidden"
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

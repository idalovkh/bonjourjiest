import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useScrollY, useBodyScrollLock } from "@/hooks/use-scroll";
import logo from "@/assets/logo.webp";

const navLinks = [
  { href: "#about", label: "О школе" },
  { href: "#teachers", label: "Преподаватели" },
  { href: "#pricing", label: "Цены" },
  { href: "#reviews", label: "Отзывы" },
];

const instantTransition = { duration: 0 };

export function Navbar() {
  const scrollY = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const scrolled = scrollY > 20;
  const menuTransition = reducedMotion ? instantTransition : { duration: 0.25, ease: "easeInOut" as const };
  const linkStagger = reducedMotion ? 0 : 0.05;

  useBodyScrollLock(mobileOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <nav
        className={`mx-auto max-w-[1200px] flex items-center justify-between min-h-14 h-14 px-4 sm:px-6 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-xl shadow-md border border-border/40"
            : "bg-card/80 backdrop-blur-lg shadow-sm border border-border/30"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Deshar School" className="h-7 w-auto" width={140} height={36} decoding="async" fetchPriority="high" />
          <span className="text-sm font-bold text-foreground tracking-tight hidden sm:inline">
            Deshar School
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="rounded-full px-5 h-9 gradient-primary text-xs font-semibold shadow-sm hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-200"
          >
            <a href="#contact">Записаться</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground p-3 -mr-1 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full active:bg-muted/60 touch-manipulation"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden mx-auto max-w-[1200px] mt-2 bg-card/95 backdrop-blur-xl rounded-2xl border border-border/40 shadow-lg px-5 pb-4 pt-2 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={menuTransition}
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center py-4 min-h-[44px] text-base text-muted-foreground hover:text-foreground active:bg-muted/50 border-b border-border/30 last:border-0 touch-manipulation"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * linkStagger, duration: menuTransition.duration }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.2, duration: menuTransition.duration }}
            >
              <Button asChild className="w-full mt-4 min-h-[48px] rounded-full gradient-primary text-base font-semibold touch-manipulation" size="lg">
                <a href="#contact" onClick={() => setMobileOpen(false)}>Записаться</a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

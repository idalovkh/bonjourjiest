import { memo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/use-scroll";

interface Teacher {
  name: string;
  role?: string;
  photo: string;
  facts: string[];
  bio: string;
}

interface TeacherModalProps {
  teacher: Teacher | null;
  onClose: () => void;
}

export const TeacherModal = memo(function TeacherModal({ teacher, onClose }: TeacherModalProps) {
  useBodyScrollLock(!!teacher);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!teacher) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [teacher, onClose]);

  useEffect(() => {
    if (teacher) closeButtonRef.current?.focus();
  }, [teacher]);

  return (
    <AnimatePresence>
      {teacher && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="teacher-modal-title"
            className="relative flex max-h-[90vh] max-w-md w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-10 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
              aria-label="Закрыть"
            >
              <X size={16} />
            </button>
            <div className="relative aspect-[3/4] max-h-[50vh] min-h-0 w-full shrink-0 overflow-hidden bg-muted/30">
              <img
                src={teacher.photo}
                alt={teacher.name}
                width={400}
                height={533}
                decoding="async"
                className="absolute inset-0 size-full scale-[1.2] object-cover object-center"
              />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <h3 id="teacher-modal-title" className="font-display text-xl font-bold text-foreground">{teacher.name}</h3>
              {teacher.role && (
                <p className="text-sm font-semibold text-primary mb-2">{teacher.role}</p>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{teacher.bio}</p>
              <ul className="space-y-1.5">
                {teacher.facts.map((f) => (
                  <li key={f} className="text-sm text-foreground/80 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

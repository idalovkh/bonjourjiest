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

export function TeacherModal({ teacher, onClose }: TeacherModalProps) {
  useBodyScrollLock(!!teacher);

  return (
    <AnimatePresence>
      {teacher && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-card rounded-2xl border border-border/60 shadow-2xl max-w-md w-full overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={teacher.photo}
                alt={teacher.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-foreground">{teacher.name}</h3>
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
}

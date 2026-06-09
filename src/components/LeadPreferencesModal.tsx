import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CURRENT_LEVEL_OPTIONS,
  EMPTY_LEAD_PREFERENCES,
  PREFERRED_TIME_OPTIONS,
  STUDY_FREQUENCY_OPTIONS,
  type LeadPreferences,
} from "@/lib/lead-preferences";

const selectTriggerClass =
  "mt-1.5 rounded-xl h-11 text-sm sm:text-base border-primary/20 focus:ring-primary focus:ring-1";

const selectContentClass = "z-[100]";

interface LeadPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showLevelQuestion?: boolean;
  isSubmitting?: boolean;
  onSkip: () => void;
  onSubmit: (preferences: LeadPreferences) => void;
}

export function LeadPreferencesModal({
  open,
  onOpenChange,
  showLevelQuestion = true,
  isSubmitting = false,
  onSkip,
  onSubmit,
}: LeadPreferencesModalProps) {
  const [studyFrequency, setStudyFrequency] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");

  useEffect(() => {
    if (!open) {
      setStudyFrequency("");
      setPreferredTime("");
      setCurrentLevel("");
    }
  }, [open]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (isSubmitting) return;
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        overlayClassName="z-[60]"
        className="gap-0 z-[60] w-[calc(100%-2rem)] max-w-[520px] max-h-[min(90dvh,680px)] overflow-y-auto rounded-2xl border-primary/20 p-5 sm:p-6"
      >
        <DialogHeader className="text-left space-y-1.5 mb-4 sm:mb-5">
          <DialogTitle className="font-display text-lg sm:text-xl font-bold tracking-tight">
            Пара уточнений
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Ответь на пару вопросов — по желанию, чтобы мы лучше подобрали под тебя условия
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="pref-study-frequency" className="text-sm font-medium leading-snug">
              Сколько раз в неделю ты хочешь заниматься?
            </Label>
            <Select
              value={studyFrequency || undefined}
              onValueChange={setStudyFrequency}
              disabled={isSubmitting}
            >
              <SelectTrigger id="pref-study-frequency" className={selectTriggerClass}>
                <SelectValue placeholder="Не указано" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {STUDY_FREQUENCY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pref-preferred-time" className="text-sm font-medium leading-snug">
              Какое время для тебя будет удобным?
            </Label>
            <Select
              value={preferredTime || undefined}
              onValueChange={setPreferredTime}
              disabled={isSubmitting}
            >
              <SelectTrigger id="pref-preferred-time" className={selectTriggerClass}>
                <SelectValue placeholder="Не указано" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {PREFERRED_TIME_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showLevelQuestion && (
            <div>
              <Label htmlFor="pref-current-level" className="text-sm font-medium leading-snug">
                Какой у тебя текущий уровень?
              </Label>
              <Select
                value={currentLevel || undefined}
                onValueChange={setCurrentLevel}
                disabled={isSubmitting}
              >
                <SelectTrigger id="pref-current-level" className={selectTriggerClass}>
                  <SelectValue placeholder="Не указано" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {CURRENT_LEVEL_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-2.5 pt-1">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:flex-1 rounded-full min-h-[44px] h-11 text-sm sm:text-base font-semibold border-primary/30 touch-manipulation"
              size="lg"
              onClick={onSkip}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Пропустить"}
            </Button>
            <Button
              type="button"
              className="w-full sm:flex-1 rounded-full min-h-[44px] h-11 text-sm sm:text-base font-semibold gradient-primary hover:opacity-90 transition-opacity touch-manipulation"
              size="lg"
              onClick={() =>
                onSubmit({
                  studyFrequency,
                  preferredTime,
                  currentLevel: showLevelQuestion ? currentLevel : "",
                })
              }
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Отправляем…
                </>
              ) : (
                <>
                  Отправить заявку
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

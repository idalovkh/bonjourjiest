import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OptionId, Question } from "./model";

interface QuestionScreenProps {
  step: number;
  total: number;
  progressPercent: number;
  current: Question;
  questionPreview: ReactNode;
  selected: OptionId | undefined;
  canNext: boolean;
  onSelect: (id: OptionId) => void;
  onBack: () => void;
  onNext: () => void;
}

export function QuestionScreen({
  step,
  total,
  progressPercent,
  current,
  questionPreview,
  selected,
  canNext,
  onSelect,
  onBack,
  onNext,
}: QuestionScreenProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-border/60 bg-background/90 p-4 sm:p-5">
      <div className="space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Вопрос {step + 1} из {total}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-4">
        <p className="text-lg font-semibold text-foreground">{questionPreview}</p>
      </div>

      <div className="space-y-2">
        {current.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
              selected === option.id
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border/70 bg-card/70 hover:bg-muted/70"
            }`}
          >
            <span className="mr-2 font-medium">{option.id})</span>
            <span>{option.text}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={onBack} disabled={step === 0} className="rounded-full">
          Назад
        </Button>
        <Button type="button" onClick={onNext} disabled={!canNext} className="gradient-primary rounded-full px-6">
          {step === total - 1 ? "Получить результат" : "Следующий вопрос"}
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

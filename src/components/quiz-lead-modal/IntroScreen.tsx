import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntroScreenProps {
  onStart: () => void;
  onClose: () => void;
}

export function IntroScreen({ onStart, onClose }: IntroScreenProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-center">
          <p className="text-xs text-muted-foreground">Длительность</p>
          <p className="text-base sm:text-lg font-semibold text-foreground">~3 минуты</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-center">
          <p className="text-xs text-muted-foreground">Вопросов</p>
          <p className="text-base sm:text-lg font-semibold text-foreground">10</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-center">
          <p className="text-xs text-muted-foreground">Результат</p>
          <p className="text-base sm:text-lg font-semibold text-foreground">Сразу после теста</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={onStart} className="gradient-primary rounded-full px-7 text-base sm:text-lg hover:opacity-90 transition-opacity">
          Начать диагностику
          <ArrowRight size={16} className="ml-2" />
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="rounded-full px-6 text-base sm:text-lg">
          Позже
        </Button>
      </div>
    </div>
  );
}

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AchievementAction } from "./AchievementAction";
import { getLevelDescription, getPersonalRecommendations } from "./data";
import type { NextLevelTarget, QuizResult } from "./model";

interface ResultsScreenProps {
  result: QuizResult;
  total: number;
  accuracy: number;
  nextLevelTarget: NextLevelTarget | null;
  name: string;
  contact: string;
  sending: boolean;
  onNameChange: (value: string) => void;
  onContactChange: (value: string) => void;
  onRestart: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ResultsScreen({
  result,
  total,
  accuracy,
  nextLevelTarget,
  name,
  contact,
  sending,
  onNameChange,
  onContactChange,
  onRestart,
  onSubmit,
}: ResultsScreenProps) {
  const levelDescription = getLevelDescription(result.level);
  const recommendations = getPersonalRecommendations(result.level, result.wrongTopics, nextLevelTarget?.level ?? null);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-primary/20 bg-card/80 p-4 sm:p-5 shadow-sm text-center">
        <div className="mb-4 flex items-start">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-primary" />
            <p className="text-lg font-semibold">Результаты</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-center flex h-full flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Правильные ответы</p>
            <p className="text-2xl font-bold text-foreground">{result.score}/{total}</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-center flex h-full flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Точность</p>
            <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-border/60 bg-background/70 p-4 text-left">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Текущий уровень</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{result.level}</p>
          {nextLevelTarget && (
            <p className="mt-1 text-sm text-muted-foreground">
              До уровня {nextLevelTarget.level} осталось {Math.max(0, nextLevelTarget.score - result.score)} правильных ответов.
            </p>
          )}
          <AchievementAction result={result} total={total} accuracy={accuracy} />
        </div>

        <div className="mt-4 rounded-xl border border-border/60 bg-background/70 p-4 text-left">
          <p className="text-xl font-semibold text-foreground">{levelDescription.title}</p>
          <p className="mt-2 text-base sm:text-lg leading-relaxed">{levelDescription.description}</p>
        </div>

        <div className="mt-4 rounded-xl border border-border/60 bg-background/70 p-4 text-left">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Персональные рекомендации по ошибкам</p>
          <ul className="mt-2 space-y-2 pl-5 text-base sm:text-lg leading-relaxed list-disc">
            {recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {result.wrongTopics.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Темы, в которых были ошибки</p>
            <div className="flex flex-wrap gap-2">
              {result.wrongTopics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-foreground"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border/60 bg-background/90 p-4 sm:p-5">
        <p className="text-base sm:text-lg font-medium leading-relaxed">
          Если ты хочешь повысить свой уровень и научиться говорить по-французски, я могу в этом помочь.
          Оставь заявку, и мы свяжемся. Первый урок бесплатный.
        </p>
        <div>
          <Label htmlFor="quiz-name">Твое имя</Label>
          <Input
            id="quiz-name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Ваше имя"
            maxLength={100}
            className="mt-2 rounded-xl bg-white"
          />
        </div>
        <div>
          <Label htmlFor="quiz-contact">Как с тобой связаться</Label>
          <Input
            id="quiz-contact"
            value={contact}
            onChange={(e) => onContactChange(e.target.value)}
            placeholder="@username в Telegram или +7..."
            maxLength={200}
            className="mt-2 rounded-xl bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={sending} className="gradient-primary rounded-full px-7 text-base sm:text-lg">
            {sending ? "Отправляем..." : "Получить бесплатный урок"}
          </Button>
          <Button type="button" variant="outline" onClick={onRestart} disabled={sending} className="rounded-full text-base sm:text-lg">
            Пройти тест еще раз
          </Button>
        </div>
      </form>
    </div>
  );
}

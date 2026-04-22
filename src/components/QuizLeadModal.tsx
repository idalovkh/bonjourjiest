import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.webp";
import { formSchema, getLevel, getTip, QUESTIONS, shuffleArray } from "@/components/quiz-lead-modal/data";
import { IntroScreen } from "@/components/quiz-lead-modal/IntroScreen";
import type { OptionId } from "@/components/quiz-lead-modal/model";
import { QuestionScreen } from "@/components/quiz-lead-modal/QuestionScreen";
import { ResultsScreen } from "@/components/quiz-lead-modal/ResultsScreen";

const QUIZ_PROGRESS_STORAGE_KEY = "quiz-progress-v1";

interface QuizProgressSnapshot {
  started: boolean;
  step: number;
  attemptSeed: number;
  answers: Record<number, OptionId>;
  name: string;
  contact: string;
}

function normalizeAnswers(raw: unknown): Record<number, OptionId> {
  if (!raw || typeof raw !== "object") return {};
  const entries = Object.entries(raw as Record<string, unknown>);
  const normalized: Record<number, OptionId> = {};
  for (const [key, value] of entries) {
    const id = Number.parseInt(key, 10);
    if (!Number.isInteger(id)) continue;
    if (value === "a" || value === "b" || value === "c") {
      normalized[id] = value;
    }
  }
  return normalized;
}

export function QuizLeadModal() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [attemptSeed, setAttemptSeed] = useState(0);
  const [answers, setAnswers] = useState<Record<number, OptionId>>({});
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [progressHydrated, setProgressHydrated] = useState(false);
  const randomizedQuestions = useMemo(() => {
    const bump = attemptSeed % 3;
    return QUESTIONS.map((q) => {
      const options = shuffleArray(q.options);
      for (let i = 0; i < bump; i += 1) {
        const first = options.shift();
        if (first) options.push(first);
      }
      return { ...q, options };
    });
  }, [attemptSeed]);
  const current = randomizedQuestions[step];
  const total = randomizedQuestions.length;
  const completed = step >= total;

  const result = useMemo(() => {
    const score = randomizedQuestions.reduce((acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc), 0);
    const wrongTopics = randomizedQuestions.filter((q) => answers[q.id] && answers[q.id] !== q.correct).map((q) => q.topic);
    return {
      score,
      level: getLevel(score),
      wrongTopics: Array.from(new Set(wrongTopics)),
    };
  }, [answers, randomizedQuestions]);

  const canNext = Boolean(current && answers[current.id]);
  const selectedOptionText = current ? current.options.find((option) => option.id === answers[current.id])?.text : undefined;
  const questionPreview: ReactNode = current
    ? current.text.includes("___") && selectedOptionText
      ? (
          <>
            {current.text.split("___")[0]}
            <span className="underline decoration-2 underline-offset-2">{selectedOptionText}</span>
            {current.text.split("___")[1] ?? ""}
          </>
        )
      : current.text
    : "";

  useEffect(() => {
    if (globalThis.window === undefined) return;
    try {
      const raw = globalThis.localStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY);
      if (!raw) {
        setProgressHydrated(true);
        return;
      }
      const parsed = JSON.parse(raw) as Partial<QuizProgressSnapshot>;
      const nextStep = typeof parsed.step === "number" ? Math.max(0, Math.min(QUESTIONS.length, Math.trunc(parsed.step))) : 0;
      const nextAttemptSeed = typeof parsed.attemptSeed === "number" ? Math.max(0, Math.trunc(parsed.attemptSeed)) : 0;
      setStarted(parsed.started === true);
      setStep(nextStep);
      setAttemptSeed(nextAttemptSeed);
      setAnswers(normalizeAnswers(parsed.answers));
      setName(typeof parsed.name === "string" ? parsed.name.slice(0, 100) : "");
      setContact(typeof parsed.contact === "string" ? parsed.contact.slice(0, 200) : "");
      if (parsed.started === true) setOpen(true);
    } catch {
      globalThis.localStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
    } finally {
      setProgressHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!progressHydrated || globalThis.window === undefined) return;
    const snapshot: QuizProgressSnapshot = {
      started,
      step,
      attemptSeed,
      answers,
      name,
      contact,
    };
    globalThis.localStorage.setItem(QUIZ_PROGRESS_STORAGE_KEY, JSON.stringify(snapshot));
  }, [progressHydrated, started, step, attemptSeed, answers, name, contact]);

  useEffect(() => {
    const storageKey = "quiz-popup-shown-v1";
    if (globalThis.window === undefined) return;
    if (globalThis.localStorage.getItem(storageKey) === "1") return;

    const timeoutId = globalThis.setTimeout(() => {
      setOpen(true);
      setStarted(false);
      globalThis.localStorage.setItem(storageKey, "1");
    }, 7000);

    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  const handleNext = () => {
    if (!canNext) return;
    setStep((prev) => prev + 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setName("");
    setContact("");
    setSending(false);
    setAttemptSeed((prev) => prev + 1);
    setStarted(false);
    if (globalThis.window !== undefined) {
      globalThis.localStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
    }
  };

  const handleStartQuiz = () => {
    setStep(0);
    setAnswers({});
    setAttemptSeed((prev) => prev + 1);
    setStarted(true);
  };

  const handleSendResult = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse({ name, contact });
    if (!parsed.success) {
      toast({
        title: "Ошибка",
        description: parsed.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          contact: parsed.data.contact,
          source: "quiz",
          quizScore: result.score,
          quizLevel: result.level,
          quizTotal: total,
          weakTopics: result.wrongTopics,
          quizDetails: randomizedQuestions.map((q) => {
            const selectedId = answers[q.id];
            const selectedOption = q.options.find((option) => option.id === selectedId);
            const correctOption = q.options.find((option) => option.id === q.correct);
            return {
              id: q.id,
              topic: q.topic,
              question: q.text,
              selected: selectedOption?.text ?? "—",
              correct: correctOption?.text ?? "—",
              isCorrect: selectedId === q.correct,
            };
          }),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || "Не удалось отправить результат");
      }

      toast({
        title: "Результат отправлен",
        description: "Менеджер уже увидел ваш уровень и свяжется с вами.",
      });
      if (globalThis.window !== undefined) {
        globalThis.localStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
      }
      setOpen(false);
      handleRestart();
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const progressPercent = Math.round(((step + 1) / total) * 100);
  const accuracy = Math.round((result.score / total) * 100);
  const nextLevelTarget =
    result.score <= 3 ? { level: "A1", score: 4 }
      : result.score <= 7 ? { level: "A2", score: 8 }
      : result.score <= 12 ? { level: "B1", score: 13 }
      : result.score <= 16 ? { level: "B2", score: 17 }
      : result.score <= 19 ? { level: "B2+", score: 20 }
      : null;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setStarted(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full text-base sm:text-lg px-8 sm:px-10 min-h-[48px] h-14 border border-primary/40 bg-background/80 text-foreground hover:bg-primary/10 hover:border-primary/60 touch-manipulation"
        >
          УЗНАТЬ СВОЙ УРОВЕНЬ
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90dvh] overflow-y-auto border-primary/20 bg-gradient-to-br from-background via-background to-secondary/10 p-0">
        <div className="relative overflow-hidden rounded-lg p-6 sm:p-7 min-h-[320px] sm:min-h-[380px]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-secondary/20 blur-3xl" />
          </div>

          <DialogHeader className="relative">
            <div className="flex justify-center">
              <div className="shrink-0 flex items-center gap-2.5">
                <img src={logo} alt="Deshar School" className="h-7 w-auto" width={140} height={36} decoding="async" />
                <span className="text-sm font-bold text-foreground tracking-tight hidden sm:inline">Deshar School</span>
              </div>
            </div>
            {!started && (
              <div className="mt-3 space-y-2 text-center">
                <p className="mx-auto inline-flex items-center rounded-md border border-border/60 bg-transparent px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Экспресс-диагностика уровня
                </p>
                <DialogTitle className="text-2xl sm:text-3xl">Определи свой уровень английского за 3 минуты</DialogTitle>
                <p className="text-base sm:text-lg text-muted-foreground">
                  21 вопрос, моментальный результат и персональные рекомендации по обучению.
                </p>
              </div>
            )}
          </DialogHeader>

          <div className="relative mt-6 sm:mt-7">
            {started ? (
              completed ? (
                <div className="space-y-6">
                  <ResultsScreen
                    result={result}
                    total={total}
                    accuracy={accuracy}
                    nextLevelTarget={nextLevelTarget}
                    tipText={getTip(result.level)}
                    name={name}
                    contact={contact}
                    sending={sending}
                    onNameChange={setName}
                    onContactChange={setContact}
                    onRestart={handleRestart}
                    onSubmit={handleSendResult}
                  />
                </div>
              ) : (
                <QuestionScreen
                  step={step}
                  total={total}
                  progressPercent={progressPercent}
                  current={current}
                  questionPreview={questionPreview}
                  selected={answers[current.id]}
                  canNext={canNext}
                  onSelect={(id) => setAnswers((prev) => ({ ...prev, [current.id]: id }))}
                  onBack={() => setStep((prev) => Math.max(0, prev - 1))}
                  onNext={handleNext}
                />
              )
            ) : (
              <IntroScreen onStart={handleStartQuiz} onClose={() => setOpen(false)} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

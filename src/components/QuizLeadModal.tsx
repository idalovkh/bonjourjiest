import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.webp";

type OptionId = "a" | "b" | "c";

interface Question {
  id: number;
  text: string;
  topic: string;
  options: { id: OptionId; text: string }[];
  correct: OptionId;
}

const QUESTIONS: Question[] = [
  { id: 1, text: "She ___ to the gym every day.", topic: "Present Simple", options: [{ id: "a", text: "go" }, { id: "b", text: "goes" }, { id: "c", text: "going" }], correct: "b" },
  { id: 2, text: "They ___ dinner right now.", topic: "Present Continuous", options: [{ id: "a", text: "have" }, { id: "b", text: "are having" }, { id: "c", text: "having" }], correct: "b" },
  { id: 3, text: "I ___ my keys yesterday.", topic: "Past Simple", options: [{ id: "a", text: "lose" }, { id: "b", text: "lost" }, { id: "c", text: "have lost" }], correct: "b" },
  { id: 4, text: "She ___ already finished her homework.", topic: "Present Perfect", options: [{ id: "a", text: "did" }, { id: "b", text: "has" }, { id: "c", text: "have" }], correct: "b" },
  { id: 5, text: "We ___ in this city since 2010.", topic: "Present Perfect", options: [{ id: "a", text: "live" }, { id: "b", text: "lived" }, { id: "c", text: "have lived" }], correct: "c" },
  { id: 6, text: "If I ___ rich, I would travel the world.", topic: "Second Conditional", options: [{ id: "a", text: "am" }, { id: "b", text: "was" }, { id: "c", text: "would be" }], correct: "c" },
  { id: 7, text: "He ___ to London next week.", topic: "Future (plans)", options: [{ id: "a", text: "goes" }, { id: "b", text: "is going" }, { id: "c", text: "go" }], correct: "b" },
  { id: 8, text: "There isn’t ___ milk in the fridge.", topic: "Quantifiers", options: [{ id: "a", text: "some" }, { id: "b", text: "any" }, { id: "c", text: "a" }], correct: "b" },
  { id: 9, text: "I have ___ friends in this city.", topic: "Countable nouns", options: [{ id: "a", text: "much" }, { id: "b", text: "many" }, { id: "c", text: "little" }], correct: "b" },
  { id: 10, text: "There is ___ water left.", topic: "Uncountable nouns", options: [{ id: "a", text: "few" }, { id: "b", text: "little" }, { id: "c", text: "many" }], correct: "b" },
  { id: 11, text: "He ___ play the piano when he was a child.", topic: "Past ability", options: [{ id: "a", text: "can" }, { id: "b", text: "could" }, { id: "c", text: "must" }], correct: "b" },
  { id: 12, text: "You ___ wear a seatbelt. It’s the law.", topic: "Obligation", options: [{ id: "a", text: "can" }, { id: "b", text: "must" }, { id: "c", text: "may" }], correct: "b" },
  { id: 13, text: "She asked me where I ___.", topic: "Reported Speech", options: [{ id: "a", text: "live" }, { id: "b", text: "lived" }, { id: "c", text: "am living" }], correct: "b" },
  { id: 14, text: "He ___ go to the party if he finishes work.", topic: "Possibility", options: [{ id: "a", text: "might" }, { id: "b", text: "must" }, { id: "c", text: "should" }], correct: "a" },
  { id: 15, text: "If it rains, we ___.", topic: "First Conditional", options: [{ id: "a", text: "stay" }, { id: "b", text: "will stay" }, { id: "c", text: "stayed" }], correct: "b" },
  { id: 16, text: "If I had more money, I ___ a car.", topic: "Second Conditional", options: [{ id: "a", text: "buy" }, { id: "b", text: "would buy" }, { id: "c", text: "will buy" }], correct: "b" },
  { id: 17, text: "I saw ___ interesting film yesterday.", topic: "Articles", options: [{ id: "a", text: "a" }, { id: "b", text: "an" }, { id: "c", text: "the" }], correct: "b" },
  { id: 18, text: "___ sun rises in the east.", topic: "Articles", options: [{ id: "a", text: "A" }, { id: "b", text: "The" }, { id: "c", text: "—" }], correct: "b" },
  { id: 19, text: "He ___ me that he was tired.", topic: "Tell vs Say", options: [{ id: "a", text: "said" }, { id: "b", text: "told" }, { id: "c", text: "spoke" }], correct: "b" },
  { id: 20, text: "Please ___ at the board.", topic: "Look vs See", options: [{ id: "a", text: "see" }, { id: "b", text: "watch" }, { id: "c", text: "look" }], correct: "c" },
  { id: 21, text: "I’m not interested ___ politics.", topic: "Prepositions", options: [{ id: "a", text: "on" }, { id: "b", text: "in" }, { id: "c", text: "at" }], correct: "b" },
];

const formSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100),
  contact: z.string().trim().min(1, "Введите контакт").max(200),
});

function getLevel(score: number): string {
  if (score <= 3) return "Pre-A1";
  if (score <= 7) return "A1";
  if (score <= 12) return "A2";
  if (score <= 16) return "B1";
  if (score <= 19) return "B2";
  return "B2+";
}

function getTip(level: string): string {
  switch (level) {
    case "Pre-A1":
      return "Начните с базы: to be, простые конструкции и короткие фразы.";
    case "A1":
      return "Закрепите Present Simple/Continuous, формы глаголов и артикли.";
    case "A2":
      return "Прокачайте Present Perfect, предлоги и much/many/few/little.";
    case "B1":
      return "Сфокусируйтесь на conditionals, reported speech и точности лексики.";
    case "B2":
      return "Усильте естественность речи: устойчивые выражения и сочетаемость слов.";
    default:
      return "Отличный уровень. Следующий шаг - движение к C1 через живую практику.";
  }
}

function shuffleArray<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
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
  const randomizedQuestions = useMemo(
    () => QUESTIONS.map((q) => ({ ...q, options: shuffleArray(q.options) })),
    [attemptSeed]
  );
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
          className="rounded-full text-base sm:text-lg px-8 sm:px-10 min-h-[48px] h-14 text-muted-foreground hover:text-foreground touch-manipulation"
        >
          Пройти мини-квиз
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90dvh] overflow-y-auto border-primary/20 bg-gradient-to-br from-background via-background to-secondary/10 p-0">
        <div className="relative overflow-hidden rounded-lg p-6 sm:p-7">
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
            <div className="mt-3 space-y-2 text-center">
              <DialogTitle className="text-xl sm:text-2xl">Узнай свой уровень английского за 3 минуты</DialogTitle>
            </div>
          </DialogHeader>

          <div className="relative mt-5">
            {started ? (
              completed ? (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-primary/20 bg-card/80 p-4 sm:p-5 shadow-sm text-center">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-primary" />
                        <p className="font-semibold">Результат теста</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {Math.round((result.score / total) * 100)}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-center flex h-full flex-col items-center justify-center">
                        <p className="text-xs text-muted-foreground">Баллы</p>
                        <p className="text-lg font-semibold text-foreground">{result.score}/{total}</p>
                      </div>
                      <div className="rounded-xl border border-border/60 bg-background/70 p-3 text-center flex h-full flex-col items-center justify-center">
                        <p className="text-xs text-muted-foreground">Уровень</p>
                        <p className="text-lg font-semibold text-foreground">{result.level}</p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm">{getTip(result.level)}</p>

                    {result.wrongTopics.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Зоны роста</p>
                        <div className="flex flex-wrap justify-center gap-2">
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

                  <form onSubmit={handleSendResult} className="space-y-4 rounded-2xl border border-border/60 bg-background/90 p-4 sm:p-5">
                    <p className="text-sm font-medium">
                      Оставь контакт и получи разбор результата + план обучения, который быстрее приведет к уверенному разговорному английскому.
                    </p>
                    <div>
                      <Label htmlFor="quiz-name">Как к тебе обращаться?</Label>
                      <Input
                        id="quiz-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        maxLength={100}
                        className="mt-2 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quiz-contact">Куда отправить разбор?</Label>
                      <Input
                        id="quiz-contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="@username в Telegram или +7..."
                        maxLength={200}
                        className="mt-2 rounded-xl"
                      />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button type="submit" disabled={sending} className="gradient-primary rounded-full px-6">
                        {sending ? "Отправляем..." : "Получить разбор и план"}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleRestart} disabled={sending} className="rounded-full">
                        Пройти тест еще раз
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="space-y-5 rounded-2xl border border-border/60 bg-background/90 p-4 sm:p-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        Вопрос {step + 1} из {total}
                      </span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-4">
                  <p className="mb-1 text-sm font-medium text-primary">Тема: {current.topic}</p>
                    <p className="text-lg font-semibold text-foreground">{questionPreview}</p>
                  </div>

                  <div className="space-y-2">
                    {current.options.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [current.id]: option.id }))}
                        className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                          answers[current.id] === option.id
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
                    <Button type="button" variant="outline" onClick={() => setStep((prev) => Math.max(0, prev - 1))} disabled={step === 0} className="rounded-full">
                      Назад
                    </Button>
                    <Button type="button" onClick={handleNext} disabled={!canNext} className="gradient-primary rounded-full px-6">
                      {step === total - 1 ? "Получить результат" : "Следующий вопрос"}
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <div className="space-y-5">
                <div className="flex flex-wrap justify-center gap-3">
                  <Button type="button" onClick={handleStartQuiz} className="gradient-primary rounded-full px-6">
                    Пройти тест и узнать уровень
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-full">
                    Не сейчас
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

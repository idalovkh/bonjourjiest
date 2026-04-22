import { z } from "zod";
import type { Question } from "./model";

export const QUESTIONS: Question[] = [
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

export const formSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100),
  contact: z.string().trim().min(1, "Введите контакт").max(200),
});

export function getLevel(score: number): string {
  if (score <= 3) return "Pre-A1";
  if (score <= 7) return "A1";
  if (score <= 12) return "A2";
  if (score <= 16) return "B1";
  if (score <= 19) return "B2";
  return "B2+";
}

export function getTip(level: string): string {
  switch (level) {
    case "Pre-A1":
      return "Начни с базы: to be, простые конструкции, короткие фразы и базовый словарный запас. Регулярная практика на коротких диалогах даст быстрый рост.";
    case "A1":
      return "Ты уже можешь строить простые фразы. Дальше важно закрепить Present Simple/Continuous, формы глаголов и артикли, чтобы говорить увереннее и точнее.";
    case "A2":
      return "Ты уже можешь объясниться в простых ситуациях. Но пока не хватает точности: чаще всего путаются Present Perfect, предлоги и much/many/few/little. Эти темы стоит прокачать в первую очередь.";
    case "B1":
      return "Хороший рабочий уровень. Следующий шаг — прокачать conditionals, reported speech и точность лексики, чтобы звучать естественно и уверенно в реальном разговоре.";
    case "B2":
      return "Сильный уровень. Для перехода выше фокусируйся на естественности: устойчивые выражения, сочетаемость слов и гибкость речи в сложных контекстах.";
    default:
      return "Отличный результат. Дальше — движение к C1: сложные структуры, академическая и профессиональная лексика, живая разговорная практика с обратной связью.";
  }
}

export function shuffleArray<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

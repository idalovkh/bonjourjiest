import { z } from "zod";
import type { Question } from "./model";

export const QUESTIONS: Question[] = [
  { id: 1, text: "Je ___ français tous les jours.", topic: "Présent", options: [{ id: "a", text: "parle" }, { id: "b", text: "parles" }, { id: "c", text: "parler" }], correct: "a" },
  { id: 2, text: "Il ___ professeur.", topic: "être / avoir", options: [{ id: "a", text: "est" }, { id: "b", text: "es" }, { id: "c", text: "suis" }], correct: "a" },
  { id: 3, text: "Nous ___ deux chats.", topic: "être / avoir", options: [{ id: "a", text: "avons" }, { id: "b", text: "avez" }, { id: "c", text: "as" }], correct: "a" },
  { id: 4, text: "Hier, j'___ une pizza.", topic: "Passé composé", options: [{ id: "a", text: "ai mangé" }, { id: "b", text: "mange" }, { id: "c", text: "mangeais" }], correct: "a" },
  { id: 5, text: "Quand j'étais petit, je ___ au foot.", topic: "Imparfait", options: [{ id: "a", text: "jouais" }, { id: "b", text: "joué" }, { id: "c", text: "jouer" }], correct: "a" },
  { id: 6, text: "Demain, nous ___ à Paris.", topic: "Futur proche", options: [{ id: "a", text: "allons partir" }, { id: "b", text: "partons" }, { id: "c", text: "partirons" }], correct: "a" },
  { id: 7, text: "Elle ___ déjà fini ses devoirs.", topic: "Passé composé", options: [{ id: "a", text: "a" }, { id: "b", text: "as" }, { id: "c", text: "est" }], correct: "a" },
  { id: 8, text: "Il n'y a ___ lait dans le frigo.", topic: "Négation / partitif", options: [{ id: "a", text: "pas de" }, { id: "b", text: "de le" }, { id: "c", text: "du" }], correct: "a" },
  { id: 9, text: "J'ai ___ amis dans cette ville.", topic: "Quantificateurs", options: [{ id: "a", text: "beaucoup d'" }, { id: "b", text: "peu de le" }, { id: "c", text: "des le" }], correct: "a" },
  { id: 10, text: "Il reste ___ eau.", topic: "Partitif", options: [{ id: "a", text: "peu d'" }, { id: "b", text: "des" }, { id: "c", text: "les" }], correct: "a" },
];

export const formSchema = z.object({
  name: z.string().trim().min(1, "Введите имя").max(100),
  contact: z.string().trim().min(1, "Введите контакт").max(200),
});

export function getLevel(score: number): string {
  if (score <= 1) return "Pre-A1";
  if (score <= 3) return "A1";
  if (score <= 5) return "A2";
  if (score <= 7) return "B1";
  if (score <= 9) return "B2";
  return "B2+";
}

export function getTip(level: string): string {
  switch (level) {
    case "Pre-A1":
      return "Начни с базы: être/avoir, présent des verbes -er, короткие фразы и базовый словарный запас. Регулярная практика на коротких диалогах даст быстрый рост.";
    case "A1":
      return "Ты уже можешь строить простые фразы. Дальше важно закрепить présent, согласование прилагательных и артикли (le/la/un/une), чтобы говорить увереннее.";
    case "A2":
      return "Ты уже можешь объясниться в простых ситуациях. Но пока не хватает точности: чаще всего путаются passé composé и imparfait, partitif и предлоги. Эти темы стоит прокачать в первую очередь.";
    case "B1":
      return "Хороший рабочий уровень. Следующий шаг — прокачать conditionnel, discours indirect и точность лексики, чтобы звучать естественно в реальном разговоре.";
    case "B2":
      return "Сильный уровень. Для перехода выше фокусируйся на естественности: устойчивые выражения, subjonctif и гибкость речи в сложных контекстах.";
    default:
      return "Отличный результат. Дальше — движение к C1: сложные структуры, академическая и профессиональная лексика, живая разговорная практика с обратной связью.";
  }
}

export function getLevelDescription(level: string): { title: string; description: string } {
  switch (level) {
    case "Pre-A1":
      return {
        title: "Pre-A1 (0-1)",
        description:
          "Ты только начинаешь путь во французском. Пока комфортнее всего с отдельными словами, базовыми конструкциями и очень простыми фразами.",
      };
    case "A1":
      return {
        title: "A1 (2-3)",
        description:
          "Ты понимаешь и строишь простые фразы на знакомые темы: о себе, семье, работе и повседневных ситуациях. Для уверенности нужно расширять базовую грамматику и словарь.",
      };
    case "A2":
      return {
        title: "A2 (4-5)",
        description:
          "Ты уже можешь говорить о прошлом и настоящем, объясниться в простых ситуациях и поддержать базовый разговор. В целом тебя понимают, даже если пока есть ошибки.",
      };
    case "B1":
      return {
        title: "B1 (6-7)",
        description:
          "У тебя уже рабочий разговорный уровень. Ты способен обсуждать знакомые темы, описывать опыт и планы, а также понимать основную мысль живой речи и текстов.",
      };
    case "B2":
      return {
        title: "B2 (8-9)",
        description:
          "Ты уверенно общаешься на большинство бытовых и рабочих тем, понимаешь сложные тексты и можешь аргументировать свою точку зрения. Речь уже достаточно гибкая и естественная.",
      };
    default:
      return {
        title: "B2+ (10)",
        description:
          "Очень сильный результат. Ты свободно используешь сложные конструкции, хорошо понимаешь контекст и можешь говорить почти без заметных ограничений в обычном общении.",
      };
  }
}

export function getPersonalRecommendations(
  level: string,
  wrongTopics: string[],
  nextLevel: string | null,
): string[] {
  const priorityTopics = wrongTopics.slice(0, 3);
  const focusText = priorityTopics.length > 0
    ? priorityTopics.join(", ")
    : "ключевые темы текущего уровня";
  const recommendations: string[] = [
    `Твой главный фокус сейчас: ${focusText}.`,
    "Сначала закрепи правила, затем отработай их на коротких устных примерах и мини-диалогах.",
  ];

  if (nextLevel) {
    recommendations.push(`Чтобы быстрее перейти на уровень ${nextLevel}, добавь регулярную практику с разбором ошибок и повторением слабых тем.`);
  } else if (level === "B2+") {
    recommendations.push("Чтобы расти дальше к C1, добавь сложные тексты, активную лексику и разговорную практику на абстрактные темы.");
  } else {
    recommendations.push("Чтобы расти быстрее, совмещай грамматику, аудирование и разговорную практику минимум 3-4 раза в неделю.");
  }

  return recommendations;
}

export function shuffleArray<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

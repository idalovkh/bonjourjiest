import type { ReactNode } from "react";

export type OptionId = "a" | "b" | "c";

export interface Question {
  id: number;
  text: string;
  topic: string;
  options: { id: OptionId; text: string }[];
  correct: OptionId;
}

export interface QuizResult {
  score: number;
  level: string;
  wrongTopics: string[];
}

export interface NextLevelTarget {
  level: string;
  score: number;
}

export interface QuestionViewModel {
  current: Question;
  step: number;
  total: number;
  progressPercent: number;
  canNext: boolean;
  questionPreview: ReactNode;
}

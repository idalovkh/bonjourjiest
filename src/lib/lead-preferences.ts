export const STUDY_FREQUENCY_OPTIONS = [
  { value: "1", label: "1 раз в неделю" },
  { value: "2", label: "2 раза в неделю" },
  { value: "3", label: "3 раза в неделю" },
  { value: "4plus", label: "4+ раз в неделю" },
] as const;

export const PREFERRED_TIME_OPTIONS = [
  { value: "morning", label: "Утро" },
  { value: "day", label: "День" },
  { value: "evening", label: "Вечер" },
  { value: "weekend", label: "Выходные" },
] as const;

export const CURRENT_LEVEL_OPTIONS = [
  { value: "zero", label: "Нулевой" },
  { value: "beginner", label: "Начальный (A1–A2)" },
  { value: "intermediate", label: "Средний (B1–B2)" },
  { value: "advanced", label: "Продвинутый (C1+)" },
] as const;

export interface LeadPreferences {
  studyFrequency: string;
  preferredTime: string;
  currentLevel: string;
}

export const EMPTY_LEAD_PREFERENCES: LeadPreferences = {
  studyFrequency: "",
  preferredTime: "",
  currentLevel: "",
};

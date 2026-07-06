export interface QuizBankQuestion {
  q: string;
  opts: string[];
  a: number;
}

export const quizBank: Record<string, QuizBankQuestion[]> = {};

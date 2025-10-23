
export enum QuestionTopic {
  InterpersonalRelations = "Relações Interpessoais",
  DrivingTechniques = "Técnicas de Condução",
  FirstAid = "Primeiros Socorros e Emergências",
  LegalNorms = "Normas Legais de Condução",
  ActivityRegulation = "Regulamentação da Atividade",
  RoadSafety = "Segurança Rodoviária",
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  topic: QuestionTopic;
}

export interface UserAnswer {
  questionId: number;
  answer: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  date: string;
  answers: UserAnswer[];
  questions: Question[];
}

export interface UserProfile {
  quizHistory: QuizResult[];
}

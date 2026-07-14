export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface IExam {
  title: string;
  courseName: string;
  duration: number;
  totalQuestions: number;
  status: "published" | "draft";
  level: "Beginner" | "Intermediate" | "Advanced";
  questions: IQuestion[];
  createdBy: string;
  createdAt: Date;
}
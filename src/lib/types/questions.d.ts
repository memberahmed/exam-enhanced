declare type Answer = {
  answer: string;
  key: string;
};

declare type Question = {
  answers: Answer[];
  type: "single_choice" | "multiple_choice";
  _id: string;
  question: string;
  correct: string;
  subject: Diploma;
  exam: Exam;
  createdAt: string;
};

declare type QuestionsResponse = {
  message: "success";
  questions: Question[];
};

declare type SetShowedComponent = React.Dispatch<React.SetStateAction<ShowedComponent>>;

declare type checkQuestionsReponse = {
  message: "success";
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: WrongQuestion[];
  correctQuestions: CorrectQuestions[];
};

declare type WrongQuestion = {
  QID: string;
  Question: string;
  inCorrectAnswer: string;
  correctAnswer: string;
  answers: unknown;
};

declare type CorrectQuestions = {
  QID: string;
  Question: string;
  correctAnswer: string;
  answers: unknown;
};

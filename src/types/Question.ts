import { Answer } from "./Answer";
import { CorrectAnswer } from "./CorrectAnswer";
import { Subject } from "./Subject";

export interface Question {
  _id: string;
  content: string;
  subject: Subject;
  correct_answer: CorrectAnswer;
  answers: Answer[];
  accuracy: "high" | "medium" | "low";
  is_essay: boolean;
  is_approved: boolean;
}

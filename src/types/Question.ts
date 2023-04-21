import { Answer } from "./Answer";
import { Subject } from "./Subject";
import { ExamModel } from "./ExamModel";
import { User } from "./User";

export interface Question {
  _id: string;
  author: User;
  content: string;
  subject: Subject;
  correct_answer: Answer;
  answers: Answer[];
  accuracy: "high" | "medium" | "low";
  is_essay: boolean;
  is_approved: boolean;
}

export interface NewQuestionPayload {
  content: string;
  exam_id?: string;
  correct_answer?: Answer;
  image?: string;
  answers: Answer[];
  new_answers?: string;
  accuracy: string;
  is_essay: boolean;
  is_approved: boolean;
  _id: string;
}

export interface GetAllQuestionsByExamIdResponse {
  questions: Question[];
  exam: ExamModel;
}

import { Question } from "./Question";
import { Subject } from "./Subject";
import { User } from "./User";
import { UserAnswer } from "./UserAnswer";

export interface UserExamPayload {
  is_completed: boolean;
}

export interface UserExam {
  _id: string;
  author: User;
  subject: Subject;
  title: string;
  questions: Question[];
  user_answer_id: UserAnswer;
  duration: number; // in miliseconds
  score: number;
  semester: number;
  school_year: string;
  is_completed: boolean;
}
export interface CreateUserExamPayload {
  duration: number; // in miliseconds
  exam_id: string;
}

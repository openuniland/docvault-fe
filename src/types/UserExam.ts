import { Question } from "./Question";
import { Subject } from "./Subject";
import { User } from "./User";
import { ExamModel } from "./ExamModel";
import { UserAnswer } from "./UserAnswer";

export interface UserExamPayload {
  is_completed: boolean;
}

export interface UserExam {
  _id: string;
  author: User;
  original_exam: ExamModel;
  title: string;
  questions: Question[];
  subject: Subject;
  is_deleted: boolean;
  score: number;
  user_answer_id: UserAnswer;
  duration: number;
  semester: number;
  school_year: string;
  is_completed: boolean;
  created_at: string;
}
export interface CreateUserExamPayload {
  duration: number; // in miliseconds
  exam_id: string;
}

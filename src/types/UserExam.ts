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
  original_exam: string;
  subject: Subject;
  title: string;
  questions: Question[];
  user_answer_id: UserAnswer;
  duration: number; // in miliseconds
  score: number;
  semester: number;
  school_year: string;
  is_completed: boolean;
  created_at?: any;
}
export interface CreateUserExamPayload {
  duration: number; // in miliseconds
  exam_id: string;
}

export interface UserExamResponse {
  _id: string;
}
export interface UserExamResponse {
  _id: string;
  author: User;
  original_exam: string;
  subject: Subject;
  title: string;
  questions: Question[];
  user_answers: UserAnswer[];
  duration: number; // in miliseconds
  score: number;
  semester: number;
  school_year: string;
  is_completed: boolean;
  created_at?: any;
}
export interface SubmitExamResponse {
  message?: string;
}
export interface SubmitExamPayload {
  user_exam_id?: string;
}

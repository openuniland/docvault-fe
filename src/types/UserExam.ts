import { NewQuestionPayload } from "./Question";
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
  questions: NewQuestionPayload[];
  user_answer_id: UserAnswer;
  duration: number; // in miliseconds
  score: number;
  semester: number;
  school_year: string;
  is_completed: boolean;
  created_at?: any;
  description: string;
}
export interface CreateUserExamPayload {
  duration: number; // in miliseconds
  exam_id: string;
}

export interface UserExamResponse {
  _id: string;
  author: User;
  original_exam: string;
  subject: Subject;
  title: string;
  questions: NewQuestionPayload[];
  user_answers: {
    answers_id: string[];
    _id: string;
  };
  author_exam: User;
  duration: number; // in miliseconds
  score: number;
  semester: number;
  school_year: string;
  is_completed: boolean;
  created_at?: any;
}
export interface SubmitExamResponse {
  user_exam_id: string;
  score: number;
  is_completed: boolean;
}
export interface SubmitExamPayload {
  user_exam_id?: string;
}
export interface CreateUserExamPayload {
  duration: number; // in miliseconds
  exam_id: string;
}

export interface UserExamResponse {
  _id: string;
}

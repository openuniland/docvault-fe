import { User } from "./User";
import { Question } from "./Question";
import { Subject } from "./Subject";

export interface ExamModel {
  _id: string;
  author: User;
  question: Question;
  subject: Subject;
  title: string;
  semester: number;
  school_year: string;
  is_deleted: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface GetAllExamsBySubjectIdResponse {
  exams: ExamModel[];
  subject: Subject;
}

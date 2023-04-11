import { User } from "./User";
import { Question } from "./Question";
import { Subject } from "./Subject";

export interface ExamModel {
  _id: string;
  author: User;
  questions: Question[];
  subject: Subject;
  title: string;
  description: string;
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

export interface GetExamsByOwnerResponse {
  exams: ExamModel[];
}
export interface ApproveTheExamPayload {
  id: string;
  is_approved: boolean;
}

export interface CreateExamModelForm {
  title: string;
  description: string;
  subject: Subject;
  semester: string;
  school_year: string;
  is_approved: boolean;
  is_draft: boolean;
}

export interface RequestUpdateExamModelFormPayload {
  examId: string;
  requestUpdateExamPayload: CreateExamModelForm;
}

export interface RequestUpdateExam {
  title: string;
  description: string;
  subject: string;
  semester: string;
  school_year: string;
  is_approved: boolean;
  is_draft: boolean;
}
export interface UpdateExamByAdminPayload {
  examId: string;
  requestUpdateExamPayload: RequestUpdateExam;
}

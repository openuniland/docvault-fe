import { Subject } from "./Subject";
import { User } from "./User";

export interface DocumentModelContent {
  name: string;
  image?: string;
  file?: string;
  description?: string;
}

export interface DocumentModel {
  _id: string;
  author: User;
  title: string;
  description: string;
  subject: Subject;
  semester: number;
  school_year: string;
  is_approved: string;
  content: DocumentModelContent[];
  created_at: string;
}

export interface GetAllDocumentsBySubjectIdResponse {
  documents: DocumentModel[];
  subject: Subject;
}

export interface DocumentPayload {
  title: string;
  description: string;
  subject: string;
  semester: number;
  school_year: string;
  content?: DocumentModelContent[];
}

export interface CreateDocumentModelForm {
  title: string;
  description: string;
  subject: Subject;
  semester: string;
  school_year: string;
  content: DocumentModelContent[];
  is_approved: boolean;
}
export interface CreateTheDocumentPayload {
  title: string;
  description: string;
  subject: string;
  semester: number;
  school_year: string;
  content?: DocumentModelContent[];
  is_approved: boolean;
}

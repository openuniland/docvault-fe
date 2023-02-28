import { Subject } from "./Subject";
import { User } from "./User";

export interface DocumentModel {
  _id: string;
  author: User;
  title: string;
  description: string;
  subject: Subject;
  semester: number;
  school_year: string;
  is_approved: string;
  content: {
    name: string;
    image?: string;
    file?: string;
    description?: string;
  };
  created_at: string;
}

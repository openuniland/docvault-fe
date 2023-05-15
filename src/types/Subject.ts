export interface Subject {
  _id: string;
  subject_name: string;
  is_approved: boolean;
  count?: number;
}

export interface SubjectPayload {
  subject_name: string;
}

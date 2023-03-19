export interface Subject {
  _id: string;
  subject_name: string;
  is_approved: boolean;
}

export interface SubjectPayload {
  subject_name: string;
}

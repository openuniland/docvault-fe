export interface UserAnswer {
  _id: string;
  answers_id: string[];
}
export interface RequestUpdateUserAnswer {
  answer_id: string;
  user_exam_id?: string;
  position: number;
}
export interface UpdateUserAnswerPayload {
  user_answer_id?: string;
  RequestUpdateUserAnswer: RequestUpdateUserAnswer;
}

import { useMutation } from "react-query";
import { updateUserAnswer } from "services/userAnswer";
import { UpdateUserAnswerPayload } from "types/UserAnswer";

export const useUpdateUserAnswer = () =>
  useMutation((payload: UpdateUserAnswerPayload) => {
    const { user_answer_id, RequestUpdateUserAnswer } = payload;
    return updateUserAnswer(RequestUpdateUserAnswer, user_answer_id);
  });

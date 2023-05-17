import { useMutation } from "react-query";
import { createNewQuestion, deleteAQuestionById } from "services/question";
import { NewQuestionPayload } from "types/Question";

export const useCreateNewQuestion = () =>
  useMutation((payload: NewQuestionPayload) => createNewQuestion(payload));

export const useDeleteAQuestionById = () =>
  useMutation((id: string) => deleteAQuestionById(id));

import { useMutation } from "react-query";

import { createUserExam, submitTheExam } from "services/userExam";
import { CreateUserExamPayload, SubmitExamPayload } from "types/UserExam";

export const useCreateUserExam = () =>
  useMutation((payload: CreateUserExamPayload) => createUserExam(payload));
export const useSubmitTheExam = () =>
  useMutation((payload: SubmitExamPayload) => submitTheExam(payload));

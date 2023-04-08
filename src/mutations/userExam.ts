import { useMutation } from "react-query";

import { createUserExam } from "services/userExam";
import { CreateUserExamPayload } from "types/UserExam";

export const useCreateUserExam = () =>
  useMutation((payload: CreateUserExamPayload) => createUserExam(payload));

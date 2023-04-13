import { AxiosResponse } from "axios";
import { UserExam, CreateUserExamPayload } from "types/UserExam";

import http from "utils/api/http";

export const getUserExams = async (): Promise<UserExam[]> => {
  const response: AxiosResponse = await http.get(
    `/user-exams?is_completed=${false}`,
  );

  return response?.data?.data;
};
export const createUserExam = async (
  payload: CreateUserExamPayload,
): Promise<UserExam> => {
  const response: AxiosResponse = await http.post(`/user-exams`, payload);
  return response?.data?.data;
};

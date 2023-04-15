import { AxiosResponse } from "axios";
import {
  UserExam,
  CreateUserExamPayload,
  UserExamResponse,
} from "types/UserExam";

import http from "utils/api/http";

export const getUserExams = async (): Promise<UserExam[]> => {
  const response: AxiosResponse = await http.get(
    `/user-exams?is_completed=${false}`,
  );

  return response?.data?.data;
};

export const createUserExam = async (
  payload: CreateUserExamPayload,
): Promise<UserExamResponse> => {
  const response: AxiosResponse = await http.post(`/user-exams`, payload);
  console.log("response?.data?.data", response?.data?.data);

  return response?.data?.data;
};

export const getUserExamByOwner = async (
  userExamId: string,
): Promise<UserExam> => {
  const response: AxiosResponse = await http.get(`/user-exam/${userExamId}`);
  return response?.data?.data;
};

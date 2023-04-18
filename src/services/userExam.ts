import { AxiosResponse } from "axios";
import {
  UserExam,
  CreateUserExamPayload,
  UserExamResponse,
  SubmitExamResponse,
  SubmitExamPayload,
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

  return response?.data?.data;
};

export const getUserExamByOwner = async (
  userExamId: string,
): Promise<UserExamResponse> => {
  const response: AxiosResponse = await http.get(`/user-exams/${userExamId}`);
  return response?.data?.data;
};

export const submitTheExam = async (
  payload?: SubmitExamPayload,
): Promise<SubmitExamResponse> => {
  const response: AxiosResponse = await http.post(
    `/user-exams/submit`,
    payload,
  );
  return response?.data?.data;
};

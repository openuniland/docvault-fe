import { AxiosResponse } from "axios";
import {
  UserExamResponse,
  CreateUserExamPayload,
  SubmitExamResponse,
  SubmitExamPayload,
  UserExam,
} from "types/UserExam";

import http from "utils/api/http";
import { URLparams, DataWithMeta } from "types";
import { DEFAULT_PAGINATION } from "utils/constants";

export const getUserExamsInprogress = async (): Promise<UserExamResponse[]> => {
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

export const getUserExamsCompletedByOwner = async (
  urlParams: URLparams,
): Promise<DataWithMeta<UserExam[]>> => {
  const response: AxiosResponse = await http.get(
    `/user-exams?is_completed=${true}`,
    {
      params: {
        currentPage: urlParams?.currentPage || DEFAULT_PAGINATION.currentPage,
        pageSize: urlParams?.pageSize || DEFAULT_PAGINATION.pageSize,
      },
    },
  );
  return response?.data;
};

export const getUserExamsNotCompletedByOwner = async (
  urlParams: URLparams,
): Promise<DataWithMeta<UserExam[]>> => {
  const response: AxiosResponse = await http.get(
    `/user-exams?is_completed=${false}`,
    {
      params: {
        currentPage: urlParams?.currentPage || DEFAULT_PAGINATION.currentPage,
        pageSize: urlParams?.pageSize || DEFAULT_PAGINATION.pageSize,
      },
    },
  );
  return response?.data;
};

import { AxiosResponse } from "axios";

import { UserExam, CreateUserExamPayload } from "types/UserExam";
import http from "utils/api/http";
import { URLparams, DataWithMeta } from "types";
import { DEFAULT_PAGINATION } from "utils/constants";

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

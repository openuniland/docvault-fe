import { AxiosResponse } from "axios";

import {
  GetAllExamsBySubjectIdResponse,
  ExamModel,
  ApproveTheExamPayload,
  RequestUpdateExam,
} from "types/ExamModel";
import { DataWithMeta, URLparams } from "types";

import http from "utils/api/http";
import { DEFAULT_PAGINATION } from "utils/constants";

export const getAllExamsBySubjectId = async (
  subjectId: string,
): Promise<GetAllExamsBySubjectIdResponse> => {
  const response: AxiosResponse = await http.get(`/exams/subject/${subjectId}`);

  return response?.data?.data;
};

export const getExamById = async (examId: string): Promise<ExamModel> => {
  const response: AxiosResponse = await http.get(`/exams/${examId}`);

  return response?.data?.data;
};

export const getDraftExam = async (): Promise<ExamModel> => {
  const response: AxiosResponse = await http.get(`/exams/draft-exam`);

  return response?.data?.data;
};

export const approveTheExam = async (
  payload: ApproveTheExamPayload,
): Promise<ExamModel[]> => {
  const response: AxiosResponse = await http.patch(
    `/administrator/exams/${payload.id}`,
    {
      is_approved: payload.is_approved,
    },
  );
  return response?.data?.data;
};

export const createTheExam = async (): Promise<ExamModel> => {
  const response: AxiosResponse = await http.post(`/exams`);

  return response?.data?.data;
};

export const updateExamByAdmin = async (
  payload: RequestUpdateExam,
  examId: string,
): Promise<ExamModel> => {
  const response: AxiosResponse = await http.patch(
    `/administrator/exams/${examId}`,
    payload,
  );

  return response?.data?.data;
};

export const getExamsByOwner = async (
  urlParams: URLparams,
): Promise<DataWithMeta<ExamModel[]>> => {
  const response: AxiosResponse = await http.get(`/exams/owner`, {
    params: {
      currentPage: urlParams?.currentPage || DEFAULT_PAGINATION.currentPage,
      pageSize: urlParams?.pageSize || DEFAULT_PAGINATION.pageSize,
    },
  });

  return response?.data;
};

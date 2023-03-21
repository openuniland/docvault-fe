import { AxiosResponse } from "axios";

import { GetAllExamsBySubjectIdResponse, ExamModel } from "types/ExamModel";

import http from "utils/api/http";

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

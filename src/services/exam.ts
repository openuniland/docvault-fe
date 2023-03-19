import { AxiosResponse } from "axios";

import { GetAllExamsBySubjectIdResponse } from "types/ExamModel";

import http from "utils/api/http";

export const getAllExamsBySubjectId = async (
  subjectId: string,
): Promise<GetAllExamsBySubjectIdResponse> => {
  const response: AxiosResponse = await http.get(`/exams/subject/${subjectId}`);

  return response?.data?.data;
};

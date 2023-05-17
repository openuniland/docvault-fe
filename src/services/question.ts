import { AxiosResponse } from "axios";
import { DeleteResponse } from "types/Common";

import {
  NewQuestionPayload,
  Question,
  GetAllQuestionsByExamIdResponse,
} from "types/Question";
import http from "utils/api/http";

export const createNewQuestion = async (
  payload: NewQuestionPayload,
): Promise<Question> => {
  const response: AxiosResponse = await http.post(`/questions`, payload);

  return response?.data?.data;
};

export const getQuestionsByExamId = async (
  examId?: string,
): Promise<GetAllQuestionsByExamIdResponse> => {
  const response: AxiosResponse = await http.get(`/questions/exam/${examId}`);

  return response?.data?.data;
};

export const deleteAQuestionById = async (
  id: string,
): Promise<DeleteResponse> => {
  const response: AxiosResponse = await http.delete(`/questions/${id}`);

  return response?.data?.data;
};

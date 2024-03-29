import { AxiosResponse } from "axios";

import { Subject, SubjectPayload } from "types/Subject";
import http from "utils/api/http";

export const getAllSubjects = async (topic?: string): Promise<Subject[]> => {
  const response: AxiosResponse = await http.get(
    `/subjects?is_approved=true&pageSize=100&order=ASC&sort=subject_name&topic=${topic}`,
  );

  return response?.data?.data;
};

export const getSubjectById = async (subjectId: string): Promise<Subject> => {
  const response: AxiosResponse = await http.get(`/subjects/${subjectId}`);

  return response?.data?.data;
};

export const createSubject = async (
  payload: SubjectPayload,
): Promise<Subject> => {
  const response: AxiosResponse = await http.post(`/subjects`, payload);

  return response?.data?.data;
};

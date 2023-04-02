import { AxiosResponse } from "axios";

import {
  DocumentModel,
  CreateTheDocumentPayload,
  GetAllDocumentsBySubjectIdResponse,
} from "types/DocumentModel";

import http from "utils/api/http";

export const getAllDocumentsBySubjectId = async (
  subjectId: string,
): Promise<GetAllDocumentsBySubjectIdResponse> => {
  const response: AxiosResponse = await http.get(
    `/documents/subject/${subjectId}`,
  );

  return response?.data?.data;
};

export const createDocument = async (
  payload: CreateTheDocumentPayload,
): Promise<DocumentModel> => {
  const response: AxiosResponse = await http.post(
    `/administrator/documents`,
    payload,
  );

  return response?.data?.data;
};

export const getDocument = async (
  documentId: string,
): Promise<DocumentModel> => {
  const response: AxiosResponse = await http.get(`/documents/${documentId}`);

  return response?.data?.data;
};

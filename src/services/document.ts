import { AxiosResponse } from "axios";
import { DocumentModel } from "types/DocumentModel";

import http from "utils/api/http";

export const getAllDocumentsBySubjectId = async (
  subjectId: string,
): Promise<DocumentModel[]> => {
  const response: AxiosResponse = await http.get(
    `/documents/subject/${subjectId}`,
  );

  return response?.data?.data;
};

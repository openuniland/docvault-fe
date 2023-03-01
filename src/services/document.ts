import { AxiosResponse } from "axios";
import { GetAllDocumentsBySubjectIdResponse } from "types/DocumentModel";

import http from "utils/api/http";

export const getAllDocumentsBySubjectId = async (
  subjectId: string,
): Promise<GetAllDocumentsBySubjectIdResponse> => {
  const response: AxiosResponse = await http.get(
    `/documents/subject/${subjectId}`,
  );

  return response?.data?.data;
};

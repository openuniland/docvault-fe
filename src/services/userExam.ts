import { AxiosResponse } from "axios";

import http from "utils/api/http";

export const getUserExams = async () => {
  const response: AxiosResponse = await http.get(
    `/user-exams?is_completed=${false}}`,
  );

  return response?.data?.data;
};

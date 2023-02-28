import { AxiosResponse } from "axios";
import { UserExam } from "types/UserExam";

import http from "utils/api/http";

export const getUserExams = async (): Promise<UserExam[]> => {
  const response: AxiosResponse = await http.get(
    `/user-exams?is_completed=${false}`,
  );

  return response?.data?.data;
};

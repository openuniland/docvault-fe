import { AxiosResponse } from "axios";

import { RequestUpdateUserAnswer, UserAnswer } from "types/UserAnswer";
import http from "utils/api/http";

export const updateUserAnswer = async (
  payload: RequestUpdateUserAnswer,
  userAnswerId?: string,
): Promise<UserAnswer> => {
  const response: AxiosResponse = await http.put(
    `/user-answers/${userAnswerId}`,
    payload,
  );

  return response?.data?.data;
};

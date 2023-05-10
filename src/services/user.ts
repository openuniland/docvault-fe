import { AxiosResponse } from "axios";

import { User, RequestUpdateUser } from "types/User";
import http from "utils/api/http";

export const getUserInfo = async (): Promise<User> => {
  const response: AxiosResponse = await http.get(`/users/info`);

  return response?.data?.data;
};

export const updateUserInfo = async (
  payload: RequestUpdateUser,
): Promise<User> => {
  const response: AxiosResponse = await http.patch(`/users`, payload);

  return response?.data?.data;
};

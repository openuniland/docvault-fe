import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import configs from "configs";
import { getTokens, removeItemFromStorage } from "utils/storage";

const { accessToken } = getTokens();

const http = axios.create({
  baseURL: configs.apiEndpoint,
});

http.defaults.headers.common.authorization = `Bearer ${accessToken}`;

http.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  async function (response: AxiosResponse) {
    return response;
  },
  async function (error: any) {
    const { response } = error;
    const errorMessage = response?.data?.message;

    if (errorMessage === "jwt expired") {
      //
    }

    if (
      errorMessage === "invalid signature" ||
      errorMessage === "jwt malformed"
    ) {
      removeItemFromStorage("tokens");
      removeItemFromStorage("userData");
      window.location.replace("/");
    }

    return Promise.reject(error?.response?.data);
  },
);

export default http;

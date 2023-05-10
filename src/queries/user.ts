import { useQuery } from "react-query";

import { getUserInfo } from "services/user";
import { STALE_TIME } from "utils/constants";

export const useGetUserInfo = () =>
  useQuery(["get-user-info"], () => getUserInfo(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

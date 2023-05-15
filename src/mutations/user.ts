import { useMutation } from "react-query";

import { RequestUpdateUser } from "types/User";
import { updateUserInfo } from "services/user";

export const useUpdateUser = () =>
  useMutation((payload: RequestUpdateUser) => {
    return updateUserInfo(payload);
  });

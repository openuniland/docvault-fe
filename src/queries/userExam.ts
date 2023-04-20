import { useQuery } from "react-query";

import { getUserExamsInprogress, getUserExamByOwner } from "services/userExam";
import { STALE_TIME } from "utils/constants";

export const useGetUserExamsInprogress = () =>
  useQuery(["get-user-exams"], () => getUserExamsInprogress(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
export const useGetUserExamByOwner = (userExamId: string) =>
  useQuery(
    ["get-user-exam-by-owner", userExamId],
    () => getUserExamByOwner(userExamId),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

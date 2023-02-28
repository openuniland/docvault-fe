import { useQuery } from "react-query";

import { getUserExams } from "services/userExam";
import { STALE_TIME } from "utils/constants";

export const useGetUserExams = () =>
  useQuery(["get-user-exams"], () => getUserExams(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

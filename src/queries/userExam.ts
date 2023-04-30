import { useQuery } from "react-query";

import {
  getUserExams,
  getUserExamsCompletedByOwner,
  getUserExamsNotCompletedByOwner,
} from "services/userExam";
import { STALE_TIME } from "utils/constants";
import { URLparams } from "types";

export const useGetUserExams = () =>
  useQuery(["get-user-exams"], () => getUserExams(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

export const useGetUserExamsCompletedByOwner = (urlParams: URLparams) =>
  useQuery(
    [
      "get-user-exams-completed-by-owner",
      urlParams?.currentPage,
      urlParams?.pageSize,
    ],
    () => getUserExamsCompletedByOwner(urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

export const useGetUserExamsNotCompletedByOwner = (urlParams: URLparams) =>
  useQuery(
    [
      "get-user-exams-not-completed-by-owner",
      urlParams?.currentPage,
      urlParams?.pageSize,
    ],
    () => getUserExamsNotCompletedByOwner(urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

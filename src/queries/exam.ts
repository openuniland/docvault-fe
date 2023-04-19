import { useQuery } from "react-query";

import {
  getAllExamsBySubjectId,
  getExamById,
  getDraftExam,
  getExamsByOwner,
} from "services/exam";
import { URLparams } from "types";
import { STALE_TIME } from "utils/constants";

export const useGetAllExamsBySubjectId = (
  subjectId: string,
  urlParams: URLparams,
) =>
  useQuery(
    [
      "get-exam-by-subjectId",
      subjectId,
      urlParams?.currentPage,
      urlParams?.pageSize,
    ],
    () => getAllExamsBySubjectId(subjectId, urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

export const useGetExamById = (examId: string) =>
  useQuery(["get-exam-by-id", examId], () => getExamById(examId), {
    staleTime: Infinity,
  });

export const useGetDraftExam = () =>
  useQuery(["get-draft-exam"], () => getDraftExam(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

export const useGetExamsByOwner = (urlParams: URLparams) =>
  useQuery(
    ["get-exams-by-owner", urlParams?.currentPage, urlParams?.pageSize],
    () => getExamsByOwner(urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

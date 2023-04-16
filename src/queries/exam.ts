import { useQuery } from "react-query";

import {
  getAllExamsBySubjectId,
  getExamById,
  getDraftExam,
  getExamsByOwner,
} from "services/exam";
import { STALE_TIME } from "utils/constants";

export const useGetAllExamsBySubjectId = (subjectId: string) =>
  useQuery(
    ["get-exam-by-subjectId", subjectId],
    () => getAllExamsBySubjectId(subjectId),
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

export const useGetExamsByOwner = () =>
  useQuery(["get-exams-by-owner"], () => getExamsByOwner(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

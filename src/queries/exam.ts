import { useQuery } from "react-query";

import { getAllExamsBySubjectId, getExamById } from "services/exam";
import { STALE_TIME } from "utils/constants";

export const useGetAllExamsBySubjectId = (subjectId: string) =>
  useQuery(
    ["get-document-by-subjectId", subjectId],
    () => getAllExamsBySubjectId(subjectId),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

export const useGetExamById = (examId: string) =>
  useQuery(["get-exam-by-id", examId], () => getExamById(examId), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

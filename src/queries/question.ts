import { useQuery } from "react-query";
import { getQuestionsByExamId } from "services/question";
import { STALE_TIME } from "utils/constants";

export const useGetQuestionsByExamId = (examId?: string) =>
  useQuery(
    ["get-questions-by-exam-id", examId],
    () => getQuestionsByExamId(examId),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

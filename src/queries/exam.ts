import { useQuery } from "react-query";

import { getAllExamsBySubjectId } from "services/exam";
import { STALE_TIME } from "utils/constants";

export const useGetAllExamsBySubjectId = (subjectId: string) =>
  useQuery(
    ["get-document-by-subjectId", subjectId],
    () => getAllExamsBySubjectId(subjectId),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

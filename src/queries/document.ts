import { useQuery } from "react-query";

import { getAllDocumentsBySubjectId } from "services/document";
import { STALE_TIME } from "utils/constants";

export const useGetAllDocumentsBySubjectId = (subjectId: string) =>
  useQuery(
    ["get-document-by-subjectId", subjectId],
    () => getAllDocumentsBySubjectId(subjectId),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

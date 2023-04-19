import { useQuery } from "react-query";

import {
  getAllDocumentsBySubjectId,
  getDocument,
  getDocumentsByOwner,
} from "services/document";
import { URLparams } from "types";
import { STALE_TIME } from "utils/constants";

export const useGetAllDocumentsBySubjectId = (
  subjectId: string,
  urlParams: URLparams,
) =>
  useQuery(
    [
      "get-document-by-subjectId",
      subjectId,
      urlParams?.currentPage,
      urlParams?.pageSize,
    ],
    () => getAllDocumentsBySubjectId(subjectId, urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

export const useGetDocument = (documentId: string) =>
  useQuery(
    ["get-document-by-documentId", documentId],
    () => getDocument(documentId),
    {
      staleTime: Infinity,
    },
  );

export const useGetDocumentsByOwner = (urlParams: URLparams) =>
  useQuery(
    ["get-document-by-owner", urlParams?.currentPage, urlParams?.pageSize],
    () => getDocumentsByOwner(urlParams),
    {
      staleTime: STALE_TIME.ONE_HOUR,
    },
  );

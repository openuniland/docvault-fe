import { useMutation } from "react-query";

import { createDocument } from "services/document";
import { DocumentPayload } from "types/DocumentModel";

export const useCreateDocument = () =>
  useMutation((payload: DocumentPayload) => createDocument(payload));

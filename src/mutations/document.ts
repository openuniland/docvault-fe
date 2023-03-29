import { useMutation } from "react-query";

import { createDocument } from "services/document";
import { CreateTheDocumentPayload } from "types/DocumentModel";

export const useCreateDocument = () =>
  useMutation((payload: CreateTheDocumentPayload) => createDocument(payload));

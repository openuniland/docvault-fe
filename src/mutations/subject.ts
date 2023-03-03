import { useMutation } from "react-query";

import { createSubject } from "services/subject";
import { SubjectPayload } from "types/Subject";

export const useCreateSubject = () =>
  useMutation((payload: SubjectPayload) => createSubject(payload));

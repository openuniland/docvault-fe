import { useQuery } from "react-query";

import { getAllSubjects, getSubjectById } from "services/subject";
import { STALE_TIME } from "utils/constants";

export const useGetAllSubjects = (topic?: string) =>
  useQuery(["get-all-subject", topic], () => getAllSubjects(topic), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

export const useGetSubjectById = (subjectId: string) =>
  useQuery(["get-subject-byId", subjectId], () => getSubjectById(subjectId), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

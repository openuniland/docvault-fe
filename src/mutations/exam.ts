import { useMutation } from "react-query";
import {
  approveTheExam,
  createTheExam,
  updateExamByAdmin,
} from "services/exam";
import {
  ApproveTheExamPayload,
  UpdateExamByAdminPayload,
} from "types/ExamModel";

export const useApproveTheExam = () =>
  useMutation((payload: ApproveTheExamPayload) => approveTheExam(payload));

export const useCreateTheExam = () => useMutation(() => createTheExam());

export const useUpdateExamByAdmin = () =>
  useMutation((payload: UpdateExamByAdminPayload) => {
    const { examId, requestUpdateExamPayload } = payload;
    return updateExamByAdmin(requestUpdateExamPayload, examId);
  });

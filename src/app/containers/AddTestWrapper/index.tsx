import classNames from "classnames/bind";
import { useCallback, useLayoutEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import styles from "./AddTestWrapper.module.scss";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { ExamModel, RequestUpdateExamModelFormPayload } from "types/ExamModel";
import { useGetDraftExam } from "queries/exam";
import { useCreateTheExam, useUpdateExamByAdmin } from "mutations/exam";
import { TestForm } from "app/components/TestForm";

const cx = classNames.bind(styles);

export const AddTestWrapper = () => {
  const [exam, setExam] = useState<ExamModel>();

  const { data: draftExam, isLoading } = useGetDraftExam();
  const { mutateAsync } = useCreateTheExam();
  const { mutateAsync: mutateAsyncUpdateExam } = useUpdateExamByAdmin();

  const handleGenerateDraftExam = useCallback(async () => {
    const data = await mutateAsync();
    enqueueSnackbar(`New exam id (${data._id}) successfully created!`, {
      variant: "success",
    });
    setExam(data);
  }, [setExam]);

  const handleSubmitExam = useCallback(
    async (data: RequestUpdateExamModelFormPayload) => {
      try {
        await mutateAsyncUpdateExam({
          requestUpdateExamPayload: {
            ...data.requestUpdateExamPayload,
            subject: data.requestUpdateExamPayload?.subject._id,
            is_draft: false,
          },
          examId: data.examId,
        });

        enqueueSnackbar(`New exam successfully updated!`, {
          variant: "success",
        });
        setExam(undefined);
      } catch (error) {
        enqueueSnackbar(`Update exam failed!`, {
          variant: "error",
        });
      }
    },
    [],
  );

  useLayoutEffect(() => {
    if (draftExam) {
      setExam(draftExam);
    }
  }, [draftExam?._id]);

  return (
    <div className={cx("container")}>
      <BreadcrumbsCustomization
        className={cx("breadcrumbs")}
        current="Tạo bài kiểm tra"
        breadcrumbsList={[{ linkTo: "/exams", text: "Các môn học" }]}
      />
      {isLoading ? (
        <Box className={cx("draftExamWrapper")}>
          <Skeleton className={cx("skeleton")} />
        </Box>
      ) : (
        <Box className={cx("draftExamWrapper")}>
          <div className={cx("draftExam")}>
            <Typography color="white">
              Draft exam hiện tại của bạn là :
            </Typography>
            <Typography color="white">
              {exam?._id ? exam?._id : "null"}
            </Typography>
            {!exam?._id && (
              <span
                className={cx("generate")}
                onClick={handleGenerateDraftExam}
              >
                Generate
              </span>
            )}
          </div>
          {!exam?._id && (
            <p className={cx("note")}>
              Bạn vui lòng tạo exam id trước khi tạo bài kiểm tra(Bấm generate)
            </p>
          )}
        </Box>
      )}
      <TestForm exam={exam} onSubmit={handleSubmitExam} />
    </div>
  );
};

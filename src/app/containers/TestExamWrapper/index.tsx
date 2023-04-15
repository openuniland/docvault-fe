import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import styles from "./TestExamWrapper.module.scss";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { useGetQuestionsByExamId } from "queries/question";
import RenderQuestion from "app/components/RenderQuestion";
import { useGetUserExamByOwner } from "queries/userExam";

const cx = classNames.bind(styles);

export const TestExamWrapper = () => {
  const { userExamId } = useParams();
  const { data: userExamByOwner } = useGetUserExamByOwner(userExamId as string);

  const examId = userExamByOwner?.original_exam;
  const { data: questionsByExamId } = useGetQuestionsByExamId(examId);

  return (
    <div className={cx("container")}>
      <BreadcrumbsCustomization
        className={cx("breadcrumbs")}
        current="Làm bài"
        breadcrumbsList={[{ linkTo: "/exams", text: "Các môn học" }]}
      />

      <div className={cx("examInfo")}>
        <Typography className={cx("examName")} component="h1">
          {questionsByExamId?.exam?.title}
        </Typography>
        <div className={cx("exam-subinfo-wrapper")}>
          <div className={cx("examItem")}>
            <Typography className={cx("nameItem")} component="p">
              Đã làm:
            </Typography>

            <Typography className={cx("highlight")} component="strong">
              {questionsByExamId?.exam?.subject?.subject_name}/
            </Typography>
            <Typography className={cx("highlight")} component="strong">
              {questionsByExamId?.questions?.length}
            </Typography>
          </div>

          <div className={cx("examItem")}>
            <Typography className={cx("nameItem")} component="p">
              Thời gian:
            </Typography>

            <Typography className={cx("highlight")} component="strong">
              {questionsByExamId?.questions?.length}
            </Typography>
            <Typography className={cx("highlightspace")} component="strong">
              phút
            </Typography>
          </div>
          <div className={cx("examItem")}>
            <Typography className={cx("nameItem")} component="p">
              Thời gian còn lại:
            </Typography>

            <Typography className={cx("highlight")} component="strong">
              {questionsByExamId?.questions?.length}
            </Typography>
            <Typography className={cx("highlightspace")} component="strong">
              phút
            </Typography>
          </div>
        </div>
      </div>

      <RenderQuestion
        questions={questionsByExamId?.questions}
        showDeleteButton={false}
      />
    </div>
  );
};

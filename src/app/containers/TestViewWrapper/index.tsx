import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import styles from "./TestViewWrapper.module.scss";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { useGetQuestionsByExamId } from "queries/question";
import RenderQuestion from "app/components/RenderQuestion";
import { Loading } from "app/components/Loading";

const cx = classNames.bind(styles);

export const TestViewWrapper = () => {
  const { examId } = useParams();
  const { data: questionsByExamId, isLoading } = useGetQuestionsByExamId(
    examId as string,
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={cx("container")}>
      <BreadcrumbsCustomization
        className={cx("breadcrumbs")}
        current="Chi tiết"
        breadcrumbsList={[{ linkTo: "/exams", text: "Các môn học" }]}
      />

      <div className={cx("examInfo")}>
        <Typography className={cx("examName")} component="h1">
          {questionsByExamId?.exam?.title}
        </Typography>

        <div className={cx("examItem")}>
          <Typography className={cx("nameItem")} component="p">
            Môn học
          </Typography>
          <Typography className={cx("colon1")} component="p">
            :
          </Typography>
          <Typography className={cx("highlight")} component="strong">
            {questionsByExamId?.exam?.subject?.subject_name}
          </Typography>
        </div>

        <div className={cx("examItem")}>
          <Typography className={cx("nameItem")} component="p">
            Tác giả đăng
          </Typography>
          <Typography className={cx("colon2")} component="p">
            :
          </Typography>
          <Typography className={cx("highlight")} component="strong">
            {questionsByExamId?.exam?.author?.fullname ||
              questionsByExamId?.exam?.author?.nickname}
          </Typography>
        </div>

        <div className={cx("examItem")}>
          <Typography className={cx("nameItem")} component="p">
            Số lượng câu
          </Typography>
          <Typography className={cx("colon2")} component="p">
            :
          </Typography>
          <Typography className={cx("highlight")} component="strong">
            {questionsByExamId?.questions?.length}
          </Typography>
          <Typography className={cx("highlightspace")} component="strong">
            câu
          </Typography>
        </div>
        <div className={cx("examItem")}>
          <Typography className={cx("nameItem")} component="p">
            Năm học
          </Typography>
          <Typography className={cx("colon1")} component="p">
            :
          </Typography>
          <Typography className={cx("highlight")} component="strong">
            {questionsByExamId?.exam?.school_year}
          </Typography>
        </div>
      </div>

      <RenderQuestion
        questions={questionsByExamId?.questions}
        showDeleteButton={false}
      />
    </div>
  );
};

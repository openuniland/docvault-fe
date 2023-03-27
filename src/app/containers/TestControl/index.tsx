import { Typography } from "@mui/material";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import styles from "./TestControl.module.scss";
import { useGetAllExamsBySubjectId } from "queries/exam";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { ContentItem } from "app/components/ContentItem";

const cx = classNames.bind(styles);

export const TestControl = () => {
  const { subjectId } = useParams();
  const { data: examsBySubject } = useGetAllExamsBySubjectId(
    subjectId as string,
  );
  return (
    <div className={cx("container")}>
      <BreadcrumbsCustomization
        className={cx("breadcrumb")}
        current={examsBySubject?.subject?.subject_name}
        breadcrumbsList={[{ linkTo: "/exams", text: "Các môn học(kiểm tra)" }]}
      />

      <div className={cx("subjectWrapper")}>
        <Typography className={cx("subjectName")} color="text.primary">
          Thêm bài kiểm tra mới
        </Typography>
        <AddCircleIcon className={cx("addIcon")} />
      </div>

      <div className={cx("examList")}>
        {examsBySubject?.exams?.map(exam => (
          <ContentItem
            key={exam?._id}
            createdAt={exam?.created_at}
            description={`Đề thi thử kì ${exam?.semester} năm học ${exam?.school_year} `}
            prefix="exams"
            id={exam?._id}
            title={exam?.title}
          />
        ))}
      </div>

      {examsBySubject?.exams?.length === 0 && (
        <Typography className={cx("subjectName")} color="text.primary">
          Tài liệu của môn học này không có (hoặc có nhưng chưa được admin phê
          duyệt).
        </Typography>
      )}
    </div>
  );
};

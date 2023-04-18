import { Typography, Pagination, LinearProgress } from "@mui/material";
import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCallback, useState, useMemo } from "react";

import styles from "./TestControl.module.scss";
import { useGetAllExamsBySubjectId } from "queries/exam";
import { DEFAULT_PAGINATION } from "utils/constants";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { ContentItem } from "app/components/ContentItem";

const cx = classNames.bind(styles);

export const TestControl = () => {
  const { subjectId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { data: examsBySubject, isLoading } = useGetAllExamsBySubjectId(
    subjectId as string,
    {
      currentPage: currentPage - 1,
    },
  );

  const handlePaging = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    [currentPage],
  );

  const pageCount = useMemo(() => {
    const total = examsBySubject?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [examsBySubject?.meta?.total]);
  const handleAddTestPage = useCallback(() => {
    navigate(`/exams/new`);
  }, [navigate]);
  return (
    <div className={cx("container")}>
      {isLoading && <LinearProgress />}

      <BreadcrumbsCustomization
        className={cx("breadcrumb")}
        current={examsBySubject?.data?.subject?.subject_name}
        breadcrumbsList={[{ linkTo: "/exams", text: "Các môn học(kiểm tra)" }]}
      />

      <div className={cx("subjectWrapper")}>
        <Typography className={cx("subjectName")} color="text.primary">
          Thêm bài kiểm tra mới
        </Typography>
        <AddCircleIcon className={cx("addIcon")} onClick={handleAddTestPage} />
      </div>

      <div className={cx("examList")}>
        {examsBySubject?.data?.exams?.map(exam => (
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

      {examsBySubject?.data?.exams?.length === 0 && (
        <Typography className={cx("subjectName")} color="text.primary">
          Tài liệu của môn học này không có (hoặc có nhưng chưa được admin phê
          duyệt).
        </Typography>
      )}
      {pageCount >= 2 && (
        <div className={cx("paging")}>
          <Pagination
            count={pageCount}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={handlePaging}
          />
        </div>
      )}
    </div>
  );
};

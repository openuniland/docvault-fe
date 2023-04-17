import classNames from "classnames/bind";
import { Typography, Pagination } from "@mui/material";
import { useState, useCallback, useMemo } from "react";

import styles from "./ProfilePageWrapper.module.scss";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { ContentItem } from "app/components/ContentItem";
import { useGetDocumentsByOwner } from "queries/document";
import { DEFAULT_PAGINATION } from "utils/constants";

import { useGetExamsByOwner } from "queries/exam";

const cx = classNames.bind(styles);

export const ProfilePageWrapper = () => {
  const [currentDocumentPage, setcurrentDocumentPage] = useState(1);
  const [currentExamPage, setcurrentExamPage] = useState(1);

  const { data: documentsByOwner } = useGetDocumentsByOwner({
    currentPage: currentDocumentPage - 1,
  });
  const { data: examsByOwner } = useGetExamsByOwner({
    currentPage: currentExamPage - 1,
  });

  const handlePagingDocument = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setcurrentDocumentPage(value);
    },
    [currentDocumentPage],
  );

  const handlePagingExam = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setcurrentExamPage(value);
    },
    [currentExamPage],
  );

  const pageCountDocument = useMemo(() => {
    const total = documentsByOwner?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [documentsByOwner?.meta?.total]);

  const pageCountExam = useMemo(() => {
    const total = examsByOwner?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [examsByOwner?.meta?.total]);

  return (
    <div className={cx("container")}>
      <BreadcrumbsCustomization
        className={cx("breadcrumb")}
        current="profile"
        breadcrumbsList={[{ linkTo: "/", text: "Trang chủ" }]}
      />

      <div className={cx("documentsWrapper")}>
        <div className={cx("wrapperTitle")}>
          <Typography className={cx("titleName")} color="text.primary">
            Tài liệu của bạn
          </Typography>
        </div>
        <div className={cx("documentContent")}>
          <div className={cx("documentList")}>
            {documentsByOwner?.data?.map(document => (
              <ContentItem
                key={document?._id}
                createdAt={document?.created_at}
                description={`Đề thi thử kì ${document?.semester} năm học ${document?.school_year} `}
                prefix="documents"
                id={document?._id}
                title={document?.title}
              />
            ))}
          </div>
          <Pagination
            count={pageCountDocument}
            variant="outlined"
            shape="rounded"
            page={currentDocumentPage}
            onChange={handlePagingDocument}
          />
        </div>
      </div>

      <div className={cx("examWrapper")}>
        <div className={cx("wrapperTitle")}>
          <Typography className={cx("titleName")} color="text.primary">
            Bài kiểm tra của bạn
          </Typography>
        </div>
        <div className={cx("examContent")}>
          <div className={cx("examList")}>
            {examsByOwner?.data?.map(exam => (
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
          <Pagination
            count={pageCountExam}
            variant="outlined"
            shape="rounded"
            page={currentExamPage}
            onChange={handlePagingExam}
          />
        </div>
      </div>
    </div>
  );
};

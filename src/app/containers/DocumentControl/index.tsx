import { Typography, Pagination, LinearProgress } from "@mui/material";
import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import styles from "./DocumentControl.module.scss";
import { useGetAllDocumentsBySubjectId } from "queries/document";
import { DEFAULT_PAGINATION } from "utils/constants";
import { ContentItem } from "app/components/ContentItem";
import { useCallback, useState, useMemo } from "react";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";

const cx = classNames.bind(styles);

export const DocumentControl = () => {
  const { subjectId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { data: documentsBySubject, isLoading } = useGetAllDocumentsBySubjectId(
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
    const total = documentsBySubject?.meta?.total || 0;
    const pageSize = DEFAULT_PAGINATION.pageSize;

    return Math.ceil(total / pageSize);
  }, [documentsBySubject?.meta?.total]);

  const handleAddDocument = useCallback(() => {
    navigate(`/documents/new`);
  }, [navigate]);

  return (
    <div className={cx("container")}>
      {isLoading && <LinearProgress />}
      <BreadcrumbsCustomization
        className={cx("breadcrumb")}
        current={documentsBySubject?.data.subject?.subject_name}
        breadcrumbsList={[
          { linkTo: "/documents", text: "Các môn học(tài liệu)" },
        ]}
      />

      <div className={cx("subjectWrapper")}>
        <Typography className={cx("subjectName")} color="text.primary">
          Thêm tài liệu mới
        </Typography>
        <AddCircleIcon className={cx("addIcon")} onClick={handleAddDocument} />
      </div>

      <div className={cx("documentList")}>
        {documentsBySubject?.data?.documents?.map((doc: any) => (
          <ContentItem
            key={doc?._id}
            createdAt={doc?.created_at}
            description={doc.description}
            prefix="documents"
            id={doc?._id}
            title={doc?.title}
          />
        ))}
      </div>
      {documentsBySubject?.data?.documents?.length === 0 && (
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

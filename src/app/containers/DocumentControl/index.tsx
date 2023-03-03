import { Breadcrumbs, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { Link, useParams, useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import styles from "./DocumentControl.module.scss";
import { useGetAllDocumentsBySubjectId } from "queries/document";
import { ContentItem } from "app/components/ContentItem";
import { useCallback } from "react";

const cx = classNames.bind(styles);

export const DocumentControl = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { data: documentsBySubject } = useGetAllDocumentsBySubjectId(
    subjectId as string,
  );

  const handleAddDocument = useCallback(() => {
    navigate(`/documents/new`);
  }, [navigate]);

  return (
    <div className={cx("container")}>
      <Breadcrumbs aria-label="breadcrumb" className={cx("breadcrumb")}>
        <Link color="inherit" to="/documents" className={cx("link")}>
          Các môn học(tài liệu)
        </Link>
        <Typography className={cx("text")} color="text.primary">
          {documentsBySubject?.subject?.subject_name}
        </Typography>
      </Breadcrumbs>

      <div className={cx("subjectWrapper")}>
        <Typography className={cx("subjectName")} color="text.primary">
          {documentsBySubject?.subject?.subject_name}
        </Typography>
        <AddCircleIcon className={cx("addIcon")} onClick={handleAddDocument} />
      </div>

      <div className={cx("documentList")}>
        {documentsBySubject?.documents.map(document => (
          <ContentItem
            key={document?._id}
            createdAt={document?.created_at}
            description={document.description}
            id={document?._id}
            title={document?.title}
          />
        ))}
      </div>

      {documentsBySubject?.documents.length === 0 && (
        <Typography className={cx("subjectName")} color="text.primary">
          Tài liệu của môn học này không có (hoặc có nhưng chưa được admin phê
          duyệt).
        </Typography>
      )}
    </div>
  );
};

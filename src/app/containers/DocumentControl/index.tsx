import { Typography } from "@mui/material";
import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import styles from "./DocumentControl.module.scss";
import { useGetAllDocumentsBySubjectId } from "queries/document";
import { ContentItem } from "app/components/ContentItem";
import { useCallback } from "react";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";

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
      <BreadcrumbsCustomization
        className={cx("breadcrumb")}
        current={documentsBySubject?.subject?.subject_name}
        breadcrumbsList={[
          { linkTo: "/documents", text: "Các môn học(tài liệu)" },
        ]}
      />

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
            prefix="documents"
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

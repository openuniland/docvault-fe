import classNames from "classnames/bind";
import { useParams } from "react-router-dom";

import { useGetSubjectById } from "queries/subject";
import styles from "./AddDocumentWrapper.module.scss";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { useMemo } from "react";
import { DocumentForm } from "app/components/DocumentForm";

const cx = classNames.bind(styles);

export const AddDocumentWrapper = () => {
  const { subjectId } = useParams();

  const { data: subject } = useGetSubjectById(subjectId as string);

  const breadcrumbsList = useMemo(() => {
    return [
      {
        text: "Các môn học(tài liệu)",
        linkTo: "/documents",
      },
      {
        text: subject?.subject_name || "",
        linkTo: `/documents/${subjectId}`,
      },
    ];
  }, [subject]);

  return (
    <div className={cx("container")}>
      <BreadcrumbsCustomization
        current="Thêm"
        breadcrumbsList={breadcrumbsList}
      />

      <DocumentForm />
    </div>
  );
};

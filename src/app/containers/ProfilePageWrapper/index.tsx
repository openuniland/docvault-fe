import classNames from "classnames/bind";
import { Typography } from "@mui/material";

import styles from "./ProfilePageWrapper.module.scss";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { ContentItem } from "app/components/ContentItem";
import { useGetDocumentsByOwner } from "queries/document";
import { useGetExamsByOwner } from "queries/exam";

const cx = classNames.bind(styles);

export const ProfilePageWrapper = () => {
  const { data: documentsByOwner } = useGetDocumentsByOwner();
  const { data: examsByOwner } = useGetExamsByOwner();
  console.log(examsByOwner);
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
        <div className={cx("documentList")}>
          {documentsByOwner?.documents?.map(document => (
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
      </div>

      <div className={cx("examWrapper")}>
        <div className={cx("wrapperTitle")}>
          <Typography className={cx("titleName")} color="text.primary">
            Bài kiểm tra của bạn
          </Typography>
        </div>
        <div className={cx("examList")}>
          {examsByOwner?.exams?.map(exam => (
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
      </div>
    </div>
  );
};

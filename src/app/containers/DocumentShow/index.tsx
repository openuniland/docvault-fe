import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { useGetDocument } from "queries/document";

import styles from "./DocumentShow.module.scss";
import { Typography } from "@mui/material";

const cx = classNames.bind(styles);

export const DocumentShow = () => {
  const { documentId } = useParams();

  const { data: document } = useGetDocument(documentId as string);
  return (
    <div className={cx("container")}>
      <BreadcrumbsCustomization
        current="test"
        breadcrumbsList={[{ linkTo: "/documents", text: "Documents" }]}
      />

      <Typography className={cx("title")} component="h1">
        {document?.title}
      </Typography>
      <Typography className={cx("description")} component="p">
        {document?.description}
      </Typography>
      <div></div>
    </div>
  );
};

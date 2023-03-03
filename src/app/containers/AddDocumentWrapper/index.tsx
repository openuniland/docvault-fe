import classNames from "classnames/bind";

import styles from "./AddDocumentWrapper.module.scss";
import { DocumentForm } from "app/components/DocumentForm";

const cx = classNames.bind(styles);

export const AddDocumentWrapper = () => {
  return (
    <div className={cx("container")}>
      <h3 className={cx("title")}>Thêm tài liệu</h3>
      <DocumentForm />
    </div>
  );
};

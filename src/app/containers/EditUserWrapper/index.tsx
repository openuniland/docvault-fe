import classNames from "classnames/bind";

import styles from "./EditUserWrapper.module.scss";
import { UserForm } from "app/components/UserForm";

const cx = classNames.bind(styles);

export const EditUserWrapper = () => {
  return (
    <div className={cx("container")}>
      <UserForm />
    </div>
  );
};

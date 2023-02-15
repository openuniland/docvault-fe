import classNames from "classnames/bind";

import { LoginFrame } from "app/components/LoginFrame";
import styles from "./LoginWrapper.module.scss";
import { LoginDecor } from "app/components/LoginDecor";

const cx = classNames.bind(styles);

export const LoginWrapper = () => {
  return (
    <div className={cx("container")}>
      <LoginDecor />
      <LoginFrame />
    </div>
  );
};

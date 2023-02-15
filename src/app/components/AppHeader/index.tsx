import classNames from "classnames/bind";

import styles from "./AppHeader.module.scss";

const cx = classNames.bind(styles);

export const AppHeader = () => {
  return <div className={cx("container")}>header</div>;
};

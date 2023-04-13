import classNames from "classnames/bind";

import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

export const NotFound = () => {
  return <div className={cx("container")}>404</div>;
};

import classNames from "classnames/bind";

import styles from "./Recommended.module.scss";

const cx = classNames.bind(styles);

export const Recommended = () => {
  return <div className={cx("container")}>Recommended</div>;
};

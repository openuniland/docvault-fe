import classNames from "classnames/bind";

import styles from "./Loading.module.scss";
import { CircularProgress } from "@mui/material";

const cx = classNames.bind(styles);

export const Loading = () => {
  return (
    <div className={cx("container")}>
      <CircularProgress />
    </div>
  );
};

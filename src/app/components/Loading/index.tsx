import classNames from "classnames/bind";

import styles from "./Loading.module.scss";
import { CircularProgress } from "@mui/material";

const cx = classNames.bind(styles);

interface Props {
  className?: string;
}

export const Loading = (props: Props) => {
  const { className } = props;
  return (
    <div className={cx("container", className)}>
      <CircularProgress />
    </div>
  );
};

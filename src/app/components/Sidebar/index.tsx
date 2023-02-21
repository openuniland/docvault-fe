import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import TimerIcon from "@mui/icons-material/Timer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteIcon from "@mui/icons-material/Favorite";

import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

export const Sidebar = () => {
  return (
    <div className={cx("container")}>
      <Link to="" className={cx("button")}>
        <HomeIcon />
        <span>Trang chủ</span>
      </Link>
      <Link to="" className={cx("button")}>
        <TimerIcon />
        <span>Kiểm tra</span>
      </Link>
      <Link to="" className={cx("button")}>
        <AssignmentIcon />
        <span>Tài liệu</span>
      </Link>
      <Link to="" className={cx("button")}>
        <FavoriteIcon />
        <span>Yêu thích</span>
      </Link>
    </div>
  );
};

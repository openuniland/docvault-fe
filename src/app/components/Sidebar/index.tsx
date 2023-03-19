import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { useCallback, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import TimerIcon from "@mui/icons-material/Timer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { getSidebarStatus, setSidebarStatus } from "utils/storage";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

const menuList = [
  {
    path: "/",
    name: "Trang chủ",
    icon: <HomeIcon />,
    isActive: "active",
  },
  {
    path: "/exams",
    name: "Kiểm tra",
    icon: <TimerIcon />,
    isActive: "",
  },
  {
    path: "/documents",
    name: "Tài liệu",
    icon: <AssignmentIcon />,
    isActive: "",
  },
  {
    path: "/favorites",
    name: "Yêu thích",
    icon: <FavoriteIcon />,
    isActive: "",
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isOpenSidebar, setIsOpenSidebar] = useState(() => {
    return getSidebarStatus().status || false;
  });

  const handleResizeSidebar = useCallback(() => {
    setIsOpenSidebar(!isOpenSidebar);
    setSidebarStatus({
      status: !isOpenSidebar,
    });
  }, [isOpenSidebar]);

  return (
    <div
      className={cx("container", {
        close: isOpenSidebar,
      })}
    >
      <div className={cx("contain")}>
        {menuList.map(menuItem => (
          <Link
            to={menuItem.path}
            key={menuItem.name}
            className={cx(
              "navigate",
              {
                close: isOpenSidebar,
              },
              {
                active: location.pathname === menuItem.path,
              },
            )}
          >
            <span>{menuItem.icon}</span>
            <strong
              className={cx("name", {
                close: isOpenSidebar,
              })}
            >
              {menuItem.name}
            </strong>
          </Link>
        ))}
      </div>
      <div className={cx("divisionLine")} onClick={handleResizeSidebar}>
        <span className={cx("iconWrapper")}>
          {isOpenSidebar ? (
            <ArrowForwardIosIcon className={cx("arrowIcon")} />
          ) : (
            <ArrowBackIosNewIcon className={cx("arrowIcon")} />
          )}
        </span>
      </div>
    </div>
  );
};

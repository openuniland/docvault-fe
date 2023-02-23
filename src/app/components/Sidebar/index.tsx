import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import TimerIcon from "@mui/icons-material/Timer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import styles from "./Sidebar.module.scss";
import { useState } from "react";

// import { MenuItem } from "@mui/material";

const cx = classNames.bind(styles);

const menuList = [
  {
    path: "/",
    name: "Trang chủ",
    icon: <HomeIcon />,
    isActive: "active",
  },
  {
    path: "",
    name: "Kiểm tra",
    icon: <TimerIcon />,
    isActive: "",
  },
  {
    path: "",
    name: "Tài liệu",
    icon: <AssignmentIcon />,
    isActive: "",
  },
  {
    path: "",
    name: "Yêu thích",
    icon: <FavoriteIcon />,
    isActive: "",
  },
];

export const Sidebar = () => {
  const storageIsOpenState = Boolean(localStorage.getItem("isOpen"));

  const [isOpen, setIsOpen] = useState(storageIsOpenState);
  const toggleCloseSidebar = () => {
    setIsOpen(() => {
      const newState = !isOpen;
      if (!isOpen) {
        localStorage.setItem("isOpen", "1");
      } else {
        localStorage.setItem("isOpen", "");
      }
      return newState;
    });
  };

  return (
    <div
      style={{
        width: isOpen ? "300px" : "60px",
        padding: isOpen ? "48px 24px" : "48px 4px",
      }}
      className={cx("container")}
    >
      <div className={cx("close-sidebar__icon")} onClick={toggleCloseSidebar}>
        <ArrowCircleLeftOutlinedIcon
          style={{ display: isOpen ? "block" : "none" }}
        />
        <ArrowCircleRightOutlinedIcon
          style={{ display: isOpen ? "none" : "block" }}
        />
      </div>
      {menuList.map((menuItem, index) => (
        <Link
          to={menuItem.path}
          key={index}
          className={cx("button", menuItem.isActive)}
        >
          <div>{menuItem.icon}</div>
          <span style={{ display: isOpen ? "block" : "none" }}>
            {menuItem.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

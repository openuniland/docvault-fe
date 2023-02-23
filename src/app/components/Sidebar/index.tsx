import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import TimerIcon from "@mui/icons-material/Timer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteIcon from "@mui/icons-material/Favorite";

import styles from "./Sidebar.module.scss";
// import { MenuItem } from "@mui/material";

const cx = classNames.bind(styles);

const menuItem = [
  {
    path: "",
    name: "Trang chủ",
    icon: <HomeIcon />,
  },
  {
    path: "",
    name: "Kiểm tra",
    icon: <TimerIcon />,
  },
  {
    path: "",
    name: "Tài liệu",
    icon: <AssignmentIcon />,
  },
  {
    path: "",
    name: "Yêu thích",
    icon: <FavoriteIcon />,
  },
];
export const Sidebar = () => {
  // const menuShow = (menuItems: any) => {
  //   return menuItems.map((item: any, index: any) => {
  //     // <a href={item.path} key={index} className={cx("button")}>
  //     //   <div className={cx("icon")}>{item.icon}</div>
  //     //   <div className={cx("name-element")}>{item.name}</div>
  //     // </a>;
  //     <div key={index}>{item.name}</div>;
  //     console.log(item.name);
  //   });
  // };

  return (
    <div className={cx("container")}>
      <div>
        <button className="close_sidebar"></button>
        <>
          {menuItem.map((item, index) => {
            <Link to={item.path} key={index} className={cx("button")}>
              <div className={cx("icon")}>{item.icon}</div>
              <div className={cx("name-element")}>{item.name}</div>
            </Link>;
            console.log(item.name);
          })}
        </>
      </div>

      {/* <Link to="" className={cx("button")}>
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
      </Link> */}
    </div>
  );
};

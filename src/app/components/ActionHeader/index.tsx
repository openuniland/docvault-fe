import classNames from "classnames/bind";
import { ButtonCustomization } from "../ButtonCustomization";
import { Avatar } from "@mui/material";
import {
  Settings,
  Explore,
  Info,
  Logout,
  MailOutline,
  Notifications,
} from "@mui/icons-material";
import Tippy from "@tippyjs/react/headless";

import styles from "./ActionHeader.module.scss";
import { getTokens } from "utils/storage";

const cx = classNames.bind(styles);

export const ActionHeader = () => {
  const { userInfo } = getTokens();

  return (
    <div className={cx("container")}>
      <div className={cx("actionIcon")}>
        <ButtonCustomization className={cx("messengerIcon")}>
          <MailOutline />
        </ButtonCustomization>
        <ButtonCustomization className={cx("notificationsIcon")}>
          <Notifications />
        </ButtonCustomization>
      </div>
      <Tippy
        appendTo={document.body}
        placement={"bottom-end"}
        interactive={true}
        trigger={"click"}
        render={attrs => (
          <div className={cx("poperAvatar")} tabIndex={-1} {...attrs}>
            <div className={cx("poper")}>
              <div className={cx("profile")}>
                <Avatar src={userInfo?.avatar} className={cx("avatarIcon")} />
                <div className={cx("name")}>{userInfo?.name}</div>
                <div className={cx("email")}>{userInfo?.email}</div>
              </div>
              <div className={cx("setting")}>
                <div className={cx("frame")}>
                  <Settings className={cx("icon")} />
                  <p>Cài đặt</p>
                </div>
                <div className={cx("frame")}>
                  <Explore className={cx("icon")} />
                  <p>Phản hồi</p>
                </div>
                <div className={cx("frame")}>
                  <Info className={cx("icon")} />
                  <p>Thông tin</p>
                </div>
              </div>
            </div>
            <div className={cx("logout")}>
              <Logout className={cx("icon")} />
              <p>Đăng xuất</p>
            </div>
            <div className={cx("description")}>
              Privacy · Terms · Revise © 2023
            </div>
          </div>
        )}
      >
        <div className={cx("avatar")}>
          <Avatar src={userInfo?.avatar} className={cx("avatarIcon")} />
        </div>
      </Tippy>
    </div>
  );
};

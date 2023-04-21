import classNames from "classnames/bind";
import { Avatar, IconButton, Switch } from "@mui/material";
import {
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  Lock,
  Explore,
  Info,
  Logout,
  MailOutline,
  Notifications,
} from "@mui/icons-material";
import Tippy from "@tippyjs/react/headless";
import { useDispatch } from "react-redux";

import styles from "./ActionHeader.module.scss";
import {
  getTokens,
  getUIMode,
  removeItemFromStorage,
  setUIMode,
} from "utils/storage";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { systemActions } from "store/slice/systemReducer";

const cx = classNames.bind(styles);

export const ActionHeader = () => {
  const dispath = useDispatch();
  const { userInfo } = getTokens();
  const navigate = useNavigate();
  const [uiMode, setUiMode] = useState(() => {
    const mode = getUIMode();
    return mode || "light";
  });

  const handleLogout = useCallback(() => {
    removeItemFromStorage("tokens");
    window.location.href = "/";
  }, []);

  const handleChangeUIMode = useCallback(() => {
    const mode = uiMode === "light" ? "dark" : "light";
    setUiMode(mode);
    dispath(systemActions.changeUIMode(mode));
    setUIMode(mode);
  }, [uiMode, dispath]);

  const handleNavigateProfilePage = useCallback(() => {
    navigate(`/profile`);
  }, [navigate]);

  const handleNavigatePrivacyPage = useCallback(() => {
    navigate(`/privacy-policy`);
  }, [navigate]);

  const handleNavigateTermsOfUserPage = useCallback(() => {
    navigate(`/terms-of-user`);
  }, [navigate]);
  return (
    <div className={cx("container")}>
      <div className={cx("actionIcon")}>
        <Switch
          classes={{
            thumb: cx(
              {
                dark: uiMode === "dark",
                light: uiMode === "light",
              },
              "thumb",
            ),
            switchBase: cx("switchBase"),
            checked: cx("checked"),
          }}
          checked={uiMode === "dark"}
          onChange={handleChangeUIMode}
        />
        <IconButton className={cx("iconWrapper")}>
          <MailOutline className={cx("icon")} />
        </IconButton>
        <IconButton className={cx("iconWrapper")}>
          <Notifications className={cx("icon")} />
        </IconButton>
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
                <div className={cx("name")} onClick={handleNavigateProfilePage}>
                  {userInfo?.name}
                </div>
                <div className={cx("email")}>{userInfo?.email}</div>
              </div>
              <div className={cx("setting")}>
                <div
                  className={cx("frame")}
                  onClick={handleNavigatePrivacyPage}
                >
                  <Lock className={cx("icon")} />
                  <p>Bảo mật & quyền riêng tư</p>
                </div>
                <div className={cx("frame")}>
                  <Explore className={cx("icon")} />
                  <p>Phản hồi & đóng góp ý kiến</p>
                </div>
                <div
                  className={cx("frame")}
                  onClick={handleNavigateTermsOfUserPage}
                >
                  <Info className={cx("icon")} />
                  <p>Thông tin & điều khoản sử dụng</p>
                </div>
              </div>
            </div>
            <div className={cx("logout")} onClick={handleLogout}>
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

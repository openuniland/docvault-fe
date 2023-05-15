import classNames from "classnames/bind";

import styles from "./EditUserWrapper.module.scss";
import { UserForm } from "app/components/UserForm";
import { useGetUserInfo } from "queries/user";

const cx = classNames.bind(styles);

export const EditUserWrapper = () => {
  const { data: userInfo } = useGetUserInfo();

  return (
    <div className={cx("container")}>
      <UserForm userInfo={userInfo} />
    </div>
  );
};

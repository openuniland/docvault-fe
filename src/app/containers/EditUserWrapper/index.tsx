import classNames from "classnames/bind";

import styles from "./EditUserWrapper.module.scss";
import { UserForm } from "app/components/UserForm";
import { useGetUserInfo } from "queries/user";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

export const EditUserWrapper = () => {
  const { data: userInfo, refetch } = useGetUserInfo();

  const [isRefetch, setIsRefetch] = useState(false);
  const refetchUserInfo = (data: boolean) => {
    setIsRefetch(data);
  };
  useEffect(() => {
    if (isRefetch) {
      refetch();
      setIsRefetch(!isRefetch);
    }
  });

  return (
    <div className={cx("container")}>
      <UserForm userInfo={userInfo} handelChangeNickname={refetchUserInfo} />
    </div>
  );
};

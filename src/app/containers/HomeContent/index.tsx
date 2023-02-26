import classNames from "classnames/bind";

import { Banner } from "app/components/Banner";
import { InProgress } from "app/components/InProgress";
import { Recommended } from "app/components/Recommended";

import styles from "./HomeContent.module.scss";

const cx = classNames.bind(styles);

export const HomeContent = () => {
  return (
    <div className={cx("container")}>
      <Banner />
      <InProgress />
      <Recommended />
    </div>
  );
};

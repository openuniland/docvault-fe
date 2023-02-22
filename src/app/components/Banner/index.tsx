import classNames from "classnames/bind";
import bannerImg from "assets/images/banner.png";

import styles from "./Banner.module.scss";

const cx = classNames.bind(styles);

export const Banner = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("banerImg")}>
          <img src={bannerImg} alt="banner" className={cx("img")} />
        </div>
        <div className={cx("bannerText")}>
          <p className={cx("text")}>Thông báo</p>
        </div>
      </div>
    </div>
  );
};

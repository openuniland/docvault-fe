import classNames from "classnames/bind";

import { CircleDecor } from "../CircleDecor";
import styles from "./LoginDecor.module.scss";
import loginDecor1 from "assets/images/loginDecor_1.png";
import loginDecor2 from "assets/images/loginDecor_2.png";
import loginDecor3 from "assets/images/loginDecor_3.png";
import loginDecor4 from "assets/images/loginDecor_4.png";

const cx = classNames.bind(styles);

export const LoginDecor = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("circle")}>
        <CircleDecor
          className={cx("icon", "icon1")}
          src={loginDecor1}
          size="large"
        />
        <CircleDecor
          className={cx("icon", "icon2")}
          src={loginDecor4}
          size="small"
        />
        <CircleDecor
          className={cx("icon", "icon3")}
          src={loginDecor3}
          size="medium"
        />
        <CircleDecor
          className={cx("icon", "icon4")}
          src={loginDecor2}
          size="small"
        />
      </div>
      <strong className={cx("slogan")}>
        Muốn đi nhanh thì đi một mình Muốn đi xa thì đi máy bay
      </strong>
    </div>
  );
};

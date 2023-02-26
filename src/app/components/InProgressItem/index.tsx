import classNames from "classnames/bind";
import Slider from "@mui/material/Slider";

import { ButtonCustomization } from "../ButtonCustomization";
import styles from "./InProgressItem.module.scss";

const cx = classNames.bind(styles);

export const InProgressItem = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>Giải tích 1</div>
      <div className={cx("name")}>Đề giải tích năm học 2023 kì 2</div>
      <div className={cx("slider")}>
        <Slider
          disabled
          defaultValue={50}
          aria-label="Disabled slider"
          valueLabelDisplay="auto"
        />
      </div>
      <div className={cx("description")}>50%(12/24 câu đã hoàn thành)</div>
      <ButtonCustomization className={cx("examBtn")}>
        Tiếp tục
      </ButtonCustomization>
    </div>
  );
};

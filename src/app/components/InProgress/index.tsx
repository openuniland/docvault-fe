import classNames from "classnames/bind";
import Slider from "@mui/material/Slider";
import { useTranslation } from "react-i18next";

import { ButtonCustomization } from "../ButtonCustomization";
import styles from "./InProgress.module.scss";

const cx = classNames.bind(styles);

export const InProgress = () => {
  const { t } = useTranslation();

  return (
    <div className={cx("container")}>
      <div className={cx("listDoing")}>
        <div className={cx("text")}>{t("home.inProgress.title")}</div>
        <div className={cx("exams")}>
          <div className={cx("exam")}>
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
            <div className={cx("description")}>
              50%(12/24 câu đã hoàn thành)
            </div>
            <ButtonCustomization className={cx("examBtn")}>
              Tiếp tục
            </ButtonCustomization>
          </div>
          <div className={cx("exam")}>
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
            <div className={cx("description")}>
              50%(12/24 câu đã hoàn thành)
            </div>
            <ButtonCustomization className={cx("examBtn")}>
              Tiếp tục
            </ButtonCustomization>
          </div>
        </div>
      </div>
    </div>
  );
};

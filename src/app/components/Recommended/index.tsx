import classNames from "classnames/bind";
import Slider from "@mui/material/Slider";
import { ButtonCustomization } from "../ButtonCustomization";
import { StarBorder } from "@mui/icons-material";

import styles from "./Recommended.module.scss";

const cx = classNames.bind(styles);

export const Recommended = () => {
  return (
    <div className={cx("container")}>
      {/* start list doing */}
      <div className={cx("listDoing")}>
        <div className={cx("text")}>Những bài đang làm</div>
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
      {/* end List doing */}

      {/* Start Propose Document */}
      <div className={cx("proposeDocument")}>
        <div className={cx("documentTitle")}>Được đề xuất</div>
        <div className={cx("documents")}>
          <div className={cx("document")}>
            <StarBorder className={cx("star")} />

            <div className={cx("documentName")}>
              Giáo trình tin học đại cương năm học 2019
            </div>
            <div className={cx("dateTime")}>2:30 25/12/2023</div>
          </div>
          <div className={cx("document")}>
            <StarBorder className={cx("star")} />

            <div className={cx("documentName")}>
              Giáo trình tin học đại cương năm học 2019
            </div>
            <div className={cx("dateTime")}>2:30 25/12/2023</div>
          </div>
          <div className={cx("document")}>
            <StarBorder className={cx("star")} />

            <div className={cx("documentName")}>
              Giáo trình tin học đại cương năm học 2019
            </div>
            <div className={cx("dateTime")}>2:30 25/12/2023</div>
          </div>
        </div>
      </div>
      {/* End Propose Exam */}
    </div>
  );
};

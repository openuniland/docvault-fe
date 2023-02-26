import classNames from "classnames/bind";
import { StarBorder } from "@mui/icons-material";

import styles from "./Recommended.module.scss";

const cx = classNames.bind(styles);

export const Recommended = () => {
  return (
    <div className={cx("container")}>
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

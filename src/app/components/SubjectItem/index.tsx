import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Tooltip, Typography } from "@mui/material";

import styles from "./SubjectItem.module.scss";
import documentIcon from "assets/images/document.png";
import examIcon from "assets/images/exam.png";

const cx = classNames.bind(styles);

interface Props {
  subjectName: string;
  prefix: string;
  subjectId: string;
  isExam?: boolean;
  count?: number;
}

export const SubjectItem = (props: Props) => {
  const { subjectName, prefix, subjectId, isExam = false, count = 0 } = props;
  return (
    <div className={cx("container")}>
      <Tooltip title={subjectName} placement="top">
        <Link to={`/${prefix}/${subjectId}`} className={cx("link")}>
          <div className={cx("contentWrapper")}>
            <img
              src={isExam ? examIcon : documentIcon}
              alt="book icon"
              className={cx("image")}
            />
            <Typography
              className={cx("subjectName")}
              variant="h2"
              component="h2"
            >
              {subjectName}
            </Typography>
          </div>

          <Typography className={cx("subjectName")} component="span">
            ({count})
          </Typography>
        </Link>
      </Tooltip>
    </div>
  );
};

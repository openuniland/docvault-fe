import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Typography } from "@mui/material";
import moment from "moment";

import documentIcon from "assets/images/document.png";
import examIcon from "assets/images/exam.png";
import styles from "./ContentItem.module.scss";

const cx = classNames.bind(styles);

interface Props {
  title: string;
  description: string;
  prefix: string;
  createdAt: string;
  id: string;
  isExam?: boolean;
}

export const ContentItem = (props: Props) => {
  const { title, description, prefix, createdAt, id, isExam = false } = props;

  return (
    <div className={cx("container")}>
      <Link to={`/${prefix}/${id}`} className={cx("link")}>
        <div className={cx("starWrapper")}>
          <StarBorderIcon className={cx("starIcon")} />
        </div>
        <div className={cx("contentWrapper")}>
          <img
            src={isExam ? examIcon : documentIcon}
            alt="book icon"
            className={cx("image")}
          />
          <Typography variant="h2" component="h2" className={cx("title")}>
            {title}
          </Typography>
          <Typography
            variant="caption"
            component="strong"
            className={cx("desc")}
          >
            {description}
          </Typography>
        </div>
        <Typography variant="caption" component="time" className={cx("time")}>
          {`${moment(createdAt).format("hh:mm - DD/MM/YYYY")}`}
        </Typography>
      </Link>
    </div>
  );
};

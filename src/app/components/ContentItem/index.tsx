import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Typography } from "@mui/material";
import moment from "moment";

import bookIcon from "assets/images/book.png";
import styles from "./ContentItem.module.scss";

const cx = classNames.bind(styles);

interface Props {
  title: string;
  description: string;
  createdAt: string;
  id: string;
}

export const ContentItem = (props: Props) => {
  const { title, description, createdAt, id } = props;

  return (
    <div className={cx("container")}>
      <Link to={`/documents/${id}`} className={cx("link")}>
        <div className={cx("starWrapper")}>
          <StarBorderIcon className={cx("starIcon")} />
        </div>
        <div className={cx("contentWrapper")}>
          <img src={bookIcon} alt="book icon" className={cx("image")} />
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

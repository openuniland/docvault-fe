import classNames from "classnames/bind";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";

import styles from "./SubjectItem.module.scss";
import { Typography } from "@mui/material";

const cx = classNames.bind(styles);

interface Props {
  subjectName: string;
  prefix: string;
  subjectId: string;
}

export const SubjectItem = (props: Props) => {
  const { subjectName, prefix, subjectId } = props;
  return (
    <div className={cx("container")}>
      <Link to={`/${prefix}/${subjectId}`} className={cx("link")}>
        <ArticleIcon className={cx("icon")} />
        <Typography className={cx("subjectName")} variant="h2" component="h2">
          {subjectName}
        </Typography>
      </Link>
    </div>
  );
};

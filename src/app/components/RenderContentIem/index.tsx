import { Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./RenderContentIem.module.scss";

const cx = classNames.bind(styles);

interface Props {
  title: string;
  desc?: string;
  image?: string;
  file?: string;
}
export const RenderContentIem = (props: Props) => {
  const { title, desc, image, file } = props;
  return (
    <div className={cx("container")}>
      <Typography className={cx("title")} component="h3">
        {title}
      </Typography>
      <Typography className={cx("desc")} component="p">
        {desc}
      </Typography>
      {image && (
        <div className={cx("imageWrapper")}>
          <img src={image} alt={title} className={cx("image")} />
        </div>
      )}

      <a className={cx("file")} href={file} target="_blank">
        {file}
      </a>
    </div>
  );
};

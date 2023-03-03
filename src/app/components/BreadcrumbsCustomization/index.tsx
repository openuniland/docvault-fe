import classNames from "classnames/bind";
import { Breadcrumbs, Typography } from "@mui/material";

import styles from "./BreadcrumbsCustomization.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

interface BreadcrumbsList {
  text: string;
  linkTo: string;
}

interface Props {
  breadcrumbsList: BreadcrumbsList[];
  current: string;
  className?: string;
}

export const BreadcrumbsCustomization = (props: Props) => {
  const { breadcrumbsList = [], current, className } = props;

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      className={cx("breadcrumb", className)}
    >
      {breadcrumbsList.map(breadcrumbs => (
        <Link
          color="inherit"
          to={breadcrumbs.linkTo}
          className={cx("link")}
          key={breadcrumbs.text}
        >
          {breadcrumbs.text}
        </Link>
      ))}
      <Typography className={cx("text")} color="text.primary">
        {current}
      </Typography>
    </Breadcrumbs>
  );
};

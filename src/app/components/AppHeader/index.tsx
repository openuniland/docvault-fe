import { Grid } from "@mui/material";
import classNames from "classnames/bind";
import { Logo } from "../Logo";

import styles from "./AppHeader.module.scss";

const cx = classNames.bind(styles);

export const AppHeader = () => {
  return (
    <Grid className={cx("container")} container>
      <Grid className={cx("grid-item")} item xs>
        <div className={cx("logoWrapper")}>
          <Logo className={cx("logo")} />
        </div>
      </Grid>
      <Grid className={cx("grid-item")} item xs={6}>
        <div className={cx("searchWrapper")}></div>
      </Grid>
      <Grid className={cx("grid-item")} item xs>
        <div className={cx("actionWrapper")}></div>
      </Grid>
    </Grid>
  );
};

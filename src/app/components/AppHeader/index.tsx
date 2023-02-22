import { Grid } from "@mui/material";
import classNames from "classnames/bind";
import { Logo } from "../Logo";
import { SearchInput } from "../SearchInput";
import { Action } from "../ActionHeader/Action";

import styles from "./AppHeader.module.scss";

const cx = classNames.bind(styles);

export const AppHeader = () => {
  return (
    <Grid className={cx("container")} container spacing={{ xs: 2, md: 3 }}>
      <Grid className={cx("grid-item")} item xs>
        <div className={cx("logoWrapper")}>
          <Logo className={cx("logo")} />
        </div>
      </Grid>
      <Grid className={cx("grid-item")} item xs={6}>
        <div className={cx("searchWrapper")}>
          <SearchInput className={cx("search")} />
        </div>
      </Grid>
      <Grid className={cx("grid-item")} item xs>
        <div className={cx("actionWrapper")}>
          <Action className={cx("action")} />
        </div>
      </Grid>
    </Grid>
  );
};

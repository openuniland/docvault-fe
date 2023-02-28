import { Grid } from "@mui/material";
import classNames from "classnames/bind";
import { Logo } from "../Logo";
import { SearchInput } from "../SearchInput";
import { ActionHeader } from "app/components/ActionHeader";

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
        <div className={cx("searchWrapper")}>
          <SearchInput className={cx("search")} />
        </div>
      </Grid>
      <Grid className={cx("grid-item")} item xs>
        <div className={cx("actionWrapper")}>
          <ActionHeader className={cx("action")} />
        </div>
      </Grid>
    </Grid>
  );
};

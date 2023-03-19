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
      <Grid className={cx("grid-item", "logoWrapper")} item xs>
        <Logo className={cx("logo")} />
      </Grid>
      <Grid className={cx("grid-item", "searchWrapper")} item>
        <SearchInput className={cx("search")} />
      </Grid>
      <Grid className={cx("grid-item", "actionWrapper")} item xs>
        <ActionHeader />
      </Grid>
    </Grid>
  );
};

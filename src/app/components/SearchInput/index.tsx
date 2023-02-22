import classNames from "classnames/bind";
import { ButtonCustomization } from "../ButtonCustomization";
import { Search } from "@mui/icons-material";

import styles from "./SearchInput.module.scss";

const cx = classNames.bind(styles);

interface Props {
  className?: string;
}

export const SearchInput = (props: Props) => {
  const { className } = props;
  return (
    <div className={cx("container", className)}>
      <input className={cx("searchInput")} placeholder="Search here..." />
      <ButtonCustomization className={cx("searchBtn")}>
        <Search />
      </ButtonCustomization>
    </div>
  );
};

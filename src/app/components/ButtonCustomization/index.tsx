import classNames from "classnames/bind";
import { ButtonBase } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Link } from "react-router-dom";

import styles from "./ButtonCustomization.module.scss";

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  page?: string;
  prefix?: string;
  id?: string;
}

export const ButtonCustomization = (props: Props) => {
  const { children, onClick, className, isLoading, page, prefix, id } = props;

  return (
    <Link to={`/${page}/${prefix}/${id}`} className={cx("link")}>
      <ButtonBase onClick={onClick} className={cx("button", className)}>
        {isLoading ? <AutorenewIcon className={cx("loadingIcon")} /> : children}
      </ButtonBase>
    </Link>
  );
};

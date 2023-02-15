import classNames from "classnames/bind";
import { ButtonBase } from "@mui/material";

import styles from "./ButtonCustomization.module.scss";

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ButtonCustomization = (props: Props) => {
  const { children, onClick, className } = props;

  return (
    <ButtonBase onClick={onClick} className={cx("button", className)}>
      {children}
    </ButtonBase>
  );
};

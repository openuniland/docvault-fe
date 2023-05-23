import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import styles from "./Logo.module.scss";
import logoIcon from "assets/images/logo.png";
import { useCallback } from "react";

const cx = classNames.bind(styles);

interface Props {
  className?: string;
  onlyIcon?: boolean;
}

export const Logo = (props: Props) => {
  const { className, onlyIcon = false } = props;
  const navigate = useNavigate();

  const handleNavigateHome = useCallback(() => {
    navigate(`/`);
  }, [navigate]);
  return (
    <div className={cx("container", className)} onClick={handleNavigateHome}>
      <img src={logoIcon} alt="logo" className={cx("icon")} />
      {!onlyIcon && <h3>Revise</h3>}
    </div>
  );
};

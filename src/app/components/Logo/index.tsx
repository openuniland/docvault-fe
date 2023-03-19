import classNames from "classnames/bind";

import styles from "./Logo.module.scss";
import logoIcon from "assets/images/logo.png";

const cx = classNames.bind(styles);

interface Props {
  className?: string;
  onlyIcon?: boolean;
}

export const Logo = (props: Props) => {
  const { className, onlyIcon = false } = props;
  return (
    <div className={cx("container", className)}>
      <img src={logoIcon} alt="logo" className={cx("icon")} />
      {!onlyIcon && <h3>Revise</h3>}
    </div>
  );
};

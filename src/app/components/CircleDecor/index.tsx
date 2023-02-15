import classNames from "classnames/bind";

import styles from "./CircleDecor.module.scss";

const cx = classNames.bind(styles);

interface Props {
  className?: string;
  src?: string;
  alt?: string;
  size?: "small" | "medium" | "large";
}
export const CircleDecor = (props: Props) => {
  const { className, src = "", alt = "decor", size = "medium" } = props;
  return (
    <div className={cx("container", className, size)}>
      <img src={src} alt={alt} />
    </div>
  );
};

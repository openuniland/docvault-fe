import classNames from "classnames/bind";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import styles from "./DocumentForm.module.scss";

const cx = classNames.bind(styles);

export const DocumentForm = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("form")}>
        <Input
          className={cx("bg")}
          color="info"
          placeholder="Tiêu đề tài liệu"
          size="lg"
          variant="outlined"
        />
        <Textarea
          className={cx("bg")}
          color="info"
          minRows={4}
          size="lg"
          placeholder="Mô tả"
        />
        <Select
          className={cx("bg")}
          color="info"
          disabled={false}
          placeholder="Choose one…"
        >
          <Option className={cx("bg")} value="dog">
            Dog
          </Option>
          <Option className={cx("bg")} value="cat">
            Cat
          </Option>
        </Select>
      </div>
    </div>
  );
};

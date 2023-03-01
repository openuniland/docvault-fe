import classNames from "classnames/bind";
import { MenuItem, Select, TextField } from "@mui/material";

import styles from "./DocumentForm.module.scss";
import { schoolYear } from "utils/constants";

const cx = classNames.bind(styles);

export const DocumentForm = () => {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 250,
      },
    },
  };
  return (
    <div className={cx("container")}>
      <div className={cx("form")}>
        <TextField
          className={cx("input")}
          color="primary"
          InputLabelProps={{ shrink: false }}
          placeholder="Tiêu đề tài liệu"
        />
        <TextField
          className={cx("input")}
          color="primary"
          InputLabelProps={{ shrink: false }}
          placeholder="Mô tả"
          multiline
          rows={3}
        />
        <Select
          className={cx("select")}
          MenuProps={MenuProps}
          value={schoolYear[0]}
        >
          <MenuItem disabled value="">
            <em>Năm học</em>
          </MenuItem>
          {schoolYear.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>

        <Select className={cx("select")} MenuProps={MenuProps} value={1}>
          <MenuItem disabled value="">
            <em>Kỳ học</em>
          </MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </Select>

        <div>
          <span>Mon hoc:</span>
          <strong>Mon hoc</strong>
        </div>
      </div>
    </div>
  );
};

import { TextField } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import { ButtonCustomization } from "../ButtonCustomization";

import { DocumentModelContent } from "types/DocumentModel";
import styles from "./DocumentContent.module.scss";

const cx = classNames.bind(styles);

interface Props {
  onGetData: (data: DocumentModelContent) => void;
}

export const DocumentContent = (props: Props) => {
  const { onGetData } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  const handleChangeTitle = useCallback(
    (event: React.SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      setTitle(target.value);
    },
    [title],
  );

  const handleChangeDescription = useCallback(
    (event: React.SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      setDescription(target.value);
    },
    [description],
  );

  const handleChangeImage = useCallback(
    (event: React.SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      setImage(target.value);
    },
    [image],
  );

  const handleChangeFile = useCallback(
    (event: React.SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      setFile(target.value);
    },
    [file],
  );

  const handleEventUp = useCallback(() => {
    onGetData({
      name: title,
      description,
      image,
      file,
    });

    setTitle("");
    setDescription("");
    setImage("");
    setFile("");
  }, [onGetData, title, description, image, file]);
  return (
    <div className={cx("container")}>
      <TextField
        className={cx("formItem")}
        placeholder="Tiêu đề nội dung"
        classes={{ root: cx("input") }}
        InputProps={{
          className: cx("input"),
        }}
        value={title}
        onChange={handleChangeTitle}
      />
      <TextField
        className={cx("formItem")}
        placeholder="Mô tả nội dung"
        classes={{ root: cx("input") }}
        multiline
        rows={5}
        InputProps={{
          className: cx("input"),
        }}
        value={description}
        onChange={handleChangeDescription}
      />
      <TextField
        className={cx("formItem")}
        placeholder="Link ảnh"
        classes={{ root: cx("input") }}
        InputProps={{
          className: cx("input"),
        }}
        value={image}
        onChange={handleChangeImage}
      />
      <TextField
        className={cx("formItem")}
        placeholder="Link file tài liệu"
        classes={{ root: cx("input") }}
        InputProps={{
          className: cx("input"),
        }}
        value={file}
        onChange={handleChangeFile}
      />
      <ButtonCustomization onClick={handleEventUp} className={cx("formItem")}>
        Thêm nội dung
      </ButtonCustomization>
    </div>
  );
};

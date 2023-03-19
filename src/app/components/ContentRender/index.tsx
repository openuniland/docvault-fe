import classNames from "classnames/bind";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { DocumentModelContent } from "types/DocumentModel";
import styles from "./ContentRender.module.scss";
import { useCallback } from "react";

const cx = classNames.bind(styles);

interface Props {
  contents: DocumentModelContent[];
  onDelete: (id: number) => void;
}

export const ContentRender = (props: Props) => {
  const { contents, onDelete } = props;

  const handleDelete = useCallback(
    (index: number) => () => {
      onDelete(index);
    },
    [onDelete],
  );

  if (contents.length === 0) return <></>;

  return (
    <div className={cx("container")}>
      {contents.map((content, index) => {
        return (
          <div key={index} className={cx("contentItem")}>
            <div className={cx("iconWrapper")}>
              <DeleteForeverIcon
                className={cx("deleteIcon")}
                onClick={handleDelete(index)}
              />
            </div>
            <h3 className={cx("title")}>{content.name}</h3>
            <p className={cx("desc")}>{content.description}</p>
            {content.image && (
              <img
                className={cx("image")}
                src={content.image}
                alt={content.name}
              />
            )}

            <a className={cx("file")} href={content.file} target="_blank">
              {content.file}
            </a>
          </div>
        );
      })}
    </div>
  );
};

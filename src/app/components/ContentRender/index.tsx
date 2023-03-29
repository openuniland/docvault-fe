import classNames from "classnames/bind";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, IconButton, Paper } from "@mui/material";

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
    <Box className={cx("container")}>
      {contents.map((content, index) => {
        return (
          <Paper elevation={3} key={index} className={cx("contentItem")}>
            <IconButton
              className={cx("iconWrapper")}
              onClick={handleDelete(index)}
            >
              <DeleteForeverIcon className={cx("deleteIcon")} />
            </IconButton>
            <h3 className={cx("name")}>{content.name}</h3>
            {content.description && (
              <span className={cx("desc")}>{content.description}</span>
            )}
            {content.image && (
              <div className={cx("imgWrapper")}>
                <img
                  className={cx("img")}
                  src={content.image}
                  alt={content.name}
                />
              </div>
            )}

            {content.file && (
              <a className={cx("file")} href={content.file} target="_blank">
                {content.file}
              </a>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

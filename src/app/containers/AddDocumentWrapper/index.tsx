import classNames from "classnames/bind";

import styles from "./AddDocumentWrapper.module.scss";
import { DocumentForm } from "app/components/DocumentForm";
import { useCreateDocument } from "mutations/document";
import { CreateDocumentModelForm } from "types/DocumentModel";
import { useCallback } from "react";
import { enqueueSnackbar } from "notistack";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

export const AddDocumentWrapper = () => {
  const { mutateAsync } = useCreateDocument();

  const handleCreateNewDocument = useCallback(
    (data: CreateDocumentModelForm) => {
      (async () => {
        await mutateAsync({
          title: data.title,
          description: data.description,
          content: data.content,
          is_approved: data.is_approved,
          school_year: data.school_year,
          semester: Number(data.semester),
          subject: data.subject._id as any,
        });
        enqueueSnackbar("New document successfully created!", {
          variant: "success",
        });
      })();
    },
    [],
  );
  return (
    <>
      <Box className={cx("boxHeader")}>
        <Breadcrumbs aria-label="breadcrumb" separator="/" color="white">
          <Link className={cx("link")} to="/documents">
            Documents
          </Link>
          <Typography className={cx("current")}>New Document</Typography>
        </Breadcrumbs>
      </Box>

      <DocumentForm onCreateNewDocument={handleCreateNewDocument} />
    </>
  );
};

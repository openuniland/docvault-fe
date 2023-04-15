import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import classNames from "classnames/bind";

import styles from "./ModalCustomization.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  open: boolean;
  handleAgree?: () => void;
  handleCancel?: () => void;
  timeout?: number;
  title?: string;
  actionDefault?: boolean;
  contentText?: string;
  loading?: boolean;
  textAgreeBtn?: string;
  userExamId?: string;
  colorBtn?:
    | "success"
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "warning";
}

export const ModalCustomization = (props: Props) => {
  const {
    children,
    open,
    handleAgree,
    handleCancel,
    timeout = 500,
    title,
    actionDefault,
    contentText,
    loading,
    textAgreeBtn,
    userExamId,
    colorBtn,
  } = props;
  return (
    <div className={cx("container")}>
      <Dialog
        open={open}
        onClose={handleCancel}
        BackdropProps={{
          timeout,
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

        <DialogContent>
          {contentText && <DialogContentText>{contentText}</DialogContentText>}

          {children}
        </DialogContent>

        {actionDefault && (
          <DialogActions>
            <Button
              size="medium"
              onClick={handleCancel}
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
            {textAgreeBtn && (
              <Link
                to={userExamId ? `/exams/do-exam/${userExamId}` : "/"}
                className={cx("link-btn")}
              >
                <LoadingButton
                  size="medium"
                  onClick={handleAgree}
                  loading={loading}
                  variant="contained"
                  color={colorBtn}
                >
                  {textAgreeBtn}
                </LoadingButton>
              </Link>
            )}
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

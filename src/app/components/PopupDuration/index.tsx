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

import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

import styles from "./PopupDuration.module.scss";

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
}

export const PopupDuration = (props: Props) => {
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
        {title && (
          <DialogTitle id="alert-dialog-title">
            {title} <AccessAlarmIcon />
          </DialogTitle>
        )}

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
            <LoadingButton
              size="medium"
              onClick={handleAgree}
              loading={loading}
              variant="contained"
              color="success"
            >
              Start
            </LoadingButton>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

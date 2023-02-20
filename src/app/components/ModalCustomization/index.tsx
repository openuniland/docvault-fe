import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import classNames from "classnames/bind";
import { ButtonCustomization } from "../ButtonCustomization";

import styles from "./ModalCustomization.module.scss";

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  timeout?: number;
  title?: string;
  actionDefault?: boolean;
}

export const ModalCustomization = (props: Props) => {
  const {
    children,
    open,
    handleClose,
    timeout = 500,
    title,
    actionDefault,
  } = props;
  return (
    <div className={cx("container")}>
      <Dialog
        open={open}
        onClose={handleClose}
        BackdropProps={{
          timeout,
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

        <DialogContent>{children}</DialogContent>

        {actionDefault && (
          <DialogActions>
            <ButtonCustomization onClick={handleClose}>
              Agree
            </ButtonCustomization>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

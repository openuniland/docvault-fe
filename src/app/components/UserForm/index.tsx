import classNames from "classnames/bind";
import { Box, Paper, Typography } from "@mui/material";
import {
  Person,
  Email,
  MilitaryTech,
  Score,
  AccountBox,
  Edit,
} from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { useState, useCallback } from "react";

import styles from "./UserForm.module.scss";
import userIcon from "assets/images/user.png";
import { User } from "types/User";
import { useUpdateUser } from "mutations/user";

const cx = classNames.bind(styles);

interface Props {
  userInfo?: User;
  handelChangeNickname: (data: boolean) => void;
}

export const UserForm = (props: Props) => {
  const { userInfo, handelChangeNickname } = props;
  const [openEdit, setOpenEdit] = useState(false);

  const [valueInput, setValueInput] = useState("");

  const { mutateAsync: mutateAsyncUpdateUser } = useUpdateUser();

  const handleToggleEdit = useCallback(() => {
    setOpenEdit(!openEdit);
  }, [openEdit]);

  const handleUpdateUser = useCallback(async () => {
    try {
      await mutateAsyncUpdateUser({ nickname: valueInput });
      enqueueSnackbar("Cập nhật nickname thành công!", {
        variant: "success",
      });
      handelChangeNickname(true);
      setOpenEdit(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Cập nhật nickname không thành công!", {
        variant: "error",
      });
    }
  }, [valueInput]);
  return (
    <div className={cx("container")}>
      <Paper elevation={2} className={cx("paper")}>
        <Box className={cx("card")}>
          <div className={cx("imgWrapper")}>
            <img
              className={cx("avatar")}
              src={userInfo?.avatar || userIcon}
              alt="avatar"
            />
          </div>
        </Box>
        <Box className={cx("info")}>
          <div className={cx("frameInfo")}>
            <Person className={cx("icon")} />
            <Typography component="p" className={cx("lable")}>
              Full Name :
            </Typography>
            <Typography component="p" className={cx("text")}>
              {userInfo?.fullname}
            </Typography>
          </div>
          <div className={cx("frameInfo")}>
            <Email className={cx("icon")} />
            <Typography component="p" className={cx("lable")}>
              Email :
            </Typography>
            <Typography component="p" className={cx("text")}>
              {userInfo?.email}
            </Typography>
          </div>
          <div className={cx("frameInfo")}>
            <MilitaryTech className={cx("icon")} />
            <Typography component="p" className={cx("lable")}>
              Rank :
            </Typography>
            <Typography component="p" className={cx("text")}>
              {userInfo?.rank}
            </Typography>
          </div>
          <div className={cx("frameInfo")}>
            <Score className={cx("icon")} />
            <Typography component="p" className={cx("lable")}>
              Score:
            </Typography>
            <Typography component="p" className={cx("text")}>
              {userInfo?.dedication_score}
            </Typography>
          </div>
          {!openEdit && (
            <div className={cx("frameInfo")}>
              <AccountBox className={cx("icon")} />
              <Typography component="p" className={cx("lable")}>
                Nick Name:
              </Typography>
              <Typography component="p" className={cx("text")}>
                {userInfo?.nickname}
              </Typography>
              <div className={cx("edit")} onClick={handleToggleEdit}>
                <Edit className={cx("icon", "editIcon")} />
              </div>
            </div>
          )}
          {openEdit && (
            <div className={cx("frameInfo")}>
              <AccountBox className={cx("icon")} />
              <Typography component="p" className={cx("lable")}>
                Nick Name/
              </Typography>
              <input
                className={cx("input")}
                value={valueInput}
                onChange={e => setValueInput(e.target.value)}
              />
              <button className={cx("cancleBtn")} onClick={handleToggleEdit}>
                Hủy
              </button>
              <button
                disabled={true && valueInput.length < 1}
                className={cx("okBtn")}
                onClick={handleUpdateUser}
              >
                Ok
              </button>
            </div>
          )}
        </Box>
      </Paper>
    </div>
  );
};

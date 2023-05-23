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
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import styles from "./UserForm.module.scss";
import userIcon from "assets/images/user.png";
import { useUpdateUser } from "mutations/user";
import { useGetUserInfo } from "queries/user";

const cx = classNames.bind(styles);

export const UserForm = () => {
  const { mutateAsync } = useUpdateUser();
  const { data: userInfo, refetch } = useGetUserInfo();
  const [openEdit, setOpenEdit] = useState(false);
  const [valueInput, setValueInput] = useState(userInfo?.nickname || "");
  const navigate = useNavigate();

  const handleToggleEdit = useCallback(() => {
    setOpenEdit(!openEdit);
  }, [openEdit]);

  const handleUpdateUser = useCallback(async () => {
    try {
      await mutateAsync({ nickname: valueInput });
      refetch();
      setValueInput("");
      handleToggleEdit();
      enqueueSnackbar("Cập nhật nickname thành công!", {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar("Cập nhật nickname không thành công!", {
        variant: "error",
      });
    }
  }, [valueInput]);

  const handleNavigateHome = useCallback(() => {
    navigate(`/`);
  }, [navigate]);
  return (
    <div className={cx("container")}>
      <Paper elevation={3} className={cx("paper")}>
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
                tabIndex={-1}
              />
              <Button
                size="small"
                variant="text"
                sx={{
                  backgroundColor: "var(--edit-btn-cancel)",
                  padding: "8px",
                  margin: "0 7px",
                  color: "var(--text)",
                }}
                onClick={handleToggleEdit}
              >
                Hủy
              </Button>
              <Button
                size="small"
                variant="text"
                sx={{
                  backgroundColor: "var(--edit-btn-ok)",
                  padding: "8px",
                  margin: "0 7px",
                  color: "var(--text)",
                }}
                disabled={true && valueInput.length < 1}
                onClick={handleUpdateUser}
              >
                Ok
              </Button>
            </div>
          )}
          <Button
            sx={{
              backgroundColor: "var(--primary)",
              color: "var(--text)",
              padding: "12px",
              position: "absolute",
              bottom: "18px",
              right: "66px",
            }}
            onClick={handleNavigateHome}
          >
            Trang Chủ
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

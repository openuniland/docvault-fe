import classNames from "classnames/bind";
import { Box, Paper, Switch, Typography } from "@mui/material";
import {
  Person,
  Email,
  MilitaryTech,
  Score,
  AccountBox,
  Edit,
} from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { useState, useCallback, useEffect } from "react";

import styles from "./UserForm.module.scss";
import userIcon from "assets/images/user.png";
import { useUpdateUser } from "mutations/user";
import { useGetUserInfo } from "queries/user";
import { ButtonCustomization } from "../ButtonCustomization";

const cx = classNames.bind(styles);

export const UserForm = () => {
  const { mutateAsync, isLoading } = useUpdateUser();
  const { data: userInfo, refetch } = useGetUserInfo();
  const [openEdit, setOpenEdit] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [isShowInfo, setIsShowInfo] = useState(false);

  useEffect(() => {
    setValueInput(userInfo?.nickname || "");
    setIsShowInfo(userInfo?.is_show_info || false);
  }, [openEdit]);

  const handleToggleEdit = useCallback(() => {
    setOpenEdit(!openEdit);
  }, [openEdit]);

  const handleUpdateUser = useCallback(async () => {
    try {
      await mutateAsync({ nickname: valueInput });
      handleToggleEdit();
      enqueueSnackbar("Cập nhật nickname thành công!", {
        variant: "success",
      });
      await refetch();
    } catch (e) {
      enqueueSnackbar("Cập nhật nickname không thành công!", {
        variant: "error",
      });
    }
  }, [valueInput, refetch]);

  const handleChangeHideUserInfo = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const checked = event.target.checked;
        await mutateAsync({ is_show_info: checked });

        setIsShowInfo(checked);
        enqueueSnackbar("Cập nhật tài khoản thành công!", {
          variant: "success",
        });
        await refetch();
      } catch (e) {
        enqueueSnackbar("Cập nhật tài khoản không thành công!", {
          variant: "error",
        });
      }
    },
    [],
  );

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueInput(e.target.value);
    },
    [valueInput],
  );

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
                onChange={handleChangeInput}
                tabIndex={-1}
              />
              <ButtonCustomization
                className={cx("btn", "cancel")}
                onClick={handleToggleEdit}
              >
                Cancel
              </ButtonCustomization>
              <ButtonCustomization
                className={cx("btn", "update")}
                isLoading={isLoading}
                onClick={handleUpdateUser}
              >
                Update
              </ButtonCustomization>
            </div>
          )}
          <div className={cx("frameInfo")}>
            <Score className={cx("icon")} />
            <Typography component="p" className={cx("lable")}>
              Hiện thông tin:
            </Typography>
            <Switch checked={isShowInfo} onChange={handleChangeHideUserInfo} />
          </div>
        </Box>
      </Paper>
    </div>
  );
};

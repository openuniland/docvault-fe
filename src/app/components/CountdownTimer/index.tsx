import classNames from "classnames/bind";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";

import styles from "./CountdownTimer.module.scss";
import { TimerExam } from "../TimerExam";
import { UserExamResponse } from "types/UserExam";

const cx = classNames.bind(styles);

interface Props {
  userExam?: UserExamResponse;
  done?: number;
  onOpenTimeIsUp?: () => void;
  onSubmitExam?: () => void;
  onExit?: () => void;
  onClickSubmitExam?: () => void;
  isDone?: boolean;
  score?: number;
}

export const ShowCounter = (props: Props) => {
  const {
    userExam,
    done = 0,
    onSubmitExam = () => {},
    onOpenTimeIsUp = () => {},
    onExit = () => {},
    onClickSubmitExam = () => {},
    isDone,
    score,
  } = props;

  return (
    <div className={cx("container")}>
      <div className={cx("wrap--left")}>
        <div className={cx("item")}>
          <Typography className={cx("text")} component="p">
            Đã làm:
          </Typography>
          <Typography className={cx("itemValue", "text")} component="p">
            {done}/{userExam?.questions.length}
          </Typography>
        </div>
        <div className={cx("item")}>
          <Typography className={cx("text")} component="p">
            Thời gian:
          </Typography>
          <Typography className={cx("itemValue", "text")} component="p">
            {userExam?.duration! / 60000} phút
          </Typography>
        </div>
        <div className={cx("item")}>
          <Typography className={cx("text")} component="p">
            Thời gian còn lại:
          </Typography>
          <Typography className={cx("itemValue", "text")} component="p">
            <TimerExam
              userExam={userExam}
              handleOpenTimeIsUp={onOpenTimeIsUp}
              handleSubmitExam={onSubmitExam}
              userExamStatus={isDone}
            />
          </Typography>
        </div>
        {isDone && (
          <div className={cx("item", "score")}>
            <Typography className={cx("text")} component="p">
              Điểm:
            </Typography>
            <Typography className={cx("itemValue", "text")} component="p">
              {score}
            </Typography>
          </div>
        )}
      </div>

      <div className={cx("wrap--right")}>
        {isDone ? (
          <LoadingButton
            onClick={onExit}
            className={cx("exitBtn")}
            variant="contained"
          >
            Thoát
          </LoadingButton>
        ) : (
          <LoadingButton onClick={onClickSubmitExam} variant="contained">
            Nộp bài
          </LoadingButton>
        )}
      </div>
    </div>
  );
};

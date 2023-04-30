import classNames from "classnames/bind";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";

import { ReturnValues, useCountdown } from "hooks/useCountdown";
import styles from "./CountdownTimer.module.scss";

const cx = classNames.bind(styles);

interface ShowCounterProps extends ReturnValues {
  deadline?: number;
  total?: number;
  done?: number;
  onSubmit?: () => void;
  onExit?: () => void;
  isDone?: boolean;
  score?: number;
}

const ShowCounter = (props: ShowCounterProps) => {
  const {
    hours,
    minutes,
    seconds,
    deadline = 0,
    total = 0,
    done = 0,
    onSubmit = () => {},
    onExit = () => {},
    isDone,
    score,
  } = props;

  return (
    <div className={cx("container")}>
      <div className={cx("item")}>
        <Typography className={cx("text")} component="p">
          Đã làm:
        </Typography>
        <Typography className={cx("itemValue", "text")} component="p">
          {done}/{total}
        </Typography>
      </div>
      <div className={cx("item")}>
        <Typography className={cx("text")} component="p">
          Thời gian:
        </Typography>
        <Typography className={cx("itemValue", "text")} component="p">
          {deadline} phút
        </Typography>
      </div>
      <div className={cx("item")}>
        <Typography className={cx("text")} component="p">
          Thời gian còn lại:
        </Typography>
        <Typography className={cx("itemValue", "text")} component="p">
          {hours}:{minutes}:{seconds}
        </Typography>
      </div>
      {isDone && (
        <div className={cx("item")}>
          <Typography className={cx("text")} component="p">
            Điểm:
          </Typography>
          <Typography className={cx("itemValue", "text")} component="p">
            {score}
          </Typography>
        </div>
      )}

      {isDone ? (
        <LoadingButton
          onClick={onExit}
          className={cx("exitBtn")}
          variant="contained"
        >
          Thoát
        </LoadingButton>
      ) : (
        <LoadingButton onClick={onSubmit} variant="contained">
          Nộp bài
        </LoadingButton>
      )}
    </div>
  );
};

interface Props {
  endTime: number | string;
  deadline?: number;
  total?: number;
  done?: number;
  onSubmit?: () => void;
  onExit?: () => void;
  onExpired?: () => void;
  isDone?: boolean;
  score?: number;
}
export const CountdownTimer = (props: Props) => {
  const {
    endTime,
    deadline,
    total,
    done,
    onSubmit,
    onExit,
    onExpired = () => {},
    isDone,
    score,
  } = props;
  const { days, hours, minutes, seconds } = useCountdown(endTime);

  if (days + hours + minutes + seconds <= 0 || isDone) {
    onExpired();

    return (
      <ShowCounter
        isDone={isDone}
        onExit={onExit}
        onSubmit={onSubmit}
        deadline={deadline}
        total={total}
        done={done}
        days={days}
        hours={0}
        minutes={0}
        seconds={0}
        score={score}
      />
    );
  }

  return (
    <ShowCounter
      isDone={isDone}
      onExit={onExit}
      onSubmit={onSubmit}
      deadline={deadline}
      total={total}
      done={done}
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      score={score}
    />
  );
};

import styles from "./TimerExam.module.scss";
import classNames from "classnames/bind";
import { UserExamResponse } from "types/UserExam";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

interface Props {
  userExam?: UserExamResponse;
  handleOpenTimeIsUp?: () => void;
  handleSubmitExam?: () => void;
  userExamStatus?: boolean;
}

export const TimerExam = (props: Props) => {
  const {
    userExam,
    handleOpenTimeIsUp = () => {},
    handleSubmitExam = () => {},
    userExamStatus,
  } = props;

  const [times, setTimes] = useState({
    hours: 0,
    minutes: 0,
    seconds: Math.round(
      (userExam?.duration! -
        (new Date().getTime() - new Date(userExam?.created_at).getTime())) /
        1000,
    ),
  });

  useEffect(() => {
    if (
      userExam?.duration &&
      !isNaN(userExam.duration) &&
      userExam?.created_at
    ) {
      setTimes(time => ({
        ...time,
        seconds: Math.round(
          (userExam.duration -
            (new Date().getTime() - new Date(userExam.created_at).getTime())) /
            1000,
        ),
      }));
    }
  }, [userExam]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes(time => {
        const totalSeconds =
          time.hours * 3600 + time.minutes * 60 + time.seconds - 1;

        if (totalSeconds >= 0 && userExamStatus === false) {
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          return { hours, minutes, seconds };
        }
        clearInterval(interval);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    if (
      times.hours == 0 &&
      times.minutes == 0 &&
      times.seconds == 0 &&
      userExamStatus === false
    ) {
      clearInterval(interval);
      handleOpenTimeIsUp();
      handleSubmitExam();
    }

    return () => {
      clearInterval(interval);
    };
  }, [times, userExamStatus]);

  return (
    <div className={cx("container")}>
      <Typography className={cx("highlight")} component="strong">
        {`${times.hours.toString().padStart(2, "0")}:${times.minutes
          .toString()
          .padStart(2, "0")}:${times.seconds.toString().padStart(2, "0")}`}
      </Typography>
    </div>
  );
};

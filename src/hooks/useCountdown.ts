import { useEffect, useState } from "react";
import moment from "moment";

export type ReturnValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getReturnValues = (countUp: number): ReturnValues => {
  // calculate time left
  const days = Math.floor(countUp / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countUp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countUp % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countUp % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const useCountdown = (targetTime: string | number) => {
  const countDownDate = moment(targetTime).valueOf();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = countDownDate - new Date().getTime();
      if (remainingTime <= 0) {
        clearInterval(interval);
      }

      setCountDown(remainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

export { useCountdown };

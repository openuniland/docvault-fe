import classNames from "classnames/bind";
import { LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";

import { ButtonCustomization } from "../ButtonCustomization";
import styles from "./InProgressItem.module.scss";
import { UserAnswer } from "types/UserAnswer";

const cx = classNames.bind(styles);

interface Props {
  subjectName?: string;
  title?: string;
  totalQuestion?: number;
  userAnswer?: UserAnswer;
}

export const InProgressItem = (props: Props) => {
  const { t } = useTranslation();

  const { subjectName = "", title, totalQuestion = 0, userAnswer } = props;

  const completedQuestion = useMemo(() => {
    return userAnswer?.answers_id?.filter(answer => answer !== "") || [];
  }, [userAnswer]);

  const percentage = useMemo(() => {
    return totalQuestion !== 0
      ? (completedQuestion?.length / totalQuestion) * 100
      : 0;
  }, [totalQuestion, completedQuestion]);

  const handleContinue = useCallback(() => {
    // TODO: handle continue
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("subjectName")}>{subjectName}</div>
      <div className={cx("title")}>{title}</div>
      <LinearProgress variant="determinate" value={percentage} />
      <div className={cx("description")}>
        {t("home.inProgress.desc", {
          percentage,
          completedQuestion: completedQuestion?.length,
          totalQuestion,
        })}
      </div>
      <ButtonCustomization
        className={cx("continueBtn")}
        onClick={handleContinue}
      >
        {t("button.continue")}
      </ButtonCustomization>
    </div>
  );
};

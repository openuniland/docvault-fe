import classNames from "classnames/bind";
import { LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo, useState } from "react";

import { ButtonCustomization } from "../ButtonCustomization";
import styles from "./InProgressItem.module.scss";
import { UserAnswer } from "types/UserAnswer";
import { useNavigate } from "react-router-dom";
import { ModalCustomization } from "../ModalCustomization";

const cx = classNames.bind(styles);

interface Props {
  subjectName?: string;
  title?: string;
  totalQuestion?: number;
  userAnswer?: UserAnswer;
  userExamId?: string;
}

export const InProgressItem = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    subjectName = "",
    title,
    totalQuestion = 0,
    userAnswer,
    userExamId,
  } = props;

  const [openPopup, setOpenPopup] = useState(false);

  const completedQuestion = useMemo(() => {
    return userAnswer?.answers_id?.filter(answer => answer !== "") || [];
  }, [userAnswer]);

  const percentage = useMemo(() => {
    return totalQuestion !== 0
      ? (completedQuestion?.length / totalQuestion) * 100
      : 0;
  }, [totalQuestion, completedQuestion]);

  const handleContinue = useCallback(() => {
    setOpenPopup(true);
  }, [openPopup]);
  const handleClosePopup = useCallback(() => {
    setOpenPopup(false);
  }, [openPopup]);
  const handleSubmitContinue = useCallback(() => {
    navigate(`/exams/do-exam/${userExamId}`);
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
      <ModalCustomization
        open={openPopup}
        handleCancel={handleClosePopup}
        handleAgree={handleSubmitContinue}
        actionDefault
        title="Bạn có chắc chắn muốn làm tiếp bài thi không?"
        textAgreeBtn="Submit"
        colorBtn="success"
      >
        <div></div>
      </ModalCustomization>
    </div>
  );
};

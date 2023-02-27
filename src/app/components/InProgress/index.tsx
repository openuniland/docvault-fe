import classNames from "classnames/bind";
import { useGetUserExams } from "queries/userExam";
import { useTranslation } from "react-i18next";

import { InProgressItem } from "app/components/InProgressItem";
import styles from "./InProgress.module.scss";

const cx = classNames.bind(styles);

export const InProgress = () => {
  const { t } = useTranslation();

  const { data: userExams } = useGetUserExams();

  if (userExams && userExams?.length <= 0) {
    return <></>;
  }

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>{t("home.inProgress.title")}</div>
      <div className={cx("examList")}>
        {userExams?.map(userExam => (
          <InProgressItem
            key={userExam._id}
            subjectName={userExam?.subject?.subject_name}
            title={userExam.title}
            userAnswer={userExam.user_answer_id}
            totalQuestion={userExam.questions.length}
          />
        ))}
      </div>
    </div>
  );
};

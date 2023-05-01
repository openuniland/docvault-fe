import classNames from "classnames/bind";
import { useGetUserExamsInprogress } from "queries/userExam";
import { useTranslation } from "react-i18next";

import { InProgressItem } from "app/components/InProgressItem";
import styles from "./InProgress.module.scss";
import { useEffect } from "react";

const cx = classNames.bind(styles);

export const InProgress = () => {
  const { t } = useTranslation();

  const { data: userExams, refetch } = useGetUserExamsInprogress();

  useEffect(() => {
    refetch();
  }, []);
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
            userAnswer={userExam.user_answers}
            totalQuestion={userExam.questions.length}
            userExamId={userExam._id}
          />
        ))}
      </div>
    </div>
  );
};

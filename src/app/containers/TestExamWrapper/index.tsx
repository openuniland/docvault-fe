import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import http from "utils/api/http";

import styles from "./TestExamWrapper.module.scss";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { useGetQuestionsByExamId } from "queries/question";
import RenderQuestion from "app/components/RenderQuestion";
import { useGetUserExamByOwner } from "queries/userExam";
import { useState, useEffect, useCallback } from "react";
import { QuestionManage } from "app/components/QuestionManage";
import { useUpdateUserAnswer } from "mutations/userAnswer";
import { ModalCustomization } from "app/components/ModalCustomization";
import { useSubmitTheExam } from "mutations/userExam";

const cx = classNames.bind(styles);

export const TestExamWrapper = () => {
  const navigate = useNavigate();

  const { mutateAsync: mutateAsyncUpdateUserAnswer } = useUpdateUserAnswer();

  const { userExamId } = useParams();
  const { data: userExamByOwner } = useGetUserExamByOwner(userExamId as string);

  const examId = userExamByOwner?.original_exam;
  const { data: questionsByExamId } = useGetQuestionsByExamId(examId as string);

  const { mutateAsync: mutateAsyncSubmitTheExam } = useSubmitTheExam();

  const [score, setScore] = useState(-1);
  const [userExamStatus, setUserExamStatus] = useState(false);

  const [arrUserAnswer, setArrUserAnswer] = useState(
    userExamByOwner &&
      userExamByOwner?.user_answers[0] &&
      userExamByOwner.user_answers[0].answers_id.length > 0
      ? userExamByOwner.user_answers[0].answers_id
      : [],
  );

  const [lastUpdatedPosition, setLastUpdatedPosition] = useState<number | null>(
    null,
  );
  const countUserAnswerDone = (arr?: Array<string>) => {
    let count = 0;
    const array = arr ? arr : [];
    for (const element of array) {
      if (element !== "") {
        count++;
      }
    }
    return count;
  };

  const [numberAnswerDone, setNumberAnswerDone] = useState(
    countUserAnswerDone(arrUserAnswer),
  );
  useEffect(() => {
    if (
      userExamByOwner?.user_answers &&
      userExamByOwner.user_answers.length > 0
    ) {
      setArrUserAnswer(userExamByOwner.user_answers[0].answers_id);
      setNumberAnswerDone(
        countUserAnswerDone(userExamByOwner.user_answers[0].answers_id),
      );
    }
    if (userExamByOwner?.is_completed) {
      setScore(userExamByOwner?.score!);
    } else {
      setScore(-1);
    }
    setUserExamStatus(userExamByOwner?.is_completed!);
  }, [userExamByOwner]);
  const [openPopupSubmit, setOpenPopupSubmit] = useState(false);
  const handleClosePopup = useCallback(() => {
    setOpenPopupSubmit(false);
  }, [openPopupSubmit]);

  const handleOpenPopup = useCallback(() => {
    setOpenPopupSubmit(true);
  }, [openPopupSubmit]);

  const changeAnswer = async (position: number, value: string) => {
    try {
      if (arrUserAnswer) {
        arrUserAnswer[position] = value;

        setArrUserAnswer(arrUserAnswer);
      }

      setNumberAnswerDone(countUserAnswerDone(arrUserAnswer));

      setLastUpdatedPosition(position);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const updateAnswerId = arrUserAnswer
      ? arrUserAnswer[lastUpdatedPosition || 0]
      : "";

    if (updateAnswerId !== "") {
      mutateAsyncUpdateUserAnswer({
        RequestUpdateUserAnswer: {
          answer_id: updateAnswerId,
          user_exam_id: userExamByOwner?._id,
          position: lastUpdatedPosition || 0,
        },
        user_answer_id: userExamByOwner?.user_answers[0]._id,
      });
    }
  }, [
    arrUserAnswer,
    lastUpdatedPosition,
    userExamByOwner?.user_answers[0]._id,
    mutateAsyncUpdateUserAnswer,
  ]);

  const handleSubmitExam = async () => {
    try {
      await mutateAsyncSubmitTheExam({
        user_exam_id: userExamId,
      });
      handleClosePopup();

      const response: AxiosResponse = await http.get(
        `/user-exams/${userExamId}`,
      );
      setScore(response.data.data.score);
      setUserExamStatus(response.data.data.is_completed);

      // navigate(`/exam`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleExit = () => {
    navigate(`/exams`);
  };

  return (
    <div className={cx("container")}>
      <BreadcrumbsCustomization
        className={cx("breadcrumbs")}
        current="Làm bài"
        breadcrumbsList={[{ linkTo: "/exams", text: "Các môn học" }]}
      />
      <Typography className={cx("examName")} component="h1">
        {questionsByExamId?.exam?.title}
      </Typography>
      <div className={cx("exam-container")}>
        <div className={cx("exam-wrapper")}>
          <div className={cx("exam-info-wrapper")}>
            <div className={cx("exam-subinfo-wrapper")}>
              <div className={cx("examItem")}>
                <Typography className={cx("nameItem")} component="p">
                  Đã làm:
                </Typography>

                <Typography className={cx("highlight")} component="strong">
                  {numberAnswerDone}/
                </Typography>
                <Typography className={cx("highlight")} component="strong">
                  {questionsByExamId?.questions?.length}
                </Typography>
              </div>

              <div className={cx("examItem")}>
                <Typography className={cx("nameItem")} component="p">
                  Thời gian:
                </Typography>

                <Typography className={cx("highlight")} component="strong">
                  {userExamByOwner?.duration! / 60000}
                </Typography>
                <Typography className={cx("highlightspace")} component="strong">
                  phút
                </Typography>
              </div>
              <div className={cx("examItem")}>
                <Typography className={cx("nameItem")} component="p">
                  Thời gian còn lại:
                </Typography>

                <Typography className={cx("highlight")} component="strong">
                  {userExamByOwner?.duration! / 60000}
                </Typography>
                <Typography className={cx("highlightspace")} component="strong">
                  phút
                </Typography>
              </div>
              {score >= 0 && (
                <div className={cx("examItem")}>
                  <Typography className={cx("nameItem")} component="p">
                    Điểm:
                  </Typography>

                  <Typography className={cx("highlight")} component="strong">
                    {score}
                  </Typography>
                </div>
              )}
            </div>
            <div>
              {userExamStatus === false && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpenPopup}
                  disabled={userExamStatus}
                >
                  Nộp bài
                </Button>
              )}
              {userExamStatus === true && (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleExit}
                >
                  Thoát
                </Button>
              )}
            </div>
          </div>

          <RenderQuestion
            questions={questionsByExamId?.questions}
            showDeleteButton={false}
            handleChange={changeAnswer}
            answersOfUser={arrUserAnswer}
            examStatus={userExamStatus}
          />
        </div>
        <div className={cx("question-manage")}>
          <QuestionManage
            questions={questionsByExamId?.questions}
            doneQuestions={arrUserAnswer}
            author={
              questionsByExamId?.exam.author.fullname ||
              questionsByExamId?.exam.author.nickname
            }
            subject={questionsByExamId?.exam.subject.subject_name}
            school_year={questionsByExamId?.exam.school_year}
          />
        </div>
      </div>
      <ModalCustomization
        open={openPopupSubmit}
        handleCancel={handleClosePopup}
        handleAgree={handleSubmitExam}
        actionDefault
        title="Bạn có chắc chắn muốn nộp bài thi không?"
        contentText="Bạn vẫn còn thời gian"
        textAgreeBtn="Submit"
        colorBtn="success"
      >
        <div></div>
      </ModalCustomization>
    </div>
  );
};

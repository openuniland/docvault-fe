import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import styles from "./TestExamWrapper.module.scss";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import RenderQuestion from "app/components/RenderQuestion";
import { useGetUserExamByOwner } from "queries/userExam";
import { useState, useEffect, useCallback, useRef } from "react";
import { QuestionManage } from "app/components/QuestionManage";
import { useUpdateUserAnswer } from "mutations/userAnswer";
import { ModalCustomization } from "app/components/ModalCustomization";
import { useSubmitTheExam } from "mutations/userExam";
import { TimerExam } from "app/components/TimerExam";
// import { BackEndError } from "types/Error";

const cx = classNames.bind(styles);

export const TestExamWrapper = () => {
  const navigate = useNavigate();

  const { mutateAsync: mutateAsyncUpdateUserAnswer } = useUpdateUserAnswer();

  const { userExamId } = useParams();
  const { data: userExamByOwner } = useGetUserExamByOwner(userExamId as string);
  const questionsByExamId = userExamByOwner?.questions;

  const { mutateAsync: mutateAsyncSubmitTheExam } = useSubmitTheExam();

  const [score, setScore] = useState(-1);
  const [userExamStatus, setUserExamStatus] = useState(
    userExamByOwner?.is_completed,
  );
  const [openPopupSubmit, setOpenPopupSubmit] = useState(false);
  const [openTimeIsUp, setOpenTimeIsUp] = useState(false);
  const [openPopupExamComplete, setOpenPopupExamComplete] = useState(false);

  const questionRefs = useRef(Array);

  const [arrUserAnswer, setArrUserAnswer] = useState(
    userExamByOwner &&
      userExamByOwner?.user_answers[0] &&
      userExamByOwner.user_answers[0].answers_id.length > 0
      ? userExamByOwner.user_answers[0].answers_id
      : [],
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

  const handleClosePopup = useCallback(() => {
    setOpenPopupSubmit(false);
  }, [openPopupSubmit]);

  const handleOpenPopup = useCallback(() => {
    setOpenPopupSubmit(true);
  }, [openPopupSubmit]);

  const handleClosePopupExamComplete = useCallback(() => {
    setOpenPopupExamComplete(false);
  }, [openPopupExamComplete]);

  const handleOpenPopupExamComplete = useCallback(() => {
    setOpenPopupExamComplete(true);
  }, [openPopupExamComplete]);

  const handleSubmitExam = useCallback(async () => {
    try {
      const res = await mutateAsyncSubmitTheExam({
        user_exam_id: userExamId,
      });
      handleClosePopup();

      setScore(res?.score);
      setUserExamStatus(res?.is_completed);
    } catch (error) {}
  }, []);

  const changeAnswer = useCallback(
    async (position: number, value: string) => {
      try {
        if (arrUserAnswer) {
          arrUserAnswer[position] = value;
          setArrUserAnswer(arrUserAnswer);
        }
        setNumberAnswerDone(countUserAnswerDone(arrUserAnswer));
        if (arrUserAnswer[position] !== "") {
          try {
            await mutateAsyncUpdateUserAnswer({
              RequestUpdateUserAnswer: {
                answer_id: arrUserAnswer[position],
                user_exam_id: userExamByOwner?._id,
                position: position,
              },
              user_answer_id: userExamByOwner?.user_answers[0]._id,
            });
          } catch (error: any | unknown) {
            if (error?.errors.errorCode === "USER_EXAM_IS_COMPLETED") {
              handleOpenPopupExamComplete();
              handleSubmitExam();
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [arrUserAnswer],
  );

  const handleCloseTimeIsUp = useCallback(() => {
    setOpenTimeIsUp(false);
  }, [openTimeIsUp]);

  const handleOpenTimeIsUp = useCallback(() => {
    setOpenTimeIsUp(true);
    setUserExamStatus(true);
  }, [openTimeIsUp]);

  const handleExit = useCallback(() => {
    navigate(`/exams`);
  }, []);

  return (
    <div className={cx("container")}>
      <BreadcrumbsCustomization
        className={cx("breadcrumbs")}
        current="Làm bài"
        breadcrumbsList={[{ linkTo: "/exams", text: "Các môn học" }]}
      />
      <Typography className={cx("examName")} component="h1">
        {userExamByOwner?.title}
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
                  {questionsByExamId?.length}
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
                  <TimerExam
                    userExam={userExamByOwner}
                    handleOpenTimeIsUp={handleOpenTimeIsUp}
                    handleSubmitExam={handleSubmitExam}
                    userExamStatus={userExamStatus}
                  />
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
            questions={questionsByExamId}
            showDeleteButton={false}
            handleChange={changeAnswer}
            answersOfUser={arrUserAnswer}
            examStatus={userExamStatus}
            questionsRef={questionRefs}
            examView={false}
          />
        </div>
        <div className={cx("question-manage")}>
          <QuestionManage
            questions={questionsByExamId}
            doneQuestions={arrUserAnswer}
            author={
              userExamByOwner?.author_exam?.fullname ||
              userExamByOwner?.author_exam?.nickname
            }
            subject={userExamByOwner?.subject.subject_name}
            school_year={userExamByOwner?.school_year}
            questionsRef={questionRefs}
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

      {
        <ModalCustomization
          open={openTimeIsUp}
          handleCancel={handleCloseTimeIsUp}
          handleAgree={handleCloseTimeIsUp}
          actionDefault
          title="Bạn đã hết thời gian làm bài"
          contentText="Ấn xác nhận để nhận kết quả"
          textAgreeBtn="Submit"
          colorBtn="success"
        >
          <div></div>
        </ModalCustomization>
      }
      {
        <ModalCustomization
          open={openPopupExamComplete}
          handleCancel={handleClosePopupExamComplete}
          handleAgree={handleClosePopupExamComplete}
          actionDefault
          title="Bạn đã hết thời gian làm bài hoặc bài thi đã được hoàn thành trước đó!"
          contentText="Không thể tiếp tục làm bài"
          textAgreeBtn="OK"
          colorBtn="success"
        >
          <div></div>
        </ModalCustomization>
      }
    </div>
  );
};

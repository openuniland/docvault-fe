import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";

import styles from "./TestExamWrapper.module.scss";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import RenderQuestion from "app/components/RenderQuestion";
import { useGetUserExamByOwner } from "queries/userExam";
import { QuestionManage } from "app/components/QuestionManage";
import { useUpdateUserAnswer } from "mutations/userAnswer";
import { ModalCustomization } from "app/components/ModalCustomization";
import { useSubmitTheExam } from "mutations/userExam";
import { ShowCounter } from "app/components/CountdownTimer";

const cx = classNames.bind(styles);

export const TestExamWrapper = () => {
  const navigate = useNavigate();
  const { userExamId } = useParams();

  const { mutateAsync: mutateAsyncUpdateUserAnswer } = useUpdateUserAnswer();
  const { mutateAsync: mutateAsyncSubmitTheExam, isLoading: isLoadingSubmit } =
    useSubmitTheExam();

  const { data: userExamByOwner, refetch: refetchGetUserExamByOwner } =
    useGetUserExamByOwner(userExamId as string);

  const questionsByExamId = useMemo(() => {
    return userExamByOwner?.questions;
  }, [userExamByOwner?.questions?.length]);

  const [score, setScore] = useState(0);
  const [userExamStatus, setUserExamStatus] = useState(false);
  const [answersList, setAnswersList] = useState<string[]>([]);
  const [openPopupSubmit, setOpenPopupSubmit] = useState(false);
  const [openTimeIsUp, setOpenTimeIsUp] = useState(false);
  const [numberOfAnswers, setNumberOfAnswers] = useState(0);

  const questionRefs = useRef(Array);

  const countUserAnswerDone = useCallback((arr: string[]) => {
    const count = arr.filter(x => x === "").length;
    return count;
  }, []);

  const totalOfAnswers = useMemo(() => {
    return userExamByOwner?.user_answers?.answers_id.length || 0;
  }, [userExamByOwner?.user_answers?.answers_id.length]);

  useEffect(() => {
    if (
      userExamByOwner?.user_answers &&
      userExamByOwner?.user_answers?.answers_id?.length > 0
    ) {
      setAnswersList(userExamByOwner.user_answers?.answers_id);

      const count = countUserAnswerDone(
        userExamByOwner.user_answers?.answers_id,
      );

      setNumberOfAnswers(totalOfAnswers - count);
      setUserExamStatus(userExamByOwner?.is_completed);
      setScore(userExamByOwner?.score);
    }
  }, [userExamByOwner?.user_answers, totalOfAnswers]);

  const handleClosePopup = useCallback(() => {
    setOpenPopupSubmit(false);
  }, [openPopupSubmit]);

  const handleOpenPopup = useCallback(() => {
    setOpenPopupSubmit(true);
  }, [openPopupSubmit]);

  const handleCloseTimeIsUp = useCallback(() => {
    setOpenTimeIsUp(false);
  }, [openTimeIsUp]);

  const handleOpenTimeIsUp = useCallback(() => {
    setOpenTimeIsUp(true);
    setUserExamStatus(true);
  }, [openTimeIsUp]);

  const handleSubmitExam = useCallback(async () => {
    try {
      const res = await mutateAsyncSubmitTheExam({
        user_exam_id: userExamId,
      });
      handleClosePopup();
      refetchGetUserExamByOwner();

      setScore(res?.score);
      setUserExamStatus(res?.is_completed);
    } catch (error) {}
  }, []);

  const changeAnswer = useCallback(
    async (position: number, value: string) => {
      try {
        answersList[position] = value;

        if (answersList[position] !== "") {
          await mutateAsyncUpdateUserAnswer({
            RequestUpdateUserAnswer: {
              answer_id: answersList[position],
              user_exam_id: userExamByOwner?._id,
              position: position,
            },
            user_answer_id: userExamByOwner?.user_answers?._id,
          });

          const count = countUserAnswerDone(answersList);

          setNumberOfAnswers(totalOfAnswers - count);
        }
      } catch (error: any) {
        console.log(error);
        if (
          error?.errors?.errorCode === "USER_EXAM_IS_COMPLETED" ||
          error?.errors?.errorCode === "TIME_IS_UP"
        ) {
          handleOpenTimeIsUp();
        }
      }
    },
    [answersList],
  );

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
          <ShowCounter
            userExam={userExamByOwner}
            done={numberOfAnswers}
            onExit={handleExit}
            isDone={userExamStatus}
            score={score}
            onSubmitExam={handleSubmitExam}
            onClickSubmitExam={handleOpenPopup}
            onOpenTimeIsUp={handleOpenTimeIsUp}
          />

          <RenderQuestion
            questions={questionsByExamId}
            showDeleteButton={false}
            handleChange={changeAnswer}
            answersOfUser={answersList}
            examStatus={userExamStatus}
            questionsRef={questionRefs}
            examView={false}
          />
        </div>
        <div className={cx("question-manage")}>
          <QuestionManage
            questions={questionsByExamId}
            doneQuestions={answersList}
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
        open={openTimeIsUp}
        handleCancel={handleCloseTimeIsUp}
        handleAgree={handleCloseTimeIsUp}
        actionDefault
        title="Bạn đã hoàn thành bài thi!"
        contentText="Ấn xác nhận để xem kết quả"
        textAgreeBtn="Submit"
        colorBtn="success"
      />

      <ModalCustomization
        open={openPopupSubmit}
        handleCancel={handleClosePopup}
        handleAgree={handleSubmitExam}
        actionDefault
        title="Bạn có chắc chắn muốn nộp bài thi không?"
        contentText="Bạn vẫn còn thời gian"
        textAgreeBtn="Submit"
        colorBtn="success"
        loading={isLoadingSubmit}
      />
    </div>
  );
};

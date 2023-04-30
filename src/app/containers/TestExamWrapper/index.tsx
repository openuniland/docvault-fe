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
import { CountdownTimer } from "app/components/CountdownTimer";

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

  const endTime = useMemo(() => {
    return (
      new Date(userExamByOwner?.created_at).getTime() +
      new Date(userExamByOwner?.duration as number).getTime()
    );
  }, [userExamByOwner?.created_at, userExamByOwner?.duration]);

  const [score, setScore] = useState(0);
  const [userExamStatus, setUserExamStatus] = useState(false);
  const [answersList, setAnswersList] = useState<string[]>([]);
  const [openPopupSubmit, setOpenPopupSubmit] = useState(false);
  const [numberOfAnswers, setNumberOfAnswers] = useState(0);
  const [popupContent, setPopupContent] = useState({
    title: "Bạn có chắc chắn muốn nộp bài thi không?",
    contentText: "Bạn vẫn còn thời gian",
    textAgreeBtn: "Submit",
  });
  const [expired, setExpired] = useState(false);

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

  const handleNoticeIsCompleted = useCallback(() => {
    setPopupContent({
      title: "Bạn đã hoàn thành bài thi",
      contentText: "Bạn không thể thay đổi câu trả lời, chỉ có thể xem.",
      textAgreeBtn: "OK",
    });
    handleOpenPopup();
  }, []);

  const handleSubmitExam = useCallback(async () => {
    try {
      const res = await mutateAsyncSubmitTheExam({
        user_exam_id: userExamId,
      });
      handleClosePopup();
      refetchGetUserExamByOwner();

      setScore(res.score);
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
          handleNoticeIsCompleted();
        }
      }
    },
    [answersList],
  );

  const handleExit = useCallback(() => {
    navigate(`/exams`);
  }, []);

  const deadline = useMemo(() => {
    return userExamByOwner?.duration! / 60000;
  }, [userExamByOwner?.duration]);

  const handleExpired = useCallback(() => {
    setExpired(true);
  }, [expired]);

  useEffect(() => {
    if (expired && !userExamByOwner?.is_completed) {
      handleNoticeIsCompleted();
    }
  }, [expired, userExamByOwner?.is_completed]);

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
          <CountdownTimer
            endTime={endTime}
            deadline={deadline}
            done={numberOfAnswers}
            total={questionsByExamId?.length}
            isDone={userExamStatus}
            onExpired={handleExpired}
            onExit={handleExit}
            onSubmit={handleOpenPopup}
            score={score}
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
        open={openPopupSubmit}
        handleCancel={handleClosePopup}
        handleAgree={handleSubmitExam}
        actionDefault
        title={popupContent.title}
        contentText={popupContent.contentText}
        textAgreeBtn={popupContent.textAgreeBtn}
        colorBtn="success"
        loading={isLoadingSubmit}
      />
    </div>
  );
};

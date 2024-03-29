import classNames from "classnames/bind";
import {
  Paper,
  TextField,
  FormControl,
  Autocomplete,
  Button,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Controller, useForm } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";

import styles from "./TestForm.module.scss";
import {
  CreateExamModelForm,
  RequestUpdateExamModelFormPayload,
  ExamModel,
} from "types/ExamModel";
import { Answer } from "types/Answer";
import { NewQuestionPayload } from "types/Question";
import { useGetAllSubjects } from "queries/subject";
import {
  useCreateNewQuestion,
  useDeleteAQuestionById,
} from "mutations/question";
import RenderQuestion from "../RenderQuestion";
import { ModalCustomization } from "../ModalCustomization";

const cx = classNames.bind(styles);

const newExamSchema = Yup.object().shape({
  title: Yup.string().trim().required("Tiêu đề không được bỏ trống"),
  subject: Yup.object().required("Môn học không được bỏ trống"),
  semester: Yup.number().required("Kì học không được bỏ trống"),
  school_year: Yup.string().trim().required("Năm học không được bỏ trống"),
});

const newQuestionSchema = Yup.object().shape({
  content: Yup.string().trim().required("Câu hỏi không được để trống"),
  accuracy: Yup.string().trim().required("Độ chính xác không được để trống"),
});
interface Props {
  exam?: ExamModel;
  onSubmit: (data: RequestUpdateExamModelFormPayload) => void;
  onRefetch?: () => void;
}

export const TestForm = (props: Props) => {
  const { exam, onSubmit, onRefetch = () => {} } = props;
  const [questions, setQuestions] = useState<NewQuestionPayload[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [questionId, setQuestionId] = useState("");

  const { mutateAsync } = useCreateNewQuestion();
  const { mutateAsync: mutateAsyncDeleteQuestion } = useDeleteAQuestionById();
  const { data: subjects = [], isLoading: isLoadingSubject } =
    useGetAllSubjects();

  const {
    handleSubmit,
    control: controlExam,
    formState: { errors },
    reset: resetExam,
  } = useForm<CreateExamModelForm>({
    resolver: yupResolver(newExamSchema),
    defaultValues: {
      semester: undefined,
      subject: undefined,
      is_approved: false,
      is_draft: true,
    },
  });

  const {
    handleSubmit: handleSubmitQuestion,
    control: controlQuestion,
    formState: { errors: errorsQuestion },
    setValue: setValueQuestion,
    getValues: getValuesQuestion,
    reset: resetQuestion,
    trigger: triggerQuestion,
  } = useForm<NewQuestionPayload>({
    resolver: yupResolver(newQuestionSchema),
    defaultValues: {
      accuracy: undefined,
      answers: [],
      new_answers: "",
    },
  });

  const handleChangeData = useCallback(
    (data: CreateExamModelForm) => {
      onSubmit({
        requestUpdateExamPayload: data,
        examId: exam?._id as string,
      });
      resetExam();
      setQuestions([]);
    },
    [resetExam, exam?._id],
  );

  const handleChangeQuestion = useCallback(
    async (data: NewQuestionPayload) => {
      try {
        if (!correctAnswer) {
          enqueueSnackbar("Vui lòng chọn đáp án đúng!", {
            variant: "warning",
          });
          return;
        }
        const { _id } = await mutateAsync({ ...data, exam_id: exam?._id });
        setQuestions(prev => [
          ...prev,
          {
            ...data,
            _id: _id,
          },
        ]);
        resetQuestion();
        setAnswers([]);
        setCorrectAnswer("");

        enqueueSnackbar("Tạo câu hỏi thành công!", {
          variant: "success",
        });
      } catch (error: any) {
        enqueueSnackbar(`${error?.message}`, {
          variant: "error",
        });
        console.log(error);
      }
    },
    [exam?._id, correctAnswer, triggerQuestion, questions],
  );

  const handleAddAnswer = useCallback(() => {
    if (getValuesQuestion("new_answers") === "") {
      enqueueSnackbar("Không được để đáp án trống!", {
        variant: "warning",
      });
      return;
    }
    const a = {
      content: getValuesQuestion("new_answers") as string,
      status: false,
      id: uuidv4(),
    };

    setAnswers(prev => [...prev, a]);
    setValueQuestion("answers", [...answers, a]);
    setValueQuestion("new_answers", "");
  }, [answers]);

  const handleDeleteAnswer = useCallback(
    (id: string) => {
      if (id === correctAnswer) {
        setCorrectAnswer("");
      }

      const newArrayAnswers = answers.filter(item => item.id !== id);

      setAnswers(newArrayAnswers);
      setValueQuestion("answers", newArrayAnswers);
    },
    [answers, correctAnswer],
  );

  const handleChooseCorrectAnswer = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCorrectAnswer(event.target.value);
      const ca = answers.find((item: any) => item.id === event.target.value);
      setValueQuestion("correct_answer", ca);
    },
    [correctAnswer, setValueQuestion, answers],
  );

  useEffect(() => {
    if (exam?.questions) {
      setQuestions(exam.questions);
    }
  }, [exam?.questions?.length]);

  const handleClosePopup = useCallback(() => {
    setOpenPopup(false);
  }, [openPopup]);

  const handleOpenPopup = useCallback(
    (qId: string) => {
      setQuestionId(qId);
      setOpenPopup(true);
    },
    [openPopup],
  );

  const handleDeleteQuestion = useCallback(async () => {
    try {
      await mutateAsyncDeleteQuestion(questionId);
      setQuestions(prev => prev.filter(item => item?._id !== questionId));
      enqueueSnackbar("Xóa câu hỏi thành công!", {
        variant: "success",
      });
      onRefetch();
      setOpenPopup(false);
    } catch (error) {
      console.log(error);
    }
  }, [questionId, openPopup]);

  return (
    <div className={cx("container")}>
      <Box className={cx("formWrapper")}>
        <Paper className={cx("paperWrapper")} elevation={3}>
          <form
            onSubmit={handleSubmit(handleChangeData)}
            className={cx("form")}
          >
            <FormControl className={cx("formItem", "firstFormItem")}>
              <Controller
                name="title"
                control={controlExam}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tiêu đề"
                    variant="outlined"
                    error={!!errors.title}
                    helperText={errors.title ? errors.title?.message : ""}
                    fullWidth
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("formItem")}>
              <Controller
                name="description"
                defaultValue=""
                control={controlExam}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mô tả"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("formItem")}>
              <Controller
                control={controlExam}
                name="subject"
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    placeholder="Subject"
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    options={subjects}
                    loading={isLoadingSubject}
                    getOptionLabel={option => option.subject_name}
                    value={value || null}
                    sx={{ width: 300 }}
                    disablePortal
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Môn học"
                        error={!!errors.subject}
                        helperText={
                          errors.subject ? errors.subject?.message : ""
                        }
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("formItem")}>
              <Controller
                control={controlExam}
                name="semester"
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    placeholder="Semester"
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    value={value || null}
                    options={["1", "2", "3"]}
                    sx={{ width: 300 }}
                    disablePortal
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Kỳ học"
                        error={!!errors.semester}
                        helperText={
                          errors.semester ? errors.semester?.message : ""
                        }
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("formItem")}>
              <Controller
                name="school_year"
                control={controlExam}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Năm học (ví dụ 2020-2021)"
                    variant="outlined"
                    error={!!errors.school_year}
                    helperText={
                      errors.school_year ? errors.school_year?.message : ""
                    }
                    fullWidth
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("formItem")}>
              <Button
                variant="contained"
                type="submit"
                className={cx("submit")}
              >
                Tạo bài kiểm tra
              </Button>
            </FormControl>
          </form>
        </Paper>
        <Paper elevation={3} className={cx("subFormWrapper")}>
          <form
            onSubmit={handleSubmitQuestion(handleChangeQuestion)}
            className={cx("form")}
          >
            <FormControl className={cx("subFormItem")}>
              <Controller
                name="content"
                control={controlQuestion}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Câu hỏi"
                    variant="outlined"
                    error={!!errorsQuestion.content}
                    helperText={
                      errorsQuestion.content
                        ? errorsQuestion.content?.message
                        : ""
                    }
                    fullWidth
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("subFormItem")}>
              <Controller
                name="image"
                control={controlQuestion}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Link ảnh"
                    variant="outlined"
                    error={!!errorsQuestion.image}
                    helperText={
                      errorsQuestion.image ? errorsQuestion.image?.message : ""
                    }
                    fullWidth
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("subFormItem")}>
              <Controller
                control={controlQuestion}
                name="accuracy"
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    placeholder="Accuracy"
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    value={value || null}
                    options={["high", "medium", "low"]}
                    sx={{ width: 300 }}
                    disablePortal
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Độ chính xác"
                        error={!!errorsQuestion.accuracy}
                        helperText={
                          errorsQuestion.accuracy
                            ? errorsQuestion.accuracy?.message
                            : ""
                        }
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl className={cx("subFormItem", "subFormItemAnswer")}>
              <Controller
                name="new_answers"
                control={controlQuestion}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Đáp án..."
                    variant="outlined"
                    error={!!errorsQuestion.new_answers}
                    helperText={
                      errorsQuestion.new_answers
                        ? errorsQuestion.new_answers?.message
                        : ""
                    }
                    fullWidth
                  />
                )}
              />
              <AddCircleIcon
                onClick={handleAddAnswer}
                className={cx("addAnswerIcon")}
              />
            </FormControl>
            <RadioGroup
              value={correctAnswer}
              onChange={handleChooseCorrectAnswer}
            >
              {answers.map(answer => (
                <div key={answer?.id}>
                  <FormControlLabel
                    value={answer.id}
                    control={<Radio />}
                    label={answer?.content}
                  />
                  <IconButton
                    className={cx("iconDeleteWrapper")}
                    onClick={() => handleDeleteAnswer(answer.id)}
                  >
                    <HighlightOffIcon className={cx("deleteIcon")} />
                  </IconButton>
                </div>
              ))}
            </RadioGroup>
            <FormControl className={cx("subFormItem")}>
              <Button
                className={cx("btnSubmitSubForm")}
                variant="contained"
                type="submit"
              >
                Tạo câu hỏi
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Box>
      <Box className={cx("render")}>
        <RenderQuestion
          questions={questions}
          showDeleteButton
          examView
          isShowCorrectAnswer={true}
          onDelete={handleOpenPopup}
        />
      </Box>

      <ModalCustomization
        open={openPopup}
        handleCancel={handleClosePopup}
        handleAgree={handleDeleteQuestion}
        actionDefault
        title="Bạn có chắc chắn muốn xóa câu hỏi này không?"
        textAgreeBtn="Delete"
        colorBtn="success"
      />
    </div>
  );
};

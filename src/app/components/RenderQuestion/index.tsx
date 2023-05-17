import {
  Box,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import classNames from "classnames/bind";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { memo, useCallback } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import styles from "./RenderQuestion.module.scss";
import { NewQuestionPayload } from "types/Question";

const cx = classNames.bind(styles);

interface Props {
  questions?: NewQuestionPayload[];
  onDelete?: (index: string) => void;
  showDeleteButton: boolean;
  handleChange?: (position: number, value: string) => void;
  answersOfUser?: string[];
  examStatus?: boolean;
  questionsRef?: any;
  examView?: boolean;
  isShowCorrectAnswer?: boolean;
}
const RenderQuestion = (props: Props) => {
  const {
    questions = [],
    onDelete = () => {},
    showDeleteButton = true,
    handleChange = () => {},
    answersOfUser = [],
    examStatus,
    questionsRef,
    examView = false,
    isShowCorrectAnswer,
  } = props;

  const handleDelete = useCallback(
    (index: string) => () => {
      onDelete(index);
    },
    [onDelete],
  );

  const handleChangeAnswer = useCallback(
    (index: number) => (event: any) => {
      if (handleChange) {
        return handleChange(index, event?.target.value);
      }

      return undefined;
    },
    [handleChange],
  );

  return (
    <Box className={cx("container")}>
      {questions?.length > 0 &&
        questions.map((item, index) => (
          <Paper
            ref={questionsRef ? el => (questionsRef.current[index] = el) : null}
            elevation={3}
            key={item?._id}
            className={cx("question")}
          >
            <div className={cx("itemHeader")}>
              <IconButton className={cx("index")}>{index + 1}</IconButton>
              <div className={cx("itemHeaderAction")}>
                <div className={cx("accuracyWrapper")}>
                  <p className={cx("accuracyText")}>Độ chính xác</p>
                  <CheckCircleIcon
                    className={cx({
                      high: item.accuracy === "high",
                      medium: item.accuracy === "medium",
                      low: item.accuracy === "low",
                    })}
                  />
                </div>
                {showDeleteButton && (
                  <IconButton
                    className={cx("iconDeleteWrapper")}
                    onClick={handleDelete(item?._id)}
                  >
                    <HighlightOffIcon className={cx("deleteIcon")} />
                  </IconButton>
                )}
              </div>
            </div>

            {(answersOfUser?.length > 0 || examView) && (
              <FormControl>
                <FormLabel>
                  <h3 className={cx("title")}>{item.content}</h3>
                  {item.image && (
                    <div className={cx("imgWrapper")}>
                      <img src={item.image} alt="error img" />
                    </div>
                  )}
                </FormLabel>

                <RadioGroup
                  defaultValue={
                    isShowCorrectAnswer
                      ? item.correct_answer?.id
                      : answersOfUser
                      ? answersOfUser[index]
                      : ""
                  }
                  onChange={handleChangeAnswer(index)}
                >
                  {item.answers?.map(answer => (
                    <FormControlLabel
                      key={answer?.id}
                      value={answer.id}
                      control={<Radio />}
                      label={answer?.content}
                      disabled={examStatus || examView}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          </Paper>
        ))}
    </Box>
  );
};

export default memo(RenderQuestion);

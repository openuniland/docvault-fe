import styles from "./QuestionManage.module.scss";
import { NewQuestionPayload } from "types/Question";
import classNames from "classnames/bind";
import { Typography } from "@mui/material";

const cx = classNames.bind(styles);

interface Props {
  questions?: NewQuestionPayload[];
  doneQuestions?: string[];
  author?: string;
  subject?: string;
  school_year?: string;
  questionsRef?: any;
}
export const QuestionManage = (props: Props) => {
  const {
    questions = [],
    doneQuestions = [],
    author,
    subject,
    school_year,
    // questionsRef = [],
  } = props;

  return (
    <div className={cx("container")}>
      <div className={cx("question-position-wrapper")}>
        {questions &&
          questions?.map((item, index) => (
            <div
              key={index}
              className={cx(
                doneQuestions[index]
                  ? "position-done-question"
                  : "position-question",
              )}
              // onClick={() => {
              //   questionsRef.current[index].scrollIntoView({
              //     behavior: "smooth",
              //   });
              // }}
            >
              {index + 1}
            </div>
          ))}
      </div>
      <div className={cx("exam-info-wrapper")}>
        <div className={cx("examItem")}>
          <Typography className={cx("nameItem")} component="p">
            Môn học:
          </Typography>

          <Typography className={cx("highlight")} component="strong">
            {subject}
          </Typography>
        </div>

        <div className={cx("examItem")}>
          <Typography className={cx("nameItem")} component="p">
            Tác giả:
          </Typography>

          <Typography className={cx("highlight")} component="strong">
            {author}
          </Typography>
        </div>
        <div className={cx("examItem")}>
          <Typography className={cx("nameItem")} component="p">
            Năm học:
          </Typography>

          <Typography className={cx("highlight")} component="strong">
            {school_year}
          </Typography>
        </div>
      </div>
    </div>
  );
};

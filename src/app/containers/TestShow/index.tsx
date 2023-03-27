import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { Tooltip, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import styles from "./TestShow.module.scss";
import { useGetExamById } from "queries/exam";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { ButtonCustomization } from "app/components/ButtonCustomization";

const cx = classNames.bind(styles);

export const TestShow = () => {
  const { examId } = useParams();
  const { data: exam } = useGetExamById(examId as string);

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <BreadcrumbsCustomization
          current={exam?.subject?.subject_name}
          breadcrumbsList={[{ linkTo: "/exams", text: "Exams" }]}
        />

        <Tooltip title="Báo cáo nếu có thông tin sai!">
          <HelpOutlineIcon className={cx("helpIcon")} />
        </Tooltip>
      </div>

      <Typography className={cx("title")} component="h1">
        {exam?.title}
      </Typography>
      <Typography className={cx("description")} component="p">
        {exam?.description}
      </Typography>

      <div className={cx("content")}>
        <Typography className={cx("titleContent")} component="h2">
          Nội dung bài test
        </Typography>
        <div className={cx("descWrapper")}>
          <Typography className={cx("titleName")} component="p">
            Bài kiểm tra có
          </Typography>
          <Typography className={cx("highlight")} component="strong">
            {exam?.questions?.length}
          </Typography>
          <Typography className={cx("titleName")} component="p">
            câu hỏi
          </Typography>
        </div>
        <Typography className={cx("attention")} component="p">
          Nếu trong bài kiểm tra này bạn có phát hiện câu hỏi hoặc đáp án nào
          sai xin hãy thông báo lại cho nhóm phát triển để sửa lỗi nhanh nhất có
          thể,thông báo bằng cách nhấn vào biểu tượng dấu ? bên trên.Xin cảm ơn
        </Typography>
        <div className={cx("descWrapper")}>
          <Typography className={cx("titleName")} component="p">
            Tác giả đăng:
          </Typography>
          <Typography className={cx("highlight")} component="strong">
            {exam?.author?.fullname || exam?.author?.nickname}
          </Typography>
        </div>
      </div>

      <div className={cx("examBtn")}>
        <ButtonCustomization className={cx("btn")}>
          Xem bài kiểm tra
        </ButtonCustomization>
        <ButtonCustomization className={cx("btn")}>Thi thử</ButtonCustomization>
      </div>
    </div>
  );
};

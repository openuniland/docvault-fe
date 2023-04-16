import classNames from "classnames/bind";
import { Tooltip, Typography, TextField } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./TestShow.module.scss";
import { useGetExamById } from "queries/exam";
import { BreadcrumbsCustomization } from "app/components/BreadcrumbsCustomization";
import { ButtonCustomization } from "app/components/ButtonCustomization";
import { useCreateUserExam } from "mutations/userExam";
import { ModalCustomization } from "app/components/ModalCustomization";
import { RankingDenied } from "app/components/RankingDenied";

const cx = classNames.bind(styles);

export const TestShow = () => {
  const { examId } = useParams();
  const { data: exam } = useGetExamById(examId as string);

  const [openPropup, setOpenPropup] = useState(false);
  const [examDuration, setExamDuration] = useState<string>("0");
  const [durationError, setDurationError] = useState<string>("");

  const { mutateAsync, isLoading } = useCreateUserExam();

  const handleClosePopup = useCallback(() => {
    setOpenPropup(false);
    setExamDuration("0");
    setDurationError("");
  }, [openPropup]);

  const handleOpenPopup = useCallback(() => {
    setOpenPropup(true);
  }, [openPropup]);

  const handleChangeExamDuration = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setExamDuration(e.target.value);
      if (durationError !== "") {
        setDurationError("");
      }
    },
    [examDuration, durationError],
  );

  const handleCreateUserExam = useCallback(async () => {
    try {
      if (Number(examDuration) <= 0) {
        setDurationError("Thời gian làm bài cần lớn hơn 0 !!!");
        return;
      }
      await mutateAsync({
        duration: Number(examDuration) * 60000,
        exam_id: exam?._id!,
      });
      setExamDuration("0");
      handleClosePopup();
      setDurationError("");
    } catch (error) {
      setDurationError("Có lỗi xảy ra vui lòng liên hệ bộ phận phát triển");
    }
  }, [examDuration, durationError]);

  if (exam?.notice) {
    return <RankingDenied notice={exam?.notice} />;
  }

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
      {!exam?.is_approved && (
        <div className={cx("notification")}>
          <Typography className={cx("notiText")} component="p">
            Đang chờ phê duyệt
          </Typography>
        </div>
      )}
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
        <Link to={`/exams/view/${examId}`} className={cx("link")}>
          <ButtonCustomization className={cx("btn")}>
            Xem bài kiểm tra
          </ButtonCustomization>
        </Link>
        {exam?.is_approved && (
          <ButtonCustomization className={cx("btn")} onClick={handleOpenPopup}>
            Thi thử
          </ButtonCustomization>
        )}
      </div>

      <ModalCustomization
        open={openPropup}
        handleCancel={handleClosePopup}
        handleAgree={handleCreateUserExam}
        actionDefault
        title="Chuẩn bị trước khi ôn tập"
        contentText="Cài đặt thời gian hợp lý cho đề và cũng như thời gian mình có"
        loading={isLoading}
        textAgreeBtn="Start"
        colorBtn="success"
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Thời gian (phút)"
          type="number"
          variant="standard"
          fullWidth
          color="success"
          onChange={handleChangeExamDuration}
          value={examDuration}
          error={!!durationError}
          helperText={durationError}
        />
      </ModalCustomization>
    </div>
  );
};

import classNames from "classnames/bind";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCallback, useState } from "react";
import { TextField, Typography, LinearProgress } from "@mui/material";

import styles from "./SubjectWrapper.module.scss";
import { useGetAllSubjects } from "queries/subject";
import { SubjectItem } from "app/components/SubjectItem";
import { ModalCustomization } from "app/components/ModalCustomization";
import { useCreateSubject } from "mutations/subject";
import { ButtonCustomization } from "app/components/ButtonCustomization";

const cx = classNames.bind(styles);

interface Props {
  prefix: string;
  title: string;
}

export const SubjectWrapper = (props: Props) => {
  const { prefix, title } = props;

  const [openPropup, setOpenPropup] = useState(false);
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectError, setSubjectError] = useState<string>("");

  const {
    data: subjects,
    refetch,
    isFetching: isLoadingGetAllSubjects,
    isLoading: isLoadingGetSubjects,
  } = useGetAllSubjects();
  const { mutateAsync, isLoading } = useCreateSubject();

  const handleClosePropup = useCallback(() => {
    setOpenPropup(false);
  }, [openPropup]);

  const handleOpenPropup = useCallback(() => {
    setOpenPropup(true);
  }, [openPropup]);

  const handleChangeSubjectName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubjectName(e.target.value);
      if (subjectError !== "") {
        setSubjectError("");
      }
    },
    [subjectName],
  );

  const handleCreateSubject = useCallback(async () => {
    try {
      if (subjectName === "") {
        setSubjectError("Không được để trống!");
        return;
      }

      await mutateAsync({ subject_name: subjectName });

      setSubjectName("");
      handleClosePropup();
      setSubjectError("");
    } catch (error: any) {
      if (error?.errors?.errorCode === 11000) {
        setSubjectError("Môn học đã tồn tại!");
      }
    }
  }, [subjectName]);

  const handleRefreshSubject = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={cx("container")}>
      {isLoadingGetSubjects && <LinearProgress />}
      <div className={cx("header")}>
        <Typography className={cx("title")} variant="h4" component="h4">
          {title}
        </Typography>

        <div>
          <AddCircleIcon className={cx("icon")} onClick={handleOpenPropup} />
          <ButtonCustomization
            isLoading={isLoadingGetAllSubjects}
            className={cx("btn")}
            onClick={handleRefreshSubject}
          >
            Làm mới
          </ButtonCustomization>
        </div>
      </div>

      <div className={cx("subjectsList")}>
        {subjects?.map(subject => (
          <SubjectItem
            prefix={prefix}
            subjectId={subject._id}
            key={subject._id}
            subjectName={subject.subject_name}
            isExam={prefix === "exams/subject"}
          />
        ))}
      </div>

      <ModalCustomization
        open={openPropup}
        handleAgree={handleCreateSubject}
        handleCancel={handleClosePropup}
        actionDefault
        title="Tạo môn học"
        contentText="Tạo một môn học mới, và môn học đó chưa tồn tại!"
        loading={isLoading}
        textAgreeBtn="Agree"
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Tên môn học"
          type="text"
          fullWidth
          variant="standard"
          value={subjectName}
          onChange={handleChangeSubjectName}
          error={!!subjectError}
          helperText={subjectError}
        />
      </ModalCustomization>
    </div>
  );
};

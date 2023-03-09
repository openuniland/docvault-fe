import { Alert, Autocomplete, Snackbar, TextField } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";

import { DocumentModelContent } from "types/DocumentModel";
import { useGetAllSubjects } from "queries/subject";
import { ContentRender } from "../ContentRender";
import { DocumentContent } from "../DocumentContent";

import styles from "./DocumentForm.module.scss";
import { Box } from "@mui/system";
import { Subject } from "types/Subject";
import { ButtonCustomization } from "../ButtonCustomization";
import { useCreateDocument } from "mutations/document";

const cx = classNames.bind(styles);

export const DocumentForm = () => {
  const [contents, setContents] = useState<DocumentModelContent[]>([]);
  const [subjectId, setSubjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [semester, setSemester] = useState("");
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const { data: subjects = [], isLoading } = useGetAllSubjects();

  const { mutateAsync, isLoading: isLoadingCreateDoc } = useCreateDocument();

  const handleGetData = (data: DocumentModelContent) => {
    setContents([...contents, data]);
  };

  const handleDeleteData = useCallback(
    (index: number) => {
      const newContents = [...contents];
      newContents.splice(index, 1);
      setContents(newContents);
    },
    [contents],
  );

  const handleSelectSubject = useCallback(
    (_event: any, value: any) => {
      const subject = value as Subject;
      setSubjectId(subject._id);
    },
    [subjectId],
  );

  const handleChangeTitle = useCallback(
    (event: React.SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      setTitle(target.value);
    },
    [title],
  );

  const handleChangeDescription = useCallback(
    (event: React.SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      setDescription(target.value);
    },
    [description],
  );

  const handleChangeSchoolYear = useCallback(
    (event: React.SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      setSchoolYear(target.value);
    },
    [schoolYear],
  );

  const handleSelectSemester = useCallback(
    (_event: any, value: any) => {
      setSemester(value as string);
    },
    [subjectId],
  );

  const handleCloseSnackbar = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setIsSubmittedSuccessfully(false);
    },
    [isSubmittedSuccessfully],
  );

  const handleOpenSnackbar = useCallback(() => {
    setIsSubmittedSuccessfully(true);
  }, [isSubmittedSuccessfully]);

  const handleSubmit = useCallback(async () => {
    if (!subjectId || !title || !schoolYear || !semester) return;

    await mutateAsync({
      title,
      description,
      school_year: schoolYear,
      semester: Number(semester),
      subject: subjectId,
      content: contents,
    });

    setContents([]);
    setTitle("");
    setDescription("");
    setSchoolYear("");

    handleOpenSnackbar();
  }, [
    subjectId,
    contents,
    title,
    description,
    schoolYear,
    semester,
    handleOpenSnackbar,
  ]);

  return (
    <div className={cx("container")}>
      <div className={cx("form")}>
        <TextField
          className={cx("formItem")}
          placeholder="Tiêu đề tài liệu"
          classes={{ root: cx("input") }}
          value={title}
          onChange={handleChangeTitle}
        />
        <TextField
          className={cx("formItem")}
          placeholder="Mô tả"
          classes={{ root: cx("input") }}
          multiline
          rows={5}
          value={description}
          onChange={handleChangeDescription}
        />
        <TextField
          className={cx("formItem")}
          placeholder="Năm học (vd: 2019-2020)"
          classes={{ root: cx("input") }}
          value={schoolYear}
          onChange={handleChangeSchoolYear}
        />
        <Autocomplete
          className={cx("resetColor", "formItem")}
          classes={{
            root: cx("autocomplete"),
            inputRoot: cx("hasClearIcon"),
          }}
          options={["1", "2", "3"].map(option => option)}
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Kỳ học"
              classes={{ root: cx("input") }}
            />
          )}
          onChange={handleSelectSemester}
        />
        <Autocomplete
          className={cx("resetColor", "formItem")}
          classes={{
            root: cx("autocomplete"),
            inputRoot: cx("hasClearIcon"),
          }}
          loading={isLoading}
          options={subjects}
          getOptionLabel={option => option.subject_name}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.subject_name}
            </Box>
          )}
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Môn học"
              classes={{ root: cx("input") }}
            />
          )}
          onChange={handleSelectSubject}
        />
      </div>

      <ContentRender contents={contents} onDelete={handleDeleteData} />
      <DocumentContent onGetData={handleGetData} />

      <ButtonCustomization
        isLoading={isLoadingCreateDoc}
        className={cx("submit")}
        onClick={handleSubmit}
      >
        Lưu tài liệu
      </ButtonCustomization>

      <Snackbar
        open={isSubmittedSuccessfully}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

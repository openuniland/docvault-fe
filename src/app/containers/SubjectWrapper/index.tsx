import classNames from "classnames/bind";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import styles from "./SubjectWrapper.module.scss";
import { Typography } from "@mui/material";
import { useGetAllSubjects } from "queries/subject";
import { SubjectItem } from "app/components/SubjectItem";

const cx = classNames.bind(styles);

interface Props {
  prefix: string;
  title: string;
}
export const SubjectWrapper = (props: Props) => {
  const { prefix, title } = props;

  const { data: subjects } = useGetAllSubjects();

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <Typography className={cx("title")} variant="h4" component="h4">
          {title}
        </Typography>

        <AddCircleIcon className={cx("icon")} />
      </div>

      <div className={cx("subjectsList")}>
        {subjects?.map(subject => (
          <SubjectItem
            prefix={prefix}
            subjectId={subject._id}
            key={subject._id}
            subjectName={subject.subject_name}
          />
        ))}
      </div>
    </div>
  );
};

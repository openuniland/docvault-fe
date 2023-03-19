import { SubjectWrapper } from "app/containers/SubjectWrapper";
import { Helmet } from "react-helmet-async";

export const TestPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Exams</title>
      </Helmet>
      <SubjectWrapper prefix="exams/subject" title="Các môn học(kiểm tra)" />
    </>
  );
};

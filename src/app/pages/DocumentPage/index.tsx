import { SubjectWrapper } from "app/containers/SubjectWrapper";
import { Helmet } from "react-helmet-async";

export const DocumentPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Documents</title>
      </Helmet>
      <SubjectWrapper
        prefix="documents/subject"
        title="Các môn học(tài liệu)"
      />
    </>
  );
};

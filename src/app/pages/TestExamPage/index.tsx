import { Helmet } from "react-helmet-async";
import { TestExamWrapper } from "app/containers/TestExamWrapper";

export const TestExamPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Exams</title>
      </Helmet>
      <TestExamWrapper />
    </>
  );
};

import { Helmet } from "react-helmet-async";
import { TestViewWrapper } from "app/containers/TestViewWrapper";

export const TestViewPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Exams</title>
      </Helmet>
      <TestViewWrapper />
    </>
  );
};

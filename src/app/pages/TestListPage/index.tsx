import { Helmet } from "react-helmet-async";
import { TestControl } from "app/containers/TestControl";

export const TestListPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Exams</title>
      </Helmet>
      <TestControl />
    </>
  );
};

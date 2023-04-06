import { Helmet } from "react-helmet-async";
import { TestShow } from "app/containers/TestShow";
export const TestDetailPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Exams</title>
      </Helmet>
      <TestShow />
    </>
  );
};

import { Helmet } from "react-helmet-async";
import { AddTestWrapper } from "app/containers/AddTestWrapper";

export const AddTestPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Exams</title>
      </Helmet>
      <AddTestWrapper />
    </>
  );
};

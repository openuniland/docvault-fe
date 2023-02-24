import { Helmet } from "react-helmet-async";

import { TestPageContent } from "app/containers/TestPageContent";

export const TestPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Home</title>
      </Helmet>

      <TestPageContent />
    </>
  );
};

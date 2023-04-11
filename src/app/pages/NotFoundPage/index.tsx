import { NotFound } from "app/containers/NotFound";
import { Helmet } from "react-helmet-async";

export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | 404</title>
      </Helmet>
      <NotFound />
    </>
  );
};

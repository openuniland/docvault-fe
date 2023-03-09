import { DocumentShow } from "app/containers/DocumentShow";
import { Helmet } from "react-helmet-async";

export const DocumentDetailPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Documents</title>
      </Helmet>
      <DocumentShow />
    </>
  );
};

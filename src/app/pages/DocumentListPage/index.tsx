import { DocumentControl } from "app/containers/DocumentControl";
import { Helmet } from "react-helmet-async";

export const DocumentListPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Documents</title>
      </Helmet>
      <DocumentControl />
    </>
  );
};

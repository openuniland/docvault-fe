import { AddDocumentWrapper } from "app/containers/AddDocumentWrapper";
import { Helmet } from "react-helmet-async";

export const AddDocumentPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Documents</title>
      </Helmet>
      <AddDocumentWrapper />
    </>
  );
};

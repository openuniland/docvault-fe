import { Helmet } from "react-helmet-async";
import { EditUserWrapper } from "app/containers/EditUserWrapper";

export const EditUserPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | User</title>
      </Helmet>
      <EditUserWrapper />
    </>
  );
};

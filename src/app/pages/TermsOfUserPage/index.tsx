import { Helmet } from "react-helmet-async";
import { TermsOfUserPageWrapper } from "app/containers/TermsOfUserPageWrapper";

export const TermsOfUsersPage = () => {
  return (
    <>
      <Helmet>
        <title>Điều khoản người dùng</title>
      </Helmet>
      <TermsOfUserPageWrapper />
    </>
  );
};

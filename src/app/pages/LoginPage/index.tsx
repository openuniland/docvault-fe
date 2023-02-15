import { Helmet } from "react-helmet-async";

import { LoginWrapper } from "app/containers/LoginWrapper";

export const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Login</title>
      </Helmet>
      <LoginWrapper />
    </>
  );
};

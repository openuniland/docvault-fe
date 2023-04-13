import { Helmet } from "react-helmet-async";
import { ProfilePageWrapper } from "app/containers/ProfilePageWrapper";

export const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Login</title>
      </Helmet>
      <ProfilePageWrapper />
    </>
  );
};

import { Helmet } from "react-helmet-async";
import { PrivacyPageWrapper } from "app/containers/PrivacyPageWrapper";

export const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Chính sách quyền riêng tư</title>
      </Helmet>
      <PrivacyPageWrapper />
    </>
  );
};

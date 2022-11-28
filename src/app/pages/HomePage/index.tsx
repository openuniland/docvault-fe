import { GoogleLoginBtn } from 'app/containers/GoogleLoginBtn';
import { Helmet } from 'react-helmet-async';

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Revise</title>
      </Helmet>
      <div>
        <GoogleLoginBtn />
      </div>
    </>
  );
};

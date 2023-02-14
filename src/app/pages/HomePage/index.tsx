import { Helmet } from 'react-helmet-async';

import { Banner } from 'app/components/Banner';
import { Recommended } from 'app/components/Recommended';

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Revise | Home</title>
      </Helmet>
      <div>
        <Banner />
        <Recommended />
      </div>
    </>
  );
};

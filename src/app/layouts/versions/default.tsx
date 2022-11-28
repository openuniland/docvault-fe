import { HomePage } from 'app/pages/HomePage';
import { Route, Routes } from 'react-router-dom';

const Pages = {
  Home: HomePage,
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
    </Routes>
  );
};

export default Layout;

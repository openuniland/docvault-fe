import { HomePage } from "app/pages/HomePage";
import { LoginPage } from "app/pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import { withAppHeader, withSidebar } from "app/layouts/hocs";

const Pages = {
  Home: withAppHeader(withSidebar(HomePage)),
  Login: LoginPage,
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/login" element={<Pages.Login />} />
    </Routes>
  );
};

export default Layout;

import { HomePage } from "app/pages/HomePage";
import { LoginPage } from "app/pages/LoginPage";
import { TestPage } from "app/pages/TestPage";
import { Route, Routes } from "react-router-dom";
import { withAppHeader, withSidebar } from "app/layouts/hocs";

const Pages = {
  Home: withAppHeader(withSidebar(HomePage)),
  Login: LoginPage,
  Test: withAppHeader(withSidebar(TestPage)),
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/login" element={<Pages.Login />} />
      <Route path="/test" element={<Pages.Test />} />
    </Routes>
  );
};

export default Layout;

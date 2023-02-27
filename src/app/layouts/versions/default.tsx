import { Route, Routes } from "react-router-dom";

import { HomePage } from "app/pages/HomePage";
import { LoginPage } from "app/pages/LoginPage";
import { withAppHeader, withSidebar } from "app/layouts/hocs";
import { DocumentPage } from "app/pages/DocumentPage";

const Pages = {
  Home: withAppHeader(withSidebar(HomePage)),
  Login: LoginPage,
  Document: withAppHeader(withSidebar(DocumentPage)),
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/login" element={<Pages.Login />} />
      <Route path="/documents" element={<Pages.Document />} />
    </Routes>
  );
};

export default Layout;

import { Route, Routes } from "react-router-dom";

import { Guards } from "app/pages/Guards";
import { withAppHeader, withSidebar } from "../hocs";
import { DocumentPage } from "app/pages/DocumentPage";

const Pages = {
  Guards: Guards,
  Document: withAppHeader(withSidebar(DocumentPage)),
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Guards />} />
      <Route path="/documents" element={<Pages.Document />} />
    </Routes>
  );
};

export default Layout;

import { Route, Routes } from "react-router-dom";

import { Guards } from "app/pages/Guards";
import { withAppHeader, withSidebar } from "../hocs";
import { DocumentPage } from "app/pages/DocumentPage";
import { DocumentListPage } from "app/pages/DocumentListPage";
import { DocumentDetailPage } from "app/pages/DocumentDetailPage";

const Pages = {
  Guards: Guards,
  Document: withAppHeader(withSidebar(DocumentPage)),
  DocumentList: withAppHeader(withSidebar(DocumentListPage)),
  DocumentDetailPage: withAppHeader(withSidebar(DocumentDetailPage)),
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Guards />} />
      <Route path="/documents" element={<Pages.Document />} />
      <Route path="/documents/:id" element={<Pages.DocumentDetailPage />} />
      <Route
        path="/documents/subject/:subjectId"
        element={<Pages.DocumentList />}
      />
    </Routes>
  );
};

export default Layout;

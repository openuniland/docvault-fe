import { Route, Routes } from "react-router-dom";

import { Guards } from "app/pages/Guards";
import { withAppHeader, withSidebar } from "../hocs";
import { DocumentPage } from "app/pages/DocumentPage";
import { DocumentListPage } from "app/pages/DocumentListPage";
import { DocumentDetailPage } from "app/pages/DocumentDetailPage";
import { AddDocumentPage } from "app/pages/AddDocumentPage";

const Pages = {
  Guards: Guards,
  Document: withAppHeader(withSidebar(DocumentPage)),
  DocumentList: withAppHeader(withSidebar(DocumentListPage)),
  DocumentDetailPage: withAppHeader(withSidebar(DocumentDetailPage)),
  AddDocumentPage: withAppHeader(withSidebar(AddDocumentPage)),
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
      <Route path="/documents/new" element={<Pages.AddDocumentPage />} />
    </Routes>
  );
};

export default Layout;

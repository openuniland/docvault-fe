import { Route, Routes } from "react-router-dom";

import { Guards } from "app/pages/Guards";
import { withAppHeader, withSidebar } from "../hocs";
import { DocumentPage } from "app/pages/DocumentPage";
import { DocumentListPage } from "app/pages/DocumentListPage";
import { DocumentDetailPage } from "app/pages/DocumentDetailPage";
import { AddDocumentPage } from "app/pages/AddDocumentPage";
import { TestPage } from "app/pages/TestPage";
import { TestListPage } from "app/pages/TestListPage";

const Pages = {
  Guards: Guards,
  Document: withAppHeader(withSidebar(DocumentPage)),
  DocumentList: withAppHeader(withSidebar(DocumentListPage)),
  DocumentDetailPage: withAppHeader(withSidebar(DocumentDetailPage)),
  AddDocumentPage: withAppHeader(withSidebar(AddDocumentPage)),
  Test: withAppHeader(withSidebar(TestPage)),
  TestList: withAppHeader(withSidebar(TestListPage)),
};

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Guards />} />
      <Route path="/documents" element={<Pages.Document />} />
      <Route
        path="/documents/:documentId"
        element={<Pages.DocumentDetailPage />}
      />
      <Route
        path="/documents/subject/:subjectId"
        element={<Pages.DocumentList />}
      />
      <Route path="/documents/new" element={<Pages.AddDocumentPage />} />
      <Route path="/exams" element={<Pages.Test />} />
      <Route path="/exams/subject/:subjectId" element={<Pages.TestList />} />
    </Routes>
  );
};

export default Layout;

import { Route, Routes } from "react-router-dom";

import { Guards } from "app/pages/Guards";
import { withAppHeader, withSidebar } from "../hocs";
import { DocumentPage } from "app/pages/DocumentPage";
import { DocumentListPage } from "app/pages/DocumentListPage";
import { DocumentDetailPage } from "app/pages/DocumentDetailPage";
import { AddDocumentPage } from "app/pages/AddDocumentPage";
import { TestPage } from "app/pages/TestPage";
import { TestListPage } from "app/pages/TestListPage";
import { TestDetailPage } from "app/pages/TestDetailPage";
import { AddTestPage } from "app/pages/AddTestPage";
import { TestViewPage } from "app/pages/TestViewPage";
import { ProfilePage } from "app/pages/ProfilePage";
import { NotFoundPage } from "app/pages/NotFoundPage";
import { TestExamPage } from "app/pages/TestExamPage";
import { PrivacyPage } from "app/pages/PrivacyPage";
import { TermsOfUsersPage } from "app/pages/TermsOfUserPage";
import { EditUserPage } from "app/pages/EditUserPage/EditUserPage";

const Pages = {
  Guards: Guards,
  Document: withAppHeader(withSidebar(DocumentPage)),
  DocumentList: withAppHeader(withSidebar(DocumentListPage)),
  DocumentDetailPage: withAppHeader(withSidebar(DocumentDetailPage)),
  AddDocumentPage: withAppHeader(withSidebar(AddDocumentPage)),
  Test: withAppHeader(withSidebar(TestPage)),
  TestList: withAppHeader(withSidebar(TestListPage)),
  TestPageDetail: withAppHeader(withSidebar(TestDetailPage)),
  AddTestPage: withAppHeader(withSidebar(AddTestPage)),
  TestViewPage: withAppHeader(withSidebar(TestViewPage)),
  ProfilePage: withAppHeader(withSidebar(ProfilePage)),
  NotFoundPage: withAppHeader(withSidebar(NotFoundPage)),
  TestExamPage: withAppHeader(withSidebar(TestExamPage)),
  PrivacyPage: PrivacyPage,
  TermsOfUsersPage: TermsOfUsersPage,
  EditUserPage: withAppHeader(EditUserPage),
};

const Layout = () => {
  return (
    <Routes>
      <Route path="*" element={<Pages.NotFoundPage />} />
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
      <Route path="/exams/:examId" element={<Pages.TestPageDetail />} />
      <Route path="/exams/new" element={<Pages.AddTestPage />} />
      <Route path="/exams/view/:examId" element={<Pages.TestViewPage />} />
      <Route path="/profile" element={<Pages.ProfilePage />} />
      <Route
        path="/exams/do-exam/:userExamId"
        element={<Pages.TestExamPage />}
      />
      <Route path="/privacy-policy" element={<Pages.PrivacyPage />} />
      <Route path="/terms-of-user" element={<Pages.TermsOfUsersPage />} />
      <Route path="/user" element={<Pages.EditUserPage />} />
    </Routes>
  );
};

export default Layout;

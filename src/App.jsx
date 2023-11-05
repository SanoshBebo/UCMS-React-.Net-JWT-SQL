import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "tailwindcss/tailwind.css";
import StudentHome from "./pages/student/StudentHome";
import ProfessorHome from "./pages/professor/ProfessorHome";
import AdminHome from "./pages/admin/AdminHome";
import Login from "./pages/login-register/Login";
import CoursePage from "./pages/admin/CoursePage";
import SubjectPage from "./pages/admin/SubjectPage";
import VenuePage from "./pages/admin/VenuePage";
import CourseDetails from "./pages/admin/CourseDetails";
import SemeserDetails from "./pages/admin/SemeserDetails";
import AssignProfessors from "./pages/admin/AssignProfessors";
import AssignLecture from "./pages/professor/AssignLecture";
import ViewLecture from "./pages/professor/ViewLecture";
import LecturesView from "./pages/student/LecturesView";
import AdminLayout from "./components/AdminLayout";
import ProfessorLayout from "./components/ProfessorLayout";
import StudentLayout from "./components/StudentLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-page"
          element={
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminLayout>
              <CoursePage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/subjects"
          element={
            <AdminLayout>
              <SubjectPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/venues"
          element={
            <AdminLayout>
              <VenuePage />{" "}
            </AdminLayout>
          }
        />
        <Route
          path="/admin/course/:id"
          element={
            <AdminLayout>
              <CourseDetails />{" "}
            </AdminLayout>
          }
        />
        <Route
          path="/admin/semester/:id"
          element={
            <AdminLayout>
              <SemeserDetails />{" "}
            </AdminLayout>
          }
        />
        <Route
          path="/admin/:id/:subjectid"
          element={
            <AdminLayout>
              <AssignProfessors />{" "}
            </AdminLayout>
          }
        />
        <Route
          path="/professor-page"
          element={
            <ProfessorLayout>
              <ProfessorHome />
            </ProfessorLayout>
          }
        />
        <Route
          path="/professor/assignlecture/:SubjectId/:SemesterId/:UserId"
          element={
            <ProfessorLayout>
              <AssignLecture />
            </ProfessorLayout>
          }
        />
        <Route
          path="/professor/viewlecture/:SubjectId/:SemesterId/:UserId"
          element={
            <ProfessorLayout>
              <ViewLecture />
            </ProfessorLayout>
          }
        />
        <Route
          path="/student-page"
          element={
            <StudentLayout>
              <StudentHome />
            </StudentLayout>
          }
        />
        <Route
          path="/student/viewlectures/:UserId/:SubjectId/:SemesterId"
          element={
            <StudentLayout>
              <LecturesView />
            </StudentLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentHome from "./pages/student/StudentHome";
import ProfessorHome from "./pages/professor/ProfessorHome";
import AdminHome from "./pages/admin/AdminHome";
import Login from "./pages/login-register/Login";
import CoursePage from "./pages/admin/CoursePage";
import SubjectPage from "./pages/admin/SubjectPage";
import VenuePage from "./pages/admin/VenuePage";
import CourseDetails from "./pages/admin/CourseDetails";
import SemeserDetails from "./pages/admin/SemeserDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-page" element={<AdminHome />} />
        <Route path="/admin/courses" element={<CoursePage />} />
        <Route path="/admin/subjects" element={<SubjectPage />} />
        <Route path="/admin/venues" element={<VenuePage />} />
        <Route path="/admin/course/:id" element={<CourseDetails />} />
        <Route path="/admin/semester/:id" element={<SemeserDetails />} />
        <Route path="/professor-page" element={<ProfessorHome />} />
        <Route path="/student-page" element={<StudentHome />} />
      </Routes>
    </Router>
  );
}

export default App;

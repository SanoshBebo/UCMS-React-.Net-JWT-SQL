import React, { useEffect, useState } from "react";
import { GetCompleteStudentInfo, RegisterCourse } from "../../api/Student";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "../../redux/userSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const StudentHome = () => {
  const user = useSelector((state) => state.user.user);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [assignedSubjectsProf, setAssignedSubjectsProf] = useState([]);
  const [course, setCourse] = useState([]);
  const [semester, setSemester] = useState([]);
  const [subject, setSubject] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (courseId) => {
    console.log(user.UserId);
    console.log(courseId);

    RegisterCourse(courseId, user.UserId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (user.UserId && user.Role === "student") {
      GetCompleteStudentInfo(user.UserId)
        .then((response) => {
          console.log(response);
          if (response.HasRegisteredCourse == false) {
            setAvailableCourses(response.AvailableCourses);
          } else {
            setCourse(response.Course);
            setSemester(response.Semester);
            setSubject(response.Subjects);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!user.UserId) {
      dispatch(loadUserFromStorage);
    }
  }, [user.UserId, dispatch]);

  return (
    <div className="container mx-auto p-6">
      {availableCourses.length > 0 ? (
        <ul className="space-y-4">
          {availableCourses.map((course, index) => (
            <li
              key={index}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <p className="text-xl font-semibold">{course.CourseName}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleRegister(course.CourseId);
                }}
              >
                Register
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold text-blue-800">
            Registered Course: {course.CourseName}
          </h2>
          <p className="text-xl text-gray-600">
            Semester: {semester.SemesterName}
          </p>
          <h5 className="text-2xl font-semibold mt-6 text-blue-800">
            Subjects
          </h5>
          <ul className="space-y-4">
            {subject.map((subject, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <p className="text-lg font-semibold">{subject.SubjectName}</p>
                <Link
                  to={`/student/viewlectures/${user.UserId}/${subject.SubjectId}/${semester.SemesterId}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Lecture
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentHome;

import React, { useEffect, useState } from "react";
import { GetCompleteStudentInfo, RegisterCourse } from "../../api/Student";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "../../redux/userSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const StudentHome = () => {
  const user = useSelector((state) => state.user.user);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [semester, setSemester] = useState([]);
  const [subject, setSubject] = useState([]);
  const [courseStatus, setCourseStatus] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (courseId) => {
    RegisterCourse(courseId, user.UserId)
      .then((res) => {
        console.log(res);
        setTimeout(() => {}, 3000);
        setRefresh(!refresh);
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
          if (response.message == "Course has not started") {
            console.log("oh my god Course has not started");
            setCourseStatus("Not Started");
            setCourse(response.data);
            setDataLoaded(true);
          } else if (response.message == "Course Ended") {
            setCourseStatus("Ended");
            setCourse(response.data);
            setDataLoaded(true);
          } else if (response.HasRegisteredCourse == false) {
            setCourseStatus("Started");
            setAvailableCourses(response.AvailableCourses);
            setDataLoaded(true);
          } else {
            setCourseStatus("Started");

            setCourse(response.Course);
            setSemester(response.Semester);
            setSubject(response.Subjects);
            setDataLoaded(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate("/login");
    }
  }, [refresh, courseStatus]);

  useEffect(() => {
    if (!user.UserId) {
      dispatch(loadUserFromStorage);
    }
  }, [user.UserId, dispatch]);

  return (
    <div className="container mx-auto p-6">
      {dataLoaded ? (
        courseStatus == "Started" ? (
          availableCourses.length > 0 ? (
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
              <p className="text-xl text-gray-600">{semester.SemesterName}</p>
              <h5 className="text-2xl font-semibold mt-6 text-blue-800">
                Subjects
              </h5>
              <ul className="space-y-4">
                {subject.length > 0 ? (
                  subject.map((subject, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border p-4 rounded-lg"
                    >
                      <p className="text-lg font-semibold">
                        {subject.SubjectName}
                      </p>
                      <Link
                        to={`/student/viewlectures/${user.UserId}/${subject.SubjectId}/${semester.SemesterId}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        View Lecture
                      </Link>
                    </li>
                  ))
                ) : (
                  <div>
                    <p className="text-xl text-gray-600 py-5">
                      Subjects have not been assigned as of now, Please try
                      again later!
                    </p>
                  </div>
                )}
              </ul>
            </div>
          )
        ) : courseStatus == "Ended" ? (
          <div className="flex-row items-center justify-center text-center h-full">
            <h2 className="text-3xl font-semibold text-blue-800">
               Course: {course.CourseName} 
            </h2>
            <h1 className="text-xl py-5">Course Ended on {course.Batch} {parseInt(course.Year) + parseInt(course.CourseDurationInYears)}</h1>
          </div>
        ) : courseStatus == "Not Started" ? (
          <div className="flex-row items-center justify-center text-center">
            <h2 className="text-3xl font-semibold text-blue-800">
               Course: {course.CourseName}
            </h2>
            <h1 className="text-xl py-5">Course Not Started Yet, will commence from {course.Batch} {course.Year}</h1>
          </div>
        ) : (
          <div>Loading data</div>
        )
      ) : (
        <div>Loading data</div>
      )}
    </div>
  );
};

export default StudentHome;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProfDetailsAndSubjectDetails } from "../../api/Professor";
import { loadUserFromStorage } from "../../redux/userSlice";
import { Link } from "react-router-dom";

const ProfessorHome = () => {
  const user = useSelector((state) => state.user.user);
  const [profDetails, setProfDetails] = useState({});
  const [assignedSubjectsProf, setAssignedSubjectsProf] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.UserId) {
      GetProfDetailsAndSubjectDetails(user.UserId)
        .then((response) => {
          console.log(response);
          setProfDetails(response.Professor);
          setAssignedSubjectsProf(response.AssignedSubjects);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (!user.UserId) {
      dispatch(loadUserFromStorage);
    }
  }, [user.UserId, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full md:w-3/4 lg:w-3/4">
        <h1 className="text-3xl mb-5">
          Welcome, {profDetails.ProfessorName || "Professor"}!
        </h1>

        <h2 className="text-2xl mb-3">Your Assigned Subjects</h2>

        {assignedSubjectsProf.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {assignedSubjectsProf.map((subject, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                  <p className="text-lg font-semibold">{subject.CourseName}</p>
                  <p className="text-sm text-gray-500">
                    {subject.SemesterName}
                  </p>
                </div>
                <p className="text-base">{subject.SubjectName}</p>
                <div className="mt-4 space-x-2 flex flex-row">
                  <Link
                    to={`/professor/assignlecture/${subject.SubjectId}/${subject.SemesterId}/${profDetails.UserId}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
                  >
                    Assign Lecture
                  </Link>
                  <Link
                    to={`/professor/viewlecture/${subject.SubjectId}/${subject.SemesterId}/${profDetails.UserId}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
                  >
                    View Lecture
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No subjects assigned to you yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfessorHome;

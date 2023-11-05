import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DeleteLecture, ViewLectureProfessor } from "../../api/Professor";

const ViewLecture = () => {
  const { SubjectId, SemesterId, UserId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleDeleteLecture = (LectureId, ProfessorId) => {
    console.log(LectureId, ProfessorId);
    DeleteLecture(LectureId, ProfessorId)
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
    ViewLectureProfessor(SubjectId, SemesterId, UserId).then((res) => {
      console.log(res);
      setLectures(res.Lectures);
    });
  }, [refresh]);

  return (
    <div className="p-4">
      {lectures.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2">Lecture Name</th>
              <th className="px-4 py-2">Series</th>
              <th className="px-4 py-2">Date and Time</th>
              <th className="px-4 py-2">Venue</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{lecture.LectureName}</td>
                <td className="border px-4 py-2">{lecture.Series}</td>
                <td className="border px-4 py-2">
                  {new Date(lecture.DateTime).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{lecture.Venue.VenueName}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                    onClick={() => {
                      handleDeleteLecture(
                        lecture.LectureId,
                        lecture.ProfessorId
                      );
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">
          No lectures available for this subject and semester.
        </p>
      )}
    </div>
  );
};

export default ViewLecture;

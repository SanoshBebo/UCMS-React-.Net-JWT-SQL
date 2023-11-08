import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BookLecture, ViewStudentLectures } from "../../api/Student";
import { toast, ToastContainer } from "react-toastify";

const LecturesView = () => {
  const { UserId, SubjectId, SemesterId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleBookLecture = (lectureId) => {
    console.log(lectureId, UserId);
    BookLecture(lectureId, UserId)
      .then((res) => {
        console.log(res);
        toast.success("Lecture Booked");
        setTimeout(() => {}, 3000);
        setRefresh(!refresh);
      })
      .catch((err) => {
        toast.error(err.response.data);

        console.error(err);
      });
  };

  useEffect(() => {
    ViewStudentLectures(UserId, SubjectId, SemesterId).then((res) => {
      const sortedLectures = res.sort((a, b) => {
        if (a.LectureName < b.LectureName) {
          return -1;
        }
        if (a.LectureName > b.LectureName) {
          return 1;
        }
        return 0;
      });
      setLectures(sortedLectures);
    });
  }, [refresh]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {lectures.length === 0 ? (
        <p className="text-lg text-center text-gray-600 my-4">
          No lectures assigned yet.
        </p>
      ) : (
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">Lecture Name</th>
              <th className="px-4 py-2">Date and Time</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Professor</th>
              <th className="px-4 py-2">Series</th>
              <th className="px-4 py-2">Venue</th>
              <th className="px-4 py-2">Semester</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-2 text-blue-600 font-semibold">
                  {lecture.LectureName}
                </td>
                <td className="px-4 py-2 flex flex-row gap-4">
                  <p>{lecture.DateTime.split("T")[0]}</p>
                  {"    "}
                  <p>{lecture.DateTime.split("T")[1]}</p>
                </td>
                <td className="px-4 py-2">{lecture.SubjectName}</td>
                <td className="px-4 py-2">{lecture.ProfessorName}</td>
                <td className="px-4 py-2">{lecture.Series}</td>
                <td className="px-4 py-2">{lecture.VenueName}</td>
                <td className="px-4 py-2">{lecture.SemesterName}</td>
                <td className="px-4 py-2">
                  {lecture.Slots === 25 ? (
                    <span className="text-red-500 font-semibold">
                      Slots Full
                    </span>
                  ) : !lecture.IsBooked ? (
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => {
                        handleBookLecture(lecture.LectureId);
                      }}
                    >
                      Book Lecture
                    </button>
                  ) : (
                    <span className="text-green-500 font-semibold">Booked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LecturesView;

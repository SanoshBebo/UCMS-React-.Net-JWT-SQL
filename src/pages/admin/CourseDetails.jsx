import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetCourseDetail } from "../../api/Course";
import { Link } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    GetCourseDetail(id)
      .then((response) => {
        setSemesters(response.Semesters);
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <div className="pb-5">
        <ul className="grid grid-cols-4 gap-6 place-items-center">
          {semesters.map((semester, index) => (
            <li key={index} className={`w-full p-2 m-5`}>
              <Link
                to={`/admin/semester/${semester.SemesterId}`}
                className={`flex flex-col items-center gap-2`}
              >
                <h1 className="text-center">{semester.SemesterName}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AddSubjectToSemester, GetAssignedSubjects } from "../../api/Course";
import { Button } from "@mui/material";

const SemeserDetails = () => {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const assignSubjects = () => {
    AddSubjectToSemester(id, selectedSubjectIds)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
    setRefresh(!refresh);
  };

  useEffect(() => {
    GetAssignedSubjects(id)
      .then((response) => {
        console.log(response);
        setSubjects(response.AssignedSubjects);
        setAvailableSubjects(response.AvailableSubjects);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  return (
    <div>
      <div>add new subject</div>
      <div>
        {availableSubjects.length == 0 ? (
          <p>No available subjects</p>
        ) : (
          <ul>
            {availableSubjects.map((subject, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={subject.SubjectId}
                    checked={selectedSubjectIds.includes(subject.SubjectId)}
                    onChange={() => {
                      if (selectedSubjectIds.includes(subject.SubjectId)) {
                        setSelectedSubjectIds((prevState) =>
                          prevState.filter((id) => id !== subject.SubjectId)
                        );
                      } else {
                        setSelectedSubjectIds((prevState) => [
                          ...prevState,
                          subject.SubjectId,
                        ]);
                      }
                    }}
                  />
                  {subject.SubjectName}
                </label>
              </li>
            ))}
          </ul>
        )}
        <Button onClick={assignSubjects}>assign subjects</Button>
      </div>
      <div>
        {subjects.length == 0 ? (
          <p>No subjects assigned</p>
        ) : (
          <ul>
            {subjects.map((subject, index) => (
              <li key={index}>
                <p>{subject.SubjectName}</p>
                <p>{subject.TeachingHours}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SemeserDetails;

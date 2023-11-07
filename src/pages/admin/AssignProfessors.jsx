import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  AddProfessorToSubject,
  GetAssignedProfessors,
  RemoveProfessorFromSubject,
} from "../../api/Course";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AssignProfessors = () => {
  const { id, subjectid } = useParams();

  const [professors, setProfessors] = useState([]);
  const [availableProfessors, setAvailableProfessors] = useState([]);
  const [selectedProfessorIds, setSelectedProfessorIds] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const assignProfessor = () => {
    AddProfessorToSubject(subjectid, id, selectedProfessorIds)
      .then((response) => {
        console.log(response);
        setTimeout(() => {}, 4000);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });

  };

  const removeProfessor = (profId) => {
    RemoveProfessorFromSubject(subjectid, id, profId)
      .then((response) => {
        console.log(response);
        setTimeout(() => {}, 4000);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });

  };

  useEffect(() => {
    GetAssignedProfessors(subjectid, id)
      .then((response) => {
        console.log(response);
        setProfessors(response.AssignedProfessors);
        setAvailableProfessors(response.AvailableProfessors);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  return (
    <div className="p-4">
      <div className="text-2xl font-semibold mb-4">Assign Professors</div>
      <div className="bg-gray-100 p-4 rounded-lg shadow mb-4">
        <div className="font-bold mb-2">Add New Professor</div>
        {availableProfessors.length === 0 ? (
          <p>No available professors</p>
        ) : (
          <ul>
            {availableProfessors.map((professor, index) => (
              <li key={index} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={professor.UserId}
                    checked={selectedProfessorIds.includes(professor.UserId)}
                    onChange={() => {
                      if (selectedProfessorIds.includes(professor.UserId)) {
                        setSelectedProfessorIds((prevState) =>
                          prevState.filter((id) => id !== professor.UserId)
                        );
                      } else {
                        setSelectedProfessorIds((prevState) => [
                          ...prevState,
                          professor.UserId,
                        ]);
                      }
                    }}
                    className="mr-2"
                  />
                  {professor.ProfessorName}
                </label>
              </li>
            ))}
          </ul>
        )}
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={assignProfessor}
        >
          Assign Professors
        </Button>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <div className="font-bold mb-2">Assigned Professors</div>
        {professors.length === 0 ? (
          <p>No professors assigned</p>
        ) : (
          <ul>
            {professors.map((professor, index) => (
              <li key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <span>{professor.ProfessorName}</span>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      removeProfessor(professor.UserId);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AssignProfessors;

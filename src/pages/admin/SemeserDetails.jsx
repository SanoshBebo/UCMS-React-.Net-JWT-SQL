import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  AddSubjectToSemester,
  DeleteSubjectFromSemester,
  GetAssignedSubjects,
} from "../../api/Course";
import {
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SemesterDetails = () => {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const assignSubjects = () => {
    AddSubjectToSemester(id, selectedSubjectIds)
      .then((response) => {
        console.log(response);
        setTimeout(() => {}, 2000);
        if (response == "") {
          toast.error("Subject already assigned");
        } else {
          toast.success(response);
        }
        setRefresh(!refresh);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const DeleteSubject = (subjectid) => {
    DeleteSubjectFromSemester(subjectid, id)
      .then((response) => {
        console.log(response);
        setTimeout(() => {}, 2000);
        toast.success("Subject Removed");
        setRefresh(!refresh);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
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
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        Semester Details
      </Typography>
      <div>
        <Paper elevation={3} style={{ padding: 16, marginBottom: 16 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Add New Subjects
          </Typography>
          {availableSubjects.length === 0 ? (
            <p>No available subjects</p>
          ) : (
            <List>
              {availableSubjects.map((subject, index) => (
                <ListItem key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
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
                    }
                    label={subject.SubjectName}
                  />
                </ListItem>
              ))}
            </List>
          )}
          <Button variant="contained" color="primary" onClick={assignSubjects}>
            Assign Subjects
          </Button>
        </Paper>
      </div>
      <Paper elevation={3}>
        <Typography variant="h6" color="primary" align="center" gutterBottom>
          Assigned Subjects
        </Typography>
        {subjects.length === 0 ? (
          <p>No subjects assigned</p>
        ) : (
          <List>
            {subjects.map((subject, index) => (
              <ListItem key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center", // Align vertically centered
                    padding: "8px", // Add padding for spacing
                    border: "1px solid #e0e0e0", // Add a border for visual separation
                    marginBottom: "8px", // Add margin at the bottom
                    borderRadius: "4px", // Add some border radius for rounded edges
                    width: "100%",
                  }}
                >
                  <div>
                    <Typography variant="subtitle1">
                      {subject.SubjectName}
                    </Typography>
                    <Typography variant="body2">
                      Teaching Hours: {subject.TeachingHours}
                    </Typography>
                  </div>
                  <div>
                    <Button color="primary">
                      <Link
                        to={`/admin/${id}/${subject.SubjectId}`}
                        style={{ textDecoration: "none", color: "primary" }}
                      >
                        Professors
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        DeleteSubject(subject.SubjectId);
                      }}
                      color="error"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SemesterDetails;

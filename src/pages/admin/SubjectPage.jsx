import React, { useEffect, useState } from "react";
import {
  CreateSubject,
  DeleteSubject,
  GetSubjects,
  UpdateSubject,
} from "../../api/Subject";
import { Box, Button, Modal, Typography } from "@mui/material";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);

  const [subjectName, setSubjectName] = useState("");
  const [editSubjectName, setEditSubjectName] = useState("");
  const [teachingHours, setTeachingHours] = useState();
  const [editTeachingHours, setEditTeachingHours] = useState();
  const [editSubjectId, setEditSubjectId] = useState("");

  const [courseDurationInYears, setCourseDurationInYears] = useState();
  const [batch, setBatch] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] =
    useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };
  const openUpdateProductModal = () => {
    setIsUpdateProductModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddProductModalOpen(false); // Close the "Add Product" modal as well
    setIsUpdateProductModalOpen(false);
  };

  const addSubject = () => {
    const subjectInfo = {
      SubjectName: subjectName,
      TeachingHours: teachingHours,
      SubjectAssigns: [],
      ProfessorAssigns: [],
      Lectures: [],
    };
    console.log(subjectInfo);

    CreateSubject(subjectInfo)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });

    setRefresh(!refresh);
  };

  const updateSubject = () => {
    const subjectInfo = {
      SubjectId: editSubjectId,
      SubjectName: editSubjectName,
      TeachingHours: editTeachingHours,
      SubjectAssigns: [],
      ProfessorAssigns: [],
      Lectures: [],
    };
    console.log(subjectInfo);

    UpdateSubject(subjectInfo, editSubjectId)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });

    setEditSubjectName("");
    setEditTeachingHours();

    setRefresh(!refresh);
  };

  const deleteSubject = (id) => {
    DeleteSubject(id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });

    setRefresh(!refresh);
  };

  useEffect(() => {
    GetSubjects()
      .then((response) => {
        console.log(response);
        setSubjects(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  return (
    <div>
      <div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={openAddProductModal}
          >
            Add new Subject
          </Button>
        </div>
      </div>
      <div className="pb-5">
        <ul className="grid grid-cols-4 gap-6 place-items-center">
          {subjects.map((subject, index) => (
            <li key={index} className={`w-full p-2 m-5`}>
              <h1 className="text-center">{subject.SubjectName}</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditSubjectName(subject.SubjectName);
                  setEditTeachingHours(subject.TeachingHours);
                  setEditSubjectId(subject.SubjectId);
                  openUpdateProductModal();
                }}
                className="mt-3"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  deleteSubject(subject.SubjectId);
                }}
                className="mt-3"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        open={isAddProductModalOpen}
        onClose={closeModal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#000",
            color: "#000",
            width: 400,
            p: 4,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" component="div" className="text-white">
            Add Subject
          </Typography>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => {
              setSubjectName(e.target.value);
            }}
            placeholder="Subject Name"
            className="my-2 p-2 w-full"
            style={{ outline: "none" }}
          />
          <input
            type="number"
            value={teachingHours}
            onChange={(e) => {
              setTeachingHours(e.target.value);
            }}
            placeholder="TeachingHours"
            className="my-2 p-2 w-full"
            style={{ outline: "none" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addSubject}
            className="mt-3"
          >
            Add Subject
          </Button>
        </Box>
      </Modal>
      <Modal
        open={isUpdateProductModalOpen}
        onClose={closeModal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#000",
            color: "#000",
            width: 400,
            p: 4,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" component="div" className="text-white">
            Update Subject
          </Typography>
          <input
            type="text"
            value={editSubjectName}
            onChange={(e) => {
              setEditSubjectName(e.target.value);
            }}
            placeholder="Subject Name"
            className="my-2 p-2 w-full"
            style={{ outline: "none" }}
          />
          <input
            type="number"
            value={editTeachingHours}
            onChange={(e) => {
              setEditTeachingHours(e.target.value);
            }}
            placeholder="TeachingHours"
            className="my-2 p-2 w-full"
            style={{ outline: "none" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              updateSubject(editSubjectId);
            }}
            className="mt-3"
          >
            udpate
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SubjectPage;

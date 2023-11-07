import React, { useEffect, useState } from "react";
import {
  CreateSubject,
  DeleteSubject,
  GetSubjects,
  UpdateSubject,
} from "../../api/Subject";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { getSessionCache, removeSessionCache, setSessionCache } from "../../components/SessionStoreCache";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [editSubjectName, setEditSubjectName] = useState("");
  const [teachingHours, setTeachingHours] = useState("");
  const [editTeachingHours, setEditTeachingHours] = useState("");
  const [editSubjectId, setEditSubjectId] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] =
    useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const openUpdateProductModal = (subject) => {
    setEditSubjectName(subject.SubjectName);
    setEditTeachingHours(subject.TeachingHours);
    setEditSubjectId(subject.SubjectId);
    setIsUpdateProductModalOpen(true);
  };

  const openDeleteConfirmation = (subject) => {
    setSelectedSubject(subject);
    setIsDeleteConfirmationOpen(true);
  };

  const closeModal = () => {
    setIsAddProductModalOpen(false);
    setIsUpdateProductModalOpen(false);
    setIsDeleteConfirmationOpen(false);
  };

  const addSubject = () => {
    removeSessionCache("adminsubjects");

    const subjectInfo = {
      SubjectName: subjectName,
      TeachingHours: teachingHours,
      SubjectAssigns: [],
      ProfessorAssigns: [],
      Lectures: [],
    };

    CreateSubject(subjectInfo)
      .then((response) => {
        console.log(response);
        closeModal();
        setRefresh(!refresh);
        toast.success("Subject Added");
      })
      .catch((err) => {
        toast.error(err.response.data);

        console.error(err);
      });
  };

  const updateSubject = () => {
    removeSessionCache("adminsubjects");

    const subjectInfo = {
      SubjectId: editSubjectId,
      SubjectName: editSubjectName,
      TeachingHours: editTeachingHours,
      SubjectAssigns: [],
      ProfessorAssigns: [],
      Lectures: [],
    };

    UpdateSubject(subjectInfo, editSubjectId)
      .then((response) => {
        console.log(response);
        closeModal();
        setRefresh(!refresh);
        toast.success("Subject Updated");
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.error(err);
      });
  };

  const deleteSubject = () => {
    removeSessionCache("adminsubjects");

    if (selectedSubject) {
      DeleteSubject(selectedSubject.SubjectId)
        .then((response) => {
          console.log(response);
          closeModal();
          setRefresh(!refresh);
          toast.success("Subject Deleted");
        })
        .catch((err) => {
          toast.error(err.response.data);
          console.error(err);
        });
    }
  };

  useEffect(() => {
    const cache = getSessionCache("adminsubjects");
    console.log(cache);
    if (cache) {
      setSubjects(cache.subjects);
    } else {
    GetSubjects() 
      .then((response) => {
        console.log(response);
        const cache = {
          subjects: response,
          timestamp: Date.now(),
        };
        setSessionCache("adminsubjects", cache);

        setSubjects(response);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, [refresh]);

  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Typography variant="h4">Subjects</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={openAddProductModal}
        >
          Add New Subject
        </Button>
      </div>
      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} md={4} key={subject.SubjectId}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {subject.SubjectName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Teaching Hours: {subject.TeachingHours}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => openUpdateProductModal(subject)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => openDeleteConfirmation(subject)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={isDeleteConfirmationOpen} onClose={closeModal}>
        <DialogTitle>Delete Subject</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the subject "
            {selectedSubject?.SubjectName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={deleteSubject} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isAddProductModalOpen} onClose={closeModal}>
        <DialogTitle>Add New Subject</DialogTitle>
        <DialogContent>
          <TextField
            label="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teaching Hours"
            type="number"
            value={teachingHours}
            onChange={(e) => setTeachingHours(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={addSubject} color="primary">
            Add Subject
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isUpdateProductModalOpen} onClose={closeModal}>
        <DialogTitle>Edit Subject</DialogTitle>
        <DialogContent>
          <TextField
            label="Subject Name"
            value={editSubjectName}
            onChange={(e) => setEditSubjectName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teaching Hours"
            type="number"
            value={editTeachingHours}
            onChange={(e) => setEditTeachingHours(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={updateSubject} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={5000} />
    </Container>
  );
};

export default SubjectPage;

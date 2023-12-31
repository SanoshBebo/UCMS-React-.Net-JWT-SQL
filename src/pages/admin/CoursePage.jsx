import React, { useEffect, useState } from "react";
import { CreateCourse, DeleteCourse, GetAllCourse } from "../../api/Course";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Modal,
  Paper,
  Select,
  Typography,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import {
  getSessionCache,
  removeSessionCache,
  setSessionCache,
} from "../../components/SessionStoreCache";
import { toast, ToastContainer } from "react-toastify";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [year, setYear] = useState("");
  const [courseDurationInYears, setCourseDurationInYears] = useState("");
  const [batch, setBatch] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const addCourse = () => {
    removeSessionCache("admincourses");

    if(parseInt(year) >= 2023 && parseInt(year) <= 2033 ){
      const courseInfo = {
        CourseName: courseName,
        Year: year,
        CourseDurationInYears: courseDurationInYears,
        Batch: batch,
        Semesters: [],
        StudentRegistration: [],
      };
  
      console.log(courseInfo);
  
      CreateCourse(courseInfo)
        .then((response) => {
          console.log(response);
          setTimeout(() => {}, 4000);
          setRefresh(!refresh);
        })
        .catch((err) => {
          console.error(err);
        });
  
      setIsAddProductModalOpen(false);
    }
    else{
      toast.error("Invalid Year!");
    }
    
  };

  const deleteCourse = (courseid) => {
    removeSessionCache("admincourses");
    DeleteCourse(courseid)
      .then((response) => {
        console.log(response);
        setTimeout(() => {}, 4000);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closeModal = () => {
    setIsAddProductModalOpen(false);
  };

  useEffect(() => {
    const cache = getSessionCache("admincourses");
    console.log(cache);
    if (cache) {
      setCourses(cache.courses);
    } else {
      GetAllCourse()
        .then((courses) => {
          console.log(courses);
          const cache = {
            courses: courses,
            timestamp: Date.now(),
          };
          setSessionCache("admincourses", cache);
          setCourses(courses);
          setDataLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [refresh]);

  return (
    <div className="m-10">
      <Box my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={openAddProductModal}
        >
          Add Course
        </Button>
      </Box>
      <div className="pb-5">
        <Grid container spacing={4}>
          {courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3}>
                <div></div>
                <Link to={`/admin/course/${course.CourseId}`}>
                  <div className="flex flex-col items-center gap-2 p-3">
                    <Typography variant="h5" align="center">
                      {course.CourseName}
                    </Typography>
                    <div className="flex flex-row items-center gap-2 p-3">

                    <Typography variant="subtitle1" align="center">
                      {course.Year}
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                      (Batch - {course.Batch})
                    </Typography>

                    </div>
                  </div>
                </Link>
                <div className="flex items-center gap-2 p-3">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      deleteCourse(course.CourseId);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
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
        <Paper
          sx={{ width: 400, padding: 4, borderRadius: 4, textAlign: "center" }}
        >
          <Typography variant="h5" component="div" color="primary">
            Add Course
          </Typography>
          <TextField
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Course Name"
            fullWidth
          />
          <TextField
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            fullWidth
          />
          {/* <TextField
            type="number"
            value={courseDurationInYears}
            onChange={(e) => setCourseDurationInYears(e.target.value)}
            placeholder="Course Duration In Years"
            fullWidth
          /> */}
          <Select
            value={courseDurationInYears}
            onChange={(e) => setCourseDurationInYears(e.target.value)}
            fullWidth
          >
            {[...Array(10)].map((_, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1} year{index + 1 !== 1 ? "s" : ""}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            fullWidth
          >
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="July">July</MenuItem>
          </Select>

          <Button
            variant="contained"
            color="primary"
            onClick={addCourse}
            style={{ marginTop: 16 }}
          >
            Add Course
          </Button>
        </Paper>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

export default CoursePage;

import React, { useEffect, useState } from "react";
import { CreateCourse, GetAllCourse } from "../../api/Course";
import { Link } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Track whether data has been loaded

  const [courseName, setCourseName] = useState("");
  const [year, setYear] = useState();
  const [courseDurationInYears, setCourseDurationInYears] = useState();
  const [batch, setBatch] = useState("");

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const addCourse = () => {
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
      })
      .catch((err) => {
        console.error(err);
      });

    setRefresh(!refresh);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddProductModalOpen(false); // Close the "Add Product" modal as well
  };

  useEffect(() => {
    GetAllCourse()
      .then((courses) => {
        console.log(courses);
        setCourses(courses);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
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
            Add new Product
          </Button>
        </div>
        <div></div>
      </div>
      <div className="pb-5">
        <ul className="grid grid-cols-4 gap-6 place-items-center">
          {courses.map((course, index) => (
            <li key={index} className={`w-full p-2 m-5`}>
              <Link
                to={`/admin/course/${course.CourseId}`}
                className={`flex flex-col items-center gap-2`}
              >
                <h1 className="text-center">{course.CourseName}</h1>
                <p className="text-center">Batch {course.Batch}</p>
              </Link>
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
            Add Product
          </Typography>

          <input
            type="text"
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
            placeholder="Course Name"
            className="my-2 p-2 w-full"
            style={{ outline: "none" }}
          />
          <input
            type="number"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
            placeholder="Year"
            className="my-2 p-2 w-full"
            style={{ outline: "none" }}
          />

          <input
            type="number"
            value={courseDurationInYears}
            onChange={(e) => {
              setCourseDurationInYears(e.target.value);
            }}
            placeholder="Course Duration In Years"
            className="my-2 p-2 w-full"
            style={{ outline: "none" }}
          />

          <select
            value={batch}
            onChange={(e) => {
              setBatch(e.target.value);
            }}
            className="my-2 p-2 w-full"
            style={{ outline: "none" }}
          >
            <option value="January">January</option>
            <option value="July">July</option>
          </select>
          <Button
            variant="contained"
            color="primary"
            onClick={addCourse}
            className="mt-3"
          >
            Add Course
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CoursePage;

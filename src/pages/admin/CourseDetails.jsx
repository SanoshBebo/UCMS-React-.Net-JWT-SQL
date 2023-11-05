import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetCourseDetail } from "../../api/Course";
import { Link } from "react-router-dom";
import { Typography, Container, Grid, Card, CardContent } from "@mui/material";

const CourseDetails = () => {
  const { id } = useParams();
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    GetCourseDetail(id)
      .then((response) => {
        const sortedSemesters = response.Semesters.sort((a, b) =>
          a.SemesterName.localeCompare(b.SemesterName)
        );
        setSemesters(sortedSemesters);
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Container>
      <Typography
        variant="h4"
        color="black"
        margin={4}
        align="center"
        gutterBottom
      >
        Semester Details
      </Typography>
      <Grid container spacing={2}>
        {semesters.map((semester, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link to={`/admin/semester/${semester.SemesterId}`}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary" align="center">
                    {semester.SemesterName}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseDetails;

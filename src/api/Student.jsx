import axios from "./AxiosConfig";

export const GetSubjects = async () => {
  const response = await axios.get("/api/Subjects/getsubjects");
  console.log(response.data);
};

export const GetCompleteStudentInfo = async (userId) => {
  try {
    const response = await axios.get(`/api/Student/studenthome/${userId}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const RegisterCourse = async (courseId, userId) => {
  const response = await axios.post(
    `api/Subjects/registercourse/${courseId}/${userId}`
  );
  return response.data;
};

export const ViewStudentLectures = async (userId, subjectId, semesterId) => {
  try {
    const response = await axios.get(
      `/api/Student/viewstudentlecture/${userId}/${subjectId}/${semesterId}`
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const BookLecture = async (lectureId, userId) => {
  const response = await axios.post(
    `api/Student/booklecture/${lectureId}/${userId}`
  );
  return response.data;
};